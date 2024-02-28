"use client";

import { TDestination, useDestinations } from "@/hooks/destinations.hooks";
import { ReactNode, createContext, useContext } from "react";

interface IAppState {
  destinations: {
    data: TDestination[] | null;
    loading: boolean;
  };
}

const AppStateContext = createContext<IAppState | null>(null);

const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const destinations = useDestinations();
  return (
    <AppStateContext.Provider value={{ destinations }}>
      {children}
    </AppStateContext.Provider>
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
