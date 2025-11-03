"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level4Problem1Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputUserId, setInputUserId] = useState("10002");
  const [simulatedCurrentUserId] = useState("10001");
  const [accessResult, setAccessResult] = useState<string | null>(null);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("copy failed", e);
    }
  }

  function simulateAccess() {
    if (inputUserId === simulatedCurrentUserId) {
      setAccessResult("Access granted: Viewing your own information.");
    } else {
      setAccessResult(`Access granted: Viewing user #${inputUserId} (IDOR vulnerability!)`);
    }
  }

  function resetSim() {
    setInputUserId("10002");
    setAccessResult(null);
    setShowAnswer(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/learning/level4">
            <button className="btn-secondary mb-6 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Level 4
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 1
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Insecure Direct Object Reference (IDOR)
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how IDOR vulnerabilities allow unauthorized access to resources
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Theory */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A web app uses user-supplied IDs/parameters to retrieve database records, but does not enforce proper access control. What could go wrong if users can modify a customer or account ID in the request?
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">Backend data access, APIs, and web resource URLs</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Information disclosure, privilege escalation, unauthorized changes</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Explanation</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Insecure Direct Object Reference (IDOR) occurs when applications use user-input to directly reference objects (such as user IDs, files, or records) in storage, without sufficient authorization checks. Attackers can manipulate these references to access data or actions that don't belong to them.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> A user requests their own account:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  GET /api/account?user=10001
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  But if they change the user ID:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  GET /api/account?user=10002
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  and the app returns the account for user=10002, that's an IDOR.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Why This is Dangerous</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Attackers can read or modify other users' personal details, financial data, or secrets by guessing or tampering with identifiers in the URL, body, or API request. This regularly leads to massive data breaches and privilege abuse.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Mitigation:</strong> Always enforce object-level authorization checks: the backend should verify the accessing user is allowed to view or modify each object.</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Mitigation Strategies</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Enforce authorization for every resource accessed - verify the user has rights to each object",
                  "Do not trust IDs from user input - validate ownership before returning data",
                  "Never expose predictable or sequential identifiers if avoidable",
                  "Use indirect object references or access tokens that map to authorized resources",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Right Column - Practice */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Example Answer</h2>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 mb-4">
                <p className="text-indigo-700 text-sm leading-relaxed font-medium">
                  The endpoint authorizes based only on user-supplied IDs, allowing access to any account by changing the ID.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard("GET /api/account?user=" + inputUserId)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Request
                </button>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  {showAnswer ? "Hide" : "Show"} Explanation
                </button>
              </div>
              {copied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-700 text-sm flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Copied to clipboard
                </motion.div>
              )}
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4"
                >
                  <h4 className="font-semibold text-indigo-700 mb-2">Explanation</h4>
                  <p className="text-slate-700 text-sm leading-relaxed mb-2">
                    The endpoint authorizes based only on user-supplied IDs, not on the logged-in user's permissions. As a result, a user can access any account by changing this ID. The fix is to strictly check that the accessing user has rights to every referenced object, on every request.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Enforce authorization for every resource accessed, do not trust IDs from user input, and never expose predictable or sequential identifiers if avoidable.
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card p-6 border-2 border-amber-300 bg-amber-50"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Ethical Reminder</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Only test for access control issues on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">Simulated vulnerable endpoint. Change the User ID below and simulate the request.</p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-600" />
                  Vulnerable Endpoint Preview (simulated)
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    simulateAccess();
                  }}
                  className="bg-white rounded-xl p-4 border-2 border-slate-200 mb-4"
                >
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Account/User ID</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      value={inputUserId}
                      onChange={(e) => setInputUserId(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-primary px-6 py-3"
                    >
                      Simulate
                    </button>
                  </div>
                </form>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 min-h-[72px]">
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono">
                    {accessResult ? accessResult : "No request simulated yet."}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mt-4">(No real data — this is a safe simulation of IDOR!)</p>
                <div className="mt-4 flex gap-3">
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    onClick={resetSim}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
