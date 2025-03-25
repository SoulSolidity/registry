"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataRetriever = void 0;
const utils_1 = require("./utils");
/**
 * Base class for all data retrievers
 */
class BaseDataRetriever {
    /**
     * Create a new data retriever
     * @param chainId Chain ID
     */
    constructor(chainId) {
        this.chainId = chainId;
        this.client = (0, utils_1.getClient)(chainId);
    }
    /**
     * Fetch metadata for multiple entries
     * This method can be overridden by specific retrievers to implement
     * more efficient batch processing using multicall
     *
     * @param entries Entries to fetch metadata for
     * @returns Metadata for the entries
     */
    async fetchAllMetadata(entries) {
        const results = [];
        // Process entries in batches to avoid hitting RPC limits
        const batchSize = 5; // Process 5 entries at a time
        for (let i = 0; i < entries.length; i += batchSize) {
            const batch = entries.slice(i, i + batchSize);
            // Process batch in parallel
            const batchResults = await Promise.all(batch.map(entry => this.fetchMetadata(entry).catch(error => {
                console.error(`Error fetching metadata:`, error);
                return null;
            })));
            // Filter out failed results
            results.push(...batchResults.filter(Boolean));
        }
        return results;
    }
}
exports.BaseDataRetriever = BaseDataRetriever;
