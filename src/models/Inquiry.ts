import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  type: "newsletter" | "seller_contact" | "general";
  email?: string;
  phone?: string;
  name?: string;
  message?: string;
  createdAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    type: { type: String, enum: ["newsletter", "seller_contact", "general"], default: "newsletter" },
    email: { type: String },
    phone: { type: String },
    name: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export const InquiryModel: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
