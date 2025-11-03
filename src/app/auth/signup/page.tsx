"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Creating account...");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Signup successful!");
      router.push("/dashboard");
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  const passwordMismatch = form.password && form.confirmPassword && form.password !== form.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card p-8 md:p-10 shadow-xl">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 shadow-lg">
              <img
                src="/logo1.png"
                alt="VulnBapp"
                className="w-16 h-16"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserPlus className="w-6 h-6 text-indigo-600" />
              <h1 className="text-3xl font-bold gradient-text">
                Create Account
              </h1>
            </div>
            <p className="text-slate-600">
              Start your security learning journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Full Name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-3 pr-12 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className={`w-full px-4 py-3 pr-12 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    passwordMismatch
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordMismatch && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Passwords do not match
                </p>
              )}
            </div>

            {message && (
              <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${
                message.includes("✅")
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : message.includes("Creating")
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}>
                {message.includes("✅") ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : message.includes("Creating") ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="font-medium">{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!!passwordMismatch}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors inline-flex items-center gap-1"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
