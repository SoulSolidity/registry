"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSolidly = void 0;
const actions_1 = require("viem/actions");
const types_1 = require("../types");
const chains_1 = require("../config/chains");
const projectConfigs = __importStar(require("../config/projects"));
const client_1 = require("../utils/client");
const SolidlyFactory_ABI_json_1 = __importDefault(require("../abi/SolidlyFactory_ABI.json"));
const SolidlyPair_ABI_json_1 = __importDefault(require("../abi/SolidlyPair_ABI.json"));
const ERC20_ABI_json_1 = __importDefault(require("../abi/ERC20_ABI.json"));
const BATCH_SIZE = 100; // Number of pairs to fetch from factory in one go
// Helper to safely get token info from the map
const getERC20TokenInfo = (address, tokenDetailsMap, chainConfig) => {
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
 * Fetches Solidly style LP information directly from the factory contract.
 *
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param existingLpAddresses Set of LP addresses already processed and present in the output file.
 * @param task The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo for newly discovered LPs.
 */
const buildSolidly = async (chainId, project, existingLpAddresses, task) => {
    // 1. Find Project Configuration
    const projectConfigMap = Object.values(projectConfigs).find((config) => config[chainId]?.project === project);
    const projectConfig = projectConfigMap?.[chainId];
    const chainConfig = chains_1.chainConfigs[chainId];
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
    const client = (0, client_1.getClient)(chainId);
    const allNewZapInfo = [];
    let totalPairs = 0;
    let processedCount = 0;
    try {
        // 2. Get Total Pair Count from Factory
        totalPairs = Number(await client.readContract({
            address: factoryAddress,
            abi: SolidlyFactory_ABI_json_1.default,
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
            if (batchIndices.length === 0)
                continue;
            // 3.1 Fetch batch of pair addresses from factory
            const factoryCalls = batchIndices.map(index => ({
                address: factoryAddress,
                abi: SolidlyFactory_ABI_json_1.default,
                functionName: 'allPairs',
                args: [index],
            }));
            const pairAddressesResults = await (0, actions_1.multicall)(client, { contracts: factoryCalls, allowFailure: true });
            const potentialPairAddresses = pairAddressesResults
                .filter(r => r.status === 'success' && r.result) // Filter successful results with non-null addresses
                .map(r => r.result);
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
                { address: pairAddress, abi: SolidlyPair_ABI_json_1.default, functionName: 'token0' },
                { address: pairAddress, abi: SolidlyPair_ABI_json_1.default, functionName: 'token1' },
                { address: pairAddress, abi: SolidlyPair_ABI_json_1.default, functionName: 'stable' },
                { address: pairAddress, abi: SolidlyPair_ABI_json_1.default, functionName: 'symbol' },
                { address: pairAddress, abi: SolidlyPair_ABI_json_1.default, functionName: 'name' },
            ]);
            const pairDataResults = await (0, actions_1.multicall)(client, { contracts: pairDataCalls, allowFailure: true }); // Allow failure, include boolean for stable
            const validPairData = [];
            const batchTokenAddresses = new Set();
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
                    const token0 = token0Result.result;
                    const token1 = token1Result.result;
                    const stable = stableResult.result;
                    const lpSymbol = lpSymbolResult.status === 'success' ? lpSymbolResult.result : 'LP';
                    const lpName = lpNameResult.status === 'success' ? lpNameResult.result : 'Solidly LP';
                    validPairData.push({ lpAddress, token0, token1, stable, lpSymbol, lpName });
                    batchTokenAddresses.add(token0);
                    batchTokenAddresses.add(token1);
                }
                else {
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
            const tokenDetailsMap = new Map();
            if (uniqueBatchTokenAddresses.length > 0) {
                const tokenInfoCalls = uniqueBatchTokenAddresses.flatMap(tokenAddress => [
                    { address: tokenAddress, abi: ERC20_ABI_json_1.default, functionName: 'name' },
                    { address: tokenAddress, abi: ERC20_ABI_json_1.default, functionName: 'symbol' },
                    { address: tokenAddress, abi: ERC20_ABI_json_1.default, functionName: 'decimals' },
                ]);
                const tokenInfoResults = await (0, actions_1.multicall)(client, { contracts: tokenInfoCalls, allowFailure: true });
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
                const lpData = {
                    lpType: types_1.LPType.SOLIDLY,
                    name: pair.lpName,
                    symbol: pair.lpSymbol,
                    lpAddress: pair.lpAddress,
                    toToken0: token0Info,
                    toToken1: token1Info,
                    stable: pair.stable,
                    factory: factoryAddress,
                    router: routerAddress
                };
                const zapName = `${types_1.Project[project]} Solidly (${token0Info.symbol}/${token1Info.symbol})`;
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
    }
    catch (error) {
        // Report error but don't necessarily stop the whole build
        const message = error instanceof Error ? error.message : String(error);
        task.output = `Error during Solidly fetch: ${message.substring(0, 100)}...`;
        throw new Error(`Failed during Solidly data fetching for project ${types_1.Project[project]} on chain ${chainId}: ${message}`);
    }
    task.output = `Finished Solidly discovery. Found ${allNewZapInfo.length} new pairs. Total processed: ${processedCount}/${totalPairs}`;
    return allNewZapInfo;
};
exports.buildSolidly = buildSolidly;
