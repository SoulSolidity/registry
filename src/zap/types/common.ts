/**
 * Common types for the zap system
 */

import { ChainId } from "../../types/enums";

/**
 * Chain names mapping
 */
export const ChainNames: Record<ChainId, string> = {
  [ChainId.ETH]: 'ethereum',
  [ChainId.BNB]: 'bnb',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.ARBITRUM]: 'arbitrum',
  [ChainId.LINEA]: 'linea',
  [ChainId.BASE]: 'base',
  [ChainId.AVAX]: 'avalanche',
  [ChainId.BLAST]: 'blast',
  [ChainId.LIGHTLINK]: 'lightlink',
  [ChainId.IOTA]: 'iota',
  [ChainId.BNB_TESTNET]: 'bnb_testnet',
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

export enum ProjectProtocol {
  ApeBond = 'ApeBond',
  LynexGauge = 'LynexGauge',
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
  symbol: string;
}

export interface GammaEntry extends BaseEntry {
  // Gamma entries just have address and name in the manual file
}

export interface IchiEntry extends BaseEntry {
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
  logoURI: string;
}