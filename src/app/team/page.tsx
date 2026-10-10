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
      name: "Archana Narwal",
      role: lang === "hi" ? "तकनीकी सलाहकार एवं मेंटर" : "Technical Mentor",
      photo: "/archanamam.jpeg",
      points: [
        lang === "hi" ? "एमएससी कंप्यूटर साइंस (डिस्टिंक्शन), यूके" : "MSc Computer Science (Distinction), UK",
        lang === "hi" ? "महिला उद्यमियों के लिए डिजिटल मार्ग निर्माण" : "Building digital pathways for women entrepreneurs",
      ],
    },
  ];

  // Technical Heads
  const techHeads = [
    {
      name: "Suyash Shukla",
      role: lang === "hi" ? "तकनीकी प्रमुख (Technical Head)" : "Technical Head",
      photo: "/suyashshukla.jpg",
      points: [
        lang === "hi" ? "प्लेटफ़ॉर्म इंजीनियरिंग एवं कोर आर्किटेक्चर" : "Platform engineering & core web architecture",
        lang === "hi" ? "सुरक्षा, परफॉर्मेंस व डिजिटल अनुभव" : "System performance, security & user experience",
      ],
    },
    {
      name: "Shailendra Mani Pandey",
      role: lang === "hi" ? "तकनीकी प्रमुख (Technical Head)" : "Technical Head",
      photo: "/shailendramani.jpg",
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
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[#ddd4c4]/60 border border-mist shadow-sm">
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
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[#ddd4c4]/60 border border-mist shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-bone-d">
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          unoptimized
                          className="object-cover object-[center_20%]"
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
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[#ddd4c4]/60 border border-mist shadow-sm">
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

        {/* 4. TRUST & COMMUNITY METRICS SECTION (COUNTER DESIGN, NO CARDS) */}
        <section className="pt-12 border-t border-mist/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-[24px] sm:text-[30px] text-ink font-normal leading-relaxed">
              {lang === "hi"
                ? "हमारे मिशन में विश्वास करने वालों का भरोसा"
                : "Followed by the trust of the ones who believe in our mission"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto text-center divide-y sm:divide-y-0 sm:divide-x divide-mist/60">
            {/* Instagram Metric */}
            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-full bg-bone-d flex items-center justify-center text-[#9b3d2b] mb-2.5">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-serif text-[38px] sm:text-[46px] font-semibold text-ink tracking-tight tabular-nums">
                80k+
              </span>
              <p className="text-stone text-[14px] font-medium mt-0.5">
                {lang === "hi" ? "फॉलोअर्स इंस्टाग्राम पर" : "Followers on Instagram"}
              </p>
            </div>

            {/* Facebook Metric */}
            <div className="flex flex-col items-center pt-6 sm:pt-0 sm:ps-6">
              <div className="w-11 h-11 rounded-full bg-bone-d flex items-center justify-center text-[#2c4263] mb-2.5">
                <Facebook className="w-5 h-5" />
              </div>
              <span className="font-serif text-[38px] sm:text-[46px] font-semibold text-ink tracking-tight tabular-nums">
                80k+
              </span>
              <p className="text-stone text-[14px] font-medium mt-0.5">
                {lang === "hi" ? "फॉलोअर्स फेसबुक पर" : "Followers on Facebook"}
              </p>
            </div>

            {/* Customers Metric */}
            <div className="flex flex-col items-center pt-6 sm:pt-0 sm:ps-6">
              <div className="w-11 h-11 rounded-full bg-bone-d flex items-center justify-center text-[#967432] mb-2.5">
                <Users2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-[38px] sm:text-[46px] font-semibold text-ink tracking-tight tabular-nums">
                1000+
              </span>
              <p className="text-stone text-[14px] font-medium mt-0.5">
                {lang === "hi" ? "संतुष्ट ग्राहक" : "Customers till date"}
              </p>
            </div>
          </div>
        </section>

        {/* 5. FREQUENTLY ASKED QUESTIONS & SUPPORT ACCORDION */}
        <section className="mt-20 pt-14 border-t border-mist/80 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-[26px] sm:text-[32px] text-ink font-normal">
              {lang === "hi" ? "अक्सर पूछे जाने वाले सवाल एवं सहायता" : "Frequently Asked Questions & Support"}
            </h2>
            <p className="mt-2 text-stone text-[14px] sm:text-[15px]">
              {lang === "hi"
                ? "गाँव बाय मिट्टीलोक के संचालन, महिला स्वयं सहायता समूहों और जीआई सत्यापन से जुड़े प्रश्न"
                : "Common questions about our initiative, women SHG collectives, and artisan authenticity"}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: lang === "hi" ? "गाँव बाय मिट्टीलोक महिला स्वयं सहायता समूहों को कैसे सशक्त बनाता है?" : "How does Gaanv by Mittilok empower rural women SHGs?",
                a: lang === "hi"
                  ? "हम बिचौलियों की 400% अतिरिक्त मार्जिन को हटाकर 82% आय सीधे महिला स्वयं सहायता समूहों के बैंक खातों में स्थानांतरित करते हैं। हम बलरामपुर, अवध व पूर्वांचल के गाँवों में शून्य-शुल्क ऑनबोर्डिंग और डिजिटल साक्षरता भी प्रदान करते हैं।"
                  : "By eliminating intermediaries who routinely claim 400% markups, 82% of every sale is deposited directly into women's SHG bank accounts with verified escrow protection, zero listing fees, and transparent pricing.",
              },
              {
                q: lang === "hi" ? "क्या सभी शिल्प वास्तविक एवं जीआई (GI) प्रमाणित हैं?" : "Are the handicrafts genuinely GI certified and artisan-made?",
                a: lang === "hi"
                  ? "हाँ, हमारे प्लेटफ़ॉर्म पर सूचीबद्ध प्रत्येक शिल्प (जैसे खुरजा पॉटरी, बनारसी हैंडलूम, बस्तर डोकरा) भारत सरकार की जीआई रजिस्ट्री से सीधे सत्यापित हैं और कारीगरों के मूल क्लस्टर से सीधे भेजे जाते हैं।"
                  : "Yes. Every geographical heritage craft (including Khurja ceramics, Sambalpuri handlooms, and Bastar Dokra) is physically vetted against Government of India GI Registry standards with certificate traceability.",
              },
              {
                q: lang === "hi" ? "ऑर्डर डिलीवरी और पैकेजिंग कैसे की जाती है?" : "How are fragile crafts packaged and shipped worldwide?",
                a: lang === "hi"
                  ? "हम 100% प्लास्टिक-मुक्त, पर्यावरण-अनुकूल पैकेजिंग का उपयोग करते हैं जिसमें भूसा, मूंज घास और पुनर्चक्रित गत्ते शामिल हैं। घरेलू और अंतरराष्ट्रीय ऑर्डर 24-48 घंटों में सुरक्षित रूप से रवाना किए जाते हैं।"
                  : "All earthen pottery, brassware, and textiles are safely wrapped using 100% plastic-free biodegradable husks and honeycomb corrugated paper, dispatching within 24-48 hours via insured express carriers.",
              },
              {
                q: lang === "hi" ? "यदि मुझे कस्टम या बल्क ऑर्डर चाहिए तो किससे संपर्क करें?" : "How can I request bulk orders or support for corporate gifting?",
                a: lang === "hi"
                  ? "आप हमारी चौपाल सहायता टीम से सीधे हमारे आधिकारिक व्हाट्सएप या संपर्क फॉर्म के माध्यम से जुड़ सकते हैं। हमारी टीम आपको सीधे कारीगर दीदियों के समूह से जोड़ती है।"
                  : "You can connect with our team directly via our WhatsApp desk or through the 'Sell with us' inquiry modal. We facilitate direct corporate gifting and bespoke craft commissions straight from artisan collectives.",
              },
            ].map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group rounded-card bg-paper border border-mist p-5 transition-all duration-200 open:border-brass/70 open:shadow-sm cursor-pointer"
              >
                <summary className="flex items-center justify-between font-serif text-[17px] sm:text-[18px] font-medium text-ink list-none select-none">
                  <span>{faq.q}</span>
                  <span className="text-brass transition-transform duration-200 group-open:rotate-180 ms-4 shrink-0 text-lg">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-[14px] sm:text-[15px] text-stone leading-relaxed font-sans pt-3 border-t border-mist/50">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* Direct Support Card below FAQ */}
          <div className="mt-10 p-6 rounded-card bg-bone-d border border-mist text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-[18px] text-ink font-medium">
                {lang === "hi" ? "कोई अन्य प्रश्न या सहायता चाहिए?" : "Still have questions or need assistance?"}
              </h3>
              <p className="text-[13px] text-stone mt-0.5">
                {lang === "hi"
                  ? "हमारी सहायक गौरी व्हाट्सएप पर रीयल-टाइम सहायता के लिए उपलब्ध हैं।"
                  : "Our team and assistant Gauri are available to help you in real time."}
              </p>
            </div>
            <a
              href="https://wa.me/919999999999?text=Hello%20Gaanv%20by%20Mittilok%20team"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#241b14] hover:bg-[#382b20] text-[#f7f3ec] border border-[#d4af37]/40 text-xs font-semibold px-5 py-2.5 rounded-pill transition-all active:scale-95 shadow-sm whitespace-nowrap"
            >
              <span>{lang === "hi" ? "व्हाट्सएप पर पूछें" : "Chat with Support"}</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
