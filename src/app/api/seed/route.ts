import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { SellerModel } from "@/models/Seller";
import { initialProducts } from "@/data/products";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        message: "MongoDB connection is not active. Using in-memory fallback data seamlessly.",
      });
    }

    // Check existing count
    const existingCount = await ProductModel.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already has ${existingCount} products.`,
      });
    }

    // Seed products
    const seedData = initialProducts.map((p) => ({
      name: p.name,
      seller: p.seller,
      location: p.location,
      state: p.state,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      alt: p.alt,
      category: p.category,
      tags: p.tags,
      isNewItem: p.isNew || false,
      isBestseller: p.isBestseller || false,
      description: p.description,
      craftStory: p.craftStory,
      materials: p.materials,
      rating: p.rating,
      inStock: true,
    }));

    await ProductModel.insertMany(seedData);

    // Seed sellers
    const sellers = [
      {
        name: "Sunita Devi",
        enterpriseName: "Sunita Chikankari Cluster",
        village: "Malihabad, Lucknow",
        state: "Uttar Pradesh",
        craftCategory: "Textiles",
        phone: "+91 98765 11223",
        verified: true,
      },
      {
        name: "Kamla Bai",
        enterpriseName: "Khurja Terracotta Co-op",
        village: "Khurja",
        state: "Uttar Pradesh",
        craftCategory: "Handicrafts",
        phone: "+91 98765 22334",
        verified: true,
      },
      {
        name: "Meera SHG",
        enterpriseName: "Assam Golden Bamboo Artisans",
        village: "Guwahati",
        state: "Assam",
        craftCategory: "Rural Lifestyle",
        phone: "+91 98765 33445",
        verified: true,
      },
      {
        name: "Rekha Devi",
        enterpriseName: "Mithila Folk Heritage",
        village: "Madhubani",
        state: "Bihar",
        craftCategory: "Handicrafts",
        phone: "+91 98765 44556",
        verified: true,
      },
    ];

    await SellerModel.insertMany(sellers);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${seedData.length} products and ${sellers.length} sellers to MongoDB!`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
