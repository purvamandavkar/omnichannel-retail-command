// frontend/src/components/InventoryAlerts.jsx
import React from 'react';
import { AlertTriangle, PackageX } from 'lucide-react';

const InventoryAlerts = ({ alerts }) => {
  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scroll">
      {alerts.map((alert) => (
        <div key={alert.id} className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-3 flex justify-between items-start">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">{alert.product}</p>
              <p className="text-white/50 text-xs">{alert.location}</p>
              {alert.stock && <p className="text-red-300 text-xs mt-1">Stock left: {alert.stock} units</p>}
            </div>
          </div>
          <div className="bg-red-600/40 text-red-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
            {alert.urgency}
          </div>
        </div>
      ))}
      {alerts.length === 0 && (
        <div className="flex items-center gap-2 text-white/40 justify-center py-6">
          <PackageX className="w-5 h-5" /> No critical alerts at this moment
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;