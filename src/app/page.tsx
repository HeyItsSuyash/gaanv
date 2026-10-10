"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Instagram, Facebook, Users2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { initialProducts } from "@/data/products";
import { initialCategories } from "@/data/categories";

export default function Home() {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const { t, lang } = useLanguage();

  const HERO_SLIDES = [
    {
      id: "slide-1",
      headline: t("hero.slide1_title"),
      subhead: t("hero.slide1_sub"),
      ctaLabel: t("hero.cta_explore"),
      ctaHref: "#just-landed",
      mediaUrl: "/shg-women-proud.jpg",
      alt: "Rural Indian women self-help group members standing proud together side by side with folded hands",
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

  // Circular infinite carousel setup: clone first and last slide
  const [slideIndex, setSlideIndex] = useState(1); // 1 = first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Extended slides with clones: [slide3_clone, slide1, slide2, slide3, slide1_clone]
  const extendedSlides = [
    { ...HERO_SLIDES[HERO_SLIDES.length - 1], id: "clone-last" },
    ...HERO_SLIDES,
    { ...HERO_SLIDES[0], id: "clone-first" },
  ];

  // Map slideIndex to safe real slide index (0, 1, 2)
  const currentSlide = (() => {
    if (!HERO_SLIDES.length) return 0;
    const len = HERO_SLIDES.length;
    // slideIndex: 0 is clone of last slide (index len-1), 1..len are real slides (index 0..len-1), len+1 is clone of first (index 0)
    const normalized = (slideIndex - 1 + len) % len;
    return Math.max(0, Math.min(len - 1, normalized));
  })();

  const activeSlide = HERO_SLIDES[currentSlide] || HERO_SLIDES[0];

  // Handle seamless circular loop jump when reaching clones
  const handleTransitionEnd = () => {
    if (slideIndex >= extendedSlides.length - 1) {
      setIsTransitioning(false);
      setSlideIndex(1);
    } else if (slideIndex <= 0) {
      setIsTransitioning(false);
      setSlideIndex(HERO_SLIDES.length);
    }
  };

  // Re-enable smooth transition with requestAnimationFrame to prevent blank flicker
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Automatic slideshow rotation forward every 3.5 seconds in a continuous circular loop (1->2->3->1->2->3...)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setSlideIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setSlideIndex((prev) => prev - 1);
  };

  const goToSlide = (targetIndex: number) => {
    setIsTransitioning(true);
    setSlideIndex(targetIndex + 1);
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
        className="relative overflow-hidden bg-[#1a130e] z-10 h-[calc(100vh-4rem)] min-h-[580px] w-full"
        aria-label="Women SHG Rural Artistry Carousel"
      >
        {/* Horizontal sliding track with circular looping */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex h-full w-full ${isTransitioning ? "transition-transform duration-700 ease-[var(--ease-signature)]" : ""
            }`}
          style={{ transform: `translateX(-${slideIndex * 100}%)`, willChange: "transform" }}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={`${slide.id}-${idx}`}
              className="relative h-full w-full shrink-0 flex-none overflow-hidden bg-[#241b14]"
            >
              <Image
                src={slide.mediaUrl}
                alt={slide.alt}
                fill
                priority={true}
                unoptimized
                className="object-cover object-center"
                sizes="100vw"
              />

              {/* REAPPLIED SEMI-TRANSPARENT BLACK OVERLAY FOR HIGH CONTRAST READABILITY */}
              <div
                aria-hidden="true"
                className="absolute inset-0 overlay-hero-gradient pointer-events-none"
              />

              {/* Subtle Mandana art pattern on overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-mandana-pattern opacity-10 mix-blend-overlay pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Hero Content Overlay (Fixed on top of slides) */}
        <div className="absolute inset-0 pointer-events-none z-20 mx-auto flex max-w-[1280px] flex-col justify-end px-5 sm:px-6 pb-12 sm:pb-16 md:px-8 md:pb-20">
          <div className="pointer-events-auto max-w-2xl">
            <h1 className="font-serif text-[#ffffff] text-[34px] sm:text-[46px] md:text-[58px] leading-[1.08] tracking-[-1px] font-normal drop-shadow-md">
              {activeSlide?.headline || ""}
            </h1>
            <p className="text-[#f7f3ec] mt-4 max-w-xl font-serif text-[17px] sm:text-[19px] md:text-[21px] leading-relaxed drop-shadow-sm font-light">
              {activeSlide?.subhead || ""}
            </p>
            <div className="mt-6 sm:mt-9 flex flex-row items-center gap-2.5 sm:gap-3.5 flex-nowrap w-full max-w-full overflow-x-visible">
              <Link
                href={activeSlide?.ctaHref || "#just-landed"}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-button font-sans font-semibold transition-all duration-150 ease-[var(--ease-signature)] active:scale-95 whitespace-nowrap bg-[#f7f3ec] hover:bg-[#ffffff] text-[#241b14] h-11 sm:h-14 px-4 sm:px-8 text-[13px] sm:text-[16px] shadow-lg flex-1 sm:flex-initial"
              >
                {activeSlide?.ctaLabel || "Explore"}
              </Link>
              <a
                href="#women-shg"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-button font-sans font-medium transition-all duration-150 ease-[var(--ease-signature)] active:scale-95 whitespace-nowrap bg-transparent hover:bg-[#f7f3ec]/10 text-[#f7f3ec] border border-[#f7f3ec]/80 h-11 sm:h-14 px-3.5 sm:px-7 text-[13px] sm:text-[15px] shadow-sm backdrop-blur-[2px] flex-1 sm:flex-initial"
              >
                {t("hero.cta_shg")}
              </a>
            </div>
          </div>

          {/* Slider Navigation Controls */}
          <div className="pointer-events-auto mt-7 sm:mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="border border-[#f7f3ec]/40 text-[#f7f3ec] hover:bg-[#f7f3ec] hover:text-[#241b14] bg-black/40 inline-flex h-10 w-10 sm:h-11 sm:w-11 touch-manipulation items-center justify-center rounded-pill transition-all active:scale-95 shadow-md backdrop-blur-sm"
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
              className="border border-[#f7f3ec]/40 text-[#f7f3ec] hover:bg-[#f7f3ec] hover:text-[#241b14] bg-black/40 inline-flex h-10 w-10 sm:h-11 sm:w-11 touch-manipulation items-center justify-center rounded-pill transition-all active:scale-95 shadow-md backdrop-blur-sm"
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
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`block h-1.5 rounded-pill transition-all duration-300 ease-[var(--ease-signature)] ${i === currentSlide ? "bg-[#f7f3ec] w-8" : "bg-[#f7f3ec]/40 hover:bg-[#f7f3ec]/70 w-3"
                      }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* National Initiatives Strip: Make in India, ODOP, Viksit Bharat */}
      <section className="bg-bone-d py-4 relative z-20 border-b border-mist/40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="w-full md:w-auto flex items-center justify-center">
            <h3 className="font-serif text-[15px] sm:text-[16px] text-ink font-medium text-center">
              Proudly Handcrafted in India
            </h3>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-10 w-full md:w-auto">
            <div className="relative h-9 w-24 sm:h-10 sm:w-28 opacity-90 hover:opacity-100 transition-opacity">
              <Image src="/mii.png" alt="Make in India" fill className="object-contain" />
            </div>
            <div className="relative h-9 w-20 sm:h-10 sm:w-24 opacity-90 hover:opacity-100 transition-opacity">
              <Image src="/odop-logo.png" alt="One District One Product" fill className="object-contain" />
            </div>
            <div className="relative h-9 w-20 sm:h-10 sm:w-24 opacity-90 hover:opacity-100 transition-opacity">
              <Image src="/viksit india.avif" alt="Viksit Bharat" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WOMEN SELF HELP GROUPS (SHG) SPOTLIGHT SECTION */}
      <section id="women-shg" className="relative py-16 md:py-24 bg-bone-d/60 overflow-hidden">
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.14] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <header className="mb-12 max-w-2xl">
            <h2 className="font-serif text-h2 text-ink">
              {t("shg.title")}
            </h2>
            <p className="mt-3 text-[16px] text-stone leading-relaxed">
              {t("shg.subtitle")}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4 md:pt-6">
            {SHG_GROUPS.map((group, idx) => (
              <div
                key={group.id}
                className={`group relative rounded-card bg-paper border border-mist overflow-hidden shadow-xl hover:border-brass/70 hover:shadow-2xl transition-all duration-300 flex flex-col ${idx === 0
                  ? "md:-translate-y-4"
                  : idx === 1
                    ? "md:translate-y-4"
                    : "md:translate-y-12"
                  }`}
              >
                <div className="relative h-64 w-full overflow-hidden bg-bone">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-transparent" />
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                  <div>
                    <h3 className="font-serif text-[22px] sm:text-[24px] text-ink font-normal group-hover:text-brass transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-[14px] text-ink-soft/90 mt-2.5 leading-relaxed font-serif">
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
      <section id="just-landed" className="relative mx-auto max-w-[1280px] px-5 sm:px-6 py-16 md:px-8 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.10] pointer-events-none" />
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
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
      </section>

      {/* 4. GEOGRAPHICALLY PROTECTED (GI) TREASURES */}
      <section id="gi-treasures" className="relative bg-bone-d py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.14] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <header className="mb-10 max-w-2xl">
            <h2 className="font-serif text-h2 text-ink">
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
                    className="object-cover"
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

          {/* Emotional Cultural Banner: United in Tradition and Joy */}
          <div className="mt-12 rounded-2xl overflow-hidden bg-[#241b14] border border-[#d4af37]/40 shadow-2xl relative">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 text-[#f7f3ec] z-10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold">
                  {lang === "hi" ? "परंपरा, आत्मीयता व उल्लास" : "Living Heritage & Collective Joy"}
                </span>
                <h3 className="font-serif text-[24px] sm:text-[30px] lg:text-[34px] leading-tight text-[#f7f3ec] mt-2 font-normal">
                  {lang === "hi"
                    ? "पारंपरिक धरोहर से जुड़ी मुस्कान: हमारी सबसे बड़ी पूँजी"
                    : "United in Tradition and Joy: The Heartbeat of Indian Craft"}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-[#e2d8c9] leading-relaxed max-w-xl">
                  {lang === "hi"
                    ? "भौगोलिक संकेतक (GI) केवल एक प्रमाण पत्र नहीं, बल्कि उन पीढ़ियों की साधना और सामूहिक उल्लास का प्रतीक है जो अपनी मिट्टी, संस्कृति और प्रकृति से एकरूप होकर हर कृति में प्राण फूँकती हैं।"
                    : "A Geographical Indication (GI) is more than legal protection—it is the living celebration of community bonds, laughter, and generational resilience passed down through centuries of shared artisan life."}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/explore-products"
                    className="inline-flex items-center justify-center rounded-pill border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#241b14] text-[13px] font-semibold px-5 py-2.5 transition-colors"
                  >
                    {lang === "hi" ? "जीआई संग्रह देखें" : "Explore GI Collection"}
                  </Link>
                  <span className="text-xs text-[#a89a88] font-mono">
                    {lang === "hi" ? "28 राज्यों के शिल्पी" : "Handcrafted across 28 States"}
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 relative h-[260px] sm:h-[320px] md:h-full min-h-[280px] w-full overflow-hidden">
                <Image
                  src="/United in Tradition and Joy.png"
                  alt="United in Tradition and Joy - Rural Artisans"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#241b14] via-transparent to-transparent opacity-60 md:opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDIGENOUS THARU TRIBAL ARTISANS OF UTTAR PRADESH SPOTLIGHT */}
      <section id="up-tribes" className="relative pt-16 md:pt-24 pb-0 bg-bone overflow-hidden border-b border-mist/40">
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.08] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Center / Left Editorial Mission Text: UP Govt Focus & Tribal Upliftment */}
            <div className="lg:col-span-7 flex flex-col justify-center pb-12 md:pb-16">
              <h2 className="font-serif text-[28px] sm:text-[36px] lg:text-[44px] text-ink leading-[1.18] font-normal">
                {lang === "hi"
                  ? "थारू जनजाति से आरम्भ: उत्तर प्रदेश सरकार के प्राथमिकता क्षेत्र से जमीनी बदलाव"
                  : "Beginning with the Tharu Tribe: Uplifting the Priority Focus of Uttar Pradesh"}
              </h2>

              <p className="mt-5 text-[15px] sm:text-[16px] text-ink-soft leading-relaxed">
                {lang === "hi"
                  ? "उत्तर प्रदेश सरकार द्वारा बलरामपुर, लखीमपुर खीरी और बहराइच के थारू बाहुल्य गाँवों के सामाजिक एवं आर्थिक विकास को विशेष प्राथमिकता दी गई है। 'गाँव' पहल की शुरुआत सर्वप्रथम थारू जनजाति जैसे हाशिए पर खड़े वनवासी व जनजातीय समुदायों से की जा रही है, ताकि उनकी पारंपरिक शिल्पकला को बाजार से सीधा जोड़कर स्थायी आजीविका और सम्मानजनक उत्थान सुनिश्चित किया जा सके।"
                  : "The Government of Uttar Pradesh has placed a resolute policy focus on the socio-economic empowerment of indigenous Tharu settlements across Balrampur, Lakhimpur Kheri, and the Indo-Nepal terai belt. Gaanv by Mittilok is deliberately directing its initial implementation pipeline towards these very communities—ensuring ancient nature-positive crafts convert directly into dignified, fair-value livelihoods without middleman exploitation."}
              </p>

              <div className="mt-6 pt-6 border-t border-mist/60 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brass mt-1.5 shrink-0" />
                  <p className="text-[14px] sm:text-[15px] text-ink-soft leading-relaxed">
                    <strong className="text-ink font-semibold">
                      {lang === "hi" ? "सरकारी प्राथमिकताओं से समन्वय: " : "Aligned with State Initiatives: "}
                    </strong>
                    {lang === "hi"
                      ? "सुहेलवा वन क्षेत्र की स्वयं सहायता समूहों को डिजिटल कॉमर्स, गुणवत्ता प्रमाणीकरण और पारदर्शी मूल्य संवर्धन का सीधा मंच।"
                      : "Directly complementing state tribal welfare drives with digital market access, transparent escrow payouts, and authentic certification."}
                  </p>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brass mt-1.5 shrink-0" />
                  <p className="text-[14px] sm:text-[15px] text-ink-soft leading-relaxed">
                    <strong className="text-ink font-semibold">
                      {lang === "hi" ? "पारंपरिक मूंज व कसीदाकारी संरक्षण: " : "Moonj Grass & Kasuti Preservation: "}
                    </strong>
                    {lang === "hi"
                      ? "जंगली मूंज के हस्तनिर्मित पात्र और प्राचीन कसूती कढ़ाई को राष्ट्रीय स्तर पर पहचान और सम्मान।"
                      : "Safeguarding ancestral riverine Moonj grass craft and sacred counted-thread embroidery passed through generations."}
                  </p>
                </div>
              </div>

              {/* Action Buttons & Badge: Ghost Style Button without arrow */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/explore-products"
                  className="inline-flex items-center justify-center rounded-pill border border-[#241b14] text-[#241b14] hover:bg-[#241b14] hover:text-[#f7f3ec] text-[14px] font-medium px-6 py-2.5 transition-colors"
                >
                  {lang === "hi" ? "थारू जनजातीय उत्पाद देखें" : "Explore Tharu Crafts"}
                </Link>
                <span className="text-xs text-stone font-mono">
                  {lang === "hi" ? "180+ थारू शिल्पी परिवार जुड़े" : "180+ Artisan Households Impacted"}
                </span>
              </div>
            </div>

            {/* Right: Tharu Tribal Portrait in Traditional Attire (Down to the bottom border) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-end relative self-end">
              {/* High-res large portrait container flush with the bottom border */}
              <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] h-[480px] sm:h-[580px] lg:h-[640px] flex items-end justify-center">
                <Image
                  src="/tharu-girl-namaste.png"
                  alt="Tharu Tribal Girl in Traditional Cultural Attire Welcoming with Namaste"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR TEAM SECTION (PLACED DIRECTLY AFTER THARU TRIBE) */}
      <section id="team" className="relative py-16 md:py-24 bg-bone-d/50 overflow-hidden border-b border-mist/50">
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.05] pointer-events-none" />
        <div className="relative mx-auto max-w-[1120px] px-5 sm:px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-[32px] sm:text-[40px] text-ink font-normal tracking-tight">
              {lang === "hi" ? "हमारी टीम" : "Our Team"}
            </h2>
            <p className="mt-2.5 text-[15px] sm:text-[16px] text-stone leading-relaxed font-serif">
              {lang === "hi"
                ? "गाँव बाय मिट्टीलोक के निर्माता, सलाहकार और तकनीकी नेतृत्व"
                : "The leadership, mentorship, and engineering minds behind Gaanv by Mittilok"}
            </p>
          </div>

          {/* 1. Co-Founders */}
          <div className="mb-16">
            <h3 className="font-serif text-[22px] sm:text-[24px] text-ink font-normal text-center mb-10 pb-2 border-b border-mist/60 max-w-xs mx-auto">
              {lang === "hi" ? "सह-संस्थापक" : "Co-Founders"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto">
              {[
                {
                  name: "Gaurav Srivastav",
                  role: lang === "hi" ? "सह-संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO)" : "Co-Founder & Chief Executive Officer",
                  photo: "/founderceo.jpg",
                  points: [
                    lang === "hi" ? "मिशन व ग्रामीण वाणिज्य रणनीति" : "Mission architecture & rural commerce strategy",
                    lang === "hi" ? "बलरामपुर एवं तराई क्लस्टर विस्तार" : "Balrampur & Terai artisan network development",
                  ],
                },
                {
                  name: "Vijay Upadhyay",
                  role: lang === "hi" ? "सह-संस्थापक एवं मुख्य परिचालन अधिकारी (COO)" : "Co-Founder & Chief Operating Officer",
                  photo: "/foundercoo.png",
                  points: [
                    lang === "hi" ? "ज़मीनी फील्ड लॉजिस्टिक्स व आपूर्ति श्रृंखला" : "Grassroots operations & supply chain integrity",
                    lang === "hi" ? "कारीगर ऑनबोर्डिंग एवं प्रत्यक्ष भुगतान" : "Artisan collective onboarding & direct payouts",
                  ],
                },
              ].map((person, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="relative mb-4">
                    <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-[#ddd4c4]/60 border border-mist shadow-sm">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          unoptimized
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="font-serif text-[20px] font-semibold text-ink leading-tight">
                    {person.name}
                  </h4>
                  <p className="text-[#9b3d2b] text-[13px] font-medium mt-1">
                    {person.role}
                  </p>
                  <ul className="mt-2.5 space-y-1 text-stone text-[13px] font-sans text-center max-w-xs">
                    {person.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-snug">• {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Technical Mentor */}
          <div className="mb-16">
            <h3 className="font-serif text-[22px] sm:text-[24px] text-ink font-normal text-center mb-10 pb-2 border-b border-mist/60 max-w-xs mx-auto">
              {lang === "hi" ? "तकनीकी सलाहकार" : "Technical Mentor"}
            </h3>

            <div className="flex justify-center">
              <div className="flex flex-col items-center text-center group max-w-sm">
                <div className="relative mb-4">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-[#ddd4c4]/60 border border-mist shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                      <Image
                        src="/archanamam.jpeg"
                        alt="Archana Nirvalla"
                        fill
                        unoptimized
                        className="object-cover object-[center_20%]"
                      />
                    </div>
                  </div>
                </div>
                <h4 className="font-serif text-[20px] font-semibold text-ink leading-tight">
                  Archana Nirvalla
                </h4>
                <p className="text-[#9b3d2b] text-[13px] font-medium mt-1">
                  {lang === "hi" ? "तकनीकी सलाहकार एवं मेंटर" : "Technical Mentor"}
                </p>
                <ul className="mt-2.5 space-y-1 text-stone text-[13px] font-sans text-center max-w-xs">
                  <li className="leading-snug">
                    • {lang === "hi" ? "एमएससी कंप्यूटर साइंस (डिस्टिंक्शन), यूके" : "MSc Computer Science (Distinction), UK"}
                  </li>
                  <li className="leading-snug">
                    • {lang === "hi" ? "महिला उद्यमियों के लिए डिजिटल मार्ग निर्माण" : "Building digital pathways for women entrepreneurs"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Technical Heads */}
          <div className="mb-16">
            <h3 className="font-serif text-[22px] sm:text-[24px] text-ink font-normal text-center mb-10 pb-2 border-b border-mist/60 max-w-xs mx-auto">
              {lang === "hi" ? "तकनीकी प्रमुख" : "Technical Heads"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto">
              {[
                {
                  name: "Suyash Shukla",
                  role: lang === "hi" ? "तकनीकी प्रमुख (Technical Head)" : "Technical Head",
                  photo: "/suyashshukla.jpg",
                  points: [
                    lang === "hi" ? "प्लेटफ़ॉर्म इंजीनियरिंग एवं कोर आर्किटेक्चर" : "Platform engineering & core web architecture",
                    lang === "hi" ? "सुरक्षा, परफॉर्मेंस व डिजिटल अनुभव" : "System performance, security & user experience",
                  ],
                },
                {
                  name: "Shailendra Mani Pandey",
                  role: lang === "hi" ? "तकनीकी प्रमुख (Technical Head)" : "Technical Head",
                  photo: null,
                  points: [
                    lang === "hi" ? "सिस्टम इंफ्रास्ट्रक्चर एवं डेटा पाइपलाइन्स" : "Infrastructure systems & data pipeline design",
                    lang === "hi" ? "लॉजिस्टिक्स व परिचालन तकनीकी समाधान" : "Operational tooling & logistical integrations",
                  ],
                },
              ].map((person, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="relative mb-4">
                    <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-[#ddd4c4]/60 border border-mist shadow-sm">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                        {person.photo ? (
                          <Image
                            src={person.photo}
                            alt={person.name}
                            fill
                            unoptimized
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone">
                            <User className="w-14 h-14 text-stone/60" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-serif text-[20px] font-semibold text-ink leading-tight">
                    {person.name}
                  </h4>
                  <p className="text-[#9b3d2b] text-[13px] font-medium mt-1">
                    {person.role}
                  </p>
                  <ul className="mt-2.5 space-y-1 text-stone text-[13px] font-sans text-center max-w-xs">
                    {person.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-snug">• {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Trust & Community Metrics (Counters Design) */}
          <div className="pt-12 border-t border-mist/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="font-serif text-[22px] sm:text-[28px] text-ink font-normal leading-relaxed">
                {lang === "hi"
                  ? "हमारे मिशन में विश्वास करने वालों का भरोसा"
                  : "Followed by the trust of the ones who believe in our mission"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto text-center divide-y sm:divide-y-0 sm:divide-x divide-mist/60">
              {/* Instagram Metric */}
              <div className="flex flex-col items-center pt-4 sm:pt-0">
                <div className="w-11 h-11 rounded-full bg-bone-d flex items-center justify-center text-[#9b3d2b] mb-2.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="font-serif text-[38px] sm:text-[46px] font-semibold text-ink tracking-tight tabular-nums">
                  80k+
                </span>
                <p className="text-stone text-[14px] font-medium mt-0.5">
                  {lang === "hi" ? "फॉलोअर्स इंस्टाग्राम पर" : "Followers on Instagram"}
                </p>
              </div>

              {/* Facebook Metric */}
              <div className="flex flex-col items-center pt-6 sm:pt-0 sm:ps-6">
                <div className="w-11 h-11 rounded-full bg-bone-d flex items-center justify-center text-[#2c4263] mb-2.5">
                  <Facebook className="w-5 h-5" />
                </div>
                <span className="font-serif text-[38px] sm:text-[46px] font-semibold text-ink tracking-tight tabular-nums">
                  80k+
                </span>
                <p className="text-stone text-[14px] font-medium mt-0.5">
                  {lang === "hi" ? "फॉलोअर्स फेसबुक पर" : "Followers on Facebook"}
                </p>
              </div>

              {/* Customers Metric */}
              <div className="flex flex-col items-center pt-6 sm:pt-0 sm:ps-6">
                <div className="w-11 h-11 rounded-full bg-bone-d flex items-center justify-center text-[#967432] mb-2.5">
                  <Users2 className="w-5 h-5" />
                </div>
                <span className="font-serif text-[38px] sm:text-[46px] font-semibold text-ink tracking-tight tabular-nums">
                  1000+
                </span>
                <p className="text-stone text-[14px] font-medium mt-0.5">
                  {lang === "hi" ? "संतुष्ट ग्राहक" : "Customers till date"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOUNDER'S TESTIMONY: ROOTED IN UTTAR PRADESH */}
      <section className="relative py-14 md:py-20 bg-[#241b14] text-[#f7f3ec] overflow-hidden">
        {/* Warli art patterns behind the card across the section */}
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.14] pointer-events-none" />
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.06] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          {/* Outer Quote Block Card with zero padding between image and quote text and internal Warli texture */}
          <div className="relative rounded-card bg-[#1a130e] border border-[#3d2e22] shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch p-0">
            {/* Subtle Warli design inside the card container */}
            <div className="absolute inset-0 bg-warli-pattern opacity-[0.07] pointer-events-none z-0" />

            {/* Founder Image: Full height of the quotes container, auto-scaled width without skewing, zero padding */}
            <div className="relative z-10 w-full md:w-[320px] lg:w-[360px] min-h-[360px] md:min-h-full shrink-0 bg-[#120d09] p-0 m-0">
              <Image
                src="/founderceo.jpg"
                alt="Gaurav Srivastav - Founder and CEO"
                fill
                priority
                unoptimized
                className="object-cover object-top p-0 m-0"
              />
            </div>

            {/* Seamless Quote Content Column directly attached without gap */}
            <div className="relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 border-t md:border-t-0 md:border-s border-[#3d2e22]">
              <div>
                <blockquote className="font-serif text-[18px] sm:text-[21px] md:text-[23px] leading-relaxed text-[#f7f3ec] font-light italic">
                  {lang === "hi"
                    ? "“जब मैंने बलरामपुर के थारू गाँवों और खुर्जा के कुम्हार मुहल्लों की यात्रा की, तो देखा कि सदियों पुरानी कारीगरी बिचौलियों के चंगुल में दम तोड़ रही थी। 'गाँव बाय मिट्टीलोक' को हमने उत्तर प्रदेश से इसलिए विकसित किया ताकि हमारी माटी की पहचान को किसी विदेशी मंच या भारी कमीशन की मोहताजी न रहे। यहाँ हर रुपया सीधे कारीगर दीदी के बैंक खाते में जाता है।”"
                    : "“Walking through the Tharu tribal settlements in Balrampur and the wood-fired kiln gullies of Khurja, one stark truth became clear: the real keepers of India's aesthetic soul were surviving on pennies while intermediaries pocketed 400% markups. We engineered Gaanv by Mittilok right here from Uttar Pradesh with a non-negotiable principle: direct escrow payments, verified GI certificates, and 100% dignity for every rural sister.”"}
                </blockquote>
              </div>

              {/* Founder Signoff Below Quote */}
              <div className="mt-8 pt-6 border-t border-[#3d2e22]/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 className="font-serif text-[19px] sm:text-[21px] text-[#f7f3ec] font-semibold tracking-wide">
                    Gaurav Srivastav
                  </h4>
                  <p className="text-[13px] sm:text-[14px] text-[#d4af37] font-sans tracking-wide mt-0.5">
                    Founder and CEO, Mittilok and Mittilok Gaon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GAON PATRIKA JOURNAL NEWSLETTER WITH AUTHENTIC RURAL LETTERS BACKGROUND */}
      <section className="relative bg-bone py-20 md:py-28 overflow-hidden">
        {/* Authentic Rural Letters from India background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/rural-letters-bg.jpg"
            alt="Letters from rural India"
            fill
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bone/95 via-bone/85 to-bone/95" />
        </div>

        <div className="relative z-10 mx-auto max-w-[800px] px-5 sm:px-6 text-center">

          <h2 className="font-serif text-[32px] sm:text-[40px] text-ink font-normal leading-tight">
            {t("journal.title")}
          </h2>
          <p className="mt-3 text-[16px] text-stone leading-relaxed max-w-xl mx-auto font-serif">
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
              className="w-full sm:flex-1 h-12 rounded-input bg-paper/90 border border-mist px-4 text-ink text-[14px] placeholder-stone focus:outline-none focus:border-brass shadow-sm"
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
