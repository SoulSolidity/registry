import { IchiEntry, Project, ZapInfo } from '../types';
import { ListrTaskWrapper } from 'listr2';
import { ChainId } from '../../types/enums';
/**
 * Fetches on-chain data for Gamma LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Gamma entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of GammaLPInfo.
 */
export declare const buildIchi: (manualEntries: IchiEntry[], chainId: ChainId, project: Project, parentTask: ListrTaskWrapper<any, any, any>) => Promise<ZapInfo[]>;
