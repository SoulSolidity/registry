import { ProtocolEntry, Project, ZapInfo } from '../types';
import { ListrTaskWrapper } from 'listr2';
import { ChainId } from '../../types/enums';
/**
 * Builds data for ApeBond bonds, supporting different LP types.
 *
 * @param manualEntries Array of manual bond entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo.
 */
export declare const buildApeBond: (manualEntries: ProtocolEntry[], chainId: ChainId, project: Project, parentTask: ListrTaskWrapper<any, any, any>) => Promise<ZapInfo[]>;
