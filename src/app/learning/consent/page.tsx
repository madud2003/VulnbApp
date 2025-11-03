"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LearningConsentPage() {
	const router = useRouter();
	const [accepted, setAccepted] = useState(false);

	useEffect(() => {
		const v = typeof window !== "undefined" ? localStorage.getItem("learning_consent_v1") : null;
		if (v === "accepted") {
			setAccepted(true);
		}
	}, []);

	const glowText = "0 0 6px rgba(145,155,255,0.6), 0 0 12px rgba(145,155,255,0.4)";

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-[#181e2a] p-6 overflow-hidden">
			{/* Glow border around the screen */}
			<div
				className="pointer-events-none fixed inset-0 rounded-3xl"
				style={{
					boxShadow: "0 0 40px 4px rgba(113, 104, 255, 0.7), inset 0 0 40px 4px rgba(113, 104, 255, 0.5)",
					filter: "blur(10px)",
					zIndex: 0,
				}}
			/>

			<div className="relative z-10 bg-[#22273a] rounded-3xl shadow-xl shadow-indigo-900/60 p-8 max-w-2xl w-full border border-indigo-600/30">
				<h1 className="text-2xl font-bold text-indigo-300 mb-4" style={{ textShadow: glowText }}>Learning Labs Consent</h1>
				<p className="text-gray-300 mt-3 leading-relaxed">
					These labs use simulated content, mock scan data, and locally hosted sandbox pages. Do not conduct phishing or social engineering against real users or organizations without explicit written consent. Unauthorized testing may be illegal and unethical.
				</p>
				<ul className="list-disc list-inside text-gray-300 mt-4 space-y-2 ml-2">
					<li>No real-world targets. Use only the provided simulated environments.</li>
					<li>Respect privacy and legal requirements at all times.</li>
					<li>Report security issues responsibly to the appropriate owners.</li>
				</ul>
				<div className="mt-6 flex items-center gap-3">
					<button
						className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-700/60 hover:bg-indigo-700 hover:shadow-indigo-800/80 transition transform hover:scale-105 active:scale-95"
						onClick={() => {
							localStorage.setItem("learning_consent_v1", "accepted");
							router.push("/learning");
						}}
						style={{ textShadow: glowText }}
					>
						I understand and agree
					</button>
					<button
						className="px-5 py-2.5 rounded-full border border-indigo-500/50 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 transition"
						onClick={() => router.push("/")}
					>
						Cancel
					</button>
				</div>
				{accepted && (
					<p className="text-xs text-green-300 mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
						You have previously accepted. You can proceed to learning modules.
					</p>
				)}
			</div>
		</div>
	);
}


