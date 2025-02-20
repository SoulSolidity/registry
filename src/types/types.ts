import { IchiSupportedDex, ZapLPType, ZapProtocols } from "./enums";

export type ZapInfo = {
    name: string;
    lpData: SingleTokenInfo | UniV2LPInfo | GammaLPInfo | IchiLPInfo | SolidlyLPInfo | CurveLPInfo | SteerLPInfo;
    protocolData?: ApeBondInfo;
};

// LP Data
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

//Protocol Data
export type ApeBondInfo = {
    protocol: ZapProtocols.ApeBond;
    bond: string;
};



