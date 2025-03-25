export declare enum ChainId {
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
    BNB_TESTNET = 97
}
export declare enum PriceSource {
    OnChain = "onchain",
    Coingecko = "coingecko",
    Dexscreener = "dexscreener",
    Mexc = "mexc"
}
export declare enum Protocols {
    UniV2 = 0,
    UniV3 = 1,
    UniV4 = 2,
    Algebra = 3,
    AlgebraIntegral = 4,
    Solidly = 5,
    Curve = 6
}
export declare enum Wrappers {
    Gamma = 0,
    Ichi = 1,
    Steer = 2
}
export declare const ProtocolsWithWrapper: Protocols[];
export declare enum LiquidityDex {
    ApeSwapV2 = "ApeSwap V2",
    ApeSwapV3 = "ApeSwap V3",
    PancakeSwapV2 = "PancakeSwap V2",
    PancakeSwapV3 = "PancakeSwap V3",
    SushiSwapV3 = "SushiSwap V3",
    UniswapV2 = "Uniswap V2",
    UniswapV3 = "Uniswap V3",
    Curve = "Curve",
    Thena = "Thena",
    ThenaAlgebra = "Thena Algebra",
    QuickswapV2 = "Quickswap V2",
    QuickswapAlgebra = "Quickswap Algebra",
    Spartadex = "Spartadex",
    Nile = "Nile",
    XFAI = "XFAI",
    Lynex = "Lynex",
    LynexAlgebra = "Lynex Algebra",
    Metavault = "Metavault",
    Elektrik = "Elektrik",
    Synthswap = "Synthswap",
    SynthswapAlgebra = "Synthswap Algebra",
    Aerodrome = "Aerodrome",
    SmarDex = "SmarDex",
    TrebleSwapV2 = "TrebleSwap V2",
    TrebleAlgebraIntegral = "Treble Algebra Integral",
    MagicSea = "MagicSea",
    Wagmi = "Wagmi",
    CamelotV2 = "Camelot V2",
    ZyberswapAlgebra = "Zyberswap Algebra",
    LFJ = "LFJ",
    Pharaoh = "Pharaoh",
    Pangolin = "Pangolin",
    ThrusterV2_03 = "Thruster V2",//0.3% fee
    ThrusterV2_1 = "Thruster V2 1% fee",//1% fee
    ThrusterV3 = "Thruster V3"
}
export declare enum ZapLPType {
    Single = "single",
    UniV2 = "univ2",
    Gamma = "gamma",
    Ichi = "ichi",
    Arrakis = "arrakis",
    Steer = "steer",
    Solidly = "solidly",
    Curve = "curve"
}
export declare enum ZapProtocols {
    ApeBond = "ApeBond"
}
export declare enum NetworkNames {
    ETH = "eth",
    BNB = "bnb",
    POLYGON = "pol",
    LINEA = "lna",
    BASE = "bas",
    ARBITRUM = "arb",
    LIGHTLINK = "ll",// no lifi support. should match their chain key once added
    IOTA = "iota",// no lifi support. should match their chain key once added
    AVALANCHE = "ava",
    BLAST = "bls"
}
export declare enum IchiSupportedChainId {
    arbitrum = 42161,
    arthera = 10242,
    arthera_testnet = 10243,
    base = 8453,
    blast = 81457,
    blast_sepolia_testnet = 168587773,
    bsc = 56,
    celo = 42220,
    eon = 7332,
    evmos = 9001,
    fantom = 250,
    kava = 2222,
    linea = 59144,
    mainnet = 1,
    mantle = 5000,
    polygon = 137,
    polygon_zkevm = 1101,
    scroll = 534352,
    taiko = 167000,
    taiko_hekla = 167009,
    x_layer_testnet = 195,
    zksync_era = 324,
    zksync_era_testnet = 280
}
export declare enum IchiSupportedDex {
    Agni = "Agni",
    Ascent = "Ascent",
    Blueprint = "Blueprint",
    Cleo = "Cleo",
    Crust = "Crust",
    Equalizer = "Equalizer",
    Equalizer2Thick = "Equalizer2Thick",
    Fenix = "Fenix",
    Forge = "Forge",
    Haven1 = "Haven1",
    Henjin = "Henjin",
    Honeypot = "Honeypot",
    Kim = "Kim",
    Kinetix = "Kinetix",
    Kodiak = "Kodiak",
    Linehub = "Linehub",
    Lynex = "Lynex",
    Metavault = "Metavault",
    Nile = "Nile",
    Ocelex = "Ocelex",
    Pancakeswap = "PancakeSwap",
    Pearl = "Pearl",
    Quickswap = "QuickSwap",
    Ramses = "Ramses",
    Reservoir = "Reservoir",
    Retro = "Retro",
    SaucerSwap = "SaucerSwap",
    SparkDex = "SparkDex",
    SparkDexV1 = "SparkDexV1",
    SpiritSwap = "SpiritSwap",
    Sushiswap = "SushiSwap",
    SwapX = "SwapX",
    Thena = "Thena",
    ThenaV3Fees = "ThenaV3Fees",
    Thirdfy = "Thirdfy",
    Thruster = "Thruster",
    Trebleswap = "Trebleswap",
    Ubeswap = "Ubeswap",
    UniswapV3 = "Uniswap V3",
    UniswapV4 = "Uniswap V4",
    Velocore = "Velocore",
    Voltage = "Voltage",
    XSwap = "XSwap"
}
