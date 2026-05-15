import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

let db = null;

export async function openDB() {
  if (db) return db;
  
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true });
  }
  
  db = await open({
    filename: './data/retail.db',
    driver: sqlite3.Database
  });
  
  await db.exec(`
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
  
  console.log('✅ SQLite database connected');
  return db;
}

export async function query(sql, params = []) {
  const database = await openDB();
  return await database.all(sql, params);
}

export async function run(sql, params = []) {
  const database = await openDB();
  return await database.run(sql, params);
}

export async function getRealTimeSales() {
  return await query(`
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

export async function getTopProducts(limit = 5) {
  return await query(`
    SELECT product_name, SUM(sales) as revenue, SUM(quantity) as units
    FROM sales
    GROUP BY product_name
    ORDER BY revenue DESC
    LIMIT ?
  `, [limit]);
}

export async function getChannelPerformance() {
  return await query(`
    SELECT ship_mode, SUM(sales) as revenue, COUNT(*) as orders
    FROM sales
    GROUP BY ship_mode
  `);
}

export async function getInventoryAlerts() {
  return await query(`
    SELECT product_name, SUM(quantity) as total_qty
    FROM sales
    GROUP BY product_name
    HAVING total_qty < 10
    ORDER BY total_qty ASC
    LIMIT 5
  `);
}

export async function insertSale(saleData) {
  const orderId = `ORD-${Date.now()}`;
  return await run(`
    INSERT INTO sales (order_id, order_date, ship_mode, segment, region, category, product_name, sales, quantity, profit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    orderId, saleData.order_date, saleData.ship_mode, saleData.segment,
    saleData.region, saleData.category, saleData.product_name,
    saleData.sales, saleData.quantity, saleData.profit || 0
  ]);
}