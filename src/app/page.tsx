"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
  Heart,
  Eye,
  Check,
  ChevronDown,
  ShieldCheck,
  Store,
  Users,
  Package,
  Globe2,
} from "lucide-react";
import { initialProducts, Product } from "@/data/products";
import { initialCategories } from "@/data/categories";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    setQuickViewProduct,
    setIsSellerModalOpen,
  } = useCart();

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const featuredProducts = initialProducts.slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
        aria-label="Hero section"
      >
        {/* Ambient Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob-terracotta absolute top-[-10%] right-[-5%] w-[55%] h-[65%] opacity-60" />
          <div className="blob-gold absolute bottom-[-5%] left-[-5%] w-[45%] h-[55%] opacity-40" />
          <div className="blob-green absolute top-[40%] left-[30%] w-[30%] h-[30%] opacity-30" />
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-7 animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="badge-women !bg-transparent !border-0 !p-0 font-semibold tracking-wide">
                  Women-First Digital Marketplace
                </span>
              </div>

              {/* Headings */}
              <div>
                <h1 className="font-serif text-hero-xl text-secondary leading-[1.05] tracking-tight mb-4">
                  <span className="font-devanagari text-gradient-earth block text-hero-xl font-bold">
                    गाँव की कला,
                  </span>
                  <span className="font-devanagari block font-bold text-secondary">
                    दुनिया का बाज़ार।
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium mt-4 max-w-lg leading-relaxed">
                  Discover beautiful products made by women-led enterprises and local artisans across India.
                </p>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                MittiLok Gaon brings local skills, handmade products and rural entrepreneurship into the digital world — helping women build their own identity and reach more customers.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link href="/explore-products" className="btn-primary shadow-earth">
                  <Sparkles size={18} />
                  <span>Explore Products</span>
                </Link>
                <button
                  onClick={() => setIsSellerModalOpen(true)}
                  className="btn-outline cursor-pointer"
                >
                  <span>Become a Seller</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Tagline sentence */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-px w-8 bg-primary/40" />
                <p className="text-sm text-muted-foreground italic">
                  Made with skill. Rooted in community. Built for a bigger market.
                </p>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-background overflow-hidden shadow-earth-sm relative">
                    <Image
                      src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                      alt="Artisan seller 1"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-background overflow-hidden shadow-earth-sm relative">
                    <Image
                      src="https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                      alt="Artisan seller 2"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-background overflow-hidden shadow-earth-sm relative">
                    <Image
                      src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                      alt="Artisan seller 3"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    Trusted by 500+ artisan communities
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-2 scale-105" />
              <div className="relative image-rotate-hover rounded-[2.5rem] overflow-hidden shadow-earth-xl border-4 border-white/40">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_4e528ec57-1788966806479.png"
                    alt="Rural Indian woman artisan working on handcrafted textiles, warm morning sunlight"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Badge 1: Bottom Left */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-8 bg-card border border-border rounded-2xl p-4 shadow-earth-lg animate-float-badge max-w-[210px]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 text-primary">
                    <Heart size={16} className="fill-primary" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-secondary text-sm leading-tight">
                      Women-Led Enterprise
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Verified artisan seller
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Top Right */}
              <div
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-card border border-border rounded-2xl p-3.5 shadow-earth-lg animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🪔</span>
                  <div>
                    <p className="text-xs font-semibold text-secondary">Handmade in India</p>
                    <p className="text-[11px] text-muted-foreground">100% authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-float-slow opacity-60">
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-semibold">
            Scroll
          </span>
          <ChevronDown size={14} className="text-primary" />
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section id="categories" className="py-20 md:py-28 bg-background border-t border-border/40" aria-label="Featured categories">
        <div className="section-container">
          <div className="text-center mb-14 space-y-2">
            <span className="section-label">Discover</span>
            <h2 className="font-serif text-section-heading text-secondary font-bold">
              Explore the Gaon
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Discover products with a story, a skill and a soul.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {initialCategories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/explore-products?category=${encodeURIComponent(cat.slug)}`}
                className="category-card group relative overflow-hidden rounded-2xl md:rounded-3xl block shadow-earth"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-muted/40">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover category-card-img"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <h3 className="font-serif font-semibold text-base md:text-xl leading-tight mb-1 group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed hidden sm:block">
                      {cat.subtitle}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-gold text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Explore Collection</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/explore-products" className="btn-outline inline-flex">
              <span>View All Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section id="products" className="py-20 md:py-28 bg-muted/30" aria-label="Featured products">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">Handpicked</span>
              <h2 className="font-serif text-section-heading text-secondary font-bold">
                Made by Hands. <br className="hidden md:block" />
                <span className="text-primary">Chosen by You.</span>
              </h2>
            </div>
            <Link href="/explore-products" className="btn-outline flex-shrink-0 self-start md:self-auto">
              <span>View All Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product, idx) => {
              const discountPercent = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              const isSaved = isInWishlist(product.id);
              const isAdded = addedIds[product.id];

              return (
                <div
                  key={product.id}
                  className="product-card flex flex-col"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image Container */}
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

                    {/* Wishlist Button */}
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

                    {/* Category Chip */}
                    <div className="absolute bottom-3 left-3">
                      <span className="badge-handmade text-xs">{product.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
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

                    {/* Card Actions */}
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
        </div>
      </section>

      {/* 4. WHY MITTILOK GAON SECTION */}
      <section id="difference" className="py-20 md:py-28 bg-background" aria-label="The MittiLok difference">
        <div className="section-container">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="section-label">Why MittiLok Gaon</span>
            <h2 className="font-serif text-section-heading text-secondary font-bold leading-tight">
              हम सिर्फ़ products नहीं, <br />
              <span className="text-primary font-devanagari">opportunities connect karte hain.</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              A platform designed from the ground up for women-led enterprises and local livelihood producers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-earth-sm hover:border-primary/50 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-primary tracking-widest">01</span>
              <h3 className="font-serif font-bold text-secondary text-xl">Women-First Marketplace</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Built to help women-led enterprises present their work and reach more customers — with dignity and fair earnings.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-earth-sm hover:border-primary/50 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-primary tracking-widest">02</span>
              <h3 className="font-serif font-bold text-secondary text-xl">Digital Identity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every artisan gets a dedicated digital identity, sharing the story of her craft, her village and her skill.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-earth-sm hover:border-primary/50 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-primary tracking-widest">03</span>
              <h3 className="font-serif font-bold text-secondary text-xl">Beyond the Local Fair</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Moving from seasonal melas and local haats to a recurring, pan-India customer base all year round.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-earth-sm hover:border-primary/50 transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-primary tracking-widest">04</span>
              <h3 className="font-serif font-bold text-secondary text-xl">From Local to Global</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Logistics, digital payments and customer discovery tailored specifically for rural craftswomen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELLER SPOTLIGHT STORY SECTION */}
      <section id="seller-story" className="py-20 md:py-28 bg-muted/30 overflow-hidden" aria-label="Seller story">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Story Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-earth-xl border-4 border-white/60 relative">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_138f649ee-1786178258999.png"
                  alt="Rural artisan Kamla Bai molding terracotta vessels"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-gold font-bold">Her Story</span>
                  <p className="font-serif font-bold text-xl mt-1">Kamla Bai · Khurja Pottery Cluster</p>
                  <p className="text-xs text-white/80">Leading 15 women potters in Western Uttar Pradesh</p>
                </div>
              </div>

              {/* Quote pill */}
              <div className="absolute -bottom-6 -right-4 bg-card border border-border p-4 rounded-2xl shadow-earth-lg max-w-[240px]">
                <p className="text-xs text-secondary italic font-devanagari font-semibold">
                  “अब मेरा काम सिर्फ़ मेरे गाँव तक सीमित नहीं है।”
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Brand storytelling — 500+ Communities
                </p>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="section-label">Her Story</span>
              <h2 className="font-serif text-section-heading text-secondary font-bold leading-tight">
                <span className="font-devanagari block">हर हुनर को एक पहचान चाहिए।</span>
                <span className="text-primary font-normal text-2xl md:text-3xl block mt-1">
                  Every skill deserves to be seen.
                </span>
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed">
                Many women across Indian villages already possess extraordinary craft mastery — whether hand-spinning weaves, hand-molding sacred terracotta, or embroidery passed down through three generations.
              </p>

              <p className="text-muted-foreground text-base leading-relaxed">
                What they traditionally lacked was visibility, fair pricing, and direct access to urban homes. MittiLok Gaon solves this by creating digital storefronts, dignity of identity, and seamless packaging and logistics.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-card border border-border">
                  <span className="font-serif font-bold text-2xl text-primary">100%</span>
                  <p className="text-xs text-secondary font-semibold mt-1">Direct Value to Artisans</p>
                  <p className="text-[11px] text-muted-foreground">Zero exploitative middlemen commission</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-border">
                  <span className="font-serif font-bold text-2xl text-accent">500+</span>
                  <p className="text-xs text-secondary font-semibold mt-1">Village Women Empowered</p>
                  <p className="text-[11px] text-muted-foreground">Building sustainable self-reliance</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsSellerModalOpen(true)}
                  className="btn-primary"
                >
                  <Store size={18} />
                  <span>Join as an Artisan Seller</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 md:py-28 bg-background" aria-label="How it works">
        <div className="section-container">
          <div className="text-center mb-16 space-y-2">
            <span className="section-label">The Process</span>
            <h2 className="font-serif text-section-heading text-secondary font-bold">
              From Her Hands to Your Home
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              A simple, guided journey for every artisan joining MittiLok Gaon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 relative">
            {[
              {
                step: "01",
                title: "Join",
                desc: "A woman creates her seller profile — her name, her craft, her village.",
              },
              {
                step: "02",
                title: "List",
                desc: "She adds products, photos, prices and the story behind each piece.",
              },
              {
                step: "03",
                title: "Discover",
                desc: "Customers across India discover and connect with authentic crafts.",
              },
              {
                step: "04",
                title: "Order",
                desc: "Orders are safely packed by rural producers and dispatched via our logistics.",
              },
              {
                step: "05",
                title: "Grow",
                desc: "Artisans earn recurring income, building financial independence for their family.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-3xl bg-card border border-border shadow-earth-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
              >
                <div>
                  <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-mono text-sm font-bold flex items-center justify-center mb-4">
                    {item.step}
                  </span>
                  <h3 className="font-serif font-bold text-secondary text-xl mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BRAND MANIFESTO */}
      <section
        id="story"
        className="py-24 md:py-36 bg-muted/40 relative overflow-hidden grain-overlay border-y border-border"
        aria-label="Brand manifesto"
      >
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <span className="section-label">Our Belief</span>
          <h2 className="font-serif text-3xl md:text-5xl text-secondary font-bold leading-tight">
            Local skill deserves a larger world.
          </h2>
          <p className="text-base md:text-lg text-secondary/80 leading-relaxed">
            MittiLok Gaon is built on a simple belief: every woman who can make something beautiful should have a place to sell it. We are creating a digital marketplace where local skills become digital identities, and digital identities create new market opportunities.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link href="/explore-products" className="btn-primary">
              <span>Explore the Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. IMPACT & TRUST SECTION */}
      <section id="impact" className="py-20 md:py-28 bg-secondary text-white" aria-label="Impact and trust">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C8965A] font-bold">
              Our Impact
            </span>
            <h2 className="font-serif text-section-heading font-bold text-white">
              Building a marketplace for every artisan.
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              We are at the beginning of this journey. Every number here represents a real woman, a real skill and a real opportunity.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <Users size={28} className="mx-auto text-[#C8965A]" />
              <div className="font-serif font-bold text-3xl md:text-4xl text-white">500+</div>
              <p className="font-serif font-semibold text-white text-sm">Women Sellers</p>
              <p className="text-xs text-white/60">Artisans joining the platform</p>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <Package size={28} className="mx-auto text-[#C8965A]" />
              <div className="font-serif font-bold text-3xl md:text-4xl text-white">1,200+</div>
              <p className="font-serif font-semibold text-white text-sm">Products Listed</p>
              <p className="text-xs text-white/60">Handmade items available</p>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <Globe2 size={28} className="mx-auto text-[#C8965A]" />
              <div className="font-serif font-bold text-3xl md:text-4xl text-white">18+</div>
              <p className="font-serif font-semibold text-white text-sm">States Covered</p>
              <p className="text-xs text-white/60">Connecting village clusters</p>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <ShieldCheck size={28} className="mx-auto text-[#C8965A]" />
              <div className="font-serif font-bold text-3xl md:text-4xl text-white">100%</div>
              <p className="font-serif font-semibold text-white text-sm">Direct Value</p>
              <p className="text-xs text-white/60">Dignity & transparent pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION SECTION */}
      <section id="cta" className="py-20 md:py-28 relative overflow-hidden" aria-label="Final call to action">
        <div className="section-container">
          <div className="p-8 md:p-16 rounded-[2.5rem] bg-card border border-border shadow-earth-xl text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
            <div className="blob-terracotta absolute -top-16 -right-16 w-64 h-64 opacity-30" />
            <div className="blob-gold absolute -bottom-16 -left-16 w-64 h-64 opacity-30" />

            <div className="relative z-10 space-y-4">
              <span className="section-label">Join the Gaon</span>
              <h2 className="font-serif text-3xl md:text-5xl text-secondary font-bold leading-tight">
                Your next favourite product may come <br className="hidden sm:block" />
                <span className="text-primary font-devanagari">from a village.</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
                Discover handmade products. Support women-led enterprises. Bring a piece of India home.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/explore-products" className="btn-primary shadow-earth">
                  <Sparkles size={18} />
                  <span>Explore Products</span>
                </Link>
                <button
                  onClick={() => setIsSellerModalOpen(true)}
                  className="btn-outline cursor-pointer"
                >
                  <Store size={18} />
                  <span>Join as a Seller</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-muted-foreground border-t border-border/60">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary" />
                  Authentic handmade products
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary" />
                  Women-led enterprises
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary" />
                  Delivered across India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
