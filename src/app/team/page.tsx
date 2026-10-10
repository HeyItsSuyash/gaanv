"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TeamPage() {
  const { lang } = useLanguage();

  const leadership = {
    ceo: {
      name: "Gaurav Srivastav",
      role: lang === "hi" ? "संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO)" : "Founder & Chief Executive Officer",
      companies: "Mittilok & Mittilok Gaon",
      photo: "/founderceo.jpeg",
      location: "Balrampur & Lucknow, UP",
      bio:
        lang === "hi"
          ? "उत्तर प्रदेश के सुदूर तराई अंचल (बलरामपुर) और शिल्प मुहल्लों से सीधे संचालित। ग्रामीण महिला स्वयं सहायता समूहों को तकनीक के माध्यम से बिना बिचौलियों के वैश्विक बाज़ार से जोड़ने का विजन।"
          : "Pioneering technology-led rural commerce directly from UP's Terai belt (Balrampur) and grassroots clusters. Championing 100% dignity, escrow protection, and direct fair payouts for rural craftswomen.",
      badge: "Executive Leadership",
    },
    coo: {
      name: "Vijay Upadhyay",
      role: lang === "hi" ? "सह-संस्थापक एवं मुख्य परिचालन अधिकारी (COO)" : "Founder & Chief Operating Officer",
      companies: "Mittilok & Mittilok Gaon",
      photo: null, // User icon placeholder
      location: "Uttar Pradesh",
      bio:
        lang === "hi"
          ? "ज़मीनी फील्ड ऑपरेशंस, कारीगर ऑनबोर्डिंग, रसद एवं आपूर्ति श्रृंखला की देखरेख ताकि हर कारीगर दीदी को 24-48 घंटों में सुरक्षित सामग्री व भुगतान प्राप्त हो सके।"
          : "Leading grassroots field logistics, artisan collective onboarding, and supply-chain integrity ensuring verified delivery and rapid transparent payouts across 75 UP districts.",
      badge: "Operations & Grassroots",
    },
  };

  // Open / upcoming team mate slots
  const upcomingTeamSlots = [
    {
      title: lang === "hi" ? "जीआई रजिस्ट्री एवं शिल्प संरक्षण प्रमुख" : "GI Heritage & Verification Lead",
      dept: "Artisan Trust & Authenticity",
      location: "Varanasi & Lucknow, UP",
      description:
        lang === "hi"
          ? "उत्तर प्रदेश के पंजीकृत भौगोलिक संकेतक (GI Tags) एवं जनजातीय कलाकृतियों का सरकारी मानकों के अनुसार भौतिक व दस्तावेजी सत्यापन।"
          : "Oversees physical field verification, GI Registry compliance, and authentic certificate auditing for handmade rural crafts.",
    },
    {
      title: lang === "hi" ? "थारू जनजातीय क्लस्टर समन्वयक" : "Tharu Tribal Cluster Coordinator",
      dept: "Grassroots SHG Mobilization",
      location: "Balrampur & Suhelwa, UP",
      description:
        lang === "hi"
          ? "बलरामपुर के पचपेड़वा व सुहेलवा वन क्षेत्र की 180+ थारू महिला स्वयं सहायता समूहों के साथ मूंज, ढाकिया व कसीदाकारी उत्पादन का समन्वय।"
          : "Direct ground coordinator liaising with 180+ Tharu matriarchs across Suhelwa forest villages for Moonj basketry & Kasuti embroidery.",
    },
    {
      title: lang === "hi" ? "इको-पैकेजिंग एवं लॉजिस्टिक्स प्रबंधक" : "Eco-Logistics & Quality Lead",
      dept: "Supply Chain & Dispatch",
      location: "Gorakhpur & Purvanchal, UP",
      description:
        lang === "hi"
          ? "मिट्टी, कांस्य व हथकरघा शिल्पों की सुरक्षित प्लास्टिक-मुक्त पैकेजिंग और एक्सप्रेस घरेलू व अंतरराष्ट्रीय डिलीवरी की निगरानी।"
          : "Engineers zero-plastic earthen protective packaging and express dispatch protocols from chaupal nodes to global doorsteps.",
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
            {lang === "hi" ? "माई टीम (My Team)" : "My Team"}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[17px] text-stone leading-relaxed font-serif">
            {lang === "hi"
              ? "गाँव बाय मिट्टीलोक की रीढ़: वे नेतृत्वकर्ता और ज़मीनी सारथी जो भारत के ग्रामीण हुनर को तकनीक और सम्मान के साथ वैश्विक स्तर पर स्थापित कर रहे हैं।"
              : "The leadership architecture and grassroots stewards behind Gaanv by Mittilok, bridging deep rural soil with modern zero-middlemen technology."}
          </p>
        </div>
      </section>

      {/* Folk Border Divider */}
      <div className="folk-border-divider" aria-hidden="true" />

      {/* HIERARCHICAL LEADERSHIP CHART */}
      <section className="relative py-16 md:py-24 mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-madder font-semibold">
            {lang === "hi" ? "नेतृत्व संरचना चार्ट" : "Organizational Hierarchy"}
          </span>
          <h2 className="font-serif text-h2 text-ink mt-1">
            {lang === "hi" ? "कार्यकारी नेतृत्व एवं संस्थापक मंडल" : "Executive Leadership & Stewardship"}
          </h2>
          <p className="mt-2 text-stone text-[15px]">
            {lang === "hi"
              ? "प्रत्यक्ष उत्तरदायित्व, पारदर्शी संचालन और माटी से जुड़ाव।"
              : "Direct accountability, field integrity, and zero-compromise artisan welfare."}
          </p>
        </div>

        {/* HIERARCHY TREE CONTAINER */}
        <div className="flex flex-col items-center">
          {/* LEVEL 1: CEO NODE */}
          <div className="relative z-10 w-full max-w-[440px]">
            <div className="rounded-card bg-paper border-2 border-brass/60 shadow-2xl p-6 sm:p-7 hover:border-brass transition-all flex flex-col items-center text-center relative overflow-hidden">
              <span className="absolute top-3 end-3 bg-[#241b14] text-[#d4af37] text-[10px] font-mono uppercase px-2.5 py-1 rounded-pill border border-[#524132]">
                CEO
              </span>

              {/* Founder Image with Clean Framing */}
              <div className="relative w-36 h-48 sm:w-40 sm:h-52 rounded-md overflow-hidden border-2 border-mist bg-[#120d09] shadow-lg mb-4">
                <Image
                  src={leadership.ceo.photo}
                  alt={leadership.ceo.name}
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-ink leading-tight">
                {leadership.ceo.name}
              </h3>
              <p className="text-madder text-[13px] font-mono font-semibold uppercase tracking-wide mt-1">
                {leadership.ceo.role}
              </p>
              <p className="text-stone text-[12px] font-sans font-medium mt-0.5">
                {leadership.ceo.companies}
              </p>
              <span className="text-[11px] text-stone font-mono block mt-2 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brass" /> {leadership.ceo.location}
              </span>

              <p className="text-[13px] text-stone leading-relaxed font-sans mt-4 pt-4 border-t border-mist/60">
                {leadership.ceo.bio}
              </p>
            </div>
          </div>

          {/* CONNECTOR LINE: CEO down to COO & Core Leads */}
          <div className="w-0.5 h-12 bg-brass/60 my-1"></div>
          <div className="w-16 h-0.5 bg-brass/60 mb-8"></div>

          {/* LEVEL 2: FOUNDER & COO NODE */}
          <div className="w-full max-w-[440px] mb-14">
            <div className="rounded-card bg-paper border-2 border-brass/40 shadow-xl p-6 sm:p-7 hover:border-brass transition-all flex flex-col items-center text-center relative overflow-hidden">
              <span className="absolute top-3 end-3 bg-[#241b14] text-[#d4af37] text-[10px] font-mono uppercase px-2.5 py-1 rounded-pill border border-[#524132]">
                COO
              </span>

              {/* User Icon Placeholder Container */}
              <div className="relative w-36 h-48 sm:w-40 sm:h-52 rounded-md overflow-hidden border-2 border-dashed border-mist bg-bone-d/60 shadow-inner mb-4 flex flex-col items-center justify-center text-stone">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm border border-mist">
                  <User className="w-10 h-10 text-[#6e6456]" />
                </div>
                <span className="text-[11px] font-mono text-stone mt-2">Executive Portrait</span>
              </div>

              <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-ink leading-tight">
                {leadership.coo.name}
              </h3>
              <p className="text-madder text-[13px] font-mono font-semibold uppercase tracking-wide mt-1">
                {leadership.coo.role}
              </p>
              <p className="text-stone text-[12px] font-sans font-medium mt-0.5">
                {leadership.coo.companies}
              </p>
              <span className="text-[11px] text-stone font-mono block mt-2 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brass" /> {leadership.coo.location}
              </span>

              <p className="text-[13px] text-stone leading-relaxed font-sans mt-4 pt-4 border-t border-mist/60">
                {leadership.coo.bio}
              </p>
            </div>
          </div>

          {/* CONNECTOR LINE: COO branching to functional team mates */}
          <div className="w-0.5 h-10 bg-brass/40"></div>
          <div className="w-3/4 max-w-[720px] h-0.5 bg-brass/40 mb-8 hidden md:block"></div>

          {/* LEVEL 3: TEAM MATE CARDS (EMPTY WITH USER ICONS) */}
          <div className="w-full">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-stone font-semibold">
                {lang === "hi" ? "ज़मीनी समन्वय एवं क्लस्टर विंग" : "Ground Operations & Cluster Wings"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {upcomingTeamSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className="rounded-card bg-paper/90 border border-mist hover:border-brass/60 p-6 shadow-md transition-all flex flex-col justify-between items-center text-center relative"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* User Icon Empty Placeholder */}
                    <div className="w-24 h-32 rounded-md border-2 border-dashed border-mist bg-bone flex flex-col items-center justify-center text-stone shadow-inner mb-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-mist">
                        <User className="w-6 h-6 text-stone/80" />
                      </div>
                      <span className="text-[10px] font-mono text-stone/70 mt-1.5">Teammate</span>
                    </div>

                    <span className="text-[11px] font-mono text-madder font-semibold uppercase block">
                      {slot.dept}
                    </span>
                    <h4 className="font-serif text-[18px] text-ink font-semibold mt-1">
                      {slot.title}
                    </h4>
                    <span className="text-[11px] font-mono text-stone block mt-1">
                      📍 {slot.location}
                    </span>

                    <p className="text-[13px] text-stone leading-relaxed font-sans mt-3 pt-3 border-t border-mist/60">
                      {slot.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 w-full border-t border-mist/40 flex items-center justify-between text-[11px] font-mono text-stone">
                    <span className="text-brass">Joining Cluster</span>
                    <span>UP Field Ops</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
