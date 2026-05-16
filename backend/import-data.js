import fs from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';
const { Pool } = pkg;

// Use your Render PostgreSQL credentials directly
const pool = new Pool({
    host: 'dpg-d842f557vvec73esd14g-a.oregon-postgres.render.com',
    port: 5432,
    database: 'retail_db_28pv',
    user: 'retail_user',
    password: 'FXvUoRsH931g59IMybjBZZUhFYeH0w4W', // <--- REPLACE WITH YOUR ACTUAL PASSWORD
    ssl: { rejectUnauthorized: false }
});

async function importCSV() {
    console.log('🔄 Starting import...');

    const results = [];
    const filePath = './data/retail_sales.csv';

    if (!fs.existsSync(filePath)) {
        console.error('❌ CSV not found:', filePath);
        process.exit(1);
    }

    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`📊 Read ${results.length} rows`);

    // Clear existing data
    await pool.query('DELETE FROM sales');
    console.log('🗑️ Cleared old data');

    let imported = 0;

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
                row['Product Name'] || 'Unknown',
                parseFloat(row['Sales']) || 0,
                parseInt(row['Quantity']) || 1,
                parseFloat(row['Profit']) || 0
            ]);
            imported++;

            if (imported % 10 === 0) {
                console.log(`✅ Imported ${imported} records...`);
            }
        } catch (err) {
            console.error(`❌ Failed:`, err.message);
        }
    }

    console.log(`\n🎉 Import completed! ${imported} records inserted.`);

    const result = await pool.query('SELECT COUNT(*) as total FROM sales');
    console.log(`📊 Total records in database: ${result.rows[0].total}`);

    await pool.end();
}

importCSV().catch(console.error);