import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useTheme } from '../context/ThemeContext';
import { Zap, Wifi, WifiOff } from 'lucide-react';

const RealTimeFeed = () => {
  const { messages, isConnected, connectionStatus } = useWebSocket();
  const { currentTheme } = useTheme();

  const getStatusIcon = () => {
    if (isConnected) return <Wifi className="w-3 h-3 text-green-400" />;
    if (connectionStatus === 'connecting') return <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />;
    return <WifiOff className="w-3 h-3 text-red-400" />;
  };

  const getStatusText = () => {
    if (isConnected) return 'Live';
    if (connectionStatus === 'connecting') return 'Connecting...';
    return 'Offline';
  };

  const getStatusColor = () => {
    if (isConnected) return 'text-green-400';
    if (connectionStatus === 'connecting') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={`${currentTheme.card} p-3 rounded-lg mb-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className={`text-xs font-semibold ${currentTheme.text}`}>LIVE SALES FEED</span>
        </div>
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <span className={`text-xs ${getStatusColor()}`}>{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-1.5 max-h-40 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-4">
            <p className={`text-xs ${currentTheme.textMuted}`}>
              {isConnected ? 'Waiting for live sales...' : 'Connecting to live feed...'}
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`border-l-2 border-purple-500 pl-2 py-1 ${currentTheme.textMuted}`}>
              {msg.type === 'new_sale' && (
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-white">🛒 {msg.data.product_name}</span>
                  <span className="text-emerald-400 font-bold">${msg.data.sales}</span>
                </div>
              )}
              {msg.type === 'connected' && (
                <div className="text-green-400 text-xs">{msg.message}</div>
              )}
            </div>
          ))
        )}
      </div>
      
      {isConnected && messages.length > 0 && (
        <div className="mt-2 text-right">
          <span className={`text-[10px] ${currentTheme.textMuted}`}>
            Last update: {new Date().toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default RealTimeFeed;