"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { initialProducts } from "@/data/products";

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = initialProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background shadow-earth-xl flex flex-col border-l border-border">
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Heart size={18} className="fill-primary" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-secondary text-lg">Your Wishlist</h3>
                <p className="text-xs text-muted-foreground">
                  {wishlist.length} {wishlist.length === 1 ? "saved craft" : "saved crafts"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center text-3xl">
                  💖
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-secondary text-lg mb-1">
                    Your wishlist is empty
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Save your favorite handwoven dupattas, pottery, and gifts as you browse the Gaon.
                  </p>
                </div>
                <Link
                  href="/explore-products"
                  onClick={() => setIsWishlistOpen(false)}
                  className="btn-primary text-sm py-2.5 px-6"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-card border border-border shadow-earth-sm hover:border-primary/40 transition-colors"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted/30 cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h5
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setQuickViewProduct(product);
                          }}
                          className="font-serif font-medium text-secondary text-sm leading-snug line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                        >
                          {product.name}
                        </h5>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-muted-foreground hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {product.seller} · {product.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                      <span className="font-semibold text-secondary text-sm">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-secondary transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
