import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('JWT'));
  
    const login = (newToken: string) => {
      localStorage.setItem('JWT', newToken);
      setToken(newToken);
    };
  
    const logout = () => {
      localStorage.removeItem('JWT');
      setToken(null);
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  