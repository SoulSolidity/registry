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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consolidateZapData = consolidateZapData;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const common_1 = require("./types/common");
/**
 * This script consolidates all auto-generated zap data into a single file with structure:
 * {<chainId>:{<lpAddress>:<allInfoObject>}}
 */
async function consolidateZapData() {
    try {
        // Path to the auto-generated directory
        const autoGenDir = path.join(__dirname, 'auto-generated');
        // Check if auto-generated directory exists
        if (!fs.existsSync(autoGenDir)) {
            console.warn('Auto-generated directory not found:', autoGenDir);
            return;
        }
        // Initialize the consolidated data structure
        const consolidatedData = {};
        // Initialize all chain IDs
        Object.values(common_1.ChainId).filter(id => typeof id === 'number').forEach(chainId => {
            consolidatedData[chainId.toString()] = {};
        });
        // Get all chain directories
        const chainDirs = fs.readdirSync(autoGenDir);
        // Process each chain directory
        for (const chainDir of chainDirs) {
            // Convert chain directory name to ChainId
            let chainId;
            // Try to find the chain ID by name
            for (const [id, name] of Object.entries(common_1.ChainNames)) {
                if (name.toLowerCase() === chainDir.toLowerCase()) {
                    chainId = parseInt(id);
                    break;
                }
            }
            if (!chainId) {
                console.warn(`No chain ID mapping found for: ${chainDir}`);
                continue;
            }
            console.log(`Processing chain: ${chainDir} (ID: ${chainId})`);
            // Full path to the chain directory
            const chainPath = path.join(autoGenDir, chainDir);
            // Skip if it's not a directory or is the allLPs.json file
            if (!fs.statSync(chainPath).isDirectory()) {
                continue;
            }
            // Get all project directories in this chain
            const projectDirs = fs.readdirSync(chainPath);
            // Process each project directory
            for (const projectDir of projectDirs) {
                console.log(`Processing project: ${projectDir}`);
                // Full path to the project directory
                const projectPath = path.join(chainPath, projectDir);
                if (!fs.statSync(projectPath).isDirectory()) {
                    continue;
                }
                // Get all metadata files
                const metadataFiles = fs.readdirSync(projectPath)
                    .filter(file => file.endsWith('-metadata.json'));
                // Process each metadata file
                for (const metadataFile of metadataFiles) {
                    const lpType = metadataFile.split('-')[0]; // e.g., "gamma" from "gamma-metadata.json"
                    console.log(`Processing ${lpType} metadata for ${projectDir}`);
                    // Read the metadata file - now in format { address: { lpInfo } }
                    const filePath = path.join(projectPath, metadataFile);
                    try {
                        const fileContent = fs.readFileSync(filePath, 'utf8');
                        const metadataEntries = JSON.parse(fileContent);
                        // Since the metadata is already in the expected format, we can directly add it
                        // to the consolidated data without additional processing
                        Object.entries(metadataEntries).forEach(([lpAddress, lpInfo]) => {
                            consolidatedData[chainId.toString()][lpAddress] = lpInfo;
                        });
                        console.log(`Added ${Object.keys(metadataEntries).length} entries from ${metadataFile}`);
                    }
                    catch (error) {
                        console.error(`Error processing ${filePath}:`, error);
                    }
                }
            }
        }
        // Write the consolidated data to a JSON file in the auto-generated directory
        const outputPath = path.join(autoGenDir, 'allLPs.json');
        // Ensure the directory exists
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }
        fs.writeFileSync(outputPath, JSON.stringify(consolidatedData, null, 2));
        // Also copy the file to the data directory for compatibility with existing code
        const dataDir = path.join(__dirname, '..', '..', 'data');
        const dataOutputPath = path.join(dataDir, 'allLPs.json');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.copyFileSync(outputPath, dataOutputPath);
        console.log(`Successfully consolidated all LP data to ${outputPath}`);
        console.log(`Also copied to ${dataOutputPath} for compatibility`);
        return outputPath;
    }
    catch (error) {
        console.error('Consolidation failed:', error);
        throw error;
    }
}
// Run the consolidation if this script is executed directly
if (require.main === module) {
    consolidateZapData()
        .then(() => {
        console.log('Consolidation completed successfully');
        process.exit(0);
    })
        .catch(error => {
        console.error('Consolidation failed:', error);
        process.exit(1);
    });
}
