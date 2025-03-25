"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIchiZapInfo = createIchiZapInfo;
exports.createIchiZapInfoMap = createIchiZapInfoMap;
const enums_1 = require("../../../types/enums");
const constants_1 = require("../../types/constants");
function createIchiZapInfo(name, vault, underlyingDex, project) {
    return {
        name,
        icon: constants_1.ProjectIcon[project],
        lpData: {
            lpType: enums_1.ZapLPType.Ichi,
            vault,
            underlyingDex
        },
    };
}
function createIchiZapInfoMap(entries, project, ichiUnderlyingDex) {
    const result = {};
    for (const entry of entries) {
        result[entry.address] = createIchiZapInfo(entry.name, entry.address, ichiUnderlyingDex, project);
    }
    return result;
}
