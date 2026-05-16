import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import { getDashboardData, randomizeDashboard } from './dataManager.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('✅ WebSocket client connected');
    clients.add(ws);

    // Send welcome message
    ws.send(JSON.stringify({
        type: 'connected',
        message: 'Connected to live sales feed',
        timestamp: new Date().toISOString()
    }));

    ws.on('close', () => {
        console.log('❌ WebSocket client disconnected');
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// Function to broadcast live sales to all connected clients
function broadcastLiveSale(saleData) {
    const message = JSON.stringify({
        type: 'new_sale',
        data: saleData,
        timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
}

// Simulate live sales every 10 seconds (only if there are connected clients)
setInterval(() => {
    if (clients.size > 0) {
        const products = ['Laptop Pro', 'Smart Watch X', 'Wireless Headphones Pro', 'Tablet Air', 'Smartphone Ultra', 'Gaming Mouse'];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const randomAmount = Math.floor(50 + Math.random() * 950);

        const saleData = {
            id: Date.now(),
            product_name: randomProduct,
            sales: randomAmount,
            quantity: Math.floor(1 + Math.random() * 3),
            timestamp: new Date().toISOString()
        };

        broadcastLiveSale(saleData);
        console.log(`📡 Live sale broadcast: ${randomProduct} - $${randomAmount}`);
    }
}, 10000);

// Dashboard endpoints
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

// API endpoint to manually trigger a live sale
app.post('/api/live-sale', (req, res) => {
    const { product_name, sales, quantity } = req.body;
    const saleData = {
        id: Date.now(),
        product_name: product_name || 'Manual Sale',
        sales: sales || Math.floor(100 + Math.random() * 900),
        quantity: quantity || 1,
        timestamp: new Date().toISOString()
    };
    broadcastLiveSale(saleData);
    res.json({ message: 'Live sale broadcasted', data: saleData });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), websocket: clients.size });
});

// WebSocket info endpoint
app.get('/api/ws-info', (req, res) => {
    res.json({
        connectedClients: clients.size,
        websocketUrl: `wss://${req.get('host')}`,
        status: 'active'
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket server running on ws://localhost:${PORT}`);
    console.log(`📡 Waiting for WebSocket connections...`);
});
import {
    initDatabase,
    getRealTimeSales,
    getTopProducts,
    getInventoryAlerts,
    getTotalSales,
    getOrderCount
} from './db-postgres.js';

// Initialize database on startup

// Initialize database (don't let it crash the server)
try {
    await initDatabase();
} catch (err) {
    console.error('⚠️ Database initialization failed, continuing with limited functionality:', err.message);
}
// Database statistics endpoint
app.get('/api/db/stats', async(req, res) => {
    try {
        const totalSales = await getTotalSales();
        const orderCount = await getOrderCount();
        res.json({ totalSales, orderCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

Real - time sales data
app.get('/api/db/sales', async(req, res) => {
    try {
        const data = await getRealTimeSales();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Top products
app.get('/api/db/top-products', async(req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const data = await getTopProducts(limit);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Inventory alerts
app.get('/api/db/alerts', async(req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 10;
        const data = await getInventoryAlerts(threshold);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});