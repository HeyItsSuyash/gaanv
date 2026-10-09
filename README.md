# MittiLok Gaon — Gaon ki kala, duniya ka bazaar

India's women-first digital marketplace connecting rural artisans and Self-Help Group (SHG) entrepreneurs with customers across India and the world.

Recreated with full fidelity from [mittilokgaon-th3720.public.builtwithrocket.new](https://mittilokgaon-th3720.public.builtwithrocket.new) using modern fullstack **MERN with Next.js App Router**.

---

## 🚀 Architecture & Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Frontend / View**: React 19, TypeScript
- **Styling**: Tailwind CSS with customized typography (`Fraunces`, `DM Sans`, `Noto Serif Devanagari`), custom earth terracotta gradients, shadows, and authentic animations
- **Database / MERN**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) models & schemas (with seamless in-memory fallback if local MongoDB is offline)
- **Icons**: Lucide React
- **Global State**: React Context (`CartContext`) with `localStorage` persistence

---

## ✨ Features & Included Pages

### 1. Home Page (`/`)
- **Hero Section**:
  - Warm terracotta, gold, and green ambient blurred blobs
  - Animated pulsating badge: *Women-First Digital Marketplace*
  - Devanagari headline: **गाँव की कला, दुनिया का बाज़ार।**
  - Artisan community trust rating (500+ communities)
  - Hero artisan visual with subtle hover rotation, verified seller floating badge, and "Handmade in India" badge
- **Featured Categories Section**:
  - Interactive grid with cards for *Handicrafts*, *Chikankari & Textiles*, *Handmade Décor*, *Food & Local Products*, *Gifts & Hampers*, and *Rural Lifestyle*
- **Handpicked Products Section**:
  - Authentic artisan products with discount badges, price comparisons in ₹, location tags, wishlist toggle, and animated "Add to Cart"
- **The MittiLok Difference ("Why MittiLok Gaon")**:
  - *हम सिर्फ़ products नहीं, opportunities connect karte hain.*
  - 4 pillars: Women-First Marketplace, Digital Identity, Beyond the Local Fair, and From Local to Global
- **Seller Story Spotlight**:
  - Artisan testimonial & interview highlight (*Kamla Bai, Khurja Pottery Cluster*)
  - *हर हुनर को एक पहचान चाहिए। Every skill deserves to be seen.*
- **How It Works (5-Step Process)**:
  - Join ➔ List ➔ Discover ➔ Order ➔ Grow
- **Brand Belief Manifesto**:
  - *Local skill deserves a larger world.*
- **Impact & Trust Metrics**:
  - 500+ Women Sellers, 1,200+ Products Listed, 18+ States Covered, 100% Direct Fair Value
- **Final Call to Action**:
  - *Your next favourite product may come from a village.*
- **Footer**:
  - Newsletter subscription with direct API submission, brand credentials, legal links, and cultural motto: *हर हुनर को एक बाज़ार मिलना चाहिए।*

### 2. Explore Catalog Page (`/explore-products`)
- Breadcrumb navigation & collection introduction
- **Shop by Story** filter pills (*🌸 Made by Women*, *🪔 Handmade in India*, *✨ Festive Favourites*, *🎁 Gifts with Meaning*)
- Real-time search by craft, artisan name, village, or state
- Multi-dimensional filters:
  - Category selector (All, Handicrafts, Textiles, Décor, Rural Lifestyle, Gifts, Food)
  - State / Location filter (All States, Uttar Pradesh, Rajasthan, Assam, West Bengal, Bihar, Gujarat)
  - Price range slider (₹0 - ₹5,000) and quick preset buttons
- Sorting options (Newest First, Price: Low to High, Price: High to Low, Most Popular)
- Responsive mobile filters drawer
- Empty state with reset filters button

### 3. Full Interactive Modals & Drawers
- **Cart Drawer**: Sliding right drawer showing item list, image thumbnails, quantity increment/decrement, free shipping progress bar, subtotal, and direct transition to checkout
- **Checkout Modal**: Realistic Indian checkout flow with customer name, mobile number (WhatsApp), address, payment options (UPI / Google Pay, Cash on Delivery, Cards), order creation via API, and confirmation screen
- **Wishlist Drawer**: Save favourite items with 1-click "Move to Cart" action
- **Search Modal**: Instant search popup with popular tag suggestions (*Chikankari*, *Terracotta*, *Bamboo*, *Madhubani*, *Dupatta*)
- **Login Modal**: Phone/Email verification with 1-click test login demo
- **Become a Seller Modal**: Onboarding form for village craftswomen and SHGs (Name, SHG name, craft category, village, state, mobile number, craft story)
- **Product Quick View Modal**: High-res product imagery, craft story, materials, artisan verification badge, quantity selector, and direct ordering

### 4. RESTful API Routes (MERN Backend)
- `GET /api/products` — Filter products by category, state, search query, price, or sort order
- `POST /api/products` — Create a new artisan product
- `GET /api/products/[id]` — Retrieve single product by ID
- `GET /api/sellers` — Retrieve registered artisan profiles
- `POST /api/sellers` — Register a new rural woman artisan or SHG
- `POST /api/orders` — Record and process a new customer order
- `POST /api/newsletter` — Subscribe to village craft stories
- `GET /api/seed` — Seed initial product catalogue and artisans to MongoDB

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
If running a local MongoDB server or MongoDB Atlas:
```bash
cp .env.example .env.local
```
*(If MongoDB is not running, the application will automatically and gracefully fall back to initial artisan seed data without crashing).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```
