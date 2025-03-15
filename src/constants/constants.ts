//This is used on SoulSolidity.com pricing page to show the supported chain images
export const priceGetterSupportedChainsImages = [
    { name: 'BNB', image: 'bnb.svg', chainId: 56 },
    { name: 'Ethereum', image: 'ethereum.svg', chainId: 1 },
    { name: 'Polygon', image: 'polygon.svg', chainId: 137 },
    { name: 'Linea', image: 'linea.svg', chainId: 59144 },
    { name: 'Base', image: 'base.svg', chainId: 8453 },
    // { name: 'Avalanche', image: 'avalanche.svg', chainId: 43114 },
    { name: 'Arbitrum', image: 'arbitrum.svg', chainId: 42161 },
    // { name: 'BeraChain', image: 'bera.svg', chainId: 8822 },
]

//This is used on SoulSolidity.com pricing page to show the playground tokens
//Images from https://github.com/trustwallet/assets/tree/master/blockchains
export const priceGetterPlaygroundTokens: { name: string, address: string, chainId: number, icon: string, lpIcons?: string[] }[] = [
    //BNB
    {
        name: "BNB",
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        chainId: 56,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/binance/info/logo.png"
    },
    {
        name: "ABOND",
        address: "0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd",
        chainId: 56,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/assets/0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd/logo.png"
    },
    {
        name: "Pancake LPs (CAKE-BNB)",
        address: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
        chainId: 56,
        lpIcons: [
            "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
            "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/smartchain/info/logo.png"
        ],
        icon: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg"
    },
    //Ethereum
    {
        name: "ETH",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        chainId: 1,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png"
    },
    {
        name: "stETH",
        address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
        chainId: 1,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84/logo.png"
    },
    {
        name: "Chainlink",
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        chainId: 1,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png"
    },
    {
        name: "Uniswap V2 (ETH-USDC)",
        address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
        chainId: 1,
        lpIcons: [
            "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/info/logo.png",
            "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        ],
        icon: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg"
    },
    //Polygon
    {
        name: "POL",
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        chainId: 137,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png"
    },
    //Linea
    {
        name: "ETH",
        address: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
        chainId: 59144,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/linea/assets/0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f/logo.png"
    },
    {
        name: "Lynex",
        address: "0x1a51b19CE03dbE0Cb44C1528E34a7EDD7771E9Af",
        chainId: 59144,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/linea/assets/0x1a51b19CE03dbE0Cb44C1528E34a7EDD7771E9Af/logo.png"
    },
    //Base
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
        icon: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Ichi.png"
    },
    //Avalanche
    // {
    //     name: "AVAX",
    //     address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    //     chainId: 43114,
    //     icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png"
    // },
    // {
    //     name: "JOE",
    //     address: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
    //     chainId: 43114,
    //     icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/avalanchec/assets/0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd/logo.png"
    // },
    //Arbitrum
    {
        name: "ETH",
        address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        chainId: 42161,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/arbitrum/assets/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1/logo.png"
    },
    {
        name: "USDC",
        address: "0x9623063377AD1B27544C965cCd7342f7EA7e88C7",
        chainId: 42161,
        icon: "https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/arbitrum/assets/0x9623063377AD1B27544C965cCd7342f7EA7e88C7/logo.png"
    },
]