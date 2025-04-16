import * as fs from 'fs';
import * as path from 'path';

const INPUT_BASE_DIR = path.join(__dirname, '../src/zap/auto-generated');
const OUTPUT_BASE_DIR = path.join(__dirname, '../data/zap');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_BASE_DIR)) {
    fs.mkdirSync(OUTPUT_BASE_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_BASE_DIR}`);
}

// Helper function to write JSON file
const writeJsonFile = (filename: string, data: any) => {
    const filePath = path.join(OUTPUT_BASE_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Generated ${filename}`);
};

// Recursive function to find all .json files in a directory and its subdirectories
const findJsonFiles = (dir: string, baseDir: string, fileList: { relativePath: string; absolutePath: string }[] = []) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            findJsonFiles(fullPath, baseDir, fileList);
        } else if (item.isFile() && path.extname(item.name) === '.json') { // Look for .json files
            const relativePath = path.relative(baseDir, fullPath);
            fileList.push({ relativePath, absolutePath: fullPath });
        }
    });

    return fileList;
};

// Read chain directories
const chainDirs = fs.readdirSync(INPUT_BASE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

console.log(`Found chains: ${chainDirs.join(', ')}`);

// Process each chain directory
chainDirs.forEach(chainName => {
    const chainInputDir = path.join(INPUT_BASE_DIR, chainName);
    const consolidatedData: { [key: string]: any } = {};

    try {
        const jsonFiles = findJsonFiles(chainInputDir, chainInputDir); // Find all .json files recursively

        jsonFiles.forEach(({ relativePath, absolutePath }) => {
            // No longer using relative path as the primary key for nesting
            // const key = relativePath.replace(/\.json$/, '').replace(/\\/g, '/');

            try {
                const fileContent = fs.readFileSync(absolutePath, 'utf-8');
                const jsonData = JSON.parse(fileContent);

                // Check if jsonData is an object before merging
                if (typeof jsonData === 'object' && jsonData !== null && !Array.isArray(jsonData)) {
                    // Merge properties from jsonData into consolidatedData
                    Object.assign(consolidatedData, jsonData);
                    console.log(`Processed and merged ${chainName}/${relativePath}`);
                } else {
                     console.warn(`Skipping non-object JSON content in ${absolutePath}`);
                }

            } catch (error) {
                console.error(`Error processing file ${absolutePath}:`, error);
            }
        });

        if (Object.keys(consolidatedData).length > 0) {
            writeJsonFile(`${chainName}.json`, consolidatedData);
        } else {
            console.log(`No .json files found to consolidate for chain ${chainName}.`);
        }

    } catch (error) {
        console.error(`Error processing chain directory ${chainInputDir}:`, error);
    }
});

console.log('All zap constants have been consolidated successfully!');
