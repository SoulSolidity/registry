"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../types/enums");
const defaultZapInputTokens = {
    [enums_1.ChainId.ETH]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'ETH', name: 'Ethereum', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png' },
        { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC', name: 'USD Coin', decimals: 6, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png' },
        { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT', name: 'Tether USD', decimals: 6, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png' },
    ],
    [enums_1.ChainId.BNB]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'BNB', name: 'Binance Coin', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/info/logo.png' },
        { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', name: 'Tether USD', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png' },
        { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', symbol: 'USDC', name: 'USD Coin', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/assets/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/logo.png' }
    ],
    [enums_1.ChainId.LINEA]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'ETH', name: 'Ethereum', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png' },
        { address: '0x176211869ca2b568f2a7d4ee941e073a821ee1ff', symbol: 'USDC', name: 'USD Coin', decimals: 6, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png' },
        { address: '0xA219439258ca9da29E9Cc4cE5596924745e12B93', symbol: 'USDT', name: 'Tether USD', decimals: 6, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png' },
    ],
    [enums_1.ChainId.POLYGON]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'POL', name: 'Polygon', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/polygon/info/logo.png' },
    ],
    [enums_1.ChainId.BASE]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'ETH', name: 'Ethereum', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png' },
    ],
    [enums_1.ChainId.ARBITRUM]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'ETH', name: 'Ethereum', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png' },
    ],
    [enums_1.ChainId.AVAX]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'AVAX', name: 'Avalanche', decimals: 18 },
    ],
    [enums_1.ChainId.BLAST]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'ETH', name: 'Ethereum', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png' },
    ],
    [enums_1.ChainId.LIGHTLINK]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'LL', name: 'Lightlink', decimals: 18 },
    ],
    [enums_1.ChainId.IOTA]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'IOTA', name: 'IOTA', decimals: 18 },
    ],
    [enums_1.ChainId.BNB_TESTNET]: [
        { address: '0x0000000000000000000000000000000000000000', symbol: 'BNB', name: 'Binance Coin', decimals: 18, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/info/logo.png' },
    ],
};
exports.default = defaultZapInputTokens;
