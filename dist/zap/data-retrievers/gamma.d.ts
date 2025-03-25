/**
 * Gamma data retriever
 */
import { BaseDataRetriever } from './base-retriever';
import { ChainId, GammaEntry, GammaMetadata, Project } from '../types';
/**
 * Data retriever for Gamma LPs
 */
export declare class GammaDataRetriever extends BaseDataRetriever<GammaEntry, GammaMetadata> {
    private projectName;
    /**
     * Create a new Gamma data retriever
     * @param chainId Chain ID
     * @param projectName Project name (e.g., 'uniswap', 'pancakeswap', etc.)
     */
    constructor(chainId: ChainId, projectName: Project);
    /**
     * Fetch token metadata using multicall
     * @param addresses Array of token addresses
     * @returns Array of token metadata
     */
    private fetchTokensMetadata;
    /**
     * Fetch Gamma LP metadata
     * @param entry Gamma entry
     * @returns Gamma metadata
     */
    fetchMetadata(entry: GammaEntry): Promise<GammaMetadata>;
    /**
     * Fetch metadata for multiple entries at once using multicall batching
     * @param entries Entries to fetch metadata for
     * @returns Metadata for the entries
     */
    fetchAllMetadata(entries: GammaEntry[]): Promise<GammaMetadata[]>;
}
