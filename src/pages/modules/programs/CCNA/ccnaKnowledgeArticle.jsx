import { ChevronDown, Clock, Folder, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import CcnaKnowledgeModuleOne from "./ccnaKnowledgeModule1";
import CcnaKnowledgeModuleTwo from "./ccnaKnowledgeModule2";
import CcnaKnowledgeModuleThree from "./ccnaKnowledgeModule3";
import CcnaKnowledgeModuleFour from "./ccnaKnowledgeModule4";
import CcnaKnowledgeModuleFive from "./ccnaKnowledgeModule5";
import CcnaKnowledgeModuleSix from "./ccnaKnowledgeModule6";

const ccnaModuleOneSlugs = new Set([
	"spine-leaf-architecture-tutorial",
	"osi-model-tutorial",
	"tcp-and-udp-tutorial",
	"wan-tutorial",
	"cisco-command-line-interface-cli",
	"cisco-router-boot-sequence-tutorial",
	"subnetting-tutorial---subnetting-made-easy",
	"wireless-tutorial",
	"ipv6-tutorial",
	"hypervisor-type-1-and-2-tutorial-(on-digitaltut.com)",
]);

const sections = [
	{
		title: "Fundamentals",
		count: 10,
		items: [
			"OSI Model Tutorial",
			"TCP and UDP Tutorial",
			"WAN Tutorial",
			"Cisco Command Line Interface CLI",
			"Cisco Router Boot Sequence Tutorial",
			"Spine-Leaf Architecture Tutorial",
			"Subnetting Tutorial - Subnetting Made Easy",
			"Wireless Tutorial",
			"IPv6 Tutorial",
			"Hypervisor type 1 and 2 Tutorial (on digitaltut.com)",
		],
	},
	{
		title: "Switching & Routing",
		count: 7,
		items: ["Spine-Leaf Architecture", "Inter-Switch Connectivity and 802.1Q Trunking", "EtherChannel Tutorial", "VLAN Trunking Protocol VTP", "STP Root Port Election", "Cisco Router Boot Sequence Tutorial", "Routing Protocols Explained"],
	},
	{
		title: "Network Services",
		count: 6,
		items: ["DHCP Snooping", "Dynamic ARP Inspection", "DNS Fundamentals", "Network Address Translation NAT Tutorial", "Network Time Protocol NTP Tutorial", "SNMP Explained"],
	},
	{
		title: "Security Fundamentals",
		count: 6,
		items: ["Access Control Lists", "Port Security Tutorial", "AAA Authentication", "IPsec and VPNs", "Secure Management", "Threat Modeling Basics"],
	},
	{
		title: "Network Access",
		count: 7,
		items: [
			"Virtual Local Area Network VLAN Tutorial",
			"InterVLAN Routing Tutorial",
			"Spanning Tree Protocol STP Tutorial",
			"STP Root Port Election Tutorial",
			"Rapid Spanning Tree Protocol RSTP Tutorial",
			"VLAN Trunking Protocol VTP Tutorial",
			"EtherChannel Tutorial",
		],
	},
	{
		title: "IP Connectivity",
		count: 5,
		items: ["How a Router Makes a Forwarding Decision", "OSPF Tutorial", "EIGRP Tutorial", "Hot Standby Router Protocol HSRP Tutorial", "Gateway Load Balancing Protocol GLBP Tutorial"],
	},
];

const articles = {
	"network-time-protocol-ntp-tutorial": {
		title: "Network Time Protocol NTP Tutorial",
		meta: "12 min read · CCNA 4.2 · IP Services",
		section: "IP Services",
		intro: "Network Time Protocol (NTP) synchronizes clocks across networked devices. Consistent time helps administrators correlate logs, investigate incidents, compare events across routers and servers, and support time-dependent services.",
		body: "Learn NTP client/server and peer associations, the stratum hierarchy, UDP transport, Cisco IOS configuration, authentication, and how to verify synchronization and troubleshoot associations.",
		tags: ["CCNA 4.2", "NTP", "Time Synchronization", "IP Services"],
		contentType: "ntp",
	},
	"network-address-translation-nat-tutorial": {
		title: "Network Address Translation NAT Tutorial",
		meta: "14 min read · CCNA 4.1 · IP Services",
		section: "IP Services",
		intro: "Network Address Translation (NAT) changes IP address information as packets cross between networks. It commonly translates private inside addresses to public addresses for Internet access, and translates reply traffic back to the correct internal host.",
		body: "Learn inside and outside address terminology, static NAT, dynamic NAT, Port Address Translation (PAT), translation tables, pool behavior, and practical configuration concepts.",
		tags: ["CCNA 4.1", "NAT", "PAT", "IP Services"],
		contentType: "nat",
	},
	"gateway-load-balancing-protocol-glbp-tutorial": {
		title: "Gateway Load Balancing Protocol GLBP Tutorial",
		meta: "14 min read · CCNA 3.5 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Gateway Load Balancing Protocol (GLBP) provides first-hop redundancy and distributes gateway forwarding among multiple routers or multilayer switches. Hosts use one virtual IP address, while GLBP assigns different virtual MAC addresses so traffic can be forwarded by multiple active virtual forwarders.",
		body: "Learn the Active Virtual Gateway and Active Virtual Forwarder roles, ARP-based load sharing, GLBP election and failover, balancing algorithms, tracking, authentication, and IOS configuration.",
		tags: ["CCNA 3.5", "GLBP", "Gateway Redundancy", "Load Balancing"],
		contentType: "glbp",
	},
	"hot-standby-router-protocol-hsrp-tutorial": {
		title: "Hot Standby Router Protocol HSRP Tutorial",
		meta: "12 min read · CCNA 3.4 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Hot Standby Router Protocol (HSRP) provides first-hop redundancy for an IPv4 LAN. Multiple routers share a virtual IP address that hosts use as their default gateway; one router forwards traffic as the active router while another waits as the standby router.",
		body: "Learn why HSRP is needed, how virtual addresses and active/standby elections work, what happens during failure, and how HSRP states, timers, versions, and Cisco IOS configuration fit together.",
		tags: ["CCNA 3.4", "HSRP", "Gateway Redundancy", "IP Connectivity"],
		contentType: "hsrp",
	},
	"eigrp-tutorial": {
		title: "EIGRP Tutorial",
		meta: "12 min read · CCNA 3.3 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Enhanced Interior Gateway Routing Protocol (EIGRP) is an advanced distance-vector routing protocol. It discovers directly connected EIGRP neighbors, exchanges reachability information, and uses the Diffusing Update Algorithm (DUAL) to select loop-free routes and maintain eligible backups.",
		body: "Explore EIGRP neighbors and packet types, its neighbor/topology/routing tables, composite metrics, successor and feasible successor routes, and basic Cisco IOS configuration.",
		tags: ["CCNA 3.3", "EIGRP", "DUAL", "Routing"],
		contentType: "eigrp",
	},
	"ospf-tutorial": {
		title: "OSPF Tutorial",
		meta: "12 min read · CCNA 3.2 · IP Connectivity",
		section: "IP Connectivity",
		intro: "Open Shortest Path First (OSPF) is a standards-based link-state routing protocol. Routers running OSPF discover neighbors, describe their local links with link-state advertisements, build a shared link-state database for each area, and run the shortest-path-first calculation to choose routes.",
		body: "Follow how OSPF routers form adjacencies, exchange database information, select router IDs, calculate path cost, and use areas to scale a network.",
		tags: ["CCNA 3.2", "OSPF", "Link-State", "Routing"],
		contentType: "ospf",
	},
	"how-a-router-makes-a-forwarding-decision": {
		title: "How a Router Makes a Forwarding Decision",
		meta: "8 min read · CCNA 3.1 · IP Connectivity",
		section: "IP Connectivity",
		intro: "A router examines the destination IP address of each packet and consults its routing table to determine where the packet should go next. The table contains selected routes learned from connected networks, static configuration, and routing protocols.",
		body: "This lesson follows a packet through route installation and longest-prefix matching, then shows where administrative distance and protocol metrics fit into the process.",
		tags: ["CCNA 3.1", "Routing Table", "Longest-Prefix Match", "IP Connectivity"],
		contentType: "routing-decision",
	},
	"virtual-local-area-networks-(vlans)": {
		title: "Virtual Local Area Network (VLAN) Tutorial",
		meta: "8 min read · CCNA 2.1 · Network Access",
		section: "Network Access",
		intro: "A VLAN is a logical way to group switch ports into separate Layer 2 broadcast domains. Devices can belong to the same department or network group even when they connect to different switches or sit in different areas.",
		body: "VLANs make it easier to organize users by function, limit unnecessary broadcasts, and apply network policies consistently. A VLAN separates Layer 2 traffic; communication between different VLANs requires a Layer 3 device such as a router or multilayer switch.",
		tags: ["CCNA 2.1", "VLAN", "Switching", "Network Access"],
		contentType: "vlan",
	},
	"intervlan-routing-tutorial": {
		title: "Inter-VLAN Routing Tutorial",
		meta: "10 min read · CCNA 2.2 · Network Access",
		section: "Network Access",
		intro: "Devices in the same VLAN can exchange Layer 2 traffic, but devices in different VLANs need a Layer 3 gateway to route packets between their IP networks.",
		body: "Learn how router-on-a-stick and multilayer-switch SVIs provide inter-VLAN routing, then verify the VLAN, trunk, addressing, and gateway configuration.",
		tags: ["CCNA 2.2", "Inter-VLAN Routing", "802.1Q", "Network Access"],
		contentType: "intervlan",
	},
	"spanning-tree-protocol-stp-tutorial": {
		title: "Spanning Tree Protocol (STP) Tutorial",
		meta: "9 min read · CCNA 2.3 · Network Access",
		section: "Network Access",
		intro: "Spanning Tree Protocol (STP) prevents Layer 2 loops while keeping redundant switch links available as backups. It creates a loop-free logical topology by placing selected ports into a forwarding or non-forwarding role.",
		body: "Learn why loops are dangerous, how switches elect a root bridge and choose port roles, and how classic IEEE 802.1D STP reconverges after a link failure.",
		tags: ["CCNA 2.3", "STP", "Layer 2", "Network Access"],
		contentType: "stp",
	},
	"stp-root-port-election-tutorial": {
		title: "STP Root Port Election Tutorial",
		meta: "8 min read · CCNA 2.4 · Network Access",
		section: "Network Access",
		intro: "After STP elects the root bridge, every non-root switch must choose one root port: its best path toward the root. When multiple received BPDUs advertise equal-cost paths, STP uses a specific tie-break order to choose one port consistently.",
		body: "Work through path-cost comparisons, sender Bridge ID tie-breaks, and sender Port ID tie-breaks with practical switch examples.",
		tags: ["CCNA 2.4", "STP", "Root Port", "Network Access"],
		contentType: "stp-root-port",
	},
	"rapid-spanning-tree-protocol-rstp-tutorial": {
		title: "Rapid Spanning Tree Protocol (RSTP) Tutorial",
		meta: "9 min read · CCNA 2.5 · Network Access",
		section: "Network Access",
		intro: "Rapid Spanning Tree Protocol (RSTP), standardized as IEEE 802.1w and incorporated into the later 802.1D revision, improves Layer 2 recovery after topology changes. It retains loop prevention but adds port roles and proposal/agreement behavior that can bring suitable links into service faster than classic STP timers.",
		body: "Learn RSTP root, designated, alternate, and backup roles, the three RSTP port states, how a redundant path can become active, and what happens when RSTP interoperates with legacy STP.",
		tags: ["CCNA 2.5", "RSTP", "802.1w", "Network Access"],
		contentType: "rstp",
	},
	"vlan-trunking-protocol-vtp-tutorial": {
		title: "VLAN Trunking Protocol (VTP) Tutorial",
		meta: "8 min read · CCNA 2.6 · Network Access",
		section: "Network Access",
		intro: "VLAN Trunking Protocol (VTP) is a Cisco-proprietary protocol that can distribute VLAN database information among switches configured for the same VTP domain over trunk links.",
		body: "Learn the VTP server, client, and transparent modes, configuration revision behavior, status verification, trunk prerequisites, and how VTP pruning can reduce unnecessary VLAN traffic on trunks.",
		tags: ["CCNA 2.6", "VTP", "VLAN", "Network Access"],
		contentType: "vtp",
	},
	"etherchannel-tutorial": {
		title: "EtherChannel Tutorial",
		meta: "8 min read · CCNA 2.7 · Network Access",
		section: "Network Access",
		intro: "EtherChannel combines multiple compatible physical Ethernet links into one logical link, called a Port-Channel. Switches and routers can use the logical interface for configuration while the member links provide aggregate capacity and link redundancy.",
		body: "Learn why STP treats a channel as one logical link, how traffic is distributed across members, how PAgP, LACP, and static mode differ, and which settings must match before links can bundle.",
		tags: ["CCNA 2.7", "EtherChannel", "LACP", "PAgP", "Network Access"],
		contentType: "etherchannel",
	},
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
		meta: "9 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "The OSI model is a seven-layer framework for understanding how data moves between applications and network devices. Each layer has a focused responsibility, making complex communication easier to design, troubleshoot, and explain.",
		tags: ["Fundamentals", "OSI", "Troubleshooting", "CCNA"],
	},
	"tcp-and-udp-tutorial": {
		title: "TCP and UDP Tutorial",
		meta: "18 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) are widely used Transport layer protocols. TCP provides a reliable, ordered byte stream while a connection is active; UDP sends independent datagrams with less built-in transport behavior. Applications choose between them based on their needs.",
		tags: ["TCP", "UDP", "Transport", "CCNA"],
	},
	"wan-tutorial": {
		title: "WAN Tutorial",
		meta: "12 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "A wide area network (WAN) connects geographically separated networks. Organizations commonly use service providers to connect their locations over long distances, while each site continues to use its own local area network (LAN).",
		tags: ["WAN", "LAN", "PPP", "HDLC", "CCNA"],
	},
	"cisco-command-line-interface-cli": {
		title: "Cisco Command Line Interface CLI",
		meta: "8 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Cisco IOS uses command modes to organize available commands and configuration tasks. Recognizing the prompt before entering a command helps you know whether you are viewing device state or changing configuration.",
		tags: ["Cisco IOS", "CLI", "Configuration", "CCNA"],
	},
	"cisco-router-boot-sequence-tutorial": {
		title: "Cisco Router Boot Sequence Tutorial",
		meta: "8 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "A router startup moves through hardware checks, boot-loader execution, operating-system selection, and configuration loading. Knowing what is stored in each memory type helps explain what survives a restart and what the router does when an image or configuration is unavailable.",
		tags: ["Cisco IOS", "Boot Process", "Memory", "CCNA"],
	},
	"subnetting-tutorial---subnetting-made-easy": {
		title: "Subnetting Tutorial - Subnetting Made Easy",
		meta: "12 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Subnetting divides an IP address block into smaller networks. This lesson builds from prefix lengths and binary masks to a practical subnet-boundary calculation, using modern CIDR terminology rather than relying on obsolete class-based allocation.",
		tags: ["IPv4", "Subnetting", "CIDR", "CCNA"],
	},
	"wireless-tutorial": {
		title: "Wireless Tutorial",
		meta: "18 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "Wireless LANs let clients exchange data over radio instead of a dedicated cable. This two-page lesson introduces 802.11 operation, WLAN architecture, radio techniques, security generations, and common sources of interference.",
		tags: ["WLAN", "Wi-Fi", "802.11", "CCNA"],
	},
	"ipv6-tutorial": {
		title: "IPv6 Tutorial",
		meta: "14 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "IPv6 expands the available address space and provides a modern protocol for identifying interfaces and routing traffic. This two-page tutorial covers IPv6 notation, address shortening, prefixes, unicast, multicast, anycast, and the scopes used on IPv6 networks.",
		tags: ["IPv6", "Addressing", "Subnetting", "CCNA"],
	},
	"hypervisor-type-1-and-2-tutorial-(on-digitaltut.com)": {
		title: "Hypervisor type 1 and 2 Tutorial (on digitaltut.com)",
		meta: "10 min read · Updated Sep 2026 · Fundamentals",
		section: "Fundamentals",
		intro: "A hypervisor creates and runs virtual machines by sharing a host computer’s resources. Understanding the difference between type 1 and type 2 designs, and how virtual network interfaces connect through virtual switches, helps explain virtualization in data centers and labs.",
		tags: ["Virtualization", "Hypervisor", "Virtual Machine", "CCNA"],
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

function TutorialSidebar({ activeSlug }) {
	const [openSections, setOpenSections] = useState(() => new Set());

	function toggleSection(title) {
		setOpenSections((currentSections) => {
			const nextSections = new Set(currentSections);
			if (nextSections.has(title)) {
				nextSections.delete(title);
			} else {
				nextSections.add(title);
			}
			return nextSections;
		});
	}

	return (
		<aside className="lg:sticky lg:top-24 lg:ml-auto lg:w-full lg:max-w-[300px] lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:self-start">
			<label className="relative block w-full">
				<Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71819b]" />
				<input type="search" placeholder="Filter tutorials..." className="h-11 w-full rounded-xl border border-[#dbe5f5] bg-[#f4f7fd] pl-10 pr-3 text-sm text-[#172642] outline-none focus:border-[#2f68d9]" />
			</label>
			<div className="mt-7 space-y-8">
				{sections.map((section) => (
					<div key={section.title}>
						<button
							type="button"
							onClick={() => toggleSection(section.title)}
							aria-expanded={openSections.has(section.title)}
							className="group flex w-full items-center justify-between border-b border-[#dbe5f5] px-1 pb-4 text-left"
						>
							<strong className="inline-block origin-left text-base text-[#111a2d] transition duration-200 group-hover:scale-[1.03] group-hover:text-[#204ed0]">{section.title}</strong>
							<span className="flex items-center gap-3 text-sm text-[#71819b]">
								<span>{section.count}</span>
								<ChevronDown
									size={16}
									className={`text-[#2f58e8] transition-transform duration-200 group-hover:scale-110 group-hover:text-[#204ed0] ${openSections.has(section.title) ? "" : "-rotate-90"}`}
								/>
							</span>
						</button>
						{openSections.has(section.title) && (
							<div className="space-y-1 pt-2">
								{section.items.map((item) => {
									const slug = slugify(item);
									return (
										<Link key={item} to={`/modules/programs/ccna/knowledge-hub/${slug}`} className={`block rounded-lg px-2 py-2 text-base leading-snug transition ${activeSlug === slug ? "bg-[#eff4ff] font-semibold text-[#204ed0]" : "text-[#526584] hover:bg-[#f5f8ff] hover:text-[#204ed0]"}`}>{item}</Link>
									);
								})}
							</div>
						)}
					</div>
				))}
			</div>
		</aside>
	);
}

export default function CCNAKnowledgeArticle() {
	const { articleSlug = "spine-leaf-architecture-tutorial" } = useParams();
	const vlanArticleSlug = "virtual-local-area-network-vlan-tutorial";
	const canonicalArticleSlug = articleSlug === "virtual-local-area-networks-(vlans)" ? vlanArticleSlug : articleSlug;
	const article = articles[articleSlug] || (articleSlug === vlanArticleSlug ? articles["virtual-local-area-networks-(vlans)"] : undefined) || {
		title: titleFromSlug(articleSlug),
		meta: "6 min read · Updated Sep 2026 · CCNA Knowledge",
		section: "Fundamentals",
		intro: "This CCNA learning module explains a practical networking concept through clear definitions, examples, and troubleshooting guidance.",
		body: "Review the key terms, connect them to real network behavior, and use the module checklist to reinforce your understanding before moving to the next lesson.",
		tags: ["CCNA", "Networking", "Study Guide"],
	};

	return (
		<main className="min-h-screen bg-white text-[#526584]">
			<div className="mx-auto max-w-[1600px] px-5 pb-8 pt-10 sm:px-10 sm:pt-12 lg:px-10">
				<nav className="mb-6 flex flex-wrap items-center gap-2 text-sm sm:text-base" aria-label="Breadcrumb">
					<Link to="/modules/programs/ccna/knowledge-hub" className="font-semibold text-[#2259dc] hover:underline">Training</Link>
					<span>/</span>
					<Link to="/modules/programs/ccna/knowledge-hub" className="font-semibold text-[#2259dc] hover:underline">CCNA Knowledge</Link>
					<span>/</span>
					<span className="truncate text-[#8492a9]">{article.title}</span>
				</nav>
				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
					<article className="rounded-[24px] border border-[#dbe5f5] px-6 py-9 sm:px-10 sm:py-11">
						<div className="inline-flex items-center gap-2 rounded-full bg-[#f1f6ff] px-4 py-2 text-sm font-semibold text-[#2354d4]"><Folder size={15} /> CCNA Knowledge</div>
						<h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#071126] sm:text-5xl">{article.title}</h1>
						<p className="mt-4 flex items-center gap-2 text-base text-[#7b8ca7]"><Clock size={17} /> {article.meta}</p>
						{ccnaModuleOneSlugs.has(articleSlug) ? (
							<CcnaKnowledgeModuleOne article={article} articleSlug={articleSlug} />
						) : ["vlan", "intervlan", "stp", "stp-root-port", "rstp", "vtp", "etherchannel"].includes(article.contentType) ? (
							<CcnaKnowledgeModuleTwo contentType={article.contentType} />
						) : ["routing-decision", "ospf", "eigrp", "hsrp", "glbp"].includes(article.contentType) ? (
							<CcnaKnowledgeModuleThree contentType={article.contentType} />
						) : article.meta.includes("CCNA 4.") ? (
							<CcnaKnowledgeModuleFour article={article} />
						) : article.meta.includes("CCNA 5.") ? (
							<CcnaKnowledgeModuleFive article={article} />
						) : article.meta.includes("CCNA 6.") ? (
							<CcnaKnowledgeModuleSix article={article} />
						) : (
							<CcnaKnowledgeModuleFour article={article} />
						)}
						<div className="mt-7 flex flex-wrap gap-3">{article.tags.map((tag) => <span key={tag} className="rounded-full border border-[#dbe5f5] bg-[#f8faff] px-4 py-2 text-sm text-[#3d5c88]">{tag}</span>)}</div>
					</article>
					<TutorialSidebar activeSlug={canonicalArticleSlug} />
				</div>
			</div>
		</main>
	);
}
