import * as fs from 'fs';
import * as path from 'path';
import * as priceSources from '../src/constants/priceSources';
import * as dex from '../src/constants/dex';
import * as zap from '../src/constants/zap';
import * as defaultZapInputTokens from '../src/constants/defaultZapInputTokens';
import * as constants from '../src/constants/constants';
import * as ichi from '../src/constants/ichi';

const CONSTANTS_DIR = path.join(__dirname, '../src/constants');
const OUTPUT_DIR = path.join(__dirname, '../data');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper function to write JSON file
const writeJsonFile = (filename: string, data: any) => {
    const filePath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Generated ${filename}`);
};

// Convert and write each constant file
writeJsonFile('priceSources.json', priceSources);
writeJsonFile('dex.json', dex);
writeJsonFile('zap.json', zap);
writeJsonFile('defaultZapInputTokens.json', defaultZapInputTokens);
writeJsonFile('constants.json', constants);
writeJsonFile('ichi.json', ichi);

console.log('All constants have been converted to JSON successfully!'); 