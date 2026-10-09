import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, ClipboardList, Clock3, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

const NO_HERO_INTROS = [];

function ComingSoonCard({ title, description, icon }) {
	return (
		<div className="flex items-start gap-4 rounded-2xl border border-[#d6e5e7] bg-white p-5">
			<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf3f4] text-[#005b6b]">
				{icon}
			</span>
			<div className="min-w-0">
				<h3 className="font-bold text-[#071126]">{title}</h3>
				<p className="mt-1 text-sm leading-6 text-[#71819b]">{description}</p>
				<span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#005b6b]">
					<LockKeyhole size={13} /> Coming soon
				</span>
			</div>
		</div>
	);
}

function ModuleOutlineCard({ module, index }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<article className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-[#b5d4d9] hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)]">
			<button
				type="button"
				onClick={() => setIsOpen((open) => !open)}
				aria-expanded={isOpen}
				className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
			>
				<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#c9dfe2] bg-[#edf5f6] text-lg font-semibold text-[#005b6b]">
					{index + 1}
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">{module.items.length} curriculum objectives</span>
				</span>
				{isOpen
					? <ChevronDown className="shrink-0 text-[#005b6b]" size={19} />
					: <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}
			</button>
			{isOpen && (
				<div className="border-t border-[#e2ecec] px-6 pb-6 pt-5 sm:pl-[91px]">
					<ul className="space-y-3">
						{module.items.map((item, itemIndex) => (
							<li key={typeof item === "string" ? item : item.subTitle ?? itemIndex} className="text-sm leading-6 text-[#66738d]">
								{typeof item === "string" ? (
									item
								) : (
									<>
										<p className="font-medium text-[#334454]">{item.subTitle}</p>
										<ul className="ml-5 mt-1 list-disc space-y-1">
											{item.items.map((subItem) => <li key={subItem}>{subItem}</li>)}
										</ul>
									</>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</article>
	);
}

export default function CCNAProgramDashboard({
	programName,
	badge,
	description,
	descriptionAccent,
	quote,
	focusAreas,
	modules = [],
	activeModule,
	modulesLeft = modules.length,
	renderModules,
	heroActions,
	topStats,
	practiceQuizzes,
	modulesSummary,
	quizScore = 0,
	gradebookPath,
	gradebookStatsError,
	heroIntros = NO_HERO_INTROS,
	overviewDescription,
}) {
	const [typedIntro, setTypedIntro] = useState("");
	const [hasScrolled, setHasScrolled] = useState(false);
	const hasDescriptionAccent = typeof descriptionAccent === "string" && description.endsWith(descriptionAccent);

	useEffect(() => {
		const updateBackButtonVisibility = () => setHasScrolled(window.scrollY > 120);
		updateBackButtonVisibility();
		window.addEventListener("scroll", updateBackButtonVisibility, { passive: true });
		return () => window.removeEventListener("scroll", updateBackButtonVisibility);
	}, []);

	useEffect(() => {
		if (heroIntros.length === 0) {
			setTypedIntro("");
			return undefined;
		}

		let timeoutId;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedIntro(heroIntros[0]), 0);
			return () => window.clearTimeout(timeoutId);
		}

		let introIndex = 0;
		let characterIndex = 0;

		function typeDescription() {
			const description = heroIntros[introIndex];
			characterIndex += 1;
			setTypedIntro(description.slice(0, characterIndex));
			if (characterIndex < description.length) {
				timeoutId = window.setTimeout(typeDescription, 18);
			} else {
				timeoutId = window.setTimeout(eraseDescription, 10000);
			}
		}

		function eraseDescription() {
			characterIndex -= 1;
			setTypedIntro(heroIntros[introIndex].slice(0, characterIndex));
			if (characterIndex > 0) {
				timeoutId = window.setTimeout(eraseDescription, 8);
			} else {
				introIndex = (introIndex + 1) % heroIntros.length;
				timeoutId = window.setTimeout(typeDescription, 120);
			}
		}

		timeoutId = window.setTimeout(typeDescription, 150);
		return () => window.clearTimeout(timeoutId);
	}, [heroIntros]);

	return (
		<main className="ccna-page-enter relative min-h-screen bg-white text-[#071126]">
			{/* Phones/tablets: Back button pinned to the screen (outside the page's slide-in animation),
			    so it stays still while the page moves; a white pill appears behind it once you scroll */}
			{createPortal(
				<Link
					to="/pages/blank"
					className={`fixed left-4 top-20 z-[60] flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-base font-bold text-[#005b6b] transition hover:text-[#004653] active:scale-95 lg:hidden ${hasScrolled ? "bg-white/90 shadow-md backdrop-blur-sm" : ""}`}
				>
					<ArrowLeft size={24} strokeWidth={2.5} /> Back
				</Link>,
				document.body,
			)}
			<section className="mx-auto min-w-0 max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div className="contents sm:block">
						<div className="order-1 min-w-0 sm:order-none">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-[#f0f7f7] px-4 py-2 text-sm font-semibold text-[#005b6b]">
							<span className="h-2 w-2 rounded-full bg-[#005b6b]" />
							{activeModule
								? `Module ${activeModule.number.replace(".0", "")} of ${modules.length} · ${activeModule.title}`
								: `${programName} · Learning path`}
						</div>
						<h1 className="max-w-[700px] text-[2rem] font-bold leading-[1.12] tracking-[-1px] sm:text-6xl sm:leading-[1.08] sm:tracking-[-1.5px] lg:text-[3.25rem] xl:text-[3.7rem]">
							Continue your path to <span className="text-[#005b6b]">{programName}<br className="hidden sm:block" /> Certification.</span>
						</h1>
						<p className="typewriter-caret mt-6 min-h-[5.4rem] max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">{heroIntros.length > 0 ? typedIntro : quote}</p>
						{heroActions ?? (
							<div className="mt-8 flex flex-wrap gap-3">
								<a href="#program-content" className="flex h-[58px] items-center gap-2 rounded-full bg-[#005b6b] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)]">
									Explore learning path <ArrowRight size={18} />
								</a>
							</div>
						)}
						</div>
						<div className="group/stats order-3 mt-8 inline-grid w-fit max-w-full grid-cols-3 gap-3 rounded-2xl border border-[#c9dfe2] bg-white p-4 shadow-[0_8px_24px_rgba(0,91,107,0.12)] transition-colors duration-200 lg:hover:border-[#005b6b] lg:hover:bg-[#005b6b] lg:hover:shadow-[0_12px_28px_rgba(0,91,107,0.24)] sm:order-none sm:mt-11 sm:flex sm:flex-wrap sm:gap-5 sm:divide-x sm:divide-[#c9dfe2] sm:p-5">
							{topStats ?? (
								<>
									<div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
										<strong className="text-xl leading-none tracking-tight text-[#071126] transition-colors duration-200 lg:group-hover/stats:text-white sm:text-[2rem]">{modules.length}</strong>
										<span className="text-[11px] leading-tight text-[#6f7d99] transition-colors duration-200 lg:group-hover/stats:text-white sm:max-w-20 sm:text-sm">Course modules</span>
									</div>
									<div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3 sm:pl-7">
										<strong className="text-xl leading-none tracking-tight text-[#071126] transition-colors duration-200 lg:group-hover/stats:text-white sm:text-[2rem]">0</strong>
										<span className="text-[11px] leading-tight text-[#6f7d99] transition-colors duration-200 lg:group-hover/stats:text-white sm:max-w-20 sm:text-sm">Quizzes available</span>
									</div>
									<div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3 sm:pl-7">
										<strong className="text-xl leading-none tracking-tight text-[#071126] transition-colors duration-200 lg:group-hover/stats:text-white sm:text-[2rem]">0</strong>
										<span className="text-[11px] leading-tight text-[#6f7d99] transition-colors duration-200 lg:group-hover/stats:text-white sm:max-w-20 sm:text-sm">Exams available</span>
									</div>
								</>
							)}
						</div>
						{gradebookStatsError && <p role="alert" className="mt-2 text-xs font-medium text-[#a44b13]">{gradebookStatsError}</p>}
					</div>

					<div className="relative order-2 mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:order-none sm:h-[380px] sm:max-w-[470px]">
						<div aria-hidden="true" className="absolute h-[270px] w-[270px] rounded-full bg-[#e4f0f1] sm:h-[356px] sm:w-[356px]" />
						<img src={badge} alt={`${programName} certification badge`} className="relative z-10 h-[210px] w-[210px] object-contain sm:h-[270px] sm:w-[270px]" />
						{gradebookPath ? (
							<>
								<div className="absolute left-0 top-[2%] z-20 flex h-[94px] w-[128px] flex-col justify-center rounded-xl border border-[#e4eaf5] bg-white px-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-105 sm:left-[-4px] sm:top-[31%]">
									<strong className="text-xl leading-none text-[#005b6b]">{quizScore}%</strong>
									<span className="mt-2 text-sm leading-none text-[#15203a]">Quiz score</span>
									<span
										role="img"
										aria-label={`${quizScore}% quiz score, ${Math.round((quizScore / 100) * 5 * 10) / 10} out of 5 stars`}
										className="relative mt-2 inline-block text-sm leading-none tracking-[2px]"
									>
										<span aria-hidden="true" className="text-[#d7dee9]">★★★★★</span>
										<span aria-hidden="true" className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#f59e0b]" style={{ width: `${Math.max(0, Math.min(100, quizScore))}%` }}>★★★★★</span>
									</span>
								</div>
								<Link
									to={gradebookPath}
									aria-label={`Open ${programName} gradebook`}
									title="Gradebook"
									className="absolute right-[12%] top-[2%] z-30 hidden h-12 w-12 items-center justify-center rounded-full bg-white text-[#005b6b] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:translate-y-0 sm:flex"
								>
									<ClipboardList size={21} />
								</Link>
							</>
						) : (
							<>
								<div className="absolute left-0 top-[25%] z-20 max-w-[155px] rounded-xl border border-[#e4eaf5] bg-white px-4 py-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:left-[-4px]">
									<strong className="text-sm text-[#005b6b]">Learning path</strong>
									<span className="mt-1 block text-xs leading-5 text-[#64708a]">Your course content will appear here.</span>
								</div>
								<div className="absolute bottom-[16%] right-0 z-20 max-w-[185px] rounded-xl border border-[#e4eaf5] bg-white px-4 py-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:right-[-2%]">
									<strong className="text-sm text-[#005b6b]">{programName}</strong>
									<span className="mt-1 block text-xs leading-5 text-[#64708a]">Course materials are being prepared.</span>
								</div>
							</>
						)}
					</div>
				</div>
			</section>

			<div className="bg-[#eaf3f4] py-12 text-center sm:py-14">
				<p className="mx-auto max-w-4xl px-6 text-2xl font-bold tracking-tight text-[#071126] sm:text-[28px]">
					{hasDescriptionAccent ? (
						<>
							{description.slice(0, -descriptionAccent.length)}
							<span className="text-[#005b6b]">{descriptionAccent}</span>
						</>
					) : description}
				</p>
			</div>

			<section id="program-content" className="scroll-mt-8 min-w-0 bg-[#f5f9f9]">
				<div className="mx-auto grid min-w-0 max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_353px] lg:px-14 lg:py-14">
					<div className="min-w-0">
						<div className="mb-6 flex flex-wrap items-center justify-between gap-2">
							<h2 className="text-xl font-bold sm:text-[21px]">Course modules</h2>
							<span className="text-sm text-[#7c89a1]">{modulesSummary ?? `${modules.length} modules · curriculum outline`}</span>
						</div>
						{typeof renderModules === "function" ? renderModules() : modules.length > 0 ? (
							<div className="space-y-3">
								{modules.map((module, index) => (
									<ModuleOutlineCard key={module.title} module={module} index={index} />
								))}
							</div>
						) : (
							<div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#b9cdd1] bg-white px-6 py-10 text-center">
								<BookOpen size={30} className="text-[#087a91]" />
								<h3 className="mt-4 text-lg font-bold">Your learning path is being prepared</h3>
								<p className="mt-2 max-w-lg text-sm leading-6 text-[#71819b]">Course modules and lessons for {programName} will be added here.</p>
							</div>
						)}
					</div>

					<aside className="min-w-0 space-y-5">
						{!practiceQuizzes && <div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6">
							<div className="flex items-center gap-4">
								<div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[6px] border-[#e4eaf4]">
									<span className="text-xs font-bold text-[#005b6b]">0%</span>
								</div>
								<div>
									<strong className="text-lg">Learning progress</strong>
									<p className="mt-1 text-sm text-[#7c89a1]">{modules.length > 0 ? `${modules.length - modulesLeft} modules opened · ${modulesLeft} left` : "No modules available yet"}</p>
								</div>
							</div>
						</div>}
						{practiceQuizzes ?? <ComingSoonCard title="Practice quizzes" description="Interactive quizzes are not available yet for this learning path." icon={<Check size={21} />} />}
						{!practiceQuizzes && <ComingSoonCard title="Exams" description="Timed exams are not available yet for this learning path." icon={<Clock3 size={21} />} />}
						<div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6">
							<div className="mb-4 flex items-center justify-between gap-3">
								<div>
									<h2 className="text-xl font-bold">Program Overview</h2>
									<p className="mt-1 text-sm leading-6 text-[#7c89a1]">{overviewDescription ?? focusAreas}</p>
								</div>
								<BookOpen size={20} className="shrink-0 text-[#005b6b]" aria-hidden="true" />
							</div>
							<h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#7c89a1]">Course roadmap</h3>
							<ol className="space-y-2.5">
								{modules.map((module, index) => (
									<li key={module.number ?? module.title} className="flex items-center gap-3 text-sm font-medium text-[#334454]">
										<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f3f4] text-xs font-bold text-[#005b6b]">
											{index + 1}
										</span>
										<span className="min-w-0">{module.title}</span>
									</li>
								))}
							</ol>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
