"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Bug, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level2Problem2Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [runResult, setRunResult] = useState<string | null>(null);

  const xssPayload = "<script>alert('Hacked!');</script>";
  const escapedXssPayload = "&lt;script&gt;alert('Hacked!');&lt;/script&gt;";

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
          <Link href="/learning/level2">
            <button className="btn-secondary mb-6 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Level 2
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Bug className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 2
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Cross-Site Scripting (XSS)
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how XSS attacks exploit vulnerable input handling
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
                An input field on a web page does not properly sanitize user input, allowing attackers to inject malicious scripts. What is the risk if the input <code className="bg-slate-100 px-2 py-1 rounded">{escapedXssPayload}</code> is used?
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">Client-side DOM where user input is rendered</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Execution of malicious scripts leading to data theft or account compromise</p>
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
                Cross-Site Scripting (XSS) occurs when untrusted user input is rendered into a web page without proper escaping or sanitization. Attackers can inject malicious JavaScript code, which executes in the victim's browser, potentially stealing cookies, hijacking sessions, or performing unauthorized actions.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> A vulnerable input field accepts:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  {escapedXssPayload}
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
                The payload <code className="bg-slate-100 px-2 py-1 rounded">{escapedXssPayload}</code> injects a script that executes <code className="bg-slate-100 px-2 py-1 rounded">alert('Hacked!')</code> in the user's browser. In a real attack, the script could steal session cookies, redirect users to malicious sites, or perform actions as the logged-in user.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Note:</strong> XSS is a severe vulnerability. Always test systems only with explicit permission and use secure coding practices to prevent it.</span>
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
                  "HTML-escape user input before rendering (e.g., convert < to &lt;)",
                  "Use frameworks that automatically escape output or use textContent instead of innerHTML",
                  "Implement a Content Security Policy (CSP) to block inline scripts",
                  "Validate and sanitize all user inputs to reject malicious code",
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
                  <Bug className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">This area simulates a vulnerable input field that echoes user input into the page.</p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-pink-600" />
                  Vulnerable Output Preview (simulated)
                </p>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 min-h-[72px] mb-4">
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono">
                    {userInput ? userInput.replace(/</g, "&lt;").replace(/>/g, "&gt;") : escapedXssPayload}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mb-4">(The preview is escaped to avoid executing scripts in this page.)</p>
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2">User input</label>
                  <textarea
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all h-24"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type or fill a payload to simulate rendering"
                  />
                  <div className="mt-3 flex gap-3">
                    <button
                      className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                      onClick={() => setUserInput(xssPayload)}
                    >
                      Fill default payload
                    </button>
                    <button
                      className="btn-secondary px-4 py-2 text-sm"
                      onClick={() => setUserInput("")}
                    >
                      Clear
                    </button>
                    <button
                      className="btn-secondary px-4 py-2 text-sm"
                      onClick={() => {
                        const input = userInput || xssPayload;
                        if (/<script/i.test(input)) {
                          setRunResult("Detected script tag in input. In a vulnerable app using innerHTML, this would execute.");
                        } else {
                          setRunResult("No script tag detected. Still avoid rendering untrusted HTML.");
                        }
                      }}
                    >
                      Run (simulate)
                    </button>
                  </div>
                  {runResult && (
                    <div className="mt-4 rounded-xl p-4 border-2 bg-amber-50 border-amber-300 text-amber-800 text-sm">
                      {runResult}
                    </div>
                  )}
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
                  It executes in the user's browser, leading to cookie theft or session hijacking.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(xssPayload)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Payload
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
                    The payload <code className="bg-white px-2 py-1 rounded">{escapedXssPayload}</code> injects a script that runs <code className="bg-white px-2 py-1 rounded">alert('Hacked!')</code> in the user's browser. If the application renders user input directly into the DOM (e.g., via innerHTML), the script executes, potentially stealing cookies or hijacking the user's session.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Use textContent or frameworks that auto-escape output to prevent script execution.
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
                    Only test XSS vulnerabilities on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.
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
