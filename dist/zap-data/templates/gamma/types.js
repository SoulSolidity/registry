"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gammaUniProxy = void 0;
const enums_1 = require("../../../types/enums");
const enums_2 = require("../../types/enums");
// Utility mapping of project addresses
exports.gammaUniProxy = {
    [enums_2.Project.ApeBond]: {},
    [enums_2.Project.Uniswap]: {
        [enums_1.ChainId.ETH]: '0x83dE646A7125aC04950FEA7e322481D4BE66c71d',
        [enums_1.ChainId.POLYGON]: '0xdCD902103fd9dDbB4a393Dff6b4a78e35dc50cc2',
        [enums_1.ChainId.ARBITRUM]: '0x82FcEB07a4D01051519663f6c1c919aF21C27845',
        [enums_1.ChainId.BNB]: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f',
    },
    [enums_2.Project.PancakeSwap]: {
        [enums_1.ChainId.ETH]: '0x561F5CF838429586D1F8d3826526891b289270EE',
        [enums_1.ChainId.ARBITRUM]: '0x4fd87c7FA22D4E8aD933aC4C709C83cEFDCE8B00',
        [enums_1.ChainId.BNB]: '0xa50327EF905916203f2678906bfa10A1fdcaFD03',
    },
    [enums_2.Project.SushiSwap]: {
        [enums_1.ChainId.POLYGON]: '0x4cb8B78deDA81081Ffe8003b44E1A6ef17108863',
        [enums_1.ChainId.ARBITRUM]: '0x530071b0373Ab3029cAd32E0c19b75253e231b69',
        [enums_1.ChainId.BASE]: '0xc40F63879630dFF5b69dd6d287f7735E65e90702',
    },
    [enums_2.Project.QuickSwap]: {
        [enums_1.ChainId.POLYGON]: '0xA42d55074869491D60Ac05490376B74cF19B00e6',
    },
    [enums_2.Project.Zyberswap]: {
        [enums_1.ChainId.ARBITRUM]: '0x4a74b6CEc31A51a48A74106118c6c920Bc8d5f31',
    },
    [enums_2.Project.Thena]: {
        [enums_1.ChainId.BNB]: '0xF75c017E3b023a593505e281b565ED35Cc120efa',
    },
    [enums_2.Project.Retro]: {
        [enums_1.ChainId.POLYGON]: '0xDC8eE75f52FABF057ae43Bb4B85C55315b57186c',
    },
    [enums_2.Project.Ascent]: {
        [enums_1.ChainId.POLYGON]: '0xf79412d10d986f841B53e1170e0c158a97BdBD1A',
    },
    [enums_2.Project.Ramses]: {
        [enums_1.ChainId.ARBITRUM]: '0x564F9D9DF1D8bAA1a8202a38eF0a18600B127b7E',
    },
    [enums_2.Project.Camelot]: {
        [enums_1.ChainId.ARBITRUM]: '0x1F1Ca4e8236CD13032653391dB7e9544a6ad123E',
    },
    [enums_2.Project.Lynex]: {
        [enums_1.ChainId.LINEA]: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621',
    },
    [enums_2.Project.SynthSwap]: {
        [enums_1.ChainId.BASE]: '0x38f61169D8bcc08cE303401A13332259F557B35f',
    },
    [enums_2.Project.BaseX]: {
        [enums_1.ChainId.BASE]: '0x77a9BB1de36f0c431aaD0b1D63496F6D94256e7c',
    },
    [enums_2.Project.SwapBased]: {
        [enums_1.ChainId.BASE]: '0x1825c76cED3c1625250B8af6204Bf4fc4e5b9FCF',
    },
};
