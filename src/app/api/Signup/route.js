import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connection_DB from "@/libs/Bd_Connection";
import UserModel from "@/libs/UserModel";

export const POST = async (req) => {
  try {
    // MongoDB connect
    await connection_DB();

    // Request body se data lena
    const body = await req.json();
    const { username, password, PhoneNumber,email, address, city, Gender } = body;

    // Required fields check
    if (!username || !password || !PhoneNumber  || !email || !address || !city || !Gender) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Email already exists check
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // New user create
    const newUser = new UserModel({
      username,
      password: hashedPassword, // store hashed password
      email,
      address,
      city,
      Gender,
      PhoneNumber,
    });

    await newUser.save();

    return NextResponse.json(
      {
        data: newUser,
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Fail to create account",
      },
      { status: 500 }
    );
  }
};
