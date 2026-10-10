"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, MapPin, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TeamPage() {
  const { lang } = useLanguage();

  const leadership = [
    {
      name: "Gaurav Srivastav",
      role: lang === "hi" ? "संस्थापक एवं मुख्य कार्यकारी अधिकारी" : "Founder & Chief Executive Officer",
      shortRole: "CEO",
      org: "Mittilok & Mittilok Gaon",
      photo: "/founderceo.jpg",
      location: "Balrampur & Lucknow, UP",
      bio:
        lang === "hi"
          ? "उत्तर प्रदेश के सुदूर तराई अंचल (बलरामपुर) और शिल्प मुहल्लों से सीधे संचालित। ग्रामीण महिला स्वयं सहायता समूहों को तकनीक के माध्यम से बिना बिचौलियों के वैश्विक बाज़ार से जोड़ने का विजन।"
          : "Pioneering technology-led rural commerce directly from UP's Terai belt (Balrampur) and grassroots clusters. Championing direct escrow protection, verified GI tracking, and fair payouts for rural craftswomen.",
      focus: lang === "hi" ? "कार्यकारी विजन व रणनीति" : "Executive Strategy & Governance",
    },
    {
      name: "Vijay Upadhyay",
      role: lang === "hi" ? "सह-संस्थापक एवं मुख्य परिचालन अधिकारी" : "Founder & Chief Operating Officer",
      shortRole: "COO",
      org: "Mittilok & Mittilok Gaon",
      photo: "/foundercoo.png",
      location: "Uttar Pradesh",
      bio:
        lang === "hi"
          ? "ज़मीनी फील्ड ऑपरेशंस, कारीगर ऑनबोर्डिंग, रसद एवं आपूर्ति श्रृंखला की देखरेख ताकि हर कारीगर दीदी को सुरक्षित सामग्री व पारदर्शी भुगतान प्राप्त हो सके।"
          : "Leading grassroots field logistics, artisan collective onboarding, and supply-chain integrity ensuring verified product delivery and rapid transparent payouts across 75 UP districts.",
      focus: lang === "hi" ? "फ़ील्ड ऑपरेशंस एवं सप्लाय-चेन" : "Field Operations & Supply Integrity",
    },
  ];

  // Functional Leads / Cluster Positions
  const upcomingTeamSlots = [
    {
      title: lang === "hi" ? "जीआई रजिस्ट्री एवं शिल्प संरक्षण प्रमुख" : "GI Heritage & Verification Lead",
      dept: lang === "hi" ? "सत्यापन एवं प्रमाणन" : "Artisan Trust & Certification",
      location: "Varanasi & Lucknow, UP",
      description:
        lang === "hi"
          ? "उत्तर प्रदेश के पंजीकृत भौगोलिक संकेतक (GI Tags) एवं जनजातीय कलाकृतियों का सरकारी मानकों के अनुसार भौतिक व दस्तावेजी सत्यापन।"
          : "Oversees physical field verification, GI Registry compliance, and authentic craft auditing for registered maker clusters.",
      status: lang === "hi" ? "सक्रिय भर्ती" : "Position Open",
    },
    {
      title: lang === "hi" ? "थारू जनजातीय क्लस्टर समन्वयक" : "Tharu Tribal Cluster Coordinator",
      dept: lang === "hi" ? "जनजातीय स्वयं सहायता समूह" : "Grassroots SHG Mobilization",
      location: "Balrampur & Suhelwa, UP",
      description:
        lang === "hi"
          ? "बलरामपुर के पचपेड़वा व सुहेलवा वन क्षेत्र की 180+ थारू महिला स्वयं सहायता समूहों के साथ मूंज, ढाकिया व कसीदाकारी उत्पादन का समन्वय।"
          : "Direct ground coordinator liaising with 180+ Tharu matriarchs across Suhelwa forest villages for Moonj basketry & Kasuti embroidery.",
      status: lang === "hi" ? "सक्रिय भर्ती" : "Position Open",
    },
    {
      title: lang === "hi" ? "इको-पैकेजिंग एवं लॉजिस्टिक्स प्रबंधक" : "Eco-Logistics & Quality Lead",
      dept: lang === "hi" ? "आपूर्ति श्रृंखला एवं गुणवत्ता" : "Supply Chain & Dispatch",
      location: "Gorakhpur & Purvanchal, UP",
      description:
        lang === "hi"
          ? "मिट्टी, कांस्य व हथकरघा शिल्पों की सुरक्षित प्लास्टिक-मुक्त पैकेजिंग और एक्सप्रेस घरेलू व अंतरराष्ट्रीय डिलीवरी की निगरानी।"
          : "Engineers zero-plastic earthen protective packaging and express dispatch protocols from chaupal nodes to global doorsteps.",
      status: lang === "hi" ? "सक्रिय भर्ती" : "Position Open",
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
      <div className="absolute inset-0 bg-warli-pattern opacity-[0.06] pointer-events-none" />

      {/* Header Banner */}
      <section className="relative bg-bone-d py-16 md:py-24 border-b border-mist/60 overflow-hidden">
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.06] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 text-center max-w-3xl">
          <h1 className="font-serif text-[36px] sm:text-[46px] md:text-[54px] leading-tight text-ink font-normal tracking-tight">
            {lang === "hi" ? "हमारी टीम" : "Our Team"}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-stone leading-relaxed font-serif max-w-2xl mx-auto">
            {lang === "hi"
              ? "गाँव बाय मिट्टीलोक के संस्थापक और ज़मीनी सारथी, जो भारत के पारंपरिक कारीगरों को आधुनिक तकनीक और सम्मान के साथ वैश्विक बाज़ार से जोड़ते हैं।"
              : "The leadership and grassroots stewards building Gaanv by Mittilok, bridging deep rural soil with modern zero-middlemen commerce."}
          </p>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="relative py-16 md:py-24 mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-[28px] sm:text-[34px] text-ink font-normal">
            {lang === "hi" ? "कार्यकारी नेतृत्व" : "Executive Leadership"}
          </h2>
          <p className="mt-2 text-stone text-[15px]">
            {lang === "hi"
              ? "प्रत्यक्ष उत्तरदायित्व, पारदर्शी संचालन और माटी से जुड़ाव।"
              : "Direct accountability, field integrity, and zero-compromise artisan welfare."}
          </p>
        </div>

        {/* Executive Leadership Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leadership.map((exec, idx) => (
            <div
              key={idx}
              className="group rounded-card bg-paper border border-mist hover:border-brass/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Executive Portrait Frame */}
              <div className="relative w-full sm:w-[200px] h-[260px] sm:h-auto shrink-0 bg-[#16110d] overflow-hidden">
                {exec.photo ? (
                  <Image
                    src={exec.photo}
                    alt={exec.name}
                    fill
                    priority
                    unoptimized
                    className="object-cover object-top filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone">
                    <User className="w-12 h-12 text-[#6e6456]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                <span className="absolute top-3 left-3 bg-[#241b14]/90 backdrop-blur-sm text-[#d4af37] text-[11px] font-mono uppercase px-2.5 py-1 rounded-pill border border-[#524132]/60 shadow-sm">
                  {exec.shortRole}
                </span>
              </div>

              {/* Executive Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-[22px] font-semibold text-ink leading-tight">
                        {exec.name}
                      </h3>
                      <p className="text-[#9b3d2b] text-[13px] font-medium mt-1">
                        {exec.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-stone text-[12px] font-medium mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-stone/70" /> {exec.org}
                  </p>

                  <p className="text-[11px] text-stone font-mono mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brass" /> {exec.location}
                  </p>

                  <p className="text-[13px] text-stone leading-relaxed font-sans mt-4 pt-4 border-t border-mist/60">
                    {exec.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-mist/40 flex items-center justify-between text-xs text-stone">
                  <span className="text-brass font-medium">{exec.focus}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {lang === "hi" ? "सत्यापित" : "Verified"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FUNCTIONAL TEAM SLOTS / ROLES */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif text-[24px] sm:text-[28px] text-ink font-normal">
              {lang === "hi" ? "फील्ड ऑपरेशंस एवं क्लस्टर समन्वयक" : "Field Operations & Cluster Leads"}
            </h3>
            <p className="mt-1.5 text-stone text-[14px]">
              {lang === "hi"
                ? "प्रत्येक शिल्प क्लस्टर और जीआई केंद्र के लिए समर्पित ज़मीनी सारथी"
                : "Dedicated grassroots personnel managing regional clusters, GI audits, and logistics"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTeamSlots.map((slot, idx) => (
              <div
                key={idx}
                className="rounded-card bg-paper border border-mist hover:border-brass/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Clean, professional placeholder header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-mist/50">
                    <div className="w-12 h-12 rounded-full bg-bone-d border border-mist flex items-center justify-center text-stone shrink-0">
                      <User className="w-6 h-6 text-stone/70" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-madder font-medium block">
                        {slot.dept}
                      </span>
                      <span className="text-[11px] text-stone/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-brass" /> {slot.location}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-serif text-[17px] text-ink font-semibold leading-snug">
                    {slot.title}
                  </h4>

                  <p className="text-[13px] text-stone leading-relaxed font-sans mt-3">
                    {slot.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-mist/50 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-brass font-medium">{slot.status}</span>
                  <span className="text-stone">UP Field Node</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UP Field Clusters & Grassroots Presence */}
      <section className="relative py-16 md:py-20 bg-bone-d/60 border-t border-mist/60 overflow-hidden">
        <div className="absolute inset-0 bg-warli-pattern opacity-[0.08] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="font-serif text-h2 text-ink">
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
                className="rounded-card bg-paper border border-mist p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-madder font-medium block mb-1">
                    {item.cluster}
                  </span>
                  <h4 className="font-serif text-[17px] text-ink font-medium">{item.community}</h4>
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
                  ? "हम बलरामपुर, बहराइच, लखीमपुर, मीरजापुर और पूरे 75 ज़िलों के पारंपरिक दस्तकारों का निःशुल्क पंजीकरण और ऑन-साइट सहायता करते हैं।"
                  : "We provide zero-fee onboarding, free product cataloging, and direct escrow bank payments for makers across all 75 UP districts."}
              </p>
            </div>
            <Link
              href="/explore-products"
              className="inline-flex items-center justify-center gap-2 rounded-button bg-brass hover:bg-[#e6a73c] text-[#14110c] px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all active:scale-95 shadow-md"
            >
              {lang === "hi" ? "शिल्प हाट देखें" : "Explore The Crafts"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
