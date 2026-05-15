import fs from 'fs';
import csv from 'csv-parser';
import { openDB, importCSVToSQLite } from './db-sqlite.js';

async function importData() {
    console.log('🔄 Reading CSV file...');

    const results = [];
    const filePath = './data/retail_sales.csv';

    if (!fs.existsSync(filePath)) {
        console.error('❌ CSV file not found:', filePath);
        console.log('Please place your retail_sales.csv in the backend/data/ folder');
        process.exit(1);
    }

    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`📊 Read ${results.length} rows from CSV`);

    await openDB();
    const count = await importCSVToSQLite(results);

    console.log(`🎉 Successfully imported ${count} records to SQLite!`);
    process.exit(0);
}

importData();