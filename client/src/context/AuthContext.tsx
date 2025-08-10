import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our user object
interface User {
  name: string;
  email: string;
  role: 'USER' | 'ADMIN'; // The user can be a regular USER or an ADMIN
}

interface AuthContextType {
  user: User | null;
  login: (userData: { name: string; email: string; role?: 'USER' | 'ADMIN' }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: { name: string; email: string; role?: 'USER' | 'ADMIN' }) => {
    // If a role isn't provided, default to 'USER'
    const userWithRole: User = {
      ...userData,
      role: userData.role || 'USER',
    };
    console.log("Logging in user:", userWithRole);
    setUser(userWithRole);
  };

  const logout = () => {
    console.log("Logging out user");
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
