import { useEffect, useState } from "react";

export default function ScoreRotationCard({ quizScore, examScore, accentClassName = "text-[#005b6b]" }) {
	const [showExamScore, setShowExamScore] = useState(false);
	const score = showExamScore ? examScore : quizScore;
	const scoreLabel = showExamScore ? "Exam score" : "Quiz score";
	const displayScore = Number.isFinite(score) ? Math.round(score) : null;
	const starsFill = `${Math.max(0, Math.min(100, displayScore ?? 0))}%`;

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setShowExamScore((isShowingExamScore) => !isShowingExamScore);
		}, 10000);
		return () => window.clearInterval(intervalId);
	}, []);

	return (
		<div className="score-rotation-card absolute left-0 top-[2%] z-30 flex h-[94px] w-[128px] flex-col justify-center rounded-xl border border-[#e4eaf5] bg-white px-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:left-[-4px] sm:top-[31%]">
			<strong key={scoreLabel} className={`score-rotation-value text-xl leading-none ${accentClassName}`}>
				{displayScore === null ? "--" : `${displayScore}%`}
			</strong>
			<span key={`${scoreLabel}-label`} className="score-rotation-label mt-2 text-sm leading-none text-[#15203a]">
				{scoreLabel}
			</span>
			<span
				key={`${scoreLabel}-stars`}
				role="img"
				aria-label={displayScore === null ? `No ${scoreLabel.toLowerCase()} available` : `${displayScore}% ${scoreLabel.toLowerCase()}, ${Math.round((displayScore / 100) * 50) / 10} out of 5 stars`}
				className="score-rotation-stars relative mt-2 inline-block text-sm leading-none tracking-[2px]"
			>
				<span aria-hidden="true" className="text-[#d7dee9]">★★★★★</span>
				<span aria-hidden="true" className="ccna-stars-fill" style={{ width: starsFill }}>★★★★★</span>
			</span>
		</div>
	);
}
