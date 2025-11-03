import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/mongoose";
import User from "../../../../models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json({ error: "Email, password, and confirm password are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Only include name if it's provided and not empty
    const userData: any = { email, password: hashedPassword };
    if (name && name.trim() !== "") {
      userData.name = name.trim();
    }
    const user = await User.create(userData);

    // Use name if provided, otherwise use email
    const displayName = (user.name && user.name.trim() !== "") ? user.name : user.email;
    const token = jwt.sign({ userId: user._id, name: displayName, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    const res = NextResponse.json({ message: "Signup successful!", user: { name: displayName, email: user.email } }, { status: 201 });
    res.cookies.set("token", token, { httpOnly: true, path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    return res;
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
