import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
import { Inter, Outfit, Noto_Serif_Devanagari, Noto_Sans_Devanagari, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistModal } from "@/components/WishlistModal";
import { SearchModal } from "@/components/SearchModal";
import { LoginModal } from "@/components/LoginModal";
import { BecomeSellerModal } from "@/components/BecomeSellerModal";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { WhatsAppChatbot } from "@/components/WhatsAppChatbot";
import { PageLoader } from "@/components/PageLoader";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-devanagari",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-devanagari",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaanv by Mittilok | Women Self Help Group Rural Marketplace",
  description:
    "A dark, rich celebration of India's rural women self-help groups, generational terracotta potters, handlooms, and GI certified heritage crafts.",
  applicationName: "Gaanv by Mittilok",
  icons: {
    icon: [
      { url: "/gaon-logo-cropped.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/gaon-logo-cropped.png",
    apple: "/gaon-logo-cropped.png",
  },
  openGraph: {
    title: "Gaanv by Mittilok | Rural Women SHG Crafts",
    description: "Authentic Indian village handicrafts by women self help groups.",
    url: "https://gaanv.mittilok.in",
    siteName: "Gaanv by Mittilok",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${notoSerifDevanagari.variable} ${notoSansDevanagari.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-bone text-ink font-sans flex min-h-full flex-col overflow-x-clip relative">
        {/* Subtle Warli Art Pattern Overlay across the entire site background */}
        <div 
          className="fixed inset-0 bg-warli-pattern pointer-events-none opacity-20 z-0" 
          aria-hidden="true" 
        />

        <LanguageProvider>
          <CartProvider>
            <Header />
            <main id="main-content" className="flex-1 relative z-10">{children}</main>
            <Footer />

            {/* Interactive Drawers, Modals & WhatsApp Chatbot */}
            <PageLoader />
            <WhatsAppChatbot />
            <CartDrawer />
            <CheckoutModal />
            <WishlistModal />
            <SearchModal />
            <LoginModal />
            <BecomeSellerModal />
            <ProductQuickViewModal />
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
