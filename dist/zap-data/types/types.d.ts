import { IchiSupportedDex, ZapLPType, ZapProtocols } from "../../types/enums";
export type GammaEntry = {
    address: `0x${string}`;
    name: string;
};
export type IchiEntry = {
    address: `0x${string}`;
    name: string;
};
export type ApeBondEntry = {
    address: `0x${string}`;
    name: string;
    toToken: `0x${string}`;
};
export type ZapInfo = {
    name: string;
    icon?: string;
    lpData: SingleTokenInfo | UniV2LPInfo | GammaLPInfo | IchiLPInfo | SolidlyLPInfo | CurveLPInfo | SteerLPInfo;
    protocolData?: ApeBondInfo;
};
export type SingleTokenInfo = {
    lpType: ZapLPType.Single;
    toToken: string;
};
export type UniV2LPInfo = {
    lpType: ZapLPType.UniV2;
    lpAddress: string;
    router: string;
};
export type GammaLPInfo = {
    lpType: ZapLPType.Gamma;
    uniProxy: string;
    hypervisor: string;
};
export type IchiLPInfo = {
    lpType: ZapLPType.Ichi;
    vault: string;
    underlyingDex: IchiSupportedDex;
};
export type SolidlyLPInfo = {
    lpType: ZapLPType.Solidly;
    lpAddress: string;
    router: string;
};
export type CurveLPInfo = {
    lpType: ZapLPType.Curve;
    lpAddress: string;
};
export type SteerLPInfo = {
    lpType: ZapLPType.Steer;
    lpAddress: string;
    periphery: string;
};
export type ApeBondInfo = {
    protocol: ZapProtocols.ApeBond;
    bond: string;
};
