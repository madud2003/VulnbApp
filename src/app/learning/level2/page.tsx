"use client";

import Link from "next/link";
import ProblemCompletion from "../_components/ProblemCompletion";
import { FileCode, Bug, ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Level2Page() {
  const problems = [
    {
      id: 1,
      title: "SQL Injection",
      description: "Learn about SQL injection attacks and how to prevent them",
      href: "/learning/level2/problem1",
      gradient: "from-purple-500 to-pink-500",
      icon: FileCode,
    },
    {
      id: 2,
      title: "Cross Site Scripting (XSS)",
      description: "Understand XSS vulnerabilities and defensive techniques",
      href: "/learning/level2/problem2",
      gradient: "from-pink-500 to-rose-500",
      icon: Bug,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg">
            <FileCode className="w-8 h-8 text-white" />
          </div>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              LEVEL 2
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Input Validation
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Master input validation vulnerabilities through interactive challenges and real-world scenarios
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="space-y-6">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={problem.href}>
                  <div className="card p-6 md:p-8 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6 flex-1">
                        {/* Problem Number */}
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${problem.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-10 h-10" />
                        </div>

                        {/* Problem Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                              Problem {problem.id}: {problem.title}
                            </h3>
                            <ProblemCompletion level={2} problem={problem.id} />
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {problem.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-50 transition-all">
                          <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/learning">
            <button className="btn-secondary px-6 py-3 inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Learning Path
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
