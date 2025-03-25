import { ZapInfo } from '../types/types';
import { ApeBondEntry } from '../types/types';
/**
 * Factory function for ApeBond ZapInfo
 * @param name Bond name
 * @param address Bond address
 * @param toToken Destination token address
 * @returns ZapInfo object
 */
export declare function createApeBondZapInfo(name: string, address: `0x${string}`, toToken: `0x${string}`): ZapInfo;
/**
 * Transforms an array of ApeBond entries into a Record of ZapInfo objects
 * @param entries Array of ApeBond entries
 * @returns Record of ZapInfo objects keyed by address
 */
export declare function createApeBondZapInfoMap(entries: ApeBondEntry[]): Record<`0x${string}`, ZapInfo>;
