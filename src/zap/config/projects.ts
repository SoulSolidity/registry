/**
 * Project configurations
 */
import { ChainId, DexType, Project, ProjectConfig } from '../types';

/**
 * Project configurations by chain and project name
 */
export const projectConfigs: Partial<Record<ChainId, Partial<Record<Project, ProjectConfig>>>> = {
  [ChainId.ETHEREUM]: {
    [Project.Uniswap]: {
      name: 'Uniswap',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      dexType: DexType.UNISWAP,
      factories: [
        {
          address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
          type: 'UniswapV2',
          initCodeHash: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
          name: 'Uniswap V2 Factory',
        },
      ],
      gamma: {
        uniProxyAddress: '0x0000000000000000000000000000000000000000', // Replace with actual address
      },
    },
    [Project.SushiSwap]: {
      name: 'SushiSwap',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/SushiSwap.jpg?raw=true',
      dexType: DexType.SUSHISWAP,
      factories: [
        {
          address: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
          type: 'UniswapV2',
          initCodeHash: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
          name: 'SushiSwap Factory',
        },
      ],
    },
  },
  [ChainId.BNB]: {
    [Project.PancakeSwap]: {
      name: 'PancakeSwap',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg?raw=true',
      dexType: DexType.PANCAKESWAP,
      factories: [
        {
          address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
          type: 'UniswapV2',
          initCodeHash: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
          name: 'PancakeSwap V2 Factory',
        },
      ],
      gamma: {
        uniProxyAddress: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f',
      },
    },
    [Project.ApeBond]: {
      name: 'ApeSwap',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/ApeSwap.png?raw=true',
      dexType: DexType.APESWAP,
      factories: [
        {
          address: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
          type: 'UniswapV2',
          initCodeHash: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
          name: 'ApeSwap Factory',
        },
      ],
    },
  },
  [ChainId.LINEA]: {
    [Project.Lynex]: {
      name: 'Lynex',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      dexType: DexType.LYNEX,
      factories: [
        {
          address: '0x9dE10C26e2AF1BC10B9132326237Ae5d93617AB0',
          type: 'UniswapV2',
          name: 'Lynex Factory',
        },
      ],
      gamma: {
        uniProxyAddress: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621',
      },
    },
  },
};

/**
 * Get project configuration by chain ID and project name
 * @param chainId Chain ID
 * @param projectName Project name
 * @returns Project configuration or undefined if not found
 */
export function getProjectConfig(
  chainId: ChainId,
  projectName: Project
): ProjectConfig | undefined {
  return projectConfigs[chainId]?.[projectName];
}

/**
 * Get all project configurations for a chain
 * @param chainId Chain ID
 * @returns Object with project configurations or empty object if none found
 */
export function getChainProjects(
  chainId: ChainId
): { [projectName: string]: ProjectConfig } {
  return projectConfigs[chainId] || {};
} 