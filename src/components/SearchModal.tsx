"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { initialProducts } from "@/data/products";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? initialProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.seller.toLowerCase().includes(query.toLowerCase()) ||
          p.location.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="flex min-h-full items-start justify-center pt-16 px-4 pb-20">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-card bg-paper border border-mist text-left shadow-2xl transition-all">
          {/* Search Header */}
          <div className="flex items-center px-6 py-4 border-b border-mist bg-bone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="text-stone me-3"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces, makers, GI crafts, locations..."
              className="w-full bg-transparent text-ink placeholder:text-stone text-[16px] outline-none font-sans"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-stone hover:text-ink text-sm font-medium ml-2 px-2 py-1 rounded-input"
            >
              Esc
            </button>
          </div>

          {/* Results Area */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div>
                <p className="text-label text-stone mb-3 uppercase tracking-[2px]">
                  Popular Collections
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Chikankari", "Khurja Pottery", "Patola Saree", "Blue Pottery", "Brass & Dokra"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="border border-mist hover:border-ink bg-bone-d/40 rounded-pill px-3 py-1 text-xs text-stone hover:text-ink transition-colors"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-stone py-8 text-body-sm font-serif">
                No matching pieces found for &ldquo;{query}&rdquo;
              </p>
            ) : (
              <ul className="divide-y divide-mist">
                {filtered.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuickViewProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="w-full py-3 flex items-center gap-4 hover:bg-bone-d/30 px-2 rounded-card text-left transition-colors"
                    >
                      <div className="relative h-14 w-12 rounded-input bg-bone-d border border-mist overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-[15px] font-medium text-ink">
                          {product.name}
                        </h4>
                        <p className="text-[12px] text-stone">
                          {product.seller} · {product.location}
                        </p>
                      </div>
                      <span className="font-serif text-[15px] tabular-nums text-ink">
                        ${(product.price / 82).toFixed(2)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
