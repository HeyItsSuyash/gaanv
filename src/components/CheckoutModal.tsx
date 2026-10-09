"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"shipping" | "success">("shipping");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "US",
    postalCode: "",
  });

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  const shippingCost = 14.5; // Fixed international export rate
  const totalWithShipping = (cartTotal / 82) + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 bg-ink/60 transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl transform overflow-hidden rounded-card bg-paper border border-mist p-6 md:p-8 text-left shadow-2xl transition-all">
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 end-4 text-stone hover:text-ink rounded-input p-2 transition-colors"
          >
            ✕
          </button>

          <div className="mb-6 border-b border-mist pb-4">
            <span className="font-serif text-[36px] text-ink block mb-1">gaanv</span>
            <h3 className="font-serif text-h3 text-ink">Secure International Checkout</h3>
            <p className="text-body-sm text-stone mt-1">
              Guaranteed escrow delivery · Direct to maker payout
            </p>
          </div>

          {step === "success" ? (
            <div className="text-center py-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-pill bg-sage-l text-sage text-3xl font-bold mb-4">
                ✓
              </span>
              <h4 className="font-serif text-h2 text-ink mb-2">Order Confirmed</h4>
              <p className="text-body-sm text-stone max-w-sm mx-auto mb-6">
                Your piece has been reserved with the artisan. You will receive an international tracking code and workshop packaging update via email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep("shipping");
                  setIsCheckoutOpen(false);
                }}
                className="bg-ink text-paper hover:bg-ink-soft rounded-button px-6 py-2.5 text-body-sm font-medium transition-colors"
              >
                Back to the Gaon
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="checkout-full-name" className="block text-caption text-stone mb-1 font-medium">Full Name</label>
                  <input
                    id="checkout-full-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-email-addr" className="block text-caption text-stone mb-1 font-medium">Email Address</label>
                  <input
                    id="checkout-email-addr"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-street-address" className="block text-caption text-stone mb-1 font-medium">Delivery Address</label>
                <input
                  id="checkout-street-address"
                  type="text"
                  required
                  placeholder="Street, apartment or suite"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-input border border-mist bg-paper px-3 py-2 text-ink outline-none focus:border-madder font-sans text-body-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="checkout-city" className="block text-caption text-stone mb-1 font-medium">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-destination-country" className="block text-caption text-stone mb-1 font-medium">Country</label>
                  <select
                    id="checkout-destination-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  >
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AE">UAE</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="IN">India</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="checkout-postal-zip-code" className="block text-caption text-stone mb-1 font-medium">Postal / ZIP</label>
                  <input
                    id="checkout-postal-zip-code"
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full rounded-input border border-mist bg-paper px-3 py-2 text-ink outline-none focus:border-madder font-sans text-body-sm"
                  />
                </div>
              </div>

              {/* Itemised Breakdown */}
              <div className="border-t border-mist bg-bone p-4 rounded-input mt-2">
                <div className="flex justify-between text-body-sm text-stone mb-1">
                  <span>Items total</span>
                  <span className="tabular-nums font-serif text-ink">${(cartTotal / 82).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body-sm text-stone mb-1">
                  <span>Tracked global shipping (India to {formData.country})</span>
                  <span className="tabular-nums font-serif text-ink">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-mist/80 pt-2 flex justify-between font-serif text-h4 text-ink">
                  <span>Total delivered price</span>
                  <span className="tabular-nums">${totalWithShipping.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-ink text-paper hover:bg-ink-soft rounded-button py-3.5 text-body-sm font-medium transition-colors mt-2"
              >
                Pay ${totalWithShipping.toFixed(2)} with Escrow Guarantee
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
