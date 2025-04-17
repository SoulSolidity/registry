import { Project } from "./common";
export interface ChainConfig {
    name: string;
    rpcUrl: string;
    blockExplorerUrl: string;
    multicallAddress: `0x${string}`;
    trustwalletLogoURI: (address: string) => string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
}
export interface GammaConfig {
    uniProxyAddress: `0x${string}`;
}
export interface IchiConfig {
    factoryAddress: string;
    depositGuard: {
        address: string;
        version: number;
    };
    vaultDeployerAddress: string;
    isAlgebra: boolean;
}
export interface UniV2Config {
    factoryAddress: string;
    routerAddress: string;
}
export interface SolidlyConfig {
    factoryAddress: string;
    routerAddress: string;
}
export interface ProjectConfig {
    project: Project;
    logoURI: string;
    uniV2Config?: UniV2Config;
    solidlyConfig?: SolidlyConfig;
    gammaConfig?: GammaConfig;
    ichiConfig?: IchiConfig;
}
