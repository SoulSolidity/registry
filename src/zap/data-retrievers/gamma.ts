/**
 * Gamma data retriever
 */
import { BaseDataRetriever } from './base-retriever';
import { ChainId, GammaEntry, GammaMetadata, Project, TokenMetadata } from '../types';
import { ABIS } from './utils';
import { getProjectConfig } from '../config';
import { Address, getContract, Abi } from 'viem';

// Gamma Hypervisor ABI Fragments
const GAMMA_ABI = [
  {
    name: 'pool',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'deposit0Max',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'deposit1Max',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'baseLower',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'int24' }],
  },
  {
    name: 'baseUpper',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'int24' }],
  },
] as const;

// Pool ABI Fragments
const POOL_ABI = [
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
    name: 'fee',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint24' }],
  },
  {
    name: 'slot0',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { type: 'uint160', name: 'sqrtPriceX96' },
      { type: 'int24', name: 'tick' },
      { type: 'uint16', name: 'observationIndex' },
      { type: 'uint16', name: 'observationCardinality' },
      { type: 'uint16', name: 'observationCardinalityNext' },
      { type: 'uint8', name: 'feeProtocol' },
      { type: 'bool', name: 'unlocked' },
    ],
  },
] as const;

/**
 * Data retriever for Gamma LPs
 */
export class GammaDataRetriever extends BaseDataRetriever<GammaEntry, GammaMetadata> {
  private projectName: Project;

  /**
   * Create a new Gamma data retriever
   * @param chainId Chain ID
   * @param projectName Project name (e.g., 'uniswap', 'pancakeswap', etc.)
   */
  constructor(chainId: ChainId, projectName: Project) {
    super(chainId);
    this.projectName = projectName;
  }

  /**
   * Fetch token metadata using multicall
   * @param addresses Array of token addresses
   * @returns Array of token metadata
   */
  private async fetchTokensMetadata(addresses: Address[]): Promise<TokenMetadata[]> {
    if (!addresses.length) return [];

    // Cast ABIS.ERC20 to Abi type
    const erc20Abi = ABIS.ERC20 as Abi;

    const multicallResults = await this.client.multicall({
      contracts: addresses.flatMap(address => [
        {
          address,
          abi: erc20Abi,
          functionName: 'name',
        },
        {
          address,
          abi: erc20Abi,
          functionName: 'symbol',
        },
        {
          address,
          abi: erc20Abi,
          functionName: 'decimals',
        }
      ])
    });

    // Process results in groups of 3 (name, symbol, decimals for each token)
    const tokens: TokenMetadata[] = [];
    
    for (let i = 0; i < multicallResults.length; i += 3) {
      const nameResult = multicallResults[i];
      const symbolResult = multicallResults[i + 1];
      const decimalsResult = multicallResults[i + 2];
      
      // Skip if any of the calls failed
      if (
        nameResult.status !== 'success' ||
        symbolResult.status !== 'success' ||
        decimalsResult.status !== 'success'
      ) {
        console.error(`Failed to fetch token metadata for address ${addresses[i / 3]}`);
        continue;
      }
      
      tokens.push({
        address: addresses[i / 3],
        name: String(nameResult.result),
        symbol: String(symbolResult.result),
        decimals: Number(decimalsResult.result),
      });
    }
    
    return tokens;
  }

  /**
   * Fetch Gamma LP metadata
   * @param entry Gamma entry
   * @returns Gamma metadata
   */
  async fetchMetadata(entry: GammaEntry): Promise<GammaMetadata> {
    const projectConfig = getProjectConfig(this.chainId, this.projectName);

    if (!projectConfig || !projectConfig.gamma) {
      throw new Error(`No Gamma configuration found for ${this.projectName} on chain ${this.chainId}`);
    }

    // First, get pool address from hypervisor
    const poolAddressResult = await this.client.readContract({
      address: entry.address as Address,
      abi: GAMMA_ABI,
      functionName: 'pool',
    });

    const poolAddress = poolAddressResult as Address;

    // Use multicall to get hypervisor and pool data in a single RPC call
    const multicallResults = await this.client.multicall({
      contracts: [
        {
          address: poolAddress,
          abi: POOL_ABI,
          functionName: 'token0',
        },
        {
          address: poolAddress,
          abi: POOL_ABI,
          functionName: 'token1',
        },
      ] as const
    });

    // Extract data from multicall results
    if (multicallResults.some(result => result.status !== 'success')) {
      throw new Error(`Error fetching data for Gamma LP ${entry.address}`);
    }
    
    const [
      token0AddressResult,
      token1AddressResult
    ] = multicallResults;

    // Fetch token metadata using multicall
    const token0Address = token0AddressResult.result as Address;
    const token1Address = token1AddressResult.result as Address;
    
    const tokenMetadata = await this.fetchTokensMetadata([token0Address, token1Address]);

    return {
      token0: tokenMetadata[0],
      token1: tokenMetadata[1],
      uniProxy: projectConfig.gamma.uniProxyAddress,
      poolAddress: poolAddress,
    };
  }

  /**
   * Fetch metadata for multiple entries at once using multicall batching
   * @param entries Entries to fetch metadata for
   * @returns Metadata for the entries
   */
  async fetchAllMetadata(entries: GammaEntry[]): Promise<GammaMetadata[]> {
    const results: GammaMetadata[] = [];
    
    // Process entries in batches to avoid hitting RPC limits
    const batchSize = 5;
    
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      
      // Process batch in parallel
      const batchResults = await Promise.all(
        batch.map(entry => this.fetchMetadata(entry).catch(error => {
          console.error(`Error fetching metadata for ${entry.address}:`, error);
          return null;
        }))
      );
      
      // Filter out failed results
      results.push(...batchResults.filter(Boolean) as GammaMetadata[]);
    }
    
    return results;
  }
} 