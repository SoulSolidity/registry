/**
 * Chain configurations
 */
import { ChainConfig } from '../types';
import { ChainId } from '../../types/enums';

function getTrustwalletLogoURI(chainName: string, address: string) {
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/assets/${address}/logo.png`;
}
/**
 * Chain configurations with RPC URLs and other settings
 */
export const chainConfigs: Partial<Record<ChainId, ChainConfig>> = {
  [ChainId.ETH]: {
    name: 'Ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
    blockExplorerUrl: 'https://etherscan.io',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('ethereum', address)}`,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.BNB]: {
    name: 'BNB Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorerUrl: 'https://bscscan.com',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('smartchain', address)}`,
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [ChainId.POLYGON]: {
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('polygon', address)}`,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.ARBITRUM]: {
    name: 'Arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrl: 'https://arbiscan.io',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('arbitrum', address)}`,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.LINEA]: {
    name: 'Linea',
    rpcUrl: 'https://rpc.linea.build',
    blockExplorerUrl: 'https://lineascan.build',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('linea', address)}`,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.BASE]: {
    name: 'Base',
    rpcUrl: 'https://1rpc.io/base',
    blockExplorerUrl: 'https://basescan.org',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('base', address)}`,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.AVAX]: {
    name: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://snowtrace.io',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    trustwalletLogoURI: (address: string) => `${getTrustwalletLogoURI('avalanche', address)}`,
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
};