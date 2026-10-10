"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 end-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-paper border-s border-mist text-ink flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-mist bg-bone">
            <div>
              <h2 className="font-serif text-h3 text-ink">Your Bag</h2>
              <p className="text-[12px] text-stone">Worldwide shipping from India</p>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="text-stone hover:text-ink rounded-input p-2 transition-colors"
              aria-label="Close cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="relative h-12 w-32 mb-2 opacity-50">
                  <Image src="/gaon-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <p className="font-serif text-h4 text-ink mb-1">Your bag is empty</p>
                <p className="text-body-sm text-stone max-w-xs mb-6">
                  Explore one-of-a-kind treasures handcrafted by verified artisans across India.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-ink text-paper hover:bg-ink-soft rounded-button px-6 py-2.5 text-body-sm font-medium transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-mist">
                {cart.map(({ product, quantity }) => (
                  <li key={product.id} className="py-4 flex gap-4">
                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-input border border-mist bg-bone-d">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-[15px] font-medium text-ink leading-snug line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-stone hover:text-madder text-[13px] ml-2"
                            aria-label="Remove item"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-[11px] text-stone uppercase tracking-[1px] mt-0.5">
                          {product.seller} · {product.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-mist rounded-input">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2.5 py-0.5 text-stone hover:text-ink text-sm"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2.5 py-0.5 text-stone hover:text-ink text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-serif text-[15px] tabular-nums text-ink font-semibold">
                          ₹{product.price * quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="border-t border-mist bg-bone p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-body-sm text-stone">Subtotal</span>
                <span className="font-serif text-h3 text-ink tabular-nums font-semibold">
                  ₹{cartTotal}
                </span>
              </div>
              <p className="text-[12px] text-stone mb-4">
                Shipping, taxes, and duties calculated at checkout. Every seller paid securely.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-ink text-paper hover:bg-ink-soft rounded-button py-3.5 text-body-sm font-medium transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
