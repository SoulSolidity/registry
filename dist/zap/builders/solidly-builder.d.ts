import { Address } from 'viem';
import { Project, ZapInfo } from '../types';
import { ListrTaskWrapper } from 'listr2';
import { ChainId } from '../../types/enums';
/**
 * Fetches Solidly style LP information directly from the factory contract.
 *
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param existingLpAddresses Set of LP addresses already processed and present in the output file.
 * @param task The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo for newly discovered LPs.
 */
export declare const buildSolidly: (chainId: ChainId, project: Project, existingLpAddresses: Set<Address>, task: ListrTaskWrapper<any, any, any>) => Promise<ZapInfo[]>;
