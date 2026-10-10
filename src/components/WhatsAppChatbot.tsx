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
      {/* Floating Trigger Button on bottom-right with WhatsApp icon and floating bubble */}
      <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-40 flex items-center gap-2.5">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba59] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-pill shadow-xl transition-all duration-200 active:scale-95 border border-white/20"
            aria-label="Chat with Gauri"
          >
            <span className="text-[12px] sm:text-[13px] font-medium tracking-tight">
              {lang === "hi" ? "नमस्ते, मैं गौरी हूँ। क्या सहायता करूँ?" : "Hey its Gauri, how can I help?"}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp conversation"
          className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-[#25D366]"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 256 256">
              <path d="M187.58,144.84l-25-12a16.14,16.14,0,0,0-17.72,3.13l-8.68,8.69a94.84,94.84,0,0,1-40.82-40.82l8.69-8.68a16.15,16.15,0,0,0,3.13-17.72l-12-25A16.16,16.16,0,0,0,79.8,42a48,48,0,0,0-47.56,51.8,175.7,175.7,0,0,0,129.9,130A48,48,0,0,0,214,176.2,16.16,16.16,0,0,0,187.58,144.84Z"/>
            </svg>
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
        className={`fixed inset-y-0 end-0 z-50 w-full sm:w-[420px] max-w-full bg-[#fcfaf7] border-s border-mist text-ink shadow-2xl flex flex-col font-sans transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Artisan Help Chat"
      >
        {/* Clean, readable Header */}
        <div className="p-4 bg-[#075e54] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M187.58,144.84l-25-12a16.14,16.14,0,0,0-17.72,3.13l-8.68,8.69a94.84,94.84,0,0,1-40.82-40.82l8.69-8.68a16.15,16.15,0,0,0,3.13-17.72l-12-25A16.16,16.16,0,0,0,79.8,42a48,48,0,0,0-47.56,51.8,175.7,175.7,0,0,0,129.9,130A48,48,0,0,0,214,176.2,16.16,16.16,0,0,0,187.58,144.84Z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-[16px] text-white leading-tight">
                {lang === "hi" ? "गौरी • गाँव सहायता" : "Gauri • Artisan Help Desk"}
              </h3>
              <p className="text-[12px] text-[#e0f2f1] flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#25d366] inline-block"></span>
                {lang === "hi" ? "ऑनलाइन सहायता" : "Usually replies instantly"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-2 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages Stream with high contrast, legible text */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 bg-[#efeae2]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] sm:text-[15px] leading-relaxed shadow-sm font-sans ${
                  msg.sender === "user"
                    ? "bg-[#075e54] text-white rounded-tr-none"
                    : "bg-white text-[#111b21] border border-black/5 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[11px] text-[#667781] mt-1 px-1 font-mono">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {/* Quick Guidance Prompt Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt1"))}
              className="text-left text-[13px] bg-white hover:bg-[#f7f5f0] text-[#111b21] border border-[#d1d7db] rounded-lg px-3.5 py-2.5 transition-colors shadow-sm font-medium"
            >
              • {t("chat.opt1")}
            </button>
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt2"))}
              className="text-left text-[13px] bg-white hover:bg-[#f7f5f0] text-[#111b21] border border-[#d1d7db] rounded-lg px-3.5 py-2.5 transition-colors shadow-sm font-medium"
            >
              • {t("chat.opt2")}
            </button>
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt3"))}
              className="text-left text-[13px] bg-white hover:bg-[#f7f5f0] text-[#111b21] border border-[#d1d7db] rounded-lg px-3.5 py-2.5 transition-colors shadow-sm font-medium"
            >
              • {t("chat.opt3")}
            </button>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <div className="p-3 bg-white border-t border-[#e9edef]">
          <button
            type="button"
            onClick={openWhatsAppDirect}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-[14px] font-semibold py-2.5 rounded-lg transition-all shadow active:scale-98"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M187.58,144.84l-25-12a16.14,16.14,0,0,0-17.72,3.13l-8.68,8.69a94.84,94.84,0,0,1-40.82-40.82l8.69-8.68a16.15,16.15,0,0,0,3.13-17.72l-12-25A16.16,16.16,0,0,0,79.8,42a48,48,0,0,0-47.56,51.8,175.7,175.7,0,0,0,129.9,130A48,48,0,0,0,214,176.2,16.16,16.16,0,0,0,187.58,144.84Z"/>
            </svg>
            {t("chat.whatsapp_btn")}
          </button>
        </div>

        {/* Input Form with clean, crisp styling */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#f0f2f5] border-t border-[#e9edef] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={t("chat.input_placeholder")}
            className="flex-1 bg-white text-[#111b21] text-[14px] rounded-lg px-4 py-2.5 border border-[#d1d7db] focus:border-[#00a884] focus:outline-none placeholder-[#8696a0]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="bg-[#00a884] hover:bg-[#069374] text-white disabled:opacity-40 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            {t("chat.send")}
          </button>
        </form>
      </aside>
    </>
  );
}
