"use client";

import React, { useEffect, useState } from "react";

export default function LandingAnalysisLab() {
	const [allowed, setAllowed] = useState(false);

	useEffect(() => {
		const consent = typeof window !== "undefined" ? localStorage.getItem("learning_consent_v1") : null;
		if (consent === "accepted") setAllowed(true);
	}, []);

	if (!allowed) {
		return (
			<div className="min-h-screen flex items-center justify-center p-6">
				<div className="bg-white rounded-xl shadow p-6 max-w-md w-full text-center">
					<div className="text-gray-800 font-medium">Consent required</div>
					<p className="text-sm text-gray-600 mt-2">Please review and accept the learning lab consent first.</p>
					<a className="mt-3 inline-block px-3 py-1 rounded bg-indigo-600 text-white text-sm" href="/learning/consent">Go to consent</a>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl">
				<h1 className="text-2xl font-bold text-indigo-800">Landing Page Analysis (Sandbox)</h1>
				<p className="text-sm text-gray-600 mt-2">Iframe to local OWASP Juice Shop (admin-hosted). Learners cannot control deployment.</p>
				<div className="mt-3">
					<iframe src="http://localhost:3000" title="Juice Shop" className="w-full h-[600px] border rounded" />
				</div>
				<div className="mt-3 text-xs text-gray-500">If iframe fails, ask admin to ensure Docker container is running on port 3000.</div>
			</div>
		</div>
	);
}


