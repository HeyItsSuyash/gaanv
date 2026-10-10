"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Instagram, Facebook, Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TeamPage() {
  const { lang } = useLanguage();

  // Co-Founders
  const coFounders = [
    {
      name: "Gaurav Srivastav",
      role: lang === "hi" ? "सह-संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO)" : "Co-Founder & Chief Executive Officer",
      photo: "/founderceo.jpg",
      points: [
        lang === "hi" ? "मिशन व ग्रामीण वाणिज्य रणनीति" : "Mission architecture & rural commerce strategy",
        lang === "hi" ? "बलरामपुर एवं तराई क्लस्टर विस्तार" : "Balrampur & Terai artisan network development",
      ],
    },
    {
      name: "Vijay Upadhyay",
      role: lang === "hi" ? "सह-संस्थापक एवं मुख्य परिचालन अधिकारी (COO)" : "Co-Founder & Chief Operating Officer",
      photo: "/foundercoo.png",
      points: [
        lang === "hi" ? "ज़मीनी फील्ड लॉजिस्टिक्स व आपूर्ति श्रृंखला" : "Grassroots operations & supply chain integrity",
        lang === "hi" ? "कारीगर ऑनबोर्डिंग एवं प्रत्यक्ष भुगतान" : "Artisan collective onboarding & direct payouts",
      ],
    },
  ];

  // Technical Mentor
  const mentors = [
    {
      name: "Archana Nirvalla",
      role: lang === "hi" ? "तकनीकी सलाहकार एवं मेंटर" : "Technical Mentor",
      photo: null,
      points: [
        lang === "hi" ? "तकनीकी मार्गदर्शन एवं आर्किटेक्चर समीक्षा" : "System architecture & engineering guidance",
        lang === "hi" ? "स्केलेबिलिटी एवं डिजिटल नवाचार" : "Scale strategy & technology mentorship",
      ],
    },
  ];

  // Technical Heads
  const techHeads = [
    {
      name: "Suyash Shukla",
      role: lang === "hi" ? "तकनीकी प्रमुख (Technical Head)" : "Technical Head",
      photo: null,
      points: [
        lang === "hi" ? "प्लेटफ़ॉर्म इंजीनियरिंग एवं कोर आर्किटेक्चर" : "Platform engineering & core web architecture",
        lang === "hi" ? "सुरक्षा, परफॉर्मेंस व डिजिटल अनुभव" : "System performance, security & user experience",
      ],
    },
    {
      name: "Shailendra Mani Pandey",
      role: lang === "hi" ? "तकनीकी प्रमुख (Technical Head)" : "Technical Head",
      photo: null,
      points: [
        lang === "hi" ? "सिस्टम इंफ्रास्ट्रक्चर एवं डेटा पाइपलाइन्स" : "Infrastructure systems & data pipeline design",
        lang === "hi" ? "लॉजिस्टिक्स व परिचालन तकनीकी समाधान" : "Operational tooling & logistical integrations",
      ],
    },
  ];

  return (
    <div className="flex flex-col bg-bone text-ink relative min-h-screen">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-warli-pattern opacity-[0.06] pointer-events-none" />

      {/* Header Banner */}
      <section className="relative bg-bone-d py-14 sm:py-20 border-b border-mist/60 overflow-hidden">
        <div className="absolute inset-0 bg-mandana-pattern opacity-[0.06] pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 text-center max-w-3xl">
          <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] leading-tight text-ink font-normal tracking-tight">
            {lang === "hi" ? "हमारी टीम" : "Our Team"}
          </h1>
          <p className="mt-3 text-[15px] sm:text-[17px] text-stone leading-relaxed font-serif max-w-2xl mx-auto">
            {lang === "hi"
              ? "गाँव बाय मिट्टीलोक के निर्माता, सलाहकार और तकनीकी नेतृत्व"
              : "The leadership, mentorship, and engineering minds behind Gaanv by Mittilok"}
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <main className="relative py-14 sm:py-20 mx-auto max-w-[1120px] px-5 sm:px-6 md:px-8 w-full">
        {/* 1. CO-FOUNDERS */}
        <div className="mb-16 sm:mb-20">
          <h2 className="font-serif text-[24px] sm:text-[28px] text-ink font-normal text-center mb-10 pb-2 border-b border-mist/60 max-w-md mx-auto">
            {lang === "hi" ? "सह-संस्थापक (Co-Founders)" : "Co-Founders"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto">
            {coFounders.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                {/* Circular image with curved backdrop tag shape */}
                <div className="relative mb-5">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[#ddd4c4]/60 border border-mist transition-transform duration-300 group-hover:scale-105 shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          unoptimized
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone">
                          <User className="w-12 h-12 text-stone/60" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-[20px] sm:text-[22px] font-semibold text-ink leading-tight">
                  {person.name}
                </h3>
                <p className="text-[#9b3d2b] text-[13px] sm:text-[14px] font-medium mt-1">
                  {person.role}
                </p>

                {person.points && person.points.length > 0 && (
                  <ul className="mt-3 space-y-1 text-stone text-[13px] font-sans text-center max-w-xs">
                    {person.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-snug">
                        • {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. TECHNICAL MENTOR */}
        <div className="mb-16 sm:mb-20">
          <h2 className="font-serif text-[24px] sm:text-[28px] text-ink font-normal text-center mb-10 pb-2 border-b border-mist/60 max-w-md mx-auto">
            {lang === "hi" ? "तकनीकी सलाहकार (Technical Mentor)" : "Technical Mentor"}
          </h2>

          <div className="flex justify-center">
            {mentors.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group max-w-sm">
                <div className="relative mb-5">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[#ddd4c4]/60 border border-mist transition-transform duration-300 group-hover:scale-105 shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          unoptimized
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone">
                          <User className="w-14 h-14 text-stone/60" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-[20px] sm:text-[22px] font-semibold text-ink leading-tight">
                  {person.name}
                </h3>
                <p className="text-[#9b3d2b] text-[13px] sm:text-[14px] font-medium mt-1">
                  {person.role}
                </p>

                {person.points && person.points.length > 0 && (
                  <ul className="mt-3 space-y-1 text-stone text-[13px] font-sans text-center max-w-xs">
                    {person.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-snug">
                        • {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. TECHNICAL HEADS */}
        <div className="mb-20 sm:mb-24">
          <h2 className="font-serif text-[24px] sm:text-[28px] text-ink font-normal text-center mb-10 pb-2 border-b border-mist/60 max-w-md mx-auto">
            {lang === "hi" ? "तकनीकी प्रमुख (Technical Heads)" : "Technical Heads"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto">
            {techHeads.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="relative mb-5">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[#ddd4c4]/60 border border-mist transition-transform duration-300 group-hover:scale-105 shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          unoptimized
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone">
                          <User className="w-12 h-12 text-stone/60" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-[20px] sm:text-[22px] font-semibold text-ink leading-tight">
                  {person.name}
                </h3>
                <p className="text-[#9b3d2b] text-[13px] sm:text-[14px] font-medium mt-1">
                  {person.role}
                </p>

                {person.points && person.points.length > 0 && (
                  <ul className="mt-3 space-y-1 text-stone text-[13px] font-sans text-center max-w-xs">
                    {person.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-snug">
                        • {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. TRUST & COMMUNITY METRICS SECTION */}
        <section className="pt-10 border-t border-mist/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-[22px] sm:text-[28px] text-ink font-normal leading-relaxed">
              {lang === "hi"
                ? "हमारे मिशन में विश्वास करने वालों का भरोसा"
                : "Followed by the trust of the ones who believe in our mission"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {/* Instagram Metric */}
            <div className="rounded-card bg-paper border border-mist p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-bone-d border border-mist flex items-center justify-center text-[#9b3d2b] mb-3">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="font-serif text-[30px] sm:text-[34px] font-semibold text-ink tracking-tight">
                80k+
              </span>
              <p className="text-stone text-[14px] font-medium mt-1">
                {lang === "hi" ? "फॉलोअर्स इंस्टाग्राम पर" : "Followers on Instagram"}
              </p>
            </div>

            {/* Facebook Metric */}
            <div className="rounded-card bg-paper border border-mist p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-bone-d border border-mist flex items-center justify-center text-[#2c4263] mb-3">
                <Facebook className="w-6 h-6" />
              </div>
              <span className="font-serif text-[30px] sm:text-[34px] font-semibold text-ink tracking-tight">
                80k+
              </span>
              <p className="text-stone text-[14px] font-medium mt-1">
                {lang === "hi" ? "फॉलोअर्स फेसबुक पर" : "Followers on Facebook"}
              </p>
            </div>

            {/* Customers Metric */}
            <div className="rounded-card bg-paper border border-mist p-6 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-bone-d border border-mist flex items-center justify-center text-[#967432] mb-3">
                <Users2 className="w-6 h-6" />
              </div>
              <span className="font-serif text-[30px] sm:text-[34px] font-semibold text-ink tracking-tight">
                1000+
              </span>
              <p className="text-stone text-[14px] font-medium mt-1">
                {lang === "hi" ? "संतुष्ट ग्राहक" : "Customers till date"}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
