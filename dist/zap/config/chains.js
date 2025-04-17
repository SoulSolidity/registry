"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainConfigs = void 0;
const enums_1 = require("../../types/enums");
function getTrustwalletLogoURI(chainName, address) {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/assets/${address}/logo.png`;
}
/**
 * Chain configurations with RPC URLs and other settings
 */
exports.chainConfigs = {
    [enums_1.ChainId.ETH]: {
        name: 'Ethereum',
        rpcUrl: 'https://eth.llamarpc.com',
        blockExplorerUrl: 'https://etherscan.io',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('ethereum', address)}`,
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    [enums_1.ChainId.BNB]: {
        name: 'BNB Chain',
        rpcUrl: 'https://bsc-dataseed.binance.org',
        blockExplorerUrl: 'https://bscscan.com',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('smartchain', address)}`,
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
    },
    [enums_1.ChainId.POLYGON]: {
        name: 'Polygon',
        rpcUrl: 'https://polygon-rpc.com',
        blockExplorerUrl: 'https://polygonscan.com',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('polygon', address)}`,
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
    },
    [enums_1.ChainId.ARBITRUM]: {
        name: 'Arbitrum',
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        blockExplorerUrl: 'https://arbiscan.io',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('arbitrum', address)}`,
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    [enums_1.ChainId.LINEA]: {
        name: 'Linea',
        rpcUrl: 'https://rpc.linea.build',
        blockExplorerUrl: 'https://lineascan.build',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('linea', address)}`,
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    [enums_1.ChainId.BASE]: {
        name: 'Base',
        rpcUrl: 'https://mainnet.base.org',
        blockExplorerUrl: 'https://basescan.org',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('base', address)}`,
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
    },
    [enums_1.ChainId.AVAX]: {
        name: 'Avalanche',
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        blockExplorerUrl: 'https://snowtrace.io',
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        trustwalletLogoURI: (address) => `${getTrustwalletLogoURI('avalanche', address)}`,
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
        },
    },
};
