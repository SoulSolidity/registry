import { ChainId, ZapLPType } from '../../../types/enums';
import { ZapInfo } from '../../types/types';
import { GammaEntry } from '../../types/types';
import { Project } from '../../types/enums';
import { ProjectIcon } from '../../types/constants';
import { gammaUniProxy } from './types';

// Utility function to get Gamma uniProxy addresses
export function getGammaUniProxy(project: Project, chainId: ChainId): `0x${string}` {
    const uniProxy = gammaUniProxy[project]?.[chainId] ?? '0x0000000000000000000000000000000000000000';
    if (uniProxy === '0x0000000000000000000000000000000000000000') {
        console.warn(`No uniProxy found for project ${project} on chain ${chainId}`);
    }
    return uniProxy;
}

export function createGammaZapInfo(name: string, hypervisor: `0x${string}`, project: Project, chainId: ChainId): ZapInfo {
    return {
        name,
        icon: ProjectIcon[project],
        lpData: {
            lpType: ZapLPType.Gamma,
            hypervisor,
            uniProxy: getGammaUniProxy(project, chainId)
        },
    };
}

export function createGammaZapInfoMap(
    entries: GammaEntry[],
    project: Project,
    chainId: ChainId
): Record<`0x${string}`, ZapInfo> {
    const result: Record<`0x${string}`, ZapInfo> = {};

    for (const entry of entries) {
        result[entry.address] = createGammaZapInfo(
            entry.name,
            entry.address,
            project,
            chainId
        );
    }

    return result;
} 