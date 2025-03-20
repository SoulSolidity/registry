# Modular Zap Data Structure

This directory contains a modular approach to organizing zap data. Rather than having a single large file with all zap data, this approach separates the data into smaller, more manageable pieces.

## Directory Structure

- **templates/**: Contains template factories for different LP types
  - `gamma.ts`: Templates for Gamma LP types
  - `single.ts`: Templates for Single-token LP types (e.g., ApeBond)
  - *(Add new template files for different LP types as needed)*

- **chains/**: Contains chain-specific data files
  - `eth/`: Ethereum chain data
  - `polygon/`: Polygon chain data
  - `bnb/`: BNB chain data
  - `arbitrum/`: Arbitrum chain data
  - `linea/`: Linea chain data
  - `base/`: Base chain data
  - *(Add new chain directories as needed)*

- **types.ts**: Common types and enums used across the zap-data structure
- **utils.ts**: Utility functions for working with zap data
- **index.ts**: Main file that combines all the modular pieces into the final zapData structure

## How It Works

1. **Data Organization**: Chain-specific data files contain minimal information (address, name, etc.)
2. **Template Factories**: Template files provide functions to transform minimal data into complete ZapInfo objects
3. **Combination**: The index.ts file imports all data and templates, combining them into the complete zapData object
4. **Export**: The final zapData object is exported and used by the build system

## Adding New Entries

### For Existing LP Types and Chains

1. Find the appropriate chain data file in `chains/[chain]/`
2. Add new entries to the array

Example:
```typescript
// In chains/polygon/uniswap.ts
export const uniswapGammaEntries: GammaEntry[] = [
  // Existing entries...
  { address: "0xnewaddress", name: "Uniswap Gamma (TOKEN1-TOKEN2)" },
];
```

### For New Chains

1. Create a new directory under `chains/`
2. Create data files following the existing pattern
3. Update `index.ts` to import and process the new chain data

### For New LP Types

1. Create a new template file in `templates/`
2. Define factory functions for the new LP type
3. Create data files in the appropriate chain directories
4. Update `index.ts` to import and use the new template and data

## Benefits

- **Maintainability**: Each chain's data is separated into its own files
- **DRY Code**: Common patterns are defined once in templates
- **Scalability**: Easy to add new chains or LP types
- **Compatibility**: Produces the exact same output for the build system 