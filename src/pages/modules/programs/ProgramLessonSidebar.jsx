import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProgramLessonSidebar({ curriculum, basePath, activeSlug }) {
	const [openSections, setOpenSections] = useState(() => {
		const activeModule = curriculum.find((module) =>
			module.lessons.some((lesson) => lesson.slug === activeSlug),
		);
		return new Set(activeModule ? [activeModule.number] : []);
	});
	const [searchQuery, setSearchQuery] = useState("");
	const normalizedQuery = searchQuery.trim().toLowerCase();
	const visibleModules = curriculum
		.map((module) => {
			const moduleMatches = `${module.number} ${module.title}`.toLowerCase().includes(normalizedQuery);
			const lessons = moduleMatches || !normalizedQuery
				? module.lessons
				: module.lessons.filter((lesson) =>
					`${lesson.number} ${lesson.title}`.toLowerCase().includes(normalizedQuery),
				);
			return { ...module, visibleLessons: lessons };
		})
		.filter((module) => module.visibleLessons.length > 0);

	function toggleSection(moduleNumber) {
		setOpenSections((currentSections) => {
			const nextSections = new Set(currentSections);
			if (nextSections.has(moduleNumber)) nextSections.delete(moduleNumber);
			else nextSections.add(moduleNumber);
			return nextSections;
		});
	}

	return (
		<aside className="border-l border-[#e1e8f3] pl-6 lg:sticky lg:top-24 lg:ml-auto lg:w-full lg:max-w-[300px] lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:self-start">
			<label className="relative block w-full">
				<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#005b6b]" />
				<input
					type="search"
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
					placeholder="Filter lessons..."
					aria-label="Filter lessons by title or module"
					className="h-[54px] w-full rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] pl-12 pr-4 text-base text-[#172642] outline-none transition focus:border-[#005b6b] focus:ring-2 focus:ring-[#005b6b]/15"
				/>
			</label>
			<div className="mt-6 space-y-2">
				{visibleModules.map((module) => {
					const isOpen = openSections.has(module.number) || Boolean(normalizedQuery);
					return (
						<div key={module.number}>
							<button
								type="button"
								onClick={() => toggleSection(module.number)}
								aria-expanded={isOpen}
								aria-controls={`program-lessons-${module.number.replace(".", "-")}`}
								className="group flex min-h-[72px] w-full items-center justify-between gap-3 border-b border-[#dbe5f5] px-1 py-4 text-left"
							>
								<strong className="text-lg leading-tight text-[#111a2d] transition-colors group-hover:text-[#005b6b]">{module.number} {module.title}</strong>
								<span className="flex shrink-0 items-center gap-3 text-base text-[#71819b]">
									<span className="group-hover:text-[#005b6b]">{module.visibleLessons.length}</span>
									<ChevronDown size={18} className={`text-[#005b6b] transition-transform duration-200 group-hover:text-[#004653] ${isOpen ? "" : "-rotate-90"}`} />
								</span>
							</button>
							{isOpen && (
								<div id={`program-lessons-${module.number.replace(".", "-")}`} className="space-y-1 py-2 pl-2">
									{module.visibleLessons.map((lesson) => (
										<Link
											key={lesson.slug}
											to={`${basePath}/knowledge-hub/${lesson.slug}`}
											className={`block rounded-lg px-3 py-2 text-sm leading-snug transition ${activeSlug === lesson.slug ? "bg-[#e8f3f4] font-semibold text-[#005b6b]" : "text-[#526584] hover:bg-[#f0f7f7] hover:text-[#005b6b]"}`}
										>
											<span className="mr-2 text-xs font-semibold text-[#8a96aa]">{lesson.number}</span>
											{lesson.title}
										</Link>
									))}
								</div>
							)}
						</div>
					);
				})}
				{normalizedQuery && visibleModules.length === 0 && (
					<p className="px-1 py-4 text-sm text-[#71819b]">No lessons match “{searchQuery.trim()}”.</p>
				)}
			</div>
		</aside>
	);
}
