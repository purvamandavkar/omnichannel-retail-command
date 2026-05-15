// frontend/src/components/Dashboard.jsx
// frontend/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
import Footer from './Footer';
import ExportReports from './ExportReports';
import RealTimeFeed from './RealTimeFeed';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [error, setError] = useState(false);

  const fetchDashboard = async () => {
    setError(false);
    try {
      const response = await axios.get('/api/dashboard');
      setDashboardData(response.data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
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

  // Fetch data on mount
  useEffect(() => {
    fetchDashboard();
  }, []);

  // Handle tab changes from footer (custom event + navigation state)
  useEffect(() => {
    const handleTabChange = (event) => {
      setActiveTab(event.detail.tab);
    };
    window.addEventListener('changeTab', handleTabChange);
    
    // Handle tab from navigation state (coming from homepage footer)
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      // Clear the state after using
      window.history.replaceState({}, document.title);
    }
    
    // Fallback: check sessionStorage
    const pendingTab = sessionStorage.getItem('pendingTab');
    if (pendingTab) {
      setActiveTab(pendingTab);
      sessionStorage.removeItem('pendingTab');
    }
    
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, [location]);

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center bg-gradient-to-br ${currentTheme.gradient}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center bg-gradient-to-br ${currentTheme.gradient}`}>
        <div className={`${currentTheme.card} p-8 rounded-xl text-center max-w-md`}>
          <h2 className={`text-xl font-bold ${currentTheme.text} mb-2`}>Unable to load dashboard</h2>
          <p className={`${currentTheme.textMuted} mb-4`}>Please check that the backend server is running on port 5000.</p>
          <button onClick={fetchDashboard} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  const { kpis, chartData, topChannels, inventoryAlerts, salesAnalytics, inventoryOptimization, channelPerformance, predictiveForecasting, customerInsights } = dashboardData;

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${currentTheme.gradient}`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl flex-1">
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
                  <button
                    onClick={() => { navigate('/account'); setShowUserMenu(false); }}
                    className={`w-full text-left px-4 py-2 ${currentTheme.textMuted} hover:bg-white/10 flex items-center gap-2`}
                  >
                    <User className="w-4 h-4" /> My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-300 hover:bg-white/10 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Real-time feed */}
           <RealTimeFeed />



        {/* Tabs */}
        <div className="border-b border-white/20 mb-6 overflow-x-auto">
          <div className="flex gap-2 flex-nowrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === 'overview'
                  ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500`
                  : `${currentTheme.textMuted} hover:${currentTheme.text}`
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Executive Overview
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === 'sales'
                  ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500`
                  : `${currentTheme.textMuted} hover:${currentTheme.text}`
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Sales Analytics
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === 'inventory'
                  ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500`
                  : `${currentTheme.textMuted} hover:${currentTheme.text}`
              }`}
            >
              <Package className="w-4 h-4" /> Inventory Optimization
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === 'channels'
                  ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500`
                  : `${currentTheme.textMuted} hover:${currentTheme.text}`
              }`}
            >
              <PieChart className="w-4 h-4" /> Channel Performance
            </button>
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === 'customer'
                  ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500`
                  : `${currentTheme.textMuted} hover:${currentTheme.text}`
              }`}
            >
              <Users className="w-4 h-4" /> Customer 360°
            </button>
            <button
              onClick={() => setActiveTab('forecast')}
              className={`px-6 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === 'forecast'
                  ? `bg-purple-500/30 text-purple-300 border-b-2 border-purple-500`
                  : `${currentTheme.textMuted} hover:${currentTheme.text}`
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Predictive Forecasting
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {/* Tab Content */}
<div>
  {/* Executive Overview Tab */}
  {activeTab === 'overview' && (
    <>
      <div className="flex justify-end mb-4">
        <ExportReports 
          data={kpis ? Object.entries(kpis).map(([key, value]) => ({ Metric: key, Value: value })) : []} 
          title="Executive KPIs" 
          filename="executive_kpis" 
        />
      </div>
      <ExecutiveOverview kpis={kpis} chartData={chartData} topChannels={topChannels} inventoryAlerts={inventoryAlerts} user={user} />
    </>
  )}

  {/* Sales Analytics Tab */}
  {activeTab === 'sales' && salesAnalytics && (
    <>
      <div className="flex justify-end mb-4">
        <ExportReports 
          data={salesAnalytics.topProducts || []} 
          title="Top Products" 
          filename="top_products" 
        />
      </div>
      <SalesAnalytics data={salesAnalytics} />
    </>
  )}

  {/* Inventory Optimization Tab */}
  {activeTab === 'inventory' && inventoryOptimization && (
    <>
      <div className="flex justify-end mb-4">
        <ExportReports 
          data={inventoryOptimization.quickReport || []} 
          title="Inventory Report" 
          filename="inventory_report" 
        />
      </div>
      <div className="space-y-6">
        <InventoryOptimizationPanel data={inventoryOptimization} />
        <DemandForecastChart forecastData={inventoryOptimization.demandForecast} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecommendationsList recommendations={inventoryOptimization.recommendations} />
          <InventoryQuickReportTable quickReport={inventoryOptimization.quickReport} />
        </div>
      </div>
    </>
  )}

  {/* Channel Performance Tab */}
  {activeTab === 'channels' && channelPerformance && (
    <>
      <div className="flex justify-end mb-4">
        <ExportReports 
          data={channelPerformance.comparativePerformance || []} 
          title="Channel Performance" 
          filename="channel_performance" 
        />
      </div>
      <ChannelPerformance data={channelPerformance} />
    </>
  )}

  {/* Customer 360° Tab */}
  {activeTab === 'customer' && customerInsights && (
    <>
      <div className="flex justify-end mb-4">
        <ExportReports 
          data={customerInsights.customerSegments || []} 
          title="Customer Segments" 
          filename="customer_segments" 
        />
      </div>
      <CustomerInsights data={customerInsights} />
    </>
  )}

  {/* Predictive Forecasting Tab */}
  {activeTab === 'forecast' && predictiveForecasting && (
    <>
      <div className="flex justify-end mb-4">
        <ExportReports 
          data={predictiveForecasting.recommendedReorderSkus || []} 
          title="Forecast Recommendations" 
          filename="forecast_recommendations" 
        />
      </div>
      <PredictiveForecasting data={predictiveForecasting} />
    </>
  )}
</div>
      </div>

      {/* Footer - outside the container but inside the flex column */}
      <Footer />
    </div>
  );
};

export default Dashboard;