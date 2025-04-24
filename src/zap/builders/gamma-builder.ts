import { PublicClient, Abi } from 'viem';
import { multicall } from 'viem/actions';
import { ERC20TokenInfo, GammaEntry, LPType, Project, ZapInfo } from '../types';
import { chainConfigs } from '../config/chains';
import Hypervisor_ABI from '../abi/Hypervisor_ABI.json';
import ERC20_ABI from '../abi/ERC20_ABI.json';
import * as projectConfigs from '../config/projects';
import { ProjectConfig } from '../types/config';
import { ListrTaskWrapper } from 'listr2';
import { getClient } from '../utils/client';
import { ChainId } from '../../types/enums';

/**
 * Represents the possible result structure from a multicall when allowFailure is true.
 */
type MulticallResult<TResult = unknown> =
  | { result: TResult; status: 'success' }
  | { error: Error; status: 'failure' };

/**
 * Fetches on-chain data for Gamma LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Gamma entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of GammaLPInfo.
 */
export const buildGamma = async (
  manualEntries: GammaEntry[],
  chainId: ChainId,
  project: Project,
  parentTask: ListrTaskWrapper<any, any, any>
): Promise<ZapInfo[]> => {
  if (manualEntries.length === 0) {
    parentTask.skip('No manual entries provided.');
    return [];
  }

  // Find the project configuration for the given project and chainId
  const projectConfigMap = Object.values(projectConfigs).find(
    (config) => config[chainId]?.project === project
  ) as Partial<Record<ChainId, ProjectConfig>> | undefined;

  const chainConfig = chainConfigs[chainId];
  if (!chainConfig) {
    parentTask.skip('Skipping Gamma build due to missing chain configuration.');
    return [];
  }
  const projectConfig = projectConfigMap?.[chainId];

  if (!projectConfig) {
    parentTask.skip('Skipping Gamma build due to missing project configuration.');
    return [];
  }

  const gammaConfig = projectConfig.gammaConfig;
  if (!gammaConfig?.uniProxyAddress) {
    parentTask.skip('Skipping Gamma build due to missing Gamma configuration.');
    return [];
  }

  const client = getClient(chainId);
  let lpResults: readonly `0x${string}`[] = [];
  let tokenResults: MulticallResult<string | number | bigint>[] = [];
  let uniqueTokenAddresses: `0x${string}`[] = [];

  // Removed parentTask.newListr - execute sequentially
  try {
    // Fetch LP details (token0, token1)
    const lpCalls = manualEntries.map((entry) => [
      {
        address: entry.address,
        abi: Hypervisor_ABI as Abi,
        functionName: 'token0',
      },
      {
        address: entry.address,
        abi: Hypervisor_ABI as Abi,
        functionName: 'token1',
      },
    ]).flat();

    // Execute multicalls
    lpResults = await multicall(client, { contracts: lpCalls, allowFailure: false }) as readonly `0x${string}`[];

    // Collect unique token addresses
    const tokenAddresses = new Set<`0x${string}`>();
    for (let i = 0; i < lpResults.length; i += 2) {
      tokenAddresses.add(lpResults[i] as `0x${string}`);   // token0
      tokenAddresses.add(lpResults[i + 1] as `0x${string}`); // token1
    }
    uniqueTokenAddresses = Array.from(tokenAddresses);

    // Fetch token details (name, symbol, decimals)
    if (uniqueTokenAddresses.length === 0) {
      // No need to skip here, just proceed; the next call will handle the empty array
    } else {
      const tokenCalls = uniqueTokenAddresses.map((tokenAddress) => [
        {
          address: tokenAddress,
          abi: ERC20_ABI as Abi,
          functionName: 'name',
        },
        {
          address: tokenAddress,
          abi: ERC20_ABI as Abi,
          functionName: 'symbol',
        },
        {
          address: tokenAddress,
          abi: ERC20_ABI as Abi,
          functionName: 'decimals',
        },
      ]).flat();
      tokenResults = await multicall(client, { contracts: tokenCalls, allowFailure: true }) as MulticallResult<string | number | bigint>[];
    }

  } catch (error) {
    // Rethrow the error to be caught by the main build process
    throw new Error(`Failed during data fetching in buildGamma: ${error instanceof Error ? error.message : String(error)}`);
  }

  // 4. Map token details for easy lookup
  const tokenDetailsMap = new Map<`0x${string}`, Partial<ERC20TokenInfo>>();
  for (let i = 0; i < uniqueTokenAddresses.length; i++) {
    const address = uniqueTokenAddresses[i];
    const nameResult = tokenResults[i * 3];
    const symbolResult = tokenResults[i * 3 + 1];
    const decimalsResult = tokenResults[i * 3 + 2];

    // Handle potential failures or unexpected types gracefully
    const name = nameResult.status === 'success' && typeof nameResult.result === 'string'
      ? nameResult.result
      : 'Unknown Name';
    const symbol = symbolResult.status === 'success' && typeof symbolResult.result === 'string'
      ? symbolResult.result
      : '???';
    const decimals = decimalsResult.status === 'success' && (typeof decimalsResult.result === 'number' || typeof decimalsResult.result === 'bigint')
      ? Number(decimalsResult.result)
      : 18; // Default to 18 if decimals call fails

    tokenDetailsMap.set(address, { address, name, symbol, decimals });
  }

  // Helper to safely get token info
  const getERC20TokenInfo = (address: `0x${string}`): ERC20TokenInfo => {
    const details = tokenDetailsMap.get(address);
    return {
      address: address,
      name: details?.name ?? 'Unknown Name',
      symbol: details?.symbol ?? '???',
      decimals: details?.decimals ?? 18,
      logoURI: chainConfig.trustwalletLogoURI(address),
    };
  };


  // 5. Combine manual data with fetched on-chain data
  const processedData: ZapInfo[] = manualEntries.map((entry, index) => {
    const token0Address = lpResults[index * 2] as `0x${string}`;
    const token1Address = lpResults[index * 2 + 1] as `0x${string}`;

    return {
      name: entry.name,
      symbol: entry.symbol,
      logoURI: projectConfig.logoURI,
      chainId: chainId,
      lpData: {
        lpType: LPType.GAMMA,
        toToken0: getERC20TokenInfo(token0Address),
        toToken1: getERC20TokenInfo(token1Address),
        hypervisor: entry.address,
        uniProxy: gammaConfig.uniProxyAddress,
      },
    };
  });

  return processedData;
};
