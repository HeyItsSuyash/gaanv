"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppChatbot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
    {
      sender: "bot",
      text: t("chat.welcome"),
      time: "Just now",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = { sender: "user" as const, text, time: newTime };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();
      if (lower.includes("gi") || lower.includes("certified") || lower.includes("प्रमाणित")) {
        reply = lang === "hi"
          ? "हमारे सभी जीआई शिल्प (जैसे खुरजा मिट्टी, संबलपुरी हथकरघा, बस्तर डोकरा) भारत सरकार के जीआई रजिस्ट्री से सीधे सत्यापित हैं! आप 'जीआई धरोहर' अनुभाग में देख सकते हैं।"
          : "All our GI crafts (like Khurja clay, Sambalpuri weaves, and Bastar Dokra) are 100% verified with authentic GI Registry certificates. Browse our GI Heritage collection!";
      } else if (lower.includes("shg") || lower.includes("women") || lower.includes("महिला") || lower.includes("समूह")) {
        reply = lang === "hi"
          ? "गाँव बाय मिट्टीलोक में 82% आय सीधे महिला स्वयं सहायता समूहों के बैंक खातों में बिना किसी बिचौलिए के जाती है। 500+ महिला कारीगर आत्मनिर्भर बन चुकी हैं!"
          : "82% of all proceeds directly reach the bank accounts of women's Self Help Groups with zero middlemen. Over 500 rural women artisans are now economically self-reliant!";
      } else if (lower.includes("track") || lower.includes("order") || lower.includes("ऑर्डर") || lower.includes("शिपिंग")) {
        reply = lang === "hi"
          ? "अंतरराष्ट्रीय व घरेलू ऑर्डर 24-48 घंटों में सुरक्षित इको-फ्रेंडली पैकेजिंग के साथ रवाना किए जाते हैं। आप अपना ऑर्डर आईडी यहाँ टाइप कर सकते हैं!"
          : "All orders ship via insured carbon-neutral express carriers within 24-48 hours. Please share your order ID or phone number to check live tracking!";
      } else {
        reply = lang === "hi"
          ? "धन्यवाद! हमारे कारीगर समन्वयक तुरंत सहायता के लिए उपलब्ध हैं। आप सीधे हमारे व्हाट्सएप नंबर पर भी चैट कर सकते हैं।"
          : "Thank you for reaching out! You can also connect with our artisan support team directly on WhatsApp for custom orders and bulk inquiries.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      lang === "hi"
        ? "नमस्ते गौरी! मैं गाँव बाय मिट्टीलोक के महिला स्वयं सहायता समूह के शिल्पों के बारे में अधिक जानना चाहता हूँ।"
        : "Namaste Gauri! I would like to learn more about the handcrafted treasures made by women SHGs on Gaanv by Mittilok."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 end-5 z-50 flex items-center gap-3">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2.5 bg-[#14120e] text-[#f5eedc] border border-[#a88b5c]/40 px-3.5 py-2 rounded-full shadow-2xl animate-fade-in hover:border-[#a88b5c] transition-all"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#a88b5c]">
              <Image src="/gauri-avatar.jpg" alt="Gauri" fill className="object-cover" />
            </div>
            <div className="text-left text-xs leading-tight">
              <span className="font-serif font-bold text-[#f5eedc] block">{t("chat.title")}</span>
              <span className="text-[#a88b5c] text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                {lang === "hi" ? "व्हाट्सएप सहायता" : "Artisan Help"}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp artisan chat"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-[#25D366]"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
            </svg>
          ) : (
            <>
              {/* Avatar circle thumbnail overlapping WhatsApp Icon */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image src="/gauri-avatar.jpg" alt="Gauri avatar" fill className="object-cover" />
              </div>
              <span className="absolute -top-1 -end-1 w-5 h-5 bg-[#25D366] rounded-full border-2 border-[#12100d] flex items-center justify-center text-[10px] text-white font-bold">
                ✓
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 end-4 sm:end-6 z-50 w-[92vw] sm:w-[380px] max-w-[420px] rounded-2xl bg-[#14120e] text-[#f5eedc] border border-[#a88b5c]/30 shadow-2xl overflow-hidden flex flex-col font-sans transition-all animate-in fade-in slide-in-from-bottom-5">
          {/* Header with Warli pattern overlay */}
          <div className="relative p-4 bg-[#1f1a14] border-b border-[#a88b5c]/20 flex items-center justify-between">
            <div className="absolute inset-0 bg-warli opacity-10 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#a88b5c] shadow-md">
                <Image src="/gauri-avatar.jpg" alt="Gauri" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-[17px] text-[#f5eedc] font-semibold leading-tight flex items-center gap-2">
                  {t("chat.title")}
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-full font-sans font-normal">
                    {lang === "hi" ? "सखी" : "Verified Guide"}
                  </span>
                </h4>
                <p className="text-[12px] text-[#a88b5c] flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  {t("chat.online")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="relative z-10 text-[#a88b5c] hover:text-[#f5eedc] p-1.5 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div className="p-4 flex-1 h-[320px] overflow-y-auto space-y-3 bg-[#0e0c09] relative">
            <div className="absolute inset-0 bg-mandana opacity-5 pointer-events-none" />
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`relative z-10 flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#8b4a3c] text-[#ffffff] rounded-br-none"
                      : "bg-[#1c1813] text-[#f5eedc] border border-[#a88b5c]/25 rounded-bl-none shadow"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#7a7268] mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Quick action buttons */}
            <div className="relative z-10 pt-2 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handleSend(t("chat.opt1"))}
                className="text-left text-[12px] bg-[#1a1611] hover:bg-[#252018] text-[#e0cda7] border border-[#a88b5c]/30 rounded-xl px-3 py-1.5 transition-colors"
              >
                ✨ {t("chat.opt1")}
              </button>
              <button
                type="button"
                onClick={() => handleSend(t("chat.opt2"))}
                className="text-left text-[12px] bg-[#1a1611] hover:bg-[#252018] text-[#e0cda7] border border-[#a88b5c]/30 rounded-xl px-3 py-1.5 transition-colors"
              >
                🤝 {t("chat.opt2")}
              </button>
              <button
                type="button"
                onClick={() => handleSend(t("chat.opt3"))}
                className="text-left text-[12px] bg-[#1a1611] hover:bg-[#252018] text-[#e0cda7] border border-[#a88b5c]/30 rounded-xl px-3 py-1.5 transition-colors"
              >
                📦 {t("chat.opt3")}
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="px-4 py-2 bg-[#17130e] border-t border-[#a88b5c]/20">
            <button
              type="button"
              onClick={openWhatsAppDirect}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-[13px] font-medium py-2 rounded-xl transition-all shadow-md active:scale-98"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M187.58,144.84l-25-12a16.14,16.14,0,0,0-17.72,3.13l-8.68,8.69a94.84,94.84,0,0,1-40.82-40.82l8.69-8.68a16.15,16.15,0,0,0,3.13-17.72l-12-25A16.16,16.16,0,0,0,79.8,42a48,48,0,0,0-47.56,51.8,175.7,175.7,0,0,0,129.9,130A48,48,0,0,0,214,176.2,16.16,16.16,0,0,0,187.58,144.84Z"/>
              </svg>
              {t("chat.whatsapp_btn")}
            </button>
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#130f0a] border-t border-[#a88b5c]/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t("chat.input_placeholder")}
              className="flex-1 bg-[#1d1913] text-[#f5eedc] text-[13px] rounded-lg px-3 py-2 border border-[#a88b5c]/30 focus:border-[#a88b5c] focus:outline-none placeholder-[#7a7268]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="bg-[#8b4a3c] disabled:opacity-40 hover:bg-[#a8423a] text-white rounded-lg px-3.5 py-2 text-xs font-medium transition-colors"
            >
              {t("chat.send")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
