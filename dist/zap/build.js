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
const types_1 = require("./types"); // Assuming types are correctly exported
const gamma_builder_1 = require("./builders/gamma-builder");
const ichi_builder_1 = require("./builders/ichi-builder");
const uniV2_builder_1 = require("./builders/uniV2-builder"); // Import the new builder
const solidly_builder_1 = require("./builders/solidly-builder"); // <-- Add Solidly builder import
const listr2_1 = require("listr2");
const viem_1 = require("viem");
const MANUAL_ENTRIES_DIR = path_1.default.join(__dirname, 'manual-entries');
const AUTO_GENERATED_DIR = path_1.default.join(__dirname, 'auto-generated');
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
 * Maps filename base (e.g., 'gamma') to LPType enum.
 */
function getLPTypeFromFilenameBase(filenameBase) {
    const key = Object.keys(types_1.LPType).find(k => types_1.LPType[k].toLowerCase() === filenameBase.toLowerCase());
    return key ? types_1.LPType[key] : null;
}
/**
 * Gets the string key (e.g., "GAMMA") from an LPType enum value.
 */
function getLPTypeKey(value) {
    return Object.keys(types_1.LPType).find(key => types_1.LPType[key] === value);
}
/**
 * Formats the generated data into a JSON string representing a map
 * where the key is the identifier (hypervisor, vault, lpAddress) and the value is the ZapInfo object.
 */
function formatOutputToJsonMap(data) {
    const map = {};
    for (const entry of data) {
        const key = getIdentifier(entry);
        if (key) {
            map[key] = entry;
        }
        else {
            // Handle cases where identifier might be missing or lpData has a different structure
            console.warn(`Entry missing identifier key or has unexpected lpData structure, skipping map entry: ${JSON.stringify(entry)}`);
        }
    }
    return JSON.stringify(map, null, 2);
}
/**
* Determines the correct identifier key based on the LP type or data structure.
*/
const getIdentifier = (entry) => {
    if (!entry.lpData)
        return undefined;
    // Check based on lpType first for clarity
    switch (entry.lpData.lpType) {
        case types_1.LPType.GAMMA:
            return entry.lpData.hypervisor;
        case types_1.LPType.ICHI:
            return entry.lpData.vault;
        case types_1.LPType.UNIV2:
            return entry.lpData.lpAddress;
        case types_1.LPType.SOLIDLY:
            return entry.lpData.lpAddress;
        // Add cases for other LP types (STEER, SOLIDLY, etc.)
        // case LPType.STEER:
        //     return (entry.lpData as SteerLPInfo).lpAddress;
        default:
            // Fallback checks for structure if lpType is missing or unknown
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
    }
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
                            const filenameBase = path_1.default.basename(entryFile.name, '.ts'); // e.g., 'gamma', 'univ2'
                            const lpType = getLPTypeFromFilenameBase(filenameBase);
                            if (lpType === null) {
                                console.warn(`Skipping unknown manual LP type file: ${entryFile.name} in ${chainName}/${projectName}`);
                                continue;
                            }
                            // Determine output path based on lpType
                            const outputFilename = `${lpType.toLowerCase()}.json`; // e.g., gamma.json, univ2.json
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
                                lpType
                            };
                            // Use the unified task creator for all LP types found via manual files
                            builderTasksForProject.push(createBuilderTask(ctx));
                        }
                    }
                    catch (error) {
                        if (error.code !== 'ENOENT') {
                            console.error(`Error reading entry files for ${chainName}/${projectName}:`, error);
                        } // Ignore ENOENT
                    }
                    // Add project task group if builders were found
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
                } // Ignore ENOENT if manual chain dir doesn't exist
            }
            // Add chain task group if projects were found
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
// --- Unified Task Creator Function ---
/**
 * Creates a Listr task for a specific builder based on context.
 */
function createBuilderTask(ctx) {
    const lpTypeKey = getLPTypeKey(ctx.lpType) ?? 'UnknownType';
    const outputFilenameBase = path_1.default.basename(ctx.outputPath);
    const title = `Building ${lpTypeKey} from ${ctx.entryFileName}`;
    return {
        title: title,
        task: async (taskCtx, task) => {
            try {
                let existingData = {};
                const existingLpAddresses = new Set(); // Needed for UniV2
                // Read existing data (common step)
                try {
                    const existingContent = await promises_1.default.readFile(ctx.outputPath, 'utf-8');
                    existingData = JSON.parse(existingContent);
                    if (typeof existingData === 'object' && existingData !== null && !Array.isArray(existingData)) {
                        // Populate existing addresses for UniV2 check
                        if (ctx.lpType === types_1.LPType.UNIV2) {
                            Object.keys(existingData).forEach(key => {
                                if (key.startsWith('0x')) { // Basic check for address format
                                    existingLpAddresses.add(key);
                                }
                            });
                        }
                        // <-- Also populate for Solidly
                        if (ctx.lpType === types_1.LPType.SOLIDLY) {
                            Object.keys(existingData).forEach(key => {
                                if (key.startsWith('0x')) { // Basic check for address format
                                    existingLpAddresses.add(key);
                                }
                            });
                        }
                    }
                    else {
                        task.title = `Existing file ${outputFilenameBase} invalid. Starting fresh.`;
                        existingData = {};
                    }
                }
                catch (error) {
                    if (error.code !== 'ENOENT') {
                        console.warn(`Warn: Error reading existing file ${outputFilenameBase}: ${error.message}. Starting fresh.`);
                    }
                    existingData = {}; // Start fresh if no file or read error
                }
                let processedData = [];
                // Call the appropriate builder
                switch (ctx.lpType) {
                    case types_1.LPType.GAMMA:
                    case types_1.LPType.ICHI:
                        // Builders requiring manualEntries array
                        task.output = 'Importing manual entries...';
                        const manualEntriesModule = await Promise.resolve(`${ctx.manualEntryPath}`).then(s => __importStar(require(s)));
                        const entriesKey = Object.keys(manualEntriesModule).find(key => key.endsWith('Entries'));
                        if (!entriesKey) {
                            throw new Error(`Could not find *Entries export in ${ctx.manualEntryPath}`);
                        }
                        const manualEntries = manualEntriesModule[entriesKey];
                        if (ctx.lpType === types_1.LPType.GAMMA) {
                            task.output = 'Fetching Gamma data...';
                            processedData = await (0, gamma_builder_1.buildGamma)(manualEntries, ctx.chainId, ctx.project, task);
                        }
                        else if (ctx.lpType === types_1.LPType.ICHI) {
                            task.output = 'Fetching Ichi data...';
                            processedData = await (0, ichi_builder_1.buildIchi)(manualEntries, ctx.chainId, ctx.project, task);
                        }
                        break;
                    case types_1.LPType.UNIV2:
                        // UniV2 builder doesn't need manualEntries, uses existingLpAddresses
                        task.output = `Found ${existingLpAddresses.size} existing LPs. Discovering new pairs...`;
                        processedData = await (0, uniV2_builder_1.buildUniV2)(ctx.chainId, ctx.project, existingLpAddresses, task);
                        break;
                    case types_1.LPType.SOLIDLY:
                        // Solidly builder also uses existingLpAddresses
                        task.output = `Found ${existingLpAddresses.size} existing LPs. Discovering new pairs...`;
                        processedData = await (0, solidly_builder_1.buildSolidly)(ctx.chainId, ctx.project, existingLpAddresses, task);
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
                    await promises_1.default.mkdir(path_1.default.dirname(ctx.outputPath), { recursive: true });
                    await promises_1.default.writeFile(ctx.outputPath, outputContent);
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): Success (${addedCount} new)`;
                }
                else if (Object.keys(finalMap).length > 0 && Object.keys(existingData).length === Object.keys(finalMap).length) {
                    // This covers cases where no new items were added, including UniV2 finding no new pairs
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): No changes`;
                    task.skip('No new data found or added.');
                }
                else if (Object.keys(finalMap).length === 0) {
                    // This covers cases where build resulted in empty data (e.g., UniV2 factory has 0 pairs)
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): No data found`;
                    task.skip('Builder returned no data.');
                }
                else {
                    // Fallback for unexpected scenarios, potentially indicating an issue
                    task.title = `✓ ${lpTypeKey} (${outputFilenameBase}): Completed (Status unclear)`;
                    task.skip('Merge complete, but outcome state unclear.');
                }
            }
            catch (error) {
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
function mergeData(existingData, processedData, lpType) {
    const finalMap = { ...existingData };
    let addedCount = 0;
    if (!Array.isArray(processedData) || !processedData.every(item => typeof item === 'object' && item !== null)) {
        console.warn(`Warn: Processed data for LPType ${getLPTypeKey(lpType)} is not a valid ZapInfo array. Skipping merge.`);
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
            else {
                // Optional: Add update logic here if needed, for now, we skip updates
            }
        }
        else {
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
