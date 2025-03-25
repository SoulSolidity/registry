/**
 * Output types for the zap system
 */
import { LPType } from './common';

/**
 * Final zap info structure for production
 */
export interface ZapInfo {
  name: string;
  icon?: string;
  lpData: LPData;
  protocolData?: ProtocolData;
}

/**
 * Union type for all LP data types
 */
export type LPData =
  | SingleTokenInfo
  | UniV2LPInfo
  | GammaLPInfo
  | IchiLPInfo
  | SolidlyLPInfo
  | CurveLPInfo
  | SteerLPInfo;

/**
 * Single token LP info
 */
export interface SingleTokenInfo {
  lpType: LPType.SINGLE;
  toToken: string;
}

/**
 * UniV2-style LP info
 */
export interface UniV2LPInfo {
  lpType: LPType.UNIV2;
  lpAddress: string;
  router: string;
}

/**
 * Gamma LP info
 */
export interface GammaLPInfo {
  lpType: LPType.GAMMA;
  hypervisor: string;
  uniProxy: string;
}

/**
 * Ichi LP info
 */
export interface IchiLPInfo {
  lpType: LPType.ICHI;
  vault: string;
  underlyingDex: string;
}

/**
 * Solidly LP info
 */
export interface SolidlyLPInfo {
  lpType: LPType.SOLIDLY;
  lpAddress: string;
  router: string;
}

/**
 * Curve LP info
 */
export interface CurveLPInfo {
  lpType: LPType.CURVE;
  lpAddress: string;
}

/**
 * Steer LP info
 */
export interface SteerLPInfo {
  lpType: LPType.STEER;
  lpAddress: string;
  periphery: string;
}

/**
 * Protocol-specific data
 */
export interface ProtocolData {
  protocol: string;
  [key: string]: string;
}

/**
 * Final output format organized by chain IDs and addresses
 */
export interface ZapOutput {
  [chainId: string]: {
    [address: string]: ZapInfo;
  };
} 