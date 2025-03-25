import * as fs from 'fs';
import * as path from 'path';

/**
 * This script consolidates all auto-generated zap data into a single file with structure:
 * {<chainId>:{<lpAddress>:<allInfoObject>}}
 */

// Type definitions to help with the consolidation
interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

interface GammaMetadata {
  token0: TokenInfo;
  token1: TokenInfo;
  uniProxy: string;
  poolAddress: string;
}

interface IchiMetadata {
  token0: TokenInfo;
  token1: TokenInfo;
  allowToken0: boolean;
  allowToken1: boolean;
  vaultAddress: string;
}

// Chain IDs mapping from names to actual IDs
const CHAIN_ID_MAP: Record<string, string> = {
  'arbitrum': '42161',
  'avalanche': '43114',
  'base': '8453',
  'bnb': '56',
  'linea': '59144',
  'polygon': '137',
  'eth': '1'
};

// Project icons
const PROJECT_ICONS: Record<string, string> = {
  'Lynex': 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
  'Uniswap': 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true'
};

async function main() {
  try {
    // First ensure the data directory exists
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Initialize the consolidated data structure
    const consolidatedData: Record<string, Record<string, any>> = {};
    
    // Initialize all chain IDs
    Object.values(CHAIN_ID_MAP).forEach(chainId => {
      consolidatedData[chainId] = {};
    });

    // Path to the auto-generated directory
    const autoGenDir = path.join(__dirname, '..', 'src', 'zap', 'auto-generated');
    
    // Check if auto-generated directory exists
    if (!fs.existsSync(autoGenDir)) {
      console.warn('Auto-generated directory not found:', autoGenDir);
      return;
    }

    // Get all chain directories
    const chainDirs = fs.readdirSync(autoGenDir);
    
    // Process each chain directory
    for (const chainDir of chainDirs) {
      const chainId = CHAIN_ID_MAP[chainDir.toLowerCase()];
      
      if (!chainId) {
        console.warn(`No chain ID mapping found for: ${chainDir}`);
        continue;
      }
      
      console.log(`Processing chain: ${chainDir} (ID: ${chainId})`);
      
      // Full path to the chain directory
      const chainPath = path.join(autoGenDir, chainDir);
      
      // Get all project directories in this chain
      const projectDirs = fs.readdirSync(chainPath);
      
      // Process each project directory
      for (const projectDir of projectDirs) {
        console.log(`Processing project: ${projectDir}`);
        
        // Full path to the project directory
        const projectPath = path.join(chainPath, projectDir);
        
        // Get all metadata files
        const metadataFiles = fs.readdirSync(projectPath)
          .filter(file => file.endsWith('-metadata.json'));
        
        // Process each metadata file
        for (const metadataFile of metadataFiles) {
          // Determine the LP type from filename
          const lpType = metadataFile.split('-')[0]; // e.g., "gamma" from "gamma-metadata.json"
          console.log(`Processing ${lpType} metadata for ${projectDir}`);
          
          // Read the metadata file
          const metadataPath = path.join(projectPath, metadataFile);
          const metadataContent = fs.readFileSync(metadataPath, 'utf8');
          const metadataArray = JSON.parse(metadataContent);
          
          // Process based on LP type
          if (lpType === 'gamma') {
            processGammaMetadata(metadataArray, consolidatedData[chainId], projectDir);
          } else if (lpType === 'ichi') {
            processIchiMetadata(metadataArray, consolidatedData[chainId], projectDir);
          } else {
            console.warn(`Unknown LP type: ${lpType}`);
          }
        }
      }
    }
    
    // Also include data from zap.json if it exists
    const zapFilePath = path.join(dataDir, 'constants', 'zap.json');
    if (fs.existsSync(zapFilePath)) {
      console.log('Merging with existing zap.json data...');
      const zapData = JSON.parse(fs.readFileSync(zapFilePath, 'utf8'));
      
      // Merge zapData into consolidatedData
      Object.entries(zapData).forEach(([chainId, chainData]) => {
        if (!consolidatedData[chainId]) {
          consolidatedData[chainId] = {};
        }
        
        Object.entries(chainData as Record<string, any>).forEach(([lpAddress, lpInfo]) => {
          consolidatedData[chainId][lpAddress] = lpInfo;
        });
      });
    }
    
    // Write the consolidated data to a JSON file
    const outputPath = path.join(dataDir, 'allLPs.json');
    fs.writeFileSync(outputPath, JSON.stringify(consolidatedData, null, 2));
    
    console.log(`Successfully consolidated all LP data to ${outputPath}`);
  } catch (error) {
    console.error('Consolidation failed:', error);
    process.exit(1);
  }
}

/**
 * Process Gamma metadata and add to consolidated data
 */
function processGammaMetadata(metadataArray: GammaMetadata[], consolidatedData: Record<string, any>, projectName: string) {
  metadataArray.forEach(metadata => {
    const pairName = `${metadata.token0.symbol}-${metadata.token1.symbol}`;
    const displayName = `${projectName} Gamma (${pairName})`;
    
    // Add to consolidated data with poolAddress as key
    consolidatedData[metadata.poolAddress] = {
      name: displayName,
      icon: PROJECT_ICONS[projectName] || '',
      lpData: {
        lpType: 'gamma',
        hypervisor: metadata.poolAddress,
        uniProxy: metadata.uniProxy
      }
    };
  });
}

/**
 * Process Ichi metadata and add to consolidated data
 */
function processIchiMetadata(metadataArray: IchiMetadata[], consolidatedData: Record<string, any>, projectName: string) {
  metadataArray.forEach(metadata => {
    const pairName = `${metadata.token0.symbol}-${metadata.token1.symbol}`;
    const displayName = `${projectName} Ichi (${pairName})`;
    
    // Add to consolidated data with vaultAddress as key
    consolidatedData[metadata.vaultAddress] = {
      name: displayName,
      icon: PROJECT_ICONS[projectName] || '',
      lpData: {
        lpType: 'ichi',
        vault: metadata.vaultAddress,
        underlyingDex: projectName
      }
    };
  });
}

main(); 