"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="relative border-t border-mist bg-bone-d text-ink-soft text-[14px]">
      {/* Background Warli pattern */}
      <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-3">
              <span className="font-serif text-[28px] text-ink font-normal lowercase">gaanv</span>
              <span className="font-mono text-[11px] text-brass uppercase tracking-[1.5px] font-medium">by mittilok</span>
            </Link>
            <p className="text-[14px] text-stone leading-relaxed max-w-md">
              {t("footer.desc")}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brass">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>500+ Rural Women SHG Artisans Supported</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3">
              {lang === "hi" ? "शिल्प श्रेणियां" : "Heritage Crafts"}
            </h4>
            <ul className="space-y-2 text-xs text-stone">
              <li><Link href="/explore-products" className="hover:text-brass transition-colors">Terracotta & Clay</Link></li>
              <li><Link href="/explore-products" className="hover:text-brass transition-colors">Dokra & Bell Metal</Link></li>
              <li><Link href="/explore-products" className="hover:text-brass transition-colors">Handlooms & Ikats</Link></li>
              <li><Link href="/explore-products" className="hover:text-brass transition-colors">Bamboo & Cane</Link></li>
              <li><Link href="/explore-products" className="hover:text-brass transition-colors">Folk Art Paintings</Link></li>
            </ul>
          </div>

          {/* Village Initiatives */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3">
              {lang === "hi" ? "गाँव की पहल" : "Village Initiatives"}
            </h4>
            <ul className="space-y-2 text-xs text-stone">
              <li><a href="#women-shg" className="hover:text-brass transition-colors">Women SHG Collectives</a></li>
              <li><a href="#gi-treasures" className="hover:text-brass transition-colors">GI Registry Protection</a></li>
              <li><a href="#main-content" className="hover:text-brass transition-colors">Fair Artisan Compensation</a></li>
              <li><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-brass transition-colors">WhatsApp Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-mist/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>{t("footer.rights")}</p>
          <p className="font-mono text-brass/90 text-center sm:text-right">
            {t("footer.shipping")}
          </p>
        </div>
      </div>
    </footer>
  );
}
