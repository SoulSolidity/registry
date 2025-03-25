import { ChainId } from '../../../types/enums';
import { ZapInfo } from '../../types/types';
import { GammaEntry } from '../../types/types';
import { Project } from '../../types/enums';
export declare function getGammaUniProxy(project: Project, chainId: ChainId): `0x${string}`;
export declare function createGammaZapInfo(name: string, hypervisor: `0x${string}`, project: Project, chainId: ChainId): ZapInfo;
export declare function createGammaZapInfoMap(entries: GammaEntry[], project: Project, chainId: ChainId): Record<`0x${string}`, ZapInfo>;
