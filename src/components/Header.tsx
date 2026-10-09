"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User as UserIcon,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsLoginOpen,
    setIsSellerModalOpen,
    user,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      window.location.href = `/explore-products?search=${encodeURIComponent(mobileSearchQuery.trim())}`;
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
          isScrolled ? "bg-white/70 backdrop-blur-md shadow-earth-sm py-3" : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between px-4 md:px-6 py-2.5 rounded-2xl transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 shadow-earth">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-serif font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
                🪔
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-semibold text-lg leading-none text-secondary tracking-tight">
                  MittiLok
                </span>
                <span className="text-devanagari font-bold text-primary leading-none text-[0.75rem] mt-0.5">
                  गाँव
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`btn-ghost text-sm font-medium transition-colors ${
                  pathname === "/" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                href="/explore-products"
                className={`btn-ghost text-sm font-medium transition-colors ${
                  pathname === "/explore-products" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
              >
                Explore
              </Link>
              <Link
                href="/#story"
                className="btn-ghost text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Our Story
              </Link>
              <button
                onClick={() => setIsSellerModalOpen(true)}
                className="btn-ghost text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Become a Seller
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl text-foreground hover:text-primary hover:bg-muted/50 transition-all cursor-pointer"
                aria-label="Search"
                title="Search products"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-xl text-foreground hover:text-primary hover:bg-muted/50 transition-all cursor-pointer hidden sm:flex"
                aria-label="Wishlist"
                title="View wishlist"
              >
                <Heart size={20} className={wishlist.length > 0 ? "fill-primary text-primary" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl text-foreground hover:text-primary hover:bg-muted/50 transition-all cursor-pointer"
                aria-label="Cart"
                title="View cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Login Button */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
              >
                <UserIcon size={16} />
                <span>{user?.isLoggedIn ? user.name.split(" ")[0] : "Login"}</span>
              </button>

              {/* Explore CTA */}
              <Link
                href="/explore-products"
                className="btn-primary text-sm py-2.5 px-5 hidden lg:inline-flex"
              >
                <Sparkles size={16} />
                <span>Explore the Gaon</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border shadow-earth-xl lg:hidden transition-transform duration-300 ease-out flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-secondary">MittiLok</span>
              <span className="text-devanagari text-xs text-primary font-bold">गाँव</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-xl hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className="p-4 border-b border-border">
          <form onSubmit={handleMobileSearch} className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products or crafts..."
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              className="input-earth w-full pl-9 text-sm py-2.5"
            />
          </form>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted/50 hover:text-primary transition-all"
          >
            Home
          </Link>
          <Link
            href="/explore-products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted/50 hover:text-primary transition-all"
          >
            Explore
          </Link>
          <Link
            href="/#story"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted/50 hover:text-primary transition-all"
          >
            Our Story
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSellerModalOpen(true);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted/50 hover:text-primary transition-all text-left cursor-pointer"
          >
            Become a Seller
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsWishlistOpen(true);
            }}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted/50 hover:text-primary transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Heart size={18} />
              <span>Wishlist</span>
            </div>
            {wishlist.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Footer CTAs */}
        <div className="p-4 border-t border-border flex flex-col gap-3">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsLoginOpen(true);
            }}
            className="w-full text-center py-2.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
          >
            {user?.isLoggedIn ? `Hi, ${user.name}` : "Login / Sign Up"}
          </button>
          <Link
            href="/explore-products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary w-full justify-center text-center py-2.5"
          >
            Explore the Gaon
          </Link>
        </div>
      </div>
    </>
  );
};
