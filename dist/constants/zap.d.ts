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
import zapData from '../zap-data';
export default zapData;
