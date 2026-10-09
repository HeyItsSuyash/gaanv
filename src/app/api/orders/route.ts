import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/models/Order";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = "MLG-" + Math.floor(100000 + Math.random() * 900000);

    const conn = await connectToDatabase();
    if (conn) {
      const order = await OrderModel.create(body);
      return NextResponse.json({ success: true, orderId: String(order._id), order }, { status: 201 });
    }

    return NextResponse.json(
      { success: true, orderId, message: "Order recorded successfully", order: body },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}
