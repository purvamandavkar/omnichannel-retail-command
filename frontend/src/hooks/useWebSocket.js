import { useEffect, useState } from 'react';

export const useWebSocket = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Use ws:// for local development, wss:// for production
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl =
            import.meta.env.VITE_WS_URL || `${protocol}//localhost:8080`;

        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages(prev => [data, ...prev].slice(0, 20));
            } catch (err) {
                console.error('Failed to parse WebSocket message:', err);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []);

    return { messages, isConnected };
};