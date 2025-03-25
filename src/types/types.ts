import { LiquidityDex, PriceSource, Protocols } from "./enums";

export type DexConfig = {
    name: LiquidityDex,
    factory: string;
    router?: string;
    protocol: Protocols,
    hideImage?: boolean
}

export type CoinGeckoPriceSourceConfig = {
    source: PriceSource.Coingecko,
    id: string,
    tokenAddress: string
}

export type DexScreenerPriceSourceConfig = {
    source: PriceSource.Dexscreener,
    id: string,
    tokenAddress: string
}

export type MexcPriceSourceConfig = {
    source: PriceSource.Mexc,
    id: string,
    tokenAddress: string
}

export type PriceSourceConfigs = CoinGeckoPriceSourceConfig | DexScreenerPriceSourceConfig | MexcPriceSourceConfig