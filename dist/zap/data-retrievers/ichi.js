"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IchiDataRetriever = void 0;
/**
 * ICHI data retriever
 */
const base_retriever_1 = require("./base-retriever");
const utils_1 = require("./utils");
const viem_1 = require("viem");
// ICHI Vault ABI Fragments
const ICHI_VAULT_ABI = [
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
        name: 'allowToken0',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'bool' }],
    },
    {
        name: 'allowToken1',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'bool' }],
    },
];
/**
 * Data retriever for ICHI LPs
 */
class IchiDataRetriever extends base_retriever_1.BaseDataRetriever {
    /**
     * Create a new ICHI data retriever
     * @param chainId Chain ID
     * @param underlyingDex Underlying DEX (e.g., 'Lynex', 'UniswapV3', etc.)
     */
    constructor(chainId, underlyingDex) {
        super(chainId);
        this.underlyingDex = underlyingDex;
    }
    /**
     * Fetch token metadata
     * @param address Token address
     * @returns Token metadata
     */
    async fetchTokenMetadata(address) {
        const tokenContract = (0, viem_1.getContract)({
            address,
            abi: utils_1.ABIS.ERC20,
            client: this.client,
        });
        const [name, symbol, decimals] = await Promise.all([
            tokenContract.read.name(),
            tokenContract.read.symbol(),
            tokenContract.read.decimals(),
        ]);
        return {
            address,
            name: String(name),
            symbol: String(symbol),
            decimals: Number(decimals),
        };
    }
    /**
     * Fetch ICHI LP metadata
     * @param entry ICHI entry
     * @returns ICHI metadata
     */
    async fetchMetadata(entry) {
        const vaultContract = (0, viem_1.getContract)({
            address: entry.address,
            abi: ICHI_VAULT_ABI,
            client: this.client,
        });
        // Get data from vault
        const [token0Address, token1Address, allowToken0, allowToken1] = await Promise.all([
            vaultContract.read.token0(),
            vaultContract.read.token1(),
            vaultContract.read.allowToken0(),
            vaultContract.read.allowToken1(),
        ]);
        // Fetch token metadata
        const [token0, token1] = await Promise.all([
            this.fetchTokenMetadata(token0Address),
            this.fetchTokenMetadata(token1Address),
        ]);
        return {
            token0,
            token1,
            allowToken0: Boolean(allowToken0),
            allowToken1: Boolean(allowToken1),
            vaultAddress: entry.address,
        };
    }
}
exports.IchiDataRetriever = IchiDataRetriever;
