"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceSources = void 0;
const enums_1 = require("../types/enums");
exports.priceSources = {
    [enums_1.ChainId.BNB]: {
        '0x8613d52D74a48883A51bAdF8b25ab066714087Da': {
            source: enums_1.PriceSource.Coingecko,
            id: 'lovebit',
            tokenAddress: '0x8613d52D74a48883A51bAdF8b25ab066714087Da',
        },
        '0x09854c1349cd1412439461ca72609f97850d2218': {
            source: enums_1.PriceSource.Mexc,
            id: '0x09854c1349cd1412439461ca72609f97850d2218',
            tokenAddress: '0x09854c1349cd1412439461ca72609f97850d2218',
        }
    }
};
