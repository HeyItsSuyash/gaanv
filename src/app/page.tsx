"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { initialProducts } from "@/data/products";
import { initialCategories } from "@/data/categories";

export default function Home() {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const { t, lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const HERO_SLIDES = [
    {
      id: "slide-1",
      headline: t("hero.slide1_title"),
      subhead: t("hero.slide1_sub"),
      ctaLabel: t("hero.cta_explore"),
      ctaHref: "#just-landed",
      mediaUrl: "/shg-women-textiles.jpg",
      alt: "Indian rural women self-help group artisans weaving on traditional looms",
    },
    {
      id: "slide-2",
      headline: t("hero.slide2_title"),
      subhead: t("hero.slide2_sub"),
      ctaLabel: t("hero.cta_shg"),
      ctaHref: "#women-shg",
      mediaUrl: "/shg-women-pottery.jpg",
      alt: "Women SHG potters shaping terracotta pots together in Rajasthan",
    },
    {
      id: "slide-3",
      headline: t("hero.slide3_title"),
      subhead: t("hero.slide3_sub"),
      ctaLabel: t("hero.cta_explore"),
      ctaHref: "#gi-treasures",
      mediaUrl: "/shg-women-crafts.jpg",
      alt: "Tribal women artisan collective proudly holding handcrafted dokra brass",
    },
  ];

  const SHG_GROUPS = [
    {
      id: "shg-1",
      title: t("shg.card1_title"),
      place: t("shg.card1_place"),
      desc: t("shg.card1_desc"),
      image: "/shg-women-crafts.jpg",
      impact: "42 Women • ₹18.4L Payout",
    },
    {
      id: "shg-2",
      title: t("shg.card2_title"),
      place: t("shg.card2_place"),
      desc: t("shg.card2_desc"),
      image: "/shg-women-textiles.jpg",
      impact: "65 Weavers • Direct Fair Wages",
    },
    {
      id: "shg-3",
      title: t("shg.card3_title"),
      place: t("shg.card3_place"),
      desc: t("shg.card3_desc"),
      image: "/shg-women-pottery.jpg",
      impact: "28 Potters • Zero Middlemen",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 2000);
  };

  return (
    <div className="flex flex-col bg-bone text-ink relative">
      {/* Mandana pattern accent overlay in hero */}
      <div className="absolute top-0 inset-x-0 h-96 bg-mandana-pattern opacity-10 pointer-events-none z-0" />

      {/* 1. HERO CAROUSEL: WOMEN SHG ARTISANS FOCUS */}
      <section
        className="relative overflow-hidden bg-bone-d z-10"
        aria-label="Women SHG Rural Artistry Carousel"
      >
        <div className="relative h-[560px] sm:h-[620px] md:h-[700px] w-full">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-[var(--ease-signature)] ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.mediaUrl}
                alt={slide.alt}
                fill
                priority={idx === 0}
                className="object-cover object-center"
                sizes="100vw"
              />

              {/* 90% TRANSPARENT BLACK OVERLAY FOR UNCOMPROMISED TEXT READABILITY */}
              <div
                aria-hidden="true"
                className="absolute inset-0 overlay-black-90"
              />

              {/* Subtle Mandana art pattern on overlay */}
              <div 
                aria-hidden="true"
                className="absolute inset-0 bg-mandana-pattern opacity-15 mix-blend-overlay"
              />
            </div>
          ))}

          {/* Hero Content Overlay */}
          <div className="relative min-h-[560px] sm:h-[620px] md:h-[700px] pointer-events-none z-20 mx-auto flex max-w-[1280px] flex-col justify-end px-5 sm:px-6 pb-12 sm:pb-16 md:px-8 md:pb-20">
            <div className="pointer-events-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[2px] text-brass mb-3 font-mono">
                <span className="w-2 h-2 rounded-full bg-madder animate-pulse" />
                {t("hero.tag")}
              </span>
              <h1 className="font-serif text-ink text-[32px] sm:text-[44px] md:text-[56px] leading-[1.08] tracking-[-1px] font-normal drop-shadow-md">
                {HERO_SLIDES[currentSlide].headline}
              </h1>
              <p className="text-ink-soft mt-4 max-w-xl font-serif text-[16px] sm:text-[18px] md:text-[21px] leading-relaxed drop-shadow">
                {HERO_SLIDES[currentSlide].subhead}
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <Link
                  href={HERO_SLIDES[currentSlide].ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-button font-sans font-semibold transition-all duration-150 ease-[var(--ease-signature)] active:scale-95 whitespace-nowrap bg-brass hover:bg-[#e6a73c] text-[#14110c] h-12 sm:h-14 px-7 sm:px-8 text-[15px] sm:text-[16px] shadow-lg shadow-black/60"
                >
                  {HERO_SLIDES[currentSlide].ctaLabel}
                </Link>
                <a
                  href="#women-shg"
                  className="inline-flex items-center justify-center gap-2 rounded-button font-sans font-medium transition-all duration-150 ease-[var(--ease-signature)] active:scale-95 whitespace-nowrap bg-paper/90 hover:bg-paper text-ink border border-mist h-12 sm:h-14 px-6 text-[15px]"
                >
                  {t("hero.cta_shg")}
                </a>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="pointer-events-auto mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="border border-mist text-ink hover:bg-paper hover:text-brass bg-bone/90 inline-flex h-10 w-10 sm:h-11 sm:w-11 touch-manipulation items-center justify-center rounded-pill transition-all active:scale-95 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="border border-mist text-ink hover:bg-paper hover:text-brass bg-bone/90 inline-flex h-10 w-10 sm:h-11 sm:w-11 touch-manipulation items-center justify-center rounded-pill transition-all active:scale-95 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                </svg>
              </button>

              <ul className="ms-2 flex items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`block h-1.5 rounded-pill transition-all duration-300 ease-[var(--ease-signature)] ${
                        i === currentSlide ? "bg-brass w-8" : "bg-mist hover:bg-stone w-3"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WOMEN SELF HELP GROUPS (SHG) SPOTLIGHT SECTION */}
      <section id="women-shg" className="relative py-16 md:py-24 border-b border-mist/60 bg-bone-d/60">
        <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <header className="mb-12 max-w-2xl">
            <p className="text-[12px] font-mono uppercase tracking-[2px] text-brass mb-2 font-semibold">
              {t("shg.tag")}
            </p>
            <h2 className="font-serif text-h2 text-ink">
              {t("shg.title")}
            </h2>
            <p className="mt-3 text-[16px] text-stone leading-relaxed">
              {t("shg.subtitle")}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SHG_GROUPS.map((group) => (
              <div
                key={group.id}
                className="group relative rounded-card bg-paper border border-mist overflow-hidden shadow-xl hover:border-brass/60 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden bg-bone">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 end-3 bg-bone/90 border border-mist/70 text-brass text-[11px] font-mono font-medium px-2.5 py-1 rounded-pill">
                    {group.impact}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[12px] font-mono uppercase text-madder tracking-wider font-semibold">
                      {group.place}
                    </span>
                    <h3 className="font-serif text-[22px] text-ink mt-1 font-normal group-hover:text-brass transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-[14px] text-ink-soft/90 mt-2.5 leading-relaxed">
                      {group.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-mist/50 flex items-center justify-between text-[13px]">
                    <span className="text-stone">100% Fair Trade Direct</span>
                    <Link
                      href="/explore-products"
                      className="text-brass font-medium hover:underline flex items-center gap-1"
                    >
                      {lang === "hi" ? "शिल्प देखें →" : "View Pieces →"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. JUST LANDED / FRESH CRAFTS THIS WEEK */}
      <section id="just-landed" className="relative mx-auto max-w-[1280px] px-5 sm:px-6 py-16 md:px-8 md:py-24">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-mono text-brass mb-2 uppercase tracking-[2px] font-semibold">
              {t("landed.tag")}
            </p>
            <h2 className="font-serif text-h2 text-ink">
              {t("landed.title")}
            </h2>
            <p className="mt-2 text-[15px] text-stone max-w-xl">
              {t("landed.subtitle")}
            </p>
          </div>
          <Link
            href="/explore-products"
            className="text-[14px] font-semibold text-brass hover:text-[#e6a73c] transition-colors border-b border-brass pb-0.5"
          >
            {t("landed.view_all")} →
          </Link>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {initialProducts.slice(0, 8).map((product) => {
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
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </button>

                  {/* Badges */}
                  <div className="absolute start-2 top-2 flex flex-col gap-1">
                    {(product.tags.includes("gi") || product.isBestseller) && (
                      <span className="bg-[#12100d]/90 text-brass border border-brass/40 text-[10px] font-mono px-2 py-0.5 rounded-xs font-semibold">
                        GI Tag
                      </span>
                    )}
                    <span className="bg-madder/90 text-white text-[9px] font-sans px-1.5 py-0.5 rounded-xs font-medium">
                      SHG Maker
                    </span>
                  </div>

                  {/* Floating Wishlist Button */}
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

                  {/* Quick Add To Bag Button */}
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
                    <p className="font-mono text-[11px] uppercase tracking-wide text-stone">
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
                    <span className="text-[11px] text-stone">
                      ${(product.price / 82).toFixed(1)} USD
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GEOGRAPHICALLY PROTECTED (GI) TREASURES */}
      <section id="gi-treasures" className="relative border-t border-mist bg-bone-d py-16 md:py-24">
        <div className="absolute inset-0 bg-mandana-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <header className="mb-10 max-w-2xl">
            <span className="font-mono text-[12px] uppercase tracking-[2px] text-brass font-semibold">
              {t("gi.tag")}
            </span>
            <h2 className="font-serif text-h2 text-ink mt-1">
              {t("gi.title")}
            </h2>
            <p className="mt-2 text-[15px] text-stone">
              {t("gi.subtitle")}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialCategories.slice(0, 3).map((cat) => (
              <div
                key={cat.id}
                className="group relative rounded-card bg-paper border border-mist overflow-hidden shadow-lg hover:border-brass/60 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-90" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-[20px] text-ink font-normal group-hover:text-brass transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[13px] text-ink-soft/90 mt-1 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-mist/40 flex items-center justify-between text-xs">
                    <span className="font-mono text-stone">GI Protected</span>
                    <Link
                      href="/explore-products"
                      className="text-brass font-medium hover:underline"
                    >
                      {lang === "hi" ? "संग्रह देखें →" : "View Cohort →"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GAON PATRIKA JOURNAL NEWSLETTER */}
      <section className="relative border-t border-mist bg-bone py-16 md:py-24">
        <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-[800px] px-5 sm:px-6 text-center">
          <span className="font-mono text-[12px] uppercase tracking-[2px] text-brass font-semibold">
            {t("journal.tag")}
          </span>
          <h2 className="font-serif text-h2 text-ink mt-2">
            {t("journal.title")}
          </h2>
          <p className="mt-3 text-[15px] text-stone leading-relaxed max-w-xl mx-auto">
            {t("journal.subtitle")}
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t("journal.placeholder")}
              required
              className="w-full sm:flex-1 h-12 rounded-input bg-paper border border-mist px-4 text-ink text-[14px] placeholder-stone focus:outline-none focus:border-brass"
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-12 px-6 rounded-button bg-brass hover:bg-[#e6a73c] text-[#14110c] text-[14px] font-semibold transition-all active:scale-95 shadow-md whitespace-nowrap"
            >
              {t("journal.subscribe")}
            </button>
          </form>

          {newsletterSubscribed && (
            <p className="mt-3 text-xs text-sage font-medium animate-fade-in">
              ✓ {t("journal.success")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
