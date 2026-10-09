"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Heart, Star, MapPin, Check, Plus, Minus, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(
        ((quickViewProduct.originalPrice - quickViewProduct.price) /
          quickViewProduct.originalPrice) *
          100
      )
    : 0;

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card w-full max-w-3xl rounded-3xl border border-border shadow-earth-xl overflow-hidden relative animate-fade-up my-6">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-muted-foreground hover:text-foreground transition-all cursor-pointer z-10 shadow-sm"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-muted/20 min-h-[320px]">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {quickViewProduct.isNew && (
                <span className="px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-sm">
                  New Arrival
                </span>
              )}
              {quickViewProduct.isBestseller && (
                <span className="px-2.5 py-1 bg-gold text-white text-xs font-semibold rounded-full shadow-sm">
                  Bestseller
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="badge-handmade text-xs font-semibold">
                {quickViewProduct.category}
              </span>
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gold font-semibold mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-muted-foreground font-normal">
                    ({quickViewProduct.reviewsCount} reviews)
                  </span>
                </div>

                <h3 className="font-serif font-bold text-secondary text-xl md:text-2xl leading-snug">
                  {quickViewProduct.name}
                </h3>
              </div>

              {/* Artisan badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/30 border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm flex-shrink-0">
                  👩🏽‍🌾
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-secondary">
                      {quickViewProduct.seller}
                    </span>
                    <ShieldCheck size={13} className="text-accent flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin size={11} />
                    <span>{quickViewProduct.location}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="font-serif font-bold text-secondary text-2xl">
                  ₹{quickViewProduct.price.toLocaleString("en-IN")}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-muted-foreground text-sm line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold text-accent">
                    Save ₹{(quickViewProduct.originalPrice! - quickViewProduct.price).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Craft Story */}
              {quickViewProduct.craftStory && (
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-secondary/90 leading-relaxed">
                  <p className="font-serif font-semibold text-primary text-[11px] flex items-center gap-1 mb-0.5">
                    <Sparkles size={12} />
                    <span>The Artisan&apos;s Hand:</span>
                  </p>
                  <p className="italic text-muted-foreground text-[11px]">
                    &quot;{quickViewProduct.craftStory}&quot;
                  </p>
                </div>
              )}

              {/* Materials */}
              {quickViewProduct.materials && quickViewProduct.materials.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
                    Materials:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.materials.map((mat) => (
                      <span
                        key={mat}
                        className="text-[11px] px-2.5 py-0.5 bg-background border border-border rounded-md text-muted-foreground"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl bg-background overflow-hidden p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-sm font-semibold text-secondary min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border border-border transition-all cursor-pointer ${
                    isSaved ? "bg-primary/10 border-primary text-primary" : "hover:border-primary text-muted-foreground"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={isSaved ? "fill-primary" : ""} />
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-earth ${
                    added ? "bg-accent text-white" : "bg-primary text-white hover:bg-secondary"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <span>Add to Cart • ₹{(quickViewProduct.price * quantity).toLocaleString("en-IN")}</span>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-muted-foreground">
                Delivered across India in 4-7 days • 100% Authentic Handcraft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
