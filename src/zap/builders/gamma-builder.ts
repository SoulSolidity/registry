import { PublicClient, Abi } from 'viem';
import { multicall } from 'viem/actions';
import { ERC20TokenInfo, GammaEntry, LPType, MulticallResult, Project, ZapInfo } from '../types';
import { chainConfigs } from '../config/chains';
import Hypervisor_ABI from '../abi/Hypervisor_ABI.json';
import ERC20_ABI from '../abi/ERC20_ABI.json';
import * as projectConfigs from '../config/projects';
import { ProjectConfig } from '../types/config';
import { ListrTaskWrapper } from 'listr2';
import { getClient } from '../utils/client';
import { ChainId } from '../../types/enums';

/**
 * Builds data for a single Gamma entry
 * 
 * @param entry The Gamma entry to build data for
 * @param chainId The chain ID
 * @param project The project identifier
 * @returns Promise resolving to ZapInfo
 */
export const buildSingleGammaEntry = async (
  entry: GammaEntry,
  chainId: ChainId,
  project: Project,
): Promise<ZapInfo> => {
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

  const gammaConfig = projectConfig.gammaConfig;
  if (!gammaConfig?.uniProxyAddress) {
    throw new Error('Missing Gamma configuration');
  }

  const client = getClient(chainId);

  const lpCalls = [
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
    {
      address: entry.address,
      abi: Hypervisor_ABI as Abi,
      functionName: 'name',
    },
    {
      address: entry.address,
      abi: Hypervisor_ABI as Abi,
      functionName: 'symbol',
    },
  ];

  const lpResults = await multicall(client, { contracts: lpCalls, allowFailure: false }) as readonly unknown[];

  const token0Address = lpResults[0] as `0x${string}`;
  const token1Address = lpResults[1] as `0x${string}`;
  const uniqueTokenAddresses: `0x${string}`[] = [token0Address, token1Address];

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
      lpType: LPType.GAMMA,
      name: lpResults[2] as string,
      symbol: lpResults[3] as string,
      toToken0: getERC20TokenInfo(token0Address),
      toToken1: getERC20TokenInfo(token1Address),
      hypervisor: entry.address,
      uniProxy: gammaConfig.uniProxyAddress,
    },
  };
};

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

  try {
    const processedData = await Promise.all(
      manualEntries.map(entry => buildSingleGammaEntry(entry, chainId, project))
    );

    return processedData;
  } catch (error) {
    throw new Error(`Failed during data fetching in buildGamma: ${error instanceof Error ? error.message : String(error)}`);
  }
};
