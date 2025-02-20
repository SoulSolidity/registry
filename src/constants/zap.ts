import { ChainId, ZapLPType, ZapProtocols } from '../types/enums'
import { ZapInfo } from '../types/types'

const tokens: Record<ChainId, ZapInfo[]> = {
  [ChainId.ETH]: [
  ],
  [ChainId.POLYGON]: [
  ],
  [ChainId.BNB]: [
    {
      name: 'ApeBond ABOND bond',
      lpData: {
        lpType: ZapLPType.Single,
        toToken: '0x55d398326f99059fF775485246999027B3197955'
      },
      protocolData: {
        protocol: ZapProtocols.ApeBond,
        bond: '0x20cd480d58351d19b3d769f7779bdf98c7b12056'
      }
    }
  ],
  [ChainId.BASE]: [
  ],
  [ChainId.ARBITRUM]: [
  ],
  [ChainId.LINEA]: [
  ],
  [ChainId.AVAX]: [
  ],
  [ChainId.BLAST]: [
  ],
  [ChainId.LIGHTLINK]: [
  ],
  [ChainId.IOTA]: [
  ],
  [ChainId.BNB_TESTNET]: [
  ],
}

export default tokens;

// {
//   iotaRust_MagicSea: {
//     symbol: 'IOTA-RUST',
//     address: {
//       [ChainId.IOTA]: '0x932059511253f55b9c288f9A9c4E54561f0Fd05c',
//     },
//     decimals: {
//       [ChainId.IOTA]: 18,
//     },
//     liquidityDex: {
//       [ChainId.IOTA]: LiquidityDex.MagicSea,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.IOTA]:
//         'https://app.magicsea.finance/liquidityv2/manual/:8822/add/0x932059511253f55b9c288f9a9c4e54561f0fd05c',
//     },
//   },
//   iotaFomo_MagicSea: {
//     symbol: 'IOTA-FOMO',
//     address: {
//       [ChainId.IOTA]: '0x7ceb96304fbea063d6c461a57ce496213bebe535',
//     },
//     decimals: {
//       [ChainId.IOTA]: 18,
//     },
//     liquidityDex: {
//       [ChainId.IOTA]: LiquidityDex.MagicSea,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.IOTA]:
//         'https://app.magicsea.finance/liquidityv2/manual/:8822/add/0x7ceb96304fbea063d6c461a57ce496213bebe535',
//     },
//   },
//   iotaAudit_MagicSea: {
//     symbol: 'IOTA-AUDIT',
//     address: {
//       [ChainId.IOTA]: '0xba7ac526ee9d29209baedccb67c6d3a228644982',
//     },
//     decimals: {
//       [ChainId.IOTA]: 18,
//     },
//     liquidityDex: {
//       [ChainId.IOTA]: LiquidityDex.MagicSea,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.IOTA]:
//         'https://app.magicsea.finance/liquidityv2/manual/:8822/add/0xba7ac526ee9d29209baedccb67c6d3a228644982',
//     },
//   },
//   bethustlersBnb_PCS: {
//     symbol: 'BETHUSTLERS-BNB',
//     address: {
//       [ChainId.BSC]: '0xC49627586057cD1126EDCfb2AF6d65B31bc8395B',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0xE2B1f3908588e2338587ED998F974EE6F63f500d',
//     },
//   },
//   hbrBnb_Thena: {
//     symbol: 'HBR-BNB',
//     address: {
//       [ChainId.BSC]: '0x5134729Cd5a5b40336BC3CA71349f2c108718428',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.ThenaV1,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://thena.fi/pools/0x5134729cd5a5b40336bc3ca71349f2c108718428',
//     },
//   },
//   ethLynx_Ichi: {
//     symbol: 'ETH-LYNX',
//     address: {
//       [ChainId.LINEA]: '0x511481ef0DEB10eB5c1E36B72140718c58921265',
//     },
//     decimals: { [ChainId.LINEA]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Lynex,
//     liquidityDex: {
//       [ChainId.LINEA]: LiquidityDex.Algebra,
//     },
//   },
//   wethLdy_Ichi: {
//     symbol: 'WETH-LDY',
//     address: {
//       [ChainId.ARBITRUM]: '0xDf7606bE4fF2E6662C4345AC0372215e9E894b13',
//     },
//     decimals: {
//       [ChainId.ARBITRUM]: 18,
//     },
//     liquidityDex: {
//       [ChainId.ARBITRUM]: LiquidityDex.UniswapV3,
//     },
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//     active: true,
//     lpToken: true,
//   },
//   wethHat_Ichi: {
//     symbol: 'WETH-HAT',
//     address: {
//       [ChainId.ARBITRUM]: '0xC219A5b650C75E793beF047767A2021DAB49efFb',
//     },
//     decimals: {
//       [ChainId.ARBITRUM]: 18,
//     },
//     liquidityDex: {
//       [ChainId.ARBITRUM]: LiquidityDex.UniswapV3,
//     },
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//     active: true,
//     lpToken: true,
//   },

//   //***** LIGHTLINK TOKENS  *****/

//   horNey: {
//     symbol: 'HOR-NEY',
//     address: {
//       [ChainId.BSC_TESTNET]: '0x30e74cefd298990880758e20223f03129f52e699',
//     },
//     decimals: {
//       [ChainId.BSC_TESTNET]: 18,
//     },
//     active: false,
//     lpToken: true,
//   },
//   forEver: {
//     symbol: 'FOR-EVER',
//     address: {
//       [ChainId.BSC_TESTNET]: '0x4419D815c9c9329f9679782e76ec15bCe1B14a6D',
//     },
//     decimals: {
//       [ChainId.BSC_TESTNET]: 18,
//     },
//     active: false,
//     lpToken: true,
//   },

//   // LP Tokens
//   bananaBnb: {
//     symbol: 'BANANA-BNB',
//     address: {
//       [ChainId.BSC]: '0xf65c1c0478efde3c19b49ecbe7acc57bb6b1d713',
//       [ChainId.BSC_TESTNET]: '0x90Fc86A7570063a9eA971ec74f01F89569Ad6237',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//       [ChainId.BSC_TESTNET]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bananaBusd: {
//     symbol: 'BANANA-BUSD',
//     address: {
//       [ChainId.BSC]: '0x7Bd46f6Da97312AC2DBD1749f82E202764C0B914',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbBusd: {
//     symbol: 'BUSD-BNB',
//     address: {
//       [ChainId.BSC]: '0x51e6D27FA57373d8d4C256231241053a70Cb1d93',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbEth: {
//     symbol: 'ETH-BNB',
//     address: {
//       [ChainId.BSC]: '0xA0C3Ef24414ED9C9B456740128d8E63D016A9e11',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbPol: {
//     symbol: 'POL-BNB',
//     address: {
//       [ChainId.BSC]: '0x29A4A3D77c010CE100A45831BF7e798f0f0B325D',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbBtc: {
//     symbol: 'BTC-BNB',
//     address: {
//       [ChainId.BSC]: '0x1E1aFE9D9c5f290d8F6996dDB190bd111908A43D',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbFtm: {
//     symbol: 'FTM-BNB',
//     address: {
//       [ChainId.BSC]: '0x47A0B7bA18Bb80E4888ca2576c2d34BE290772a6',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbCeek: {
//     symbol: 'CEEK-BNB',
//     address: {
//       [ChainId.BSC]: '0x119D6Ebe840966c9Cf4fF6603E76208d30BA2179',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   usdcBusd: {
//     symbol: 'BUSD-USDC',
//     address: {
//       [ChainId.BSC]: '0xC087C78AbaC4A0E900a327444193dBF9BA69058E',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   wgictUsdt: {
//     symbol: 'WGICT-USDT',
//     address: {
//       [ChainId.BSC]: '0x4c64c44a6ed5f1fdce5263d9b512c2465ffe8256',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   blidUsdt: {
//     symbol: 'BLID-USDT',
//     address: {
//       [ChainId.BSC]: '0xc403a4b51d824eeb3f076bcaf4416dbbfde2016b',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   nft11Busd: {
//     symbol: 'NFT11-BUSD',
//     address: {
//       [ChainId.BSC]: '0xEf0A90fb728195F63C911f52ab4bde331089319f',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbjdi: {
//     symbol: 'BNB-JDI',
//     address: {
//       [ChainId.BSC]: '0xfb6063f29af6dcd1fc03a8e221c6d91deabbe764',
//       [ChainId.BSC_TESTNET]: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//       [ChainId.BSC_TESTNET]: 18,
//     },
//     active: true,
//     isLp: true,
//   },
//   rubyBnb: {
//     symbol: 'RUBY-BNB',
//     address: {
//       [ChainId.BSC]: '0xec9f5a5e4690fa14025971f0d2dd91f5600e24c7',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   threeairBnb: {
//     symbol: '3AIR-BNB',
//     address: {
//       [ChainId.BSC]: '0xfdf84a54b35e06e4c3852ae35f10b7f38488204a',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   nftyBnb: {
//     symbol: 'NFTY-BNB',
//     address: {
//       [ChainId.BSC]: '0x884BE30e2c95b9cFed614aD2B5Edf40AF2A144ad',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   nftyBusd: {
//     symbol: 'NFTY-BUSD',
//     address: {
//       [ChainId.BSC]: '0x3e2459cb96497d1f8f725aadde081f1e643c27d8',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   xcurBusd: {
//     symbol: 'XCUR-BUSD',
//     address: {
//       [ChainId.BSC]: '0xe55Da30A0BBb8d26Cc0a3AECE1F7a2d432276f84',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   drfBusd: {
//     symbol: 'DRF-BUSD',
//     address: {
//       [ChainId.BSC]: '0x5FFc5b392Fcc33357c6a8240bda1C9374A55E6B8',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   pstnBusd: {
//     symbol: 'PSTN-BUSD',
//     address: {
//       [ChainId.BSC]: '0x57fa15d373cbbd3141a13f8bab10c380ac2b14d5',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   triviaBnb: {
//     symbol: 'TRIVIA-BNB',
//     address: {
//       [ChainId.BSC]: '0x481308c94ac14dab839cc453cdc330f0632f1b0f',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   cocBnb: {
//     symbol: 'COC-BNB',
//     address: {
//       [ChainId.BSC]: '0x5467dD00ca4d91010Ab2A3aEF8a0162DC218801A',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   xtalBusd: {
//     symbol: 'XTAL-BUSD',
//     address: {
//       [ChainId.BSC]: '0x40C8a7142CF776FB94A29e19EF31220555e672b1',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   lgcBnb: {
//     symbol: 'LGC-BNB',
//     address: {
//       [ChainId.BSC]: '0x1809b34F406252645E704f7a76acB94728FD4fb6',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   lcBnb: {
//     symbol: 'LC-BNB',
//     address: {
//       [ChainId.BSC]: '0xc5a69133432eF17CD15C501CAa5f9cF28C22aA00',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   lgxBusd: {
//     symbol: 'LGX-BUSD',
//     address: {
//       [ChainId.BSC]: '0x004F72D474eE262701205E3637B4367594eFb11D',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bonesBnb: {
//     symbol: 'BONES-BNB',
//     address: {
//       [ChainId.BSC]: '0xe0900Db57d81DE4E6a13e90eb836Fa91Be50515A',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   genv3Bnb: {
//     symbol: 'GENv3-BNB',
//     address: {
//       [ChainId.BSC]: '0xCfa1d8afFA4da8e6CaBE6fde66DDf4eDA89f0e42',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   ceekBnb: {
//     symbol: 'CEEK-BNB',
//     address: {
//       [ChainId.BSC]: '0x119d6ebe840966c9cf4ff6603e76208d30ba2179',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   tlosBusd: {
//     symbol: 'TLOS-BUSD',
//     address: {
//       [ChainId.BSC]: '0x4d90ddc0a30968c4c6b1ed0535b0264e75a3c5f3',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   starsBnb: {
//     symbol: 'STARS-BNB',
//     address: {
//       [ChainId.BSC]: '0xbc8a4cad743d87e8754fd5f704c62e378802cbff',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   hotcrossBusd: {
//     symbol: 'HOTCROSS-BUSD',
//     address: {
//       [ChainId.BSC]: '0x3b9aa711d1d90a4f8639f66c227881729a3317f2',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   gqBusd: {
//     symbol: 'GQ-BUSD',
//     address: {
//       [ChainId.BSC]: '0xcC3A3Bc1d76Df321f94716E88224638C439267aa',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   ethBnb: {
//     symbol: 'ETH-BNB',
//     address: {
//       [ChainId.BSC]: '0xA0C3Ef24414ED9C9B456740128d8E63D016A9e11',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   apeBNB: {
//     symbol: 'APE-BNB',
//     address: {
//       [ChainId.BSC]: '0x8B3EBE3422aabEA9920ca820fE43679e3e2E78D3',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   avaxBnb: {
//     symbol: 'AVAX-BNB',
//     address: {
//       [ChainId.BSC]: '0x40aFc7CBd0Dc2bE5860F0035b717d20Afb4827b2',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   dotBnb: {
//     symbol: 'DOT-BNB',
//     address: {
//       [ChainId.BSC]: '0x21CBb561c5d7D70e9E6Cc42136CB22F07552aEef',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   primateBnb: {
//     symbol: 'PRIMATE-BNB',
//     address: {
//       [ChainId.BSC]: '0x6acabA892562719085C8418EbA49b8B3475D995a',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   compBnb: {
//     symbol: 'COMP-BNB',
//     address: {
//       [ChainId.BSC]: '0xb4c0c621B2eDfE6C22585ebAC56b0e634907B8A7',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   filBnb: {
//     symbol: 'FIL-BNB',
//     address: {
//       [ChainId.BSC]: '0xcAEC8648dbaC41b6504A8E408892931796D67d87',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   adaBnb: {
//     symbol: 'ADA-BNB',
//     address: {
//       [ChainId.BSC]: '0x40d4543887E4170A1A40Cd8dB15A6b297c812Cb1',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   adaEth: {
//     symbol: 'ADA-ETH',
//     address: {
//       [ChainId.BSC]: '0x61FE209E404166a53Cc627d0ae30A65606315dA7',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   linkBnb: {
//     symbol: 'LINK-BNB',
//     address: {
//       [ChainId.BSC]: '0x092ADA3818DB7FBb8e0A2124Ff218C5125C1CcE6',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   leapBnb: {
//     symbol: 'LEAP-BNB',
//     address: {
//       [ChainId.BSC]: '0x5243b560c0F2df6678c06E772156F49C078d6165',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   monstaBnb: {
//     symbol: 'MONSTA-BNB',
//     address: {
//       [ChainId.BSC]: '0x5b99be3e9cff7a4fb612b95e647ad141a67913cd',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   avanBnb: {
//     symbol: 'AVAN-BNB',
//     address: {
//       [ChainId.BSC]: '0x713B273738779C9EA97472AebbD4f7Da5863De78',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   wcfltBnb: {
//     symbol: 'WCFLT-BNB',
//     address: {
//       [ChainId.BSC]: '0xa85Ce9F40ed9DBCaE8A597e632d490669A45401F',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   zbcBusd: {
//     symbol: 'ZBC-BUSD',
//     address: {
//       [ChainId.BSC]: '0xdfc7b9b17ef17da19abb0d3a3aeeb8aeff5b0183',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   cvlUsdt: {
//     symbol: 'CVL-USDT',
//     address: {
//       [ChainId.BSC]: '0xd771c603613b88beacefb29fa573e654cd528f21',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   tokoBnb: {
//     symbol: 'TOKO-BNB',
//     address: {
//       [ChainId.BSC]: '0xdea7f02dec8cf6d2b9da88d6c8028638a95121e2',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   oathUsdc: {
//     symbol: 'OATH-USDC',
//     address: {
//       [ChainId.BSC]: '0x059408ccc90bbcfbf2b5fbd3081160f16387412e',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   tlosUsdc: {
//     symbol: 'TLOS-USDC',
//     address: {
//       [ChainId.BSC]: '0x3a299094d76d813eec1e8d8bc58aabf377cf1bf3',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   aaveBnb: {
//     symbol: 'AAVE-BNB',
//     address: {
//       [ChainId.BSC]: '0xf13e007e181A8F57eD3a4D4CcE0A9ff9E7241CEf',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   froyoBnb: {
//     symbol: 'FROYO-BNB',
//     address: {
//       [ChainId.BSC]: '0x58ceF3eeDB9A4adc6B5a2Ee5c85Aea07D72787f0',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   anmlBnb: {
//     symbol: 'ANML-BNB',
//     address: {
//       [ChainId.BSC]: '0x0aB82Ec81c80F75B02A117fbA9B414c17379ae8C',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   radarBnb: {
//     symbol: 'RADAR-BNB',
//     address: {
//       [ChainId.BSC]: '0xe6fF591f818664865eCab584B1fe679DbB4904dB',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   ihcBnb: {
//     symbol: 'IHC-BNB',
//     address: {
//       [ChainId.BSC]: '0x83CcbE832e5a3B620a435fe0eDb89e171C14eCcB',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   liqBusd: {
//     symbol: 'LIQ-BUSD',
//     address: {
//       [ChainId.BSC]: '0x759584fe196fb2e3f5bf2eff8c2747741d5ecf59',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   flokiBnb: {
//     symbol: 'FLOKI-BNB',
//     address: {
//       [ChainId.BSC]: '0xacc22e0ff64e788e6ad569a57d130b9d957494dc',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   pxpBnb: {
//     symbol: 'PXP-BNB',
//     address: {
//       [ChainId.BSC]: '0xF4a7480948F11A0205D616258DCf43E9DaAE0586',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   hecBnb: {
//     symbol: 'HEC-BNB',
//     address: {
//       [ChainId.BSC]: '0xc0687a3cf463f3be0b021d6f41551584d124d9c5',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   nfaiBnb: {
//     symbol: 'NFAi-BNB',
//     address: {
//       [ChainId.BSC]: '0x11F9856Db037cf6bDe94841D3FF8E08386844379',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   bnbxBnb: {
//     symbol: 'BNBx-BNB',
//     address: {
//       [ChainId.BSC]: '0xB88F211EC9ecfc2931Ae1DE53ea28Da76B9Ed37A',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   gmrBnb: {
//     symbol: 'GMR-BNB',
//     address: {
//       [ChainId.BSC]: '0x5ff97410ff9bdb715b7b283828796dd0ad7a884a',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   furfiBnb: {
//     symbol: 'FURFI-BNB',
//     address: {
//       [ChainId.BSC]: '0x4428AC6AD2Be88C59e811F8953dA9Dd603FC2fEA',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   brzBusd: {
//     symbol: 'BRZ-BUSD',
//     address: {
//       [ChainId.BSC]: '0xfbD7e3575F709212A9f61aC6C63964A8FDa34CAC',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   xwinBnb: {
//     symbol: 'XWIN-BNB',
//     address: {
//       [ChainId.BSC]: '0x9f1762b15e740704f40a3606b31dccfbe5318d8b',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   crediBnb: {
//     symbol: 'CREDI-BNB',
//     address: {
//       [ChainId.BSC]: '0xb10EDE07BcB3d0e69649193aA36F6dCF917Af9D4',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   xcrediBnb: {
//     symbol: 'XCREDI-BNB',
//     address: {
//       [ChainId.BSC]: '0x79d6f5D3cDE38b51DABA455F710B92441123feca',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.BSC]: 'https://apeswap.finance/add-liquidity/ETH/0x1265DAdE08e13F1c6f9706287FBE39083dC5a4b4',
//     },
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.ApeSwapV2,
//     },
//   },
//   rockBnb: {
//     symbol: 'ROCK-BNB',
//     address: {
//       [ChainId.BSC]: '0xA7f8705598f00bB6c9d5915A6A02bB5AE9C07b7B',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   nootBnb: {
//     symbol: 'NOOT-BNB',
//     address: {
//       [ChainId.BSC]: '0xD746983867989a69338654738f6cBFA5d39b214f',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   cgptBusd: {
//     symbol: 'CGPT-BUSD',
//     address: {
//       [ChainId.BSC]: '0x1B376bd0693956161caf6C4a3D31046bbd2d32E6',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   cgptBusd_PCS: {
//     symbol: 'CGPT-BUSD',
//     address: {
//       [ChainId.BSC]: '0xcFE847AAE922CBe3Dcbba61DBB1ed97D2124d322',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x9840652DC04fb9db2C43853633f0F62BE6f00f98',
//     },
//   },
//   monstaBnb_PCS: {
//     symbol: 'MONSTA-BNB',
//     address: {
//       [ChainId.BSC]: '0x55C49d1cd54126C69F22C2e9eEBd1EFeF5e620FA',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x8A5d7FCD4c90421d21d30fCC4435948aC3618B2f',
//     },
//   },
//   dcbUsdt_PCS: {
//     symbol: 'DCB-USDT',
//     address: {
//       [ChainId.BSC]: '0x83D5475BC3bFA08aC3D82ba54b4F86AFc5444398',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0xEAc9873291dDAcA754EA5642114151f3035c67A2',
//     },
//   },
//   brgBnb_PCS: {
//     symbol: 'BRG-BNB',
//     address: {
//       [ChainId.BSC]: '0xeb5fcb296e4c5305108e74658849cc5C2400bC0E',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x6e4a971B81CA58045a2AA982EaA3d50C4Ac38F42',
//     },
//   },
//   pltBnb_PCS: {
//     symbol: 'PLT-BNB',
//     address: {
//       [ChainId.BSC]: '0x4786eeef4c750158a73218459BFc07a75c89EDC0',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x631C2f0EdABaC799f07550aEE4fF0Bf7fd35212B',
//     },
//   },
//   chapzUsdt_PCS: {
//     symbol: 'CHAPZ-USDT',
//     address: {
//       [ChainId.BSC]: '0x33F675E6802Bb5aA15Dd797D716436Df0D8Cd372',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x7B56748A3Ef9970A5bAe99c58aD8bC67b26c525F',
//     },
//   },
//   cgvBnb_PCS: {
//     symbol: 'CGV-BNB',
//     address: {
//       [ChainId.BSC]: '0xFd22bc3F3b467F72B87146Ef87863C7766789c51',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x1bDaF9ddD7658d8049391971d1fd48c0484F66EC',
//     },
//   },
//   dckBusd_PCS: {
//     symbol: 'DCK-BUSD',
//     address: {
//       [ChainId.BSC]: '0x7B768b6d81db72872Ff9BDFc06E961c88712d10e',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x16faF9DAa401AA42506AF503Aa3d80B871c467A3',
//     },
//   },
//   theBnb_Ichi: {
//     symbol: 'THE-BNB',
//     address: {
//       [ChainId.BSC]: '0xcBFB2D1487a8A69a8b0eE8e7Fb3ca5e0C338B508',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.Algebra,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://www.thena.fi/add?type=ichi&address=0x137df93a0c22b863c1b335d1b8d389ea3895ba13',
//     },
//   },
//   gldBnb_Ichi: {
//     symbol: 'GLD-BNB',
//     address: {
//       [ChainId.BSC]: '0xe4dF44742b834f738e0561D8BA6fF41aEa66EB04',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.Algebra,
//     },
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Thena,
//     getLpUrl: {
//       [ChainId.BSC]: 'https://thena.fi/pools/0x87a4276eaed3b46cb77ec41d6f6b9fc98b159725',
//     },
//   },
//   sdmUsdt_Ichi: {
//     symbol: 'SDM-USDT',
//     address: {
//       [ChainId.BSC]: '0x6a8D03773779cD3eD6fEeC4f0059a76932909Baf',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV3,
//     },
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Pancakeswap,
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/position-managers',
//     },
//   },
//   busdBnb_Thena: {
//     symbol: 'BUSD-BNB',
//     address: {
//       [ChainId.BSC]: '0x483653bcf3a10d9a1c334ce16a19471a614f4385',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.ThenaV1,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://thena.fi/add/v1/0x483653bcf3a10d9a1c334ce16a19471a614f4385',
//     },
//   },
//   aitechBusd_PCS: {
//     symbol: 'AITECH-BUSD',
//     address: {
//       [ChainId.BSC]: '0xd419500f094434ddb13060FFE2Bf240aBedB3F65',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x2D060Ef4d6BF7f9e5edDe373Ab735513c0e4F944',
//     },
//   },
//   abondBnb_Thena: {
//     symbol: 'ABOND-BNB',
//     address: {
//       [ChainId.BSC]: '0x7868245cAe5834b32B40CEE01f1b536AD75c7D09',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.ThenaV1,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://thena.fi/pools/0x7868245cae5834b32b40cee01f1b536ad75c7d09',
//     },
//   },
//   abondBnb_Ichi: {
//     symbol: 'ABOND-BNB',
//     address: {
//       [ChainId.BSC]: '0x137Df93A0c22b863C1B335d1b8d389Ea3895BA13',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.Algebra,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://thena.fi/pools/0x44aa475ed44dda30f4fb81a0eec7c44aed01c7c0',
//     },
//   },
//   bnbUsdt_Ichi: {
//     symbol: 'BNB-USDT',
//     address: {
//       [ChainId.BSC]: '0x468E041AF71B28bE7C3b2Ad9f91696A0206f0053',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.Algebra,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://thena.fi/pools/0xD405b976Ac01023c9064024880999fC450A8668b',
//     },
//   },
//   usdcIchi_Ichi: {
//     symbol: 'USDC-ICHI',
//     address: {
//       [ChainId.BSC]: '0x0477e37B8ACA55C133e05403a30b554498c451b4',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.Algebra,
//     },
//   },
//   wbnbIchi_Ichi: {
//     symbol: 'BNB-ICHI',
//     address: {
//       [ChainId.BSC]: '0x6fD323Bdf290Eba58EaaA8E02e70a2a6f1DE0CfC',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.Algebra,
//     },
//   },
//   mfpsBnb_PCS: {
//     symbol: 'MFPS-BNB',
//     address: {
//       [ChainId.BSC]: '0x73190102Ef0e1588fEAFd22D8917C602f07EaAFa',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x37407D1CAbC422155A148bc7A3a0587C64225ea2',
//     },
//   },
//   apexBnb_PCS: {
//     symbol: 'APEX-BNB',
//     address: {
//       [ChainId.BSC]: '0x7A0f0f9D51110a6eEAd04E245c272ED98AC567f8',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x5829e758859b74426B0b2447E82E19AD8e68E87a',
//     },
//   },
//   palmBnb_PCS: {
//     symbol: 'PALM-BNB',
//     address: {
//       [ChainId.BSC]: '0x044066f6Ce410407CC738d0feb5E40b5ab69e83a',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x29745314B4D294B7C77cDB411B8AAa95923aae38',
//     },
//   },
//   gymnetBusd_PCS: {
//     symbol: 'GYMNET-BUSD',
//     address: {
//       [ChainId.BSC]: '0xCFFD8B6F876CD9E0e054BBAf024aF3D99101b9f1',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x0012365F0a1E5F30a5046c680DCB21D07b15FcF7',
//     },
//   },
//   arcasBnb_PCS: {
//     symbol: 'ARCAS-BNB',
//     address: {
//       [ChainId.BSC]: '0xAcBeA95dDaB356b40DAe8046b185F13E06730b34',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/0xAd0926eCf31719263DC86426024794332d9dD9A3/BNB',
//     },
//   },
//   hntrUsdt_PCS: {
//     symbol: 'HNTR-USDT',
//     address: {
//       [ChainId.BSC]: '0x4a593b44C505fe4C68b8d3fe81E46C158a6A2010',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x83451A4E3585FdA74FEb348Ad929f2C4cA189660/0x55d398326f99059fF775485246999027B3197955',
//     },
//   },
//   tifiUsdt_PCS: {
//     symbol: 'TIFI-USDT',
//     address: {
//       [ChainId.BSC]: '0x3a29DD4Ab216E296A483df77c46AE4DED213D0FD',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x17E65E6b9B166Fb8e7c59432F0db126711246BC0/0x55d398326f99059fF775485246999027B3197955',
//     },
//   },
//   wnkUsdc_PCS: {
//     symbol: 'WNK-USDC',
//     address: {
//       [ChainId.BSC]: '0xbEc630483E02f058DFC6E9997d00c19a05D99E18',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0xb160A5F19ebccd8E0549549327e43DDd1D023526/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
//     },
//   },
//   gtaiUsdt_PCS: {
//     symbol: 'GTAI-USDT',
//     address: {
//       [ChainId.BSC]: '0xAB1E062Ab03b11fF7Dd943C50b9aa2bF9933C1F3',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x003d87d02A2A01E9E8a20f507C83E15DD83A33d1',
//     },
//   },
//   f3Usdt_PCS: {
//     symbol: 'F3-USDT',
//     address: {
//       [ChainId.BSC]: '0x4Ea053cDc6C47e4dB91Aa6d34be93777fF18C642',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x9e57E83Ad79Ac5312Ba82940bA037ED30600e167',
//     },
//   },
//   caratUsdt_PCS: {
//     symbol: 'CARAT-USDT',
//     address: {
//       [ChainId.BSC]: '0x498873319D02d025F2DBFda586AdA222BD9DE11C',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x426C1C971fb00CAaf1883bd801323a8bEcb0C919',
//     },
//   },
//   aitBnb_PCS: {
//     symbol: 'AIT-BNB',
//     address: {
//       [ChainId.BSC]: '0x84DBc37BE759d222725c193C27694f405a16896a',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0x5F113F7ef20Ff111FD130e83D8e97Fd1E0E2518F',
//     },
//   },
//   mmtUsdt_PCS: {
//     symbol: 'MMT-USDT',
//     address: {
//       [ChainId.BSC]: '0x4037ccEE3A68CF5BDee8A7166a57881C4bae57Ee',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0xB34966A2A66cb116ebe87b9554c020DcC950E917',
//     },
//   },
//   scrlUsdt_PCS: {
//     symbol: 'SCRL-USDT',
//     address: {
//       [ChainId.BSC]: '0x485766b9eD7c28A45b8e070382bf3308ED0e2d98',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x52c1751C89fc913ed274d72e8d56DcE4Ee44A5cf',
//     },
//   },
//   aitechUsdt_PCS: {
//     symbol: 'AITECH-USDT',
//     address: {
//       [ChainId.BSC]: '0x87ACDD212404150Fd814565d591a24B0312C9E23',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x2D060Ef4d6BF7f9e5edDe373Ab735513c0e4F944',
//     },
//   },
//   quoUsdt_PCS: {
//     symbol: 'QUO-USDT',
//     address: {
//       [ChainId.BSC]: '0xa387A64D4E1711442FADeF1dd4C697d901DCCf05',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]:
//         'https://pancakeswap.finance/v2/add/0x55d398326f99059fF775485246999027B3197955/0x08b450e4a48C04CDF6DB2bD4cf24057f7B9563fF',
//     },
//   },
//   sxchWbnb_PCS: {
//     symbol: 'SXCH-BNB',
//     address: {
//       [ChainId.BSC]: '0x8c2d7D32Ba80EFa7028c54E6c675Ae8B65Fca8b2',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BSC]: LiquidityDex.PancakeSwapV2,
//     },
//     getLpUrl: {
//       [ChainId.BSC]: 'https://pancakeswap.finance/v2/add/BNB/0xE58C3A44B74362048e202cb7C8036D4b0B28Af50',
//     },
//   },
//   stlosTlos: {
//     symbol: 'STLOS-TLOS',
//     address: {
//       [ChainId.TLOS]: '0xa4dfe1fdca0c341c1ba26550ec5128c89964f0db',
//     },
//     decimals: { [ChainId.TLOS]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   stlosUsdc: {
//     symbol: 'STLOS-USDC',
//     address: {
//       [ChainId.TLOS]: '0x3f830d537fe636057c8d7f9e8f264c7a7ff48a6f',
//     },
//     decimals: {
//       [ChainId.TLOS]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   usdtUsdc: {
//     symbol: 'USDT-USDC',
//     address: {
//       [ChainId.TLOS]: '0x10aadd094677f286e5b9c969806122b5bb31906d',
//     },
//     decimals: {
//       [ChainId.TLOS]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   usdcTlos: {
//     symbol: 'USDC-TLOS',
//     address: {
//       [ChainId.TLOS]: '0x2a4e6ef568e4a696555a5491c0fe7cbcf998c1bb',
//     },
//     decimals: { [ChainId.TLOS]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   ethTlos: {
//     symbol: 'ETH-TLOS',
//     address: {
//       [ChainId.TLOS]: '0xCfd8505E3c79D777AF2CA3B5507B64480645f516',
//     },
//     decimals: { [ChainId.TLOS]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   usdtTlos: {
//     symbol: 'USDT-TLOS',
//     address: {
//       [ChainId.TLOS]: '0xAE46B3A778999567133c6c1F5C5feA953EE64995',
//     },
//     decimals: { [ChainId.TLOS]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   btcTlos: {
//     symbol: 'BTC-TLOS',
//     address: {
//       [ChainId.TLOS]: '0x48731c532bbccf5179F9E2549624e0A73C7B39bC',
//     },
//     decimals: { [ChainId.TLOS]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   bananaTlos: {
//     symbol: 'BANANA-TLOS',
//     address: {
//       [ChainId.TLOS]: '0xf780e62D54BB6C55e396dd937BacEF0BBD7Aff51',
//     },
//     decimals: { [ChainId.TLOS]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   swtBnb: {
//     symbol: 'SWT-BNB',
//     address: {
//       [ChainId.BSC]: '0xD2280ae010CE3e519a09a459E200bACD303eA330',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   ubxsBnb: {
//     symbol: 'UBXS-BNB',
//     address: {
//       [ChainId.BSC]: '0x267ff6b3F548B877623520bCcf74bF4a3151E0Fa',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   avgBnb: {
//     symbol: 'AVG-BNB',
//     address: {
//       [ChainId.BSC]: '0xd96B0D6711F25C9b08e1e14E96D385f3fc9C3ACb',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   ethPol: {
//     symbol: 'ETH-POL',
//     address: {
//       [ChainId.MATIC]: '0x6cf8654e85ab489ca7e70189046d507eba233613',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   dogiraPol: {
//     symbol: 'DOGIRA-POL',
//     address: {
//       [ChainId.MATIC]: '0x103062f71b7106a8df6fd2a4dd9368358c44a9d0',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   axnUsdc: {
//     symbol: 'AXN-USDC',
//     address: {
//       [ChainId.MATIC]: '0x81A3F6a138F0B12eCBDCE4583972A6CA57514dBd',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   cggUsdc: {
//     symbol: 'CGG-USDC',
//     address: {
//       [ChainId.BSC]: '0xF2c9F49E97b1431f9437C11A5d59494b0b53015a',
//       [ChainId.MATIC]: '0x3a731F43Ea089E28B4B02AF46024ef02F43b0B0C',
//     },
//     decimals: {
//       [ChainId.BSC]: 18,
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   traxxPol: {
//     symbol: 'TRAXX-POL',
//     address: {
//       [ChainId.MATIC]: '0x545cb3055e62c86f54ba479c7cafc7e1e2eeec54',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   leapPol: {
//     symbol: 'LEAP-POL',
//     address: {
//       [ChainId.MATIC]: '0xb933e9e1ed78612e24f79cdf6976ef19fe0e357c',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   wombatUsdc: {
//     symbol: 'WOMBAT-USDC',
//     address: {
//       [ChainId.MATIC]: '0x20D4c6f341a7c87B1944D456d8674849Ca1001aE',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     active: true,
//     lpToken: true,
//   },
//   komPol: {
//     symbol: 'KOM-POL',
//     address: {
//       [ChainId.MATIC]: '0x0806A407d6eEa72788d91C36829A19d424446040',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.ApeSwapV2,
//     },
//     active: true,
//     lpToken: true,
//   },
//   mvUsdt_QS: {
//     symbol: 'MV-USDT',
//     address: {
//       [ChainId.MATIC]: '0x690a87Ed8972e451e755b8F2dC1fc2B28e3c6566',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0xA3c322Ad15218fBFAEd26bA7f616249f7705D945&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
//     },
//   },
//   blankUsdc_QS: {
//     symbol: 'BLANK-USDC',
//     address: {
//       [ChainId.MATIC]: '0x3B480d50b9ed88B4891e066681467a73F78d8c22',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0xf4C83080E80AE530d6f8180572cBbf1Ac9D5d435&currency1=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
//     },
//   },
//   bomUsdc_QS: {
//     symbol: 'BOM-USDC',
//     address: {
//       [ChainId.MATIC]: '0x9fF7EF52f423E06EdB23859006372974A9692f9c',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0xc59132FBdF8dE8fbE510F568a5D831C991B4fC38&currency1=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
//     },
//   },
//   knightEth_QS: {
//     symbol: 'ETH-KNIGHT',
//     address: {
//       [ChainId.MATIC]: '0x7F7C12acec546CDCeb028Cc5b57F7aA2d91F0887',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&currency1=0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D',
//     },
//   },
//   usdcAmbo_Ichi: {
//     symbol: 'USDC-AMBO',
//     address: {
//       [ChainId.MATIC]: '0x2ff07791f125bf6ce120d938f862d0385cf4c835',
//     },
//     decimals: { [ChainId.MATIC]: 18 },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.Algebra,
//     },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Quickswap,
//   },
//   polEth_Ichi: {
//     symbol: 'POL (ETH)',
//     address: {
//       [ChainId.MATIC]: '0x9ff3C1390300918B40714fD464A39699dDd9Fe00',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.Algebra,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]: 'https://app.ichi.org/vault/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
//     },
//   },
//   polDsrun_Ichi: {
//     symbol: 'WPOL-DSRUN',
//     address: {
//       [ChainId.MATIC]: '0xECD259DEdDc93B9881debDC67c7c4b553794Fd3c',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.Algebra,
//     },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Quickswap,
//   },
//   usdtVda_Ichi: {
//     symbol: 'USDT-VDA',
//     address: {
//       [ChainId.MATIC]: '0xe3a2F6b642cBB29F7D5A82afa83a48b9c4E79244',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.Algebra,
//     },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Quickswap,
//   },
//   usdtFan_Ichi: {
//     symbol: 'USDT-FAN',
//     address: {
//       [ChainId.MATIC]: '0x6132f58e6b9d984331DDD5194B3DD37fCb721eaC',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.UniswapV3,
//     },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//   },
//   polRum_Ichi: {
//     symbol: 'POL-RUM',
//     address: {
//       [ChainId.MATIC]: '0xA98397d5568724948E9A24B3B0e58B7114C0fE4E',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.UniswapV3,
//     },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//     getLpUrl: {
//       [ChainId.MATIC]: 'https://app.ichi.org/vault/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270/',
//     },
//   },
//   polEth_Qs: {
//     symbol: 'POL-ETH',
//     address: {
//       [ChainId.MATIC]: '0xadbF1854e5883eB8aa7BAf50705338739e558E5b',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=ETH&currency1=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
//     },
//   },
//   orbsUsdc_QS: {
//     symbol: 'ORBS-USDC',
//     address: {
//       [ChainId.MATIC]: '0xB2b6D423e535b57aaD06E9866803B95fB66152EA',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff&currency1=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
//     },
//   },
//   ixtUsdt_QS: {
//     symbol: 'IXT-USDT',
//     address: {
//       [ChainId.MATIC]: '0x304e57c752E854E9A233Ae82fcC42F7568b81180',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
//     },
//   },
//   abondPol_QS: {
//     symbol: 'ABOND-POL',
//     address: {
//       [ChainId.MATIC]: '0x27b00fE0413DFc2DE52D18562a2D0fB353A9cE00',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0xe6828D65bf5023AE1851D90D8783Cc821ba7eeE1&currency1=ETH',
//     },
//   },
//   fxa3aUsdc_QS: {
//     symbol: 'fxA3A-USDC',
//     address: {
//       [ChainId.MATIC]: '0x89470e8D8bB8655a94678d801e0089c4646f5E84',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0x58c7B2828e7F2B2CaA0cC7fEef242fA3196d03df&currency1=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
//     },
//   },
//   ubuUsdc_QS: {
//     symbol: 'UBU-USDC',
//     address: {
//       [ChainId.MATIC]: '0x19ed9003513fD3a3Eb3856b31831Dd8f19f9454A',
//     },
//     decimals: {
//       [ChainId.MATIC]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.QuickswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MATIC]:
//         'https://quickswap.exchange/#/pools/v2?currency0=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359&currency1=0x78445485A8d5b3BE765e3027bc336e3c272a23c9',
//     },
//   },
//   usdcQuick_Ichi: {
//     symbol: 'USDC-QUICK',
//     address: {
//       [ChainId.MATIC]: '0x36b511A006cAc909DC56C2c24eb69CA304f74999',
//     },
//     decimals: { [ChainId.MATIC]: 18 },
//     liquidityDex: {
//       [ChainId.MATIC]: LiquidityDex.Algebra,
//     },
//     active: true,
//     lpToken: true,
//   },
//   chrpBnb: {
//     symbol: 'CHRP-BNB',
//     address: {
//       [ChainId.BSC]: '0xcD10d0173651d1B3bd027DEcDBA007998bb03eaf',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   kkcUsdt: {
//     symbol: 'KKC-USDT',
//     address: {
//       [ChainId.BSC]: '0x01eed6e622fa2e652b0796a29d98fe82056fb8f0',
//     },
//     decimals: { [ChainId.BSC]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   onyxEth: {
//     symbol: 'ONYX-ETH',
//     address: {
//       [ChainId.ARBITRUM]: '0xB8fCc49ecC9206DaBb48B28ecbcfD31D5C6346D1',
//     },
//     decimals: { [ChainId.ARBITRUM]: 18 },
//     active: true,
//     lpToken: true,
//   },
//   openEth: {
//     symbol: 'OPEN-ETH',
//     address: {
//       [ChainId.ARBITRUM]: '0xC09C5B1420f33Ba6557789f15Ce6E1eb9aF1d31a',
//     },
//     decimals: { [ChainId.ARBITRUM]: 18 },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.ARBITRUM]: 'https://apeswap.finance/add-liquidity/ETH/0x58CB98A966F62aA6F2190eB3AA03132A0c3de3D5',
//     },
//   },
//   arbEth_Ichi: {
//     symbol: 'ARB-ETH',
//     address: {
//       [ChainId.ARBITRUM]: '0x1A64166dc78830aeFF560Fb0f4C521830D7fd76F',
//     },
//     decimals: { [ChainId.ARBITRUM]: 18 },
//     liquidityDex: {
//       [ChainId.ARBITRUM]: LiquidityDex.Algebra,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.ARBITRUM]: 'https://app.ichi.org/vault/token/0xC6F780497A95e246EB9449f5e4770916DCd6396A',
//     },
//   },
//   eywaUsdt_Curve: {
//     symbol: 'EYWA-USDT',
//     address: {
//       [ChainId.ARBITRUM]: '0x6579758e9E85434450D638cFBEA0F2fe79856ddA',
//     },
//     decimals: { [ChainId.ARBITRUM]: 18 },
//     liquidityDex: {
//       [ChainId.ARBITRUM]: LiquidityDex.Curve,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.ARBITRUM]: 'https://curve.fi/#/arbitrum/pools/factory-twocrypto-57/deposit',
//     },
//   },
//   ethBonsai_Camelot: {
//     symbol: 'ETH-BONSAI',
//     address: {
//       [ChainId.ARBITRUM]: '0xe4C994f55cAC42830cC6016D18f07744cEd0aa5D',
//     },
//     decimals: { [ChainId.ARBITRUM]: 18 },
//     liquidityDex: {
//       [ChainId.ARBITRUM]: LiquidityDex.CamelotV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.ARBITRUM]: 'https://app.camelot.exchange/liquidity?type=v2&position=lp',
//     },
//   },
//   abondEth_Ichi: {
//     symbol: 'ABOND-ETH',
//     address: {
//       [ChainId.MAINNET]: '0x52692cC6637c985817D3C14bc99ad898565d14fF',
//     },
//     decimals: {
//       [ChainId.MAINNET]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MAINNET]: LiquidityDex.UniswapV3,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MAINNET]:
//         'https://app.ichi.org/vault/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/pairedtoken/0xe6828D65bf5023AE1851D90D8783Cc821ba7eeE1/tab/deposit',
//     },
//   },
//   abondEth_UNIV2: {
//     symbol: 'ABOND-ETH',
//     address: {
//       [ChainId.MAINNET]: '0x7C742868B11bE60D1FbefbEbcCD153df8472967B',
//     },
//     decimals: {
//       [ChainId.MAINNET]: 18,
//     },
//     liquidityDex: {
//       [ChainId.MAINNET]: LiquidityDex.UniswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.MAINNET]: 'https://app.uniswap.org/add/v2/ETH/0xe6828D65bf5023AE1851D90D8783Cc821ba7eeE1',
//     },
//   },
//   sophEth_Aedrome: {
//     symbol: 'SOPH-WETH',
//     address: {
//       [ChainId.BASE]: '0x1306B112CD7e2DeFa1CdB163DDA3B0D1c186E6bB',
//     },
//     decimals: {
//       [ChainId.BASE]: 18,
//     },
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.Aerodrome,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.BASE]:
//         'https://aerodrome.finance/deposit?token0=0x4200000000000000000000000000000000000006&token1=0x73fBD93bFDa83B111DdC092aa3a4ca77fD30d380&type=-1',
//     },
//   },
//   mafiaUsdc_UNI: {
//     symbol: 'MAFIA-USDC',
//     address: {
//       [ChainId.BASE]: '0x84BF3f50081A17ea4090cE7fC697819ca3Bd53dD',
//     },
//     decimals: {
//       [ChainId.BASE]: 18,
//     },
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.UniswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.BASE]:
//         'https://app.uniswap.org/add/v2/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913/0x3f8D935512f74b7C71A2C2395a06af5f87BC9276?chain=base',
//     },
//   },
//   wethImgnai_UNI: {
//     symbol: 'ETH-imgnAI',
//     address: {
//       [ChainId.BASE]: '0xf8774E69e47e3041c91eed306D19cf7E1A000D69',
//     },
//     decimals: {
//       [ChainId.BASE]: 18,
//     },
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.UniswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.BASE]:
//         'https://app.uniswap.org/add/v2/0x4200000000000000000000000000000000000006/0x18e692c03de43972fe81058f322fa542ae1a5e2c',
//     },
//   },
//   magWeth_UNI: {
//     symbol: 'ETH-MAG',
//     address: {
//       [ChainId.BASE]: '0xDd5f5484FdaBe2223d66Ef417A98ef82aE9c76e3',
//     },
//     decimals: {
//       [ChainId.BASE]: 18,
//     },
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.UniswapV2,
//     },
//     active: true,
//     lpToken: true,
//     getLpUrl: {
//       [ChainId.BASE]:
//         'https://app.uniswap.org/add/v2/0x4200000000000000000000000000000000000006/0x59f680f431f5280e7662b96f2dfa195d1693852d',
//     },
//   },
//   rewardWeth_Ichi: {
//     symbol: 'REWARD-ETH',
//     address: {
//       [ChainId.BASE]: '0x49Ea04f85F29a7fBaA1dd45048Abb3713523aDa2',
//     },
//     decimals: { [ChainId.BASE]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.UniswapV3,
//     },
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//     getLpUrl: {
//       [ChainId.BASE]: 'https://app.ichi.org/vault/token/0x1986cc18d8ec757447254310d2604f85741aa732/',
//     },
//   },
//   upWeth_Ichi: {
//     symbol: 'UP-ETH',
//     address: {
//       [ChainId.BASE]: '0xF349Fa49651d5ae67771B61840c4CCC7a2565764',
//     },
//     decimals: { [ChainId.BASE]: 18 },
//     active: true,
//     lpToken: true,
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.UniswapV3,
//     },
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.UniswapV3,
//     getLpUrl: {
//       [ChainId.BASE]: 'https://app.ichi.org/vault/token/0xac27fa800955849d6d17cc8952ba9dd6eaa66187/',
//     },
//   },
//   trebleEth_Ichi: {
//     symbol: 'TREBLE-ETH',
//     address: {
//       [ChainId.BASE]: '0x5019e698A9d1cDCB647045Bd4c8C5f25cd5F388B',
//     },
//     decimals: {
//       [ChainId.BASE]: 18,
//     },
//     liquidityDex: {
//       [ChainId.BASE]: LiquidityDex.TrebleV4,
//     },
//     active: true,
//     lpToken: true,
//     liquidityWrapper: Wrappers.Ichi,
//     ichiUnderlyingDex: IchiSupportedDex.Trebleswap,
//     getLpUrl: {
//       [ChainId.BASE]: 'https://app.ichi.org/vault/token/0x4200000000000000000000000000000000000006/',
//     },
//   },
// }
