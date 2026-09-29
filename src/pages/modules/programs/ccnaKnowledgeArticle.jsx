import { ChevronDown, ChevronLeft, ChevronRight, Clock, Folder, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import VlanWithoutSegmentationImage from "../../../assets/ccna-vlan/vlan-without-segmentation.svg";
import VlanDepartmentBenefitsImage from "../../../assets/ccna-vlan/vlan-department-benefits.svg";
import VlanTrunkIdImage from "../../../assets/ccna-vlan/vlan-trunk-id.svg";
import VlanFrameTaggingImage from "../../../assets/ccna-vlan/vlan-frame-tagging.svg";
import VlanTrunkToRouterImage from "../../../assets/ccna-vlan/vlan-trunk-to-router.svg";
import VlanNativeTrafficImage from "../../../assets/ccna-vlan/vlan-native-traffic.svg";
import InterVlanSeparationImage from "../../../assets/ccna-vlan/intervlan-separation.svg";
import RouterOnAStickImage from "../../../assets/ccna-vlan/router-on-a-stick.svg";
import InterVlanLayer3SwitchImage from "../../../assets/ccna-vlan/intervlan-layer3-switch.svg";
import StpLoopPreventionImage from "../../../assets/ccna-stp/stp-loop-prevention.svg";
import StpRolesImage from "../../../assets/ccna-stp/stp-port-roles.svg";
import StpRootCostExampleImage from "../../../assets/ccna-stp/root-port-cost-example.svg";
import StpSenderBridgeTieImage from "../../../assets/ccna-stp/root-port-sender-bridge-tie.svg";
import StpSenderPortTieImage from "../../../assets/ccna-stp/root-port-sender-port-tie.svg";
import RstpPortRolesImage from "../../../assets/ccna-stp/rstp-port-roles.svg";
import RstpSharedSegmentImage from "../../../assets/ccna-stp/rstp-shared-segment.svg";
import VtpDomainModesImage from "../../../assets/ccna-vtp/vtp-domain-modes.svg";
import VtpPruningImage from "../../../assets/ccna-vtp/vtp-pruning.svg";
import EtherChannelBundlingImage from "../../../assets/ccna-etherchannel/etherchannel-bundling.svg";
import EtherChannelLoadBalanceImage from "../../../assets/ccna-etherchannel/etherchannel-load-balance.svg";

const sections = [
	{
		title: "Fundamentals",
		count: 10,
		items: ["OSI Model Tutorial", "TCP and UDP Tutorial", "Subnetting Tutorial - Subnetting Made Easy", "JSON Tutorial", "WAN Tutorial", "Cisco Command Line Interface CLI", "Wireless Tutorial", "Cisco Router Boot Sequence Tutorial", "IPv6 Tutorial", "Hypervisor type 1 and 2 Tutorial (on digitaltut.com)"],
	},
	{
		title: "Switching & Routing",
		count: 6,
		items: ["InterVLAN Routing Tutorial", "EtherChannel Tutorial", "VLAN Trunking Protocol VTP", "STP Root Port Election", "Routing Protocols Explained"],
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
	{
		title: "Network Access",
		count: 7,
		items: ["Virtual Local Area Network VLAN Tutorial", "InterVLAN Routing Tutorial", "Spanning Tree Protocol STP Tutorial", "STP Root Port Election Tutorial", "Rapid Spanning Tree Protocol RSTP Tutorial", "VLAN Trunking Protocol VTP Tutorial", "EtherChannel Tutorial"],
	},
];

const articles = {
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

function DiagramPlaceholder() {
	return (
		<div className="my-7 flex h-24 items-center justify-center rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] text-center text-sm text-[#8a99b2] sm:h-28">
			Traditional three-tier architecture vs. Spine-Leaf architecture
		</div>
	);
}

const osiLayers = [
	{
		number: 7,
		name: "Application",
		description: "Offers network services and protocols that applications use to communicate. The browser or email program is not itself the protocol layer.",
		summary: "Network services for applications",
		protocols: "HTTP/HTTPS, DNS, SMTP, FTP, SSH, SNMP",
		pdu: "Data",
		devices: "Proxy, application gateway, firewall",
	},
	{
		number: 6,
		name: "Presentation",
		description: "Represents and transforms information so communicating systems can interpret it, including encoding, format conversion, compression, or encryption.",
		summary: "Data formats, encoding, and encryption",
		protocols: "Text encodings, JPEG, PNG, media formats",
		pdu: "Data",
		devices: "Usually implemented in software",
	},
	{
		number: 5,
		name: "Session",
		description: "Coordinates a conversation between applications, including establishing, managing, and ending a session.",
		summary: "Starts and manages conversations",
		protocols: "Session control and dialog coordination",
		pdu: "Data",
		devices: "Usually implemented in software",
	},
	{
		number: 4,
		name: "Transport",
		description: "Provides process-to-process delivery using port numbers. TCP supports reliable, ordered delivery; UDP provides a lightweight, connectionless transport service.",
		summary: "Process delivery and flow control",
		protocols: "TCP, UDP",
		pdu: "Segment (TCP) / datagram (UDP)",
		devices: "Stateful firewalls, Layer 4 load balancers",
	},
	{
		number: 3,
		name: "Network",
		description: "Uses logical source and destination addresses and selects routes to move packets between networks.",
		summary: "Logical addressing and routing",
		protocols: "IPv4, IPv6, ICMP",
		pdu: "Packet",
		devices: "Router, Layer 3 switch",
	},
	{
		number: 2,
		name: "Data Link",
		description: "Packages data into frames for a local link and uses link-layer addresses to deliver each frame to the next hop.",
		summary: "Frames for local-link delivery",
		protocols: "Ethernet, Wi-Fi, PPP, 802.1Q",
		pdu: "Frame",
		devices: "Switch, bridge, wireless access point",
	},
	{
		number: 1,
		name: "Physical",
		description: "Defines how bits are signaled over a physical medium, including electrical, optical, or radio characteristics, connectors, and timing.",
		summary: "Signals bits over a medium",
		protocols: "Ethernet physical standards, fiber, radio",
		pdu: "Bits",
		devices: "Repeater, hub, cable, transceiver",
	},
];

function TutorialDiagramFrame({ caption, children }) {
	return (
		<figure className="my-6 rounded-2xl border border-[#dbe5f5] bg-[#f7fbff] p-2 sm:p-3">
			<div className="overflow-x-auto" tabIndex={0} aria-label="Tutorial diagram; swipe or scroll horizontally to inspect">
				<div className="min-w-[720px] sm:min-w-0">{children}</div>
			</div>
			<figcaption className="px-2 pb-2 pt-3 text-center text-sm leading-6 text-[#71819b]">{caption}</figcaption>
		</figure>
	);
}

function TransportDiagramImage({ src, alt, caption }) {
	return (
		<TutorialDiagramFrame caption={caption}>
			<img src={src} alt={alt} loading="lazy" className="mx-auto h-auto w-full max-w-4xl" />
		</TutorialDiagramFrame>
	);
}

function OsiLayersDiagram() {
	return (
		<svg viewBox="0 0 900 610" role="img" aria-labelledby="osi-layers-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="osi-layers-title">Seven layers of the OSI model</title>
			<rect x="8" y="8" width="884" height="594" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h840a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="29" fontWeight="700">The 7 Layers of the OSI Model</text>
			{osiLayers.map((layer, index) => {
				const y = 105 + index * 68;
				return (
					<g key={layer.number}>
						<rect x="34" y={y} width="832" height="58" rx="12" fill={index % 2 === 0 ? "#e7f3ff" : "#f2f8ff"} stroke="#c5e1fa" />
						<rect x="34" y={y} width="78" height="58" rx="12" fill="#0878d1" />
						<text x="73" y={y + 39} fill="#fff" fontSize="29" fontWeight="700" textAnchor="middle">{layer.number}</text>
						<text x="138" y={y + 36} fill="#104c87" fontSize="21" fontWeight="700">{layer.name}</text>
						<text x="360" y={y + 25} fill="#25496d" fontSize="15">{layer.summary}</text>
						<rect x="728" y={y + 10} width="120" height="38" rx="19" fill="#cfe7ff" />
						<text x="788" y={y + 35} fill="#0759a5" fontSize="16" fontWeight="700" textAnchor="middle">{layer.pdu.split(" ")[0]}</text>
					</g>
				);
			})}
		</svg>
	);
}

function OsiSendingReceivingDiagram() {
	return (
		<svg viewBox="0 0 960 650" role="img" aria-labelledby="osi-sending-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="osi-sending-title">Sending and receiving data across the OSI layers</title>
			<rect x="8" y="8" width="944" height="634" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h900a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="44" y="63" fill="#fff" fontSize="28" fontWeight="700">Sending and Receiving Data</text>
			<rect x="35" y="105" width="410" height="52" rx="15" fill="#dceeff" />
			<rect x="515" y="105" width="410" height="52" rx="15" fill="#dceeff" />
			<text x="240" y="138" fill="#0759a5" fontSize="21" fontWeight="700" textAnchor="middle">Sending (Encapsulation)</text>
			<text x="720" y="138" fill="#0759a5" fontSize="21" fontWeight="700" textAnchor="middle">Receiving (Decapsulation)</text>
			{osiLayers.map((layer, index) => {
				const y = 174 + index * 53;
				return (
					<g key={layer.number}>
						<rect x="48" y={y} width="330" height="42" rx="10" fill="#e6f3ff" stroke="#acd5f7" />
						<rect x="48" y={y} width="53" height="42" rx="10" fill="#0878d1" />
						<text x="74" y={y + 28} fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">{layer.number}</text>
						<text x="118" y={y + 27} fill="#104c87" fontSize="17" fontWeight="700">{layer.name}</text>
						<rect x="582" y={y} width="330" height="42" rx="10" fill="#e6f3ff" stroke="#acd5f7" />
						<rect x="582" y={y} width="53" height="42" rx="10" fill="#0878d1" />
						<text x="608" y={y + 28} fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">{layer.number}</text>
						<text x="652" y={y + 27} fill="#104c87" fontSize="17" fontWeight="700">{layer.name}</text>
						{index < osiLayers.length - 1 && (
							<>
								<path d={`M212 ${y + 43}v8`} stroke="#0878d1" strokeWidth="3" markerEnd="url(#osi-blue-arrow)" />
								<path d={`M746 ${y + 50}v-8`} stroke="#0878d1" strokeWidth="3" markerEnd="url(#osi-blue-arrow)" />
							</>
						)}
					</g>
				);
			})}
			<defs>
				<marker id="osi-blue-arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
					<path d="M0 0l8 4-8 4z" fill="#0878d1" />
				</marker>
			</defs>
			<path d="M240 548v26h480v-26" fill="none" stroke="#1683e8" strokeWidth="4" />
			<rect x="355" y="562" width="250" height="49" rx="22" fill="#dceeff" stroke="#1683e8" strokeWidth="2" />
			<text x="480" y="592" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">Network between devices</text>
		</svg>
	);
}

function OsiEncapsulationDiagram() {
	return (
		<svg viewBox="0 0 960 700" role="img" aria-labelledby="osi-encapsulation-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="osi-encapsulation-title">Encapsulation and decapsulation</title>
			<rect x="8" y="8" width="944" height="684" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h900a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="44" y="63" fill="#fff" fontSize="28" fontWeight="700">Encapsulation and Decapsulation</text>
			<rect x="35" y="105" width="410" height="50" rx="14" fill="#dceeff" />
			<rect x="515" y="105" width="410" height="50" rx="14" fill="#dceeff" />
			<text x="240" y="137" fill="#0759a5" fontSize="21" fontWeight="700" textAnchor="middle">Encapsulation · Sending</text>
			<text x="720" y="137" fill="#0759a5" fontSize="21" fontWeight="700" textAnchor="middle">Decapsulation · Receiving</text>
			{osiLayers.map((layer, index) => {
				const y = 176 + index * 62;
				return (
					<g key={layer.number}>
						<rect x="42" y={y} width="185" height="46" rx="10" fill="#e6f3ff" stroke="#acd5f7" />
						<rect x="42" y={y} width="47" height="46" rx="10" fill="#0878d1" />
						<text x="65" y={y + 30} fill="#fff" fontSize="17" fontWeight="700" textAnchor="middle">{layer.number}</text>
						<text x="99" y={y + 29} fill="#104c87" fontSize="15" fontWeight="700">{layer.name}</text>
						<rect x="238" y={y + 4} width="85" height="38" rx="8" fill="#b9ddff" stroke="#1683e8" />
						<text x="280" y={y + 29} fill="#0759a5" fontSize="14" fontWeight="700" textAnchor="middle">Header</text>
						<text x="331" y={y + 30} fill="#0759a5" fontSize="17" fontWeight="700">+</text>
						<rect x="352" y={y + 4} width="75" height="38" rx="8" fill="#e8f4ff" stroke="#9fcdf5" />
						<text x="389" y={y + 29} fill="#104c87" fontSize="14" fontWeight="700" textAnchor="middle">Data</text>

						<rect x="533" y={y} width="185" height="46" rx="10" fill="#e6f3ff" stroke="#acd5f7" />
						<rect x="533" y={y} width="47" height="46" rx="10" fill="#0878d1" />
						<text x="556" y={y + 30} fill="#fff" fontSize="17" fontWeight="700" textAnchor="middle">{layer.number}</text>
						<text x="590" y={y + 29} fill="#104c87" fontSize="15" fontWeight="700">{layer.name}</text>
						<rect x="744" y={y + 4} width="160" height="38" rx="8" fill="#e8f4ff" stroke="#9fcdf5" />
						<text x="824" y={y + 29} fill="#104c87" fontSize="14" fontWeight="700" textAnchor="middle">{index === 6 ? "Original data" : "Data + upper info"}</text>
					</g>
				);
			})}
			<text x="240" y="630" fill="#0759a5" fontSize="15" fontWeight="700">Each layer adds control information as needed.</text>
			<text x="533" y="656" fill="#0759a5" fontSize="15" fontWeight="700">Each layer processes its corresponding information.</text>
		</svg>
	);
}

const letterSteps = [
	"Prepare message and mail service",
	"Format the document for Charles",
	"Start and manage the conversation",
	"Track delivery and manage flow",
	"Address it toward the destination",
	"Deliver to the next local office",
	"Carry the mail by plane",
];

const receivedLetterSteps = [
	"Read the document from Henry",
	"Translate and format the message",
	"End the conversation",
	"Reassemble and confirm delivery",
	"Recognize Henry as the sender",
	"Check the local address and seal",
	"Receive the letter from the mail carrier",
];

function OsiLetterDiagram() {
	return (
		<svg viewBox="0 0 960 820" role="img" aria-labelledby="osi-letter-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="osi-letter-title">Henry and Charles postal-service analogy for the OSI layers</title>
			<rect x="8" y="8" width="944" height="804" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h900a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="44" y="63" fill="#fff" fontSize="28" fontWeight="700">Henry and Charles · A Postal-Service Example</text>
			<circle cx="120" cy="130" r="27" fill="#cfe7ff" />
			<text x="120" y="139" fill="#0759a5" fontSize="25" fontWeight="700" textAnchor="middle">H</text>
			<text x="160" y="137" fill="#104c87" fontSize="20" fontWeight="700">Henry · English</text>
			<circle cx="840" cy="130" r="27" fill="#cfe7ff" />
			<text x="840" y="139" fill="#0759a5" fontSize="25" fontWeight="700" textAnchor="middle">C</text>
			<text x="800" y="137" fill="#104c87" fontSize="20" fontWeight="700" textAnchor="end">Charles · French</text>
			<line x1="480" y1="170" x2="480" y2="770" stroke="#b8dafa" strokeWidth="2" strokeDasharray="8 8" />
			{osiLayers.map((layer, index) => {
				const y = 184 + index * 82;
				return (
					<g key={layer.number}>
						<rect x="32" y={y} width="142" height="54" rx="12" fill="#0878d1" />
						<text x="103" y={y + 23} fill="#fff" fontSize="13" fontWeight="700" textAnchor="middle">Layer {layer.number}</text>
						<text x="103" y={y + 42} fill="#fff" fontSize="13" fontWeight="700" textAnchor="middle">{layer.name}</text>
						<path d={`M188 ${y}h240q14 0 14 14v26q0 14-14 14H188q-14 0-14-14v-26q0-14 14-14z`} fill="#e6f3ff" stroke="#acd5f7" strokeWidth="2" />
						<text x="309" y={y + 32} fill="#104c87" fontSize="14" textAnchor="middle">{letterSteps[index]}</text>

						<rect x="786" y={y} width="142" height="54" rx="12" fill="#0878d1" />
						<text x="857" y={y + 23} fill="#fff" fontSize="13" fontWeight="700" textAnchor="middle">Layer {layer.number}</text>
						<text x="857" y={y + 42} fill="#fff" fontSize="13" fontWeight="700" textAnchor="middle">{layer.name}</text>
						<path d={`M532 ${y}h240q14 0 14 14v26q0 14-14 14H532q-14 0-14-14v-26q0-14 14-14z`} fill="#e6f3ff" stroke="#acd5f7" strokeWidth="2" />
						<text x="652" y={y + 32} fill="#104c87" fontSize="14" textAnchor="middle">{receivedLetterSteps[index]}</text>
					</g>
				);
			})}
			<path d="M300 770h360" stroke="#1683e8" strokeWidth="4" markerEnd="url(#osi-letter-arrow)" />
			<text x="480" y="798" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">Postal service carries the letter between locations</text>
			<defs>
				<marker id="osi-letter-arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
					<path d="M0 0l8 4-8 4z" fill="#1683e8" />
				</marker>
			</defs>
		</svg>
	);
}

function TcpWindowDiagram() {
	const transmissions = [
		{ y: 178, label: "Send bytes 1–3", reverse: false },
		{ y: 228, label: "ACK 4 · next byte expected", reverse: true },
		{ y: 278, label: "Send bytes 4–6", reverse: false },
		{ y: 328, label: "ACK 7 · next byte expected", reverse: true },
	];

	return (
		<svg viewBox="0 0 940 410" role="img" aria-labelledby="tcp-window-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="tcp-window-title">TCP sliding window flow control example using a three-byte window</title>
			<rect x="8" y="8" width="924" height="394" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">TCP Sliding Window · Advertised Window = 3</text>
			<text x="125" y="132" fill="#104c87" fontSize="18" fontWeight="700" textAnchor="middle">Sender</text>
			<text x="815" y="132" fill="#104c87" fontSize="18" fontWeight="700" textAnchor="middle">Receiver</text>
			<line x1="125" y1="145" x2="815" y2="145" stroke="#9fcdf5" strokeWidth="3" />
			{transmissions.map((item) => (
				<g key={item.label}>
					<line x1={item.reverse ? 805 : 135} y1={item.y} x2={item.reverse ? 135 : 805} y2={item.y} stroke="#0878d1" strokeWidth="3" />
					<polygon points={item.reverse ? `${135},${item.y} ${148},${item.y - 7} ${148},${item.y + 7}` : `${805},${item.y} ${792},${item.y - 7} ${792},${item.y + 7}`} fill="#0878d1" />
					<rect x="295" y={item.y - 21} width="340" height="34" rx="16" fill="#e6f3ff" />
					<text x="465" y={item.y + 2} fill="#104c87" fontSize="16" fontWeight="700" textAnchor="middle">{item.label}</text>
				</g>
			))}
			<rect x="115" y="356" width="710" height="28" rx="14" fill="#dceeff" />
			<text x="470" y="376" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">ACK numbers identify the next byte expected; the receive window advertises available buffer space.</text>
		</svg>
	);
}

function TcpRecoveryDiagram() {
	const events = [
		{ from: "a", label: "Segment 1 arrives · ACK 2" },
		{ from: "a", label: "Segment 2 is lost" },
		{ from: "a", label: "Segment 3 arrives out of order" },
		{ from: "b", label: "Duplicate ACK 2 · still expecting 2" },
		{ from: "a", label: "Retransmit missing data · ACK advances" },
	];

	return (
		<svg viewBox="0 0 940 500" role="img" aria-labelledby="tcp-recovery-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="tcp-recovery-title">TCP detects missing data and retransmits it</title>
			<rect x="8" y="8" width="924" height="484" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">TCP Reliability · Detect and Recover</text>
			<text x="125" y="132" fill="#104c87" fontSize="18" fontWeight="700" textAnchor="middle">Host A · sender</text>
			<text x="815" y="132" fill="#104c87" fontSize="18" fontWeight="700" textAnchor="middle">Host B · receiver</text>
			<line x1="125" y1="145" x2="815" y2="145" stroke="#9fcdf5" strokeWidth="3" />
			{events.map((event, index) => {
				const y = 180 + index * 57;
				const reverse = event.from === "b";
				const lost = event.label.includes("lost");
				return (
					<g key={event.label}>
						<line
							x1={reverse ? 805 : 135}
							y1={y}
							x2={reverse ? 135 : lost ? 460 : 805}
							y2={y}
							stroke={lost ? "#82b7e8" : "#0878d1"}
							strokeWidth="3"
							strokeDasharray={lost ? "10 8" : undefined}
						/>
						{!lost && <polygon points={reverse ? `${135},${y} ${148},${y - 7} ${148},${y + 7}` : `${805},${y} ${792},${y - 7} ${792},${y + 7}`} fill="#0878d1" />}
						<rect x="285" y={y - 20} width="370" height="34" rx="16" fill={lost ? "#f1f7ff" : "#e6f3ff"} />
						<text x="470" y={y + 3} fill="#104c87" fontSize="15" fontWeight="700" textAnchor="middle">{event.label}</text>
					</g>
				);
			})}
		</svg>
	);
}

function TcpUdpHeaderDiagram() {
	const field = (x, y, width, height, label, fill = "#e6f3ff", fontSize = 15) => (
		<g key={`${label}-${x}-${y}`}>
			<rect x={x} y={y} width={width} height={height} fill={fill} stroke="#7eb9eb" />
			<text x={x + width / 2} y={y + height / 2 + fontSize / 3} fill="#104c87" fontSize={fontSize} textAnchor="middle">{label}</text>
		</g>
	);

	return (
		<svg viewBox="0 0 940 570" role="img" aria-labelledby="tcp-udp-header-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="tcp-udp-header-title">Simplified TCP and UDP header fields</title>
			<rect x="8" y="8" width="924" height="554" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Transport Headers · TCP and UDP</text>
			<text x="250" y="125" fill="#104c87" fontSize="20" fontWeight="700" textAnchor="middle">TCP header · minimum 20 bytes</text>
			{field(55, 145, 207, 48, "Source port · 16 bits")}
			{field(262, 145, 207, 48, "Destination port · 16 bits")}
			{field(55, 193, 414, 48, "Sequence number · 32 bits", "#f1f7ff")}
			{field(55, 241, 414, 48, "Acknowledgment number · 32 bits")}
			{field(55, 289, 115, 54, "Offset", "#f1f7ff", 13)}
			{field(170, 289, 115, 54, "Flags", "#cfe7ff", 13)}
			{field(285, 289, 184, 54, "Window size · 16 bits")}
			{field(55, 343, 207, 48, "Checksum · 16 bits")}
			{field(262, 343, 207, 48, "Urgent pointer", "#f1f7ff", 13)}
			{field(55, 391, 414, 42, "Options and padding · if present", "#f1f7ff", 13)}
			<text x="520" y="125" fill="#104c87" fontSize="20" fontWeight="700" textAnchor="middle">UDP header · 8 bytes</text>
			{field(510, 160, 180, 64, "Source port · 16 bits")}
			{field(690, 160, 180, 64, "Destination port · 16 bits")}
			{field(510, 224, 180, 64, "Length · 16 bits", "#f1f7ff")}
			{field(690, 224, 180, 64, "Checksum · 16 bits")}
			<rect x="510" y="306" width="360" height="127" rx="14" fill="#f1f7ff" stroke="#acd5f7" />
			<text x="690" y="339" fill="#0759a5" fontSize="16" fontWeight="700" textAnchor="middle">TCP control flags include</text>
			<text x="690" y="370" fill="#28577e" fontSize="15" textAnchor="middle">SYN · ACK · FIN · RST · PSH · URG</text>
			<text x="690" y="400" fill="#28577e" fontSize="14" textAnchor="middle">ECN flags are also defined.</text>
			<rect x="55" y="460" width="815" height="60" rx="14" fill="#dceeff" />
			<text x="462" y="485" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">TCP has sequence, acknowledgment, window, and recovery-related fields.</text>
			<text x="462" y="507" fill="#28577e" fontSize="14" textAnchor="middle">UDP has a compact header; its checksum detects corruption but does not retransmit data.</text>
		</svg>
	);
}

function TcpUdpPageOne() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="tcp-transport-heading">
				<h2 id="tcp-transport-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">TCP and UDP at the Transport layer</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					TCP and UDP both operate at the Transport layer. TCP provides a connection-oriented byte stream
					with sequencing, acknowledgements, retransmission, and flow and congestion control. UDP provides
					connectionless datagrams with less built-in behavior. Neither choice is simply “always slower” or
					“always faster”: performance depends on the network and the needs of the application.
				</p>
				<TransportDiagramImage
					src="/images/tcp-udp/osi-vs-tcpip.png"
					alt="Diagram comparing the seven-layer OSI model with the four-layer TCP/IP model and showing TCP and UDP at the Transport layer."
					caption="The TCP/IP model groups OSI responsibilities into four broader layers."
				/>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[600px] border-collapse text-left text-sm">
						<thead className="bg-[#e6f3ff] text-[#104c87]">
							<tr>
								<th scope="col" className="px-4 py-3 font-bold">Feature</th>
								<th scope="col" className="px-4 py-3 font-bold">TCP</th>
								<th scope="col" className="px-4 py-3 font-bold">UDP</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-t border-[#dbe5f5] align-top">
								<th scope="row" className="px-4 py-3 font-semibold text-[#172642]">Communication</th>
								<td className="px-4 py-3 leading-6">Connection-oriented byte stream</td>
								<td className="px-4 py-3 leading-6">Connectionless datagrams</td>
							</tr>
							<tr className="border-t border-[#dbe5f5] align-top">
								<th scope="row" className="px-4 py-3 font-semibold text-[#172642]">Delivery behavior</th>
								<td className="px-4 py-3 leading-6">Sequences data and retransmits missing data while the connection remains viable</td>
								<td className="px-4 py-3 leading-6">Does not provide transport-level acknowledgements, ordering, or retransmission</td>
							</tr>
							<tr className="border-t border-[#dbe5f5] align-top">
								<th scope="row" className="px-4 py-3 font-semibold text-[#172642]">Typical uses</th>
								<td className="px-4 py-3 leading-6">Web traffic, email, and file transfer where ordered delivery is useful</td>
								<td className="px-4 py-3 leading-6">DNS queries, voice, video, games, and protocols that implement their own recovery</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4 text-sm leading-6 text-[#71819b]">
					UDP does not guarantee that data arrives. Real-time applications may tolerate some loss to avoid
					waiting for delayed retransmissions; other UDP-based applications can add reliability themselves.
				</p>
			</section>

			<section aria-labelledby="tcp-handshake-heading">
				<h2 id="tcp-handshake-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">TCP three-way handshake</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					Before exchanging application data, TCP peers establish a connection. The SYN and ACK flags
					synchronize each side’s initial sequence number and acknowledge the received SYN. A SYN consumes
					one sequence number, which is why the acknowledgement is the starting sequence plus one.
				</p>
				<TransportDiagramImage
					src="/images/tcp-udp/tcp-three-way-handshake.png"
					alt="TCP three-way handshake between Host A and Host B: SYN, SYN-ACK, and ACK, establishing a connection."
					caption="TCP establishes a connection with SYN, SYN-ACK, and ACK."
				/>
				<p className="mt-4 leading-7">
					If Host A starts with sequence number 1 and Host B starts with 50, Host B acknowledges A with
					ACK 2, and Host A acknowledges B with ACK 51. Real initial sequence numbers are selected by the
					hosts and are not necessarily small or predictable values.
				</p>
				<TransportDiagramImage
					src="/images/tcp-udp/tcp-handshake-example.png"
					alt="TCP handshake example: Host A sends SYN sequence 100, Host B replies with sequence 300 and acknowledgement 101, then Host A acknowledges 301."
					caption="Example initial sequence numbers show how each acknowledgement confirms the next expected sequence."
				/>
			</section>

			<section aria-labelledby="tcp-termination-heading">
				<h2 id="tcp-termination-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">TCP connection termination</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					Each direction of a TCP connection closes independently. A common graceful close uses four
					segments: one peer sends FIN, the other acknowledges it and may continue sending data, then sends
					its own FIN when ready; the first peer acknowledges that FIN. Implementations may combine control
					flags in some situations, so not every capture has exactly four separate packets.
				</p>
				<TransportDiagramImage
					src="/images/tcp-udp/tcp-connection-termination.png"
					alt="TCP connection termination between Host A and Host B using FIN, ACK, FIN, and ACK."
					caption="A common graceful TCP close uses FIN, ACK, FIN, and ACK."
				/>
				<p className="mt-4 leading-7">
					TCP is connection-oriented because the peers establish connection state before data transfer and
					coordinate its closure. UDP is connectionless: datagrams can be exchanged without a transport
					handshake, though an application can still define its own session behavior.
				</p>
			</section>
		</div>
	);
}

function TcpUdpPageTwo() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="tcp-features-heading">
				<h2 id="tcp-features-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">TCP features</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					TCP provides several features that help applications communicate: multiplexing with port numbers,
					flow control with a sliding window, and reliability through error detection and recovery.
				</p>
			</section>

			<section aria-labelledby="tcp-multiplexing-heading">
				<h2 id="tcp-multiplexing-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Multiplexing with port numbers</h2>
				<p className="mt-3 leading-7">
					A device can browse the web, send email, and transfer files at the same time. TCP source and
					destination ports let the operating system deliver incoming data to the right application.
					Client applications typically use an available ephemeral source port; servers listen on a
					service port such as 443 for HTTPS or 25 for SMTP.
				</p>
				<TransportDiagramImage
					src="/images/tcp-udp/tcp-port-multiplexing.png"
					alt="A laptop uses separate TCP source ports for web browsing, email, and FTP connections to their respective servers."
					caption="Distinct source and destination ports keep simultaneous application connections separate."
				/>
				<TransportDiagramImage
					src="/images/tcp-udp/tcp-source-destination-ports.png"
					alt="TCP request and response between a laptop and web server, using source port 50000 and destination port 80, then reversing the ports in the response."
					caption="The response uses the original destination port as its source and the client's source port as its destination."
				/>
				<p className="mt-3 leading-7">
					Port numbers are grouped into three ranges: well-known ports (0–1023), registered ports
					(1024–49151), and dynamic/private ports (49152–65535). The operating system chooses client
					ports from its configured ephemeral range, which may vary by system.
				</p>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[520px] border-collapse text-left text-sm">
						<thead className="bg-[#e6f3ff] text-[#104c87]">
							<tr>
								<th scope="col" className="px-4 py-3 font-bold">TCP service</th>
								<th scope="col" className="px-4 py-3 font-bold">Purpose</th>
								<th scope="col" className="px-4 py-3 font-bold">Port(s)</th>
							</tr>
						</thead>
						<tbody>
							{[
								["FTP", "File transfer control / data", "21 / 20"],
								["SSH", "Secure remote access", "22"],
								["Telnet", "Unencrypted remote terminal", "23"],
								["SMTP", "Email transfer", "25"],
								["DNS", "Domain name queries (TCP when used)", "53"],
								["HTTP", "Web traffic", "80"],
								["HTTPS", "Secure web traffic", "443"],
							].map(([service, purpose, port]) => (
								<tr key={service} className="border-t border-[#dbe5f5]">
									<th scope="row" className="px-4 py-3 font-semibold text-[#172642]">{service}</th>
									<td className="px-4 py-3">{purpose}</td>
									<td className="px-4 py-3">{port}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-3 leading-7">
					A socket is an endpoint identified by an IP address, transport protocol, and port. A TCP
					connection is identified by the source and destination IP addresses and ports, together with
					the transport protocol. Both TCP and UDP use ports for multiplexing.
				</p>
			</section>

			<section aria-labelledby="tcp-window-heading">
				<h2 id="tcp-window-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Flow control with the sliding window</h2>
				<p className="mt-3 leading-7">
					The TCP receive window advertises how much additional data, in bytes, the receiver is currently
					prepared to accept. A sender can transmit multiple bytes before waiting for an acknowledgement,
					then continue as acknowledgements arrive. This pipelining is more efficient than waiting after
					every byte; the window slides forward as data is acknowledged.
				</p>
				<TutorialDiagramFrame caption="With a receive window of three units in this simplified example, data can be pipelined before the next cumulative acknowledgement.">
					<TcpWindowDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3 leading-7">
					Flow control protects the receiver from being overwhelmed. TCP congestion control separately
					adjusts the sending rate to respond to network congestion; it does not simply shrink the
					receiver’s advertised window.
				</p>
			</section>

			<section aria-labelledby="tcp-reliability-heading">
				<h2 id="tcp-reliability-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Reliability: error detection and recovery</h2>
				<p className="mt-3 leading-7">
					<strong>Error detection</strong> identifies corrupted data; it does not repair it.
					<strong> Error recovery</strong> uses acknowledgements, sequence numbers, and retransmission
					to recover missing data. TCP checks its header and data with a checksum, numbers bytes in its
					stream, and retransmits when needed.
				</p>
				<TutorialDiagramFrame caption="TCP acknowledgements are cumulative: ACK 2 means the receiver is still waiting for byte 2.">
					<TcpRecoveryDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3 leading-7">
					If an acknowledgement is delayed or lost, TCP can retransmit after its retransmission timer
					expires; duplicate acknowledgements can also help detect loss sooner. UDP includes a checksum
					for error detection, but UDP itself does not acknowledge or retransmit a damaged or missing
					datagram. Application behavior may add recovery separately.
				</p>
			</section>

			<section aria-labelledby="tcp-udp-summary-heading">
				<h2 id="tcp-udp-summary-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">TCP and UDP summary</h2>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[640px] border-collapse text-left text-sm">
						<thead className="bg-[#e6f3ff] text-[#104c87]">
							<tr>
								<th scope="col" className="px-4 py-3 font-bold">Feature</th>
								<th scope="col" className="px-4 py-3 font-bold">TCP</th>
								<th scope="col" className="px-4 py-3 font-bold">UDP</th>
							</tr>
						</thead>
						<tbody>
							{[
								["Transport service", "Connection-oriented byte stream", "Connectionless datagrams"],
								["Ports", "Source and destination ports", "Source and destination ports"],
								["Ordering and recovery", "Sequence, acknowledge, and retransmit data", "No transport-level sequencing or retransmission"],
								["Flow control", "Receive window", "No transport-level receive window"],
								["Connection setup/close", "Handshake and orderly close", "No transport handshake required"],
								["Error detection", "Checksum", "Checksum"],
							].map(([feature, tcp, udp]) => (
								<tr key={feature} className="border-t border-[#dbe5f5] align-top">
									<th scope="row" className="px-4 py-3 font-semibold text-[#172642]">{feature}</th>
									<td className="px-4 py-3 leading-6">{tcp}</td>
									<td className="px-4 py-3 leading-6">{udp}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section aria-labelledby="transport-header-heading">
				<h2 id="transport-header-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">TCP and UDP header fields</h2>
				<p className="mt-3 leading-7">
					Transport headers carry the information needed to deliver data between application processes.
					TCP has fields for sequencing, acknowledgements, flags, and receive-window management; UDP
					uses a smaller header with ports, length, and checksum.
				</p>
				<TutorialDiagramFrame caption="Simplified, original diagrams of common TCP and UDP header fields; TCP options make its header longer than the 20-byte minimum.">
					<TcpUdpHeaderDiagram />
				</TutorialDiagramFrame>
			</section>
		</div>
	);
}

function TcpUdpLesson() {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<>
			{currentPage === 1 ? <TcpUdpPageOne /> : <TcpUdpPageTwo />}
			<nav className="mt-8 flex items-center justify-between border-t border-[#dbe5f5] pt-6" aria-label="TCP and UDP tutorial pages">
				<button
					type="button"
					onClick={() => setCurrentPage(1)}
					disabled={currentPage === 1}
					className="inline-flex items-center gap-2 rounded-xl border border-[#dbe5f5] px-4 py-3 font-semibold text-[#2354d4] transition hover:bg-[#f1f6ff] disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronLeft size={18} /> Previous
				</button>
				<span className="text-sm font-semibold text-[#526584]" aria-live="polite">Page {currentPage} of 2</span>
				<button
					type="button"
					onClick={() => setCurrentPage(2)}
					disabled={currentPage === 2}
					className="inline-flex items-center gap-2 rounded-xl border border-[#dbe5f5] px-4 py-3 font-semibold text-[#2354d4] transition hover:bg-[#f1f6ff] disabled:cursor-not-allowed disabled:opacity-40"
				>
					Next page <ChevronRight size={18} />
				</button>
			</nav>
		</>
	);
}

function WanConnectionsDiagram() {
	return (
		<svg viewBox="0 0 940 420" role="img" aria-labelledby="wan-connections-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wan-connections-title">Separate LANs connected over a service-provider WAN</title>
			<rect x="8" y="8" width="924" height="404" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Connecting LANs Across a WAN</text>
			{[
				{ x: 44, label: "Home LAN", device: "Home router" },
				{ x: 342, label: "Office LAN", device: "Edge router" },
				{ x: 642, label: "Remote site LAN", device: "Edge router" },
			].map((site) => (
				<g key={site.label}>
					<rect x={site.x} y="145" width="230" height="180" rx="18" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
					<text x={site.x + 115} y="181" fill="#104c87" fontSize="19" fontWeight="700" textAnchor="middle">{site.label}</text>
					<rect x={site.x + 61} y="208" width="108" height="48" rx="12" fill="#0878d1" />
					<text x={site.x + 115} y="238" fill="#fff" fontSize="15" fontWeight="700" textAnchor="middle">{site.device}</text>
					<text x={site.x + 115} y="287" fill="#28577e" fontSize="15" textAnchor="middle">Private LAN</text>
				</g>
			))}
			<path d="M275 232h59M573 232h59" stroke="#1683e8" strokeWidth="5" />
			<polygon points="334,232 320,224 320,240" fill="#1683e8" />
			<polygon points="632,232 618,224 618,240" fill="#1683e8" />
			<rect x="273" y="344" width="364" height="42" rx="20" fill="#dceeff" />
			<text x="455" y="371" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">Provider network · WAN links</text>
			<text x="455" y="119" fill="#526584" fontSize="15" textAnchor="middle">The Internet is a large interconnected network of networks.</text>
		</svg>
	);
}

function WanDemarcationDiagram() {
	return (
		<svg viewBox="0 0 940 360" role="img" aria-labelledby="wan-demarcation-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wan-demarcation-title">Customer equipment, demarcation point, local loop, and provider network</title>
			<rect x="8" y="8" width="924" height="344" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Customer-to-Provider Boundary</text>
			<rect x="36" y="142" width="236" height="125" rx="16" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="154" y="173" fill="#104c87" fontSize="18" fontWeight="700" textAnchor="middle">Customer premises</text>
			<rect x="76" y="195" width="156" height="42" rx="10" fill="#0878d1" />
			<text x="154" y="222" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">CPE · DTE router</text>
			<line x1="272" y1="216" x2="347" y2="216" stroke="#1683e8" strokeWidth="5" />
			<rect x="347" y="150" width="18" height="132" rx="8" fill="#0759a5" />
			<text x="356" y="304" fill="#104c87" fontSize="13" fontWeight="700" textAnchor="middle">Demarc</text>
			<line x1="365" y1="216" x2="605" y2="216" stroke="#1683e8" strokeWidth="5" />
			<rect x="415" y="166" width="142" height="36" rx="17" fill="#dceeff" />
			<text x="486" y="190" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">Local loop</text>
			<text x="486" y="251" fill="#526584" fontSize="14" textAnchor="middle">Provider access link</text>
			<rect x="605" y="142" width="290" height="125" rx="16" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="750" y="173" fill="#104c87" fontSize="18" fontWeight="700" textAnchor="middle">Service-provider network</text>
			<rect x="676" y="195" width="148" height="42" rx="10" fill="#0878d1" />
			<text x="750" y="222" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">Provider edge</text>
			<text x="471" y="325" fill="#526584" fontSize="14" textAnchor="middle">The demarcation point marks where customer responsibility meets provider responsibility.</text>
		</svg>
	);
}

function WanLinkTypesDiagram() {
	return (
		<svg viewBox="0 0 940 440" role="img" aria-labelledby="wan-link-types-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wan-link-types-title">Comparison of leased point-to-point links and packet-switched WANs</title>
			<rect x="8" y="8" width="924" height="424" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Two WAN Connection Approaches</text>
			<rect x="38" y="119" width="420" height="272" rx="18" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="248" y="155" fill="#104c87" fontSize="20" fontWeight="700" textAnchor="middle">Leased point-to-point link</text>
			<rect x="68" y="218" width="116" height="62" rx="12" fill="#0878d1" />
			<text x="126" y="255" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">Router A</text>
			<rect x="312" y="218" width="116" height="62" rx="12" fill="#0878d1" />
			<text x="370" y="255" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">Router B</text>
			<line x1="184" y1="249" x2="312" y2="249" stroke="#1683e8" strokeWidth="5" />
			<text x="248" y="222" fill="#0759a5" fontSize="14" fontWeight="700" textAnchor="middle">Dedicated link</text>
			<text x="248" y="321" fill="#28577e" fontSize="15" textAnchor="middle">PPP or provider-specific HDLC</text>
			<text x="248" y="350" fill="#526584" fontSize="14" textAnchor="middle">A direct logical link between sites</text>

			<rect x="482" y="119" width="420" height="272" rx="18" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="692" y="155" fill="#104c87" fontSize="20" fontWeight="700" textAnchor="middle">Packet-switched WAN</text>
			<rect x="510" y="218" width="105" height="62" rx="12" fill="#0878d1" />
			<text x="562" y="255" fill="#fff" fontSize="15" fontWeight="700" textAnchor="middle">Router A</text>
			<rect x="769" y="218" width="105" height="62" rx="12" fill="#0878d1" />
			<text x="821" y="255" fill="#fff" fontSize="15" fontWeight="700" textAnchor="middle">Router B</text>
			<path d="M615 249h38m78 0h38" stroke="#1683e8" strokeWidth="4" />
			<polygon points="653,249 642,242 642,256" fill="#1683e8" />
			<polygon points="769,249 758,242 758,256" fill="#1683e8" />
			<path d="M691 195l43 54-43 54-43-54z" fill="#dceeff" stroke="#1683e8" strokeWidth="3" />
			<text x="691" y="254" fill="#0759a5" fontSize="13" fontWeight="700" textAnchor="middle">Provider</text>
			<text x="691" y="270" fill="#0759a5" fontSize="13" fontWeight="700" textAnchor="middle">cloud</text>
			<text x="692" y="321" fill="#28577e" fontSize="15" textAnchor="middle">Frame Relay is a legacy example</text>
			<text x="692" y="350" fill="#526584" fontSize="14" textAnchor="middle">Provider network forwards packets between sites</text>
		</svg>
	);
}

function WanLesson() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="wan-overview-heading">
				<h2 id="wan-overview-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">What is a WAN?</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					A LAN connects devices in a limited area, such as a home, office, or campus. A WAN connects
					separate LANs over larger geographic distances—from nearby towns to countries or continents.
					Organizations commonly lease connectivity from telecom or Internet service providers instead
					of building and maintaining every long-distance link themselves. The public Internet is a
					global interconnection of many networks.
				</p>
				<TutorialDiagramFrame caption="Each location keeps its own LAN; provider links carry traffic between sites.">
					<WanConnectionsDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3 leading-7">
					WAN links can use fiber, copper, radio, or other access technologies. Fiber is used in both
					LAN and WAN infrastructure because it can support high capacity over long distances; the
					actual service and performance depend on the provider and link.
				</p>
			</section>

			<section aria-labelledby="wan-terms-heading">
				<h2 id="wan-terms-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">WAN devices and terminology</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Router:</strong> Connects customer networks to other networks and forwards traffic using Layer 3 information.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>DTE (Data Terminal Equipment):</strong> Customer-side equipment that sends and receives data; a customer router commonly serves this role.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>DCE (Data Communications Equipment):</strong> Provider-side or line-terminating equipment. In some synchronous serial lab setups, DCE supplies clocking to the DTE.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>CPE (Customer Premises Equipment):</strong> Equipment located at the customer site, such as the router, firewall, or modem. Ownership may belong to the customer or provider.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Demarcation point:</strong> The physical or logical boundary where customer-side responsibility meets the provider network.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Local loop:</strong> The access circuit between the customer premises and the provider’s nearby network facility or point of presence.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>CSU/DSU:</strong> A device historically used to terminate and condition digital leased circuits and provide an interface to customer equipment. Similar functions are often integrated into modern equipment or replaced by current access technologies.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Modem:</strong> Modulates and demodulates signals for a particular access medium. Modern cable, DSL, cellular, and fiber ONT devices differ in how they interface with the provider network.</li>
				</ul>
				<TutorialDiagramFrame caption="The customer-side router and LAN are separated from the provider network at the demarcation point.">
					<WanDemarcationDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="wan-layer2-heading">
				<h2 id="wan-layer2-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">WAN Layer 2 technologies</h2>
				<p className="mt-3 leading-7">
					Traditional point-to-point leased links and packet-switched services are two ways to connect
					remote routers. The provider’s service determines the available link-layer encapsulation.
				</p>
				<TutorialDiagramFrame caption="A leased point-to-point circuit connects two endpoints; a packet-switched service uses a provider network to connect sites.">
					<WanLinkTypesDiagram />
				</TutorialDiagramFrame>
				<div className="mt-5 space-y-4">
					<div className="rounded-2xl border border-[#dbe5f5] p-5">
						<h3 className="font-bold text-[#172642]">HDLC</h3>
						<p className="mt-2 leading-7">
							High-Level Data Link Control is a bit-oriented Layer 2 protocol. Cisco’s default serial
							encapsulation on many Cisco router platforms is Cisco HDLC, which includes a vendor-specific
							field and is not interoperable with every vendor’s HDLC variant. Platform defaults can vary.
						</p>
					</div>
					<div className="rounded-2xl border border-[#dbe5f5] p-5">
						<h3 className="font-bold text-[#172642]">PPP</h3>
						<p className="mt-2 leading-7">
							Point-to-Point Protocol is a standards-based protocol for direct links. Link Control
							Protocol (LCP) establishes and tests the link and can negotiate authentication. Network
							Control Protocols (NCPs) configure network-layer protocols such as IP. PPP supports
							authentication options including PAP and CHAP when configured: PAP transmits credentials
							without encryption, while classic CHAP uses a challenge-response exchange and a
							one-way hash—not encryption of all link traffic.
						</p>
					</div>
					<div className="rounded-2xl border border-[#dbe5f5] p-5">
						<h3 className="font-bold text-[#172642]">Packet switching and Frame Relay</h3>
						<p className="mt-2 leading-7">
							A packet-switched provider network can carry traffic for multiple customer connections
							over shared infrastructure. Frame Relay is a legacy Layer 2 packet-switched WAN
							technology. It detects certain frame errors and discards damaged frames rather than
							providing TCP-like end-to-end retransmission or flow control. ATM is another historical
							packet-switching technology.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

function OsiModelLesson() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="osi-introduction-heading">
				<h2 id="osi-introduction-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Understanding the OSI model</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					The OSI (Open Systems Interconnection) model describes network communication as seven layers of
					responsibility. A letter provides a simple analogy: write the message, put it in an envelope,
					address it, add postage, and hand it to the postal service. The recipient handles the delivery
					steps in reverse before reading the message.
				</p>
				<ol className="mt-4 list-inside list-decimal space-y-1 rounded-xl bg-[#f8faff] p-5 leading-7">
					<li>Write the message.</li>
					<li>Put it in an envelope.</li>
					<li>Add the sender and recipient addresses.</li>
					<li>Add postage.</li>
					<li>Hand it to the postal service.</li>
				</ol>
				<TutorialDiagramFrame caption="The seven OSI layers, their main responsibilities, and their protocol data units.">
					<OsiLayersDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					Network devices also follow a sequence of steps. A sender moves from Layer 7 down to Layer 1;
					the receiving device processes the signal from Layer 1 back up to Layer 7. Engineers often refer
					to layers by number, such as “Layer 3” for the Network layer.
				</p>
				<TutorialDiagramFrame caption="Data is encapsulated as it moves down the sending device's stack and processed in reverse by the receiving device.">
					<OsiSendingReceivingDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4 text-sm leading-6 text-[#71819b]">
					Memory aids from Layer 7 down: <strong>All People Seem To Need Data Processing</strong>.
					From Layer 1 up: <strong>Please Do Not Throw Sausage Pizza Away</strong>.
				</p>
			</section>

			<section aria-labelledby="osi-encapsulation-heading">
				<h2 id="osi-encapsulation-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Encapsulation and decapsulation</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					As data moves down the sending stack, layers add control information—commonly headers, and at the
					Data Link layer also a frame trailer. This wrapping process is called <strong>encapsulation</strong>.
					On receipt, the corresponding information is interpreted and removed as the data moves up the
					stack; this is called <strong>decapsulation</strong>.
				</p>
				<TutorialDiagramFrame caption="Each layer adds or processes its own control information as data travels through the stack.">
					<OsiEncapsulationDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="osi-layer-details-heading">
				<h2 id="osi-layer-details-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Understand each layer</h2>
				<ol className="mt-5 space-y-4">
					{osiLayers.map((layer) => (
						<li key={layer.number} className="border-b border-[#dbe5f5] pb-5 last:border-b-0">
							<h3 className="text-lg font-bold text-[#172642]">Layer {layer.number} – {layer.name} layer</h3>
							<p className="mt-2 leading-7">{layer.description}</p>
							<p className="mt-2 text-sm leading-6 text-[#71819b]"><strong className="text-[#526584]">Examples:</strong> {layer.protocols}</p>
							<p className="mt-1 text-sm leading-6 text-[#71819b]"><strong className="text-[#526584]">PDU:</strong> {layer.pdu} <span className="mx-1">·</span> <strong className="text-[#526584]">Devices:</strong> {layer.devices}</p>
							{layer.number === 2 && (
								<div className="mt-3 rounded-xl bg-[#f8faff] p-4 text-sm leading-6">
									<strong>LLC and MAC:</strong> Ethernet’s Data Link functions are commonly described as
									Logical Link Control (LLC) and Media Access Control (MAC). MAC handles access to
									the medium and link addressing; LLC provides an interface to upper layers. An
									EUI-48 MAC address is 48 bits, though interfaces may use configured or randomized
									addresses rather than only a factory-assigned value.
								</div>
							)}
						</li>
					))}
				</ol>
			</section>

			<section aria-labelledby="osi-example-heading">
				<h2 id="osi-example-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">A postal-service example</h2>
				<p className="mt-4 text-base leading-7 sm:text-lg">
					Imagine Henry sending a document to Charles in another country. The analogy below connects each
					step in preparing and delivering the letter to a responsibility in the OSI model.
				</p>
				<TutorialDiagramFrame caption="A letter-delivery analogy for the responsibilities of the OSI layers.">
					<OsiLetterDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="osi-summary-heading">
				<h2 id="osi-summary-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">OSI model quick reference</h2>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[800px] border-collapse text-left text-sm">
						<thead className="bg-[#a5f3a0] text-[#142414]">
							<tr>
								<th scope="col" className="px-4 py-3 font-bold">Layer</th>
								<th scope="col" className="px-4 py-3 font-bold">Description</th>
								<th scope="col" className="px-4 py-3 font-bold">Popular protocols / examples</th>
								<th scope="col" className="px-4 py-3 font-bold">Protocol data unit</th>
								<th scope="col" className="px-4 py-3 font-bold">Devices</th>
							</tr>
						</thead>
						<tbody>
							{osiLayers.map((layer) => (
								<tr key={layer.number} className="border-t border-[#dbe5f5] align-top">
									<th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-[#172642]">{layer.name}</th>
									<td className="px-4 py-3 leading-6">{layer.description}</td>
									<td className="px-4 py-3 leading-6">{layer.protocols}</td>
									<td className="px-4 py-3">{layer.pdu}</td>
									<td className="px-4 py-3 leading-6">{layer.devices}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section aria-labelledby="osi-troubleshooting-heading" className="rounded-2xl border border-[#dbe5f5] bg-[#f8faff] p-5 sm:p-6">
				<h2 id="osi-troubleshooting-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Using the model in practice</h2>
				<p className="mt-3 leading-7">
					When troubleshooting, work methodically: check the physical signal, local frame and VLAN, IP
					addressing and route, transport connectivity, then the application service. Start at the layer
					most relevant to the evidence you have.
				</p>
				<p className="mt-3 text-sm leading-6 text-[#71819b]">
					OSI is a conceptual reference model. Internet networking is commonly described using the TCP/IP
					model, but the OSI layers remain a useful shared vocabulary for learning and troubleshooting.
				</p>
			</section>
		</div>
	);
}

function CliModesDiagram() {
	return (
		<svg viewBox="0 0 940 470" role="img" aria-labelledby="cli-modes-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="cli-modes-title">Cisco IOS command mode transitions and configuration submodes</title>
			<rect x="8" y="8" width="924" height="454" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Cisco IOS Command Modes</text>
			<rect x="280" y="112" width="380" height="64" rx="14" fill="#e9f4ff" stroke="#1683e8" strokeWidth="3" />
			<text x="470" y="139" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">User EXEC</text>
			<text x="470" y="161" fill="#28577e" fontSize="15" textAnchor="middle">Router&gt;  ·  type enable</text>
			<path d="M470 177v29" stroke="#1683e8" strokeWidth="4" />
			<polygon points="470,210 462,197 478,197" fill="#1683e8" />
			<rect x="280" y="214" width="380" height="64" rx="14" fill="#cfe8ff" stroke="#1683e8" strokeWidth="3" />
			<text x="470" y="241" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">Privileged EXEC</text>
			<text x="470" y="263" fill="#28577e" fontSize="15" textAnchor="middle">Router#  ·  type configure terminal</text>
			<path d="M470 279v29" stroke="#1683e8" strokeWidth="4" />
			<polygon points="470,312 462,299 478,299" fill="#1683e8" />
			<rect x="280" y="316" width="380" height="64" rx="14" fill="#0878d1" />
			<text x="470" y="343" fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">Global Configuration</text>
			<text x="470" y="365" fill="#e9f4ff" fontSize="15" textAnchor="middle">Router(config)#</text>
			<path d="M280 349h-78v37" fill="none" stroke="#1683e8" strokeWidth="3" />
			<path d="M660 349h78v37" fill="none" stroke="#1683e8" strokeWidth="3" />
			<path d="M470 380v37" stroke="#1683e8" strokeWidth="3" />
			<rect x="45" y="386" width="290" height="50" rx="12" fill="#e9f4ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="190" y="407" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">Interface submode</text>
			<text x="190" y="427" fill="#28577e" fontSize="13" textAnchor="middle">interface …  →  (config-if)#</text>
			<rect x="325" y="386" width="290" height="50" rx="12" fill="#e9f4ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="470" y="407" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">Routing submode</text>
			<text x="470" y="427" fill="#28577e" fontSize="13" textAnchor="middle">router …  →  (config-router)#</text>
			<rect x="605" y="386" width="290" height="50" rx="12" fill="#e9f4ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="750" y="407" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">Line submode</text>
			<text x="750" y="427" fill="#28577e" fontSize="13" textAnchor="middle">line …  →  (config-line)#</text>
			<text x="470" y="451" fill="#526584" fontSize="12" textAnchor="middle">Use exit to move back one level; end or Ctrl+Z returns to privileged EXEC.</text>
		</svg>
	);
}

function CliModesLesson() {
	const modes = [
		{
			prompt: "Router>",
			name: "User EXEC",
			privilege: "Typically level 1",
			description: "The initial prompt on many devices. Provides a limited set of basic monitoring and connectivity commands; configuration changes are not made here.",
		},
		{
			prompt: "Router#",
			name: "Privileged EXEC",
			privilege: "Typically level 15",
			description: "Reached with enable. Provides broader inspection, troubleshooting, and management commands. Use configure terminal from here to enter global configuration mode.",
		},
		{
			prompt: "Router(config)#",
			name: "Global configuration",
			privilege: "Configuration mode",
			description: "Entered with configure terminal. Device-wide configuration commands are available, and commands such as interface, router, and line open more specific submodes.",
		},
		{
			prompt: "Router(config-if)#",
			name: "Interface configuration",
			privilege: "Submode",
			description: "Opened from global configuration by selecting an interface, for example interface GigabitEthernet0/0. The actual interface naming varies by device and platform.",
		},
		{
			prompt: "Router(config-router)#",
			name: "Routing configuration",
			privilege: "Submode",
			description: "Opened with a routing-protocol command, for example router ospf 10. Routing process configuration is performed in this context.",
		},
		{
			prompt: "Router(config-line)#",
			name: "Line configuration",
			privilege: "Submode",
			description: "Opened by selecting a line, for example line console 0 or line vty 0 4. Used for applicable console, AUX, or virtual terminal line settings.",
		},
	];

	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="cli-modes-heading">
				<h2 id="cli-modes-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Recognize the prompt and mode</h2>
				<p className="mt-4 leading-7">
					The prompt indicates the current IOS command context. The device name shown below is commonly
					“Router” in examples, but the prompt uses the configured hostname. Commands available in each
					mode vary by platform, software release, and privilege configuration.
				</p>
				<TutorialDiagramFrame caption="The common path moves from user EXEC to privileged EXEC, then to global configuration and its submodes.">
					<CliModesDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="cli-mode-details-heading">
				<h2 id="cli-mode-details-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Common IOS modes</h2>
				<div className="mt-4 space-y-3">
					{modes.map((mode) => (
						<div key={mode.prompt} className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4 sm:p-5">
							<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
								<code className="rounded-md bg-[#e4f1ff] px-2 py-1 font-semibold text-[#0759a5]">{mode.prompt}</code>
								<strong className="text-[#172642]">{mode.name}</strong>
								<span className="text-sm text-[#71819b]">{mode.privilege}</span>
							</div>
							<p className="mt-3 leading-7">{mode.description}</p>
						</div>
					))}
				</div>
				<p className="mt-4 text-sm leading-6 text-[#71819b]">
					Privilege levels 1 and 15 are common defaults for user and privileged EXEC access, but administrators
					can customize access and command availability. Do not assume every device uses identical settings.
				</p>
			</section>

			<section aria-labelledby="cli-navigation-heading" className="rounded-2xl border border-[#dbe5f5] bg-[#f8faff] p-5 sm:p-6">
				<h2 id="cli-navigation-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Moving between modes safely</h2>
				<ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
					<li>At <code>Router&gt;</code>, enter <code>enable</code> to request privileged EXEC access.</li>
					<li>At <code>Router#</code>, enter <code>configure terminal</code> to begin global configuration.</li>
					<li>From global configuration, select a context with commands such as <code>interface GigabitEthernet0/0</code>, <code>router ospf 10</code>, or <code>line vty 0 4</code>.</li>
					<li>Use <code>exit</code> to return one level, or <code>end</code> (often also Ctrl+Z) to return directly to privileged EXEC.</li>
				</ol>
				<p className="mt-4 leading-7">
					Configuration prompts such as <code>(config-if)#</code> identify the submode, but do not always
					make the selected interface or line obvious. Before entering configuration commands, verify
					the selected context and double-check the target identifier. Commands and interface names can
					differ across IOS and IOS XE platforms.
				</p>
			</section>
		</div>
	);
}

function RouterBootDiagram() {
	return (
		<svg viewBox="0 0 940 500" role="img" aria-labelledby="router-boot-diagram-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="router-boot-diagram-title">Cisco router startup sequence from power-on to IOS and configuration</title>
			<rect x="8" y="8" width="924" height="484" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Router Startup: Hardware, IOS, Configuration</text>
			<rect x="305" y="112" width="330" height="52" rx="13" fill="#e9f4ff" stroke="#1683e8" strokeWidth="2" />
			<text x="470" y="145" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">1 · Power on</text>
			<path d="M470 164v24" stroke="#1683e8" strokeWidth="4" />
			<polygon points="470,192 462,179 478,179" fill="#1683e8" />
			<rect x="305" y="196" width="330" height="52" rx="13" fill="#e9f4ff" stroke="#1683e8" strokeWidth="2" />
			<text x="470" y="229" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">2 · POST and bootstrap (ROM)</text>
			<path d="M470 248v24" stroke="#1683e8" strokeWidth="4" />
			<polygon points="470,276 462,263 478,263" fill="#1683e8" />
			<rect x="275" y="280" width="390" height="56" rx="13" fill="#cfe8ff" stroke="#1683e8" strokeWidth="2" />
			<text x="470" y="304" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">3 · Boot loader checks boot settings</text>
			<text x="470" y="326" fill="#28577e" fontSize="14" textAnchor="middle">Configuration register is commonly 0x2102</text>
			<path d="M470 336v25M470 361H245v22M470 361h225v22" fill="none" stroke="#1683e8" strokeWidth="3" />
			<polygon points="245,388 237,375 253,375" fill="#1683e8" />
			<polygon points="695,388 687,375 703,375" fill="#1683e8" />
			<rect x="60" y="392" width="370" height="55" rx="13" fill="#0878d1" />
			<text x="245" y="416" fill="#fff" fontSize="17" fontWeight="700" textAnchor="middle">4 · Select IOS image</text>
			<text x="245" y="438" fill="#e9f4ff" fontSize="14" textAnchor="middle">boot system settings, then platform search rules</text>
			<rect x="510" y="392" width="370" height="55" rx="13" fill="#dceeff" stroke="#1683e8" strokeWidth="2" />
			<text x="695" y="416" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">5 · Load IOS into RAM</text>
			<text x="695" y="438" fill="#28577e" fontSize="14" textAnchor="middle">Image source may be local or network-based</text>
			<path d="M245 447v24h450v-24" fill="none" stroke="#1683e8" strokeWidth="3" />
			<rect x="305" y="448" width="330" height="36" rx="11" fill="#e9f4ff" stroke="#1683e8" strokeWidth="2" />
			<text x="470" y="472" fill="#0759a5" fontSize="14" fontWeight="700" textAnchor="middle">6 · Load startup config from NVRAM or enter setup</text>
		</svg>
	);
}

function RouterBootLesson() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="router-memory-heading">
				<h2 id="router-memory-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Memory used by a router</h2>
				<p className="mt-4 leading-7">
					Many Cisco platforms expose four traditional memory categories. Their exact implementation
					varies by model: modern devices may use different storage layouts, and some functions once
					described as separate memory types may be integrated.
				</p>
				<div className="mt-5 grid gap-4 sm:grid-cols-2">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#0759a5]">ROM</h3>
						<p className="mt-2 leading-7">Non-volatile startup code, bootstrap or boot-loader functions, and hardware diagnostics such as POST. Recovery or limited software may be available on some platforms.</p>
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#0759a5]">Flash</h3>
						<p className="mt-2 leading-7">Persistent storage commonly used for IOS or IOS XE software packages and other files. Contents normally remain when the device reloads.</p>
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#0759a5]">RAM</h3>
						<p className="mt-2 leading-7">Volatile working memory used while the device runs, including operational data and the active running configuration. A reload clears RAM contents.</p>
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#0759a5]">NVRAM</h3>
						<p className="mt-2 leading-7">Traditionally stores the startup configuration across reloads. On some newer platforms, configuration storage is implemented differently while providing similar persistence.</p>
					</div>
				</div>
				<p className="mt-4 rounded-xl bg-[#eaf4ff] p-4 leading-7">
					<strong>Remember:</strong> the running configuration is active in RAM; the saved startup
					configuration is persistent. Use <code>copy running-config startup-config</code> (or the
					platform-supported equivalent) to save configuration changes before a restart.
				</p>
			</section>

			<section aria-labelledby="router-boot-process-heading">
				<h2 id="router-boot-process-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Typical boot sequence</h2>
				<TutorialDiagramFrame caption="A simplified startup flow; exact image and configuration search behavior depends on model, software, and boot settings.">
					<RouterBootDiagram />
				</TutorialDiagramFrame>
				<ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
					<li>Power is applied and the platform performs POST and initializes startup code.</li>
					<li>The bootstrap or boot loader reads boot settings. On many classic Cisco routers, configuration register value <code>0x2102</code> is a normal boot setting; it is not universal across all platforms.</li>
					<li>The device selects an operating-system image according to configured boot commands and platform search behavior. A local flash image is common; network recovery or ROM-based software depends on hardware and configuration.</li>
					<li>The selected software is loaded and initialized in working memory.</li>
					<li>The operating system looks for the saved startup configuration. If it is unavailable, behavior varies: the device may offer an initial setup dialog or continue with defaults. Network configuration retrieval is platform- and environment-dependent.</li>
				</ol>
			</section>

			<section aria-labelledby="router-show-version-heading" className="rounded-2xl border border-[#dbe5f5] bg-[#f8faff] p-5 sm:p-6">
				<h2 id="router-show-version-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Checking memory with <code>show version</code></h2>
				<p className="mt-3 leading-7">
					The <code>show version</code> command reports platform, software, and memory details. Older
					platform output may show two DRAM values such as <code>60416K/5120K</code>; consult that
					platform’s documentation to interpret the fields. In examples where the figures represent
					separate memory pools, their sum is <code>65536 KB</code>, or <code>64 MiB</code> using
					1024-based conversion. Do not assume every IOS version formats memory identically.
				</p>
				<p className="mt-3 leading-7">
					Traditional comparisons are still useful for learning: RAM is volatile, while flash and
					configuration storage are persistent; the startup configuration is used to initialize the
					running configuration. Verify actual storage and boot behavior on the specific router model.
				</p>
			</section>
		</div>
	);
}

function SubnetPrefixDiagram() {
	return (
		<svg viewBox="0 0 940 310" role="img" aria-labelledby="subnet-prefix-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="subnet-prefix-title">A slash 26 IPv4 prefix divides 32 bits into 26 network bits and 6 host bits</title>
			<rect x="8" y="8" width="924" height="294" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">IPv4 Prefix: 192.168.10.0/26</text>
			<text x="52" y="130" fill="#0759a5" fontSize="16" fontWeight="700">Network bits (26)</text>
			<text x="703" y="130" fill="#28577e" fontSize="16" fontWeight="700">Host bits (6)</text>
			{Array.from({ length: 32 }, (_, index) => (
				<g key={index}>
					<rect x={52 + index * 26} y="150" width="23" height="46" rx="4" fill={index < 26 ? "#0878d1" : "#dceeff"} stroke={index < 26 ? "#0759a5" : "#8bbce8"} />
					<text x={63.5 + index * 26} y="180" fill={index < 26 ? "#fff" : "#0759a5"} fontSize="15" fontWeight="700" textAnchor="middle">{index < 26 ? "1" : "0"}</text>
					{[7, 15, 23].includes(index) && <line x1={78 + index * 26} y1="143" x2={78 + index * 26} y2="205" stroke="#526584" strokeWidth="2" />}
				</g>
			))}
			<text x="465" y="238" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">Mask: 255.255.255.192</text>
			<text x="465" y="270" fill="#526584" fontSize="16" textAnchor="middle">2⁶ addresses per /26 block · 64 total addresses</text>
		</svg>
	);
}

function SubnetBlockDiagram() {
	return (
		<svg viewBox="0 0 940 360" role="img" aria-labelledby="subnet-block-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="subnet-block-title">A 192.168.10.0 slash 24 network is split into four slash 26 subnets</title>
			<rect x="8" y="8" width="924" height="344" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Split a /24 into Four /26 Blocks</text>
			<text x="470" y="128" fill="#0759a5" fontSize="19" fontWeight="700" textAnchor="middle">192.168.10.0/24</text>
			<line x1="120" y1="153" x2="820" y2="153" stroke="#1683e8" strokeWidth="4" />
			{[
				["192.168.10.0/26", "0–63"],
				["192.168.10.64/26", "64–127"],
				["192.168.10.128/26", "128–191"],
				["192.168.10.192/26", "192–255"],
			].map(([network, range], index) => (
				<g key={network}>
					<line x1={120 + index * 233} y1="153" x2={120 + index * 233} y2="180" stroke="#1683e8" strokeWidth="3" />
					<rect x={38 + index * 225} y="182" width="210" height="100" rx="13" fill={index % 2 === 0 ? "#e9f4ff" : "#dceeff"} stroke="#8bbce8" strokeWidth="2" />
					<text x={143 + index * 225} y="218" fill="#0759a5" fontSize="15" fontWeight="700" textAnchor="middle">{network}</text>
					<text x={143 + index * 225} y="248" fill="#28577e" fontSize="15" textAnchor="middle">Last octet: {range}</text>
					<text x={143 + index * 225} y="271" fill="#526584" fontSize="13" textAnchor="middle">64 addresses</text>
				</g>
			))}
			<text x="470" y="322" fill="#526584" fontSize="15" textAnchor="middle">Each subnet begins on a multiple of 64 in the last octet.</text>
		</svg>
	);
}

function SubnettingLesson() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="subnetting-prefix-heading">
				<h2 id="subnetting-prefix-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Prefixes and subnet masks</h2>
				<p className="mt-4 leading-7">
					An IPv4 address has 32 bits. A prefix length such as <code>/26</code> says how many leading
					bits identify the network; the remaining bits identify addresses within that subnet. A subnet
					mask represents the same boundary with 1 bits followed by 0 bits. For example,
					<code> /26</code> is <code>255.255.255.192</code>. CIDR prefixes are the standard way to
					describe networks; historical Class A, B, and C defaults are useful background but do not
					limit modern subnet design.
				</p>
				<TutorialDiagramFrame caption="The prefix length counts contiguous network bits from the left; the remaining bits are host bits.">
					<SubnetPrefixDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="subnetting-method-heading">
				<h2 id="subnetting-method-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">A reliable subnetting method</h2>
				<ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
					<li>Write down the address and prefix. Convert the prefix to a dotted-decimal mask if needed.</li>
					<li>Find the interesting octet: the first mask octet that is not 255 (or the relevant octet for a prefix boundary).</li>
					<li>Calculate the block size as <code>256 − mask value</code> in that octet. Subnet network numbers advance by this block size.</li>
					<li>For an ordinary IPv4 subnet with at least two host bits, the network address is the first address, broadcast is the last, and usable host addresses lie between them. Point-to-point and special prefixes have exceptions.</li>
				</ol>
			</section>

			<section aria-labelledby="subnetting-example-heading">
				<h2 id="subnetting-example-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Example: divide a /24 into /26 subnets</h2>
				<p className="mt-3 leading-7">
					Start with <code>192.168.10.0/24</code> and borrow two more network bits to make
					<code> /26</code>. The mask is <code>255.255.255.192</code>, so the block size in the last
					octet is <code>256 − 192 = 64</code>. The four subnet network addresses are 0, 64, 128,
					and 192.
				</p>
				<TutorialDiagramFrame caption="A /24 contains four /26 blocks; each has 64 total addresses.">
					<SubnetBlockDiagram />
				</TutorialDiagramFrame>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[620px] border-collapse text-left text-sm">
						<thead className="bg-[#e6f3ff] text-[#104c87]"><tr><th scope="col" className="px-4 py-3">Network</th><th scope="col" className="px-4 py-3">First host</th><th scope="col" className="px-4 py-3">Last host</th><th scope="col" className="px-4 py-3">Broadcast</th></tr></thead>
						<tbody>
							{[
								["192.168.10.0/26", "192.168.10.1", "192.168.10.62", "192.168.10.63"],
								["192.168.10.64/26", "192.168.10.65", "192.168.10.126", "192.168.10.127"],
								["192.168.10.128/26", "192.168.10.129", "192.168.10.190", "192.168.10.191"],
								["192.168.10.192/26", "192.168.10.193", "192.168.10.254", "192.168.10.255"],
							].map(([network, first, last, broadcast]) => (
								<tr key={network} className="border-t border-[#dbe5f5]">
									<th scope="row" className="px-4 py-3 font-semibold text-[#172642]">{network}</th>
									<td className="px-4 py-3">{first}</td><td className="px-4 py-3">{last}</td><td className="px-4 py-3">{broadcast}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-4 leading-7">
					For <code>192.168.10.70/26</code>, the block containing 70 starts at 64 and ends at 127.
					Therefore its network is <code>192.168.10.64</code>, broadcast is <code>192.168.10.127</code>,
					and its usual usable range is <code>192.168.10.65–192.168.10.126</code>.
				</p>
			</section>

			<section aria-labelledby="subnetting-sizing-heading" className="rounded-2xl border border-[#dbe5f5] bg-[#f8faff] p-5 sm:p-6">
				<h2 id="subnetting-sizing-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Subnet size and planning</h2>
				<p className="mt-3 leading-7">
					If a subnet leaves <em>h</em> host bits, it has <code>2ʰ</code> total addresses. A common
					traditional subnet with <em>h</em> at least 2 has <code>2ʰ − 2</code> ordinary host
					addresses, excluding network and directed-broadcast addresses. Special cases include
					<code>/31</code> point-to-point links and <code>/32</code> host routes. With variable-length
					subnet masking (VLSM), choose a different prefix for each subnet according to its size, and
					allocate non-overlapping ranges carefully.
				</p>
			</section>
		</div>
	);
}

function WirelessArchitectureDiagram() {
	return (
		<svg viewBox="0 0 940 390" role="img" aria-labelledby="wireless-architecture-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wireless-architecture-title">Wireless clients connect through access points in a basic and extended service set</title>
			<rect x="8" y="8" width="924" height="374" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Infrastructure WLAN: BSS and ESS</text>
			<rect x="35" y="121" width="390" height="216" rx="18" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="230" y="153" fill="#104c87" fontSize="19" fontWeight="700" textAnchor="middle">BSS · one access point</text>
			<circle cx="230" cy="232" r="74" fill="#dceeff" stroke="#8bbce8" strokeDasharray="7 6" strokeWidth="2" />
			<rect x="194" y="207" width="72" height="52" rx="12" fill="#0878d1" />
			<text x="230" y="239" fill="#fff" fontSize="14" fontWeight="700" textAnchor="middle">AP</text>
			<rect x="71" y="195" width="82" height="42" rx="10" fill="#fff" stroke="#1683e8" strokeWidth="2" />
			<text x="112" y="222" fill="#0759a5" fontSize="13" fontWeight="700" textAnchor="middle">Client</text>
			<rect x="307" y="195" width="82" height="42" rx="10" fill="#fff" stroke="#1683e8" strokeWidth="2" />
			<text x="348" y="222" fill="#0759a5" fontSize="13" fontWeight="700" textAnchor="middle">Client</text>
			<path d="M153 216h38M267 216h40" stroke="#1683e8" strokeWidth="3" strokeDasharray="6 5" />
			<rect x="515" y="121" width="390" height="216" rx="18" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="710" y="153" fill="#104c87" fontSize="19" fontWeight="700" textAnchor="middle">ESS · multiple APs</text>
			<circle cx="660" cy="226" r="61" fill="#dceeff" stroke="#8bbce8" strokeDasharray="7 6" strokeWidth="2" />
			<circle cx="760" cy="226" r="61" fill="#e9f4ff" stroke="#8bbce8" strokeDasharray="7 6" strokeWidth="2" />
			<rect x="631" y="208" width="58" height="40" rx="10" fill="#0878d1" />
			<text x="660" y="233" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">AP 1</text>
			<rect x="731" y="208" width="58" height="40" rx="10" fill="#0878d1" />
			<text x="760" y="233" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">AP 2</text>
			<rect x="818" y="201" width="68" height="42" rx="10" fill="#fff" stroke="#1683e8" strokeWidth="2" />
			<text x="852" y="228" fill="#0759a5" fontSize="12" fontWeight="700" textAnchor="middle">Client</text>
			<path d="M789 222h29" stroke="#1683e8" strokeWidth="3" strokeDasharray="6 5" />
			<text x="710" y="309" fill="#526584" fontSize="14" textAnchor="middle">Shared network · client can roam between APs</text>
			<text x="470" y="364" fill="#526584" fontSize="14" textAnchor="middle">Roaming support requires compatible configuration; the client participates in AP selection.</text>
		</svg>
	);
}

function WirelessRadioDiagram() {
	return (
		<svg viewBox="0 0 940 360" role="img" aria-labelledby="wireless-radio-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wireless-radio-title">Radio channels share spectrum and nearby networks can overlap</title>
			<rect x="8" y="8" width="924" height="344" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Wi-Fi Channels and Shared Spectrum</text>
			<text x="85" y="135" fill="#0759a5" fontSize="17" fontWeight="700">2.4 GHz band · illustrative 20 MHz channels</text>
			<line x1="92" y1="270" x2="850" y2="270" stroke="#526584" strokeWidth="2" />
			{[
				{ x: 174, label: "1", color: "#0878d1" },
				{ x: 470, label: "6", color: "#3996e8" },
				{ x: 766, label: "11", color: "#74b6ee" },
			].map((channel) => (
				<g key={channel.label}>
					<path d={`M${channel.x - 112} 270 Q${channel.x} 131 ${channel.x + 112} 270`} fill="none" stroke={channel.color} strokeWidth="8" />
					<line x1={channel.x} y1="265" x2={channel.x} y2="278" stroke="#526584" strokeWidth="2" />
					<text x={channel.x} y="302" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">Channel {channel.label}</text>
				</g>
			))}
			<text x="470" y="334" fill="#526584" fontSize="14" textAnchor="middle">Channel availability, widths, and permitted power vary by country and device.</text>
		</svg>
	);
}

function WirelessSecurityDiagram() {
	return (
		<svg viewBox="0 0 940 310" role="img" aria-labelledby="wireless-security-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wireless-security-title">Wireless security generations from deprecated WEP to WPA3 and current WPA2</title>
			<rect x="8" y="8" width="924" height="294" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Wi-Fi Security: Prefer Current Standards</text>
			{[
				{ x: 44, title: "WEP", sub: "Broken · do not use", fill: "#f1f7ff", stroke: "#8bbce8" },
				{ x: 270, title: "WPA", sub: "Legacy · do not use", fill: "#e9f4ff", stroke: "#8bbce8" },
				{ x: 496, title: "WPA2", sub: "AES-CCMP · configure securely", fill: "#cfe8ff", stroke: "#1683e8" },
				{ x: 722, title: "WPA3", sub: "Preferred when supported", fill: "#0878d1", stroke: "#0759a5" },
			].map((item, index) => (
				<g key={item.title}>
					<rect x={item.x} y="139" width="174" height="93" rx="15" fill={item.fill} stroke={item.stroke} strokeWidth="2" />
					<text x={item.x + 87} y="174" fill={index === 3 ? "#fff" : "#0759a5"} fontSize="21" fontWeight="700" textAnchor="middle">{item.title}</text>
					<text x={item.x + 87} y="202" fill={index === 3 ? "#e9f4ff" : "#28577e"} fontSize="12" textAnchor="middle">{item.sub}</text>
					{index < 3 && <path d={`M${item.x + 177} 185h39`} stroke="#1683e8" strokeWidth="3" />}
				</g>
			))}
			<text x="470" y="272" fill="#526584" fontSize="14" textAnchor="middle">Use strong unique credentials; enterprise networks can use 802.1X and RADIUS.</text>
		</svg>
	);
}

function WirelessInterferenceDiagram() {
	return (
		<svg viewBox="0 0 940 330" role="img" aria-labelledby="wireless-interference-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="wireless-interference-title">Wi-Fi interference and signal loss from neighboring radios and physical obstacles</title>
			<rect x="8" y="8" width="924" height="314" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Common Sources of Wi-Fi Disruption</text>
			<rect x="370" y="139" width="190" height="78" rx="16" fill="#0878d1" />
			<text x="465" y="170" fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">Wi-Fi access point</text>
			<text x="465" y="195" fill="#e9f4ff" fontSize="14" textAnchor="middle">shared radio channel</text>
			{[
				{ x: 56, y: 125, label: "Neighboring\nWi-Fi networks" },
				{ x: 56, y: 232, label: "Bluetooth and\nother 2.4 GHz radios" },
				{ x: 704, y: 125, label: "Microwave ovens\n(near 2.45 GHz)" },
				{ x: 704, y: 232, label: "Walls, metal,\nand distance" },
			].map((source) => (
				<g key={source.label}>
					<rect x={source.x} y={source.y} width="180" height="58" rx="12" fill="#e9f4ff" stroke="#8bbce8" strokeWidth="2" />
					<text x={source.x + 90} y={source.y + 24} fill="#0759a5" fontSize="14" fontWeight="700" textAnchor="middle">
						{source.label.split("\n").map((line, index) => <tspan key={line} x={source.x + 90} dy={index === 0 ? 0 : 19}>{line}</tspan>)}
					</text>
				</g>
			))}
			<path d="M236 154h134M236 260h134M560 154h144M560 260h144" stroke="#1683e8" strokeWidth="3" strokeDasharray="7 6" />
			<text x="465" y="302" fill="#526584" fontSize="14" textAnchor="middle">Congestion, interference, attenuation, and reflections can reduce throughput and coverage.</text>
		</svg>
	);
}

function WirelessPageOne() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="wireless-basics-heading">
				<h2 id="wireless-basics-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Wireless LAN fundamentals</h2>
				<p className="mt-4 leading-7">
					A wireless LAN (WLAN) carries network traffic over radio waves instead of a dedicated cable
					between each client and the access network. Wi-Fi is the familiar name for interoperable
					products based on IEEE 802.11. Radio is a shared medium: devices on a channel take turns
					transmitting, and performance depends on signal quality, contention, configuration, and
					capacity.
				</p>
				<p className="mt-3 leading-7">
					Wi-Fi uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance), not Ethernet’s
					legacy CSMA/CD method. A client listens, waits for the medium to become available, and uses
					random backoff before transmitting. Acknowledgements and retries are used for many unicast
					frames when needed. Radio communication on a single channel is half-duplex: a radio cannot
					transmit and receive on that same channel at the same moment.
				</p>
			</section>

			<section aria-labelledby="wireless-modes-heading">
				<h2 id="wireless-modes-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">WLAN modes and architecture</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Ad hoc:</strong> Devices communicate directly without an access point. This peer-to-peer mode exists in the 802.11 model but is uncommon in managed enterprise WLAN deployments.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Infrastructure BSS:</strong> A basic service set is organized around an access point and its associated wireless clients.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>ESS:</strong> An extended service set links multiple access points into a larger WLAN, typically with coordinated network configuration and coverage. Clients make roaming decisions with support from the WLAN infrastructure.</li>
				</ul>
				<TutorialDiagramFrame caption="A BSS uses one AP; an ESS joins multiple AP cells to provide broader coverage and roaming.">
					<WirelessArchitectureDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3 leading-7">
					An SSID is the network name advertised or configured for clients. Using the same SSID across
					a managed ESS is common, but roaming also depends on compatible security, network settings,
					and client behavior. AP cells should be planned to limit co-channel interference and provide
					usable coverage; there is no universal overlap percentage that suits every design.
				</p>
			</section>

			<section aria-labelledby="wireless-bands-heading">
				<h2 id="wireless-bands-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Wi-Fi bands and channels</h2>
				<p className="mt-3 leading-7">
					Wi-Fi equipment may operate in 2.4 GHz, 5 GHz, and—where supported and permitted—6 GHz
					spectrum. Lower frequencies often reach farther through obstacles, while wider, less
					congested channels can provide greater capacity at shorter distances. Regulatory rules,
					available channels, and transmit-power limits differ by country.
				</p>
				<TutorialDiagramFrame caption="Channels 1, 6, and 11 are a common non-overlapping 20 MHz plan in some 2.4 GHz regulatory domains; confirm local rules and channel widths.">
					<WirelessRadioDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3 leading-7">
					The classic 802.11a/b/g names describe early Wi-Fi generations and are now legacy. Modern
					standards such as 802.11ax (Wi-Fi 6/6E) and 802.11be (Wi-Fi 7) improve efficiency and
					capacity. Real throughput depends on supported features, channel conditions, client capability,
					and access-point configuration—not only the advertised maximum link rate.
				</p>
			</section>
		</div>
	);
}

function WirelessPageTwo() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="wireless-encoding-heading">
				<h2 id="wireless-encoding-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Radio encoding and spread spectrum</h2>
				<p className="mt-4 leading-7">
					802.11 physical layers encode bits into radio signals using modulation and coding schemes.
					Some older techniques remain useful for understanding the history of WLANs, even though
					they are not the main techniques in current Wi-Fi generations.
				</p>
				<div className="mt-5 space-y-3">
					<div className="rounded-xl border border-[#dbe5f5] p-5 leading-7"><strong>FHSS:</strong> Frequency-Hopping Spread Spectrum rapidly changes carrier frequencies according to a shared pattern. It appeared in early WLAN technologies and is also associated with some other radio systems.</div>
					<div className="rounded-xl border border-[#dbe5f5] p-5 leading-7"><strong>DSSS:</strong> Direct-Sequence Spread Spectrum spreads a signal using a code sequence. Early 802.11 systems used DSSS; 802.11b is a well-known legacy example.</div>
					<div className="rounded-xl border border-[#dbe5f5] p-5 leading-7"><strong>OFDM and OFDMA:</strong> Orthogonal Frequency-Division Multiplexing divides a channel into orthogonal subcarriers. OFDM is used in multiple Wi-Fi generations; OFDMA in newer standards can schedule groups of subcarriers for multiple clients.</div>
				</div>
			</section>

			<section aria-labelledby="wireless-security-heading">
				<h2 id="wireless-security-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Wireless security standards</h2>
				<p className="mt-3 leading-7">
					Use current security settings and keep access-point firmware updated. WEP and original WPA
					are insecure legacy standards and should not be enabled. Prefer WPA3 when supported; WPA2
					with AES-CCMP remains common for compatible equipment. Avoid outdated TKIP-only configurations.
				</p>
				<TutorialDiagramFrame caption="WEP and original WPA are obsolete; prefer WPA3 or securely configured WPA2 with AES-CCMP where required for compatibility.">
					<WirelessSecurityDiagram />
				</TutorialDiagramFrame>
				<ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
					<li>For a personal WLAN, use a long, unique passphrase and modern protected management-frame settings where available.</li>
					<li>Enterprise WLANs commonly authenticate users or devices using 802.1X with a backend such as RADIUS.</li>
					<li>Security capabilities depend on both the access point and client; choose compatible settings rather than weakening security unnecessarily.</li>
				</ul>
			</section>

			<section aria-labelledby="wireless-interference-heading">
				<h2 id="wireless-interference-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Interference and coverage challenges</h2>
				<p className="mt-3 leading-7">
					Unlicensed spectrum is shared with nearby Wi-Fi networks and other radio devices. Bluetooth,
					some cordless devices, and microwave ovens can affect 2.4 GHz operation. In addition, walls,
					metal, distance, and reflective surfaces can weaken or distort a signal. A nearby network
					using the same channel often causes contention even when it is not a non-Wi-Fi interferer.
				</p>
				<TutorialDiagramFrame caption="Both competing transmitters and physical obstacles can reduce WLAN performance.">
					<WirelessInterferenceDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3 leading-7">
					To improve service, survey the site, choose permitted channels and sensible channel widths,
					place APs for coverage and capacity, and investigate client signal and retry statistics.
					Adding access points without channel planning can increase contention instead of solving it.
				</p>
			</section>
		</div>
	);
}

function WirelessLesson() {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<>
			{currentPage === 1 ? <WirelessPageOne /> : <WirelessPageTwo />}
			<nav className="mt-8 flex items-center justify-between border-t border-[#dbe5f5] pt-6" aria-label="Wireless tutorial pages">
				<button
					type="button"
					onClick={() => setCurrentPage(1)}
					disabled={currentPage === 1}
					className="inline-flex items-center gap-2 rounded-xl border border-[#dbe5f5] px-4 py-3 font-semibold text-[#2354d4] transition hover:bg-[#f1f6ff] disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronLeft size={18} /> Previous
				</button>
				<span className="text-sm font-semibold text-[#526584]" aria-live="polite">Page {currentPage} of 2</span>
				<button
					type="button"
					onClick={() => setCurrentPage(2)}
					disabled={currentPage === 2}
					className="inline-flex items-center gap-2 rounded-xl border border-[#dbe5f5] px-4 py-3 font-semibold text-[#2354d4] transition hover:bg-[#f1f6ff] disabled:cursor-not-allowed disabled:opacity-40"
				>
					Next <ChevronRight size={18} />
				</button>
			</nav>
		</>
	);
}

function Ipv6AddressDiagram() {
	return (
		<svg viewBox="0 0 940 360" role="img" aria-labelledby="ipv6-address-diagram-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="ipv6-address-diagram-title">IPv6 address split into eight hexadecimal hextets and a typical 64-bit prefix and interface identifier</title>
			<rect x="8" y="8" width="924" height="344" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">IPv6 Address Structure</text>
			<text x="50" y="132" fill="#0759a5" fontSize="18" fontWeight="700">2001:0DB8:0000:0001:0000:0000:0000:0001/64</text>
			{["2001", "0DB8", "0000", "0001", "0000", "0000", "0000", "0001"].map((field, index) => (
				<g key={`${field}-${index}`}>
					<rect x={50 + index * 106} y="158" width="98" height="54" rx="9" fill={index < 4 ? "#0878d1" : "#dceeff"} stroke={index < 4 ? "#0759a5" : "#8bbce8"} strokeWidth="2" />
					<text x={99 + index * 106} y="192" fill={index < 4 ? "#fff" : "#0759a5"} fontSize="17" fontWeight="700" textAnchor="middle">{field}</text>
				</g>
			))}
			<text x="250" y="249" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">First 64 bits · typical subnet prefix</text>
			<text x="674" y="249" fill="#28577e" fontSize="17" fontWeight="700" textAnchor="middle">Last 64 bits · interface identifier</text>
			<path d="M50 222v12h424v-12M474 222v12h424v-12" fill="none" stroke="#1683e8" strokeWidth="2" />
			<text x="470" y="302" fill="#526584" fontSize="15" textAnchor="middle">An IPv6 address has 128 bits; /64 is common on LANs, but prefix sizes depend on purpose.</text>
			<text x="470" y="328" fill="#526584" fontSize="14" textAnchor="middle">Addresses belong to interfaces, and one interface can have multiple IPv6 addresses.</text>
		</svg>
	);
}

function Ipv6PrefixAllocationDiagram() {
	return (
		<svg viewBox="0 0 940 360" role="img" aria-labelledby="ipv6-allocation-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="ipv6-allocation-title">Illustrative IPv6 allocation from a provider prefix to site and LAN prefixes</title>
			<rect x="8" y="8" width="924" height="344" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">An Illustrative IPv6 Prefix Plan</text>
			<rect x="45" y="132" width="245" height="78" rx="13" fill="#e9f4ff" stroke="#8bbce8" strokeWidth="2" />
			<text x="167" y="162" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">Provider allocation</text>
			<text x="167" y="190" fill="#28577e" fontSize="18" textAnchor="middle">2001:db8:1200::/40</text>
			<path d="M290 171h45" stroke="#1683e8" strokeWidth="4" />
			<polygon points="335,171 322,163 322,179" fill="#1683e8" />
			<rect x="340" y="132" width="245" height="78" rx="13" fill="#cfe8ff" stroke="#1683e8" strokeWidth="2" />
			<text x="462" y="162" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">Site allocation</text>
			<text x="462" y="190" fill="#28577e" fontSize="18" textAnchor="middle">2001:db8:1200::/48</text>
			<path d="M585 171h45" stroke="#1683e8" strokeWidth="4" />
			<polygon points="630,171 617,163 617,179" fill="#1683e8" />
			<rect x="635" y="132" width="260" height="78" rx="13" fill="#0878d1" />
			<text x="765" y="162" fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">Example LAN</text>
			<text x="765" y="190" fill="#e9f4ff" fontSize="18" textAnchor="middle">2001:db8:1200:1::/64</text>
			<text x="470" y="257" fill="#526584" fontSize="15" textAnchor="middle">Documentation-only prefix shown for learning; real allocations follow registry and provider policy.</text>
			<text x="470" y="285" fill="#526584" fontSize="15" textAnchor="middle">Organizations receive prefixes sized for their needs; /48 and /64 are common patterns, not universal rules.</text>
			<text x="470" y="315" fill="#0759a5" fontSize="16" fontWeight="700" textAnchor="middle">Network bits are determined by the announced prefix length, not a fixed IPv6 class.</text>
		</svg>
	);
}

function Ipv6ScopesDiagram() {
	return (
		<svg viewBox="0 0 940 380" role="img" aria-labelledby="ipv6-scopes-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="ipv6-scopes-title">Global unicast is routable beyond a link, unique local is private, link-local stays on the local link, and multicast targets groups</title>
			<rect x="8" y="8" width="924" height="364" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">IPv6 Address Types and Scope</text>
			{[
				{ y: 116, title: "Global unicast", prefix: "2000::/3 · globally routed", fill: "#0878d1", note: "Routable according to network policy" },
				{ y: 177, title: "Unique local", prefix: "FC00::/7 · private routing domain", fill: "#3996e8", note: "Private use · not for global routing" },
				{ y: 238, title: "Link-local", prefix: "FE80::/10 · local link only", fill: "#74b6ee", note: "Neighbor discovery · not forwarded by routers" },
				{ y: 299, title: "Multicast", prefix: "FF00::/8 · group destination", fill: "#dceeff", note: "Group delivery · IPv6 has no broadcast" },
			].map((type) => (
				<g key={type.title}>
					<rect x="48" y={type.y} width="410" height="43" rx="10" fill={type.fill} />
					<text x="63" y={type.y + 18} fill={type.title === "Multicast" ? "#0759a5" : "#fff"} fontSize="14" fontWeight="700">{type.title}</text>
					<text x="63" y={type.y + 36} fill={type.title === "Multicast" ? "#28577e" : "#e9f4ff"} fontSize="12">{type.prefix}</text>
					<text x="480" y={type.y + 26} fill="#526584" fontSize="14">{type.note}</text>
				</g>
			))}
			<text x="470" y="359" fill="#526584" fontSize="13" textAnchor="middle">Anycast uses a unicast-format address assigned to multiple interfaces; routing delivers to a nearest instance.</text>
		</svg>
	);
}

function Ipv6MulticastDiagram() {
	return (
		<svg viewBox="0 0 940 330" role="img" aria-labelledby="ipv6-multicast-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="ipv6-multicast-title">IPv6 multicast groups including all nodes, all routers, and solicited-node multicast</title>
			<rect x="8" y="8" width="924" height="314" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Well-Known Link-Local Multicast Groups</text>
			<rect x="55" y="130" width="240" height="100" rx="15" fill="#e9f4ff" stroke="#8bbce8" strokeWidth="2" />
			<text x="175" y="166" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">FF02::1</text>
			<text x="175" y="197" fill="#28577e" fontSize="15" textAnchor="middle">All IPv6 nodes on this link</text>
			<rect x="350" y="130" width="240" height="100" rx="15" fill="#cfe8ff" stroke="#1683e8" strokeWidth="2" />
			<text x="470" y="166" fill="#0759a5" fontSize="18" fontWeight="700" textAnchor="middle">FF02::2</text>
			<text x="470" y="197" fill="#28577e" fontSize="15" textAnchor="middle">All IPv6 routers on this link</text>
			<rect x="645" y="130" width="240" height="100" rx="15" fill="#0878d1" />
			<text x="765" y="166" fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle">FF02::1:FFxx:xxxx</text>
			<text x="765" y="197" fill="#e9f4ff" fontSize="15" textAnchor="middle">Solicited-node group</text>
			<text x="470" y="276" fill="#526584" fontSize="14" textAnchor="middle">The final 24 bits are derived from the interface’s unicast or anycast address.</text>
			<text x="470" y="299" fill="#526584" fontSize="14" textAnchor="middle">Neighbor Discovery uses multicast; IPv6 does not use broadcast addresses.</text>
		</svg>
	);
}

function Ipv6PageOne() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="ipv6-purpose-heading">
				<h2 id="ipv6-purpose-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Why IPv6?</h2>
				<p className="mt-4 leading-7">
					IPv4 uses 32-bit addresses. IPv6 uses 128-bit addresses, providing a vastly larger address
					space and supporting modern network growth. Network Address Translation remains widely used
					in IPv4 networks, but it does not remove the need for globally unique address space and
					end-to-end network design. IPv6 was standardized by the IETF; IPv5 was an experimental
					stream-protocol version and was not deployed as the successor to IPv4.
				</p>
				<p className="mt-3 leading-7">
					An IPv6 address belongs to a network interface, not an entire device. One interface may
					have multiple IPv6 addresses—for example, a link-local address and one or more unicast
					addresses.
				</p>
			</section>

			<section aria-labelledby="ipv6-format-heading">
				<h2 id="ipv6-format-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">IPv6 address format</h2>
				<p className="mt-3 leading-7">
					An IPv6 address contains 128 bits, written as eight 16-bit hexadecimal fields separated
					by colons. Each field is called a hextet and can contain one to four hexadecimal digits
					after abbreviation. Hexadecimal letters are case-insensitive.
				</p>
				<TutorialDiagramFrame caption="Eight hextets make up 128 bits. A /64 commonly divides the first four hextets from the interface identifier, but not every IPv6 prefix is /64.">
					<Ipv6AddressDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="ipv6-shortening-heading">
				<h2 id="ipv6-shortening-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Shortening IPv6 addresses</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Remove leading zeros</strong> in each field: <code>2001:0DB8:0000:0001:0000:0000:0000:0001</code> becomes <code>2001:DB8:0:1:0:0:0:1</code>.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Replace one longest consecutive run of all-zero fields with ::</strong>: <code>2001:DB8:0:1:0:0:0:1</code> becomes <code>2001:DB8:0:1::1</code>. If there is a tie, either longest run may be compressed.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Use :: no more than once</strong> in an address because it represents one or more unknown zero fields. The all-zero address is <code>::</code>, and loopback is <code>::1</code>.</li>
				</ul>
				<p className="mt-4 leading-7">
					For example, <code>2001:000C:0007:ABCD:0000:0000:0000:0001/64</code> can be written as
					<code> 2001:C:7:ABCD::1/64</code>. Expanding it restores the eight hextets. In this example,
					<code> /64</code> marks the first 64 bits as the prefix.
				</p>
			</section>

			<section aria-labelledby="ipv6-address-types-heading">
				<h2 id="ipv6-address-types-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">IPv6 address types</h2>
				<div className="mt-4 space-y-3">
					<div className="rounded-xl border border-[#dbe5f5] p-4 leading-7"><strong>Unicast:</strong> Identifies one interface. Global unicast, unique-local, and link-local addresses are common unicast categories.</div>
					<div className="rounded-xl border border-[#dbe5f5] p-4 leading-7"><strong>Multicast:</strong> Identifies a group of interfaces; packets are delivered to group members within the address scope. IPv6 does not use broadcast addresses.</div>
					<div className="rounded-xl border border-[#dbe5f5] p-4 leading-7"><strong>Anycast:</strong> A unicast-format address assigned to multiple interfaces. Routing delivers a packet to one of the instances, usually the nearest according to routing metrics and policy.</div>
				</div>
				<p className="mt-4 leading-7">
					An interface can be assigned multiple addresses and can participate in multicast groups. The
					next page covers prefix allocation, scopes, and common multicast addresses.
				</p>
			</section>
		</div>
	);
}

function Ipv6PageTwo() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="ipv6-prefix-heading">
				<h2 id="ipv6-prefix-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Prefixes and address planning</h2>
				<p className="mt-4 leading-7">
					IPv6 uses CIDR notation: the number after the slash counts contiguous prefix bits from the
					left. For <code>2001:db8:1234:1::25/64</code>, the first 64 bits form the prefix
					<code> 2001:db8:1234:1::/64</code>; the remaining bits identify an address within that
					prefix. <code>2001:db8::/32</code> is reserved for documentation and examples, not normal
					public assignment.
				</p>
				<p className="mt-3 leading-7">
					Address allocation is coordinated through IANA and the Regional Internet Registry system,
					with policies that can change. A common planning pattern is a provider allocation, a smaller
					prefix assigned to a site, and a /64 for each LAN. Prefix lengths should follow the actual
					design and provider policy; IPv6 is not divided into legacy address classes.
				</p>
				<TutorialDiagramFrame caption="This diagram uses the documentation prefix 2001:db8::/32 to illustrate hierarchical prefix delegation only.">
					<Ipv6PrefixAllocationDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="ipv6-scopes-heading">
				<h2 id="ipv6-scopes-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Address scopes and special ranges</h2>
				<TutorialDiagramFrame caption="Scope describes where an address is meaningful or routable; actual forwarding also depends on network configuration.">
					<Ipv6ScopesDiagram />
				</TutorialDiagramFrame>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Global unicast:</strong> Publicly routable address space; the currently defined global unicast allocation is within <code>2000::/3</code>.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Unique local (ULA):</strong> <code>FC00::/7</code> is intended for private local communications. Locally generated ULAs commonly use the <code>FD</code> prefix. They are not intended to be routed on the global Internet.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Link-local:</strong> <code>FE80::/10</code> is used on a single link for neighbor discovery and other local functions. Routers do not forward link-local traffic to another link. A link-local address is required on IPv6-enabled interfaces; its interface identifier is not necessarily derived from a MAC address.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Site-local:</strong> The former <code>FEC0::/10</code> site-local range is deprecated. Use unique-local addressing for private IPv6 addressing instead.</li>
				</ul>
			</section>

			<section aria-labelledby="ipv6-multicast-heading">
				<h2 id="ipv6-multicast-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Multicast groups used on a link</h2>
				<p className="mt-3 leading-7">
					IPv6 multicast addresses begin with <code>FF</code>. The scope field indicates the intended
					reach, such as a link-local group. Hosts join groups needed by IPv6 operation; multicast
					replaces broadcast for functions such as address resolution and router discovery.
				</p>
				<TutorialDiagramFrame caption="Examples of multicast groups used by nodes and routers on a link.">
					<Ipv6MulticastDiagram />
				</TutorialDiagramFrame>
				<ul className="mt-4 space-y-2 leading-7">
					<li><code>FF02::1</code> — all IPv6 nodes on the local link.</li>
					<li><code>FF02::2</code> — all IPv6 routers on the local link.</li>
					<li><code>FF02::1:FF00:0/104</code> — solicited-node multicast prefix; an interface’s group uses the low-order 24 bits of its unicast or anycast address.</li>
				</ul>
				<p className="mt-4 leading-7">
					IPv6 Neighbor Discovery uses ICMPv6 and multicast rather than ARP broadcasts. Routing
					protocols also use protocol-specific multicast groups where appropriate.
				</p>
			</section>
		</div>
	);
}

function Ipv6Lesson() {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<>
			{currentPage === 1 ? <Ipv6PageOne /> : <Ipv6PageTwo />}
			<nav className="mt-8 flex items-center justify-between border-t border-[#dbe5f5] pt-6" aria-label="IPv6 tutorial pages">
				<button
					type="button"
					onClick={() => setCurrentPage(1)}
					disabled={currentPage === 1}
					className="inline-flex items-center gap-2 rounded-xl border border-[#dbe5f5] px-4 py-3 font-semibold text-[#2354d4] transition hover:bg-[#f1f6ff] disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronLeft size={18} /> Previous
				</button>
				<span className="text-sm font-semibold text-[#526584]" aria-live="polite">Page {currentPage} of 2</span>
				<button
					type="button"
					onClick={() => setCurrentPage(2)}
					disabled={currentPage === 2}
					className="inline-flex items-center gap-2 rounded-xl border border-[#dbe5f5] px-4 py-3 font-semibold text-[#2354d4] transition hover:bg-[#f1f6ff] disabled:cursor-not-allowed disabled:opacity-40"
				>
					Next <ChevronRight size={18} />
				</button>
			</nav>
		</>
	);
}

function HypervisorTypesDiagram() {
	return (
		<svg viewBox="0 0 940 390" role="img" aria-labelledby="hypervisor-types-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="hypervisor-types-title">Type 1 hypervisor runs on host hardware while type 2 runs above a host operating system</title>
			<rect x="8" y="8" width="924" height="374" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Type 1 and Type 2 Hypervisors</text>
			<text x="250" y="128" fill="#0759a5" fontSize="19" fontWeight="700" textAnchor="middle">Type 1 · native/bare metal</text>
			<rect x="75" y="151" width="350" height="48" rx="11" fill="#0878d1" />
			<text x="250" y="181" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">Virtual machines and guest OSs</text>
			<rect x="75" y="207" width="350" height="54" rx="11" fill="#cfe8ff" stroke="#1683e8" strokeWidth="2" />
			<text x="250" y="240" fill="#0759a5" fontSize="16" fontWeight="700" textAnchor="middle">Hypervisor</text>
			<rect x="75" y="269" width="350" height="50" rx="11" fill="#e9f4ff" stroke="#8bbce8" strokeWidth="2" />
			<text x="250" y="300" fill="#28577e" fontSize="16" fontWeight="700" textAnchor="middle">Physical hardware</text>
			<text x="690" y="128" fill="#0759a5" fontSize="19" fontWeight="700" textAnchor="middle">Type 2 · hosted</text>
			<rect x="515" y="151" width="350" height="48" rx="11" fill="#0878d1" />
			<text x="690" y="181" fill="#fff" fontSize="16" fontWeight="700" textAnchor="middle">Virtual machines and guest OSs</text>
			<rect x="515" y="207" width="350" height="54" rx="11" fill="#cfe8ff" stroke="#1683e8" strokeWidth="2" />
			<text x="690" y="240" fill="#0759a5" fontSize="16" fontWeight="700" textAnchor="middle">Hosted hypervisor application</text>
			<rect x="515" y="269" width="350" height="50" rx="11" fill="#e9f4ff" stroke="#8bbce8" strokeWidth="2" />
			<text x="690" y="300" fill="#28577e" fontSize="16" fontWeight="700" textAnchor="middle">Host operating system</text>
			<text x="690" y="340" fill="#28577e" fontSize="15" fontWeight="700" textAnchor="middle">Physical hardware</text>
			<text x="470" y="365" fill="#526584" fontSize="14" textAnchor="middle">Type describes the architecture; product labels and features vary by platform.</text>
		</svg>
	);
}

function VirtualNetworkDiagram() {
	return (
		<svg viewBox="0 0 940 340" role="img" aria-labelledby="virtual-network-title" className="mx-auto h-auto w-full max-w-4xl">
			<title id="virtual-network-title">Virtual machines connect through virtual network interfaces to a virtual switch and physical adapter</title>
			<rect x="8" y="8" width="924" height="324" rx="22" fill="#fff" stroke="#1683e8" strokeWidth="4" />
			<path d="M10 30a20 20 0 0 1 20-20h880a20 20 0 0 1 20 20v58H10z" fill="#0866c6" />
			<text x="42" y="63" fill="#fff" fontSize="28" fontWeight="700">Virtual Machine Network Path</text>
			<rect x="45" y="122" width="210" height="150" rx="15" fill="#f1f7ff" stroke="#acd5f7" strokeWidth="2" />
			<text x="150" y="151" fill="#104c87" fontSize="17" fontWeight="700" textAnchor="middle">Virtual machines</text>
			<rect x="69" y="169" width="162" height="38" rx="9" fill="#dceeff" />
			<text x="150" y="194" fill="#0759a5" fontSize="14" fontWeight="700" textAnchor="middle">Guest OS · vNIC 1</text>
			<rect x="69" y="218" width="162" height="38" rx="9" fill="#dceeff" />
			<text x="150" y="243" fill="#0759a5" fontSize="14" fontWeight="700" textAnchor="middle">Guest OS · vNIC 2</text>
			<path d="M255 190h78M255 237h78" stroke="#1683e8" strokeWidth="3" />
			<rect x="333" y="145" width="245" height="115" rx="15" fill="#0878d1" />
			<text x="455" y="190" fill="#fff" fontSize="19" fontWeight="700" textAnchor="middle">Virtual switch</text>
			<text x="455" y="222" fill="#e9f4ff" fontSize="14" textAnchor="middle">Layer 2 forwarding in the host</text>
			<path d="M578 203h90" stroke="#1683e8" strokeWidth="4" />
			<polygon points="668,203 655,195 655,211" fill="#1683e8" />
			<rect x="669" y="154" width="218" height="96" rx="15" fill="#e9f4ff" stroke="#8bbce8" strokeWidth="2" />
			<text x="778" y="188" fill="#0759a5" fontSize="17" fontWeight="700" textAnchor="middle">Host physical NIC</text>
			<text x="778" y="218" fill="#28577e" fontSize="14" textAnchor="middle">Optional external network</text>
			<text x="470" y="302" fill="#526584" fontSize="14" textAnchor="middle">VM-to-VM traffic may stay within the host; an uplink extends connectivity to a physical LAN.</text>
		</svg>
	);
}

function HypervisorLesson() {
	return (
		<div className="mt-10 space-y-10 border-t border-[#dbe5f5] pt-10">
			<section aria-labelledby="hypervisor-definition-heading">
				<h2 id="hypervisor-definition-heading" className="text-2xl font-bold text-[#071126] sm:text-3xl">Virtual machines and hypervisors</h2>
				<p className="mt-4 leading-7">
					A virtual machine (VM) is a software-defined computer that runs a guest operating system
					and applications using virtual CPU, memory, storage, and network interfaces. A hypervisor,
					also called a virtual machine monitor, creates and manages VMs while sharing the physical
					host’s resources among them.
				</p>
				<TutorialDiagramFrame caption="Type 1 runs directly on host hardware; type 2 runs as an application on a host operating system.">
					<HypervisorTypesDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="hypervisor-types-heading">
				<h2 id="hypervisor-types-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Type 1 and type 2 hypervisors</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#0759a5]">Type 1 · native or bare metal</h3>
						<p className="mt-2 leading-7">The hypervisor runs directly on the physical machine and manages guest VMs. This architecture is widely used for server consolidation and data-center workloads. Examples include VMware ESXi and Microsoft Hyper-V in its server hypervisor role. KVM is integrated with the Linux kernel; classification can depend on the terminology being used.</p>
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#0759a5]">Type 2 · hosted</h3>
						<p className="mt-2 leading-7">The hypervisor runs as software on top of a general-purpose host operating system. It is commonly used for desktop development, testing, and learning. Examples include Oracle VirtualBox and VMware Workstation.</p>
					</div>
				</div>
				<p className="mt-4 leading-7">
					Type 1 is often chosen for dedicated production virtualization environments, while type 2
					is convenient on a personal workstation. Performance, isolation, management, and security
					depend on configuration and implementation—not only the type label.
				</p>
			</section>

			<section aria-labelledby="virtual-switch-heading">
				<h2 id="virtual-switch-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Virtual switches and network adapters</h2>
				<p className="mt-3 leading-7">
					A guest VM uses a virtual network interface card (vNIC). The vNIC connects to a virtual
					switch (vSwitch), which forwards frames between VMs or toward a physical network adapter.
					VMs on the same host may communicate through the vSwitch without sending traffic over an
					external cable.
				</p>
				<TutorialDiagramFrame caption="Virtual adapters attach VM guests to a software switch; a physical uplink can connect that switch to the LAN.">
					<VirtualNetworkDiagram />
				</TutorialDiagramFrame>
			</section>

			<section aria-labelledby="virtualization-benefits-heading">
				<h2 id="virtualization-benefits-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Benefits and trade-offs</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Consolidation:</strong> Run multiple isolated workloads on fewer physical servers, improving utilization when resources are sized appropriately.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Agility:</strong> Create, clone, snapshot, or retire VMs faster than provisioning separate physical machines, subject to platform policy and storage capacity.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Isolation and resilience:</strong> Guest environments are logically separated, and VMs can be backed up or migrated with suitable infrastructure. Virtualization alone is not a backup or security boundary.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Operational overhead:</strong> Hosts still require capacity planning, patching, monitoring, secure management, and recovery planning. Oversubscription can cause performance contention.</li>
				</ul>
			</section>

			<section aria-labelledby="paravirtualization-heading" className="rounded-2xl border border-[#dbe5f5] bg-[#f8faff] p-5 sm:p-6">
				<h2 id="paravirtualization-heading" className="text-xl font-bold text-[#071126] sm:text-2xl">Paravirtualization and guest drivers</h2>
				<p className="mt-3 leading-7">
					Paravirtualization traditionally describes a guest OS modified to cooperate with the
					hypervisor through a defined interface rather than attempting to emulate every hardware
					operation. Modern platforms also use paravirtualized devices and optimized guest drivers
					without requiring the guest operating system itself to be modified. These techniques can
					reduce overhead and improve I/O performance, depending on the platform and workload.
				</p>
			</section>
		</div>
	);
}

function VlanDiagram({ image, title, description }) {
	return (
		<figure className="my-7 overflow-hidden rounded-2xl border border-[#dbe5f5] bg-white">
			<img src={image} alt={title} className="mx-auto h-auto max-h-[420px] w-full object-contain" loading="lazy" />
			<figcaption className="border-t border-[#e5ebf4] bg-[#f8faff] px-4 py-3 text-center text-sm text-[#71819b]">
				{description}
			</figcaption>
		</figure>
	);
}

function StpDiagram({ image, title, description }) {
	return (
		<figure className="my-7 overflow-hidden rounded-2xl border border-[#dbe5f5] bg-white">
			<img src={image} alt={title} className="mx-auto h-auto max-h-[420px] w-full object-contain" loading="lazy" />
			<figcaption className="border-t border-[#e5ebf4] bg-[#f8faff] px-4 py-3 text-center text-sm text-[#71819b]">
				{description}
			</figcaption>
		</figure>
	);
}

function VlanLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN introduction</h2>
				<p className="mt-3">
					A virtual LAN (VLAN) is a logical group of switch ports and connected devices that share a Layer 2 broadcast domain. Unlike a group defined only by a switch or a room, a VLAN can include devices attached to different switches and located in different parts of a building, as long as the switching network carries that VLAN between them.
				</p>
				<p className="mt-3">
					This logical grouping lets a network follow a user’s role or department instead of their physical location. A Sales employee can move to another floor and still connect to the Sales network when the new switch port is configured for the Sales VLAN.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why segment a network with VLANs?</h2>
				<p className="mt-3">
					Imagine a company with Sales and Technical departments on separate floors. Without VLANs, an administrator might place each department on a different IP network and connect each group to its own physical switch area. That can work initially, but it ties network membership to location.
				</p>
				<VlanDiagram
					image={VlanWithoutSegmentationImage}
					title="Departments connected without VLANs"
					description="Separate department networks are tied to their physical floor and switch locations."
				/>
				<p className="mt-3">
					This arrangement becomes harder to manage when the Sales area is full and new employees must sit near Technical staff. A port in the Technical area would normally place a new employee on the Technical network. Leaders who need separate permissions can also be difficult to group when their offices are spread across several floors.
				</p>
				<p className="mt-3">
					VLANs address this by letting administrators assign switch ports to logical groups. Sales users can be assigned to the Sales VLAN wherever they sit; Technical users can remain in the Technical VLAN; and leaders can be placed in a separate VLAN with policies appropriate to their role. The VLAN configuration and network policies still need to be applied correctly on the switches and routing devices.
				</p>
				<VlanDiagram
					image={VlanDepartmentBenefitsImage}
					title="Department networks grouped with VLANs"
					description="Sales, Technical, and Leader devices remain logically grouped across different floors."
				/>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>Group users by department or function instead of desk location.</li>
					<li>Keep Layer 2 broadcasts within the VLAN rather than flooding every department.</li>
					<li>Extend a department network when users move or a team grows.</li>
					<li>Apply separate IP addressing and access policies to different groups.</li>
				</ul>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Broadcast domains and inter-VLAN routing</h2>
				<p className="mt-3">
					A Layer 2 switch forwards broadcast frames within their VLAN. If two computers belong to the same VLAN and that VLAN is carried across the switches between them, they can communicate at Layer 2 even when connected to different switches. A broadcast from one VLAN is not normally forwarded into another VLAN.
				</p>
				<p className="mt-3">
					Separate VLANs are separate Layer 2 networks, so communication between them requires a Layer 3 device, such as a router or multilayer switch, plus suitable routing and security policies. Routing between VLANs is called inter-VLAN routing.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN trunks and VLAN IDs</h2>
				<p className="mt-3">
					When multiple VLANs need to cross a link between switches, configure that link as a trunk. A trunk can carry traffic for multiple VLANs over one physical connection. The VLAN ID identifies which VLAN each frame belongs to so the receiving switch can forward it to the correct ports.
				</p>
				<VlanDiagram
					image={VlanTrunkIdImage}
					title="VLAN IDs carried between switches"
					description="A VLAN ID lets the receiving switch identify the VLAN carried over a trunk."
				/>
				<p className="mt-3">
					An access port is normally assigned to one VLAN for an end device. The switch associates frames received on that port with the configured VLAN. When forwarding a frame over an 802.1Q trunk, the switch adds a VLAN tag; the next switch reads the tag to preserve the frame’s VLAN membership. Before sending the frame to a typical endpoint through an access port, the switch removes the trunk tag.
				</p>
				<VlanDiagram
					image={VlanFrameTaggingImage}
					title="Frame tag added and removed along a trunk path"
					description="Switches carry VLAN tags across trunks and remove them before delivery to access devices."
				/>
				<p className="mt-3">
					A trunk is not itself a user VLAN. It transports traffic for the VLANs configured and allowed across it. Links between switches commonly use trunks; a router-to-switch link used for router-on-a-stick inter-VLAN routing also needs to carry the relevant VLANs.
				</p>
				<VlanDiagram
					image={VlanTrunkToRouterImage}
					title="Trunk links between switches and router"
					description="Trunk links carry multiple VLANs between switches and a router for inter-VLAN routing."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">802.1Q and the native VLAN</h2>
				<p className="mt-3">
					IEEE 802.1Q is the standard tagging method commonly used to carry multiple VLANs across Ethernet trunks. Older Cisco equipment also supported Cisco-proprietary Inter-Switch Link (ISL), but 802.1Q is the standard choice on modern networks and equipment.
				</p>
				<p className="mt-3">
					802.1Q trunks have a native VLAN for untagged traffic. Frames belonging to the configured native VLAN are sent without an 802.1Q tag on that trunk. An untagged frame received on a trunk is associated with the receiving port’s configured native VLAN.
				</p>
				<VlanDiagram
					image={VlanNativeTrafficImage}
					title="Tagged and untagged native VLAN traffic"
					description="Native VLAN frames cross the trunk untagged while other VLAN frames carry tags."
				/>
				<p className="mt-3">
					The native VLAN setting tells the switch how to handle those untagged frames; it does not mean that an old non-VLAN switch can safely participate in a modern trunk. Match the native VLAN on both ends of a trunk and use a deliberate configuration rather than relying on defaults. On many Cisco switches, VLAN 1 is the default VLAN and default native VLAN, but the native VLAN can be changed per trunk.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN configuration example</h2>
				<p className="mt-3">
					Use a simple building topology with one main switch and access switches on the first and third floors. Create the same VLANs on each switch, assign end-device ports as access ports, and configure the links between switches as trunks. Replace the example interface IDs with the actual ports in your topology.
				</p>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">1. Create the VLANs</h3>
				<p className="mt-2">
					On each switch, create VLAN 2 for Sales, VLAN 3 for Technical, and VLAN 10 for Leaders. IOS lets you enter another <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">vlan</code> command directly from VLAN configuration mode.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# configure terminal
Switch(config)# vlan 2
Switch(config-vlan)# name SALES
Switch(config-vlan)# vlan 3
Switch(config-vlan)# name TECH
Switch(config-vlan)# vlan 10
Switch(config-vlan)# name LEADER
Switch(config-vlan)# end`}</code></pre>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">2. Assign access ports</h3>
				<p className="mt-2">
					Configure host-facing ports as access ports and assign each to its intended VLAN. Here, FastEthernet0/1 is a Sales workstation port and FastEthernet0/2 is a Technical workstation port.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 2
Switch(config-if)# interface FastEthernet0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 3`}</code></pre>
				<p className="mt-3">
					Repeat the appropriate access-port assignment on the floor switches for the connected users. Access-port VLAN membership alone does not provide communication between different VLANs; that requires Layer 3 routing.
				</p>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">3. Configure the switch uplinks as trunks</h3>
				<p className="mt-2">
					On the main switch, configure the ports connected to the floor switches as trunks. Make the matching configuration on the other end of each link. The optional allowed-VLAN command limits the trunk to the VLANs used in this example.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Main_Switch(config)# interface FastEthernet0/1
Main_Switch(config-if)# switchport mode trunk
Main_Switch(config-if)# switchport trunk allowed vlan 2,3,10
Main_Switch(config-if)# interface FastEthernet0/2
Main_Switch(config-if)# switchport mode trunk
Main_Switch(config-if)# switchport trunk allowed vlan 2,3,10`}</code></pre>
				<p className="mt-3">
					Many Catalyst 2950 and 2960 models use 802.1Q trunks and do not offer a command to select a different encapsulation, so setting trunk mode is sufficient. On some Catalyst 3550 and 3560 models that support selectable trunk encapsulation, choose 802.1Q before setting trunk mode:
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config-if)# switchport trunk encapsulation dot1q
Switch(config-if)# switchport mode trunk`}</code></pre>
				<p className="mt-3">
					The encapsulation command is not available on every switch or software version. Use it only when the device supports encapsulation selection; check the switch model and IOS if the command is rejected. Ensure both ends agree on trunk settings, allowed VLANs, and native VLAN.
				</p>

				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Optional: distribute VLANs with VTP</h3>
				<p className="mt-2">
					VLAN Trunking Protocol (VTP) can distribute VLAN database changes among compatible Cisco switches in the same VTP domain over working trunk links. It requires deliberate configuration of the domain, version, and switch roles; client switches cannot create or modify VLANs locally. For a small lab, creating VLANs manually on each switch is a straightforward alternative.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VLAN benefits and recap</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>VLANs divide a switched Layer 2 network into separate broadcast domains; they do not perform Layer 3 routing by themselves.</li>
					<li>Users can be grouped by role or department rather than by physical location, when the VLAN is carried across the required trunks.</li>
					<li>Administrators can move a user to another VLAN by changing the switch-port configuration instead of moving network cabling.</li>
					<li>Each VLAN is commonly paired with its own IP subnet, and communication between those subnets requires inter-VLAN routing.</li>
					<li>Trunks carry multiple VLANs between switches using 802.1Q tags; native-VLAN traffic is sent untagged on that trunk.</li>
				</ul>
				<div className="mt-5 flex flex-wrap gap-4 text-base font-semibold">
					<Link to="/modules/programs/ccna/knowledge-hub/vlan-trunking-protocol-vtp" className="text-[#2259dc] hover:underline">Continue to the VTP lesson</Link>
					<Link to="/modules/programs/ccna/knowledge-hub/intervlan-routing-tutorial" className="text-[#2259dc] hover:underline">Continue to the inter-VLAN routing lesson</Link>
				</div>
			</section>

			<aside className="rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
				<h2 className="text-lg font-bold text-[#17356d]">Key points</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5">
					<li>VLANs logically group switch ports into separate Layer 2 broadcast domains.</li>
					<li>Devices in the same VLAN can communicate across switches when the VLAN is carried between them.</li>
					<li>Trunks carry multiple VLANs; 802.1Q tags identify VLAN membership.</li>
					<li>Inter-VLAN communication requires Layer 3 routing.</li>
					<li>Untagged trunk traffic belongs to the configured native VLAN.</li>
				</ul>
			</aside>
		</div>
	);
}

function InterVlanLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What is inter-VLAN routing?</h2>
				<p className="mt-3">
					Hosts in the same VLAN and IP subnet can communicate through Layer 2 switching. A host in one VLAN cannot send frames directly into another VLAN, however. To communicate across VLANs, it sends the IP packet to its default gateway, and a Layer 3 device routes it to the destination network.
				</p>
				<p className="mt-3">
					For example, Sales hosts in VLAN 10 can communicate with other hosts in VLAN 10. A Technical host in VLAN 20 is on a separate Layer 2 broadcast domain and typically a separate IP subnet, so traffic between Sales and Technical must be routed. The router or multilayer switch makes that routing decision; VLAN tagging itself does not route packets.
				</p>
				<VlanDiagram
					image={InterVlanSeparationImage}
					title="Hosts in separate VLANs need a Layer 3 gateway to communicate"
					description="Same-VLAN hosts use Layer 2 switching; traffic between VLAN 10 and VLAN 20 requires Layer 3 routing."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Router-on-a-stick</h2>
				<p className="mt-3">
					Router-on-a-stick uses one physical router interface connected to a switch trunk. The router has a logical subinterface for each VLAN. Each subinterface is configured with 802.1Q encapsulation and an IP address that serves as the default gateway for that VLAN.
				</p>
				<VlanDiagram
					image={RouterOnAStickImage}
					title="Router-on-a-stick inter-VLAN routing topology"
					description="A trunk carries VLAN 10 and VLAN 20 between the switch and separate router subinterfaces."
				/>
				<p className="mt-3">
					When a Sales host sends traffic to a different subnet, it forwards the Ethernet frame to its default gateway. The switch carries that frame over the trunk tagged for VLAN 10. The router receives it on the VLAN 10 subinterface, routes the IP packet, then sends a new Ethernet frame back through the trunk tagged for VLAN 20. The switch forwards it to the destination host’s access port. End hosts use their IP addresses and gateways; they do not need to interpret the trunk tags.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure router-on-a-stick</h2>
				<p className="mt-3">
					This example uses VLAN 10 with subnet 192.168.10.0/24 and VLAN 20 with subnet 192.168.20.0/24. Replace interface names and port numbers to match the actual devices. Create both VLANs on the switch and make sure they are allowed on the trunk.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Configure the switch port connected to the router</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20`}</code></pre>
				<p className="mt-3">
					Configure the matching trunk settings at the switch port connected to the router. Some switch models need an encapsulation selection command before trunk mode; many newer models support 802.1Q only and do not have that command.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Configure the router physical interface and subinterfaces</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# interface GigabitEthernet0/0
Router(config-if)# no shutdown
				Router(config-if)# exit
				Router(config)# interface GigabitEthernet0/0.10
				Router(config-subif)# encapsulation dot1Q 10
				Router(config-subif)# ip address 192.168.10.1 255.255.255.0
				Router(config-subif)# exit
				Router(config)# interface GigabitEthernet0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0`}</code></pre>
				<p className="mt-3">
					The physical router interface must be enabled, but it normally has no IP address in this design; the subinterfaces hold the gateway addresses. The number after <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">dot1Q</code> is the VLAN ID, and the subinterface number is a locally chosen label. Assign hosts addresses in their VLAN’s subnet and set their default gateway to 192.168.10.1 or 192.168.20.1 as appropriate.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Inter-VLAN routing on a multilayer switch</h2>
				<p className="mt-3">
					A multilayer switch can route between VLANs using switched virtual interfaces (SVIs). Each SVI is a Layer 3 interface for one VLAN and is typically configured as the default gateway for hosts in that VLAN. Unlike router-on-a-stick, routing occurs on the switch, so a separate router trunk is not needed for these local VLANs.
				</p>
				<VlanDiagram
					image={InterVlanLayer3SwitchImage}
					title="A multilayer switch routes between VLAN interfaces"
					description="SVI gateway interfaces provide Layer 3 routing between VLAN 10 and VLAN 20."
				/>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# vlan 10
Switch(config-vlan)# name SALES
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name TECH
				Switch(config-vlan)# exit
				Switch(config)# interface range FastEthernet0/1-2
				Switch(config-if-range)# switchport mode access
				Switch(config-if-range)# switchport access vlan 10
				Switch(config-if-range)# exit
				Switch(config)# interface range FastEthernet0/3-4
				Switch(config-if-range)# switchport mode access
				Switch(config-if-range)# switchport access vlan 20
				Switch(config-if-range)# exit
				Switch(config)# interface Vlan10
				Switch(config-if)# ip address 192.168.10.1 255.255.255.0
				Switch(config-if)# no shutdown
				Switch(config-if)# exit
				Switch(config)# interface Vlan20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# end
Switch# configure terminal
Switch(config)# ip routing`}</code></pre>
				<p className="mt-3">
					Assign host-facing ports to the appropriate access VLAN as described in the <Link to="/modules/programs/ccna/knowledge-hub/virtual-local-area-network-vlan-tutorial" className="font-semibold text-[#2259dc] hover:underline">VLAN 2.1 lesson</Link>. The VLAN must exist, and the SVI generally becomes operational only when the VLAN is active and has an active Layer 2 port. Set each host’s default gateway to the SVI address for its VLAN.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verify and troubleshoot</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>Check that the VLAN exists and host-facing switch ports are assigned to the expected access VLAN.</li>
					<li>For router-on-a-stick, verify that the switch link is trunking, both VLANs are allowed, and the router interface is up.</li>
					<li>Confirm that each router subinterface uses the correct 802.1Q VLAN ID and IP subnet.</li>
					<li>For a multilayer switch, verify that SVIs have the intended addresses, are operational, and Layer 3 routing is enabled.</li>
					<li>Check each host’s IP address, subnet mask, and default gateway; gateway addresses must be in the host’s own subnet.</li>
				</ul>
				<p className="mt-4">
					Router-on-a-stick is useful when a router and switch share a trunk, but all inter-VLAN traffic crosses that one physical link. A multilayer switch can route locally at the switch and is often used where higher LAN routing capacity is required. In both designs, apply suitable access-control policies if some VLANs should not reach others.
				</p>
			</section>
		</div>
	);
}

function StpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why spanning tree is needed</h2>
				<p className="mt-3">
					Redundant links between switches improve availability, but an Ethernet frame has no Layer 2 hop limit. If switches forward broadcasts around a physical loop, copies can circulate repeatedly. This can create a broadcast storm, cause switches to learn the same source MAC address on different ports (MAC-table instability), and deliver duplicate frames.
				</p>
				<p className="mt-3">
					STP allows redundant physical links but prevents loops in the active Layer 2 topology by placing selected ports in a non-forwarding state. If an active path fails, STP can recalculate and allow a backup path to forward. Switches exchange Bridge Protocol Data Units (BPDUs) to share spanning-tree information.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">How a redundant loop can grow into a storm</h3>
				<p className="mt-2">
					Imagine Switch A and Switch B joined by two active links, with a host attached to each switch. When the first host sends an ARP request, it is a broadcast frame. Switch A floods a copy out both inter-switch ports because it does not send a received broadcast back through its incoming port. Switch B can therefore receive two copies of that same broadcast, one on each link.
				</p>
				<p className="mt-3">
					Switch B floods each copy out its other ports, including the links back toward Switch A. Switch A receives those copies and floods them again. Since Ethernet frames do not have a Layer 2 TTL that causes a switch to discard a frame after a fixed number of hops, the copies can keep circulating. Each round adds more traffic, consumes link capacity, and may overwhelm switches and hosts: this is a broadcast storm.
				</p>
				<p className="mt-3">
					The problem is not limited to broadcasts. If a switch has not learned the destination MAC address for an unknown unicast, it floods that frame as well. A loop can deliver multiple copies to the destination. Meanwhile, repeated frames carrying the same source MAC address may arrive on different switch ports, causing the MAC forwarding table to repeatedly change its port association. This instability can make ordinary forwarding unreliable.
				</p>
				<p className="mt-3">
					STP prevents this by choosing a loop-free forwarding topology. A redundant physical link can remain connected but one of its ports is put into a non-forwarding state for user traffic. The switch still listens for BPDUs on that path, so it can detect a change and recalculate if the active route fails.
				</p>
				<StpDiagram
					image={StpLoopPreventionImage}
					title="Spanning Tree blocks a redundant switch link to prevent a loop"
					description="A redundant physical connection remains available, but STP blocks one port so there is only one active Layer 2 path."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How STP elects the root bridge</h2>
				<p className="mt-3">
					When switches start, they send BPDUs that include the claimed root bridge ID, the sender’s bridge ID, and the sender’s path cost to that root. Switches initially advertise themselves as root; after comparing received information, they agree on the switch with the lowest Bridge ID as the root bridge.
				</p>
				<p className="mt-3">
					A BPDU is a Layer 2 control message used by spanning tree, not a user-data frame. In the initial election, a switch’s root ID and sender ID match because it is claiming to be its own root and is advertising its own information. When it receives a better BPDU, it updates the root information it advertises to its neighbors. This exchange lets switches across the same Layer 2 topology converge on one root.
				</p>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li><strong>Root Bridge ID:</strong> identifies the switch currently advertised as root.</li>
					<li><strong>Sender Bridge ID:</strong> identifies the switch transmitting this BPDU.</li>
					<li><strong>Root Path Cost:</strong> reports the sender’s accumulated cost to reach the advertised root; the root’s own cost is zero.</li>
					<li><strong>Port ID:</strong> identifies the transmitting port and can help break ties between otherwise equal paths.</li>
				</ul>
				<p className="mt-3">
					A Bridge ID contains a bridge priority and a MAC address (with the extended system ID used in common VLAN-aware implementations). The lower priority wins; if priorities tie, the lower MAC address wins. On classic 802.1D, the default priority is 32768. Configured priority values use increments of 4096 because bits are reserved for the system ID.
				</p>
				<p className="mt-3">
					For example, if two switches both use the default priority, the one with the numerically lower MAC address has the lower Bridge ID and becomes root. If the desired root is not being elected, inspect the operational root and bridge priorities rather than assuming that the switch with the lowest hostname or highest link speed will win. Priority is evaluated before MAC address.
				</p>
				<p className="mt-3">
					To make a chosen switch the root, an administrator can lower its spanning-tree priority for the relevant spanning-tree instance. Do this deliberately: the root’s placement affects the paths used throughout the Layer 2 domain.
				</p>
				<p className="mt-3">
					After election, the root bridge has no root port because it is the destination of all root paths. Its active ports are designated for their respective segments and forward traffic. Every other switch uses the root’s Bridge ID as the common reference when choosing its path.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">STP port roles and path selection</h2>
				<p className="mt-3">
					After the root bridge is elected, STP selects a root port on every non-root switch: the port with the best path toward the root. It also selects one designated port for each network segment, which provides that segment’s best path to the root. Root-bridge ports are designated ports. A redundant port that is neither a root nor designated port is non-designated and does not forward user traffic in classic STP.
				</p>
				<p className="mt-3">
					STP compares path information using the lowest total root path cost. If path costs tie, additional BPDU fields break the tie, including the upstream bridge ID and port IDs. Port cost is influenced by link speed; commonly cited revised IEEE short path costs include 10 Gb/s = 2, 1 Gb/s = 4, 100 Mb/s = 19, and 10 Mb/s = 100. Device platform and configured cost method can affect displayed values.
				</p>
				<p className="mt-3">
					The root path cost is the accumulated cost from a switch toward the root. The root advertises a cost of zero for its own path; a downstream switch adds the cost of its receiving link when it considers a BPDU. The receiving port with the best (lowest-cost) resulting path becomes the root port. For example, if one candidate path uses a 10 Mb/s link and another uses a 100 Mb/s link, the faster link normally has the lower cost and is preferred, assuming there is no other cost or tie-breaker difference.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[520px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Link speed</th><th className="px-4 py-3 font-bold">Revised IEEE short cost</th><th className="px-4 py-3 font-bold">Older short cost</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">10 Gb/s</td><td className="px-4 py-3">2</td><td className="px-4 py-3">1</td></tr>
							<tr><td className="px-4 py-3">1 Gb/s</td><td className="px-4 py-3">4</td><td className="px-4 py-3">4</td></tr>
							<tr><td className="px-4 py-3">100 Mb/s</td><td className="px-4 py-3">19</td><td className="px-4 py-3">10</td></tr>
							<tr><td className="px-4 py-3">10 Mb/s</td><td className="px-4 py-3">100</td><td className="px-4 py-3">100</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-3">
					These are reference short-cost values; switches can use a different cost method or a manually configured port cost. The actual cost shown by a device is authoritative for troubleshooting. If two candidate root paths have equal total cost, STP compares additional information in order, such as the sender’s Bridge ID and sender port ID; the receiving port ID is used as a later tie-breaker when needed. The detailed tie-break sequence is covered in the next module.
				</p>
				<StpDiagram
					image={StpRolesImage}
					title="Example spanning-tree root, root-port, designated-port, and blocked-port roles"
					description="The root bridge forwards on its designated ports. The non-root switch uses its best path as root port and blocks the redundant path."
				/>
				<p className="mt-3">
					The <Link to="/modules/programs/ccna/knowledge-hub/stp-root-port-election-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.4 STP Root Port Election lesson</Link> goes further into root-port tie-breaks and the BPDU fields used when paths have equal cost.
				</p>
				<p className="mt-3">
					After each non-root switch has selected its root port, STP selects one designated port for each network segment. The designated port is the port advertising the best path from that segment to the root. On a point-to-point link, one side is designated and the other side may be a root port or a non-designated port. When neither side needs to forward on a redundant segment, the non-designated side remains non-forwarding. In classic STP, a blocked port can still receive BPDUs even though it does not forward user frames.
				</p>
				<p className="mt-3">
					The resulting roles create a tree: there is one root bridge, one root port on each non-root bridge, and a designated forwarding port on each segment. Redundant connections that would create an additional loop are prevented from forwarding until a topology change makes them useful.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Classic 802.1D port states</h2>
				<p className="mt-3">
					In classic 802.1D STP, a port that is moving toward forwarding passes through listening and learning. These transitions give switches time to process BPDUs and build their MAC address tables before user traffic is forwarded.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[620px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">State</th><th className="px-4 py-3 font-bold">Forward user data?</th><th className="px-4 py-3 font-bold">Learn MAC addresses?</th><th className="px-4 py-3 font-bold">Role in classic STP</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Blocking</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Stable non-forwarding state; processes incoming BPDUs and can be selected after a topology change</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Listening</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Transitional state; sends and processes BPDUs while checking for a loop</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Learning</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Transitional state; builds the MAC table without forwarding user frames</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Forwarding</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Stable state; forwards user traffic and processes BPDUs</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Disabled</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Port is administratively down or otherwise not participating</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					Blocking ports do not forward user data or learn source MAC addresses, but they continue to receive BPDUs. Listening ports process spanning-tree information but neither forward user data nor learn MAC addresses. Learning ports still do not forward user data, but they begin to build the forwarding table. Only a forwarding port handles ordinary user frames in both directions.
				</p>
				<p className="mt-3">
					Classic 802.1D uses three main timers. Hello time controls how often the root sends configuration BPDUs (2 seconds by default). Max age is how long a switch retains spanning-tree information without receiving an update (20 seconds by default). Forward delay is the time spent in each of the listening and learning transitions (15 seconds each by default). These timers coordinate topology changes; they are not simply per-state timers for every possible failure.
				</p>
				<p className="mt-3">
					Convergence is the point at which switches have agreed on the active spanning-tree topology and the relevant ports have settled into forwarding or non-forwarding states. While a topology is being recalculated, some traffic can be interrupted. A classic 802.1D transition from blocking through listening and learning can take up to two forward-delay intervals after the port is allowed to transition. If a switch must first age out stale information, max age can add delay. The exact outage depends on the topology and how the failure is detected; timer values should not be summed as one fixed duration in every case.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Topology changes and link failure</h2>
				<p className="mt-3">
					Consider three switches where Switch A is root, Switch B reaches A over its selected root port, and a second link from B to Switch C is currently non-forwarding to prevent a loop. If B’s active link to A fails, B detects that the interface or neighbor path is unavailable. STP recalculates the topology and can promote the redundant connection to a usable root path if it is the best remaining path.
				</p>
				<p className="mt-3">
					In classic STP, a newly selected path may pass through listening and learning before it forwards user data. If the failure was not detected immediately and the switch must wait for old information to expire, recovery can take longer. This is why users can notice downtime during classic STP convergence. RSTP improves recovery by using a different port-role and synchronization process; see <Link to="/modules/programs/ccna/knowledge-hub/rapid-spanning-tree-protocol-rstp-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.5 Rapid Spanning Tree Protocol</Link>.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">What spanning tree provides</h3>
				<ul className="mt-2 list-disc space-y-2 pl-6">
					<li>Prevents bridging loops in a switched Layer 2 topology.</li>
					<li>Allows physical redundancy while selecting a loop-free set of forwarding paths.</li>
					<li>Assigns port roles dynamically from the topology and received BPDU information.</li>
					<li>Recalculates the active topology after a switch, port, or link failure.</li>
					<li>Chooses a best available path toward the root based on spanning-tree path costs and tie-break rules.</li>
				</ul>
				<p className="mt-3">
					STP is a loop-avoidance mechanism, not a substitute for a resilient design or monitoring. A blocked redundant path helps only if the devices and link remain healthy and STP can reconverge. For predictable forwarding, choose the intended root bridge, verify root and port roles after changes, and use an appropriate STP version for the network.
				</p>
			</section>

			<aside className="rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
				<h2 className="text-lg font-bold text-[#17356d]">Key points</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5">
					<li>STP prevents Layer 2 loops while retaining redundant physical links.</li>
					<li>BPDUs carry spanning-tree information used to elect a root bridge and select port roles.</li>
					<li>The lowest Bridge ID wins; priority is compared before MAC address.</li>
					<li>Every non-root switch selects a root port, and every segment selects a designated port.</li>
					<li>Classic 802.1D transitions through listening and learning before forwarding; RSTP converges differently.</li>
				</ul>
			</aside>
		</div>
	);
}

function StpRootPortElectionContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What is a root port?</h2>
				<p className="mt-3">
					Root port election happens <strong>after</strong> the root bridge has already been chosen. Every non-root switch selects exactly one root port: the port that provides its best path toward the root bridge. The root bridge itself has no root port. A selected root port is in a forwarding role in the converged spanning-tree topology.
				</p>
				<p className="mt-3">
					A switch compares the spanning-tree information received on its candidate ports. The winning path is chosen by this ordered comparison:
				</p>
				<ol className="mt-3 list-decimal space-y-2 pl-6">
					<li><strong>Lowest total root path cost</strong> advertised through the candidate port.</li>
					<li><strong>Lowest sender Bridge ID</strong> if the total costs tie.</li>
					<li><strong>Lowest sender Port ID</strong> if cost and sender Bridge ID both tie. The Port ID compares port priority first, then port number.</li>
				</ol>
				<p className="mt-3">
					Each next rule is used only when the previous rule cannot distinguish between the candidates. Do not confuse this process with root bridge election: root bridge election compares Bridge IDs to choose the root switch, while root port election is performed independently by each non-root switch to choose its own best incoming path.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How to calculate the candidate path cost</h2>
				<p className="mt-3">
					The root bridge originates BPDUs with a root path cost of zero. When a neighboring switch receives one, it adds the cost of the port on which the BPDU arrived and advertises the resulting accumulated cost onward. Each subsequent switch adds its own receiving-port cost. When comparing candidate root ports, use the cost carried in the BPDU received on each candidate port; the root bridge itself contributes zero.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[480px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Link speed</th><th className="px-4 py-3 font-bold">Example short path cost</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">10 Mb/s</td><td className="px-4 py-3">100</td></tr>
							<tr><td className="px-4 py-3">100 Mb/s</td><td className="px-4 py-3">19</td></tr>
							<tr><td className="px-4 py-3">1 Gb/s</td><td className="px-4 py-3">4</td></tr>
							<tr><td className="px-4 py-3">10 Gb/s</td><td className="px-4 py-3">2</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-3">
					These are commonly taught revised IEEE short-cost values for this example. The configured cost method or a manually configured port cost can change the numbers, so use the actual cost reported by the switch when troubleshooting.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example 1: the lowest-cost path wins</h2>
				<p className="mt-3">
					Assume SW1 is already the root bridge. In this first topology, SW2 has a direct 1 Gb/s connection to SW1, and another route through SW4 and SW3. That longer route uses two 1 Gb/s links and one 100 Mb/s link.
				</p>
				<StpDiagram
					image={StpRootCostExampleImage}
					title="STP root port path-cost example"
					description="SW2 compares a direct 1 Gb/s path to SW1 with a longer path through SW4 and SW3."
				/>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[540px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">SW2 candidate route</th><th className="px-4 py-3 font-bold">Calculation</th><th className="px-4 py-3 font-bold">Total</th><th className="px-4 py-3 font-bold">Result</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">SW2 → SW1</td><td className="px-4 py-3">0 + 4</td><td className="px-4 py-3">4</td><td className="px-4 py-3">Selected</td></tr>
							<tr><td className="px-4 py-3">SW2 → SW4 → SW3 → SW1</td><td className="px-4 py-3">0 + 4 + 4 + 19</td><td className="px-4 py-3">27</td><td className="px-4 py-3">Not selected</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-3">
					The direct path has the lower accumulated cost, so SW2 selects its port connected to SW1 as its root port. No Bridge ID or Port ID comparison is needed because step 1 already produced a winner.
				</p>
				<p className="mt-3">
					SW3 also selects its directly connected port to SW1 when that is its lowest-cost route. For SW4, suppose the link from SW4 to SW2 is 1 Gb/s, the link from SW2 to SW1 is 100 Mb/s, and both SW4-to-SW3 and SW3-to-SW1 links are 1 Gb/s:
				</p>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li>Via SW2: <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">0 + 4 + 19 = 23</code>.</li>
					<li>Via SW3: <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">0 + 4 + 4 = 8</code>.</li>
				</ul>
				<p className="mt-3">
					SW4 therefore selects its port toward SW3. As with SW2, this is decided by the lowest accumulated cost alone.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example 2: equal costs use the sender Bridge ID</h2>
				<p className="mt-3">
					Now change the topology so all relevant links are 1 Gb/s. SW4 can reach root SW1 through either SW2 or SW3. Each two-link route has the same total root path cost: 4 + 4 = 8. Because step 1 is tied, SW4 compares the Bridge IDs of the switches sending the candidate BPDUs.
				</p>
				<StpDiagram
					image={StpSenderBridgeTieImage}
					title="Equal root path costs resolved by sender Bridge ID"
					description="SW2 and SW3 advertise equal costs to SW4; the lower sender Bridge ID from SW2 wins."
				/>
				<p className="mt-3">
					Assume all bridge priorities are equal at 32768. The MAC address therefore determines which sender has the lower Bridge ID. If SW2 has MAC suffix 02 and SW3 has MAC suffix 03, SW2 has the lower Bridge ID. SW4 chooses the port receiving the BPDU from SW2 as its root port.
				</p>
				<p className="mt-3">
					In real configurations, compare the complete Bridge IDs, not just the shortened MAC examples. Priority is compared first; only when priorities tie does the MAC address decide.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example 3: equal sender Bridge IDs use sender Port ID</h2>
				<p className="mt-3">
					SW5 has two candidate links, both connected to SW4. The two BPDUs advertise the same root path cost, and the sender Bridge ID is also identical because both BPDUs came from SW4. STP moves to step 3 and compares the sender Port IDs reported in those BPDUs.
				</p>
				<StpDiagram
					image={StpSenderPortTieImage}
					title="Equal path and sender Bridge IDs resolved by sender Port ID"
					description="SW4 advertises on Fa0/1 and Fa0/2; its lower sender Port ID on Fa0/1 wins for SW5."
				/>
				<p className="mt-3">
					A Port ID consists of a port priority and a port number. The lower port priority is compared first; if those are equal, the lower port number wins. If SW4 sends the otherwise identical candidate BPDUs from Fa0/1 and Fa0/2 with equal port priorities, Fa0/1 has the lower Port ID. SW5 selects the port connected to SW4 Fa0/1 as its root port.
				</p>
				<p className="mt-3">
					The sender Port ID is the port identifier carried by the switch advertising the BPDU. Do not confuse it with SW5’s own local receiving-port number. On some platforms the local receiving port ID can be used in a later tie-break when the received spanning-tree information is otherwise identical; this example is decided by SW4’s sender Port ID.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Root port election checklist</h2>
				<ol className="mt-3 list-decimal space-y-2 pl-6">
					<li>Confirm which switch is the root bridge before evaluating root ports.</li>
					<li>On each non-root switch, list the candidate ports receiving BPDUs toward the root.</li>
					<li>Compare the advertised total root path costs; the lowest cost wins.</li>
					<li>If costs tie, compare the sender Bridge IDs; the lower Bridge ID wins.</li>
					<li>If sender Bridge IDs also tie, compare sender Port IDs; lower port priority and then lower port number wins.</li>
					<li>Verify the selected role and root path cost on the switch after convergence.</li>
				</ol>
				<p className="mt-4">
					This tutorial focuses on the root port chosen by each non-root switch. To review how the root bridge is elected and how root, designated, and non-designated roles combine into a loop-free topology, return to the <Link to="/modules/programs/ccna/knowledge-hub/spanning-tree-protocol-stp-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.3 Spanning Tree Protocol lesson</Link>.
				</p>
			</section>
		</div>
	);
}

function RstpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why use Rapid Spanning Tree?</h2>
				<p className="mt-3">
					Classic 802.1D STP protects a switched network from Layer 2 loops, but recovery can be slow when a forwarding path fails. Depending on the topology and failure detection, a port may have to wait through classic listening and learning transitions before it can forward. That interruption can affect applications even though a redundant physical link is present.
				</p>
				<p className="mt-3">
					IEEE 802.1w introduced Rapid Spanning Tree Protocol (RSTP), which was later incorporated into the 802.1D standard. RSTP keeps the same basic objective—build a loop-free Layer 2 topology—but improves convergence by defining additional port roles and using rapid proposal/agreement and synchronization behavior on suitable links. It does not rely only on waiting for the classic forward-delay timers to expire.
				</p>
				<p className="mt-3">
					RSTP can often restore forwarding quickly after a directly detected physical link failure, sometimes in less than a second in a well-designed point-to-point topology. This is not a universal guarantee: recovery depends on topology, link type, configuration, interoperability, and how the failure is detected.
				</p>
				<p className="mt-3">
					Before studying RSTP roles, review <Link to="/modules/programs/ccna/knowledge-hub/spanning-tree-protocol-stp-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.3 Spanning Tree Protocol</Link> and <Link to="/modules/programs/ccna/knowledge-hub/stp-root-port-election-tutorial" className="font-semibold text-[#2259dc] hover:underline">2.4 Root Port Election</Link>. RSTP still elects a root bridge and uses path costs when choosing its paths.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">RSTP port roles</h2>
				<p className="mt-3">
					RSTP describes what each port contributes to the loop-free topology. Root, designated, and alternate roles are used on ordinary point-to-point switch links. A backup role applies to a special shared-media situation where one switch has more than one port connected to the same LAN segment, such as through a hub.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[680px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Port role</th><th className="px-4 py-3 font-bold">Meaning</th><th className="px-4 py-3 font-bold">Typical state</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Root</td><td className="px-4 py-3">Best path from a non-root bridge toward the root bridge.</td><td className="px-4 py-3">Forwarding</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Designated</td><td className="px-4 py-3">Best forwarding path advertised onto a LAN segment; each segment has one designated port.</td><td className="px-4 py-3">Forwarding</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Alternate</td><td className="px-4 py-3">A different, standby path toward the root, learned from another bridge.</td><td className="px-4 py-3">Discarding; can take over if the active root path fails</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Backup</td><td className="px-4 py-3">A redundant port on the same bridge to a shared segment for which that bridge already has a designated port.</td><td className="px-4 py-3">Discarding</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					An alternate port is not simply any unused cable: it receives a superior BPDU from another bridge and provides another route toward the root. When the current root port fails, an eligible alternate can become the new root port and move toward forwarding without waiting for the full classic STP process.
				</p>
				<p className="mt-3">
					A backup port is different. It is another port on the same switch connected to the same shared segment as that switch’s designated port. A hub can create this shared segment because it repeats signals among its ports. Two ordinary switch-to-switch links are separate point-to-point segments, so their standby role is normally alternate, not backup.
				</p>
				<p className="mt-3">
					A port that an administrator shuts down is operationally disabled, but disabled is not one of the active RSTP port roles in the same sense as root, designated, alternate, and backup.
				</p>
				<StpDiagram
					image={RstpPortRolesImage}
					title="RSTP roles on three interconnected switches"
					description="SW1 is root; SW2 and SW3 use root ports toward it. On their shared link, one side is designated and the other is alternate."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example: selecting RSTP roles</h2>
				<p className="mt-3">
					Suppose SW1, SW2, and SW3 have the same bridge priority, and SW1 has the lowest MAC address. SW1 therefore has the lowest Bridge ID and is elected root. Its active ports are designated ports for their segments. SW2 and SW3 each choose their port toward SW1 as a root port because those are their best paths to the root.
				</p>
				<p className="mt-3">
					There is also a direct link between SW2 and SW3. If SW2 advertises the better BPDU on that segment—for example, because its Bridge ID is lower when earlier path information ties—SW2’s port is designated and SW3’s port becomes alternate. That alternate port remains in discarding state, ready to provide another path if SW3 loses its current root port.
				</p>
				<StpDiagram
					image={RstpSharedSegmentImage}
					title="RSTP backup port on a shared hub segment"
					description="Two ports on SW2 reach the same shared LAN through a hub: one is designated and the other is backup."
				/>
				<p className="mt-3">
					In the hub example, SW2 Fa0/2 and Fa0/3 both connect to the same shared LAN segment. SW2 selects one as designated and the other as backup. If their path cost and sender Bridge ID are identical, the lower sender Port ID wins; port priority is compared before port number. For equal priorities, Fa0/2 has a lower Port ID than Fa0/3, so Fa0/2 becomes designated and Fa0/3 becomes backup.
				</p>
				<p className="mt-3">
					The backup role is specific to redundant connections to the same shared segment. It should not be confused with the alternate role used for an alternate path learned from another bridge.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">RSTP port states</h2>
				<p className="mt-3">
					RSTP has three port states. The classic 802.1D disabled, blocking, and listening states all correspond to RSTP’s discarding state. Learning and forwarding keep their names and basic data-plane meanings.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[620px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">802.1D STP state</th><th className="px-4 py-3 font-bold">802.1w RSTP state</th><th className="px-4 py-3 font-bold">Forward user frames?</th><th className="px-4 py-3 font-bold">Learn MAC addresses?</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3">Disabled</td><td className="px-4 py-3 font-semibold">Discarding</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td></tr>
							<tr><td className="px-4 py-3">Blocking</td><td className="px-4 py-3 font-semibold">Discarding</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td></tr>
							<tr><td className="px-4 py-3">Listening</td><td className="px-4 py-3 font-semibold">Discarding</td><td className="px-4 py-3">No</td><td className="px-4 py-3">No</td></tr>
							<tr><td className="px-4 py-3">Learning</td><td className="px-4 py-3 font-semibold">Learning</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Yes</td></tr>
							<tr><td className="px-4 py-3">Forwarding</td><td className="px-4 py-3 font-semibold">Forwarding</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Yes</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					Discarding ports do not forward user traffic or learn source MAC addresses, but they do process RSTP BPDUs. Learning ports learn MAC addresses but do not yet forward user frames. Forwarding ports perform normal data forwarding and continue to participate in spanning-tree BPDU exchange. RSTP can still use the learning state, but its rapid transitions avoid the long classic listening/learning timer sequence on eligible links.
				</p>
				<p className="mt-3">
					In a stable topology, ports settle into forwarding or discarding states. A port can briefly pass through learning when it is preparing to forward; that does not mean the state was removed from RSTP.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How RSTP recovers and interoperates</h2>
				<p className="mt-3">
					If a switch loses its forwarding root port, it can promote a suitable alternate port. On point-to-point links, RSTP uses proposal and agreement messages and port synchronization to establish a loop-free forwarding change quickly. Because the switch has already learned a viable alternate path, it need not wait for the same sequence of classic STP timer expirations in many common failure cases.
				</p>
				<p className="mt-3">
					RSTP is designed to interoperate with legacy 802.1D STP. When an RSTP port receives legacy STP BPDUs, it can operate on that link using legacy-compatible behavior and BPDU handling. This interoperability can make that portion of the topology converge more slowly than a network running RSTP end to end, so check the protocol mode and neighbor capabilities when investigating unexpected delays.
				</p>
				<aside className="mt-6 rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
					<h3 className="text-lg font-bold text-[#17356d]">RSTP quick recap</h3>
					<ul className="mt-3 list-disc space-y-2 pl-5">
						<li>RSTP improves convergence after topology changes compared with classic 802.1D STP.</li>
						<li>Its roles are root, designated, alternate, and backup; administratively disabled ports are not an active forwarding role.</li>
						<li>Alternate and backup ports remain discarding until they are needed.</li>
						<li>Its states are discarding, learning, and forwarding.</li>
						<li>RSTP can interoperate with legacy STP, but legacy links may use slower behavior.</li>
					</ul>
				</aside>
			</section>
		</div>
	);
}

function VtpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What VTP does and why it is used</h2>
				<p className="mt-3">
					VLAN Trunking Protocol (VTP) is a Cisco-proprietary Layer 2 control protocol that can distribute VLAN database changes between compatible Cisco switches. Switches in the same VTP domain can share VLAN information over operational trunk links. VTP can reduce repetitive configuration work and help keep the VLAN database consistent across a group of switches.
				</p>
				<p className="mt-3">
					For example, in a multi-floor office, users may connect to access switches on different floors while remaining in the same department VLAN. Without centralized VLAN distribution, an administrator who adds a new Support VLAN must create it separately on every switch that needs it. In a larger network, that increases the chance of missed switches or inconsistent VLAN IDs and names. With a correctly configured VTP domain, an authorized server can advertise the VLAN database change to participating switches.
				</p>
				<p className="mt-3">
					VTP distributes VLAN database information; it does not assign user ports to VLANs, carry end-user traffic by itself, or replace trunk configuration. Access-port membership, trunk allowed lists, native VLAN settings, and Layer 3 routing still need to be planned and configured as appropriate.
				</p>
				<VlanDiagram
					image={VtpDomainModesImage}
					title="VTP domain with server, client, and transparent switches"
					description="Compatible switches in one VTP domain exchange advertisements over trunks; transparent switches keep local VLAN changes and forward received advertisements."
				/>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP modes</h2>
				<p className="mt-3">
					Classic VTP uses server, client, and transparent modes. A switch must have compatible VTP settings and be connected through a working trunk to participate in domain advertisements. Exact capabilities also depend on the VTP version, platform, and VLAN range.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[700px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Mode</th><th className="px-4 py-3 font-bold">Create or change VLAN database?</th><th className="px-4 py-3 font-bold">VTP behavior</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Server</td><td className="px-4 py-3">Yes, within platform and version limits.</td><td className="px-4 py-3">Originates advertisements when the VLAN database changes; receives and forwards VTP information.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Client</td><td className="px-4 py-3">No, in classic VTP operation.</td><td className="px-4 py-3">Learns the VTP VLAN database and forwards advertisements through trunk connections; does not originate database changes.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Transparent</td><td className="px-4 py-3">Yes, locally.</td><td className="px-4 py-3">Maintains its own VLAN configuration rather than synchronizing it with the domain; forwards received advertisements when supported by the configured version.</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					Server is the default mode on many classic Cisco switch configurations, but do not rely on defaults in a production network. Client switches cannot make ordinary local VLAN database changes in classic VTP. Transparent mode lets a switch keep locally managed VLANs independent from the domain database while relaying advertisements; exact forwarding behavior depends on VTP version.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP domain and advertisements</h2>
				<p className="mt-3">
					Switches share VTP information only when their VTP domain settings match and the links carrying the advertisements are operating as trunks. A domain name is an administrative identifier, not a routing domain or IP subnet. Configure the intended domain, version, and any authentication consistently on participating switches.
				</p>
				<p className="mt-3">
					When a VLAN database change is made on a VTP server, the server increments its configuration revision number and advertises the updated database. Switches use the revision number to decide whether an advertisement represents a newer database than the one they currently hold. A higher revision is not a comparison of individual VLANs or a merge operation; a switch may replace its database with the received VTP database.
				</p>
				<p className="mt-3">
					This behavior makes an unknown switch with a stale-but-higher revision number especially risky to connect to a live domain: it can advertise its database as newer and cause participating switches to adopt it. Before connecting a switch, inspect and deliberately prepare its VTP mode, domain, version, password, and revision state. Do not treat a large revision number as proof that a configuration is correct.
				</p>
				<p className="mt-3">
					VTP advertisements are sent as Layer 2 multicast control frames to participating neighbors. A switch that receives a new advertisement checks the domain and other relevant parameters before processing it. VTP authentication, when configured, helps reject advertisements that do not have the expected shared password, but it is not a substitute for careful change control.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Important fields in show vtp status</h2>
				<p className="mt-3">
					Use <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show vtp status</code> to review the switch’s VTP state. The exact output varies by platform and VTP version, but commonly includes:
				</p>
				<ul className="mt-3 list-disc space-y-2 pl-6">
					<li><strong>VTP version:</strong> the version currently operating. Set a compatible version across the domain; version behavior and interoperability depend on platform and release.</li>
					<li><strong>Configuration revision:</strong> this switch’s current VTP database revision, used to compare advertisements within the domain.</li>
					<li><strong>Maximum VLANs supported locally:</strong> the VLAN capacity reported by the switch platform and software.</li>
					<li><strong>Number of existing VLANs:</strong> how many VLANs the switch currently has in its database.</li>
					<li><strong>VTP operating mode:</strong> server, client, or transparent in classic VTP.</li>
					<li><strong>VTP domain name:</strong> the domain identifier used when determining which advertisements belong to the same domain.</li>
					<li><strong>VTP pruning mode:</strong> whether pruning is enabled for the domain.</li>
					<li><strong>VTP V2 mode:</strong> whether VTP version 2 is enabled, if shown by that platform.</li>
					<li><strong>VTP traps generation:</strong> whether the switch generates VTP notifications for a configured management system.</li>
					<li><strong>MD5 digest:</strong> a digest used by VTP to help verify advertisement consistency/authentication; it is not a readable password.</li>
					<li><strong>Configuration last modified:</strong> when the local VTP database was last changed and, on some platforms, the address of the switch that initiated the change.</li>
				</ul>
				<p className="mt-3">
					Some switches start with a blank domain name and no VTP password, while many classic switches default to server mode. Always verify actual status rather than assuming that defaults match your design. Also check the VLAN database itself and trunk status; a VTP status display alone does not prove that the expected user VLANs are active on every required link.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure a VTP server and clients</h2>
				<p className="mt-3">
					This example uses the placeholder domain CAMPUS. Apply the same VTP version, domain name, and password on participating switches. Set the main switch to server and the access switches to client. Replace the example interface with the actual uplink ports in your topology.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Main switch (server)</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Main_Switch(config)# vtp version 2
Main_Switch(config)# vtp domain CAMPUS
Main_Switch(config)# vtp mode server
Main_Switch(config)# vtp password <SET_A_PRIVATE_PASSWORD>`}</code></pre>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Access switch (client)</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Access_Switch(config)# vtp version 2
Access_Switch(config)# vtp domain CAMPUS
Access_Switch(config)# vtp password <SET_THE_SAME_PRIVATE_PASSWORD>
Access_Switch(config)# vtp mode client`}</code></pre>
				<p className="mt-3">
					Use a private password chosen for your network instead of copying a tutorial value. Check which VTP versions your switch models and software support and configure a compatible version throughout the domain. Different VTP versions may not exchange information as expected, so verify the operating status on every switch.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Make sure the inter-switch links are trunks</h3>
				<p className="mt-2">
					VTP advertisements travel over trunk links, so first verify that the uplink is actually trunking. Dynamic Trunking Protocol behavior and defaults vary by model and configuration; two ports both set to dynamic auto will not negotiate a trunk. Explicitly configure the link as a trunk on both ends when appropriate and supported:
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport mode trunk`}</code></pre>
				<p className="mt-3">
					Configure the peer interface consistently, including allowed VLANs and native VLAN settings. Do not assume that one side’s configuration always makes the other side a trunk; confirm with the platform’s operational trunk display, such as <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show interfaces trunk</code>. Once the server and clients have matching domain settings and working trunks, create or modify VLANs on the server as allowed by the version and platform.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP pruning</h2>
				<p className="mt-3">
					Without pruning, broadcast and unknown-unicast traffic for a VLAN can be carried over a trunk even when the receiving switch has no active ports in that VLAN. This uses trunk bandwidth and switch processing unnecessarily. VTP pruning reduces that unnecessary flooding by limiting eligible VLAN traffic on a trunk when the downstream switch reports that it does not need that VLAN.
				</p>
				<p className="mt-3">
					For example, suppose PC A sends a VLAN 10 broadcast. Switches in the VTP domain receive the broadcast along eligible trunks, but only Switch 3 has an active VLAN 10 port. If Switch 2 has no active VLAN 10 ports, the trunk from the server switch toward Switch 2 does not need to carry VLAN 10 broadcast or unknown-unicast traffic. Switch 3 advertises its VLAN need; Switch 2 does not, so VLAN 10 can be pruned on the unneeded branch.
				</p>
				<VlanDiagram
					image={VtpPruningImage}
					title="VTP pruning suppresses unneeded VLAN 10 flooding on one trunk"
					description="VLAN 10 traffic is forwarded toward Switch 3, which has an active VLAN 10 port, and pruned toward Switch 2, which does not."
				/>
				<p className="mt-3">
					Pruning is per VLAN and per trunk; it does not remove the VLAN from the VTP database or stop all traffic on that trunk. It suppresses eligible flooded traffic for a VLAN on links where that VLAN is not needed. It does not block known unicast traffic that must reach a destination, and VLANs such as VLAN 1 and reserved VLANs may not be eligible for pruning depending on platform and version.
				</p>
				<p className="mt-3">
					In classic VTP, enable pruning on a VTP server for the domain:
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Server(config)# vtp pruning`}</code></pre>
				<p className="mt-3">
					Verify pruning status and confirm which VLANs are eligible on each trunk. Ensure the required VLAN is allowed and present on every link that needs to carry its traffic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">VTP deployment checklist</h2>
				<ol className="mt-3 list-decimal space-y-2 pl-6">
					<li>Confirm device support, VTP version, and the VLAN range required by the network.</li>
					<li>Set the intended VTP domain, mode, and matching authentication on participating switches.</li>
					<li>Inspect the revision and existing VLAN database before connecting a switch to a live domain.</li>
					<li>Configure and verify operational trunks between the switches.</li>
					<li>Create and verify VLANs on the intended server; check that clients receive the expected database.</li>
					<li>Enable pruning only when appropriate, then verify which VLAN traffic is pruned on each trunk.</li>
					<li>Keep configuration backups and document changes, because a higher revision can replace a switch’s VLAN database rather than merge individual entries.</li>
				</ol>
			</section>
		</div>
	);
}

function EtherChannelLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What is EtherChannel?</h2>
				<p className="mt-3">
					EtherChannel bundles multiple physical Ethernet interfaces between switches or routers into one logical interface, commonly called a Port-Channel. The member links operate together as one connection from the perspective of many Layer 2 and Layer 3 features, while the actual frames still travel over one selected physical member at a time.
				</p>
				<p className="mt-3">
					Consider two switches connected by one Fast Ethernet link. Its line rate is 100 Mb/s. Connecting a second independent link does not necessarily double usable capacity: a Layer 2 loop could result, so Spanning Tree Protocol may block one of the links. EtherChannel solves this by bundling compatible links into one logical channel. STP sees the Port-Channel as a single logical link and can keep the member links active as part of that channel instead of treating each as a separate redundant path.
				</p>
				<VlanDiagram
					image={EtherChannelBundlingImage}
					title="EtherChannel bundles two physical switch links into one logical Port-Channel"
					description="Two 100 Mb/s member links form one logical channel with up to 200 Mb/s aggregate capacity in this example; STP sees one Port-Channel."
				/>
				<p className="mt-3">
					The combined capacity is aggregate capacity, not necessarily the speed of one individual conversation. EtherChannel distributes traffic using a hashing algorithm (for example, source/destination MAC or IP fields); a given flow normally stays on one member to avoid reordering. Actual load sharing depends on platform and hash policy.
				</p>
				<p className="mt-3">
					If a member link fails but at least one compatible member remains operational, the Port-Channel can stay up and traffic can be redistributed across the surviving links. The total available aggregate capacity is reduced, but the logical connection may continue without STP reconverging around the failed individual member. If all members fail, the Port-Channel goes down.
				</p>
				<p className="mt-3">
					EtherChannel can also be used on supported router or Layer 3 interfaces. The logical Port-Channel is configured with the relevant Layer 2 or Layer 3 settings; configure member interfaces consistently and use the logical interface for settings intended to apply to the bundle.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">EtherChannel negotiation methods</h2>
				<p className="mt-3">
					There are three common ways to form a channel: Cisco PAgP, IEEE LACP, or static mode. The two ends must use compatible settings. PAgP and LACP are different protocols and cannot negotiate a channel with each other. Static mode sends neither protocol’s negotiation packets.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[720px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Method</th><th className="px-4 py-3 font-bold">Standard / behavior</th><th className="px-4 py-3 font-bold">Negotiation modes</th><th className="px-4 py-3 font-bold">Forms a channel when</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">PAgP</td><td className="px-4 py-3">Cisco-proprietary negotiation on supported platforms.</td><td className="px-4 py-3">Auto, Desirable</td><td className="px-4 py-3">At least one end is Desirable and the other is Auto or Desirable.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">LACP</td><td className="px-4 py-3">IEEE link aggregation protocol, originally 802.3ad and now specified by 802.1AX.</td><td className="px-4 py-3">Passive, Active</td><td className="px-4 py-3">At least one end is Active and the other is Active or Passive.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Static (on)</td><td className="px-4 py-3">Bundles without PAgP or LACP negotiation.</td><td className="px-4 py-3">On</td><td className="px-4 py-3">Both ends are deliberately configured as on and member settings match.</td></tr>
						</tbody>
					</table>
				</div>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">PAgP mode combinations</h3>
				<p className="mt-2">
					<strong>Desirable</strong> actively sends PAgP negotiation requests. <strong>Auto</strong> waits and responds but does not initiate. Auto–Auto will not form a channel; Desirable–Auto and Desirable–Desirable can form one. Auto is not a universal default—check the device configuration.
				</p>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[500px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]"><tr><th className="px-4 py-3 font-bold">PAgP side A</th><th className="px-4 py-3 font-bold">Desirable</th><th className="px-4 py-3 font-bold">Auto</th></tr></thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Desirable</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Forms</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Auto</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Does not form</td></tr>
						</tbody>
					</table>
				</div>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">LACP mode combinations</h3>
				<p className="mt-2">
					<strong>Active</strong> initiates LACP negotiation; <strong>Passive</strong> responds but does not initiate. Passive–Passive will not form a channel. Active–Passive and Active–Active can form one.
				</p>
				<div className="mt-4 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-[500px] w-full border-collapse text-left text-sm sm:text-base">
						<thead className="bg-[#f1f6ff] text-[#17356d]"><tr><th className="px-4 py-3 font-bold">LACP side A</th><th className="px-4 py-3 font-bold">Active</th><th className="px-4 py-3 font-bold">Passive</th></tr></thead>
						<tbody className="divide-y divide-[#e5ebf4]">
							<tr><td className="px-4 py-3 font-semibold">Active</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Forms</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Passive</td><td className="px-4 py-3">Forms</td><td className="px-4 py-3">Does not form</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					PAgP Auto is similar to LACP Passive because both wait for negotiation; PAgP Desirable is similar to LACP Active because both initiate. They are only analogous behaviors, not interoperable modes.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Static “on” mode</h2>
				<p className="mt-3">
					In on mode, the interfaces are placed into a channel without negotiation. No PAgP or LACP packets verify that the peer has matching configuration. Configure on at both ends and validate the physical cabling and all member settings carefully. A mismatch can cause a channel not to operate correctly and may create a loop or traffic loss; use a negotiation protocol when it is supported and appropriate.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Member-link consistency and configuration</h2>
				<p className="mt-3">
					Every candidate member must be compatible with the other members and peer configuration. Common requirements include matching speed and duplex, compatible Layer 2 or Layer 3 mode, and consistent STP-related and VLAN/trunk settings. For Layer 2 channels, verify access VLAN or trunk mode, native VLAN, allowed VLAN list, and supported trunk encapsulation. The exact checks and limits vary by switch model and software.
				</p>
				<p className="mt-3">
					Some platforms or configurations do not support features such as dynamic VLAN membership or port security on EtherChannel member interfaces, or impose specific restrictions. Do not assume every switch treats these features identically: consult the device’s platform documentation and inspect channel consistency before applying them.
				</p>
				<VlanDiagram
					image={EtherChannelLoadBalanceImage}
					title="EtherChannel load distribution and member link failover"
					description="Different flows are hashed across active members. If one member fails, flows can be redistributed over the remaining active link and the Port-Channel may remain up."
				/>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Example: configure a Layer 2 LACP trunk</h3>
				<p className="mt-2">
					This illustrative Cisco IOS-style example places two physical interfaces in LACP channel group 1, then configures VLAN trunking on the logical Port-Channel. Repeat compatible configuration on the peer and confirm the actual interface names and feature support for the switch model.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface range GigabitEthernet0/1-2
Switch(config-if-range)# switchport mode trunk
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface Port-channel1
Switch(config-if)# switchport mode trunk`}</code></pre>
				<p className="mt-3">
					Check the channel summary and member consistency using platform-appropriate commands such as <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show etherchannel summary</code> and <code className="rounded bg-[#f1f5fb] px-1.5 py-0.5 text-sm">show interfaces port-channel 1</code>. Confirm both physical members are bundled and the logical interface is up.
				</p>
			</section>

			<aside className="rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] p-5 sm:p-6">
				<h2 className="text-lg font-bold text-[#17356d]">EtherChannel recap</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5">
					<li>Multiple physical Ethernet links operate as one logical Port-Channel.</li>
					<li>STP treats the bundle as one logical link; a member failure need not take down the bundle if members remain.</li>
					<li>Traffic is load-shared by a platform-specific hash; one flow does not necessarily use all member bandwidth.</li>
					<li>PAgP is Cisco-proprietary; LACP is the IEEE standard; static on mode negotiates with neither.</li>
					<li>All channel members and both ends must have compatible settings.</li>
				</ul>
			</aside>
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
						<div
							className={`space-y-1 pt-2 ${
								section.title === "Fundamentals"
									? "max-h-[480px] overflow-y-auto overscroll-y-contain pr-2 [scrollbar-color:#b9c9e8_transparent] [scrollbar-width:thin]"
									: ""
							}`}
							{...(section.title === "Fundamentals"
								? {
										tabIndex: 0,
										"aria-label": "Fundamentals tutorials; scroll vertically to see all topics",
									}
								: {})}
						>
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
	const { articleSlug = "osi-model-tutorial" } = useParams();
	const vlanArticleSlug = "virtual-local-area-network-vlan-tutorial";
	const canonicalArticleSlug = articleSlug === vlanArticleSlug ? "virtual-local-area-networks-(vlans)" : articleSlug;
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
			<div className="mx-auto max-w-[1440px] px-5 pb-8 pt-10 sm:px-10 sm:pt-12 lg:px-14">
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
						{article.contentType === "vlan" ? (
							<VlanLessonContent />
						) : article.contentType === "intervlan" ? (
							<InterVlanLessonContent />
						) : article.contentType === "stp" ? (
							<StpLessonContent />
						) : article.contentType === "stp-root-port" ? (
							<StpRootPortElectionContent />
						) : article.contentType === "rstp" ? (
							<RstpLessonContent />
						) : article.contentType === "vtp" ? (
							<VtpLessonContent />
						) : article.contentType === "etherchannel" ? (
							<EtherChannelLessonContent />
						) : articleSlug === "osi-model-tutorial" ? (
							<OsiModelLesson />
						) : articleSlug === "tcp-and-udp-tutorial" ? (
							<TcpUdpLesson />
						) : articleSlug === "wan-tutorial" ? (
							<WanLesson />
						) : articleSlug === "cisco-command-line-interface-cli" ? (
							<CliModesLesson />
						) : articleSlug === "cisco-router-boot-sequence-tutorial" ? (
							<RouterBootLesson />
						) : articleSlug === "subnetting-tutorial-?-subnetting-made-easy" ? (
							<SubnettingLesson />
						) : articleSlug === "wireless-tutorial" ? (
							<WirelessLesson />
						) : articleSlug === "ipv6-tutorial" ? (
							<Ipv6Lesson />
						) : articleSlug.startsWith("hypervisor-type-1-and-2-tutorial") ? (
							<HypervisorLesson />
						) : (
							<>
								<DiagramPlaceholder />
								<p className="text-lg leading-[1.8] sm:text-xl">{article.body}</p>
							</>
						)}
						<div className="mt-7 flex flex-wrap gap-3">{article.tags.map((tag) => <span key={tag} className="rounded-full border border-[#dbe5f5] bg-[#f8faff] px-4 py-2 text-sm text-[#3d5c88]">{tag}</span>)}</div>
					</article>
					<TutorialSidebar activeSlug={canonicalArticleSlug} />
				</div>
			</div>
		</main>
	);
}
