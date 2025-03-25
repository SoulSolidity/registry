import * as fs from 'fs';
import * as path from 'path';

// Create lib and data directories if they don't exist
if (!fs.existsSync('lib')) {
    fs.mkdirSync('lib');
}
if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

// Function to process a TypeScript file
async function processFile(filePath: string) {
    try {
        // Import the TypeScript file
        const imported = await import(path.resolve(filePath));
        const data = imported.default || imported;

        // Create the corresponding JSON file path in data directory
        const relativePath = path.relative('src', filePath);
        const jsonPath = path.join('data', relativePath.replace(/\.ts$/, '.json'));

        // Ensure the directory exists
        const dir = path.dirname(jsonPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the JSON file
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
        console.log(`Converted ${filePath} to ${jsonPath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Function to recursively find all TypeScript files
function findTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...findTypeScriptFiles(fullPath));
        } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts') && 
                  !entry.name.endsWith('consolidate.ts')) { // Skip our consolidation script
            files.push(fullPath);
        }
    }

    return files;
}

// Main function
async function main() {
    try {
        const files = findTypeScriptFiles('src');
        await Promise.all(files.map(processFile));
        
        // Run the consolidation script to create the all LPs file
        console.log('Creating consolidated LP data file...');
        await import('./consolidate');
        
        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

main(); 