import { ChainId, PriceSource } from "../types/enums";
import { PriceSourceConfigs } from "../types/types";

export const priceSources: Partial<Record<ChainId, Record<string, PriceSourceConfigs[]>>> = {
    [ChainId.BNB]: {
        '0x8613d52D74a48883A51bAdF8b25ab066714087Da': [
            {
                source: PriceSource.Coingecko,
                id: 'lovebit',
                tokenAddress: '0x8613d52D74a48883A51bAdF8b25ab066714087Da',
            }
        ]
    }
}