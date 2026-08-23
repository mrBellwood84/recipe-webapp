'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'guest' | 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loginAs: (role: 'user' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Helper for mock-innlogging under utvikling
  const loginAs = (targetRole: 'user' | 'admin') => {
    if (targetRole === 'admin') {
      setUser({
        id: 'admin-1',
        name: 'Kristian (Admin)',
        email: 'admin@oppskrifter.no',
        role: 'admin',
      });
    } else {
      setUser({
        id: 'user-1',
        name: 'Kristian Wessel',
        email: 'bruker@oppskrifter.no',
        role: 'user',
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const currentRole: UserRole = user?.role ?? 'guest';

  return (
    <AuthContext.Provider value={{ user, role: currentRole, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth må brukes innenfor en AuthProvider');
  }
  return context;
}