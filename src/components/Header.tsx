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
      className={`sticky top-0 z-40 transition-colors duration-200 bg-[#241b14] border-b ${
        isScrolled ? "border-[#1a130e] shadow-xl shadow-black/30" : "border-[#382b20]"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Left side: Language Switcher (leftmost button), Mobile toggle & Brand Logo */}
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

          {/* Hindi / English Language Switcher Toggle (Leftmost button) */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language between English and Hindi"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-[#524132] bg-[#2e231a] hover:bg-[#382b20] text-xs font-medium text-[#f7f3ec] transition-all active:scale-95 shadow-sm"
          >
            <span className={lang === "hi" ? "font-bold text-[#d4af37]" : "text-[#a89a88]"}>हिन्दी</span>
            <span className="text-[#524132]">/</span>
            <span className={lang === "en" ? "font-bold text-[#d4af37]" : "text-[#a89a88]"}>EN</span>
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

        {/* Right side: Search, Account & Ghost Style "Sell with us" CTA */}
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#382b20] bg-[#241b14] px-6 py-5 shadow-2xl">
          <div className="flex flex-col gap-4 text-[15px] font-medium">
            <Link
              href="/explore-products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#f7f3ec] hover:text-[#d4af37] py-1"
            >
              {t("nav.explore")}
            </Link>
            <Link
              href="/#women-shg"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#f7f3ec] hover:text-[#d4af37] py-1"
            >
              {t("nav.women_shg")}
            </Link>
            <Link
              href="/#gi-treasures"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#f7f3ec] hover:text-[#d4af37] py-1"
            >
              {t("nav.gi_crafts")}
            </Link>
            <Link
              href="/team"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#f7f3ec] hover:text-[#d4af37] py-1"
            >
              {t("nav.team")}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSellerModalOpen(true);
              }}
              className="text-left text-[#f7f3ec] hover:text-[#d4af37] py-1"
            >
              {t("nav.sell")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
