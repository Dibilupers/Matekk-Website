import { TutorialDiagramFrame } from "./ccnaTutorialDiagramFrame";

function EigrpNeighborExchangeDiagram() {
	return (
		<svg viewBox="0 0 1000 560" role="img" aria-labelledby="eigrp-exchange-title eigrp-exchange-description" className="mx-auto h-auto w-full">
			<title id="eigrp-exchange-title">EIGRP neighbor discovery and route exchange</title>
			<desc id="eigrp-exchange-description">Two routers in the same EIGRP autonomous system discover each other with Hello packets sent using IP protocol 88. They exchange initial route Updates with reliable acknowledgments, then use partial triggered Updates when routes change. DUAL selects loop-free successor routes.</desc>
			<defs>
				<linearGradient id="eigrp-exchange-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="eigrp-exchange-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="eigrp-exchange-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="544" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#eigrp-exchange-header)" />
			<text x="42" y="57" fill="#fff" fontSize="24" fontWeight="700">EIGRP · Neighbor Discovery and Route Updates</text>
			<text x="42" y="79" fill="#dcecff" fontSize="13">Same AS and compatible K-values · EIGRP uses IP protocol 88, not TCP or UDP</text>

			<rect x="55" y="119" width="890" height="245" rx="20" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<circle cx="215" cy="227" r="54" fill="#e4efff" />
			<circle cx="215" cy="227" r="42" fill="#2868bd" />
			<rect x="197" y="217" width="36" height="20" rx="4" fill="#fff" />
			<path d="M203 223h7m5 0h8m-20 8h7m5 0h8" stroke="#2868bd" strokeWidth="2.5" strokeLinecap="round" />
			<text x="215" y="291" fill="#183d73" fontSize="15" fontWeight="700" textAnchor="middle">R1 · EIGRP AS 10</text>
			<circle cx="785" cy="227" r="54" fill="#e0f4e9" />
			<circle cx="785" cy="227" r="42" fill="#18865d" />
			<rect x="767" y="217" width="36" height="20" rx="4" fill="#fff" />
			<path d="M773 223h7m5 0h8m-20 8h7m5 0h8" stroke="#18865d" strokeWidth="2.5" strokeLinecap="round" />
			<text x="785" y="291" fill="#176847" fontSize="15" fontWeight="700" textAnchor="middle">R2 · EIGRP AS 10</text>

			<path d="M275 195h450" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#eigrp-exchange-arrow)" />
			<path d="M725 211H275" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#eigrp-exchange-arrow)" />
			<rect x="411" y="174" width="178" height="24" rx="12" fill="#e8f1ff" />
			<text x="500" y="191" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">HELLO · multicast 224.0.0.10*</text>
			<text x="500" y="228" fill="#71819b" fontSize="11" textAnchor="middle">Discover and maintain neighbor relationship</text>

			<path d="M275 253h450" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#eigrp-exchange-green-arrow)" />
			<path d="M725 270H275" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#eigrp-exchange-green-arrow)" />
			<rect x="404" y="236" width="192" height="24" rx="12" fill="#e5f8ef" />
			<text x="500" y="253" fill="#118153" fontSize="11" fontWeight="700" textAnchor="middle">UPDATE · initial routes, then changes</text>
			<text x="500" y="286" fill="#71819b" fontSize="11" textAnchor="middle">Reliable delivery where required · ACK confirms reliable packets</text>

			<rect x="78" y="316" width="360" height="31" rx="10" fill="#fff4df" />
			<text x="258" y="336" fill="#9a640e" fontSize="11" fontWeight="700" textAnchor="middle">Neighbor table: directly connected EIGRP peers</text>
			<rect x="562" y="316" width="360" height="31" rx="10" fill="#f0eaff" />
			<text x="742" y="336" fill="#7042b4" fontSize="11" fontWeight="700" textAnchor="middle">DUAL evaluates paths in the topology table</text>

			<rect x="55" y="390" width="890" height="128" rx="18" fill="#f7faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="80" y="421" fill="#1a3768" fontSize="16" fontWeight="700">When a route changes</text>
			<rect x="82" y="440" width="224" height="53" rx="12" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="194" y="462" fill="#2853df" fontSize="13" fontWeight="700" textAnchor="middle">Link or route changes</text>
			<text x="194" y="481" fill="#71819b" fontSize="11" textAnchor="middle">triggered event</text>
			<path d="M307 466h65" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#eigrp-exchange-arrow)" />
			<rect x="383" y="440" width="236" height="53" rx="12" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="501" y="462" fill="#2853df" fontSize="13" fontWeight="700" textAnchor="middle">Partial EIGRP Update</text>
			<text x="501" y="481" fill="#71819b" fontSize="11" textAnchor="middle">sent to affected neighbors</text>
			<path d="M620 466h65" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#eigrp-exchange-green-arrow)" />
			<rect x="696" y="440" width="221" height="53" rx="12" fill="#e5f8ef" stroke="#8bd0ad" strokeWidth="2" />
			<text x="806" y="462" fill="#118153" fontSize="13" fontWeight="700" textAnchor="middle">DUAL reconverges</text>
			<text x="806" y="481" fill="#628b79" fontSize="11" textAnchor="middle">loop-free successor selected</text>
			<text x="500" y="538" fill="#71819b" fontSize="10" textAnchor="middle">*EIGRP for IPv4 uses 224.0.0.10; EIGRP for IPv6 uses link-local IPv6 multicast.</text>
		</svg>
	);
}

function EigrpDualDiagram() {
	return (
		<svg viewBox="0 0 1000 560" role="img" aria-labelledby="eigrp-dual-title eigrp-dual-description" className="mx-auto h-auto w-full">
			<title id="eigrp-dual-title">EIGRP successor, feasible successor, and DUAL feasibility condition</title>
			<desc id="eigrp-dual-description">Router A reaches a destination through neighbor B with reported distance 50 and local link cost 40, giving feasible distance 90. The alternative through neighbor C has reported distance 70 and local cost 60, giving total distance 130. Since 70 is less than successor feasible distance 90, the path through C qualifies as a feasible successor.</desc>
			<defs>
				<linearGradient id="eigrp-dual-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="eigrp-dual-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="eigrp-dual-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="544" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#eigrp-dual-header)" />
			<text x="42" y="57" fill="#fff" fontSize="24" fontWeight="700">EIGRP · DUAL Selects a Successor and a Safe Backup</text>
			<text x="42" y="79" fill="#dcecff" fontSize="13">Example composite metric values · lower metric is preferred</text>

			<rect x="42" y="119" width="916" height="246" rx="20" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<rect x="76" y="153" width="255" height="72" rx="16" fill="#edf4ff" stroke="#a9c7ef" strokeWidth="2" />
			<text x="203" y="181" fill="#183d73" fontSize="16" fontWeight="700" textAnchor="middle">Neighbor B</text>
			<text x="203" y="204" fill="#526584" fontSize="12" textAnchor="middle">RD to destination = 50</text>
			<rect x="76" y="265" width="255" height="72" rx="16" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="203" y="293" fill="#176847" fontSize="16" fontWeight="700" textAnchor="middle">Neighbor C</text>
			<text x="203" y="316" fill="#526584" fontSize="12" textAnchor="middle">RD to destination = 70</text>

			<circle cx="500" cy="245" r="70" fill="#e5efff" />
			<circle cx="500" cy="245" r="54" fill="#2868bd" />
			<rect x="478" y="231" width="44" height="28" rx="5" fill="#fff" />
			<path d="M485 239h8m5 0h11m-24 9h8m5 0h11" stroke="#2868bd" strokeWidth="3" strokeLinecap="round" />
			<text x="500" y="331" fill="#183d73" fontSize="14" fontWeight="700" textAnchor="middle">Router A · local</text>

			<rect x="718" y="194" width="198" height="100" rx="17" fill="#fff4df" stroke="#e8c98d" strokeWidth="2" />
			<text x="817" y="226" fill="#9a640e" fontSize="15" fontWeight="700" textAnchor="middle">Destination</text>
			<text x="817" y="251" fill="#526584" fontSize="13" textAnchor="middle">10.20.0.0/16</text>
			<text x="817" y="274" fill="#71819b" fontSize="11" textAnchor="middle">remote network</text>

			<path d="M331 180L444 220M554 226L716 226" fill="none" stroke="#2872dc" strokeWidth="5" markerEnd="url(#eigrp-dual-blue-arrow)" />
			<rect x="342" y="145" width="102" height="25" rx="12" fill="#e5efff" />
			<text x="393" y="162" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">link cost 40</text>
			<rect x="581" y="190" width="123" height="26" rx="12" fill="#e5efff" />
			<text x="642" y="208" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">SUCCESSOR · FD 90</text>

			<path d="M331 301L445 269M554 264L716 264" fill="none" stroke="#18a36a" strokeWidth="4" strokeDasharray="9 7" markerEnd="url(#eigrp-dual-green-arrow)" />
			<rect x="343" y="311" width="102" height="25" rx="12" fill="#e5f8ef" />
			<text x="394" y="328" fill="#118153" fontSize="11" fontWeight="700" textAnchor="middle">link cost 60</text>
			<rect x="581" y="278" width="123" height="26" rx="12" fill="#e5f8ef" />
			<text x="642" y="296" fill="#118153" fontSize="11" fontWeight="700" textAnchor="middle">BACKUP · FD 130</text>

			<rect x="42" y="394" width="916" height="119" rx="18" fill="#f7faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="66" y="425" fill="#1a3768" fontSize="16" fontWeight="700">DUAL’s feasibility condition for an immediately usable backup</text>
			<rect x="77" y="445" width="310" height="44" rx="12" fill="#edfaf3" />
			<text x="232" y="473" fill="#118153" fontSize="16" fontWeight="700" textAnchor="middle">Neighbor C reported distance: 70</text>
			<text x="500" y="474" fill="#71819b" fontSize="19" fontWeight="700" textAnchor="middle">&lt;</text>
			<rect x="613" y="445" width="310" height="44" rx="12" fill="#e5efff" />
			<text x="768" y="473" fill="#2853df" fontSize="16" fontWeight="700" textAnchor="middle">Current successor FD: 90</text>
			<text x="500" y="540" fill="#118153" fontSize="13" fontWeight="700" textAnchor="middle">70 &lt; 90 → C satisfies the condition and is retained as a feasible successor.</text>
		</svg>
	);
}

function HsrpGatewayDiagram() {
	return (
		<svg viewBox="0 0 1000 560" role="img" aria-labelledby="hsrp-gateway-title hsrp-gateway-description" className="mx-auto h-auto w-full">
			<title id="hsrp-gateway-title">HSRP virtual default gateway with active and standby routers</title>
			<desc id="hsrp-gateway-description">Two hosts use virtual IP 192.168.1.254 as their default gateway. Router R1, active with address 192.168.1.1, forwards traffic using virtual MAC 0000.0c07.ac0a. Router R2, standby with address 192.168.1.2, monitors HSRP hello messages and takes over if R1 fails.</desc>
			<defs>
				<linearGradient id="hsrp-gateway-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="hsrp-gateway-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="hsrp-gateway-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="544" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v62H10z" fill="url(#hsrp-gateway-header)" />
			<text x="42" y="58" fill="#fff" fontSize="25" fontWeight="700">HSRP · One Virtual Gateway, Redundant Routers</text>
			<text x="42" y="81" fill="#dcecff" fontSize="13">Hosts keep one default-gateway setting while the router that forwards can change.</text>

			<rect x="55" y="128" width="890" height="310" rx="22" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<rect x="96" y="175" width="142" height="92" rx="15" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<rect x="117" y="194" width="41" height="30" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M112 232h51m-40 0v8m29-8v8m-38 0h48" stroke="#4980cb" strokeWidth="2" strokeLinecap="round" />
			<text x="167" y="256" fill="#183d73" fontSize="13" fontWeight="700" textAnchor="middle">Host A</text>
			<rect x="96" y="301" width="142" height="92" rx="15" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<rect x="117" y="320" width="41" height="30" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M112 358h51m-40 0v8m29-8v8m-38 0h48" stroke="#4980cb" strokeWidth="2" strokeLinecap="round" />
			<text x="167" y="382" fill="#183d73" fontSize="13" fontWeight="700" textAnchor="middle">Host B</text>
			<rect x="74" y="403" width="188" height="24" rx="12" fill="#e8f1ff" />
			<text x="168" y="420" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">Default gateway: 192.168.1.254</text>

			<path d="M238 220h106v91h72M238 347h106v-36h72" fill="none" stroke="#7b9fc9" strokeWidth="4" />
			<circle cx="430" cy="311" r="22" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<circle cx="430" cy="311" r="8" fill="#4980cb" />
			<rect x="349" y="344" width="164" height="28" rx="14" fill="#fff" stroke="#cbd9ed" />
			<text x="431" y="363" fill="#526584" fontSize="11" fontWeight="700" textAnchor="middle">LAN · 192.168.1.0/24</text>

			<path d="M452 292L581 222" fill="none" stroke="#2872dc" strokeWidth="5" markerEnd="url(#hsrp-gateway-arrow)" />
			<path d="M452 330L581 358" fill="none" stroke="#91a5c2" strokeWidth="4" strokeDasharray="8 7" />

			<circle cx="644" cy="199" r="48" fill="#e5efff" />
			<circle cx="644" cy="199" r="36" fill="#2868bd" />
			<rect x="628" y="191" width="32" height="18" rx="4" fill="#fff" />
			<path d="M633 197h7m4 0h10m-21 7h7m4 0h10" stroke="#2868bd" strokeWidth="2" strokeLinecap="round" />
			<text x="644" y="257" fill="#1756a4" fontSize="14" fontWeight="700" textAnchor="middle">R1 · ACTIVE</text>
			<text x="644" y="276" fill="#526584" fontSize="11" textAnchor="middle">physical IP .1 · forwards traffic</text>
			<circle cx="644" cy="359" r="48" fill="#edfaf3" />
			<circle cx="644" cy="359" r="36" fill="#18865d" />
			<rect x="628" y="351" width="32" height="18" rx="4" fill="#fff" />
			<path d="M633 357h7m4 0h10m-21 7h7m4 0h10" stroke="#18865d" strokeWidth="2" strokeLinecap="round" />
			<text x="644" y="417" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">R2 · STANDBY</text>

			<path d="M697 199h63" fill="none" stroke="#2872dc" strokeWidth="4" markerEnd="url(#hsrp-gateway-arrow)" />
			<path d="M760 359h-63" fill="none" stroke="#18a36a" strokeWidth="3" strokeDasharray="7 6" markerEnd="url(#hsrp-gateway-green-arrow)" />
			<rect x="762" y="156" width="153" height="86" rx="15" fill="#fff4df" stroke="#e8c98d" strokeWidth="2" />
			<text x="838" y="182" fill="#9a640e" fontSize="13" fontWeight="700" textAnchor="middle">HSRP group 10</text>
			<text x="838" y="205" fill="#526584" fontSize="11" textAnchor="middle">Virtual IP .254</text>
			<text x="838" y="224" fill="#526584" fontSize="10" textAnchor="middle">Virtual MAC ...AC0A (v1)</text>
			<rect x="762" y="309" width="153" height="76" rx="15" fill="#f1f6ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="838" y="335" fill="#2853df" fontSize="12" fontWeight="700" textAnchor="middle">Hello monitoring</text>
			<text x="838" y="355" fill="#526584" fontSize="10" textAnchor="middle">R2 tracks active R1</text>
			<text x="838" y="372" fill="#526584" fontSize="10" textAnchor="middle">and is ready to take over</text>

			<rect x="55" y="461" width="890" height="63" rx="16" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="500" y="487" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">If R1 fails, R2 becomes Active and takes over the shared virtual gateway identity.</text>
			<text x="500" y="508" fill="#526584" fontSize="11" textAnchor="middle">Hosts continue using 192.168.1.254; no manual default-gateway change is required.</text>
		</svg>
	);
}

function HsrpStatesDiagram() {
	const states = [
		{ x: 57, title: "Initial", description: "HSRP starts or configuration changes", fill: "#eef2f8", color: "#526584" },
		{ x: 211, title: "Learn", description: "Learn the virtual IP / active hello", fill: "#e8f1ff", color: "#2853df" },
		{ x: 365, title: "Listen", description: "Neither Active nor Standby", fill: "#e8f1ff", color: "#2853df" },
		{ x: 519, title: "Speak", description: "Send hellos; participate in election", fill: "#fff4df", color: "#9a640e" },
		{ x: 673, title: "Standby", description: "Monitor Active router", fill: "#e5f8ef", color: "#118153" },
		{ x: 827, title: "Active", description: "Own virtual gateway; forward packets", fill: "#dceaff", color: "#1756a4" },
	];

	return (
		<svg viewBox="0 0 1000 400" role="img" aria-labelledby="hsrp-states-title hsrp-states-description" className="mx-auto h-auto w-full">
			<title id="hsrp-states-title">Six HSRP states and roles</title>
			<desc id="hsrp-states-description">HSRP moves through Initial, Learn, Listen, and Speak while determining group information and electing roles. One router becomes Active, one becomes Standby, and additional routers remain in Listen. The standby router monitors the active router.</desc>
			<defs>
				<linearGradient id="hsrp-states-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="hsrp-states-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#6684ad" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="384" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#hsrp-states-header)" />
			<text x="42" y="58" fill="#fff" fontSize="24" fontWeight="700">HSRP · Six Protocol States</text>
			<text x="42" y="80" fill="#dcecff" fontSize="13">State progression supports discovery and election; group members do not all end in the same role.</text>
			{states.map((state, index) => (
				<g key={state.title}>
					<rect x={state.x} y="151" width="132" height="112" rx="16" fill={state.fill} stroke="#c6d7ec" strokeWidth="2" />
					<circle cx={state.x + 66} cy="178" r="13" fill="#fff" />
					<text x={state.x + 66} y="183" fill={state.color} fontSize="12" fontWeight="700" textAnchor="middle">{index + 1}</text>
					<text x={state.x + 66} y="215" fill={state.color} fontSize="16" fontWeight="700" textAnchor="middle">{state.title}</text>
					<text x={state.x + 66} y="237" fill="#526584" fontSize="9.5" textAnchor="middle">{state.description}</text>
					{index < states.length - 1 && (
						<path d={`M${state.x + 135} 206h15`} fill="none" stroke="#6684ad" strokeWidth="2.5" markerEnd="url(#hsrp-states-arrow)" />
					)}
				</g>
			))}
			<path d="M893 273v32H739v-26M893 305h-308v-26" fill="none" stroke="#18a36a" strokeWidth="2.5" strokeDasharray="7 6" markerEnd="url(#hsrp-states-arrow)" />
			<rect x="95" y="319" width="810" height="45" rx="13" fill="#f7faff" stroke="#d5e3f5" />
			<text x="500" y="339" fill="#1a3768" fontSize="12" fontWeight="700" textAnchor="middle">Steady state: one Active · one Standby · remaining group routers stay in Listen</text>
			<text x="500" y="356" fill="#526584" fontSize="10" textAnchor="middle">The Standby router monitors Active hellos and competes to take over if the Active role is lost.</text>
		</svg>
	);
}

function GlbpLoadDistributionDiagram() {
	const clients = [
		{ x: 126, name: "Host 1", mac: "vMAC 01", forwarder: "R1" },
		{ x: 316, name: "Host 2", mac: "vMAC 02", forwarder: "R2" },
		{ x: 506, name: "Host 3", mac: "vMAC 03", forwarder: "R3" },
		{ x: 696, name: "Host 4", mac: "vMAC 04", forwarder: "R4" },
	];
	const routers = [
		{ x: 235, name: "R1", role: "AVF 1", color: "#2868bd" },
		{ x: 415, name: "R2", role: "AVF 2", color: "#18865d" },
		{ x: 595, name: "R3", role: "SVG + AVF 3", color: "#7042b4" },
		{ x: 775, name: "R4", role: "AVG + AVF 4", color: "#c27616" },
	];

	return (
		<svg viewBox="0 0 1000 600" role="img" aria-labelledby="glbp-distribution-title glbp-distribution-description" className="mx-auto h-auto w-full">
			<title id="glbp-distribution-title">GLBP distributes host traffic across four active virtual forwarders</title>
			<desc id="glbp-distribution-description">Four clients use virtual IP 10.10.10.100. The Active Virtual Gateway R4 answers ARP requests with different virtual MAC addresses. Each client sends frames to a different active virtual forwarder: R1 through R4. R4 is also an AVF, and R3 is standby virtual gateway and an AVF.</desc>
			<defs>
				<linearGradient id="glbp-distribution-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="glbp-distribution-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="glbp-distribution-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
				<marker id="glbp-distribution-orange-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#c27616" />
				</marker>
				<marker id="glbp-distribution-purple-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#7042b4" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="584" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v62H10z" fill="url(#glbp-distribution-header)" />
			<text x="42" y="58" fill="#fff" fontSize="25" fontWeight="700">GLBP · One Virtual IP, Multiple Forwarders</text>
			<text x="42" y="81" fill="#dcecff" fontSize="13">The AVG answers ARP requests with virtual MACs for active forwarders in the group.</text>

			<rect x="50" y="119" width="900" height="118" rx="19" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="76" y="148" fill="#1a3768" fontSize="15" fontWeight="700">Clients share one default gateway</text>
			{clients.map((client) => (
				<g key={client.name}>
					<rect x={client.x} y="164" width="150" height="55" rx="12" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
					<text x={client.x + 75} y="187" fill="#183d73" fontSize="12" fontWeight="700" textAnchor="middle">{client.name}</text>
					<text x={client.x + 75} y="205" fill="#526584" fontSize="10" textAnchor="middle">Gateway 10.10.10.100</text>
				</g>
			))}
			<path d="M202 237v30m190-30v30m190-30v30m190-30v30" fill="none" stroke="#7b9fc9" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#glbp-distribution-blue-arrow)" />

			<rect x="50" y="270" width="900" height="59" rx="15" fill="#eaf2ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="500" y="294" fill="#2853df" fontSize="14" fontWeight="700" textAnchor="middle">AVG R4 answers ARP for 10.10.10.100</text>
			<text x="500" y="315" fill="#526584" fontSize="11" textAnchor="middle">Round-robin example: each reply supplies a different forwarder’s virtual MAC.</text>
			{clients.map((client) => (
				<g key={`${client.name}-arp`}>
					<path d={`M${client.x + 75} 329v22`} fill="none" stroke="#2872dc" strokeWidth="2" markerEnd="url(#glbp-distribution-blue-arrow)" />
					<rect x={client.x + 9} y="354" width="132" height="27" rx="13" fill="#fff" stroke="#cbd9ed" />
					<text x={client.x + 75} y="372" fill="#2853df" fontSize="10" fontWeight="700" textAnchor="middle">{client.mac} → {client.forwarder}</text>
				</g>
			))}

			<rect x="50" y="399" width="900" height="152" rx="19" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="76" y="428" fill="#1a3768" fontSize="15" fontWeight="700">Forwarding distribution · all four are AVFs</text>
			{routers.map((router, index) => (
				<g key={router.name}>
					<path
						d={`M${clients[index].x + 75} 381L${router.x} 465`}
						fill="none"
						stroke={router.color}
						strokeWidth="3"
						markerEnd={index === 0 ? "url(#glbp-distribution-blue-arrow)" : index === 1 ? "url(#glbp-distribution-green-arrow)" : index === 2 ? "url(#glbp-distribution-purple-arrow)" : "url(#glbp-distribution-orange-arrow)"}
					/>
					<circle cx={router.x} cy="485" r="25" fill={router.color} />
					<rect x={router.x - 12} y="479" width="24" height="13" rx="3" fill="#fff" />
					<text x={router.x} y="526" fill={router.color} fontSize="12" fontWeight="700" textAnchor="middle">{router.name} · {router.role}</text>
				</g>
			))}
			<text x="500" y="576" fill="#71819b" fontSize="10" textAnchor="middle">Each client retains the same virtual IP gateway; learned vMAC determines which active forwarder receives its frames.</text>
		</svg>
	);
}

function GlbpFailoverDiagram() {
	return (
		<svg viewBox="0 0 1000 510" role="img" aria-labelledby="glbp-failover-title glbp-failover-description" className="mx-auto h-auto w-full">
			<title id="glbp-failover-title">GLBP Active Virtual Gateway and forwarder failover</title>
			<desc id="glbp-failover-description">R4 is initially AVG and AVF 4, and R3 is the Standby Virtual Gateway and AVF 3. If R4 fails, R3 becomes the new AVG and continues to manage the group. A surviving forwarder can take over a failed forwarder's virtual MAC so hosts continue using the same gateway address.</desc>
			<defs>
				<linearGradient id="glbp-failover-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="glbp-failover-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="glbp-failover-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="494" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#glbp-failover-header)" />
			<text x="42" y="58" fill="#fff" fontSize="24" fontWeight="700">GLBP · Gateway and Forwarder Failover</text>
			<text x="42" y="80" fill="#dcecff" fontSize="13">Control-plane AVG election and data-plane AVF failover protect distinct roles.</text>

			<rect x="44" y="117" width="435" height="306" rx="20" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<rect x="521" y="117" width="435" height="306" rx="20" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="66" y="148" fill="#1a3768" fontSize="15" fontWeight="700">NORMAL OPERATION</text>
			<text x="543" y="148" fill="#1a3768" fontSize="15" fontWeight="700">AFTER R4 / AVF 4 FAILS</text>

			<rect x="77" y="174" width="166" height="81" rx="14" fill="#fff4df" stroke="#e8c98d" strokeWidth="2" />
			<text x="160" y="199" fill="#9a640e" fontSize="14" fontWeight="700" textAnchor="middle">R4 · AVG + AVF 4</text>
			<text x="160" y="221" fill="#526584" fontSize="11" textAnchor="middle">assigns vMAC 04</text>
			<text x="160" y="240" fill="#526584" fontSize="10" textAnchor="middle">highest priority (example)</text>
			<rect x="280" y="174" width="166" height="81" rx="14" fill="#f2eaff" stroke="#d8c6f1" strokeWidth="2" />
			<text x="363" y="199" fill="#7042b4" fontSize="14" fontWeight="700" textAnchor="middle">R3 · SVG + AVF 3</text>
			<text x="363" y="221" fill="#526584" fontSize="11" textAnchor="middle">ready to become AVG</text>
			<text x="363" y="240" fill="#526584" fontSize="10" textAnchor="middle">continues own forwarding role</text>
			<rect x="77" y="285" width="166" height="70" rx="14" fill="#eaf2ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="160" y="313" fill="#2853df" fontSize="13" fontWeight="700" textAnchor="middle">R1 + R2</text>
			<text x="160" y="335" fill="#526584" fontSize="11" textAnchor="middle">AVF 1 and AVF 2</text>
			<path d="M244 214h31" fill="none" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#glbp-failover-arrow)" />
			<text x="260" y="202" fill="#71819b" fontSize="9" textAnchor="middle">hello</text>
			<rect x="77" y="376" width="369" height="28" rx="14" fill="#fff" stroke="#cbd9ed" />
			<text x="261" y="395" fill="#526584" fontSize="10" fontWeight="700" textAnchor="middle">Host gateway remains 10.10.10.100</text>

			<rect x="554" y="174" width="166" height="81" rx="14" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="637" y="199" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">R3 · NEW AVG</text>
			<text x="637" y="221" fill="#526584" fontSize="11" textAnchor="middle">manages vMAC assignment</text>
			<text x="637" y="240" fill="#526584" fontSize="10" textAnchor="middle">also forwards as AVF 3</text>
			<rect x="757" y="174" width="166" height="81" rx="14" fill="#fff1f0" stroke="#e7a7a2" strokeWidth="2" />
			<text x="840" y="199" fill="#a33c35" fontSize="14" fontWeight="700" textAnchor="middle">R4 · FAILED</text>
			<text x="840" y="221" fill="#526584" fontSize="11" textAnchor="middle">AVG and AVF 4 lost</text>
			<text x="840" y="240" fill="#526584" fontSize="10" textAnchor="middle">vMAC 04 needs a forwarder</text>
			<path d="M720 213h30" fill="none" stroke="#18a36a" strokeWidth="2.5" markerEnd="url(#glbp-failover-green-arrow)" />
			<text x="735" y="200" fill="#71819b" fontSize="9" textAnchor="middle">failure</text>
			<rect x="554" y="285" width="369" height="70" rx="14" fill="#eaf2ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="738" y="313" fill="#2853df" fontSize="13" fontWeight="700" textAnchor="middle">A surviving AVF takes over vMAC 04</text>
			<text x="738" y="335" fill="#526584" fontSize="10" textAnchor="middle">Forwarder redundancy is separate from AVG election.</text>
			<path d="M637 257v21h101v-19" fill="none" stroke="#18a36a" strokeWidth="2" strokeDasharray="6 5" markerEnd="url(#glbp-failover-green-arrow)" />
			<rect x="554" y="376" width="369" height="28" rx="14" fill="#fff" stroke="#cbd9ed" />
			<text x="738" y="395" fill="#526584" fontSize="10" fontWeight="700" textAnchor="middle">Host keeps gateway IP; ARP / CAM mappings are refreshed as needed</text>

			<rect x="44" y="443" width="912" height="38" rx="14" fill="#eef5ff" />
			<text x="500" y="467" fill="#2853df" fontSize="12" fontWeight="700" textAnchor="middle">GLBP uses hello messages for peer/forwarder monitoring · IPv4 multicast 224.0.0.102 · UDP 3222</text>
		</svg>
	);
}

function RouterForwardingDecisionDiagram() {
	const routeRows = [
		{ prefix: "192.168.20.0/27", nextHop: "10.10.10.12", color: "#94a3b8" },
		{ prefix: "192.168.20.0/26", nextHop: "10.10.10.1", color: "#0878d1", selected: true },
		{ prefix: "192.168.20.0/25", nextHop: "10.10.10.11", color: "#94a3b8" },
		{ prefix: "192.168.0.0/19", nextHop: "10.10.10.13", color: "#94a3b8" },
		{ prefix: "0.0.0.0/0", nextHop: "10.10.10.14", color: "#94a3b8" },
	];

	return (
		<svg viewBox="0 0 1080 610" role="img" aria-labelledby="router-forwarding-diagram-title router-forwarding-diagram-description" className="mx-auto h-auto w-full">
			<title id="router-forwarding-diagram-title">How a router chooses a route for a packet</title>
			<desc id="router-forwarding-diagram-description">A packet for 192.168.20.57 reaches a router. The router checks installed route prefixes and chooses 192.168.20.0 slash 26 via 10.10.10.1 as the longest matching prefix. Administrative distance and routing-protocol metrics are used earlier when selecting routes for the routing table.</desc>
			<defs>
				<linearGradient id="route-card-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#f4f8ff" />
					<stop offset="100%" stopColor="#e8f1ff" />
				</linearGradient>
				<linearGradient id="route-router-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#3578ec" />
					<stop offset="100%" stopColor="#1745b8" />
				</linearGradient>
				<marker id="route-arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="route-arrow-green" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#16a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="1064" height="594" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h1016a22 22 0 0 1 22 22v62H10z" fill="#1269c7" />
			<text x="46" y="57" fill="#fff" fontSize="26" fontWeight="700">Router Forwarding · From Packet to Next Hop</text>
			<text x="46" y="81" fill="#dcecff" fontSize="14">The installed routing table is checked against the destination address.</text>

			<rect x="40" y="130" width="210" height="130" rx="18" fill="url(#route-card-bg)" stroke="#b9d2f3" strokeWidth="2" />
			<circle cx="83" cy="179" r="22" fill="#fff" stroke="#83afea" strokeWidth="2" />
			<rect x="62" y="170" width="42" height="28" rx="4" fill="#2373d5" />
			<path d="M57 204h52l-6 7H63z" fill="#174da9" />
			<text x="121" y="172" fill="#1a3768" fontSize="15" fontWeight="700">Host A</text>
			<text x="121" y="194" fill="#526584" fontSize="13">Source network</text>
			<rect x="57" y="222" width="176" height="25" rx="12" fill="#fff" />
			<text x="145" y="239" fill="#2853df" fontSize="13" fontWeight="700" textAnchor="middle">Destination 192.168.20.57</text>

			<path d="M250 195h110" fill="none" stroke="#2872dc" strokeWidth="5" markerEnd="url(#route-arrow-blue)" />
			<rect x="270" y="160" width="75" height="24" rx="12" fill="#e7f0ff" />
			<text x="307" y="177" fill="#2853df" fontSize="12" fontWeight="700" textAnchor="middle">IP packet</text>

			<circle cx="447" cy="195" r="76" fill="#e6efff" />
			<circle cx="447" cy="195" r="62" fill="url(#route-router-bg)" />
			<rect x="412" y="183" width="70" height="39" rx="7" fill="#fff" />
			<path d="M421 194h13m8 0h13m8 0h9M421 207h13m8 0h13m8 0h9" stroke="#2872dc" strokeWidth="4" strokeLinecap="round" />
			<circle cx="426" cy="229" r="4" fill="#72e3ad" />
			<circle cx="439" cy="229" r="4" fill="#72e3ad" />
			<text x="447" y="286" fill="#1a3768" fontSize="15" fontWeight="700" textAnchor="middle">Router R1</text>
			<text x="447" y="305" fill="#71819b" fontSize="12" textAnchor="middle">Reads destination IP</text>

			<path d="M523 195h100" fill="none" stroke="#16a36a" strokeWidth="5" markerEnd="url(#route-arrow-green)" />
			<rect x="532" y="156" width="83" height="27" rx="13" fill="#e5f8ef" />
			<text x="573" y="174" fill="#118153" fontSize="12" fontWeight="700" textAnchor="middle">Longest match</text>

			<rect x="630" y="120" width="410" height="248" rx="17" fill="#fff" stroke="#cfe0f5" strokeWidth="2" />
			<path d="M632 137a15 15 0 0 1 15-15h376a15 15 0 0 1 15 15v37H632z" fill="#edf4ff" />
			<text x="653" y="151" fill="#1a3768" fontSize="16" fontWeight="700">R1 · Installed routing table</text>
			<text x="653" y="168" fill="#71819b" fontSize="11">DESTINATION PREFIX</text>
			<text x="874" y="168" fill="#71819b" fontSize="11">NEXT HOP</text>
			{routeRows.map((route, index) => {
				const y = 181 + index * 34;
				return (
					<g key={route.prefix}>
						{route.selected && <rect x="642" y={y - 2} width="386" height="30" rx="8" fill="#e8f8ef" stroke="#60c795" />}
						<circle cx="657" cy={y + 12} r="4" fill={route.color} />
						<text x="670" y={y + 16} fill={route.selected ? "#117447" : "#526584"} fontSize="13" fontWeight={route.selected ? "700" : "500"}>{route.prefix}</text>
						<text x="874" y={y + 16} fill={route.selected ? "#117447" : "#71819b"} fontSize="13" fontWeight={route.selected ? "700" : "500"}>{route.nextHop}</text>
						{route.selected && <text x="1004" y={y + 16} fill="#117447" fontSize="10" fontWeight="700" textAnchor="end">BEST</text>}
					</g>
				);
			})}

			<path d="M836 370v30" fill="none" stroke="#16a36a" strokeWidth="4" markerEnd="url(#route-arrow-green)" />
			<rect x="40" y="414" width="1000" height="151" rx="18" fill="#f7faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="64" y="446" fill="#1a3768" fontSize="16" fontWeight="700">Two decisions happen at different times</text>

			<rect x="64" y="463" width="425" height="76" rx="13" fill="#fff" stroke="#b9d2f3" strokeWidth="2" />
			<circle cx="91" cy="490" r="15" fill="#e8f1ff" />
			<text x="91" y="495" fill="#2853df" fontSize="13" fontWeight="700" textAnchor="middle">1</text>
			<text x="117" y="488" fill="#1a3768" fontSize="14" fontWeight="700">Install a route · AD, then protocol metric</text>
			<text x="117" y="512" fill="#526584" fontSize="12">Choose among competing routes to the same prefix.</text>

			<path d="M494 501h76" fill="none" stroke="#8ba9d2" strokeWidth="3" markerEnd="url(#route-arrow-blue)" />
			<rect x="583" y="463" width="433" height="76" rx="13" fill="#edfaf3" stroke="#8bd0ad" strokeWidth="2" />
			<circle cx="610" cy="490" r="15" fill="#d7f4e5" />
			<text x="610" y="495" fill="#118153" fontSize="13" fontWeight="700" textAnchor="middle">2</text>
			<text x="636" y="488" fill="#117447" fontSize="14" fontWeight="700">Forward a packet · longest-prefix match</text>
			<text x="636" y="512" fill="#526584" fontSize="12">Among installed routes, use the most specific match.</text>
			<text x="540" y="584" fill="#118153" fontSize="13" fontWeight="700" textAnchor="middle">192.168.20.57 matches /26 → forward toward 10.10.10.1</text>
		</svg>
	);
}

function OspfAreaExchangeDiagram() {
	const routers = [
		{ x: 355, y: 260, id: "R1", rid: "1.1.1.1", role: "ABR", color: "#2563c7" },
		{ x: 145, y: 385, id: "R2", rid: "2.2.2.2", role: "Internal", color: "#2563c7" },
		{ x: 650, y: 260, id: "R3", rid: "3.3.3.3", role: "Internal", color: "#17855b" },
		{ x: 900, y: 385, id: "R4", rid: "4.4.4.4", role: "Internal", color: "#17855b" },
	];

	return (
		<svg viewBox="0 0 1080 690" role="img" aria-labelledby="ospf-area-diagram-title ospf-area-diagram-description" className="mx-auto h-auto w-full">
			<title id="ospf-area-diagram-title">OSPF neighbor exchange and area topology</title>
			<desc id="ospf-area-diagram-description">Four OSPF routers form adjacencies across Area 0 and Area 1. R1 connects the areas as an area border router. Routers exchange Hello, database description, link-state request, link-state update, and acknowledgement packets, then synchronize a link-state database and run SPF.</desc>
			<defs>
				<linearGradient id="ospf-backbone-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#edf5ff" />
					<stop offset="100%" stopColor="#dceaff" />
				</linearGradient>
				<linearGradient id="ospf-area-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#effaf5" />
					<stop offset="100%" stopColor="#ddf4e9" />
				</linearGradient>
				<marker id="ospf-arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#3278d5" />
				</marker>
				<marker id="ospf-arrow-green" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="1064" height="674" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h1016a22 22 0 0 1 22 22v62H10z" fill="#1269c7" />
			<text x="44" y="58" fill="#fff" fontSize="25" fontWeight="700">OSPF · Neighbors Build a Shared Link-State View</text>
			<text x="44" y="81" fill="#dcecff" fontSize="14">Routers exchange topology information, synchronize an LSDB per area, then calculate shortest paths.</text>

			<rect x="38" y="121" width="440" height="365" rx="22" fill="url(#ospf-backbone-bg)" stroke="#90b8ed" strokeWidth="2" />
			<text x="62" y="153" fill="#20549a" fontSize="17" fontWeight="700">AREA 0 · BACKBONE</text>
			<text x="62" y="175" fill="#6683a8" fontSize="12">Backbone area for inter-area routing</text>
			<rect x="500" y="121" width="542" height="365" rx="22" fill="url(#ospf-area-bg)" stroke="#8fd2b0" strokeWidth="2" />
			<text x="526" y="153" fill="#13754e" fontSize="17" fontWeight="700">AREA 1</text>
			<text x="526" y="175" fill="#628b79" fontSize="12">A separate area with its own LSDB</text>

			<path d="M320 281L180 364M398 260h209M683 281L872 364" fill="none" stroke="#7b9fc9" strokeWidth="5" />
			<path d="M320 281L180 364M398 260h209M683 281L872 364" fill="none" stroke="#3278d5" strokeWidth="2" strokeDasharray="8 7" markerEnd="url(#ospf-arrow-blue)" />
			<rect x="425" y="226" width="145" height="25" rx="12" fill="#fff" />
			<text x="497" y="243" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">Hello · DBD · LSU</text>
			<rect x="705" y="139" width="305" height="56" rx="13" fill="#fff" stroke="#b8d8c7" />
			<text x="858" y="162" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">R1 is the ABR between Area 0 and Area 1</text>
			<text x="858" y="181" fill="#628b79" fontSize="11" textAnchor="middle">Inter-area route information passes through the backbone.</text>

			{routers.map((router) => (
				<g key={router.id}>
					<circle cx={router.x} cy={router.y} r="43" fill="#fff" stroke={router.color} strokeWidth="3" />
					<circle cx={router.x} cy={router.y} r="34" fill={router.color} />
					<rect x={router.x - 17} y={router.y - 7} width="34" height="20" rx="4" fill="#fff" />
					<path d={`M${router.x - 11} ${router.y}h7m5 0h7m5 0h4M${router.x - 11} ${router.y + 8}h7m5 0h7m5 0h4`} stroke={router.color} strokeWidth="2.5" strokeLinecap="round" />
					<rect x={router.x - 53} y={router.y + 51} width="106" height="50" rx="12" fill="#fff" stroke={router.color} strokeWidth="1.5" />
					<text x={router.x} y={router.y + 70} fill="#1a3768" fontSize="13" fontWeight="700" textAnchor="middle">{router.id} · RID {router.rid}</text>
					<text x={router.x} y={router.y + 89} fill={router.color} fontSize="11" fontWeight="700" textAnchor="middle">{router.role}</text>
				</g>
			))}

			<rect x="704" y="207" width="310" height="218" rx="18" fill="#fff" stroke="#b7dbc8" strokeWidth="2" />
			<text x="728" y="239" fill="#1a3768" fontSize="16" fontWeight="700">What each router does</text>
			<circle cx="733" cy="273" r="12" fill="#e8f1ff" />
			<text x="733" y="278" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">1</text>
			<text x="755" y="278" fill="#526584" fontSize="13">Discover neighbors with Hello</text>
			<circle cx="733" cy="313" r="12" fill="#e8f1ff" />
			<text x="733" y="318" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">2</text>
			<text x="755" y="318" fill="#526584" fontSize="13">Synchronize link-state information</text>
			<circle cx="733" cy="353" r="12" fill="#e5f8ef" />
			<text x="733" y="358" fill="#118153" fontSize="11" fontWeight="700" textAnchor="middle">3</text>
			<text x="755" y="358" fill="#526584" fontSize="13">Run SPF and install best routes</text>
			<path d="M734 388h250" stroke="#d7e6de" strokeWidth="1.5" />
			<text x="728" y="407" fill="#628b79" fontSize="11">Area 0 links areas; R1 is the ABR.</text>

			<rect x="38" y="500" width="1004" height="148" rx="18" fill="#f7faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="60" y="530" fill="#1a3768" fontSize="16" fontWeight="700">The OSPF packet exchange</text>
			<text x="60" y="550" fill="#71819b" fontSize="11">Five packet types coordinate adjacency and reliable database synchronization. LSAs are carried inside Link-State Update packets.</text>
			{[
				{ x: 58, title: "1 · Hello", detail: "Discover & keep neighbors", fill: "#e8f1ff", ink: "#2853df" },
				{ x: 254, title: "2 · DBD", detail: "Summarize the LSDB", fill: "#e8f1ff", ink: "#2853df" },
				{ x: 450, title: "3 · LSR", detail: "Request missing details", fill: "#fff4df", ink: "#ad6b08" },
				{ x: 646, title: "4 · LSU", detail: "Send requested/new LSAs", fill: "#e5f8ef", ink: "#118153" },
				{ x: 842, title: "5 · LSAck", detail: "Acknowledge received LSAs", fill: "#f0eaff", ink: "#7042b4" },
			].map((packet) => (
				<g key={packet.title}>
					<rect x={packet.x} y="571" width="180" height="58" rx="13" fill={packet.fill} />
					<text x={packet.x + 90} y="594" fill={packet.ink} fontSize="13" fontWeight="700" textAnchor="middle">{packet.title}</text>
					<text x={packet.x + 90} y="614" fill="#526584" fontSize="10" textAnchor="middle">{packet.detail}</text>
				</g>
			))}
		</svg>
	);
}

function OspfDatabaseSyncDiagram() {
	return (
		<svg viewBox="0 0 1000 650" role="img" aria-labelledby="ospf-sync-title ospf-sync-description" className="mx-auto h-auto w-full">
			<title id="ospf-sync-title">OSPF neighbor discovery and link-state database synchronization</title>
			<desc id="ospf-sync-description">R1 and R2 exchange Hello packets, negotiate database description exchange with the higher router ID as master, request missing link-state advertisements, send them inside Link-State Updates, acknowledge their receipt, synchronize their link-state databases, and independently run SPF.</desc>
			<defs>
				<linearGradient id="ospf-sync-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="ospf-sync-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="ospf-sync-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#17a36b" />
				</marker>
				<marker id="ospf-sync-orange-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#d28a16" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="634" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v61H10z" fill="url(#ospf-sync-header)" />
			<text x="42" y="57" fill="#fff" fontSize="24" fontWeight="700">OSPF · Neighbor Discovery to Synchronized LSDB</text>
			<text x="42" y="79" fill="#dcecff" fontSize="13">Example point-to-point exchange · both routers must agree on link parameters</text>

			<rect x="55" y="116" width="390" height="75" rx="16" fill="#edf4ff" stroke="#a9c7ef" strokeWidth="2" />
			<circle cx="94" cy="153" r="24" fill="#2868bd" />
			<path d="M82 149h24v14H82zM86 145h16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
			<text x="132" y="148" fill="#183d73" fontSize="16" fontWeight="700">R1 · RID 1.1.1.1</text>
			<text x="132" y="171" fill="#627b9e" fontSize="12">OSPF interface · Area 0</text>
			<rect x="555" y="116" width="390" height="75" rx="16" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<circle cx="594" cy="153" r="24" fill="#18865d" />
			<path d="M582 149h24v14h-24zM586 145h16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
			<text x="632" y="148" fill="#176847" fontSize="16" fontWeight="700">R2 · RID 2.2.2.2</text>
			<text x="632" y="171" fill="#628b79" fontSize="12">OSPF interface · Area 0</text>
			<text x="500" y="145" fill="#71819b" fontSize="11" textAnchor="middle">SHARED LINK</text>
			<text x="500" y="163" fill="#71819b" fontSize="11" textAnchor="middle">same subnet</text>
			<text x="500" y="179" fill="#71819b" fontSize="11" textAnchor="middle">matching timers</text>

			<rect x="55" y="215" width="890" height="288" rx="18" fill="#f8faff" stroke="#d5e3f5" strokeWidth="2" />
			<text x="80" y="246" fill="#1a3768" fontSize="16" fontWeight="700">Neighbor exchange sequence</text>

			<circle cx="91" cy="280" r="13" fill="#e5efff" />
			<text x="91" y="285" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">1</text>
			<text x="115" y="285" fill="#1a3768" fontSize="13" fontWeight="700">HELLO</text>
			<path d="M270 278h425" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ospf-sync-blue-arrow)" />
			<path d="M695 294H270" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ospf-sync-blue-arrow)" />
			<text x="480" y="272" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">discover · agree on neighbor parameters</text>
			<text x="480" y="312" fill="#71819b" fontSize="10" textAnchor="middle">On IPv4 multiaccess links: 224.0.0.5 · DR/BDR election when applicable</text>

			<circle cx="91" cy="343" r="13" fill="#e5efff" />
			<text x="91" y="348" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">2</text>
			<text x="115" y="348" fill="#1a3768" fontSize="13" fontWeight="700">DBD</text>
			<path d="M270 345h425" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ospf-sync-blue-arrow)" />
			<path d="M695 361H270" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#ospf-sync-blue-arrow)" />
			<text x="480" y="338" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">compare LSA summaries · higher RID becomes DBD master</text>
			<text x="480" y="379" fill="#71819b" fontSize="10" textAnchor="middle">The master controls DBD sequence numbers during database exchange.</text>

			<circle cx="91" cy="411" r="13" fill="#fff3dc" />
			<text x="91" y="416" fill="#aa6a0b" fontSize="11" fontWeight="700" textAnchor="middle">3</text>
			<text x="115" y="416" fill="#1a3768" fontSize="13" fontWeight="700">LSR</text>
			<path d="M270 412h425" fill="none" stroke="#d28a16" strokeWidth="3" markerEnd="url(#ospf-sync-orange-arrow)" />
			<text x="480" y="405" fill="#aa6a0b" fontSize="11" fontWeight="700" textAnchor="middle">request specific missing or newer LSAs</text>

			<circle cx="91" cy="453" r="13" fill="#e4f7ed" />
			<text x="91" y="458" fill="#118153" fontSize="11" fontWeight="700" textAnchor="middle">4</text>
			<text x="115" y="458" fill="#1a3768" fontSize="13" fontWeight="700">LSU</text>
			<path d="M695 452H270" fill="none" stroke="#17a36b" strokeWidth="3" markerEnd="url(#ospf-sync-green-arrow)" />
			<text x="480" y="446" fill="#118153" fontSize="11" fontWeight="700" textAnchor="middle">send requested LSAs inside an Update</text>

			<circle cx="91" cy="484" r="13" fill="#f0eaff" />
			<text x="91" y="489" fill="#7042b4" fontSize="11" fontWeight="700" textAnchor="middle">5</text>
			<text x="115" y="489" fill="#1a3768" fontSize="13" fontWeight="700">LSAck</text>
			<path d="M270 484h425" fill="none" stroke="#8257c8" strokeWidth="3" markerEnd="url(#ospf-sync-blue-arrow)" />
			<text x="480" y="479" fill="#7042b4" fontSize="11" fontWeight="700" textAnchor="middle">reliably acknowledge LSAs · no TCP session</text>

			<path d="M240 503v24h260M760 503v24H500" fill="none" stroke="#9ab1ce" strokeWidth="2" strokeDasharray="6 5" />
			<rect x="55" y="535" width="400" height="76" rx="15" fill="#edf4ff" stroke="#a9c7ef" strokeWidth="2" />
			<text x="255" y="562" fill="#183d73" fontSize="14" fontWeight="700" textAnchor="middle">R1 · synchronized area LSDB</text>
			<text x="255" y="585" fill="#526584" fontSize="12" textAnchor="middle">R1 and R2 topology LSAs are present</text>
			<rect x="545" y="535" width="400" height="76" rx="15" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="745" y="562" fill="#176847" fontSize="14" fontWeight="700" textAnchor="middle">R2 · synchronized area LSDB</text>
			<text x="745" y="585" fill="#526584" fontSize="12" textAnchor="middle">same area topology data · local routes differ</text>
			<rect x="386" y="617" width="228" height="21" rx="10" fill="#e7f0ff" />
			<text x="500" y="632" fill="#2853df" fontSize="11" fontWeight="700" textAnchor="middle">Each router runs SPF independently</text>
		</svg>
	);
}

function RouterForwardingLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">From destination address to next hop</h2>
				<p className="mt-3">
					When a router receives an IP packet, it checks the destination address against its installed
					routes. The selected route tells the router where to send the packet next; it does not usually
					describe the packet’s entire end-to-end journey.
				</p>
				<TutorialDiagramFrame caption="The destination 192.168.20.57 matches several installed prefixes. The /26 is the most specific match, so R1 forwards toward 10.10.10.1.">
					<RouterForwardingDecisionDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3">
					A routing table can contain overlapping networks with different prefix lengths. These are
					different entries, not duplicates: each one describes a different destination range and may
					have a different next hop.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What happens before a route is installed?</h2>
				<p className="mt-3">
					A router may learn the same destination prefix from multiple sources. Each routing protocol
					first evaluates paths using its own metric. Metrics belong to their protocol, so an OSPF cost
					cannot be directly compared with a RIP hop count or an EIGRP metric.
				</p>
				<p className="mt-3">
					When candidate routes for the same prefix come from different sources, administrative distance
					(AD) is used to compare how trustworthy those sources are; the lower AD is preferred. On common
					Cisco IPv4 configurations, connected routes have AD 0, static routes typically have AD 1,
					EIGRP internal routes 90, OSPF routes 110, and RIP routes 120. These defaults can vary by
					platform or configuration.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[560px] border-collapse text-left text-sm">
						<thead className="bg-[#e6f3ff] text-[#104c87]">
							<tr>
								<th scope="col" className="px-4 py-3 font-bold">Candidate for 192.168.1.0/24</th>
								<th scope="col" className="px-4 py-3 font-bold">AD</th>
								<th scope="col" className="px-4 py-3 font-bold">Result</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-t border-[#dbe5f5]">
								<td className="px-4 py-3">OSPF · next hop 10.1.1.1</td>
								<td className="px-4 py-3">110</td>
								<td className="px-4 py-3">Not selected</td>
							</tr>
							<tr className="border-t border-[#dbe5f5]">
								<td className="px-4 py-3">RIP · next hop 10.1.2.1</td>
								<td className="px-4 py-3">120</td>
								<td className="px-4 py-3">Not selected</td>
							</tr>
							<tr className="border-t border-[#dbe5f5] bg-[#edfaf3]">
								<td className="px-4 py-3 font-semibold text-[#117447]">EIGRP · next hop 10.1.3.1</td>
								<td className="px-4 py-3 font-semibold text-[#117447]">90</td>
								<td className="px-4 py-3 font-semibold text-[#117447]">Preferred source · lower AD</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					If one protocol has multiple paths to the same prefix, that protocol compares those paths
					using its own metric. For example, an EIGRP path with a metric of 25,000 is preferred over an
					EIGRP path with a metric of 30,000. Depending on the protocol and configuration, equal-cost
					paths may also be installed for load sharing.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Forwarding uses the longest matching prefix</h2>
				<p className="mt-3">
					Once routes have been installed, the router compares the packet’s destination against those
					routes. If more than one prefix matches, it chooses the one with the greatest prefix length,
					also called the longest-prefix match. AD and routing-protocol metrics are not used to rank
					overlapping, already-installed prefixes during this lookup.
				</p>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">192.168.20.0/27:</strong> covers addresses from
						192.168.20.0 through 192.168.20.31. The destination 192.168.20.57 is outside this range.
					</li>
					<li className="rounded-xl border border-[#8bd0ad] bg-[#edfaf3] p-4 leading-7">
						<strong className="text-[#117447]">192.168.20.0/26:</strong> covers 192.168.20.0 through
						192.168.20.63. It matches the destination and is more specific than the matching /25, /19,
						and default route, so R1 uses its next hop, 10.10.10.1.
					</li>
				</ol>
				<p className="mt-4">
					To verify the routes and prefixes on a Cisco router, use <code className="rounded bg-[#f1f6ff] px-2 py-1 text-sm text-[#104c87]">show ip route</code>.
					Comfort with subnet ranges makes it easier to see which entries match a destination.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaway</h2>
				<p className="mt-3 leading-7">
					Routing protocols select their preferred paths with protocol-specific metrics; administrative
					distance compares competing sources for the same prefix. After routes enter the routing table,
					the packet is forwarded using the most specific installed prefix that matches its destination.
				</p>
			</section>
		</div>
	);
}

function OspfLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What OSPF does</h2>
				<p className="mt-3">
					Open Shortest Path First (OSPF) is an open-standard interior gateway protocol (IGP) used to
					exchange routes within an autonomous system. It is a link-state protocol: each router describes
					its local connections, and routers in an area use the collected topology information to build
					a common link-state database (LSDB).
				</p>
				<p className="mt-3">
					When the topology changes, OSPF distributes updated link-state information rather than
					periodically sending a complete routing table. Each router runs the Shortest Path First (SPF)
					algorithm, based on Dijkstra’s algorithm, against its LSDB and then offers the resulting routes
					to the IP routing table. OSPF’s metric is cost; on Cisco devices, its default calculation is
					based on reference bandwidth and interface bandwidth, and can be configured.
				</p>
				<TutorialDiagramFrame caption="Routers form adjacencies, synchronize area link-state information, and run SPF. OSPF packets carry the exchange; LSAs describe topology.">
					<OspfAreaExchangeDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">The five OSPF packet types</h2>
				<p className="mt-3">
					OSPF uses five packet types to discover neighbors and synchronize databases. Do not confuse
					these packet types with link-state advertisements (LSAs): LSAs are topology records carried
					inside Link-State Update packets.
				</p>
				<div className="mt-5 space-y-3">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">1. Hello:</strong> discovers and maintains neighbors.
						On broadcast multiaccess networks, such as Ethernet, Hello packets also support DR and BDR
						election.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">2. Database Description (DBD/DD):</strong> summarizes
						LSA headers in a router’s database so peers can compare what they know.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">3. Link-State Request (LSR):</strong> asks a neighbor
						for specific LSAs that are missing or out of date.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">4. Link-State Update (LSU):</strong> carries one or
						more LSAs to answer requests or advertise updated topology information.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">5. Link-State Acknowledgment (LSAck):</strong>
						confirms receipt of LSAs, supporting reliable flooding.
					</div>
				</div>
				<p className="mt-4">
					For OSPFv2 on IPv4 networks, routers use multicast 224.0.0.5 to reach all OSPF routers on a
					link; designated and backup designated routers also use 224.0.0.6. OSPFv3 uses different
					multicast addresses.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How neighbors become fully adjacent</h2>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">Discover:</strong> routers send Hello packets on
						OSPF-enabled interfaces. Matching area and network settings allow them to recognize one
						another as neighbors.
					</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">Compare:</strong> on eligible links, neighbors exchange
						DBD summaries to identify missing or newer LSAs.
					</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">Synchronize:</strong> routers use LSRs to request
						specific information, LSUs to send it, and LSAcks to acknowledge it.
					</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">Calculate:</strong> each router runs SPF on its
						area’s LSDB and calculates its own best paths. The topology database is shared; the
						resulting routing table is local to each router.
					</li>
				</ol>
				<TutorialDiagramFrame caption="Example point-to-point database synchronization. The DBD summarizes LSAs; an LSR requests missing records, an LSU carries them, and an LSAck confirms receipt.">
					<OspfDatabaseSyncDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4">
					To become neighbors, routers must agree on essential link settings. These commonly include
					the area ID, compatible subnet and network type, Hello and dead intervals, authentication,
					and relevant OSPF options. A mismatch can prevent neighbor formation; an MTU mismatch can
					also stop database exchange from reaching Full state.
				</p>
				<p className="mt-4">
					Not every pair of routers on a broadcast segment forms a full adjacency. The DR and BDR reduce
					the number of database exchange relationships on multiaccess networks. Point-to-point links
					do not elect a DR or BDR.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Three views of OSPF state</h2>
				<p className="mt-3">
					Think of OSPF as maintaining neighbor relationships, a topology database, and a locally
					calculated routing table. The LSDB is often called the topology table in introductory
					materials, but it stores LSAs rather than a simple list of every possible path.
				</p>
				<div className="mt-5 grid gap-4 md:grid-cols-3">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Neighbor state</h3>
						<p className="mt-2 text-sm leading-6">Tracks discovered OSPF routers, their state, router ID, and the interface or address where they are reachable.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#f0faf5] p-5">
						<h3 className="font-bold text-[#13754e]">Area LSDB</h3>
						<p className="mt-2 text-sm leading-6">Stores received LSAs that describe OSPF topology and reachability information for the area.</p>
					</div>
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
						<h3 className="font-bold text-[#9a640e]">Routing table</h3>
						<p className="mt-2 text-sm leading-6">Contains this router’s selected routes after SPF calculations and route-source comparisons.</p>
					</div>
				</div>
				<p className="mt-4">
					After synchronization, routers in the same area should have a consistent view of that
					area’s LSDB. Each router then runs SPF independently from its own position in the topology,
					so its next hops and resulting routing table can differ from its neighbors’.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Example: learning a remote LAN</h2>
				<p className="mt-3">
					Suppose R1 and R2 share an OSPF point-to-point link. R1 advertises its connected
					192.168.1.0/24 network in its Router LSA, and R2 advertises 192.168.2.0/24 in its Router
					LSA. Once those LSAs are flooded and synchronized, each router’s LSDB describes both routers
					and the link between them.
				</p>
				<p className="mt-3">
					R1 runs SPF and can calculate that 192.168.2.0/24 is reachable through R2 over the shared
					link. R1 may then install an OSPF route with R2 as the next hop or outgoing interface.
					R2 performs its own calculation for 192.168.1.0/24. Successful end-to-end communication
					also requires a valid return route and working interfaces.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Router IDs and LSAs</h2>
				<p className="mt-3">
					An OSPF router ID (RID) is a 32-bit identifier written in IPv4 address format. It identifies
					the OSPF router; it does not have to be an address assigned to a reachable interface. Choose
					it explicitly for predictable operations. If it is not manually configured, Cisco IOS
					selection generally prefers the highest IPv4 address on a loopback interface, then the
					highest IPv4 address on an active physical interface when no loopback address is available.
					The automatic choice is made when the OSPF process starts and may require a process restart
					or clear to take effect after configuration changes.
				</p>
				<p className="mt-3">
					For example, if a router has loopbacks 10.0.0.1 and 12.0.0.1 and active physical addresses
					192.168.1.1 and 200.200.200.1, automatic selection chooses 12.0.0.1 because loopbacks are
					preferred to physical interfaces. A manually configured router ID overrides automatic
					selection.
				</p>
				<p className="mt-3">
					An LSA describes a particular part of the topology; the LSDB stores the LSAs for an area.
					For example, a Router LSA describes a router’s OSPF links and their characteristics, while a
					Network LSA represents a transit network and is originated by its DR. Routers in the same
					area build matching area databases, then independently run SPF.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Areas, timers, and scalable design</h2>
				<p className="mt-3">
					Areas group routers and limit how much detailed topology information must be maintained and
					flooded throughout a large OSPF domain. Area 0 is the backbone. In a conventional multi-area
					design, an Area Border Router (ABR) connects Area 0 to one or more other areas and exchanges
					summarized reachability between them. OSPF also supports a single-area design.
				</p>
				<p className="mt-3">
					Hello and dead intervals depend on the OSPF network type and configuration, and neighboring
					routers generally need matching values. Common Cisco defaults are 10/40 seconds for broadcast
					and point-to-point networks, and often 30/120 seconds for NBMA networks; platform and interface
					settings can differ. Verify the actual interface configuration rather than assuming one
					interval applies everywhere.
				</p>
				<p className="mt-3">
					OSPF is classless: advertisements include prefix information, allowing variable-length subnet
					masks (VLSM) and route summarization where supported and configured. OSPFv2 is used for IPv4;
					OSPFv3 provides OSPF operation for IPv6 and has also been extended to support additional
					address families.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>OSPF is an open-standard link-state IGP that calculates paths using SPF.</li>
					<li>Hello, DBD, LSR, LSU, and LSAck are packet types; LSAs are records carried by LSUs.</li>
					<li>DBDs summarize the database; reliable LSU delivery is acknowledged with LSAcks.</li>
					<li>Neighbor state, the area LSDB, and each router’s routing table serve different purposes.</li>
					<li>Each router uses its area LSDB to calculate its own routes using OSPF cost.</li>
					<li>Router IDs identify routers; configure them explicitly for stable, predictable operation.</li>
					<li>Area 0 is the backbone, and ABRs connect the backbone to other areas.</li>
				</ul>
			</section>
		</div>
	);
}

function EigrpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What EIGRP does</h2>
				<p className="mt-3">
					Enhanced Interior Gateway Routing Protocol (EIGRP) is an advanced distance-vector interior
					gateway protocol. It learns routes from directly connected EIGRP neighbors and uses the
					Diffusing Update Algorithm (DUAL) to select loop-free paths. You may see EIGRP called
					“hybrid” in older material, but that label can be misleading: EIGRP is generally classified
					as an advanced distance-vector protocol, not a combination of distance-vector and link-state.
				</p>
				<p className="mt-3">
					EIGRP is classless: route information includes prefix length, so it supports VLSM and
					discontiguous subnets. Cisco made EIGRP specification information available to the public
					in 2013; for CCNA, the important behavior to understand is how Cisco IOS EIGRP exchanges
					routes and calculates loop-free paths. EIGRP can operate for IPv4 and IPv6; older references
					to AppleTalk and IPX describe legacy support, not typical modern CCNA deployments.
				</p>
				<p className="mt-3">
					Unlike a link-state protocol, EIGRP does not flood a complete network map to every router.
					It maintains relationships with neighbors, sends its known routes when a relationship is
					established, and then sends partial, triggered updates when reachability changes. Updates are
					sent only to relevant neighbors, helping limit unnecessary routing traffic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How EIGRP routers communicate</h2>
				<p className="mt-3">
					EIGRP runs directly over IP using IP protocol number 88. It does not use TCP or UDP.
					EIGRP’s Reliable Transport Protocol (RTP) tracks reliable EIGRP packets and their
					acknowledgments; RTP is not the same as the media-streaming protocol that shares its name.
					For IPv4, EIGRP commonly multicasts Hellos and updates to 224.0.0.10, the all-EIGRP-routers
					group on the local link. Some traffic, including acknowledgments and certain replies, is
					unicast. EIGRP for IPv6 uses IPv6 link-local addressing and multicast instead.
				</p>
				<TutorialDiagramFrame caption="EIGRP discovers peers with Hello packets, exchanges initial routes reliably, and sends triggered updates when reachability changes.">
					<EigrpNeighborExchangeDiagram />
				</TutorialDiagramFrame>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">The five EIGRP packet types</h3>
				<div className="mt-4 grid gap-3 sm:grid-cols-2">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-4">
						<strong className="text-[#1756a4]">Hello</strong>
						<p className="mt-1 text-sm leading-6">Discovers and maintains neighbors. Hellos are normally sent periodically and are not themselves acknowledged.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#f0faf5] p-4">
						<strong className="text-[#13754e]">Update</strong>
						<p className="mt-1 text-sm leading-6">Advertises routes. The initial exchange sends the neighbor its available routes; later updates are partial and triggered by changes.</p>
					</div>
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-4">
						<strong className="text-[#9a640e]">Acknowledgment (ACK)</strong>
						<p className="mt-1 text-sm leading-6">Confirms receipt of a reliable EIGRP packet. An ACK is an EIGRP packet with no route data and is normally unicast.</p>
					</div>
					<div className="rounded-xl border border-[#d8c6f1] bg-[#f7f2ff] p-4">
						<strong className="text-[#7042b4]">Query</strong>
						<p className="mt-1 text-sm leading-6">Asks neighbors for an alternate route when a destination has become unreachable and no usable feasible successor is available.</p>
					</div>
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-4 sm:col-span-2">
						<strong className="text-[#1756a4]">Reply</strong>
						<p className="mt-1 text-sm leading-6">Answers a Query with reachability information or reports that the destination is unavailable. Query and Reply exchanges are reliable and acknowledged.</p>
					</div>
				</div>
				<p className="mt-4">
					RTP can deliver EIGRP packets reliably or unreliably, depending on packet type and
					delivery requirements. Reliable packets are acknowledged; if an acknowledgment is not
					received, EIGRP can retransmit. This is EIGRP’s own reliability mechanism over IP—not a
					TCP connection.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Neighbor discovery and convergence</h2>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">1. Discover:</strong> an EIGRP-enabled interface
						sends Hello packets. A router adds a peer to its neighbor table when it receives
						compatible EIGRP Hellos on the shared link.
					</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">2. Check compatibility:</strong> routers must use
						the same EIGRP autonomous-system number for the classic configuration and matching
						metric K-values. They also need working interfaces in a compatible IP network; timers,
						authentication, and other interface or address-family settings must not prevent peering.
					</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">3. Exchange routes:</strong> neighbors send
						Updates, acknowledge reliable packets, and record learned paths in their topology tables.
						EIGRP does not exchange a link-state database.
					</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7">
						<strong className="text-[#172642]">4. Select and maintain paths:</strong> DUAL
						calculates the best successor and checks for loop-free feasible successors. Once
						converged, periodic Hellos continue to monitor neighbors; routing changes trigger
						appropriate partial updates instead of routine full-table refreshes.
					</li>
				</ol>
				<p className="mt-4">
					The EIGRP autonomous-system number is a routing-process identifier, not an IP address or
					the Internet’s public AS number. With classic IOS configuration, all intended neighbors
					must run the same EIGRP AS number on their shared link. K-values control which metric
					factors participate; incompatible K-values prevent the routers from becoming neighbors.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Three EIGRP tables</h2>
				<p className="mt-3">
					Each router maintains its own EIGRP state. Do not confuse the topology table, which holds
					candidate routes, with the IP routing table, which contains selected paths used to forward
					packets.
				</p>
				<div className="mt-5 grid gap-4 md:grid-cols-3">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Neighbor table</h3>
						<p className="mt-2 text-sm leading-6">Lists directly connected EIGRP peers and information such as their address, local interface, hold time, and sequence/retransmission state.</p>
					</div>
					<div className="rounded-xl border border-[#d8c6f1] bg-[#f7f2ff] p-5">
						<h3 className="font-bold text-[#7042b4]">Topology table</h3>
						<p className="mt-2 text-sm leading-6">Stores EIGRP-learned destinations and path information from neighbors, including successor and eligible feasible-successor candidates.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#f0faf5] p-5">
						<h3 className="font-bold text-[#13754e]">IP routing table</h3>
						<p className="mt-2 text-sm leading-6">Installs the selected EIGRP successor route when it wins route selection against other sources. This table drives packet forwarding.</p>
					</div>
				</div>
				<p className="mt-4">
					A topology change causes the router to update its local EIGRP information and notify
					affected peers as needed. Every router independently maintains its tables and chooses
					routes; there is no central EIGRP routing table shared by the whole network.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Metric: bandwidth and delay</h2>
				<p className="mt-3">
					EIGRP uses a composite metric. Its factors can include bandwidth, delay, reliability, and
					load, controlled by K-values. With Cisco’s default K-values, only minimum path bandwidth
					and cumulative path delay contribute to route selection; reliability and load are not used.
					Lower calculated metrics are preferred. All routers in the EIGRP domain should use
					consistent K-values so their calculations agree.
				</p>
				<p className="mt-3">
					Bandwidth is the configured bandwidth of the slowest link along a path, not a live
					measurement of current throughput. Delay is accumulated along the path. Because these
					interface values affect the routing metric, set them accurately for the link and avoid
					changing K-values casually—changing metric weights requires careful, consistent planning.
				</p>
				<div className="mt-5 rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
					<h3 className="font-bold text-[#9a640e]">Classic terminology: AD, RD, and FD</h3>
					<ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
						<li><strong>Reported distance (RD)</strong>, also called advertised distance in some material, is the neighbor’s metric from itself to the destination.</li>
						<li><strong>Feasible distance (FD)</strong> is the best known total metric from this router to the destination, including the route through its neighbor.</li>
						<li>In EIGRP contexts, “AD” is sometimes used as shorthand for advertised distance. Do not confuse that with administrative distance, which compares trust between different route sources.</li>
					</ul>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Successor, feasible successor, and DUAL</h2>
				<p className="mt-3">
					The <strong>successor</strong> is the best path selected by DUAL for a destination. It is
					normally installed in the IP routing table. A <strong>feasible successor</strong> is a
					neighbor’s alternate path that passes DUAL’s feasibility condition, making it a loop-free
					backup that can be used without waiting for a new network-wide search.
				</p>
				<TutorialDiagramFrame caption="Nevada’s route via Idaho is the successor (FD 90). The Oklahoma path qualifies as a feasible successor because its RD 70 is below the current successor FD 90.">
					<EigrpDualDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4">
					In the example, router A in Nevada can reach a destination in Iowa through neighbor B in
					Idaho. B reports a distance of 50; A’s link cost to B is 40, so that path’s total metric
					is 90. A’s other path is through neighbor C in Oklahoma: C reports 70 and A’s link cost to
					C is 60, giving a total metric of 130. The Idaho path is the successor because 90 is the
					lower total metric.
				</p>
				<p className="mt-3">
					The feasibility condition is <strong>neighbor RD &lt; current successor FD</strong>. Here,
					70 &lt; 90, so the Oklahoma path is a feasible successor and is kept as a backup in the
					topology table. If the successor fails, DUAL can promote that path quickly. A feasible
					successor is not ordinarily installed as a second route by default; unequal-cost
					load-balancing configuration can allow multiple qualifying paths to be used.
				</p>
				<p className="mt-3">
					If a successor becomes unavailable and there is no feasible successor, DUAL starts a
					diffusing computation. The router marks the route as active and queries neighbors for
					alternate reachability. Neighbors may answer from their own known paths or propagate
					queries. Replies let the router complete the computation and select a new successor—or
					mark the destination unreachable. This query/reply process is why feasible successors are
					useful: a valid backup can avoid the extra convergence work.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Basic Cisco IOS configuration</h2>
				<p className="mt-3">
					This classic-mode example enables EIGRP AS 10 on interfaces whose addresses fall within
					192.168.1.0/24. Apply compatible EIGRP configuration to the intended neighbor routers and
					adapt the interface networks and wildcard masks to the lab. The wildcard mask is the
					inverse of the subnet mask.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# router eigrp 10
Router(config-router)# network 192.168.1.0 0.0.0.255
Router(config-router)# end`}</code></pre>
				<p className="mt-3">
					The <code>router eigrp 10</code> command starts the classic EIGRP process for AS 10.
					The <code>network</code> statement enables EIGRP on matching local interfaces and advertises
					their connected networks. It does not mean the router should send Hello packets to every
					address in the range; EIGRP neighbor discovery occurs on EIGRP-enabled interfaces.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Verify neighbors, paths, and installed routes</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router# show ip eigrp neighbors
Router# show ip eigrp topology
Router# show ip route eigrp
Router# show ip protocols`}</code></pre>
				<p className="mt-3">
					Check the neighbor table first if a peer is missing. Confirm the AS number, K-values,
					interface status, addressing/subnet, and any authentication or passive-interface settings.
					Then inspect the topology table to see candidate paths and the routing table to confirm
					which EIGRP route was actually installed.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Unequal-cost load balancing</h2>
				<p className="mt-3">
					EIGRP can install more than one path to a destination when unequal-cost load balancing is
					configured. The <code>variance</code> setting allows eligible paths whose metric is within a
					configured multiple of the best metric to be considered. The alternative paths must still
					meet EIGRP’s loop-prevention and routing criteria; variance does not simply enable every
					known route. Consider bandwidth, topology, and traffic behavior before enabling it.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>EIGRP is an advanced distance-vector protocol and uses DUAL for loop-free route selection.</li>
					<li>Its five packet types are Hello, Update, ACK, Query, and Reply; it runs over IP protocol 88 rather than TCP/UDP.</li>
					<li>Neighbor, topology, and IP routing tables track peers, candidate routes, and installed routes respectively.</li>
					<li>Default metric calculation uses bandwidth and delay; keep K-values consistent between peers.</li>
					<li>The successor is the best route; a feasible successor must satisfy neighbor RD &lt; current successor FD.</li>
					<li>DUAL uses a feasible successor for fast repair, or Queries and Replies when it must find another path.</li>
					<li>EIGRP sends initial route information to neighbors and uses partial triggered updates for later changes.</li>
				</ul>
			</section>
		</div>
	);
}

function HsrpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why a network needs HSRP</h2>
				<p className="mt-3">
					Hosts on an IPv4 LAN send traffic for remote networks to a default gateway. If every
					workstation uses a physical router address such as 192.168.1.1, a failure of that router
					leaves the hosts with no working gateway. A second router alone does not solve the problem:
					hosts would still need their default-gateway setting changed to the second router.
				</p>
				<p className="mt-3">
					Hot Standby Router Protocol (HSRP) solves this first-hop availability problem by presenting
					a group of routers as one virtual gateway. Hosts are configured with the group’s virtual
					IP address. HSRP elects one router to be <strong>Active</strong> and forward traffic for
					the virtual gateway, and another to be <strong>Standby</strong> and monitor the Active
					router. If the Active router or its LAN interface fails, a suitable Standby router assumes
					the forwarding role without requiring a manual gateway change on each host.
				</p>
				<p className="mt-3">
					HSRP is a Cisco-developed first-hop redundancy protocol. It provides gateway redundancy
					on the shared LAN; it does not itself create Internet connectivity or guarantee that the
					new Active router has a working path beyond that LAN. Use interface or object tracking
					where appropriate so loss of an upstream path can influence the router’s HSRP priority.
				</p>
				<TutorialDiagramFrame caption="Both workstations use the same virtual gateway. R1 forwards as Active; R2 monitors the group and can take over.">
					<HsrpGatewayDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Virtual IP, virtual MAC, and forwarding</h2>
				<p className="mt-3">
					An HSRP group is configured on the routers’ interfaces connected to the same LAN. The
					routers have unique physical interface addresses, but members of the group agree on a
					virtual IP address in that subnet. That virtual IP is configured as the hosts’ default
					gateway—for example, 192.168.1.254—rather than either router’s physical IP.
				</p>
				<p className="mt-3">
					HSRP also provides a virtual MAC address for the group. Hosts resolve the virtual IP to
					this shared Layer 2 identity using ARP. The Active router responds for and forwards traffic
					to the virtual gateway; the Standby router listens for HSRP control messages but does not
					ordinarily forward traffic for that group. When a different router becomes Active, it
					takes over the virtual IP/MAC role and sends updates such as gratuitous ARP so LAN devices
					can refresh their neighbor mappings.
				</p>
				<p className="mt-3">
					The virtual addresses are distinct from the routers’ real interface addresses, which
					remain useful for management, routing-protocol adjacencies, and troubleshooting. Configure
					the same HSRP group number and virtual IP on all intended members of a LAN group, and
					ensure that the virtual IP is unused by any other device.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Election, priority, and preemption</h2>
				<p className="mt-3">
					HSRP uses group hellos to determine the Active and Standby roles. The router with the
					highest HSRP priority is preferred; the default priority is 100. If priorities tie, the
					highest interface IP address is used as the tie-breaker. One router becomes Active and
					one becomes Standby; additional members, if configured, remain in Listen when the group
					has settled.
				</p>
				<p className="mt-3">
					By default, a router with a higher priority does not necessarily take the Active role
					from a router that is already Active. The <strong>preempt</strong> option allows a higher
					priority router to reclaim that role when it returns or becomes eligible. Preemption can
					be deliberately delayed to allow links and routing to stabilize before the router takes
					over. If preemption is not enabled, the recovered router may remain Standby even when it
					has the higher priority.
				</p>
				<p className="mt-3">
					Priority can be reduced when a tracked interface or object fails. For example, if the
					current Active router loses its upstream connection, decrementing its priority may allow
					a healthy peer to become Active—provided the peer has a higher effective priority and
					preemption behavior is configured as intended. Tracking and preemption should be planned
					together and tested during failover.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">HSRP states</h2>
				<p className="mt-3">
					An HSRP router moves through protocol states as it starts, learns group information, and
					participates in the role election. The stable group does not place every router in the
					same state: normally one is Active, one is Standby, and any additional eligible members
					remain in Listen.
				</p>
				<TutorialDiagramFrame caption="HSRP state progression from startup to group operation. In a stable group, one router is Active, one is Standby, and any remaining members Listen.">
					<HsrpStatesDiagram />
				</TutorialDiagramFrame>
				<div className="mt-5 space-y-3">
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">Initial:</strong> HSRP has just started, or an interface/group configuration change has reset its operation.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">Learn:</strong> the router has not yet learned the virtual IP and is waiting for information from an Active router. It may learn the address from a received hello.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">Listen:</strong> the router knows the virtual IP but is neither Active nor Standby. It listens for hellos from the elected routers.
					</div>
					<div className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-4">
						<strong className="text-[#172642]">Speak:</strong> the router sends periodic hellos and participates in the election of Active and Standby routers.
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#f0faf5] p-4">
						<strong className="text-[#13754e]">Standby:</strong> the elected backup router monitors the Active router’s hellos and is prepared to take over.
					</div>
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-4">
						<strong className="text-[#1756a4]">Active:</strong> the elected router responds for and forwards traffic using the group’s virtual IP and MAC, and sends periodic hellos.
					</div>
				</div>
				<p className="mt-4">
					If the Standby router misses hellos from the Active router until the hold time expires,
					it proceeds to take over the Active role. If the Active router returns, priority and
					preemption determine whether it remains Standby or reclaims Active.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Hello timers and multicast</h2>
				<p className="mt-3">
					HSRP routers send hello messages so members can track each other’s state and role.
					Common defaults are a 3-second hello interval and a 10-second hold time. If the Standby
					router does not receive a valid hello from the Active router before the hold time expires,
					it treats the Active router as unavailable and can take over. Timers are configurable;
					use compatible values across group members and account for the trade-off between fast
					detection and sensitivity to transient loss.
				</p>
				<p className="mt-3">
					HSRP uses UDP port 1985. HSRPv1 sends IPv4 hello messages to multicast address
					224.0.0.2 (all routers on the local subnet). HSRPv2 uses 224.0.0.102. The multicast
					hello lets group members hear state announcements on their shared LAN; it is separate
					from the virtual IP address that hosts use as their gateway.
				</p>
				<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="min-w-full border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#17356d]">
							<tr>
								<th className="px-4 py-3 font-bold">Setting</th>
								<th className="px-4 py-3 font-bold">HSRP version 1</th>
								<th className="px-4 py-3 font-bold">HSRP version 2</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#dbe5f5]">
							<tr>
								<th className="px-4 py-3 font-semibold text-[#172642]">IPv4 hello multicast</th>
								<td className="px-4 py-3">224.0.0.2</td>
								<td className="px-4 py-3">224.0.0.102</td>
							</tr>
							<tr>
								<th className="px-4 py-3 font-semibold text-[#172642]">Virtual MAC pattern</th>
								<td className="px-4 py-3"><code>0000.0C07.ACxx</code></td>
								<td className="px-4 py-3"><code>0000.0C9F.Fxxx</code></td>
							</tr>
							<tr>
								<th className="px-4 py-3 font-semibold text-[#172642]">Group number range</th>
								<td className="px-4 py-3">0–255 (256 groups)</td>
								<td className="px-4 py-3">0–4095 (4096 groups)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p className="mt-4">
					In each MAC pattern, the hexadecimal group identifier is represented by the x digits.
					For example, HSRPv1 group 10 uses the virtual MAC <code>0000.0C07.AC0A</code> because
					decimal 10 is hexadecimal 0A. A platform may support a manually configured virtual MAC;
					when used, it must be unique on the LAN. Both versions use UDP 1985 for HSRP messages.
					HSRPv1 is a common default on many Cisco IOS configurations, but check the platform and
					software rather than assuming a universal default.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Cisco IOS configuration example</h2>
				<p className="mt-3">
					This example configures two routers on LAN 192.168.1.0/24. R1 uses physical address
					192.168.1.1, R2 uses 192.168.1.2, and both provide the virtual gateway 192.168.1.254
					in HSRP group 10. R1 has higher priority and is allowed to preempt. Configure the same
					virtual IP and HSRP version on both routers.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Router R1 · preferred Active router</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# interface GigabitEthernet0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# standby 10 ip 192.168.1.254
R1(config-if)# standby 10 priority 110
R1(config-if)# standby 10 preempt
R1(config-if)# no shutdown`}</code></pre>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Router R2 · Standby router</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R2(config)# interface GigabitEthernet0/0
R2(config-if)# ip address 192.168.1.2 255.255.255.0
R2(config-if)# standby 10 ip 192.168.1.254
R2(config-if)# standby 10 priority 100
R2(config-if)# standby 10 preempt
R2(config-if)# no shutdown`}</code></pre>
				<p className="mt-3">
					Hosts on this LAN use <code>192.168.1.254</code> as their default gateway. Since R1’s
					priority is 110 and R2’s is 100, R1 is preferred when both are available. Preemption on
					both routers makes the higher-priority R1 eligible to reclaim Active after it recovers.
					Exact command support and interface names vary by platform and IOS version.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Optional: use HSRPv2 and custom timers</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config-if)# standby version 2
Router(config-if)# standby 10 timers 1 4`}</code></pre>
				<p className="mt-3">
					Set the version consistently on all intended group members. The timer command uses the
					hello interval followed by the hold time, in seconds; configure matching values on peers.
					Do not shorten timers without considering CPU load, LAN loss, and the risk of unnecessary
					role changes.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Verify HSRP operation</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router# show standby
Router# show standby brief
Router# show running-config interface GigabitEthernet0/0`}</code></pre>
				<p className="mt-3">
					Confirm the expected group, virtual IP, local priority, Active and Standby addresses,
					hello/hold timers, and preemption setting. Test failover by taking down the Active
					interface in a controlled lab, then verify that the Standby becomes Active and that
					hosts can still reach their gateway. If the upstream path fails while the LAN interface
					remains up, HSRP may need tracking to select the router with a healthy path.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">HSRP failover: what changes and what stays</h2>
				<p className="mt-3">
					When the Active router fails, the Standby router waits for the configured hold time
					(unless it learns of the failure sooner through interface state or another mechanism),
					then transitions to Active. It begins forwarding traffic for the group’s virtual
					identity. The hosts retain the same default-gateway IP; they do not need to be
					reconfigured. There may be a brief convergence interval, and applications can still
					experience packet loss during detection and recovery.
				</p>
				<p className="mt-3">
					HSRP protects the first-hop gateway role, not every possible failure. Redundant power,
					switching, WAN links, routing, and upstream services must be designed separately.
					Use tracking to make gateway election reflect important interface or reachability
					failures, and validate both failover and failback behavior.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>HSRP gives an IPv4 LAN a resilient first-hop gateway using a virtual IP and virtual MAC.</li>
					<li>The Active router forwards for the group; the Standby router monitors it and can take over.</li>
					<li>Typical defaults are priority 100, hello 3 seconds, and hold time 10 seconds; platform configuration may vary.</li>
					<li>Priority selects the preferred router; preemption controls whether a higher-priority router can reclaim Active.</li>
					<li>HSRP has six states: Initial, Learn, Listen, Speak, Standby, and Active.</li>
					<li>HSRPv1 uses multicast 224.0.0.2 and MAC prefix 0000.0C07.AC; HSRPv2 uses 224.0.0.102 and 0000.0C9F.F.</li>
					<li>HSRPv1 supports groups 0–255; HSRPv2 supports groups 0–4095. Both use UDP port 1985.</li>
					<li>HSRP protects the gateway role; tracking may be needed to account for upstream failures.</li>
				</ul>
			</section>
		</div>
	);
}

function GlbpLessonContent() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why GLBP is different</h2>
				<p className="mt-3">
					Hosts need a default gateway to reach remote IP networks. First-hop redundancy protocols
					such as HSRP and VRRP protect that gateway by letting another router take over when the
					current gateway fails. In their common single-group operation, however, one gateway
					forwards traffic while the other group members wait as backups.
				</p>
				<p className="mt-3">
					Gateway Load Balancing Protocol (GLBP) combines first-hop redundancy with load sharing.
					It is Cisco-developed and, like HSRP, lets hosts use one virtual IP address as their
					default gateway. Unlike basic single-active HSRP/VRRP operation, GLBP can assign different
					virtual MAC addresses to hosts so multiple routers forward traffic at the same time. If
					a forwarder or gateway fails, a surviving member can take over its role while hosts keep
					the same virtual gateway IP.
				</p>
				<p className="mt-3">
					Multiple HSRP or VRRP groups can also distribute hosts across gateways, but that design
					requires multiple virtual gateway addresses and deliberate host or subnet placement. GLBP
					provides one shared gateway IP per GLBP group and performs the forwarder selection through
					the ARP response. GLBP is proprietary to Cisco and support is platform and software
					dependent; verify feature support on the target device.
				</p>
				<TutorialDiagramFrame caption="Four gateways can actively forward in one GLBP group while hosts share the same virtual IP default gateway.">
					<GlbpLoadDistributionDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">AVG and AVF roles</h2>
				<p className="mt-3">
					GLBP members first elect an <strong>Active Virtual Gateway (AVG)</strong>. The AVG is the
					control-plane coordinator for the group: it answers ARP requests for the group’s virtual
					IP and assigns virtual MAC addresses to the forwarders. Election uses GLBP priority; the
					default priority is 100, and a tie is resolved using the highest real interface IP
					address. Preemption controls whether a higher-priority gateway can take or reclaim the
					AVG role after it becomes available.
				</p>
				<p className="mt-3">
					The gateway selected as the next AVG backup is the <strong>Standby Virtual Gateway
					(SVG)</strong>. The SVG monitors the AVG and can assume that role if the AVG fails. The
					AVG is not necessarily the only router forwarding user traffic: it is also normally an
					Active Virtual Forwarder, or AVF, but other group members can be AVFs too.
				</p>
				<p className="mt-3">
					An <strong>Active Virtual Forwarder (AVF)</strong> owns a virtual MAC address and forwards
					frames sent to that MAC. One GLBP group can have up to four active virtual forwarders.
					When more gateways participate than can be active forwarders, additional members can
					remain standby forwarders (SVFs), ready to take over a failed forwarder assignment.
					The SVG and SVF are different backup roles: SVG backs up the AVG control-plane role,
					while SVF backs up an AVF’s forwarding role. A router can hold more than one role at once,
					such as being both SVG and AVF.
				</p>
				<p className="mt-3">
					The administrator configures one virtual IP address for the GLBP group. The AVG allocates
					virtual MAC addresses to the AVFs. Their format is <code>0007.B400.xxyy</code>, where
					<code> xx</code> represents the GLBP group identifier and <code>yy</code> identifies the
					forwarder. For example, group 10 and forwarder 1 can be represented as
					<code> 0007.B400.0A01</code>. Exact displayed formatting is commonly grouped in Cisco
					dotted hexadecimal notation.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How GLBP distributes traffic</h2>
				<p className="mt-3">
					Each host is configured with the same GLBP virtual IP as its default gateway. When a
					host first needs to send to a remote network, it broadcasts an ARP request asking for
					the MAC address associated with that virtual IP. The AVG answers, but the reply can
					contain a different AVF virtual MAC for different ARP requests. The host caches the
					virtual MAC and sends its Ethernet frames to that forwarder. Thus, the host’s IP-layer
					default gateway stays the same while its Layer 2 next hop selects which router forwards
					its traffic.
				</p>
				<p className="mt-3">
					In a simple round-robin example, the AVG may answer successive host ARP requests with
					virtual MACs for AVF 1, AVF 2, AVF 3, then AVF 4, and repeat. The host that learns
					forwarder 2’s virtual MAC sends frames to AVF 2; another host may learn the MAC for AVF
					3. Traffic is shared among forwarding devices without assigning different gateway IPs
					to hosts.
				</p>
				<p className="mt-3">
					The assignment happens when ARP is answered, so round-robin is not a per-packet scheduler.
					A single host generally continues using the virtual MAC in its ARP cache until that
					entry is refreshed. This can make load sharing uneven when a small number of high-volume
					hosts dominate traffic. The algorithm distributes gateway assignments; it does not
					guarantee exactly equal bandwidth or sessions.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">GLBP load-balancing methods</h2>
				<div className="mt-4 space-y-4">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Round robin · default</h3>
						<p className="mt-2 text-sm leading-6">The AVG assigns available AVF virtual MACs in sequence as it answers ARP requests. This provides straightforward host-level distribution and is a common general-purpose choice.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#f0faf5] p-5">
						<h3 className="font-bold text-[#13754e]">Weighted</h3>
						<p className="mt-2 text-sm leading-6">The AVG takes forwarder weighting into account when assigning virtual MACs. A gateway with greater configured or tracked capacity can receive a larger share of host assignments. Weighting uses thresholds and is not a measurement of instantaneous link utilization.</p>
					</div>
					<div className="rounded-xl border border-[#d8c6f1] bg-[#f7f2ff] p-5">
						<h3 className="font-bold text-[#7042b4]">Host-dependent</h3>
						<p className="mt-2 text-sm leading-6">The AVG assigns a consistent forwarder virtual MAC for a particular host while membership and configuration remain stable. This can help preserve host-to-gateway affinity; it does not mean all hosts use one forwarder.</p>
					</div>
				</div>
				<p className="mt-4">
					The suitable method depends on the number and traffic profile of hosts, device capacity,
					and whether stable host-to-forwarder mapping matters. A balanced number of ARP
					assignments does not necessarily imply balanced byte counts. Monitor each gateway and
					test the selected policy using representative traffic.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">AVG and AVF failure behavior</h2>
				<TutorialDiagramFrame caption="The SVG can assume the AVG role if the AVG fails; surviving AVFs can also take over a failed forwarder’s virtual MAC.">
					<GlbpFailoverDiagram />
				</TutorialDiagramFrame>
				<p className="mt-4">
					GLBP hello messages allow gateways to monitor group members and forwarder state. For
					IPv4, GLBP commonly sends hellos to multicast address <code>224.0.0.102</code> using
					UDP port <code>3222</code>. A common hello interval is 3 seconds; timer behavior can be
					configured and should be verified on the platform.
				</p>
				<p className="mt-3">
					If the AVG fails, the SVG can become the new AVG. It takes over the group coordination
					and management of the virtual forwarder assignments. The surviving AVFs continue to
					forward using their own virtual MACs. For traffic previously assigned to the failed
					gateway, GLBP’s forwarder redundancy allows a surviving router to assume responsibility
					for that virtual MAC so hosts can continue to use the same virtual IP.
				</p>
				<p className="mt-3">
					If an AVF fails while the AVG remains healthy, the AVG can coordinate a replacement
					forwarder for the failed AVF’s virtual MAC. Forwarder failover and AVG election are
					separate mechanisms: loss of an AVF does not by itself mean the AVG has failed. The
					replacement sends Layer 2 announcements, including gratuitous ARP behavior, so switches
					can relearn which port currently serves the virtual MAC and hosts can refresh relevant
					ARP information. A brief traffic interruption may still occur during failure detection
					and convergence.
				</p>
				<p className="mt-3">
					GLBP supports up to 1024 groups on an interface on platforms that implement the feature;
					group-number ranges and limits can vary by IOS release and hardware. Check the device
					documentation and CLI help rather than assuming every platform has the same scale.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Interface tracking and gateway health</h2>
				<p className="mt-3">
					Without tracking, a router can remain AVG or AVF even after losing an important upstream
					link, as long as its LAN interface and GLBP hellos still work. GLBP tracking can adjust
					the gateway’s weighting when a tracked interface or object fails. This helps the AVG
					avoid assigning too much traffic to a gateway with reduced connectivity and can make a
					healthy gateway preferable for forwarding.
				</p>
				<p className="mt-3">
					Weighting is distinct from AVG election priority. Priority and preemption determine
					which gateway is preferred to be AVG; weight and its thresholds influence whether a
					gateway remains eligible to forward as an AVF and how weighted load balancing assigns
					hosts. Choose decrement and threshold values so a failure has the intended effect, and
					test restoration behavior as well as failure behavior.
				</p>
				<p className="mt-3">
					Track the interface or reachability condition that actually represents a loss of
					service. A simple line-protocol track detects an interface going down, but cannot
					necessarily detect a remote failure beyond an interface that remains operational.
					For broader path health, use an appropriate supported object-tracking method and verify
					that its state changes as expected.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Basic Cisco IOS configuration</h2>
				<p className="mt-3">
					This example configures GLBP group 10 on two routers attached to the same client VLAN.
					Both routers use the virtual gateway IP <code>10.10.10.100</code>. R1 is configured
					with higher priority and preemption so it is preferred to become AVG; both routers
					participate as forwarders where the platform and group state permit.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Router R1 · preferred AVG</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# interface GigabitEthernet0/0
R1(config-if)# ip address 10.10.10.1 255.255.255.0
R1(config-if)# glbp 10 ip 10.10.10.100
R1(config-if)# glbp 10 priority 120
R1(config-if)# glbp 10 preempt
R1(config-if)# glbp 10 load-balancing round-robin
R1(config-if)# no shutdown`}</code></pre>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Router R2 · alternate gateway and forwarder</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R2(config)# interface GigabitEthernet0/0
R2(config-if)# ip address 10.10.10.2 255.255.255.0
R2(config-if)# glbp 10 ip 10.10.10.100
R2(config-if)# glbp 10 priority 100
R2(config-if)# glbp 10 preempt
R2(config-if)# glbp 10 load-balancing round-robin
R2(config-if)# no shutdown`}</code></pre>
				<p className="mt-3">
					Hosts on the LAN use <code>10.10.10.100</code> as their default gateway. The matching
					group number and virtual IP let the routers join the same GLBP group. R1’s greater
					priority makes it the preferred AVG when election and preemption conditions are met.
					Use addresses and interface names that match the actual VLAN, and configure group
					parameters consistently across the participating gateways.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Example weighting and tracked uplink</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1(config)# track 1 interface GigabitEthernet0/1 line-protocol
R1(config)# interface GigabitEthernet0/0
R1(config-if)# glbp 10 weighting 150 lower 120 upper 140
R1(config-if)# glbp 10 weighting track 1 decrement 30
R1(config-if)# glbp 10 load-balancing weighted`}</code></pre>
				<p className="mt-3">
					This illustrates a tracked uplink reducing R1’s weight when the line protocol goes down.
					Thresholds and weighting commands vary by IOS support and should be selected for the
					intended design; configure tracking on each gateway as appropriate. Do not copy the
					numbers blindly—confirm the platform’s command syntax and verify the resulting forwarder
					state and host assignments.
				</p>
				<h3 className="mt-6 text-lg font-bold text-[#17356d]">Verify GLBP</h3>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router# show glbp
Router# show glbp brief
Router# show running-config interface GigabitEthernet0/0`}</code></pre>
				<p className="mt-3">
					Check the group’s virtual IP, AVG and SVG roles, AVF virtual MAC assignments, priority,
					weight, timers, and load-balancing method. Test client ARP resolution and observe that
					different hosts can learn different AVF virtual MACs. In a controlled lab, fail an AVG
					and an AVF separately to verify the two independent takeover behaviors.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">GLBP authentication</h2>
				<p className="mt-3">
					GLBP implementations may support unauthenticated operation, text/password authentication,
					and message-digest authentication such as MD5, depending on platform and software. If
					authentication is configured, all members of a group must use compatible settings or
					they may reject one another’s GLBP messages and fail to form a functioning group.
				</p>
				<p className="mt-3">
					Text authentication does not protect a password from being read if the relevant traffic
					is captured. MD5 message authentication avoids sending the shared key as plain text, but
					MD5 is an older algorithm and should not be described as strong modern cryptography.
					Use the strongest authentication method supported by the platform and organizational
					security policy, protect key configuration, and consider key-chain support where
					available. Authentication protects protocol participation; it does not encrypt user
					data.
				</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`! Example only: configure the same protected secret on every group member.
Router(config-if)# glbp 10 authentication md5 key-string <use-a-managed-secret>`}</code></pre>
				<p className="mt-3">
					Authentication syntax and available algorithms vary across IOS releases. Do not put a
					real shared key in a public configuration example; use a managed secret and verify
					supported syntax on the target device.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>GLBP provides one virtual gateway IP per group while allowing multiple active virtual forwarders to share traffic.</li>
					<li>The AVG coordinates the group and answers ARP; an AVF owns a virtual MAC and forwards frames sent to it.</li>
					<li>The SVG backs up the AVG role; an SVF can back up a forwarder. These are separate failure roles.</li>
					<li>There can be up to four active virtual forwarders per group; additional members may be standby forwarders.</li>
					<li>The AVG distributes AVF virtual MACs through ARP replies; round-robin is the default method on common implementations.</li>
					<li>Weighted and host-dependent methods offer different distribution and host-affinity behavior.</li>
					<li>IPv4 GLBP uses multicast 224.0.0.102 and UDP port 3222; the common hello interval is 3 seconds.</li>
					<li>Tracking can adjust weighting when an upstream path fails; AVG priority/preemption and AVF weighting serve different purposes.</li>
					<li>GLBP is Cisco-developed; verify platform support, scale, authentication, and exact command syntax.</li>
				</ul>
			</section>
		</div>
	);
}

const moduleThreeLessonByType = {
	"routing-decision": RouterForwardingLessonContent,
	ospf: OspfLessonContent,
	eigrp: EigrpLessonContent,
	hsrp: HsrpLessonContent,
	glbp: GlbpLessonContent,
};

export default function CcnaKnowledgeModuleThree({ contentType }) {
	const Lesson = moduleThreeLessonByType[contentType];
	return Lesson ? <Lesson /> : null;
}
