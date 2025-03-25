/**
 * Base data retriever interface
 */
import { ChainId } from '../types';
import { PublicClient } from 'viem';
/**
 * Base class for all data retrievers
 */
export declare abstract class BaseDataRetriever<T, U> {
    protected client: PublicClient;
    protected chainId: ChainId;
    /**
     * Create a new data retriever
     * @param chainId Chain ID
     */
    constructor(chainId: ChainId);
    /**
     * Fetch metadata for an entry
     * @param entry Entry to fetch metadata for
     * @returns Metadata for the entry
     */
    abstract fetchMetadata(entry: T): Promise<U>;
    /**
     * Fetch metadata for multiple entries
     * This method can be overridden by specific retrievers to implement
     * more efficient batch processing using multicall
     *
     * @param entries Entries to fetch metadata for
     * @returns Metadata for the entries
     */
    fetchAllMetadata(entries: T[]): Promise<U[]>;
}
