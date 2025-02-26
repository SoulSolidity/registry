//This is used on SoulSolidity.com pricing page to show the supported chain images
export const priceGetterSupportedChainsImages = [
    { name: 'BNB', image: 'bnb.svg', chainId: 56 },
    { name: 'Ethereum', image: 'ethereum.svg', chainId: 1 },
    { name: 'Polygon', image: 'polygon.svg', chainId: 137 },
    { name: 'Linea', image: 'linea.svg', chainId: 59144 },
    { name: 'Base', image: 'base.svg', chainId: 8453 },
    { name: 'Avalanche', image: 'avalanche.svg', chainId: 43114 },
    { name: 'Arbitrum', image: 'arbitrum.svg', chainId: 42161 },
    { name: 'BeraChain', image: 'bera.svg', chainId: 8822 },
]

//This is used on SoulSolidity.com pricing page to show the playground tokens
//Images from https://github.com/trustwallet/assets/tree/master/blockchains
export const priceGetterPlaygroundTokens: { name: string, address: string, chainId: number, icon: string, lpIcons?: string[] }[] = [
    {
        name: "Coinbase Wrapped BTC",
        address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
        chainId: 8453,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/bitcoin/info/logo.png"
    },
    {
        name: "Aerodrome",
        address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
        chainId: 8453,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/base/assets/0x940181a94A35A4569E4529A3CDfB74e38FD98631/logo.png"
    },
    {
        name: "USD Coin",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        chainId: 8453,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
    },
    {
        name: "ICHI Vault Liquidity(IV-TREB-1-USDC-WETH)",
        address: "0xa0CABEe4d9F5bEb83aaca2e030436D3c514d4fb4",
        chainId: 8453,
        lpIcons: [
            "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png"
        ],
        icon: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/ichi.png"
    }
]