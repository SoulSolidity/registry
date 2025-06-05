"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apeBondBonds = void 0;
/**
 * Manual entries for ApeBond Bonds on BNB
 */
const types_1 = require("../../../types");
/**
 * ApeBond entries on BNB
 *
 * Add or remove entries here manually
 */
exports.apeBondBonds = [
    {
        name: "ApeBond PLT Bond",
        address: "0x39d56b60964ab6f3f886968b5a6dde3e5434a873",
        type: types_1.LPType.SINGLE,
        inputToken: {
            name: "WBNB",
            address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        },
    },
    {
        name: "ApeBond SCPT Bond",
        address: "0x5aeb9f8e8b132b9b74c74f8a20a75f29e4e3ba78",
        type: types_1.LPType.SINGLE,
        inputToken: {
            name: "USDT",
            address: "0x55d398326f99059fF775485246999027B3197955",
        },
    },
    {
        name: "ApeBond GLD Bond",
        address: "0xe9f79078a97fe410945dc626c07442a016a6ba14",
        type: types_1.LPType.ICHI,
        inputTokenProject: types_1.Project.Thena,
        inputToken: {
            name: "Ichi (GLD/BNB)",
            address: "0xe4dF44742b834f738e0561D8BA6fF41aEa66EB04",
        },
    }
];
