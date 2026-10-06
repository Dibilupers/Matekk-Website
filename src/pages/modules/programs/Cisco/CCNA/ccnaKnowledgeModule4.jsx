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

function DhcpExchangeDiagram() {
	return (
		<svg viewBox="0 0 1000 500" role="img" aria-labelledby="dhcp-dora-title dhcp-dora-description" className="mx-auto h-auto w-full">
			<title id="dhcp-dora-title">DHCP DORA address assignment exchange</title>
			<desc id="dhcp-dora-description">A new client broadcasts DHCP Discover, receives a DHCP Offer, broadcasts DHCP Request to select an offer, and receives a DHCP Acknowledgment with its leased network settings. The arrows show the four DORA stages between the client and DHCP server.</desc>
			<defs>
				<linearGradient id="dhcp-dora-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="dhcp-dora-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="dhcp-dora-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="484" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#dhcp-dora-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">DHCP · DORA Address Assignment</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">A client with no IPv4 address discovers a server and requests a time-limited lease.</text>

			<rect x="42" y="126" width="204" height="278" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="144" y="157" fill="#2853a0" fontSize="14" fontWeight="700" textAnchor="middle">NEW DHCP CLIENT</text>
			<rect x="86" y="184" width="116" height="82" rx="10" fill="#fff" stroke="#7da6dd" strokeWidth="3" />
			<rect x="98" y="196" width="92" height="55" rx="4" fill="#dceaff" />
			<path d="M126 266v13m20-13v13m-37 0h74" fill="none" stroke="#4980cb" strokeWidth="4" strokeLinecap="round" />
			<text x="144" y="310" fill="#183d73" fontSize="13" fontWeight="700" textAnchor="middle">IP: 0.0.0.0</text>
			<text x="144" y="333" fill="#526584" fontSize="11" textAnchor="middle">No lease yet</text>
			<text x="144" y="363" fill="#526584" fontSize="10" textAnchor="middle">UDP source port 68</text>
			<text x="144" y="382" fill="#526584" fontSize="10" textAnchor="middle">Broadcast destination port 67</text>

			<rect x="754" y="126" width="204" height="278" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="856" y="157" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">DHCP SERVER</text>
			<rect x="802" y="190" width="108" height="86" rx="10" fill="#fff" stroke="#72bd94" strokeWidth="3" />
			<rect x="814" y="202" width="84" height="48" rx="4" fill="#ddf4e9" />
			<circle cx="827" cy="263" r="4" fill="#18a36a" />
			<circle cx="842" cy="263" r="4" fill="#18a36a" />
			<text x="856" y="308" fill="#176847" fontSize="12" fontWeight="700" textAnchor="middle">Address pool</text>
			<text x="856" y="330" fill="#526584" fontSize="11" textAnchor="middle">10.1.1.0 /24</text>
			<text x="856" y="353" fill="#526584" fontSize="10" textAnchor="middle">UDP server port 67</text>
			<text x="856" y="379" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Offers lease + options</text>

			<path d="M247 190H748" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#dhcp-dora-blue-arrow)" />
			<circle cx="497" cy="190" r="15" fill="#2872dc" />
			<text x="497" y="195" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">1</text>
			<rect x="337" y="161" width="320" height="24" rx="12" fill="#fff" />
			<text x="497" y="178" fill="#2853df" fontSize="12" fontWeight="700" textAnchor="middle">DHCPDISCOVER · broadcast</text>

			<path d="M752 244H251" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#dhcp-dora-green-arrow)" />
			<circle cx="497" cy="244" r="15" fill="#18a36a" />
			<text x="497" y="249" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">2</text>
			<rect x="337" y="215" width="320" height="24" rx="12" fill="#fff" />
			<text x="497" y="232" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">DHCPOFFER · proposed address + options</text>

			<path d="M247 298H748" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#dhcp-dora-blue-arrow)" />
			<circle cx="497" cy="298" r="15" fill="#2872dc" />
			<text x="497" y="303" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">3</text>
			<rect x="337" y="269" width="320" height="24" rx="12" fill="#fff" />
			<text x="497" y="286" fill="#2853df" fontSize="12" fontWeight="700" textAnchor="middle">DHCPREQUEST · broadcast selection</text>

			<path d="M752 352H251" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#dhcp-dora-green-arrow)" />
			<circle cx="497" cy="352" r="15" fill="#18a36a" />
			<text x="497" y="357" fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">4</text>
			<rect x="337" y="323" width="320" height="24" rx="12" fill="#fff" />
			<text x="497" y="340" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">DHCPACK · lease confirmed</text>

			<rect x="103" y="433" width="794" height="36" rx="16" fill="#f7faff" />
			<text x="500" y="456" fill="#526584" fontSize="12" textAnchor="middle">Common offer/ack delivery can be unicast or broadcast depending on client and network conditions.</text>
		</svg>
	);
}

function DhcpRelayDiagram() {
	return (
		<svg viewBox="0 0 1000 470" role="img" aria-labelledby="dhcp-relay-title dhcp-relay-description" className="mx-auto h-auto w-full">
			<title id="dhcp-relay-title">DHCP relay forwards client broadcasts to a server on another subnet</title>
			<desc id="dhcp-relay-description">A client broadcasts DHCP Discover on its local subnet. The router interface configured with ip helper-address receives it, adds relay information, and forwards a unicast request to the remote DHCP server. The server replies through the relay to the client subnet.</desc>
			<defs>
				<linearGradient id="dhcp-relay-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="dhcp-relay-forward-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="dhcp-relay-return-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="454" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#dhcp-relay-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">DHCP Relay · Client and Server on Different Subnets</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">The first-hop router relays the local broadcast as unicast to the configured server.</text>

			<rect x="36" y="126" width="270" height="273" rx="18" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="171" y="155" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">CLIENT SUBNET · 10.1.1.0/24</text>
			<rect x="67" y="180" width="208" height="79" rx="12" fill="#fff" stroke="#a9c7ef" strokeWidth="2" />
			<rect x="85" y="196" width="41" height="31" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M80 235h51m-39 0v7m28-7v7m-37 0h47" stroke="#4980cb" strokeWidth="2" strokeLinecap="round" />
			<text x="198" y="210" fill="#183d73" fontSize="12" fontWeight="700" textAnchor="middle">DHCP client</text>
			<text x="198" y="232" fill="#526584" fontSize="10" textAnchor="middle">sends local broadcast</text>
			<path d="M171 261v41" stroke="#2872dc" strokeWidth="3" strokeDasharray="5 5" markerEnd="url(#dhcp-relay-forward-arrow)" />
			<rect x="61" y="306" width="220" height="56" rx="12" fill="#fff" stroke="#a9c7ef" />
			<text x="171" y="329" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">Router LAN interface</text>
			<text x="171" y="348" fill="#526584" fontSize="10" textAnchor="middle">ip helper-address 10.2.2.10</text>

			<rect x="367" y="159" width="266" height="209" rx="20" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<circle cx="500" cy="220" r="43" fill="#f4dfb5" />
			<circle cx="500" cy="220" r="31" fill="#bf791c" />
			<path d="M480 220h40m-20-20v40m-14-34 28 28m0-28-28 28" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
			<text x="500" y="284" fill="#9a640e" fontSize="13" fontWeight="700" textAnchor="middle">DHCP relay router</text>
			<text x="500" y="307" fill="#526584" fontSize="10" textAnchor="middle">sets giaddr to client-facing interface IP</text>
			<text x="500" y="335" fill="#526584" fontSize="10" textAnchor="middle">routes server reply back to relay</text>

			<rect x="694" y="126" width="270" height="273" rx="18" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="829" y="155" fill="#13754e" fontSize="13" fontWeight="700" textAnchor="middle">SERVER SUBNET · 10.2.2.0/24</text>
			<rect x="725" y="189" width="208" height="93" rx="12" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<rect x="750" y="206" width="37" height="49" rx="5" fill="#ddf4e9" stroke="#18865d" strokeWidth="2" />
			<circle cx="768" cy="246" r="3" fill="#18a36a" />
			<text x="844" y="221" fill="#176847" fontSize="12" fontWeight="700" textAnchor="middle">DHCP server</text>
			<text x="844" y="243" fill="#526584" fontSize="11" textAnchor="middle">10.2.2.10</text>
			<text x="829" y="315" fill="#526584" fontSize="10" textAnchor="middle">Selects scope using relay giaddr</text>
			<text x="829" y="337" fill="#526584" fontSize="10" textAnchor="middle">returns offer/ack to relay</text>
			<text x="829" y="365" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Routes the reply via the router</text>

			<path d="M282 186C326 125 649 125 708 190" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#dhcp-relay-forward-arrow)" />
			<rect x="345" y="112" width="310" height="28" rx="14" fill="#fff" />
			<text x="500" y="131" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">DISCOVER · broadcast becomes unicast to 10.2.2.10</text>

			<path d="M708 344C647 417 327 417 281 348" fill="none" stroke="#18a36a" strokeWidth="3" strokeDasharray="7 5" markerEnd="url(#dhcp-relay-return-arrow)" />
			<rect x="353" y="392" width="294" height="26" rx="13" fill="#fff" />
			<text x="500" y="410" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">OFFER / ACK · routed back via relay to client LAN</text>
		</svg>
	);
}

function DhcpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What DHCP does</h2>
				<p className="mt-3">
					Dynamic Host Configuration Protocol (DHCP) automatically supplies hosts with
					IPv4 configuration. A lease can include an IP address and subnet mask plus options
					such as the default gateway, DNS server addresses, and domain name. A device can
					therefore connect at a coffee shop, school, or office without a user manually
					reconfiguring its address for each network.
				</p>
				<p className="mt-3">
					Addresses are leased for a limited time, rather than permanently assigned. DHCP
					helps avoid manual configuration errors and address duplication, while administrators
					manage which ranges can be allocated and reserve or exclude addresses used by
					gateways, servers, and other devices that need stable addressing.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How DHCP works: DORA</h2>
				<p className="mt-3">
					A new client typically uses four DHCP messages, remembered as <strong>DORA</strong>:
					Discover, Offer, Request, and Acknowledgment (ACK). DHCP uses UDP; clients use
					port 68 and servers use port 67. During initial discovery, the client has no usable
					IPv4 address, so it uses <code>0.0.0.0</code> as its source and broadcasts to
					<code> 255.255.255.255</code> using the Ethernet broadcast destination
					<code> FF-FF-FF-FF-FF-FF</code>.
				</p>
				<TutorialDiagramFrame caption="DORA: the client discovers servers, selects an offer, and receives an acknowledged address lease.">
					<DhcpExchangeDiagram />
				</TutorialDiagramFrame>
				<ol className="mt-5 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>1. Discover:</strong> the client broadcasts DHCPDISCOVER on its local link to find available DHCP servers.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>2. Offer:</strong> a server proposes an available address and configuration options, commonly including mask, gateway, DNS, and lease duration. Offer delivery may be broadcast or unicast, depending on the client and network.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>3. Request:</strong> the client broadcasts DHCPREQUEST to identify the offer it selected. This also informs other servers that their offers were not chosen. The client has not completed the lease until it receives an acknowledgment.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>4. Acknowledgment:</strong> the selected server sends DHCPACK to confirm the lease and options. Delivery can be broadcast or unicast depending on client state and DHCP flags. If the request cannot be honored, a server can send DHCPNAK instead.</li>
				</ol>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Lease renewal and address conflicts</h2>
				<p className="mt-3">
					A client normally tries to renew its lease before it expires. At the renewal time
					(T1, commonly 50% of the lease), it usually unicasts DHCPREQUEST to the server
					that granted the lease. If that server does not respond, at the rebinding time (T2,
					commonly 87.5% of the lease) the client broadcasts a request so another server
					may renew it. Exact timing and behavior can vary with the lease and implementation.
					If the lease expires without renewal, the client must stop using that address.
				</p>
				<p className="mt-3">
					Some DHCP servers, including Cisco IOS implementations, can ping an address
					before offering it. A response indicates a possible conflict: the server marks the
					address as conflicted and excludes it from allocation until it is cleared or otherwise
					resolved by an administrator. A client may also perform an address check after
					receiving an offer/acknowledgment. Administrators should identify the device using
					the address and correct the scope, static assignment, or stale conflict record before
					reusing it; a ping check alone cannot detect every possible conflict.
				</p>
				<div className="mt-5 rounded-xl border border-[#f0d7a6] bg-[#fff9ed] p-5">
					<h3 className="font-bold text-[#8a5a10]">Conflict handling in practice</h3>
					<p className="mt-2 text-sm leading-6">Check the server's conflict records and the address owner before returning an address to the pool. On Cisco IOS, <code>show ip dhcp conflict</code> displays detected conflicts; after resolving the cause, an administrator can clear an individual record with <code>clear ip dhcp conflict &lt;ip-address&gt;</code>.</p>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">DHCP relay across subnets</h2>
				<p className="mt-3">
					Initial client messages are local broadcasts, and routers do not normally forward
					IPv4 broadcasts. When the DHCP server is on another subnet, configure the client-facing
					router interface as a DHCP relay using <code>ip helper-address</code>. The relay
					forwards a unicast request to the server and supplies relay information (including
					the client-facing interface address in <code>giaddr</code>) so the server can select
					the correct subnet scope. The server reply is routed back to the relay, which delivers
					it on the client subnet. Configure the helper on the first Layer 3 interface that
					receives the client's DHCP broadcast; intermediate routers route the relay's unicast
					traffic normally.
				</p>
				<TutorialDiagramFrame caption="The helper is configured on the interface that receives client broadcasts; the server's reply returns through the relay.">
					<DhcpRelayDiagram />
				</TutorialDiagramFrame>
				<pre className="mt-5 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip helper-address 10.2.2.10`}</code></pre>
				<p className="mt-3">
					Here <code>10.2.2.10</code> is the DHCP server address. Ensure routing exists in
					both directions between the relay and server, and that network policy permits DHCP
					traffic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure a Cisco IOS DHCP server</h2>
				<p className="mt-3">
					A Cisco router or supported multilayer switch can serve IPv4 leases. The pool's
					network and mask must match the client subnet; excluded addresses are configured
					in global configuration mode so DHCP does not allocate them.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[680px] border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#173b76]">
							<tr><th className="px-4 py-3 font-bold">Cisco IOS command</th><th className="px-4 py-3 font-bold">Purpose</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ecf6]">
							<tr><td className="px-4 py-3"><code>ip dhcp pool CLIENTS</code></td><td className="px-4 py-3">Create and enter a pool named CLIENTS.</td></tr>
							<tr><td className="px-4 py-3"><code>network 10.1.1.0 255.255.255.0</code></td><td className="px-4 py-3">Define the client subnet and mask for this pool.</td></tr>
							<tr><td className="px-4 py-3"><code>default-router 10.1.1.1</code></td><td className="px-4 py-3">Advertise the clients' default gateway.</td></tr>
							<tr><td className="px-4 py-3"><code>dns-server 10.1.1.1</code></td><td className="px-4 py-3">Advertise a DNS server address.</td></tr>
							<tr><td className="px-4 py-3"><code>domain-name 9tut.com</code></td><td className="px-4 py-3">Advertise the client's domain name.</td></tr>
							<tr><td className="px-4 py-3"><code>lease 0 12</code></td><td className="px-4 py-3">Set a lease duration of 0 days and 12 hours.</td></tr>
							<tr><td className="px-4 py-3"><code>ip dhcp excluded-address 10.1.1.1 10.1.1.10</code></td><td className="px-4 py-3">In global configuration mode, reserve this range from DHCP allocation.</td></tr>
						</tbody>
					</table>
				</div>
				<pre className="mt-5 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# ip dhcp excluded-address 10.1.1.1 10.1.1.10
Router(config)# ip dhcp pool CLIENTS
Router(dhcp-config)# network 10.1.1.0 255.255.255.0
Router(dhcp-config)# default-router 10.1.1.1
Router(dhcp-config)# dns-server 10.1.1.1
Router(dhcp-config)# domain-name 9tut.com
Router(dhcp-config)# lease 0 12
Router(dhcp-config)# end
Router# show ip dhcp pool
Router# show ip dhcp binding`}</code></pre>
				<p className="mt-3">
					The excluded range should cover the router interface and any statically addressed
					hosts. Confirm that the router interface for the pool is up and has an address in
					the pool's subnet. The example uses the same gateway and DNS address for simplicity;
					in production, advertise the DNS resolver actually used by the network.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>DORA is DHCPDISCOVER, DHCPOFFER, DHCPREQUEST, and DHCPACK.</li>
					<li>DHCP leases addresses and can provide a subnet mask, gateway, DNS servers, and other options.</li>
					<li>Clients renew before lease expiry; an expired lease cannot continue to be used.</li>
					<li>Use <code>ip helper-address</code> on the client-facing routed interface when the DHCP server is on another subnet.</li>
					<li>Configure DHCP pools with the correct network and options, exclude reserved addresses, and verify leases with <code>show ip dhcp binding</code>.</li>
					<li>Investigate DHCP conflict records before making a conflicted address available again.</li>
				</ul>
			</section>
		</div>
	);
}

function SnmpArchitectureDiagram() {
	return (
		<svg viewBox="0 0 1000 510" role="img" aria-labelledby="snmp-architecture-title snmp-architecture-description" className="mx-auto h-auto w-full">
			<title id="snmp-architecture-title">SNMP manager communicates with device agents using MIB objects</title>
			<desc id="snmp-architecture-description">A network management system on an administrator workstation queries router, switch, and server SNMP agents for MIB objects and can set permitted values. Each agent sends responses to the manager and can send event notifications to its notification receiver.</desc>
			<defs>
				<linearGradient id="snmp-architecture-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="snmp-architecture-query-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="snmp-architecture-notify-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="494" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#snmp-architecture-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">SNMP · Manager, Agents, and Managed Objects</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">The manager and each agent use object identifiers (OIDs) to refer to structured management data.</text>

			<rect x="49" y="145" width="250" height="272" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="174" y="176" fill="#2853a0" fontSize="14" fontWeight="700" textAnchor="middle">NETWORK MANAGEMENT SYSTEM</text>
			<rect x="102" y="197" width="144" height="95" rx="13" fill="#fff" stroke="#7da6dd" strokeWidth="2" />
			<rect x="116" y="211" width="116" height="60" rx="5" fill="#dceaff" />
			<path d="M151 293v13m44-13v13m-62 0h80" fill="none" stroke="#4980cb" strokeWidth="4" strokeLinecap="round" />
			<path d="M133 252l16-17 16 10 18-21 18 13 18-17" fill="none" stroke="#2872dc" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
			<text x="174" y="333" fill="#183d73" fontSize="13" fontWeight="700" textAnchor="middle">SNMP manager / NMS</text>
			<text x="174" y="355" fill="#526584" fontSize="11" textAnchor="middle">polls, receives responses, raises alerts</text>
			<rect x="78" y="374" width="192" height="26" rx="13" fill="#fff" stroke="#b9d2f3" />
			<text x="174" y="392" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">Requests: UDP 161 · notifications: 162</text>

			<rect x="693" y="129" width="261" height="300" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="823" y="160" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">MANAGED DEVICES · SNMP AGENTS</text>
			<rect x="718" y="178" width="211" height="58" rx="12" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<circle cx="746" cy="207" r="17" fill="#eaf2ff" />
			<path d="M737 207h18m-14-5h10m-10 10h10" stroke="#2872dc" strokeWidth="2" strokeLinecap="round" />
			<text x="835" y="203" fill="#176847" fontSize="11" fontWeight="700" textAnchor="middle">Router agent</text>
			<text x="835" y="220" fill="#526584" fontSize="10" textAnchor="middle">interfaces · traffic · status</text>
			<rect x="718" y="249" width="211" height="58" rx="12" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<circle cx="746" cy="278" r="17" fill="#eaf2ff" />
			<path d="M737 273h18v11h-18zm4-4v4m10-4v4" fill="none" stroke="#2872dc" strokeWidth="2" />
			<text x="835" y="274" fill="#176847" fontSize="11" fontWeight="700" textAnchor="middle">Switch agent</text>
			<text x="835" y="291" fill="#526584" fontSize="10" textAnchor="middle">ports · errors · link state</text>
			<rect x="718" y="320" width="211" height="58" rx="12" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<rect x="732" y="333" width="28" height="31" rx="4" fill="#ddf4e9" stroke="#18865d" strokeWidth="2" />
			<path d="M737 341h18m-18 6h18m-18 6h12" stroke="#18865d" strokeWidth="2" />
			<text x="835" y="345" fill="#176847" fontSize="11" fontWeight="700" textAnchor="middle">Server agent</text>
			<text x="835" y="362" fill="#526584" fontSize="10" textAnchor="middle">resources · services · health</text>
			<text x="823" y="404" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Each agent exposes supported MIB objects</text>

			<path d="M300 207H684" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#snmp-architecture-query-arrow)" />
			<rect x="397" y="180" width="196" height="24" rx="12" fill="#fff" />
			<text x="495" y="197" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">GET / GETNEXT / GETBULK · UDP 161</text>
			<path d="M684 252H300" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#snmp-architecture-query-arrow)" />
			<rect x="403" y="226" width="184" height="24" rx="12" fill="#fff" />
			<text x="495" y="243" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">RESPONSE · data or error status</text>
			<path d="M300 319H684" fill="none" stroke="#7042b4" strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#snmp-architecture-query-arrow)" />
			<rect x="407" y="293" width="176" height="23" rx="11" fill="#fff" />
			<text x="495" y="309" fill="#7042b4" fontSize="10" fontWeight="700" textAnchor="middle">SET · permitted writable objects</text>
			<path d="M684 374H300" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#snmp-architecture-notify-arrow)" />
			<rect x="391" y="348" width="208" height="23" rx="11" fill="#fff" />
			<text x="495" y="364" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">TRAP / INFORM · event notification</text>

			<rect x="97" y="447" width="806" height="34" rx="15" fill="#f7faff" />
			<text x="500" y="469" fill="#526584" fontSize="11" textAnchor="middle">A MIB describes managed objects and their OIDs; it is not a single database file transferred during each query.</text>
		</svg>
	);
}

function SnmpMessageFlowDiagram() {
	return (
		<svg viewBox="0 0 1000 450" role="img" aria-labelledby="snmp-flow-title snmp-flow-description" className="mx-auto h-auto w-full">
			<title id="snmp-flow-title">SNMP polling and notifications flow between an NMS and an agent</title>
			<desc id="snmp-flow-description">The manager initiates polling by sending a GET to an agent on UDP port 161 and receives a RESPONSE. For events, an agent sends an unacknowledged TRAP to the manager's notification port, usually UDP 162, or sends an INFORM and receives a response acknowledgment.</desc>
			<defs>
				<linearGradient id="snmp-flow-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="snmp-flow-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="snmp-flow-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
				<marker id="snmp-flow-purple-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#7042b4" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="434" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v63H10z" fill="url(#snmp-flow-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">SNMP · Polling and Event Notifications</text>
			<text x="40" y="80" fill="#dcecff" fontSize="13">Polling is manager-initiated; traps and informs are agent-initiated notifications.</text>

			<rect x="54" y="126" width="230" height="76" rx="16" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="169" y="158" fill="#2853a0" fontSize="14" fontWeight="700" textAnchor="middle">SNMP MANAGER / NMS</text>
			<text x="169" y="180" fill="#526584" fontSize="10" textAnchor="middle">collects values · displays alerts</text>
			<rect x="716" y="126" width="230" height="76" rx="16" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="831" y="158" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">DEVICE SNMP AGENT</text>
			<text x="831" y="180" fill="#526584" fontSize="10" textAnchor="middle">reads MIB · detects events</text>

			<text x="500" y="135" fill="#1a3768" fontSize="12" fontWeight="700" textAnchor="middle">POLLING · manager asks for data</text>
			<path d="M287 158H709" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#snmp-flow-blue-arrow)" />
			<rect x="427" y="143" width="146" height="23" rx="11" fill="#fff" />
			<text x="500" y="159" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">GET / GETBULK · UDP 161</text>
			<path d="M713 188H291" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#snmp-flow-blue-arrow)" />
			<rect x="435" y="174" width="130" height="22" rx="11" fill="#fff" />
			<text x="500" y="190" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">RESPONSE · values</text>

			<path d="M831 204v37H169v-37" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#snmp-flow-green-arrow)" />
			<rect x="396" y="226" width="208" height="24" rx="12" fill="#fff" />
			<text x="500" y="243" fill="#13754e" fontSize="11" fontWeight="700" textAnchor="middle">TRAP · event · UDP 162 · no acknowledgment</text>

			<path d="M831 254v41H169v-41" fill="none" stroke="#7042b4" strokeWidth="3" markerEnd="url(#snmp-flow-purple-arrow)" />
			<rect x="382" y="280" width="236" height="24" rx="12" fill="#fff" />
			<text x="500" y="297" fill="#7042b4" fontSize="11" fontWeight="700" textAnchor="middle">INFORM · event · requests acknowledgment</text>
			<path d="M169 304v39h662v-39" fill="none" stroke="#7042b4" strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#snmp-flow-purple-arrow)" />
			<rect x="434" y="328" width="132" height="24" rx="12" fill="#fff" />
			<text x="500" y="345" fill="#7042b4" fontSize="10" fontWeight="700" textAnchor="middle">RESPONSE · acknowledgment</text>

			<rect x="107" y="375" width="786" height="42" rx="15" fill="#f7faff" stroke="#d5e3f5" />
			<text x="500" y="393" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">UDP is connectionless: a trap has no protocol-level acknowledgment; an inform is acknowledged and may be retried.</text>
			<text x="500" y="408" fill="#526584" fontSize="10" textAnchor="middle">The manager's response port for requests may be an ephemeral source port; notifications are commonly received on UDP 162.</text>
		</svg>
	);
}

function SnmpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What SNMP is used for</h2>
				<p className="mt-3">
					Building a working network is only part of operating it: administrators also need
					to monitor its health. Simple Network Management Protocol (SNMP) provides a common
					way for network management software to read device status and, when explicitly
					permitted, change selected settings. It can help collect interface counters, link
					state, device uptime, resource information, and event notifications from routers,
					switches, servers, and other managed equipment.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Manager, agent, and MIB</h2>
				<p className="mt-3">
					SNMP operation involves three related components: the <strong>manager</strong>
					(usually part of a Network Management System or NMS), the <strong>agent</strong>
					(SNMP software running on each managed device), and the <strong>Management
					Information Base (MIB)</strong>, which describes the managed objects and their
					Object Identifiers (OIDs). The manager issues requests; an agent answers using
					the objects it supports. MIB definitions give the manager and agent a shared
					structure and meaning for those OIDs; they are not a single database file sent
					across the network during each query.
				</p>
				<TutorialDiagramFrame caption="The NMS communicates with agents on managed devices; MIB objects describe the values available through their OIDs.">
					<SnmpArchitectureDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3">
					SNMP commonly uses UDP port <code>161</code> for manager requests and agent
					responses, and UDP port <code>162</code> for notifications received by a manager.
					A response to a manager's request returns to the source port used by that request,
					which may be an ephemeral port. Firewall rules and device access controls must
					allow only the intended management systems to communicate.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">SNMP versions and security</h2>
				<div className="mt-4 grid gap-4">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">SNMPv1</h3>
						<p className="mt-2 text-sm leading-6">The original version, retained mainly for legacy compatibility. Its security model is limited, so it should not be selected for new deployments.</p>
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">SNMPv2c</h3>
						<p className="mt-2 text-sm leading-6">Adds operations such as GETBULK and INFORM, but uses community strings as shared credentials. Community strings are transmitted without encryption; read-only access is safer than read-write, but neither provides confidentiality.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">SNMPv3</h3>
						<p className="mt-2 text-sm leading-6">Provides user-based security and message processing. Its security levels are noAuthNoPriv, authNoPriv, and authPriv. Authentication provides message integrity and source authentication; privacy encrypts SNMP message contents. Prefer authPriv with currently supported strong algorithms, such as SHA-based authentication and AES privacy where available. Avoid legacy MD5/DES choices when stronger options are supported.</p>
					</div>
				</div>
				<p className="mt-4">
					SNMPv3 does not introduce a separate set of basic management operations in the
					way that v2c added GETBULK and INFORM; it provides a stronger security and message
					framework for management PDUs. For every version, restrict which OIDs and actions
					a management identity can access, and permit management traffic only from trusted
					NMS addresses.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">SNMP messages: polling and notifications</h2>
				<p className="mt-3">
					The manager normally polls an agent for current values. GET requests a specified
					object; GETNEXT retrieves the next lexicographic object and is useful for walking
					an OID tree. GETBULK (available from SNMPv2) efficiently retrieves multiple
					objects or table rows in fewer exchanges. SET asks an agent to change a writable
					object, subject to its access policy. The agent returns a RESPONSE PDU with
					requested values or an error status.
				</p>
				<TutorialDiagramFrame caption="Polling starts at the manager; event notifications start at the agent. An INFORM is acknowledged, unlike a TRAP.">
					<SnmpMessageFlowDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3">
					A <strong>TRAP</strong> is an agent-initiated event notification and does not request
					a protocol-level acknowledgment. Because SNMP commonly uses UDP, the sender cannot
					know from a trap exchange whether the notification reached the manager. An
					<strong> INFORM</strong> (SNMPv2 and later) asks the receiver to return a RESPONSE;
					if no response arrives, the sender can retry. An inform is therefore acknowledged
					at the SNMP protocol level, although it is not an absolute guarantee of delivery.
				</p>
				<p className="mt-3">
					Polling gives the NMS a view of values at the time of each query, at the cost of
					repeated requests. Notifications can report events promptly without waiting for
					the next poll, but a trap can be lost. Many monitoring designs use both.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Cisco IOS SNMP configuration</h2>
				<p className="mt-3">
					The following SNMPv2c example configures read-only polling, limits it to a
					management-station ACL, and sends enabled notifications to an NMS. Replace the
					example addresses and community strings with managed values; never reuse these
					examples as production credentials.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 10 permit 10.10.10.12
Router(config)# snmp-server community MONITOR-RO ro 10
Router(config)# snmp-server host 10.10.10.12 version 2c TRAP-COMMUNITY
Router(config)# snmp-server enable traps
Router(config)# end
Router# show snmp
Router# show snmp host`}</code></pre>
				<p className="mt-3">
					The community used for queries and the community specified for the notification
					receiver serve distinct configuration purposes and must match the NMS setup.
					Enabling all supported traps may produce unnecessary events; on platforms that
					support it, enable only required notification categories, for example link state
					notifications. SNMPv2c offers no encryption, so prefer SNMPv3 for sensitive or
					untrusted management networks.
				</p>
				<h3 className="mt-6 font-bold text-[#071126]">Prefer SNMPv3 with authentication and privacy</h3>
				<p className="mt-2">
					A typical IOS pattern creates a v3 group at the privacy level, associates a user
					with authentication and AES privacy, and configures the NMS as a notification
					receiver. Exact syntax and supported algorithms can vary by IOS release; use
					platform-supported algorithms and securely provision unique passphrases.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# snmp-server group NMS-GROUP v3 priv
Router(config)# snmp-server user NMS-USER NMS-GROUP v3 auth sha AUTH-PASSPHRASE priv aes 128 PRIV-PASSPHRASE
Router(config)# snmp-server host 10.10.10.12 version 3 priv NMS-USER
Router(config)# snmp-server enable traps`}</code></pre>
				<p className="mt-3">
					These are configuration examples, not ready-to-paste secrets. Use access control
					views and source restrictions appropriate to the IOS platform, protect credentials,
					and verify the configured user, group, and notification destination from both the
					device and the NMS.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>The manager queries agents; agents expose supported MIB objects identified by OIDs.</li>
					<li>SNMP request/response traffic commonly uses UDP 161; managers commonly receive notifications on UDP 162.</li>
					<li>GET, GETNEXT, and GETBULK retrieve values; SET changes only permitted writable objects; RESPONSE carries results or errors.</li>
					<li>TRAP is not acknowledged; INFORM requests a response and can be retried.</li>
					<li>SNMPv1 is legacy, SNMPv2c community strings are clear text, and SNMPv3 authPriv can provide authentication and encryption.</li>
					<li>Restrict SNMP access to trusted management systems and least-privilege views; prefer SNMPv3 for secure deployments.</li>
				</ul>
			</section>
		</div>
	);
}

function SyslogCollectionDiagram() {
	return (
		<svg viewBox="0 0 1000 500" role="img" aria-labelledby="syslog-collection-title syslog-collection-description" className="mx-auto h-auto w-full">
			<title id="syslog-collection-title">Network devices send syslog messages to a centralized server</title>
			<desc id="syslog-collection-description">A router, switch, and server generate event messages. They can retain logs locally or send them over the management network, commonly over UDP port 514, to a centralized syslog server for storage, search, and alerting.</desc>
			<defs>
				<linearGradient id="syslog-collection-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="syslog-collection-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="484" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#syslog-collection-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">Syslog · Events from Devices to a Central Log Server</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">Local logs support quick inspection; centralized logs preserve and correlate events across devices.</text>

			<rect x="48" y="131" width="278" height="294" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="187" y="162" fill="#2853a0" fontSize="14" fontWeight="700" textAnchor="middle">NETWORK DEVICES · SYSLOG SOURCES</text>
			<rect x="75" y="179" width="224" height="57" rx="12" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<circle cx="105" cy="207" r="17" fill="#eaf2ff" />
			<path d="M96 207h18m-14-5h10m-10 10h10" stroke="#2872dc" strokeWidth="2" strokeLinecap="round" />
			<text x="206" y="203" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">Router · interface events</text>
			<text x="206" y="220" fill="#526584" fontSize="10" textAnchor="middle">facility LINEPROTO · severity 5</text>
			<rect x="75" y="249" width="224" height="57" rx="12" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<circle cx="105" cy="277" r="17" fill="#eaf2ff" />
			<path d="M96 272h18v11H96zm4-4v4m10-4v4" fill="none" stroke="#2872dc" strokeWidth="2" />
			<text x="206" y="273" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">Switch · port and system events</text>
			<text x="206" y="290" fill="#526584" fontSize="10" textAnchor="middle">link changes · configuration</text>
			<rect x="75" y="319" width="224" height="57" rx="12" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<rect x="91" y="331" width="28" height="32" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M96 339h18m-18 6h18m-18 6h12" stroke="#4980cb" strokeWidth="2" />
			<text x="206" y="343" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">Server · service events</text>
			<text x="206" y="360" fill="#526584" fontSize="10" textAnchor="middle">application · resource · security</text>
			<text x="187" y="400" fill="#526584" fontSize="10" textAnchor="middle">May also keep a local buffer or console log</text>

			<rect x="708" y="131" width="244" height="294" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="830" y="162" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">CENTRALIZED LOGGING</text>
			<rect x="760" y="185" width="140" height="112" rx="13" fill="#fff" stroke="#72bd94" strokeWidth="2" />
			<rect x="779" y="200" width="102" height="57" rx="5" fill="#ddf4e9" />
			<path d="M789 213h81m-81 12h65m-65 12h74m-74 12h50" stroke="#18865d" strokeWidth="3" strokeLinecap="round" />
			<path d="M812 298v13m37-13v13m-53 0h69" fill="none" stroke="#18865d" strokeWidth="4" strokeLinecap="round" />
			<text x="830" y="339" fill="#176847" fontSize="13" fontWeight="700" textAnchor="middle">Syslog server</text>
			<text x="830" y="361" fill="#526584" fontSize="10" textAnchor="middle">UDP destination port 514 (common)</text>
			<rect x="735" y="380" width="190" height="27" rx="13" fill="#fff" stroke="#a4d6bc" />
			<text x="830" y="398" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">store · search · correlate · alert</text>

			<path d="M331 207C440 207 568 203 700 220" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#syslog-collection-arrow)" />
			<path d="M331 277C452 277 568 265 700 260" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#syslog-collection-arrow)" />
			<path d="M331 347C452 347 574 322 700 300" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#syslog-collection-arrow)" />
			<rect x="392" y="147" width="250" height="28" rx="14" fill="#fff" />
			<text x="517" y="166" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">timestamped event messages · severity threshold</text>
			<rect x="368" y="386" width="300" height="32" rx="15" fill="#f7faff" />
			<text x="518" y="407" fill="#526584" fontSize="10" textAnchor="middle">Use synchronized clocks and source identity to correlate events.</text>
		</svg>
	);
}

function SyslogMessageDiagram() {
	const levels = [
		{ number: 0, name: "Emergency", fill: "#fee2e2", color: "#a32626" },
		{ number: 1, name: "Alert", fill: "#ffedd5", color: "#a44b13" },
		{ number: 2, name: "Critical", fill: "#fff4df", color: "#96600c" },
		{ number: 3, name: "Error", fill: "#fff8e8", color: "#8a6712" },
		{ number: 4, name: "Warning", fill: "#fefce8", color: "#74620d" },
		{ number: 5, name: "Notification", fill: "#eaf2ff", color: "#2853a0" },
		{ number: 6, name: "Informational", fill: "#eef5ff", color: "#2853a0" },
		{ number: 7, name: "Debugging", fill: "#f4efff", color: "#7042b4" },
	];
	return (
		<svg viewBox="0 0 1000 570" role="img" aria-labelledby="syslog-message-title syslog-message-description" className="mx-auto h-auto w-full">
			<title id="syslog-message-title">Syslog message fields and severity scale</title>
			<desc id="syslog-message-description">A sample Cisco syslog message is separated into optional sequence number and timestamp, facility, severity, mnemonic, and message text. Eight severity levels run from 0 emergencies, most severe, to 7 debugging, least severe. A configured threshold sends messages at that level and more severe levels.</desc>
			<defs>
				<linearGradient id="syslog-message-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
			</defs>
			<rect x="8" y="8" width="984" height="554" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#syslog-message-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">Syslog · Message Structure and Severity</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">Severity 0 is most urgent; severity 7 is least urgent.</text>

			<rect x="48" y="120" width="904" height="93" rx="17" fill="#f7faff" stroke="#cfe0f5" strokeWidth="2" />
			<text x="75" y="152" fill="#526584" fontSize="11" fontWeight="700">EXAMPLE MESSAGE</text>
			<text x="75" y="184" fill="#1a3768" fontSize="18" fontFamily="monospace">39345: May 22 13:56:35.811: %LINEPROTO-5-UPDOWN: Line protocol ... down</text>

			<rect x="53" y="229" width="142" height="46" rx="12" fill="#eaf2ff" stroke="#b9d2f3" />
			<text x="124" y="249" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">Sequence number</text>
			<text x="124" y="265" fill="#526584" fontSize="9" textAnchor="middle">optional · configured</text>
			<rect x="205" y="229" width="181" height="46" rx="12" fill="#eaf2ff" stroke="#b9d2f3" />
			<text x="295" y="249" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">Timestamp</text>
			<text x="295" y="265" fill="#526584" fontSize="9" textAnchor="middle">optional · configured</text>
			<rect x="396" y="229" width="146" height="46" rx="12" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="469" y="249" fill="#13754e" fontSize="11" fontWeight="700" textAnchor="middle">Facility</text>
			<text x="469" y="265" fill="#526584" fontSize="9" textAnchor="middle">LINEPROTO</text>
			<rect x="552" y="229" width="118" height="46" rx="12" fill="#fff4df" stroke="#e8c98d" />
			<text x="611" y="249" fill="#96600c" fontSize="11" fontWeight="700" textAnchor="middle">Severity</text>
			<text x="611" y="265" fill="#526584" fontSize="9" textAnchor="middle">5 · notification</text>
			<rect x="680" y="229" width="126" height="46" rx="12" fill="#f4efff" stroke="#d3c3ef" />
			<text x="743" y="249" fill="#7042b4" fontSize="11" fontWeight="700" textAnchor="middle">Mnemonic</text>
			<text x="743" y="265" fill="#526584" fontSize="9" textAnchor="middle">UPDOWN</text>
			<rect x="816" y="229" width="130" height="46" rx="12" fill="#eef5ff" stroke="#b9d2f3" />
			<text x="881" y="249" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">Message text</text>
			<text x="881" y="265" fill="#526584" fontSize="9" textAnchor="middle">event description</text>

			<text x="500" y="315" fill="#1a3768" fontSize="14" fontWeight="700" textAnchor="middle">SEVERITY SCALE · 0 MOST SEVERE → 7 LEAST SEVERE</text>
			{levels.map((level, index) => (
				<g key={level.number}>
					<rect x="74" y={330 + index * 25} width="852" height="21" rx="9" fill={level.fill} />
					<circle cx="96" cy={340 + index * 25} r="9" fill={level.color} />
					<text x="96" y={344 + index * 25} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">{level.number}</text>
					<text x="119" y={345 + index * 25} fill={level.color} fontSize="11" fontWeight="700">{level.name}</text>
					<text x="900" y={345 + index * 25} fill="#526584" fontSize="9" textAnchor="end">{index === 0 ? "most urgent" : index === 7 ? "least urgent" : ""}</text>
				</g>
			))}
			<rect x="123" y="540" width="754" height="1" fill="#d5e3f5" />
			<text x="500" y="552" fill="#526584" fontSize="10" textAnchor="middle">A threshold of 4 includes levels 0–4; the facility identifies the generating subsystem, not severity.</text>
		</svg>
	);
}

function SyslogLessonContent() {
	const destinations = [
		{ destination: "Internal buffer", command: "logging buffered [size]", detail: "Stores recent messages in device memory; contents are lost on reload." },
		{ destination: "Syslog server", command: "logging host <server-ip>", detail: "Central collection; commonly sent using UDP destination port 514." },
		{ destination: "Flash file", command: "logging file flash:<filename>", detail: "Persistent local storage where supported by the platform and file system." },
		{ destination: "VTY terminal", command: "terminal monitor", detail: "Displays eligible log messages in the current remote terminal session." },
		{ destination: "Console line", command: "logging console [severity]", detail: "Displays eligible messages on the local console; severity can be set." },
	];
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why use Syslog?</h2>
				<p className="mt-3">
					After a network is configured and running, administrators still need to know
					when links change, errors occur, or a device reports another important event.
					Syslog provides a standard message format and a way for network devices and
					software to record operational events. Sending messages to a central server
					makes it easier to search, retain, alert on, and correlate events from many
					routers, switches, and servers.
				</p>
				<TutorialDiagramFrame caption="Devices can keep local logs and also forward selected messages to a central syslog server for retention and correlation.">
					<SyslogCollectionDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Where Syslog messages can be sent</h2>
				<p className="mt-3">
					Cisco IOS can direct messages to several destinations. Available commands and
					persistence behavior can vary by platform and software release. Remote syslog
					commonly uses UDP destination port <code>514</code>; UDP does not guarantee
					delivery, so use reliable transport options where supported and required.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[720px] border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#173b76]">
							<tr><th className="px-4 py-3 font-bold">Destination</th><th className="px-4 py-3 font-bold">Example command</th><th className="px-4 py-3 font-bold">Use</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ecf6]">
							{destinations.map((item) => (
								<tr key={item.destination}>
									<td className="px-4 py-3 font-semibold">{item.destination}</td>
									<td className="px-4 py-3"><code>{item.command}</code></td>
									<td className="px-4 py-3">{item.detail}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					By default, IOS commonly sends log messages to the console. For ongoing operations,
					a remote server is useful because it centralizes messages and can retain them after
					a device restarts. A local buffer is useful for quick troubleshooting but is
					typically volatile.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Syslog message format</h2>
				<p className="mt-3">
					A Cisco IOS message commonly contains an optional sequence number and timestamp,
					followed by a percent sign and the facility, severity, and mnemonic:
					<code> %FACILITY-SEVERITY-MNEMONIC: message text</code>. The exact prefix depends
					on the device and configured logging options.
				</p>
				<TutorialDiagramFrame caption="The facility names the originating subsystem; the severity digit ranks importance; the mnemonic and text describe the event.">
					<SyslogMessageDiagram />
				</TutorialDiagramFrame>
				<ul className="mt-5 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Sequence number:</strong> a sequence value appears when sequence numbering is configured with <code>service sequence-numbers</code>.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Timestamp:</strong> date and time can be added with <code>service timestamps log datetime msec</code>. A reliable clock, often synchronized with NTP, helps correlate messages across devices.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Facility:</strong> identifies the subsystem that generated the event, for example <code>LINEPROTO</code>, <code>LINK</code>, or <code>SYS</code>. It is not the severity and does not itself mean kernel, mail, or another RFC 3164 facility.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Severity:</strong> an integer from 0 (most urgent) through 7 (least urgent).</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Mnemonic and message text:</strong> a short event code and human-readable description, such as <code>UPDOWN</code> and “Line protocol ... changed state to down.”</li>
				</ul>
				<pre className="mt-5 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`39345: May 22 13:56:35.811: %LINEPROTO-5-UPDOWN: Line protocol on Interface Serial0/0/1, changed state to down`}</code></pre>
				<p className="mt-3">
					In this example, <code>39345</code> is the sequence number, the date and time
					are the timestamp, <code>LINEPROTO</code> is the facility, <code>5</code> is the
					notification severity, and <code>UPDOWN</code> is the mnemonic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Syslog severity levels</h2>
				<p className="mt-3">
					Levels run from 0 to 7, with 0 the most severe. A configured threshold includes
					messages at that level and more severe levels (lower numbers). For example,
					threshold 4 sends levels 0 through 4 and excludes 5 through 7. The exact default
					threshold can depend on the destination and platform; explicitly configure it
					rather than relying on an assumed default.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[520px] border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#173b76]">
							<tr><th className="px-4 py-3 font-bold">Level</th><th className="px-4 py-3 font-bold">Keyword</th><th className="px-4 py-3 font-bold">Meaning</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ecf6]">
							<tr><td className="px-4 py-3">0</td><td className="px-4 py-3 font-semibold text-[#a32626]">emergencies</td><td className="px-4 py-3">System is unusable.</td></tr>
							<tr><td className="px-4 py-3">1</td><td className="px-4 py-3 font-semibold text-[#a44b13]">alerts</td><td className="px-4 py-3">Immediate action is needed.</td></tr>
							<tr><td className="px-4 py-3">2</td><td className="px-4 py-3 font-semibold text-[#96600c]">critical</td><td className="px-4 py-3">Critical conditions exist.</td></tr>
							<tr><td className="px-4 py-3">3</td><td className="px-4 py-3 font-semibold text-[#8a6712]">errors</td><td className="px-4 py-3">Error conditions exist.</td></tr>
							<tr><td className="px-4 py-3">4</td><td className="px-4 py-3 font-semibold text-[#74620d]">warnings</td><td className="px-4 py-3">Warning conditions exist.</td></tr>
							<tr><td className="px-4 py-3">5</td><td className="px-4 py-3 font-semibold text-[#2853a0]">notifications</td><td className="px-4 py-3">Normal but significant conditions.</td></tr>
							<tr><td className="px-4 py-3">6</td><td className="px-4 py-3 font-semibold text-[#2853a0]">informational</td><td className="px-4 py-3">Informational messages.</td></tr>
							<tr><td className="px-4 py-3">7</td><td className="px-4 py-3 font-semibold text-[#7042b4]">debugging</td><td className="px-4 py-3">Debugging messages.</td></tr>
						</tbody>
					</table>
				</div>
				<div className="mt-5 rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
					<h3 className="font-bold text-[#1756a4]">Facility is different from severity</h3>
					<p className="mt-2 text-sm leading-6">Severity says how urgent the event is. Facility says which subsystem produced it. In Cisco IOS messages, examples include <code>SYS</code>, <code>IF</code>, <code>LINK</code>, and <code>LINEPROTO</code>. The facility names available and their meanings depend on the device's logging implementation.</p>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Cisco IOS Syslog configuration</h2>
				<p className="mt-3">
					This example sends messages with severity 4 or higher urgency (levels 0–4) to
					the syslog server at <code>10.10.10.150</code>. Configure the destination and
					threshold on the device, and configure the server software to receive messages
					from the device.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# service timestamps log datetime msec
Router(config)# service sequence-numbers
Router(config)# logging host 10.10.10.150
Router(config)# logging trap 4
Router(config)# logging buffered 16384 informational
Router(config)# end
Router# show logging`}</code></pre>
				<p className="mt-3">
					For messages in a remote VTY session, use <code>terminal monitor</code>; configure
					console or monitor thresholds with the appropriate <code>logging console</code> or
					<code> logging monitor</code> commands. Choose thresholds based on operational
					needs: level 7 debugging can be high-volume, while a more restrictive threshold
					may omit useful context. Verify the server address, routing, firewall policy,
					time synchronization, and device logging status when messages do not arrive.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>Syslog centralizes event messages for retention, searching, alerting, and cross-device correlation.</li>
					<li>A Cisco message can include sequence number and timestamp, followed by facility, severity, mnemonic, and event text.</li>
					<li>Facility identifies the source subsystem; severity ranks urgency from 0 (highest) to 7 (lowest).</li>
					<li>A severity threshold includes that level and all more severe levels with lower numbers.</li>
					<li>Remote syslog commonly uses UDP port 514; allow for its lack of delivery acknowledgment.</li>
					<li>Use a central server for durable shared logs, synchronized device clocks for correlation, and <code>show logging</code> to verify configuration and status.</li>
				</ul>
			</section>
		</div>
	);
}

function QosPipelineDiagram() {
	return (
		<svg viewBox="0 0 1000 520" role="img" aria-labelledby="qos-pipeline-title qos-pipeline-description" className="mx-auto h-auto w-full">
			<title id="qos-pipeline-title">QoS packet classification, marking, queuing, and per-hop forwarding</title>
			<desc id="qos-pipeline-description">Packets enter a network device where classification identifies traffic classes and marking sets DSCP. During congestion, queues and a scheduler determine forwarding treatment; packets are then transmitted on the egress link. Each router applies its own configured per-hop behavior.</desc>
			<defs>
				<linearGradient id="qos-pipeline-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="qos-pipeline-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="504" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#qos-pipeline-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">QoS · Classification to Per-Hop Forwarding</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">QoS assigns treatment to traffic classes; each network hop applies its own forwarding policy.</text>

			<rect x="43" y="180" width="142" height="136" rx="18" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="114" y="211" fill="#2853a0" fontSize="12" fontWeight="700" textAnchor="middle">INGRESS</text>
			<rect x="72" y="228" width="84" height="46" rx="8" fill="#fff" stroke="#7da6dd" strokeWidth="2" />
			<path d="M83 240h62m-62 10h48m-48 10h56" stroke="#4980cb" strokeWidth="3" strokeLinecap="round" />
			<text x="114" y="297" fill="#526584" fontSize="10" textAnchor="middle">packet arrives</text>

			<rect x="222" y="147" width="188" height="202" rx="18" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<circle cx="316" cy="195" r="25" fill="#2868bd" />
			<path d="M304 195h24m-19-7h14m-14 14h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
			<text x="316" y="239" fill="#2853a0" fontSize="12" fontWeight="700" textAnchor="middle">CLASSIFY</text>
			<text x="316" y="261" fill="#526584" fontSize="10" textAnchor="middle">ACL · address · protocol</text>
			<text x="316" y="278" fill="#526584" fontSize="10" textAnchor="middle">port · application · policy</text>
			<text x="316" y="319" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">identify traffic class</text>

			<rect x="449" y="147" width="170" height="202" rx="18" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<circle cx="534" cy="195" r="25" fill="#18865d" />
			<path d="M523 195h22m-11-11v22m-8-19 16 16m0-16-16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
			<text x="534" y="239" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">MARK</text>
			<text x="534" y="261" fill="#526584" fontSize="10" textAnchor="middle">set IP DSCP / precedence</text>
			<text x="534" y="278" fill="#526584" fontSize="10" textAnchor="middle">or Layer 2 CoS</text>
			<rect x="485" y="302" width="98" height="25" rx="12" fill="#fff" stroke="#a4d6bc" />
			<text x="534" y="319" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">DSCP: AF21</text>

			<rect x="658" y="147" width="194" height="202" rx="18" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<text x="755" y="180" fill="#9a640e" fontSize="12" fontWeight="700" textAnchor="middle">EGRESS QUEUES</text>
			<rect x="687" y="197" width="138" height="28" rx="7" fill="#fff" stroke="#e8c98d" />
			<rect x="693" y="203" width="30" height="16" rx="4" fill="#bf791c" />
			<rect x="729" y="203" width="30" height="16" rx="4" fill="#e3b657" />
			<text x="791" y="216" fill="#7c5712" fontSize="9" textAnchor="middle">priority</text>
			<rect x="687" y="235" width="138" height="28" rx="7" fill="#fff" stroke="#e8c98d" />
			<rect x="693" y="241" width="30" height="16" rx="4" fill="#e3b657" />
			<rect x="729" y="241" width="30" height="16" rx="4" fill="#f0d89e" />
			<text x="791" y="254" fill="#7c5712" fontSize="9" textAnchor="middle">assured</text>
			<rect x="687" y="273" width="138" height="28" rx="7" fill="#fff" stroke="#e8c98d" />
			<rect x="693" y="279" width="30" height="16" rx="4" fill="#dceaff" />
			<rect x="729" y="279" width="30" height="16" rx="4" fill="#a9c7ef" />
			<text x="791" y="292" fill="#2853a0" fontSize="9" textAnchor="middle">best effort</text>
			<text x="755" y="327" fill="#526584" fontSize="10" textAnchor="middle">scheduler selects packets</text>

			<rect x="891" y="180" width="72" height="136" rx="18" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="927" y="211" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">EGRESS</text>
			<path d="M906 240h39m-39 12h39m-39 12h39m-39 12h39" stroke="#4980cb" strokeWidth="3" strokeLinecap="round" />
			<text x="927" y="297" fill="#526584" fontSize="9" textAnchor="middle">transmit</text>

			<path d="M186 248h30" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-pipeline-arrow)" />
			<path d="M411 248h32" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-pipeline-arrow)" />
			<path d="M620 248h32" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-pipeline-arrow)" />
			<path d="M853 248h32" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-pipeline-arrow)" />

			<rect x="87" y="392" width="826" height="69" rx="17" fill="#f7faff" stroke="#d5e3f5" />
			<text x="500" y="419" fill="#1a3768" fontSize="13" fontWeight="700" textAnchor="middle">CONGESTION IS WHEN QUEUING AND SCHEDULING MATTER MOST</text>
			<text x="500" y="442" fill="#526584" fontSize="11" textAnchor="middle">Per-hop behavior describes forwarding treatment at this node; end-to-end QoS requires compatible policies along the path.</text>
		</svg>
	);
}

function QosPolicingShapingDiagram() {
	return (
		<svg viewBox="0 0 1000 510" role="img" aria-labelledby="qos-rate-title qos-rate-description" className="mx-auto h-auto w-full">
			<title id="qos-rate-title">Traffic policing drops or remarks excess traffic while shaping buffers and delays it</title>
			<desc id="qos-rate-description">Two traffic control paths receive bursts above a configured rate. A policer measures the rate and drops or remarks packets that exceed its configured action. A shaper buffers excess packets and releases them later at the configured rate, adding delay and requiring buffer space.</desc>
			<defs>
				<linearGradient id="qos-rate-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="qos-rate-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="qos-rate-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="494" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#qos-rate-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">QoS · Policing and Shaping Excess Traffic</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">Both enforce a traffic profile, but their treatment of excess traffic is different.</text>

			<rect x="42" y="124" width="440" height="334" rx="19" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="262" y="156" fill="#2853a0" fontSize="15" fontWeight="700" textAnchor="middle">POLICING · MEASURE AND ENFORCE</text>
			<text x="262" y="179" fill="#526584" fontSize="10" textAnchor="middle">Excess packets can be dropped or remarked, according to policy.</text>
			<rect x="66" y="215" width="97" height="76" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="114" y="246" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">BURSTY</text>
			<text x="114" y="265" fill="#526584" fontSize="10" textAnchor="middle">input traffic</text>
			<path d="M164 253h44" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-rate-blue-arrow)" />
			<rect x="214" y="210" width="105" height="86" rx="15" fill="#fff4df" stroke="#e8c98d" strokeWidth="2" />
			<circle cx="266" cy="244" r="21" fill="#bf791c" />
			<path d="M254 244h24m-12-12v24" stroke="#fff" strokeWidth="2" />
			<text x="266" y="281" fill="#9a640e" fontSize="10" fontWeight="700" textAnchor="middle">POLICER</text>
			<path d="M320 242h42" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-rate-blue-arrow)" />
			<rect x="367" y="207" width="91" height="50" rx="10" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="412" y="228" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">CONFORM</text>
			<text x="412" y="245" fill="#526584" fontSize="9" textAnchor="middle">forward normally</text>
			<path d="M266 297v48h100" fill="none" stroke="#bf791c" strokeWidth="2.5" markerEnd="url(#qos-rate-blue-arrow)" />
			<rect x="367" y="321" width="91" height="54" rx="10" fill="#fff0e8" stroke="#edbd9b" />
			<text x="412" y="342" fill="#a44b13" fontSize="10" fontWeight="700" textAnchor="middle">EXCEED</text>
			<text x="412" y="359" fill="#526584" fontSize="9" textAnchor="middle">drop / remark</text>
			<path d="M411 377v24" stroke="#a44b13" strokeWidth="2.5" markerEnd="url(#qos-rate-blue-arrow)" />
			<path d="M393 407l36 29m0-29-36 29" stroke="#a44b13" strokeWidth="3" strokeLinecap="round" />
			<text x="266" y="436" fill="#526584" fontSize="10" textAnchor="middle">Does not hold excess packets for later transmission</text>

			<rect x="518" y="124" width="440" height="334" rx="19" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="738" y="156" fill="#13754e" fontSize="15" fontWeight="700" textAnchor="middle">SHAPING · BUFFER AND SMOOTH</text>
			<text x="738" y="179" fill="#526584" fontSize="10" textAnchor="middle">Excess packets wait in a queue, then leave at a controlled rate.</text>
			<rect x="542" y="215" width="97" height="76" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="590" y="246" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">BURSTY</text>
			<text x="590" y="265" fill="#526584" fontSize="10" textAnchor="middle">input traffic</text>
			<path d="M640 253h41" stroke="#2872dc" strokeWidth="3" markerEnd="url(#qos-rate-blue-arrow)" />
			<rect x="688" y="211" width="103" height="88" rx="14" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<rect x="703" y="226" width="73" height="14" rx="5" fill="#dceaff" stroke="#7da6dd" />
			<rect x="703" y="246" width="73" height="14" rx="5" fill="#dceaff" stroke="#7da6dd" />
			<rect x="703" y="266" width="73" height="14" rx="5" fill="#dceaff" stroke="#7da6dd" />
			<text x="739" y="294" fill="#2853a0" fontSize="9" fontWeight="700" textAnchor="middle">BUFFER QUEUE</text>
			<path d="M792 253h43" stroke="#18a36a" strokeWidth="3" markerEnd="url(#qos-rate-green-arrow)" />
			<rect x="841" y="215" width="91" height="76" rx="12" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="886" y="244" fill="#13754e" fontSize="11" fontWeight="700" textAnchor="middle">SMOOTH</text>
			<text x="886" y="263" fill="#526584" fontSize="9" textAnchor="middle">scheduled output</text>
			<path d="M852 309h67m-57-8 8 8-8 8m20-8 8 8-8 8m20-8 8 8-8 8" fill="none" stroke="#18a36a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<text x="738" y="371" fill="#526584" fontSize="10" textAnchor="middle">Adds delay; buffer can fill, after which packets may be dropped.</text>
			<text x="738" y="398" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Commonly applied on egress interfaces</text>
			<text x="738" y="418" fill="#526584" fontSize="9" textAnchor="middle">Policing can be configured in supported ingress or egress policies.</text>
			<text x="738" y="438" fill="#526584" fontSize="9" textAnchor="middle">Exact features depend on platform and policy-map capabilities.</text>
		</svg>
	);
}

function QosLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What QoS and PHB do</h2>
				<p className="mt-3">
					Quality of Service (QoS) is a set of tools for managing how network devices handle
					different traffic classes, especially when bandwidth, buffers, or processing
					resources are constrained. A <strong>per-hop behavior (PHB)</strong> describes the
					forwarding treatment a DiffServ node applies to a packet at one hop. Policies can
					affect queue selection, scheduling, drop precedence, and resource allocation; they
					do not create additional link capacity or guarantee end-to-end service by themselves.
				</p>
				<p className="mt-3">
					An end-to-end path can cross many devices, and each hop makes its own forwarding
					decision. Consistent classification and marking, together with compatible policies
					at relevant devices, help deliver the intended treatment across that path.
				</p>
				<TutorialDiagramFrame caption="A node classifies and marks traffic, then uses local queues and scheduling to apply forwarding treatment at this hop.">
					<QosPipelineDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">DSCP codepoints and IP marking</h2>
				<p className="mt-3">
					IPv4 and IPv6 use the eight-bit Differentiated Services (DS) field in the IP
					header. Its upper six bits carry the <strong>Differentiated Services Code Point
					(DSCP)</strong>; the lower two bits are used for Explicit Congestion Notification
					(ECN). DSCP codepoints mark packets so DiffServ-aware devices can map them to a
					configured PHB. The marking is a request for treatment, not a reservation of
					bandwidth or an instruction that every network must honor.
				</p>
				<div className="mt-5 grid gap-4 sm:grid-cols-2">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Default forwarding (DF)</h3>
						<p className="mt-2 text-sm leading-6">DSCP 0 is commonly used for best-effort traffic. It receives the network's ordinary forwarding behavior.</p>
					</div>
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Class Selector (CS)</h3>
						<p className="mt-2 text-sm leading-6">The CS codepoints provide a class-selector convention compatible with the former IP Precedence field; for example, CS3 is DSCP 24.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">Assured Forwarding (AF)</h3>
						<p className="mt-2 text-sm leading-6">AF defines classes with different drop-precedence levels. For example, AF21 means class 2, drop precedence 1; it is not simply a universal guarantee of “high priority.”</p>
					</div>
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
						<h3 className="font-bold text-[#9a640e]">Expedited Forwarding (EF)</h3>
						<p className="mt-2 text-sm leading-6">EF is intended for low-loss, low-delay, low-jitter service when the network provisions and polices it appropriately. EF marking alone does not guarantee those results.</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Classification and marking</h2>
				<p className="mt-3">
					<strong>Classification</strong> identifies a packet's traffic class using criteria
					such as source or destination address, protocol, port, an existing DSCP value, or
					other supported fields. <strong>Marking</strong> sets or changes a packet's DSCP
					(or another QoS field) to communicate the selected class to later devices.
					Classification should be applied at a trusted boundary; do not blindly trust
					traffic markings received from untrusted sources.
				</p>
				<p className="mt-3">
					This Cisco IOS example uses an extended ACL to identify TCP traffic destined for
					HTTP port 80, matches that ACL in a class map, and marks matching packets AF21
					with an output policy:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 100 permit tcp any any eq 80
Router(config)# class-map match-all CLASSIFICATION_HTTP
Router(config-cmap)# match access-group 100
Router(config-cmap)# exit
Router(config)# policy-map MARKING_HTTP
Router(config-pmap)# class CLASSIFICATION_HTTP
Router(config-pmap-c)# set dscp af21
Router(config-pmap-c)# exit
Router(config)# interface FastEthernet0/1
Router(config-if)# service-policy output MARKING_HTTP`}</code></pre>
				<p className="mt-3">
					An ACL match is a classification example, not reliable application identification:
					HTTP may use other ports, and port 80 does not prove that traffic is HTTP. Use
					criteria appropriate to the network and platform. Interface direction matters:
					<code> output</code> applies the policy to packets leaving that interface.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Queuing and congestion management</h2>
				<p className="mt-3">
					When packets compete for an egress link, queues hold packets until they can be
					transmitted. A scheduler selects packets from queues according to the configured
					policy—for example, priority scheduling for latency-sensitive traffic plus weighted
					queues for other classes. Queue design must be deliberate: an unbounded or
					misconfigured priority queue can starve other traffic, and exact Cisco commands
					and hardware queue behavior vary by platform.
				</p>
				<p className="mt-3">
					Congestion occurs when traffic demand exceeds available forwarding capacity or
					buffer resources. Tail drop discards packets when a queue fills. Active queue
					management methods such as Random Early Detection (RED), or Weighted RED (WRED),
					can drop selected packets before a queue is completely full to help signal
					congestion and avoid synchronized bursts. These mechanisms do not add bandwidth,
					and WRED behavior depends on the queue policy, traffic markings, and platform.
				</p>
				<p className="mt-3">
					For example, an LLQ-style class can give voice traffic a priority queue while
					reserving bandwidth for other classes. This simplified IOS policy illustrates
					the idea; verify feature support and adapt rates and classes to the actual link:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# class-map match-any VOICE
Router(config-cmap)# match dscp ef
Router(config-cmap)# exit
Router(config)# policy-map WAN-OUTPUT
Router(config-pmap)# class VOICE
Router(config-pmap-c)# priority 256
Router(config-pmap-c)# exit
Router(config-pmap)# class class-default
Router(config-pmap-c)# fair-queue
Router(config-pmap-c)# end
Router(config)# interface Serial0/0/0
Router(config-if)# service-policy output WAN-OUTPUT`}</code></pre>
				<p className="mt-3">
					The <code>priority</code> command is a policied low-latency queue in a class-based
					policy; it is not interchangeable with the platform-specific legacy
					<code> priority-queue out</code> interface command. Rates, syntax, and support vary.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Policing versus shaping</h2>
				<p className="mt-3">
					<strong>Policing</strong> measures traffic against a configured rate/burst profile.
					Conforming packets pass; excess or violating packets can be dropped or remarked
					according to the policy. Policing does not buffer excess traffic to send it later,
					and supported policies may be applied on ingress or egress.
				</p>
				<p className="mt-3">
					<strong>Shaping</strong> buffers excess traffic and releases it over time at a
					controlled rate. This smooths bursts and adds delay; if the shaping queue fills,
					packets can still be dropped. Shaping is commonly applied on egress, where the
					device controls transmission onto the next link. Exact placement and support depend
					on the platform and implementation.
				</p>
				<TutorialDiagramFrame caption="A policer enforces the rate by dropping or remarking excess traffic; a shaper queues excess packets and releases them later.">
					<QosPolicingShapingDiagram />
				</TutorialDiagramFrame>
				<div className="mt-5 grid gap-4 sm:grid-cols-2">
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
						<h3 className="font-bold text-[#9a640e]">Policing</h3>
						<ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
							<li>Measures rate and burst conformance.</li>
							<li>Excess traffic may be dropped or remarked.</li>
							<li>Does not smooth traffic by buffering it for later.</li>
							<li>Can be configured inbound or outbound where supported.</li>
						</ul>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">Shaping</h3>
						<ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
							<li>Buffers traffic that exceeds the immediate send rate.</li>
							<li>Transmits buffered packets later at a controlled rate.</li>
							<li>Adds delay and can eventually drop packets if its queue fills.</li>
							<li>Commonly used on egress interfaces.</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>PHB describes the forwarding treatment a DiffServ node applies at one hop.</li>
					<li>The IP DS field has six DSCP bits and two ECN bits; a marking signals a class but does not guarantee resources.</li>
					<li>Classification identifies traffic; marking sets the value used by downstream policy.</li>
					<li>Queues and schedulers manage egress contention; RED/WRED can manage drops before buffers fill.</li>
					<li>Policing drops or remarks excess traffic; shaping buffers and delays excess traffic for later transmission.</li>
					<li>QoS commands and hardware behavior vary by Cisco platform; verify policy support, direction, rates, and counters.</li>
				</ul>
			</section>
		</div>
	);
}

function SshTopologyDiagram() {
	return (
		<svg viewBox="0 0 1000 470" role="img" aria-labelledby="ssh-topology-title ssh-topology-description" className="mx-auto h-auto w-full">
			<title id="ssh-topology-title">SSH remote access topology to Cisco router R1</title>
			<desc id="ssh-topology-description">An administrator connects from router R2 or a computer on the management network to R1 at 192.168.12.1 using SSH over TCP port 22. R1 has a local admin account, an RSA key pair, and VTY lines configured to accept SSH only. The encrypted session protects credentials and CLI traffic in transit.</desc>
			<defs>
				<linearGradient id="ssh-topology-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="ssh-topology-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="ssh-topology-reply-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="454" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#ssh-topology-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">SSH · Secure Remote Access to Router R1</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">TCP port 22 · encrypted session · local user authentication · VTY lines accept SSH only</text>

			<rect x="48" y="132" width="276" height="264" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="186" y="162" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">ADMINISTRATOR · MANAGEMENT NETWORK</text>
			<rect x="72" y="184" width="104" height="84" rx="13" fill="#fff" stroke="#a9c7ef" strokeWidth="2" />
			<circle cx="124" cy="211" r="19" fill="#2868bd" />
			<path d="M113 212h22m-17 7h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
			<text x="124" y="249" fill="#183d73" fontSize="11" fontWeight="700" textAnchor="middle">Router R2</text>
			<text x="124" y="261" fill="#526584" fontSize="9" textAnchor="middle">SSH client</text>
			<rect x="196" y="184" width="104" height="84" rx="13" fill="#fff" stroke="#a9c7ef" strokeWidth="2" />
			<rect x="220" y="195" width="56" height="38" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M215 239h66m-44 0v7m22-7v7m-34 0h46" stroke="#4980cb" strokeWidth="2" strokeLinecap="round" />
			<text x="248" y="261" fill="#183d73" fontSize="9" fontWeight="700" textAnchor="middle">PC · PuTTY / SSH</text>
			<path d="M90 302h192" stroke="#b9d2f3" strokeWidth="2" strokeDasharray="5 5" />
			<text x="186" y="327" fill="#526584" fontSize="10" textAnchor="middle">Can reach R1's management IP</text>
			<text x="186" y="350" fill="#526584" fontSize="10" textAnchor="middle">and TCP port 22 through the network</text>
			<rect x="93" y="365" width="186" height="22" rx="11" fill="#fff" stroke="#b9d2f3" />
			<text x="186" y="380" fill="#2853df" fontSize="9" fontWeight="700" textAnchor="middle">username: admin</text>

			<circle cx="502" cy="260" r="78" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<circle cx="502" cy="243" r="32" fill="#bf791c" />
			<path d="M487 243h30m-25-8h20m-20 16h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
			<text x="502" y="300" fill="#9a640e" fontSize="13" fontWeight="700" textAnchor="middle">IP NETWORK</text>
			<text x="502" y="320" fill="#526584" fontSize="10" textAnchor="middle">route + ACL permit SSH</text>

			<rect x="684" y="132" width="270" height="264" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="819" y="162" fill="#13754e" fontSize="13" fontWeight="700" textAnchor="middle">MANAGED CISCO ROUTER</text>
			<rect x="729" y="185" width="180" height="67" rx="13" fill="#fff" stroke="#a4d6bc" strokeWidth="2" />
			<circle cx="764" cy="218" r="20" fill="#18865d" />
			<path d="M753 218h22m-17-7h12m-12 14h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
			<text x="837" y="213" fill="#176847" fontSize="13" fontWeight="700" textAnchor="middle">Router R1</text>
			<text x="837" y="233" fill="#526584" fontSize="11" textAnchor="middle">192.168.12.1</text>
			<text x="819" y="278" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">SSH server · TCP 22</text>
			<rect x="710" y="294" width="218" height="80" rx="12" fill="#fff" stroke="#a4d6bc" />
			<text x="819" y="316" fill="#176847" fontSize="10" fontWeight="700" textAnchor="middle">Local admin · RSA key pair</text>
			<text x="819" y="337" fill="#526584" fontSize="9" textAnchor="middle">VTY 0–4 · login local</text>
			<text x="819" y="355" fill="#526584" fontSize="9" textAnchor="middle">transport input ssh (Telnet refused)</text>

			<path d="M326 222C385 185 410 185 423 211" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ssh-topology-arrow)" />
			<path d="M580 211C608 185 636 185 679 222" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ssh-topology-arrow)" />
			<path d="M680 280C636 320 610 320 580 294" fill="none" stroke="#18a36a" strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#ssh-topology-reply-arrow)" />
			<path d="M423 294C405 320 378 320 326 280" fill="none" stroke="#18a36a" strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#ssh-topology-reply-arrow)" />
			<rect x="366" y="143" width="270" height="28" rx="14" fill="#fff" />
			<text x="501" y="162" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">SSH client opens encrypted TCP session → R1</text>
			<rect x="372" y="337" width="258" height="28" rx="14" fill="#fff" />
			<text x="501" y="356" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">encrypted CLI data and responses ← R1</text>

			<rect x="180" y="416" width="640" height="26" rx="13" fill="#f7faff" />
			<text x="500" y="434" fill="#526584" fontSize="10" textAnchor="middle">SSH encrypts the remote session; protect credentials and verify the server host key before trusting it.</text>
		</svg>
	);
}

function SshLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why use SSH instead of Telnet?</h2>
				<p className="mt-3">
					One common way to access a Cisco router remotely is Telnet, but Telnet does not
					encrypt the session. Usernames, passwords, commands, and output can be read by
					someone who captures traffic along the path. Secure Shell (SSH) provides a
					remote command-line session with authentication and encryption, protecting
					management data while it travels across the network.
				</p>
				<p className="mt-3">
					SSH uses public-key cryptography as part of establishing a secure session. On a
					Cisco router, an RSA key pair is generated for the SSH server. The router keeps
					the private key, and the SSH client can use the corresponding public-key identity
					to verify the server. User authentication is configured separately; this example
					uses a local username and password database on R1.
				</p>
				<TutorialDiagramFrame caption="R2 or a PC connects to R1's management address using SSH over TCP port 22; R1 accepts local-user authentication on SSH-only VTY lines.">
					<SshTopologyDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Before configuring SSH</h2>
				<p className="mt-3">
					The example topology uses R1 at <code>192.168.12.1</code> and a management
					device such as R2 or a PC. R1 must already have an IP address configured on an
					active interface, and the client must have IP connectivity to that address.
					Routing and any access-control lists or firewalls along the path must permit
					TCP port <code>22</code>. SSH cannot work until the router has an RSA key pair
					and a usable authentication method for its VTY lines.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure SSH on router R1</h2>
				<p className="mt-3">
					Perform these steps in order. The hostname and domain name form the default
					fully qualified name used when generating the RSA keys, so configure both
					before creating the key pair.
				</p>

				<div className="mt-5 space-y-6">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">1. Configure a hostname for the router</h3>
						<p className="mt-2 text-sm leading-6">Set the device name to R1. The CLI prompt changes to show that hostname.</p>
						<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# hostname R1
R1(config)#`}</code></pre>
					</div>

					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">2. Configure the domain name</h3>
						<p className="mt-2 text-sm leading-6">Configure the domain portion of the router's identity before generating its RSA keys. This example uses <code>9tut.com</code>.</p>
						<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# ip domain-name 9tut.com`}</code></pre>
					</div>

					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">3. Generate the RSA key pair</h3>
						<p className="mt-2 text-sm leading-6">Generate a 2048-bit RSA key pair. IOS may prompt for the modulus size; on releases that support it, the modulus can be included in the command. The hostname and domain are combined as the default key name, here <code>R1.9tut.com</code>. The router retains the private key; do not expose or share it.</p>
						<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# crypto key generate rsa
The name for the keys will be: R1.9tut.com
Choose the size of the key modulus in the range of 360 to 4096 for your
  General Purpose Keys. Choosing a key modulus greater than 512 may take
  a few minutes.

How many bits in the modulus [512]: 2048
% Generating 2048 bit RSA keys, keys will be non-exportable...
[OK] (elapsed time was 3 seconds)`}</code></pre>
						<p className="mt-3 text-sm leading-6">A 2048-bit key is a commonly used baseline for current deployments; use your organization's cryptographic policy and platform support when selecting key parameters.</p>
					</div>

					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">4. Configure VTY lines to accept SSH only</h3>
						<p className="mt-2 text-sm leading-6">VTY lines handle remote CLI sessions. <code>transport input ssh</code> refuses Telnet and permits SSH; <code>login local</code> tells the VTY lines to authenticate against the router's local username database.</p>
						<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# line vty 0 4
R1(config-line)# transport input ssh
R1(config-line)# login local`}</code></pre>
						<p className="mt-3 text-sm leading-6">Some platforms have more VTY lines or use a different range; configure all remote-access VTY lines that exist on the device. If policy explicitly requires both protocols, IOS can accept <code>transport input ssh telnet</code>, but Telnet remains unencrypted and should normally stay disabled.</p>
					</div>

					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">5. Create a local username and password</h3>
						<p className="mt-2 text-sm leading-6">Create the account that <code>login local</code> will check. The source example uses the <code>password</code> keyword; <code>secret</code> is preferred because it stores a protected secret rather than a recoverable clear-text password in the configuration. Replace the placeholder with a unique, strong password.</p>
						<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# username admin secret <strong-unique-password>`}</code></pre>
						<p className="mt-3 text-sm leading-6">If reproducing the tutorial's exact legacy syntax in a lab, it is <code>username admin password password_SSH</code>; avoid using that weak example credential on a real device. A user-level privilege can be specified separately according to the access policy.</p>
					</div>

					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">6. (Optional) Explicitly select SSH version 2</h3>
						<p className="mt-2 text-sm leading-6">Where supported, select SSH version 2 rather than allowing legacy version 1 behavior.</p>
						<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# ip ssh version 2`}</code></pre>
					</div>
				</div>

				<p className="mt-5">The complete configuration, in order, is:</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# hostname R1
R1(config)# ip domain-name 9tut.com
R1(config)# crypto key generate rsa
How many bits in the modulus [512]: 2048
R1(config)# ip ssh version 2
R1(config)# username admin secret <strong-unique-password>
R1(config)# line vty 0 4
R1(config-line)# transport input ssh
R1(config-line)# login local
R1(config-line)# end`}</code></pre>
				<p className="mt-3 text-sm leading-6">The modulus prompt appears during key generation; it is not entered as a separate global-configuration command. If the RSA keys already exist, IOS may ask whether to replace them or may use the existing keys.</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verify the SSH configuration on R1</h2>
				<p className="mt-3">Use these commands to verify that SSH is enabled, the keys exist, and the VTY configuration is present:</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1# show ip ssh
R1# show crypto key mypubkey rsa
R1# show running-config | section line vty
R1# show users`}</code></pre>
				<p className="mt-3">
					Confirm the SSH version and timeout information in <code>show ip ssh</code>,
					the RSA key details, and that the VTY lines contain <code>login local</code>
					and <code>transport input ssh</code>. Check that the management interface has
					the expected address and is up.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Connect from another Cisco device</h2>
				<p className="mt-3">
					Cisco IOS includes an SSH client on supported platforms. From R2, connect to
					R1's management address and specify the local username with <code>-l</code>:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R2# ssh -l admin 192.168.12.1
Password: <enter the password configured on R1>
R1>`}</code></pre>
				<p className="mt-3">
					The <code>-l</code> option supplies the login name, which is <code>admin</code>
					in this example. Enter the password configured in R1's local database; the
					password input is not displayed. A successful login opens a remote CLI prompt
					on R1.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Connect from a computer with PuTTY</h2>
				<p className="mt-3">
					A PC can connect with PuTTY or another SSH client. In PuTTY, enter
					<code> 192.168.12.1</code> in <strong>Host Name (or IP address)</strong>, set
					<strong> Port</strong> to <code>22</code>, select <strong>SSH</strong> as the
					connection type, and click <strong>Open</strong>. At the terminal login prompt,
					enter <code>admin</code>, then enter the password configured on R1.
				</p>
				<div className="mt-5 grid gap-4 sm:grid-cols-2">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">PuTTY connection settings</h3>
						<ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
							<li>Host Name: <code>192.168.12.1</code></li>
							<li>Port: <code>22</code></li>
							<li>Connection type: <strong>SSH</strong></li>
							<li>Select Open, then log in as <code>admin</code>.</li>
						</ul>
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
						<h3 className="font-bold text-[#1756a4]">OpenSSH command-line alternative</h3>
						<p className="mt-2 text-sm leading-6">From a terminal on a PC with an SSH client, connect with:</p>
						<pre className="mt-3 overflow-x-auto rounded-lg bg-[#101b31] p-3 text-xs leading-5 text-[#e7efff]"><code>{`ssh admin@192.168.12.1`}</code></pre>
					</div>
				</div>
				<p className="mt-4">
					On a first connection, the client may display R1's host-key fingerprint and ask
					whether to trust it. Verify the fingerprint through a trusted channel before
					accepting it, especially on production networks. Once accepted, authenticate
					with the local <code>admin</code> account.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Troubleshooting if SSH does not connect</h2>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>1. Check reachability:</strong> verify the client can route to <code>192.168.12.1</code>, R1's interface is up, and no ACL or firewall blocks TCP port 22.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>2. Check SSH and RSA keys:</strong> verify the hostname/domain name, RSA key generation, and SSH status with <code>show ip ssh</code> and <code>show crypto key mypubkey rsa</code>.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>3. Check VTY settings:</strong> confirm all relevant VTY lines use <code>login local</code> and allow SSH with <code>transport input ssh</code>.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>4. Check credentials:</strong> make sure the username exists in the local database and the entered password matches. Remember, <code>login local</code> uses local usernames; it does not use a line password.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>5. Check the client host key:</strong> if the router's RSA host key was regenerated, the client may warn that the saved host key has changed. Verify the new fingerprint before removing or updating the saved entry.</li>
				</ol>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>Telnet sends remote-session data without encryption; SSH encrypts the management session and authenticates the user.</li>
					<li>Configure hostname and domain name before generating the router's RSA key pair.</li>
					<li>Create a local user, configure VTY lines with <code>login local</code>, and restrict remote transport to <code>ssh</code>.</li>
					<li>R1's sample management address is <code>192.168.12.1</code>; SSH uses TCP port <code>22</code>.</li>
					<li>Verify with <code>show ip ssh</code> and test from R2 with <code>ssh -l admin 192.168.12.1</code> or from a PC using PuTTY.</li>
					<li>Use a strong unique secret and verify the SSH host-key fingerprint before trusting a first-time connection.</li>
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

	if (article.contentType === "dhcp") {
		return <DhcpLessonContent />;
	}

	if (article.contentType === "snmp") {
		return <SnmpLessonContent />;
	}

	if (article.contentType === "syslog") {
		return <SyslogLessonContent />;
	}

	if (article.contentType === "qos") {
		return <QosLessonContent />;
	}

	if (article.contentType === "ssh") {
		return <SshLessonContent />;
	}

	return <CcnaKnowledgeModulePlaceholder article={article} category="4.0 IP Services" />;
}
