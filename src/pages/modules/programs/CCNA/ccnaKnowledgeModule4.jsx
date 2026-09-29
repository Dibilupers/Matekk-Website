import { TutorialDiagramFrame } from "./ccnaTutorialDiagramFrame";
import CcnaKnowledgeModulePlaceholder from "./ccnaKnowledgeModulePlaceholder";

function NatBasicTranslationDiagram() {
	return (
		<svg viewBox="0 0 1000 520" role="img" aria-labelledby="nat-basic-title nat-basic-description" className="mx-auto h-auto w-full">
			<title id="nat-basic-title">NAT translates an inside private address to a public address and back</title>
			<desc id="nat-basic-description">An inside host 10.0.0.9 sends traffic through a NAT router. The router translates the source to inside global address 198.51.100.10 before forwarding to outside server 203.0.113.20. The reply destination is translated back to 10.0.0.9.</desc>
			<defs>
				<linearGradient id="nat-basic-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="nat-basic-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="nat-basic-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="504" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v62H10z" fill="url(#nat-basic-header)" />
			<text x="42" y="58" fill="#fff" fontSize="25" fontWeight="700">NAT · Private Inside Address to Public Address</text>
			<text x="42" y="81" fill="#dcecff" fontSize="13">The translation router records the mapping so the reply can return to the right inside host.</text>

			<rect x="42" y="120" width="247" height="278" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="64" y="152" fill="#2853a0" fontSize="14" fontWeight="700">INSIDE · PRIVATE LAN</text>
			<rect x="74" y="184" width="183" height="82" rx="14" fill="#fff" stroke="#a9c7ef" strokeWidth="2" />
			<rect x="94" y="201" width="43" height="31" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M89 240h53m-41 0v8m29-8v8m-38 0h48" stroke="#4980cb" strokeWidth="2" strokeLinecap="round" />
			<text x="176" y="221" fill="#183d73" fontSize="12" fontWeight="700" textAnchor="middle">Host A</text>
			<text x="176" y="243" fill="#526584" fontSize="11" textAnchor="middle">10.0.0.9</text>
			<text x="165" y="302" fill="#526584" fontSize="11" textAnchor="middle">RFC 1918 private address</text>
			<text x="165" y="324" fill="#526584" fontSize="11" textAnchor="middle">not routed on the public Internet</text>
			<rect x="65" y="351" width="203" height="28" rx="14" fill="#fff" stroke="#cbd9ed" />
			<text x="166" y="370" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">Inside local: 10.0.0.9</text>

			<rect x="376" y="137" width="248" height="245" rx="20" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<circle cx="500" cy="195" r="39" fill="#f4dfb5" />
			<circle cx="500" cy="195" r="29" fill="#bf791c" />
			<rect x="486" y="186" width="28" height="18" rx="4" fill="#fff" />
			<path d="M490 192h6m4 0h9m-19 7h6m4 0h9" stroke="#bf791c" strokeWidth="2" strokeLinecap="round" />
			<text x="500" y="249" fill="#9a640e" fontSize="14" fontWeight="700" textAnchor="middle">NAT Router</text>
			<text x="500" y="273" fill="#526584" fontSize="11" textAnchor="middle">inside interface · outside interface</text>
			<rect x="398" y="292" width="204" height="66" rx="12" fill="#fff" stroke="#ead7b1" />
			<text x="500" y="316" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">Translation entry</text>
			<text x="500" y="338" fill="#526584" fontSize="10" textAnchor="middle">10.0.0.9 ↔ 198.51.100.10</text>

			<rect x="711" y="120" width="247" height="278" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="733" y="152" fill="#13754e" fontSize="14" fontWeight="700">OUTSIDE · PUBLIC NETWORK</text>
			<rect x="738" y="184" width="192" height="82" rx="14" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<rect x="760" y="201" width="41" height="31" rx="4" fill="#ddf4e9" stroke="#18865d" strokeWidth="2" />
			<path d="M755 240h51m-40 0v8m29-8v8m-38 0h48" stroke="#18865d" strokeWidth="2" strokeLinecap="round" />
			<text x="853" y="221" fill="#176847" fontSize="12" fontWeight="700" textAnchor="middle">Web server</text>
			<text x="853" y="243" fill="#526584" fontSize="11" textAnchor="middle">203.0.113.20</text>
			<text x="834" y="302" fill="#526584" fontSize="11" textAnchor="middle">Documentation address range</text>
			<text x="834" y="324" fill="#526584" fontSize="11" textAnchor="middle">used here as public-side example</text>
			<rect x="733" y="351" width="203" height="28" rx="14" fill="#fff" stroke="#b9d8c6" />
			<text x="834" y="370" fill="#118153" fontSize="10" fontWeight="700" textAnchor="middle">Inside global: 198.51.100.10</text>

			<path d="M289 220h79" fill="none" stroke="#2872dc" strokeWidth="4" markerEnd="url(#nat-basic-blue-arrow)" />
			<text x="329" y="202" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">outbound</text>
			<path d="M624 220h79" fill="none" stroke="#2872dc" strokeWidth="4" markerEnd="url(#nat-basic-blue-arrow)" />
			<text x="663" y="202" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">source translated</text>
			<path d="M703 251H625" fill="none" stroke="#18a36a" strokeWidth="3" strokeDasharray="7 5" markerEnd="url(#nat-basic-green-arrow)" />
			<path d="M368 251h-79" fill="none" stroke="#18a36a" strokeWidth="3" strokeDasharray="7 5" markerEnd="url(#nat-basic-green-arrow)" />
			<text x="500" y="428" fill="#118153" fontSize="12" fontWeight="700" textAnchor="middle">Reply destination is translated from 198.51.100.10 back to 10.0.0.9.</text>
			<rect x="94" y="452" width="812" height="34" rx="16" fill="#f7faff" />
			<text x="500" y="474" fill="#526584" fontSize="11" textAnchor="middle">NAT changes address information in packet headers; routing still determines where the translated packet is sent.</text>
		</svg>
	);
}

function NatPatDiagram() {
	const translations = [
		{ y: 260, host: "10.0.0.9:49152", translated: "198.51.100.10:40001", color: "#2868bd" },
		{ y: 303, host: "10.0.0.10:49152", translated: "198.51.100.10:40002", color: "#18865d" },
		{ y: 346, host: "10.0.0.11:49152", translated: "198.51.100.10:40003", color: "#7042b4" },
	];

	return (
		<svg viewBox="0 0 1000 500" role="img" aria-labelledby="nat-pat-title nat-pat-description" className="mx-auto h-auto w-full">
			<title id="nat-pat-title">PAT multiplexes private hosts onto one public address using ports</title>
			<desc id="nat-pat-description">Three private hosts use the same public NAT address 198.51.100.10 but receive distinct translated source port numbers 40001, 40002, and 40003. The NAT table maps each public address-and-port tuple back to the unique private address-and-port tuple.</desc>
			<defs>
				<linearGradient id="nat-pat-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="nat-pat-arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="nat-pat-arrow-purple" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#7042b4" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="484" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#nat-pat-header)" />
			<text x="42" y="58" fill="#fff" fontSize="24" fontWeight="700">PAT · Many Private Sessions, One Public IPv4 Address</text>
			<text x="42" y="80" fill="#dcecff" fontSize="13">Port Address Translation (NAT overload) uses address-and-port pairs to keep flows distinct.</text>

			<rect x="40" y="119" width="319" height="292" rx="19" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="64" y="151" fill="#2853a0" fontSize="14" fontWeight="700">INSIDE LOCAL · PRIVATE HOSTS</text>
			{translations.map((row, index) => (
				<g key={row.host}>
					<rect x="64" y={row.y - 19} width="271" height="37" rx="11" fill="#fff" stroke="#cbd9ed" />
					<circle cx="84" cy={row.y} r="9" fill={row.color} />
					<text x="103" y={row.y + 4} fill="#183d73" fontSize="11" fontWeight="700">{`Host ${index + 1} · ${row.host}`}</text>
				</g>
			))}
			<text x="200" y="394" fill="#526584" fontSize="10" textAnchor="middle">Private source address and source port</text>

			<rect x="407" y="129" width="184" height="251" rx="19" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<circle cx="499" cy="183" r="34" fill="#f4dfb5" />
			<circle cx="499" cy="183" r="25" fill="#bf791c" />
			<rect x="487" y="176" width="24" height="15" rx="3" fill="#fff" />
			<path d="M491 181h6m3 0h7m-16 6h6m3 0h7" stroke="#bf791c" strokeWidth="1.5" strokeLinecap="round" />
			<text x="499" y="231" fill="#9a640e" fontSize="13" fontWeight="700" textAnchor="middle">PAT Router</text>
			<text x="499" y="253" fill="#526584" fontSize="10" textAnchor="middle">one public address</text>
			<rect x="426" y="272" width="146" height="82" rx="11" fill="#fff" stroke="#ead7b1" />
			<text x="499" y="293" fill="#1a3768" fontSize="10" fontWeight="700" textAnchor="middle">PAT translation table</text>
			<text x="499" y="313" fill="#526584" fontSize="9" textAnchor="middle">unique protocol + port mappings</text>
			<text x="499" y="332" fill="#526584" fontSize="9" textAnchor="middle">reverse packets use this state</text>

			<rect x="640" y="119" width="320" height="292" rx="19" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="664" y="151" fill="#13754e" fontSize="14" fontWeight="700">INSIDE GLOBAL · PUBLIC ADDRESS</text>
			<rect x="674" y="166" width="252" height="45" rx="12" fill="#fff" stroke="#b9d8c6" />
			<text x="800" y="194" fill="#118153" fontSize="12" fontWeight="700" textAnchor="middle">198.51.100.10 · shared by all</text>
			{translations.map((row) => (
				<g key={`${row.host}-global`}>
					<rect x="674" y={row.y - 19} width="252" height="37" rx="11" fill="#fff" stroke="#cbd9ed" />
					<circle cx="694" cy={row.y} r="9" fill={row.color} />
					<text x="713" y={row.y + 4} fill="#183d73" fontSize="10" fontWeight="700">{row.translated}</text>
				</g>
			))}
			<text x="800" y="394" fill="#526584" fontSize="10" textAnchor="middle">Each translated transport port distinguishes a flow</text>

			{translations.map((row, index) => (
				<path
					key={`${row.host}-arrow`}
					d={`M359 ${row.y}h41m191 0h82`}
					fill="none"
					stroke={row.color}
					strokeWidth="2.5"
					markerEnd={index === 2 ? "url(#nat-pat-arrow-purple)" : "url(#nat-pat-arrow-blue)"}
				/>
			))}
			<rect x="84" y="432" width="832" height="37" rx="16" fill="#f7faff" />
			<text x="500" y="456" fill="#526584" fontSize="11" textAnchor="middle">Responses return to 198.51.100.10 and the translated port; the NAT table restores the matching inside endpoint.</text>
		</svg>
	);
}

function NatAddressRolesDiagram() {
	return (
		<svg viewBox="0 0 1000 515" role="img" aria-labelledby="nat-roles-title nat-roles-description" className="mx-auto h-auto w-full">
			<title id="nat-roles-title">NAT inside local, inside global, outside global, and outside local addresses</title>
			<desc id="nat-roles-description">An inside client with inside-local address 10.0.0.9 is translated by NAT to inside-global address 198.51.100.10. The outside server has outside-global address 203.0.113.20 and is seen as outside-local address 203.0.113.20 when it is not translated by an outside NAT device. Inside and outside labels describe the NAT domain, not simply private and public address categories.</desc>
			<defs>
				<linearGradient id="nat-roles-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="nat-roles-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="499" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#nat-roles-header)" />
			<text x="42" y="58" fill="#fff" fontSize="24" fontWeight="700">NAT · Four Address Roles</text>
			<text x="42" y="80" fill="#dcecff" fontSize="13">Address labels are defined from the translating device’s perspective—not as simple private/public synonyms.</text>

			<rect x="44" y="120" width="420" height="328" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<rect x="536" y="120" width="420" height="328" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="69" y="153" fill="#2853a0" fontSize="14" fontWeight="700">INSIDE · CLIENT NETWORK</text>
			<text x="561" y="153" fill="#13754e" fontSize="14" fontWeight="700">OUTSIDE · REMOTE NETWORK</text>

			<rect x="75" y="198" width="174" height="75" rx="14" fill="#fff" stroke="#a9c7ef" strokeWidth="2" />
			<text x="162" y="225" fill="#183d73" fontSize="13" fontWeight="700" textAnchor="middle">Inside client</text>
			<text x="162" y="250" fill="#2853df" fontSize="12" textAnchor="middle">10.0.0.9</text>
			<rect x="259" y="185" width="175" height="99" rx="14" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<text x="346" y="213" fill="#9a640e" fontSize="13" fontWeight="700" textAnchor="middle">NAT boundary</text>
			<text x="346" y="237" fill="#526584" fontSize="10" textAnchor="middle">performs address translation</text>
			<text x="346" y="260" fill="#118153" fontSize="10" fontWeight="700" textAnchor="middle">public mapping 198.51.100.10</text>

			<rect x="751" y="198" width="174" height="75" rx="14" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<text x="838" y="225" fill="#176847" fontSize="13" fontWeight="700" textAnchor="middle">Outside server</text>
			<text x="838" y="250" fill="#118153" fontSize="12" textAnchor="middle">203.0.113.20</text>
			<path d="M249 235h6m179 0h303" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#nat-roles-arrow)" />
			<text x="499" y="216" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">translated packet traverses the NAT router</text>

			<rect x="75" y="320" width="359" height="96" rx="14" fill="#fff" stroke="#cbd9ed" />
			<text x="98" y="346" fill="#1756a4" fontSize="12" fontWeight="700">Inside local</text>
			<text x="98" y="368" fill="#526584" fontSize="11">Client’s original address as used inside.</text>
			<text x="98" y="394" fill="#2853df" fontSize="12" fontWeight="700">10.0.0.9</text>

			<rect x="566" y="320" width="359" height="96" rx="14" fill="#fff" stroke="#b9d8c6" />
			<text x="589" y="346" fill="#13754e" fontSize="12" fontWeight="700">Inside global</text>
			<text x="589" y="368" fill="#526584" fontSize="11">Inside client’s translated address as seen outside.</text>
			<text x="589" y="394" fill="#118153" fontSize="12" fontWeight="700">198.51.100.10</text>

			<rect x="75" y="429" width="359" height="1" fill="#d5e3f5" />
			<rect x="566" y="429" width="359" height="1" fill="#d5e3f5" />
			<rect x="75" y="436" width="359" height="0" fill="none" />
			<text x="500" y="474" fill="#526584" fontSize="11" textAnchor="middle">Outside global: server’s real public address 203.0.113.20 · Outside local: server address as represented to the inside.</text>
			<text x="500" y="492" fill="#71819b" fontSize="10" textAnchor="middle">Here they are equal because the outside server is not translated; outside local is not automatically a private address.</text>
		</svg>
	);
}

function NtpStratumDiagram() {
	const strata = [
		{ y: 170, label: "STRATUM 0", name: "Reference clock", detail: "GPS / radio clock / atomic clock", color: "#a66311", fill: "#fff4df", x: 410, width: 180 },
		{ y: 244, label: "STRATUM 1", name: "Primary time server", detail: "Directly connected to reference clock", color: "#1756a4", fill: "#eaf2ff", x: 330, width: 340 },
		{ y: 318, label: "STRATUM 2", name: "Enterprise NTP servers", detail: "Synchronize from one or more upstream servers", color: "#13754e", fill: "#edfaf3", x: 230, width: 540 },
		{ y: 392, label: "STRATUM 3", name: "Routers, switches, and servers", detail: "Synchronize from selected stratum 2 sources", color: "#7042b4", fill: "#f4efff", x: 130, width: 740 },
	];
	return (
		<svg viewBox="0 0 1000 550" role="img" aria-labelledby="ntp-stratum-title ntp-stratum-description" className="mx-auto h-auto w-full">
			<title id="ntp-stratum-title">NTP stratum hierarchy from reference clock to network devices</title>
			<desc id="ntp-stratum-description">A stratum 0 reference clock supplies a directly connected stratum 1 NTP server. Stratum 2 servers synchronize from stratum 1, and stratum 3 network devices can synchronize from stratum 2. Larger stratum numbers indicate more synchronization distance, not a direct measure of accuracy.</desc>
			<defs>
				<linearGradient id="ntp-stratum-header" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#176fce" /><stop offset="100%" stopColor="#1549a6" /></linearGradient>
				<marker id="ntp-stratum-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="534" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v62H10z" fill="url(#ntp-stratum-header)" />
			<text x="42" y="58" fill="#fff" fontSize="25" fontWeight="700">NTP · Stratum Shows Distance from a Reference Clock</text>
			<text x="42" y="81" fill="#dcecff" fontSize="13">Each synchronized server normally advertises a stratum one greater than its selected upstream source.</text>

			{strata.map((item, index) => (
				<g key={item.label}>
					<rect x={item.x} y={item.y} width={item.width} height="56" rx="15" fill={item.fill} stroke="#cbd9ed" strokeWidth="2" />
					<rect x={item.x + 12} y={item.y + 12} width="100" height="30" rx="14" fill="#fff" />
					<text x={item.x + 62} y={item.y + 32} fill={item.color} fontSize="11" fontWeight="700" textAnchor="middle">{item.label}</text>
					<text x={item.x + 128} y={item.y + 25} fill="#1a3768" fontSize="13" fontWeight="700">{item.name}</text>
					<text x={item.x + 128} y={item.y + 43} fill="#526584" fontSize="10">{item.detail}</text>
					{index < strata.length - 1 && (
						<path d={`M500 ${item.y + 58}v13`} fill="none" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#ntp-stratum-arrow)" />
					)}
				</g>
			))}

			<rect x="78" y="470" width="844" height="46" rx="14" fill="#f7faff" stroke="#d5e3f5" />
			<text x="500" y="490" fill="#1a3768" fontSize="12" fontWeight="700" textAnchor="middle">Stratum 0 is the reference clock; it is not an NTP server on the network.</text>
			<text x="500" y="507" fill="#526584" fontSize="10" textAnchor="middle">Strata 1–15 may be synchronized; stratum 16 means unsynchronized. Lower stratum alone does not guarantee better time quality.</text>
		</svg>
	);
}

function NtpPeerSyncDiagram() {
	return (
		<svg viewBox="0 0 1000 530" role="img" aria-labelledby="ntp-peer-title ntp-peer-description" className="mx-auto h-auto w-full">
			<title id="ntp-peer-title">NTP clients, servers, and symmetric peers</title>
			<desc id="ntp-peer-description">Two network devices each use a preferred upstream NTP server and also have a symmetric peer association with each other. Normal ntp server configuration requests synchronization from a remote source. An ntp peer association allows symmetric exchange but source selection and fallback depend on synchronization state and configuration.</desc>
			<defs>
				<linearGradient id="ntp-peer-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="ntp-peer-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="ntp-peer-purple-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#7042b4" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="514" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v62H10z" fill="url(#ntp-peer-header)" />
			<text x="42" y="58" fill="#fff" fontSize="24" fontWeight="700">NTP · Client/Server and Symmetric Peer Associations</text>
			<text x="42" y="81" fill="#dcecff" fontSize="13">UDP port 123 · ordinary unicast is common; multicast/broadcast are optional deployment modes.</text>

			<rect x="51" y="123" width="260" height="127" rx="19" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<circle cx="100" cy="177" r="29" fill="#2868bd" />
			<path d="M87 172h26m-21 10h16m-8-20v5m-9 2v3m18-3v3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
			<text x="195" y="161" fill="#2853a0" fontSize="14" fontWeight="700" textAnchor="middle">R1 · NTP client</text>
			<text x="195" y="184" fill="#526584" fontSize="11" textAnchor="middle">preferred source: Server 1</text>
			<text x="195" y="206" fill="#526584" fontSize="10" textAnchor="middle">can also associate with R2 as peer</text>
			<rect x="689" y="123" width="260" height="127" rx="19" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<circle cx="738" cy="177" r="29" fill="#18865d" />
			<path d="M725 172h26m-21 10h16m-8-20v5m-9 2v3m18-3v3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
			<text x="833" y="161" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">R2 · NTP client</text>
			<text x="833" y="184" fill="#526584" fontSize="11" textAnchor="middle">preferred source: Server 2</text>
			<text x="833" y="206" fill="#526584" fontSize="10" textAnchor="middle">can also associate with R1 as peer</text>

			<rect x="53" y="327" width="260" height="86" rx="16" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="183" y="356" fill="#1756a4" fontSize="13" fontWeight="700" textAnchor="middle">Server 1</text>
			<text x="183" y="380" fill="#526584" fontSize="11" textAnchor="middle">authoritative upstream source</text>
			<rect x="687" y="327" width="260" height="86" rx="16" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="817" y="356" fill="#1756a4" fontSize="13" fontWeight="700" textAnchor="middle">Server 2</text>
			<text x="817" y="380" fill="#526584" fontSize="11" textAnchor="middle">independent upstream source</text>

			<path d="M183 326V287H146V252" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ntp-peer-blue-arrow)" />
			<path d="M817 326V287H854V252" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ntp-peer-blue-arrow)" />
			<rect x="102" y="270" width="145" height="24" rx="12" fill="#eaf2ff" />
			<text x="174" y="287" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">ntp server · unicast</text>
			<rect x="752" y="270" width="145" height="24" rx="12" fill="#eaf2ff" />
			<text x="824" y="287" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">ntp server · unicast</text>

			<path d="M319 178H681" fill="none" stroke="#7042b4" strokeWidth="3" markerEnd="url(#ntp-peer-purple-arrow)" />
			<path d="M681 198H319" fill="none" stroke="#7042b4" strokeWidth="3" markerEnd="url(#ntp-peer-purple-arrow)" />
			<rect x="413" y="151" width="174" height="25" rx="12" fill="#f4efff" />
			<text x="500" y="168" fill="#7042b4" fontSize="10" fontWeight="700" textAnchor="middle">symmetric peer association</text>
			<text x="500" y="219" fill="#526584" fontSize="10" textAnchor="middle">ntp peer 192.0.2.x</text>

			<rect x="53" y="440" width="894" height="54" rx="15" fill="#fff9ed" stroke="#e8c98d" />
			<text x="500" y="462" fill="#9a640e" fontSize="11" fontWeight="700" textAnchor="middle">Peer associations are not a guaranteed automatic “backup” mechanism.</text>
			<text x="500" y="481" fill="#526584" fontSize="10" textAnchor="middle">NTP selects usable sources by its algorithms, reachability, and configuration; verify actual source selection.</text>
		</svg>
	);
}

function NtpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why accurate network time matters</h2>
				<p className="mt-3">
					Network Time Protocol (NTP) synchronizes clocks on routers, switches, servers, and
					other networked devices. A consistent clock makes event logs from different devices
					comparable: an administrator investigating a link failure can correlate the switch
					event, router interface log, firewall record, and server alert by timestamp.
				</p>
				<p className="mt-3">
					Time synchronization also supports monitoring and operational services, including
					SNMP event correlation, certificate validation, scheduled tasks, and security
					investigations. NTP adjusts a device’s clock based on measured timing information
					from selected sources; it is more than simply copying a displayed time string.
					Accurate time improves operations, but it does not replace reliable logging,
					monitoring, access control, or security controls.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">NTP client/server operation</h2>
				<p className="mt-3">
					In the common client/server mode, a device configured as an NTP client exchanges
					time requests with one or more remote servers. It evaluates the timing data, source
					reachability, and other protocol information, then selects a usable source and
					disciplines its local clock. The client periodically polls its sources; the polling
					interval can change as the protocol converges and according to platform configuration.
				</p>
				<p className="mt-3">
					A time server can itself synchronize from upstream sources and provide time to
					downstream clients. A server near the top of an organization’s time hierarchy should
					use dependable upstream references and be monitored. A router configured with
					<code> ntp master</code> can advertise its own local clock as a time source, but that
					does not make the clock accurate or externally traceable. Use a local master only
					when the design deliberately needs that behavior and its implications are understood.
				</p>
				<p className="mt-3">
					NTP uses UDP port <code>123</code>. In ordinary unicast client/server operation,
					the client exchanges NTP messages with the server’s NTP service on that port; exact
					source-port handling can depend on implementation and association mode. NTP also supports multicast and
					broadcast modes on suitable networks, but these are optional deployment choices,
					not the normal assumption for a basic <code>ntp server</code> configuration.
					The IPv4 NTP multicast address commonly associated with that mode is
					<code> 224.0.1.1</code>.
				</p>
				<p className="mt-3">
					NTP synchronizes the clock’s time reference; the displayed time zone is configured
					locally on each device. For example, two routers can be synchronized to the same
					instant while one displays UTC and another displays local time. Configure a
					consistent time-zone policy when comparing human-readable logs.
				</p>
				<TutorialDiagramFrame caption="Clients normally use unicast NTP server associations. Symmetric peers can exchange time, but source selection and backup behavior depend on NTP state and configuration.">
					<NtpPeerSyncDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Understanding the stratum hierarchy</h2>
				<p className="mt-3">
					Stratum describes a server’s synchronization distance from a reference clock in the
					NTP hierarchy. A stratum 0 device is a reference clock—such as a GPS receiver or
					radio clock—not an ordinary NTP server that clients query directly. A stratum 1
					server is synchronized directly to a stratum 0 reference. A stratum 2 system
					synchronizes from a stratum 1 source; stratum 3 can synchronize from stratum 2,
					and so on.
				</p>
				<TutorialDiagramFrame caption="Stratum numbers increase with synchronization distance from the reference clock. Stratum is useful context, but it is not a standalone accuracy score.">
					<NtpStratumDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4">
					Stratum values 1 through 15 can represent synchronized sources. Stratum 16 indicates
					that a clock is unsynchronized and is not a valid synchronized source. NTP can also
					use peer associations between devices at similar levels. A lower stratum is closer
					to the reference hierarchy, but it does not automatically mean the best source:
					delay, dispersion, stability, reachability, configuration, and source quality also
					matter.
				</p>
				<p className="mt-3">
					NTP association is not necessarily a simple one-way chain. A server may have multiple
					upstream candidates and peer associations. The protocol compares available sources
					and selects a system peer; each device maintains its own synchronization state.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Cisco IOS: configure an NTP client</h2>
				<p className="mt-3">
					The <code>ntp server</code> command configures the local device to synchronize from
					the specified remote NTP server. It does not declare the remote server’s role on
					that device; rather, it creates a client/server association from the local device
					to that source. Configure multiple trusted sources where appropriate and verify
					that the device selects a reachable, synchronized peer.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Device(config)# ntp server 192.0.2.10
Device(config)# ntp server 192.0.2.11`}</code></pre>
				<p className="mt-3">
					These addresses are from the documentation-only TEST-NET range; replace them with
					the organization’s actual NTP sources. Ensure the device has IP reachability to
					the servers and that firewalls or access lists permit NTP traffic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Serve local time with `ntp master`</h2>
				<p className="mt-3">
					On supported Cisco IOS platforms, <code>ntp master [stratum]</code> configures the
					device to act as an NTP master using its local clock as the reference. If no
					stratum is supplied, the platform uses its default master stratum. The optional
					value controls the stratum the device advertises; it does not improve the quality
					or accuracy of the local clock.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Device(config)# ntp master 8`}</code></pre>
				<p className="mt-3">
					Use this only for a deliberate isolated-lab source or an explicitly designed local
					time hierarchy. A local clock can drift, and downstream devices may trust it even
					though it is not synchronized to a reliable external reference. In production,
					configure dependable upstream NTP sources and monitor synchronization rather than
					presenting an unsynchronized clock as authoritative.
				</p>
				<p className="mt-3">
					A device may have both <code>ntp server</code> and <code>ntp master</code>
					configuration, but do not assume the master command behaves as a guaranteed
					automatic backup for every failure case. The selected source, advertised stratum,
					and behavior when upstream becomes unreachable depend on NTP selection and
					platform implementation. Verify the actual state with show commands and lab testing.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">NTP peers and symmetric active mode</h2>
				<p className="mt-3">
					The <code>ntp peer</code> command configures a symmetric association with another
					NTP system. In this relationship, each device can exchange timing information as
					a peer rather than treating the association only as a one-way client-to-server
					request. Peering can improve resilience in a carefully designed hierarchy, but
					it is not automatically a guaranteed fallback path.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`! R1: preferred upstream plus symmetric association with R2
R1(config)# ntp server 192.0.2.10
R1(config)# ntp peer 192.0.2.2

! R2: its upstream plus symmetric association with R1
R2(config)# ntp server 192.0.2.20
R2(config)# ntp peer 192.0.2.1`}</code></pre>
				<p className="mt-3">
					In this example, each device has its own configured upstream server and a peer
					association with the other device. NTP’s selection algorithm determines which
					sources are reachable and acceptable; the commands alone do not prove which source
					is currently selected or guarantee that the peer becomes the backup. Check status
					and associations on both devices, and test upstream-loss behavior before relying
					on the design.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">NTP authentication</h2>
				<p className="mt-3">
					NTP authentication helps a device determine whether time packets are associated
					with a configured trusted key. On Cisco IOS platforms that support keyed NTP
					authentication, <code>ntp authenticate</code> enables the feature,
					<code> ntp authentication-key</code> defines a key, and
					<code> ntp trusted-key</code> identifies key numbers accepted as trusted. The
					remote source must be configured compatibly with the same key material and key ID.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Device(config)# ntp authentication-key 10 md5 <managed-secret>
Device(config)# ntp trusted-key 10
Device(config)# ntp authenticate
Device(config)# ntp server 192.0.2.10 key 10`}</code></pre>
				<p className="mt-3">
					Exact authentication algorithms and command syntax vary by platform and software.
					Some deployments use a key chain or another supported mechanism. Authentication
					does not encrypt NTP packets or guarantee that a source’s time is accurate; use a
					protected secret, follow current platform guidance, and verify key configuration
					at both ends. Do not paste actual shared keys into documentation or public examples.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verify NTP status and associations</h2>
				<p className="mt-3">
					Use status and association commands together. A configured server is not necessarily
					a reachable or selected synchronization source, and initial synchronization can
					take time while the client exchanges samples and evaluates candidates.
				</p>
				<h3 className="mt-5 text-lg font-bold text-[#17356d]">Check the local clock and sync state</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Device# show clock
Device# show ntp status`}</code></pre>
				<p className="mt-3">
					<code>show clock</code> displays the device’s current clock and timezone context.
					<code> show ntp status</code> reports whether the clock is synchronized, its stratum,
					and information about its reference source, offset, and dispersion. An output such
					as “Clock is unsynchronized” with stratum 16 means the device has not selected a
					valid synchronized source.
				</p>
				<h3 className="mt-5 text-lg font-bold text-[#17356d]">Inspect NTP associations</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Device# show ntp associations
Device# show ntp associations detail`}</code></pre>
				<p className="mt-3">
					The association table lists configured and learned sources and commonly includes
					the source address, reference clock, stratum, poll interval, reachability, delay,
					offset, and dispersion. Cisco IOS marker symbols commonly include
					<code> *</code> for the system peer, <code>+</code> for a candidate,
					<code> -</code> for an outlier, <code> x</code> for a falseticker, and
					<code> ~</code> for a configured association. Check the legend printed by the
					device because output details can vary.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-full border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Field / marker</th><th className="px-4 py-3 font-bold">What it generally indicates</th></tr>
						</thead>
						<tbody className="divide-y divide-[#dbe5f5]">
							<tr><th className="px-4 py-3 font-semibold text-[#172642]">*</th><td className="px-4 py-3">Selected system peer on common Cisco output.</td></tr>
							<tr><th className="px-4 py-3 font-semibold text-[#172642]">+</th><td className="px-4 py-3">A candidate source considered usable by the selection process.</td></tr>
							<tr><th className="px-4 py-3 font-semibold text-[#172642]">~</th><td className="px-4 py-3">An association configured locally.</td></tr>
							<tr><th className="px-4 py-3 font-semibold text-[#172642]">reach = 0 / .INIT.</th><td className="px-4 py-3">No successful replies have entered the reachability register yet, or the association is still initializing.</td></tr>
							<tr><th className="px-4 py-3 font-semibold text-[#172642]">st = 16</th><td className="px-4 py-3">The source/client is unsynchronized, not a healthy synchronized stratum-16 server.</td></tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					A poll value is commonly displayed in seconds or as an encoded interval depending
					on the platform’s output; consult the command legend and software documentation.
					Do not infer that a configured entry is synchronized merely because it appears
					in the association list: look for the selected peer marker and synchronized
					status, then inspect reach, offset, and reference clock.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Troubleshoot a device that will not synchronize</h2>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>1. Confirm reachability:</strong> verify routing to the configured server and check any ACL or firewall policy that may block UDP 123.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>2. Check association state:</strong> use <code>show ntp associations</code> and inspect the reference clock, stratum, poll, reach, and source-selection markers.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>3. Check local configuration:</strong> verify server/peer address, authentication key ID, trusted-key configuration, and any source-interface or access-group restrictions.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>4. Confirm source health:</strong> the upstream source must itself be synchronized and acceptable; a reachable server reporting stratum 16 cannot provide valid synchronized time.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>5. Allow convergence and recheck:</strong> NTP polling and source selection take time. Recheck status after exchanges rather than assuming an immediate update.</li>
				</ol>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>NTP synchronizes device clocks so logs and time-dependent operations can be correlated.</li>
					<li>NTP normally uses UDP port 123; common client/server operation is unicast, while multicast/broadcast are optional modes.</li>
					<li>Stratum 0 is a reference clock, stratum 1 is directly synchronized to it, and stratum 16 indicates unsynchronized.</li>
					<li><code>ntp server</code> configures a server association; <code>ntp peer</code> configures symmetric peering; <code>ntp master</code> advertises local-clock time on supported platforms.</li>
					<li>Do not assume local-master configuration automatically guarantees safe backup behavior; check source selection and actual state.</li>
					<li>Use <code>show ntp status</code>, <code>show ntp associations</code>, and <code>show clock</code> to verify synchronization.</li>
					<li>NTP authentication can validate configured key material but does not encrypt packets or prove that a clock is accurate.</li>
				</ul>
			</section>
		</div>
	);
}

function NatLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What Network Address Translation does</h2>
				<p className="mt-3">
					Network Address Translation (NAT) modifies IP address information as packets pass
					through a router or firewall between address domains. A common use is translating
					private inside IPv4 addresses into publicly routable addresses for Internet communication.
					For example, a workstation can use private address <code>10.0.0.9</code> on a LAN while
					the edge router translates its outbound source address to a public address. When reply
					traffic returns, the router uses its translation state or configured mapping to send
					the packet back to the correct internal host.
				</p>
				<p className="mt-3">
					RFC 1918 addresses are reserved for private internets and are not routed across the
					public Internet. NAT is one way an organization can connect privately addressed devices
					to public networks. It can conserve public IPv4 addresses, provide address-space
					independence between internal and external networks, and support specific address
					mappings. NAT is not itself a complete security control: firewall policy, access control,
					secure configuration, and endpoint protections are still needed.
				</p>
				<TutorialDiagramFrame caption="Outbound traffic is translated at the NAT boundary; the return packet is mapped back to the inside host.">
					<NatBasicTranslationDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why organizations use NAT</h2>
				<p className="mt-3">
					Public IPv4 address space is limited, and organizations commonly have many internal
					devices but only a smaller number of public addresses. Static one-to-one translation
					can make a specific internal service reachable through a predictable public mapping.
					Dynamic NAT can assign public addresses from a pool to inside devices that need them.
					Port Address Translation (PAT), also called NAT overload, lets many inside devices share
					a public address by distinguishing their sessions with transport-layer ports.
				</p>
				<p className="mt-3">
					These methods solve different needs. A finite dynamic pool still limits the number of
					simultaneous inside-to-outside translations that can obtain a pool address. PAT can
					multiplex many transport sessions through one public IPv4 address, although it is still
					constrained by available protocol/port mappings, device resources, timeouts, and the
					applications’ traffic patterns.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">NAT address terminology</h2>
				<p className="mt-3">
					Cisco NAT terminology names an address according to whether the endpoint is inside or
					outside the translating network and whether that address is local to its own domain or
					global as represented across the boundary. “Inside” and “outside” describe the NAT
					domain, while “local” and “global” describe how the address is represented. These terms
					are not simply equivalent to private and public.
				</p>
				<TutorialDiagramFrame caption="A NAT router maps the inside client; an untranslated outside endpoint has the same outside-local and outside-global address.">
					<NatAddressRolesDiagram />
				</TutorialDiagramFrame>
				<div className="mt-5 grid gap-4 sm:grid-cols-2">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Inside local</h3>
						<p className="mt-2 text-sm leading-6">The address of an inside host as it is known within the inside network. For a private workstation, this is often an RFC 1918 address, such as <code>10.0.0.9</code>.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#f0faf5] p-5">
						<h3 className="font-bold text-[#13754e]">Inside global</h3>
						<p className="mt-2 text-sm leading-6">The address representing the inside host to the outside network after translation. For example, <code>198.51.100.10</code> in a documentation example.</p>
					</div>
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
						<h3 className="font-bold text-[#9a640e]">Outside global</h3>
						<p className="mt-2 text-sm leading-6">The address of the outside host as assigned and used in the outside network. A public server might use <code>203.0.113.20</code>.</p>
					</div>
					<div className="rounded-xl border border-[#d8c6f1] bg-[#f7f2ff] p-5">
						<h3 className="font-bold text-[#7042b4]">Outside local</h3>
						<p className="mt-2 text-sm leading-6">The address by which an outside host is represented to the inside network. If the outside host is not translated, this is usually the same as its outside-global address; if it is translated, it can differ.</p>
					</div>
				</div>
				<p className="mt-4">
					For the example flow, the inside local address <code>10.0.0.9</code> is translated to
					inside global <code>198.51.100.10</code>. The remote server’s outside global address
					is <code>203.0.113.20</code>; because no translation is being applied to that outside
					host in this example, its outside local address is also <code>203.0.113.20</code>.
					The examples use the documentation-only ranges from RFC 5737 and are not real public
					assignments.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Static NAT: fixed one-to-one mapping</h2>
				<p className="mt-3">
					Static NAT creates a configured, persistent one-to-one mapping between an inside local
					address and an inside global address. The same internal device consistently appears
					under that mapped global address. Static NAT is useful when a service needs a predictable
					public mapping, subject to routing, firewall rules, and any other requirements for
					inbound reachability.
				</p>
				<p className="mt-3">
					A static mapping reserves an address for that translation rather than dynamically
					borrowing one from a pool. It does not by itself open a firewall or guarantee that
					inbound connections are allowed; the device still needs a route to the public address
					and appropriate security policy.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-full border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr><th className="px-4 py-3 font-bold">Inside local</th><th className="px-4 py-3 font-bold">Static inside global</th><th className="px-4 py-3 font-bold">Mapping</th></tr>
						</thead>
						<tbody className="divide-y divide-[#dbe5f5]">
							<tr><td className="px-4 py-3">10.0.0.20</td><td className="px-4 py-3">198.51.100.20</td><td className="px-4 py-3">Persistent one-to-one</td></tr>
							<tr><td className="px-4 py-3">10.0.0.21</td><td className="px-4 py-3">198.51.100.21</td><td className="px-4 py-3">Separate persistent mapping</td></tr>
						</tbody>
					</table>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Dynamic NAT: allocation from a pool</h2>
				<p className="mt-3">
					Dynamic NAT uses a configured pool of inside global addresses. When an inside host
					initiates traffic that matches the NAT policy, the router allocates an available
					address from that pool and creates a temporary translation. When the translation is
					removed according to its timeout and state, the address can be reused by another host.
				</p>
				<p className="mt-3">
					A dynamic pool with 50 addresses can provide at most 50 simultaneous address
					translations that each require a pool address. If all addresses are allocated, new
					flows requiring an address cannot receive a translation until one becomes available.
					This limit is about active translation allocation, not a fixed count of employees
					allowed on the network overall. PAT is commonly used when many concurrent hosts or
					sessions need to share fewer public IPv4 addresses.
				</p>
				<div className="mt-5 rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
					<h3 className="font-bold text-[#9a640e]">Dynamic pool behavior</h3>
					<ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
						<li>An inside packet matches the configured NAT selection rule.</li>
						<li>The router selects an unused inside-global address from the pool and records the mapping.</li>
						<li>Additional flows from that inside host use the allocated mapping while it is active, subject to NAT type and configuration.</li>
						<li>When the translation expires or is cleared, the pool address can return to the available set.</li>
						<li>If every pool address is in use, a new host needing an address waits or cannot be translated until capacity becomes free.</li>
					</ol>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">PAT / NAT overload: many-to-one with ports</h2>
				<p className="mt-3">
					Port Address Translation (PAT), commonly configured as NAT overload on Cisco routers,
					maps multiple inside local addresses to one inside global address by using distinct
					transport-layer identifiers. For TCP and UDP, these include port numbers; translation
					state also identifies the protocol and endpoints needed to keep flows distinct. PAT can
					overload one address from a pool or overload an outside interface’s address.
				</p>
				<TutorialDiagramFrame caption="PAT changes source ports as needed so separate inside flows can share one public IPv4 address; replies are matched to the translation table.">
					<NatPatDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4">
					For example, several clients can all translate to <code>198.51.100.10</code>, while
					the router assigns different translated source ports such as <code>40001</code>,
					<code> 40002</code>, and <code>40003</code>. When a reply returns to a particular public
					address/port/protocol mapping, the router consults its translation table and restores
					the corresponding inside local address and port.
				</p>
				<p className="mt-3">
					Port fields are 16 bits, but it is inaccurate to promise 65,536 usable simultaneous
					connections per public address. Ports may be reserved or constrained by protocol,
					translation implementation, endpoint tuples, timers, and device capacity; TCP and UDP
					also have separate port spaces. The actual practical session capacity depends on the
					router, traffic patterns, and configuration.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Compare the common NAT methods</h2>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-full border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr>
								<th className="px-4 py-3 font-bold">Method</th>
								<th className="px-4 py-3 font-bold">Mapping</th>
								<th className="px-4 py-3 font-bold">Public address use</th>
								<th className="px-4 py-3 font-bold">Typical use</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#dbe5f5]">
							<tr>
								<th className="px-4 py-3 font-semibold text-[#172642]">Static NAT</th>
								<td className="px-4 py-3">Fixed one-to-one</td>
								<td className="px-4 py-3">One mapped global address per inside address</td>
								<td className="px-4 py-3">Predictable host/service mapping</td>
							</tr>
							<tr>
								<th className="px-4 py-3 font-semibold text-[#172642]">Dynamic NAT</th>
								<td className="px-4 py-3">Temporary one-to-one from a pool</td>
								<td className="px-4 py-3">One pool address per active address translation</td>
								<td className="px-4 py-3">Share a pool over time; pool size limits concurrent allocations</td>
							</tr>
							<tr>
								<th className="px-4 py-3 font-semibold text-[#172642]">PAT / overload</th>
								<td className="px-4 py-3">Many-to-one (or many-to-few) using ports</td>
								<td className="px-4 py-3">Many sessions share one or more global addresses</td>
								<td className="px-4 py-3">Typical small-office and enterprise client Internet access</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Basic Cisco IOS NAT configuration</h2>
				<p className="mt-3">
					NAT configuration identifies inside and outside interfaces and defines which packets
					should be translated. The example below uses documentation addresses and assumes
					GigabitEthernet0/0 faces the inside LAN while GigabitEthernet0/1 faces the ISP. Replace
					the interfaces, public addresses, and prefixes with values assigned to your lab.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">1. Mark the NAT interfaces</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip nat inside
Router(config-if)# exit
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip nat outside
Router(config-if)# exit`}</code></pre>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">2. Static one-to-one translation</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# ip nat inside source static 10.0.0.20 198.51.100.20`}</code></pre>
				<p className="mt-3">
					This establishes a persistent mapping from inside local address
					<code> 10.0.0.20</code> to inside global address <code>198.51.100.20</code>. The public
					address must be routed to this router and must be available for the design.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">3. Dynamic NAT using a public pool</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 1 permit 10.0.0.0 0.0.0.255
Router(config)# ip nat pool PUBLIC-POOL 198.51.100.33 198.51.100.46 netmask 255.255.255.240
Router(config)# ip nat inside source list 1 pool PUBLIC-POOL`}</code></pre>
				<p className="mt-3">
					Access list 1 selects inside source addresses eligible for translation; it is used here
					as a NAT match rule and is not automatically a packet-filtering firewall policy. The
					pool must be a valid block assigned and routed for this network. Coordinate its
					prefix, gateway, and usable addresses with the provider and avoid using network or
					broadcast addresses where applicable.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">4. PAT overload using the outside interface</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 1 permit 10.0.0.0 0.0.0.255
Router(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload`}</code></pre>
				<p className="mt-3">
					The <code>overload</code> keyword enables port translation so multiple selected inside
					hosts can share the address configured on the outside interface. A dynamic pool can
					also be used with overload when the design has multiple public addresses.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Verify and troubleshoot</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router# show ip nat translations
Router# show ip nat statistics
Router# show access-lists
Router# show ip interface brief`}</code></pre>
				<p className="mt-3">
					Confirm that inside and outside interface roles are correct, the NAT match rule selects
					the intended source addresses, the public mapping or pool is valid, and routing exists
					in both directions. Then generate traffic from an inside host and inspect the
					translation entry. If no translation appears, check interface markings, ACL matches,
					pool availability, and whether the traffic actually crosses the NAT router.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">NAT considerations and common misunderstandings</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>NAT is not routing:</strong> after translation, the router still needs a route and a usable next hop for the packet.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>NAT is not a firewall:</strong> translations can affect reachability, but explicit security policy is needed to control permitted traffic.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Dynamic NAT pool capacity is finite:</strong> a pool address can be allocated to an active translation; if none are free, new allocations can fail.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>PAT uses state:</strong> the router must preserve enough protocol/address/port information to associate replies with the correct inside flow.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Translation changes packet headers:</strong> addresses and, for PAT, transport ports and checksums may be adjusted. Some protocols or applications need additional handling.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Public addresses must be assigned and reachable:</strong> example documentation prefixes are for learning only, not production Internet service.</li>
				</ul>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>NAT changes address information as packets cross a configured boundary and tracks or defines how replies map back.</li>
					<li>Static NAT is a fixed one-to-one mapping; dynamic NAT allocates one-to-one mappings from a finite pool.</li>
					<li>PAT/NAT overload lets many inside devices share one or more global addresses by distinguishing transport flows with ports.</li>
					<li>Inside local/global and outside local/global identify address roles relative to the NAT domain, not merely private versus public.</li>
					<li>For an untranslated outside endpoint, outside local and outside global are the same address.</li>
					<li>A NAT router needs correct inside/outside interfaces, matching policy, valid public addressing, and routes; NAT alone is not firewall security.</li>
				</ul>
			</section>
		</div>
	);
}

export default function CcnaKnowledgeModuleFour({ article }) {
	if (article.contentType === "ntp") {
		return <NtpLessonContent />;
	}

	if (article.contentType === "nat") {
		return <NatLessonContent />;
	}

	return <CcnaKnowledgeModulePlaceholder article={article} category="4.0 IP Services" />;
}
