"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apeBondBonds = void 0;
const types_1 = require("../../../types");
exports.apeBondBonds = [
    {
        name: "ApeBond EMT Bond",
        address: "0xf81bd0754b698cdbf248e7b4a3e60228fa0b7e93",
        type: types_1.LPType.SINGLE,
        inputToken: {
            name: "USDC",
            address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        },
    },
    {
        name: "ApeBond FULA Bond",
        address: "0x54286e6584dc01f658f4b6fdbdd5e35553c26c12",
        type: types_1.LPType.SINGLE,
        inputToken: {
            name: "WETH",
            address: "0x4200000000000000000000000000000000000006",
        },
    },
    {
        name: "ApeBond UP Bond",
        address: "0x7933424992ff4f73050ba96e3ccbfc7296853d61",
        type: types_1.LPType.ICHI,
        inputTokenProject: types_1.Project.Uniswap,
        inputToken: {
            name: "Ichi (UP/ETH)",
            address: "0xf349fa49651d5ae67771b61840c4ccc7a2565764",
        },
    },
    {
        name: "ApeBond VPT Bond",
        address: "0xea62f76edc1da14bc473b8f0fe1416a7f1e47fcf",
        type: types_1.LPType.SINGLE,
        inputToken: {
            name: "USDT",
            address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
        },
    },
    {
        name: "ApeBond GMRT Bond",
        address: "0x313a15a47b7d9862ad5266b9ea2d5a5117014f88",
        type: types_1.LPType.SINGLE,
        inputToken: {
            name: "USDT",
            address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
        },
    },
];
