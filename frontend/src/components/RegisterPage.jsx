import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    // Mock registration – just log in
    try {
      login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-purple-200/60 text-sm mt-1">Join Omniscient Lens</p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-3 text-white" placeholder="Alex Sterling" required />
            </div>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-3 text-white" required />
            </div>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-3 text-white" required />
            </div>
            <p className="text-white/30 text-xs mt-1">Minimum 4 characters</p>
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition">Register</button>
        </form>
        <p className="text-center text-white/40 text-sm mt-6">Already have an account? <Link to="/login" className="text-purple-300">Sign in</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;