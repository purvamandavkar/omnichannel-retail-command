import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user (mock persistence)
    const storedUser = localStorage.getItem('omniuser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock validation – accept any email with password length >= 4
    if (!email || !password || password.length < 4) {
      throw new Error('Invalid email or password (min 4 chars)');
    }
    const userData = {
      name: email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${email[0]}`,
      memberSince: '2024-01-15',
      orders: [
        { id: 'ORD-1001', date: '2025-03-15', total: 284.50, status: 'Delivered' },
        { id: 'ORD-1002', date: '2025-04-02', total: 124.99, status: 'Shipped' },
        { id: 'ORD-1003', date: '2025-04-20', total: 89.99, status: 'Processing' }
      ]
    };
    setUser(userData);
    localStorage.setItem('omniuser', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('omniuser');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('omniuser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};