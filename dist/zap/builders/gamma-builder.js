"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GammaBuilder = void 0;
/**
 * Builder for Gamma LPs
 */
const types_1 = require("../types");
const data_retrievers_1 = require("../data-retrievers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
/**
 * Builder for Gamma LPs
 */
class GammaBuilder {
    /**
     * Create a new Gamma builder
     * @param chainId Chain ID
     * @param projectName Project name
     * @param entries Gamma entries
     */
    constructor(chainId, projectName, entries) {
        this.chainId = chainId;
        this.projectName = projectName;
        this.entries = entries;
        this.dataRetriever = new data_retrievers_1.GammaDataRetriever(chainId, projectName);
    }
    /**
     * Generate ZapInfo for a Gamma entry
     * @param entry Gamma entry
     * @returns ZapInfo object
     */
    async buildZapInfo(entry) {
        const projectConfig = (0, config_1.getProjectConfig)(this.chainId, this.projectName);
        if (!projectConfig || !projectConfig.gamma) {
            throw new Error(`No Gamma configuration found for ${this.projectName} on chain ${this.chainId}`);
        }
        return {
            name: entry.name,
            icon: projectConfig.icon,
            lpData: {
                lpType: types_1.LPType.GAMMA,
                hypervisor: entry.address,
                uniProxy: projectConfig.gamma.uniProxyAddress,
            },
        };
    }
    /**
     * Generate metadata for all entries in a format that matches the final consolidated structure
     */
    async generateMetadata() {
        console.log(`Generating metadata for ${this.entries.length} Gamma LPs on chain ${this.chainId} for ${this.projectName}...`);
        // Fetch raw metadata first
        const metadataArray = await this.dataRetriever.fetchAllMetadata(this.entries);
        // Get project configuration
        const projectConfig = (0, config_1.getProjectConfig)(this.chainId, this.projectName);
        if (!projectConfig || !projectConfig.gamma) {
            throw new Error(`No Gamma configuration found for ${this.projectName} on chain ${this.chainId}`);
        }
        // Create the metadata directly in the final format needed for consolidation
        // Instead of having an array of entries, we'll have a map of address -> lpInfo object
        const finalMetadata = {};
        for (const metadata of metadataArray) {
            const pairName = `${metadata.token0.symbol}-${metadata.token1.symbol}`;
            const displayName = `${this.projectName} Gamma (${pairName})`;
            // Format matches exactly what we need in the final allLPs.json
            finalMetadata[metadata.poolAddress] = {
                name: displayName,
                icon: projectConfig.icon,
                toToken0: metadata.token0,
                toToken1: metadata.token1,
                lpData: {
                    lpType: types_1.LPType.GAMMA.toLowerCase(),
                    hypervisor: metadata.poolAddress,
                    uniProxy: metadata.uniProxy
                }
            };
        }
        // Ensure the directory exists
        const dirPath = path_1.default.join(process.cwd(), 'src', 'zap', 'auto-generated', types_1.ChainId[this.chainId].toLowerCase(), this.projectName);
        fs_1.default.mkdirSync(dirPath, { recursive: true });
        // Write the metadata file - this is now in the exact format needed for consolidation
        fs_1.default.writeFileSync(path_1.default.join(dirPath, 'gamma-metadata.json'), JSON.stringify(finalMetadata, null, 2));
        console.log(`Generated metadata for ${Object.keys(finalMetadata).length} Gamma LPs, ready for consolidation`);
    }
    /**
     * Build ZapInfo for all entries
     * @returns Map of address to ZapInfo
     */
    async build() {
        console.log(`Building ZapInfo for ${this.entries.length} Gamma LPs on chain ${this.chainId} for ${this.projectName}...`);
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
exports.GammaBuilder = GammaBuilder;
