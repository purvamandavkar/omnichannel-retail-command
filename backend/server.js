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

// Create HTTP server first
import http from 'http';
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    // Send a test message every 10 seconds
    const interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
                type: 'new_sale',
                data: {
                    product_name: ['Laptop Pro', 'Smart Watch', 'Wireless Headphones', 'Tablet Air'][Math.floor(Math.random() * 4)],
                    sales: Math.floor(100 + Math.random() * 900),
                    timestamp: new Date().toISOString()
                }
            }));
        }
    }, 10000);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('WebSocket client disconnected');
    });
});

// Use the same server instead of app.listen
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
});