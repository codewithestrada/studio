
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useMemo } from "react";

// Define a basic user type (adjust as needed)
interface User {
  id: string;
  email: string;
  name?: string; // Optional name
  // Add other relevant user properties
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  // Add isLoading state if needed for async operations
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state (e.g., from localStorage or session storage if implementing persistence)
  const [user, setUser] = useState<User | null>(null);

  // --- Login Function ---
  // In a real app, this might be called after successful API authentication
  const login = (userData: User) => {
    // Here you would typically store the user data and maybe a token
    // (e.g., in state, localStorage, sessionStorage, or secure cookies)
    console.log("Logging in user:", userData);
    setUser(userData);
    // Example: Store in localStorage (Consider security implications)
    // localStorage.setItem('user', JSON.stringify(userData));
  };

  // --- Logout Function ---
  const logout = () => {
    // Clear user state and any stored tokens/data
    console.log("Logging out user");
    setUser(null);
    // Example: Remove from localStorage
    // localStorage.removeItem('user');
    // Optionally redirect to login page or home page
  };

  // --- Check Authentication Status ---
  // The `isAuthenticated` flag is derived from the user state.
  const isAuthenticated = useMemo(() => !!user, [user]);

  // --- Load Initial State (Optional Example) ---
  // React.useEffect(() => {
  //   // Example: Check localStorage on initial load
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     try {
  //       setUser(JSON.parse(storedUser));
  //     } catch (error) {
  //       console.error("Failed to parse stored user data:", error);
  //       localStorage.removeItem('user'); // Clear invalid data
  //     }
  //   }
  // }, []);


  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated] // Dependencies for useMemo
  );


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
