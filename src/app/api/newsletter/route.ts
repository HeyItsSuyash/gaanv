import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { InquiryModel } from "@/models/Inquiry";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (conn) {
      await InquiryModel.create({ type: "newsletter", email });
    }

    return NextResponse.json({ success: true, message: "Subscribed to stories from the Gaon" });
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
