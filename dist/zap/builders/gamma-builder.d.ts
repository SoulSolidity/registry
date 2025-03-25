/**
 * Builder for Gamma LPs
 */
import { ChainId, GammaEntry, Project, ZapInfo } from '../types';
/**
 * Builder for Gamma LPs
 */
export declare class GammaBuilder {
    private chainId;
    private projectName;
    private entries;
    private dataRetriever;
    /**
     * Create a new Gamma builder
     * @param chainId Chain ID
     * @param projectName Project name
     * @param entries Gamma entries
     */
    constructor(chainId: ChainId, projectName: Project, entries: GammaEntry[]);
    /**
     * Generate ZapInfo for a Gamma entry
     * @param entry Gamma entry
     * @returns ZapInfo object
     */
    private buildZapInfo;
    /**
     * Generate metadata for all entries in a format that matches the final consolidated structure
     */
    generateMetadata(): Promise<void>;
    /**
     * Build ZapInfo for all entries
     * @returns Map of address to ZapInfo
     */
    build(): Promise<Record<string, ZapInfo>>;
}
