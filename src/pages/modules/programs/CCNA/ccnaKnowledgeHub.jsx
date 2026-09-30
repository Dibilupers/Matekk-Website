import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { CCNA_CURRICULUM as curriculum, slugifyCcnaTutorial as slugify } from "./ccnaCurriculum.js";

const RECENT_TUTORIAL_KEY = "matekk-ccna-recent-tutorial";

function getSectionId(sectionNumber) {
	return `curriculum-${sectionNumber.replace(".", "-")}`;
}

function sectionMatchesSearch(section, searchQuery) {
	return section.tutorials.some((tutorial) =>
		`${tutorial.number} ${tutorial.title} ${section.title}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase()),
	);
}

function getTutorialBySlug(slug) {
	for (const section of curriculum) {
		const tutorial = section.tutorials.find((item) => slugify(item.title) === slug);
		if (tutorial) return { ...tutorial, sectionNumber: section.number, sectionTitle: section.title };
	}
	return null;
}

function getRecentTutorial() {
	const recentSlug = window.localStorage.getItem(RECENT_TUTORIAL_KEY);
	return recentSlug ? getTutorialBySlug(recentSlug) : null;
}

function TutorialCard({ number, title, duration, summary, isScrollable, sectionNumber, sectionTitle, onOpen }) {
	return (
		<Link
			to={`/modules/programs/ccna/knowledge-hub/${slugify(title)}`}
			onClick={() => onOpen({ number, title, duration, summary, sectionNumber, sectionTitle })}
			className={`group flex min-h-[190px] flex-col justify-between overflow-hidden rounded-xl border border-[#d7d7d7] bg-white p-6 shadow-sm transition duration-200 hover:border-[#167789] hover:shadow-[0_10px_24px_rgba(0,91,107,0.12)] ${
				isScrollable ? "" : "hover:-translate-y-1"
			} ${
				isScrollable ? "w-[min(82vw,300px)] shrink-0 snap-start sm:w-[290px]" : "w-full"
			}`}
		>
			<div className="transition-transform duration-200 group-hover:scale-[1.02]">
				<span className="inline-flex rounded-full bg-[#e8f3f4] px-3 py-1 text-xs font-bold text-[#005b6b]">
					{number}
				</span>
				<strong className="mt-3 block text-base leading-snug text-[#111a2d] underline decoration-transparent transition group-hover:text-[#005b6b] group-hover:decoration-current sm:text-lg">
					{title}
				</strong>
				<p className="mt-3 text-sm leading-5 text-[#71819b]">{summary}</p>
			</div>
			<span className="mt-5 flex items-center gap-1.5 text-sm text-[#71819b] transition-transform duration-200 group-hover:scale-[1.02]">
				<Clock size={15} /> {duration} read
				<ArrowRight size={15} className="ml-auto transition group-hover:translate-x-1 group-hover:text-[#005b6b]" />
			</span>
		</Link>
	);
}

function CurriculumSection({ section, searchQuery, onOpen }) {
	const trackRef = useRef(null);
	const isScrollable = section.tutorials.length > 3;
	const visibleTutorials = section.tutorials.filter((tutorial) =>
		`${tutorial.number} ${tutorial.title} ${section.title}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase()),
	);

	if (!visibleTutorials.length) return null;

	function scrollTrack(direction) {
		const track = trackRef.current;
		if (!track) return;
		track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
	}

	return (
		<section id={getSectionId(section.number)} className="mt-12 scroll-mt-28 first:mt-10" aria-labelledby={`curriculum-${section.number}`}>
			<div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#e0e7f1] pb-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.12em] text-[#005b6b]">{section.number}</p>
					<h2 id={`curriculum-${section.number}`} className="mt-1 text-2xl font-bold text-[#111a2d] sm:text-3xl">
						{section.title}
					</h2>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-[#71819b] sm:text-base">{section.description}</p>
				</div>
				<div className="flex items-center gap-2">
					<span className="mr-2 text-sm text-[#71819b]">{visibleTutorials.length} subjects</span>
					{isScrollable && (
						<>
							<button
								type="button"
								onClick={() => scrollTrack(-1)}
								aria-label={`Scroll ${section.title} subjects left`}
								className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9dfe2] bg-white text-[#005b6b] transition hover:border-[#005b6b] hover:bg-[#e8f3f4]"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								type="button"
								onClick={() => scrollTrack(1)}
								aria-label={`Scroll ${section.title} subjects right`}
								className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9dfe2] bg-white text-[#005b6b] transition hover:border-[#005b6b] hover:bg-[#e8f3f4]"
							>
								<ChevronRight size={20} />
							</button>
						</>
					)}
				</div>
			</div>
			<div
				ref={trackRef}
				className={
					isScrollable
						? "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-5 pt-2 [scrollbar-color:#b9c9e8_transparent] [scrollbar-width:thin] touch-pan-x"
						: "mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
				}
				{...(isScrollable
					? {
							tabIndex: 0,
							"aria-label": `${section.title} subjects; swipe or scroll horizontally`,
						}
					: {})}
			>
				{visibleTutorials.map((tutorial) => (
					<TutorialCard
						key={tutorial.title}
						{...tutorial}
						sectionNumber={section.number}
						sectionTitle={section.title}
						isScrollable={isScrollable}
						onOpen={onOpen}
					/>
				))}
			</div>
		</section>
	);
}

export default function CCNAKnowledgeHub() {
	const [searchQuery, setSearchQuery] = useState("");
	const [recentTutorial, setRecentTutorial] = useState(getRecentTutorial);
	const featuredTutorial = recentTutorial || {
		number: "Extra",
		title: "Spine-Leaf Architecture Tutorial",
		duration: "8 min",
		summary: "Explore scalable data center fabric and leaf-spine design.",
		sectionNumber: "1.0",
		sectionTitle: "Network Fundamentals",
	};

	function handleTutorialOpen(tutorial) {
		window.localStorage.setItem(RECENT_TUTORIAL_KEY, slugify(tutorial.title));
		setRecentTutorial(tutorial);
	}

	return (
		<main className="ccna-page-enter min-h-screen bg-white text-[#111a2d]">
			<header className="border-y border-[#dddddd] bg-[#fafafa] px-5 py-10 text-center sm:py-14">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Explore the <span className="text-[#005b6b]">CCNA Knowledge</span> hub.
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#555555] sm:text-base">
					Learn practical networking concepts, troubleshooting techniques, and architecture patterns to build stronger CCNA foundations.
				</p>
				<label className="relative mx-auto mt-6 block max-w-[360px]">
					<Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
					<input
						type="search"
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						placeholder="Search CCNA subjects"
						className="h-10 w-full rounded-full border border-[#cfcfcf] bg-white pl-10 pr-4 text-center text-sm outline-none focus:border-[#005b6b] focus:ring-2 focus:ring-[#005b6b]/15"
					/>
				</label>
			</header>

			<div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-10 sm:py-10 lg:px-6 xl:px-8">
				<Link
					to="/modules/programs/ccna"
					className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-[#005b6b] hover:underline"
				>
					<ArrowLeft size={16} /> Back to dashboard
				</Link>

				<div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
					<aside className="rounded-2xl border border-[#d6e5e7] bg-[#f5f9f9] p-4 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2">
						<h2 className="mb-3 text-sm font-bold uppercase tracking-[0.1em] text-[#526584]">Jump to module</h2>
						<nav aria-label="CCNA module navigation" className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-1">
							{curriculum.map((section) => {
								const isVisible = sectionMatchesSearch(section, searchQuery);
								return (
									<a
										key={section.number}
										href={`#${getSectionId(section.number)}`}
										aria-label={`Go to ${section.number} ${section.title}`}
										aria-disabled={!isVisible}
										onClick={(event) => {
											if (!isVisible) {
												event.preventDefault();
												return;
											}
											event.preventDefault();
											document.getElementById(getSectionId(section.number))?.scrollIntoView({
												behavior: "smooth",
												block: "start",
											});
										}}
										className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold transition lg:text-left ${
											isVisible
												? "border-[#c9dfe2] bg-white text-[#005b6b] hover:border-[#005b6b] hover:bg-[#e8f3f4]"
												: "cursor-not-allowed border-[#e8edf5] bg-[#f3f5f9] text-[#a3adbd]"
										}`}
									>
										<span className="block">{section.number}</span>
										<span className="hidden text-xs font-medium leading-tight text-[#71819b] lg:mt-0.5 lg:block">{section.title}</span>
									</a>
								);
							})}
						</nav>
					</aside>

					<div className="min-w-0 lg:col-start-1 lg:row-start-1">
						<Link
							to={`/modules/programs/ccna/knowledge-hub/${slugify(featuredTutorial.title)}`}
							className="group grid overflow-hidden rounded-2xl border border-[#d6e5e7] bg-[#f5f9f9] transition hover:border-[#9dc4ca] hover:shadow-[0_12px_28px_rgba(0,91,107,0.12)] sm:grid-cols-[0.8fr_1.2fr]"
						>
							<div className="flex min-h-40 items-center justify-center bg-[#e8f3f4] p-6 sm:min-h-48">
								<div className="flex flex-col items-center text-center">
									<span className="text-xs font-bold uppercase tracking-[0.18em] text-[#397c86]">CCNA module</span>
									<span className="mt-2 text-5xl font-bold tracking-tight text-[#005b6b]">{featuredTutorial.number}</span>
									<span className="mt-4 flex items-center gap-3" aria-hidden="true">
										<span className="h-3 w-3 rounded-full bg-white ring-2 ring-[#8bb8bf]" />
										<span className="h-1 w-12 rounded bg-[#8bb8bf]" />
										<span className="h-4 w-4 rounded-full bg-[#005b6b] ring-4 ring-[#cce2e5]" />
										<span className="h-1 w-12 rounded bg-[#8bb8bf]" />
										<span className="h-3 w-3 rounded-full bg-white ring-2 ring-[#8bb8bf]" />
									</span>
								</div>
							</div>
							<div className="flex flex-col justify-center p-6 sm:p-8">
								<span className="text-sm font-semibold text-[#005b6b]">
									{recentTutorial ? "Recently opened" : "Featured tutorial"} · {featuredTutorial.sectionNumber} {featuredTutorial.sectionTitle}
								</span>
								<strong className="mt-2 text-xl leading-tight text-[#111a2d] transition group-hover:text-[#005b6b] sm:text-2xl">
									{featuredTutorial.title}
								</strong>
								<span className="mt-3 flex items-center gap-1.5 text-sm text-[#71819b]">
									<Clock size={15} /> {featuredTutorial.duration} read
									<ArrowRight size={16} className="ml-auto transition group-hover:translate-x-1" />
								</span>
							</div>
						</Link>

						{curriculum.map((section) => (
							<CurriculumSection
								key={section.number}
								section={section}
								searchQuery={searchQuery}
								onOpen={handleTutorialOpen}
							/>
						))}
						{!curriculum.some((section) => sectionMatchesSearch(section, searchQuery)) && (
							<p className="mt-10 rounded-xl border border-dashed border-[#cfd9e8] p-6 text-center text-sm text-[#71819b]">
								No subjects match “{searchQuery}”.
							</p>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
