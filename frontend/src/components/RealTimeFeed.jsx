import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useTheme } from '../context/ThemeContext';
import { Zap } from 'lucide-react';

const RealTimeFeed = () => {
  const { messages, isConnected } = useWebSocket();
  const { currentTheme } = useTheme();

  return (
    <div className={`${currentTheme.card} p-4 rounded-xl mb-6`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className={`w-4 h-4 ${isConnected ? 'text-green-400 animate-pulse' : 'text-red-400'}`} />
        <h3 className={`font-semibold ${currentTheme.text}`}>Live Sales Feed</h3>
        <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          {isConnected ? '● Connected' : '● Disconnected'}
        </span>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {messages.length === 0 ? (
          <p className={`text-sm ${currentTheme.textMuted}`}>Waiting for live sales...</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`border-b border-white/10 pb-2 text-sm ${currentTheme.text}`}>
              {msg.type === 'new_sale' && (
                <div className="flex justify-between">
                  <span>🛒 {msg.data.product_name}</span>
                  <span className="text-emerald-400">${msg.data.sales}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeFeed;