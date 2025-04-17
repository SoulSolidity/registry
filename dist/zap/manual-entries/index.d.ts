/**
 * Export all manual entries
 */
import { ChainId } from '../../types/enums';
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
export declare function getEntriesForChain(chainId: ChainId): any[];
export { arbitrum, avalanche, base, bnb, linea, polygon };
