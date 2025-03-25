"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGammaUniProxy = getGammaUniProxy;
exports.createGammaZapInfo = createGammaZapInfo;
exports.createGammaZapInfoMap = createGammaZapInfoMap;
const enums_1 = require("../../../types/enums");
const constants_1 = require("../../types/constants");
const types_1 = require("./types");
// Utility function to get Gamma uniProxy addresses
function getGammaUniProxy(project, chainId) {
    const uniProxy = types_1.gammaUniProxy[project]?.[chainId] ?? '0x0000000000000000000000000000000000000000';
    if (uniProxy === '0x0000000000000000000000000000000000000000') {
        console.warn(`No uniProxy found for project ${project} on chain ${chainId}`);
    }
    return uniProxy;
}
function createGammaZapInfo(name, hypervisor, project, chainId) {
    return {
        name,
        icon: constants_1.ProjectIcon[project],
        lpData: {
            lpType: enums_1.ZapLPType.Gamma,
            hypervisor,
            uniProxy: getGammaUniProxy(project, chainId)
        },
    };
}
function createGammaZapInfoMap(entries, project, chainId) {
    const result = {};
    for (const entry of entries) {
        result[entry.address] = createGammaZapInfo(entry.name, entry.address, project, chainId);
    }
    return result;
}
