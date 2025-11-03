"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, FileCode, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level2Problem1Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [queryPreview, setQueryPreview] = useState<string | null>(null);
  const [safeQueryPreview, setSafeQueryPreview] = useState<string | null>(null);
  const [bypassResult, setBypassResult] = useState<string | null>(null);

  const sqlInjectionPayload = "admin' OR '1'='1";
  const escapedSqlInjectionPayload = "admin' OR '1'='1";

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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <FileCode className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 1
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                SQL Injection (SQLi)
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how SQL injection attacks exploit vulnerable database queries
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A login form accepts user input without proper validation or sanitization, allowing attackers to inject malicious SQL queries. What happens if the input <code className="bg-slate-100 px-2 py-1 rounded">{escapedSqlInjectionPayload}</code> is used in such a form?
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">Database queries handling user input</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Unauthorized access, data exposure, or database manipulation</p>
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
                SQL injection occurs when untrusted user input is directly included in a database query. Attackers can manipulate the query's logic by injecting SQL code, potentially bypassing authentication, accessing unauthorized data, or even modifying the database.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> A vulnerable login form processes:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  Username: {escapedSqlInjectionPayload}
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  This alters the SQL query to:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  SELECT * FROM users WHERE username = 'admin' OR '1'='1';
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
                The input <code className="bg-slate-100 px-2 py-1 rounded">{escapedSqlInjectionPayload}</code> manipulates the SQL query to always evaluate to true due to the <code className="bg-slate-100 px-2 py-1 rounded">OR '1'='1'</code> condition. This allows the attacker to bypass authentication, gaining access to the system as the user (e.g., 'admin') without knowing the password.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Note:</strong> SQL injection is a critical vulnerability. Always test systems only with explicit permission and use secure coding practices to prevent it.</span>
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
                  "Use parameterized queries or prepared statements to separate user input from SQL logic",
                  "Validate and sanitize all user inputs to reject unexpected characters",
                  "Use an ORM (Object-Relational Mapping) library to handle database interactions safely",
                  "Limit database user permissions to minimize damage from potential exploits",
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <FileCode className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">This area simulates a login form vulnerable to SQL injection.</p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  Try the vulnerable login
                </p>
                <form
                  className="bg-white rounded-xl p-4 border-2 border-slate-200 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const unsafeQuery = `SELECT * FROM users WHERE username = '${usernameInput}' AND password = '${passwordInput}';`;
                    setQueryPreview(unsafeQuery);
                  }}
                >
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder={escapedSqlInjectionPayload}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2">Password</label>
                    <input
                      type="text"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="password"
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      type="submit"
                      className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                    >
                      Build unsafe query
                    </button>
                    <button
                      type="button"
                      className="btn-secondary px-4 py-2 text-sm"
                      onClick={() => {
                        setUsernameInput(sqlInjectionPayload);
                        setPasswordInput("anything");
                        setQueryPreview(null);
                        setSafeQueryPreview(null);
                        setBypassResult(null);
                      }}
                    >
                      Fill SQLi payload
                    </button>
                    <button
                      type="button"
                      className="btn-secondary px-4 py-2 text-sm"
                      onClick={() => {
                        setSafeQueryPreview(
                          `SELECT * FROM users WHERE username = ? AND password = ?;\nparams = ["${usernameInput}", "${passwordInput}"]`
                        );
                        setBypassResult(null);
                      }}
                    >
                      Show parameterized query
                    </button>
                    <button
                      type="button"
                      className="btn-secondary px-4 py-2 text-sm"
                      onClick={() => {
                        const u = usernameInput || sqlInjectionPayload;
                        const p = passwordInput || "anything";
                        const vulnerableBypass = /'\s*or\s*'1'\s*=\s*'1/i.test(u);
                        setBypassResult(
                          vulnerableBypass
                            ? "Bypassed authentication in vulnerable query (simulation)."
                            : "Blocked: parameterized query would treat input as data."
                        );
                      }}
                    >
                      Try login (simulate)
                    </button>
                  </div>
                </form>
                {queryPreview && (
                  <div className="mt-4 bg-white rounded-xl p-4 border-2 border-red-300">
                    <pre className="whitespace-pre-wrap break-words text-sm text-slate-700 font-mono">{queryPreview}</pre>
                    <p className="text-xs text-red-700 mt-2">This query is unsafe. The condition can be forced true with input like {escapedSqlInjectionPayload}.</p>
                  </div>
                )}
                {safeQueryPreview && (
                  <div className="mt-4 bg-emerald-50 rounded-xl p-4 border-2 border-emerald-300">
                    <pre className="whitespace-pre-wrap break-words text-sm text-slate-700 font-mono">{safeQueryPreview}</pre>
                    <p className="text-xs text-emerald-800 mt-2">This approach uses placeholders to prevent mixing data with SQL logic.</p>
                  </div>
                )}
                {bypassResult && (
                  <div className={`mt-4 rounded-xl p-4 border-2 text-sm ${
                    bypassResult.startsWith("Bypassed")
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-emerald-50 border-emerald-300 text-emerald-800"
                  }`}>
                    {bypassResult}
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-4">This demo shows how string concatenation leads to SQL injection.</p>
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
                  The query always evaluates true, giving unauthorized access.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(sqlInjectionPayload)}
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
                    The payload <code className="bg-white px-2 py-1 rounded">{escapedSqlInjectionPayload}</code> manipulates the SQL query to include <code className="bg-white px-2 py-1 rounded">OR '1'='1'</code>, which is always true. This causes the query to return results (e.g., the admin user's record) regardless of the password, granting unauthorized access.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Use parameterized queries like <code className="bg-white px-2 py-1 rounded">SELECT * FROM users WHERE username = ? AND password = ?</code> to prevent injection.
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
                    Only test SQL injection vulnerabilities on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.
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
