"use client";

import { ReactNode } from "react";
import CyberGrid from "@/components/shared/CyberGrid";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Grid */}
      <CyberGrid />

      {/* Page Content */}
      <main className="relative z-10 pt-20 px-4 md:px-8">
        {children}
      </main>
    </div>
  );
}
