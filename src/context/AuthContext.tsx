
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useMemo, useCallback } from "react"; // Added useCallback

// Define a basic user type (adjust as needed)
interface User {
  id: string;
  email: string;
  name?: string; // Optional name
  // Add other relevant user properties
}

// Define input type for signup
interface SignUpData {
    name: string;
    email: string;
    // Password is not stored in context, handled during API call
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  signup: (signupData: SignUpData) => Promise<boolean>; // Add signup function, returns success status
  // Add isLoading state if needed for async operations
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state (e.g., from localStorage or session storage if implementing persistence)
  const [user, setUser] = useState<User | null>(null);

  // --- Login Function ---
  const login = useCallback((userData: User) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    // Example: Store in localStorage (Consider security implications)
    // localStorage.setItem('user', JSON.stringify(userData));
  }, []); // Added dependency array

  // --- Logout Function ---
  const logout = useCallback(() => {
    console.log("Logging out user");
    setUser(null);
    // Example: Remove from localStorage
    // localStorage.removeItem('user');
  }, []); // Added dependency array

  // --- Signup Function (Simulation) ---
  // In a real app, this would make an API call to your backend
  const signup = useCallback(async (signupData: SignUpData): Promise<boolean> => {
    console.log("Signing up user (simulation):", signupData);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate success or failure (e.g., based on email)
    // In a real app, the backend would handle validation (e.g., email uniqueness)
    if (signupData.email.includes("fail")) {
        console.log("Simulated signup failure.");
        return false; // Indicate failure
    }

    // Simulate successful registration
    // Option 1: Just indicate success, user needs to log in separately
    // Option 2: Automatically log the user in after successful signup
    // Let's go with Option 1 for now to keep it simple
    console.log("Simulated signup success.");

    // const newUser: User = {
    //   id: `user-${Date.now()}`, // Generate a temporary ID
    //   email: signupData.email,
    //   name: signupData.name,
    // };
    // login(newUser); // Automatically log in after signup (Option 2)

    return true; // Indicate success
  }, []); // Added dependency array


  // --- Check Authentication Status ---
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
      signup, // Add signup to context value
    }),
    [user, isAuthenticated, login, logout, signup] // Dependencies for useMemo
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
