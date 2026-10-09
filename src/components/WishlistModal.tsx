"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { initialProducts } from "@/data/products";

export function WishlistModal() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = initialProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl transform overflow-hidden rounded-card bg-paper border border-mist p-6 md:p-8 text-left shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-6 border-b border-mist pb-4">
            <div>
              <span className="font-serif text-[32px] text-ink block mb-0.5">gaanv</span>
              <h3 className="font-serif text-h3 text-ink">Saved Pieces ({savedProducts.length})</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsWishlistOpen(false)}
              className="text-stone hover:text-ink rounded-input p-2 transition-colors"
            >
              ✕
            </button>
          </div>

          {savedProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-serif text-h4 text-stone mb-2">No saved pieces yet</p>
              <p className="text-body-sm text-stone max-w-xs mx-auto mb-6">
                Click the heart icon on any product to curate your personal collection of Indian artisanal pieces.
              </p>
              <button
                type="button"
                onClick={() => setIsWishlistOpen(false)}
                className="bg-ink text-paper hover:bg-ink-soft rounded-button px-6 py-2.5 text-body-sm font-medium transition-colors"
              >
                Discover Pieces
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-mist max-h-[60vh] overflow-y-auto">
              {savedProducts.map((product) => (
                <li key={product.id} className="py-4 flex gap-4 items-center">
                  <div className="relative h-16 w-14 flex-shrink-0 rounded-input border border-mist bg-bone-d overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-[15px] font-medium text-ink line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone uppercase tracking-[1px]">
                      {product.seller} · {product.location}
                    </p>
                    <p className="font-serif text-[15px] text-ink tabular-nums mt-1">
                      ${(product.price / 82).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product.id);
                      }}
                      className="bg-ink text-paper hover:bg-ink-soft rounded-button px-3 py-1.5 text-xs font-medium transition-colors"
                    >
                      Move to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="text-stone hover:text-madder p-1.5"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
