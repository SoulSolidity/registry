# Zap Registry

A registry system for managing and generating metadata for DeFi zap entries.

## Overview

This project provides a system to manage zap entries for various DeFi protocols across multiple blockchains. It includes:

- Type definitions for zap entries
- Manual entry system for defining zap entries
- Data retrieval system for fetching on-chain data
- Build pipeline for generating final JSON files

## Project Structure

```
src/
├── zap/
│   ├── builders/            # Builder classes for generating metadata
│   ├── config/              # Configuration files for chains and projects
│   ├── data-retrievers/     # Data retriever classes for fetching on-chain data
│   ├── manual-entries/      # Manual entries for various chains and protocols
│   │   ├── arbitrum/
│   │   ├── avalanche/
│   │   ├── base/
│   │   ├── bnb/
│   │   ├── linea/
│   │   └── polygon/
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── build.ts             # Main build script
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Usage

```bash
# Build the TypeScript code
npm run build

# Generate JSON files
npm run generate

# Or run both in sequence
npm start

# For development (using ts-node)
npm run dev
```

## Adding New Entries

To add new manual entries:

1. Navigate to the appropriate chain directory under `src/zap/manual-entries/`
2. Create or modify files for the specific protocol and entry type
3. Follow the existing patterns for defining entries

## Building Custom Data Retrievers

To create a new data retriever:

1. Create a new file in `src/zap/data-retrievers/`
2. Implement the `DataRetriever` interface
3. Add your data retriever to the appropriate builder

## License

MIT
