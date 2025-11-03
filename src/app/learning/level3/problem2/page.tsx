"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Key, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level3Problem2Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [simulatedSessionId, setSimulatedSessionId] = useState("ABC123FIXED");
  const [preLoginCookie, setPreLoginCookie] = useState<string | null>(null);
  const [loginResult, setLoginResult] = useState<string | null>(null);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("copy failed", e);
    }
  }

  function simulateFixation() {
    setPreLoginCookie(simulatedSessionId);
    setLoginResult(null);
  }

  function simulateLogin() {
    if (preLoginCookie) {
      setLoginResult(`Login succeeded without rotating session. Attacker keeps session ${preLoginCookie}.`);
    } else {
      setLoginResult("No pre-set session. New session is created on login.");
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
          <Link href="/learning/level3">
            <button className="btn-secondary mb-6 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Level 3
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Key className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 2
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Session Fixation
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how session fixation attacks exploit authentication flows
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A web app does not rotate the session ID after login. An attacker can force a victim to use a known session ID before the victim authenticates, then hijack the authenticated session.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">Authentication flow and session lifecycle</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Account takeover without stealing credentials</p>
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
                Session fixation occurs when an application accepts a session identifier supplied by the user and continues using it after login. If the app does not issue a new session ID upon authentication, any party that knows the pre-login session can assume the user's identity post-login.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> Attacker sets a fixed session ID before the victim logs in:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  Set-Cookie: sessionid={simulatedSessionId}; Path=/; HttpOnly
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  If the app does not rotate the session ID at login, the attacker reuses the same ID to access the victim's session after authentication.
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
                Without rotating the session ID on authentication, any pre-established session remains valid and now becomes authenticated. The attacker who fixed that ID can immediately hijack the user's session.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Mitigation:</strong> Regenerate session IDs after login, reject user-supplied IDs, set appropriate cookie flags (HttpOnly, Secure, SameSite), and limit session lifetime.</span>
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
                  "Regenerate session IDs after successful authentication and invalidate the old one",
                  "Never accept user-supplied session identifiers - always generate new ones",
                  "Set appropriate cookie flags: HttpOnly, Secure, SameSite=Strict",
                  "Limit session lifetime with both idle and absolute timeouts",
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">This area simulates a session fixation flow.</p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  Vulnerable Flow Preview (simulated)
                </p>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 min-h-[72px] mb-4">
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono">
                    {preLoginCookie
                      ? `Pre-login cookie set: sessionid=${preLoginCookie}`
                      : "No pre-login session cookie set."}
                  </pre>
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono mt-2">
                    {loginResult ? `Login result: ${loginResult}` : "Not logged in yet."}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mb-4">(This safely demonstrates session fixation without setting real cookies.)</p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                    onClick={simulateFixation}
                  >
                    Set session ID (simulate)
                  </button>
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    onClick={simulateLogin}
                  >
                    Login (simulate)
                  </button>
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    onClick={() => {
                      setPreLoginCookie(null);
                      setLoginResult(null);
                    }}
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
                  The app keeps the same session ID after login, allowing attackers to reuse a fixed pre-login session.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(simulatedSessionId)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Session ID
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
                    Because the app keeps the same session ID after login, the attacker who fixed that ID before authentication can reuse it to access the account. The correct mitigation is to regenerate the session after successful authentication and invalidate the old one.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Rotate session ID on login, set HttpOnly/Secure/SameSite, restrict path/domain as needed, and shorten idle/absolute timeouts.
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
                    Only test authentication vulnerabilities on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.
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
