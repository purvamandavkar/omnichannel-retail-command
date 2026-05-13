import React from 'react';
import { AlertCircle, Clock, Package, CheckCircle } from 'lucide-react';

const urgencyIcon = (urgency) => {
  if (urgency.includes("CRITICAL")) return <AlertCircle className="w-4 h-4 text-red-400" />;
  if (urgency.includes("DAYS")) return <Clock className="w-4 h-4 text-orange-400" />;
  if (urgency.includes("REORDER")) return <Package className="w-4 h-4 text-yellow-400" />;
  return <CheckCircle className="w-4 h-4 text-green-400" />;
};

const RecommendationsList = ({ recommendations }) => (
  <div className="glass-card p-5">
    <h3 className="text-white/80 font-semibold mb-3">Recommendations</h3>
    <div className="space-y-3">{recommendations.map(rec => (<div key={rec.id} className="flex justify-between items-center border-b border-white/10 pb-2"><div className="flex items-center gap-3">{urgencyIcon(rec.urgency)}<div><p className="text-white text-sm">{rec.product}</p><p className="text-white/40 text-[10px]">{rec.action || "Review stock"}</p></div></div><div className={`text-xs font-bold px-2 py-1 rounded-full ${rec.urgency.includes("CRITICAL") ? "bg-red-500/20 text-red-300" : rec.urgency.includes("DAYS") ? "bg-orange-500/20 text-orange-300" : rec.urgency.includes("REORDER") ? "bg-yellow-500/20 text-yellow-300" : "bg-green-500/20 text-green-300"}`}>{rec.urgency}</div></div>))}</div>
  </div>
);
export default RecommendationsList;