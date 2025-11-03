"use client";

import React, { useState } from "react";

export default function SandboxPhishingLanding() {
	const [u, setU] = useState("");
	const [p, setP] = useState("");
	const [msg, setMsg] = useState<string | null>(null);

	return (
		<div className="min-h-[520px] flex items-center justify-center bg-gray-50 p-6">
			<div className="bg-white rounded-xl shadow p-6 w-full max-w-sm">
				<h2 className="text-lg font-semibold text-red-700">Simulated Fake Login</h2>
				<p className="text-xs text-gray-500 mt-1">
					This is a safe, local simulation. Do not reuse real credentials.
				</p>
				<form
					className="mt-4"
					onSubmit={(e) => {
						e.preventDefault();
						setMsg("Captured credentials (simulation only). This demonstrates data theft risk.");
					}}
				>
					<label className="block text-xs text-gray-500">Username</label>
					<input className="mt-1 w-full border rounded px-2 py-1" value={u} onChange={(e) => setU(e.target.value)} />
					<label className="block text-xs text-gray-500 mt-3">Password</label>
					<input className="mt-1 w-full border rounded px-2 py-1" type="password" value={p} onChange={(e) => setP(e.target.value)} />
					<button className="mt-4 w-full px-3 py-2 rounded bg-red-600 text-white text-sm hover:opacity-95">Sign in (simulate)</button>
				</form>
				{msg && (
					<div className="mt-3 text-sm bg-yellow-50 border border-yellow-300 text-yellow-900 rounded p-2">{msg}</div>
				)}
				<div className="mt-3 text-xs text-gray-500">
					What to do in real life: close the page, change passwords, enable MFA, and notify IT.
				</div>
			</div>
		</div>
	);
}


