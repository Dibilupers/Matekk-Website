import { useState } from "react";
import {
	ArrowRight,
	Check,
	ChevronDown,
	ChevronRight,
	MessageSquare,
	Pencil,
	Settings,
} from "lucide-react";

const modules = [
	{
		title: "Network fundamentals",
		lessons: "6 lessons",
		status: "Completed",
	},
	{
		title: "Network access",
		lessons: "8 lessons",
		status: "4 of 8 read",
		lessonsList: [
			{ title: "VLANs & trunking", complete: true },
			{ title: "What is SDN?", complete: true },
			{ title: "DHCP snooping", tag: "Rogue DHCP" },
			{ title: "Dynamic ARP inspection" },
		],
	},
	{ title: "IP connectivity", lessons: "7 lessons", status: "Not started" },
	{ title: "IP services", lessons: "5 lessons", status: "Not started" },
	{
		title: "Security fundamentals",
		lessons: "6 lessons",
		status: "Not started",
	},
];

function Stat({ value, label }) {
	return (
		<div className="flex items-center gap-2.5 sm:gap-3">
			<strong className="text-[1.65rem] leading-none tracking-tight text-[#071126] sm:text-[2rem]">
				{value}
			</strong>
			<span className="max-w-20 text-xs leading-tight text-[#6f7d99] sm:text-sm">
				{label}
			</span>
		</div>
	);
}

function NetworkIllustration() {
	return (
		<div className="relative mx-auto h-[320px] w-full max-w-[440px] sm:h-[380px] sm:max-w-[470px]">
			<div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8efff] sm:h-[356px] sm:w-[356px]" />
			<div className="absolute left-1/2 top-1/2 z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f58e8] shadow-[0_18px_45px_rgba(47,88,232,0.2)] sm:h-[262px] sm:w-[262px]" />
			<div className="absolute left-1/2 top-[30%] z-20 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ffd8b0] sm:h-16 sm:w-16" />
			<div className="absolute left-1/2 top-[51%] z-20 flex h-16 w-24 -translate-x-1/2 items-end justify-center border-b-[14px] border-[#edf2ff] sm:h-20 sm:w-28">
				<div className="mb-2 h-11 w-16 rounded-md border-[6px] border-[#101b33] bg-[#4165ed] shadow-[0_0_0_3px_#f1f4ff] sm:h-12 sm:w-20">
					<div className="ml-2 mt-2 h-2 w-2 rounded-full bg-[#62e5a5]" />
					<div className="ml-6 -mt-2 h-1 w-7 bg-white/80" />
					<div className="ml-6 mt-1 h-1 w-5 bg-white/60" />
				</div>
			</div>
			<div className="absolute left-0 top-[31%] z-30 flex h-[94px] w-[128px] flex-col justify-center rounded-xl border border-[#e4eaf5] bg-white px-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:left-[-4px]">
				<strong className="text-xl leading-none text-[#2853df]">88%</strong>
				<span className="mt-2 text-sm leading-none text-[#15203a]">Quiz score</span>
				<span className="mt-2 text-sm leading-none tracking-[2px] text-[#f6a623]">★★★★★</span>
			</div>
			<div className="absolute right-0 top-[10%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#2f58e8] text-white shadow-lg"><Settings size={21} /></div>
			<div className="absolute right-[-4px] top-[44%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2f58e8] shadow-[0_8px_20px_rgba(15,35,75,0.1)]"><Pencil size={18} /></div>
			<div className="absolute right-[2%] top-[70%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#2f58e8] text-white shadow-lg"><MessageSquare size={19} /></div>
			<div className="absolute bottom-0 right-0 z-30 w-[238px] rounded-2xl border border-[#e4eaf5] bg-white p-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:right-[-2%] sm:w-[275px]">
				<strong className="text-sm text-[#2853df]">Emman R.</strong>
				<p className="mt-0.5 text-sm leading-snug text-[#64708a]">just passed the CCNA<br />mock exam!</p>
				<button className="mt-3 flex h-11 w-full items-center justify-center rounded-full bg-[#2f58e8] text-sm font-bold text-white">View result</button>
			</div>
		</div>
	);
}

function ModuleCard({ module, index, openSection, onToggle }) {
	const isOpen = openSection === index;

	return (
		<div className="overflow-hidden rounded-[18px] border border-[#e2e9f5] bg-white">
			<button
				type="button"
				onClick={() => onToggle(index)}
				className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
			>
				<span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-lg font-semibold ${index === 0 ? "bg-[#2f58e8] text-white" : "border border-[#dce7ff] bg-[#f5f8ff] text-[#2f58e8]"}`}>
					{index + 1}
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">{module.lessons} · {module.status}</span>
				</span>
				{isOpen ? <ChevronDown className="text-[#2f58e8]" size={19} /> : <ChevronRight className="text-[#91a0b9]" size={19} />}
			</button>
			{isOpen && module.lessonsList && (
				<div className="space-y-4 border-t border-[#e7edf7] px-6 pb-6 pt-5 sm:pl-[91px]">
					{module.lessonsList.map((lesson) => (
						<div key={lesson.title} className="flex items-center gap-3 text-[15px] text-[#66738d]">
							<span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${lesson.complete ? "border-[#2f58e8] bg-[#2f58e8] text-white" : "border-[#dce5f2] text-transparent"}`}>
								<Check size={13} strokeWidth={3} />
							</span>
							<span>{lesson.title}</span>
							{lesson.tag && <span className="ml-auto rounded-full bg-[#fff0df] px-2.5 py-1 text-xs font-semibold text-[#ed9b33]">{lesson.tag}</span>}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default function CCNA() {
	const [openSection, setOpenSection] = useState(1);

	return (
		<main className="min-h-screen bg-white text-[#071126]">
			<section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbe6ff] bg-[#f5f8ff] px-4 py-2 text-sm font-semibold text-[#2853df]">
							<span className="h-2 w-2 rounded-full bg-[#2f58e8]" /> Module 2 of 5 · Network Access
						</div>
						<h1 className="max-w-[700px] text-[2.65rem] font-bold leading-[1.08] tracking-[-1.5px] sm:text-6xl lg:text-[3.25rem] xl:text-[3.7rem]">
							Continue your path to <span className="text-[#2f58e8]">CCNA<br className="hidden sm:block" /> Certification.</span>
						</h1>
						<p className="mt-6 max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
							Cutting-edge ICT training built on real network topologies — from switching fundamentals to security hardening, taught by working engineers.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button className="flex h-[58px] items-center gap-2 rounded-full bg-[#2f58e8] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(47,88,232,0.16)]">Continue Lesson <ArrowRight size={18} /></button>
							<button className="h-[58px] rounded-full border border-[#2f58e8] px-7 text-base font-bold text-[#2f58e8]">View All Modules</button>
						</div>
						<div className="mt-11 flex flex-wrap gap-5 divide-x divide-[#dce5f2]">
							<Stat value="2/5" label="Modules complete" />
							<div className="pl-5 sm:pl-7"><Stat value="88%" label="Quiz average" /></div>
							<div className="pl-5 sm:pl-7"><Stat value="6" label="Lessons left" /></div>
						</div>
					</div>
					<NetworkIllustration />
				</div>
			</section>

			<div className="bg-[#eff4ff] py-12 text-center sm:py-14">
				<p className="text-2xl font-bold tracking-tight text-[#071126] sm:text-[28px]">Built on real <span className="text-[#2f58e8]">network topologies.</span></p>
			</div>

			<section className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_353px] lg:px-14 lg:py-14">
				<div>
					<div className="mb-6 flex items-center justify-between">
						<h2 className="text-xl font-bold sm:text-[21px]">Course modules</h2>
						<span className="text-sm text-[#7c89a1]">2 of 5 in progress</span>
					</div>
					<div className="space-y-3">
						{modules.map((module, index) => <ModuleCard key={module.title} module={module} index={index} openSection={openSection} onToggle={setOpenSection} />)}
					</div>
				</div>

				<aside className="space-y-5">
					<div className="flex items-center gap-5 rounded-[18px] border border-[#e2e9f5] p-6">
						<div className="relative h-16 w-16 rounded-full border-[7px] border-[#e4eaf4] border-r-[#2f58e8] border-t-[#2f58e8]">
							<span className="absolute inset-0 flex items-center justify-center text-[0px]" />
						</div>
						<div><strong className="text-3xl">40<small className="text-base">%</small></strong><p className="mt-1 text-sm text-[#7c89a1]">2 of 5 modules</p></div>
					</div>
					<div className="rounded-[18px] border border-[#e2e9f5] p-6">
						<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
						{[['Mock exam', 'Not taken'], ['Mock exam 1', '88%'], ['Mock exam 2', '76%'], ['Mock exam 3', 'Not taken']].map(([name, score]) => (
							<div key={name} className="flex items-center justify-between border-b border-[#e7edf7] py-3 text-base last:border-0"><span>{name}</span><strong className={score.includes('%') ? "text-[#2f58e8]" : "text-[#8b96a9]"}>{score}</strong></div>
						))}
						<button className="mt-4 h-11 w-full rounded-full bg-[#2f58e8] text-base font-bold text-white">Take next quiz</button>
					</div>
				</aside>
			</section>
		</main>
	);
}
