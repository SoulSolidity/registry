import { IchiSupportedChainId, IchiSupportedDex } from "../types/enums";
declare const ichiAddressConfig: Partial<Record<IchiSupportedChainId, Partial<Record<IchiSupportedDex, {
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
export default ichiAddressConfig;
