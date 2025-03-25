"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const common_1 = require("./types/common");
const builders_1 = require("./builders");
const manual_entries_1 = require("./manual-entries");
const consolidate_1 = require("./consolidate");
/**
 * Main build script to generate JSON files for all supported projects
 */
async function build() {
    console.log('Starting build process...');
    // Get all chain folders
    const chainsDir = path_1.default.join(__dirname, 'manual-entries');
    const chainFolders = fs_1.default.readdirSync(chainsDir)
        .filter(folder => fs_1.default.statSync(path_1.default.join(chainsDir, folder)).isDirectory());
    console.log(`Found ${chainFolders.length} chain folders:`, chainFolders);
    // Process each chain
    for (const chainFolder of chainFolders) {
        try {
            const chainId = getChainIdFromFolder(chainFolder);
            if (!chainId) {
                console.warn(`Skipping unknown chain folder: ${chainFolder}`);
                continue;
            }
            console.log(`Processing chain: ${chainFolder} (ID: ${chainId})`);
            // Get the chain directory path
            const chainDirPath = path_1.default.join(chainsDir, chainFolder);
            // Get all project folders inside the chain directory
            const projectFolders = fs_1.default.readdirSync(chainDirPath)
                .filter(folder => fs_1.default.statSync(path_1.default.join(chainDirPath, folder)).isDirectory());
            console.log(`Found ${projectFolders.length} project folders for chain ${chainFolder}`);
            // Process each project
            for (const projectFolder of projectFolders) {
                try {
                    console.log(`Processing project: ${projectFolder}`);
                    // Get project directory path
                    const projectDirPath = path_1.default.join(chainDirPath, projectFolder);
                    // Get all entry files in the project directory
                    const entryFiles = fs_1.default.readdirSync(projectDirPath)
                        .filter(file => file.endsWith('.ts') && !file.endsWith('index.ts'));
                    console.log(`Found ${entryFiles.length} entry files for project ${projectFolder}`);
                    // Process each entry file
                    for (const entryFile of entryFiles) {
                        // Extract LP type from file name (e.g., gamma.ts -> gamma)
                        const lpType = path_1.default.basename(entryFile, '.ts');
                        console.log(`Processing ${lpType} entries for ${projectFolder}`);
                        // Get entries from chain
                        const allEntries = (0, manual_entries_1.getEntriesForChain)(chainId);
                        // Filter entries based on project and file name
                        // This assumes entries are exported with a pattern like: projectNameLpTypeEntries
                        // e.g., lynexGammaEntries, lynexIchiEntries
                        const variableName = `${projectFolder.toLowerCase()}${lpType.charAt(0).toUpperCase() + lpType.slice(1)}Entries`;
                        // Find entries from the imported entries that match the current project and LP type
                        const entries = allEntries.filter(entry => {
                            const entryName = entry.name.toLowerCase();
                            return entryName.includes(projectFolder.toLowerCase()) && entryName.includes(lpType.toLowerCase());
                        });
                        if (entries.length === 0) {
                            console.warn(`No entries found for ${projectFolder} ${lpType}`);
                            continue;
                        }
                        console.log(`Building for project: ${projectFolder} with ${entries.length} ${lpType} entries`);
                        if (!Object.values(common_1.Project).includes(projectFolder)) {
                            console.log(`${projectFolder} is not a valid Project.`);
                        }
                        // Process the entries
                        try {
                            switch (lpType.toLowerCase()) {
                                case 'gamma':
                                    // Create the gamma builder with all required arguments
                                    const gammaBuilder = new builders_1.GammaBuilder(chainId, projectFolder, entries);
                                    await gammaBuilder.generateMetadata();
                                    break;
                                case 'ichi':
                                    // Create the ichi builder with all required arguments
                                    const ichiBuilder = new builders_1.IchiBuilder(chainId, projectFolder, entries, projectFolder);
                                    await ichiBuilder.generateMetadata();
                                    break;
                                default:
                                    console.warn(`No builder available for LP type: ${lpType}`);
                            }
                        }
                        catch (error) {
                            console.error(`Error building for project ${projectFolder} ${lpType}:`, error);
                        }
                    }
                }
                catch (error) {
                    console.error(`Error processing project ${projectFolder}:`, error);
                }
            }
        }
        catch (error) {
            console.error(`Error processing chain ${chainFolder}:`, error);
        }
    }
    console.log('Build process completed!');
    // Run consolidation to create the all-in-one JSON file
    console.log('Starting consolidation process...');
    try {
        const outputPath = await (0, consolidate_1.consolidateZapData)();
        console.log(`Consolidation completed. Output file: ${outputPath}`);
    }
    catch (error) {
        console.error('Consolidation failed:', error);
    }
}
/**
 * Helper function to convert folder name to ChainId
 */
function getChainIdFromFolder(folderName) {
    switch (folderName.toLowerCase()) {
        case 'arbitrum':
            return common_1.ChainId.ARBITRUM;
        case 'avalanche':
            return common_1.ChainId.AVALANCHE;
        case 'base':
            return common_1.ChainId.BASE;
        case 'bnb':
            return common_1.ChainId.BNB;
        case 'linea':
            return common_1.ChainId.LINEA;
        case 'polygon':
            return common_1.ChainId.POLYGON;
        default:
            return undefined;
    }
}
// Run the build process
if (require.main === module) {
    build()
        .then(() => {
        console.log('Build and consolidation completed successfully');
        process.exit(0);
    })
        .catch(error => {
        console.error('Build failed:', error);
        process.exit(1);
    });
}
