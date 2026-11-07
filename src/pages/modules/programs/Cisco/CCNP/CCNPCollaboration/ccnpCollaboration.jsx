import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, FileQuestion, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import CCNPCollaborationBadge from "../../../../../../assets/CCNPCollaboration.png";
import { useAuth } from "../../../../../../context/auth-context";
import ProgramBackgroundParticles from "../../../ProgramBackgroundParticles";
import ScoreRotationCard from "../../../ScoreRotationCard";

const tracks = [
	{ code: "350-801 CLCOR", name: "Collaboration Core Technologies", type: "Core exam", summary: "Implement and operate Cisco collaboration core technologies." },
	{ code: "300-815 CLACCM", name: "Advanced Call Control and Mobility", type: "Concentration exam", summary: "Implement advanced on-premises call control and mobility services." },
	{ code: "300-820 CLHCT", name: "Collaboration Hybrid and Cloud", type: "Concentration exam", summary: "Implement Cisco collaboration hybrid and cloud technologies." },
];
const focusAreas = ["Collaboration core", "Call control", "Hybrid and cloud"];
const courseDetailsPath = "/training/cisco/ccnp/collaboration#services";

function Stat({ value, label, className = "" }) {
	return <div className={`program-stat-item flex min-w-0 flex-col items-center gap-1 px-2 py-4 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-3 sm:py-5 sm:text-left ${className}`}><strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">{value}</strong><span className="text-[11px] leading-tight text-[#6f7d99] sm:max-w-24 sm:text-sm">{label}</span></div>;
}

export default function CCNPCollaborationDashboard() {
	const { isOnline } = useAuth();
	const [activeTrackIndex, setActiveTrackIndex] = useState(0);
	const [isResultsNoticeOpen, setIsResultsNoticeOpen] = useState(true);
	const concentrationCount = tracks.filter((track) => track.type === "Concentration exam").length;

	return (
		<main className="program-faceted-page ccna-page-enter relative min-h-screen bg-white text-[#071126]">
			{createPortal(<Link to={isOnline ? "/pages/blank" : "/modules/programs"} className={`fixed left-4 ${isOnline ? "top-24" : "top-5"} z-40 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-[#005b6b] shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-[#004653]`}><ArrowLeft size={20} strokeWidth={2.5} /> Back to Courses</Link>, document.body)}
			<ProgramBackgroundParticles className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-[#f0f7f7] px-4 py-2 text-sm font-semibold text-[#005b6b]"><span className="h-2 w-2 rounded-full bg-[#c6283d]" /> CCNP Collaboration · Certification learning path</div>
						<h1 className="max-w-[700px] text-[2rem] font-bold leading-[1.12] tracking-[-1px] sm:text-6xl sm:leading-[1.08] lg:text-[3.25rem] xl:text-[3.7rem]">Continue your path to <span className="text-[#005b6b]">CCNP Collaboration<br className="hidden sm:block" /><span className="text-[#c6283d]">Certification.</span></span></h1>
						<p className="mt-6 max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">Strengthen collaboration skills in core infrastructure, call control, and hybrid cloud technologies.</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button type="button" disabled aria-label="Start Exam (coming soon)" className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-[#005b6b] px-5 text-sm font-bold text-white opacity-45 sm:h-[58px] sm:px-7 sm:text-base">Start Exam <ArrowRight size={18} /></button>
							<button type="button" disabled aria-label="Start Quiz (coming soon)" className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-[#005b6b] px-5 text-sm font-bold text-white opacity-45 sm:h-[58px] sm:px-7 sm:text-base">Start Quiz <ArrowRight size={18} /></button>
							<button type="button" disabled aria-label="View All Modules (coming soon)" className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full border border-[#005b6b] px-5 text-sm font-bold text-[#005b6b] opacity-45 sm:h-[58px] sm:px-7 sm:text-base">View All Modules <ArrowRight size={18} /></button>
						</div>
						<div className="mt-8 grid w-full max-w-[680px] grid-cols-3 overflow-hidden rounded-2xl border border-[#c9dfe2] bg-white shadow-[0_8px_24px_rgba(0,91,107,0.12)] sm:mt-11"><Stat value="0/0" label="Quizzes completed" /><Stat value={`0/${tracks.length}`} label="Exams completed" className="border-l border-[#c9dfe2]" /><Stat value={tracks.length} label="Modules left" className="border-l border-[#c9dfe2]" /></div>
					</div>
					<div className="relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[380px] sm:max-w-[470px]">
						<div aria-hidden="true" className="ccna-logo-circle absolute h-[270px] w-[270px] rounded-full bg-[#e4f0f1] sm:h-[356px] sm:w-[356px]" /><div aria-hidden="true" className="absolute h-[250px] w-[250px] rounded-full border border-[#c6283d]/20 sm:h-[330px] sm:w-[330px]" />
						<img src={CCNPCollaborationBadge} alt="CCNP Collaboration certification badge" className="relative z-10 h-[210px] w-[210px] object-contain transition-transform duration-300 hover:scale-105 sm:h-[270px] sm:w-[270px]" />
						<ScoreRotationCard quizScore={null} examScore={null} accentClassName="text-[#b42335]" />
						<button type="button" onClick={() => setIsResultsNoticeOpen((open) => !open)} aria-label={isResultsNoticeOpen ? "Close results reminder" : "Open results reminder"} aria-expanded={isResultsNoticeOpen} className="absolute right-[12%] top-[2%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#005b6b] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition hover:text-[#b42335]"><FileQuestion size={21} /></button>
						{isResultsNoticeOpen && <div className="absolute bottom-0 right-0 z-30 flex w-[210px] flex-col rounded-2xl border border-[#e4eaf5] bg-white p-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:right-[-2%] sm:w-[275px] sm:p-4"><button type="button" onClick={() => setIsResultsNoticeOpen(false)} aria-label="Close results reminder" className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#64708a] hover:bg-[#fff4f3] hover:text-[#b42335]"><X size={16} /></button><strong className="pr-7 text-sm text-[#005b6b]">CCNP Collaboration updates</strong><p className="mt-2 text-sm leading-snug text-[#64708a]">Your quiz and exam results will appear here when they become available.</p><span className="mt-2 text-xs text-[#7c89a1]">{tracks.length} exam tracks · Coming soon</span></div>}
					</div>
				</div>
			</ProgramBackgroundParticles>
			<div className="border-y border-[#c6283d]/10 bg-[#f0f7f7] px-6 py-10 text-center sm:py-12"><p className="text-xl font-bold tracking-tight text-[#071126] sm:text-[28px]">Build advanced skills in <span className="text-[#005b6b]">collaboration core.</span></p></div>
			<section id="course-tracks" className="scroll-mt-8 bg-[#f5f9f9]"><div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_353px] lg:px-14 lg:py-14">
				<div><div className="mb-6 flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-bold sm:text-[21px]">Course modules</h2><span className="text-sm text-[#7c89a1]">{tracks.length} exam tracks · 1 core · {concentrationCount} concentration</span></div><div className="space-y-3">{tracks.map((track, index) => { const isActive = activeTrackIndex === index; return <article key={track.code} className={`overflow-hidden rounded-[18px] border bg-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)] ${isActive ? "border-[#c6283d]/50 shadow-[0_8px_20px_rgba(198,40,61,0.08)]" : "border-[#d6e5e7]"}`}><button type="button" onClick={() => setActiveTrackIndex(index)} aria-expanded={isActive} className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border text-sm font-bold ${isActive ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#c9dfe2] bg-[#edf5f6] text-[#005b6b]"}`}>{index + 1}</span><span className="min-w-0 flex-1"><strong className="block text-base text-[#111a2d] sm:text-[17px]">{track.name}</strong><span className="mt-1 block text-sm text-[#8a96aa]">{track.code} · {track.type}</span></span>{isActive ? <Check className="shrink-0 text-[#c6283d]" size={19} /> : <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}</button>{isActive && <div className="border-t border-[#e2ecec] px-6 pb-5 pt-4 sm:pl-[91px]"><p className="text-sm leading-6 text-[#66738d]">{track.summary}</p><Link to={courseDetailsPath} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#005b6b] hover:text-[#b42335]"><BookOpen size={16} /> Explore course content <ArrowRight size={15} /></Link></div>}</article>; })}</div></div>
				<aside className="space-y-5"><div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6"><div className="mb-4 flex items-center gap-3"><BookOpen className="text-[#005b6b]" size={21} /><h2 className="text-xl font-bold">Learning focus</h2></div><ul className="space-y-3">{focusAreas.map((area) => <li key={area} className="flex items-center gap-3 text-sm font-medium text-[#334454]"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f3f4] text-[#005b6b]"><Check size={17} /></span>{area}</li>)}</ul><p className="mt-5 border-t border-[#e2ecec] pt-4 text-xs text-[#7c89a1]">{tracks.length} exam tracks · Self-paced course details</p><Link to={courseDetailsPath} className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#005b6b] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition hover:-translate-y-0.5 hover:bg-[#004653]">View Course Details <ArrowRight size={17} /></Link></div><div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white p-3"><img src={CCNPCollaborationBadge} alt="" aria-hidden="true" className="mx-auto h-44 w-full object-contain" /><p className="pb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#7c89a1]">Cisco certification path</p></div></aside>
			</div></section>
		</main>
	);
}
