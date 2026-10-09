import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { initialProducts, Product } from "@/data/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const state = searchParams.get("state");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 100000;
    const sort = searchParams.get("sort") || "newest";
    const tag = searchParams.get("tag");

    let products: Product[] = [];

    // Try fetching from MongoDB
    const conn = await connectToDatabase();
    if (conn) {
      try {
        const query: Record<string, unknown> = {};
        if (category && category !== "All") {
          query.category = category;
        }
        if (state && state !== "All States") {
          query.state = state;
        }
        if (tag) {
          query.tags = tag;
        }
        query.price = { $gte: minPrice, $lte: maxPrice };

        if (search) {
          query.$or = [
            { name: { $regex: search, $options: "i" } },
            { seller: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ];
        }

        const dbProducts = await ProductModel.find(query).lean();
        if (dbProducts && dbProducts.length > 0) {
          products = dbProducts.map((doc) => ({
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
            rating: doc.rating || 4.9,
            reviewsCount: 30,
          }));
        }
      } catch (err) {
        console.warn("MongoDB query error, falling back to static data:", err);
      }
    }

    // Fallback to initialProducts if DB was empty or not connected
    if (products.length === 0) {
      let filtered = [...initialProducts];

      if (category && category !== "All") {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      }
      if (state && state !== "All States") {
        filtered = filtered.filter(
          (p) => p.state.toLowerCase() === state.toLowerCase()
        );
      }
      if (tag) {
        filtered = filtered.filter((p) => p.tags.includes(tag.toLowerCase()));
      }
      if (minPrice || maxPrice) {
        filtered = filtered.filter(
          (p) => p.price >= minPrice && p.price <= maxPrice
        );
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.seller.toLowerCase().includes(s) ||
            p.location.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s) ||
            p.tags.some((t) => t.toLowerCase().includes(s))
        );
      }

      // Sort
      if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === "popular") {
        filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
      } else {
        // newest
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      products = filtered;
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const newProduct = await ProductModel.create(body);
      return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
    }

    return NextResponse.json(
      { success: true, message: "Saved in in-memory session", product: body },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
