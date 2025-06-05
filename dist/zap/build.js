"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const types_1 = require("./types");
const gamma_builder_1 = require("./builders/gamma-builder");
const ichi_builder_1 = require("./builders/ichi-builder");
const uniV2_builder_1 = require("./builders/uniV2-builder");
const solidly_builder_1 = require("./builders/solidly-builder");
const apebond_builder_1 = require("./builders/apebond-builder");
const listr2_1 = require("listr2");
const viem_1 = require("viem");
const MANUAL_ENTRIES_DIR = path_1.default.join(__dirname, 'manual-entries');
const AUTO_GENERATED_DIR = path_1.default.join(__dirname, 'auto-generated');
const builderMap = {
    'gamma': gamma_builder_1.buildGamma,
    'ichi': ichi_builder_1.buildIchi,
    'univ2': (_, chainId, project, task, existingLpAddresses) => (0, uniV2_builder_1.buildUniV2)(chainId, project, existingLpAddresses, task),
    'solidly': (_, chainId, project, task, existingLpAddresses) => (0, solidly_builder_1.buildSolidly)(chainId, project, existingLpAddresses, task),
    'bonds': apebond_builder_1.buildApeBond,
};
// --- Helper Functions ---
/**
 * Maps directory name to ChainId enum.
 */
function getChainIdFromName(chainName) {
    const entry = Object.entries(types_1.ChainNames).find(([, name]) => name === chainName);
    return entry ? Number(entry[0]) : null;
}
/**
 * Maps directory name to Project enum.
 */
function getProjectFromName(projectName) {
    const key = Object.keys(types_1.Project).find(k => types_1.Project[k].toLowerCase() === projectName.toLowerCase());
    return key ? types_1.Project[key] : null;
}
/**
 * Gets the identifier key from a ZapInfo entry.
 */
const getIdentifier = (entry) => {
    if (!entry.lpData)
        return undefined;
    if (entry.protocolData) {
        const protocolData = entry.protocolData;
        if (protocolData.protocol === types_1.ProjectProtocol.ApeBond) {
            return protocolData.bond;
        }
    }
    // Check for different identifier types based on structure
    if ('hypervisor' in entry.lpData && typeof entry.lpData.hypervisor === 'string') {
        return entry.lpData.hypervisor;
    }
    if ('vault' in entry.lpData && typeof entry.lpData.vault === 'string') {
        return entry.lpData.vault;
    }
    if ('lpAddress' in entry.lpData && typeof entry.lpData.lpAddress === 'string') {
        return entry.lpData.lpAddress;
    }
    return undefined;
};
// --- Main Build Logic ---
async function build() {
    console.log('Starting build process...');
    await promises_1.default.mkdir(AUTO_GENERATED_DIR, { recursive: true });
    const chainTasks = [];
    try {
        console.log(`Discovering manual entries in: ${MANUAL_ENTRIES_DIR}`);
        const chainDirs = await promises_1.default.readdir(MANUAL_ENTRIES_DIR, { withFileTypes: true });
        for (const chainDir of chainDirs) {
            if (!chainDir.isDirectory())
                continue;
            const chainName = chainDir.name;
            const chainId = getChainIdFromName(chainName);
            if (chainId === null) {
                console.warn(`Skipping unknown chain directory: ${chainName}`);
                continue;
            }
            const projectTasksForChain = [];
            const manualChainPath = path_1.default.join(MANUAL_ENTRIES_DIR, chainName);
            try {
                const projectDirs = await promises_1.default.readdir(manualChainPath, { withFileTypes: true });
                for (const projectDir of projectDirs) {
                    if (!projectDir.isDirectory())
                        continue;
                    const projectName = projectDir.name;
                    const project = getProjectFromName(projectName);
                    if (project === null) {
                        console.warn(`Skipping unknown project directory: ${projectName} in ${chainName}`);
                        continue;
                    }
                    const builderTasksForProject = [];
                    const manualProjectPath = path_1.default.join(manualChainPath, projectName);
                    try {
                        const entryFiles = await promises_1.default.readdir(manualProjectPath, { withFileTypes: true });
                        for (const entryFile of entryFiles) {
                            if (!entryFile.isFile() || !entryFile.name.endsWith('.ts'))
                                continue;
                            const filenameBase = path_1.default.basename(entryFile.name, '.ts');
                            const builder = builderMap[filenameBase.toLowerCase()];
                            if (!builder) {
                                console.warn(`Skipping unknown builder for file: ${entryFile.name} in ${chainName}/${projectName}`);
                                continue;
                            }
                            // Determine output path based on filename
                            const outputFilename = `${filenameBase.toLowerCase()}.json`;
                            const outputPath = path_1.default.join(AUTO_GENERATED_DIR, chainName, projectName, outputFilename);
                            const manualEntryPath = path_1.default.join(manualProjectPath, entryFile.name);
                            const ctx = {
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
                    }
                    catch (error) {
                        if (error.code !== 'ENOENT') {
                            console.error(`Error reading entry files for ${chainName}/${projectName}:`, error);
                        }
                    }
                    if (builderTasksForProject.length > 0) {
                        projectTasksForChain.push({
                            title: `Project: ${projectName}`,
                            task: () => new listr2_1.Listr(builderTasksForProject, { concurrent: false, exitOnError: false })
                        });
                    }
                }
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error(`Error reading project directories for chain ${chainName}:`, error);
                }
            }
            if (projectTasksForChain.length > 0) {
                chainTasks.push({
                    title: `Chain: ${chainName}`,
                    task: () => new listr2_1.Listr(projectTasksForChain, { concurrent: true, exitOnError: false })
                });
            }
        }
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.warn(`Manual entries directory not found: ${MANUAL_ENTRIES_DIR}`);
        }
        else {
            console.error('Error during discovery phase:', error);
            process.exit(1);
        }
    }
    if (chainTasks.length === 0) {
        console.log("No manual entry files found to process.");
        return;
    }
    console.log(`\nStarting Listr tasks for ${chainTasks.length} chains...`);
    const tasks = new listr2_1.Listr(chainTasks, {
        concurrent: true,
        exitOnError: false,
        rendererOptions: { collapseSubtasks: false, collapseErrors: false }
    });
    try {
        await tasks.run();
        console.log('\nBuild process finished.');
    }
    catch (e) {
        console.error('\nBuild process completed with errors.');
        process.exit(1);
    }
}
// --- Task Creator Function ---
function createBuilderTask(ctx) {
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
                let existingData = {};
                const existingLpAddresses = new Set();
                // Read existing data
                try {
                    const existingContent = await promises_1.default.readFile(ctx.outputPath, 'utf-8');
                    existingData = JSON.parse(existingContent);
                    if (typeof existingData === 'object' && existingData !== null && !Array.isArray(existingData)) {
                        // Populate existing addresses for discovery builders
                        if (ctx.builderName === 'univ2' || ctx.builderName === 'solidly') {
                            Object.keys(existingData).forEach(key => {
                                if (key.startsWith('0x')) {
                                    existingLpAddresses.add(key);
                                }
                            });
                        }
                    }
                    else {
                        task.title = `Existing file ${path_1.default.basename(ctx.outputPath)} invalid. Starting fresh.`;
                        existingData = {};
                    }
                }
                catch (error) {
                    if (error.code !== 'ENOENT') {
                        console.warn(`Warn: Error reading existing file ${path_1.default.basename(ctx.outputPath)}: ${error.message}. Starting fresh.`);
                    }
                    existingData = {};
                }
                let processedData = [];
                // Import manual entries
                task.output = 'Importing manual entries...';
                const manualEntriesModule = await Promise.resolve(`${ctx.manualEntryPath}`).then(s => __importStar(require(s)));
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
                    await promises_1.default.mkdir(path_1.default.dirname(ctx.outputPath), { recursive: true });
                    await promises_1.default.writeFile(ctx.outputPath, outputContent);
                    task.title = `✓ ${ctx.builderName} (${path_1.default.basename(ctx.outputPath)}): Success (${addedCount} new)`;
                }
                else if (Object.keys(finalMap).length > 0 && Object.keys(existingData).length === Object.keys(finalMap).length) {
                    task.title = `✓ ${ctx.builderName} (${path_1.default.basename(ctx.outputPath)}): No changes`;
                    task.skip('No new data found or added.');
                }
                else if (Object.keys(finalMap).length === 0) {
                    task.title = `✓ ${ctx.builderName} (${path_1.default.basename(ctx.outputPath)}): No data found`;
                    task.skip('Builder returned no data.');
                }
                else {
                    task.title = `✓ ${ctx.builderName} (${path_1.default.basename(ctx.outputPath)}): Completed (Status unclear)`;
                    task.skip('Merge complete, but outcome state unclear.');
                }
            }
            catch (error) {
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
function mergeData(existingData, processedData) {
    const finalMap = { ...existingData };
    let addedCount = 0;
    if (!Array.isArray(processedData) || !processedData.every(item => typeof item === 'object' && item !== null)) {
        console.warn(`Warn: Processed data is not a valid ZapInfo array. Skipping merge.`);
        return { finalMap, addedCount };
    }
    for (const newEntry of processedData) {
        let key = getIdentifier(newEntry);
        if (key) {
            key = (0, viem_1.getAddress)(key);
            if (!finalMap[key]) {
                finalMap[key] = newEntry;
                addedCount++;
            }
        }
        else {
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
