"use client";

import React from "react";
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from "lucide-react";

type Question = {
	id: string;
	question: string;
	options: { id: string; label: string }[];
	correctOptionId: string;
};

type Props = {
	title: string;
	questions: Question[];
};

export default function QuizModule({ title, questions }: Props) {
	const [answers, setAnswers] = React.useState<Record<string, string>>({});
	const [score, setScore] = React.useState<number | null>(null);

	function grade() {
		let correct = 0;
		for (const q of questions) {
			if (answers[q.id] === q.correctOptionId) correct++;
		}
		setScore(Math.round((correct / questions.length) * 100));
	}

	return (
		<div className="card overflow-hidden border-2 border-slate-200">
			{/* Header */}
			<div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
				<div className="flex items-center gap-3 mb-2">
					<Sparkles className="w-6 h-6" />
					<h3 className="text-2xl font-bold">{title}</h3>
				</div>
				<p className="text-indigo-100 text-sm">Test your knowledge with these questions</p>
			</div>

			{/* Questions */}
			<div className="p-6 space-y-6">
				{questions.map((q, qIndex) => (
					<div key={q.id} className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 hover:border-indigo-300 transition-all">
						<div className="flex items-start gap-3 mb-4">
							<div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
								{qIndex + 1}
							</div>
							<div className="text-slate-800 font-semibold text-lg flex-1">{q.question}</div>
						</div>
						<div className="space-y-3 ml-11">
							{q.options.map((opt) => (
								<label
									key={opt.id}
									className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
										answers[q.id] === opt.id
											? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700"
											: "bg-white border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700"
									}`}
								>
									<input
										type="radio"
										name={q.id}
										checked={(answers[q.id] || "") === opt.id}
										onChange={() => setAnswers((s) => ({ ...s, [q.id]: opt.id }))}
										className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
									/>
									<span className={`text-sm flex-1 font-medium ${
										answers[q.id] === opt.id ? "text-indigo-700" : "text-slate-700"
									}`}>
										{opt.label}
									</span>
								</label>
							))}
						</div>
					</div>
				))}

				{/* Submit Button */}
				<div className="flex items-center gap-4 pt-4">
					<button
						onClick={grade}
						className="btn-primary px-6 py-3 flex items-center gap-2"
					>
						<CheckCircle2 className="w-5 h-5" />
						Submit Answers
					</button>
					{score !== null && (
						<div className={`px-6 py-3 rounded-xl font-bold text-lg flex items-center gap-2 ${
							score >= 80
								? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
								: score >= 60
								? "bg-amber-100 text-amber-700 border-2 border-amber-300"
								: "bg-red-100 text-red-700 border-2 border-red-300"
						}`}>
							{score >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
							Score: {score}%
						</div>
					)}
				</div>

				{/* Tips */}
				<div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
					<p className="text-blue-800 text-sm font-semibold mb-2 flex items-center gap-2">
						<AlertCircle className="w-5 h-5" />
						💡 Pro Tip
					</p>
					<p className="text-blue-700 text-sm">
						Enable MFA, verify domains, and avoid clicking unsolicited links in real-world scenarios.
					</p>
				</div>
			</div>
		</div>
	);
}
