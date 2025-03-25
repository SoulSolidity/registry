"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABIS = void 0;
exports.getClient = getClient;
/**
 * Viem client utility for efficient data retrieval
 */
const config_1 = require("../../config");
const types_1 = require("../../types");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
// Map ChainId to viem chain objects 
const chainMap = {
    [types_1.ChainId.ETHEREUM]: chains_1.mainnet,
    [types_1.ChainId.BNB]: chains_1.bsc,
    [types_1.ChainId.POLYGON]: chains_1.polygon,
    [types_1.ChainId.ARBITRUM]: chains_1.arbitrum,
    [types_1.ChainId.BASE]: chains_1.base,
    [types_1.ChainId.AVALANCHE]: chains_1.avalanche,
    [types_1.ChainId.LINEA]: chains_1.linea,
    // Add more chains as needed
};
/**
 * Get a viem public client for a specific chain
 * @param chainId Chain ID
 * @returns PublicClient
 */
function getClient(chainId) {
    const chainConfig = config_1.chainConfigs[chainId];
    if (!chainConfig) {
        throw new Error(`Chain configuration not found for chain ID ${chainId}`);
    }
    const chain = chainMap[chainId];
    // For chains that aren't in the viem/chains package, create a custom chain object
    if (!chain) {
        console.warn(`Using custom chain configuration for chain ID ${chainId}`);
        const customChain = {
            id: Number(chainId),
            name: chainConfig.name || `Chain ${chainId}`,
            network: chainConfig.name?.toLowerCase() || `chain-${chainId}`,
            nativeCurrency: {
                name: chainConfig.nativeCurrency?.name || 'Ether',
                symbol: chainConfig.nativeCurrency?.symbol || 'ETH',
                decimals: chainConfig.nativeCurrency?.decimals || 18,
            },
            rpcUrls: {
                default: {
                    http: [chainConfig.rpcUrl],
                },
                public: {
                    http: [chainConfig.rpcUrl],
                },
            },
        };
        return (0, viem_1.createPublicClient)({
            chain: customChain,
            transport: (0, viem_1.http)(chainConfig.rpcUrl),
        });
    }
    return (0, viem_1.createPublicClient)({
        chain,
        transport: (0, viem_1.http)(chainConfig.rpcUrl),
    });
}
/**
 * Common ABIs for different contract types
 */
exports.ABIS = {
    ERC20: [
        {
            name: 'name',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ type: 'string' }],
        },
        {
            name: 'symbol',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ type: 'string' }],
        },
        {
            name: 'decimals',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ type: 'uint8' }],
        },
        {
            name: 'totalSupply',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ type: 'uint256' }],
        },
    ],
    UNISWAP_V2_PAIR: [
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
            name: 'getReserves',
            type: 'function',
            stateMutability: 'view',
            inputs: [],
            outputs: [
                { type: 'uint112', name: 'reserve0' },
                { type: 'uint112', name: 'reserve1' },
                { type: 'uint32', name: 'blockTimestampLast' },
            ],
        },
    ],
};
