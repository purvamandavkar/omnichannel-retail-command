import { useEffect, useState, useRef } from 'react';

export const useWebSocket = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    // Get WebSocket URL from environment variable or use default

    const WS_URL =
        import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
    useEffect(() => {
        const connectWebSocket = () => {
            try {
                console.log('🔌 Connecting to WebSocket:', WS_URL);
                socketRef.current = new WebSocket(WS_URL);

                socketRef.current.onopen = () => {
                    console.log('✅ WebSocket connected');
                    setIsConnected(true);
                    setConnectionStatus('connected');
                };

                socketRef.current.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log('📨 WebSocket message received:', data.type);

                        if (data.type === 'new_sale') {
                            setMessages(prev => [data, ...prev].slice(0, 20));
                        } else if (data.type === 'connected') {
                            console.log('Welcome message:', data.message);
                        }
                    } catch (err) {
                        console.error('Failed to parse WebSocket message:', err);
                    }
                };

                socketRef.current.onclose = (event) => {
                    console.log('❌ WebSocket disconnected:', event.code, event.reason);
                    setIsConnected(false);
                    setConnectionStatus('disconnected');

                    // Attempt to reconnect after 5 seconds
                    if (reconnectTimeoutRef.current) {
                        clearTimeout(reconnectTimeoutRef.current);
                    }
                    reconnectTimeoutRef.current = setTimeout(() => {
                        console.log('🔄 Attempting to reconnect WebSocket...');
                        connectWebSocket();
                    }, 5000);
                };

                socketRef.current.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    setConnectionStatus('error');
                };
            } catch (err) {
                console.error('Failed to create WebSocket connection:', err);
                setConnectionStatus('error');
            }
        };

        connectWebSocket();

        // Cleanup on unmount
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [WS_URL]);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
            return true;
        }
        return false;
    };

    return {
        messages,
        isConnected,
        connectionStatus,
        sendMessage
    };
};