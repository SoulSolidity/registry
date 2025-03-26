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
            id: 'FNFSUSDT',
            tokenAddress: '0x09854c1349cd1412439461ca72609f97850d2218',
        },
        '0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd': {
            source: enums_1.PriceSource.Dexscreener,
            type: 'token',
            tokenAddress: '0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd',
        },
        '0xce62C48ecf7a08d285575Dc5be404ffb36BcAE2E': {
            source: enums_1.PriceSource.Dexscreener,
            type: 'pair',
            tokenAddress: '0xce62C48ecf7a08d285575Dc5be404ffb36BcAE2E',
        }
    }
};
