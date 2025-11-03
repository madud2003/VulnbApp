import { NextResponse } from "next/server";

export async function GET() {
	// Safe, canned example response inspired by urlscan-style data (simplified)
	return NextResponse.json({
		query: "http://bank-security.com/login",
		verdict: "suspicious",
		reasons: [
			"Domain not matching known brand",
			"Recently registered",
			"Contains login keyword",
		],
		page: {
			domain: "bank-security.com",
			asn: 64512,
			country: "US",
			url: "http://bank-security.com/login",
			path: "/login",
			certificate: { commonName: "bank-security.com", issuer: "Let's Encrypt (example)" },
		},
	});
}


