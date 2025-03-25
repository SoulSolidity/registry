"use strict";
/**
 * Export all manual entries
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygon = exports.linea = exports.bnb = exports.base = exports.avalanche = exports.arbitrum = void 0;
exports.getEntriesForChain = getEntriesForChain;
const common_1 = require("../types/common");
const arbitrum = __importStar(require("./arbitrum"));
exports.arbitrum = arbitrum;
const avalanche = __importStar(require("./avalanche"));
exports.avalanche = avalanche;
const base = __importStar(require("./base"));
exports.base = base;
const bnb = __importStar(require("./bnb"));
exports.bnb = bnb;
const linea = __importStar(require("./linea"));
exports.linea = linea;
const polygon = __importStar(require("./polygon"));
exports.polygon = polygon;
/**
 * Gets all manual entries for a specific chain
 * @param chainId The chain ID to get entries for
 * @returns Array of manual entries for the chain
 */
function getEntriesForChain(chainId) {
    switch (chainId) {
        case common_1.ChainId.ARBITRUM:
            return Object.values(arbitrum).flat();
        case common_1.ChainId.AVALANCHE:
            return Object.values(avalanche).flat();
        case common_1.ChainId.BASE:
            return Object.values(base).flat();
        case common_1.ChainId.BNB:
            return Object.values(bnb).flat();
        case common_1.ChainId.LINEA:
            return Object.values(linea).flat();
        case common_1.ChainId.POLYGON:
            return Object.values(polygon).flat();
        default:
            console.warn(`No entries found for chain ID: ${chainId}`);
            return [];
    }
}
