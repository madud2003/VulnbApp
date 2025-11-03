"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level5Problem1Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  const csrfExample = `<a href="http://bank.com/transfer?amount=1000&to=attacker">Click here for free gift!</a>`;
  const escapedCsrfExample = `&lt;a href=&quot;http://bank.com/transfer?amount=1000&amp;to=attacker&quot;&gt;Click here for free gift!&lt;/a&gt;`;

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("copy failed", e);
    }
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 1
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Cross-Site Request Forgery (CSRF)
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how CSRF attacks exploit authenticated user sessions
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A web application does not protect against Cross-Site Request Forgery (CSRF), allowing attackers to exploit a user's authenticated session. Why is CSRF dangerous?
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">Authenticated user sessions</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Unauthorized actions performed on behalf of the user</p>
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
                CSRF attacks trick authenticated users into performing unintended actions on a web application by leveraging their active session. Attackers craft malicious links or forms that, when activated by the user, send unauthorized requests to the server. Since the request includes the user's session cookies, the server processes it as legitimate.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> A user receives an email or visits a malicious website containing:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  {escapedCsrfExample}
                </pre>
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
                If the user is logged into <code className="bg-slate-100 px-2 py-1 rounded">bank.com</code> and clicks the malicious link, their browser automatically sends a request to transfer money to the attacker's account, using the user's authenticated session. The server, unaware of the malicious intent, processes the request, resulting in unauthorized fund transfers or other actions.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Note:</strong> CSRF is a serious vulnerability that exploits trust in user sessions. Always test systems only with explicit permission and implement CSRF protections.</span>
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
                  "Implement CSRF tokens unique to each user session, validated on the server for state-changing requests",
                  "Use the SameSite attribute on cookies to restrict cross-origin requests",
                  "Require re-authentication or additional verification for sensitive actions (e.g., fund transfers)",
                  "Educate users to avoid clicking suspicious links, especially while logged into sensitive applications",
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">This area simulates a malicious link that could trigger a CSRF attack.</p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-pink-600" />
                  Malicious Link Preview (simulated)
                </p>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 min-h-[72px] mb-4">
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono">
                    {escapedCsrfExample}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mb-4">(This is a simulated preview to demonstrate a CSRF attack safely. No actual requests are sent.)</p>
                <div className="flex gap-3">
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    onClick={() => window.alert("This is a simulated action. No requests are sent in this preview.")}
                  >
                    Click link (simulate)
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
                  It tricks authenticated users into performing unintended actions.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(csrfExample)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Malicious Link
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
                    The malicious link exploits the user's authenticated session to send a request to bank.com for a money transfer. Since the browser includes the user's session cookies, the server processes the request as legitimate, performing the unintended action (e.g., transferring funds to the attacker).
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Implement CSRF tokens and set SameSite=Strict on session cookies to prevent unauthorized requests.
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
                    Only test CSRF vulnerabilities on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.
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
