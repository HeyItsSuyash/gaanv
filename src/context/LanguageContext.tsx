"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.brand": "gaanv by mittilok",
    "nav.explore": "Explore Gaanv",
    "nav.women_shg": "Women SHGs",
    "nav.gi_crafts": "GI Heritage",
    "nav.team": "Hamari Team",
    "nav.about": "Our Village Roots",
    "nav.sell": "Sell with Us",
    "nav.search_placeholder": "Search handcrafted clay, dokra, handlooms...",
    "nav.saved": "Saved",
    "nav.bag": "Bag",

    // Hero
    "hero.tag": "GAANV BY MITTILOK • WOMEN SHG EMPOWERMENT",
    "hero.slide1_title": "Woven by Sisters, Celebrated Globally.",
    "hero.slide1_sub": "100% authentic rural handlooms created by rural women's self-help groups across Varanasi, Sambalpur, and Assam.",
    "hero.slide2_title": "Sacred Clay Shaped by Generational Hands.",
    "hero.slide2_sub": "Khurja pottery, Molela terracotta plaques, and Gorakhpur red clay crafts direct from village chaupals to 75+ nations.",
    "hero.slide3_title": "Heirloom Dokra & Lost-Wax Bell Metal.",
    "hero.slide3_sub": "Geographically Indicative (GI) certified non-ferrous casting practiced by indigenous tribal women collectives in Bastar and Mayurbhanj.",
    "hero.cta_explore": "Explore the Gaon",
    "hero.cta_shg": "Meet the SHGs",
    "hero.prev_slide": "Previous",
    "hero.next_slide": "Next",

    // Section 1: Just Landed
    "landed.tag": "Direct from the chaupal",
    "landed.title": "Fresh Creations This Week",
    "landed.subtitle": "Each piece is hand-finished by women SHG artisans with love, natural dye, and heritage skills.",
    "landed.view_all": "View All Products",
    "landed.gi_badge": "GI Certified",
    "landed.shg_badge": "Women SHG",
    "landed.add_to_bag": "Add to Bag",

    // Section 2: SHG Collective Highlight
    "shg.tag": "Empowering Rural Lives",
    "shg.title": "Women Self-Help Groups Behind the Craft",
    "shg.subtitle": "When you buy from Gaanv by Mittilok, 82% of every rupee flows directly to women's cooperative bank accounts.",
    "shg.card1_title": "Malyagiri Dokra Samiti",
    "shg.card1_place": "Dhenkanal, Odisha",
    "shg.card1_desc": "42 tribal women artisans reviving 4,000-year-old lost-wax metallurgy bell-metal figurines.",
    "shg.card2_title": "Punarjani Handloom Dal",
    "shg.card2_place": "Bargarh, Odisha",
    "shg.card2_desc": "A cooperative of 65 women weavers keeping Sambalpuri double-ikat tie-dye heritage thriving.",
    "shg.card3_title": "Mitti Srijan Mahila Mandal",
    "shg.card3_place": "Khurja, Uttar Pradesh",
    "shg.card3_desc": "Generational potters producing chemical-free, food-safe high-fire ceramic and terracotta cookware.",

    // Section 3: GI Treasures
    "gi.tag": "Geographical Indications",
    "gi.title": "Certified Indian Village Heritage",
    "gi.subtitle": "Rare crafts with legal protection, authentic GI tag certificates, and traceable artisan signatures.",

    // Section 4: Gaon Patrika / Newsletter
    "journal.tag": "Gaon Patrika",
    "journal.title": "Letters from the Heart of Rural India",
    "journal.subtitle": "Quarterly stories of rural resilience, natural dye recipe secrets, and artisan monographs delivered to your inbox.",
    "journal.placeholder": "Enter your email for village letters...",
    "journal.subscribe": "Subscribe",
    "journal.success": "Thank you! You are now connected to the Gaon Patrika.",

    // Chatbot
    "chat.title": "Gauri from Gaanv",
    "chat.subtitle": "Your friendly rural artisan guide",
    "chat.online": "Online • Replies in seconds",
    "chat.welcome": "Namaste! I am Gauri. How can I help you support our rural women SHG artisans today?",
    "chat.opt1": "Show authentic GI certified crafts",
    "chat.opt2": "How does Gaanv support women SHGs?",
    "chat.opt3": "Track an international order",
    "chat.whatsapp_btn": "Chat on WhatsApp",
    "chat.input_placeholder": "Ask Gauri about crafts, shipping...",
    "chat.send": "Send",

    // Footer
    "footer.desc": "Gaanv by Mittilok is a curated marketplace connecting self-help group rural women artisans and master craftspeople across 28 Indian states to mindful patrons worldwide.",
    "footer.rights": "© 2026 Gaanv by Mittilok. Rooted in soil, crafted with dignity.",
    "footer.shipping": "Insured worldwide shipping • Direct artisan payout • Zero plastic packaging",
  },
  hi: {
    // Nav
    "nav.brand": "गाँव बाय मिट्टीलोक",
    "nav.explore": "हाट देखें",
    "nav.women_shg": "महिला स्वयं सहायता समूह",
    "nav.gi_crafts": "जीआई धरोहर",
    "nav.team": "हमारी टीम",
    "nav.about": "गाँव की जड़ें",
    "nav.sell": "हमारे साथ बेचें",
    "nav.search_placeholder": "हस्तनिर्मित मिट्टी, डोकरा, हथकरघा खोजें...",
    "nav.saved": "पसंदीदा",
    "nav.bag": "थैला",

    // Hero
    "hero.tag": "गाँव बाय मिट्टीलोक • महिला स्वयं सहायता समूह सशक्तिकरण",
    "hero.slide1_title": "बहनों के हाथों से बुनी, विश्व में सम्मानित।",
    "hero.slide1_sub": "वाराणसी, सम्बलपुर और असम के ग्रामीण महिला स्वयं सहायता समूहों द्वारा तैयार 100% प्रामाणिक हथकरघा उत्पाद।",
    "hero.slide2_title": "पीढ़ियों के अनुभव से गढ़ी गई पावन मिट्टी।",
    "hero.slide2_sub": "खुरजा पॉटरी, मोलेला टेराकोटा और गोरखपुर की लाल मिट्टी की कला सीधे गाँव के चौपाल से 75+ देशों तक।",
    "hero.slide3_title": "पुश्तैनी डोकरा और मोम-ढलाई कांस्य धातु कला।",
    "hero.slide3_sub": "बस्तर और मयूरभंज की जनजातीय महिला समूहों द्वारा संरक्षित भौगोलिक संकेतक (GI) प्रमाणित शिल्प।",
    "hero.cta_explore": "गाँव की हाट देखें",
    "hero.cta_shg": "समूहों से मिलें",
    "hero.prev_slide": "पिछला",
    "hero.next_slide": "अगला",

    // Section 1: Just Landed
    "landed.tag": "सीधे चौपाल से",
    "landed.title": "इस सप्ताह के नए हस्तशिल्प",
    "landed.subtitle": "हर एक वस्तु महिला कारीगरों द्वारा प्यार, प्राकृतिक रंगों और पुश्तैनी हुनर से तैयार की गई है।",
    "landed.view_all": "सभी उत्पाद देखें",
    "landed.gi_badge": "जीआई प्रमाणित",
    "landed.shg_badge": "महिला समूह",
    "landed.add_to_bag": "थैले में जोड़ें",

    // Section 2: SHG Collective Highlight
    "shg.tag": "ग्रामीण जीवन का उत्थान",
    "shg.title": "शिल्प के पीछे महिला स्वयं सहायता समूह",
    "shg.subtitle": "जब आप गाँव बाय मिट्टीलोक से खरीदते हैं, तो 82% राशि सीधे ग्रामीण महिला कारीगरों के बैंक खाते में जाती है।",
    "shg.card1_title": "मलयगिरि डोकरा समिति",
    "shg.card1_place": "ढेंकनाल, ओडिशा",
    "shg.card1_desc": "42 जनजातीय महिला कारीगर जो 4,000 साल पुरानी लॉस्ट-वैक्स डोकरा धातु कला को पुनर्जीवित कर रही हैं।",
    "shg.card2_title": "पुनर्जनी हथकरघा दल",
    "shg.card2_place": "बरगढ़, ओडिशा",
    "shg.card2_desc": "65 महिला बुनकरों का समूह जो संबलपुरी डबल-इकत टाई-डाई विरासत को जीवंत रखे हुए हैं।",
    "shg.card3_title": "मिट्टी सृजन महिला मंडल",
    "shg.card3_place": "खुरजा, उत्तर प्रदेश",
    "shg.card3_desc": "पारंपरिक कुम्हार परिवार जो रसायन-मुक्त, भोजन के लिए सुरक्षित उच्च-ताप सेरेमिक व टेराकोटा बर्तन बनाते हैं।",

    // Section 3: GI Treasures
    "gi.tag": "भौगोलिक संकेतक (GI)",
    "gi.title": "प्रमाणित भारतीय गाँव की धरोहर",
    "gi.subtitle": "कानूनी संरक्षण, असली जीआई टैग प्रमाणपत्र और कारीगरों के प्रामाणिक हस्ताक्षर वाले दुर्लभ शिल्प।",

    // Section 4: Gaon Patrika / Newsletter
    "journal.tag": "गाँव पत्रिका",
    "journal.title": "भारत के गाँवों की आत्मा से चिट्ठियाँ",
    "journal.subtitle": "ग्रामीण संघर्ष, प्राकृतिक रंगों की विधियाँ और कारीगरों की कहानियाँ सीधे आपके इनबॉक्स में।",
    "journal.placeholder": "गाँव की चिट्ठियों के लिए ईमेल दर्ज करें...",
    "journal.subscribe": "सदस्यता लें",
    "journal.success": "धन्यवाद! आप गाँव पत्रिका से जुड़ चुके हैं।",

    // Chatbot
    "chat.title": "गौरी (गाँव सखी)",
    "chat.subtitle": "आपकी सहयोगी ग्रामीण शिल्प मार्गदर्शक",
    "chat.online": "ऑनलाइन • तुरंत उत्तर",
    "chat.welcome": "नमस्ते! मैं गौरी हूँ। आज हमारे ग्रामीण महिला स्वयं सहायता समूहों के शिल्पों में मैं आपकी क्या मदद कर सकती हूँ?",
    "chat.opt1": "जीआई प्रमाणित असली हस्तशिल्प दिखाएँ",
    "chat.opt2": "गाँव महिला समूहों की सहायता कैसे करता है?",
    "chat.opt3": "अंतरराष्ट्रीय ऑर्डर ट्रैक करें",
    "chat.whatsapp_btn": "व्हाट्सएप पर बात करें",
    "chat.input_placeholder": "गौरी से शिल्प या शिपिंग के बारे में पूछें...",
    "chat.send": "भेजें",

    // Footer
    "footer.desc": "गाँव बाय मिट्टीलोक 28 भारतीय राज्यों की महिला स्वयं सहायता समूहों और पारंपरिक उस्ताद कारीगरों को दुनिया भर के संवेदनशील खरीदारों से जोड़ने वाला विश्वसनीय मंच है।",
    "footer.rights": "© 2026 गाँव बाय मिट्टीलोक। माटी से जुड़ा, स्वाभिमान से रचा।",
    "footer.shipping": "सुरक्षित वैश्विक शिपिंग • कारीगरों को सीधा भुगतान • शून्य प्लास्टिक पैकेजिंग",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("mittilok_lang") as Language;
    if (saved === "hi" || saved === "en") {
      setLang(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("mittilok_lang", newLang);
    document.documentElement.lang = newLang;
  };

  const toggleLang = () => {
    const next = lang === "en" ? "hi" : "en";
    handleSetLang(next);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: handleSetLang,
        toggleLang,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
