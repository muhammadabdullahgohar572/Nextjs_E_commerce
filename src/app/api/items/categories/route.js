import connection_DB from "@/libs/Bd_Connection";
import ItemsModel from "@/libs/Items";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connection_DB();

    const dataget = await ItemsModel.find();

    // Pehla letter uppercase aur baaki lowercase
    const result = dataget.map((item) => {
      const category = item.category || "";
      return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    });

    const unique = [...new Set(result)];

    return NextResponse.json({
      data: unique,
      message: "Successfully got categories",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Failed to get categories",
    });
  }
};
