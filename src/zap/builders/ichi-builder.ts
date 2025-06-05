import { PublicClient, Abi } from 'viem';
import { multicall } from 'viem/actions';
import { ERC20TokenInfo, IchiEntry, LPType, MulticallResult, Project, ZapInfo } from '../types';
import { chainConfigs } from '../config/chains';
import ICHIVault_ABI from '../abi/ICHIVault_ABI.json';
import ERC20_ABI from '../abi/ERC20_ABI.json';
import * as projectConfigs from '../config/projects';
import { ProjectConfig } from '../types/config';
import { ListrTaskWrapper } from 'listr2';
import { getClient } from '../utils/client';
import { ChainId } from '../../types/enums';

/**
 * Builds data for a single Ichi entry
 * 
 * @param entry The Ichi entry to build data for
 * @param chainId The chain ID
 * @param project The project identifier
 * @returns Promise resolving to ZapInfo
 */
export const buildSingleIchiEntry = async (
  entry: IchiEntry,
  chainId: ChainId,
  project: Project,
): Promise<ZapInfo> => {
  // Find the project configuration for the given project and chainId
  const projectConfigMap = Object.values(projectConfigs).find(
    (config) => config[chainId]?.project === project
  ) as Partial<Record<ChainId, ProjectConfig>> | undefined;

  const chainConfig = chainConfigs[chainId];
  if (!chainConfig) {
    throw new Error('Missing chain configuration');
  }

  const projectConfig = projectConfigMap?.[chainId];
  if (!projectConfig) {
    throw new Error('Missing project configuration');
  }

  const ichiConfig = projectConfig.ichiConfig;
  if (!ichiConfig) {
    throw new Error('Missing Ichi configuration');
  }

  const client = getClient(chainId);

  // Fetch LP details
  const lpCalls = [
    {
      address: entry.address,
      abi: ICHIVault_ABI as Abi,
      functionName: 'allowToken0',
    },
    {
      address: entry.address,
      abi: ICHIVault_ABI as Abi,
      functionName: 'allowToken1',
    },
    {
      address: entry.address,
      abi: ICHIVault_ABI as Abi,
      functionName: 'token0',
    },
    {
      address: entry.address,
      abi: ICHIVault_ABI as Abi,
      functionName: 'token1',
    },
    {
      address: entry.address,
      abi: ICHIVault_ABI as Abi,
      functionName: 'name',
    },
    {
      address: entry.address,
      abi: ICHIVault_ABI as Abi,
      functionName: 'symbol',
    },
  ];

  const lpResults = await multicall(client, { contracts: lpCalls, allowFailure: false }) as readonly unknown[];

  // Get token addresses
  const token0Address = lpResults[2] as `0x${string}`;
  const token1Address = lpResults[3] as `0x${string}`;
  const uniqueTokenAddresses: `0x${string}`[] = [token0Address, token1Address];

  // Fetch token details
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

  const tokenResults = await multicall(client, { contracts: tokenCalls, allowFailure: true }) as MulticallResult<string | number | bigint>[];

  // Map token details
  const tokenDetailsMap = new Map<`0x${string}`, Partial<ERC20TokenInfo>>();
  for (let i = 0; i < uniqueTokenAddresses.length; i++) {
    const address = uniqueTokenAddresses[i];
    const nameResult = tokenResults[i * 3];
    const symbolResult = tokenResults[i * 3 + 1];
    const decimalsResult = tokenResults[i * 3 + 2];

    const name = nameResult.status === 'success' && typeof nameResult.result === 'string'
      ? nameResult.result
      : 'Unknown Name';
    const symbol = symbolResult.status === 'success' && typeof symbolResult.result === 'string'
      ? symbolResult.result
      : '???';
    const decimals = decimalsResult.status === 'success' && (typeof decimalsResult.result === 'number' || typeof decimalsResult.result === 'bigint')
      ? Number(decimalsResult.result)
      : 18;

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

  return {
    name: entry.name,
    logoURI: projectConfig.logoURI,
    chainId: chainId,
    lpData: {
      lpType: LPType.ICHI,
      name: lpResults[4] as string,
      symbol: lpResults[5] as string,
      toToken0: getERC20TokenInfo(token0Address),
      toToken1: getERC20TokenInfo(token1Address),
      allowToken0: lpResults[0] as boolean,
      allowToken1: lpResults[1] as boolean,
      vault: entry.address,
      ichiConfig: ichiConfig,
    },
  };
};

/**
 * Fetches on-chain data for Ichi LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Ichi entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo.
 */
export const buildIchi = async (
  manualEntries: IchiEntry[],
  chainId: ChainId,
  project: Project,
  parentTask: ListrTaskWrapper<any, any, any>
): Promise<ZapInfo[]> => {
  if (manualEntries.length === 0) {
    parentTask.skip('No manual entries provided.');
    return [];
  }

  try {
    // Process each entry using the new buildSingleIchiEntry function
    const processedData = await Promise.all(
      manualEntries.map(entry => buildSingleIchiEntry(entry, chainId, project))
    );

    return processedData;
  } catch (error) {
    throw new Error(`Failed during data fetching in buildIchi: ${error instanceof Error ? error.message : String(error)}`);
  }
};
