"use client";

import Link from "next/link";
import { BookOpen, Lock, Shield, FileCode, Zap, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const levels = [
  { id: 1, title: "Level 1: Basics", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { id: 2, title: "Level 2: Input Validation", icon: FileCode, color: "from-purple-500 to-pink-500" },
  { id: 3, title: "Level 3: Authentication", icon: Lock, color: "from-indigo-500 to-purple-500" },
  { id: 4, title: "Level 4: Access Control", icon: Shield, color: "from-orange-500 to-red-500" },
  { id: 5, title: "Level 5: Advanced Attacks", icon: Zap, color: "from-pink-500 to-rose-500" },
];

export default function LearningPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 font-sans">
      <div className="card px-6 py-12 max-w-4xl w-full border-2 border-slate-200 relative overflow-visible shadow-xl">
        {/* Back Button */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold gradient-text mb-4 tracking-wide">
            Learning Levels
          </h1>
          <p className="text-slate-600 text-center mb-12 max-w-lg text-base tracking-wide font-medium mx-auto">
            Choose a level to start learning about web vulnerabilities.
          </p>
        </div>

        <div className="relative w-full flex flex-col gap-6">
          {/* Vertical dividing line */}
          <div
            className="absolute top-20 bottom-12 left-1/2 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 rounded"
            style={{ transform: "translateX(-50%)" }}
          />

          {levels.map((level, idx) => {
            const IconComponent = level.icon;
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex w-full ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <Link href={`/learning/level${level.id}`} className="group relative z-10">
                  <div className="flex items-center gap-4">
                    {idx % 2 === 0 && (
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border-4 border-white`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                    )}
                    <div className={`bg-white rounded-xl p-4 shadow-lg border-2 border-slate-200 group-hover:border-indigo-300 transition-all ${idx % 2 === 0 ? "w-64" : "w-64 text-right"} group-hover:shadow-xl`}>
                      <div className="text-indigo-600 font-bold text-sm mb-1">LEVEL {level.id}</div>
                      <div className="text-slate-800 font-bold text-lg">{level.title}</div>
                      <div className="flex items-center gap-2 mt-2 text-indigo-600 text-sm font-medium">
                        Start Learning
                        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${idx % 2 === 0 ? "" : "rotate-180"}`} />
                      </div>
                    </div>
                    {idx % 2 !== 0 && (
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border-4 border-white`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
