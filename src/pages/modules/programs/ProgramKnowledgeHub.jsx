import { useRef, useState } from "react";
import {
	ArrowLeft,
	ArrowLeftRight,
	ArrowRight,
	BookOpen,
	Braces,
	Cable,
	ChefHat,
	Clock,
	Eye,
	Fingerprint,
	GitFork,
	KeyRound,
	Layers,
	LockKeyhole,
	Monitor,
	Network,
	RefreshCw,
	Router,
	Search,
	ShieldAlert,
	Sparkles,
	Terminal,
	Webhook,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function sectionId(number) {
	return `program-module-${number.replace(".", "-")}`;
}

function getLessonIcon(title) {
	const value = title.toLowerCase();
	if (/security|threat|attack|risk|malware|incident|policy|access|firewall|vulnerability/.test(value)) {
		return { Icon: ShieldAlert, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/api|rest|webhook|http|request|response/.test(value)) {
		return { Icon: Webhook, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/json|yaml|xml|data format/.test(value)) {
		return { Icon: Braces, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/git|version control|branch|merge/.test(value)) {
		return { Icon: GitFork, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/ansible|bash|script|command|cli|python/.test(value)) {
		return { Icon: Terminal, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/puppet|chef|automation|infrastructure/.test(value)) {
		return { Icon: ChefHat, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/sdn|network|routing|switch|connectivity|protocol/.test(value)) {
		return { Icon: Network, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/authentication|authorization|identity|aaa|credential/.test(value)) {
		return { Icon: Fingerprint, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/host|endpoint|operating system|disk|evidence/.test(value)) {
		return { Icon: Monitor, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/certificate|key|encryption|crypto/.test(value)) {
		return { Icon: KeyRound, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/monitor|visibility|detect|log|alert/.test(value)) {
		return { Icon: Eye, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/deployment|container|docker|cloud/.test(value)) {
		return { Icon: Layers, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/ai|predict/.test(value)) {
		return { Icon: Sparkles, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/router|gateway|nat|dhcp/.test(value)) {
		return { Icon: Router, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/cable|interface|port/.test(value)) {
		return { Icon: Cable, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/acl|rule|control/.test(value)) {
		return { Icon: LockKeyhole, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/restore|recovery|response/.test(value)) {
		return { Icon: RefreshCw, style: "bg-[#5146b5] text-[#efedff]" };
	}
	if (/fundamental|concept|model|design/.test(value)) {
		return { Icon: Layers, style: "bg-[#116d57] text-[#e0f5ee]" };
	}
	if (/address|translation/.test(value)) {
		return { Icon: ArrowLeftRight, style: "bg-[#5146b5] text-[#efedff]" };
	}
	return { Icon: BookOpen, style: "bg-[#116d57] text-[#e0f5ee]" };
}

function LessonCard({ lesson, basePath, onOpen, isScrollable }) {
	const { Icon, style } = getLessonIcon(lesson.title);
	return (
		<Link
			to={`${basePath}/knowledge-hub/${lesson.slug}`}
			onClick={() => onOpen(lesson.slug)}
			className={`group flex min-h-[190px] flex-col justify-between overflow-hidden rounded-xl border border-[#d7d7d7] bg-white p-6 shadow-sm transition duration-200 hover:border-[#167789] hover:shadow-[0_10px_24px_rgba(0,91,107,0.12)] ${isScrollable ? "w-[min(82vw,300px)] shrink-0 snap-start sm:w-[290px]" : "w-full hover:-translate-y-1"}`}
		>
			<div className="transition-transform duration-200 group-hover:scale-[1.02]">
				<div className="flex items-start justify-between gap-3">
					<span className="inline-flex rounded-full bg-[#e8f3f4] px-3 py-1 text-xs font-bold text-[#005b6b]">{lesson.number}</span>
					<span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style}`}><Icon size={25} strokeWidth={2} /></span>
				</div>
				<strong className="mt-3 block text-base leading-snug text-[#111a2d] underline decoration-transparent transition group-hover:text-[#005b6b] group-hover:decoration-current sm:text-lg">{lesson.title}</strong>
				<p className="mt-3 line-clamp-3 text-sm leading-5 text-[#71819b]">{lesson.summary}</p>
			</div>
			<span className="mt-5 flex items-center gap-1.5 text-sm text-[#71819b] transition-transform duration-200 group-hover:scale-[1.02]">
				<Clock size={15} /> {lesson.duration} read
				<ArrowRight size={15} className="transition group-hover:translate-x-1 group-hover:text-[#005b6b]" />
			</span>
		</Link>
	);
}

function CurriculumSection({ module, visibleLessons, basePath, onOpen }) {
	const trackRef = useRef(null);
	const isScrollable = visibleLessons.length > 3;
	if (!visibleLessons.length) return null;

	function scrollTrack(direction) {
		const track = trackRef.current;
		if (track) track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
	}

	return (
		<section id={sectionId(module.number)} className="scroll-mt-8">
			<div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#e0e7f1] pb-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.12em] text-[#005b6b]">{module.number}</p>
					<h2 className="mt-1 text-2xl font-bold text-[#111a2d] sm:text-3xl">{module.title}</h2>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-[#71819b] sm:text-base">{module.description}</p>
				</div>
				<div className="flex items-center gap-2">
					<span className="mr-2 text-sm text-[#71819b]">{visibleLessons.length} subjects</span>
					{isScrollable && (
						<>
							<button type="button" onClick={() => scrollTrack(-1)} aria-label={`Scroll ${module.title} subjects left`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9dfe2] bg-white text-[#005b6b] transition hover:border-[#005b6b] hover:bg-[#e8f3f4]">
								<ArrowLeft size={18} />
							</button>
							<button type="button" onClick={() => scrollTrack(1)} aria-label={`Scroll ${module.title} subjects right`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9dfe2] bg-white text-[#005b6b] transition hover:border-[#005b6b] hover:bg-[#e8f3f4]">
								<ArrowRight size={18} />
							</button>
						</>
					)}
				</div>
			</div>
			<div
				ref={trackRef}
				className={isScrollable
					? "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-5 pt-2 [scrollbar-color:#b9c9e8_transparent] [scrollbar-width:thin] touch-pan-x"
					: "mt-4 grid gap-5 px-1 sm:grid-cols-2 lg:grid-cols-3"}
				{...(isScrollable ? { tabIndex: 0, "aria-label": `${module.title} subjects; swipe or scroll horizontally` } : {})}
			>
				{visibleLessons.map((lesson) => (
					<LessonCard key={lesson.slug} lesson={lesson} basePath={basePath} onOpen={onOpen} isScrollable={isScrollable} />
				))}
			</div>
		</section>
	);
}

export default function ProgramKnowledgeHub({
	programName,
	description,
	basePath,
	curriculum,
	readProgress,
	markLessonOpened,
}) {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const [searchQuery, setSearchQuery] = useState("");
	const progress = userId
		? readProgress(userId)
		: { openedModules: [], completedLessons: [], recentLesson: null };
	const lessons = curriculum.flatMap((module) =>
		module.lessons.map((lesson) => ({ ...lesson, module })),
	);
	const recentLesson = lessons.find((lesson) => lesson.slug === progress.recentLesson) ?? lessons[0];
	const query = searchQuery.trim();
	const visibleModules = curriculum.map((module) => ({
		...module,
		visibleLessons: module.lessons.filter((lesson) =>
			`${module.number} ${module.title} ${lesson.number} ${lesson.title} ${lesson.summary}`
				.toLowerCase()
				.includes(query.toLowerCase()),
		),
	})).filter((module) => module.visibleLessons.length > 0);

	function handleOpen(slug) {
		if (userId) markLessonOpened(userId, slug);
	}

	return (
		<main className="ccna-page-enter min-h-screen bg-white text-[#111a2d]">
			<header className="border-y border-[#dddddd] bg-[#fafafa] px-5 py-10 text-center sm:py-14">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Explore the <span className="text-[#005b6b]">{programName}</span> Knowledge Hub.
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#555555] sm:text-base">{description}</p>
				<label className="relative mx-auto mt-6 block max-w-[360px]">
					<Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
					<input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={`Search ${programName} subjects`} aria-label={`Search ${programName} lessons`} className="h-10 w-full rounded-full border border-[#cfcfcf] bg-white pl-10 pr-4 text-center text-sm outline-none focus:border-[#005b6b] focus:ring-2 focus:ring-[#005b6b]/15" />
				</label>
			</header>

			<div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-10 sm:py-10 lg:px-6 xl:px-8">
				<Link to={basePath} className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-[#005b6b] hover:underline">
					<ArrowLeft size={16} /> Back to dashboard
				</Link>

				<div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
					<aside className="rounded-2xl border border-[#d6e5e7] bg-[#f5f9f9] p-4 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2">
						<h2 className="mb-3 text-sm font-bold uppercase tracking-[0.1em] text-[#526584]">Jump to module</h2>
						<nav aria-label={`${programName} module navigation`} className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-1">
							{curriculum.map((module) => {
								const visible = visibleModules.some((item) => item.number === module.number);
								return (
									<a key={module.number} href={`#${sectionId(module.number)}`} aria-label={`Go to ${module.number} ${module.title}`} aria-disabled={!visible} onClick={(event) => {
										if (!visible) { event.preventDefault(); return; }
										event.preventDefault();
										document.getElementById(sectionId(module.number))?.scrollIntoView({ behavior: "smooth", block: "start" });
									}} className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold transition lg:text-left ${visible ? "border-[#c9dfe2] bg-white text-[#005b6b] hover:border-[#005b6b] hover:bg-[#e8f3f4]" : "cursor-not-allowed border-[#e8edf5] bg-[#f3f5f9] text-[#a3adbd]"}`}>
										<span className="block">{module.number}</span>
										<span className="hidden text-xs font-medium leading-tight text-[#71819b] lg:mt-0.5 lg:block">{module.title}</span>
									</a>
								);
							})}
						</nav>
					</aside>

					<div className="min-w-0 lg:col-start-1 lg:row-start-1">
						{recentLesson && (
							<Link to={`${basePath}/knowledge-hub/${recentLesson.slug}`} onClick={() => handleOpen(recentLesson.slug)} className="group grid overflow-hidden rounded-2xl border border-[#d6e5e7] bg-[#f5f9f9] transition hover:border-[#9dc4ca] hover:shadow-[0_12px_28px_rgba(0,91,107,0.12)] sm:grid-cols-[0.8fr_1.2fr]">
								<div className="flex min-h-40 items-center justify-center bg-[#e8f3f4] p-6 sm:min-h-48">
									<div className="flex flex-col items-center text-center">
										<span className="text-xs font-bold uppercase tracking-[0.18em] text-[#397c86]">{progress.recentLesson ? "Recently opened" : "Featured lesson"}</span>
										<span className="mt-2 text-5xl font-bold tracking-tight text-[#005b6b]">{recentLesson.number}</span>
										<span className="mt-4 text-sm text-[#526584]">{recentLesson.module.number} {recentLesson.module.title}</span>
									</div>
								</div>
								<div className="flex flex-col justify-center p-6 sm:p-8">
									<strong className="text-xl leading-tight text-[#111a2d] transition group-hover:text-[#005b6b] sm:text-2xl">{recentLesson.title}</strong>
									<span className="mt-3 line-clamp-2 text-sm leading-6 text-[#71819b]">{recentLesson.summary}</span>
									<span className="mt-4 flex items-center gap-1.5 text-sm text-[#71819b]"><Clock size={15} /> {recentLesson.duration} read <ArrowRight size={16} className="ml-auto transition group-hover:translate-x-1" /></span>
								</div>
							</Link>
						)}

						<div className="mt-7 space-y-8">
							{visibleModules.map((module) => (
								<CurriculumSection key={module.number} module={module} visibleLessons={module.visibleLessons} basePath={basePath} onOpen={handleOpen} />
							))}
							{visibleModules.length === 0 && (
								<p className="rounded-xl border border-dashed border-[#cfd9e8] p-6 text-center text-sm text-[#71819b]">No subjects match “{query}”.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
