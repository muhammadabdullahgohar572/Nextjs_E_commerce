import connection_DB from "@/libs/Bd_Connection";
import Order from "@/libs/Odermodel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const id = params.id;  // params se id lena
    await connection_DB;   // DB connect karna

    // ek user ke multiple orders fetch karna
    const dataget = await Order.find({ userId: id });

    if (!dataget || dataget.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Orders not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: dataget,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Fail to Get Details",
    }, { status: 500 });
  }
};
