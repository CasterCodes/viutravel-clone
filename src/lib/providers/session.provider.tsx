"use client";

import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

const AppSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AppSessionProvider;
