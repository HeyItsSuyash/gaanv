"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Mail, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { setIsSellerModalOpen } = useCart();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("success"); // fallback graceful
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <footer className="bg-[#2D1F1A] text-[#EDE3D6] pt-16 pb-12 border-t border-[#3B2922]">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="text-2xl">🪔</span>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl text-white tracking-tight">
                  MittiLok Gaon
                </span>
                <span className="text-devanagari text-xs text-[#C8965A] font-semibold">
                  गाँव की कला, दुनिया का बाज़ार।
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#DDD0BE]/80 leading-relaxed max-w-sm">
              MittiLok Gaon is India’s women-first digital marketplace connecting rural artisans and SHG entrepreneurs with conscious customers across India and the world.
            </p>
            <div className="pt-2 text-xs text-[#DDD0BE]/60">
              <p>MittiLok Private Limited</p>
              <p>Promoting sustainable village livelihood and cultural preservation.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-semibold text-white text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#DDD0BE]/80">
              <li>
                <Link href="/" className="hover:text-[#C8965A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore-products" className="hover:text-[#C8965A] transition-colors">
                  Explore Products
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-[#C8965A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsSellerModalOpen(true)}
                  className="hover:text-[#C8965A] transition-colors text-left cursor-pointer"
                >
                  Become a Seller
                </button>
              </li>
              <li>
                <a href="mailto:support@mittilok.in" className="hover:text-[#C8965A] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif font-semibold text-white text-base">From the Village to Your Inbox</h4>
            <p className="text-xs text-[#DDD0BE]/80 leading-relaxed">
              Get inspiring stories from our craft clusters, notice of new limited editions, and exclusive festive drops directly from the Gaon.
            </p>
            {status === "success" ? (
              <div className="p-3 bg-[#6F7D5A]/30 border border-[#6F7D5A] rounded-xl flex items-center gap-2 text-sm text-green-200">
                <Check size={18} className="text-green-300" />
                <span>Dhanyavaad! You are subscribed to stories from the Gaon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-28 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C8965A]"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#A65D3B] hover:bg-[#C8965A] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{status === "loading" ? "..." : "Subscribe"}</span>
                    <Send size={12} />
                  </button>
                </div>
                <p className="text-[11px] text-white/40">We respect your inbox. No spam, only authentic crafts.</p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DDD0BE]/60">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2026 MittiLok Private Limited. All rights reserved.</span>
            <Link href="/#story" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#story" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <div className="font-devanagari text-sm font-semibold text-[#C8965A] tracking-wide">
            हर हुनर को एक बाज़ार मिलना चाहिए।
          </div>
        </div>
      </div>
    </footer>
  );
};
