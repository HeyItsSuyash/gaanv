"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { initialProducts } from "@/data/products";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = ["Chikankari", "Terracotta", "Bamboo Basket", "Madhubani", "Dupatta", "Gift Hamper"];

  const filteredProducts = query.trim()
    ? initialProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.seller.toLowerCase().includes(query.toLowerCase()) ||
          p.location.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card w-full max-w-2xl rounded-3xl border border-border shadow-earth-xl overflow-hidden relative animate-fade-up">
        {/* Top bar */}
        <div className="p-4 md:p-6 border-b border-border flex items-center gap-3">
          <Search size={22} className="text-primary flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by craft, artisan name, state (e.g. Lucknow, Terracotta)..."
            className="flex-1 bg-transparent text-base md:text-lg text-secondary placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded bg-muted/50 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Quick tags */}
          {!query && (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <Sparkles size={14} className="text-primary" />
                Popular Searches in the Gaon
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted/40 hover:bg-primary hover:text-white transition-all cursor-pointer border border-border/60"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query.trim() && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Found {filteredProducts.length} matching craft{filteredProducts.length === 1 ? "" : "s"}
                </span>
                <Link
                  href={`/explore-products?search=${encodeURIComponent(query)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View all in catalog</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="font-serif text-secondary text-base mb-1">No items found matching &quot;{query}&quot;</p>
                  <p className="text-xs">Try searching for &quot;Chikankari&quot;, &quot;Terracotta&quot;, or &quot;Bamboo&quot;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setQuickViewProduct(product);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl border border-border bg-background hover:border-primary/50 transition-all cursor-pointer group"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted/40 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-serif font-medium text-secondary text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h5>
                        <p className="text-[11px] text-muted-foreground">
                          {product.seller} · {product.location}
                        </p>
                        <p className="font-semibold text-secondary text-xs mt-1">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
