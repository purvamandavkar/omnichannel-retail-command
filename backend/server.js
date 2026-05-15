import express from 'express';
import cors from 'cors';
import { getDashboardData, randomizeDashboard } from './dataManager.js';
import { openDB, getRealTimeSales, getTopProducts, getChannelPerformance, getInventoryAlerts, insertSale } from './db-sqlite.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ========== ORIGINAL DASHBOARD ENDPOINTS ==========
app.get('/api/dashboard', async(req, res) => {
    try {
        const data = await getDashboardData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/randomize', async(req, res) => {
    try {
        const newData = await randomizeDashboard();
        res.json({ message: 'ok', data: newData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ========== SQLITE ENDPOINTS ==========
app.get('/api/sqlite/test', async(req, res) => {
    try {
        const db = await openDB();
        const result = await db.get('SELECT datetime("now") as time');
        res.json({ success: true, message: 'SQLite connected!', time: result.time });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/sqlite/sales', async(req, res) => {
    try {
        const data = await getRealTimeSales();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/sqlite/top-products', async(req, res) => {
    try {
        const data = await getTopProducts();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/sqlite/channels', async(req, res) => {
    try {
        const data = await getChannelPerformance();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/sqlite/alerts', async(req, res) => {
    try {
        const data = await getInventoryAlerts();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sqlite/sale', async(req, res) => {
    try {
        await insertSale(req.body);
        res.json({ message: 'Sale added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Initialize SQLite on startup
try {
    await openDB();
    console.log('✅ SQLite database initialized');
} catch (err) {
    console.error('❌ SQLite initialization failed:', err.message);
}

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send real-time updates every 5 seconds (simulating live sales)
    const interval = setInterval(async() => {
        const newSale = {
            id: Date.now(),
            product_name: ['Laptop', 'Phone', 'Tablet', 'Headphones'][Math.floor(Math.random() * 4)],
            sales: Math.floor(100 + Math.random() * 900),
            timestamp: new Date().toISOString()
        };
        ws.send(JSON.stringify({ type: 'new_sale', data: newSale }));
    }, 5000);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');