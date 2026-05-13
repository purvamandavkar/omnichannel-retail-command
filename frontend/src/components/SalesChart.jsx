// frontend/src/components/SalesChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-white/20 text-xs">
          <p className="text-white">{`${label}`}</p>
          <p className="text-emerald-300">Sales: ${payload[0]?.value}k</p>
          <p className="text-blue-300">Forecast: ${payload[1]?.value}k</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <XAxis dataKey="month" stroke="#ffffff60" fontSize={12} />
        <YAxis stroke="#ffffff60" fontSize={12} tickFormatter={(value) => `$${value}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Bar dataKey="sales" name="Actual Sales" fill="#a855f7" radius={[4,4,0,0]} />
        <Bar dataKey="forecast" name="Forecast" fill="#3b82f6" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;