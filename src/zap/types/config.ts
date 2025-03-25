/**
 * Configuration types for the zap system
 */
import { ChainId, DexType, Project } from './common';

/**
 * Chain configuration interface
 */
export interface ChainConfig {
  name: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  multicallAddress: `0x${string}`;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

/**
 * DEX Factory configuration interface
 */
export interface DexFactoryConfig {
  address: `0x${string}`;
  type: 'UniswapV2' | 'Solidly' | 'Other';
  initCodeHash?: string;
  name: string;
}

/**
 * Gamma configuration interface
 */
export interface GammaConfig {
  uniProxyAddress: `0x${string}`;
}

/**
 * Project configuration (e.g., PancakeSwap, Uniswap, etc.)
 */
export interface ProjectConfig {
  name: string;
  icon: string;
  dexType: DexType;
  factories?: DexFactoryConfig[];
  gamma?: GammaConfig;
  tokens?: {
    [symbol: string]: `0x${string}`;
  };
}

/**
 * Full configuration type
 */
export interface Config {
  chains: { [key in ChainId]?: ChainConfig };
  projects: Partial<Record<ChainId, Partial<Record<Project, ProjectConfig>>>>;
} 