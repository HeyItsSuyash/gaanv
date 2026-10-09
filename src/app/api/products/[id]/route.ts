import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { initialProducts } from "@/data/products";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await connectToDatabase();

    if (conn) {
      try {
        const doc = await ProductModel.findById(id).lean();
        if (doc) {
          return NextResponse.json({
            success: true,
            product: {
              id: String(doc._id),
              name: doc.name,
              seller: doc.seller,
              location: doc.location,
              state: doc.state,
              price: doc.price,
              originalPrice: doc.originalPrice,
              image: doc.image,
              alt: doc.alt,
              category: doc.category,
              tags: doc.tags || [],
              isNew: doc.isNewItem,
              isBestseller: doc.isBestseller,
              description: doc.description || "",
              craftStory: doc.craftStory || "",
              materials: doc.materials || [],
              rating: doc.rating || 5,
              reviewsCount: 30,
            },
          });
        }
      } catch {
        // ID might not be a valid MongoDB ObjectId, check static list
      }
    }

    const staticProduct = initialProducts.find((p) => p.id === id);
    if (staticProduct) {
      return NextResponse.json({ success: true, product: staticProduct });
    }

    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
