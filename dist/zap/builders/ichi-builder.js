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
exports.buildIchi = exports.buildSingleIchiEntry = void 0;
const actions_1 = require("viem/actions");
const types_1 = require("../types");
const chains_1 = require("../config/chains");
const ICHIVault_ABI_json_1 = __importDefault(require("../abi/ICHIVault_ABI.json"));
const ERC20_ABI_json_1 = __importDefault(require("../abi/ERC20_ABI.json"));
const projectConfigs = __importStar(require("../config/projects"));
const client_1 = require("../utils/client");
/**
 * Builds data for a single Ichi entry
 *
 * @param entry The Ichi entry to build data for
 * @param chainId The chain ID
 * @param project The project identifier
 * @returns Promise resolving to ZapInfo
 */
const buildSingleIchiEntry = async (entry, chainId, project) => {
    // Find the project configuration for the given project and chainId
    const projectConfigMap = Object.values(projectConfigs).find((config) => config[chainId]?.project === project);
    const chainConfig = chains_1.chainConfigs[chainId];
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
    const client = (0, client_1.getClient)(chainId);
    // Fetch LP details
    const lpCalls = [
        {
            address: entry.address,
            abi: ICHIVault_ABI_json_1.default,
            functionName: 'allowToken0',
        },
        {
            address: entry.address,
            abi: ICHIVault_ABI_json_1.default,
            functionName: 'allowToken1',
        },
        {
            address: entry.address,
            abi: ICHIVault_ABI_json_1.default,
            functionName: 'token0',
        },
        {
            address: entry.address,
            abi: ICHIVault_ABI_json_1.default,
            functionName: 'token1',
        },
        {
            address: entry.address,
            abi: ICHIVault_ABI_json_1.default,
            functionName: 'name',
        },
        {
            address: entry.address,
            abi: ICHIVault_ABI_json_1.default,
            functionName: 'symbol',
        },
    ];
    const lpResults = await (0, actions_1.multicall)(client, { contracts: lpCalls, allowFailure: false });
    // Get token addresses
    const token0Address = lpResults[2];
    const token1Address = lpResults[3];
    const uniqueTokenAddresses = [token0Address, token1Address];
    // Fetch token details
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
    const tokenResults = await (0, actions_1.multicall)(client, { contracts: tokenCalls, allowFailure: true });
    // Map token details
    const tokenDetailsMap = new Map();
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
    return {
        name: entry.name,
        logoURI: projectConfig.logoURI,
        chainId: chainId,
        lpData: {
            lpType: types_1.LPType.ICHI,
            name: lpResults[4],
            symbol: lpResults[5],
            toToken0: getERC20TokenInfo(token0Address),
            toToken1: getERC20TokenInfo(token1Address),
            allowToken0: lpResults[0],
            allowToken1: lpResults[1],
            vault: entry.address,
            ichiConfig: ichiConfig,
        },
    };
};
exports.buildSingleIchiEntry = buildSingleIchiEntry;
/**
 * Fetches on-chain data for Ichi LPs and combines it with manual entries.
 *
 * @param manualEntries Array of manual Ichi entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo.
 */
const buildIchi = async (manualEntries, chainId, project, parentTask) => {
    if (manualEntries.length === 0) {
        parentTask.skip('No manual entries provided.');
        return [];
    }
    try {
        // Process each entry using the new buildSingleIchiEntry function
        const processedData = await Promise.all(manualEntries.map(entry => (0, exports.buildSingleIchiEntry)(entry, chainId, project)));
        return processedData;
    }
    catch (error) {
        throw new Error(`Failed during data fetching in buildIchi: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.buildIchi = buildIchi;
