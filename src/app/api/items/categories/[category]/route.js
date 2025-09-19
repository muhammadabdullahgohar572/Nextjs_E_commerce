 
import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connection_DB(); 

    const category = params.category; // params se category lena

    const specficcategoryget = await ItemsModel.find({ category });

    if (!specficcategoryget || specficcategoryget.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No items found in this category",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: specficcategoryget,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Fail to get category",
      },
      { status: 500 }
    );
  }
};
