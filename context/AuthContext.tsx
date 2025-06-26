'use client';

import { createContext, useContext } from 'react';

const AuthContext = createContext<Profiles | null>(null);

export const AuthProvider = ({ user, children }: { user: Profiles; children: React.ReactNode }) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
