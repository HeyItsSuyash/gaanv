# haat (haat.ganges.world) — Comprehensive Design System Specification

> **Source Reference**: [https://haat.ganges.world/](https://haat.ganges.world/)  
> **Brand Manifesto**: *"India's marketplace, to the world. A premium global marketplace for products made in India — every seller verified, every price clear, every story honest."*  
> **Aesthetic Philosophy**: Editorial luxury meets artisanal integrity. Rooted in warm earthen bone/parchment surfaces, deep ink typography, classical serif editorial headings (Fraunces), utilitarian neutral grotesque body text (Inter), and traditional pigment accents (Madder root red, Fermented Indigo, Bell-Metal Brass, Sage green, and Khadi bone).

---

## 1. Brand Identity & Design Principles

### 1.1 Brand Positioning
- **Not a chaotic village bazaar, not a generic domestic marketplace.**
- An **export-grade, international design studio & curated marketplace** presenting master-crafted Indian heritage to a global audience across 75+ countries.
- **Editorial Dignity**: High negative space, deliberate typography, unhurried pacing, zero countdown anxiety, museum-like product presentation with pure contrast against natural bone backgrounds.

### 1.2 Core Design Pillars
1. **Bone & Paper Canvas (`#F5F1EA` & `#FFFFFF`)**:
   - Replaces clinical, harsh pure white with warm unbleached cotton/linen paper tones. Prevents ocular fatigue and conveys tactile craft heritage.
2. **Ink Contrast (`#14110C`)**:
   - Deepest charcoal-ink instead of cold digital blacks (`#000000`). Conveys calligraphic warmth and vintage printing press permanence.
3. **Heritage Pigments as Purposeful Semantics**:
   - Accents are strictly derived from natural Indian natural dye masters:
     - **Madder (`#8B4A3C`)**: For active focus states, outline accents, and editorial warmth.
     - **Sage (`#6B7A5E`)**: For Seller Verification seals and natural origin badges.
     - **Brass (`#A88B5C`)**: For Geographical Indication (GI Tag) heritage marks and artisanal pedigree.
     - **Indigo (`#2A3D5C`)**: For cultural depth, maritime trade references, and quiet institutional authority.
     - **Amber / Ochre (`#B87A1A`)**: For seasonal collections, festive marks, and curatorial highlights.
4. **Precision Micro-Geometry & Radii**:
   - Soft, tailored corners that feel architectural rather than bubbly:
     - Chips / Inputs: `4px` (`rounded-input`)
     - Cards: `6px` (`rounded-card`)
     - Buttons: `3px` (`rounded-button`)
     - Pills: `9999px` (`rounded-pill`)
5. **Radical Transparency Signals**:
   - Every product card visibly displays maker provenance (`Maker Name · City, State`), GI verification chips (`◆ GI certified`), currency conversions with tabular figures, and shipping clarity upfront.

---

## 2. Color Palette & Design Tokens

### 2.1 CSS Custom Properties (`:root`)

```css
:root {
  /* Surface & Canvas Tokens */
  --color-bone: #f5f1ea;        /* Primary background canvas (warm unbleached paper) */
  --color-bone-d: #eeeae0;      /* Secondary surface (skeleton shimmer, footer, borders) */
  --color-paper: #ffffff;       /* Pure card backgrounds, modals, input containers */
  --color-mist: #d4cfc4;        /* Primary hairline structural border */
  --color-stone: #7a7268;       /* Secondary text, metadata, captions, label descriptions */
  
  /* Text & Ink Tokens */
  --color-ink: #14110c;         /* Primary brand typography, high contrast headlines */
  --color-ink-soft: #2a2620;    /* Interactive hover & active dark button state */
  
  /* Natural Heritage Mineral Accents */
  --color-madder: #8b4a3c;      /* Manjistha / Indian Madder Red — Focus ring & primary accent */
  --color-madder-l: #f5e8e4;    /* Madder light wash — Selection background */
  --color-clay-l: #f4e7de;      /* Warm clay background tint */
  
  --color-sage: #6b7a5e;        /* Neem / Tulsi green — Verified seller badge */
  --color-sage-l: #ecefe6;      /* Sage light tint */
  
  --color-brass: #a88b5c;       /* Bell-metal brass — GI Tag certificate mark */
  --color-brass-l: #f2ead8;     /* Brass light tint */
  
  --color-indigo: #2a3d5c;      /* Natural indigo blue — Heritage stories */
  --color-indigo-d: #1b2940;    /* Midnight indigo */
  --color-indigo-l: #e8ecf2;    /* Indigo tint */
  
  --color-amber: #b87a1a;       /* Raw amber / Haldi gold — Warm alert & rating */
  --color-amber-l: #f7e9cc;     /* Amber light tint */
  
  --color-brick: #a8423a;       /* Kiln terracotta red */
  --color-brick-l: #f5e0de;     /* Brick light tint */
  
  /* Radii Tokens */
  --radius-xs: 2px;
  --radius-button: 3px;
  --radius-input: 4px;
  --radius-card: 6px;
  --radius-pill: 9999px;
  
  /* Layout & Motion Tokens */
  --container-content: 1080px;
  --container-max: 1280px;
  --ease-signature: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 2.2 Semantic Color Mapping

| Token Name | Hex Code | Role & UI Application |
| :--- | :--- | :--- |
| `bg-bone` | `#F5F1EA` | Root background for `body`, hero sections, header bar. |
| `bg-bone-d` | `#EEEAE0` | Footer background, trust section background, skeleton placeholder fill. |
| `bg-paper` | `#FFFFFF` | Product card surface, drawer body, search input fields, modals. |
| `border-mist` | `#D4CFC4` | 1px clean hairline borders separating cards, headers, and footer blocks. |
| `text-ink` | `#14110C` | H1-H4 editorial titles, prices, master navigation links, icon fills. |
| `text-stone` | `#7A7268` | Maker geographical origins, subtitles, legal notices, footer links. |
| `border-madder` | `#8B4A3C` | Keyboard accessibility focus rings (`outline: 2px solid var(--color-madder)`), active link hover. |
| `badge-sage` | `#6B7A5E` / `#ECEFE6` | `✓ haat verified` seller trust mark. |
| `badge-brass` | `#A88B5C` / `#F2EAD8` | `◆ [Craft] · GI` geographical certificate seal. |

---

## 3. Typography & Hierarchy System

haat utilizes a strict three-tier typographic engine:

### 3.1 Font Families
- **Editorial Serif (`--font-serif`)**: **Fraunces** (Google Fonts variable serif, optical size 144, soft curvature, ligature elegance). Used for all brand logos, section headings, product card titles, and prices.
- **Modern Grotesque Sans (`--font-sans`)**: **Inter** (Google Fonts variable sans). Crisp, ultra-legible, geometric humanist grotesque for navigation, buttons, specs, filters, and forms.
- **Monospace & Utility (`--font-mono`)**: **JetBrains Mono**. Used for SKU numbers, certificate codes, and order tracking numbers.

### 3.2 Type Scale Specification

```css
/* Typography Scale */
--text-hero: 88px;          /* Line height: 0.95, letter spacing: -3px */
--text-display: clamp(36px, 5vw + 1rem, 64px); /* Line height: 1.05, tracking: -1.5px */
--text-h1: 46px;            /* Line height: 1.1, letter spacing: -1px */
--text-h2: 34px;            /* Line height: 1.2, letter spacing: -0.5px */
--text-h3: 24px;            /* Line height: 1.3, letter spacing: -0.3px */
--text-h4: 17px;            /* Line height: 1.3, letter spacing: -0.1px */
--text-price: 44px;         /* Line height: 1.0, letter spacing: -1px */

--text-body-lg: 18px;       /* Line height: 1.7 */
--text-body: 16px;          /* Line height: 1.65 */
--text-body-sm: 14px;       /* Line height: 1.6 */
--text-caption: 13px;       /* Line height: 1.5 */
--text-label: 11px;         /* Line height: 1.4, letter spacing: 2px, uppercase */
```

### 3.3 Editorial Typography Rules
1. **The haat Wordmark**: Set in `Fraunces`, `font-weight: 300`, `letter-spacing: -0.04em`, lowercase `haat`.
2. **Section Kickers**: Always uppercase, tracking `2px`, font size `11px` (`text-label`), color `text-stone`. E.g.: `JUST LANDED`, `GI TREASURES`, `FROM THE HAAT`.
3. **Price Display**: Rendered with tabular numbers (`tabular-nums font-serif`), prefixed by currency symbol with negative letter-spacing for premium weight.

---

## 4. UI Architecture & Layout Structure

The layout follows a disciplined, centered container structure: `max-w-[1280px]` with responsive horizontal gutters (`px-6 md:px-8`).

```
+-----------------------------------------------------------------------------------+
|  NAVBAR (Sticky h-16, bg-bone, border-b border-transparent / border-mist)         |
|  [Logo: haat]  |  [Categories  Stories  Collections]  |  [Sell on haat] [USD $] [Bag] |
+-----------------------------------------------------------------------------------+
|  HERO SLIDESHOW (Carousel with cinematic imagery / video, min-h-[520px-660px])    |
|  "Stories woven by hand."                                                         |
|  [Browse the haat (h-14 bg-ink rounded-button)]   [ < ] [ > ] [=== - -]           |
+-----------------------------------------------------------------------------------+
|  JUST LANDED (New on the haat this week) — 4-Column Responsive Grid              |
|  - 4:5 Aspect Ratio Product Cards with quick-wishlist & quick-add bag triggers    |
+-----------------------------------------------------------------------------------+
|  TRUST & ETHOS QUADRANT (bg-bone-d border-y border-mist)                          |
|  1. Every seller verified   2. Your money is safe                                 |
|  3. Clear, honest pricing   4. Made in India, by hand                             |
+-----------------------------------------------------------------------------------+
|  FROM THE HAAT (In their own words) — Horizontal Snap Artisan Carousel           |
|  - Maker Portraits · Family-run workshops · Origin states                         |
+-----------------------------------------------------------------------------------+
|  GI TREASURES (Geographically protected. Honestly stamped.)                       |
|  - Official Indian Govt GI marks · Verified badges · Curated craft cohort         |
+-----------------------------------------------------------------------------------+
|  RECOGNITION & PARTNERS (Infinite Marquee Rail with pause-on-hover)               |
|  [Razorpay Rize]  [Y Combinator]  [Supabase]  [ElevenLabs]  [Notion]  [TiE]       |
+-----------------------------------------------------------------------------------+
|  EDITORIAL FOOTER (bg-bone-d border-t border-mist)                                |
|  - Journal Newsletter Subscription ("one editorial email every other Sunday")    |
|  - 5-Column Sitemap: Shop | Stories | Sell on haat | Company | Legal               |
|  - Global Currency Picker · Language Selector · Accepted Payment Rails Badge      |
+-----------------------------------------------------------------------------------+
```

---

## 5. Detailed Component Specifications

### 5.1 Global Navigation (`BuyerNav`)
- **Height**: `h-16` (64px).
- **Background**: `bg-bone` with sticky positioning `top-0 z-40`. Transitions border to `border-mist` on scroll.
- **Logo**: 26px Fraunces Light (`font-weight: 300`, `letter-spacing: -0.04em`).
- **Primary Links**: `Categories`, `Stories`, `Collections` styled in `text-stone hover:text-ink transition-colors font-sans text-body-sm`.
- **Secondary Actions**:
  - `Sell on haat`: Outlined pill button (`border border-ink/80 text-ink rounded-pill h-9 px-4 hover:bg-ink hover:text-paper`).
  - Search trigger: `h-11 w-11 hover:bg-bone-d rounded-input`.
  - Country & Currency Switcher: Native select wrapped in subtle stone pill with arrow indicator (`US · USD`, `UK · GBP`, etc.).
  - Account icon & Cart Drawer toggle (`relative h-11 w-11` with cart badge).

### 5.2 Hero Carousel (`HeroSlideshow`)
- **Container**: `min-h-[440px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[660px] max-h-[86svh] relative isolate overflow-hidden`.
- **Visual Media**: Full-bleed background media with dark atmospheric overlay:
  `bg-gradient-to-t from-ink/75 via-ink/35 to-ink/10`.
- **Typography**:
  - H1: `font-serif text-paper text-h2 sm:text-h1 md:text-display leading-[1.05] tracking-[-1px]`.
  - Subtitle: `font-serif italic text-paper/85 text-[16px] md:text-[20px] mt-4`.
- **Primary CTA**:
  `bg-ink text-paper hover:bg-ink-soft h-14 px-8 text-[16px] rounded-button font-medium transition-transform active:scale-[0.98]`.
- **Paging Controls**:
  - Circular frosted arrow buttons (`border-paper/40 text-paper hover:bg-paper hover:text-ink backdrop-blur-sm h-11 w-11 rounded-pill`).
  - Elongating progress bar pill: active slide expands to `w-8 bg-paper`, inactive slides `w-3 bg-paper/40`.

### 5.3 Product Card System (`VastuCard`)
- **Structure**:
  ```tsx
  <article className="group border-mist bg-paper rounded-card flex h-full flex-col overflow-hidden border">
    <div className="bg-paper border-mist relative aspect-[4/5] overflow-hidden border-b p-2">
      <img className="object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
      {/* Top right floating wishlist button */}
      <button className="bg-paper/85 hover:bg-paper text-ink absolute end-2 top-2 h-11 w-11 rounded-pill backdrop-blur-sm" />
      {/* Bottom right quick add to bag button */}
      <button className="bg-paper/85 hover:bg-ink hover:text-paper text-ink absolute end-2 bottom-2 h-11 w-11 rounded-pill backdrop-blur-sm" />
    </div>
    <div className="flex flex-1 flex-col p-3 md:p-4">
      {/* Verification & GI Tag Badges */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span className="border-sage bg-sage-l text-sage border rounded-pill px-2 py-0.5 text-[10px] font-semibold">✓ haat verified</span>
        <span className="border-brass bg-brass-l text-brass border-[1.5px] rounded-xs px-2 py-0.5 text-[10px] font-serif uppercase tracking-[1.5px]">◆ GI certified</span>
      </div>
      {/* Artisan & Location Line */}
      <p className="text-caption text-stone mb-1 uppercase tracking-[1.5px]">Maker Name <span className="text-stone/70">· City, State</span></p>
      {/* Title */}
      <h3 className="font-serif text-h4 text-ink leading-tight group-hover:text-madder transition-colors">Product Title</h3>
      {/* Tabular Price */}
      <p className="font-serif text-h4 text-ink mt-auto pt-2 tracking-[-0.5px] tabular-nums">$74.20</p>
    </div>
  </article>
  ```

### 5.4 Trust & Integrity Rail (4-Column)
- **Background**: `bg-bone-d border-mist border-y py-20`.
- **Items**:
  1. **Every seller verified**: Phosphor `ShieldCheck` icon. ID, business, and bank checks before listing.
  2. **Your money is safe**: Phosphor `LockKey` icon. Payment held securely in escrow until delivery confirmation.
  3. **Clear, honest pricing**: Phosphor `Tag` icon. Itemised shipping and duty upfront. Zero unexpected costs.
  4. **Made in India, by hand**: Phosphor `MapPin` / `Hands` icon. 100% authentic provenance directly from craft clusters.

### 5.5 Artisan Stories Snap Rail
- **Layout**: Native CSS snap carousel (`snap-x snap-mandatory flex gap-5 overflow-x-auto pb-4`).
- **Cards**:
  - `w-[78vw] sm:w-[44vw] md:w-[300px]` width.
  - Image frame: `aspect-[4/5] rounded-card border-mist border overflow-hidden`.
  - Content: Maker name in `font-serif text-h4 group-hover:text-madder`, location in `text-caption text-stone uppercase tracking-[1.5px]`, craft biography excerpt in `text-body-sm text-stone`.

### 5.6 Institutional Recognition Marquee Rail
- **Animation**: Smooth infinite linear translation (`marquee-scroll 29.4s linear infinite`).
- **Interaction**: Pauses on hover or keyboard focus (`group-hover:[animation-play-state:paused]`).
- **Mask**: Linear gradient alpha mask at viewport edges (`[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]`).
- **Partners**: Razorpay Rize, Y Combinator, Supabase, ElevenLabs, Notion, TiE.

### 5.7 Editorial Journal Footer
- **Background**: `bg-bone-d border-t border-mist mt-24`.
- **Newsletter**: "The haat journal — one editorial email every other Sunday. New makers, new pieces, the story behind each. No promotions."
  - Input: Bottom-bordered minimalist input field (`border-b border-ink bg-paper text-ink px-0 py-2`).
  - Button: `bg-ink text-paper rounded-button px-4 py-2 hover:bg-ink-soft`.
- **Sitemap**: 5-column categorized grid (`Shop`, `Stories`, `Sell on haat`, `Company`, `Legal`).
- **Support**: Direct line to `support@ganges.world` with clear ticket link.
- **Payment Badges**: PayPal, VISA, Mastercard, Amex styled as crisp hairline paper badges.

---

## 6. Generated Visual Assets Catalog

All required visual assets are saved in the project's `/public` asset directory:

| Asset Path | Format | Dimensions | Purpose |
| :--- | :--- | :--- | :--- |
| `/public/icon.svg` | SVG | 512×512 | Vector brand favicon / monogram with Fraunces serif glyph |
| `/public/icons/logo.svg` | SVG | 180×48 | Primary brand masthead wordmark |
| `/public/badges/haat-verified.svg` | SVG | 140×32 | `✓ haat verified` seller authenticity certificate seal |
| `/public/badges/gi-certified.svg` | SVG | 160×32 | `◆ GI certified` Geographical Indication heritage stamp |
| `/public/badges/payment-badges.svg` | SVG | 260×32 | PayPal, VISA, Mastercard, Amex security marks |
| `/public/recognition/razorpay-rize.svg` | SVG | 180×48 | Backed by Razorpay Rize logo mark |
| `/public/recognition/y-combinator.svg` | SVG | 180×48 | Supported by Y Combinator emblem |
| `/public/recognition/supabase.svg` | SVG | 180×48 | Powered by Supabase infrastructure mark |
| `/public/recognition/elevenlabs.svg` | SVG | 180×48 | Audio voice partner emblem |
| `/public/recognition/notion.svg` | SVG | 180×48 | Supported by Notion startup recognition |
| `/public/recognition/tie.svg` | SVG | 180×48 | Featured in TiE global entrepreneurship network |
| `/public/categories/handwoven-textiles.webp` | WebP | 1920×1080 | Editorial Hero Slide: Master weaver working on traditional wooden handloom |
| `/public/categories/ceramic-pottery.webp` | WebP | 800×1000 | Editorial Category: Blue Pottery / Khurja pottery master ceramicist |
| `/public/categories/brass-bellmetal.webp` | WebP | 800×1000 | Editorial Category: Hand-cast Dhokra bell-metal sculptural vessels |
| `/public/categories/wooden-carving.webp` | WebP | 800×1000 | Editorial Category: Channapatna & Saharanpur teak and rosewood craft |

---

## 7. Motion & Micro-Interactions

- **Signature Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` for silky deceleration without bounce.
- **Card Hover Elevation**: `translateY(-2px)` to `translateY(-4px)` with scale on image zoom (`scale-[1.03] duration-500`).
- **Button Click Response**: `active:scale-[0.98]` with instant 150ms feedback.
- **Skeleton Shimmer**:
  ```css
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  .animate-shimmer {
    position: relative;
    overflow: hidden;
  }
  .animate-shimmer::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: shimmer 1.5s infinite;
  }
  ```
- **Accessibility & Reduced Motion**:
  `@media (prefers-reduced-motion: reduce)` disables autoplay, sets marquee to static wrapped flex layout, and reduces transition duration to 0.001ms.
