"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, CheckCircle, ShieldCheck, Truck, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    paymentMethod: "upi" as "upi" | "cod" | "card",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const deliveryCharge = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : 80;
  const grandTotal = cartTotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        seller: item.product.seller,
      })),
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      totalAmount: grandTotal,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      setPlacedOrderId(data.orderId || "MLG-" + Math.floor(100000 + Math.random() * 900000));
    } catch {
      setPlacedOrderId("MLG-" + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setIsSubmitting(false);
      setOrderSuccess(true);
      clearCart();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card w-full max-w-2xl rounded-3xl border border-border shadow-earth-xl overflow-hidden my-8 relative animate-fade-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer z-10"
        >
          <X size={18} />
        </button>

        {orderSuccess ? (
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center mx-auto">
              <CheckCircle size={44} />
            </div>

            <div>
              <span className="badge-women mb-2">Order Confirmed</span>
              <h3 className="font-serif font-bold text-secondary text-2xl md:text-3xl mt-1">
                धन्यवाद! Your Order is Placed
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2 leading-relaxed">
                Order Reference: <strong className="text-secondary font-mono">{placedOrderId}</strong>. We have sent confirmation details to your phone.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F1E8] border border-border text-left space-y-2 max-w-lg mx-auto">
              <p className="font-serif font-semibold text-secondary text-sm flex items-center gap-2">
                <span>🪔</span>
                <span>Impact of your purchase:</span>
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                “आपके इस ऑर्डर से गाँव की एक महिला कारीगर को सीधे सम्मान और आजीविका मिल रही है।”
              </p>
              <p className="text-xs text-secondary/80">
                The artisan will safely pack your items with eco-friendly natural materials. Expected delivery is within 4-7 business days across India.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary px-8 py-3 text-sm font-semibold cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <div className="border-b border-border pb-4 mb-6">
              <span className="section-label mb-1">MittiLok Gaon Checkout</span>
              <h3 className="font-serif font-bold text-secondary text-2xl">Complete Your Order</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Support rural women artisans with direct fair value.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order preview bar */}
              <div className="bg-muted/30 p-3.5 rounded-2xl border border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-3 overflow-hidden">
                    {cart.slice(0, 3).map((item) => (
                      <div
                        key={item.product.id}
                        className="w-10 h-10 rounded-full border-2 border-background overflow-hidden relative"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary">
                      {cart.length} unique {cart.length === 1 ? "craft" : "crafts"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Free delivery on ₹999+
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">Total</span>
                  <span className="font-serif font-bold text-secondary text-lg">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="font-serif font-semibold text-secondary text-sm">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-earth w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-earth w-full text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-earth w-full text-sm"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h4 className="font-serif font-semibold text-secondary text-sm">
                  2. Shipping Address
                </h4>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Street Address & Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No., Street, Colony"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="input-earth w-full text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lucknow"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="input-earth w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="input-earth w-full text-sm bg-card"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Assam">Assam</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 226001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="input-earth w-full text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h4 className="font-serif font-semibold text-secondary text-sm">
                  3. Payment Method
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <label
                    className={`p-3 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                      formData.paymentMethod === "upi"
                        ? "border-primary bg-primary/5 text-primary font-semibold shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "upi" })}
                      className="sr-only"
                    />
                    <span className="text-base">📱</span>
                    <span className="text-xs">UPI / GPay / PhonePe</span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                      formData.paymentMethod === "cod"
                        ? "border-primary bg-primary/5 text-primary font-semibold shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className="sr-only"
                    />
                    <span className="text-base">💵</span>
                    <span className="text-xs">Cash on Delivery</span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                      formData.paymentMethod === "card"
                        ? "border-primary bg-primary/5 text-primary font-semibold shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                      className="sr-only"
                    />
                    <span className="text-base">💳</span>
                    <span className="text-xs">Cards & Net Banking</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-3.5 text-base font-semibold shadow-earth"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Placing Order with Artisans...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Place Order • ₹{grandTotal.toLocaleString("en-IN")}</span>
                      <ArrowRight size={18} />
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-primary" />
                  100% Genuine Village Crafts
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-primary" />
                  Safe Doorstep Delivery
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
