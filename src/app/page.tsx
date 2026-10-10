"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

  // Map slideIndex to real slide index (0, 1, 2)
  const currentSlide =
    slideIndex === 0
      ? HERO_SLIDES.length - 1
      : slideIndex === extendedSlides.length - 1
        ? 0
        : slideIndex - 1;

  // Handle seamless circular loop jump when reaching clones
  const handleTransitionEnd = () => {
    if (slideIndex === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setSlideIndex(1);
    } else if (slideIndex === 0) {
      setIsTransitioning(false);
      setSlideIndex(HERO_SLIDES.length);
    }
  };

  // Re-enable smooth transition whenever slideIndex changes
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Automatic slideshow rotation forward every 3 seconds in a continuous circular loop (1->2->3->1->2->3...)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
    }, 3000);
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
        className="relative overflow-hidden bg-bone-d z-10 h-[calc(100vh-4rem)] min-h-[580px] w-full"
        aria-label="Women SHG Rural Artistry Carousel"
      >
        {/* Horizontal sliding track with circular looping */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex h-full w-full ${isTransitioning ? "transition-transform duration-700 ease-[var(--ease-signature)]" : ""
            }`}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={`${slide.id}-${idx}`}
              className="relative h-full w-full shrink-0 flex-none overflow-hidden"
            >
              <Image
                src={slide.mediaUrl}
                alt={slide.alt}
                fill
                priority={idx === 1}
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
              {HERO_SLIDES[currentSlide].headline}
            </h1>
            <p className="text-[#f7f3ec] mt-4 max-w-xl font-serif text-[17px] sm:text-[19px] md:text-[21px] leading-relaxed drop-shadow-sm font-light">
              {HERO_SLIDES[currentSlide].subhead}
            </p>
            <div className="mt-7 sm:mt-9 flex flex-wrap gap-3.5">
              <Link
                href={HERO_SLIDES[currentSlide].ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-button font-sans font-semibold transition-all duration-150 ease-[var(--ease-signature)] active:scale-95 whitespace-nowrap bg-[#f7f3ec] hover:bg-[#ffffff] text-[#241b14] h-12 sm:h-14 px-8 text-[15px] sm:text-[16px] shadow-lg"
              >
                {HERO_SLIDES[currentSlide].ctaLabel}
              </Link>
              <a
                href="#women-shg"
                className="inline-flex items-center justify-center gap-2 rounded-button font-sans font-medium transition-all duration-150 ease-[var(--ease-signature)] active:scale-95 whitespace-nowrap bg-transparent hover:bg-[#f7f3ec]/10 text-[#f7f3ec] border border-[#f7f3ec]/80 h-12 sm:h-14 px-7 text-[15px] shadow-sm backdrop-blur-[2px]"
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
      <section className="bg-bone-d py-4 relative z-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
              Proudly Handcrafted in India
            </span>
          </div>

          <div className="flex items-center gap-6 sm:gap-10">
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
        </div>
      </section>

      {/* 5. INDIGENOUS TRIBAL ARTISANS OF UTTAR PRADESH SPOTLIGHT */}
      <section id="up-tribes" className="relative py-16 md:py-24 bg-bone overflow-hidden">
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.12] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <header className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 border border-[#524132] bg-[#241b14] text-[#d4af37] text-[11px] font-mono px-3 py-1 rounded-pill uppercase tracking-wider mb-3">
              {lang === "hi" ? "तराई एवं विंध्य की विरासत • उत्तर प्रदेश" : "Roots in Terai & Vindhyas • Uttar Pradesh"}
            </span>
            <h2 className="font-serif text-h2 text-ink">
              {lang === "hi"
                ? "उत्तर प्रदेश की जनजातीय शिल्प धरोहर: बलरामपुर के थारू और विंध्य के कोल"
                : "Indigenous Tribal Heritage of UP: Balrampur's Tharu & The Vindhyan Guilds"}
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-stone leading-relaxed">
              {lang === "hi"
                ? "उत्तर प्रदेश केवल शहरों का नहीं, बल्कि तराई के घने जंगलों और सोनभद्र की पहाड़ियों में बसी समृद्ध जनजातीय परंपराओं का भी घर है। बलरामपुर और श्रावस्ती के सीमावर्ती जंगलों में रहने वाला 'थारू समाज' अपनी प्रकृति-संरक्षित जीवनशैली और हाथ से गढ़े मूंज-सिकाई शिल्पों के लिए प्रख्यात है।"
                : "Beyond UP's historic cities lies a pristine tribal legacy stretching from the Terai foothills of Balrampur to the craggy plateaus of Sonbhadra. In Balrampur's Suhelwa forest fringes, the indigenous Tharu women weave wild Moonj grass into sacred household art."}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Tharu of Balrampur */}
            <div className="group rounded-card bg-paper border-2 border-brass/40 hover:border-brass p-6 sm:p-7 shadow-xl transition-all flex flex-col justify-between relative overflow-hidden">
              <div>
                <h3 className="font-serif text-[22px] text-ink font-normal group-hover:text-brass transition-colors">
                  {lang === "hi" ? "थारू जनजाति (Tharu Tribe)" : "Tharu Tribe of Balrampur"}
                </h3>
                <p className="text-[14px] text-ink-soft/90 mt-3 leading-relaxed">
                  {lang === "hi"
                    ? "बलरामपुर जिले के पचपेड़वा, गैंसड़ी और सुहेलवा वन क्षेत्र के थारू गाँवों में महिलाएँ दलिया, मौनी और मूंज के टोकरे बनाती हैं। साथ ही विवाहों में अपनी बेटियों को दिए जाने वाले थारू कसूती लहंगे व कशीदाकारी में प्राचीन वन-प्रतीकों का प्रयोग होता है।"
                    : "Living along Balrampur's Suhelwa forest belt (Pachperwa, Gainsari), Tharu matriarchs coil wild Moonj grass using bone awls. Their vivid Kasuti needlework features ancient sacred hornbill, peacock, and river motifs."}
                </p>
                <div className="mt-4 bg-bone-d/70 p-3 rounded-input text-xs text-stone space-y-1">
                  <p><strong className="text-ink">Craft Speciality:</strong> Hand-coiled Moonj & Sikki Baskets, Tribal Kasuti</p>
                  <p><strong className="text-ink">Natural Colors:</strong> Palash flower yellows, Catechu brown</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-mist/50 flex items-center justify-between text-xs">
                <span className="font-mono text-stone">180+ Women Co-ops</span>
                <Link href="/explore-products" className="text-brass font-medium hover:underline">
                  {lang === "hi" ? "थारू शिल्प देखें →" : "View Tharu Pieces →"}
                </Link>
              </div>
            </div>

            {/* Card 2: Kol & Baiga Tribe */}
            <div className="group rounded-card bg-paper border border-mist hover:border-brass/60 p-6 sm:p-7 shadow-lg transition-all flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-[22px] text-ink font-normal group-hover:text-brass transition-colors">
                  {lang === "hi" ? "कोल एवं बैगा जनजाति (Kol & Baiga)" : "Kol & Baiga Forest Guilds"}
                </h3>
                <p className="text-[14px] text-ink-soft/90 mt-3 leading-relaxed">
                  {lang === "hi"
                    ? "सोनभद्र और मीरजापुर की पहाड़ियों में निवास करने वाले कोल और बैगा समुदाय जंगलों से प्राकृतिक लाह (Natural Lac) एकत्र कर शुद्ध लाख की चूड़ियाँ, लकड़ी के खिलौने और हाथ से बुनी दरियाँ तैयार करते हैं।"
                    : "Dwelling in southern UP's rugged Vindhyan ranges, the Kol and Baiga artisans harvest non-timber forest lac to create vibrant organic lac bangles and hand-knotted natural wool rugs with tribal geometrics."}
                </p>
                <div className="mt-4 bg-bone-d/70 p-3 rounded-input text-xs text-stone space-y-1">
                  <p><strong className="text-ink">Craft Speciality:</strong> Forest Lac Ornaments, Flat-weave Dhurries</p>
                  <p><strong className="text-ink">Region:</strong> Sonbhadra, Chandauli & Mirzapur</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-mist/50 flex items-center justify-between text-xs">
                <span className="font-mono text-stone">95+ Artisans</span>
                <Link href="/explore-products" className="text-brass font-medium hover:underline">
                  {lang === "hi" ? "विंध्य शिल्प देखें →" : "Explore Cohort →"}
                </Link>
              </div>
            </div>

            {/* Card 3: Sahariya & Gond Tribe */}
            <div className="group rounded-card bg-paper border border-mist hover:border-brass/60 p-6 sm:p-7 shadow-lg transition-all flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-[22px] text-ink font-normal group-hover:text-brass transition-colors">
                  {lang === "hi" ? "सहरिया जनजाति (Sahariya Tribe)" : "Sahariya Tribal Weavers"}
                </h3>
                <p className="text-[14px] text-ink-soft/90 mt-3 leading-relaxed">
                  {lang === "hi"
                    ? "ललितपुर और झाँसी के सीमावर्ती जंगलों के सहरिया आदिवासी पत्तों की कला, प्राकृतिक गोंद और हाथ से काते गए खद्दर वस्त्रों के निर्माण में दक्ष हैं। इनका ज्ञान सदियों से वनों के सह-अस्तित्व पर आधारित है।"
                    : "Native to the dry-deciduous Bundelkhand forests around Lalitpur, Sahariya tribal clusters craft herbal forest fibers and organic rough-spun cotton shawls, upholding sustainable zero-carbon practices."}
                </p>
                <div className="mt-4 bg-bone-d/70 p-3 rounded-input text-xs text-stone space-y-1">
                  <p><strong className="text-ink">Craft Speciality:</strong> Wild Herb Fiber Weaving, Clay Murals</p>
                  <p><strong className="text-ink">Tradition:</strong> 100% Forest-sourced Raw Materials</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-mist/50 flex items-center justify-between text-xs">
                <span className="font-mono text-stone">Bundelkhand Base</span>
                <Link href="/explore-products" className="text-brass font-medium hover:underline">
                  {lang === "hi" ? "शिल्प देखें →" : "View Pieces →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER'S TESTIMONY: ROOTED IN UTTAR PRADESH (FULL WIDTH) */}
      <section className="relative py-16 md:py-24 bg-[#241b14] text-[#f7f3ec] overflow-hidden">
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.08] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center">
            {/* Founder Passport Size Photo with Clean Framing */}
            <div className="flex flex-col items-center text-center flex-shrink-0">
              <div className="relative w-36 h-48 sm:w-40 sm:h-52 rounded-md overflow-hidden border-4 border-[#3d2e22] shadow-2xl bg-[#1a130e]">
                <Image
                  src="/gauri-avatar.jpg"
                  alt="XYZ - Founder"
                  fill
                  className="object-cover object-top"
                />

              </div>
              <div className="mt-3 bg-white text-[#1a1510] px-4 py-1.5 rounded-sm shadow-md font-serif font-bold text-[16px] tracking-wide">
                XYZ
              </div>
            </div>

            {/* Full Width Founder Note */}
            <div className="flex-1 border-t md:border-t-0 md:border-s border-[#3d2e22] pt-6 md:pt-0 md:ps-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#d4af37] font-mono text-xs uppercase tracking-widest font-semibold">
                    {lang === "hi" ? "संस्थापक का संदेश • उत्तर प्रदेश की ज़मीन से" : "Founder's Testimony • From the Soil of Uttar Pradesh"}
                  </span>
                  <span className="h-px flex-1 bg-[#3d2e22]"></span>
                </div>

                <blockquote className="font-serif text-[18px] sm:text-[21px] md:text-[23px] leading-relaxed text-[#f7f3ec] font-light italic">
                  {lang === "hi"
                    ? "“जब मैंने बलरामपुर के थारू गाँवों और खुर्जा के कुम्हार मुहल्लों की यात्रा की, तो देखा कि सदियों पुरानी कारीगरी बिचौलियों के चंगुल में दम तोड़ रही थी। 'गाँव बाय मिट्टीलोक' को हमने उत्तर प्रदेश से इसलिए विकसित किया ताकि हमारी माटी की पहचान को किसी विदेशी मंच या भारी कमीशन की मोहताजी न रहे। यहाँ हर रुपया सीधे कारीगर दीदी के बैंक खाते में जाता है।”"
                    : "“Walking through the Tharu tribal settlements in Balrampur and the wood-fired kiln gullies of Khurja, one stark truth became clear: the real keepers of India's aesthetic soul were surviving on pennies while intermediaries pocketed 400% markups. We engineered Gaanv by Mittilok right here from Uttar Pradesh with a non-negotiable principle — direct escrow payments, verified GI certificates, and 100% dignity for every rural sister.”"}
                </blockquote>


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
