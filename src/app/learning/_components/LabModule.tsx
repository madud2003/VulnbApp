"use client";

import React from "react";
import { Target, CheckSquare, Code, CheckCircle2, AlertCircle } from "lucide-react";

type Props = {
	moduleTitle: string;
	objectives: string[];
	tasks: { id: string; prompt: string }[];
	children: React.ReactNode;
	checkAnswer?: (answers: Record<string, string>) => { score: number; feedback: string[] };
};

export default function LabModule({ moduleTitle, objectives, tasks, children, checkAnswer }: Props) {
	const [answers, setAnswers] = React.useState<Record<string, string>>({});
	const [result, setResult] = React.useState<{ score: number; feedback: string[] } | null>(null);

	return (
		<div className="card overflow-hidden mb-6 border-2 border-slate-200">
			{/* Header */}
			<div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
				<h3 className="text-2xl font-bold mb-4">{moduleTitle}</h3>
				<div className="mt-2">
					<div className="flex items-center gap-2 font-semibold mb-3 text-indigo-100">
						<Target className="w-5 h-5" />
						Learning Objectives
					</div>
					<ul className="space-y-2 ml-7">
						{objectives.map((o, i) => (
							<li key={i} className="text-white/90 text-sm flex items-start gap-2">
								<CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
								<span>{o}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Tasks */}
			<div className="p-6 border-b-2 border-slate-200">
				<div className="flex items-center gap-2 font-semibold mb-4 text-slate-800">
					<CheckSquare className="w-5 h-5 text-indigo-600" />
					Tasks
				</div>
				<div className="space-y-4">
					{tasks.map((t) => (
						<div key={t.id} className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 hover:border-indigo-300 transition-all">
							<div className="text-slate-700 mb-3 font-medium">{t.prompt}</div>
							<input
								className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
								value={answers[t.id] || ""}
								onChange={(e) => setAnswers((s) => ({ ...s, [t.id]: e.target.value }))}
								placeholder="Your answer..."
							/>
						</div>
					))}
				</div>
			</div>

			{/* Try it now */}
			<div className="p-6 border-b-2 border-slate-200">
				<div className="flex items-center gap-2 font-semibold mb-4 text-slate-800">
					<Code className="w-5 h-5 text-indigo-600" />
					Try it now
				</div>
				<div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">{children}</div>
				{checkAnswer && (
					<div className="mt-4">
						<button
							className="btn-primary px-6 py-3 flex items-center gap-2"
							onClick={() => setResult(checkAnswer(answers))}
						>
							<CheckCircle2 className="w-5 h-5" />
							Check Answers
						</button>
					</div>
				)}
			</div>

			{/* Results */}
			{result && (
				<div className={`p-6 ${
					result.score >= 80
						? "bg-emerald-50 border-t-2 border-emerald-300"
						: result.score >= 60
						? "bg-amber-50 border-t-2 border-amber-300"
						: "bg-red-50 border-t-2 border-red-300"
				}`}>
					<div className={`text-xl font-bold mb-3 flex items-center gap-2 ${
						result.score >= 80 ? "text-emerald-700" :
						result.score >= 60 ? "text-amber-700" :
						"text-red-700"
					}`}>
						{result.score >= 80 ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
						Score: {result.score}%
					</div>
					<ul className="space-y-2">
						{result.feedback.map((f, i) => (
							<li key={i} className="text-slate-700 text-sm flex items-start gap-2">
								<span className={`mt-1 ${
									result.score >= 80 ? "text-emerald-600" :
									result.score >= 60 ? "text-amber-600" :
									"text-red-600"
								}`}>•</span>
								<span>{f}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Footer tip */}
			<div className="p-6 bg-blue-50">
				<p className="text-blue-800 text-xs leading-relaxed flex items-start gap-2">
					<AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
					<span>💡 Real-world response: Enable MFA, change passwords, notify IT, and block the sender or domain.</span>
				</p>
			</div>
		</div>
	);
}
