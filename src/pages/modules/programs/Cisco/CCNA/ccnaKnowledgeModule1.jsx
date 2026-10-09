import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TutorialDiagramFrame } from "./ccnaTutorialDiagramFrame";
import LessonImageExpand from "../../LessonImageExpand";
import OsiVsTcpIpImage from "../../../../../assets/tcp-udp/osi-vs-tcpip.png";
import TcpThreeWayHandshakeImage from "../../../../../assets/tcp-udp/tcp-three-way-handshake.png";
import TcpHandshakeExampleImage from "../../../../../assets/tcp-udp/tcp-handshake-example.png";
import TcpConnectionTerminationImage from "../../../../../assets/tcp-udp/tcp-connection-termination.png";
import TcpPortMultiplexingImage from "../../../../../assets/tcp-udp/tcp-port-multiplexing.png";
import TcpSourceDestinationPortsImage from "../../../../../assets/tcp-udp/tcp-source-destination-ports.png";

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
					src={OsiVsTcpIpImage}
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
					src={TcpThreeWayHandshakeImage}
					alt="TCP three-way handshake between Host A and Host B: SYN, SYN-ACK, and ACK, establishing a connection."
					caption="TCP establishes a connection with SYN, SYN-ACK, and ACK."
				/>
				<p className="mt-4 leading-7">
					If Host A starts with sequence number 1 and Host B starts with 50, Host B acknowledges A with
					ACK 2, and Host A acknowledges B with ACK 51. Real initial sequence numbers are selected by the
					hosts and are not necessarily small or predictable values.
				</p>
				<TransportDiagramImage
					src={TcpHandshakeExampleImage}
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
					src={TcpConnectionTerminationImage}
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
					src={TcpPortMultiplexingImage}
					alt="A laptop uses separate TCP source ports for web browsing, email, and FTP connections to their respective servers."
					caption="Distinct source and destination ports keep simultaneous application connections separate."
				/>
				<TransportDiagramImage
					src={TcpSourceDestinationPortsImage}
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
				<LessonImageExpand label="table">
					<div className="mt-4">
						<div className="space-y-3 sm:hidden">
							{osiLayers.map((layer) => (
								<article key={layer.number} className="rounded-xl border border-[#dbe5f5] bg-white p-4">
									<h3 className="font-bold text-[#172642]">Layer {layer.number}: {layer.name}</h3>
									<dl className="mt-3 space-y-2 text-sm leading-5 text-[#526584]">
										<div><dt className="font-semibold text-[#172642]">Description</dt><dd>{layer.description}</dd></div>
										<div><dt className="font-semibold text-[#172642]">Protocols / examples</dt><dd>{layer.protocols}</dd></div>
										<div><dt className="font-semibold text-[#172642]">Protocol data unit</dt><dd>{layer.pdu}</dd></div>
										<div><dt className="font-semibold text-[#172642]">Devices</dt><dd>{layer.devices}</dd></div>
									</dl>
								</article>
							))}
						</div>
						<div className="hidden overflow-x-auto rounded-xl border border-[#dbe5f5] sm:block">
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
					</div>
				</LessonImageExpand>
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

const moduleOneLessonBySlug = {
	"osi-model-tutorial": OsiModelLesson,
	"tcp-and-udp-tutorial": TcpUdpLesson,
	"wan-tutorial": WanLesson,
	"cisco-command-line-interface-cli": CliModesLesson,
	"cisco-router-boot-sequence-tutorial": RouterBootLesson,
	"subnetting-tutorial---subnetting-made-easy": SubnettingLesson,
	"wireless-tutorial": WirelessLesson,
	"ipv6-tutorial": Ipv6Lesson,
	"hypervisor-type-1-and-2-tutorial-(on-digitaltut.com)": HypervisorLesson,
};

export default function CcnaKnowledgeModuleOne({ article, articleSlug }) {
	const Lesson = moduleOneLessonBySlug[articleSlug];
	return (
		<>
			<p className="mt-7 text-lg leading-[1.8] sm:text-xl">{article.intro}</p>
			{Lesson ? <Lesson /> : <><DiagramPlaceholder /><p className="text-lg leading-[1.8] sm:text-xl">{article.body}</p></>}
		</>
	);
}
