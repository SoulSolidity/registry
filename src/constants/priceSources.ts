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
        '0x44aA475eD44ddA30F4fB81a0eEC7C44aed01c7c0': {
            source: PriceSource.Dexscreener,
            type: 'pair',
            tokenAddress: '0x44aA475eD44ddA30F4fB81a0eEC7C44aed01c7c0',
        }
    }
}