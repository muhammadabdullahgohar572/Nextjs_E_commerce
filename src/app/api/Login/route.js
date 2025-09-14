import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connection_DB from "@/libs/Bd_Connection";
import UserModel from "@/libs/UserModel";

export const POST = async (req) => {
  try {
    await connection_DB();

    const body = await req.json();
    const { email, password } = body;

    // Required fields check
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // User find
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 🟢 Successful login — return user data (without password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.PhoneNumber,
      address: user.address,
      city: user.city,
      gender: user.Gender,
    };

    return NextResponse.json(
      {
        message: "Login successful",
        data: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Fail to login",
      },
      { status: 500 }
    );
  }
};
