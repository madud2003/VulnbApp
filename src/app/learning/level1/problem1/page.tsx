"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Eye, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level1Problem1Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginResult, setLoginResult] = useState<string | null>(null);
  const [showExternalDemo, setShowExternalDemo] = useState(false);

  const weakPassword = "12345";
  const escapedWeakPassword = "12345";

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
          <Link href="/learning/level1">
            <button className="btn-secondary mb-6 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Level 1
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 1
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Weak Passwords
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how weak passwords can be easily compromised and understand the importance of strong authentication
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Many users choose simple passwords, such as "12345", which are easily guessed or cracked.
                Demonstrate the risk of using such a weak password for an account.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">User accounts with weak passwords</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Unauthorized access to sensitive data or systems</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Explanation</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Weak passwords, like "12345", are vulnerable to brute force attacks, where attackers
                systematically try common passwords or use automated tools to guess credentials. These
                passwords lack complexity and are often found in publicly available password lists.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium">
                  <strong>Example:</strong> A user sets credentials: <code className="bg-white px-2 py-1 rounded text-indigo-600">admin / 12345</code>
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
                The password "12345" is one of the most commonly used passwords and appears in nearly
                every password dictionary. Attackers can use tools like Hydra or John the Ripper to guess
                it in seconds during a brute force attack.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Note:</strong> Weak passwords are a leading cause of security breaches.
                  Always use strong, unique passwords and test systems only with explicit permission.</span>
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
                  "Use complex passwords with at least 12 characters",
                  "Implement multi-factor authentication (MFA)",
                  "Enforce password policies that reject weak passwords",
                  "Use a password manager for unique passwords",
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 mb-6">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  Try the vulnerable login simulation:
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (usernameInput.trim() === "admin" && passwordInput === weakPassword) {
                      setLoginResult("✅ Login success (vulnerable): Weak password accepted for admin.");
                    } else {
                      setLoginResult("❌ Login failed: Credentials did not match. Try 'admin' / '12345'.");
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="admin"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Password</label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" />
                      Login (Simulate)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUsernameInput("admin");
                        setPasswordInput(weakPassword);
                        setLoginResult(null);
                      }}
                      className="btn-secondary py-3 px-4"
                    >
                      Auto-fill
                    </button>
                  </div>
                </form>
                {loginResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl border-2 flex items-center gap-3 ${
                      loginResult.includes("✅")
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-red-50 border-red-300 text-red-700"
                    }`}
                  >
                    {loginResult.includes("✅") ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span>{loginResult}</span>
                  </motion.div>
                )}
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-indigo-600 font-semibold flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    External Demo
                  </span>
                  <button
                    onClick={() => setShowExternalDemo(!showExternalDemo)}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    {showExternalDemo ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Link to Altoro Mutual practice site demonstrating insecure login behavior.
                </p>
                <a
                  href="http://testfire.net/login.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-2.5 text-sm mb-3 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Altoro Mutual Login
                </a>
                {showExternalDemo && (
                  <div className="mt-4">
                    <iframe
                      src="http://testfire.net/login.jsp"
                      title="Altoro Mutual Login"
                      className="w-full h-[400px] border-2 border-slate-200 rounded-xl"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Example Answer</h2>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 mb-4">
                <pre className="text-indigo-600 font-mono text-sm break-words">{escapedWeakPassword}</pre>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => copyToClipboard(weakPassword)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Password
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
                  className="mt-3 p-3 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-700 text-sm flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Copied to clipboard
                </motion.div>
              )}

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4"
                >
                  <h4 className="font-semibold text-indigo-700 mb-2">Explanation</h4>
                  <p className="text-slate-700 text-sm leading-relaxed mb-2">
                    The password "12345" is extremely weak because it is short, predictable, and commonly used.
                    Attackers can easily guess it using automated tools or precompiled password lists.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Use a password like <code className="bg-white px-2 py-1 rounded text-indigo-600">P@ssw0rd!2025#Secure</code> and enable MFA.
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 border-2 border-amber-300 bg-amber-50"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Ethical Reminder</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Only test password vulnerabilities on systems you own or have explicit permission to test.
                    Unauthorized access attempts are illegal and unethical.
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
