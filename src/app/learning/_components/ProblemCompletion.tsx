"use client";

import { useState, useEffect } from "react";

interface ProblemCompletionProps {
  level: number;
  problem: number;
}

export default function ProblemCompletion({ level, problem }: ProblemCompletionProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if problem is already completed
    async function checkCompletion() {
      try {
        const res = await fetch("/api/progress", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          const completed = data.completedProblems?.some(
            (p: { level: number; problem: number }) => p.level === level && p.problem === problem
          );
          setIsCompleted(completed || false);
        }
      } catch (error) {
        console.error("Failed to check completion:", error);
      }
    }
    checkCompletion();
  }, [level, problem]);

  const handleToggle = async () => {
    if (isCompleted) return; // Don't allow unchecking

    setIsLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ level, problem }),
      });

      if (res.ok) {
        setIsCompleted(true);
      } else {
        console.error("Failed to mark problem as completed");
      }
    } catch (error) {
      console.error("Error marking problem as completed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
        disabled={isLoading || isCompleted}
        className="w-5 h-5 text-indigo-600 border-indigo-400 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer disabled:opacity-50 bg-[#1a1d33] checked:bg-indigo-600 checked:border-indigo-500 transition"
      />
      <span className={`text-xs font-semibold whitespace-nowrap transition ${
        isCompleted 
          ? "text-green-300" 
          : isLoading 
          ? "text-gray-400" 
          : "text-gray-500 group-hover:text-indigo-300"
      }`}>
        {isCompleted ? "✓ Complete" : isLoading ? "..." : ""}
      </span>
    </label>
  );
}

