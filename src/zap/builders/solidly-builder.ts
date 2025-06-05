import { PublicClient, Abi, Address } from 'viem';
import { multicall } from 'viem/actions';
import { ERC20TokenInfo, LPType, Project, ZapInfo, SolidlyLPInfo, MulticallResult } from '../types';
import { chainConfigs } from '../config/chains';
import * as projectConfigs from '../config/projects';
import { ChainConfig, ProjectConfig } from '../types/config';
import { ListrTaskWrapper } from 'listr2';
import { getClient } from '../utils/client';
import SolidlyFactory_ABI from '../abi/SolidlyFactory_ABI.json';
import SolidlyPair_ABI from '../abi/SolidlyPair_ABI.json';
import ERC20_ABI from '../abi/ERC20_ABI.json';
import { ChainId } from '../../types/enums';
const BATCH_SIZE = 100; // Number of pairs to fetch from factory in one go

// Helper to safely get token info from the map
const getERC20TokenInfo = (address: Address, tokenDetailsMap: Map<Address, Partial<ERC20TokenInfo>>, chainConfig: ChainConfig): ERC20TokenInfo => {
    const details = tokenDetailsMap.get(address);
    return {
        address: address,
        name: details?.name ?? 'Unknown Name',
        symbol: details?.symbol ?? '???',
        decimals: details?.decimals ?? 18,
        logoURI: chainConfig.trustwalletLogoURI(address),
    };
};

/**
 * Builds data for a single Solidly pair entry
 * 
 * @param pairAddress The Solidly pair address to build data for
 * @param chainId The chain ID
 * @param project The project identifier
 * @returns Promise resolving to ZapInfo
 */
export const buildSingleSolidlyEntry = async (
  pairAddress: Address,
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

  if (!projectConfig.solidlyConfig) {
    throw new Error('Missing Solidly configuration');
  }

  const factoryAddress = projectConfig.solidlyConfig.factoryAddress;
  const routerAddress = projectConfig.solidlyConfig.routerAddress;
  const client = getClient(chainId);

  const pairCalls = [
    { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'token0' },
    { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'token1' },
    { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'stable' },
    { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'symbol' },
    { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'name' },
  ];

  const pairResults = await multicall(client, { contracts: pairCalls, allowFailure: false }) as readonly unknown[];

  const token0Address = pairResults[0] as Address;
  const token1Address = pairResults[1] as Address;
  const stable = pairResults[2] as boolean;
  const lpSymbol = pairResults[3] as string;
  const lpName = pairResults[4] as string;

  const uniqueTokenAddresses: Address[] = [token0Address, token1Address];

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

  const tokenDetailsMap = new Map<Address, Partial<ERC20TokenInfo>>();
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

  const token0Info = getERC20TokenInfo(token0Address, tokenDetailsMap, chainConfig);
  const token1Info = getERC20TokenInfo(token1Address, tokenDetailsMap, chainConfig);

  const lpData: SolidlyLPInfo = {
    lpType: LPType.SOLIDLY,
    name: lpName,
    symbol: lpSymbol,
    lpAddress: pairAddress,
    toToken0: token0Info,
    toToken1: token1Info,
    stable: stable,
    factory: factoryAddress,
    router: routerAddress
  };

  const zapName = `${Project[project]} Solidly (${token0Info.symbol}/${token1Info.symbol})`;
  
  return {
    name: zapName,
    logoURI: projectConfig.logoURI,
    chainId: chainId,
    lpData: lpData,
  };
};

/**
 * Fetches Solidly style LP information directly from the factory contract.
 *
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param existingLpAddresses Set of LP addresses already processed and present in the output file.
 * @param task The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo for newly discovered LPs.
 */
export const buildSolidly = async (
    chainId: ChainId,
    project: Project,
    existingLpAddresses: Set<Address>,
    task: ListrTaskWrapper<any, any, any>
): Promise<ZapInfo[]> => {

    // 1. Find Project Configuration
    const projectConfigMap = Object.values(projectConfigs).find(
        (config) => config[chainId]?.project === project
    ) as Partial<Record<ChainId, ProjectConfig>> | undefined;
    const projectConfig = projectConfigMap?.[chainId];
    const chainConfig = chainConfigs[chainId];

    if (!chainConfig) {
        task.skip('Skipping Solidly build due to missing chain configuration.');
        return [];
    }

    if (!projectConfig?.solidlyConfig) {
        task.skip('Skipping Solidly build: No solidlyFactory configured for this project/chain.');
        return [];
    }
    const factoryAddress = projectConfig.solidlyConfig.factoryAddress;
    const routerAddress = projectConfig.solidlyConfig.routerAddress;
    const client = getClient(chainId);

    const allNewZapInfo: ZapInfo[] = [];
    let totalPairs = 0;
    let processedCount = 0;

    try {
        // 2. Get Total Pair Count from Factory
        totalPairs = Number(await client.readContract({
            address: factoryAddress as Address,
            abi: SolidlyFactory_ABI as Abi,
            functionName: 'allPairsLength',
        }));

        if (totalPairs === 0) {
            task.skip('Skipping Solidly build: Factory reports 0 pairs.');
            return [];
        }

        task.output = `Factory: ${factoryAddress}, Total Pairs: ${totalPairs}, Existing: ${existingLpAddresses.size}`;

        // 3. Iterate through pairs in batches
        for (let i = 0; i < totalPairs; i += BATCH_SIZE) {
            const batchEnd = Math.min(i + BATCH_SIZE, totalPairs);
            const batchIndices = Array.from({ length: batchEnd - i }, (_, k) => BigInt(i + k)); // Create indices for the batch

            if (batchIndices.length === 0) continue;

            // 3.1 Fetch batch of pair addresses from factory
            const factoryCalls = batchIndices.map(index => ({
                address: factoryAddress as Address,
                abi: SolidlyFactory_ABI as Abi,
                functionName: 'allPairs',
                args: [index],
            }));

            const pairAddressesResults = await multicall(client, { contracts: factoryCalls, allowFailure: true }) as MulticallResult<Address>[];

            const potentialPairAddresses = pairAddressesResults
                .filter(r => r.status === 'success' && r.result) // Filter successful results with non-null addresses
                .map(r => (r as { result: Address; status: 'success' }).result);

            // 3.2 Filter out already known pairs
            const newPairAddresses = potentialPairAddresses.filter(addr => !existingLpAddresses.has(addr));

            if (newPairAddresses.length === 0) {
                processedCount += potentialPairAddresses.length; // Still count them as processed (skipped)
                task.output = `Batch ${i / BATCH_SIZE + 1}: Fetched ${potentialPairAddresses.length}, Skipped ${potentialPairAddresses.length} existing/invalid. Progress: ${processedCount}/${totalPairs}`;
                continue; // Skip to next batch if no new pairs
            }

            task.output = `Batch ${i / BATCH_SIZE + 1}: Fetched ${potentialPairAddresses.length}, Found ${newPairAddresses.length} new. Fetching details... Progress: ${processedCount}/${totalPairs}`;

            // 3.3 Fetch token0, token1, stable status, symbol, and name for new pairs
            const pairDataCalls = newPairAddresses.flatMap(pairAddress => [
                { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'token0' },
                { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'token1' },
                { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'stable' },
                { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'symbol' },
                { address: pairAddress, abi: SolidlyPair_ABI as Abi, functionName: 'name' },
            ]);

            const pairDataResults = await multicall(client, { contracts: pairDataCalls, allowFailure: true }) as MulticallResult<Address | string | boolean>[]; // Allow failure, include boolean for stable

            const validPairData: { lpAddress: Address; token0: Address; token1: Address; stable: boolean; lpSymbol: string, lpName: string }[] = [];
            const batchTokenAddresses = new Set<Address>();

            for (let j = 0; j < newPairAddresses.length; j++) {
                const lpAddress = newPairAddresses[j];
                const dataOffset = j * 5; // 5 calls per pair now
                const token0Result = pairDataResults[dataOffset];
                const token1Result = pairDataResults[dataOffset + 1];
                const stableResult = pairDataResults[dataOffset + 2];
                const lpSymbolResult = pairDataResults[dataOffset + 3];
                const lpNameResult = pairDataResults[dataOffset + 4];

                // Check if token0, token1, and stable calls were successful
                if (token0Result.status === 'success' && token1Result.status === 'success' && stableResult.status === 'success') {
                    const token0 = token0Result.result as Address;
                    const token1 = token1Result.result as Address;
                    const stable = stableResult.result as boolean;
                    const lpSymbol = lpSymbolResult.status === 'success' ? lpSymbolResult.result as string : 'LP';
                    const lpName = lpNameResult.status === 'success' ? lpNameResult.result as string : 'Solidly LP';

                    validPairData.push({ lpAddress, token0, token1, stable, lpSymbol, lpName });
                    batchTokenAddresses.add(token0);
                    batchTokenAddresses.add(token1);
                } else {
                    console.warn(`Failed to get core data for pair ${lpAddress} on chain ${chainId}`);
                }
            }

            if (validPairData.length === 0) {
                processedCount += potentialPairAddresses.length; // Count original potential pairs as processed (failed/skipped)
                task.output = `Batch ${i / BATCH_SIZE + 1}: Fetched ${potentialPairAddresses.length}, No valid new pairs found. Progress: ${processedCount}/${totalPairs}`;
                continue;
            }

            // 3.4 Fetch details for unique tokens in this batch
            const uniqueBatchTokenAddresses = Array.from(batchTokenAddresses);
            const tokenDetailsMap = new Map<Address, Partial<ERC20TokenInfo>>();

            if (uniqueBatchTokenAddresses.length > 0) {
                const tokenInfoCalls = uniqueBatchTokenAddresses.flatMap(tokenAddress => [
                    { address: tokenAddress, abi: ERC20_ABI as Abi, functionName: 'name' },
                    { address: tokenAddress, abi: ERC20_ABI as Abi, functionName: 'symbol' },
                    { address: tokenAddress, abi: ERC20_ABI as Abi, functionName: 'decimals' },
                ]);

                const tokenInfoResults = await multicall(client, { contracts: tokenInfoCalls, allowFailure: true }) as MulticallResult<string | number | bigint>[];

                for (let k = 0; k < uniqueBatchTokenAddresses.length; k++) {
                    const address = uniqueBatchTokenAddresses[k];
                    const nameResult = tokenInfoResults[k * 3];
                    const symbolResult = tokenInfoResults[k * 3 + 1];
                    const decimalsResult = tokenInfoResults[k * 3 + 2];

                    const name = nameResult.status === 'success' && typeof nameResult.result === 'string' ? nameResult.result : 'Unknown Name';
                    const symbol = symbolResult.status === 'success' && typeof symbolResult.result === 'string' ? symbolResult.result : '???';
                    const decimals = decimalsResult.status === 'success' && (typeof decimalsResult.result === 'number' || typeof decimalsResult.result === 'bigint') ? Number(decimalsResult.result) : 18;

                    tokenDetailsMap.set(address, { address, name, symbol, decimals });
                }
            }

            // 3.5 Construct ZapInfo for valid new pairs
            const batchZapInfo = validPairData.map(pair => {
                const token0Info = getERC20TokenInfo(pair.token0, tokenDetailsMap, chainConfig);
                const token1Info = getERC20TokenInfo(pair.token1, tokenDetailsMap, chainConfig);

                const lpData: SolidlyLPInfo = {
                    lpType: LPType.SOLIDLY,
                    name: pair.lpName,
                    symbol: pair.lpSymbol,
                    lpAddress: pair.lpAddress,
                    toToken0: token0Info,
                    toToken1: token1Info,
                    stable: pair.stable,
                    factory: factoryAddress,
                    router: routerAddress
                };

                const zapName = `${Project[project]} Solidly (${token0Info.symbol}/${token1Info.symbol})`;

                return {
                    name: zapName,
                    logoURI: projectConfig.logoURI,
                    chainId: chainId,
                    lpData: lpData,
                };
            });

            allNewZapInfo.push(...batchZapInfo);
            processedCount += potentialPairAddresses.length; // Increment by total fetched in batch
            task.output = `Batch ${i / BATCH_SIZE + 1}: Added ${batchZapInfo.length} new pairs. Progress: ${processedCount}/${totalPairs}`;

        } // End of batch loop

    } catch (error) {
        // Report error but don't necessarily stop the whole build
        const message = error instanceof Error ? error.message : String(error);
        task.output = `Error during Solidly fetch: ${message.substring(0, 100)}...`;
        throw new Error(`Failed during Solidly data fetching for project ${Project[project]} on chain ${chainId}: ${message}`);
    }

    task.output = `Finished Solidly discovery. Found ${allNewZapInfo.length} new pairs. Total processed: ${processedCount}/${totalPairs}`;
    return allNewZapInfo;
};