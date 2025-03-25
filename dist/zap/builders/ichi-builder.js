"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IchiBuilder = void 0;
/**
 * Builder for ICHI LPs
 */
const types_1 = require("../types");
const data_retrievers_1 = require("../data-retrievers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
/**
 * Builder for ICHI LPs
 */
class IchiBuilder {
    /**
     * Create a new ICHI builder
     * @param chainId Chain ID
     * @param projectName Project name
     * @param entries ICHI entries
     * @param underlyingDex Underlying DEX name
     */
    constructor(chainId, projectName, entries, underlyingDex) {
        this.chainId = chainId;
        this.projectName = projectName;
        this.entries = entries;
        this.underlyingDex = underlyingDex;
        this.dataRetriever = new data_retrievers_1.IchiDataRetriever(chainId, underlyingDex);
    }
    /**
     * Generate ZapInfo for an ICHI entry
     * @param entry ICHI entry
     * @returns ZapInfo object
     */
    async buildZapInfo(entry) {
        const projectConfig = (0, config_1.getProjectConfig)(this.chainId, this.projectName);
        if (!projectConfig) {
            throw new Error(`No project configuration found for ${this.projectName} on chain ${this.chainId}`);
        }
        return {
            name: entry.name,
            icon: projectConfig.icon,
            lpData: {
                lpType: types_1.LPType.ICHI,
                vault: entry.address,
                underlyingDex: entry.underlyingDex || this.underlyingDex,
            },
        };
    }
    /**
     * Generate metadata for all entries in a format that matches the final consolidated structure
     */
    async generateMetadata() {
        console.log(`Generating metadata for ${this.entries.length} ICHI LPs on chain ${this.chainId} for ${this.projectName}...`);
        // Fetch metadata for all entries
        const metadataArray = await this.dataRetriever.fetchAllMetadata(this.entries);
        // Get project configuration
        const projectConfig = (0, config_1.getProjectConfig)(this.chainId, this.projectName);
        if (!projectConfig) {
            throw new Error(`No project configuration found for ${this.projectName} on chain ${this.chainId}`);
        }
        // Create the metadata directly in the final format needed for consolidation
        // Instead of having an array of entries, we'll have a map of address -> lpInfo object
        const finalMetadata = {};
        for (const metadata of metadataArray) {
            const pairName = `${metadata.token0.symbol}-${metadata.token1.symbol}`;
            const displayName = `${this.projectName} Ichi (${pairName})`;
            // Format matches exactly what we need in the final allLPs.json
            finalMetadata[metadata.vaultAddress] = {
                name: displayName,
                icon: projectConfig.icon,
                lpData: {
                    lpType: types_1.LPType.ICHI.toLowerCase(),
                    vault: metadata.vaultAddress,
                    underlyingDex: this.underlyingDex
                }
            };
        }
        // Ensure the directory exists
        const dirPath = path_1.default.join(process.cwd(), 'src', 'zap', 'auto-generated', types_1.ChainId[this.chainId].toLowerCase(), this.projectName);
        fs_1.default.mkdirSync(dirPath, { recursive: true });
        // Write the metadata file - this is now in the exact format needed for consolidation
        fs_1.default.writeFileSync(path_1.default.join(dirPath, 'ichi-metadata.json'), JSON.stringify(finalMetadata, null, 2));
        console.log(`Generated metadata for ${Object.keys(finalMetadata).length} ICHI LPs, ready for consolidation`);
    }
    /**
     * Build ZapInfo for all entries
     * @returns Map of address to ZapInfo
     */
    async build() {
        console.log(`Building ZapInfo for ${this.entries.length} ICHI LPs on chain ${this.chainId} for ${this.projectName}...`);
        const result = {};
        for (const entry of this.entries) {
            try {
                const zapInfo = await this.buildZapInfo(entry);
                result[entry.address] = zapInfo;
            }
            catch (error) {
                console.error(`Error building ZapInfo for ${entry.address}:`, error);
            }
        }
        return result;
    }
}
exports.IchiBuilder = IchiBuilder;
