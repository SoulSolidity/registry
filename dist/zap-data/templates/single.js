"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApeBondZapInfo = createApeBondZapInfo;
exports.createApeBondZapInfoMap = createApeBondZapInfoMap;
const enums_1 = require("../../types/enums");
const constants_1 = require("../types/constants");
const enums_2 = require("../types/enums");
/**
 * Factory function for ApeBond ZapInfo
 * @param name Bond name
 * @param address Bond address
 * @param toToken Destination token address
 * @returns ZapInfo object
 */
function createApeBondZapInfo(name, address, toToken) {
    return {
        name,
        icon: constants_1.ProjectIcon[enums_2.Project.ApeBond],
        lpData: {
            lpType: enums_1.ZapLPType.Single,
            toToken
        },
        protocolData: {
            protocol: enums_1.ZapProtocols.ApeBond,
            bond: address
        }
    };
}
/**
 * Transforms an array of ApeBond entries into a Record of ZapInfo objects
 * @param entries Array of ApeBond entries
 * @returns Record of ZapInfo objects keyed by address
 */
function createApeBondZapInfoMap(entries) {
    const result = {};
    for (const entry of entries) {
        result[entry.address] = createApeBondZapInfo(entry.name, entry.address, entry.toToken);
    }
    return result;
}
