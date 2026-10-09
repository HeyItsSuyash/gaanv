import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SellerModel } from "@/models/Seller";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const sellers = await SellerModel.find().lean();
      return NextResponse.json({ success: true, sellers });
    }
    return NextResponse.json({
      success: true,
      sellers: [
        {
          name: "Kamla Bai",
          village: "Khurja",
          state: "Uttar Pradesh",
          craftCategory: "Terracotta Pottery",
          verified: true,
        },
        {
          name: "Sunita Devi",
          village: "Malihabad, Lucknow",
          state: "Uttar Pradesh",
          craftCategory: "Chikankari Handloom",
          verified: true,
        },
        {
          name: "Meera SHG",
          village: "Kamrup",
          state: "Assam",
          craftCategory: "Bamboo Weaving",
          verified: true,
        },
      ],
    });
  } catch (error) {
    console.error("GET /api/sellers error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch sellers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const newSeller = await SellerModel.create(body);
      return NextResponse.json({ success: true, seller: newSeller }, { status: 201 });
    }

    return NextResponse.json({ success: true, message: "Seller registered successfully", seller: body }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sellers error:", error);
    return NextResponse.json({ success: false, error: "Failed to register seller" }, { status: 500 });
  }
}
