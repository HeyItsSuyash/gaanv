"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function BecomeSellerModal() {
  const { isSellerModalOpen, setIsSellerModalOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (!isSellerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsSellerModalOpen(false);
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setIsSellerModalOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-card bg-paper border border-mist p-6 md:p-8 text-left shadow-2xl transition-all">
          <button
            type="button"
            onClick={() => setIsSellerModalOpen(false)}
            className="absolute top-4 end-4 text-stone hover:text-ink rounded-input p-2 transition-colors"
          >
            ✕
          </button>

          <div className="mb-6">
            <div className="relative h-9 w-28 mb-1">
              <Image src="/gaon-logo.png" alt="Logo" fill className="object-contain object-left" />
            </div>
            <h3 className="font-serif text-h2 text-ink">Sell on the Platform</h3>
            <p className="text-body-sm text-stone mt-1">
              Join India&#39;s global rural cohort. Every maker verified, every price clear,
              direct payment escrow protection.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-sage-l text-sage text-2xl font-bold mb-3">
                ✓
              </span>
              <h4 className="font-serif text-h3 text-ink mb-2">Application Received</h4>
              <p className="text-body-sm text-stone">
                Our verification team will contact you within 2 business days to verify identity and craft provenance.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="seller-name" className="block text-caption text-stone mb-1 font-medium">
                  Artisan / Workshop Name
                </label>
                <input
                  id="seller-name"
                  type="text"
                  required
                  placeholder="e.g. Master Ramesh Kumar Weaves"
                  className="w-full rounded-input border border-mist bg-paper px-3 py-2.5 text-ink outline-none focus:border-madder font-sans text-body-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="seller-craft" className="block text-caption text-stone mb-1 font-medium">
                    Primary Craft Discipline
                  </label>
                  <select
                    id="seller-craft"
                    required
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2.5 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  >
                    <option value="">Select discipline</option>
                    <option value="textiles">Handloom &amp; Textiles</option>
                    <option value="ceramics">Pottery &amp; Ceramics</option>
                    <option value="brass">Bell-Metal &amp; Brass</option>
                    <option value="art">Folk Art &amp; Painting</option>
                    <option value="wood">Woodcraft &amp; Carving</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="seller-gi" className="block text-caption text-stone mb-1 font-medium">
                    GI Tag Certificate?
                  </label>
                  <select
                    id="seller-gi"
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2.5 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes (Govt Certified)</option>
                    <option value="applied">Application Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="seller-location" className="block text-caption text-stone mb-1 font-medium">
                  Town / Cluster &amp; State
                </label>
                <input
                  id="seller-location"
                  type="text"
                  required
                  placeholder="e.g. Bagru, Rajasthan"
                  className="w-full rounded-input border border-mist bg-paper px-3 py-2.5 text-ink outline-none focus:border-madder font-sans text-body-sm"
                />
              </div>

              <div>
                <label htmlFor="seller-contact" className="block text-caption text-stone mb-1 font-medium">
                  WhatsApp or Email
                </label>
                <input
                  id="seller-contact"
                  type="text"
                  required
                  placeholder="+91 98765 43210 or email"
                  className="w-full rounded-input border border-mist bg-paper px-3 py-2.5 text-ink outline-none focus:border-madder font-sans text-body-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ink text-paper hover:bg-ink-soft rounded-button py-3.5 text-body-sm font-medium transition-colors mt-2"
              >
                Submit Verification Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
