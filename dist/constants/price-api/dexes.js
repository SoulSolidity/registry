"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../types/enums");
const dexFactories = {
    [enums_1.ChainId.ETH]: [
        {
            name: enums_1.LiquidityDex.ApeSwapV2,
            factory: '0xBAe5dc9B19004883d0377419FeF3c2C8832d7d7B',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.UniswapV2,
            factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.UniswapV3,
            factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV2,
            factory: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV3,
            factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
            protocol: enums_1.Protocols.UniV3,
        },
    ],
    [enums_1.ChainId.BNB]: [
        {
            name: enums_1.LiquidityDex.ApeSwapV2,
            factory: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV2,
            factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
            protocol: enums_1.Protocols.UniV2,
            router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        },
        {
            name: enums_1.LiquidityDex.ApeSwapV3,
            factory: '0x7Bc382DdC5928964D7af60e7e2f6299A1eA6F48d',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.UniswapV3,
            factory: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV3,
            factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.ThenaAlgebra,
            factory: '0x306F06C147f064A010530292A1EB6737c3e378e4',
            protocol: enums_1.Protocols.Algebra,
        },
        {
            name: enums_1.LiquidityDex.Thena,
            factory: '0xAFD89d21BdB66d00817d4153E055830B1c2B3970',
            protocol: enums_1.Protocols.Solidly,
            router: '0xd4ae6eCA985340Dd434D38F470aCCce4DC78D109',
        },
    ],
    [enums_1.ChainId.POLYGON]: [
        {
            name: enums_1.LiquidityDex.ApeSwapV2,
            factory: '0xcf083be4164828f00cae704ec15a36d711491284',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.QuickswapV2,
            factory: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.UniswapV3,
            factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.QuickswapAlgebra,
            factory: '0x411b0facc3489691f28ad58c47006af5e3ab3a28',
            protocol: enums_1.Protocols.Algebra,
        },
        {
            name: enums_1.LiquidityDex.SushiSwapV3,
            factory: '0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2',
            protocol: enums_1.Protocols.UniV3,
        },
    ],
    [enums_1.ChainId.ARBITRUM]: [
        {
            name: enums_1.LiquidityDex.ApeSwapV2,
            factory: '0xCf083Be4164828f00cAE704EC15a36D711491284',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.UniswapV3,
            factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.ZyberswapAlgebra,
            factory: '0x9C2ABD632771b433E5E7507BcaA41cA3b25D8544',
            protocol: enums_1.Protocols.Algebra,
        },
        {
            name: enums_1.LiquidityDex.CamelotV2,
            factory: '0x6EcCab422D763aC031210895C81787E87B43A652',
            protocol: enums_1.Protocols.UniV2,
            router: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
        },
        {
            name: enums_1.LiquidityDex.Curve,
            factory: '0x98EE851a00abeE0d95D08cF4CA2BdCE32aeaAF7F',
            protocol: enums_1.Protocols.Curve,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV3,
            factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV2,
            factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
            protocol: enums_1.Protocols.UniV2,
        },
    ],
    [enums_1.ChainId.LINEA]: [
        {
            name: enums_1.LiquidityDex.Spartadex,
            factory: '0x9E4Fc4a5A0769ba74088856C229c4a1Db2Ea5A9e',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.Nile,
            factory: '0xAAA16c016BF556fcD620328f0759252E29b1AB57',
            protocol: enums_1.Protocols.Solidly,
        },
        {
            name: enums_1.LiquidityDex.LynexAlgebra,
            factory: '0x622b2c98123D303ae067DB4925CD6282B3A08D0F',
            protocol: enums_1.Protocols.Algebra,
        },
        {
            name: enums_1.LiquidityDex.Lynex,
            factory: '0xBc7695Fd00E3b32D08124b7a4287493aEE99f9ee',
            protocol: enums_1.Protocols.Solidly,
        },
        {
            name: enums_1.LiquidityDex.Metavault,
            factory: '0x9367c561915f9D062aFE3b57B18e30dEC62b8488',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV3,
            factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV2,
            factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
            protocol: enums_1.Protocols.UniV2,
        },
    ],
    [enums_1.ChainId.LIGHTLINK]: [
        {
            name: enums_1.LiquidityDex.Elektrik,
            factory: '0xEE6099234bbdC793a43676D98Eb6B589ca7112D7',
            protocol: enums_1.Protocols.UniV3,
        },
    ],
    [enums_1.ChainId.BASE]: [
        {
            name: enums_1.LiquidityDex.Synthswap,
            factory: '0x4bd16d59A5E1E0DB903F724aa9d721a31d7D720D',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.SynthswapAlgebra,
            factory: '0xa37359E63D1aa44C0ACb2a4605D3B45785C97eE3',
            protocol: enums_1.Protocols.Algebra,
        },
        {
            name: enums_1.LiquidityDex.UniswapV3,
            factory: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.Aerodrome,
            factory: '0x420DD381b31aEf6683db6B902084cB0FFECe40Da',
            router: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
            protocol: enums_1.Protocols.Solidly,
        },
        {
            name: enums_1.LiquidityDex.SmarDex,
            factory: '0xdd4536dD9636564D891c919416880a3e250f975A',
            protocol: enums_1.Protocols.UniV2, //SmarDex is not actually a V2. Way of calculating price is similar though
        },
        {
            name: enums_1.LiquidityDex.UniswapV2,
            factory: '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6',
            router: '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV3,
            factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.PancakeSwapV2,
            factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.TrebleSwapV2,
            factory: '0x6Ae1d7EfA0640b6A2FA393d1EFf21fC38a08cd8f',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.TrebleAlgebraIntegral,
            factory: '0xAC900f12fB25d514e3ccFE8572B153A9991cA4e7',
            protocol: enums_1.Protocols.AlgebraIntegral,
        },
    ],
    [enums_1.ChainId.IOTA]: [
        {
            name: enums_1.LiquidityDex.MagicSea,
            factory: '0x349aaAc3a500014981CBA11b64C76c66a6c1e8D0',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.Wagmi,
            factory: '0x01Bd510B2eA106917e711f9a05a42fC162bee2Ac',
            protocol: enums_1.Protocols.UniV3,
        },
    ],
    [enums_1.ChainId.AVAX]: [
        {
            name: enums_1.LiquidityDex.LFJ,
            factory: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.Pharaoh,
            factory: '0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.UniswapV3,
            factory: '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD',
            protocol: enums_1.Protocols.UniV3,
        },
        {
            name: enums_1.LiquidityDex.Pangolin,
            factory: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
            protocol: enums_1.Protocols.UniV2,
        },
    ],
    [enums_1.ChainId.BLAST]: [
        {
            name: enums_1.LiquidityDex.ThrusterV2_03,
            factory: '0xb4A7D971D0ADea1c73198C97d7ab3f9CE4aaFA13',
            protocol: enums_1.Protocols.UniV2,
        },
        {
            name: enums_1.LiquidityDex.ThrusterV2_1,
            factory: '0x37836821a2c03c171fB1a595767f4a16e2b93Fc4',
            protocol: enums_1.Protocols.UniV2,
            hideImage: true,
        },
        {
            name: enums_1.LiquidityDex.ThrusterV3,
            factory: '0x71b08f13B3c3aF35aAdEb3949AFEb1ded1016127',
            protocol: enums_1.Protocols.UniV3,
        },
    ],
    [enums_1.ChainId.BNB_TESTNET]: [
        {
            name: enums_1.LiquidityDex.PancakeSwapV3,
            factory: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
            protocol: enums_1.Protocols.UniV3,
        },
    ]
};
exports.default = dexFactories;
