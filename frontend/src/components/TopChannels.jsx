// frontend/src/components/TopChannels.jsx
import React from 'react';
import { Store, Building2, Smartphone } from 'lucide-react';

const iconMap = {
  "E-Commerce Store": <Store className="w-5 h-5 text-purple-300" />,
  "Flagship NY": <Building2 className="w-5 h-5 text-blue-300" />,
  "Marketplace App": <Smartphone className="w-5 h-5 text-emerald-300" />
};

const TopChannels = ({ channels, totalSales }) => {
  return (
    <div className="space-y-4">
      {channels.map((channel, idx) => (
        <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0">
          <div className="flex items-center gap-3">
            {iconMap[channel.name] || <Store className="w-5 h-5 text-white/40" />}
            <div>
              <p className="text-white font-medium">{channel.name}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wide">{channel.type}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">${channel.revenue.toFixed(2)}M</p>
            <p className="text-white/30 text-[10px]">{((channel.revenue / totalSales) * 100).toFixed(1)}% of total</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopChannels;