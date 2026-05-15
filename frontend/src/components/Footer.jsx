// components/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Activity } from 'lucide-react';

const Footer = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const handleModuleClick = (tab) => {
    if (window.location.pathname === '/dashboard') {
      window.scrollTo(0, 0);
      window.dispatchEvent(new CustomEvent('changeTab', { detail: { tab } }));
    } else {
      navigate('/dashboard');
      sessionStorage.setItem('pendingTab', tab);
    }
  };

  return (
    <footer className={`${currentTheme.cardDark} border-t border-white/10 mt-auto`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className={`text-xl font-bold ${currentTheme.text} mb-3`}>Omniscient Lens</h3>
            <p className={`${currentTheme.textMuted} text-sm leading-relaxed`}>
              The industry-leading retail command center for predictive inventory logistics and omnichannel performance analysis.
            </p>
          </div>

          {/* Modules */}
          <div>
            <h4 className={`font-semibold ${currentTheme.text} mb-3`}>MODULES</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleModuleClick('overview')} className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Executive Overview</button></li>
              <li><button onClick={() => handleModuleClick('sales')} className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Sales Analytics</button></li>
              <li><button onClick={() => handleModuleClick('inventory')} className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Inventory Optimization</button></li>
              <li><button onClick={() => handleModuleClick('channels')} className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Channel Performance</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`font-semibold ${currentTheme.text} mb-3`}>RESOURCES</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Documentation</a></li>
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>API Reference</a></li>
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Support Center</a></li>
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>System Status</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`font-semibold ${currentTheme.text} mb-3`}>LEGAL</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Privacy Policy</a></li>
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Terms of Service</a></li>
              <li><a href="#" className={`${currentTheme.textMuted} hover:${currentTheme.text} text-sm transition`}>Security Protocols</a></li>
            </ul>
          </div>

          {/* Stats & Logs */}
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className={`text-sm font-medium ${currentTheme.text}`}>OMNICHANNEL GROWTH</span>
              </div>
              <p className={`text-2xl font-bold text-emerald-400`}>+12.4%</p>
              <p className={`text-xs ${currentTheme.textMuted}`}>Predictive Boost</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className={`text-sm font-medium ${currentTheme.text}`}>Optimization Logs</span>
              </div>
              <div className={`${currentTheme.card} p-2 rounded-lg`}>
                <p className={`text-xs ${currentTheme.textMuted} truncate`}>Inventory sync completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t border-white/10 mt-8 pt-6 text-center ${currentTheme.textMuted} text-xs`}>
          © 2024 Omniscient Lens. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;