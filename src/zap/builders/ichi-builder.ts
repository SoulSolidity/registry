/**
 * Builder for ICHI LPs
 */
import { ChainId, IchiEntry, LPType, Project, ZapInfo } from '../types';
import { IchiDataRetriever } from '../data-retrievers';
import fs from 'fs';
import path from 'path';
import { getProjectConfig } from '../config';

/**
 * Builder for ICHI LPs
 */
export class IchiBuilder {
  private chainId: ChainId;
  private projectName: Project;
  private entries: IchiEntry[];
  private underlyingDex: string;
  private dataRetriever: IchiDataRetriever;
  
  /**
   * Create a new ICHI builder
   * @param chainId Chain ID
   * @param projectName Project name
   * @param entries ICHI entries
   * @param underlyingDex Underlying DEX name
   */
  constructor(chainId: ChainId, projectName: Project, entries: IchiEntry[], underlyingDex: string) {
    this.chainId = chainId;
    this.projectName = projectName;
    this.entries = entries;
    this.underlyingDex = underlyingDex;
    this.dataRetriever = new IchiDataRetriever(chainId, underlyingDex);
  }
  
  /**
   * Generate ZapInfo for an ICHI entry
   * @param entry ICHI entry
   * @returns ZapInfo object
   */
  private async buildZapInfo(entry: IchiEntry): Promise<ZapInfo> {
    const projectConfig = getProjectConfig(this.chainId, this.projectName);
    
    if (!projectConfig) {
      throw new Error(`No project configuration found for ${this.projectName} on chain ${this.chainId}`);
    }
    
    return {
      name: entry.name,
      icon: projectConfig.icon,
      lpData: {
        lpType: LPType.ICHI,
        vault: entry.address,
        underlyingDex: entry.underlyingDex || this.underlyingDex,
      },
    };
  }
  
  /**
   * Generate metadata for all entries in a format that matches the final consolidated structure
   */
  async generateMetadata(): Promise<void> {
    console.log(`Generating metadata for ${this.entries.length} ICHI LPs on chain ${this.chainId} for ${this.projectName}...`);
    
    // Fetch metadata for all entries
    const metadataArray = await this.dataRetriever.fetchAllMetadata(this.entries);
    
    // Get project configuration
    const projectConfig = getProjectConfig(this.chainId, this.projectName);
    if (!projectConfig) {
      throw new Error(`No project configuration found for ${this.projectName} on chain ${this.chainId}`);
    }
    
    // Create the metadata directly in the final format needed for consolidation
    // Instead of having an array of entries, we'll have a map of address -> lpInfo object
    const finalMetadata: Record<string, any> = {};
    
    for (const metadata of metadataArray) {
      const pairName = `${metadata.token0.symbol}-${metadata.token1.symbol}`;
      const displayName = `${this.projectName} Ichi (${pairName})`;
      
      // Format matches exactly what we need in the final allLPs.json
      finalMetadata[metadata.vaultAddress] = {
        name: displayName,
        icon: projectConfig.icon,
        lpData: {
          lpType: LPType.ICHI.toLowerCase(),
          vault: metadata.vaultAddress,
          underlyingDex: this.underlyingDex
        }
      };
    }
    
    // Ensure the directory exists
    const dirPath = path.join(process.cwd(), 'src', 'zap', 'auto-generated', ChainId[this.chainId].toLowerCase(), this.projectName);
    fs.mkdirSync(dirPath, { recursive: true });
    
    // Write the metadata file - this is now in the exact format needed for consolidation
    fs.writeFileSync(
      path.join(dirPath, 'ichi-metadata.json'),
      JSON.stringify(finalMetadata, null, 2)
    );
    
    console.log(`Generated metadata for ${Object.keys(finalMetadata).length} ICHI LPs, ready for consolidation`);
  }
  
  /**
   * Build ZapInfo for all entries
   * @returns Map of address to ZapInfo
   */
  async build(): Promise<Record<string, ZapInfo>> {
    console.log(`Building ZapInfo for ${this.entries.length} ICHI LPs on chain ${this.chainId} for ${this.projectName}...`);
    
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