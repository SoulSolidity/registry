/**
 * Metadata types for on-chain data
 */

/**
 * Token metadata
 */
export interface TokenMetadata {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
}

/**
 * Base metadata interface for all LP types
 */
export interface BaseMetadata {
  token0: TokenMetadata;
  token1: TokenMetadata;
}

/**
 * UniswapV2-style LP metadata
 */
export interface UniV2Metadata extends BaseMetadata {
  factory: `0x${string}`;
  totalSupply: string;
  reserves: [string, string];
}

/**
 * Solidly-style LP metadata
 */
export interface SolidlyMetadata extends BaseMetadata {
  isStable: boolean;
  factory: `0x${string}`;
  totalSupply: string;
  reserves: [string, string];
}

/**
 * Gamma LP metadata
 */
export interface GammaMetadata extends BaseMetadata {
  uniProxy: `0x${string}`;
  poolAddress: `0x${string}`;
}

/**
 * ICHI LP metadata
 */
export interface IchiMetadata extends BaseMetadata {
  allowToken0: boolean;
  allowToken1: boolean;
  vaultAddress: `0x${string}`;
}

/**
 * Steer LP metadata (to be implemented later)
 */
export interface SteerMetadata extends BaseMetadata {
}

/**
 * Single token metadata
 */
export interface SingleTokenMetadata {
  token: TokenMetadata;
  toToken: TokenMetadata;
}

/**
 * Curve LP metadata
 */
export interface CurveMetadata {
  tokens: TokenMetadata[];
  poolAddress: `0x${string}`;
  poolType: string; // 2pool, 3pool, etc.
  lastUpdated: number;
}

/**
 * Metadata by LP type
 */
export type LPMetadata =
  | UniV2Metadata
  | SolidlyMetadata
  | GammaMetadata
  | IchiMetadata
  | SteerMetadata
  | SingleTokenMetadata
  | CurveMetadata; 