import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProgramBackgroundParticles from "../../ProgramBackgroundParticles";

function Stat({ value, label, className = "" }) {
	return (
		<div className={`program-stat-item flex min-w-0 flex-col items-center gap-1 px-2 py-4 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-3 sm:py-5 sm:text-left ${className}`}>
			<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">{value}</strong>
			<span className="text-[11px] leading-tight text-[#6f7d99] sm:max-w-24 sm:text-sm">{label}</span>
		</div>
	);
}

export default function CCNPProgramDashboard({ program }) {
	const [activeTrackIndex, setActiveTrackIndex] = useState(0);

	const activeTrack = program.tracks[activeTrackIndex];
	const concentrationCount = program.tracks.filter((track) => track.type === "Concentration exam").length;
	const courseDetailsPath = `${program.coursePath}#services`;

	return (
		<main className="program-faceted-page ccna-page-enter relative min-h-screen bg-white text-[#071126]">
			<Link
				to="/pages/blank"
				className="fixed left-4 top-24 z-40 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-[#005b6b] shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-[#004653] active:translate-y-0 motion-reduce:transition-none"
			>
				<ArrowLeft size={20} strokeWidth={2.5} /> Back to Courses
			</Link>

			<ProgramBackgroundParticles className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 sm:px-10 lg:px-14 lg:pb-20 lg:pt-24">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-[#f0f7f7] px-4 py-2 text-sm font-semibold text-[#005b6b]">
							<span className="h-2 w-2 rounded-full bg-[#005b6b]" />
							{program.name} · Certification learning path
						</div>
						<h1 className="max-w-[700px] text-[2rem] font-bold leading-[1.12] tracking-[-1px] sm:text-6xl sm:leading-[1.08] sm:tracking-[-1.5px] lg:text-[3.25rem] xl:text-[3.7rem]">
							Continue your path to <span className="text-[#005b6b]">{program.name}<br className="hidden sm:block" /> Certification.</span>
						</h1>
						<p className="mt-6 max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">{program.description}</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button
								type="button"
								disabled
								aria-label="Start Exam (coming soon)"
								className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-[#005b6b] px-5 text-sm font-bold text-white opacity-40 sm:h-[58px] sm:px-7 sm:text-base"
							>
								Start Exam <ArrowRight size={18} />
							</button>
							<button
								type="button"
								disabled
								aria-label="Start Quiz (coming soon)"
								className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-[#005b6b] px-5 text-sm font-bold text-white opacity-40 sm:h-[58px] sm:px-7 sm:text-base"
							>
								Start Quiz <ArrowRight size={18} />
							</button>
							<button
								type="button"
								disabled
								aria-label="View All Modules (coming soon)"
								className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full border border-[#005b6b] px-5 text-sm font-bold text-[#005b6b] opacity-40 sm:h-[58px] sm:px-7 sm:text-base"
							>
								View All Modules <ArrowRight size={18} />
							</button>
						</div>
						<div className="mt-8 grid w-full max-w-[680px] grid-cols-3 overflow-hidden rounded-2xl border border-[#c9dfe2] bg-white shadow-[0_8px_24px_rgba(0,91,107,0.12)] transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(0,91,107,0.24)] sm:mt-11">
							<Stat value={program.tracks.length} label="Exam tracks" />
							<Stat value="1" label="Core exam" className="border-l border-[#c9dfe2]" />
							<Stat value={concentrationCount} label="Concentration options" className="border-l border-[#c9dfe2]" />
						</div>
					</div>

					<div className="relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[380px] sm:max-w-[470px]">
						<div aria-hidden="true" className="ccna-logo-circle absolute h-[270px] w-[270px] rounded-full bg-[#e4f0f1] sm:h-[356px] sm:w-[356px]" />
						<img src={program.badge} alt={`${program.name} certification badge`} className="relative z-10 h-[210px] w-[210px] object-contain transition-transform duration-300 hover:scale-105 motion-reduce:transition-none sm:h-[270px] sm:w-[270px]" />
						<div className="absolute left-0 top-[23%] z-20 rounded-xl border border-[#e4eaf5] bg-white px-4 py-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 hover:-translate-y-1 sm:left-[-4px]">
							<strong className="text-sm text-[#005b6b]">{program.tracks.length} exam tracks</strong>
							<span className="mt-1 block text-xs leading-5 text-[#64708a]">Choose a core or concentration path.</span>
						</div>
						<div className="absolute bottom-[12%] right-0 z-20 max-w-[235px] rounded-2xl border border-[#e4eaf5] bg-white p-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-[-2%]">
							<div className="flex items-center justify-between gap-3">
								<strong className="text-sm text-[#005b6b]">{activeTrack.code}</strong>
								<span className="text-xs font-semibold text-[#7c89a1]">{activeTrackIndex + 1}/{program.tracks.length}</span>
							</div>
							<p className="mt-1 text-sm leading-snug text-[#64708a]">{activeTrack.name}</p>
							<Link to={courseDetailsPath} className="mt-3 flex h-9 items-center justify-center gap-2 rounded-full bg-[#005b6b] px-4 text-xs font-bold text-white transition-all duration-200 hover:bg-[#004653] hover:shadow-md motion-reduce:transition-none">
								View track details <ArrowRight size={15} />
							</Link>
						</div>
					</div>
				</div>
			</ProgramBackgroundParticles>

			<div className="bg-[#eaf3f4] py-12 text-center sm:py-14">
				<p className="text-2xl font-bold tracking-tight text-[#071126] sm:text-[28px]">Build advanced skills in <span className="text-[#005b6b]">{program.focusAreas[0].toLowerCase()}.</span></p>
			</div>

			<section id="course-tracks" className="scroll-mt-8 bg-[#f5f9f9]">
				<div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_353px] lg:px-14 lg:py-14">
					<div>
						<div className="mb-6 flex flex-wrap items-center justify-between gap-2">
							<h2 className="text-xl font-bold sm:text-[21px]">Course modules</h2>
							<span className="text-sm text-[#7c89a1]">{program.tracks.length} exam tracks · select one to preview</span>
						</div>
						<div className="space-y-3">
							{program.tracks.map((track, index) => {
								const isActive = activeTrackIndex === index;
								return (
									<article key={track.code} className={`overflow-hidden rounded-[18px] border bg-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)] motion-reduce:transition-none ${isActive ? "border-[#81b7bf] shadow-[0_8px_20px_rgba(0,91,107,0.08)]" : "border-[#d6e5e7] hover:border-[#b5d4d9]"}`}>
										<button
											type="button"
											onClick={() => setActiveTrackIndex(index)}
											aria-expanded={isActive}
											className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
										>
											<span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border text-sm font-bold transition-colors duration-200 ${isActive ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#c9dfe2] bg-[#edf5f6] text-[#005b6b]"}`}>
												{index + 1}
											</span>
											<span className="min-w-0 flex-1">
												<strong className="block text-base text-[#111a2d] sm:text-[17px]">{track.name}</strong>
												<span className="mt-1 block text-sm text-[#8a96aa]">{track.code} · {track.type}</span>
											</span>
											{isActive ? <Check className="shrink-0 text-[#005b6b]" size={19} /> : <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}
										</button>
										{isActive && (
											<div className="border-t border-[#e2ecec] px-6 pb-5 pt-4 sm:pl-[91px]">
												<p className="text-sm leading-6 text-[#66738d]">{track.summary}</p>
												<Link to={courseDetailsPath} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#005b6b] transition-colors hover:text-[#004653]">
													<BookOpen size={16} /> Explore course content <ArrowRight size={15} />
												</Link>
											</div>
										)}
									</article>
								);
							})}
						</div>
					</div>

					<aside className="space-y-5">
						<div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)]">
							<div className="mb-4 flex items-center gap-3">
								<BookOpen className="text-[#005b6b]" size={21} />
								<h2 className="text-xl font-bold">Learning focus</h2>
							</div>
							<ul className="space-y-3">
								{program.focusAreas.map((area) => (
									<li key={area} className="flex items-center gap-3 text-sm font-medium text-[#334454]">
										<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f3f4] text-[#005b6b]">
											<Check size={17} />
										</span>
										{area}
									</li>
								))}
							</ul>
							<p className="mt-5 border-t border-[#e2ecec] pt-4 text-xs text-[#7c89a1]">{program.tracks.length} exam tracks · Self-paced course details</p>
							<Link
								to={courseDetailsPath}
								className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#005b6b] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)] active:translate-y-0 motion-reduce:transition-none"
							>
								View Course Details <ArrowRight size={17} />
							</Link>
						</div>
						<div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white p-3 transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)]">
							<img src={program.badge} alt="" aria-hidden="true" className="mx-auto h-44 w-full object-contain" />
							<p className="pb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#7c89a1]">Cisco certification path</p>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}