"use client";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
      <FloatingActionButton />
    </ErrorBoundary>
  );
}
