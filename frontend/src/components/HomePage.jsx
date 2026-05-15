// frontend/src/components/HomePage.jsx
import React from 'react';
import { ArrowRight, Play, TrendingUp, Package, Brain, Globe, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import Footer from './Footer';

const HomePage = () => {
  const { user, logout } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleDemo = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        {/* Header with Theme Switcher */}
        <div className="flex justify-between items-center mb-20">
          <div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent`}>
              Omniscient Lens
            </h1>
            <p className={`${currentTheme.textMuted} text-sm`}>SETLUX, COMMAND</p>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`${currentTheme.textMuted} hover:${currentTheme.text} transition`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/account')}
                  className={`${currentTheme.textMuted} hover:${currentTheme.text} transition`}
                >
                  Account
                </button>
                <button
                  onClick={logout}
                  className={`${currentTheme.card} px-4 py-2 text-sm font-medium ${currentTheme.text} hover:bg-white/20 transition rounded-lg`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className={`${currentTheme.textMuted} hover:${currentTheme.text} transition`}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className={`${currentTheme.textMuted} hover:${currentTheme.text} transition`}
                >
                  Register
                </button>
                <button
                  onClick={handleGetStarted}
                  className={`${currentTheme.card} px-4 py-2 text-sm font-medium ${currentTheme.text} hover:bg-white/20 transition rounded-lg`}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4`}>
            Command Your Commerce
          </h2>
          <p className={`text-xl ${currentTheme.textMuted} mb-8`}>
            Experience total visibility. Omniscient Lens orchestrates your entire retail ecosystem through a singular, high-fidelity editorial interface.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleGetStarted}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDemo}
              className={`${currentTheme.card} px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${currentTheme.text}`}
            >
              View Platform Demo <Play className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-24 text-center">
          <div className={`${currentTheme.card} p-4`}>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>$42.8M</p>
            <p className={currentTheme.textMuted}>+12.4k</p>
          </div>
          <div className={`${currentTheme.card} p-4`}>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>84.2%</p>
            <p className={currentTheme.textMuted}>Retention</p>
          </div>
          <div className={`${currentTheme.card} p-4`}>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>98.1%</p>
            <p className={currentTheme.textMuted}>Uptime</p>
          </div>
        </div>

        {/* Quick Report */}
        <div className={`${currentTheme.cardDark} p-6 max-w-md mx-auto mb-24 text-center rounded-xl`}>
          <p className={`${currentTheme.textMuted} text-xs uppercase tracking-wider`}>Quick Report</p>
          <p className={`${currentTheme.text} text-lg font-semibold mt-1`}>Executive User</p>
          <p className="text-purple-300 text-sm">Brand Director</p>
        </div>

        {/* Feature: Omnichannel Intelligence */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3`}>Omnichannel Intelligence</h3>
            <p className={currentTheme.textMuted}>
              Unify physical stores, e-commerce, and social marketplaces into a singular stream of truth. No silos, just absolute clarity.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="text-purple-300 hover:text-purple-200 flex items-center gap-1">
                Dynamic Inventory <ArrowRight className="w-3 h-3" />
              </button>
              <button className="text-purple-300 hover:text-purple-200 flex items-center gap-1">
                Unified Cart <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className={`${currentTheme.card} p-8 text-center`}>
            <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className={currentTheme.text}>Real-time sync across 12+ channels</p>
          </div>
        </div>

        {/* Feature: Inventory Synergy */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1 ${currentTheme.card} p-8 text-center">
            <Package className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-400">+34%</p>
            <p className={currentTheme.textMuted}>Efficiency Gain</p>
          </div>
          <div className="order-1 md:order-2">
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3`}>Inventory Synergy</h3>
            <p className={currentTheme.textMuted}>
              Algorithmic balancing across nodes. Reduce carrying costs by 22% with AI-driven redistribution.
            </p>
          </div>
        </div>

        {/* Feature: Predictive Growth */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3`}>Predictive Growth</h3>
            <p className={currentTheme.textMuted}>
              Anticipate market shifts 14 days before they happen. Our neural engine maps consumer sentiment to SKU performance.
            </p>
            <button className="mt-4 text-purple-300 hover:text-purple-200 flex items-center gap-1">
              Explore Network <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className={`${currentTheme.card} p-8 text-center`}>
            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className={currentTheme.text}>14‑day predictive window</p>
          </div>
        </div>

        {/* Feature: Global Scaling */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1 ${currentTheme.card} p-8 text-center">
            <Globe className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className={currentTheme.text}>Deploy in hours, not months</p>
          </div>
          <div className="order-1 md:order-2">
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-3`}>Global Scaling</h3>
            <p className={currentTheme.textMuted}>
              Deploy infrastructure in new territories within hours. Localization, compliance, and logistics managed by a single interface.
            </p>
            <button className="mt-4 text-purple-300 hover:text-purple-200 flex items-center gap-1">
              Explore Network <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Testimonial */}
        <div className={`max-w-3xl mx-auto ${currentTheme.card} p-8 mb-24 rounded-xl`}>
          <Quote className="w-8 h-8 text-purple-400 mb-4" />
          <p className={`text-lg italic ${currentTheme.text}`}>
            "Omniscient Lens didn't just give us data; it gave us a decision-making superpower. It's the difference between reacting to the market and defining it."
          </p>
          <div className="mt-4">
            <p className={`font-semibold ${currentTheme.text}`}>David Sterling</p>
            <p className="text-purple-300 text-sm">CHIEF DIGITAL OFFICER, GLOBAL GOODS</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center ${currentTheme.card} p-12 rounded-xl`}>
          <h2 className={`text-3xl font-bold ${currentTheme.text} mb-3`}>Ready to transcend?</h2>
          <p className={`${currentTheme.textMuted} mb-6`}>
            Join the world's most sophisticated retail organizations in the Omniscient ecosystem.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleGetStarted}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Schedule Executive Briefing
            </button>
            <button className={`${currentTheme.card} px-6 py-3 rounded-lg font-semibold hover:bg-white/20 ${currentTheme.text}`}>
              Request Platform Deck
            </button>
          </div>
          {/*footer will go here */ }
          <Footer/>
        </div>

        
      </div>
    </div>
  );
};

export default HomePage;