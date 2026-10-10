"use client";

import React, { useEffect, useState } from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241b14] transition-opacity duration-500"
    >
      {/* Background Warli Art Pattern */}
      <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />

      {/* Simple Circular Loader */}
      <div className="relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-[#524132] border-t-[#d4af37] animate-spin" />
      </div>
    </div>
  );
}
