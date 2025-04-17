import { createPublicClient, http, PublicClient } from 'viem';
import { ChainId } from '../../types/enums';
import { chainConfigs } from '../config/chains';

/**
 * Creates a Viem public client for the given chain ID.
 */
export const getClient = (chainId: ChainId): PublicClient => {
  const chainConfig = chainConfigs[chainId];
  if (!chainConfig) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }
  return createPublicClient({
    chain: {
      id: chainId,
      name: chainConfig.name,
      nativeCurrency: chainConfig.nativeCurrency,
      rpcUrls: {
        default: { http: [chainConfig.rpcUrl] },
        public: { http: [chainConfig.rpcUrl] },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: chainConfig.blockExplorerUrl },
      },
      contracts: {
        multicall3: {
          address: chainConfig.multicallAddress,
        },
      },
    },
    transport: http(),
  });
}; 