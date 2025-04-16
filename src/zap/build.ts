import fs from 'fs/promises';
import path from 'path';
import { ChainId, Project, LPType, ChainNames, ZapInfo, UniV2LPInfo, GammaLPInfo, IchiLPInfo, SolidlyLPInfo } from './types'; // Assuming types are correctly exported
import { buildGamma } from './builders/gamma-builder';
import { buildIchi } from './builders/ichi-builder';
import { buildUniV2 } from './builders/uniV2-builder'; // Import the new builder
import { buildSolidly } from './builders/solidly-builder'; // <-- Add Solidly builder import
import { Listr, ListrTask } from 'listr2';
import * as projectConfigs from './config/projects';
import { ProjectConfig } from './types/config';
import { Address } from 'viem'; // Import Address type

const MANUAL_ENTRIES_DIR = path.join(__dirname, 'manual-entries');
const AUTO_GENERATED_DIR = path.join(__dirname, 'auto-generated');

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
 * Maps filename base (e.g., 'gamma') to LPType enum.
 */
function getLPTypeFromFilenameBase(filenameBase: string): LPType | null {
  const key = Object.keys(LPType).find(k => LPType[k as keyof typeof LPType].toLowerCase() === filenameBase.toLowerCase());
  return key ? LPType[key as keyof typeof LPType] : null;
}

/**
 * Gets the string key (e.g., "GAMMA") from an LPType enum value.
 */
function getLPTypeKey(value: LPType): keyof typeof LPType | undefined {
    return (Object.keys(LPType) as Array<keyof typeof LPType>).find(key => LPType[key] === value);
}

/**
 * Formats the generated data into a JSON string representing a map
 * where the key is the identifier (hypervisor, vault, lpAddress) and the value is the ZapInfo object.
 */
function formatOutputToJsonMap(data: ZapInfo[]): string {
    const map: Record<string, ZapInfo> = {};
    for (const entry of data) {
        const key = getIdentifier(entry);
        if (key) {
            map[key] = entry;
        } else {
            // Handle cases where identifier might be missing or lpData has a different structure
            console.warn(`Entry missing identifier key or has unexpected lpData structure, skipping map entry: ${JSON.stringify(entry)}`);
        }
    }
    return JSON.stringify(map, null, 2);
}

/**
* Determines the correct identifier key based on the LP type or data structure.
*/
const getIdentifier = (entry: ZapInfo): string | undefined => {
    if (!entry.lpData) return undefined;

    // Check based on lpType first for clarity
    switch (entry.lpData.lpType) {
        case LPType.GAMMA:
            return (entry.lpData as GammaLPInfo).hypervisor;
        case LPType.ICHI:
            return (entry.lpData as IchiLPInfo).vault;
        case LPType.UNIV2:
            return (entry.lpData as UniV2LPInfo).lpAddress;
        case LPType.SOLIDLY:
            return (entry.lpData as SolidlyLPInfo).lpAddress;
        // Add cases for other LP types (STEER, SOLIDLY, etc.)
        // case LPType.STEER:
        //     return (entry.lpData as SteerLPInfo).lpAddress;
        default:
            // Fallback checks for structure if lpType is missing or unknown
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
    }
};

// Type for context passed to the unified builder task
type BuilderTaskContext = {
    outputPath: string;
    chainName: string;
    projectName: string;
    chainId: ChainId;
    project: Project;
    lpType: LPType;
    manualEntryPath: string; // Path to the triggering file (e.g., gamma.ts, univ2.ts)
    entryFileName: string;   // Base name of the triggering file
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

                        const filenameBase = path.basename(entryFile.name, '.ts'); // e.g., 'gamma', 'univ2'
                        const lpType = getLPTypeFromFilenameBase(filenameBase);

                        if (lpType === null) {
                            console.warn(`Skipping unknown manual LP type file: ${entryFile.name} in ${chainName}/${projectName}`);
                            continue;
                        }

                        // Determine output path based on lpType
                        const outputFilename = `${lpType.toLowerCase()}.json`; // e.g., gamma.json, univ2.json
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
                            lpType
                        };

                        // Use the unified task creator for all LP types found via manual files
                        builderTasksForProject.push(createBuilderTask(ctx));
                    }
                } catch (error: any) {
                    if (error.code !== 'ENOENT') {
                        console.error(`Error reading entry files for ${chainName}/${projectName}:`, error);
                    } // Ignore ENOENT
                }

                // Add project task group if builders were found
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
          } // Ignore ENOENT if manual chain dir doesn't exist
      }

      // Add chain task group if projects were found
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

// --- Unified Task Creator Function ---

/**
 * Creates a Listr task for a specific builder based on context.
 */
function createBuilderTask(ctx: BuilderTaskContext): ListrTask {
    const lpTypeKey = getLPTypeKey(ctx.lpType) ?? 'UnknownType';
    const outputFilenameBase = path.basename(ctx.outputPath);
    const title = `Building ${lpTypeKey} from ${ctx.entryFileName}`;

    return {
        title: title,
        task: async (taskCtx, task) => {
            try {
                let existingData: Record<string, ZapInfo> = {};
                const existingLpAddresses = new Set<Address>(); // Needed for UniV2

                // Read existing data (common step)
                try {
                    const existingContent = await fs.readFile(ctx.outputPath, 'utf-8');
                    existingData = JSON.parse(existingContent);
                    if (typeof existingData === 'object' && existingData !== null && !Array.isArray(existingData)) {
                        // Populate existing addresses for UniV2 check
                        if (ctx.lpType === LPType.UNIV2) {
                             Object.keys(existingData).forEach(key => {
                                 if (key.startsWith('0x')) { // Basic check for address format
                                     existingLpAddresses.add(key as Address);
                                 }
                             });
                        }
                        // <-- Also populate for Solidly
                        if (ctx.lpType === LPType.SOLIDLY) {
                             Object.keys(existingData).forEach(key => {
                                 if (key.startsWith('0x')) { // Basic check for address format
                                     existingLpAddresses.add(key as Address);
                                 }
                             });
                        }
                    } else {
                        task.title = `Existing file ${outputFilenameBase} invalid. Starting fresh.`;
                        existingData = {};
                    }
                } catch (error: any) {
                    if (error.code !== 'ENOENT') {
                        console.warn(`Warn: Error reading existing file ${outputFilenameBase}: ${error.message}. Starting fresh.`);
                    }
                    existingData = {}; // Start fresh if no file or read error
                }

                let processedData: ZapInfo[] = [];

                // Call the appropriate builder
                switch (ctx.lpType) {
                    case LPType.GAMMA:
                    case LPType.ICHI:
                        // Builders requiring manualEntries array
                        task.output = 'Importing manual entries...';
                        const manualEntriesModule = await import(ctx.manualEntryPath);
                        const entriesKey = Object.keys(manualEntriesModule).find(key => key.endsWith('Entries'));
                        if (!entriesKey) {
                            throw new Error(`Could not find *Entries export in ${ctx.manualEntryPath}`);
                        }
                        const manualEntries = manualEntriesModule[entriesKey];

                        if (ctx.lpType === LPType.GAMMA) {
                           task.output = 'Fetching Gamma data...';
                           processedData = await buildGamma(manualEntries, ctx.chainId, ctx.project, task);
                        } else if (ctx.lpType === LPType.ICHI) {
                           task.output = 'Fetching Ichi data...';
                           processedData = await buildIchi(manualEntries, ctx.chainId, ctx.project, task);
                        }
                        break;
                    case LPType.UNIV2:
                        // UniV2 builder doesn't need manualEntries, uses existingLpAddresses
                        task.output = `Found ${existingLpAddresses.size} existing LPs. Discovering new pairs...`;
                        processedData = await buildUniV2(ctx.chainId, ctx.project, existingLpAddresses, task);
                        break;
                    case LPType.SOLIDLY:
                        // Solidly builder also uses existingLpAddresses
                        task.output = `Found ${existingLpAddresses.size} existing LPs. Discovering new pairs...`;
                        processedData = await buildSolidly(ctx.chainId, ctx.project, existingLpAddresses, task);
                        break;
                    // Add other builders here (e.g., Steer, Solidly)
                    // case LPType.STEER:
                    //    processedData = await buildSteer(...);
                    //    break;
                    default:
                        task.title = `Skipped: No builder implemented for ${lpTypeKey} (${ctx.entryFileName})`;
                        task.skip();
                        return;
                }

                // Merge and Write Output (common step)
                task.output = 'Merging data...';
                const { finalMap, addedCount } = mergeData(existingData, processedData, ctx.lpType);

                // Logic to determine final task state and title based on outcome
                if (addedCount > 0) {
                    task.output = 'Writing output file...';
                    const outputContent = JSON.stringify(finalMap, null, 2);
                    await fs.mkdir(path.dirname(ctx.outputPath), { recursive: true });
                    await fs.writeFile(ctx.outputPath, outputContent);
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): Success (${addedCount} new)`;
                } else if (Object.keys(finalMap).length > 0 && Object.keys(existingData).length === Object.keys(finalMap).length) {
                     // This covers cases where no new items were added, including UniV2 finding no new pairs
                     task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): No changes`;
                     task.skip('No new data found or added.');
                } else if (Object.keys(finalMap).length === 0) {
                    // This covers cases where build resulted in empty data (e.g., UniV2 factory has 0 pairs)
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): No data found`;
                    task.skip('Builder returned no data.');
                } else {
                    // Fallback for unexpected scenarios, potentially indicating an issue
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): Completed (Status unclear)`;
                    task.skip('Merge complete, but outcome state unclear.');
                }

            } catch (error: any) {
                task.title = `✗ Error: ${lpTypeKey} (${ctx.entryFileName})`;
                error.message = `Error processing ${ctx.manualEntryPath} [${lpTypeKey}]: ${error.message}`;
                throw error; // Re-throw for Listr
            }
        }
    };
}

/**
 * Merges new processed data with existing data.
 */
function mergeData(existingData: Record<string, ZapInfo>, processedData: ZapInfo[], lpType: LPType): { finalMap: Record<string, ZapInfo>, addedCount: number } {
    const finalMap: Record<string, ZapInfo> = { ...existingData };
    let addedCount = 0;

    if (!Array.isArray(processedData) || !processedData.every(item => typeof item === 'object' && item !== null)) {
        console.warn(`Warn: Processed data for LPType ${getLPTypeKey(lpType)} is not a valid ZapInfo array. Skipping merge.`);
        return { finalMap, addedCount };
    }

    for (const newEntry of processedData) {
        const key = getIdentifier(newEntry);
        if (key) {
            if (!finalMap[key]) {
                finalMap[key] = newEntry;
                addedCount++;
            } else {
                // Optional: Add update logic here if needed, for now, we skip updates
            }
        } else {
            console.warn(`Warn: New entry missing identifier key for LPType ${getLPTypeKey(lpType)}. Skipping merge: ${JSON.stringify(newEntry).substring(0, 100)}...`);
        }
    }
    return { finalMap, addedCount };
}

// --- Run Build ---

build().catch((error) => {
  console.error('\nUnhandled error during build process:', error);
  process.exit(1);
}); 