import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISeller extends Document {
  name: string;
  enterpriseName?: string;
  village: string;
  state: string;
  craftCategory: string;
  phone: string;
  email?: string;
  story?: string;
  verified: boolean;
  avatarUrl?: string;
  createdAt: Date;
}

const SellerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    enterpriseName: { type: String },
    village: { type: String, required: true },
    state: { type: String, required: true },
    craftCategory: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    story: { type: String },
    verified: { type: Boolean, default: false },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const SellerModel: Model<ISeller> =
  mongoose.models.Seller || mongoose.model<ISeller>("Seller", SellerSchema);
