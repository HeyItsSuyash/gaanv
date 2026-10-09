import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  seller: string;
  location: string;
  state: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  category: string;
  tags: string[];
  isNewItem?: boolean;
  isBestseller?: boolean;
  description?: string;
  craftStory?: string;
  materials?: string[];
  rating?: number;
  inStock?: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    seller: { type: String, required: true },
    location: { type: String, required: true },
    state: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    isNewItem: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    description: { type: String },
    craftStory: { type: String },
    materials: { type: [String], default: [] },
    rating: { type: Number, default: 5 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
