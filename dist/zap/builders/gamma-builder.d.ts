import { GammaEntry, Project, ZapInfo } from '../types';
import { ListrTaskWrapper } from 'listr2';
import { ChainId } from '../../types/enums';
/**
 * Builds data for a single Gamma entry
 *
 * @param entry The Gamma entry to build data for
 * @param chainId The chain ID
 * @param project The project identifier
 * @returns Promise resolving to ZapInfo
 */
export declare const buildSingleGammaEntry: (entry: GammaEntry, chainId: ChainId, project: Project) => Promise<ZapInfo>;
/**
 * Fetches on-chain data for Gamma LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Gamma entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of GammaLPInfo.
 */
export declare const buildGamma: (manualEntries: GammaEntry[], chainId: ChainId, project: Project, parentTask: ListrTaskWrapper<any, any, any>) => Promise<ZapInfo[]>;
