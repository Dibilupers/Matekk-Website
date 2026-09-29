import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import TrainingLogo from "../../../../assets/MATEKK_training_logo.png";
import {
	readCcnaExamSession,
	saveCcnaExamSession,
} from "../../../../utils/ccnaExamSession";

const questions = [
	{
		prompt: "Which feature allows a single physical switch link to carry traffic for multiple VLANs?",
		options: ["Port security", "Trunking (802.1Q)", "Spanning tree", "EtherChannel only"],
		answer: 1,
		explanation: "An 802.1Q trunk tags frames with a VLAN ID so several VLANs can share one link.",
	},
	{
		prompt: "Which VLAN is used to carry untagged traffic across an 802.1Q trunk?",
		options: ["Native VLAN", "Management VLAN", "Voice VLAN", "Parking VLAN"],
		answer: 0,
		explanation: "The native VLAN carries untagged frames on an 802.1Q trunk. Both ends should use the same native VLAN.",
	},
	{
		prompt: "What is the main purpose of Spanning Tree Protocol (STP)?",
		options: ["Assign IP addresses to hosts", "Encrypt switch traffic", "Prevent Layer 2 switching loops", "Bundle links together"],
		answer: 2,
		explanation: "STP prevents Layer 2 loops by placing redundant paths into a blocking state.",
	},
	{
		prompt: "Which protocol can dynamically negotiate an EtherChannel between Cisco switches?",
		options: ["DTP", "LACP", "VTP", "LLDP"],
		answer: 1,
		explanation: "LACP (Link Aggregation Control Protocol) dynamically negotiates link aggregation.",
	},
	{
		prompt: "A switch port connected to an end-user PC should normally be configured as which type?",
		options: ["Trunk port", "Routed port", "Access port", "EtherChannel port"],
		answer: 2,
		explanation: "An access port belongs to a single VLAN and is typically used for end devices such as PCs.",
	},
];

const QUIZ_TIME_LIMIT_SECONDS = 60;

function shuffleQuestionOptions(questionList) {
	return questionList.map((question) => {
		const options = question.options.map((text, index) => ({
			text,
			isCorrect: index === question.answer,
		}));

		for (let index = options.length - 1; index > 0; index -= 1) {
			const randomIndex = Math.floor(Math.random() * (index + 1));
			[options[index], options[randomIndex]] = [options[randomIndex], options[index]];
		}

		return {
			...question,
			options: options.map((option) => option.text),
			answer: options.findIndex((option) => option.isCorrect),
		};
	});
}

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
	const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
	return `${minutes}:${remainingSeconds}`;
}

function ThemeToggle({ isDark, onToggle }) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			aria-pressed={isDark}
			className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
				isDark
					? "border-[#303a60] bg-[#151c36] text-[#e2e7f5] hover:bg-[#1d2749]"
					: "border-[#d4dced] bg-white text-[#263654] hover:bg-[#f1f5fc]"
			}`}
		>
			{isDark ? <Sun size={16} /> : <Moon size={16} />}
			{isDark ? "Light mode" : "Dark mode"}
		</button>
	);
}

function LessonHeader({ timeLeftSeconds, isDark, onThemeToggle, theme }) {
	return (
		<header className={`mb-7 flex flex-wrap items-center justify-between gap-4 border-b pb-5 ${
			isDark ? "border-[#273153]" : "border-[#dfe6f1]"
		}`}>
			<div className="flex min-w-0 items-center gap-4">
				<Link
					to="/modules/programs/ccna"
					aria-label="Back to CCNA course"
					className="shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
				>
					<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
				</Link>
				<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
					<p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${theme.muted}`}>
						CCNA learning portal
					</p>
					<p className={`mt-1 truncate text-sm font-bold ${theme.heading}`}>
						Module 2: Network Access
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<Link
					to="/modules/programs/ccna"
					className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#315eea] hover:text-[#315eea] ${
						isDark
							? "border-[#303a60] text-[#d7def2]"
							: "border-[#d4dced] text-[#42516b]"
					}`}
				>
					<ArrowLeft size={16} />
					<span className="hidden sm:inline">Back to course</span>
				</Link>
				<div
					aria-label={`Time left ${formatTime(timeLeftSeconds)}`}
					className={`rounded-full border px-4 py-2 text-sm font-semibold tabular-nums transition-colors hover:border-[#315eea] hover:bg-[#315eea] hover:text-white ${theme.timer}`}
				>
					{formatTime(timeLeftSeconds)}
				</div>
				<ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
			</div>
		</header>
	);
}

export default function CCNALesson() {
	const navigate = useNavigate();
	const location = useLocation();
	const pendingExitRef = useRef(null);
	const skipDuplicatePopRef = useRef(false);
	const allowUnloadRef = useRef(false);
	const [pendingExit, setPendingExit] = useState(null);
	const [initialSession] = useState(() => {
		const savedSession = readCcnaExamSession();
		return savedSession ?? {
			quizQuestions: shuffleQuestionOptions(questions),
			answers: {},
			lockedQuestions: {},
			currentIndex: 0,
			deadline: Date.now() + QUIZ_TIME_LIMIT_SECONDS * 1000,
			status: "active",
			toastDismissed: false,
		};
	});
	const [currentIndex, setCurrentIndex] = useState(initialSession.currentIndex);
	const [answers, setAnswers] = useState(initialSession.answers);
	const [lockedQuestions, setLockedQuestions] = useState(initialSession.lockedQuestions ?? {});
	const [quizQuestions, setQuizQuestions] = useState(initialSession.quizQuestions);
	const [deadline, setDeadline] = useState(initialSession.deadline);
	const [timeLeftSeconds, setTimeLeftSeconds] = useState(() =>
		Math.max(0, Math.ceil((initialSession.deadline - Date.now()) / 1000)),
	);
	const [isComplete, setIsComplete] = useState(initialSession.status === "completed");
	const [toastDismissed, setToastDismissed] = useState(initialSession.toastDismissed ?? false);
	const [isDark, setIsDark] = useState(false);

	const theme = isDark
		? {
				page: "bg-[#0b1024] text-[#f4f6ff]",
				surface: "border-[#273153] bg-[#161d38]",
				heading: "text-[#f4f6ff]",
				muted: "text-[#9ba8c8]",
				timer: "border-[#273153] bg-[#151c36] text-[#e2e7f5]",
				option: "border-[#293455] bg-transparent text-[#e0e5f3] hover:border-[#43547f] hover:bg-[#1b2342]",
				neutralBadge: "bg-[#1d2749] text-[#4772ff]",
				navUnanswered: "border-[#293455] bg-transparent text-[#9ba8c8]",
				ringOffset: "ring-offset-[#161d38]",
				completionBadge: "bg-[#1b2850] text-[#4772ff]",
				completionMuted: "text-[#93a1c7]",
				completionText: "text-[#a6b1ce]",
				completionOutline: "border-[#303a60] text-[#d7def2] hover:bg-[#171e39]",
			}
		: {
				page: "bg-[#f4f7fc] text-[#17233d]",
				surface: "border-[#dfe6f1] bg-white",
				heading: "text-[#17233d]",
				muted: "text-[#70809a]",
				timer: "border-[#dfe6f1] bg-white text-[#34435e]",
				option: "border-[#d9e1ef] bg-white text-[#263654] hover:border-[#9aafe6] hover:bg-[#f5f8ff]",
				neutralBadge: "bg-[#edf2ff] text-[#315eea]",
				navUnanswered: "border-[#d9e1ef] bg-white text-[#71809a]",
				ringOffset: "ring-offset-white",
				completionBadge: "bg-[#e8efff] text-[#315eea]",
				completionMuted: "text-[#70809a]",
				completionText: "text-[#596983]",
				completionOutline: "border-[#cfd8e8] text-[#42516b] hover:bg-[#edf2fa]",
			};

	useEffect(() => {
		if (isComplete || timeLeftSeconds === 0) return undefined;

		const timer = window.setTimeout(() => {
			const secondsRemaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			setTimeLeftSeconds(secondsRemaining);
		}, 1000);

		return () => window.clearTimeout(timer);
	}, [deadline, isComplete, timeLeftSeconds]);

	useEffect(() => {
		const status = isComplete
			? "completed"
			: timeLeftSeconds === 0
				? "expired"
				: "active";
		saveCcnaExamSession({
			quizQuestions,
			answers,
			lockedQuestions,
			currentIndex,
			deadline,
			status,
			toastDismissed,
		});
	}, [answers, currentIndex, deadline, isComplete, lockedQuestions, quizQuestions, timeLeftSeconds, toastDismissed]);

	const question = quizQuestions[currentIndex];
	const selectedAnswer = answers[currentIndex];
	const isAnswered = selectedAnswer !== undefined;
	const showResults = isComplete || timeLeftSeconds === 0;
	const answeredCount = Object.keys(answers).length;
	const score = quizQuestions.reduce(
		(total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
		0,
	);

	function chooseAnswer(optionIndex) {
		if (lockedQuestions[currentIndex]) return;
		setAnswers((previousAnswers) => ({
			...previousAnswers,
			[currentIndex]: optionIndex,
		}));
	}

	function goToQuestion(index) {
		if (
			index < currentIndex ||
			index > currentIndex + 1 ||
			(index > currentIndex && (!isAnswered || lockedQuestions[currentIndex]))
		) {
			return;
		}
		if (index > currentIndex) {
			setLockedQuestions((previousLocked) => ({
				...previousLocked,
				[currentIndex]: true,
			}));
		}
		setCurrentIndex(index);
	}

	useEffect(() => {
		if (showResults) return undefined;

		const currentPath = `${location.pathname}${location.search}${location.hash}`;
		const guardHistoryState = {
			...(window.history.state ?? {}),
			ccnaExamGuard: true,
		};
		window.history.pushState(guardHistoryState, "", currentPath);

		function requestExit(target) {
			if (pendingExitRef.current) return;
			pendingExitRef.current = target;
			setPendingExit(target);
		}

		function handleDocumentClick(event) {
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey ||
				!(event.target instanceof Element)
			) {
				return;
			}

			const anchor = event.target.closest("a[href]");
			if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

			const target = new URL(anchor.href, window.location.href);
			if (target.href === window.location.href) return;

			event.preventDefault();
			requestExit(target.href);
		}

		function handlePopState(event) {
			event.stopImmediatePropagation();
			const target = `${window.location.pathname}${window.location.search}${window.location.hash}`;
			if (skipDuplicatePopRef.current) {
				skipDuplicatePopRef.current = false;
			} else if (target === currentPath) {
				skipDuplicatePopRef.current = true;
				window.history.back();
				return;
			}
			window.history.pushState(
				guardHistoryState,
				"",
				currentPath,
			);
			if (target !== currentPath) {
				requestExit(new URL(target, window.location.origin).href);
			}
		}

		function handleBeforeUnload(event) {
			if (allowUnloadRef.current) return;
			event.preventDefault();
			event.returnValue = "";
		}

		document.addEventListener("click", handleDocumentClick, true);
		window.addEventListener("popstate", handlePopState, true);
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			document.removeEventListener("click", handleDocumentClick, true);
			window.removeEventListener("popstate", handlePopState, true);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [location.hash, location.pathname, location.search, showResults]);

	function confirmExit() {
		if (!pendingExit) return;
		pendingExitRef.current = null;
		setPendingExit(null);

		const target = new URL(pendingExit, window.location.href);
		if (target.origin === window.location.origin) {
			navigate(`${target.pathname}${target.search}${target.hash}`);
			return;
		}
		allowUnloadRef.current = true;
		window.location.assign(target.href);
	}

	function cancelExit() {
		pendingExitRef.current = null;
		setPendingExit(null);
	}

	if (showResults) {
		return (
			<main className={`fade-in-up min-h-screen px-5 py-10 transition-colors duration-300 sm:px-8 ${theme.page}`}>
				<div className="mx-auto max-w-[1125px]">
					<LessonHeader
						timeLeftSeconds={timeLeftSeconds}
						isDark={isDark}
						onThemeToggle={() => setIsDark((current) => !current)}
						theme={theme}
					/>
				</div>
				<div className="mx-auto flex min-h-[72vh] max-w-3xl flex-col items-center justify-center text-center">
					<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
						<span className={`flex h-full w-full items-center justify-center rounded-full ${theme.completionBadge}`}>
							{score}/{quizQuestions.length}
						</span>
					</div>
					<p className={`text-sm font-semibold uppercase tracking-[0.16em] ${theme.completionMuted}`}>Quiz complete</p>
					<h1 className={`mt-3 text-3xl font-bold sm:text-4xl ${theme.heading}`}>Nice work on Network Access.</h1>
					<p className={`mt-4 max-w-xl text-base leading-7 ${theme.completionText}`}>
						{timeLeftSeconds === 0
							? `Time limit reached. You answered ${score} out of ${quizQuestions.length} questions correctly.`
							: `You answered ${score} out of ${quizQuestions.length} questions correctly with ${formatTime(timeLeftSeconds)} left.`}
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<button
							type="button"
							onClick={() => {
								setAnswers({});
								setLockedQuestions({});
								setQuizQuestions(shuffleQuestionOptions(questions));
								setCurrentIndex(0);
								const nextDeadline = Date.now() + QUIZ_TIME_LIMIT_SECONDS * 1000;
								setDeadline(nextDeadline);
								setTimeLeftSeconds(QUIZ_TIME_LIMIT_SECONDS);
								setToastDismissed(false);
								setIsComplete(false);
							}}
							className="rounded-full bg-[#2f58e8] px-6 py-3 font-semibold text-white transition hover:bg-[#4168f2]"
						>
							Try again
						</button>
						<Link
							to="/modules/programs/ccna"
							className={`rounded-full border px-6 py-3 font-semibold transition ${theme.completionOutline}`}
						>
							Back to course
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className={`fade-in-up min-h-screen px-4 py-6 transition-colors duration-300 sm:px-8 sm:py-8 ${theme.page}`}>
			<div className="mx-auto max-w-[1125px]">
				<LessonHeader
					timeLeftSeconds={timeLeftSeconds}
					isDark={isDark}
					onThemeToggle={() => setIsDark((current) => !current)}
					theme={theme}
				/>

				<div
					role="progressbar"
					aria-label="Quiz progress"
					aria-valuemin={0}
					aria-valuemax={quizQuestions.length}
					aria-valuenow={answeredCount}
					aria-valuetext={`${answeredCount} of ${quizQuestions.length} questions answered`}
					className={`mb-6 h-2 overflow-hidden rounded-full ${isDark ? "bg-[#222b4b]" : "bg-[#dfe6f1]"}`}
				>
					<div
						className="h-full rounded-full bg-[#315eea] transition-[width] duration-300"
						style={{ width: `${(answeredCount / quizQuestions.length) * 100}%` }}
					/>
				</div>

				<div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
					<section className={`rounded-[20px] border p-5 transition-colors duration-300 sm:p-7 ${theme.surface}`}>
						<p className={`mb-2 text-sm ${theme.muted}`}>Question {currentIndex + 1} of {quizQuestions.length}</p>
						<h1 className={`mb-6 text-[1.45rem] font-bold leading-snug tracking-tight sm:text-[1.7rem] ${theme.heading}`}>
							{question.prompt}
						</h1>

						<div className="space-y-2.5">
							{question.options.map((option, optionIndex) => {
								const isSelected = selectedAnswer === optionIndex;
								let optionStyle = theme.option;
								if (isSelected) {
									optionStyle = isDark
										? "border-[#4772ff] bg-[#1d2749] text-[#e0e5f3]"
										: "border-[#315eea] bg-[#edf2ff] text-[#263654]";
								}

								return (
									<button
										key={option}
										type="button"
										onClick={() => chooseAnswer(optionIndex)}
										disabled={Boolean(lockedQuestions[currentIndex])}
										aria-pressed={isSelected}
										className={`flex min-h-[60px] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition disabled:cursor-default ${optionStyle}`}
									>
										<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
											isSelected ? "bg-[#315eea] text-white" : theme.neutralBadge
										}`}>
											{String.fromCharCode(65 + optionIndex)}
										</span>
										<span className="text-[15px] sm:text-base">{option}</span>
									</button>
								);
							})}
						</div>

						<div className="mt-5 flex justify-end">
							<button
								type="button"
								onClick={() => {
									if (currentIndex === quizQuestions.length - 1) {
										setIsComplete(true);
									} else {
										goToQuestion(currentIndex + 1);
									}
								}}
								disabled={!isAnswered || Boolean(lockedQuestions[currentIndex])}
								className="rounded-full bg-[#2f58e8] px-6 py-3 font-semibold text-white transition hover:bg-[#4168f2] disabled:cursor-not-allowed disabled:opacity-40"
							>
								{currentIndex === quizQuestions.length - 1 ? "Finish quiz" : "Next question"}
							</button>
						</div>
					</section>

					<aside aria-label="Question navigation" className={`rounded-[20px] border p-5 transition-colors duration-300 sm:p-6 ${theme.surface}`}>
						<h2 className={`mb-4 text-base font-bold ${theme.heading}`}>Questions</h2>
						<div className="grid grid-cols-5 gap-2">
							{quizQuestions.map((_, index) => {
								const hasAnswer = answers[index] !== undefined;
								const isActive = index === currentIndex;
								const canNavigate =
									index === currentIndex ||
									(index === currentIndex + 1 && isAnswered && !lockedQuestions[currentIndex]);
								const stateStyle = hasAnswer
									? isDark
										? "border-[#315eea] bg-[#1d2749] text-[#b8c8ff]"
										: "border-[#315eea] bg-[#edf2ff] text-[#315eea]"
									: theme.navUnanswered;

								return (
									<button
										key={index}
										type="button"
										onClick={() => goToQuestion(index)}
										disabled={!canNavigate}
										aria-label={`Question ${index + 1}${hasAnswer ? ", answered" : ", unanswered"}`}
										aria-current={isActive ? "step" : undefined}
										className={`h-10 w-full rounded-xl border text-sm font-semibold transition hover:border-[#315eea] hover:bg-[#315eea] hover:text-white disabled:cursor-not-allowed disabled:hover:border-inherit disabled:hover:bg-inherit disabled:hover:text-inherit ${stateStyle} ${
											isActive ? `ring-2 ring-[#315eea] ring-offset-2 ${theme.ringOffset}` : ""
										}`}
									>
										{index + 1}
									</button>
								);
							})}
						</div>
						<p className={`mt-5 text-sm leading-6 ${theme.muted}`}>
							{Object.keys(answers).length} of {quizQuestions.length} answered
						</p>
					</aside>
				</div>
			</div>
			{pendingExit && (
				<div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#071126]/55 px-4 py-6 backdrop-blur-[2px]">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-exit-title"
						aria-describedby="ccna-exit-description"
						className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
							isDark ? "border-[#303a60] bg-[#161d38] text-[#f4f6ff]" : "border-[#dfe6f1] bg-white text-[#17233d]"
						}`}
					>
						<h2 id="ccna-exit-title" className="text-xl font-bold">Are you sure you want to exit?</h2>
						<p id="ccna-exit-description" className={`mt-3 text-sm leading-6 ${theme.muted}`}>
							Your answers and remaining time will be saved. The exam timer will keep running while you are away.
						</p>
						<div className="mt-6 flex justify-end gap-3">
							<button
								type="button"
								onClick={cancelExit}
								className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
									isDark ? "border-[#303a60] text-[#d7def2] hover:bg-[#1b2342]" : "border-[#cfd8e8] text-[#42516b] hover:bg-[#edf2fa]"
								}`}
							>
								Stay in exam
							</button>
							<button
								type="button"
								onClick={confirmExit}
								className="rounded-full bg-[#2f58e8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2448c8]"
							>
								Exit exam
							</button>
						</div>
					</section>
				</div>
			)}
		</main>
	);
}
