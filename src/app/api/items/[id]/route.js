import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connection_DB();

    const id = params.id; // ✅ Correct spelling

    const getdata = await ItemsModel.findOne({ _id: id });
    if (!getdata) {
      return NextResponse.json({
        message: "No data in Database",
      });
    }

    return NextResponse.json({
      data: getdata,
      message: "Data fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Fail to Get Details",
    });
  }
};
