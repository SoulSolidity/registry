import { ChainId, IchiSupportedDex, ZapLPType } from '../../../types/enums';
import { ZapInfo } from '../../types/types';
import { IchiEntry } from '../../types/types';
import { Project } from '../../types/enums';
import { ProjectIcon } from '../../types/constants';

export function createIchiZapInfo(name: string, vault: `0x${string}`, underlyingDex: IchiSupportedDex, project: Project): ZapInfo {
    return {
        name,
        icon: ProjectIcon[project],
        lpData: {
            lpType: ZapLPType.Ichi,
            vault,
            underlyingDex
        },
    };
}

export function createIchiZapInfoMap(
    entries: IchiEntry[],
    project: Project,
    ichiUnderlyingDex: IchiSupportedDex
): Record<`0x${string}`, ZapInfo> {
    const result: Record<`0x${string}`, ZapInfo> = {};

    for (const entry of entries) {
        result[entry.address] = createIchiZapInfo(
            entry.name,
            entry.address,
            ichiUnderlyingDex,
            project,
        );
    }

    return result;
} 