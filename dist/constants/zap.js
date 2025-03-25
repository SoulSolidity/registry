"use strict";
/**
 * This file is the main entry point for zap data.
 *
 * The actual zap data is organized in smaller, more manageable files in the
 * src/zap-data directory. This approach makes the codebase more maintainable
 * while still producing the exact same output JSON during the build process.
 *
 * To add new entries:
 * 1. Add entries to or create a new file in src/zap-data/chains/[chain]
 * 2. If needed, create a new template in src/zap-data/templates/
 * 3. Update src/zap-data/index.ts to import and process the new entries
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file simply imports from our modular zap-data structure
const zap_data_1 = __importDefault(require("../zap-data"));
exports.default = zap_data_1.default;
