import { IchiEntry, Project, ZapInfo } from '../types';
import { ListrTaskWrapper } from 'listr2';
import { ChainId } from '../../types/enums';
/**
 * Builds data for a single Ichi entry
 *
 * @param entry The Ichi entry to build data for
 * @param chainId The chain ID
 * @param project The project identifier
 * @returns Promise resolving to ZapInfo
 */
export declare const buildSingleIchiEntry: (entry: IchiEntry, chainId: ChainId, project: Project) => Promise<ZapInfo>;
/**
 * Fetches on-chain data for Ichi LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Ichi entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo.
 */
export declare const buildIchi: (manualEntries: IchiEntry[], chainId: ChainId, project: Project, parentTask: ListrTaskWrapper<any, any, any>) => Promise<ZapInfo[]>;
