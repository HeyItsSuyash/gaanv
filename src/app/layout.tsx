import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
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
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaanv by Mittilok — Women Self Help Group Rural Marketplace",
  description:
    "A dark, rich celebration of India's rural women self-help groups, generational terracotta potters, handlooms, and GI certified heritage crafts.",
  applicationName: "Gaanv by Mittilok",
  icons: {
    icon: [
      { url: "/gaon-logo.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/gaon-logo.png",
    apple: "/gaon-logo.png",
  },
  openGraph: {
    title: "Gaanv by Mittilok — Rural Women SHG Crafts",
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
