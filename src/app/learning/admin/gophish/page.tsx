"use client";

import React from "react";

export default function AdminGoPhishGuide() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full">
				<h1 className="text-2xl font-bold text-indigo-800">Advanced Lab: GoPhish (Admin Reference)</h1>
				<p className="text-gray-700 mt-3">
					This page describes an advanced, optional lab for administrators using GoPhish inside a controlled, isolated VM. Learners should not run live simulations against real users.
				</p>
				<ul className="list-disc list-inside text-gray-700 mt-3 text-sm">
					<li>Package a downloadable VM with GoPhish preinstalled, isolated from production networks.</li>
					<li>Include a signed consent template that requires explicit approval before any exercise.</li>
					<li>Only use test mailboxes and non-production domains under your control.</li>
					<li>Rate-limit and log all activity. No external targets permitted.</li>
				</ul>
				<div className="mt-4 p-3 bg-indigo-50 border-l-4 border-indigo-300 rounded text-sm text-indigo-900">
					Legal & Ethical: Do not run phishing campaigns against real users or organizations without written consent. Violations can be unlawful and unethical.
				</div>
				<div className="mt-4 text-xs text-gray-500">Reference: GoPhish.</div>
			</div>
		</div>
	);
}


