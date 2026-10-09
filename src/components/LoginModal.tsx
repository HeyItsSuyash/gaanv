"use client";

import React, { useState } from "react";
import { X, Smartphone, Mail, ShieldCheck, ArrowRight, UserCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const LoginModal: React.FC = () => {
  const { isLoginOpen, setIsLoginOpen, user, loginUser, logoutUser } = useCart();
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  if (!isLoginOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(identifier, name || "Artisan Supporter");
    setIsLoginOpen(false);
    setOtpStep(false);
    setIdentifier("");
  };

  const handleQuickDemoLogin = () => {
    loginUser("9876543210", "Radhika Devi");
    setIsLoginOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card w-full max-w-md rounded-3xl border border-border shadow-earth-xl overflow-hidden p-6 md:p-8 relative animate-fade-up">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsLoginOpen(false);
            setOtpStep(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {user?.isLoggedIn ? (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <UserCheck size={32} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-secondary text-2xl">
                Welcome back, {user.name}!
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {user.phone ? `Registered Mobile: ${user.phone}` : user.email}
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => setIsLoginOpen(false)}
                className="btn-primary w-full justify-center text-sm py-3"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => {
                  logoutUser();
                  setIsLoginOpen(false);
                }}
                className="text-xs text-red-600 hover:underline cursor-pointer py-1 font-semibold"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="badge-women mb-1">MittiLok Accounts</span>
              <h3 className="font-serif font-bold text-secondary text-2xl mt-1">
                Welcome to MittiLok Gaon
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Join our collective to track artisan orders and save your favourite crafts.
              </p>
            </div>

            {/* Quick Demo Button */}
            <div className="p-3 bg-primary/10 border border-primary/25 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-secondary">Quick Evaluation</p>
                <p className="text-[11px] text-muted-foreground">Test with 1-click sample profile</p>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-xs bg-primary hover:bg-secondary text-white font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                1-Click Sign In
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border text-sm">
              <button
                type="button"
                onClick={() => {
                  setTab("phone");
                  setOtpStep(false);
                }}
                className={`flex-1 py-2 font-medium border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  tab === "phone"
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone size={16} />
                <span>Mobile Number</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("email");
                  setOtpStep(false);
                }}
                className={`flex-1 py-2 font-medium border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  tab === "email"
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail size={16} />
                <span>Email Address</span>
              </button>
            </div>

            {!otpStep ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Radhika Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-earth w-full text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    {tab === "phone" ? "Mobile Number *" : "Email Address *"}
                  </label>
                  <input
                    type={tab === "phone" ? "tel" : "email"}
                    required
                    placeholder={tab === "phone" ? "+91 98765 43210" : "radhika@example.com"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="input-earth w-full text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 text-sm font-semibold"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Enter 4-digit verification code sent to {identifier}
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    maxLength={6}
                    placeholder="1 2 3 4"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-earth w-full text-center tracking-widest text-lg font-mono font-bold"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1 text-center">
                    (Tip: Enter any 4 digits to confirm simulation)
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 text-sm font-semibold"
                >
                  <span>Verify & Enter the Gaon</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="text-xs text-center w-full text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Change {tab === "phone" ? "phone number" : "email"}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
              <ShieldCheck size={14} className="text-primary" />
              <span>Encrypted & secure. Supporting rural women digital inclusion.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
