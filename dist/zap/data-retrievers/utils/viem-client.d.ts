import { ChainId } from '../../types';
import { PublicClient } from 'viem';
/**
 * Get a viem public client for a specific chain
 * @param chainId Chain ID
 * @returns PublicClient
 */
export declare function getClient(chainId: ChainId): PublicClient;
/**
 * Common ABIs for different contract types
 */
export declare const ABIS: {
    ERC20: readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }];
    UNISWAP_V2_PAIR: readonly [{
        readonly name: "token0";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "token1";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "getReserves";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint112";
            readonly name: "reserve0";
        }, {
            readonly type: "uint112";
            readonly name: "reserve1";
        }, {
            readonly type: "uint32";
            readonly name: "blockTimestampLast";
        }];
    }];
};
