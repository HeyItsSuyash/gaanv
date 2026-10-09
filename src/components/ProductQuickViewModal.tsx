"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function ProductQuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } =
    useCart();

  if (!quickViewProduct) return null;

  const isFav = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-card bg-paper border border-mist text-left shadow-2xl transition-all">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 end-4 z-10 text-stone hover:text-ink rounded-input p-2 transition-colors bg-bone border border-mist/40"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual Column */}
            <div className="relative aspect-[4/5] bg-bone-d border-b md:border-b-0 md:border-e border-mist p-4 flex items-center justify-center">
              <Image
                src={quickViewProduct.image}
                alt={quickViewProduct.alt || quickViewProduct.name}
                fill
                className="object-contain p-4"
              />
            </div>

            {/* Content Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 border-sage bg-sage-l text-sage border rounded-pill font-sans font-semibold tracking-[0.3px] px-2 py-0.5 text-[10px]">
                    <span aria-hidden="true" className="leading-none">✓</span>
                    gaanv verified
                  </span>
                  <span className="inline-flex items-center gap-1.5 border-brass bg-brass-l text-brass border-[1.5px] rounded-xs font-serif font-medium uppercase tracking-[1.5px] px-2 py-0.5 text-[10px]">
                    <span aria-hidden="true" className="text-[0.7em] leading-none">◆</span>
                    GI CERTIFIED
                  </span>
                </div>

                <p className="text-caption text-stone mb-1 uppercase tracking-[1.5px]">
                  {quickViewProduct.seller} · {quickViewProduct.location}
                </p>

                <h3 className="font-serif text-h3 text-ink leading-tight mb-2">
                  {quickViewProduct.name}
                </h3>

                <p className="font-serif text-price text-ink mb-4 tabular-nums">
                  ${(quickViewProduct.price / 82).toFixed(2)}
                </p>

                <p className="text-body-sm text-stone mb-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="border-t border-mist/70 pt-3 mb-6">
                  <p className="text-[12px] text-stone font-medium uppercase tracking-wider mb-1">
                    Maker Story
                  </p>
                  <p className="text-[13px] text-ink/80 italic font-serif">
                    &ldquo;{quickViewProduct.craftStory}&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(quickViewProduct, 1);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-ink text-paper hover:bg-ink-soft rounded-button py-3 text-body-sm font-medium transition-colors"
                >
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="border border-mist hover:border-ink rounded-button px-4 flex items-center justify-center transition-colors"
                  aria-label="Wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill={isFav ? "var(--color-madder)" : "none"}
                    stroke={isFav ? "var(--color-madder)" : "currentColor"}
                    strokeWidth="16"
                    viewBox="0 0 256 256"
                  >
                    <path d="M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
