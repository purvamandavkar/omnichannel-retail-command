import React, { useState } from 'react';
import { TrendingUp, Calendar, Tag, Package, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PredictiveForecasting = ({ data, onWhatIfChange }) => {
  if (!data) return <div className="glass-card p-8 text-center text-white/60">Loading forecasts...</div>;

  const { nextMonthSalesPrediction, predictionLowerBound, predictionUpperBound, promotionLiftEstimate, recommendedReorderSkus, whatIfDiscountImpact } = data;
  const [discountSlider, setDiscountSlider] = useState(whatIfDiscountImpact || 0);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setDiscountSlider(val);
    if (onWhatIfChange) onWhatIfChange(val);
  };

  const chartData = [
    { month: 'APR', actual: 620, predicted: null, lower: null, upper: null },
    { month: 'MAY', actual: 650, predicted: null, lower: null, upper: null },
    { month: 'JUN', actual: 700, predicted: null, lower: null, upper: null },
    { month: 'JUL', actual: null, predicted: nextMonthSalesPrediction, lower: predictionLowerBound, upper: predictionUpperBound }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex justify-between"><p className="text-white/50 text-xs">NEXT MONTH SALES PREDICTION</p><TrendingUp className="w-4 h-4 text-purple-400" /></div>
          <p className="text-2xl font-bold text-white mt-2">${nextMonthSalesPrediction}k</p>
          <p className="text-white/40 text-xs">Confidence interval: ${predictionLowerBound}k – ${predictionUpperBound}k</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex justify-between"><p className="text-white/50 text-xs">PROMOTION LIFT ESTIMATE</p><Tag className="w-4 h-4 text-blue-400" /></div>
          <p className="text-2xl font-bold text-white mt-2">+{promotionLiftEstimate}%</p>
          <p className="text-white/40 text-xs">Expected increase with 10% discount</p>
        </div>
        <div className="glass-card p-4 col-span-2">
          <div className="flex justify-between"><p className="text-white/50 text-xs">WHAT‑IF DISCOUNT SIMULATOR</p><Calendar className="w-4 h-4 text-emerald-400" /></div>
          <input type="range" min="0" max="30" value={discountSlider} onChange={handleSliderChange} className="w-full mt-2 accent-purple-500" />
          <p className="text-white text-sm mt-1">Discount: {discountSlider}% → Projected lift: +{(promotionLiftEstimate * (discountSlider / 10)).toFixed(1)}%</p>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-white/80 font-semibold mb-3">Sales Forecast with Confidence Interval</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="month" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" tickFormatter={(v) => `$${v}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#000000aa', border: 'none' }} />
            <Area type="monotone" dataKey="upper" stroke="none" fill="#a855f7" fillOpacity={0.2} />
            <Area type="monotone" dataKey="lower" stroke="none" fill="#a855f7" fillOpacity={0.2} />
            <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual Sales" />
            <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-white/80 font-semibold flex items-center gap-2"><Package className="w-4 h-4" /> Reorder Recommendations</h3>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-white/20 text-white/50"><th>SKU</th><th>Product</th><th>Current Stock</th><th>Predicted Out‑of‑Stock</th><th>Action</th></tr></thead><tbody>{recommendedReorderSkus?.map(sku => (<tr key={sku.sku} className="border-b border-white/10"><td className="py-2 text-white/70">{sku.sku}</td><td className="text-white">{sku.name}</td><td>{sku.currentStock}</td><td className="text-red-300">{sku.predictedOutOfStockDays} days</td><td><button className="bg-purple-600/40 px-2 py-1 rounded text-xs">Reorder now</button></td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
};

export default PredictiveForecasting;