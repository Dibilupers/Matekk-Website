import { ArrowLeft, ArrowRight, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";

const tutorials = [
	"1.1 OSI Model Tutorial",
	"1.2 TCP and UDP Tutorial",
	"1.3 WAN Tutorial",
	"1.4 Cisco Command Line Interface CLI",
	"1.5 Cisco Router Boot Sequence Tutorial",
	"1.6 Spine-Leaf Architecture Tutorial",
];

function TopologyPreview() {
	return (
		<div className="relative h-52 overflow-hidden rounded-xl bg-[#dbe8ff] sm:h-64">
			<div className="absolute left-[18%] top-[46%] h-px w-[55%] bg-[#3476d7]" />
			<div className="absolute left-[48%] top-[46%] h-16 w-px bg-[#3476d7]" />
			<div className="absolute left-[20%] top-[35%] h-5 w-8 -skew-x-12 rounded-sm bg-[#0b76bd] shadow-[0_3px_0_#073e72]" />
			<div className="absolute left-[48%] top-[40%] h-6 w-10 -skew-x-12 rounded-sm bg-[#0b76bd] shadow-[0_3px_0_#073e72]" />
			<div className="absolute left-[50%] top-[13%] h-5 w-8 rounded-sm bg-[#1688c4] shadow-[0_3px_0_#073e72]" />
			<div className="absolute left-[49%] top-[75%] h-5 w-8 rounded-sm bg-[#ed3c3c] shadow-[0_3px_0_#8f2020]" />
			<div className="absolute right-[18%] top-[35%] h-7 w-9 rounded-sm bg-[#1688c4] shadow-[0_3px_0_#073e72]" />
			<span className="absolute left-[17%] top-[20%] text-[9px] font-bold text-[#071126]">Client</span>
			<span className="absolute left-[48%] top-[3%] text-[9px] font-bold text-[#071126]">DHCP Server</span>
			<span className="absolute right-[8%] top-[20%] text-[9px] font-bold text-[#071126]">Trusted interface</span>
			<span className="absolute left-[46%] bottom-[2%] text-[9px] font-bold text-[#071126]">Rogue DHCP Server</span>
			<span className="absolute left-[47%] top-[53%] text-[18px] font-bold text-[#df3030]">×</span>
			<span className="absolute right-[26%] top-[21%] text-sm font-bold text-[#159447]">✓</span>
		</div>
	);
}

function TutorialCard({ title }) {
	return (
		<Link
			to={`/modules/programs/ccna/knowledge-hub/${title.toLowerCase().replaceAll(" ", "-")}`}
			className="group flex min-h-[164px] flex-col justify-between rounded-xl border border-[#d7d7d7] bg-white p-6 transition hover:-translate-y-1 hover:border-[#2474df] hover:shadow-[0_10px_24px_rgba(31,91,180,0.12)] sm:min-h-[180px]"
		>
			<strong className="text-base leading-snug text-[#111111] underline decoration-transparent transition group-hover:text-[#176fe0] group-hover:decoration-current sm:text-lg">{title}</strong>
			<span className="flex items-center gap-1 text-xs text-[#6f6f6f] sm:text-sm"><Clock size={14} /> 6 min read · Popular</span>
		</Link>
	);
}

export default function CCNAKnowledgeHub() {
	return (
		<main className="min-h-screen bg-white text-[#111111]">
			<header className="border-y border-[#dddddd] bg-[#fafafa] px-5 py-10 text-center sm:py-14">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Explore the <span className="text-[#1976e5]">CCNA Knowledge</span> hub.</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#555555] sm:text-base">Learn practical networking concepts, troubleshooting techniques, and architecture patterns to build stronger CCNA foundations.</p>
				<label className="relative mx-auto mt-6 block max-w-[360px]">
					<Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
					<input type="search" placeholder="Search for CCNP" className="h-10 w-full rounded-full border border-[#cfcfcf] bg-white pl-10 pr-4 text-center text-sm outline-none focus:border-[#1976e5]" />
				</label>
			</header>

			<section className="mx-auto max-w-[1320px] px-5 py-8 sm:px-10 sm:py-10 lg:px-14">
				<Link to="/modules/programs/ccna" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-[#176fe0] hover:underline"><ArrowLeft size={16} /> Back to dashboard</Link>
				<Link to="/modules/programs/ccna/knowledge-hub/spine-leaf-architecture-tutorial" className="group grid overflow-hidden rounded-xl border border-[#cfcfcf] bg-white shadow-sm transition hover:shadow-md md:grid-cols-[1.1fr_1fr]">
					<TopologyPreview />
					<div className="flex flex-col justify-center gap-3 p-7 sm:p-10">
						<span className="text-sm font-semibold text-[#333333] sm:text-base">Switching &amp; Routing</span>
						<strong className="text-2xl leading-tight sm:text-3xl">Spine-Leaf Architecture Tutorial</strong>
						<span className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#666666] sm:text-sm"><span>8 min read · Updated Sep 2026</span><span className="inline-flex items-center gap-1 rounded-full bg-[#1f77e8] px-5 py-2.5 font-semibold text-white">Read Tutorial <ArrowRight size={14} /></span></span>
					</div>
				</Link>

				<div className="mt-10 flex items-center justify-between border-b border-[#e5e5e5] pb-4">
					<h2 className="text-xl font-bold sm:text-2xl">1.0 Network Fundamentals</h2>
					<span className="text-sm text-[#777777]">6 tutorials</span>
				</div>
				<div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{tutorials.map((tutorial) => <TutorialCard key={tutorial} title={tutorial} />)}
				</div>
			</section>
		</main>
	);
}
