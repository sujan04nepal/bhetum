"use client";

import { createContext, useContext, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider
      basePath="/api/auth"
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}

// Export hooks for easier usage
export { useSession, signIn, signOut } from "next-auth/react";
