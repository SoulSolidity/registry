import { PublicClient, Abi } from 'viem';
import { multicall } from 'viem/actions';
import { ERC20TokenInfo, ProtocolEntry, LPType, Project, ZapInfo, ApeBondProtocolData, ProjectProtocol, MulticallResult, IchiEntry } from '../types';
import { chainConfigs } from '../config/chains';
import ERC20_ABI from '../abi/ERC20_ABI.json';
import * as projectConfigs from '../config/projects';
import { ProjectConfig } from '../types/config';
import { ListrTaskWrapper } from 'listr2';
import { getClient } from '../utils/client';
import { ChainId } from '../../types/enums';
import { buildSingleIchiEntry } from './ichi-builder';
import { buildSingleGammaEntry } from './gamma-builder';
import { buildSingleUniV2Entry } from './uniV2-builder';
import { buildSingleSolidlyEntry } from './solidly-builder';
import { SingleTokenInfo, LPData } from '../types/output';

/**
 * Builds data for ApeBond bonds, supporting different LP types.
 *
 * @param manualEntries Array of manual bond entries.
 * @param chainId The chain ID.
 * @param project The project identifier.
 * @param parentTask The parent Listr task wrapper for reporting progress.
 * @returns Promise resolving to an array of ZapInfo.
 */
export const buildApeBond = async (
  manualEntries: ProtocolEntry[],
  chainId: ChainId,
  project: Project,
  parentTask: ListrTaskWrapper<any, any, any>
): Promise<ZapInfo[]> => {
  if (manualEntries.length === 0) {
    parentTask.skip('No manual entries provided.');
    return [];
  }

  // Find the project configuration for the given project and chainId
  const projectConfigMap = Object.values(projectConfigs).find(
    (config) => config[chainId]?.project === project
  ) as Partial<Record<ChainId, ProjectConfig>> | undefined;

  const projectConfig = projectConfigMap?.[chainId];
  if (!projectConfig) {
    throw new Error('Missing project configuration');
  }

  const client = getClient(chainId);
  const chainConfig = chainConfigs[chainId];
  if (!chainConfig) {
    throw new Error('Missing chain configuration');
  }

  try {
    // Process each entry
    const processedData = await Promise.all(
      manualEntries.map(async (entry) => {
        // Build input token info
        const tokenCalls = [
          {
            address: entry.inputToken.address,
            abi: ERC20_ABI as Abi,
            functionName: 'name',
          },
          {
            address: entry.inputToken.address,
            abi: ERC20_ABI as Abi,
            functionName: 'symbol',
          },
          {
            address: entry.inputToken.address,
            abi: ERC20_ABI as Abi,
            functionName: 'decimals',
          },
        ];

        const tokenResults = await multicall(client, { contracts: tokenCalls, allowFailure: true }) as MulticallResult<string | number | bigint>[];

        const nameResult = tokenResults[0];
        const symbolResult = tokenResults[1];
        const decimalsResult = tokenResults[2];

        const name = nameResult.status === 'success' && typeof nameResult.result === 'string'
          ? nameResult.result
          : 'Unknown Name';
        const symbol = symbolResult.status === 'success' && typeof symbolResult.result === 'string'
          ? symbolResult.result
          : '???';
        const decimals = decimalsResult.status === 'success' && (typeof decimalsResult.result === 'number' || typeof decimalsResult.result === 'bigint')
          ? Number(decimalsResult.result)
          : 18;

        const inputTokenInfo: ERC20TokenInfo = {
          address: entry.inputToken.address,
          name,
          symbol,
          decimals,
          logoURI: chainConfig.trustwalletLogoURI(entry.inputToken.address),
        };

        // Build LP data based on type
        let lpData: LPData;
        switch (entry.type) {
          case LPType.SINGLE:
            lpData = {
              lpType: LPType.SINGLE,
              toToken: inputTokenInfo,
            };
            break;
          case LPType.ICHI:
            if (!entry.inputTokenProject) {
              throw new Error('Missing Ichi project for ApeBond bond');
            }
            const ichiData = await buildSingleIchiEntry(entry.inputToken, chainId, entry.inputTokenProject);
            lpData = ichiData.lpData;
            break;
          case LPType.GAMMA:
            if (!entry.inputTokenProject) {
              throw new Error('Missing Gamma project for ApeBond bond');
            }
            const gammaData = await buildSingleGammaEntry(entry.inputToken, chainId, entry.inputTokenProject);
            lpData = gammaData.lpData;
            break;
          case LPType.UNIV2:
            if (!entry.inputTokenProject) {
              throw new Error('Missing UniV2 project for ApeBond bond');
            }
            const uniV2Data = await buildSingleUniV2Entry(entry.inputToken.address, chainId, entry.inputTokenProject);
            lpData = uniV2Data.lpData;
            break;
          case LPType.SOLIDLY:
            if (!entry.inputTokenProject) {
              throw new Error('Missing Solidly project for ApeBond bond');
            }
            const solidlyData = await buildSingleSolidlyEntry(entry.inputToken.address, chainId, entry.inputTokenProject);
            lpData = solidlyData.lpData;
            break;
          default:
            throw new Error(`Unsupported bond type: ${entry.type}`);
        }

        const protocolData: ApeBondProtocolData = {
          protocol: ProjectProtocol.ApeBond,
          bond: entry.address,
        };

        return {
          name: entry.name,
          logoURI: projectConfig.logoURI,
          chainId: chainId,
          inputToken: inputTokenInfo,
          lpData: lpData,
          protocolData,
        };
      })
    );

    return processedData;
  } catch (error) {
    throw new Error(`Failed during data fetching in buildApeBond: ${error instanceof Error ? error.message : String(error)}`);
  }
};
