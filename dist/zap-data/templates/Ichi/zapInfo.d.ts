import { IchiSupportedDex } from '../../../types/enums';
import { ZapInfo } from '../../types/types';
import { IchiEntry } from '../../types/types';
import { Project } from '../../types/enums';
export declare function createIchiZapInfo(name: string, vault: `0x${string}`, underlyingDex: IchiSupportedDex, project: Project): ZapInfo;
export declare function createIchiZapInfoMap(entries: IchiEntry[], project: Project, ichiUnderlyingDex: IchiSupportedDex): Record<`0x${string}`, ZapInfo>;
