/**
 * Common types for the zap system
 */

/**
 * Supported chains in the system
 */
export enum ChainId {
  ETHEREUM = 1,
  BNB = 56,
  POLYGON = 137,
  ARBITRUM = 42161,
  LINEA = 59144,
  BASE = 8453,
  AVALANCHE = 43114,
  BLAST = 81457,
  LIGHTLINK = 195,
  IOTA = 8822,
  BNB_TESTNET = 97,
}

/**
 * Chain names mapping
 */
export const ChainNames: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.BNB]: 'bnb',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.ARBITRUM]: 'arbitrum',
  [ChainId.LINEA]: 'linea',
  [ChainId.BASE]: 'base',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.BLAST]: 'blast',
  [ChainId.LIGHTLINK]: 'lightlink',
  [ChainId.IOTA]: 'iota',
  [ChainId.BNB_TESTNET]: 'bnb-testnet',
};

/**
 * Supported projects
 */
export enum Project {
  ApeBond = 'ApeBond',
  Uniswap = 'Uniswap',
  PancakeSwap = 'PancakeSwap',
  SushiSwap = 'SushiSwap',
  QuickSwap = 'QuickSwap',
  Zyberswap = 'Zyberswap',
  Thena = 'Thena',
  Retro = 'Retro',
  Ascent = 'Ascent',
  Ramses = 'Ramses',
  Camelot = 'Camelot',
  Lynex = 'Lynex',
  SynthSwap = 'SynthSwap',
  BaseX = 'BaseX',
  SwapBased = 'SwapBased',
}

/**
 * Supported LP types
 */
export enum LPType {
  UNIV2 = 'univ2',
  SOLIDLY = 'solidly',
  GAMMA = 'gamma',
  ICHI = 'ichi',
  STEER = 'steer',
  SINGLE = 'single',
  CURVE = 'curve',
}

/**
 * Supported DEX types
 */
export enum DexType {
  UNISWAP = 'uniswap',
  PANCAKESWAP = 'pancakeswap',
  QUICKSWAP = 'quickswap',
  SUSHISWAP = 'sushiswap',
  LYNEX = 'lynex',
  THENA = 'thena',
  SPARTADEX = 'spartadex',
  APESWAP = 'apeswap',
  CURVE = 'curve',
  METAVAULT = 'metavault',
  TREBLESWAP = 'trebleswap',
  AERODROME = 'aerodrome',
  // Add more DEXes as needed
}

/**
 * Basic interface for manually added LP entries
 */
export interface BaseEntry {
  address: `0x${string}`;
  name: string;
}

/**
 * Extended interface for UniV2 entries
 */
export interface UniV2Entry extends BaseEntry {
  router?: `0x${string}`;
}

/**
 * Extended interface for Solidly entries 
 */
export interface SolidlyEntry extends BaseEntry {
  router?: `0x${string}`;
  isStable?: boolean;
}

/**
 * Interface for Gamma entries
 */
export interface GammaEntry extends BaseEntry {
  // Gamma entries just have address and name in the manual file
}

/**
 * Interface for Ichi entries
 */
export interface IchiEntry extends BaseEntry {
  underlyingDex?: string;
}

/**
 * Interface for Steer entries (to be implemented later)
 */
export interface SteerEntry extends BaseEntry {
  periphery?: `0x${string}`;
}

/**
 * Interface for Single Token entries
 */
export interface SingleTokenEntry extends BaseEntry {
  toToken: `0x${string}`;
}

/**
 * Interface for Curve entries
 */
export interface CurveEntry extends BaseEntry {
  // Curve-specific properties
} 