import { ChevronDown, Clock, Folder, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const sections = [
	{
		title: "Fundamentals",
		count: 6,
		items: ["OSI Model Tutorial", "TCP and UDP Tutorial", "Subnetting Made Easy", "JSON Tutorial", "WAN Tutorial", "Cisco Command Line Interface CLI"],
	},
	{
		title: "Switching & Routing",
		count: 7,
		items: ["Spine-Leaf Architecture", "InterVLAN Routing Tutorial", "EtherChannel Tutorial", "VLAN Trunking Protocol VTP", "STP Root Port Election", "Cisco Router Boot Sequence Tutorial", "Routing Protocols Explained"],
	},
	{
		title: "Network Services",
		count: 5,
		items: ["DHCP Snooping", "Dynamic ARP Inspection", "DNS Fundamentals", "NAT and PAT Tutorial", "SNMP Explained"],
	},
	{
		title: "Security Fundamentals",
		count: 6,
		items: ["Access Control Lists", "Port Security Tutorial", "AAA Authentication", "IPsec and VPNs", "Secure Management", "Threat Modeling Basics"],
	},
];

const articles = {
	"spine-leaf-architecture-tutorial": {
		title: "Spine-Leaf Architecture Tutorial",
		meta: "8 min read · Updated Sep 2026 · Networking Fundamentals",
		section: "Switching & Routing",
		intro: "Spine-leaf architecture is a modern network topology widely used in data centers and cloud environments. It's designed to offer improved scalability, high availability, and consistent low-latency communication, unlike traditional three-tiered hierarchical networks with separate core, distribution, and access layers.",
		body: "The spine layer consists of switches that perform routing and act as the core of the network. The leaf layer holds access switches that connect to servers, storage, and end-users, cutting hop count, reducing latency, and removing the bottlenecks common to three-tier designs.",
		tags: ["Data Center", "Topology", "CCNA", "Switching"],
	},
	"osi-model-tutorial": {
		title: "OSI Model Tutorial",
		meta: "6 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "The OSI model is a seven-layer framework for understanding how data moves between applications and network devices. Each layer has a focused responsibility, making complex communication easier to design, troubleshoot, and explain.",
		body: "When troubleshooting, move through the layers methodically: check the physical link first, then framing, addressing, transport behavior, and application services. This layered approach helps isolate faults without guessing.",
		tags: ["Fundamentals", "OSI", "Troubleshooting", "CCNA"],
	},
	"tcp-and-udp-tutorial": {
		title: "TCP and UDP Tutorial",
		meta: "6 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "TCP and UDP are transport-layer protocols with different tradeoffs. TCP prioritizes reliability and ordered delivery, while UDP minimizes overhead for applications that value speed and can handle loss themselves.",
		body: "Use TCP when sessions, acknowledgements, and retransmission matter. Use UDP for lightweight request-response traffic, streaming, voice, and other workloads where avoiding connection overhead is more important.",
		tags: ["TCP", "UDP", "Transport", "CCNA"],
	},
};

function slugify(value) {
	return value.toLowerCase().replaceAll(" ", "-");
}

function titleFromSlug(slug) {
	return slug
		.replaceAll("-", " ")
		.replace(/\b\w/g, (letter) => letter.toUpperCase())
		.replace(/\b(Osi|Tcp|Udp|Json|Dhcp|Dns|Nat|Snmp|Vtp|Stp|Cli|Ccnna?)\b/gi, (term) => term.toUpperCase());
}

function DiagramPlaceholder() {
	return (
		<div className="my-7 flex h-24 items-center justify-center rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] text-center text-sm text-[#8a99b2] sm:h-28">
			Traditional three-tier architecture vs. Spine-Leaf architecture
		</div>
	);
}

function TutorialSidebar({ activeSlug }) {
	return (
		<aside className="lg:sticky lg:top-6 lg:self-start">
			<label className="relative block">
				<Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71819b]" />
				<input type="search" placeholder="Filter tutorials..." className="h-12 w-full rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] pl-11 pr-4 text-base text-[#172642] outline-none focus:border-[#2f68d9]" />
			</label>
			<div className="mt-7 space-y-8">
				{sections.map((section) => (
					<div key={section.title}>
						<div className="flex items-center justify-between border-b border-[#dbe5f5] px-1 pb-4">
							<strong className="text-base text-[#111a2d]">{section.title}</strong>
							<span className="flex items-center gap-3 text-sm text-[#71819b]"><span>{section.count}</span><ChevronDown size={16} className="text-[#2f58e8]" /></span>
						</div>
						<div className="space-y-1 pt-2">
							{section.items.map((item) => {
								const slug = slugify(item);
								return (
									<Link key={item} to={`/modules/programs/ccna/knowledge-hub/${slug}`} className={`block rounded-lg px-2 py-2 text-base leading-snug transition ${activeSlug === slug ? "bg-[#eff4ff] font-semibold text-[#204ed0]" : "text-[#526584] hover:bg-[#f5f8ff] hover:text-[#204ed0]"}`}>{item}</Link>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</aside>
	);
}

export default function CCNAKnowledgeArticle() {
	const { articleSlug = "spine-leaf-architecture-tutorial" } = useParams();
	const article = articles[articleSlug] || {
		title: titleFromSlug(articleSlug),
		meta: "6 min read · Updated Sep 2026 · CCNA Knowledge",
		section: "Fundamentals",
		intro: "This CCNA learning module explains a practical networking concept through clear definitions, examples, and troubleshooting guidance.",
		body: "Review the key terms, connect them to real network behavior, and use the module checklist to reinforce your understanding before moving to the next lesson.",
		tags: ["CCNA", "Networking", "Study Guide"],
	};

	return (
		<main className="min-h-screen bg-white text-[#526584]">
			<div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-10 lg:px-14">
				<nav className="mb-6 flex flex-wrap items-center gap-2 text-sm sm:text-base" aria-label="Breadcrumb">
					<Link to="/modules/programs/ccna/knowledge-hub" className="font-semibold text-[#2259dc] hover:underline">Training</Link>
					<span>/</span>
					<Link to="/modules/programs/ccna/knowledge-hub" className="font-semibold text-[#2259dc] hover:underline">CCNA Knowledge</Link>
					<span>/</span>
					<span className="truncate text-[#8492a9]">{article.title}</span>
				</nav>
				<div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_375px] lg:gap-10">
					<article className="rounded-[24px] border border-[#dbe5f5] px-6 py-9 sm:px-10 sm:py-11">
						<div className="inline-flex items-center gap-2 rounded-full bg-[#f1f6ff] px-4 py-2 text-sm font-semibold text-[#2354d4]"><Folder size={15} /> CCNA Knowledge</div>
						<h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#071126] sm:text-5xl">{article.title}</h1>
						<p className="mt-4 flex items-center gap-2 text-base text-[#7b8ca7]"><Clock size={17} /> {article.meta}</p>
						<p className="mt-7 text-lg leading-[1.8] sm:text-xl">{article.intro}</p>
						<DiagramPlaceholder />
						<p className="text-lg leading-[1.8] sm:text-xl">{article.body}</p>
						<div className="mt-7 flex flex-wrap gap-3">{article.tags.map((tag) => <span key={tag} className="rounded-full border border-[#dbe5f5] bg-[#f8faff] px-4 py-2 text-sm text-[#3d5c88]">{tag}</span>)}</div>
					</article>
					<TutorialSidebar activeSlug={articleSlug} />
				</div>
			</div>
		</main>
	);
}
