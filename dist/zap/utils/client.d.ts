import { PublicClient } from 'viem';
import { ChainId } from '../types';
/**
 * Creates a Viem public client for the given chain ID.
 */
export declare const getClient: (chainId: ChainId) => PublicClient;
