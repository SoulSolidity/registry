/**
 * Manual entries for ApeBond Bonds on BNB
 */
import { ProtocolEntry, LPType } from '../../../types';

/**
 * ApeBond entries on Linea
 * 
 * Add or remove entries here manually
 */
export const apeBondBonds: ProtocolEntry[] = [
    {
        name: "ApeBond (USDC => HOTDOG)",
        address: "0x383dcc61af360b73c24caaed805ca0fd4cadeb52",
        type: LPType.SINGLE,
        inputToken: {
            name: "USDC",
            address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
        },
    },
    {
        name: "ApeBond (USDT => LINUS)",
        address: "0x00ab24b9d36b4a4368775a1c523dfc457148ec62",
        type: LPType.SINGLE,
        inputToken: {
            name: "USDT",
            address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
        },
    },
]; 