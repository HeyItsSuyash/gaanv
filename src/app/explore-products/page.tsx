"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { initialProducts } from "@/data/products";
import { initialCategories } from "@/data/categories";
import { CustomSelect } from "@/components/CustomSelect";

export default function ExploreProductsPage() {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = ["All", ...initialCategories.map((c) => c.name)];
  const states = [
    "All",
    "Uttar Pradesh",
    "Odisha",
    "Rajasthan",
    "Madhya Pradesh",
    "Assam",
    "Bihar",
    "Karnataka",
  ];

  const filteredProducts = initialProducts
    .filter((p) => {
      const matchCat =
        selectedCategory === "All" ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchState =
        selectedState === "All" ||
        p.state.toLowerCase().includes(selectedState.toLowerCase());
      const matchQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchState && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-bone text-ink relative">
      {/* Background Warli folk pattern */}
      <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />

      {/* Header Banner */}
      <section className="relative border-b border-mist bg-bone-d py-12 md:py-16">
        <div className="absolute inset-0 bg-mandana-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-h1 text-ink">
            {lang === "hi" ? "समस्त प्रामाणिक ग्रामीण हस्तशिल्प" : "Explore All Rural Treasures"}
          </h1>
          <p className="mt-2 text-[15px] sm:text-[16px] text-stone max-w-2xl leading-relaxed">
            {lang === "hi"
              ? "भारत के गाँवों से सीधे आपके घर तक। हर उत्पाद जीआई प्रमाणित और महिला स्वयं सहायता समूहों द्वारा तैयार।"
              : "Direct from the chaupals of India. Certified authentic geographical indications and women SHG creations."}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative mx-auto max-w-[1280px] px-5 sm:px-6 py-8 md:px-8 md:py-12">
        {/* Controls / Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-card bg-paper border border-mist p-4 sm:p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.search_placeholder")}
                className="w-full h-11 rounded-input bg-bone-d border border-mist px-4 text-ink text-[14px] placeholder-stone focus:outline-none focus:border-brass"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-xs text-stone whitespace-nowrap">Sort:</span>
              <div className="w-full sm:w-44">
                <CustomSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  options={[
                    { value: "featured", label: "Featured" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "rating", label: "Top Rated" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-pill border transition-all ${
                  selectedCategory === cat
                    ? "bg-brass text-[#14110c] font-semibold border-brass"
                    : "bg-bone-d text-ink-soft border-mist hover:border-brass/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-stone">
          <span>
            {lang === "hi"
              ? `${filteredProducts.length} उत्पाद मिले`
              : `Showing ${filteredProducts.length} authentic pieces`}
          </span>
          <span className="text-brass font-mono">100% Traceable Roots</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded-card bg-paper border border-mist">
            <p className="font-serif text-h3 text-stone mb-2">No pieces found</p>
            <p className="text-xs text-stone">Try clearing your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded-card bg-paper border border-mist p-3 sm:p-4 shadow-lg hover:border-brass/50 transition-all duration-200"
                >
                  {/* Visual Area */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-input bg-bone-d mb-3 sm:mb-4">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="relative block h-full w-full cursor-zoom-in"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.alt || product.name}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </button>

                    {/* Badges */}
                    {product.tags.includes("gi") && (
                      <div className="absolute start-2 top-2">
                        <span className="bg-[#12100d]/90 text-brass border border-brass/40 text-[10px] font-mono px-2 py-0.5 rounded-xs font-semibold">
                          GI Tag
                        </span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Save for later"
                      className="bg-paper hover:bg-bone text-ink shadow-md border border-mist absolute end-2 top-2 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-pill transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={isFav ? "var(--color-madder)" : "none"}
                        stroke={isFav ? "var(--color-madder)" : "currentColor"}
                        strokeWidth="16"
                        viewBox="0 0 256 256"
                      >
                        <path d="M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42Z"></path>
                      </svg>
                    </button>

                    {/* Add to Bag */}
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1)}
                      aria-label="Add to bag"
                      className="bg-paper text-ink hover:bg-brass hover:text-[#12100d] shadow-md border border-mist absolute end-2 bottom-2 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-pill transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-[12px] text-stone font-sans">
                        {product.location}
                      </p>
                      <h3 className="font-serif text-[16px] sm:text-[17px] text-ink font-normal mt-0.5 line-clamp-1 group-hover:text-brass transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between border-t border-mist/40 pt-2.5">
                      <span className="font-mono text-[14px] sm:text-[15px] font-semibold text-ink">
                        ₹{product.price}
                      </span>
                      <span className="text-[11px] text-stone font-mono">
                        Artisan direct
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
