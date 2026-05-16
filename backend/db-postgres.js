import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);


// Use Render's connection string or local
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Keep this for now
    connectionTimeoutMillis: 10000,
});

// Test connection
pool.on('connect', () => {
    console.log('✅ PostgreSQL connected successfully');
});

pool.on('error', (err) => {
    console.error('❌ PostgreSQL error:', err);
});

// Initialize tables
export async function initDatabase() {
    const client = await pool.connect();
    try {
        // Create sales table
        await client.query(`
      CREATE TABLE IF NOT EXISTS sales (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50),
        order_date DATE,
        ship_mode VARCHAR(50),
        segment VARCHAR(50),
        region VARCHAR(50),
        category VARCHAR(50),
        product_name TEXT,
        sales DECIMAL(10,2),
        quantity INTEGER,
        profit DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create products table
        await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) UNIQUE,
        category VARCHAR(100),
        current_stock INTEGER DEFAULT 0,
        reorder_level INTEGER DEFAULT 10,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create users table (for roles)
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create alerts table
        await client.query(`
      CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255),
        alert_type VARCHAR(50),
        message TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('✅ Database tables initialized');
    } catch (err) {
        console.error('Database init error:', err);
    } finally {
        client.release();
    }
}

// Query helper
export async function query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
}

// Get real-time sales
export async function getRealTimeSales() {
    const result = await query(`
    SELECT 
      TO_CHAR(order_date, 'Mon') as month,
      SUM(sales) as total_sales,
      COUNT(*) as order_count
    FROM sales
    WHERE order_date >= NOW() - INTERVAL '12 months'
    GROUP BY month
    ORDER BY MIN(EXTRACT(MONTH FROM order_date))
  `);
    return result.rows;
}

// Get top products by revenue
export async function getTopProducts(limit = 5) {
    const result = await query(`
    SELECT product_name, SUM(sales) as revenue, SUM(quantity) as units
    FROM sales
    GROUP BY product_name
    ORDER BY revenue DESC
    LIMIT $1
  `, [limit]);
    return result.rows;
}

// Get inventory alerts (low stock)
export async function getInventoryAlerts(threshold = 10) {
    const result = await query(`
    SELECT product_name, SUM(quantity) as total_qty
    FROM sales
    GROUP BY product_name
    HAVING SUM(quantity) < $1
    ORDER BY total_qty ASC
    LIMIT 5
  `, [threshold]);
    return result.rows;
}

// Insert a new sale
export async function insertSale(saleData) {
    const orderId = `ORD-${Date.now()}`;
    const result = await query(`
    INSERT INTO sales (order_id, order_date, ship_mode, segment, region, category, product_name, sales, quantity, profit)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id
  `, [
        orderId, saleData.order_date, saleData.ship_mode, saleData.segment,
        saleData.region, saleData.category, saleData.product_name,
        saleData.sales, saleData.quantity, saleData.profit || 0
    ]);
    return result.rows[0];
}

// Get total sales
export async function getTotalSales() {
    const result = await query('SELECT COALESCE(SUM(sales), 0) as total FROM sales');
    return parseFloat(result.rows[0].total);
}

// Get order count
export async function getOrderCount() {
    const result = await query('SELECT COUNT(*) as count FROM sales');
    return parseInt(result.rows[0].count);
}

// Import CSV data into PostgreSQL
export async function importCSVToPostgres(csvData) {
    let imported = 0;
    for (const row of csvData) {
        try {
            await query(`
        INSERT INTO sales (order_id, order_date, ship_mode, segment, region, category, product_name, sales, quantity, profit)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
            imported++;
        } catch (err) {
            console.error('Failed to insert row:', err.message);
        }
    }
    console.log(`✅ Imported ${imported} records to PostgreSQL`);
    return imported;
}

export default { query, initDatabase, getRealTimeSales, getTopProducts, getInventoryAlerts, insertSale, getTotalSales, getOrderCount, importCSVToPostgres };