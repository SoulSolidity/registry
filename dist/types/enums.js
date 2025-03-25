"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IchiSupportedDex = exports.IchiSupportedChainId = exports.NetworkNames = exports.ZapProtocols = exports.ZapLPType = exports.LiquidityDex = exports.ProtocolsWithWrapper = exports.Wrappers = exports.Protocols = exports.PriceSource = exports.ChainId = void 0;
var ChainId;
(function (ChainId) {
    ChainId[ChainId["ETH"] = 1] = "ETH";
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["BNB"] = 56] = "BNB";
    ChainId[ChainId["ARBITRUM"] = 42161] = "ARBITRUM";
    ChainId[ChainId["LINEA"] = 59144] = "LINEA";
    ChainId[ChainId["BASE"] = 8453] = "BASE";
    ChainId[ChainId["AVAX"] = 43114] = "AVAX";
    ChainId[ChainId["BLAST"] = 81457] = "BLAST";
    ChainId[ChainId["LIGHTLINK"] = 195] = "LIGHTLINK";
    ChainId[ChainId["IOTA"] = 8822] = "IOTA";
    ChainId[ChainId["BNB_TESTNET"] = 97] = "BNB_TESTNET";
})(ChainId || (exports.ChainId = ChainId = {}));
//========== Price Getter ========== 
var PriceSource;
(function (PriceSource) {
    PriceSource["OnChain"] = "onchain";
    PriceSource["Coingecko"] = "coingecko";
    PriceSource["Dexscreener"] = "dexscreener";
    PriceSource["Mexc"] = "mexc";
})(PriceSource || (exports.PriceSource = PriceSource = {}));
var Protocols;
(function (Protocols) {
    Protocols[Protocols["UniV2"] = 0] = "UniV2";
    Protocols[Protocols["UniV3"] = 1] = "UniV3";
    Protocols[Protocols["UniV4"] = 2] = "UniV4";
    Protocols[Protocols["Algebra"] = 3] = "Algebra";
    Protocols[Protocols["AlgebraIntegral"] = 4] = "AlgebraIntegral";
    Protocols[Protocols["Solidly"] = 5] = "Solidly";
    Protocols[Protocols["Curve"] = 6] = "Curve";
})(Protocols || (exports.Protocols = Protocols = {}));
var Wrappers;
(function (Wrappers) {
    Wrappers[Wrappers["Gamma"] = 0] = "Gamma";
    Wrappers[Wrappers["Ichi"] = 1] = "Ichi";
    Wrappers[Wrappers["Steer"] = 2] = "Steer";
})(Wrappers || (exports.Wrappers = Wrappers = {}));
exports.ProtocolsWithWrapper = [Protocols.UniV3, Protocols.UniV4, Protocols.Algebra, Protocols.AlgebraIntegral];
var LiquidityDex;
(function (LiquidityDex) {
    //MultiChain
    LiquidityDex["ApeSwapV2"] = "ApeSwap V2";
    LiquidityDex["ApeSwapV3"] = "ApeSwap V3";
    LiquidityDex["PancakeSwapV2"] = "PancakeSwap V2";
    LiquidityDex["PancakeSwapV3"] = "PancakeSwap V3";
    LiquidityDex["SushiSwapV3"] = "SushiSwap V3";
    LiquidityDex["UniswapV2"] = "Uniswap V2";
    LiquidityDex["UniswapV3"] = "Uniswap V3";
    LiquidityDex["Curve"] = "Curve";
    //BNB
    LiquidityDex["Thena"] = "Thena";
    LiquidityDex["ThenaAlgebra"] = "Thena Algebra";
    //Polygon
    LiquidityDex["QuickswapV2"] = "Quickswap V2";
    LiquidityDex["QuickswapAlgebra"] = "Quickswap Algebra";
    //Linea
    LiquidityDex["Spartadex"] = "Spartadex";
    LiquidityDex["Nile"] = "Nile";
    LiquidityDex["XFAI"] = "XFAI";
    LiquidityDex["Lynex"] = "Lynex";
    LiquidityDex["LynexAlgebra"] = "Lynex Algebra";
    LiquidityDex["Metavault"] = "Metavault";
    //LightLink
    LiquidityDex["Elektrik"] = "Elektrik";
    //Base
    LiquidityDex["Synthswap"] = "Synthswap";
    LiquidityDex["SynthswapAlgebra"] = "Synthswap Algebra";
    LiquidityDex["Aerodrome"] = "Aerodrome";
    LiquidityDex["SmarDex"] = "SmarDex";
    LiquidityDex["TrebleSwapV2"] = "TrebleSwap V2";
    LiquidityDex["TrebleAlgebraIntegral"] = "Treble Algebra Integral";
    //IOTA
    LiquidityDex["MagicSea"] = "MagicSea";
    LiquidityDex["Wagmi"] = "Wagmi";
    //ARBITRUM
    LiquidityDex["CamelotV2"] = "Camelot V2";
    LiquidityDex["ZyberswapAlgebra"] = "Zyberswap Algebra";
    //AVALANCHE
    LiquidityDex["LFJ"] = "LFJ";
    LiquidityDex["Pharaoh"] = "Pharaoh";
    LiquidityDex["Pangolin"] = "Pangolin";
    //BLAST
    LiquidityDex["ThrusterV2_03"] = "Thruster V2";
    LiquidityDex["ThrusterV2_1"] = "Thruster V2 1% fee";
    LiquidityDex["ThrusterV3"] = "Thruster V3";
})(LiquidityDex || (exports.LiquidityDex = LiquidityDex = {}));
// ========== Zap ========== 
var ZapLPType;
(function (ZapLPType) {
    ZapLPType["Single"] = "single";
    ZapLPType["UniV2"] = "univ2";
    ZapLPType["Gamma"] = "gamma";
    ZapLPType["Ichi"] = "ichi";
    ZapLPType["Arrakis"] = "arrakis";
    ZapLPType["Steer"] = "steer";
    ZapLPType["Solidly"] = "solidly";
    ZapLPType["Curve"] = "curve";
})(ZapLPType || (exports.ZapLPType = ZapLPType = {}));
var ZapProtocols;
(function (ZapProtocols) {
    ZapProtocols["ApeBond"] = "ApeBond";
})(ZapProtocols || (exports.ZapProtocols = ZapProtocols = {}));
var NetworkNames;
(function (NetworkNames) {
    NetworkNames["ETH"] = "eth";
    NetworkNames["BNB"] = "bnb";
    NetworkNames["POLYGON"] = "pol";
    NetworkNames["LINEA"] = "lna";
    NetworkNames["BASE"] = "bas";
    NetworkNames["ARBITRUM"] = "arb";
    NetworkNames["LIGHTLINK"] = "ll";
    NetworkNames["IOTA"] = "iota";
    NetworkNames["AVALANCHE"] = "ava";
    NetworkNames["BLAST"] = "bls";
})(NetworkNames || (exports.NetworkNames = NetworkNames = {}));
var IchiSupportedChainId;
(function (IchiSupportedChainId) {
    IchiSupportedChainId[IchiSupportedChainId["arbitrum"] = 42161] = "arbitrum";
    IchiSupportedChainId[IchiSupportedChainId["arthera"] = 10242] = "arthera";
    IchiSupportedChainId[IchiSupportedChainId["arthera_testnet"] = 10243] = "arthera_testnet";
    IchiSupportedChainId[IchiSupportedChainId["base"] = 8453] = "base";
    // berachain = -1,
    // berachain_bartio = -1,
    IchiSupportedChainId[IchiSupportedChainId["blast"] = 81457] = "blast";
    IchiSupportedChainId[IchiSupportedChainId["blast_sepolia_testnet"] = 168587773] = "blast_sepolia_testnet";
    IchiSupportedChainId[IchiSupportedChainId["bsc"] = 56] = "bsc";
    IchiSupportedChainId[IchiSupportedChainId["celo"] = 42220] = "celo";
    IchiSupportedChainId[IchiSupportedChainId["eon"] = 7332] = "eon";
    IchiSupportedChainId[IchiSupportedChainId["evmos"] = 9001] = "evmos";
    IchiSupportedChainId[IchiSupportedChainId["fantom"] = 250] = "fantom";
    // flare = -1,
    // fuse = -1,
    // haven1_devnet = -1,
    // hedera = -1,
    // hedera_testnet = 296,
    // ink = -1,
    // ink_sepolia = -1,
    IchiSupportedChainId[IchiSupportedChainId["kava"] = 2222] = "kava";
    IchiSupportedChainId[IchiSupportedChainId["linea"] = 59144] = "linea";
    IchiSupportedChainId[IchiSupportedChainId["mainnet"] = 1] = "mainnet";
    IchiSupportedChainId[IchiSupportedChainId["mantle"] = 5000] = "mantle";
    // mode = -1,
    IchiSupportedChainId[IchiSupportedChainId["polygon"] = 137] = "polygon";
    IchiSupportedChainId[IchiSupportedChainId["polygon_zkevm"] = 1101] = "polygon_zkevm";
    // real = -1,
    // rootstock = -1,
    IchiSupportedChainId[IchiSupportedChainId["scroll"] = 534352] = "scroll";
    // skale_europa = -1,
    // sonic = -1,
    IchiSupportedChainId[IchiSupportedChainId["taiko"] = 167000] = "taiko";
    IchiSupportedChainId[IchiSupportedChainId["taiko_hekla"] = 167009] = "taiko_hekla";
    // unreal = -1,
    IchiSupportedChainId[IchiSupportedChainId["x_layer_testnet"] = 195] = "x_layer_testnet";
    // zircuit = -1,
    IchiSupportedChainId[IchiSupportedChainId["zksync_era"] = 324] = "zksync_era";
    IchiSupportedChainId[IchiSupportedChainId["zksync_era_testnet"] = 280] = "zksync_era_testnet";
})(IchiSupportedChainId || (exports.IchiSupportedChainId = IchiSupportedChainId = {}));
var IchiSupportedDex;
(function (IchiSupportedDex) {
    IchiSupportedDex["Agni"] = "Agni";
    IchiSupportedDex["Ascent"] = "Ascent";
    IchiSupportedDex["Blueprint"] = "Blueprint";
    IchiSupportedDex["Cleo"] = "Cleo";
    IchiSupportedDex["Crust"] = "Crust";
    IchiSupportedDex["Equalizer"] = "Equalizer";
    IchiSupportedDex["Equalizer2Thick"] = "Equalizer2Thick";
    IchiSupportedDex["Fenix"] = "Fenix";
    IchiSupportedDex["Forge"] = "Forge";
    IchiSupportedDex["Haven1"] = "Haven1";
    IchiSupportedDex["Henjin"] = "Henjin";
    IchiSupportedDex["Honeypot"] = "Honeypot";
    IchiSupportedDex["Kim"] = "Kim";
    IchiSupportedDex["Kinetix"] = "Kinetix";
    IchiSupportedDex["Kodiak"] = "Kodiak";
    IchiSupportedDex["Linehub"] = "Linehub";
    IchiSupportedDex["Lynex"] = "Lynex";
    IchiSupportedDex["Metavault"] = "Metavault";
    IchiSupportedDex["Nile"] = "Nile";
    IchiSupportedDex["Ocelex"] = "Ocelex";
    IchiSupportedDex["Pancakeswap"] = "PancakeSwap";
    IchiSupportedDex["Pearl"] = "Pearl";
    IchiSupportedDex["Quickswap"] = "QuickSwap";
    IchiSupportedDex["Ramses"] = "Ramses";
    IchiSupportedDex["Reservoir"] = "Reservoir";
    IchiSupportedDex["Retro"] = "Retro";
    IchiSupportedDex["SaucerSwap"] = "SaucerSwap";
    IchiSupportedDex["SparkDex"] = "SparkDex";
    IchiSupportedDex["SparkDexV1"] = "SparkDexV1";
    IchiSupportedDex["SpiritSwap"] = "SpiritSwap";
    IchiSupportedDex["Sushiswap"] = "SushiSwap";
    IchiSupportedDex["SwapX"] = "SwapX";
    IchiSupportedDex["Thena"] = "Thena";
    IchiSupportedDex["ThenaV3Fees"] = "ThenaV3Fees";
    IchiSupportedDex["Thirdfy"] = "Thirdfy";
    IchiSupportedDex["Thruster"] = "Thruster";
    IchiSupportedDex["Trebleswap"] = "Trebleswap";
    IchiSupportedDex["Ubeswap"] = "Ubeswap";
    IchiSupportedDex["UniswapV3"] = "Uniswap V3";
    IchiSupportedDex["UniswapV4"] = "Uniswap V4";
    IchiSupportedDex["Velocore"] = "Velocore";
    IchiSupportedDex["Voltage"] = "Voltage";
    IchiSupportedDex["XSwap"] = "XSwap";
})(IchiSupportedDex || (exports.IchiSupportedDex = IchiSupportedDex = {}));
