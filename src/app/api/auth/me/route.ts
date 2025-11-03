import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/mongoose";
import User from "../../../../models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // Optionally re-fetch user for updated info
    const user = await User.findById((decoded as any).userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    
    // Return name if provided, otherwise return email
    // Name is optional, so we check if it exists and is not empty
    const displayName = (user.name && user.name.trim() !== "") ? user.name : user.email;
    return NextResponse.json({ user: { name: displayName, email: user.email } });
  } catch (e) {
    console.error("Error in /api/auth/me:", e);
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
  }
}
