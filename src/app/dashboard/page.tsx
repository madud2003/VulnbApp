"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Trophy, TrendingUp, LogOut, CheckCircle2, Award, Flame, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [progress, setProgress] = useState(0);
  const [completedLabs, setCompletedLabs] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/auth/me", { credentials: "include" });
        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.user) {
            setUserName(userData.user.name || userData.user.email || "User");
          }
        }

        const progressRes = await fetch("/api/progress", { credentials: "include" });
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          const completedProblems = progressData.completedProblems || [];
          
          // Calculate completed labs
          const labCount = completedProblems.length;
          setCompletedLabs(labCount);
          
          // Calculate progress percentage
          const progressPercentage = (labCount / 10) * 100;
          setProgress(Math.round(progressPercentage));
          
          // Calculate current streak
          let streak = 0;
          if (completedProblems.length > 0) {
            // Sort by date descending
            const sortedCompletions = [...completedProblems].sort(
              (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            );
            
            // Get unique completion dates (only the date part, not time)
            const uniqueDates = new Set<string>();
            sortedCompletions.forEach((p: any) => {
              const date = new Date(p.completedAt);
              const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
              uniqueDates.add(dateStr);
            });
            
            const datesArray = Array.from(uniqueDates).sort().reverse(); // Most recent first
            
            // Calculate streak: consecutive days from today backwards
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Check if today or yesterday has a completion
            let checkDate = new Date(today);
            
            // If today has completion, start from today, otherwise start from yesterday
            const todayStr = today.toISOString().split('T')[0];
            if (!datesArray.includes(todayStr)) {
              checkDate.setDate(checkDate.getDate() - 1);
            }
            
            // Count consecutive days
            while (true) {
              const dateStr = checkDate.toISOString().split('T')[0];
              if (datesArray.includes(dateStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
              } else {
                break;
              }
            }
          }
          
          setCurrentStreak(streak);
          
          // Calculate achievements based on milestones
          let achievementCount = 0;
          if (labCount >= 1) achievementCount++; // First lab completed
          if (labCount >= 5) achievementCount++; // 5 labs completed
          if (labCount >= 10) achievementCount++; // 10 labs completed
          if (labCount >= 25) achievementCount++; // 25 labs completed
          if (labCount >= 50) achievementCount++; // 50 labs completed
          if (streak >= 3) achievementCount++; // 3 day streak
          if (streak >= 7) achievementCount++; // 7 day streak
          if (streak >= 30) achievementCount++; // 30 day streak
          
          setAchievements(achievementCount);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const quickStats = [
    { label: "Completed Labs", value: completedLabs.toString(), icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
    { label: "Current Streak", value: currentStreak.toString(), icon: Flame, color: "from-orange-500 to-red-500" },
    { label: "Achievements", value: achievements.toString(), icon: Award, color: "from-purple-500 to-pink-500" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-indigo-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                Continue your security learning journey
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/logout">
                <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm mb-1 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Card */}
        <div className="card p-8 md:p-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Learning Progress
                </h2>
              </div>
              <p className="text-slate-600">
                You're making great progress on your security journey
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold gradient-text mb-1">
                {progress}%
              </div>
              <div className="text-slate-500 text-sm">Complete</div>
            </div>
          </div>

          <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Keep going! You're doing amazing
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Start Learning Card */}
          <div className="card p-8 md:p-10 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Continue Learning
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Access interactive labs, solve challenges, and master web security concepts at your own pace.
              </p>
              <Link href="/learning">
                <button className="btn-primary px-8 py-4 text-lg group flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Go to Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="card p-8 md:p-10 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Your Achievements
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                View your badges, certificates, and milestones. Track your journey from beginner to expert.
              </p>
              <button className="btn-secondary px-8 py-4 text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                View Achievements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
