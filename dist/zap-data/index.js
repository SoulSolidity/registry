"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const enums_2 = require("./types/enums");
// Import template factories
const zapInfo_1 = require("./templates/gamma/zapInfo");
const single_1 = require("./templates/single");
// Import chain-specific data
const uniswap_1 = require("./chains/polygon/uniswap");
const uniswap_2 = require("./chains/bnb/uniswap");
const apebond_1 = require("./chains/bnb/apebond");
const lynex_1 = require("./chains/linea/lynex");
const lynex_2 = require("./chains/linea/lynex");
const zapInfo_2 = require("./templates/Ichi/zapInfo");
// Initialize the zapData structure
const zapData = {
    [enums_1.ChainId.ETH]: {},
    [enums_1.ChainId.POLYGON]: {},
    [enums_1.ChainId.BNB]: {},
    [enums_1.ChainId.ARBITRUM]: {},
    [enums_1.ChainId.LINEA]: {},
    [enums_1.ChainId.BASE]: {},
    [enums_1.ChainId.AVAX]: {},
    [enums_1.ChainId.BLAST]: {},
    [enums_1.ChainId.LIGHTLINK]: {},
    [enums_1.ChainId.IOTA]: {},
    [enums_1.ChainId.BNB_TESTNET]: {},
};
// Populate with chain data using our factory functions
Object.assign(zapData[enums_1.ChainId.POLYGON], (0, zapInfo_1.createGammaZapInfoMap)(uniswap_1.uniswapGammaEntries, enums_2.Project.Uniswap, enums_1.ChainId.POLYGON));
Object.assign(zapData[enums_1.ChainId.BNB], (0, zapInfo_1.createGammaZapInfoMap)(uniswap_2.uniswapGammaEntries, enums_2.Project.Uniswap, enums_1.ChainId.BNB), (0, single_1.createApeBondZapInfoMap)(apebond_1.apeBondEntries));
Object.assign(zapData[enums_1.ChainId.LINEA], (0, zapInfo_1.createGammaZapInfoMap)(lynex_1.lynexGammaEntries, enums_2.Project.Lynex, enums_1.ChainId.LINEA), (0, zapInfo_2.createIchiZapInfoMap)(lynex_2.lynexIchiEntries, enums_2.Project.Lynex, enums_1.IchiSupportedDex.Lynex));
exports.default = zapData;
