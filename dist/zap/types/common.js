"use strict";
/**
 * Common types for the zap system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPType = exports.ProjectProtocol = exports.Project = exports.ChainNames = void 0;
const enums_1 = require("../../types/enums");
/**
 * Chain names mapping
 */
exports.ChainNames = {
    [enums_1.ChainId.ETH]: 'ethereum',
    [enums_1.ChainId.BNB]: 'bnb',
    [enums_1.ChainId.POLYGON]: 'polygon',
    [enums_1.ChainId.ARBITRUM]: 'arbitrum',
    [enums_1.ChainId.LINEA]: 'linea',
    [enums_1.ChainId.BASE]: 'base',
    [enums_1.ChainId.AVAX]: 'avalanche',
    [enums_1.ChainId.BLAST]: 'blast',
    [enums_1.ChainId.LIGHTLINK]: 'lightlink',
    [enums_1.ChainId.IOTA]: 'iota',
    [enums_1.ChainId.BNB_TESTNET]: 'bnb_testnet',
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
var ProjectProtocol;
(function (ProjectProtocol) {
    ProjectProtocol["ApeBond"] = "ApeBond";
    ProjectProtocol["LynexGauge"] = "LynexGauge";
})(ProjectProtocol || (exports.ProjectProtocol = ProjectProtocol = {}));
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
