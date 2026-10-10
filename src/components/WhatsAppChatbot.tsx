"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppChatbot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize first welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: t("chat.welcome"),
        time: "Just now",
      },
    ]);
  }, [lang, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

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
    }, 450);
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
      {/* Floating Trigger Button on bottom-right */}
      <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-40 flex items-center gap-2 sm:gap-3">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2.5 bg-paper text-ink border border-mist px-3.5 py-2 rounded-pill shadow-2xl hover:border-brass transition-all duration-200"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brass">
              <Image src="/gauri-avatar.jpg" alt="Gauri" fill className="object-cover" />
            </div>
            <div className="text-left text-xs leading-tight">
              <span className="font-serif font-bold text-ink block">{t("chat.title")}</span>
              <span className="text-brass text-[10px]">
                {lang === "hi" ? "सखी सहायता" : "Artisan Help"}
              </span>
            </div>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Gauri WhatsApp artisan sidebar"
          className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#241b14] text-[#f7f3ec] border-2 border-[#d4af37] shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-[#d4af37]"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
            </svg>
          ) : (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#d4af37]/60 shadow-md">
              <Image src="/gauri-avatar.jpg" alt="Gauri avatar" fill className="object-cover" />
            </div>
          )}
        </button>
      </div>

      {/* Dimmed backdrop when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 transition-opacity"
        />
      )}

      {/* Smooth Sliding Sidebar Drawer from right edge */}
      <aside
        className={`fixed inset-y-0 end-0 z-50 w-full sm:w-[400px] max-w-full bg-paper border-s border-mist text-ink shadow-2xl flex flex-col font-sans transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Artisan Chat Sidebar"
      >
        {/* Sidebar Header in Brown & Cream */}
        <div className="p-4 sm:p-5 bg-[#241b14] text-[#f7f3ec] border-b border-[#382b20] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-md">
              <Image src="/gauri-avatar.jpg" alt="Gauri avatar" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-serif text-[18px] text-[#f7f3ec] font-semibold leading-tight flex items-center gap-2">
                {t("chat.title")}
                <span className="text-[10px] bg-[#1a130e] text-[#d4af37] border border-[#d4af37]/40 px-2 py-0.5 rounded-pill font-mono">
                  {lang === "hi" ? "सखी" : "Verified Guide"}
                </span>
              </h3>
              <p className="text-[12px] text-[#d4af37] mt-0.5">
                {t("chat.online")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[#a89a88] hover:text-[#f7f3ec] p-2 rounded-lg transition-colors border border-[#382b20]"
            aria-label="Close sidebar chat"
          >
            ✕
          </button>
        </div>

        {/* Messages Stream */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3.5 bg-bone-d">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-madder text-white rounded-br-none"
                    : "bg-paper text-ink border border-mist rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-stone mt-1 px-1">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {/* Quick Guidance Prompt Buttons (No emojis) */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt1"))}
              className="text-left text-xs bg-paper hover:bg-bone text-ink border border-mist hover:border-brass/50 rounded-xl px-3.5 py-2 transition-colors"
            >
              • {t("chat.opt1")}
            </button>
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt2"))}
              className="text-left text-xs bg-paper hover:bg-bone text-ink border border-mist hover:border-brass/50 rounded-xl px-3.5 py-2 transition-colors"
            >
              • {t("chat.opt2")}
            </button>
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt3"))}
              className="text-left text-xs bg-paper hover:bg-bone text-ink border border-mist hover:border-brass/50 rounded-xl px-3.5 py-2 transition-colors"
            >
              • {t("chat.opt3")}
            </button>
          </div>
        </div>

        {/* WhatsApp Direct Action Hand-off */}
        <div className="p-4 bg-bone border-t border-mist">
          <button
            type="button"
            onClick={openWhatsAppDirect}
            className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-[14px] font-medium py-2.5 rounded-button transition-all shadow-md active:scale-98"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M187.58,144.84l-25-12a16.14,16.14,0,0,0-17.72,3.13l-8.68,8.69a94.84,94.84,0,0,1-40.82-40.82l8.69-8.68a16.15,16.15,0,0,0,3.13-17.72l-12-25A16.16,16.16,0,0,0,79.8,42a48,48,0,0,0-47.56,51.8,175.7,175.7,0,0,0,129.9,130A48,48,0,0,0,214,176.2,16.16,16.16,0,0,0,187.58,144.84Z"/>
            </svg>
            {t("chat.whatsapp_btn")}
          </button>
        </div>

        {/* Sidebar Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3.5 bg-paper border-t border-mist flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={t("chat.input_placeholder")}
            className="flex-1 bg-bone-d text-ink text-[13px] rounded-input px-3.5 py-2.5 border border-mist focus:border-brass focus:outline-none placeholder-stone"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="bg-brass hover:bg-amber text-[#14110c] disabled:opacity-40 rounded-button px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            {t("chat.send")}
          </button>
        </form>
      </aside>
    </>
  );
}
