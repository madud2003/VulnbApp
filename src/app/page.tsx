"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, BookOpen, BarChart3, ArrowRight, Shield, Key, Globe } from "lucide-react";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!featuresRef.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = featuresRef.current.findIndex((el) => el === entry.target);
          if (entry.isIntersecting) {
            setActiveIndex(index);
          } else if (activeIndex === index) {
            setActiveIndex(null);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      }
    );

    featuresRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      featuresRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [activeIndex]);

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Labs",
      description: "Practice exploiting and patching real-world vulnerabilities in a safe environment.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Real-World Scenarios",
      description: "Learn from scenarios inspired by actual security incidents and industry best practices.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your learning journey and earn badges as you master new skills.",
      color: "from-orange-500 to-red-500",
    },
  ];


  return (
    <div className="relative font-sans min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-900 flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 md:px-12 py-4 relative z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src="/logo1.png"
              alt="VulnApp Logo"
              width={40}
              height={40}
              className="drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-blue-400/20 blur-xl -z-10" />
          </div>
          <span className="text-xl font-bold gradient-text">VulnApp</span>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Home
          </Link>
          <Link href="/labs" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            Labs
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
            Blog
          </Link>
          <Link href="/support" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
            Support
          </Link>
          <Link href="/docs" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
            Docs
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/signin" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Sign In
          </Link>
          <button
            onClick={() => setOpenModal(true)}
            className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Next-Gen Security Learning Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight mb-6"
        >
          <span className="gradient-text">Master Web Security</span>
          <br />
          <span className="text-slate-800">Through Hands-On Practice</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
        >
          Learn ethical hacking, vulnerability assessment, and security best practices
          through interactive labs and real-world scenarios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => setOpenModal(true)}
            className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
          >
            Start Learning Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </main>

      {/* Features Section */}
      <section className="bg-white/60 backdrop-blur-sm py-20 px-6 md:px-12 relative z-10 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Everything You Need</span>
              <br />
              <span className="text-slate-800">To Learn Security</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive tools and resources designed for modern security professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  ref={(el) => {
                    featuresRef.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`card p-8 text-center group transition-all duration-300 ${
                    activeIndex === index ? "card-glow scale-105" : ""
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 mx-auto rounded-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6" onClick={() => setOpenModal(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 text-center w-full max-w-md relative"
          >
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Welcome to VulnBapp</h3>
            <p className="text-slate-600 mb-8">Choose your starting point</p>

            <div className="flex flex-col space-y-3">
              <Link href="/auth/signin" className="w-full">
                <button className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                  <Key className="w-5 h-5" />
                  Sign In
                </button>
              </Link>
              <Link href="/auth/signup" className="w-full">
                <button className="btn-secondary w-full py-3.5 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Create Account
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
