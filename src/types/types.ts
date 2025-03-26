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

export const DexScreenerChainIds: Record<ChainId, string> = {
    [ChainId.ETH]: "ethereum",
    [ChainId.POLYGON]: "polygon",
    [ChainId.BNB]: "bsc",
    [ChainId.ARBITRUM]: "arbitrum",
    [ChainId.LINEA]: "linea",
    [ChainId.BASE]: "base",
    [ChainId.AVAX]: "avalanche",
    [ChainId.BLAST]: "blast",
    [ChainId.LIGHTLINK]: "lightlink",
    [ChainId.IOTA]: "iota",
    [ChainId.BNB_TESTNET]: "bnb-testnet",
}
