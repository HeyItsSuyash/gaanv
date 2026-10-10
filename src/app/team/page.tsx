"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TeamPage() {
  const { lang } = useLanguage();

  const coreTeam = [
    {
      name: "XYZ",
      role: lang === "hi" ? "संस्थापक एवं प्रधान वास्तुकार" : "Founder & Lead Architect",
      location: "Uttar Pradesh",
      photo: "/gauri-avatar.jpg",
      bio:
        lang === "hi"
          ? "अवध और तराई बेल्ट (बलरामपुर, श्रावस्ती) के महिला स्वयं सहायता समूहों को तकनीक के माध्यम से सीधे वैश्विक बाज़ार से जोड़ने का विजन।"
          : "Developing Gaanv by Mittilok to connect UP's Terai belt (Balrampur, Shravasti) and Purvanchal artisan clusters directly with conscious buyers.",
      badge: "Founder",
    },
    {
      name: "Dr. Ananya Mishra",
      role: lang === "hi" ? "शिल्प शोध व जीआई रजिस्ट्री सलाहकार" : "Craft Heritage & GI Specialist",
      location: "Varanasi, Uttar Pradesh",
      photo: "/shg-women-textiles.jpg",
      bio:
        lang === "hi"
          ? "काशी हिंदू विश्वविद्यालय से लोक कला शोधकर्ता। उत्तर प्रदेश के पंजीकृत भौगोलिक संकेतकों (GI Tags) व जनजातीय क्राफ्ट्स की प्रामाणिकता सत्यापन की देखरेख।"
          : "Folk art researcher from BHU, Varanasi. Oversees GI tag authentication and documentation of indigenous UP crafts.",
      badge: "Artisan Verification",
    },
    {
      name: "Radhika Verma",
      role: lang === "hi" ? "तराई एवं बलरामपुर क्लस्टर प्रमुख" : "Terai & Balrampur Cluster Head",
      location: "Balrampur, Uttar Pradesh",
      photo: "/shg-women-crafts.jpg",
      bio:
        lang === "hi"
          ? "बलरामपुर और बहराइच के थारू जनजातीय महिला स्वयं सहायता समूहों के साथ मूंज क्राफ्ट व थारू कढ़ाई का समन्वय।"
          : "Working at grassroots with Tharu tribal women SHGs across Balrampur and Bahraich. Mobilizing Moonj grass and hand-embroidery clusters.",
      badge: "Grassroots Mobilizer",
    },
    {
      name: "Virendra Singh Rawat",
      role: lang === "hi" ? "कारीगर लॉजिस्टिक्स एवं एस्क्रो सुरक्षा" : "Artisan Logistics & Fair Trade Lead",
      location: "Gorakhpur, Uttar Pradesh",
      photo: "/shg-women-pottery.jpg",
      bio:
        lang === "hi"
          ? "गोरखपुर टेराकोटा एवं बुंदेलखंड शिल्पों की इको-पैकेजिंग, गुणवत्ता नियंत्रण और शून्य-बिचौलिया भुगतान की निगरानी।"
          : "Manages safe packaging, quality standards, and immediate direct bank payouts from Gorakhpur to all 75 UP districts.",
      badge: "Fair Payouts & Ops",
    },
  ];

  const upGrassrootsPartners = [
    {
      cluster: "Balrampur & Shravasti (तराई अंचल)",
      community: "Tharu Tribal Women Collectives (थारू जनजाति)",
      crafts: "Sikki & Moonj Grass Weaving, Tharu Kasuti Needlework",
      artisanCount: "180+ Women",
    },
    {
      cluster: "Khurja & Bulandshahr",
      community: "Mitti Srijan Mahila Mandal",
      crafts: "Food-Safe Ceramic Cookware, Terracotta Planters",
      artisanCount: "65+ Potters",
    },
    {
      cluster: "Varanasi & Azamgarh",
      community: "Purvanchal Bunkar Mahila Samiti",
      crafts: "Katan Silk Weaves, Nizamabad Black Terracotta",
      artisanCount: "140+ Weavers",
    },
    {
      cluster: "Sonbhadra & Mirzapur",
      community: "Kole & Baiga Forest Guilds",
      crafts: "Natural Lac Bangles, Hand-knotted Mirzapur Wool Dhurries",
      artisanCount: "95+ Artisans",
    },
  ];

  return (
    <div className="flex flex-col bg-bone text-ink relative min-h-screen">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-warli-pattern opacity-10 pointer-events-none" />

      {/* Header Banner */}
      <section className="relative bg-bone-d py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mandana-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 border border-[#524132] bg-[#241b14] text-[#d4af37] text-[11px] font-mono px-3 py-1 rounded-pill uppercase tracking-wider mb-4">
            {lang === "hi" ? "उत्तर प्रदेश से विकसित • मिट्टी की खुशबू" : "Developed in Uttar Pradesh • Grounded in Soil"}
          </span>
          <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[52px] leading-tight text-ink font-normal">
            {lang === "hi" ? "हमारी टीम एवं ज़मीनी सारथी" : "Our Team & Village Grassroots"}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[17px] text-stone leading-relaxed font-serif">
            {lang === "hi"
              ? "गाँव बाय मिट्टीलोक लखनऊ, बलरामपुर और पूर्वांचल के चौपालों से संचालित है। हम सॉफ्टवेयर इंजीनियर्स, शिल्प शोधकर्ताओं और थारू जनजातीय महिला सखियों का एक ऐसा समूह हैं जो भारत के कारीगरों को उनका सच्चा सम्मान दिलाने के लिए प्रतिबद्ध हैं।"
              : "Built and engineered in Uttar Pradesh. We are a collective of technologists, field researchers, and women SHG coordinators from Lucknow, Balrampur, Varanasi, and Gorakhpur dedicated to zero-middlemen rural commerce."}
          </p>
        </div>
      </section>

      {/* Folk Border Divider */}
      <div className="folk-border-divider" aria-hidden="true" />

      {/* Core Team Grid */}
      <section className="relative py-16 md:py-20 mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-madder font-semibold">
            {lang === "hi" ? "मुख्य नेतृत्व" : "Core Stewards"}
          </span>
          <h2 className="font-serif text-h2 text-ink mt-1">
            {lang === "hi" ? "माटी और तकनीक को जोड़ते लोग" : "People Bridging Soil & Technology"}
          </h2>
          <p className="mt-2 text-stone text-[15px]">
            {lang === "hi"
              ? "हर सदस्य उत्तर प्रदेश की शिल्प धरोहर और ग्राम-सशक्तिकरण से व्यक्तिगत रूप से जुड़ा हुआ है।"
              : "Each team member has deep roots across UP's handicraft villages and artisan welfare."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {coreTeam.map((member, i) => (
            <div
              key={i}
              className="rounded-card bg-paper border border-mist p-5 shadow-lg hover:border-brass/70 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Passport size photo with name written in a white box over the photo */}
                <div className="relative w-full aspect-[3/4] max-w-[200px] mx-auto rounded-md overflow-hidden border-2 border-mist bg-bone shadow-md mb-4 flex items-end justify-center">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                  {/* Name written in a white box over the passport size picture */}
                  <div className="relative z-10 w-[90%] mb-2.5 bg-white text-ink border border-mist/80 py-1 px-2 rounded-xs shadow-md text-center">
                    <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-ink leading-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Role below */}
                <div className="text-center mb-3">
                  <p className="text-madder text-[12px] font-mono font-semibold uppercase tracking-wide">
                    {member.role}
                  </p>
                  <span className="text-[11px] text-stone font-mono block mt-0.5">
                    📍 {member.location}
                  </span>
                </div>

                <p className="text-[13px] text-stone leading-relaxed font-sans text-center">
                  {member.bio}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-mist/50 flex items-center justify-between text-[11px] text-stone font-mono">
                <span className="text-brass font-medium">{member.badge}</span>
                <span>UP Heritage</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UP Field Clusters & Grassroots Presence */}
      <section className="relative py-16 md:py-20 bg-bone-d/60 overflow-hidden">
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.12] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-madder font-semibold">
              {lang === "hi" ? "ज़िला एवं क्लस्टर उपस्थिति" : "Grassroots District Presence"}
            </span>
            <h2 className="font-serif text-h2 text-ink mt-1">
              {lang === "hi" ? "उत्तर प्रदेश के सुदूर अंचलों में हमारे केंद्र" : "Field Centers in the Heart of Uttar Pradesh"}
            </h2>
            <p className="mt-2 text-stone text-[15px]">
              {lang === "hi"
                ? "हम किसी दूरस्थ महानगर से नहीं, बल्कि बलरामपुर की तराई, खुर्जा के भट्ठों और अवध के बुनकर मुहल्लों के बीच काम करते हैं।"
                : "Rather than operating from detached tech hubs, our operational backbone is embedded in UP's traditional craft centers."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upGrassrootsPartners.map((item, idx) => (
              <div
                key={idx}
                className="rounded-card bg-paper border border-mist p-5 shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-madder font-semibold uppercase block mb-1">
                    {item.cluster}
                  </span>
                  <h4 className="font-serif text-[18px] text-ink font-normal">{item.community}</h4>
                  <p className="text-[13px] text-stone mt-2 leading-relaxed">
                    {item.crafts}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-mist/50 flex items-center justify-between text-xs font-mono text-brass font-medium">
                  <span>Community Size</span>
                  <span>{item.artisanCount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Roots Commitment Card */}
          <div className="mt-12 rounded-card bg-[#241b14] text-[#f7f3ec] p-6 sm:p-8 border border-[#382b20] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-serif text-[22px] sm:text-[26px] text-[#f7f3ec] font-normal">
                {lang === "hi"
                  ? "क्या आप उत्तर प्रदेश के कारीगर या स्वयं सहायता समूह से हैं?"
                  : "Are you an artisan or SHG based in Uttar Pradesh?"}
              </h3>
              <p className="text-[14px] text-[#a89a88] mt-2 leading-relaxed">
                {lang === "hi"
                  ? "हम बलरामपुर, बहराइच, लखीमपुर, मीरजापुर और पूरे 75 ज़िलों के पारंपरिक दस्तकारों का निःशुल्क पंजीकरण और ऑन-साइट फोटोग्राफी सहायता करते हैं।"
                  : "We provide zero-fee onboarding, free product cataloging, and direct escrow bank payments for makers across all 75 UP districts."}
              </p>
            </div>
            <Link
              href="/explore-products"
              className="inline-flex items-center justify-center gap-2 rounded-button bg-brass hover:bg-[#e6a73c] text-[#14110c] px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all active:scale-95 shadow-md"
            >
              {lang === "hi" ? "शिल्प हाट देखें →" : "Explore The Crafts →"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
