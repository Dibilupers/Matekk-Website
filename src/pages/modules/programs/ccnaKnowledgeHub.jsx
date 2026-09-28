import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";

const curriculum = [
	{
		number: "1.0",
		title: "Network Fundamentals",
		description: "Learn network models, devices, addressing, and essential services.",
		tutorials: [
			{ number: "1.1", title: "OSI Model Tutorial", duration: "6 min", summary: "Understand seven layers and how network communication flows." },
			{ number: "1.2", title: "Network Topologies and WAN Tutorial", duration: "8 min", summary: "Compare common network designs and wide area connections." },
			{ number: "1.3", title: "Network Devices, Interfaces, and Cabling", duration: "7 min", summary: "Identify key switches, routers, interfaces, and network media." },
			{ number: "1.4", title: "TCP and UDP Tutorial", duration: "6 min", summary: "Compare reliable TCP with connectionless UDP transport services." },
			{ number: "1.5", title: "IPv4 Addressing and Subnetting Made Easy", duration: "10 min", summary: "Calculate subnets, host ranges, and IPv4 network boundaries." },
			{ number: "1.6", title: "IPv6 Addressing Tutorial", duration: "8 min", summary: "Plan IPv6 addresses, prefixes, and basic network communication." },
			{ number: "Extra", title: "Cisco Command Line Interface CLI", duration: "7 min", summary: "Practice essential Cisco commands for configuring network devices." },
			{ number: "Extra", title: "Cisco Router Boot Sequence Tutorial", duration: "6 min", summary: "Follow router startup stages and configuration loading behavior." },
			{ number: "Extra", title: "Spine-Leaf Architecture Tutorial", duration: "8 min", summary: "Explore scalable data center fabric and leaf-spine design." },
			{ number: "Extra", title: "Wireless and Hypervisor Fundamentals", duration: "8 min", summary: "Review wireless fundamentals, virtualization, and hypervisor types overview." },
		],
	},
	{
		number: "2.0",
		title: "Network Access",
		description: "Configure VLANs, trunks, EtherChannel, spanning tree, and wireless.",
		tutorials: [
			{ number: "2.1", title: "Virtual Local Area Networks (VLANs)", duration: "8 min", summary: "Segment broadcast domains and organize devices using VLANs." },
			{ number: "2.2", title: "Inter-Switch Connectivity and 802.1Q Trunking", duration: "9 min", summary: "Carry multiple VLANs between switches using 802.1Q trunks." },
			{ number: "2.3", title: "CDP and LLDP Discovery Protocols", duration: "6 min", summary: "Discover neighboring Cisco and standards-based network devices automatically." },
			{ number: "2.4", title: "EtherChannel and LACP Tutorial", duration: "8 min", summary: "Bundle switch links into resilient, higher-bandwidth connection groups." },
			{ number: "2.5", title: "Spanning Tree Protocol (STP) Tutorial", duration: "9 min", summary: "Prevent switching loops by understanding spanning tree operation." },
			{ number: "2.6", title: "Rapid PVST+ and Root Port Election", duration: "8 min", summary: "Understand rapid spanning tree root port selection process." },
			{ number: "2.7", title: "Wireless LAN Architecture and Access Points", duration: "10 min", summary: "Understand wireless LAN components, access points, and architecture." },
		],
	},
];

function slugify(value) {
	return value.toLowerCase().replaceAll(" ", "-");
}

function TutorialCard({ number, title, duration, summary, isScrollable }) {
	return (
		<Link
			to={`/modules/programs/ccna/knowledge-hub/${slugify(title)}`}
			className={`group flex min-h-[190px] flex-col justify-between rounded-xl border border-[#d7d7d7] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#2474df] hover:shadow-[0_10px_24px_rgba(31,91,180,0.12)] ${
				isScrollable ? "w-[min(82vw,300px)] shrink-0 snap-start sm:w-[290px]" : "w-full"
			}`}
		>
			<div>
				<span className="inline-flex rounded-full bg-[#eff4ff] px-3 py-1 text-xs font-bold text-[#2853df]">
					{number}
				</span>
				<strong className="mt-3 block text-base leading-snug text-[#111a2d] underline decoration-transparent transition group-hover:text-[#176fe0] group-hover:decoration-current sm:text-lg">
					{title}
				</strong>
				<p className="mt-3 text-sm leading-5 text-[#71819b]">{summary}</p>
			</div>
			<span className="mt-5 flex items-center gap-1.5 text-sm text-[#71819b]">
				<Clock size={15} /> {duration} read
				<ArrowRight size={15} className="ml-auto transition group-hover:translate-x-1 group-hover:text-[#176fe0]" />
			</span>
		</Link>
	);
}

function CurriculumSection({ section, searchQuery }) {
	const trackRef = useRef(null);
	const isScrollable = section.tutorials.length > 6;
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
		<section className="mt-12 first:mt-10" aria-labelledby={`curriculum-${section.number}`}>
			<div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#e0e7f1] pb-4">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2853df]">{section.number}</p>
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
								className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe5f5] bg-white text-[#2853df] transition hover:border-[#2853df] hover:bg-[#eff4ff]"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								type="button"
								onClick={() => scrollTrack(1)}
								aria-label={`Scroll ${section.title} subjects right`}
								className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe5f5] bg-white text-[#2853df] transition hover:border-[#2853df] hover:bg-[#eff4ff]"
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
						? "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-5 pr-1 [scrollbar-color:#b9c9e8_transparent] [scrollbar-width:thin] touch-pan-x"
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
					<TutorialCard key={tutorial.title} {...tutorial} isScrollable={isScrollable} />
				))}
			</div>
		</section>
	);
}

export default function CCNAKnowledgeHub() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<main className="min-h-screen bg-white text-[#111a2d]">
			<header className="border-y border-[#dddddd] bg-[#fafafa] px-5 py-10 text-center sm:py-14">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
					Explore the <span className="text-[#1976e5]">CCNA Knowledge</span> hub.
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
						className="h-10 w-full rounded-full border border-[#cfcfcf] bg-white pl-10 pr-4 text-center text-sm outline-none focus:border-[#1976e5]"
					/>
				</label>
			</header>

			<div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-10 sm:py-10 lg:px-14">
				<Link
					to="/modules/programs/ccna"
					className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-[#176fe0] hover:underline"
				>
					<ArrowLeft size={16} /> Back to dashboard
				</Link>

				<Link
					to="/modules/programs/ccna/knowledge-hub/spine-leaf-architecture-tutorial"
					className="group mt-5 grid overflow-hidden rounded-2xl border border-[#dbe5f5] bg-[#f5f8ff] transition hover:border-[#9cb8ed] hover:shadow-[0_12px_28px_rgba(31,91,180,0.12)] sm:grid-cols-[0.8fr_1.2fr]"
				>
					<div className="flex min-h-40 items-center justify-center bg-[#e7efff] p-6 sm:min-h-48">
						<div className="grid grid-cols-3 items-center gap-4 text-center text-xs font-semibold text-[#2853df]">
							<span className="rounded-lg bg-white px-3 py-2 shadow-sm">Leaf</span>
							<span className="rounded-lg bg-[#2853df] px-3 py-2 text-white shadow-sm">Spine</span>
							<span className="rounded-lg bg-white px-3 py-2 shadow-sm">Leaf</span>
						</div>
					</div>
					<div className="flex flex-col justify-center p-6 sm:p-8">
						<span className="text-sm font-semibold text-[#2853df]">Featured tutorial · 1.0 Network Fundamentals</span>
						<strong className="mt-2 text-xl leading-tight text-[#111a2d] transition group-hover:text-[#176fe0] sm:text-2xl">
							Spine-Leaf Architecture Tutorial
						</strong>
						<span className="mt-3 flex items-center gap-1.5 text-sm text-[#71819b]">
							<Clock size={15} /> 8 min read
							<ArrowRight size={16} className="ml-auto transition group-hover:translate-x-1" />
						</span>
					</div>
				</Link>

				{curriculum.map((section) => (
					<CurriculumSection key={section.number} section={section} searchQuery={searchQuery} />
				))}
				{curriculum.every((section) =>
					section.tutorials.every((tutorial) =>
						`${tutorial.number} ${tutorial.title} ${section.title}`
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) === false,
					),
				) && (
					<p className="mt-10 rounded-xl border border-dashed border-[#cfd9e8] p-6 text-center text-sm text-[#71819b]">
						No subjects match “{searchQuery}”.
					</p>
				)}
			</div>
		</main>
	);
}
