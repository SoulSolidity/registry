/**
 * ICHI data retriever
 */
import { BaseDataRetriever } from './base-retriever';
import { ChainId, IchiEntry, IchiMetadata } from '../types';
/**
 * Data retriever for ICHI LPs
 */
export declare class IchiDataRetriever extends BaseDataRetriever<IchiEntry, IchiMetadata> {
    private underlyingDex;
    /**
     * Create a new ICHI data retriever
     * @param chainId Chain ID
     * @param underlyingDex Underlying DEX (e.g., 'Lynex', 'UniswapV3', etc.)
     */
    constructor(chainId: ChainId, underlyingDex: string);
    /**
     * Fetch token metadata
     * @param address Token address
     * @returns Token metadata
     */
    private fetchTokenMetadata;
    /**
     * Fetch ICHI LP metadata
     * @param entry ICHI entry
     * @returns ICHI metadata
     */
    fetchMetadata(entry: IchiEntry): Promise<IchiMetadata>;
}
