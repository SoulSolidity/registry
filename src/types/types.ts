import { ChainId, LiquidityDex, PriceSource, Protocols } from "./enums";

export type DexConfig = {
    name: LiquidityDex,
    factory: `0x${string}`;
    router?: `0x${string}`;
    protocol: Protocols,
    hideImage?: boolean
}

export type CoinGeckoPriceSourceConfig = {
    source: PriceSource.Coingecko,
    id: string,
    tokenAddress: `0x${string}`
}

export type DexScreenerPriceSourceConfig = {
    source: PriceSource.Dexscreener,
    type: 'token' | 'pair',
    tokenAddress: `0x${string}`
}

export type MexcPriceSourceConfig = {
    source: PriceSource.Mexc,
    id: string,
    tokenAddress: `0x${string}`
}

export type PriceSourceConfigs = CoinGeckoPriceSourceConfig | DexScreenerPriceSourceConfig | MexcPriceSourceConfig