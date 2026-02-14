'use client';

import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  userId: string | null;
  accountId: string | null;
  setUserId: (id: string | null) => void;
  setAccountId: (id: string | null) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const clearAuth = () => {
    setUserId(null);
    setAccountId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        accountId,
        setUserId,
        setAccountId,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
