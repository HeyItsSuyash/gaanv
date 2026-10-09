"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const {
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsLoginOpen,
    setIsSellerModalOpen,
  } = useCart();

  const { lang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 bg-bone/95 backdrop-none border-b ${
        isScrolled ? "border-mist shadow-lg shadow-black/40" : "border-mist/40"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Mobile menu toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-ink -ms-1 inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,1,0-16H40a8,8,0,0,1,0,16ZM216,184H40a8,8,0,0,1,0,16H216a8,8,0,0,1,0-16Z"></path>
            </svg>
          </button>

          {/* Gaanv by Mittilok Wordmark */}
          <Link
            href="/"
            aria-label="Gaanv by Mittilok home"
            className="inline-flex items-baseline gap-1.5 focus-visible:outline-madder"
          >
            <span className="font-serif text-[26px] sm:text-[30px] font-normal tracking-[-0.5px] text-ink lowercase">
              gaanv
            </span>
            <span className="font-mono text-[11px] text-brass uppercase tracking-[1.5px] font-medium">
              by mittilok
            </span>
          </Link>
        </div>

        {/* Center Editorial Navigation */}
        <div className="hidden md:flex items-center gap-6 text-[14px]">
          <Link
            href="/explore-products"
            className="text-ink-soft hover:text-ink transition-colors font-medium"
          >
            {t("nav.explore")}
          </Link>
          <Link
            href="/#women-shg"
            className="text-ink-soft hover:text-ink transition-colors font-medium flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-madder inline-block" />
            {t("nav.women_shg")}
          </Link>
          <Link
            href="/#gi-treasures"
            className="text-ink-soft hover:text-ink transition-colors font-medium"
          >
            {t("nav.gi_crafts")}
          </Link>
          <button
            type="button"
            onClick={() => setIsSellerModalOpen(true)}
            className="text-ink-soft hover:text-ink transition-colors font-medium"
          >
            {t("nav.sell")}
          </button>
        </div>

        {/* Right Action Icons & Language Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Hindi / English Language Switcher Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language between English and Hindi"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-mist bg-paper hover:bg-bone-d text-xs font-medium text-ink transition-all active:scale-95 shadow-sm"
          >
            <span className="text-[13px]">🌐</span>
            <span className={lang === "hi" ? "font-bold text-brass" : "text-stone"}>हिन्दी</span>
            <span className="text-mist">/</span>
            <span className={lang === "en" ? "font-bold text-brass" : "text-stone"}>EN</span>
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="text-ink hover:text-brass inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-pill transition-colors focus-visible:outline-madder"
            aria-label="Search rural crafts"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </button>

          {/* User Account */}
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="text-ink hover:text-brass inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-pill transition-colors focus-visible:outline-madder"
            aria-label="Account"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </button>

          {/* Shopping Bag Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative text-ink hover:text-brass inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-pill transition-colors focus-visible:outline-madder"
            aria-label="View shopping bag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 end-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-madder text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-mist bg-bone px-6 py-5 shadow-2xl">
          <div className="flex flex-col gap-4 text-[15px] font-medium">
            <Link
              href="/explore-products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink hover:text-brass py-1"
            >
              {t("nav.explore")}
            </Link>
            <Link
              href="/#women-shg"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink hover:text-brass py-1 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-madder inline-block" />
              {t("nav.women_shg")}
            </Link>
            <Link
              href="/#gi-treasures"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink hover:text-brass py-1"
            >
              {t("nav.gi_crafts")}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSellerModalOpen(true);
              }}
              className="text-left text-ink hover:text-brass py-1"
            >
              {t("nav.sell")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
