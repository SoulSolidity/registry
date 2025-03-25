import { IchiSupportedChainId, IchiSupportedDex } from "../types/enums";
export declare const addressConfig: Partial<Record<IchiSupportedChainId, Partial<Record<IchiSupportedDex, {
    factoryAddress: string;
    depositGuard: {
        address: string;
        version: number;
    };
    vaultDeployerAddress: string;
    isAlgebra: boolean;
    ammVersion?: string;
    is2Thick?: boolean;
}>>>>;
