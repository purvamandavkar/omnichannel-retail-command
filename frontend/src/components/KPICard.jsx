// frontend/src/components/KPICard.jsx
import React from 'react';

const KPICard = ({ title, value, suffix, trend, subtitle, icon }) => {
  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex justify-between items-start">
        <p className="text-white/50 text-xs font-medium tracking-wider">{title}</p>
        <div className="text-purple-300">{icon}</div>
      </div>
      <div className="mt-3">
        <div className="flex items-baseline flex-wrap gap-1">
          <span className="text-3xl font-bold text-white">{value}</span>
          {suffix && <span className="text-white/40 text-xs ml-1">{suffix}</span>}
        </div>
        {subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}
        {trend === 'up' && <div className="flex items-center mt-2 text-emerald-400 text-xs">▲ +2.4% vs last period</div>}
      </div>
    </div>
  );
};

export default KPICard;