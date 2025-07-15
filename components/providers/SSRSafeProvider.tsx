"use client";

import { useEffect, useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface SSRSafeProviderProps {
  children: React.ReactNode;
}

export function SSRSafeProvider({ children }: SSRSafeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a basic wrapper during SSR
    return <div>{children}</div>;
  }

  return <LanguageProvider>{children}</LanguageProvider>;
}
