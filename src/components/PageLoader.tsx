"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant quick initial load sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#241b14] transition-opacity duration-500"
    >
      {/* Background Warli Art Pattern */}
      <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Logo with gentle pulse */}
        <div className="relative h-14 w-44 sm:h-16 sm:w-48 animate-pulse">
          <Image
            src="/gaon-logo.png"
            alt="Gaanv by Mittilok"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Earthen spinner & tag */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37] animate-spin" />
          <span className="text-[#e2d8c9] font-mono text-xs uppercase tracking-widest">
            मिट्टी की खुशबू • Loading
          </span>
        </div>
      </div>
    </div>
  );
}
