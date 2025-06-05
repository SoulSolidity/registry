import fs from 'fs/promises';
import path from 'path';
import { Project, ChainNames, ZapInfo, ProjectProtocol } from './types';
import { buildGamma } from './builders/gamma-builder';
import { buildIchi } from './builders/ichi-builder';
import { buildUniV2 } from './builders/uniV2-builder';
import { buildSolidly } from './builders/solidly-builder';
import { buildApeBond } from './builders/apebond-builder';
import { Listr, ListrTask, ListrTaskWrapper } from 'listr2';
import * as projectConfigs from './config/projects';
import { ProjectConfig } from './types/config';
import { Address } from 'viem';
import { ChainId } from '../types/enums';
import { getAddress } from 'viem';
import { GammaEntry, IchiEntry, ProtocolEntry } from './types';

const MANUAL_ENTRIES_DIR = path.join(__dirname, 'manual-entries');
const AUTO_GENERATED_DIR = path.join(__dirname, 'auto-generated');

// Builder map with proper type handling
type BuilderFunction<T = any> = (
    entries: T,
    chainId: ChainId,
    project: Project,
    task: ListrTaskWrapper<any, any, any>,
    existingLpAddresses?: Set<Address>
) => Promise<ZapInfo[]>;

const builderMap: Record<string, BuilderFunction> = {
    'gamma': buildGamma as BuilderFunction<GammaEntry[]>,
    'ichi': buildIchi as BuilderFunction<IchiEntry[]>,
    'univ2': (_, chainId, project, task, existingLpAddresses) => 
        buildUniV2(chainId, project, existingLpAddresses!, task),
    'solidly': (_, chainId, project, task, existingLpAddresses) => 
        buildSolidly(chainId, project, existingLpAddresses!, task),
    'bonds': buildApeBond as BuilderFunction<ProtocolEntry[]>,
};

// --- Helper Functions ---

/**
 * Maps directory name to ChainId enum.
 */
function getChainIdFromName(chainName: string): ChainId | null {
  const entry = Object.entries(ChainNames).find(([, name]) => name === chainName);
  return entry ? Number(entry[0]) as ChainId : null;
}

/**
 * Maps directory name to Project enum.
 */
function getProjectFromName(projectName: string): Project | null {
  const key = Object.keys(Project).find(k => Project[k as keyof typeof Project].toLowerCase() === projectName.toLowerCase());
  return key ? Project[key as keyof typeof Project] : null;
}

/**
 * Gets the identifier key from a ZapInfo entry.
 */
const getIdentifier = (entry: ZapInfo): string | undefined => {
    if (!entry.lpData) return undefined;

    if(entry.protocolData){
        const protocolData = entry.protocolData;
        if(protocolData.protocol === ProjectProtocol.ApeBond){
            return protocolData.bond;
        }
    }

    // Check for different identifier types based on structure
    if ('hypervisor' in entry.lpData && typeof (entry.lpData as any).hypervisor === 'string') {
        return (entry.lpData as any).hypervisor;
    }
    if ('vault' in entry.lpData && typeof (entry.lpData as any).vault === 'string') {
        return (entry.lpData as any).vault;
    }
    if ('lpAddress' in entry.lpData && typeof (entry.lpData as any).lpAddress === 'string') {
        return (entry.lpData as any).lpAddress;
    }
    return undefined;
};

// Type for context passed to the builder task
type BuilderTaskContext = {
    outputPath: string;
    chainName: string;
    projectName: string;
    chainId: ChainId;
    project: Project;
    manualEntryPath: string;
    entryFileName: string;
    builderName: string;
};

// --- Main Build Logic ---

async function build() {
  console.log('Starting build process...');
  await fs.mkdir(AUTO_GENERATED_DIR, { recursive: true });

  const chainTasks: ListrTask[] = [];

  try {
    console.log(`Discovering manual entries in: ${MANUAL_ENTRIES_DIR}`);
    const chainDirs = await fs.readdir(MANUAL_ENTRIES_DIR, { withFileTypes: true });

    for (const chainDir of chainDirs) {
      if (!chainDir.isDirectory()) continue;
      const chainName = chainDir.name;
      const chainId = getChainIdFromName(chainName);
      if (chainId === null) {
        console.warn(`Skipping unknown chain directory: ${chainName}`);
        continue;
      }

      const projectTasksForChain: ListrTask[] = [];
      const manualChainPath = path.join(MANUAL_ENTRIES_DIR, chainName);

      try {
           const projectDirs = await fs.readdir(manualChainPath, { withFileTypes: true });

           for (const projectDir of projectDirs) {
                if (!projectDir.isDirectory()) continue;
                const projectName = projectDir.name;
                const project = getProjectFromName(projectName);
                if (project === null) {
                    console.warn(`Skipping unknown project directory: ${projectName} in ${chainName}`);
                    continue;
                }

                const builderTasksForProject: ListrTask[] = [];
                const manualProjectPath = path.join(manualChainPath, projectName);

                try {
                    const entryFiles = await fs.readdir(manualProjectPath, { withFileTypes: true });
                    for (const entryFile of entryFiles) {
                        if (!entryFile.isFile() || !entryFile.name.endsWith('.ts')) continue;

                        const filenameBase = path.basename(entryFile.name, '.ts');
                        const builder = builderMap[filenameBase.toLowerCase()];

                        if (!builder) {
                            console.warn(`Skipping unknown builder for file: ${entryFile.name} in ${chainName}/${projectName}`);
                            continue;
                        }

                        // Determine output path based on filename
                        const outputFilename = `${filenameBase.toLowerCase()}.json`;
                        const outputPath = path.join(AUTO_GENERATED_DIR, chainName, projectName, outputFilename);
                        const manualEntryPath = path.join(manualProjectPath, entryFile.name);

                        const ctx: BuilderTaskContext = {
                            manualEntryPath,
                            outputPath,
                            chainName,
                            projectName,
                            entryFileName: entryFile.name,
                            chainId,
                            project,
                            builderName: filenameBase.toLowerCase()
                        };

                        builderTasksForProject.push(createBuilderTask(ctx));
                    }
                } catch (error: any) {
                    if (error.code !== 'ENOENT') {
                        console.error(`Error reading entry files for ${chainName}/${projectName}:`, error);
                    }
                }

                if (builderTasksForProject.length > 0) {
                    projectTasksForChain.push({
                        title: `Project: ${projectName}`,
                        task: () => new Listr(builderTasksForProject, { concurrent: false, exitOnError: false })
                    });
                }
           }
      } catch (error: any) {
          if (error.code !== 'ENOENT') {
            console.error(`Error reading project directories for chain ${chainName}:`, error);
          }
      }

      if (projectTasksForChain.length > 0) {
        chainTasks.push({
            title: `Chain: ${chainName}`,
            task: () => new Listr(projectTasksForChain, { concurrent: true, exitOnError: false })
        });
      }
    }
  } catch (error: any) {
      if (error.code === 'ENOENT') {
           console.warn(`Manual entries directory not found: ${MANUAL_ENTRIES_DIR}`);
      } else {
           console.error('Error during discovery phase:', error);
           process.exit(1);
      }
  }

  if (chainTasks.length === 0) {
      console.log("No manual entry files found to process.");
      return;
  }

  console.log(`\nStarting Listr tasks for ${chainTasks.length} chains...`);

  const tasks = new Listr(chainTasks, {
      concurrent: true,
      exitOnError: false,
      rendererOptions: { collapseSubtasks: false, collapseErrors: false }
  });

  try {
    await tasks.run();
    console.log('\nBuild process finished.');
  } catch (e) {
    console.error('\nBuild process completed with errors.');
    process.exit(1);
  }
}

// --- Task Creator Function ---

function createBuilderTask(ctx: BuilderTaskContext): ListrTask {
    const builder = builderMap[ctx.builderName];
    
    if (!builder) {
        return {
            title: `Skipped: No builder found for ${ctx.builderName}`,
            task: () => {
                throw new Error(`No builder found for file: ${ctx.builderName}`);
            }
        };
    }

    const title = `Building ${ctx.builderName} from ${ctx.entryFileName}`;

    return {
        title: title,
        task: async (taskCtx, task) => {
            try {
                let existingData: Record<string, ZapInfo> = {};
                const existingLpAddresses = new Set<Address>();

                // Read existing data
                try {
                    const existingContent = await fs.readFile(ctx.outputPath, 'utf-8');
                    existingData = JSON.parse(existingContent);
                    if (typeof existingData === 'object' && existingData !== null && !Array.isArray(existingData)) {
                        // Populate existing addresses for discovery builders
                        if (ctx.builderName === 'univ2' || ctx.builderName === 'solidly') {
                            Object.keys(existingData).forEach(key => {
                                if (key.startsWith('0x')) {
                                    existingLpAddresses.add(key as Address);
                                }
                            });
                        }
                    } else {
                        task.title = `Existing file ${path.basename(ctx.outputPath)} invalid. Starting fresh.`;
                        existingData = {};
                    }
                } catch (error: any) {
                    if (error.code !== 'ENOENT') {
                        console.warn(`Warn: Error reading existing file ${path.basename(ctx.outputPath)}: ${error.message}. Starting fresh.`);
                    }
                    existingData = {};
                }

                let processedData: ZapInfo[] = [];

                // Import manual entries
                task.output = 'Importing manual entries...';
                const manualEntriesModule = await import(ctx.manualEntryPath);
                const entriesKey = Object.keys(manualEntriesModule)[0];
                if (!entriesKey) {
                    throw new Error(`No exports found in ${ctx.manualEntryPath}`);
                }
                const manualEntries = manualEntriesModule[entriesKey];

                // Call the builder
                task.output = `Fetching ${ctx.builderName} data...`;
                processedData = await builder(manualEntries, ctx.chainId, ctx.project, task, existingLpAddresses);

                // Merge and Write Output
                task.output = 'Merging data...';
                const { finalMap, addedCount } = mergeData(existingData, processedData);

                if (addedCount > 0) {
                    task.output = 'Writing output file...';
                    const outputContent = JSON.stringify(finalMap, null, 2);
                    await fs.mkdir(path.dirname(ctx.outputPath), { recursive: true });
                    await fs.writeFile(ctx.outputPath, outputContent);
                    task.title = `✓ ${ctx.builderName} (${path.basename(ctx.outputPath)}): Success (${addedCount} new)`;
                } else if (Object.keys(finalMap).length > 0 && Object.keys(existingData).length === Object.keys(finalMap).length) {
                    task.title = `✓ ${ctx.builderName} (${path.basename(ctx.outputPath)}): No changes`;
                    task.skip('No new data found or added.');
                } else if (Object.keys(finalMap).length === 0) {
                    task.title = `✓ ${ctx.builderName} (${path.basename(ctx.outputPath)}): No data found`;
                    task.skip('Builder returned no data.');
                } else {
                    task.title = `✓ ${ctx.builderName} (${path.basename(ctx.outputPath)}): Completed (Status unclear)`;
                    task.skip('Merge complete, but outcome state unclear.');
                }

            } catch (error: any) {
                task.title = `✗ Error: ${ctx.builderName} (${ctx.entryFileName})`;
                error.message = `Error processing ${ctx.manualEntryPath} [${ctx.builderName}]: ${error.message}`;
                throw error;
            }
        }
    };
}

/**
 * Merges new processed data with existing data.
 */
function mergeData(existingData: Record<string, ZapInfo>, processedData: ZapInfo[]): { finalMap: Record<string, ZapInfo>, addedCount: number } {
    const finalMap: Record<string, ZapInfo> = { ...existingData };
    let addedCount = 0;

    if (!Array.isArray(processedData) || !processedData.every(item => typeof item === 'object' && item !== null)) {
        console.warn(`Warn: Processed data is not a valid ZapInfo array. Skipping merge.`);
        return { finalMap, addedCount };
    }

    for (const newEntry of processedData) {
        let key = getIdentifier(newEntry);
        if (key) {
            key = getAddress(key);
            if (!finalMap[key]) {
                finalMap[key] = newEntry;
                addedCount++;
            }
        } else {
            console.warn(`Warn: New entry missing identifier key. Skipping merge: ${JSON.stringify(newEntry).substring(0, 100)}...`);
        }
    }
    return { finalMap, addedCount };
}

// --- Run Build ---

build().catch((error) => {
  console.error('\nUnhandled error during build process:', error);
  process.exit(1);
}); 