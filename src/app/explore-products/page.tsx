"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  X,
  Heart,
  Eye,
  Check,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { initialProducts, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const categories = [
  "All",
  "Handicrafts",
  "Textiles",
  "Décor",
  "Rural Lifestyle",
  "Gifts",
  "Food",
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const stateOptions = [
  "All States",
  "Uttar Pradesh",
  "Rajasthan",
  "Assam",
  "West Bengal",
  "Bihar",
  "Gujarat",
];

const storyPills = [
  { label: "🌸 Made by Women", tag: "women" },
  { label: "🪔 Handmade in India", tag: "handmade" },
  { label: "✨ Festive Favourites", tag: "festive" },
  { label: "🎁 Gifts with Meaning", tag: "gifts" },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState("All States");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useCart();

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category")!);
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search")!);
    }
  }, [searchParams]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedState("All States");
    setSelectedTag(null);
    setPriceRange([0, 5000]);
    setSortBy("newest");
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category
    if (selectedCategory !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // State
    if (selectedState !== "All States") {
      list = list.filter(
        (p) => p.state.toLowerCase() === selectedState.toLowerCase()
      );
    }

    // Story tag
    if (selectedTag) {
      list = list.filter((p) => p.tags.includes(selectedTag));
    }

    // Price range
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.seller.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedState, selectedTag, priceRange, searchQuery, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedState !== "All States" ? 1 : 0) +
    (selectedTag ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Header Banner */}
      <section className="pt-28 pb-10 md:pt-36 md:pb-14 bg-muted/30 border-b border-border">
        <div className="section-container">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-secondary font-medium">Explore All Products</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-2">
            Explore the Gaon
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">
            Handmade products, local stories and women-led enterprises — all in one place.
          </p>
        </div>
      </section>

      {/* 2. Shop by Story Filter Bar */}
      <section className="py-4 border-b border-border bg-background sticky top-20 z-20 backdrop-blur-md bg-background/90">
        <div className="section-container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-semibold text-secondary whitespace-nowrap mr-1">
              Shop by Story:
            </span>
            {storyPills.map((pill) => {
              const active = selectedTag === pill.tag;
              return (
                <button
                  key={pill.tag}
                  onClick={() => setSelectedTag(active ? null : pill.tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    active
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-card text-secondary border-border hover:border-primary/50"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Catalog & Filters Grid */}
      <section className="py-10 md:py-14" aria-label="Product catalog">
        <div className="section-container">
          {/* Top Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products, artisans, states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-earth w-full pl-9 pr-8 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 justify-between md:justify-end">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-secondary shadow-sm cursor-pointer"
              >
                <SlidersHorizontal size={16} />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-earth text-sm py-2 px-3 bg-card font-medium"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden md:block space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="font-serif font-bold text-secondary text-lg flex items-center gap-2">
                  <Filter size={18} />
                  <span>Filters</span>
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <RotateCcw size={12} />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Category
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        selectedCategory === cat
                          ? "bg-primary text-white font-semibold"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-secondary"
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Location
                </h3>
                <div className="space-y-1">
                  {stateOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedState(st)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        selectedState === st
                          ? "bg-primary text-white font-semibold"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-secondary"
                      }`}
                    >
                      <span>{st}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Price Range
                  </h3>
                  <span className="text-xs font-semibold text-primary">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-primary cursor-pointer"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: "Under ₹500", range: [0, 500] },
                    { label: "₹500–1000", range: [500, 1000] },
                    { label: "₹1000–2000", range: [1000, 2000] },
                    { label: "Above ₹2000", range: [2000, 5000] },
                  ].map((bracket) => (
                    <button
                      key={bracket.label}
                      onClick={() => setPriceRange(bracket.range as [number, number])}
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-secondary cursor-pointer"
                    >
                      {bracket.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Products Grid */}
            <main className="md:col-span-3 space-y-6">
              {/* Results count indicator */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
                <span>
                  Showing <strong className="text-secondary">{filteredProducts.length}</strong> authentic handcrafted items
                </span>
                {activeFiltersCount > 0 && (
                  <span className="text-primary font-medium">
                    {activeFiltersCount} active filter{activeFiltersCount === 1 ? "" : "s"}
                  </span>
                )}
              </div>

              {/* Products list */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center space-y-4 bg-card rounded-3xl border border-border p-8 shadow-earth-sm">
                  <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center text-3xl mx-auto">
                    🔍
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-secondary text-xl">
                      No products found
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                      We couldn&apos;t find any crafts matching your exact criteria. Try resetting filters or exploring another category.
                    </p>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="btn-primary text-xs py-2.5 px-6 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => {
                    const discountPercent = product.originalPrice
                      ? Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        )
                      : 0;
                    const isSaved = isInWishlist(product.id);
                    const isAdded = addedIds[product.id];

                    return (
                      <div
                        key={product.id}
                        className="product-card flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[4/5] bg-muted/20">
                          <Image
                            src={product.image}
                            alt={product.alt}
                            fill
                            className="object-cover product-image-zoom"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {product.isNew && (
                              <span className="px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-sm">
                                New
                              </span>
                            )}
                            {product.isBestseller && (
                              <span className="px-2.5 py-1 bg-gold text-white text-xs font-semibold rounded-full shadow-sm">
                                Bestseller
                              </span>
                            )}
                            {discountPercent > 0 && (
                              <span className="px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                                -{discountPercent}%
                              </span>
                            )}
                          </div>

                          {/* Wishlist toggle */}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-earth transition-all hover:scale-110 cursor-pointer"
                            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart
                              size={15}
                              className={isSaved ? "fill-primary text-primary" : "text-muted-foreground"}
                            />
                          </button>

                          {/* Category */}
                          <div className="absolute bottom-3 left-3">
                            <span className="badge-handmade text-xs">{product.category}</span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex-1">
                            <h3 className="font-serif font-semibold text-secondary text-base leading-snug mb-1.5 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mb-3">
                              <MapPin size={12} className="text-muted-foreground flex-shrink-0" />
                              <span className="text-xs text-muted-foreground truncate">
                                {product.seller} · {product.location}
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="font-semibold text-secondary text-lg">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.originalPrice && (
                              <span className="text-muted-foreground text-sm line-through">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                isAdded
                                  ? "bg-accent text-white"
                                  : "bg-primary text-primary-foreground hover:bg-secondary"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={14} />
                                  <span>✓ Added</span>
                                </>
                              ) : (
                                <span>Add to Cart</span>
                              )}
                            </button>

                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all flex-shrink-0 bg-background cursor-pointer"
                              aria-label="View product"
                              title="Quick View"
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-background shadow-earth-xl flex flex-col p-6 space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-serif font-bold text-secondary text-lg">Filters</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Category
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer border ${
                        selectedCategory === cat
                          ? "bg-primary text-white border-primary"
                          : "bg-card border-border text-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-2 pt-2 border-t border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Location
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {stateOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedState(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer border ${
                        selectedState === st
                          ? "bg-primary text-white border-primary"
                          : "bg-card border-border text-secondary"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-primary">₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={handleClearFilters}
                  className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold text-secondary hover:bg-muted"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-secondary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-2">
            <span className="text-3xl animate-bounce">🪔</span>
            <p className="font-serif text-secondary">Loading the Gaon...</p>
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
