"use client";

import { ReactNode, createContext, useContext } from "react";

const AppStateContext = createContext<any>(null);

const AppStateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppStateContext.Provider value={null}>{children}</AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppState provider");
  }

  return context;
};
