/**
 * Base data retriever interface
 */
import { ChainId } from '../types';
import { getClient } from './utils';
import { PublicClient } from 'viem';

/**
 * Base class for all data retrievers
 */
export abstract class BaseDataRetriever<T, U> {
  protected client: PublicClient;
  protected chainId: ChainId;
  
  /**
   * Create a new data retriever
   * @param chainId Chain ID
   */
  constructor(chainId: ChainId) {
    this.chainId = chainId;
    this.client = getClient(chainId);
  }
  
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
  async fetchAllMetadata(entries: T[]): Promise<U[]> {
    const results: U[] = [];
    
    // Process entries in batches to avoid hitting RPC limits
    const batchSize = 5; // Process 5 entries at a time
    
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      
      // Process batch in parallel
      const batchResults = await Promise.all(
        batch.map(entry => this.fetchMetadata(entry).catch(error => {
          console.error(`Error fetching metadata:`, error);
          return null;
        }))
      );
      
      // Filter out failed results
      results.push(...batchResults.filter(Boolean) as U[]);
    }
    
    return results;
  }
} 