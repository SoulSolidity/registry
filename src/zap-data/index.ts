import { ChainId, IchiSupportedDex } from '../types/enums';
import { ZapInfo } from './types/types';
import { Project } from './types/enums';

// Import template factories
import { createGammaZapInfoMap } from './templates/gamma/zapInfo';
import { createApeBondZapInfoMap } from './templates/single';

// Import chain-specific data
import { uniswapGammaEntries as polygonUniswapGammaEntries } from './chains/polygon/uniswap';
import { uniswapGammaEntries as bnbUniswapGammaEntries } from './chains/bnb/uniswap';
import { apeBondEntries as bnbApeBondEntries } from './chains/bnb/apebond';
import { lynexGammaEntries as lineaLynexGammaEntries } from './chains/linea/lynex';
import { lynexIchiEntries as lineaLynexIchiEntries } from './chains/linea/lynex';
import { createIchiZapInfoMap } from './templates/Ichi/zapInfo';

// Initialize the zapData structure
const zapData: Record<ChainId, Record<`0x${string}`, ZapInfo>> = {
    [ChainId.ETH]: {},
    [ChainId.POLYGON]: {},
    [ChainId.BNB]: {},
    [ChainId.ARBITRUM]: {},
    [ChainId.LINEA]: {},
    [ChainId.BASE]: {},
    [ChainId.AVAX]: {},
    [ChainId.BLAST]: {},
    [ChainId.LIGHTLINK]: {},
    [ChainId.IOTA]: {},
    [ChainId.BNB_TESTNET]: {},
};

// Populate with chain data using our factory functions
Object.assign(
    zapData[ChainId.POLYGON],
    createGammaZapInfoMap(polygonUniswapGammaEntries, Project.Uniswap, ChainId.POLYGON)
);

Object.assign(
    zapData[ChainId.BNB],
    createGammaZapInfoMap(bnbUniswapGammaEntries, Project.Uniswap, ChainId.BNB),
    createApeBondZapInfoMap(bnbApeBondEntries)
);

Object.assign(
    zapData[ChainId.LINEA],
    createGammaZapInfoMap(lineaLynexGammaEntries, Project.Lynex, ChainId.LINEA),
    createIchiZapInfoMap(lineaLynexIchiEntries, Project.Lynex, IchiSupportedDex.Lynex)
);

export default zapData; 