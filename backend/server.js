import express from 'express';
import cors from 'cors';
import { getDashboardData, randomizeDashboard } from './dataManager.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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