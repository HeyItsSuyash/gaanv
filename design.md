# Mittilok Gaav (मिट्टीलोक गाँव) — Design Specification & Style Guide

> **Vision**: An authentic, rich digital bridge celebrating India's rural heritage, traditional handcrafts, clay artistry, and folk traditions through a warm, immersive, and culturally vibrant web experience.

---

## 1. Executive Summary & Brand Identity

Mittilok Gaav ("The Realm of Clay & Village") balances **deep cultural authenticity** (terracotta, village haats, generational karigari) with **modern, frictionless, mobile-first e-commerce usability** (WCAG AA/AAA compliance, fast performance, high conversion patterns).

### The Triad: Mitti · Lok · Gaav
* **Mitti (मिट्टी - Soil/Clay):** Represents origin, tactility, humility, and the sensory fragrance of first rain (*Petrichor / Saundhi Khushbu*). Tactile language that feels hand-shaped, porous, warm, and natural.
* **Lok (लोक - Folk/People):** Celebrates collective consciousness, oral traditions, folk craft wisdom passed across generations, and artisan dignity.
* **Gaav (गाँव - The Village):** Represents slow living, community chaupals, seasonal rhythms, and zero-waste sustainable coexistence with nature.

### Brand Tenets
1. **Mitti Se Jude (Rooted in Soil):** Every material, interaction, and visual element honors raw natural unbleached states over synthetic perfection.
2. **Karigar Gaurav (Artisan Dignity):** Artisans are celebrated as master creators and cultural custodians. Fair trade compensation and GI provenance are visible front and center.
3. **Sahaj & Satvik (Effortless Simplicity):** Clean, airy, unhurried digital experience that cuts out aggressive e-commerce anxiety.
4. **Parampara × Adhunikta:** Ancient craft traditions showcased through razor-sharp modern web aesthetics, fluid responsive grids, and accessible typography.

---

## 2. Folk Art Traditions & Motif Catalog

| Folk Art Form | Origin & Technique | Key Cultural Motifs | Digital UI Application in Mittilok Gaav |
| :--- | :--- | :--- | :--- |
| **Warli Art** | Tribal communities of Sahyadri / North Maharashtra; white rice paste (*Pith*) on red ochre (*Geru*) mud walls. | Triangles (balance of masculine/feminine), circles (sun/moon, cycle of seasons), stick figures dancing hand-in-hand in the circular *Tarpa* dance. | **Section Dividers & Headers:** Horizontal SVG ribbon of dancing Warli community figures. **Chaupal Sections:** Illustrating village collective gathering. **Empty States & 404 Pages:** Minimalist Warli stick figure with an empty earthen pot. |
| **Madhubani / Mithila** | Mithilanchal (Bihar); natural vegetable dyes; uses *Kachni* (fine line hatching) and *Bharni* (vibrant mineral fills). | *Matsya* (Fish - auspicious abundance), *Mayur* (Peacock - grace, festive joy), *Kamal* (Lotus - purity), *Surya* (Solar energy & vitality). | **Product Card Borders & Badges:** Double-line hatched borders. **GI Certification Badges:** Sacred fish/lotus roundel seals. **Feature Banners:** Stylized sun and peacock illustrations. |
| **Lippan Kaam (Mud & Mirror)** | Kutch, Gujarat; embossed white clay relief with embedded small mirrors (*Abhla*). | *Machi Kanado* (overlapping fish scale scallops), concentric diamond lattices, floral rosettes. | **Interactive Accents & Hero Frames:** Glass reflection hover states. **Category Tiles:** Embossed clay bas-relief framing with subtle mirror insets. |
| **Pattachitra** | Odisha & West Bengal; scroll painting using natural mineral pigments. | *Latapatta* (intertwined floral creepers & curling vine borders), temple arches (*Torana*). | **Header / Footer Trim:** Elegant *latapatta* vine scroll dividers. **Artisan Hero Frames:** Jharokha/temple arch cutouts for master artisan portraits. |
| **Terracotta Craft** | Pan-India (Molela terracotta murals, Gorakhpur baked clay, Bankura horses, Asharikandi pottery). | The potter’s wheel (*Chaak*), earthen water pots (*Matka/Surahi*), chai *Kulhads*, flared terracotta oil lamps (*Diyas*). | **Core UI Textures:** Warm earthen color palette, tactile soft-radius containers (`border-radius: 18px`), debossed clay seal buttons (*Chhaap*). |

---

## 3. Color Palette Architecture (WCAG AA/AAA Compliant)

### A. Neutral Foundations & Canvas
* **Kora Cotton / Khadi Cream (`#FAF6EE`):** Primary background. Warm, unbleached, reduces ocular fatigue compared to harsh `#FFFFFF`.
* **Geru Wash / Sand Parchment (`#F3EDE2`):** Secondary container surface (card backgrounds, input fields, drawers).
* **Mitti Border / Sun-baked Ochre Line (`#E2D5C3`):** Structural dividing lines, card borders, tab outlines.
* **Kajal / Damp Earth Charcoal (`#241C17`):** Primary text color. Soft black with warm brown undertone (14.2:1 contrast against Khadi Cream).
* **Muted Clay Slate (`#61554C`):** Secondary body text, metadata, artisan location captions, breadcrumbs (5.4:1 contrast).

### B. Primary Earth & Clay Hues
* **Pakkhi Terracotta (`#B84A28`):** Primary action color (Primary CTA buttons, brand masthead, active pills). Contrast 4.6:1 against `#FAF6EE`.
* **Burnished Geru Dark (`#8C3418`):** Primary button hover/pressed state, dark mode accents.
* **Geeli Mitti / Dark Loam (`#5C3A21`):** Rich brown for structural titles, header borders, and badge text.

### C. Traditional Mineral & Botanical Accents
* **Haldi / Turmeric Ochre (`#D9822B`):** Warm golden accent. Used for secondary highlights, rating stars, festive tag ribbons.
* **Haldi Tint (`#FBF0DC`):** Background fill for promotional tags and discount badges.
* **Neel / Fermented Indigo (`#1D3B53`):** GI Tag seals, Authenticity verification badges, and Karigar stories. Contrast 9.8:1 on cream.
* **Tamba / Bell-Metal Brass (`#C49A45`):** Metallic gold accent for heritage awards, master artisan badges.
* **Tulsi / Neem Leaf Green (`#446A3A`):** Eco-friendly, plastic-free packaging, and vegan/natural material guarantee chips.

```css
:root {
  /* Canvas & Surface Tokens */
  --color-canvas-cream: #FAF6EE;
  --color-surface-parchment: #F3EDE2;
  --color-surface-sand: #EADBCE;
  --color-border-clay: #E2D5C3;

  /* Text Tokens */
  --color-text-charcoal: #241C17;
  --color-text-muted: #61554C;

  /* Earth & Clay Primaries */
  --color-terracotta: #B84A28;
  --color-terracotta-dark: #8C3418;
  --color-clay-deep: #5C3A21;

  /* Cultural Accents */
  --color-haldi-gold: #D9822B;
  --color-haldi-tint: #FBF0DC;
  --color-neel-indigo: #1D3B53;
  --color-tamba-brass: #C49A45;
  --color-tulsi-green: #446A3A;

  /* Font Families */
  --font-display: 'Rozha One', 'Cormorant Garamond', serif;
  --font-subheading: 'Cinzel', 'Yatra One', serif;
  --font-sans: 'Plus Jakarta Sans', 'Poppins', 'Noto Sans Devanagari', sans-serif;
  --font-artisan: 'Kalam', cursive;
}
```

---

## 4. Typography Hierarchy & System

1. **Display & Editorial Headings (H1, H2, Hero Banners):**
   * **Primary:** `Rozha One` (High-contrast serif with native Devanagari support).
   * **Alternative:** `Cormorant Garamond` (600, 700) / `Cinzel Decorative`.
2. **Subheadings & Category Titles (H3, H4, Filter Labels):**
   * **Primary:** `Cinzel` (600, 700) or `Yatra One` (hand-painted sign and vintage letterform charm).
3. **Body Text, Navigation, Forms & Prices:**
   * **Primary:** `Plus Jakarta Sans` or `Poppins` (400, 500, 600) + `Noto Sans Devanagari`.
   * **Prices:** Tabular numbers `font-feature-settings: "tnum"` with rupee prefix (`₹1,450`).
4. **Handwritten Artisan Notes & Postcard Quotes:**
   * **Primary:** `Kalam` (Google Font by Indian Type Foundry).

---

## 5. UI Component Architecture ("Village Haat" Model)

```
[ Top Bar: Vernacular Toggle (हिन्दी | Eng | বাংলা | தமிழ்) · Free Village Delivery ]
[ Masthead: Mittilok Gaav (मिट्टीलोक गाँव) with Terracotta Seal · Search by Craft/Artisan · Cart (Jholi) ]
[ Category Guild Bar: Mitti (Terracotta) · Bunkar (Weaves) · Dhaatu (Brass) · Chitrakari (Art) · Kaasth (Wood) ]

[ Hero Chaupal: Cinematic Carousel - "From the Hands of Molela to Your Home" ]
[ Curated Haat Highlights: Direct from Karigar Clusters · GI Tag Certified ]
[ Interactive Craft Guild Showcase: Tactile Clay, Indigo, Bell-Metal Cards ]
[ The Karigar Chaupal: Artisan Spotlight with Audio Story Clip ]
[ Kala Ki Yatra: 4-Step Making Process (Earth -> Chaak -> Carving -> Kiln Firing) ]
[ Fair-Trade Transparency & GI Provenance Guarantee ]
[ Village Footer: Jharokha Silhouette Arch · Newsletter "Gaav Darpan" · Artisan Registration ]
```

### Signature Components:
- **Product Card ("Vastu Patra")**: Jharokha arch frame, Neel Indigo GI Tag badge, artisan portrait avatar, fair-share return tooltip (`72% returns directly to the craft cluster`), and Terracotta pill button (`Jholi Mein Dalein`).
- **Artisan Profile Card ("Karigar Chaupal")**: Audio story snippet player (`Suniye Karigar Ki Awaaz`), master years badge (`4th Generation Clay Sculptor`).
- **Process Accordion ("Kala Ki Yatra")**: 4-step photographic lifecycle (*Soil Sourcing -> Wheel Shaping -> Sun Baking & Carving -> Kiln Firing*).
- **Night / Festive "Diya Mode"**: Village night dark theme with midnight indigo background (`#141923`), dark terracotta slate (`#2A221E`), and glowing diya flame accents (`#F5A623`).

---

*Master design specification updated for Mittilok Gaav.*
