"use client";

import React from "react";
import Image from "next/image";
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
            <Link href="/" className="inline-flex items-center mb-4">
              <div className="relative h-11 w-32">
                <Image
                  src="/logo-dark.png"
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-[14px] text-stone leading-relaxed max-w-md">
              {t("footer.desc")}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-brass">
              <span className="bg-[#241b14] text-[#d4af37] px-2.5 py-1 rounded-pill border border-[#524132]">
                📍 Developed in Uttar Pradesh
              </span>
              <span className="text-stone">•</span>
              <span>500+ Rural Women SHGs in 75 UP Districts</span>
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
              <li><Link href="/team" className="hover:text-brass transition-colors">Team & UP Field Team</Link></li>
              <li><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-brass transition-colors">WhatsApp Support</a></li>
            </ul>
          </div>
        </div>

        {/* National Initiatives & Heritage Badges (Make in India, ODOP, Viksit Bharat) */}
        <div className="mt-12 pt-8 border-t border-mist/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-paper/80 border border-mist/80 rounded-card p-5 sm:p-6 shadow-sm">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-madder font-semibold block">
                National Heritage & Self-Reliance Backing
              </span>
              <p className="font-serif text-[16px] text-ink mt-0.5 font-medium">
                Aligned with National Rural Livelihood Mission, ODOP & Make in India
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {/* Make in India */}
              <div className="relative h-12 w-28 sm:h-14 sm:w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <Image
                  src="/mii.png"
                  alt="Make in India"
                  fill
                  className="object-contain"
                />
              </div>

              {/* One District One Product (ODOP) */}
              <div className="relative h-12 w-24 sm:h-14 sm:w-28 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <Image
                  src="/odop-logo.png"
                  alt="One District One Product (ODOP UP)"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Viksit Bharat */}
              <div className="relative h-12 w-24 sm:h-14 sm:w-28 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <Image
                  src="/viksit india.avif"
                  alt="Viksit Bharat"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-mist/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>{t("footer.rights")}</p>
          <p className="font-mono text-brass/90 text-center sm:text-right">
            {t("footer.shipping")}
          </p>
        </div>
      </div>
    </footer>
  );
}
