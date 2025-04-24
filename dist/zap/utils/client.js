"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const viem_1 = require("viem");
const chains_1 = require("../config/chains");
/**
 * Creates a Viem public client for the given chain ID.
 */
const getClient = (chainId) => {
    const chainConfig = chains_1.chainConfigs[chainId];
    if (!chainConfig) {
        throw new Error(`Unsupported chainId: ${chainId}`);
    }
    return (0, viem_1.createPublicClient)({
        chain: {
            id: chainId,
            name: chainConfig.name,
            nativeCurrency: chainConfig.nativeCurrency,
            rpcUrls: {
                default: { http: [chainConfig.rpcUrl] },
                public: { http: [chainConfig.rpcUrl] },
            },
            blockExplorers: {
                default: { name: 'Explorer', url: chainConfig.blockExplorerUrl },
            },
            contracts: {
                multicall3: {
                    address: chainConfig.multicallAddress,
                },
            },
        },
        transport: (0, viem_1.http)(),
    });
};
exports.getClient = getClient;
