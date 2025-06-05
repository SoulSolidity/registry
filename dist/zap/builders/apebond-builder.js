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
exports.buildApeBond = void 0;
const actions_1 = require("viem/actions");
const types_1 = require("../types");
const chains_1 = require("../config/chains");
const ERC20_ABI_json_1 = __importDefault(require("../abi/ERC20_ABI.json"));
const projectConfigs = __importStar(require("../config/projects"));
const client_1 = require("../utils/client");
const ichi_builder_1 = require("./ichi-builder");
const gamma_builder_1 = require("./gamma-builder");
const uniV2_builder_1 = require("./uniV2-builder");
const solidly_builder_1 = require("./solidly-builder");
/**
 * Builds data for ApeBond bonds, supporting different LP types.
 *
 * @param manualEntries Array of manual bond entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo.
 */
const buildApeBond = async (manualEntries, chainId, project, parentTask) => {
    if (manualEntries.length === 0) {
        parentTask.skip('No manual entries provided.');
        return [];
    }
    // Find the project configuration for the given project and chainId
    const projectConfigMap = Object.values(projectConfigs).find((config) => config[chainId]?.project === project);
    const projectConfig = projectConfigMap?.[chainId];
    if (!projectConfig) {
        throw new Error('Missing project configuration');
    }
    const client = (0, client_1.getClient)(chainId);
    const chainConfig = chains_1.chainConfigs[chainId];
    if (!chainConfig) {
        throw new Error('Missing chain configuration');
    }
    try {
        // Process each entry
        const processedData = await Promise.all(manualEntries.map(async (entry) => {
            // Build input token info
            const tokenCalls = [
                {
                    address: entry.inputToken.address,
                    abi: ERC20_ABI_json_1.default,
                    functionName: 'name',
                },
                {
                    address: entry.inputToken.address,
                    abi: ERC20_ABI_json_1.default,
                    functionName: 'symbol',
                },
                {
                    address: entry.inputToken.address,
                    abi: ERC20_ABI_json_1.default,
                    functionName: 'decimals',
                },
            ];
            const tokenResults = await (0, actions_1.multicall)(client, { contracts: tokenCalls, allowFailure: true });
            const nameResult = tokenResults[0];
            const symbolResult = tokenResults[1];
            const decimalsResult = tokenResults[2];
            const name = nameResult.status === 'success' && typeof nameResult.result === 'string'
                ? nameResult.result
                : 'Unknown Name';
            const symbol = symbolResult.status === 'success' && typeof symbolResult.result === 'string'
                ? symbolResult.result
                : '???';
            const decimals = decimalsResult.status === 'success' && (typeof decimalsResult.result === 'number' || typeof decimalsResult.result === 'bigint')
                ? Number(decimalsResult.result)
                : 18;
            const inputTokenInfo = {
                address: entry.inputToken.address,
                name,
                symbol,
                decimals,
                logoURI: chainConfig.trustwalletLogoURI(entry.inputToken.address),
            };
            // Build LP data based on type
            let lpData;
            switch (entry.type) {
                case types_1.LPType.SINGLE:
                    lpData = {
                        lpType: types_1.LPType.SINGLE,
                        toToken: inputTokenInfo,
                    };
                    break;
                case types_1.LPType.ICHI:
                    if (!entry.inputTokenProject) {
                        throw new Error('Missing Ichi project for ApeBond bond');
                    }
                    const ichiData = await (0, ichi_builder_1.buildSingleIchiEntry)(entry.inputToken, chainId, entry.inputTokenProject);
                    lpData = ichiData.lpData;
                    break;
                case types_1.LPType.GAMMA:
                    if (!entry.inputTokenProject) {
                        throw new Error('Missing Gamma project for ApeBond bond');
                    }
                    const gammaData = await (0, gamma_builder_1.buildSingleGammaEntry)(entry.inputToken, chainId, entry.inputTokenProject);
                    lpData = gammaData.lpData;
                    break;
                case types_1.LPType.UNIV2:
                    if (!entry.inputTokenProject) {
                        throw new Error('Missing UniV2 project for ApeBond bond');
                    }
                    const uniV2Data = await (0, uniV2_builder_1.buildSingleUniV2Entry)(entry.inputToken.address, chainId, entry.inputTokenProject);
                    lpData = uniV2Data.lpData;
                    break;
                case types_1.LPType.SOLIDLY:
                    if (!entry.inputTokenProject) {
                        throw new Error('Missing Solidly project for ApeBond bond');
                    }
                    const solidlyData = await (0, solidly_builder_1.buildSingleSolidlyEntry)(entry.inputToken.address, chainId, entry.inputTokenProject);
                    lpData = solidlyData.lpData;
                    break;
                default:
                    throw new Error(`Unsupported bond type: ${entry.type}`);
            }
            const protocolData = {
                protocol: types_1.ProjectProtocol.ApeBond,
                bond: entry.address,
            };
            return {
                name: entry.name,
                logoURI: projectConfig.logoURI,
                chainId: chainId,
                inputToken: inputTokenInfo,
                lpData: lpData,
                protocolData,
            };
        }));
        return processedData;
    }
    catch (error) {
        throw new Error(`Failed during data fetching in buildApeBond: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.buildApeBond = buildApeBond;
