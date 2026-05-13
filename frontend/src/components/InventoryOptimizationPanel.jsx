import React from 'react';
import { PackageX, DollarSign, CalendarDays, Truck, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, suffix, subtitle, icon }) => (
  <div className="glass-card p-4">
    <div className="flex justify-between"><p className="text-white/50 text-xs">{title}</p><div className="text-purple-300">{icon}</div></div>
    <div className="mt-2"><span className="text-2xl font-bold text-white">{value}</span>{suffix && <span className="text-white/40 text-xs ml-1">{suffix}</span>}{subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}</div>
  </div>
);

const InventoryOptimizationPanel = ({ data }) => {
  const { outOfStockItems, overstockValue, avgDaysToSell, fulfillmentRate, overstockPercent, overstockTarget, optimalRange } = data;
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2"><TrendingDown className="w-5 h-5 text-purple-400" />Inventory Optimization</h2>
      <p className="text-white/40 text-xs -mt-3">Predictive logistics and stock health across 12 distribution centers.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="OUT OF STOCK ITEMS" value={outOfStockItems} subtitle="8% vs last week" icon={<PackageX className="w-4 h-4" />} />
        <StatCard title="OVERSTOCK VALUE" value={`$${overstockValue}M`} subtitle={`${overstockPercent}% of inventory · ${overstockTarget}% reduction target`} icon={<DollarSign className="w-4 h-4" />} />
        <StatCard title="AVG DAYS TO SELL" value={avgDaysToSell} suffix="days" subtitle="Stable performance" icon={<CalendarDays className="w-4 h-4" />} />
        <StatCard title="FULFILLMENT RATE" value={fulfillmentRate} suffix="%" subtitle={`Optimal range: ${optimalRange.min}% - ${optimalRange.max}%`} icon={<Truck className="w-4 h-4" />} />
      </div>
    </div>
  );
};
export default InventoryOptimizationPanel;