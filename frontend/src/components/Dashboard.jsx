// frontend/src/components/Dashboard.jsx
// frontend/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { RefreshCw, LayoutDashboard, BarChart3, Package, PieChart, Users, TrendingUp, User, LogOut, ChevronDown } from 'lucide-react';
import ExecutiveOverview from './ExecutiveOverview';
import SalesAnalytics from './SalesAnalytics';
import InventoryOptimizationPanel from './InventoryOptimizationPanel';
import DemandForecastChart from './DemandForecastChart';
import RecommendationsList from './RecommendationsList';
import InventoryQuickReportTable from './InventoryQuickReportTable';
import ChannelPerformance from './ChannelPerformance';
import CustomerInsights from './CustomerInsights';
import PredictiveForecasting from './PredictiveForecasting';
import ThemeSwitcher from './ThemeSwitcher';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setDashboardData(response.data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRandomize = async () => {
    setRefreshing(true);
    try {
      const response = await axios.post('/api/randomize');
      setDashboardData(response.data.data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => { fetchDashboard(); }, []);

  if (loading) return <div className={`min-h-screen flex justify-center items-center bg-gradient-to-br ${currentTheme.gradient}`}><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div></div>;

  const { kpis, chartData, topChannels, inventoryAlerts, salesAnalytics, inventoryOptimization, channelPerformance, predictiveForecasting, customerInsights } = dashboardData;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent ${currentTheme.text}`}>
              Omniscient Lens
            </h1>
            <p className={`text-sm mt-1 ${currentTheme.textMuted}`}>RETAIL COMMAND • Real-time Omnichannel Intelligence</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-xs ${currentTheme.textMuted}`}>
              {lastUpdate && `Last sync: ${lastUpdate.toLocaleTimeString()}`}
            </div>
            <button
              onClick={handleRandomize}
              disabled={refreshing}
              className={`${currentTheme.card} px-4 py-2 flex items-center gap-2 text-sm font-medium ${currentTheme.text} hover:bg-white/20 transition-all disabled:opacity-50 rounded-xl`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Updating...' : 'Simulate Live Shift'}
            </button>
            <ThemeSwitcher />
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-2 ${currentTheme.card} px-3 py-2 rounded-lg hover:bg-white/20 transition`}
              >
                <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                <span className={`text-sm hidden sm:inline ${currentTheme.text}`}>{user.name}</span>
                <ChevronDown className={`w-4 h-4 ${currentTheme.textMuted}`} />
              </button>
              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 ${currentTheme.cardDark} py-2 rounded-lg z-20`}>
                  <button onClick={() => { navigate('/account'); setShowUserMenu(false); }} className={`w-full text-left px-4 py-2 ${currentTheme.textMuted} hover:bg-white/10 flex items-center gap-2`}>
                    <User className="w-4 h-4" /> My Account
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-300 hover:bg-white/10 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/20 mb-6 overflow-x-auto">
          <div className="flex gap-2 flex-nowrap">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap ${activeTab === 'overview' ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500` : `${currentTheme.textMuted} hover:${currentTheme.text}`}`}>
              <LayoutDashboard className="w-4 h-4" /> Executive Overview
            </button>
            <button onClick={() => setActiveTab('sales')} className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap ${activeTab === 'sales' ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500` : `${currentTheme.textMuted} hover:${currentTheme.text}`}`}>
              <BarChart3 className="w-4 h-4" /> Sales Analytics
            </button>
            <button onClick={() => setActiveTab('inventory')} className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap ${activeTab === 'inventory' ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500` : `${currentTheme.textMuted} hover:${currentTheme.text}`}`}>
              <Package className="w-4 h-4" /> Inventory Optimization
            </button>
            <button onClick={() => setActiveTab('channels')} className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap ${activeTab === 'channels' ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500` : `${currentTheme.textMuted} hover:${currentTheme.text}`}`}>
              <PieChart className="w-4 h-4" /> Channel Performance
            </button>
            <button onClick={() => setActiveTab('customer')} className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap ${activeTab === 'customer' ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500` : `${currentTheme.textMuted} hover:${currentTheme.text}`}`}>
              <Users className="w-4 h-4" /> Customer 360°
            </button>
            <button onClick={() => setActiveTab('forecast')} className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap ${activeTab === 'forecast' ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500` : `${currentTheme.textMuted} hover:${currentTheme.text}`}`}>
              <TrendingUp className="w-4 h-4" /> Predictive Forecasting
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && <ExecutiveOverview kpis={kpis} chartData={chartData} topChannels={topChannels} inventoryAlerts={inventoryAlerts} user={user} />}
          {activeTab === 'sales' && salesAnalytics && <SalesAnalytics data={salesAnalytics} />}
          {activeTab === 'inventory' && inventoryOptimization && (
            <div className="space-y-6">
              <InventoryOptimizationPanel data={inventoryOptimization} />
              <DemandForecastChart forecastData={inventoryOptimization.demandForecast} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecommendationsList recommendations={inventoryOptimization.recommendations} />
                <InventoryQuickReportTable quickReport={inventoryOptimization.quickReport} />
              </div>
            </div>
          )}
          {activeTab === 'channels' && channelPerformance && <ChannelPerformance data={channelPerformance} />}
          {activeTab === 'customer' && customerInsights && <CustomerInsights data={customerInsights} />}
          {activeTab === 'forecast' && predictiveForecasting && <PredictiveForecasting data={predictiveForecasting} />}
        </div>

        {/* Footer */}
        <div className={`mt-8 ${currentTheme.cardDark} p-4 flex justify-between items-center rounded-xl`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"><span className="text-xs font-bold text-white">AS</span></div>
            <div><p className={`text-sm font-medium ${currentTheme.text}`}>Alex Sterling</p><p className={`text-xs ${currentTheme.textMuted}`}>Chief Operations Officer</p></div>
          </div>
          <div className="text-right"><p className={`text-[10px] ${currentTheme.textMuted}`}>Real-time dynamic metrics • AI simulated shifts</p></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;