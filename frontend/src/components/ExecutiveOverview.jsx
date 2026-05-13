import React from 'react';
import { TrendingUp, Award, Zap, Package, DollarSign } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import KPICard from './KPICard';
import SalesChart from './SalesChart';
import TopChannels from './TopChannels';
import InventoryAlerts from './InventoryAlerts';

const ExecutiveOverview = ({ kpis, chartData, topChannels, inventoryAlerts, user }) => {
  const { currentTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Executive Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <KPICard 
          title="OMNICHANNEL GROWTH" 
          value={`${kpis.omnichannelGrowth}%`} 
          trend="up" 
          subtitle="vs last quarter"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard 
          title="NET PROMOTER SCORE" 
          value={kpis.npsScore} 
          suffix="EXCELLENT"
          subtitle="Customer advocacy"
          icon={<Award className="w-5 h-5" />}
        />
        <KPICard 
          title="ACTIVE PROMOTIONS" 
          value={kpis.activePromotions} 
          subtitle={`${kpis.endingSoonPromotions} Ending Soon`}
          icon={<Zap className="w-5 h-5" />}
        />
      </div>

      {/* Financial & Inventory Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className={`${currentTheme.card} p-5 col-span-1`}>
          <h3 className={`${currentTheme.textMuted} text-xs font-semibold uppercase tracking-wider`}>Financial Pulse</h3>
          <div className="mt-3 space-y-3">
            <div>
              <p className={`${currentTheme.textMuted} text-sm`}>TOTAL SALES</p>
              <p className={`text-3xl font-bold ${currentTheme.text}`}>${kpis.totalSales.toFixed(2)}M</p>
            </div>
            <div>
              <p className={`${currentTheme.textMuted} text-sm`}>NET PROFIT</p>
              <p className="text-2xl font-semibold text-emerald-300">${kpis.netProfit.toFixed(2)}M</p>
            </div>
            <div>
              <p className={`${currentTheme.textMuted} text-sm`}>INVENTORY TURNOVER</p>
              <p className={`text-2xl font-semibold ${currentTheme.text}`}>{kpis.inventoryTurnover}x</p>
            </div>
            <div>
              <p className={`${currentTheme.textMuted} text-sm`}>CUSTOMER SATISFACTION</p>
              <p className={`text-2xl font-semibold ${currentTheme.text}`}>{kpis.customerSatisfaction}/5 ★★★★☆</p>
            </div>
          </div>
        </div>
        
        <div className={`${currentTheme.card} p-5 md:col-span-2`}>
          <div className="flex justify-between items-start">
            <h3 className={`${currentTheme.text} font-semibold`}>Sales vs Forecast</h3>
            <p className={`text-[10px] ${currentTheme.textMuted}`}>Aggregated across all digital and physical channels</p>
          </div>
          <SalesChart data={chartData} />
        </div>
      </div>

      {/* Top Channels + Critical Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${currentTheme.card} p-5 lg:col-span-1`}>
          <h3 className={`${currentTheme.text} font-semibold mb-3 flex items-center gap-2`}>
            <Package className="w-4 h-4" /> Top Channels
          </h3>
          <TopChannels channels={topChannels} totalSales={kpis.totalSales} />
        </div>
        <div className={`${currentTheme.card} p-5 lg:col-span-2`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className={`${currentTheme.text} font-semibold`}>Critical Inventory Alerts</h3>
            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">ACTION REQUIRED</span>
          </div>
          <InventoryAlerts alerts={inventoryAlerts} />
        </div>
      </div>

      {/* Quick Report Footer */}
      <div className={`${currentTheme.cardDark} p-4 flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          <div>
            <p className={`text-sm font-medium ${currentTheme.text}`}>{user?.name || 'Alex Sterling'}</p>
            <p className={`text-xs ${currentTheme.textMuted}`}>Chief Operations Officer</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-[10px] ${currentTheme.textMuted}`}>Real-time dynamic metrics • AI simulated shifts</p>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;