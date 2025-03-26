import { ChainId, PriceSource } from "../types/enums";
import { PriceSourceConfigs } from "../types/types";

export const priceSources: Partial<Record<ChainId, Record<string, PriceSourceConfigs>>> = {
    [ChainId.BNB]: {
        '0x8613d52D74a48883A51bAdF8b25ab066714087Da': {
            source: PriceSource.Coingecko,
            id: 'lovebit',
            tokenAddress: '0x8613d52D74a48883A51bAdF8b25ab066714087Da',
        },
        '0x09854c1349cd1412439461ca72609f97850d2218': {
            source: PriceSource.Mexc,
            id: 'FNFSUSDT',
            tokenAddress: '0x09854c1349cd1412439461ca72609f97850d2218',
        },
        '0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd': {
            source: PriceSource.Dexscreener,
            type: 'token',
            tokenAddress: '0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd',
        },
        '0xce62C48ecf7a08d285575Dc5be404ffb36BcAE2E': {
            source: PriceSource.Dexscreener,
            type: 'pair',
            tokenAddress: '0xce62C48ecf7a08d285575Dc5be404ffb36BcAE2E',
        }
    }
}