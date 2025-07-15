"use client";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DevDebugger } from "@/components/DevDebugger";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
      <FloatingActionButton />
      <DevDebugger />
    </ErrorBoundary>
  );
}
