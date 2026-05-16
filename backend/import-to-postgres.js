import fs from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/retail_db',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function importCSV() {
    console.log('🔄 Starting PostgreSQL import...');

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

    // Clear existing data
    await pool.query('DELETE FROM sales');
    console.log('🗑️ Cleared existing data');

    let imported = 0;
    let failed = 0;

    for (const row of results) {
        try {
            await pool.query(`
        INSERT INTO sales (order_id, order_date, ship_mode, segment, region, category, product_name, sales, quantity, profit)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
                row['Order ID'] || `ORD-${Date.now()}-${imported}`,
                row['Order Date'] || new Date().toISOString().split('T')[0],
                row['Ship Mode'] || 'Standard',
                row['Segment'] || 'Consumer',
                row['Region'] || 'Unknown',
                row['Category'] || 'Other',
                row['Product Name'] || 'Unknown Product',
                parseFloat(row['Sales']) || 0,
                parseInt(row['Quantity']) || 1,
                parseFloat(row['Profit']) || 0
            ]);
            imported++;

            if (imported % 100 === 0) {
                console.log(`✅ Imported ${imported} records...`);
            }
        } catch (err) {
            failed++;
            console.error(`❌ Failed to insert row ${imported + failed}:`, err.message);
        }
    }

    console.log(`\n🎉 Import completed!`);
    console.log(`   ✅ Successfully imported: ${imported} records`);
    console.log(`   ❌ Failed: ${failed} records`);

    // Get final count
    const result = await pool.query('SELECT COUNT(*) as total FROM sales');
    console.log(`   📊 Total records in database: ${result.rows[0].total}`);

    await pool.end();
}

importCSV().catch(console.error);