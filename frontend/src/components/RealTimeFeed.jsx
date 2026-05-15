import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Zap } from 'lucide-react';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

const RealTimeFeed = () => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socket = null;
    let reconnectTimeout = null;

    const connect = () => {
      socket = new WebSocket(WS_URL);
      
      socket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages(prev => [data, ...prev].slice(0, 10));
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };
      
      socket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        // Try to reconnect after 5 seconds
        reconnectTimeout = setTimeout(connect, 5000);
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connect();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className={`${currentTheme.card} p-3 rounded-lg mb-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Zap className={`w-3 h-3 ${isConnected ? 'text-green-400' : 'text-red-400'}`} />
        <span className={`text-xs font-medium ${currentTheme.text}`}>Live Feed</span>
        <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          {isConnected ? '● Connected' : '● Disconnected'}
        </span>
      </div>
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-xs ${currentTheme.textMuted} border-b border-white/10 pb-1`}>
            {msg.type === 'new_sale' && (
              <span>🛒 {msg.data.product_name}: ${msg.data.sales}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeFeed;