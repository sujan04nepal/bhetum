"use client";

import { LanguageProvider as OriginalLanguageProvider } from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <OriginalLanguageProvider>{children}</OriginalLanguageProvider>;
}
