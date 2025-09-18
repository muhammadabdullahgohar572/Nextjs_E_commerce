import connection_DB from "@/libs/Bd_Connection";
import ContactUsModel from "@/libs/Contactus";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connection_DB();

    const body = await req.json();

    const { user_id, username, email, PhoneNumber, subject, message } = body;

    if (!user_id || !username || !email || !PhoneNumber || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newContact = await ContactUsModel.create({
      user_id,
      username,
      email,
      PhoneNumber,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Contact message submitted successfully", data: newContact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}