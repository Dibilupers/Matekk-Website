import { useRef, useState } from "react";
import {
	ArrowLeft,
	ArrowLeftRight,
	ArrowRight,
	Activity,
	Cable,
	ChevronLeft,
	ChevronRight,
	Clock,
	GitFork,
	Grid2X2,
	Gauge,
	Hash,
	KeyRound,
	Layers,
	ListChecks,
	LockKeyhole,
	Eye,
	Fingerprint,
	ShieldAlert,
	Workflow,
	ChefHat,
	Braces,
	Sparkles,
	Webhook,
	Monitor,
	Network,
	Power,
	RefreshCw,
	Router,
	Search,
	Share2,
	ScrollText,
	Terminal,
	Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";

const RECENT_TUTORIAL_KEY = "matekk-ccna-recent-tutorial";

const curriculum = [
	{
		number: "1.0",
		title: "Network Fundamentals",
		description: "Learn foundational networking, addressing, device setup, and architecture.",
		tutorials: [
			{ number: "1.1", title: "OSI Model Tutorial", duration: "6 min", summary: "Understand seven layers and how network communication flows." },
			{ number: "1.2", title: "TCP and UDP Tutorial", duration: "18 min", summary: "Compare TCP and UDP, including features, handshakes, and connection teardown." },
			{ number: "1.3", title: "WAN Tutorial", duration: "12 min", summary: "Learn WAN services, provider links, devices, PPP, HDLC, and packet switching." },
			{ number: "1.4", title: "Cisco Command Line Interface CLI", duration: "8 min", summary: "Understand Cisco IOS command modes, prompts, and configuration navigation." },
			{ number: "1.5", title: "Cisco Router Boot Sequence Tutorial", duration: "8 min", summary: "Follow router startup, memory roles, IOS selection, and configuration loading." },
			{ number: "1.6", title: "Spine-Leaf Architecture Tutorial", duration: "8 min", summary: "Explore scalable data center fabric and leaf-spine design." },
			{ number: "1.7", title: "Subnetting Tutorial - Subnetting Made Easy", duration: "12 min", summary: "Read prefixes and calculate subnet boundaries, network bits, and host ranges." },
			{ number: "1.8", title: "Wireless Tutorial", duration: "18 min", summary: "Learn WLAN operation, Wi-Fi architecture, radio basics, security, and interference." },
			{ number: "1.9", title: "IPv6 Tutorial", duration: "14 min", summary: "Read IPv6 addresses, abbreviations, address types, prefixes, and scopes." },
			{ number: "1.10", title: "Hypervisor type 1 and 2 Tutorial (on digitaltut.com)", duration: "10 min", summary: "Compare hypervisor types, virtual machines, virtual switches, and paravirtualization." },
		],
	},
	{
		number: "2.0",
		title: "Network Access",
		description: "Learn VLANs, inter-VLAN routing, spanning tree, VTP, and EtherChannel.",
		tutorials: [
			{ number: "2.1", title: "Virtual Local Area Network VLAN Tutorial", duration: "8 min", summary: "Segment broadcast domains and organize devices using VLANs." },
			{ number: "2.2", title: "InterVLAN Routing Tutorial", duration: "10 min", summary: "Route traffic between VLANs using routers or multilayer switches." },
			{ number: "2.3", title: "Spanning Tree Protocol STP Tutorial", duration: "9 min", summary: "Prevent Layer 2 loops by understanding spanning tree operation." },
			{ number: "2.4", title: "STP Root Port Election Tutorial", duration: "8 min", summary: "Learn how spanning tree selects the best root path." },
			{ number: "2.5", title: "Rapid Spanning Tree Protocol RSTP Tutorial", duration: "9 min", summary: "Learn faster convergence using Rapid Spanning Tree Protocol." },
			{ number: "2.6", title: "VLAN Trunking Protocol VTP Tutorial", duration: "8 min", summary: "Understand how VTP distributes VLAN information across switches." },
			{ number: "2.7", title: "EtherChannel Tutorial", duration: "8 min", summary: "Bundle switch links into resilient, higher-bandwidth connection groups." },
		],
	},
	{
		number: "3.0",
		title: "IP Connectivity",
		description: "Explore routing decisions, dynamic routing protocols, and gateway redundancy.",
		tutorials: [
			{ number: "3.1", title: "How a Router Makes a Forwarding Decision", duration: "8 min", summary: "Follow how a router uses the routing table and longest-prefix match to forward packets." },
			{ number: "3.2", title: "OSPF Tutorial", duration: "12 min", summary: "Learn how OSPF discovers routes and selects paths within an autonomous system." },
			{ number: "3.3", title: "EIGRP Tutorial", duration: "10 min", summary: "Understand EIGRP neighbors, metrics, and route selection." },
			{ number: "3.4", title: "Hot Standby Router Protocol HSRP Tutorial", duration: "8 min", summary: "Provide a resilient default gateway with an active and standby router." },
			{ number: "3.5", title: "Gateway Load Balancing Protocol GLBP Tutorial", duration: "8 min", summary: "Learn how GLBP provides gateway redundancy while sharing forwarding load." },
		],
	},
	{
		number: "4.0",
		title: "IP Services",
		description: "Review the services that support addressing, time, monitoring, logging, QoS, and remote access.",
		tutorials: [
			{ number: "4.1", title: "Network Address Translation NAT Tutorial", duration: "14 min", summary: "Learn static NAT, dynamic address pools, PAT overload, address roles, and translation behavior." },
			{ number: "4.2", title: "Network Time Protocol NTP Tutorial", duration: "7 min", summary: "Synchronize network device clocks for consistent logs and operations." },
			{ number: "4.3", title: "DHCP Tutorial", duration: "12 min", summary: "Learn DORA, lease renewal, DHCP relay, address conflicts, and Cisco IOS DHCP server configuration." },
			{ number: "4.4", title: "Simple Network Management Protocol SNMP Tutorial", duration: "12 min", summary: "Learn SNMP managers, agents, MIBs, polling, notifications, versions, and secure Cisco IOS configuration." },
			{ number: "4.5", title: "Syslog Tutorial", duration: "10 min", summary: "Interpret syslog message fields and severity levels, compare logging destinations, and configure centralized Cisco IOS logging." },
			{ number: "4.6", title: "Forwarding per-hop behavior PHB for QoS Tutorial", duration: "12 min", summary: "Understand DSCP, classification, marking, queuing, congestion management, policing, and shaping." },
			{ number: "4.7", title: "Configure SSH for Remote Access on Cisco Router", duration: "12 min", summary: "Configure RSA keys, local authentication, SSH-only VTY access, and verify access from a Cisco device or PC." },
		],
	},
	{
		number: "5.0",
		title: "Security Fundamentals",
		description: "Build a foundation in network security concepts, access control, and Layer 2 protections.",
		tutorials: [
			{ number: "5.1", title: "Key Security Concepts Tutorial", duration: "8 min", summary: "Review core security principles, threats, vulnerabilities, and risk." },
			{ number: "5.2", title: "Access List Tutorial", duration: "14 min", summary: "Configure standard, extended, and named ACLs; apply directionally; calculate wildcard masks; and manage entries." },
			{ number: "5.3", title: "Layer 2 Threats and Security Features", duration: "14 min", summary: "Understand DHCP spoofing, VLAN hopping, ARP spoofing, and MAC flooding with switch mitigations." },
			{ number: "5.4", title: "AAA TACACS+ and RADIUS Tutorial", duration: "16 min", summary: "Understand Authentication, Authorization, Accounting, TACACS+ and RADIUS, method lists, fallback, and login examples." },
			{ number: "5.5", title: "Port-Security Tutorial", duration: "14 min", summary: "Configure static and sticky secure MACs, maximum addresses, violation actions, verification, and recovery." },
			{ number: "5.6", title: "DHCP Snooping Tutorial", duration: "12 min", summary: "Enable snooping for selected VLANs, trust the authorized DHCP server path, inspect client bindings, and troubleshoot rogue-server filtering." },
		],
	},
	{
		number: "6.0",
		title: "Automation and Programmability",
		description: "Discover software-defined networking, configuration tools, data formats, AI, and APIs.",
		tutorials: [
			{ number: "6.1", title: "What is SDN?", duration: "7 min", summary: "Explore software-defined networking and the separation of control and data planes." },
			{ number: "6.2", title: "Puppet Tutorial", duration: "8 min", summary: "Learn how Puppet automates and manages infrastructure configuration." },
			{ number: "6.3", title: "Chef Tutorial", duration: "8 min", summary: "Understand infrastructure automation with Chef resources and recipes." },
			{ number: "6.4", title: "Ansible Tutorial", duration: "8 min", summary: "Automate device and infrastructure tasks using Ansible playbooks." },
			{ number: "6.5", title: "JSON Tutorial", duration: "6 min", summary: "Read the key-value and array structures used to exchange network data." },
			{ number: "6.6", title: "Generative AI vs Predictive AI Tutorial", duration: "7 min", summary: "Compare generative and predictive AI in the context of the CCNA v1.1 topic." },
			{ number: "6.7", title: "REST API Tutorial", duration: "8 min", summary: "Learn how REST APIs expose network resources through HTTP requests and responses." },
		],
	},
];

function slugify(value) {
	return value.toLowerCase().replaceAll(" ", "-");
}

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

const networkFundamentalsLogos = {
	"OSI Model Tutorial": { Icon: Layers, style: "bg-[#116d57] text-[#e0f5ee]" },
	"TCP and UDP Tutorial": { Icon: ArrowLeftRight, style: "bg-[#5146b5] text-[#efedff]" },
	"WAN Tutorial": { Icon: Router, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Cisco Command Line Interface CLI": { Icon: Terminal, style: "bg-[#5146b5] text-[#efedff]" },
	"Cisco Router Boot Sequence Tutorial": { Icon: Power, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Spine-Leaf Architecture Tutorial": { Icon: Network, style: "bg-[#5146b5] text-[#efedff]" },
	"Subnetting Tutorial - Subnetting Made Easy": { Icon: Grid2X2, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Wireless Tutorial": { Icon: Wifi, style: "bg-[#5146b5] text-[#efedff]" },
	"IPv6 Tutorial": { Icon: Hash, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Hypervisor type 1 and 2 Tutorial (on digitaltut.com)": { Icon: Monitor, style: "bg-[#5146b5] text-[#efedff]" },
};

const networkAccessLogos = {
	"Virtual Local Area Network VLAN Tutorial": { Icon: Grid2X2, style: "bg-[#116d57] text-[#e0f5ee]" },
	"InterVLAN Routing Tutorial": { Icon: Router, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Spanning Tree Protocol STP Tutorial": { Icon: GitFork, style: "bg-[#5146b5] text-[#efedff]" },
	"STP Root Port Election Tutorial": { Icon: Network, style: "bg-[#5146b5] text-[#efedff]" },
	"Rapid Spanning Tree Protocol RSTP Tutorial": { Icon: RefreshCw, style: "bg-[#116d57] text-[#e0f5ee]" },
	"VLAN Trunking Protocol VTP Tutorial": { Icon: Share2, style: "bg-[#5146b5] text-[#efedff]" },
	"EtherChannel Tutorial": { Icon: Cable, style: "bg-[#116d57] text-[#e0f5ee]" },
};

const ipConnectivityLogos = {
	"How a Router Makes a Forwarding Decision": { Icon: Router, style: "bg-[#116d57] text-[#e0f5ee]" },
	"OSPF Tutorial": { Icon: Network, style: "bg-[#5146b5] text-[#efedff]" },
	"EIGRP Tutorial": { Icon: GitFork, style: "bg-[#5146b5] text-[#efedff]" },
	"Hot Standby Router Protocol HSRP Tutorial": { Icon: RefreshCw, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Gateway Load Balancing Protocol GLBP Tutorial": { Icon: Share2, style: "bg-[#5146b5] text-[#efedff]" },
};

const ipServicesLogos = {
	"Network Address Translation NAT Tutorial": { Icon: ArrowLeftRight, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Network Time Protocol NTP Tutorial": { Icon: Clock, style: "bg-[#5146b5] text-[#efedff]" },
	"DHCP Tutorial": { Icon: Router, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Simple Network Management Protocol SNMP Tutorial": { Icon: Activity, style: "bg-[#5146b5] text-[#efedff]" },
	"Syslog Tutorial": { Icon: ScrollText, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Forwarding per-hop behavior PHB for QoS Tutorial": { Icon: Gauge, style: "bg-[#5146b5] text-[#efedff]" },
	"Configure SSH for Remote Access on Cisco Router": { Icon: LockKeyhole, style: "bg-[#116d57] text-[#e0f5ee]" },
};

const securityFundamentalsLogos = {
	"Key Security Concepts Tutorial": { Icon: KeyRound, style: "bg-[#5146b5] text-[#efedff]" },
	"Access List Tutorial": { Icon: ListChecks, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Layer 2 Threats and Security Features": { Icon: ShieldAlert, style: "bg-[#5146b5] text-[#efedff]" },
	"AAA TACACS+ and RADIUS Tutorial": { Icon: Fingerprint, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Port-Security Tutorial": { Icon: LockKeyhole, style: "bg-[#5146b5] text-[#efedff]" },
	"DHCP Snooping Tutorial": { Icon: Eye, style: "bg-[#116d57] text-[#e0f5ee]" },
};

const automationLogos = {
	"What is SDN?": { Icon: Network, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Puppet Tutorial": { Icon: Workflow, style: "bg-[#5146b5] text-[#efedff]" },
	"Chef Tutorial": { Icon: ChefHat, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Ansible Tutorial": { Icon: Terminal, style: "bg-[#5146b5] text-[#efedff]" },
	"JSON Tutorial": { Icon: Braces, style: "bg-[#116d57] text-[#e0f5ee]" },
	"Generative AI vs Predictive AI Tutorial": { Icon: Sparkles, style: "bg-[#5146b5] text-[#efedff]" },
	"REST API Tutorial": { Icon: Webhook, style: "bg-[#116d57] text-[#e0f5ee]" },
};

function TutorialCard({ number, title, duration, summary, isScrollable, sectionNumber, sectionTitle, onOpen }) {
	const logo = networkFundamentalsLogos[title]
		?? networkAccessLogos[title]
		?? ipConnectivityLogos[title]
		?? ipServicesLogos[title]
		?? securityFundamentalsLogos[title]
		?? automationLogos[title];
	const Logo = logo?.Icon;

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
				<div className="flex items-start justify-between gap-3">
					<span className="inline-flex rounded-full bg-[#e8f3f4] px-3 py-1 text-xs font-bold text-[#005b6b]">
						{number}
					</span>
					{Logo && (
						<span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${logo.style}`}>
							<Logo size={25} strokeWidth={2} />
						</span>
					)}
				</div>
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
		<main className="min-h-screen bg-white text-[#111a2d]">
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
