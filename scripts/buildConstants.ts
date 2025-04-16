import * as fs from 'fs';
import * as path from 'path';
import priceSources from '../src/constants/price-api/price-sources';
import dex from '../src/constants/price-api/dexes';
import defaultZapInputTokens from '../src/constants/zap/zap-input-tokens';
import priceChainsImages from '../src/constants/website/price-chains-images';
import pricePlaygroundTokens from '../src/constants/website/price-playground-tokens';
import ichi from '../src/constants/ichi';

const CONSTANTS_DIR = path.join(__dirname, '../src/constants');
const OUTPUT_DIR = path.join(__dirname, '../data');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper function to write JSON file
const writeJsonFile = (filename: string, data: any) => {
    const filePath = path.join(OUTPUT_DIR, filename);
    // Create nested directories if they don't exist
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Generated ${filename}`);
};

// Convert and write each constant file
writeJsonFile('price-api/price-sources.json', priceSources);
writeJsonFile('price-api/dexes.json', dex);
writeJsonFile('zap/zap-input-tokens.json', defaultZapInputTokens);
writeJsonFile('website/price-chains-images.json', priceChainsImages);
writeJsonFile('website/price-playground-tokens.json', pricePlaygroundTokens);
// writeJsonFile('ichi.json', ichi);

console.log('All constants have been converted to JSON successfully!'); 