import { NextResponse } from "next/server";

export async function GET() {
	// Safe, canned example response inspired by VirusTotal (simplified)
	return NextResponse.json({
		query: "http://bank-security.com/login",
		detections: { malicious: 3, suspicious: 5, clean: 45 },
		community: [
			{ tag: "phishing", votes: 10 },
			{ tag: "new-domain", votes: 2 },
		],
	});
}


