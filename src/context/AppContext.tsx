import React, { createContext, useContext } from 'react';
import { useAppState } from '../hooks/useAppState';

type AppState = ReturnType<typeof useAppState>;

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appState = useAppState();
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
