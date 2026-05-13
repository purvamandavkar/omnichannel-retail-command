import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, ShoppingBag, Settings, LogOut, Edit2 } from 'lucide-react';

const AccountPage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdateName = () => {
    if (editName.trim()) {
      updateProfile({ name: editName });
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">My Account</h1>
          <button onClick={() => navigate('/dashboard')} className="glass-card px-4 py-2 text-sm text-white hover:bg-white/20">← Back to Dashboard</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="glass-card p-6">
            <div className="flex flex-col items-center text-center">
              <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mb-3" />
              {isEditing ? (
                <div className="flex gap-2 mt-2">
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm" />
                  <button onClick={handleUpdateName} className="bg-purple-600 px-3 py-1 rounded text-xs">Save</button>
                  <button onClick={() => setIsEditing(false)} className="bg-white/10 px-3 py-1 rounded text-xs">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                  <button onClick={() => setIsEditing(true)} className="text-white/40 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                </div>
              )}
              <div className="flex items-center gap-1 text-white/60 text-sm mt-1"><Mail className="w-3 h-3" /> {user.email}</div>
              <div className="flex items-center gap-1 text-white/60 text-sm mt-1"><Calendar className="w-3 h-3" /> Member since {user.memberSince}</div>
              <button onClick={logout} className="mt-4 flex items-center gap-2 text-red-300 hover:text-red-200 text-sm"><LogOut className="w-4 h-4" /> Sign Out</button>
            </div>
          </div>

          {/* Order History */}
          <div className="md:col-span-2 glass-card p-6">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><ShoppingBag className="w-4 h-4" /> Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/20 text-white/50"><th className="text-left pb-2">Order ID</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                  {user.orders.map(order => (
                    <tr key={order.id} className="border-b border-white/10">
                      <td className="py-2 text-white">{order.id}</td>
                      <td className="text-white/70">{order.date}</td>
                      <td className="text-emerald-300">${order.total.toFixed(2)}</td>
                      <td><span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-300' : order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Settings Placeholder */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-3"><Settings className="w-4 h-4" /> Preferences</h3>
            <p className="text-white/60 text-sm">Notification settings, theme, and API keys can be configured here.</p>
            <button className="mt-3 text-purple-300 text-sm">Manage Settings →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;