import { NextResponse } from "next/server";
import Order from "@/libs/Odermodel";
import connection_DB from "@/libs/Bd_Connection";

export async function POST(req) {
  try {
    await connection_DB();

    const body = await req.json();
    const {
      userId,
      username,
      email,
      PhoneNumber,
      items,
      subtotal,
      total,
      orderDate,
    } = body;

    if (
      !userId ||
      !username ||
      !email ||
      !PhoneNumber ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const sanitizedItems = items.map((itm) => ({
      ...itm,
      quantity: itm.quantity && itm.quantity > 0 ? itm.quantity : 1,
    }));

    const newOrder = await Order.create({
      userId,
      username,
      email,
      PhoneNumber,
      items: sanitizedItems,
      subtotal,
      total,
      orderDate,
    });

    return NextResponse.json(
      { message: "Order placed successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
