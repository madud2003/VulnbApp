import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import Progress from "../../../models/Progress";
import jwt from "jsonwebtoken";

function getUserIdFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return (decoded as any).userId;
  } catch (e) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let progress = await Progress.findOne({ userId });
  if (!progress) {
    progress = await Progress.create({ userId, completedProblems: [] });
  }
  return NextResponse.json({ completedProblems: progress.completedProblems });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { level, problem } = await req.json();
  if (typeof level !== "number" || typeof problem !== "number") {
    return NextResponse.json({ error: "level and problem must be numbers." }, { status: 400 });
  }
  let progress = await Progress.findOne({ userId });
  if (!progress) {
    progress = await Progress.create({ userId, completedProblems: [] });
  }
  // Check if this is already completed
  const already = progress.completedProblems.some((p: { level: number; problem: number }) => p.level === level && p.problem === problem);
  if (!already) {
    progress.completedProblems.push({ level, problem, completedAt: new Date() });
    await progress.save();
  }
  return NextResponse.json({ completedProblems: progress.completedProblems });
}
