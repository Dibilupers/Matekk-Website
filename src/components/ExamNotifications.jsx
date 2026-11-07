import { useEffect, useState } from "react";
import { Bell, CircleAlert, Clock3, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { getExamRoute } from "../utils/examRoutes";

const PROGRAMS = {
	ccna: { name: "CCNA" },
	"ccna-automation": { name: "CCNA Automation" },
	"ccna-cybersecurity": { name: "CCNA Cybersecurity" },
	"comptia-network-plus": { name: "CompTIA Network+" },
	"comptia-security-plus": { name: "CompTIA Security+" },
	"fortinet-fortios": { name: "Fortinet FortiOS" },
	"fortios-offline": { name: "FortiOS" },
};

const EXAM_NAMES = {
	short: "Short Exam",
	medium: "Medium Exam",
	long: "Long Exam",
	all_questions: "All Questions Exam",
};

function getExamDetails(key) {
	const patterns = [
		{ regex: /^matekk-ccna-(short|medium|long)-exam-session$/, programKey: "ccna" },
		{ regex: /^matekk-ccna-all-questions-session$/, programKey: "ccna", examKey: "all_questions" },
		{ regex: /^(ccna-automation|ccna-cybersecurity)-(short|medium|long)-exam$/, programKeyFromMatch: 1, examKeyFromMatch: 2 },
		{ regex: /^matekk-fortinet-fortios-(short|medium|long|all_questions)-exam-session$/, programKey: "fortinet-fortios" },
		{ regex: /^matekk-(comptia-network-plus|comptia-security-plus)-(short|medium|long|all_questions)-exam-session(?:-v2)?$/, programKeyFromMatch: 1, examKeyFromMatch: 2 },
	];

	for (const { regex, programKey, programKeyFromMatch, examKey, examKeyFromMatch } of patterns) {
		const match = regex.exec(key);
		if (!match) continue;
		const resolvedProgramKey = programKey ?? match[programKeyFromMatch];
		const resolvedExamKey = examKey ?? match[examKeyFromMatch];
		return { programKey: resolvedProgramKey, examKey: resolvedExamKey };
	}
	return null;
}

function parseExamSession(value, key, storageType, userId) {
	let session;
	try {
		session = JSON.parse(value);
	} catch (error) {
		console.error(`Unable to read saved exam notification from ${storageType} storage.`, error);
		return null;
	}

	const isLegacyQuestionProgress = (
		key.startsWith("matekk-ccna-all-questions:") ||
		key.startsWith("matekk-fortios-offline-exam:")
	) &&
		Array.isArray(session?.questionIds);
	if (
		!session ||
		(!Array.isArray(session.questions) && !isLegacyQuestionProgress) ||
		typeof session.isSubmitted !== "boolean" ||
		!session.answers ||
		typeof session.answers !== "object"
	) return null;

	const owner = session.userId;
	if (
		owner !== null &&
		owner !== undefined &&
		userId !== null &&
		userId !== undefined &&
		String(owner) !== String(userId)
	) return null;

	let details;
	let routeProgramKey;
	let routeExamKey;
	if (isLegacyQuestionProgress) {
		details = key.startsWith("matekk-ccna-all-questions:")
			? { programKey: "ccna", examKey: "all_questions" }
			: { programKey: "fortios-offline", examKey: "all_questions" };
	} else if (storageType === "offline" && key.startsWith("matekk-offline-exam:")) {
		const match = /^matekk-offline-exam:(?:[^:]+):([^:]+):([^:]+)$/.exec(key);
		if (!match) return null;
		[, routeProgramKey, routeExamKey] = match;
		details = { programKey: routeProgramKey, examKey: routeExamKey };
	} else if (storageType === "offline" && key.startsWith("matekk-ccna-offline-exam:")) {
		const match = /^matekk-ccna-offline-exam:(short|medium|long)$/.exec(key);
		if (!match) return null;
		details = { programKey: "ccna", examKey: match[1] };
	} else if (storageType === "offline" && key.startsWith("matekk-fortios-offline:")) {
		const match = /^matekk-fortios-offline:(?:[^:]+):(short|medium|long|all_questions)$/.exec(key);
		if (!match) return null;
		details = { programKey: "fortinet-fortios", examKey: match[1] };
	} else {
		const scopedKey = storageType === "session" ? key.slice(0, key.lastIndexOf(":")) : key;
		details = getExamDetails(scopedKey);
	}
	if (!details || !PROGRAMS[details.programKey] || !EXAM_NAMES[details.examKey]) return null;
	const route = getExamRoute(details.programKey, details.examKey);
	if (!route) return null;

	const deadline = Number.isFinite(session.deadline) ? session.deadline : null;
	const isExpired = (deadline !== null && !session.isSubmitted && deadline <= Date.now()) ||
		(Number.isFinite(session.submittedAt) && deadline !== null && session.submittedAt >= deadline);
	const status = isExpired ? "expired" : session.isSubmitted ? "completed" : "in-progress";
	return {
		id: `${details.programKey}:${details.examKey}`,
		title: `${PROGRAMS[details.programKey].name} · ${EXAM_NAMES[details.examKey]}`,
		programName: PROGRAMS[details.programKey].name,
		examName: EXAM_NAMES[details.examKey],
		status,
		deadline,
		route,
		submittedAt: Number.isFinite(session.submittedAt) ? session.submittedAt : 0,
	};
}

function collectExamNotifications(userId) {
	const entries = new Map();
	const normalizedUserId = encodeURIComponent(String(userId));

	for (let index = 0; index < window.sessionStorage.length; index += 1) {
		const key = window.sessionStorage.key(index);
		if (!key || !key.endsWith(`:${normalizedUserId}`)) continue;
		const item = parseExamSession(window.sessionStorage.getItem(key), key, "session", userId);
		if (item) entries.set(item.id, item);
	}

	for (let index = 0; index < window.localStorage.length; index += 1) {
		const key = window.localStorage.key(index);
		if (!key) continue;
		if (key === `matekk-ccna-all-questions:${normalizedUserId}`) {
			const item = parseExamSession(window.localStorage.getItem(key), key, "offline", userId);
			if (item) entries.set(item.id, item);
			continue;
		}
		if (
			key === `matekk-fortios-offline-exam:${normalizedUserId}` ||
			key === "matekk-fortios-offline-exam:device"
		) {
			const item = parseExamSession(window.localStorage.getItem(key), key, "offline", userId);
			if (item) entries.set(item.id, item);
			continue;
		}
		if (
			key.startsWith("matekk-offline-exam:") &&
			!key.startsWith(`matekk-offline-exam:${normalizedUserId}:`) &&
			!key.startsWith("matekk-offline-exam:device:")
		) continue;
		if (
			key.startsWith("matekk-fortios-offline:") &&
			!key.startsWith(`matekk-fortios-offline:${normalizedUserId}:`) &&
			!key.startsWith("matekk-fortios-offline:device:")
		) continue;
		if (!key.startsWith("matekk-offline-exam:") &&
			!key.startsWith("matekk-ccna-offline-exam:") &&
			!key.startsWith("matekk-fortios-offline:")) continue;
		const item = parseExamSession(window.localStorage.getItem(key), key, "offline", userId);
		if (item && !entries.has(item.id)) entries.set(item.id, item);
	}

	return [...entries.values()].sort((first, second) =>
		(first.status === "in-progress" ? 0 : 1) - (second.status === "in-progress" ? 0 : 1) ||
		second.submittedAt - first.submittedAt,
	);
}

function formatRemainingTime(deadline, now) {
	if (!Number.isFinite(deadline)) return "";
	const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
	if (seconds === 0) return "Time expired";
	const minutes = Math.floor(seconds / 60);
	return `Time left ${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function ExamNotifications() {
	const { profile } = useAuth();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const userId = profile?.userId;
	const isGradebookPage = pathname.includes("/gradebook") || pathname === "/modules/programs/ccna/results";
	const isAssessmentPage = pathname.includes("/exam/") || pathname.includes("/quiz/");
	const [isOpen, setIsOpen] = useState(false);
	const [now, setNow] = useState(0);
	const [notificationState, setNotificationState] = useState({ userId: null, items: [] });
	const notifications = (notificationState.userId === userId ? notificationState.items : []).map((item) => ({
		...item,
		status: item.status === "in-progress" && item.deadline !== null && item.deadline <= now
			? "expired"
			: item.status,
	}));

	useEffect(() => {
		if (userId === null || userId === undefined) return undefined;
		const refresh = () => {
			try {
				setNotificationState({ userId, items: collectExamNotifications(userId) });
				setNow(Date.now());
			} catch (error) {
				console.error("Unable to load exam notifications.", error);
				setNotificationState({ userId, items: [] });
			}
		};
		refresh();
		const intervalId = window.setInterval(refresh, 1000);
		window.addEventListener("storage", refresh);
		window.addEventListener("focus", refresh);
		return () => {
			window.clearInterval(intervalId);
			window.removeEventListener("storage", refresh);
			window.removeEventListener("focus", refresh);
		};
	}, [userId]);

	if (!profile || isGradebookPage || isAssessmentPage) return null;
	const activeCount = notifications.filter((item) => item.status === "in-progress").length;

	return (
		<div className="relative" aria-label="Exam notifications">
			<button
				type="button"
				onClick={() => setIsOpen((open) => !open)}
				aria-label={`Exam notifications${notifications.length ? `, ${notifications.length} updates` : ""}`}
				aria-expanded={isOpen}
				className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1775ee] transition hover:bg-[#eef6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1775ee]"
			>
				<Bell size={21} />
				{notifications.length > 0 && (
					<span
						aria-hidden="true"
						className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#c6283d] px-1 text-[10px] font-bold leading-none text-white"
					>
						{notifications.length > 99 ? "99+" : notifications.length}
					</span>
				)}
			</button>
			{isOpen && (
				<section className="absolute right-0 top-full z-[90] mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#d6e5e7] bg-white shadow-[0_16px_40px_rgba(15,35,75,0.2)]">
					<header className="flex items-center justify-between border-b border-[#e2ecec] px-4 py-3">
						<div>
							<h2 className="font-bold text-[#071126]">Exam notifications</h2>
							<p className="text-xs text-[#71819b]">{activeCount ? `${activeCount} exam${activeCount === 1 ? "" : "s"} in progress` : "Your exam updates"}</p>
						</div>
						<button type="button" onClick={() => setIsOpen(false)} aria-label="Close exam notifications" className="rounded-full p-1.5 text-[#71819b] transition hover:bg-[#fff4f3] hover:text-[#b42335]"><X size={17} /></button>
					</header>
					{notifications.length === 0 ? (
						<p className="px-4 py-6 text-sm text-[#71819b]">No exam activity yet. Started, completed, or timed-out exams will appear here.</p>
					) : (
						<ul className="max-h-[min(65vh,28rem)] overflow-y-auto divide-y divide-[#edf1f5]">
							{notifications.map((item) => (
								<li key={item.id}>
									<button
										type="button"
										onClick={() => {
											navigate(item.route);
											setIsOpen(false);
										}}
										className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[#f5f9ff]"
									>
										<span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
											item.status === "expired" ? "bg-[#fff0ef] text-[#b42335]" :
												item.status === "completed" ? "bg-[#eaf7f0] text-[#16724e]" :
													"bg-[#eef6ff] text-[#1775ee]"
										}`}>
											{item.status === "expired" ? <CircleAlert size={18} /> : <Clock3 size={18} />}
										</span>
										<span className="min-w-0 flex-1">
											<strong className="block text-sm text-[#17233d]">{item.title}</strong>
											<span className={`mt-1 block text-xs font-semibold ${
												item.status === "expired" ? "text-[#b42335]" :
													item.status === "completed" ? "text-[#16724e]" :
														"text-[#1775ee]"
											}`}>
												{item.status === "expired" ? "Time expired · View exam" :
													item.status === "completed" ? "Completed · View result" :
															`In progress · ${formatRemainingTime(item.deadline, now) || "Open exam"}`}
											</span>
										</span>
									</button>
								</li>
							))}
						</ul>
					)}
				</section>
			)}
		</div>
	);
}
