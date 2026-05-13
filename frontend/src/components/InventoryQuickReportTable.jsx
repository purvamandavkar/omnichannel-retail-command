import React from 'react';
import { TrendingUp } from 'lucide-react';

const InventoryQuickReportTable = ({ quickReport }) => (
  <div className="glass-card p-5">
    <div className="flex justify-between mb-3"><h3 className="text-white/80 font-semibold">Quick Report</h3><p className="text-white/40 text-xs">Live Inventory Performance</p></div>
    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-white/20 text-white/50"><th className="pb-2">PRODUCT DETAILS</th><th>STATUS</th><th>CURRENT</th><th>OMNICHANNEL GROWTH</th><th>Optimized Logs</th></tr></thead><tbody>{quickReport.map((item, idx) => (<tr key={idx} className="border-b border-white/10"><td className="py-2 text-white">{item.product}</td><td><span className={`text-xs px-2 py-0.5 rounded-full ${item.status.includes("CRITICAL") ? "bg-red-500/20 text-red-300" : item.status.includes("DAYS") ? "bg-orange-500/20 text-orange-300" : item.status.includes("REORDER") ? "bg-yellow-500/20 text-yellow-300" : "bg-green-500/20 text-green-300"}`}>{item.status}</span></td><td className="text-white">{item.currentStock}</td><td className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {item.growth}</td><td className="text-white/70">{item.trend}</td></tr>))}</tbody></table></div>
    <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-white/40 text-[10px]"><span>Alex Mercer • Chief Strategist</span><span>ON TRACK • 1,420 units average</span></div>
  </div>
);
export default InventoryQuickReportTable;