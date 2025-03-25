/**
 * Export all manual entries
 */

import { ChainId } from '../types/common';
import * as arbitrum from './arbitrum';
import * as avalanche from './avalanche';
import * as base from './base';
import * as bnb from './bnb';
import * as linea from './linea';
import * as polygon from './polygon';

/**
 * Gets all manual entries for a specific chain
 * @param chainId The chain ID to get entries for
 * @returns Array of manual entries for the chain
 */
export function getEntriesForChain(chainId: ChainId): any[] {
  switch (chainId) {
    case ChainId.ARBITRUM:
      return Object.values(arbitrum).flat();
    case ChainId.AVALANCHE:
      return Object.values(avalanche).flat();
    case ChainId.BASE:
      return Object.values(base).flat();
    case ChainId.BNB:
      return Object.values(bnb).flat();
    case ChainId.LINEA:
      return Object.values(linea).flat();
    case ChainId.POLYGON:
      return Object.values(polygon).flat();
    default:
      console.warn(`No entries found for chain ID: ${chainId}`);
      return [];
  }
}

// Export all chain-specific entries
export { arbitrum, avalanche, base, bnb, linea, polygon }; 