/**
 * Project configurations
 */
import { ChainId, Project, ProjectConfig } from '../types';

export const SUSHISWAP_CONFIG: Partial<Record<ChainId, ProjectConfig>> = {
  [ChainId.ETHEREUM]: {
    project: Project.SushiSwap,
    icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/SushiSwap.jpg?raw=true',
    uniV2Config: {
      factoryAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
      routerAddress: '',
    },
    ichiConfig: {
      factoryAddress: '0x5a40DFaF8C1115196A1CDF529F97122030F26112',
      depositGuard: {
        address: '0x3E1aFdB89B6Ea49e828C565ab6A36a485b7A4775',
        version: 2,
      },
      vaultDeployerAddress: '0xfF7B5E167c9877f2b9f65D19d9c8c9aa651Fe19F',
      isAlgebra: false,
    }
  },
};

export const LYNEX_CONFIG: Partial<Record<ChainId, ProjectConfig>> = {
  [ChainId.LINEA]: {
    project: Project.Lynex,
    icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
    solidlyConfig: {
      factoryAddress: '0xBc7695Fd00E3b32D08124b7a4287493aEE99f9ee', //'0x9dE10C26e2AF1BC10B9132326237Ae5d93617AB0',
      routerAddress: '0x610D2f07b7EdC67565160F587F37636194C34E74',
    },
    gammaConfig: {
      uniProxyAddress: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621',
    },
    ichiConfig: {
      factoryAddress: '0x0248b992ac2a75294b05286E9DD3A2bD3C9CFE4B',
      depositGuard: {
        address: '0x57C9d919AEA56171506cfb62B60ce76be0A079DF',
        version: 2,
      },
      vaultDeployerAddress: '0x75178e0a2829B73E3AE4C21eE64F4B684085392a',
      isAlgebra: true,
    }
  },
};

export const PANCAKESWAP_CONFIG: Partial<Record<ChainId, ProjectConfig>> = {
  [ChainId.BNB]: {
    project: Project.PancakeSwap,
    icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg?raw=true',
    uniV2Config: {
      factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    },
    gammaConfig: {
      uniProxyAddress: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f',
    },
    ichiConfig: {
      factoryAddress: '0x131c03ca881B7cC66d7a5120A9273ebf675C241D',
      depositGuard: {
        address: '0x454130394B8013D4a7288fe9Db570A0a24C606c2',
        version: 1,
      },
      vaultDeployerAddress: '0x05cC3CA6E768a68A7f86b09e3ceE754437bd5f12',
      isAlgebra: false,
    }
  },
};

export const APEBOND_CONFIG: Partial<Record<ChainId, ProjectConfig>> = {
  [ChainId.BNB]: {
    project: Project.ApeBond,
    icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/ApeSwap.png?raw=true',
    uniV2Config: {
      factoryAddress: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
      routerAddress: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    },
  },
};