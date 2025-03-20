import { ZapLPType, ZapProtocols } from '../../types/enums';
import { ZapInfo } from '../types/types';
import { ApeBondEntry } from '../types/types';
import { ProjectIcon } from '../types/constants';
import { Project } from '../types/enums';

/**
 * Factory function for ApeBond ZapInfo
 * @param name Bond name
 * @param address Bond address
 * @param toToken Destination token address
 * @returns ZapInfo object
 */
export function createApeBondZapInfo(name: string, address: `0x${string}`, toToken: `0x${string}`): ZapInfo {
  return {
    name,
    icon: ProjectIcon[Project.ApeBond],
    lpData: {
      lpType: ZapLPType.Single,
      toToken
    },
    protocolData: {
      protocol: ZapProtocols.ApeBond,
      bond: address
    }
  };
}

/**
 * Transforms an array of ApeBond entries into a Record of ZapInfo objects
 * @param entries Array of ApeBond entries
 * @returns Record of ZapInfo objects keyed by address
 */
export function createApeBondZapInfoMap(
  entries: ApeBondEntry[]
): Record<`0x${string}`, ZapInfo> {
  const result: Record<`0x${string}`, ZapInfo> = {};

  for (const entry of entries) {
    result[entry.address] = createApeBondZapInfo(
      entry.name,
      entry.address,
      entry.toToken
    );
  }

  return result;
} 