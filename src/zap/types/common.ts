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

export interface BaseEntry {
  address: `0x${string}`;
  name: string;
}

export interface GammaEntry extends BaseEntry {
  // Gamma entries just have address and name in the manual file
}

export interface IchiEntry extends BaseEntry {
  underlyingDex?: string;
}

export interface SteerEntry extends BaseEntry {
  periphery?: `0x${string}`;
}


export interface CurveEntry extends BaseEntry {
}

export interface ERC20TokenInfo {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
}