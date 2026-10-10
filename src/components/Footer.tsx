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
          {/* Brand Info (Prominent logo with high-contrast, larger Devanagari Gaanv emblem) */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4 sm:gap-5 mb-5 group">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/gaon-emblem-clean.png"
                  alt="Gaanv by Mittilok"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="relative h-14 w-32 sm:h-16 sm:w-40 border-s-2 border-stone/25 ps-4 sm:ps-5 flex items-center">
                <Image
                  src="/logogaanv-dark-crisp.png"
                  alt="गाँव देवनागरी"
                  fill
                  className="object-contain object-left transition-opacity duration-200"
                  unoptimized
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

        {/* National Initiatives & Heritage Badges (Seamless without separate box) */}
        <div className="mt-12 pt-8 flex flex-col items-center justify-center text-center gap-5">

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {/* Make in India */}
            <div className="relative h-12 w-28 sm:h-14 sm:w-32 flex items-center justify-center">
              <Image
                src="/mii.png"
                alt="Make in India"
                fill
                className="object-contain"
              />
            </div>

            {/* One District One Product (ODOP) */}
            <div className="relative h-12 w-24 sm:h-14 sm:w-28 flex items-center justify-center">
              <Image
                src="/odop-logo.png"
                alt="One District One Product (ODOP UP)"
                fill
                className="object-contain"
              />
            </div>

            {/* Viksit Bharat */}
            <div className="relative h-12 w-24 sm:h-14 sm:w-28 flex items-center justify-center">
              <Image
                src="/viksit india.avif"
                alt="Viksit Bharat"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Clean Bottom Bar with Social Media Links */}
        <div className="mt-10 pt-6 border-t border-mist/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>{t("footer.rights")}</p>

          {/* Social Media Links: Instagram, LinkedIn, Facebook */}
          <div className="flex items-center gap-5 text-ink hover:text-ink">
            <a
              href="https://www.instagram.com/mittilok_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-stone hover:text-madder transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/search/results/all/?keywords=Mittilok"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone hover:text-indigo transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/mittilok"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-stone hover:text-indigo-d transition-colors"
            >
              {/* Official Font Awesome Facebook icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 512 512"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 379.7 87.6 483 203.5 506.7V331.4H143V256H203.5V198.8C203.5 139 239.1 106 293.7 106C319.9 106 347.3 110.7 347.3 110.7V169.5H317.2C287.6 169.5 278.4 187.9 278.4 206.8V256H344.8L334.2 331.4H278.4V507C394.4 483.3 512 380 512 256Z"/>
              </svg>
            </a>
          </div>

          <p className="font-mono text-stone text-center sm:text-right">
            Handcrafted with dignity across Indian villages
          </p>
        </div>
      </div>
    </footer>
  );
}
