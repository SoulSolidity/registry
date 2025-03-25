import fs from 'fs';
import path from 'path';
import { ChainId, Project } from './types/common';
import { GammaBuilder, IchiBuilder } from './builders';
import { getEntriesForChain } from './manual-entries';
import { consolidateZapData } from './consolidate';

/**
 * Main build script to generate JSON files for all supported projects
 */
async function build() {
  console.log('Starting build process...');

  // Get all chain folders
  const chainsDir = path.join(__dirname, 'manual-entries');
  const chainFolders = fs.readdirSync(chainsDir)
    .filter(folder => fs.statSync(path.join(chainsDir, folder)).isDirectory());

  console.log(`Found ${chainFolders.length} chain folders:`, chainFolders);

  // Process each chain
  for (const chainFolder of chainFolders) {
    try {
      const chainId = getChainIdFromFolder(chainFolder);
      if (!chainId) {
        console.warn(`Skipping unknown chain folder: ${chainFolder}`);
        continue;
      }

      console.log(`Processing chain: ${chainFolder} (ID: ${chainId})`);

      // Get the chain directory path
      const chainDirPath = path.join(chainsDir, chainFolder);

      // Get all project folders inside the chain directory
      const projectFolders = fs.readdirSync(chainDirPath)
        .filter(folder => fs.statSync(path.join(chainDirPath, folder)).isDirectory());

      console.log(`Found ${projectFolders.length} project folders for chain ${chainFolder}`);

      // Process each project
      for (const projectFolder of projectFolders) {
        try {
          console.log(`Processing project: ${projectFolder}`);

          // Get project directory path
          const projectDirPath = path.join(chainDirPath, projectFolder);

          // Get all entry files in the project directory
          const entryFiles = fs.readdirSync(projectDirPath)
            .filter(file => file.endsWith('.ts') && !file.endsWith('index.ts'));

          console.log(`Found ${entryFiles.length} entry files for project ${projectFolder}`);

          // Process each entry file
          for (const entryFile of entryFiles) {
            // Extract LP type from file name (e.g., gamma.ts -> gamma)
            const lpType = path.basename(entryFile, '.ts');
            console.log(`Processing ${lpType} entries for ${projectFolder}`);

            // Get entries from chain
            const allEntries = getEntriesForChain(chainId);

            // Filter entries based on project and file name
            // This assumes entries are exported with a pattern like: projectNameLpTypeEntries
            // e.g., lynexGammaEntries, lynexIchiEntries
            const variableName = `${projectFolder.toLowerCase()}${lpType.charAt(0).toUpperCase() + lpType.slice(1)}Entries`;

            // Find entries from the imported entries that match the current project and LP type
            const entries = allEntries.filter(entry => {
              const entryName = entry.name.toLowerCase();
              return entryName.includes(projectFolder.toLowerCase()) && entryName.includes(lpType.toLowerCase());
            });

            if (entries.length === 0) {
              console.warn(`No entries found for ${projectFolder} ${lpType}`);
              continue;
            }

            console.log(`Building for project: ${projectFolder} with ${entries.length} ${lpType} entries`);

            if (!Object.values(Project).includes(projectFolder as Project)) {
              console.log(`${projectFolder} is not a valid Project.`);
            }

            // Process the entries
            try {
              switch (lpType.toLowerCase()) {
                case 'gamma':
                  // Create the gamma builder with all required arguments
                  const gammaBuilder = new GammaBuilder(chainId, projectFolder as Project, entries);
                  await gammaBuilder.generateMetadata();
                  break;
                case 'ichi':
                  // Create the ichi builder with all required arguments
                  const ichiBuilder = new IchiBuilder(chainId, projectFolder as Project, entries, projectFolder);
                  await ichiBuilder.generateMetadata();
                  break;
                default:
                  console.warn(`No builder available for LP type: ${lpType}`);
              }
            } catch (error) {
              console.error(`Error building for project ${projectFolder} ${lpType}:`, error);
            }
          }
        } catch (error) {
          console.error(`Error processing project ${projectFolder}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error processing chain ${chainFolder}:`, error);
    }
  }

  console.log('Build process completed!');
  
  // Run consolidation to create the all-in-one JSON file
  console.log('Starting consolidation process...');
  try {
    const outputPath = await consolidateZapData();
    console.log(`Consolidation completed. Output file: ${outputPath}`);
  } catch (error) {
    console.error('Consolidation failed:', error);
  }
}

/**
 * Helper function to convert folder name to ChainId
 */
function getChainIdFromFolder(folderName: string): ChainId | undefined {
  switch (folderName.toLowerCase()) {
    case 'arbitrum':
      return ChainId.ARBITRUM;
    case 'avalanche':
      return ChainId.AVALANCHE;
    case 'base':
      return ChainId.BASE;
    case 'bnb':
      return ChainId.BNB;
    case 'linea':
      return ChainId.LINEA;
    case 'polygon':
      return ChainId.POLYGON;
    default:
      return undefined;
  }
}

// Run the build process
if (require.main === module) {
  build()
    .then(() => {
      console.log('Build and consolidation completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Build failed:', error);
      process.exit(1);
    });
}

export { build }; 