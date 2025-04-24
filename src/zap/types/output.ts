import { LPType, ERC20TokenInfo, ProjectProtocol } from './common';
import { IchiConfig } from './config';

export interface ZapInfo {
  name: string;
  logoURI: string;
  chainId: number;
  lpData: LPData;
  protocolData?: ProtocolData;
}

export interface SingleTokenInfo {
  lpType: LPType.SINGLE;
  toToken: ERC20TokenInfo;
}
export interface UniV2LPInfo {
  lpType: LPType.UNIV2;
  name: string;
  symbol: string;
  toToken0: ERC20TokenInfo;
  toToken1: ERC20TokenInfo;
  lpAddress: string;
  factory: string;
  router: string;
}

export interface SolidlyLPInfo {
  lpType: LPType.SOLIDLY;
  name: string;
  symbol: string;
  toToken0: ERC20TokenInfo;
  toToken1: ERC20TokenInfo;
  stable: boolean;
  lpAddress: string;
  factory: string;
  router: string;
}


export interface GammaLPInfo {
  lpType: LPType.GAMMA;
  name: string;
  symbol: string;
  toToken0: ERC20TokenInfo;
  toToken1: ERC20TokenInfo;
  hypervisor: string;
  uniProxy: string;
}

export interface IchiLPInfo {
  lpType: LPType.ICHI;
  name: string;
  symbol: string;
  toToken0: ERC20TokenInfo;
  toToken1: ERC20TokenInfo;
  allowToken0: boolean;
  allowToken1: boolean;
  vault: string;
  ichiConfig: IchiConfig;
}

export interface CurveLPInfo {
  lpType: LPType.CURVE;
  name: string;
  symbol: string;
  lpAddress: string;
}

export interface SteerLPInfo {
  lpType: LPType.STEER;
  name: string;
  symbol: string;
  toToken0: ERC20TokenInfo;
  toToken1: ERC20TokenInfo;
  lpAddress: string;
  periphery: string;
}

export type LPData =
  | SingleTokenInfo
  | UniV2LPInfo
  | GammaLPInfo
  | IchiLPInfo
  | SolidlyLPInfo
  | CurveLPInfo
  | SteerLPInfo;


//Protocol data
export type ApeBondProtocolData = {
  protocol: ProjectProtocol.ApeBond;
  bond: string;
};

export type ProtocolData = ApeBondProtocolData;