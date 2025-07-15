"use client";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingActionButton />
    </>
  );
}
