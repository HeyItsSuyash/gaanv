"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
      className={`sticky top-0 z-40 transition-colors duration-200 bg-[#241b14] border-b ${isScrolled ? "border-[#1a130e] shadow-xl shadow-black/30" : "border-[#382b20]"
        }`}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Left side: Mobile toggle & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#f7f3ec] -ms-1 inline-flex h-11 w-11 items-center justify-center md:hidden"
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

          {/* Official Gaav Brand Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex items-center focus-visible:outline-madder py-1"
          >
            <div className="relative h-11 w-32 sm:h-12 sm:w-36">
              <Image
                src="/gaon-logo.png"
                alt="Gaanv by Mittilok"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* Center Editorial Navigation (centered in navbar) */}
        <div className="hidden md:flex items-center gap-7 text-[14px]">
          <Link
            href="/explore-products"
            className="group relative py-1 text-[#e2d8c9] hover:text-[#ffffff] transition-colors font-medium"
          >
            {t("nav.explore")}
            <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#d4af37] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link
            href="/#women-shg"
            className="group relative py-1 text-[#e2d8c9] hover:text-[#ffffff] transition-colors font-medium"
          >
            {t("nav.women_shg")}
            <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#d4af37] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link
            href="/#gi-treasures"
            className="group relative py-1 text-[#e2d8c9] hover:text-[#ffffff] transition-colors font-medium"
          >
            {t("nav.gi_crafts")}
            <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#d4af37] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link
            href="/team"
            className="group relative py-1 text-[#e2d8c9] hover:text-[#ffffff] transition-colors font-medium"
          >
            {t("nav.team")}
            <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#d4af37] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        </div>

        {/* Right side: Search, Language Icon (to the right of search), Account & Ghost Style "Sell with us" CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="text-[#f7f3ec] hover:text-[#d4af37] inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-pill transition-colors focus-visible:outline-madder"
            aria-label="Search rural crafts"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </button>

          {/* Minimalist Language Toggle: 'A' for English, 'अ' for Hindi without circle or yellow subtext */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={`Switch language to ${lang === "en" ? "Hindi" : "English"}`}
            title={`Switch language (${lang === "en" ? "हिन्दी" : "English"})`}
            className="text-[#f7f3ec] hover:text-[#d4af37] px-2 py-1 transition-colors text-[17px] font-serif font-bold tracking-tight focus-visible:outline-madder select-none"
          >
            {lang === "hi" ? "अ" : "A"}
          </button>

          {/* User Account */}
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="text-[#f7f3ec] hover:text-[#d4af37] inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-pill transition-colors focus-visible:outline-madder"
            aria-label="Account"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </button>

          {/* Ghost Style "Sell with us" CTA Button to the right */}
          <button
            type="button"
            onClick={() => setIsSellerModalOpen(true)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-pill border border-[#d4af37]/80 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#241b14] text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm"
          >
            {t("nav.sell")}
          </button>
        </div>
      </nav>

      {/* Full Page Mobile Dropdown Menu with Rich Animations & Centered Links (Higher z-index than chatbot) */}
      <div
        className={`fixed inset-0 z-[70] bg-[#241b14] text-[#f7f3ec] flex flex-col justify-between transition-all duration-300 md:hidden ${mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
          }`}
      >
        {/* Subtle authentic patterns in background */}
        <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.07] pointer-events-none" />

        {/* Mobile Header Bar inside full-screen menu */}
        <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:px-6 border-b border-[#382b20]">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center"
          >
            <div className="relative h-10 w-32">
              <Image
                src="/gaon-logo.png"
                alt="Gaanv by Mittilok"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="text-[#f7f3ec] hover:text-[#d4af37] p-2 rounded-full border border-[#524132] bg-[#1a130e] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        </div>

        {/* Centered Navigation Links with staggered animation feel */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-8 text-center space-y-6">
          <Link
            href="/explore-products"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-[26px] sm:text-[30px] font-normal text-[#f7f3ec] hover:text-[#d4af37] transition-all hover:scale-105 active:scale-95 tracking-wide"
          >
            {t("nav.explore")}
          </Link>

          <Link
            href="/#women-shg"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-[26px] sm:text-[30px] font-normal text-[#f7f3ec] hover:text-[#d4af37] transition-all hover:scale-105 active:scale-95 tracking-wide"
          >
            {t("nav.women_shg")}
          </Link>

          <Link
            href="/#gi-treasures"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-[26px] sm:text-[30px] font-normal text-[#f7f3ec] hover:text-[#d4af37] transition-all hover:scale-105 active:scale-95 tracking-wide"
          >
            {t("nav.gi_crafts")}
          </Link>

          <Link
            href="/team"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-[26px] sm:text-[30px] font-normal text-[#f7f3ec] hover:text-[#d4af37] transition-all hover:scale-105 active:scale-95 tracking-wide"
          >
            {t("nav.team")}
          </Link>

          <div className="w-16 h-px bg-[#3d2e22] my-2" />

          {/* Ghost Style "Sell with us" CTA inside Menu */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSellerModalOpen(true);
            }}
            className="px-6 py-2.5 rounded-pill border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#241b14] text-[15px] font-semibold tracking-wide transition-all active:scale-95 shadow-md"
          >
            {t("nav.sell")}
          </button>
        </div>

        {/* Bottom Bar: Language & Social / Region */}
        <div className="relative z-10 p-6 border-t border-[#382b20] flex items-center justify-between text-xs text-[#a89a8a] font-mono">
          <span>Proudly Made in India</span>
          <button
            type="button"
            onClick={() => {
              toggleLang();
            }}
            className="text-[#d4af37] font-semibold border border-[#524132] px-3 py-1 rounded-pill bg-[#1a130e]"
          >
            {lang === "hi" ? "Switch to English" : "हिन्दी में बदलें"}
          </button>
        </div>
      </div>
    </header>
  );
}
