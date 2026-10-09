"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const deliveryCharge = isFreeShipping || cartTotal === 0 ? 0 : 80;
  const grandTotal = cartTotal + deliveryCharge;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background shadow-earth-xl flex flex-col border-l border-border">
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-secondary text-lg">Your Cart</h3>
                <p className="text-xs text-muted-foreground">
                  {cartCount} {cartCount === 1 ? "artisan item" : "artisan items"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {cart.length > 0 && (
            <div className="bg-primary/5 px-5 py-3 border-b border-primary/15">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="flex items-center gap-1 text-secondary">
                  <Sparkles size={14} className="text-primary" />
                  {isFreeShipping ? "Unlocked FREE Delivery Across India! 🎉" : `Add ₹${amountNeeded} more for FREE Delivery`}
                </span>
                <span className="text-primary font-bold">
                  {Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100))}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100))}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center text-3xl">
                  🧺
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-secondary text-lg mb-1">
                    Your cart is currently empty
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Support women-led rural enterprises and bring home authentic handcrafted pieces from Indian villages.
                  </p>
                </div>
                <Link
                  href="/explore-products"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary text-sm py-2.5 px-6"
                >
                  Explore the Gaon
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-card border border-border shadow-earth-sm hover:border-primary/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted/30">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-serif font-medium text-secondary text-sm leading-snug line-clamp-1">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        By {item.product.seller} · {item.product.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                      <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-secondary min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-secondary text-sm">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-border bg-card space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery across India</span>
                  <span>{deliveryCharge === 0 ? <strong className="text-accent font-semibold">FREE</strong> : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between text-secondary font-bold text-base pt-2 border-t border-border">
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="btn-primary w-full justify-center py-3.5 text-sm font-semibold shadow-earth"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-[11px] text-center text-muted-foreground">
                🔒 Direct artisan payment. Safe & encrypted delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
