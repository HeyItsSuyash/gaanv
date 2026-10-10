"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="relative border-t border-mist bg-bone-d text-ink-soft text-[14px]">
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info (Enlarged logo, without circular frame or pin) */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <div className="relative h-14 w-44 sm:h-16 sm:w-48">
                <Image
                  src="/logo-dark.png"
                  alt="Gaanv by Mittilok"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-[14px] text-stone leading-relaxed max-w-md">
              {t("footer.desc")}
            </p>
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

        {/* National Initiatives & Heritage Badges (Centered, full color, no grayscale) */}
        <div className="mt-12 pt-8 border-t border-mist/50">
          <div className="flex flex-col items-center justify-center text-center gap-6 bg-paper rounded-card p-6 sm:p-8 shadow-sm border border-mist">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-madder font-semibold block">
                Vocal For Local • Atmanirbhar Bharat
              </span>
              <p className="font-serif text-[17px] text-ink mt-1 font-normal">
                Supported by One District One Product (ODOP) & Make in India
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              {/* Make in India */}
              <div className="relative h-14 w-32 sm:h-16 sm:w-36 flex items-center justify-center">
                <Image
                  src="/mii.png"
                  alt="Make in India"
                  fill
                  className="object-contain"
                />
              </div>

              {/* One District One Product (ODOP) */}
              <div className="relative h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center">
                <Image
                  src="/odop-logo.png"
                  alt="One District One Product (ODOP UP)"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Viksit Bharat */}
              <div className="relative h-14 w-28 sm:h-16 sm:w-32 flex items-center justify-center">
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

        {/* Clean Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-mist/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>{t("footer.rights")}</p>
          <p className="font-mono text-stone text-center sm:text-right">
            Handcrafted with dignity across Indian villages
          </p>
        </div>
      </div>
    </footer>
  );
}
