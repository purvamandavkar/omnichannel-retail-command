import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Users, BarChart3, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StatCard = ({ title, value, change, suffix, icon }) => (
  <div className="glass-card p-4">
    <div className="flex justify-between"><p className="text-white/50 text-xs">{title}</p><div className="text-purple-300">{icon}</div></div>
    <div className="mt-2"><span className="text-2xl font-bold text-white">{value}</span>{suffix && <span className="text-white/40 text-xs ml-1">{suffix}</span>}
      {change !== undefined && <p className={`text-xs mt-1 flex items-center gap-1 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{change >= 0 ? '+' : ''}{change}%</p>}
    </div>
  </div>
);

const ChannelPerformance = ({ data }) => {
  const { omniChannelGrowth, omniChannelGrowthChange, totalConvRate, totalConvRateChange, avgCac, avgCacChange, activeChannels, channelHealthIndex, comparativePerformance, customerAcquisitionCost, recentActivities, channelDrilldown } = data;
  const radarData = [
    { metric: 'Velocity', OwnedWeb: channelHealthIndex.ownedWeb.velocity, Marketplaces: channelHealthIndex.marketplaces.velocity },
    { metric: 'Retention', OwnedWeb: channelHealthIndex.ownedWeb.retention, Marketplaces: channelHealthIndex.marketplaces.retention },
    { metric: 'Growth', OwnedWeb: channelHealthIndex.ownedWeb.growth, Marketplaces: channelHealthIndex.marketplaces.growth },
    { metric: 'Margin', OwnedWeb: channelHealthIndex.ownedWeb.margin, Marketplaces: channelHealthIndex.marketplaces.margin },
    { metric: 'Reach', OwnedWeb: channelHealthIndex.ownedWeb.reach, Marketplaces: channelHealthIndex.marketplaces.reach }
  ];
  const cacData = Object.entries(customerAcquisitionCost).map(([key, value]) => ({ name: key.replace(/([A-Z])/g, ' $1').trim(), cost: value }));
  const compData = comparativePerformance.map(c => ({ name: c.channel, 'Conv. Rate': c.conversionRate, AOV: c.aov }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="OMNI CHANNEL GROWTH" value={`${omniChannelGrowth}%`} change={omniChannelGrowthChange} icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="TOTAL CONV. RATE" value={totalConvRate} suffix="%" change={totalConvRateChange} icon={<Percent className="w-4 h-4" />} />
        <StatCard title="AVG. CAC" value={`$${avgCac.toFixed(2)}`} change={avgCacChange} icon={<DollarSign className="w-4 h-4" />} />
        <StatCard title="ACTIVE CHANNELS" value={activeChannels} suffix="— Stable" icon={<Activity className="w-4 h-4" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold mb-2">Channel Health Index</h3>
          <p className="text-white/40 text-xs mb-4">Composite scoring across 5 key performance metrics</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}><PolarGrid stroke="#ffffff30" /><PolarAngleAxis dataKey="metric" stroke="#ffffff80" /><PolarRadiusAxis stroke="#ffffff80" domain={[0,100]} /><Radar name="Owned Web" dataKey="OwnedWeb" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} /><Radar name="Marketplaces" dataKey="Marketplaces" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} /><Legend /></RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold mb-2">Comparative Performance</h3>
          <p className="text-white/40 text-xs mb-4">Conversion rates vs Average Order Value</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={compData}><CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" /><XAxis dataKey="name" stroke="#ffffff60" tick={{ fontSize: 10 }} /><YAxis yAxisId="left" stroke="#a855f7" /><YAxis yAxisId="right" orientation="right" stroke="#3b82f6" /><Tooltip /><Legend /><Bar yAxisId="left" dataKey="Conv. Rate" fill="#a855f7" name="Conv. Rate %" /><Bar yAxisId="right" dataKey="AOV" fill="#3b82f6" name="AOV ($)" /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Customer Acquisition Cost (CAC) Efficiency</h3>
          <ResponsiveContainer width="100%" height={200}><BarChart data={cacData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" stroke="#ffffff60" /><YAxis type="category" dataKey="name" stroke="#ffffff60" /><Tooltip /><Bar dataKey="cost" fill="#f97316" /></BarChart></ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Channel Activities</h3>
          <div className="space-y-2">{recentActivities.map((act, i) => (<div key={i} className="border-b border-white/10 pb-2"><p className="text-white text-sm">{act.text}</p><p className="text-white/30 text-[10px]">{act.time} • {act.type}</p></div>))}</div>
        </div>
      </div>
      <div className="glass-card p-5">
        <h3 className="text-white/80 font-semibold mb-3">Channel Drill-down</h3>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-white/20 text-white/50"><th>CHANNEL NAME</th><th>REVENUE SHARE</th><th>REFUND RATE</th><th>CUSTOMER LTV</th><th>STATUS</th></tr></thead><tbody>{channelDrilldown.map((ch, i) => (<tr key={i} className="border-b border-white/10"><td className="py-2 text-white">{ch.name}</td><td>{ch.revenueShare}%</td><td>{ch.refundRate}%</td><td className="text-emerald-300">${ch.customerLtv.toLocaleString()}</td><td><span className={`text-xs px-2 py-0.5 rounded-full ${ch.status === 'OPTIMAL' ? 'bg-green-500/20 text-green-300' : ch.status === 'STEADY' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{ch.status}</span></td></tr>))}</tbody></table></div>
        <div className="mt-3 text-center text-purple-300 text-sm">Show All 12 Channels →</div>
      </div>
    </div>
  );
};
export default ChannelPerformance;