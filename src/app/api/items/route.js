import { NextResponse } from "next/server";
import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";

// POST API for multiple items
export const POST = async (req) => {
  try {
    const body = await req.json();

    // Check agar array nahi hai
    if (!Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body must be an array of items",
        },
        { status: 400 }
      );
    }

    await connection_DB();

    // Insert multiple documents
    const newItems = await ItemsModel.insertMany(body);

    return NextResponse.json(
      {
        success: true,
        message: "Items added successfully",
        data: newItems,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error adding items",
        error: error.message,
      },
      { status: 500 }
    );
  }
};





export const GET = async () => {
  try {
    await connection_DB();

    const dataget = await ItemsModel.find();

    if (!dataget) {
      return NextResponse.json({
        success: false,
        message: "Data Not Found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data success Found",
      data: dataget,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Data Not Found",
    });
  }
};
