import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Remove the JWT httpOnly cookie
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", "", { httpOnly: true, path: "/", expires: new Date(0) });
  return res;
}
