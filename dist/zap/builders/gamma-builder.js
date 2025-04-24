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
exports.buildGamma = void 0;
const actions_1 = require("viem/actions");
const types_1 = require("../types");
const chains_1 = require("../config/chains");
const Hypervisor_ABI_json_1 = __importDefault(require("../abi/Hypervisor_ABI.json"));
const ERC20_ABI_json_1 = __importDefault(require("../abi/ERC20_ABI.json"));
const projectConfigs = __importStar(require("../config/projects"));
const client_1 = require("../utils/client");
/**
 * Fetches on-chain data for Gamma LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Gamma entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of GammaLPInfo.
 */
const buildGamma = async (manualEntries, chainId, project, parentTask) => {
    if (manualEntries.length === 0) {
        parentTask.skip('No manual entries provided.');
        return [];
    }
    // Find the project configuration for the given project and chainId
    const projectConfigMap = Object.values(projectConfigs).find((config) => config[chainId]?.project === project);
    const chainConfig = chains_1.chainConfigs[chainId];
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
    const client = (0, client_1.getClient)(chainId);
    let lpResults = [];
    let tokenResults = [];
    let uniqueTokenAddresses = [];
    try {
        const lpCalls = manualEntries.map((entry) => [
            {
                address: entry.address,
                abi: Hypervisor_ABI_json_1.default,
                functionName: 'token0',
            },
            {
                address: entry.address,
                abi: Hypervisor_ABI_json_1.default,
                functionName: 'token1',
            },
            {
                address: entry.address,
                abi: Hypervisor_ABI_json_1.default,
                functionName: 'name',
            },
            {
                address: entry.address,
                abi: Hypervisor_ABI_json_1.default,
                functionName: 'symbol',
            },
        ]).flat();
        // Execute multicalls
        lpResults = await (0, actions_1.multicall)(client, { contracts: lpCalls, allowFailure: false });
        // Collect unique token addresses
        const tokenAddresses = new Set();
        for (let i = 0; i < lpResults.length; i += 4) {
            tokenAddresses.add(lpResults[i]); // token0
            tokenAddresses.add(lpResults[i + 1]); // token1
        }
        uniqueTokenAddresses = Array.from(tokenAddresses);
        // Fetch token details (name, symbol, decimals)
        if (uniqueTokenAddresses.length === 0) {
            // No need to skip here, just proceed; the next call will handle the empty array
        }
        else {
            const tokenCalls = uniqueTokenAddresses.map((tokenAddress) => [
                {
                    address: tokenAddress,
                    abi: ERC20_ABI_json_1.default,
                    functionName: 'name',
                },
                {
                    address: tokenAddress,
                    abi: ERC20_ABI_json_1.default,
                    functionName: 'symbol',
                },
                {
                    address: tokenAddress,
                    abi: ERC20_ABI_json_1.default,
                    functionName: 'decimals',
                },
            ]).flat();
            tokenResults = await (0, actions_1.multicall)(client, { contracts: tokenCalls, allowFailure: true });
        }
    }
    catch (error) {
        // Rethrow the error to be caught by the main build process
        throw new Error(`Failed during data fetching in buildGamma: ${error instanceof Error ? error.message : String(error)}`);
    }
    // 4. Map token details for easy lookup
    const tokenDetailsMap = new Map();
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
    const getERC20TokenInfo = (address) => {
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
    const processedData = manualEntries.map((entry, index) => {
        const token0Address = lpResults[index * 4];
        const token1Address = lpResults[index * 4 + 1];
        const lpName = lpResults[index * 4 + 2];
        const lpSymbol = lpResults[index * 4 + 3];
        return {
            name: entry.name,
            logoURI: projectConfig.logoURI,
            chainId: chainId,
            lpData: {
                lpType: types_1.LPType.GAMMA,
                name: lpName,
                symbol: lpSymbol,
                toToken0: getERC20TokenInfo(token0Address),
                toToken1: getERC20TokenInfo(token1Address),
                hypervisor: entry.address,
                uniProxy: gammaConfig.uniProxyAddress,
            },
        };
    });
    return processedData;
};
exports.buildGamma = buildGamma;
