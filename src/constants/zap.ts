import { ChainId, ZapLPType, ZapProtocols } from '../types/enums'
import { ZapInfo } from '../types/types'

enum Project {
  Uniswap = 'Uniswap',
  PancakeSwap = 'PancakeSwap',
  SushiSwap = 'SushiSwap',
  QuickSwap = 'QuickSwap',
  Zyberswap = 'Zyberswap',
  Thena = 'Thena',
  Retro = 'Retro',
  Ascent = 'Ascent',
  Ramses = 'Ramses',
  Camelot = 'Camelot',
  Lynex = 'Lynex',
  SynthSwap = 'SynthSwap',
  BaseX = 'BaseX',
  SwapBased = 'SwapBased',
}

const gammaUniProxy: Record<Project, Partial<Record<ChainId, `0x${string}`>>> = {
  [Project.Uniswap]: {
    [ChainId.ETH]: '0x83dE646A7125aC04950FEA7e322481D4BE66c71d',
    [ChainId.POLYGON]: '0xdCD902103fd9dDbB4a393Dff6b4a78e35dc50cc2',
    [ChainId.ARBITRUM]: '0x82FcEB07a4D01051519663f6c1c919aF21C27845',
    [ChainId.BNB]: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f',
  },
  [Project.PancakeSwap]: {
    [ChainId.ETH]: '0x561F5CF838429586D1F8d3826526891b289270EE',
    [ChainId.ARBITRUM]: '0x4fd87c7FA22D4E8aD933aC4C709C83cEFDCE8B00',
    [ChainId.BNB]: '0xa50327EF905916203f2678906bfa10A1fdcaFD03',
  },
  [Project.SushiSwap]: {
    [ChainId.POLYGON]: '0x4cb8B78deDA81081Ffe8003b44E1A6ef17108863',
    [ChainId.ARBITRUM]: '0x530071b0373Ab3029cAd32E0c19b75253e231b69',
    [ChainId.BASE]: '0xc40F63879630dFF5b69dd6d287f7735E65e90702',
  },
  [Project.QuickSwap]: {
    [ChainId.POLYGON]: '0xA42d55074869491D60Ac05490376B74cF19B00e6',
  },
  [Project.Zyberswap]: {
    [ChainId.ARBITRUM]: '0x4a74b6CEc31A51a48A74106118c6c920Bc8d5f31',
  },
  [Project.Thena]: {
    [ChainId.BNB]: '0xF75c017E3b023a593505e281b565ED35Cc120efa',
  },
  [Project.Retro]: {
    [ChainId.POLYGON]: '0xDC8eE75f52FABF057ae43Bb4B85C55315b57186c',
  },
  [Project.Ascent]: {
    [ChainId.POLYGON]: '0xf79412d10d986f841B53e1170e0c158a97BdBD1A',
  },
  [Project.Ramses]: {
    [ChainId.ARBITRUM]: '0x564F9D9DF1D8bAA1a8202a38eF0a18600B127b7E',
  },
  [Project.Camelot]: {
    [ChainId.ARBITRUM]: '0x1F1Ca4e8236CD13032653391dB7e9544a6ad123E',
  },
  [Project.Lynex]: {
    [ChainId.LINEA]: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621',
  },
  [Project.SynthSwap]: {
    [ChainId.BASE]: '0x38f61169D8bcc08cE303401A13332259F557B35f',
  },
  [Project.BaseX]: {
    [ChainId.BASE]: '0x77a9BB1de36f0c431aaD0b1D63496F6D94256e7c',
  },
  [Project.SwapBased]: {
    [ChainId.BASE]: '0x1825c76cED3c1625250B8af6204Bf4fc4e5b9FCF',
  },
}

function getGammaUniProxy(project: Project, chainId: ChainId): `0x${string}` {
  return gammaUniProxy[project][chainId] ?? '0x0000000000000000000000000000000000000000'
}

const zapData: Record<ChainId, Record<`0x${string}`, ZapInfo>> = {
  [ChainId.ETH]: {},
  [ChainId.POLYGON]: {
    "0x002e2a8215e892e77681e2568f85c8f720ce63db": {
      name: "Uniswap Gamma (WMATIC-CRV)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x002e2a8215e892e77681e2568f85c8f720ce63db',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x0f548d7ad1a0cb30d1872b8c18894484d76e1569": {
      name: "Uniswap Gamma (WBTC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x0f548d7ad1a0cb30d1872b8c18894484d76e1569',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x1382922b0065fbbd48d0b6c18ff0632d5fc2aaf1": {
      name: "Uniswap Gamma (USDC-MCFB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x1382922b0065fbbd48d0b6c18ff0632d5fc2aaf1',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x153c5d94955cdf5725e65cfb9818caf0a55f716f": {
      name: "Uniswap Gamma (DAI-GNS)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x153c5d94955cdf5725e65cfb9818caf0a55f716f',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x1dd8f0cd92a17266ba1560eb46ff8325c20e811f": {
      name: "Uniswap Gamma (WBTC-USDC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x1dd8f0cd92a17266ba1560eb46ff8325c20e811f',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x38f81e638f9e268e8417f2ff76c270597fa077a0": {
      name: "Uniswap Gamma (WMATIC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x38f81e638f9e268e8417f2ff76c270597fa077a0',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x3fe6f25da67dc6ad2a5117a691f9951ea14d6f15": {
      name: "Uniswap Gamma (WMATIC-CRV)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x3fe6f25da67dc6ad2a5117a691f9951ea14d6f15',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x431f6e577a431d9ee87a535fde2db830e352e33c": {
      name: "Uniswap Gamma (LINK-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x431f6e577a431d9ee87a535fde2db830e352e33c',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x435254d188cb5dfcf62517aa3dc6cd33aaa94e25": {
      name: "Uniswap Gamma (USDC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x435254d188cb5dfcf62517aa3dc6cd33aaa94e25',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x4735eca8d0c18b6a42fc3a722f5f0ca394a5c667": {
      name: "Uniswap Gamma (USDC-wtPOKT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x4735eca8d0c18b6a42fc3a722f5f0ca394a5c667',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x4a39cbb8198376ab08c24e596ff5e668c3ca269e": {
      name: "Uniswap Gamma (CRISP-M)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x4a39cbb8198376ab08c24e596ff5e668c3ca269e',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x525dd4c7b043d3a3adf7fc9276986079e939cbb3": {
      name: "Uniswap Gamma (WBTC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x525dd4c7b043d3a3adf7fc9276986079e939cbb3',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x6002d7714e8038f2058e8162b0b86c0b19c31908": {
      name: "Uniswap Gamma (WMATIC-WBTC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x6002d7714e8038f2058e8162b0b86c0b19c31908',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x6b3d98406779ddca311e6c43553773207b506fa6": {
      name: "Uniswap Gamma (USDC-DAI)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x6b3d98406779ddca311e6c43553773207b506fa6',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x7268bdc2135364d4d74385d075a3ecefe0bf8924": {
      name: "Uniswap Gamma (USDC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x7268bdc2135364d4d74385d075a3ecefe0bf8924',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x778a726de200a6acd3eefe31a7d45c6f9e4eab36": {
      name: "Uniswap Gamma (WMATIC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x778a726de200a6acd3eefe31a7d45c6f9e4eab36',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x7f8e021b5ad2ebe4df8ef35d8be0023b60b97790": {
      name: "Uniswap Gamma (WMATIC-ankrMATIC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x7f8e021b5ad2ebe4df8ef35d8be0023b60b97790',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x8891450de400229a58eb23457a7984c6b461beda": {
      name: "Uniswap Gamma (FRAX-miMATIC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8891450de400229a58eb23457a7984c6b461beda',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x8a6df1c1ea92d2583f7d58fefc9885fceff2d808": {
      name: "Uniswap Gamma (USDC-miMATIC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8a6df1c1ea92d2583f7d58fefc9885fceff2d808',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x8b6e73f17b613ce189be413f5dc435139f5fd45c": {
      name: "Uniswap Gamma (USDC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8b6e73f17b613ce189be413f5dc435139f5fd45c',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x8cacde53d63fda23a8f802653eeef931c8528cac": {
      name: "Uniswap Gamma (USDC-FRAX)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8cacde53d63fda23a8f802653eeef931c8528cac',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x8d6d90f2e7a20d5ec355287c37e3f20de50b8349": {
      name: "Uniswap Gamma (USDC-UST)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8d6d90f2e7a20d5ec355287c37e3f20de50b8349',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x8da6ff41dcdec7aeb88f785baf11443d03aba001": {
      name: "Uniswap Gamma (USDC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8da6ff41dcdec7aeb88f785baf11443d03aba001',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x91d6569946a11ca0d5564f31a594210bf06c1f0a": {
      name: "Uniswap Gamma (USDC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x91d6569946a11ca0d5564f31a594210bf06c1f0a',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x93d37be58e9631391ce878aadd40ba760eb0730b": {
      name: "Uniswap Gamma (USDC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x93d37be58e9631391ce878aadd40ba760eb0730b',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x987135c52fd3613c35576074e6df047f70151630": {
      name: "Uniswap Gamma (USDC-DAI)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x987135c52fd3613c35576074e6df047f70151630',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x9c3b8d3d977ba1d58848565149cb5ac1689dfa5b": {
      name: "Uniswap Gamma (USDC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x9c3b8d3d977ba1d58848565149cb5ac1689dfa5b',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x9ca70521bf8a7f7345dfe893d117c4414cae9151": {
      name: "Uniswap Gamma (USDC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x9ca70521bf8a7f7345dfe893d117c4414cae9151',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0x9f7c179735fd409d148bb864ceef1d6537553e11": {
      name: "Uniswap Gamma (WMATIC-USDC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x9f7c179735fd409d148bb864ceef1d6537553e11',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xa19aede2987b74776ffb0e8dff50305c745ac699": {
      name: "Uniswap Gamma (WETH-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xa19aede2987b74776ffb0e8dff50305c745ac699',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xa29193af0816d43cf44a3745755bf5f5e2f4f170": {
      name: "Uniswap Gamma (USDC-agEUR)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xa29193af0816d43cf44a3745755bf5f5e2f4f170',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xa5eb3401b93b859b4638f9d40868f89e200f8a44": {
      name: "Uniswap Gamma (WMATIC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xa5eb3401b93b859b4638f9d40868f89e200f8a44',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xa78a2ce1c72198bacf1f5a64b407cf1e86f623f6": {
      name: "Uniswap Gamma (USDC-DAI)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xa78a2ce1c72198bacf1f5a64b407cf1e86f623f6',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xaf825f3b0ad8b509db6a991c5dae092591f675e2": {
      name: "Uniswap Gamma (USDC-agEUR)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xaf825f3b0ad8b509db6a991c5dae092591f675e2',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xb7e9beef9cc9f3047db8b502611f19b5fff75b1a": {
      name: "Uniswap Gamma (USDC-THX)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xb7e9beef9cc9f3047db8b502611f19b5fff75b1a',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xbc89a4413c38dcd066027c1225e2cc390c470b48": {
      name: "Uniswap Gamma (USDC-VMBT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xbc89a4413c38dcd066027c1225e2cc390c470b48',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xbdb10439d9b5eb8ca6c0d7d5a60fe9fd784b5d05": {
      name: "Uniswap Gamma (WMATIC-stMATIC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xbdb10439d9b5eb8ca6c0d7d5a60fe9fd784b5d05',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xc1ce30066d90b5f57cbc5a71f13e90005f565db7": {
      name: "Uniswap Gamma (USDC-miMATIC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xc1ce30066d90b5f57cbc5a71f13e90005f565db7',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xc604b42b9bf109590effe16a68a13fc55dc58425": {
      name: "Uniswap Gamma (USDC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xc604b42b9bf109590effe16a68a13fc55dc58425',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xc8562dd252cededb9683bd3b5cbaa2a10e2775c3": {
      name: "Uniswap Gamma (USDC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xc8562dd252cededb9683bd3b5cbaa2a10e2775c3',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xcb27d08bf34b8076dc82ce33692ead6b38e2d280": {
      name: "Uniswap Gamma (USDC-wtPOKT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xcb27d08bf34b8076dc82ce33692ead6b38e2d280',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xd08b593eb3460b7aa5ce76ffb0a3c5c938fd89b8": {
      name: "Uniswap Gamma (WBTC-USDC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xd08b593eb3460b7aa5ce76ffb0a3c5c938fd89b8',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xd1c24a1eaf4b6978ea4152634be62e947dfca142": {
      name: "Uniswap Gamma (WMATIC-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xd1c24a1eaf4b6978ea4152634be62e947dfca142',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xd4bcfc023736db5617e5638748e127581d5929bd": {
      name: "Uniswap Gamma (WETH-UNI)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xd4bcfc023736db5617e5638748e127581d5929bd',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xd5b29cd75879d49ffe0475bc87f124cbf6e22d6d": {
      name: "Uniswap Gamma (USDC-THX)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xd5b29cd75879d49ffe0475bc87f124cbf6e22d6d',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xd667f74db442dbc4ca24ec8840c31c8498c93151": {
      name: "Uniswap Gamma (USDC-DAVOS)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xd667f74db442dbc4ca24ec8840c31c8498c93151',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xde8edc067b079b3965fde36d11aa834287f9b663": {
      name: "Uniswap Gamma (LINK-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xde8edc067b079b3965fde36d11aa834287f9b663',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xe4cd269546f9e20246afc88b7d4b8f4e226bba11": {
      name: "Uniswap Gamma (DAI-GNS)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xe4cd269546f9e20246afc88b7d4b8f4e226bba11',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xe64c62244c48f9d0aa70d411432b825e2f8b05b0": {
      name: "Uniswap Gamma (WMATIC-AAVE)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xe64c62244c48f9d0aa70d411432b825e2f8b05b0',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xe8df0dd4320b128b87cfcd9554cb1bd182f52a96": {
      name: "Uniswap Gamma (USDC-miMATIC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xe8df0dd4320b128b87cfcd9554cb1bd182f52a96',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xed354a827d99992d9cdada809449985cb73b8bb1": {
      name: "Uniswap Gamma (USDC-FRAX)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xed354a827d99992d9cdada809449985cb73b8bb1',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xf5bfa20f4a77933fee0c7bb7f39e7642a070d599": {
      name: "Uniswap Gamma (WMATIC-USDC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xf5bfa20f4a77933fee0c7bb7f39e7642a070d599',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xf874d4957861e193aec9937223062679c14f9aca": {
      name: "Uniswap Gamma (WMATIC-WETH)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xf874d4957861e193aec9937223062679c14f9aca',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
    "0xfa4bf5c7d995642f908318275e816dc023924ad7": {
      name: "Uniswap Gamma (WETH-USDT)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xfa4bf5c7d995642f908318275e816dc023924ad7',
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.POLYGON)
      },
    },
  },
  [ChainId.BNB]: {
    //Uniswap Gamma
    "0x0555221fe56d13daf9c67275424a81f2bdc068b9": {
      name: "Uniswap Gamma (USDT-WBNB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x0555221fe56d13daf9c67275424a81f2bdc068b9",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0x1e86a593e55215957c4755f1be19a229af3286f6": {
      name: "Uniswap Gamma (ETH -BNB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x1e86a593e55215957c4755f1be19a229af3286f6",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0x38f61169d8bcc08ce303401a13332259f557b35f": {
      name: "Uniswap Gamma (WBNB-BUSD)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x38f61169d8bcc08ce303401a13332259f557b35f",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0x4476433bc06210ba265d95736ebc630544d397d9": {
      name: "Uniswap Gamma (USDT-BUSD)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x4476433bc06210ba265d95736ebc630544d397d9",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0x683292172e2175bd08e3927a5e72fc301b161300": {
      name: "Uniswap Gamma (BTCB-WBNB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x683292172e2175bd08e3927a5e72fc301b161300",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0x6d257b17be32d4e7ebfebc3a337bf9c231da5aa7": {
      name: "Uniswap Gamma (USDT-WBNB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x6d257b17be32d4e7ebfebc3a337bf9c231da5aa7",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0x7eccd6d077e4ad7120150578e936a22f058fbcce": {
      name: "Uniswap Gamma (USDT-USDC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0x7eccd6d077e4ad7120150578e936a22f058fbcce",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0xc27ddd78fc49875fe6f844b72bbf31dfbb099881": {
      name: "Uniswap Gamma (BTCB-WBNB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0xc27ddd78fc49875fe6f844b72bbf31dfbb099881",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0xdb7608614dfdd9febfc1b82a7609420fa7b3bc34": {
      name: "Uniswap Gamma (USDT-USDC)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0xdb7608614dfdd9febfc1b82a7609420fa7b3bc34",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0xf44cecb1cf40ee12303e85eb8651263c01812ead": {
      name: "Uniswap Gamma (WBNB-BUSD)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0xf44cecb1cf40ee12303e85eb8651263c01812ead",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    "0xfc13ebe7feb9595d70195e9168aa7f3ace153621": {
      name: "Uniswap Gamma (ETH -BNB)",
      icon: 'https://github.com/SoulSolidity/registry/blob/main/src/assets/dexes/Uniswap%20V2.jpg?raw=true',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: "0xfc13ebe7feb9595d70195e9168aa7f3ace153621",
        uniProxy: getGammaUniProxy(Project.Uniswap, ChainId.BNB),
      }
    },
    //ApeBond
    "0x20cd480d58351d19b3d769f7779bdf98c7b12056": {
      name: 'ApeBond bond (ABOND)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/ApeBond.jpg',
      lpData: {
        lpType: ZapLPType.Single,
        toToken: '0x55d398326f99059fF775485246999027B3197955'
      },
      protocolData: {
        protocol: ZapProtocols.ApeBond,
        bond: '0x20cd480d58351d19b3d769f7779bdf98c7b12056'
      }
    }
  },
  [ChainId.BASE]: {},
  [ChainId.ARBITRUM]: {},
  [ChainId.LINEA]: {
    "0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079": {
      name: 'Lynex Gamma (USDC-WETH)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      },
    },
    "0x32e27ff479454e32868ff67ee9f06bafdc1e908f": {
      name: 'Lynex Gamma (BUSD-USDT)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x32e27ff479454e32868ff67ee9f06bafdc1e908f',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      }
    },
    "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c": {
      name: 'Lynex Gamma (BUSD-WETH)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      }
    },
    "0x8421c6102ee8a147facc01977df3b159f7921d54": {
      name: 'Lynex Gamma (MATIC-WETH)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8421c6102ee8a147facc01977df3b159f7921d54',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      }
    },
    "0x8a9570ec97534277ade6e46d100939fbce4968f0": {
      name: 'Lynex Gamma (WBTC-WETH)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0x8a9570ec97534277ade6e46d100939fbce4968f0',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      }
    },
    "0xd6cc4a33da7557a629e819c68fb805ddb225f517": {
      name: 'Lynex Gamma (USDC-BUSD)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xd6cc4a33da7557a629e819c68fb805ddb225f517',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      }
    },
    "0xf3b1125c8505f038503e002e61a78253610d4f60": {
      name: 'Lynex Gamma (USDT-WETH)',
      icon: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
      lpData: {
        lpType: ZapLPType.Gamma,
        hypervisor: '0xf3b1125c8505f038503e002e61a78253610d4f60',
        uniProxy: getGammaUniProxy(Project.Lynex, ChainId.LINEA)
      }
    }
  },
  [ChainId.AVAX]: {},
  [ChainId.BLAST]: {},
  [ChainId.LIGHTLINK]: {},
  [ChainId.IOTA]: {},
  [ChainId.BNB_TESTNET]: {},
}

export default zapData;
