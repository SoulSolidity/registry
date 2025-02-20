export enum ChainId {
    ETH = 1,
    POLYGON = 137,
    BNB = 56,
    ARBITRUM = 42161,
    LINEA = 59144,
    BASE = 8453,
    AVAX = 43114,
    BLAST = 81457,
    LIGHTLINK = 195,
    IOTA = 8822,
    BNB_TESTNET = 97,
}

//========== Price Getter ========== 

export enum Protocols {
    UniV2 = 0,
    UniV3 = 1,
    UniV4 = 2,
    Algebra = 3,
    AlgebraIntegral = 4,
    Solidly = 5,
    Curve = 6,
}

export enum Wrappers {
    Gamma = 0,
    Ichi = 1,
    Steer = 2,
}

export const ProtocolsWithWrapper: Protocols[] = [Protocols.UniV3, Protocols.UniV4, Protocols.Algebra, Protocols.AlgebraIntegral]

export enum LiquidityDex {
    //MultiChain
    ApeSwapV2 = 'ApeSwapV2',
    ApeSwapV3 = 'ApeSwapV3',
    PancakeSwapV2 = 'PancakeSwapV2',
    PancakeSwapV3 = 'PancakeSwapV3',
    SushiSwapV3 = 'SushiSwapV3',
    UniswapV2 = 'UniswapV2',
    UniswapV3 = 'UniswapV3',
    Curve = 'Curve',

    //BNB
    ThenaV1 = 'ThenaV1',
    ThenaAlgebra = 'ThenaAlgebra',

    //Polygon
    QuickswapV2 = 'QuickswapV2',
    QuickswapAlgebra = 'QuickswapAlgebra',

    //Linea
    Spartadex = 'Spartadex',
    Nile = 'Nile',
    XFAI = 'XFAI',
    Lynex = 'Lynex',
    LynexAlgebra = 'LynexAlgebra',
    Metavault = 'Metavault',

    //LightLink
    Elektrik = 'Elektrik',

    //Base
    Synthswap = 'Synthswap',
    SynthswapAlgebra = 'SynthswapAlgebra',
    Aerodrome = 'Aerodrome',
    SmarDex = 'SmarDex',
    TrebleSwapV2 = 'TrebleSwapV2',
    TrebleAlgebraIntegral = 'TrebleAlgebraIntegral',

    //IOTA
    MagicSea = 'MagicSea',
    Wagmi = 'Wagmi',

    //ARBITRUM
    CamelotV2 = 'Camelotv2',
    ZyberswapAlgebra = 'ZyberswapAlgebra',

    //AVALANCHE
    LFJ = 'LFJ',
    Pharaoh = 'Pharaoh',
    Pangolin = 'Pangolin',

    //BLAST
    ThrusterV2_03 = 'ThrusterV2_03', //0.3% fee
    ThrusterV2_1 = 'ThrusterV2_1', //1% fee
    ThrusterV3 = 'ThrusterV3',
}

// ========== Zap ========== 

export enum ZapLPType {
    Single = 'single',
    UniV2 = 'univ2',
    Gamma = 'gamma',
    Ichi = 'ichi',
    Arrakis = 'arrakis',
    Steer = 'steer',
    Solidly = 'solidly',
    Curve = 'curve',
}

export enum ZapProtocols {
    ApeBond = 'ApeBond',
}

export enum NetworkNames {
    ETH = 'eth',
    BNB = 'bnb',
    POLYGON = 'pol',
    LINEA = 'lna',
    BASE = 'bas',
    ARBITRUM = 'arb',
    LIGHTLINK = 'll', // no lifi support. should match their chain key once added
    IOTA = 'iota', // no lifi support. should match their chain key once added
    AVALANCHE = 'ava',
    BLAST = 'bls'
}

export enum IchiSupportedChainId {
    arbitrum = 42161,
    arthera = 10242,
    arthera_testnet = 10243,
    base = 8453,
    // berachain = -1,
    // berachain_bartio = -1,
    blast = 81457,
    blast_sepolia_testnet = 168587773,
    bsc = 56,
    celo = 42220,
    eon = 7332,
    evmos = 9001,
    fantom = 250,
    // flare = -1,
    // fuse = -1,
    // haven1_devnet = -1,
    // hedera = -1,
    // hedera_testnet = 296,
    // ink = -1,
    // ink_sepolia = -1,
    kava = 2222,
    linea = 59144,
    mainnet = 1,
    mantle = 5000,
    // mode = -1,
    polygon = 137,
    polygon_zkevm = 1101,
    // real = -1,
    // rootstock = -1,
    scroll = 534352,
    // skale_europa = -1,
    // sonic = -1,
    taiko = 167000,
    taiko_hekla = 167009,
    // unreal = -1,
    x_layer_testnet = 195,
    // zircuit = -1,
    zksync_era = 324,
    zksync_era_testnet = 280
}

export enum IchiSupportedDex {
    Agni = 'Agni',
    Ascent = 'Ascent',
    Blueprint = 'Blueprint',
    Cleo = 'Cleo',
    Crust = 'Crust',
    Equalizer = 'Equalizer',
    Equalizer2Thick = 'Equalizer2Thick',
    Fenix = 'Fenix',
    Forge = 'Forge',
    Haven1 = 'Haven1',
    Henjin = 'Henjin',
    Honeypot = 'Honeypot',
    Kim = 'Kim',
    Kinetix = 'Kinetix',
    Kodiak = 'Kodiak',
    Linehub = 'Linehub',
    Lynex = 'Lynex',
    Metavault = 'Metavault',
    Nile = 'Nile',
    Ocelex = 'Ocelex',
    Pancakeswap = 'PancakeSwap',
    Pearl = 'Pearl',
    Quickswap = 'QuickSwap',
    Ramses = 'Ramses',
    Reservoir = 'Reservoir',
    Retro = 'Retro',
    SaucerSwap = 'SaucerSwap',
    SparkDex = 'SparkDex',
    SparkDexV1 = 'SparkDexV1',
    SpiritSwap = 'SpiritSwap',
    Sushiswap = 'SushiSwap',
    SwapX = 'SwapX',
    Thena = 'Thena',
    ThenaV3Fees = 'ThenaV3Fees',
    Thirdfy = 'Thirdfy',
    Thruster = 'Thruster',
    Trebleswap = 'Trebleswap',
    Ubeswap = 'Ubeswap',
    UniswapV3 = 'Uniswap V3',
    UniswapV4 = 'Uniswap V4',
    Velocore = 'Velocore',
    Voltage = 'Voltage',
    XSwap = 'XSwap'
}