import fs from 'fs';
import csv from 'csv-parser';
import { run } from './db.js';

async function importCSV() {
    const results = [];
    const filePath = './data/retail_sales.csv';

    if (!fs.existsSync(filePath)) {
        console.error('CSV file not found:', filePath);
        process.exit(1);
    }

    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`Read ${results.length} rows from CSV`);

    // Clear existing data
    run('DELETE FROM sales');

    // Insert each row
    for (const row of results) {
        run(`
      INSERT INTO sales (order_id, order_date, ship_mode, segment, region, category, product_name, sales, quantity, profit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            row['Order ID'],
            row['Order Date'],
            row['Ship Mode'],
            row['Segment'],
            row['Region'],
            row['Category'],
            row['Product Name'],
            parseFloat(row['Sales']) || 0,
            parseInt(row['Quantity']) || 0,
            parseFloat(row['Profit']) || 0
        ]);
    }

    console.log(`✅ Imported ${results.length} records to database`);
}

importCSV();