import React from 'react';
import { Users, Repeat, AlertTriangle, Clock, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, suffix, subtitle, icon, color }) => (
  <div className="glass-card p-4">
    <div className="flex justify-between"><p className="text-white/50 text-xs">{title}</p><div className={`text-${color}-400`}>{icon}</div></div>
    <div className="mt-2"><span className="text-2xl font-bold text-white">{value}</span>{suffix && <span className="text-white/40 text-xs ml-1">{suffix}</span>}{subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}</div>
  </div>
);

const CustomerInsights = ({ data }) => {
  if (!data) return <div className="glass-card p-8 text-center text-white/60">Loading customer insights...</div>;
  
  const { customerLtv, repeatPurchaseRate, churnRisk, customerSegments, avgDaysBetweenPurchases, atRiskCustomers } = data;
  const pieData = customerSegments?.map(s => ({ name: s.name, value: s.percentage })) || [];
  const COLORS = ['#a855f7', '#3b82f6', '#f97316', '#ef4444', '#10b981'];

  const riskColor = churnRisk === 'Low' ? 'text-emerald-400' : churnRisk === 'Medium' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="CUSTOMER LIFETIME VALUE" value={`$${customerLtv?.toLocaleString()}`} icon={<DollarSign className="w-4 h-4" />} color="purple" />
        <StatCard title="REPEAT PURCHASE RATE" value={repeatPurchaseRate} suffix="%" icon={<Repeat className="w-4 h-4" />} color="blue" />
        <StatCard title="CHURN RISK" value={churnRisk} icon={<AlertTriangle className="w-4 h-4" />} color={churnRisk === 'Low' ? 'emerald' : churnRisk === 'Medium' ? 'yellow' : 'red'} />
        <StatCard title="AVG DAYS BETWEEN PURCHASES" value={avgDaysBetweenPurchases} suffix="days" icon={<Clock className="w-4 h-4" />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold flex items-center gap-2"><PieChartIcon className="w-4 h-4" /> Customer Segments</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} >{pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
          <div className="mt-2 text-white/40 text-xs text-center">CLV by segment: {customerSegments?.map(s => `${s.name}: $${s.clv.toLocaleString()}`).join(' • ')}</div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-white/80 font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" /> At‑Risk Customers</h3>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-white/20 text-white/50"><th className="text-left">Customer</th><th>Last Purchase</th><th>Total Spent</th><th>Risk</th></tr></thead><tbody>{atRiskCustomers?.map(c => (<tr key={c.id} className="border-b border-white/10"><td className="py-2 text-white">{c.name}<p className="text-white/30 text-[10px]">{c.id}</p></td><td className="text-white/70">{c.lastPurchase}</td><td className="text-emerald-300">${c.totalSpent.toLocaleString()}</td><td><span className="text-red-300 text-xs">High</span></td></tr>))}</tbody></table></div>
          <button className="mt-3 text-purple-300 text-xs">View all at-risk →</button>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-white/80 font-semibold mb-3">CLV by Segment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customerSegments}><CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" /><XAxis dataKey="name" stroke="#ffffff60" /><YAxis stroke="#ffffff60" tickFormatter={(v) => `$${v}`} /><Tooltip /><Bar dataKey="clv" fill="#a855f7" /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerInsights;