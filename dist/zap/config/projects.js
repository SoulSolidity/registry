"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AERODROME_CONFIG = exports.NILE_CONFIG = exports.SYNTHSWAP_CONFIG = exports.RAMSES_CONFIG = exports.RETRO_CONFIG = exports.ZYBERSWAP_CONFIG = exports.CAMELOT_CONFIG = exports.QUICKSWAP_CONFIG = exports.THENA_CONFIG = exports.GOO_MONEY_CONFIG = exports.APEBOND_CONFIG = exports.PANCAKESWAP_CONFIG = exports.LYNEX_CONFIG = exports.SUSHISWAP_CONFIG = exports.UNISWAP_CONFIG = void 0;
/**
 * Project configurations
 */
const types_1 = require("../types");
const enums_1 = require("../../types/enums");
exports.UNISWAP_CONFIG = {
    [enums_1.ChainId.ETH]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
        uniV2Config: {
            factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            routerAddress: '',
        },
        ichiConfig: {
            factoryAddress: '0x5a40DFaF8C1115196A1CDF529F97122030F26112',
            depositGuard: {
                address: '0x3E1aFdB89B6Ea49e828C565ab6A36a485b7A4775',
                version: 2,
            },
            vaultDeployerAddress: '0xfF7B5E167c9877f2b9f65D19d9c8c9aa651Fe19F',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.BNB]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
        ichiConfig: {
            factoryAddress: '0x065356d9f628cDd1bb9F2384E2972CdAC50f51b7',
            depositGuard: {
                address: '0xa9b751f37857790D0412c81B072DB57CCc0aF545',
                version: 2,
            },
            vaultDeployerAddress: '0x05cC3CA6E768a68A7f86b09e3ceE754437bd5f12',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.POLYGON]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
        ichiConfig: {
            factoryAddress: '0x2d2c72C4dC71AA32D64e5142e336741131A73fc0',
            depositGuard: {
                address: '0x64E44525a98bC85aC097Cc6Ca4c8F6BE7D483041',
                version: 2,
            },
            vaultDeployerAddress: '0x0768A75F616B98ee0937673bD83B7aBF142236Ea',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.ARBITRUM]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
        ichiConfig: {
            factoryAddress: '0xfBf38920cCbCFF7268Ad714ae5F9Fad6dF607065',
            depositGuard: {
                address: '0xFB5263779D551d0f8a85D47a7D576C4893686D12',
                version: 2,
            },
            vaultDeployerAddress: '0x508C3daa571854247726ba26949f182086Ff89B0',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.BASE]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
        uniV2Config: {
            factoryAddress: '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6',
            routerAddress: '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24',
        },
        ichiConfig: {
            factoryAddress: '0xaBe5B5AC472Ead17B4B4CaC7fAF42430748ab3b3',
            depositGuard: {
                address: '0xe2381b5AFae99B899596Bc550184a080dAa31F26',
                version: 2,
            },
            vaultDeployerAddress: '0x7d11De61c219b70428Bb3199F0DD88bA9E76bfEE',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.AVAX]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
    },
    [enums_1.ChainId.BLAST]: {
        project: types_1.Project.Uniswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Uniswap.jpg',
        ichiConfig: {
            factoryAddress: '0x9FAb4bdD4E05f5C023CCC85D2071b49791D7418F',
            depositGuard: {
                address: '0xb62399d23d1c81f08eA445A42d7F15cC12090A71',
                version: 2,
            },
            vaultDeployerAddress: '0xaD7cf2b8ce5eB8b75dA393fc164C4F4502761379',
            isAlgebra: false,
        }
    },
};
exports.SUSHISWAP_CONFIG = {
    [enums_1.ChainId.ETH]: {
        project: types_1.Project.SushiSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/SushiSwap.jpg?raw=true',
        uniV2Config: {
            factoryAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
            routerAddress: '',
        },
        ichiConfig: {
            factoryAddress: '0x5a40DFaF8C1115196A1CDF529F97122030F26112',
            depositGuard: {
                address: '0x3E1aFdB89B6Ea49e828C565ab6A36a485b7A4775',
                version: 2,
            },
            vaultDeployerAddress: '0xfF7B5E167c9877f2b9f65D19d9c8c9aa651Fe19F',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.ARBITRUM]: {
        project: types_1.Project.SushiSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/SushiSwap.jpg?raw=true',
        ichiConfig: {
            factoryAddress: '0xbA4c7b5eFD44Aa60da0440D0427555bdBE50e6BC',
            depositGuard: {
                address: '0xB77463Eba7f1bD5F37FCA35fdF9306B09bAa7379',
                version: 1,
            },
            vaultDeployerAddress: '0x508C3daa571854247726ba26949f182086Ff89B0',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.POLYGON]: {
        project: types_1.Project.SushiSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/SushiSwap.jpg?raw=true',
    },
};
exports.LYNEX_CONFIG = {
    [enums_1.ChainId.LINEA]: {
        project: types_1.Project.Lynex,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg',
        solidlyConfig: {
            factoryAddress: '0xBc7695Fd00E3b32D08124b7a4287493aEE99f9ee', //'0x9dE10C26e2AF1BC10B9132326237Ae5d93617AB0',
            routerAddress: '0x610D2f07b7EdC67565160F587F37636194C34E74',
        },
        gammaConfig: {
            uniProxyAddress: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621',
        },
        ichiConfig: {
            factoryAddress: '0x0248b992ac2a75294b05286E9DD3A2bD3C9CFE4B',
            depositGuard: {
                address: '0x57C9d919AEA56171506cfb62B60ce76be0A079DF',
                version: 2,
            },
            vaultDeployerAddress: '0x75178e0a2829B73E3AE4C21eE64F4B684085392a',
            isAlgebra: true,
        }
    },
};
exports.PANCAKESWAP_CONFIG = {
    [enums_1.ChainId.BNB]: {
        project: types_1.Project.PancakeSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg?raw=true',
        uniV2Config: {
            factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
            routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        },
        gammaConfig: {
            uniProxyAddress: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f',
        },
        ichiConfig: {
            factoryAddress: '0x131c03ca881B7cC66d7a5120A9273ebf675C241D',
            depositGuard: {
                address: '0x454130394B8013D4a7288fe9Db570A0a24C606c2',
                version: 1,
            },
            vaultDeployerAddress: '0x05cC3CA6E768a68A7f86b09e3ceE754437bd5f12',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.ETH]: {
        project: types_1.Project.PancakeSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg?raw=true',
        uniV2Config: {
            factoryAddress: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
            routerAddress: '',
        },
        ichiConfig: {
            factoryAddress: '0x8Dd50926e12BD71904bCCc6D86DFA55D42715094',
            depositGuard: {
                address: '0x81B2F475e1ca7AB6b2720AdFa2fA6D4c52C4F49d',
                version: 1,
            },
            vaultDeployerAddress: '0xfF7B5E167c9877f2b9f65D19d9c8c9aa651Fe19F',
            isAlgebra: false,
        }
    },
    [enums_1.ChainId.ARBITRUM]: {
        project: types_1.Project.PancakeSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/PancakeSwap%20V2.jpg?raw=true',
    },
};
exports.APEBOND_CONFIG = {
    [enums_1.ChainId.BNB]: {
        project: types_1.Project.ApeBond,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/ApeSwap%20V2.jpg',
        uniV2Config: {
            factoryAddress: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
            routerAddress: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
        },
    },
    [enums_1.ChainId.LINEA]: {
        project: types_1.Project.ApeBond,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/ApeSwap%20V2.jpg',
    },
    [enums_1.ChainId.BASE]: {
        project: types_1.Project.ApeBond,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/ApeSwap%20V2.jpg',
    },
};
exports.GOO_MONEY_CONFIG = {
    [enums_1.ChainId.BASE]: {
        project: types_1.Project.GooMoney,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/GooMoney.jpg',
    },
};
exports.THENA_CONFIG = {
    [enums_1.ChainId.BNB]: {
        project: types_1.Project.Thena,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Thena.jpg',
        ichiConfig: {
            factoryAddress: '0xAc93148e93d1C49D89b1166BFd74942E80F5D501',
            depositGuard: {
                address: '0xd9272a45BbF488816C6A5351894bCE7b04a66eE1',
                version: 2,
            },
            vaultDeployerAddress: '0x05cC3CA6E768a68A7f86b09e3ceE754437bd5f12',
            isAlgebra: false,
        },
    },
};
exports.QUICKSWAP_CONFIG = {
    [enums_1.ChainId.POLYGON]: {
        project: types_1.Project.QuickSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/QuickSwap.jpg',
        uniV2Config: {
            factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
            routerAddress: '',
        },
        ichiConfig: {
            factoryAddress: '0x11700544C577Cb543a498B27B4F0f7018BDb6E8a',
            depositGuard: {
                address: '0xDB8E25D78483D13781622A40e69a9E39A4b590B6',
                version: 1,
            },
            vaultDeployerAddress: '0x0768A75F616B98ee0937673bD83B7aBF142236Ea',
            isAlgebra: true,
        }
    },
};
exports.CAMELOT_CONFIG = {
    [enums_1.ChainId.ARBITRUM]: {
        project: types_1.Project.Camelot,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Camelot.jpg',
        uniV2Config: {
            factoryAddress: '0x6EcCab422D763aC031210895C81787E87B43A652',
            routerAddress: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
        },
    },
};
exports.ZYBERSWAP_CONFIG = {
    [enums_1.ChainId.ARBITRUM]: {
        project: types_1.Project.Zyberswap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Zyberswap.jpg',
        ichiConfig: {
            factoryAddress: '0x9C2ABD632771b433E5E7507BcaA41cA3b25D8544',
            depositGuard: {
                address: '0xFB5263779D551d0f8a85D47a7D576C4893686D12',
                version: 2,
            },
            vaultDeployerAddress: '0x508C3daa571854247726ba26949f182086Ff89B0',
            isAlgebra: true,
        }
    },
};
exports.RETRO_CONFIG = {
    [enums_1.ChainId.POLYGON]: {
        project: types_1.Project.Retro,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Retro.jpg',
        ichiConfig: {
            factoryAddress: '0xb2f44D8545315cDd0bAaB4AC7233218b932a5dA7',
            depositGuard: {
                address: '0x9B3Ea1A39576925fA94c4BCC7eECFA0d95D331E1',
                version: 1,
            },
            vaultDeployerAddress: '0x0768A75F616B98ee0937673bD83B7aBF142236Ea',
            isAlgebra: false,
        }
    },
};
exports.RAMSES_CONFIG = {
    [enums_1.ChainId.ARBITRUM]: {
        project: types_1.Project.Ramses,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Ramses.jpg',
        ichiConfig: {
            factoryAddress: '0xedAc86bc526557c422AB1F6BF848bF0da9fB44A6',
            depositGuard: {
                address: '0x2472cA62c19ab99AB9947A7754fc38945b68Fb68',
                version: 1,
            },
            vaultDeployerAddress: '0x508C3daa571854247726ba26949f182086Ff89B0',
            isAlgebra: false,
        }
    },
};
exports.SYNTHSWAP_CONFIG = {
    [enums_1.ChainId.BASE]: {
        project: types_1.Project.SynthSwap,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/SynthSwap.jpg',
        uniV2Config: {
            factoryAddress: '0x4bd16d59A5E1E0DB903F724aa9d721a31d7D720D',
            routerAddress: '',
        },
        ichiConfig: {
            factoryAddress: '0xa37359E63D1aa44C0ACb2a4605D3B45785C97eE3',
            depositGuard: {
                address: '0x01EEbBA41FA1c5c8655fDe507a816F7DF76702b2',
                version: 2,
            },
            vaultDeployerAddress: '0x7d11De61c219b70428Bb3199F0DD88bA9E76bfEE',
            isAlgebra: true,
        }
    },
};
exports.NILE_CONFIG = {
    [enums_1.ChainId.LINEA]: {
        project: types_1.Project.Nile,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Nile.jpg',
        solidlyConfig: {
            factoryAddress: '0xAAA16c016BF556fcD620328f0759252E29b1AB57',
            routerAddress: '',
        },
    },
};
exports.AERODROME_CONFIG = {
    [enums_1.ChainId.BASE]: {
        project: types_1.Project.Aerodrome,
        logoURI: 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/Aerodrome.jpg',
        solidlyConfig: {
            factoryAddress: '0x420DD381b31aEf6683db6B902084cB0FFECe40Da',
            routerAddress: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
        },
    },
};
