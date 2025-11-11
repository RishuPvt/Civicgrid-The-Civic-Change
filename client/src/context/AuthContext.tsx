import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { backendUrl } from '../API/BackendUrl'; // Assuming you have this path

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  civicScore?: number;
  // Add other user properties you fetch from the backend
}

interface AuthContextType {
  user: User | null;
  loading: boolean; // Add a loading state to prevent flickering
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state

  // Function to fetch the current user from the backend
  const fetchCurrentUser = async () => {
    try {
      // The `withCredentials` option is essential for sending cookies
      const response = await axios.get(`${backendUrl}/users/getCurrentUser`, {
        withCredentials: true,
      });
      setUser(response.data.data); // Set the user data from the backend
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      setUser(null); // Clear user state if fetching fails (e.g., token expired)
    } finally {
      setLoading(false);
    }
  };

  // This useEffect runs only once on app mount to check the authentication status
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // The login function now triggers a re-fetch of the user data
  // The actual login (e.g., via a form) would be handled elsewhere. This simply refreshes the state.
  const login = async () => {
    setLoading(true);
    await fetchCurrentUser();
  };

  // The logout function calls the backend API to clear cookies
  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/LogoutUser`, {}, {
        withCredentials: true,
      });
      setUser(null); // Clear the user from the state
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the API call fails, we should still clear the local state
      setUser(null);
    }
  };

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};