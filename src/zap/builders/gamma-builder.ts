/**
 * Builder for Gamma LPs
 */
import { ChainId, GammaEntry, LPType, Project, ZapInfo } from '../types';
import { GammaDataRetriever } from '../data-retrievers';
import fs from 'fs';
import path from 'path';
import { getProjectConfig } from '../config';

/**
 * Builder for Gamma LPs
 */
export class GammaBuilder {
  private chainId: ChainId;
  private projectName: Project;
  private entries: GammaEntry[];
  private dataRetriever: GammaDataRetriever;

  /**
   * Create a new Gamma builder
   * @param chainId Chain ID
   * @param projectName Project name
   * @param entries Gamma entries
   */
  constructor(chainId: ChainId, projectName: Project, entries: GammaEntry[]) {
    this.chainId = chainId;
    this.projectName = projectName;
    this.entries = entries;
    this.dataRetriever = new GammaDataRetriever(chainId, projectName);
  }

  /**
   * Generate ZapInfo for a Gamma entry
   * @param entry Gamma entry
   * @returns ZapInfo object
   */
  private async buildZapInfo(entry: GammaEntry): Promise<ZapInfo> {
    const projectConfig = getProjectConfig(this.chainId, this.projectName);

    if (!projectConfig || !projectConfig.gamma) {
      throw new Error(`No Gamma configuration found for ${this.projectName} on chain ${this.chainId}`);
    }

    return {
      name: entry.name,
      icon: projectConfig.icon,
      lpData: {
        lpType: LPType.GAMMA,
        hypervisor: entry.address,
        uniProxy: projectConfig.gamma.uniProxyAddress,
      },
    };
  }

  /**
   * Generate metadata for all entries in a format that matches the final consolidated structure
   */
  async generateMetadata(): Promise<void> {
    console.log(`Generating metadata for ${this.entries.length} Gamma LPs on chain ${this.chainId} for ${this.projectName}...`);

    // Fetch raw metadata first
    const metadataArray = await this.dataRetriever.fetchAllMetadata(this.entries);

    // Get project configuration
    const projectConfig = getProjectConfig(this.chainId, this.projectName);
    if (!projectConfig || !projectConfig.gamma) {
      throw new Error(`No Gamma configuration found for ${this.projectName} on chain ${this.chainId}`);
    }

    // Create the metadata directly in the final format needed for consolidation
    // Instead of having an array of entries, we'll have a map of address -> lpInfo object
    const finalMetadata: Record<string, any> = {};

    for (const metadata of metadataArray) {
      const pairName = `${metadata.token0.symbol}-${metadata.token1.symbol}`;
      const displayName = `${this.projectName} Gamma (${pairName})`;

      // Format matches exactly what we need in the final allLPs.json
      finalMetadata[metadata.poolAddress] = {
        name: displayName,
        icon: projectConfig.icon,
        toToken0: metadata.token0,
        toToken1: metadata.token1,
        lpData: {
          lpType: LPType.GAMMA.toLowerCase(),
          hypervisor: metadata.poolAddress,
          uniProxy: metadata.uniProxy
        }
      };
    }

    // Ensure the directory exists
    const dirPath = path.join(process.cwd(), 'src', 'zap', 'auto-generated', ChainId[this.chainId].toLowerCase(), this.projectName);
    fs.mkdirSync(dirPath, { recursive: true });

    // Write the metadata file - this is now in the exact format needed for consolidation
    fs.writeFileSync(
      path.join(dirPath, 'gamma-metadata.json'),
      JSON.stringify(finalMetadata, null, 2)
    );

    console.log(`Generated metadata for ${Object.keys(finalMetadata).length} Gamma LPs, ready for consolidation`);
  }

  /**
   * Build ZapInfo for all entries
   * @returns Map of address to ZapInfo
   */
  async build(): Promise<Record<string, ZapInfo>> {
    console.log(`Building ZapInfo for ${this.entries.length} Gamma LPs on chain ${this.chainId} for ${this.projectName}...`);

    const result: Record<string, ZapInfo> = {};

    for (const entry of this.entries) {
      try {
        const zapInfo = await this.buildZapInfo(entry);
        result[entry.address] = zapInfo;
      } catch (error) {
        console.error(`Error building ZapInfo for ${entry.address}:`, error);
      }
    }

    return result;
  }
} 