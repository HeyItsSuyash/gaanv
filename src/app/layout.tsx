import type { Metadata } from "next";
import { DM_Sans, Fraunces, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistModal } from "@/components/WishlistModal";
import { SearchModal } from "@/components/SearchModal";
import { LoginModal } from "@/components/LoginModal";
import { BecomeSellerModal } from "@/components/BecomeSellerModal";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { CheckoutModal } from "@/components/CheckoutModal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MittiLok Gaon — Gaon ki kala, duniya ka bazaar",
  description:
    "MittiLok Gaon is India's women-first digital marketplace connecting rural artisans and SHG entrepreneurs with customers across India and the world.",
  keywords: [
    "MittiLok Gaon",
    "Handmade in India",
    "Rural Artisans",
    "Women Entrepreneurs",
    "Chikankari",
    "Terracotta",
    "Assam Bamboo",
    "Indian Handicrafts",
    "SHG Marketplace",
  ],
  openGraph: {
    title: "MittiLok Gaon — Gaon ki kala, duniya ka bazaar",
    description: "Discover handmade products from women-led enterprises across India.",
    url: "https://mittilokgaon-th3720.public.builtwithrocket.new",
    siteName: "MittiLok Gaon",
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
      className={`${dmSans.variable} ${fraunces.variable} ${devanagari.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-secondary">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Interactive Drawers & Modals */}
          <CartDrawer />
          <CheckoutModal />
          <WishlistModal />
          <SearchModal />
          <LoginModal />
          <BecomeSellerModal />
          <ProductQuickViewModal />
        </CartProvider>
      </body>
    </html>
  );
}
