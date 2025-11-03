"use client";

import React, { useState } from "react";
import Link from "next/link";
import LabModule from "../../_components/LabModule";
import QuizModule from "../../_components/QuizModule";
import { SAMPLE_PHISHING_EMAIL, SAMPLE_HEADERS } from "../../_data/cannedEmails";
import { ArrowLeft, HelpCircle, Mail, AlertTriangle, ShieldCheck, Copy, CheckCircle, XCircle, ExternalLink, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Level1Problem2Page() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const [analysisFindings, setAnalysisFindings] = useState<string[]>([]);
	const [extractedLinks, setExtractedLinks] = useState<string[]>([]);
	const [analysisVerdict, setAnalysisVerdict] = useState<string | null>(null);

  const phishingExample = SAMPLE_PHISHING_EMAIL;

  const escapedPhishingExample = `From: support@bank.com<br>Subject: Urgent: Verify Your Account<br>Click here to update your password: http://bank-security.com/login`;

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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-2">
                PROBLEM 2
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Phishing Emails
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">
            Identify and analyze phishing attacks through email forensics and link inspection
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column: Problem + Explanation + Examples */}
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
                Attackers send fraudulent emails to trick users into revealing sensitive information, such as login credentials. Identify why an email claiming to be from a trusted source is suspicious.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-500 text-sm mb-2 font-medium">Target:</p>
                <p className="text-slate-700 font-semibold">User credentials or personal information</p>
                <p className="text-slate-500 text-sm mt-3 mb-2 font-medium">Risk:</p>
                <p className="text-slate-700 font-semibold">Identity theft, account compromise, or malware infection</p>
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
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Example Email</h2>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="text-slate-600 text-sm mb-2">A user receives:</p>
                <div className="bg-white rounded-lg p-3 border-2 border-slate-200">
                  <pre className="text-indigo-600 text-xs whitespace-pre-wrap break-words font-mono">
                    {escapedPhishingExample.replace(/<br>/g, '\n')}
                  </pre>
                </div>
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
                The email appears to come from "support@bank.com," but the domain in the link
                (http://bank-security.com) is not the bank's official domain. Clicking the link
                may direct users to a fake login page that captures their credentials.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Note:</strong> Phishing is a common attack vector. Always verify
                  email sources and avoid sharing sensitive information via unsolicited links.</span>
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
                  "Check the sender's email domain and compare it to the official domain",
                  "Hover over links (without clicking) to verify the URL matches the legitimate website",
                  "Enable multi-factor authentication (MFA) to reduce the impact of stolen credentials",
                  "Educate users to avoid clicking links in unsolicited emails",
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

          {/* Right column: Practice Area */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Practice Area</h2>
              </div>
              <p className="text-slate-600 mb-6">Use the modular lab below. All data is simulated and safe.</p>

            <div className="space-y-6">
              {/* Module 1: Email header forensics */}
              <LabModule
                moduleTitle="Email Header Forensics (Beginner)"
                objectives={[
                  "Read From/Return-Path and Received headers",
                  "Infer sender domain and relays",
                ]}
                tasks={[
                  { id: "from", prompt: "What is the From domain?" },
                  { id: "received", prompt: "Name one mail relay from Received headers." },
                  { id: "spf", prompt: "SPF result (pass/softfail/fail)?" },
                  { id: "rp", prompt: "Does Return-Path match From domain? (yes/no)" },
                ]}
                checkAnswer={(a) => {
                  const feedback: string[] = [];
                  let score = 0;
                  if (/bank\.com/i.test(a.from || "")) score += 25; else feedback.push("From domain should include bank.com");
                  if (/(mail\.bank\.com|mx\.example\.org)/i.test(a.received || "")) score += 25; else feedback.push("Relay example: mail.bank.com or mx.example.org");
                  if (/soft\s?fail/i.test(a.spf || "")) score += 25; else feedback.push("SPF shows softfail in Authentication-Results");
                  if (/(no|mismatch)/i.test(a.rp || "")) score += 25; else feedback.push("Return-Path no-reply@mailer-bank.com ≠ From support@bank.com");
                  if (score === 100) feedback.push("Good forensic read.");
                  return { score, feedback };
                }}
              >
                <pre className="bg-white border-2 border-slate-200 rounded-lg p-3 whitespace-pre-wrap break-words text-xs text-slate-700 font-mono">{SAMPLE_HEADERS}</pre>
              </LabModule>

              <LabModule
                moduleTitle="Email Forensics"
                objectives={[
                  "Identify sender domain vs. link domains",
                  "Spot insecure HTTP and look-alike domains",
                  "Interpret read-only scan summaries safely",
                ]}
                tasks={[
                  { id: "sender", prompt: "What is the sender's domain?" },
                  { id: "risk", prompt: "Name one phishing indicator present." },
                ]}
                checkAnswer={(answers) => {
                  const feedback: string[] = [];
                  let score = 0;
                  if (/(bank\.com)$/i.test(answers.sender || "")) {
                    score += 50;
                  } else {
                    feedback.push("Sender domain should be bank.com (from From: header).");
                  }
                  if (/(http:\/\/|bank-security|does not match|mismatch|look-alike)/i.test(answers.risk || "")) {
                    score += 50;
                  } else {
                    feedback.push("Mention indicators like HTTP link, mismatched domain, or look-alike host.");
                  }
                  if (score === 100) feedback.push("Great job identifying the key risks.");
                  return { score, feedback };
                }}
              >
                <div className="text-sm text-slate-700">
                  <div className="font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Canned raw headers
                  </div>
                  <pre className="mt-2 bg-white border-2 border-slate-200 rounded-lg p-3 whitespace-pre-wrap break-words text-xs text-slate-700 font-mono">{SAMPLE_HEADERS}</pre>

                  <div className="font-semibold mt-4 text-indigo-600 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email body
                  </div>
                  <textarea
                    className="mt-2 w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-800 bg-white placeholder-slate-400 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={emailInput}
                    placeholder="Paste or auto-fill the sample email"
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <button
                      className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                      onClick={async () => {
                        setEmailInput(phishingExample);
                        try {
                          const [u, v] = await Promise.all([
                            fetch("/api/mock/urlscan").then((r) => r.json()),
                            fetch("/api/mock/virustotal").then((r) => r.json()),
                          ]);
                          const lines: string[] = [];
                          lines.push(`urlscan verdict: ${u.verdict} for ${u.query}`);
                          lines.push(`VT: malicious=${v.detections.malicious}, suspicious=${v.detections.suspicious}`);
                          setAnalysisFindings(lines);
                          setExtractedLinks(["http://bank-security.com/login"]);
                          setAnalysisVerdict("Likely phishing: multiple signals present.");
                        } catch (_) {
                          setAnalysisFindings(["Failed to load mock scan data; proceed with manual indicators."]); 
                        }
                      }}
                    >
                      Auto-fill + Load Scans
                    </button>
                    <a
                      className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
                      href="/learning/sandbox/phishing-landing"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Landing Page
                    </a>
                  </div>

                  {analysisVerdict && (
                    <div className={`mt-4 p-4 rounded-xl border-2 flex items-center gap-3 ${
                      analysisVerdict.startsWith("Likely") 
                        ? "bg-amber-50 border-amber-300 text-amber-700" 
                        : "bg-emerald-50 border-emerald-300 text-emerald-700"
                    }`}
                    >
                      {analysisVerdict.startsWith("Likely") ? (
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="font-medium">{analysisVerdict}</span>
                    </div>
                  )}

                  {analysisFindings.length > 0 && (
                    <div className="mt-4 bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                      <div className="font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Indicators
                      </div>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {analysisFindings.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </LabModule>

              {/* Module 3: Link inspection with canned VirusTotal */}
              <LabModule
                moduleTitle="Link Inspection (Beginner)"
                objectives={["Interpret read-only VirusTotal/urlscan summaries", "Extract domain, path, and cert CN"]}
                tasks={[
                  { id: "domain", prompt: "What is the domain?" },
                  { id: "path", prompt: "What is the path?" },
                  { id: "cn", prompt: "Certificate Common Name (CN)?" },
                  { id: "risk", prompt: "Verdict (benign/suspicious) and 2 red flags" },
                ]}
                checkAnswer={(a) => {
                  const okDomain = /bank-security\.com/i.test(a.domain || "");
                  const okPath = /\/login/i.test(a.path || "");
                  const okCN = /bank-security\.com/i.test(a.cn || "");
                  const suspicious = /suspicious|malicious|new-domain/i.test(a.risk || "");
                  return {
                    score: (okDomain ? 25 : 0) + (okPath ? 25 : 0) + (okCN ? 25 : 0) + (suspicious ? 25 : 10),
                    feedback: [
                      "Canned VT summary: malicious=3, suspicious=5 → treat as suspicious.",
                      "Explain using counts or tags (phishing/new-domain).",
                    ],
                  };
                }}
              >
                <div className="text-sm text-slate-700">
                  <button
                    className="btn-primary px-4 py-2 text-sm mb-3 flex items-center gap-2"
                    onClick={async () => {
                      try {
                        const [vt, us] = await Promise.all([
                          fetch("/api/mock/virustotal").then((r) => r.json()),
                          fetch("/api/mock/urlscan").then((r) => r.json()),
                        ]);
                        setAnalysisFindings([
                          `VT: malicious=${vt.detections.malicious}, suspicious=${vt.detections.suspicious}, clean=${vt.detections.clean}`,
                          `urlscan: domain=${us.page.domain}, path=${us.page.path}, certCN=${us.page.certificate.commonName}`,
                        ]);
                      } catch (_) {
                        setAnalysisFindings(["Failed to load mock VT data"]);
                      }
                    }}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Load Canned VT Summary
                  </button>
                  {analysisFindings.length > 0 && (
                    <div className="mt-3 bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {analysisFindings.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </LabModule>

              {/* Module 4: Reporting & Response */}
              <LabModule
                moduleTitle="Reporting & Response Playbook"
                objectives={["Practice reporting a suspected phishing email", "Draft containment steps"]}
                tasks={[
                  { id: "report", prompt: "Click report (type 'report' to simulate)." },
                  { id: "ticket", prompt: "Summarize indicators (sender, URL, SPF)." },
                  { id: "contain", prompt: "Containment steps (2)." },
                ]}
                checkAnswer={(a) => {
                  let score = 0;
                  const fb: string[] = [];
                  if (/report/i.test(a.report || "")) score += 34; else fb.push("Use the Report action.");
                  if (/(bank\.com|bank-security\.com|spf)/i.test(a.ticket || "")) score += 33; else fb.push("Include sender, URL, SPF.");
                  if (/(block|reset|mfa|notify)/i.test(a.contain || "")) score += 33; else fb.push("Suggest block domain, force resets, enable MFA, notify IT.");
                  return { score, feedback: fb };
                }}
              >
                <div className="text-sm text-slate-700">
                  Use the button to simulate a report. Then enter ticket and containment text.
                  <div className="mt-3">
                    <button
                      className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                      onClick={() => setAnalysisFindings(["Reported: recorded in training logs (simulation)"])}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Report (Simulate)
                    </button>
                  </div>
                </div>
              </LabModule>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><strong>Legal & Ethical:</strong> These labs are simulated. Do not run campaigns against real users without explicit written consent.</span>
            </div>
            </div>

            {/* Answer Section - Moved to Right Column */}
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
                  The email uses a fake domain (http://bank-security.com) and asks for sensitive data through a link.
                </p>
              </div>

              <div className="flex gap-3 flex-wrap mb-4">
                <button
                  onClick={() => copyToClipboard(phishingExample)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Email Content
                </button>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  {showAnswer ? "Hide" : "Show"} Explanation
                </button>
                <button
                  className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
                  onClick={() => window.alert("This is a simulated action. No links are clickable in this preview.")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Inspect Link
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
                    The email is suspicious because the link directs to "http://bank-security.com," a domain
                    that does not match the bank's official website. Additionally, the request to enter a password
                    via a link is a common phishing tactic to steal credentials.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Recommended:</strong> Always navigate to the official website directly
                    (e.g., by typing the URL) instead of clicking email links.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Quiz Module - Moved to Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <QuizModule
                title="Beginner Quiz: Phishing Basics"
                questions={[
                  {
                    id: "q1",
                    question: "Which header is best to identify the sender's domain?",
                    options: [
                      { id: "a", label: "Subject" },
                      { id: "b", label: "From" },
                      { id: "c", label: "Date" },
                    ],
                    correctOptionId: "b",
                  },
                  {
                    id: "q2",
                    question: "A link is flagged as malicious=3, suspicious=5 in a canned VT summary. You should:",
                    options: [
                      { id: "a", label: "Click it to confirm" },
                      { id: "b", label: "Treat as suspicious and escalate" },
                      { id: "c", label: "Ignore the warning" },
                    ],
                    correctOptionId: "b",
                  },
                ]}
              />
            </motion.div>

            {/* Ethical Reminder - Moved to Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="card p-6 border-2 border-amber-300 bg-amber-50 mt-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Ethical Reminder</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Never attempt to exploit phishing vulnerabilities on real systems without explicit permission.
                    Unauthorized phishing tests are illegal and unethical.
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