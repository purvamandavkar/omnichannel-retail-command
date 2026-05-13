import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DemandForecastChart = ({ forecastData }) => {
  const chartData = forecastData.labels.map((label, idx) => ({ date: label, Historical: forecastData.historical[idx], Predictive: forecastData.predictive[idx] }));
  return (
    <div className="glass-card p-5">
      <h3 className="text-white/80 font-semibold">Demand Forecast</h3>
      <p className="text-white/40 text-xs mb-4">Predicted units vs historical baseline (90-day window)</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" /><XAxis dataKey="date" stroke="#ffffff60" /><YAxis stroke="#ffffff60" tickFormatter={(v) => `${v}k`} /><Tooltip contentStyle={{ backgroundColor: '#000000aa', border: 'none' }} /><Legend /><Line type="monotone" dataKey="Historical" stroke="#3b82f6" strokeWidth={2} /><Line type="monotone" dataKey="Predictive" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" /></LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DemandForecastChart;