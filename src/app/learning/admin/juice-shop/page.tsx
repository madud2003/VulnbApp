"use client";

import React from "react";

export default function AdminJuiceShopGuide() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full">
				<h1 className="text-2xl font-bold text-indigo-800">Admin: Deploy OWASP Juice Shop (Docker)</h1>
				<p className="text-gray-700 mt-3">For instructors/admins only. Do not expose publicly without controls.</p>
				<div className="mt-4 text-sm text-gray-800">
					<div className="font-medium">Commands (PowerShell)</div>
					<pre className="bg-gray-50 border rounded p-3 whitespace-pre-wrap break-words">
docker pull bkimminich/juice-shop:latest
docker run --rm -d -p 3000:3000 --name juice-shop bkimminich/juice-shop
# Access: http://localhost:3000
# Stop: docker stop juice-shop
					</pre>
					<p className="text-xs text-gray-500 mt-2">Reference: OWASP Foundation — Juice Shop.</p>
				</div>
				<div className="mt-6">
					<h2 className="text-lg font-semibold text-indigo-700">Locked learner lab</h2>
					<p className="text-gray-700 text-sm mt-1">Provide the landing page analysis as an internal route with an iframe pointing to http://localhost:3000. Use consent gate and role-based visibility (not implemented in this demo).</p>
				</div>
			</div>
		</div>
	);
}


