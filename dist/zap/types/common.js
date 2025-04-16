"use strict";
/**
 * Common types for the zap system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPType = exports.Project = exports.ChainNames = exports.ChainId = void 0;
/**
 * Supported chains in the system
 */
var ChainId;
(function (ChainId) {
    ChainId[ChainId["ETHEREUM"] = 1] = "ETHEREUM";
    ChainId[ChainId["BNB"] = 56] = "BNB";
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["ARBITRUM"] = 42161] = "ARBITRUM";
    ChainId[ChainId["LINEA"] = 59144] = "LINEA";
    ChainId[ChainId["BASE"] = 8453] = "BASE";
    ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
})(ChainId || (exports.ChainId = ChainId = {}));
/**
 * Chain names mapping
 */
exports.ChainNames = {
    [ChainId.ETHEREUM]: 'ethereum',
    [ChainId.BNB]: 'bnb',
    [ChainId.POLYGON]: 'polygon',
    [ChainId.ARBITRUM]: 'arbitrum',
    [ChainId.LINEA]: 'linea',
    [ChainId.BASE]: 'base',
    [ChainId.AVALANCHE]: 'avalanche',
};
/**
 * Supported projects
 */
var Project;
(function (Project) {
    Project["ApeBond"] = "ApeBond";
    Project["Uniswap"] = "Uniswap";
    Project["PancakeSwap"] = "PancakeSwap";
    Project["SushiSwap"] = "SushiSwap";
    Project["QuickSwap"] = "QuickSwap";
    Project["Zyberswap"] = "Zyberswap";
    Project["Thena"] = "Thena";
    Project["Retro"] = "Retro";
    Project["Ascent"] = "Ascent";
    Project["Ramses"] = "Ramses";
    Project["Camelot"] = "Camelot";
    Project["Lynex"] = "Lynex";
    Project["SynthSwap"] = "SynthSwap";
    Project["BaseX"] = "BaseX";
    Project["SwapBased"] = "SwapBased";
})(Project || (exports.Project = Project = {}));
/**
 * Supported LP types
 */
var LPType;
(function (LPType) {
    LPType["UNIV2"] = "univ2";
    LPType["SOLIDLY"] = "solidly";
    LPType["GAMMA"] = "gamma";
    LPType["ICHI"] = "ichi";
    LPType["STEER"] = "steer";
    LPType["SINGLE"] = "single";
    LPType["CURVE"] = "curve";
})(LPType || (exports.LPType = LPType = {}));
