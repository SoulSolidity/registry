/**
 * Builder for ICHI LPs
 */
import { ChainId, IchiEntry, Project, ZapInfo } from '../types';
/**
 * Builder for ICHI LPs
 */
export declare class IchiBuilder {
    private chainId;
    private projectName;
    private entries;
    private underlyingDex;
    private dataRetriever;
    /**
     * Create a new ICHI builder
     * @param chainId Chain ID
     * @param projectName Project name
     * @param entries ICHI entries
     * @param underlyingDex Underlying DEX name
     */
    constructor(chainId: ChainId, projectName: Project, entries: IchiEntry[], underlyingDex: string);
    /**
     * Generate ZapInfo for an ICHI entry
     * @param entry ICHI entry
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
