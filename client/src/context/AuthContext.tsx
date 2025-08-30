
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar: string;
  address: string;
  latitude?: number;  // 1. Add optional latitude
  longitude?: number; // 2. Add optional longitude
}

interface AuthContextType {
  user: User | null;
  login: (userData: { name: string; email: string; role?: 'USER' | 'ADMIN' }) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: { name: string; email: string; role?: 'USER' | 'ADMIN' }) => {
    const userWithAllData: User = { 
      ...userData, 
      role: userData.role || 'USER',
      avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
      address: 'Not Set', // Default address is now "Not Set"
    };
    setUser(userWithAllData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return { ...prevUser, ...updatedData };
    });
  };

  const value = { user, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}