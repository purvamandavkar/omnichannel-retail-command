import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Percent, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatCard = ({ title, value, change, suffix, icon }) => (
  <div className="glass-card p-4">
    <div className="flex justify-between items-start"><p className="text-white/50 text-xs">{title}</p><div className="text-purple-300">{icon}</div></div>
    <div className="mt-2"><span className="text-2xl font-bold text-white">{value}</span>{suffix && <span className="text-white/40 text-xs ml-1">{suffix}</span>}
      {change !== undefined && <p className={`text-xs mt-1 flex items-center gap-1 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{change >= 0 ? '+' : ''}{change}%</p>}
    </div>
  </div>
);

const SalesAnalytics = ({ data }) => {
  // Provide fallback defaults in case data is incomplete
  if (!data) return <div className="glass-card p-8 text-center text-white/60">No sales data available.</div>;

  const {
    grossRevenue = 0,
    grossRevenueGrowth = 0,
    avgOrderValue = 0,
    avgOrderValueChange = 0,
    conversionRate = 0,
    conversionRateChange = 0,
    omnichannelMetric = 0,
    categorySales = { labels: [], series: { Apparel: [], Electronics: [], Home: [] } },
    channelSplit = { onlineMarketplace: 50, physicalRetail: 50 },
    keyInsight = "",
    regionalData = { northAmerica: 0, europe: 0, asiaPacific: 0 },
    topProducts = []
  } = data;

  const lineChartData = (categorySales.labels || []).map((label, idx) => ({
    week: label,
    Apparel: categorySales.series?.Apparel?.[idx] || 0,
    Electronics: categorySales.series?.Electronics?.[idx] || 0,
    Home: categorySales.series?.Home?.[idx] || 0
  }));

  const pieData = [{ name: 'Online Marketplace', value: channelSplit.onlineMarketplace }, { name: 'Physical Retail', value: channelSplit.physicalRetail }];
  const COLORS = ['#a855f7', '#3b82f6'];
  const regions = [
    { name: 'NORTH AM.', value: regionalData.northAmerica, suffix: 'M' },
    { name: 'EUROPE', value: regionalData.europe, suffix: 'k' },
    { name: 'ASIA PAC.', value: regionalData.asiaPacific, suffix: 'k' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="GROSS REVENUE" value={`$${(grossRevenue / 1000).toFixed(0)}k`} change={grossRevenueGrowth} icon={<DollarSign className="w-4 h-4" />} />
        <StatCard title="AVG. ORDER VALUE" value={`$${avgOrderValue.toFixed(2)}`} change={avgOrderValueChange} icon={<ShoppingBag className="w-4 h-4" />} />
        <StatCard title="CONVERSION RATE" value={conversionRate} suffix="%" change={conversionRateChange} icon={<Percent className="w-4 h-4" />} />
        <StatCard title="OMN" value={omnichannelMetric} icon={<Globe className="w-4 h-4" />} />
      </div>
      <div className="glass-card p-5">
        <h3 className="text-white/80 font-semibold">Sales Performance by Category</h3>
        <p className="text-white/40 text-xs mb-4">Real-time volume tracking across core departments</p>
        {lineChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="week" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#000000aa', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="Apparel" stroke="#f97316" />
              <Line type="monotone" dataKey="Electronics" stroke="#a855f7" />
              <Line type="monotone" dataKey="Home" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        ) : <div className="text-white/60 text-center py-8">Category data not available</div>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold mb-3">Channel Split</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}><Cell fill={COLORS[0]} /><Cell fill={COLORS[1]} /></Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center"><p className="text-emerald-300 font-semibold">KEY INSIGHT</p><p className="text-xs text-white/60">{keyInsight || "No insight available"}</p></div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold flex items-center gap-2"><Globe className="w-4 h-4" /> Regional Performance</h3>
          <div className="space-y-3 mt-2">{regions.map(r => (<div key={r.name} className="flex justify-between border-b border-white/10 pb-2"><span className="text-white">{r.name}</span><span className="text-purple-300 font-bold">${r.value.toLocaleString()}{r.suffix}</span></div>))}</div>
          <div className="mt-4 pt-2 text-white/40 text-xs text-center">Alex Sterling • Retail Director</div>
        </div>
      </div>
      <div className="glass-card p-5">
        <h3 className="text-white/80 font-semibold mb-3">Top Selling Products</h3>
        {topProducts.length > 0 ? (
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-white/20 text-white/50"><th className="pb-2">PRODUCT DETAILS</th><th>CATEGORY</th><th>UNITS SOLD</th><th>REVENUE</th><th>STATUS</th></tr></thead><tbody>{topProducts.map((p,i) => (<tr key={i} className="border-b border-white/10"><td className="py-2"><div><p className="text-white">{p.name}</p><p className="text-white/40 text-[10px]">ID: {p.id}</p></div></td><td className="text-white/70">{p.category}</td><td className="text-white">{p.unitsSold?.toLocaleString()}</td><td className="text-emerald-300">${(p.revenue / 1000).toFixed(0)}k</td><td><span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Best Seller' ? 'bg-yellow-500/20 text-yellow-300' : p.status === 'Trending' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>{p.status}</span></td></tr>))}</tbody></table></div>
        ) : <div className="text-white/60 text-center py-4">No product data available</div>}
      </div>
    </div>
  );
};

export default SalesAnalytics;