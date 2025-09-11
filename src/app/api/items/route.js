import { NextResponse } from "next/server";
import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";

// POST API for multiple items
export const POST = async (req) => {
  try {
    const {
      ItemsIamge,
      Price,
      DiscountPrice,
      ItemsDescription,
      category,
      Size,
    } = await req.json();
    await connection_DB();
    const newItem = new ItemsModel({
      ItemsIamge,
      Price,
      DiscountPrice,
      ItemsDescription,
      category,
      Size,
    });
    await newItem.save();
    return NextResponse.json(
      { success: true, message: "Item added successfully", data: newItem },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding item", error: error.message },
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
