"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Sword, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level5Problem2Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputUrl, setInputUrl] = useState("http://localhost/admin");
  const [ssrfResult, setSsrfResult] = useState<string | null>(null);

  const ssrfExample = "Request to http://localhost/admin leaks internal data";
  const escapedSsrfExample = "Request to http://localhost/admin leaks internal data";

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("copy failed", e);
    }
  }

  function simulateSsrfRequest() {
    if (/localhost|127.0.0.1|internal|admin/i.test(inputUrl)) {
      setSsrfResult("SSRF vulnerability: Internal resource accessed! Sensitive info leaked.");
    } else {
      setSsrfResult("Request sent to remote address (no internal data exposed).");
    }
  }

  function resetSim() {
    setInputUrl("http://localhost/admin");
    setSsrfResult(null);
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
          <Link href="/learning/level5">
            <button className="btn-secondary mb-6 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Level 5
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Sword className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 2
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Server-Side Request Forgery (SSRF)
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how SSRF attacks exploit server-side request handling
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A web app fetches URLs based on user input (e.g., screenshot web page, import RSS), but does not strictly validate the user's supplied URL. What could go wrong with this feature?
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">Internal networks, cloud metadata APIs, local services</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Exposure of secrets, lateral movement, information leakage</p>
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
                Server-Side Request Forgery (SSRF) occurs when attackers trick a server into making HTTP requests to arbitrary hosts, including internal systems not exposed to the internet. This allows attackers to scan internal networks, access sensitive endpoints (like metadata services or admin tools), or abuse cloud resources.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> Suppose the app lets users supply any URL:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  fetch("{inputUrl}")
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  If an attacker inputs an internal address like:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  http://localhost/admin
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  The server may fetch data from an internal-only resource, leaking secrets.
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
                SSRF can allow attackers to interact with services unreachable from outside, like cloud metadata, databases, internal dashboards, or even privileged API endpoints. This may lead to total system compromise or data theft, especially in cloud environments.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Mitigation:</strong> Only allow safe-listed destinations, do not fetch user-supplied URLs, and use metadata protection features of cloud providers.</span>
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
                  "Only allow safe-listed destinations - maintain a whitelist of permitted URLs",
                  "Do not fetch user-supplied URLs directly - use a proxy or validation service",
                  "Use metadata protection features of cloud providers (e.g., AWS IMDSv2)",
                  "Validate and sanitize all URLs, blocking internal IPs, localhost, and private ranges",
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
              transition={{ delay: 0.2 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                  <Sword className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">
                Simulate requesting a URL from the server. Change the URL and try it; see if internal addresses leak data. (No real network requests are made.)
              </p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-rose-600" />
                  SSRF Request Preview (simulated)
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    simulateSsrfRequest();
                  }}
                  className="bg-white rounded-xl p-4 border-2 border-slate-200 mb-4"
                >
                  <label className="block text-slate-700 text-sm font-semibold mb-2">Request URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-primary px-6 py-3"
                    >
                      Simulate
                    </button>
                  </div>
                </form>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 min-h-[72px] mb-4">
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono">
                    {ssrfResult ? ssrfResult : "No request simulated yet."}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mb-4">(This is a safe simulation. No network or real SSRF is performed.)</p>
                <div className="flex gap-3">
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    onClick={resetSim}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>

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
                  The server fetches URLs based on user input, including internal endpoints, exposing sensitive internal data.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(inputUrl)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy URL
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
                    The server fetches URLs based on user input, including internal endpoints if not properly validated or restricted. This exposes sensitive internal data and can allow attackers to pivot deeper into the internal network.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Only allow hard-coded lists of external, trusted URLs; never let users supply arbitrary request destinations.
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
                    Only test SSRF vulnerabilities on systems you own or have explicit permission to test. Unauthorized SSRF testing is illegal and unethical.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
