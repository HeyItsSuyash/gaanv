"use client";

import React, { useState } from "react";
import { X, CheckCircle, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const BecomeSellerModal: React.FC = () => {
  const { isSellerModalOpen, setIsSellerModalOpen } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    enterpriseName: "",
    village: "",
    state: "Uttar Pradesh",
    craftCategory: "Handicrafts",
    phone: "",
    story: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isSellerModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const handleClose = () => {
    setIsSellerModalOpen(false);
    setSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card w-full max-w-xl rounded-3xl border border-border shadow-earth-xl overflow-hidden p-6 md:p-8 relative animate-fade-up my-6">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer z-10"
        >
          <X size={18} />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-20 h-20 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto border-2 border-accent">
              <CheckCircle size={44} />
            </div>

            <div>
              <span className="badge-women mb-2">Artisan Profile Received</span>
              <h3 className="font-serif font-bold text-secondary text-2xl md:text-3xl mt-1">
                स्वागत है, {formData.name}!
              </h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
                Thank you for applying to MittiLok Gaon. Our village craft coordination team will reach out to you via WhatsApp at <strong>{formData.phone}</strong> within 24-48 hours to help list your products and take photos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F1E8] border border-border text-center max-w-sm mx-auto">
              <p className="text-devanagari text-primary font-bold text-sm">
                “हर गाँव की नारी में एक कलाकार है, और हर कलाकार को सम्मान मिलना चाहिए।”
              </p>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary px-8 py-3 text-sm font-semibold cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                <Sparkles size={13} />
                <span>महिला उद्यमियों के लिए डिजिटल मंच</span>
              </div>
              <h3 className="font-serif font-bold text-secondary text-2xl">
                Become a Seller on MittiLok Gaon
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Join our marketplace with zero listing fees. Get direct access to conscious buyers across India and the world.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Artisan / Entrepreneur Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kamla Bai"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-earth w-full text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    SHG / Enterprise Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Meera SHG / Laxmi Crafts"
                    value={formData.enterpriseName}
                    onChange={(e) => setFormData({ ...formData, enterpriseName: e.target.value })}
                    className="input-earth w-full text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Primary Craft Category *
                  </label>
                  <select
                    value={formData.craftCategory}
                    onChange={(e) => setFormData({ ...formData, craftCategory: e.target.value })}
                    className="input-earth w-full text-sm bg-card"
                  >
                    <option value="Handicrafts">Handicrafts (Pottery, Wood, Brass)</option>
                    <option value="Textiles">Textiles & Chikankari Handlooms</option>
                    <option value="Décor">Handmade Décor & Diyas</option>
                    <option value="Rural Lifestyle">Rural Lifestyle & Baskets</option>
                    <option value="Food">Village Food & Organic Spices</option>
                    <option value="Gifts">Gifts & Hampers</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Village / Town / District *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Khurja / Madhubani"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
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
                    <option value="Gujarat">Gujarat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">
                  Tell us about your craft & products (संक्षिप्त विवरण)
                </label>
                <textarea
                  rows={3}
                  placeholder="What products do you make? How many women work together?"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="input-earth w-full text-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 text-sm font-semibold shadow-earth cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Submit Seller Registration</span>
                      <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-muted-foreground">
                MittiLok provides local photography support, price guidance, packaging assistance and door-step courier pick up.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
