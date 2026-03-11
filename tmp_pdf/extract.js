const fs = require('fs');
const pdf = require('pdf-parse');

const files = [
    'c:/Users/santh/Downloads/client.pdf',
    'c:/Users/santh/Downloads/client 1.pdf'
];

async function extractText() {
    console.log('PDF Module Type:', typeof pdf);
    console.log('PDF Module Content:', pdf);
    
    for (const file of files) {
        console.log(`\n--- START_FILE: ${file} ---`);
        try {
            const dataBuffer = fs.readFileSync(file);
            // If pdf is an object with a default property (common in some build systems)
            const parse = typeof pdf === 'function' ? pdf : pdf.default;
            if (typeof parse !== 'function') {
                throw new Error('pdf-parse is not a function');
            }
            const data = await parse(dataBuffer);
            console.log('TEXT:', data.text.substring(0, 1000)); // Print first 1000 chars
        } catch (error) {
            console.error(`Error reading ${file}:`, error.message);
        }
        console.log(`--- END_FILE: ${file} ---`);
    }
}

extractText();
