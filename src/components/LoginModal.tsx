"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, loginUser, user, logoutUser } = useCart();
  const [identifier, setIdentifier] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      loginUser(identifier);
      setSubmitted(true);
      setTimeout(() => {
        setIsLoginOpen(false);
        setSubmitted(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setIsLoginOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-card bg-paper border border-mist p-6 md:p-8 text-left shadow-2xl transition-all">
          <button
            type="button"
            onClick={() => setIsLoginOpen(false)}
            className="absolute top-4 end-4 text-stone hover:text-ink rounded-input p-2 transition-colors"
          >
            ✕
          </button>

          {user ? (
            <div className="text-center py-4">
              <div className="relative h-10 w-28 mx-auto mb-2">
                <Image src="/gaon-logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <h3 className="font-serif text-h3 text-ink mb-2">Welcome Back</h3>
              <p className="text-body-sm text-stone mb-6">
                Logged in as {user.email || user.phone || user.name}
              </p>
              <button
                type="button"
                onClick={logoutUser}
                className="w-full border border-mist hover:border-ink rounded-button py-2.5 text-body-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="relative h-10 w-28 mx-auto mb-1">
                  <Image src="/gaon-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <h3 className="font-serif text-h3 text-ink">Sign In to Your Account</h3>
                <p className="text-body-sm text-stone mt-1">
                  Access your orders, saved pieces, and artisan updates.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-6 text-sage font-medium text-body-sm">
                  ✓ Successfully signed in. Welcome to gaanv.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="user-email-phone"
                      className="block text-caption text-stone mb-1 font-medium"
                    >
                      Email address or phone number
                    </label>
                    <input
                      id="user-email-phone"
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full rounded-input border border-mist bg-paper px-3 py-2.5 text-ink outline-none focus:border-madder font-sans text-body-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ink text-paper hover:bg-ink-soft rounded-button py-3 text-body-sm font-medium transition-colors mt-2"
                  >
                    Continue
                  </button>

                  <p className="text-center text-[12px] text-stone mt-2">
                    By continuing, you agree to gaanv&apos;s Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
