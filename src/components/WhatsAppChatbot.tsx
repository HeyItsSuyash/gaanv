"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppChatbot() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
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
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const newTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = { sender: "user" as const, text, time: newTime };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    setIsTyping(true);

    // Slower, more realistic human response delay (1.1 - 1.4s)
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
      setIsTyping(false);
    }, 1250);
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
      {/* Floating Trigger Container on bottom-right */}
      <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-40 flex flex-col items-end">
        {/* Diagonally Upward Message Bubble */}
        {!isOpen && (
          <div className="mb-2.5 me-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer group flex items-center gap-2 bg-[#241b14] text-[#f7f3ec] hover:bg-[#382b20] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-br-xs shadow-md transition-all duration-200 active:scale-95 border border-white/20 text-left"
              aria-label="Chat with Gauri"
            >
              <span className="text-[12px] sm:text-[13px] font-medium tracking-tight">
                {lang === "hi" ? "नमस्ते, मैं गौरी हूँ। क्या सहायता करूँ?" : "Hey its Gauri, how can I help?"}
              </span>
            </button>
          </div>
        )}

        {/* Brown Circle with crisp white border and white chat icon (zero glow) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open artisan conversation"
          className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#241b14] hover:bg-[#382b20] text-white border-2 border-white shadow-md active:scale-95 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-white p-1.5 sm:p-2"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/10 stroke-[2]" />
          )}
        </button>
      </div>

      {/* Dimmed backdrop with blur when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Smooth Sliding Sidebar Drawer from right edge */}
      <aside
        className={`fixed inset-y-0 end-0 z-50 w-full sm:w-[420px] max-w-full bg-[#fdfbf7] border-s border-[#e8dfd3] text-ink shadow-2xl flex flex-col font-sans transform transition-transform duration-300 ease-[var(--ease-signature)] ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Artisan Help Chat"
      >
        {/* Theme-consistent Earthen Brown Header */}
        <div className="p-4 bg-[#241b14] text-[#f7f3ec] border-b border-[#3d2e22] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#382b20] border border-[#d4af37]/40 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#d4af37] fill-[#d4af37]/20" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-[16px] text-[#f7f3ec] leading-tight">
                {lang === "hi" ? "गौरी • गाँव सहायता" : "Gauri • Artisan Help Desk"}
              </h3>
              <p className="text-[12px] text-[#d4af37] mt-0.5 font-sans">
                {lang === "hi" ? "कारीगर सहायता मंच" : "Gaanv Artisan Support"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[#f7f3ec]/80 hover:text-[#ffffff] p-2 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Stream with high contrast, legible text & typing animation */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 bg-[#f7f3ec]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] sm:text-[15px] leading-relaxed shadow-sm font-sans ${
                  msg.sender === "user"
                    ? "bg-[#241b14] text-[#f7f3ec] rounded-tr-none border border-[#3d2e22]"
                    : "bg-white text-[#1a1510] border border-[#ddd4c4] rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[11px] text-[#6e6456] mt-1 px-1 font-mono">{msg.time}</span>
            </div>
          ))}

          {/* Typing animation bubble */}
          {isTyping && (
            <div className="flex flex-col items-start animate-in fade-in duration-150">
              <div className="bg-white border border-[#ddd4c4] rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#967432] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#967432] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#967432] animate-bounce"></span>
              </div>
              <span className="text-[11px] text-[#6e6456] mt-1 px-1 font-mono">
                {lang === "hi" ? "गौरी लिख रही हैं..." : "Gauri is typing..."}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />

          {/* Quick Guidance Prompt Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt1"))}
              className="text-left text-[13px] bg-white hover:bg-[#eee8dc] text-[#241b14] border border-[#ddd4c4] hover:border-[#d4af37] rounded-lg px-3.5 py-2.5 transition-colors shadow-sm font-medium"
            >
              {t("chat.opt1")}
            </button>
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt2"))}
              className="text-left text-[13px] bg-white hover:bg-[#eee8dc] text-[#241b14] border border-[#ddd4c4] hover:border-[#d4af37] rounded-lg px-3.5 py-2.5 transition-colors shadow-sm font-medium"
            >
              {t("chat.opt2")}
            </button>
            <button
              type="button"
              onClick={() => handleSend(t("chat.opt3"))}
              className="text-left text-[13px] bg-white hover:bg-[#eee8dc] text-[#241b14] border border-[#ddd4c4] hover:border-[#d4af37] rounded-lg px-3.5 py-2.5 transition-colors shadow-sm font-medium"
            >
              {t("chat.opt3")}
            </button>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <div className="p-3 bg-white border-t border-[#e8dfd3]">
          <button
            type="button"
            onClick={openWhatsAppDirect}
            className="w-full flex items-center justify-center gap-2 bg-[#241b14] hover:bg-[#382b20] text-[#f7f3ec] border border-[#d4af37]/40 text-[14px] font-semibold py-2.5 rounded-lg transition-all shadow active:scale-98"
          >
            <MessageCircle className="w-5 h-5 text-[#d4af37] fill-[#d4af37]/20" />
            {t("chat.whatsapp_btn")}
          </button>
        </div>

        {/* Input Form with clean, crisp styling */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#eee8dc] border-t border-[#ddd4c4] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={t("chat.input_placeholder")}
            className="flex-1 bg-white text-[#1a1510] text-[14px] rounded-lg px-4 py-2.5 border border-[#ddd4c4] focus:border-[#967432] focus:outline-none placeholder-[#6e6456]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="bg-[#241b14] hover:bg-[#382b20] text-[#f7f3ec] border border-[#d4af37]/40 disabled:opacity-40 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            {t("chat.send")}
          </button>
        </form>
      </aside>
    </>
  );
}
