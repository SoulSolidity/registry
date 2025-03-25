/**
 * Viem client utility for efficient data retrieval
 */
import { chainConfigs } from '../../config';
import { ChainId } from '../../types';
import { createPublicClient, http, PublicClient, Abi } from 'viem';
import { 
  mainnet, bsc, polygon, arbitrum, base, 
  avalanche, linea
} from 'viem/chains';

// Map ChainId to viem chain objects 
const chainMap: Partial<Record<ChainId, any>> = {
  [ChainId.ETHEREUM]: mainnet,
  [ChainId.BNB]: bsc,
  [ChainId.POLYGON]: polygon,
  [ChainId.ARBITRUM]: arbitrum,
  [ChainId.BASE]: base,
  [ChainId.AVALANCHE]: avalanche,
  [ChainId.LINEA]: linea,
  // Add more chains as needed
};

/**
 * Get a viem public client for a specific chain
 * @param chainId Chain ID
 * @returns PublicClient
 */
export function getClient(chainId: ChainId): PublicClient {
  const chainConfig = chainConfigs[chainId];

  if (!chainConfig) {
    throw new Error(`Chain configuration not found for chain ID ${chainId}`);
  }

  const chain = chainMap[chainId];
  
  // For chains that aren't in the viem/chains package, create a custom chain object
  if (!chain) {
    console.warn(`Using custom chain configuration for chain ID ${chainId}`);
    
    const customChain = {
      id: Number(chainId),
      name: chainConfig.name || `Chain ${chainId}`,
      network: chainConfig.name?.toLowerCase() || `chain-${chainId}`,
      nativeCurrency: {
        name: chainConfig.nativeCurrency?.name || 'Ether',
        symbol: chainConfig.nativeCurrency?.symbol || 'ETH',
        decimals: chainConfig.nativeCurrency?.decimals || 18,
      },
      rpcUrls: {
        default: {
          http: [chainConfig.rpcUrl],
        },
        public: {
          http: [chainConfig.rpcUrl],
        },
      },
    };
    
    return createPublicClient({
      chain: customChain as any,
      transport: http(chainConfig.rpcUrl),
    }) as PublicClient;
  }
  
  return createPublicClient({
    chain,
    transport: http(chainConfig.rpcUrl),
  }) as PublicClient;
}

/**
 * Common ABIs for different contract types
 */
export const ABIS = {
  ERC20: [
    {
      name: 'name',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'string' }],
    },
    {
      name: 'symbol',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'string' }],
    },
    {
      name: 'decimals',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint8' }],
    },
    {
      name: 'totalSupply',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint256' }],
    },
  ] as const,
  UNISWAP_V2_PAIR: [
    {
      name: 'token0',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'address' }],
    },
    {
      name: 'token1',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'address' }],
    },
    {
      name: 'getReserves',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [
        { type: 'uint112', name: 'reserve0' },
        { type: 'uint112', name: 'reserve1' },
        { type: 'uint32', name: 'blockTimestampLast' },
      ],
    },
  ] as const,
}; 