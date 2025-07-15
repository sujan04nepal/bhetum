"use client";

import { createContext, useContext, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

// We'll use next-auth's useSession hook directly
// This file is mainly for future custom auth logic if needed
