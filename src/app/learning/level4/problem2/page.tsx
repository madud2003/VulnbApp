"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, FileText, AlertTriangle, ShieldCheck, Copy, Lock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Level4Problem2Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  const privilegeEscalationExample = "sudo /bin/bash";
  const escapedPrivilegeEscalationExample = "sudo /bin/bash";

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
          <Link href="/learning/level4">
            <button className="btn-secondary mb-6 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Level 4
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 2
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Privilege Escalation
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Learn how privilege escalation attacks exploit system misconfigurations
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Problem Statement</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                A system has misconfigurations that allow attackers to gain higher access privileges. Why is privilege escalation dangerous?
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">System access controls and configurations</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Full system control, data breaches, or persistent malicious access</p>
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
                Privilege escalation occurs when an attacker exploits system misconfigurations, vulnerabilities, or weak access controls to gain higher-level permissions than intended (e.g., from a normal user to admin or root). This allows attackers to perform unauthorized actions, such as accessing sensitive data, modifying system configurations, or installing malicious software.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  <strong>Example:</strong> A normal user exploits a misconfigured system by running:
                </p>
                <pre className="bg-white rounded-lg p-3 text-xs text-indigo-600 font-mono whitespace-pre-wrap break-words">
                  {escapedPrivilegeEscalationExample}
                </pre>
                <p className="text-sm text-indigo-700 font-medium mt-3">
                  This grants the user a root shell due to overly permissive sudo configurations.
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
                The command <code className="bg-slate-100 px-2 py-1 rounded">{escapedPrivilegeEscalationExample}</code> exploits a misconfiguration in the <code className="bg-slate-100 px-2 py-1 rounded">sudoers</code> file that allows a normal user to execute commands with root privileges. This grants the attacker full control over the system, enabling them to access sensitive files, install backdoors, or disrupt system operations.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Note:</strong> Privilege escalation is a critical vulnerability. Always test systems only with explicit permission and ensure proper access controls.</span>
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
                  "Follow the principle of least privilege: grant users only the permissions they need",
                  "Regularly audit sudoers configurations and restrict commands that allow shell access",
                  "Apply system patches and harden configurations to eliminate exploitable vulnerabilities",
                  "Monitor and log privileged activities to detect suspicious behavior",
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">This area simulates a system command prompt vulnerable to privilege escalation.</p>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <p className="text-slate-700 mb-4 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  Vulnerable Command Preview (simulated)
                </p>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 min-h-[72px] mb-4">
                  <pre className="whitespace-pre-wrap text-sm break-words text-slate-700 font-mono">
                    Command: {escapedPrivilegeEscalationExample}
                  </pre>
                </div>
                <p className="text-xs text-slate-400 mb-4">(This is a simulated preview to demonstrate privilege escalation safely.)</p>
                <div className="flex gap-3">
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    onClick={() => window.alert("This is a simulated action. No commands are executed in this preview.")}
                  >
                    Run command (simulate)
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
                  It lets attackers gain admin/root access, fully compromising the system.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(privilegeEscalationExample)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Command
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
                    The command <code className="bg-white px-2 py-1 rounded">{escapedPrivilegeEscalationExample}</code> exploits a misconfigured <code className="bg-white px-2 py-1 rounded">sudoers</code> file that allows a normal user to run <code className="bg-white px-2 py-1 rounded">/bin/bash</code> with root privileges. This grants the attacker a root shell, giving them full control over the system.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Restrict sudo access to specific, necessary commands and avoid allowing shell access (e.g., /bin/bash).
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
                    Only test privilege escalation vulnerabilities on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.
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
