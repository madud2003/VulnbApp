import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongoose";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required." }, { status: 400 });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  // Use name if provided, otherwise use email
  const displayName = (user.name && user.name.trim() !== "") ? user.name : user.email;
  const token = jwt.sign({ userId: user._id, name: displayName, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  const res = NextResponse.json({ success: true, user: { name: displayName, email: user.email } });
  res.cookies.set("token", token, { httpOnly: true, path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return res;
}
