import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
const dbPath = path.join(dataDir, 'retail.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT,
    order_date TEXT,
    ship_mode TEXT,
    segment TEXT,
    region TEXT,
    category TEXT,
    product_name TEXT,
    sales REAL,
    quantity INTEGER,
    profit REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ SQLite database connected at:', dbPath);

// Helper functions
export function query(sql, params = []) {
    const stmt = db.prepare(sql);
    return stmt.all(params);
}

export function run(sql, params = []) {
    const stmt = db.prepare(sql);
    return stmt.run(params);
}

export function getRealTimeSales() {
    return query(`
    SELECT 
      strftime('%b', order_date) as month,
      SUM(sales) as total_sales,
      COUNT(*) as order_count
    FROM sales
    WHERE order_date >= date('now', '-12 months')
    GROUP BY month
    ORDER BY MIN(strftime('%m', order_date))
  `);
}

export function getTopProducts(limit = 5) {
    return query(`
    SELECT product_name, SUM(sales) as revenue, SUM(quantity) as units
    FROM sales
    GROUP BY product_name
    ORDER BY revenue DESC
    LIMIT ?
  `, [limit]);
}

export function getChannelPerformance() {
    return query(`
    SELECT ship_mode, SUM(sales) as revenue, COUNT(*) as orders
    FROM sales
    GROUP BY ship_mode
  `);
}

export function getInventoryAlerts(threshold = 10) {
    return query(`
    SELECT product_name, SUM(quantity) as total_qty
    FROM sales
    GROUP BY product_name
    HAVING total_qty < ?
    ORDER BY total_qty ASC
    LIMIT 5
  `, [threshold]);
}

export function insertSale(saleData) {
    const orderId = `ORD-${Date.now()}`;
    return run(`
    INSERT INTO sales (order_id, order_date, ship_mode, segment, region, category, product_name, sales, quantity, profit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
        orderId, saleData.order_date, saleData.ship_mode, saleData.segment,
        saleData.region, saleData.category, saleData.product_name,
        saleData.sales, saleData.quantity, saleData.profit || 0
    ]);
}

export function getTotalSales() {
    const result = query('SELECT SUM(sales) as total FROM sales');
    return result[0] ? .total || 0;
}

export function getOrderCount() {
    const result = query('SELECT COUNT(*) as count FROM sales');
    return result[0] ? .count || 0;
}

export default db;