import { TutorialDiagramFrame } from "./ccnaTutorialDiagramFrame";
import LessonImageExpand from "../../LessonImageExpand";
import CcnaKnowledgeModulePlaceholder from "./ccnaKnowledgeModulePlaceholder";

function SecurityHouseDiagram() {
	return (
		<svg viewBox="0 0 1000 510" role="img" aria-labelledby="security-house-title security-house-description" className="mx-auto h-auto w-full">
			<title id="security-house-title">House security analogy for vulnerability, exploit, threat, and mitigation</title>
			<desc id="security-house-description">A house has a weak window as a vulnerability. A tool or technique used against that weakness represents an exploit. An unauthorized person attempting entry is the threat. Reinforced window bars, stronger locks, and alarms are mitigation controls that reduce the chance or impact of harm but do not make all threats disappear.</desc>
			<defs>
				<linearGradient id="security-house-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="security-house-threat-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#d97736" />
				</marker>
				<marker id="security-house-control-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="494" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#security-house-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">Security Concepts · A House and Its Defenses</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">A weakness may be exploited by a threat; safeguards reduce likelihood or impact but cannot erase every threat.</text>

			<rect x="40" y="127" width="616" height="318" rx="20" fill="#f7faff" stroke="#cfe0f5" strokeWidth="2" />
			<text x="348" y="157" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">THE HOUSE · A SIMPLE SECURITY MODEL</text>

			<path d="M168 256L344 172L520 256" fill="#dceaff" stroke="#4980cb" strokeWidth="7" strokeLinejoin="round" />
			<rect x="197" y="254" width="294" height="151" rx="4" fill="#fff" stroke="#4980cb" strokeWidth="4" />
			<rect x="310" y="315" width="67" height="90" rx="4" fill="#eaf2ff" stroke="#4980cb" strokeWidth="3" />
			<circle cx="363" cy="359" r="4" fill="#bf791c" />
			<rect x="225" y="281" width="66" height="57" rx="4" fill="#dceaff" stroke="#4980cb" strokeWidth="3" />
			<path d="M258 282v56M225 309h66" stroke="#4980cb" strokeWidth="2" />
			<rect x="407" y="281" width="66" height="57" rx="4" fill="#eaf2ff" stroke="#4980cb" strokeWidth="3" />
			<path d="M440 282v56M407 309h66" stroke="#4980cb" strokeWidth="2" />

			<path d="M398 273v74m-9-66h18m-18 18h18m-18 18h18m-18 18h18" stroke="#18a36a" strokeWidth="4" strokeLinecap="round" />
			<rect x="396" y="272" width="4" height="76" fill="#18a36a" />
			<rect x="414" y="272" width="4" height="76" fill="#18a36a" />
			<text x="439" y="361" fill="#13754e" fontSize="10" fontWeight="700">reinforced bars</text>

			<circle cx="86" cy="312" r="25" fill="#fff0e8" stroke="#edbd9b" strokeWidth="2" />
			<circle cx="86" cy="295" r="10" fill="#bf791c" />
			<path d="M69 330q17-26 34 0" fill="#d97736" />
			<path d="M113 312h82" fill="none" stroke="#d97736" strokeWidth="3" strokeDasharray="6 5" markerEnd="url(#security-house-threat-arrow)" />
			<rect x="52" y="350" width="110" height="48" rx="11" fill="#fff" stroke="#edbd9b" />
			<text x="107" y="369" fill="#a44b13" fontSize="10" fontWeight="700" textAnchor="middle">THREAT</text>
			<text x="107" y="386" fill="#526584" fontSize="9" textAnchor="middle">potential intruder</text>

			<rect x="218" y="347" width="80" height="28" rx="10" fill="#fff4df" stroke="#e8c98d" />
			<text x="258" y="366" fill="#96600c" fontSize="9" fontWeight="700" textAnchor="middle">weak window</text>
			<path d="M262 347v-7" stroke="#d97736" strokeWidth="2" />
			<rect x="508" y="241" width="128" height="56" rx="12" fill="#fff0e8" stroke="#edbd9b" />
			<text x="572" y="263" fill="#a44b13" fontSize="10" fontWeight="700" textAnchor="middle">VULNERABILITY</text>
			<text x="572" y="281" fill="#526584" fontSize="9" textAnchor="middle">weakness in a window</text>
			<path d="M508 268h-31" stroke="#d97736" strokeWidth="2" />

			<rect x="508" y="310" width="128" height="56" rx="12" fill="#f4efff" stroke="#d3c3ef" />
			<text x="572" y="332" fill="#7042b4" fontSize="10" fontWeight="700" textAnchor="middle">MITIGATION</text>
			<text x="572" y="350" fill="#526584" fontSize="9" textAnchor="middle">bars, lock, alarm</text>
			<path d="M508 337h-89" fill="none" stroke="#18a36a" strokeWidth="2" markerEnd="url(#security-house-control-arrow)" />

			<rect x="683" y="127" width="277" height="318" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="821" y="157" fill="#13754e" fontSize="13" fontWeight="700" textAnchor="middle">CYBERSECURITY EQUIVALENT</text>
			<rect x="711" y="178" width="221" height="54" rx="12" fill="#fff" stroke="#a4d6bc" />
			<circle cx="738" cy="205" r="14" fill="#fff4df" />
			<path d="M731 207l7-8 7 8m-7-8v14" fill="none" stroke="#96600c" strokeWidth="2" />
			<text x="831" y="199" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Vulnerability</text>
			<text x="831" y="216" fill="#526584" fontSize="9" textAnchor="middle">unpatched service · weak access control</text>
			<rect x="711" y="245" width="221" height="54" rx="12" fill="#fff" stroke="#a4d6bc" />
			<path d="M729 273h18m-14-7 14 7-14 7" fill="none" stroke="#7042b4" strokeWidth="2" />
			<text x="831" y="266" fill="#7042b4" fontSize="10" fontWeight="700" textAnchor="middle">Exploit</text>
			<text x="831" y="283" fill="#526584" fontSize="9" textAnchor="middle">code or technique using the weakness</text>
			<rect x="711" y="312" width="221" height="54" rx="12" fill="#fff" stroke="#a4d6bc" />
			<path d="M731 340h17m-14-6 14 6-14 6" fill="none" stroke="#d97736" strokeWidth="2" />
			<text x="831" y="333" fill="#a44b13" fontSize="10" fontWeight="700" textAnchor="middle">Threat</text>
			<text x="831" y="350" fill="#526584" fontSize="9" textAnchor="middle">actor or event that could cause harm</text>
			<rect x="711" y="379" width="221" height="48" rx="12" fill="#fff" stroke="#a4d6bc" />
			<path d="M725 400l7 7 14-16" fill="none" stroke="#18a36a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
			<text x="831" y="399" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Mitigation</text>
			<text x="831" y="416" fill="#526584" fontSize="9" textAnchor="middle">patch · MFA · segmentation · monitoring</text>

			<text x="500" y="476" fill="#526584" fontSize="11" textAnchor="middle">Threats can exist even when safeguards are in place; effective controls reduce risk rather than promise zero risk.</text>
		</svg>
	);
}

function KeySecurityConceptsLesson() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why security concepts matter</h2>
				<p className="mt-3">
					In the digital world, people use computers and networks for communication,
					business, learning, and essential services. Protecting the information and
					systems behind those activities is an important responsibility. Security
					concepts help us describe how a system might be harmed and choose sensible
					ways to reduce that possibility.
				</p>
				<p className="mt-3">
					A useful starting point is to distinguish a weakness from a way of taking
					advantage of it, from the possibility of harm, and from the safeguards put in
					place to reduce that harm. These ideas are related, but they do not mean the
					same thing.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">A house as a security analogy</h2>
				<p className="mt-3">
					Imagine a house built from strong bricks, stones, or concrete. The owners still
					need doors and windows so they can enter, leave, and see outside. Those openings
					are necessary for convenient use, but they can also create weaknesses: a weak
					lock, an unlocked door, or a window that can be forced open.
				</p>
				<p className="mt-3">
					An unauthorized person might use a tool or technique to take advantage of one
					of those weaknesses. Stronger locks, reinforced doors or window bars, an alarm,
					and careful key management can make unauthorized entry harder or help detect
					it. The house still faces possible threats; the safeguards reduce the likelihood
					or impact of a successful break-in rather than making risk disappear.
				</p>
				<TutorialDiagramFrame caption="The weak opening is a vulnerability, the method used against it is an exploit, the possible intruder is a threat, and reinforcing the house is mitigation.">
					<SecurityHouseDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Four key security terms</h2>
				<div className="mt-5 space-y-4">
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
						<h3 className="font-bold text-[#9a640e]">1. Vulnerability — a weakness</h3>
						<p className="mt-2 text-sm leading-6">A vulnerability is a weakness or flaw in a system's design, implementation, configuration, or operation that could be used to compromise security. Examples include an unpatched service, a default password, excessive permissions, an exposed management interface, or a process that does not adequately verify identity.</p>
						<p className="mt-2 text-sm leading-6"><strong>House analogy:</strong> a weak lock or an unreinforced window. A vulnerability is a condition; it is not itself the attacker or the attack.</p>
					</div>
					<div className="rounded-xl border border-[#d3c3ef] bg-[#f7f3ff] p-5">
						<h3 className="font-bold text-[#7042b4]">2. Exploit — a way to use a weakness</h3>
						<p className="mt-2 text-sm leading-6">An exploit is a tool, technique, or sequence of actions that takes advantage of a vulnerability. Depending on the weakness and the exploit, the result might be unauthorized access, information disclosure, a change to data or configuration, or interruption of a service. A vulnerability can exist without a known or successful exploit.</p>
						<p className="mt-2 text-sm leading-6"><strong>House analogy:</strong> the method or tool used to get through a weak window. Exploit describes how the weakness is used, not the potential source of danger.</p>
					</div>
					<div className="rounded-xl border border-[#edbd9b] bg-[#fff5ee] p-5">
						<h3 className="font-bold text-[#a44b13]">3. Threat — a potential cause of harm</h3>
						<p className="mt-2 text-sm leading-6">A threat is a potential event, circumstance, or actor that could cause harm to a system, network, organization, or data. It represents possibility, not proof that a compromise has already happened. Threats can include malicious actors, mistakes, equipment failures, or environmental events. They continue to exist whether or not countermeasures are deployed.</p>
						<p className="mt-2 text-sm leading-6"><strong>House analogy:</strong> a person who might attempt an unauthorized entry. The person is a potential threat even if the person has not entered and even if the house has strong locks.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">4. Threat mitigation — a safeguard</h3>
						<p className="mt-2 text-sm leading-6">A mitigation technique is a control, practice, or measure that reduces the likelihood or impact of a threat exploiting a vulnerability. Examples include applying security updates, using strong unique credentials and multifactor authentication, limiting privileges, filtering traffic, segmenting networks, encrypting sensitive data, monitoring activity, and maintaining tested backups.</p>
						<p className="mt-2 text-sm leading-6"><strong>House analogy:</strong> stronger locks, window bars, lighting, and an alarm. Different controls can prevent entry, make it harder, limit damage, or help detect an attempt.</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How the concepts connect</h2>
				<p className="mt-3">
					A threat may attempt to use an exploit against a vulnerability, potentially
					causing harm. A mitigation can prevent or make that attempt harder, detect it,
					limit its effects, or help restore service. The outcome depends on the system,
					the threat, the weakness, and the controls in place.
				</p>
				<div className="mt-5 rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
					<p className="text-center text-base font-bold leading-8 text-[#173b76] sm:text-lg">
						Threat uses an exploit → targets a vulnerability → may cause harm
					</p>
					<p className="mt-2 text-center text-sm leading-6 text-[#526584]">
						Mitigation reduces the chance of success, limits impact, improves detection, or supports recovery.
					</p>
				</div>
				<p className="mt-4">
					For example, an internet-facing server that is missing a security update has a
					vulnerability. A malicious actor could use a technique that targets that flaw;
					the actor and the possibility of an attack are part of the threat scenario.
					Applying the update removes that known weakness. A firewall rule, least-privilege
					access, monitoring, and tested backups provide additional layers to reduce
					exposure, detect suspicious activity, and support recovery if prevention fails.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Choosing practical mitigation techniques</h2>
				<p className="mt-3">
					No single control protects every system from every threat. Use layered safeguards
					that match the assets and operations being protected:
				</p>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Reduce weaknesses:</strong> patch supported software, change default credentials, securely configure services, and remove unused accounts or exposed services.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Limit access:</strong> use unique credentials, multifactor authentication where appropriate, least privilege, and restricted management networks.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Limit reach:</strong> use segmentation and firewall rules to reduce which systems can communicate, while allowing required business traffic.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Detect activity:</strong> collect and review logs, monitor security alerts, and maintain an incident response process.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Recover:</strong> keep protected backups and test restoration procedures so an incident does not become permanent data loss or prolonged downtime.</li>
				</ul>
				<p className="mt-4">
					These measures lower risk; they do not mean threats no longer exist. Security
					requires ongoing review as systems, configurations, and potential threats change.
				</p>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>A vulnerability is a weakness in a system, configuration, process, or operation.</li>
					<li>An exploit is a tool or technique that takes advantage of a vulnerability.</li>
					<li>A threat is a potential cause of harm; its presence does not mean that a compromise has already happened.</li>
					<li>Mitigation techniques reduce the likelihood or impact of threats by preventing, limiting, detecting, or helping recover from harm.</li>
					<li>Threats can persist even when safeguards are in place; layered controls reduce risk but cannot promise zero risk.</li>
				</ul>
			</section>
		</div>
	);
}

function AclPlacementDiagram() {
	return (
		<svg viewBox="0 0 1000 450" role="img" aria-labelledby="acl-placement-title acl-placement-description" className="mx-auto h-auto w-full">
			<title id="acl-placement-title">Standard ACL near destination and extended ACL near source</title>
			<desc id="acl-placement-description">Two traffic-filtering examples show a standard ACL, which matches only source IP and is commonly placed near the destination, and an extended ACL, which can match source, destination, protocol and port and is commonly placed near the source. In each case the ACL is applied inbound or outbound on a router interface.</desc>
			<defs>
				<linearGradient id="acl-placement-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="acl-placement-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="acl-placement-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="434" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v63H10z" fill="url(#acl-placement-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">ACLs · Match Fields and Placement</text>
			<text x="40" y="80" fill="#dcecff" fontSize="13">Standard ACLs inspect source only; extended ACLs can match source, destination, protocol, and ports.</text>

			<rect x="39" y="117" width="448" height="289" rx="18" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="263" y="147" fill="#2853a0" fontSize="14" fontWeight="700" textAnchor="middle">STANDARD ACL · SOURCE ADDRESS ONLY</text>
			<rect x="61" y="181" width="102" height="65" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="112" y="207" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">Source LAN</text>
			<text x="112" y="226" fill="#526584" fontSize="10" textAnchor="middle">10.0.0.0/8</text>
			<path d="M164 214h67" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#acl-placement-blue-arrow)" />
			<circle cx="267" cy="214" r="36" fill="#fff4df" stroke="#e8c98d" strokeWidth="2" />
			<path d="M251 214h32m-16-14v28m-10-24 20 20m0-20-20 20" stroke="#bf791c" strokeWidth="2" />
			<text x="267" y="266" fill="#9a640e" fontSize="10" fontWeight="700" textAnchor="middle">ROUTER</text>
			<path d="M304 214h85" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#acl-placement-blue-arrow)" />
			<rect x="393" y="181" width="72" height="65" rx="12" fill="#edfaf3" stroke="#a4d6bc" />
			<path d="M415 195h28v22h-28zm6 27h16" fill="none" stroke="#18865d" strokeWidth="2" />
			<text x="429" y="238" fill="#13754e" fontSize="9" fontWeight="700" textAnchor="middle">SERVER</text>
			<rect x="78" y="296" width="370" height="52" rx="12" fill="#fff" stroke="#cfe0f5" />
			<text x="263" y="318" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">Filter close to destination</text>
			<text x="263" y="336" fill="#526584" fontSize="9" textAnchor="middle">No destination or port match · numbered range 1–99 / 1300–1999</text>
			<text x="263" y="376" fill="#526584" fontSize="9" textAnchor="middle">Example: access-list 1 permit 10.0.0.0 0.255.255.255</text>

			<rect x="513" y="117" width="448" height="289" rx="18" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="737" y="147" fill="#13754e" fontSize="14" fontWeight="700" textAnchor="middle">EXTENDED ACL · MULTIPLE PACKET FIELDS</text>
			<rect x="534" y="181" width="90" height="65" rx="12" fill="#fff4df" stroke="#e8c98d" />
			<text x="579" y="207" fill="#96600c" fontSize="10" fontWeight="700" textAnchor="middle">FILTER NEAR</text>
			<text x="579" y="224" fill="#526584" fontSize="9" textAnchor="middle">source LAN</text>
			<path d="M625 214h43" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#acl-placement-green-arrow)" />
			<circle cx="704" cy="214" r="36" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<path d="M688 214h32m-16-14v28m-10-24 20 20m0-20-20 20" stroke="#2868bd" strokeWidth="2" />
			<text x="704" y="266" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">ROUTER</text>
			<path d="M741 214h74" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#acl-placement-blue-arrow)" />
			<rect x="819" y="181" width="115" height="65" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="876" y="204" fill="#1a3768" fontSize="10" fontWeight="700" textAnchor="middle">DESTINATION</text>
			<text x="876" y="223" fill="#526584" fontSize="9" textAnchor="middle">host / network</text>
			<rect x="550" y="296" width="374" height="52" rx="12" fill="#fff" stroke="#cfe0f5" />
			<text x="737" y="318" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Filter close to source</text>
			<text x="737" y="336" fill="#526584" fontSize="9" textAnchor="middle">Source · destination · IP protocol · TCP/UDP port · range 100–199 / 2000–2699</text>
			<text x="737" y="376" fill="#526584" fontSize="9" textAnchor="middle">Example: deny tcp 10.0.0.0 0.255.255.255 host 187.100.1.6 eq 21</text>

			<rect x="177" y="416" width="646" height="20" rx="10" fill="#f7faff" />
			<text x="500" y="430" fill="#526584" fontSize="9" textAnchor="middle">Placement is a design guideline: filter near the source when possible without blocking other required traffic.</text>
		</svg>
	);
}

function WildcardMaskDiagram() {
	return (
		<svg viewBox="0 0 1000 460" role="img" aria-labelledby="acl-wildcard-title acl-wildcard-description" className="mx-auto h-auto w-full">
			<title id="acl-wildcard-title">Wildcard mask 0.0.15.255 matches network 172.23.16.0 through 172.23.31.255</title>
			<desc id="acl-wildcard-description">A wildcard mask is the inverse of the subnet mask for a contiguous prefix. In 0.0.15.255, zero bits mean check the corresponding address bit and one bits mean ignore it. For network 172.23.16.0 slash 20, the wildcard is 0.0.15.255 and the matching range is 172.23.16.0 to 172.23.31.255.</desc>
			<defs>
				<linearGradient id="acl-wildcard-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
			</defs>
			<rect x="8" y="8" width="984" height="444" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v63H10z" fill="url(#acl-wildcard-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">Wildcard Mask · 0 Means Check, 1 Means Ignore</text>
			<text x="40" y="80" fill="#dcecff" fontSize="13">The wildcard mask is the bitwise inverse of a subnet mask for a contiguous network prefix.</text>

			<text x="98" y="136" fill="#526584" fontSize="11" fontWeight="700">SUBNET MASK</text>
			<text x="302" y="136" fill="#1a3768" fontSize="12" fontFamily="monospace">255.255.240.0</text>
			<text x="515" y="136" fill="#526584" fontSize="11">Binary:</text>
			<text x="574" y="136" fill="#1a3768" fontSize="11" fontFamily="monospace">11111111.11111111.11110000.00000000</text>

			<text x="98" y="183" fill="#526584" fontSize="11" fontWeight="700">WILDCARD</text>
			<text x="302" y="183" fill="#13754e" fontSize="12" fontWeight="700" fontFamily="monospace">0.0.15.255</text>
			<text x="515" y="183" fill="#526584" fontSize="11">Binary inverse:</text>
			<text x="625" y="183" fill="#13754e" fontSize="11" fontWeight="700" fontFamily="monospace">00000000.00000000.00001111.11111111</text>

			<rect x="74" y="213" width="852" height="93" rx="17" fill="#f7faff" stroke="#cfe0f5" />
			<text x="500" y="240" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">ADDRESS BITS MATCHED BY THIS ACL ENTRY</text>
			<rect x="178" y="258" width="204" height="31" rx="8" fill="#dceaff" />
			<rect x="392" y="258" width="204" height="31" rx="8" fill="#dceaff" />
			<rect x="606" y="258" width="94" height="31" rx="8" fill="#dceaff" />
			<rect x="706" y="258" width="119" height="31" rx="8" fill="#f4efff" />
			<text x="280" y="279" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">172 · check all 8 bits</text>
			<text x="494" y="279" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">23 · check all 8 bits</text>
			<text x="653" y="279" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">16–31</text>
			<text x="765" y="279" fill="#7042b4" fontSize="10" fontWeight="700" textAnchor="middle">0–255</text>

			<text x="500" y="348" fill="#526584" fontSize="11" textAnchor="middle">Third octet 16–31: 0001xxxx · last octet: any value</text>
			<rect x="117" y="369" width="766" height="48" rx="14" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="500" y="390" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">172.23.16.0  0.0.15.255</text>
			<text x="500" y="407" fill="#526584" fontSize="10" textAnchor="middle">Matches 172.23.16.0 through 172.23.31.255 · prefix /20</text>
			<text x="500" y="438" fill="#526584" fontSize="10" textAnchor="middle">0 bits = I care and compare · 1 bits = I don't care and ignore</text>
		</svg>
	);
}

function AccessListLesson() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What an access list does</h2>
				<p className="mt-3">
					Access control lists (ACLs) provide a way to filter packets by permitting or
					denying traffic at a router interface. Imagine a guard at a fair checking
					tickets: the guard admits people who meet the stated rules and refuses those
					who do not. An ACL similarly compares packet fields against administrator-defined
					rules to decide whether a packet can pass.
				</p>
				<p className="mt-3">
					An ACL must first be created and then applied to an interface in an inbound or
					outbound direction. Entries are evaluated in order, and processing stops at the
					first match. If no entry matches, the implicit deny at the end blocks the packet.
					Therefore, write permit and deny entries deliberately and account for all traffic
					that must continue to pass.
				</p>
				<TutorialDiagramFrame caption="Standard ACLs match source only and are commonly placed near a destination; extended ACLs match more fields and are commonly placed near a source.">
					<AclPlacementDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Standard IP access lists</h2>
				<p className="mt-3">
					A standard IPv4 ACL checks only the packet's source IPv4 address. It does not
					check the destination, transport protocol, or port number. Traditional numbered
					standard ACL ranges are <code>1–99</code> and <code>1300–1999</code>; named
					standard ACLs can also be used.
				</p>
				<p className="mt-3">A numbered standard ACL uses this general syntax:</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`access-list <1-99 | 1300-1999> {permit | deny} <source-address> <wildcard-mask>
interface <interface-id>
 ip access-group <access-list-number> {in | out}`}</code></pre>
				<p className="mt-3">
					In this example, the server is connected to <code>FastEthernet0/1</code>. ACL 1
					permits source addresses in <code>10.0.0.0/8</code> and is applied outbound on
					the server-facing interface:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 1 permit 10.0.0.0 0.255.255.255
Router(config)# interface FastEthernet0/1
Router(config-if)# ip access-group 1 out`}</code></pre>
				<p className="mt-3">
					The wildcard <code>0.255.255.255</code> means the first octet must match
					<code> 10</code> and the remaining address bits are ignored. Because the ACL has
					no matching permit for other sources, the implicit deny blocks them from leaving
					that interface. A standard ACL is commonly placed near the destination because
					it cannot distinguish destinations; placing it too early can block the same
					source from reaching other networks. Consider all traffic paths to the server:
					an ACL on one interface filters only packets traversing that interface and
					direction.
				</p>
				<div className="mt-5 rounded-xl border border-[#fff0c7] bg-[#fff9ed] p-5">
					<h3 className="font-bold text-[#9a640e]">Implicit deny</h3>
					<p className="mt-2 text-sm leading-6">Every IPv4 ACL behaves as if a deny-all entry exists at the end. In a restrictive ACL, traffic not explicitly permitted is dropped. Add an explicit permit when other traffic must pass, and verify the effect before applying an ACL to a production interface.</p>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Extended IP access lists</h2>
				<p className="mt-3">
					An extended IPv4 ACL can match source and destination addresses, an IP protocol
					such as TCP, UDP, or IP, and supported transport ports. Traditional numbered
					extended ACL ranges are <code>100–199</code> and <code>2000–2699</code>. Extended
					ACLs are commonly placed near the source of the traffic being filtered, so unwanted
					packets can be stopped before traversing the rest of the network.
				</p>
				<p className="mt-3">
					This example denies TCP traffic from <code>10.0.0.0/8</code> to host
					<code> 187.100.1.6</code> when the destination port is FTP control port 21 or
					FTP data port 20, permits other IP traffic, and applies the list outbound on
					<code> FastEthernet0/1</code>:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 101 deny tcp 10.0.0.0 0.255.255.255 host 187.100.1.6 eq 21
Router(config)# access-list 101 deny tcp 10.0.0.0 0.255.255.255 host 187.100.1.6 eq 20
Router(config)# access-list 101 permit ip any any
Router(config)# interface FastEthernet0/1
Router(config-if)# ip access-group 101 out`}</code></pre>
				<p className="mt-3">
					Here, <code>host 187.100.1.6</code> is shorthand for the address with wildcard
					<code> 0.0.0.0</code>. <code>eq 21</code> and <code>eq 20</code> match destination
					ports. FTP behavior depends on active or passive mode and negotiated data
					connections; this example blocks those destination ports only and is not a
					complete FTP-aware policy. The final <code>permit ip any any</code> is necessary
					if all other IPv4 traffic should be allowed; without it, the implicit deny blocks
					all remaining traffic traversing the interface.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Named IP access lists</h2>
				<p className="mt-3">
					Named ACLs use descriptive names instead of relying on a number. Create a
					standard or extended named ACL in global configuration mode, then add permit
					or deny statements from the corresponding ACL configuration mode. The rule
					statement is entered on its own line; it is not appended to the
					<code> ip access-list</code> command.
				</p>
				<p className="mt-3">
					This example permits only Telnet from host <code>10.0.0.1</code> to host
					<code> 187.100.1.6</code>, then applies the extended ACL inbound on
					<code> FastEthernet0/0</code>:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# ip access-list extended IN_TO_OUT
Router(config-ext-nacl)# permit tcp host 10.0.0.1 host 187.100.1.6 eq telnet
Router(config-ext-nacl)# exit
Router(config)# interface FastEthernet0/0
Router(config-if)# ip access-group IN_TO_OUT in`}</code></pre>
				<p className="mt-3">
					Port name <code>telnet</code> represents TCP destination port <code>23</code>.
					This ACL permits only matching Telnet traffic; all other traffic is denied by
					the implicit deny. Telnet is unencrypted, so use SSH for secure remote
					management rather than enabling Telnet merely to follow this ACL example.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Wildcard masks</h2>
				<p className="mt-3">
					Wildcard masks tell an ACL which address bits to compare. A zero bit means
					“check this bit”; a one bit means “ignore this bit.” For a contiguous subnet
					mask, calculate its wildcard by subtracting each mask octet from 255, or
					inverting each bit. For example, subnet mask <code>255.255.240.0</code> becomes
					wildcard mask <code>0.0.15.255</code>.
				</p>
				<TutorialDiagramFrame caption="The wildcard 0.0.15.255 checks all bits in the first two octets, the first four bits in the third, and ignores the last octet.">
					<WildcardMaskDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3">
					For network <code>172.23.16.0/20</code>, the first 20 address bits identify
					the network. The wildcard <code>0.0.15.255</code> checks the first two octets
					and the first four bits of the third octet. It ignores the lower four bits of
					that octet and all bits of the last octet, so the matching range is
					<code> 172.23.16.0</code> through <code>172.23.31.255</code>:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 1 permit 172.23.16.0 0.0.15.255`}</code></pre>
				<p className="mt-3">
					Common shortcuts include <code>host 192.0.2.10</code>, equivalent to wildcard
					<code> 0.0.0.0</code>, and <code>any</code>, equivalent to address
					<code> 0.0.0.0</code> with wildcard <code>255.255.255.255</code>.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Additional ACL examples</h2>
				<p className="mt-3">Block TCP packets to destination port 30 from any source to any destination:</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 101 deny tcp any any eq 30`}</code></pre>
				<p className="mt-3">Permit IP traffic whose source is in <code>192.23.130.128/29</code> to any destination:</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# access-list 101 permit ip 192.23.130.128 0.0.0.7 any`}</code></pre>
				<p className="mt-3">Apply ACL 101 inbound on the router interface receiving this traffic:</p>
				<pre className="mt-3 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Router(config)# interface FastEthernet0/0
Router(config-if)# ip access-group 101 in`}</code></pre>
				<div className="mt-5 rounded-xl border border-[#fff0c7] bg-[#fff9ed] p-5">
					<h3 className="font-bold text-[#9a640e]">Remember interface direction</h3>
					<p className="mt-2 text-sm leading-6"><code>in</code> evaluates packets as they enter the router interface; <code>out</code> evaluates packets as they leave it. An ACL on a physical main interface does not automatically filter traffic on its subinterfaces: apply the needed ACL to each relevant subinterface. One IPv4 ACL can be applied per interface direction on a given interface; a separate inbound and outbound ACL can be applied on the same interface.</p>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Numbered versus named ACLs</h2>
				<LessonImageExpand label="table">
					<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[620px] border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#173b76]">
							<tr><th className="px-4 py-3 font-bold">Feature</th><th className="px-4 py-3 font-bold">Numbered ACL</th><th className="px-4 py-3 font-bold">Named ACL</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ecf6]">
							<tr><td className="px-4 py-3 font-semibold">Identification</td><td className="px-4 py-3">Uses a number and ACL type range.</td><td className="px-4 py-3">Uses a descriptive name and standard/extended mode.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Editing entries</td><td className="px-4 py-3">Classic ACLs are often easiest to replace carefully if order must change; some platforms support sequence editing.</td><td className="px-4 py-3">Sequence-numbered entries can usually be individually removed and resequenced.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Noncontiguous ports</td><td className="px-4 py-3">Support varies by IOS syntax and feature.</td><td className="px-4 py-3">Named extended ACL syntax on supported IOS can list multiple noncontiguous ports in a single ACE.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">VTY access-class</td><td className="px-4 py-3">Platform and feature dependent; verify accepted ACL type and version.</td><td className="px-4 py-3">Modern IOS/IOS XE platforms may support named ACLs; do not assume numbered-only across all releases.</td></tr>
						</tbody>
					</table>
					</div>
				</LessonImageExpand>
				<p className="mt-4">
					For example, <code>show access-lists</code> may display named ACL entries with
					sequence numbers. On a platform supporting sequence editing, remove entry 20
					without recreating the complete ACL:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`R1# show access-lists
Standard IP access list nat_traffic
 10 permit 10.1.0.0, wildcard bits 0.0.255.255
 20 permit 10.2.0.0, wildcard bits 0.0.255.255
 30 permit 10.3.0.0, wildcard bits 0.0.255.255

R1(config)# ip access-list standard nat_traffic
R1(config-std-nacl)# no 20`}</code></pre>
				<p className="mt-3">
					Numbered ACL editing capabilities differ among IOS generations, and modern
					platforms may support sequence numbers for both numbered and named ACLs.
					Always inspect the current ACL and platform syntax before changing a live list.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verify ACLs before and after applying</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Inspect entries:</strong> <code>show access-lists</code> or <code>show ip access-lists</code> displays ACL rules and, where supported, match counters.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Check interface attachment:</strong> <code>show ip interface FastEthernet0/1</code> reports inbound and outbound access lists applied to that interface.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Check configuration:</strong> review <code>show running-config</code> for ACL statements and <code>ip access-group</code> placement.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Test intended and unintended traffic:</strong> verify permitted flows still work and denied flows are blocked; consider rule order and implicit deny.</li>
				</ul>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>ACL entries are checked in order; the first match decides, and an implicit deny follows the listed entries.</li>
					<li>Standard ACLs match source IPv4 only and are commonly placed near the destination.</li>
					<li>Extended ACLs can match source, destination, protocol, and ports and are commonly placed near the source.</li>
					<li>Wildcard 0 bits mean check; 1 bits mean ignore. For a contiguous prefix, wildcard is the inverse of the subnet mask.</li>
					<li>Apply ACLs with <code>ip access-group</code> in the intended inbound or outbound direction, including separately on relevant subinterfaces.</li>
					<li>Named ACLs support descriptive names and convenient sequence editing, but exact capabilities and VTY usage vary by IOS platform.</li>
					<li>Inspect and test the ACL before deployment to avoid unintentionally blocking required traffic.</li>
				</ul>
			</section>
		</div>
	);
}

function Layer2ThreatsDiagram() {
	return (
		<svg viewBox="0 0 1000 520" role="img" aria-labelledby="layer2-threats-title layer2-threats-description" className="mx-auto h-auto w-full">
			<title id="layer2-threats-title">Four common Layer 2 threats and the switch protections that mitigate them</title>
			<desc id="layer2-threats-description">Four panels show rogue DHCP replies blocked by DHCP snooping, VLAN hopping constrained with secure access and trunk configuration plus VACLs, forged ARP messages validated by Dynamic ARP Inspection using DHCP snooping bindings, and MAC table flooding limited by port security and 802.1X.</desc>
			<defs>
				<linearGradient id="layer2-threats-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="layer2-threats-blue-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="layer2-threats-red-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#d97736" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="504" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#layer2-threats-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">Layer 2 Threats · Attack Paths and Switch Defenses</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">Protect trust boundaries at access ports and trunks; combine features rather than relying on one control.</text>

			<rect x="39" y="119" width="449" height="174" rx="17" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="263" y="148" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">1 · DHCP SPOOFING</text>
			<rect x="58" y="168" width="91" height="48" rx="10" fill="#fff" stroke="#b9d2f3" />
			<text x="103" y="188" fill="#1a3768" fontSize="9" fontWeight="700" textAnchor="middle">CLIENT</text>
			<text x="103" y="203" fill="#526584" fontSize="8" textAnchor="middle">DHCP discover</text>
			<path d="M150 191h52" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#layer2-threats-blue-arrow)" />
			<rect x="207" y="162" width="109" height="63" rx="12" fill="#eef5ff" stroke="#b9d2f3" />
			<text x="261" y="183" fill="#2853a0" fontSize="9" fontWeight="700" textAnchor="middle">SWITCH</text>
			<text x="261" y="199" fill="#526584" fontSize="8" textAnchor="middle">snooping checks</text>
			<text x="261" y="213" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">trusted server port</text>
			<path d="M317 179h56" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#layer2-threats-blue-arrow)" />
			<rect x="377" y="158" width="92" height="42" rx="9" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="423" y="176" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">AUTHORIZED</text>
			<text x="423" y="190" fill="#526584" fontSize="8" textAnchor="middle">DHCP server</text>
			<path d="M317 216h56" stroke="#d97736" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#layer2-threats-red-arrow)" />
			<text x="423" y="218" fill="#a44b13" fontSize="8" fontWeight="700" textAnchor="middle">ROGUE REPLY</text>
			<text x="263" y="255" fill="#526584" fontSize="9" textAnchor="middle">Mitigation: DHCP snooping · untrusted client-facing ports</text>
			<text x="263" y="273" fill="#526584" fontSize="8" textAnchor="middle">Drop disallowed server messages; violation action is platform/config dependent.</text>

			<rect x="512" y="119" width="449" height="174" rx="17" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="736" y="148" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">2 · VLAN HOPPING</text>
			<rect x="536" y="165" width="99" height="51" rx="10" fill="#fff4df" stroke="#e8c98d" />
			<text x="585" y="185" fill="#96600c" fontSize="8" fontWeight="700" textAnchor="middle">UNTRUSTED</text>
			<text x="585" y="201" fill="#526584" fontSize="8" textAnchor="middle">access port</text>
			<path d="M636 190h55" stroke="#d97736" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#layer2-threats-red-arrow)" />
			<rect x="696" y="160" width="87" height="61" rx="12" fill="#eef5ff" stroke="#b9d2f3" />
			<text x="739" y="182" fill="#2853a0" fontSize="8" fontWeight="700" textAnchor="middle">SWITCH</text>
			<text x="739" y="198" fill="#526584" fontSize="8" textAnchor="middle">static access</text>
			<text x="739" y="212" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">DTP off</text>
			<path d="M784 190h54" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#layer2-threats-blue-arrow)" />
			<rect x="843" y="165" width="94" height="51" rx="10" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="890" y="185" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">ALLOWED VLAN</text>
			<text x="890" y="201" fill="#526584" fontSize="8" textAnchor="middle">restricted trunk</text>
			<text x="736" y="255" fill="#526584" fontSize="9" textAnchor="middle">Mitigation: disable DTP · restrict allowed VLANs · unused native VLAN</text>
			<text x="736" y="273" fill="#526584" fontSize="8" textAnchor="middle">Use VACL/private VLAN controls when the design requires intra-VLAN filtering.</text>

			<rect x="39" y="310" width="449" height="174" rx="17" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="263" y="339" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">3 · ARP SPOOFING</text>
			<rect x="63" y="357" width="106" height="49" rx="10" fill="#fff0e8" stroke="#edbd9b" />
			<text x="116" y="377" fill="#a44b13" fontSize="8" fontWeight="700" textAnchor="middle">FORGED ARP</text>
			<text x="116" y="393" fill="#526584" fontSize="8" textAnchor="middle">IP → attacker MAC</text>
			<path d="M170 381h58" stroke="#d97736" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#layer2-threats-red-arrow)" />
			<rect x="233" y="352" width="109" height="61" rx="12" fill="#eef5ff" stroke="#b9d2f3" />
			<text x="287" y="373" fill="#2853a0" fontSize="8" fontWeight="700" textAnchor="middle">SWITCH + DAI</text>
			<text x="287" y="389" fill="#526584" fontSize="8" textAnchor="middle">validate binding</text>
			<text x="287" y="404" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">drop invalid ARP</text>
			<path d="M343 381h57" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#layer2-threats-blue-arrow)" />
			<rect x="405" y="357" width="68" height="49" rx="10" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="439" y="377" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">VALID HOST</text>
			<text x="439" y="393" fill="#526584" fontSize="8" textAnchor="middle">correct mapping</text>
			<text x="263" y="446" fill="#526584" fontSize="9" textAnchor="middle">Mitigation: Dynamic ARP Inspection (DAI)</text>
			<text x="263" y="464" fill="#526584" fontSize="8" textAnchor="middle">Use DHCP snooping bindings or configure static ARP ACLs for validation.</text>

			<rect x="512" y="310" width="449" height="174" rx="17" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="736" y="339" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">4 · MAC TABLE FLOODING</text>
			<rect x="536" y="357" width="99" height="49" rx="10" fill="#fff0e8" stroke="#edbd9b" />
			<text x="585" y="377" fill="#a44b13" fontSize="8" fontWeight="700" textAnchor="middle">MANY SOURCE</text>
			<text x="585" y="393" fill="#526584" fontSize="8" textAnchor="middle">MAC addresses</text>
			<path d="M636 381h54" stroke="#d97736" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#layer2-threats-red-arrow)" />
			<rect x="695" y="352" width="88" height="61" rx="12" fill="#fff4df" stroke="#e8c98d" />
			<text x="739" y="373" fill="#96600c" fontSize="8" fontWeight="700" textAnchor="middle">CAM TABLE</text>
			<text x="739" y="389" fill="#526584" fontSize="8" textAnchor="middle">capacity limited</text>
			<text x="739" y="404" fill="#a44b13" fontSize="8" fontWeight="700" textAnchor="middle">unknown unicast</text>
			<path d="M784 381h54" stroke="#2872dc" strokeWidth="2.5" markerEnd="url(#layer2-threats-blue-arrow)" />
			<rect x="843" y="357" width="94" height="49" rx="10" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="890" y="377" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">ACCESS PORT</text>
			<text x="890" y="393" fill="#526584" fontSize="8" textAnchor="middle">MAC limit / 802.1X</text>
			<text x="736" y="446" fill="#526584" fontSize="9" textAnchor="middle">Mitigation: port security · 802.1X access control</text>
			<text x="736" y="464" fill="#526584" fontSize="8" textAnchor="middle">Flooding effects vary by switch; unknown-unicast flooding is VLAN-scoped.</text>
		</svg>
	);
}

function DhcpSnoopingTrustDiagram() {
	return (
		<svg viewBox="0 0 1000 420" role="img" aria-labelledby="dhcp-trust-title dhcp-trust-description" className="mx-auto h-auto w-full">
			<title id="dhcp-trust-title">DHCP snooping trusts the authorized server uplink and keeps client ports untrusted</title>
			<desc id="dhcp-trust-description">A legitimate DHCP server connects through a trusted switch port, allowing DHCP server replies. User devices connect through untrusted access ports where DHCP server messages from rogue devices are filtered. DHCP snooping can create a binding database used by Dynamic ARP Inspection and IP Source Guard.</desc>
			<defs>
				<linearGradient id="dhcp-trust-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="dhcp-trust-good-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
				<marker id="dhcp-trust-bad-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#d97736" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="404" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v63H10z" fill="url(#dhcp-trust-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">DHCP Snooping · Trusted and Untrusted Ports</text>
			<text x="40" y="80" fill="#dcecff" fontSize="13">Trust only the interface facing authorized DHCP infrastructure; client-facing access ports remain untrusted.</text>

			<rect x="53" y="148" width="200" height="91" rx="16" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<rect x="81" y="165" width="42" height="48" rx="5" fill="#fff" stroke="#72bd94" strokeWidth="2" />
			<circle cx="102" cy="204" r="3" fill="#18a36a" />
			<text x="177" y="183" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">AUTHORIZED DHCP</text>
			<text x="177" y="203" fill="#526584" fontSize="10" textAnchor="middle">server / relay uplink</text>
			<text x="177" y="222" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">legitimate offers / ACKs</text>

			<path d="M255 194h113" fill="none" stroke="#18a36a" strokeWidth="4" markerEnd="url(#dhcp-trust-good-arrow)" />
			<rect x="267" y="156" width="88" height="25" rx="12" fill="#edfaf3" />
			<text x="311" y="173" fill="#13754e" fontSize="9" fontWeight="700" textAnchor="middle">TRUSTED LINK</text>

			<rect x="374" y="132" width="254" height="168" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<rect x="456" y="154" width="90" height="55" rx="11" fill="#fff" stroke="#7da6dd" strokeWidth="2" />
			<path d="M469 169h64m-64 12h64m-64 12h64" stroke="#4980cb" strokeWidth="3" strokeLinecap="round" />
			<text x="501" y="230" fill="#2853a0" fontSize="12" fontWeight="700" textAnchor="middle">L2 SWITCH</text>
			<text x="501" y="249" fill="#526584" fontSize="10" textAnchor="middle">DHCP snooping enabled</text>
			<rect x="399" y="264" width="204" height="24" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="501" y="280" fill="#2853a0" fontSize="9" fontWeight="700" textAnchor="middle">binding DB: IP · MAC · VLAN · port</text>

			<path d="M628 180h95" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#dhcp-trust-good-arrow)" />
			<path d="M628 228h95" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#dhcp-trust-good-arrow)" />
			<rect x="729" y="146" width="216" height="52" rx="13" fill="#fff" stroke="#b9d2f3" />
			<text x="837" y="168" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">UNTRUSTED CLIENT PORT</text>
			<text x="837" y="185" fill="#526584" fontSize="9" textAnchor="middle">client requests permitted</text>
			<rect x="729" y="207" width="216" height="52" rx="13" fill="#fff" stroke="#b9d2f3" />
			<text x="837" y="229" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">UNTRUSTED CLIENT PORT</text>
			<text x="837" y="246" fill="#526584" fontSize="9" textAnchor="middle">server replies filtered</text>

			<rect x="781" y="282" width="112" height="54" rx="13" fill="#fff0e8" stroke="#edbd9b" />
			<text x="837" y="304" fill="#a44b13" fontSize="10" fontWeight="700" textAnchor="middle">ROGUE SERVER</text>
			<text x="837" y="321" fill="#526584" fontSize="9" textAnchor="middle">fake DHCP offer</text>
			<path d="M780 305C714 305 684 288 644 259" fill="none" stroke="#d97736" strokeWidth="3" strokeDasharray="6 5" markerEnd="url(#dhcp-trust-bad-arrow)" />
			<path d="M631 245l22 22m0-22-22 22" stroke="#d97736" strokeWidth="4" strokeLinecap="round" />
			<text x="690" y="319" fill="#a44b13" fontSize="9" fontWeight="700" textAnchor="middle">drop unauthorized server message</text>

			<text x="500" y="371" fill="#526584" fontSize="10" textAnchor="middle">An untrusted-port violation does not inherently mean the switch shuts the port; drop/action behavior depends on feature and configuration.</text>
			<text x="500" y="390" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">Snooping bindings can support Dynamic ARP Inspection and IP Source Guard.</text>
		</svg>
	);
}

function Layer2SecurityLesson() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why Layer 2 security matters</h2>
				<p className="mt-3">
					Ethernet switches forward frames within local VLANs using information such as
					MAC addresses, VLAN membership, and control-protocol messages. An attacker with
					access to a switch port may try to impersonate infrastructure, cross VLAN
					boundaries, poison address mappings, or exhaust switch resources. These attacks
					can redirect traffic, expose data, or interrupt connectivity.
				</p>
				<p className="mt-3">
					This lesson covers DHCP spoofing, VLAN hopping, ARP spoofing, and MAC flooding,
					along with switch features and configuration practices that reduce their impact.
					Exact behavior and commands vary by Catalyst model and software release; validate
					features on the target platform before deployment.
				</p>
				<TutorialDiagramFrame caption="Common Layer 2 threats target different switch functions; use the feature designed for each attack surface.">
					<Layer2ThreatsDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">1. DHCP spoofing and DHCP snooping</h2>
				<p className="mt-3">
					In a DHCP spoofing attack, an unauthorized DHCP server sends a false DHCPOFFER
					or DHCPACK to a client. If the client accepts it, the rogue server may provide
					a malicious default gateway or DNS server. Traffic can then be redirected
					through an attacker, enabling interception or manipulation if other protections
					do not stop it. The attacker may try to answer before the legitimate DHCP
					infrastructure, but timing is not the only possible attack scenario.
				</p>
				<p className="mt-3">
					<strong>DHCP snooping</strong> is a Layer 2 switch feature that distinguishes
					trusted from untrusted interfaces for DHCP server messages. Configure the port
					or uplink facing an authorized DHCP server (or a trusted DHCP relay path) as
					trusted. Client-facing ports should normally remain untrusted. The switch
					permits expected client DHCP messages from untrusted ports and filters
					server-originated messages such as OFFER and ACK received on those ports.
				</p>
				<TutorialDiagramFrame caption="The authorized server-facing path is trusted; rogue DHCP server messages arriving on client-facing untrusted ports are filtered.">
					<DhcpSnoopingTrustDiagram />
				</TutorialDiagramFrame>
				<p className="mt-3">
					An untrusted-port violation does <strong>not</strong> universally shut down or
					disable the port by default. The filtering action, counters, rate limits, and
					any configured err-disable behavior depend on platform and configuration.
					DHCP snooping can also build a binding database containing client IP, MAC,
					VLAN, and switch-port information. Features such as Dynamic ARP Inspection
					(DAI) and IP Source Guard can use that database.
				</p>
				<p className="mt-3">A simplified Catalyst configuration pattern is:</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# ip dhcp snooping
Switch(config)# ip dhcp snooping vlan 10,20
Switch(config)# interface GigabitEthernet1/0/48
Switch(config-if)# description Uplink-to-authorized-DHCP
Switch(config-if)# ip dhcp snooping trust
Switch(config-if)# exit
Switch(config)# interface range GigabitEthernet1/0/1-24
Switch(config-if-range)# ip dhcp snooping limit rate 15`}</code></pre>
				<p className="mt-3">
					Trust only the path through which valid server replies arrive; trusting an
					attacker-accessible port defeats the protection. Confirm the VLANs are enabled
					for snooping, the trusted path is correct, and any relay/server topology is
					accounted for. Rate-limit syntax and supported values vary by switch.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">2. VLAN hopping</h2>
				<p className="mt-3">
					VLAN hopping describes attempts to send or receive traffic across VLAN
					boundaries without authorization. Two commonly discussed techniques are switch
					spoofing and double tagging. Trunk negotiation, native VLAN behavior, allowed
					VLAN lists, and access-port configuration all affect exposure.
				</p>
				<h3 className="mt-5 font-bold text-[#071126]">Switch spoofing</h3>
				<p className="mt-2">
					If a user-facing switch port negotiates a trunk, an attacker may try to
					impersonate a switch and negotiate a trunk using Dynamic Trunking Protocol
					(DTP). A successful unauthorized trunk can expose traffic for VLANs allowed
					on that trunk. It is not correct to assume every VLAN is always carried:
					the allowed VLAN list and platform configuration determine which VLANs traverse
					the trunk.
				</p>
				<p className="mt-3">Mitigate switch spoofing by making user ports static access ports, disabling DTP negotiation, and explicitly limiting trunk VLANs:</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface GigabitEthernet1/0/10
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20
Switch(config-if)# switchport nonegotiate
!
Switch(config)# interface GigabitEthernet1/0/48
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport nonegotiate
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# switchport trunk native vlan 999`}</code></pre>
				<p className="mt-3">
					Use an unused, dedicated native VLAN rather than a user VLAN, and do not place
					access ports in that native VLAN. Configure compatible settings at both ends
					of each trunk; command support and trunk encapsulation behavior depend on
					switch model and software.
				</p>
				<h3 className="mt-5 font-bold text-[#071126]">Double-tagging</h3>
				<p className="mt-2">
					In a classic double-tagging scenario, an attacker on a VLAN matching a trunk's
					native VLAN sends a frame with two 802.1Q tags. The first tag matches the
					native VLAN and the inner tag identifies a target VLAN. The first switch may
					remove the outer native-VLAN tag when forwarding across a trunk; a downstream
					switch can then process the remaining tag. The attack depends on particular
					native-VLAN and trunk conditions and is generally one-way: the return frame
					is not automatically encapsulated back to the attacker.
				</p>
				<p className="mt-3">
					Reduce exposure by using an unused native VLAN, keeping user devices off the
					native VLAN, restricting allowed VLANs, and avoiding unnecessary trunks.
					Where traffic between hosts in a VLAN needs additional filtering, a VLAN
					access control list (VACL) can filter traffic within or across VLAN contexts
					as supported by the platform. Private VLANs can also provide Layer 2
					segmentation between ports. A VACL is not a universal substitute for correct
					trunk and native-VLAN configuration.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">3. ARP spoofing and Dynamic ARP Inspection</h2>
				<p className="mt-3">
					Address Resolution Protocol (ARP) maps local IPv4 addresses to MAC addresses.
					Because hosts may accept unsolicited or gratuitous ARP information, an attacker
					on the same Layer 2 network can send forged ARP messages that associate a
					legitimate gateway or host IP address with the attacker's MAC address. This
					can poison ARP caches and enable traffic interception or disruption.
				</p>
				<p className="mt-3">
					<strong>Dynamic ARP Inspection (DAI)</strong> validates ARP messages on
					configured untrusted switch ports. In a common deployment it checks sender
					IP/MAC information against DHCP snooping bindings. For devices with static
					addresses or environments without usable bindings, administrators may need
					static ARP ACL entries. Incorrect trust or binding configuration can block
					legitimate ARP traffic, so plan and verify carefully.
				</p>
				<p className="mt-3">A simplified configuration pattern for VLANs using DHCP snooping bindings is:</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# ip dhcp snooping
Switch(config)# ip dhcp snooping vlan 10,20
Switch(config)# ip arp inspection vlan 10,20
Switch(config)# interface GigabitEthernet1/0/48
Switch(config-if)# ip arp inspection trust
Switch(config-if)# exit
Switch(config)# interface range GigabitEthernet1/0/1-24
Switch(config-if-range)# ip arp inspection limit rate 15`}</code></pre>
				<p className="mt-3">
					Only trust interfaces where ARP inspection should not be performed, such as
					appropriately controlled infrastructure uplinks. Verify DAI state and drop
					counters with platform-supported <code>show ip arp inspection</code> commands,
					and verify DHCP snooping bindings before enabling inspection.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">4. MAC flooding, port security, and 802.1X</h2>
				<p className="mt-3">
					A switch learns source MAC addresses and records them in its forwarding
					(database, often called the CAM table). In a MAC-flooding attack, an attacker
					sends many frames with forged source MAC addresses in an attempt to consume
					the table's finite capacity. If the table cannot learn a destination MAC,
					the switch may flood unknown-unicast frames within that VLAN. The exact
					behavior under table exhaustion is platform-dependent; it is not accurate
					to assume every switch universally enters a defined “fail-open” state and
					broadcasts every frame.
				</p>
				<p className="mt-3">
					<strong>Port security</strong> can limit the number of MAC addresses learned
					on an access port and specify a violation action. This helps restrict the
					number of source addresses presented from a user-facing port. Configure a
					limit and violation response that match the endpoint requirements:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface GigabitEthernet1/0/10
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security violation restrict`}</code></pre>
				<p className="mt-3">
					The <code>restrict</code> action drops frames from violating MAC addresses
					and records/logs the violation while keeping the port up on supported
					platforms. Other actions, such as <code>protect</code> or <code>shutdown</code>,
					have different operational effects. Port-security capabilities and combinations
					can vary, especially with trunks, voice VLANs, and port authentication.
				</p>
				<p className="mt-3">
					<strong>IEEE 802.1X</strong> provides port-based network access control. A
					switch acts as an authenticator, the endpoint as a supplicant, and an
					authentication server (commonly RADIUS) validates credentials or certificates.
					After authentication, the network can authorize appropriate access, such as
					assigning a VLAN or applying policy. 802.1X controls who can gain network
					access; port security limits MAC learning. They address related but distinct
					problems and may be combined when supported and correctly designed.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Layer 2 defense checklist</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>DHCP:</strong> enable snooping on the client VLANs; trust only authorized server/relay paths; keep user ports untrusted; inspect bindings.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Trunks:</strong> statically configure required trunks, disable DTP where appropriate, restrict allowed VLANs, and use a dedicated unused native VLAN.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>ARP:</strong> enable DAI where bindings or ARP ACLs can validate hosts; configure trusted infrastructure interfaces carefully.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Access ports:</strong> use port security and/or 802.1X according to the endpoint and access-control design; monitor violations and logs.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Verify:</strong> check feature state, trusted-port assignments, VLAN scope, counters, bindings, trunk configuration, and expected endpoint connectivity.</li>
				</ul>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>DHCP spoofing can redirect clients with false gateway or DNS settings; DHCP snooping filters server messages on untrusted ports.</li>
					<li>Switch spoofing abuses trunk negotiation; secure access ports, disable DTP where appropriate, and restrict trunk VLANs.</li>
					<li>Double tagging depends on native-VLAN conditions; use a dedicated unused native VLAN and keep users off it.</li>
					<li>VACLs and private VLANs can add traffic controls, but do not replace secure trunk configuration.</li>
					<li>ARP spoofing falsifies IP-to-MAC mappings; DAI validates ARP using snooping bindings or configured ARP ACLs.</li>
					<li>MAC flooding attempts to exhaust the forwarding table; port security limits learned MACs, while 802.1X authenticates network access.</li>
					<li>Feature behavior and commands vary by platform; trusted interfaces and exception actions must be configured and verified deliberately.</li>
				</ul>
			</section>
		</div>
	);
}

function AaaArchitectureDiagram() {
	return (
		<svg viewBox="0 0 1000 520" role="img" aria-labelledby="aaa-architecture-title aaa-architecture-description" className="mx-auto h-auto w-full">
			<title id="aaa-architecture-title">AAA network access flow between a user, network device, and central server</title>
			<desc id="aaa-architecture-description">A user connects to a switch or router acting as the AAA client. The network device sends authentication and authorization requests to a protected RADIUS or TACACS+ server. The server returns an accept or reject and policy information. During and after the session, the network device can send accounting records. Authentication verifies identity, authorization determines permitted access, and accounting records activity.</desc>
			<defs>
				<linearGradient id="aaa-architecture-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="aaa-architecture-request-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#2872dc" />
				</marker>
				<marker id="aaa-architecture-response-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
				<marker id="aaa-architecture-accounting-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#7042b4" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="504" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#aaa-architecture-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">AAA · Centralized Network Access Control</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">The switch or router is the AAA client; users do not connect directly to the protected AAA server.</text>

			<rect x="44" y="145" width="220" height="232" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="154" y="176" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">USER / ENDPOINT</text>
			<circle cx="154" cy="222" r="25" fill="#2868bd" />
			<circle cx="154" cy="213" r="8" fill="#fff" />
			<path d="M137 240q17-24 34 0" fill="#fff" />
			<text x="154" y="270" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">requests network access</text>
			<rect x="73" y="290" width="162" height="58" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="154" y="313" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">identity credentials</text>
			<text x="154" y="331" fill="#526584" fontSize="9" textAnchor="middle">password · certificate · factor</text>
			<text x="154" y="365" fill="#526584" fontSize="9" textAnchor="middle">console · VTY · 802.1X</text>

			<rect x="382" y="130" width="236" height="264" rx="20" fill="#fff9ed" stroke="#e8c98d" strokeWidth="2" />
			<text x="500" y="162" fill="#9a640e" fontSize="13" fontWeight="700" textAnchor="middle">NETWORK DEVICE · AAA CLIENT</text>
			<circle cx="500" cy="207" r="29" fill="#bf791c" />
			<path d="M484 207h32m-16-15v30m-10-26 20 22m0-22-20 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
			<text x="500" y="255" fill="#9a640e" fontSize="11" fontWeight="700" textAnchor="middle">Switch or router</text>
			<text x="500" y="276" fill="#526584" fontSize="9" textAnchor="middle">receives login / access request</text>
			<rect x="405" y="296" width="190" height="74" rx="12" fill="#fff" stroke="#ead7b1" />
			<text x="500" y="317" fill="#9a640e" fontSize="9" fontWeight="700" textAnchor="middle">METHOD LIST</text>
			<text x="500" y="337" fill="#526584" fontSize="9" textAnchor="middle">RADIUS → local (if no response)</text>
			<text x="500" y="355" fill="#526584" fontSize="9" textAnchor="middle">or TACACS+ → enable, as configured</text>

			<rect x="738" y="130" width="218" height="264" rx="20" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="847" y="162" fill="#13754e" fontSize="13" fontWeight="700" textAnchor="middle">PROTECTED AAA SERVER</text>
			<rect x="792" y="183" width="110" height="64" rx="11" fill="#fff" stroke="#72bd94" strokeWidth="2" />
			<rect x="807" y="195" width="80" height="39" rx="4" fill="#ddf4e9" />
			<path d="M816 204h62m-62 9h62m-62 9h45" stroke="#18865d" strokeWidth="2" />
			<text x="847" y="270" fill="#176847" fontSize="11" fontWeight="700" textAnchor="middle">RADIUS / TACACS+</text>
			<text x="847" y="291" fill="#526584" fontSize="9" textAnchor="middle">identity store · policy · audit</text>
			<rect x="764" y="311" width="166" height="55" rx="11" fill="#fff" stroke="#a4d6bc" />
			<text x="847" y="333" fill="#13754e" fontSize="9" fontWeight="700" textAnchor="middle">ACCEPT / REJECT</text>
			<text x="847" y="351" fill="#526584" fontSize="9" textAnchor="middle">attributes · command policy</text>

			<path d="M266 201h109" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#aaa-architecture-request-arrow)" />
			<text x="320" y="188" fill="#2853df" fontSize="9" fontWeight="700" textAnchor="middle">login / access</text>
			<path d="M620 210h111" fill="none" stroke="#2872dc" strokeWidth="3" markerEnd="url(#aaa-architecture-request-arrow)" />
			<rect x="631" y="174" width="90" height="23" rx="11" fill="#fff" />
			<text x="676" y="190" fill="#2853df" fontSize="9" fontWeight="700" textAnchor="middle">AUTH REQUEST</text>
			<path d="M733 251H623" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#aaa-architecture-response-arrow)" />
			<rect x="630" y="253" width="94" height="23" rx="11" fill="#fff" />
			<text x="677" y="269" fill="#13754e" fontSize="9" fontWeight="700" textAnchor="middle">ACCEPT / REJECT</text>
			<path d="M620 355h111" fill="none" stroke="#7042b4" strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#aaa-architecture-accounting-arrow)" />
			<text x="676" y="344" fill="#7042b4" fontSize="9" fontWeight="700" textAnchor="middle">ACCOUNTING RECORDS</text>

			<rect x="80" y="423" width="840" height="58" rx="16" fill="#f7faff" stroke="#d5e3f5" />
			<text x="500" y="447" fill="#1a3768" fontSize="12" fontWeight="700" textAnchor="middle">AUTHENTICATION · Who are you?  |  AUTHORIZATION · What may you do?  |  ACCOUNTING · What did you do?</text>
			<text x="500" y="467" fill="#526584" fontSize="10" textAnchor="middle">A local fallback is a resilience option; protect the server path and test method-list behavior deliberately.</text>
		</svg>
	);
}

function AaaLesson() {
	const questions = [
		{
			question: "A console line uses aaa authentication login NO_AUTH none. What credentials are required?",
			answer: "None. The method list explicitly specifies none, so it performs no authentication. This should be used only when unauthenticated access is deliberately intended and physically controlled.",
		},
		{
			question: "The configuration is aaa authentication login default group radius local line. Which credentials are tried for a VTY login?",
			answer: "The default list applies to login connections, including VTY lines, even if no login authentication command is attached under those VTY lines. The device tries the RADIUS group, then the local user database, then the line password when the preceding method returns an error such as being unavailable. A reachable RADIUS server's explicit Access-Reject is a denial and does not normally trigger local fallback.",
		},
		{
			question: "What happens with aaa authentication login default group tacacs+ enable?",
			answer: "The device tries the TACACS+ server first and uses the enable authentication method only if the TACACS+ method returns an error such as no response. A TACACS+ rejection is a denial, not an indication to bypass the server and try enable.",
		},
	];

	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Why use AAA?</h2>
				<p className="mt-3">
					On a small network, a device may use a password configured directly on its
					console or remote-access lines. That is easy to start with, but it has
					important limitations: credentials and policy must be managed on each device;
					shared line passwords do not reliably identify individual users; access can
					be difficult to revoke consistently; and command-level authorization and
					audit records may be missing. Password-only login is also exposed to
					guessing attempts unless additional protections are configured.
				</p>
				<p className="mt-3">
					As an organization grows, centralized authentication can give administrators
					a consistent way to verify users, decide what access they receive, and record
					their activity. The network device still enforces the access policy; the AAA
					server is a protected service used by the device, not a system to which
					ordinary users connect directly.
				</p>
				<TutorialDiagramFrame caption="The network device acts as the AAA client, consults a protected server, enforces the result, and can report accounting records.">
					<AaaArchitectureDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">AAA means Authentication, Authorization, and Accounting</h2>
				<div className="mt-5 space-y-4">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">1. Authentication — establish who you are</h3>
						<p className="mt-2 text-sm leading-6">Authentication verifies an identity, commonly with a username and password, but potentially with a certificate, one-time factor, or another supported credential. Example: “I am user_tom, and I can prove control of the configured credential.” Authentication answers who is requesting access; it does not by itself define every action that user may perform.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">2. Authorization — determine what you may do</h3>
						<p className="mt-2 text-sm leading-6">Authorization evaluates policy for an authenticated identity and determines permitted services, resources, privilege level, or commands. Example: user_tom may reach a learning server over approved services but may not change router configuration. Cisco device authorization can be used for functions such as EXEC access and command authorization, depending on platform and method.</p>
					</div>
					<div className="rounded-xl border border-[#d3c3ef] bg-[#f7f3ff] p-5">
						<h3 className="font-bold text-[#7042b4]">3. Accounting — record what happened</h3>
						<p className="mt-2 text-sm leading-6">Accounting records activity such as session start and stop, duration, resource usage, or commands, when supported and configured. Example: the system records that user_tom opened a session, used permitted show commands, and logged out after two hours. These records support auditing and troubleshooting; they do not themselves prevent an action.</p>
					</div>
				</div>
				<p className="mt-4">
					For network access control, such as 802.1X, a user or device usually must
					authenticate before receiving ordinary network access. A restricted
					pre-authentication state may still permit required authentication traffic
					to reach the authentication infrastructure.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Local authentication, 802.1X, and remote AAA</h2>
				<p className="mt-3">
					A device can check its local user database, use port-based 802.1X access
					control, or act as a client to remote AAA servers. Local users provide a
					useful fallback or small-network option, but accounts must be maintained on
					each device. 802.1X controls access to a LAN port using an authenticator,
					supplicant, and authentication server; RADIUS is commonly used between the
					authenticator and that server. For administrator logins to routers and
					switches, RADIUS or TACACS+ can centralize credentials and policy.
				</p>
				<p className="mt-3">
					Centralization simplifies account management and auditing, and the AAA
					infrastructure can be isolated behind network controls. It also creates
					dependencies: devices need connectivity to the server, server capacity and
					redundancy must be planned, and administrators need a tested emergency
					access procedure. Local fallback should be explicitly configured and secured.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">RADIUS and TACACS+ comparison</h2>
				<p className="mt-3">
					RADIUS and TACACS+ are client/server protocols used to exchange AAA information
					between a network device (the AAA client or network access server) and a
					centralized service. Configure matching shared secrets at both ends and
					restrict reachability to the intended clients and servers.
				</p>
				<LessonImageExpand label="table">
					<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[760px] border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#173b76]">
							<tr><th className="px-4 py-3 font-bold">Property</th><th className="px-4 py-3 font-bold">RADIUS</th><th className="px-4 py-3 font-bold">TACACS+</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ecf6]">
							<tr><td className="px-4 py-3 font-semibold">Transport and common ports</td><td className="px-4 py-3">UDP. Common authentication port 1812 and accounting port 1813; older deployments may use 1645 and 1646.</td><td className="px-4 py-3">TCP port 49 for TACACS+.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Protection of packet data</td><td className="px-4 py-3">The classic protocol does not encrypt the entire packet. It obscures the password field using the shared secret; other attributes are not thereby made confidential.</td><td className="px-4 py-3">TACACS+ encrypts most of the packet body, while the header remains readable. It is not a replacement for protecting the transport path and credentials.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">AAA operation</td><td className="px-4 py-3">Authentication and authorization information are commonly returned together in the RADIUS exchange/attributes; accounting uses separate accounting messages.</td><td className="px-4 py-3">Authentication, authorization, and accounting are separate protocol services, allowing command authorization and accounting exchanges.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Administrative control</td><td className="px-4 py-3">Common for network access, including 802.1X/EAP deployments, and widely supported by access infrastructure.</td><td className="px-4 py-3">Common for centralized device-administrator login and per-command authorization on supported network devices.</td></tr>
							<tr><td className="px-4 py-3 font-semibold">Standards and history</td><td className="px-4 py-3">An IETF-standardized protocol with broad multi-vendor use.</td><td className="px-4 py-3">Originated as a Cisco protocol; TACACS+ is documented in RFC 8907. It is distinct from the older TACACS described by RFC 1492.</td></tr>
						</tbody>
					</table>
					</div>
				</LessonImageExpand>
				<p className="mt-4">
					RADIUS is not simply “insecure” and TACACS+ is not automatically secure:
					protect management networks, use strong shared secrets, limit server-client
					communication, and select current supported security mechanisms. RADIUS is
					commonly used as the backend for EAP/802.1X. Do not assume that TACACS+
					implements the same EAP role. Exact capabilities depend on the server and
					network-device implementations.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">AAA authentication method lists</h2>
				<p className="mt-3">
					On Cisco IOS, <code>aaa new-model</code> enables the AAA framework. An
					authentication method list specifies methods in order. The special name
					<code> default</code> applies to eligible login connections unless a line
					has another method list configured. A named list applies only where that
					name is explicitly attached.
				</p>
				<p className="mt-3">
					For example, <code>group radius local</code> tries the configured RADIUS
					server group first and then the local user database if the server method
					returns an error such as no response. A server's explicit Access-Reject
					means the credentials were rejected; it is not a network error and does
					not normally fall through to the next method. Thus, a local user is not
					used merely because the username is absent from a reachable RADIUS server.
				</p>
				<p className="mt-3">
					If a method list contains only <code>group radius</code> and RADIUS is
					unavailable, there is no local fallback method. Authentication fails
					instead of switching automatically to the device's local database.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Cisco IOS RADIUS login configuration</h2>
				<p className="mt-3">
					This example enables AAA, configures a RADIUS server, creates a protected
					local fallback account, defines a named method list, and applies it to VTY
					logins. The shared key is a placeholder: use a unique secret configured
					securely on both the device and RADIUS server.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# aaa new-model
Switch(config)# username test2 secret <unique-local-fallback-secret>
Switch(config)# radius-server host 192.168.1.2 auth-port 1812 acct-port 1813 key <shared-secret>
Switch(config)# aaa authentication login MY_AUTHEN_GROUP group radius local
Switch(config)# line vty 0 4
Switch(config-line)# login authentication MY_AUTHEN_GROUP
Switch(config-line)# transport input ssh`}</code></pre>
				<p className="mt-3">
					The legacy IOS syntax from the example uses <code>radius-server host</code>.
					Current IOS/IOS XE releases may prefer a named server object and server group;
					check the syntax available on the target release. The device is the RADIUS
					client, so the RADIUS server must also define the device as an authorized
					client (often called a NAS) with the matching shared secret.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`! Example of a modern IOS/IOS XE style (syntax varies by release)
Switch(config)# radius server RAD1
Switch(config-radius-server)# address ipv4 192.168.1.2 auth-port 1812 acct-port 1813
Switch(config-radius-server)# key <shared-secret>
Switch(config)# aaa group server radius RAD-GROUP
Switch(config-sg-radius)# server name RAD1
Switch(config)# aaa authentication login MY_AUTHEN_GROUP group RAD-GROUP local`}</code></pre>
				<p className="mt-3">
					If using the <code>default</code> method list instead, configure
					<code> aaa authentication login default group radius local</code>. The
					default list applies broadly to login connections such as VTY, console,
					TTY, and AUX subject to platform behavior and line-specific configuration;
					it does not require a <code>login authentication</code> line command on
					every line. Use a named list when different lines need different policies.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Cisco IOS TACACS+ configuration</h2>
				<p className="mt-3">
					TACACS+ can provide centralized login authentication, with the local
					database as a fallback when the server cannot be reached. In the
					following IOS-style example, use a matching shared key on the device
					and TACACS+ server:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# aaa new-model
Switch(config)# username breakglass secret <unique-local-fallback-secret>
Switch(config)# tacacs-server host 10.10.10.1
Switch(config)# tacacs-server key <shared-secret>
Switch(config)# aaa authentication login default group tacacs+ local
Switch(config)# line vty 0 4
Switch(config-line)# transport input ssh`}</code></pre>
				<p className="mt-3">
					These are legacy-style commands available on some IOS versions; newer releases
					may use <code>tacacs server</code> objects and named groups. If TACACS+ is
					unavailable, the configured method list can try the local database. If
					TACACS+ explicitly rejects a login, do not expect it to bypass that rejection
					and authenticate locally.
				</p>
				<p className="mt-3">
					AAA can also define authorization and accounting policies. For example, a
					TACACS+ device-administration setup can authorize EXEC access and commands,
					and record command activity where supported:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# aaa authorization exec default group tacacs+ local
Switch(config)# aaa authorization commands 15 default group tacacs+ local
Switch(config)# aaa accounting exec default start-stop group tacacs+
Switch(config)# aaa accounting commands 15 default start-stop group tacacs+`}</code></pre>
				<p className="mt-3">
					Authorization and accounting syntax and behavior vary with IOS release and
					server policy. Before enabling command authorization on a production device,
					verify the server returns the required privilege and command policy and retain
					a tested recovery path. A restrictive or unreachable policy can prevent
					administrative commands.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Applying named method lists to lines</h2>
				<p className="mt-3">
					If you define a list with a name such as <code>MY_AUTHEN_GROUP</code> rather
					than <code>default</code>, attach that exact list to the intended line. For
					example, to use the named RADIUS/local list for VTY logins:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# aaa authentication login MY_AUTHEN_GROUP group radius local
Switch(config)# line vty 0 4
Switch(config-line)# login authentication MY_AUTHEN_GROUP`}</code></pre>
				<p className="mt-3">
					The list must match exactly, including spelling. Apply separate method lists
					to console, VTY, or other lines only when their access policies should differ.
					If an intended line has no explicit named list, it uses the default behavior
					available on that device; do not assume that defining a named list automatically
					applies it everywhere.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">AAA login questions and answers</h2>
				<div className="mt-5 space-y-4">
					{questions.map((item, index) => (
						<div key={item.question} className="rounded-xl border border-[#dbe5f5] bg-[#f8faff] p-5">
							<h3 className="font-bold text-[#1756a4]">Question {index + 1}</h3>
							<p className="mt-2 text-sm leading-6">{item.question}</p>
							<p className="mt-3 text-sm leading-6"><strong>Answer:</strong> {item.answer}</p>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Operational checks and recovery planning</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Protect AAA servers:</strong> place them on a controlled management network, restrict which network devices may query them, and use strong unique shared secrets or supported stronger transport protections.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Provide resilience:</strong> configure redundant servers where supported, verify routing and firewall rules, and test what happens when servers time out or explicitly reject a user.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Keep local recovery:</strong> maintain a restricted, protected break-glass account and confirm the exact method-list fallback behavior before relying on it.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Test carefully:</strong> preserve an existing administrative session while testing a second login, verify authorization and accounting separately, and avoid locking out all administrators.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Protect credentials:</strong> do not place real passwords or shared secrets in shared examples, source control, or unprotected configuration backups.</li>
				</ul>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>Authentication establishes identity; authorization grants permitted actions; accounting records activity.</li>
					<li>The network device is the AAA client and enforces the server's decision; protect the AAA server and shared secrets.</li>
					<li>RADIUS commonly uses UDP 1812/1813; older installations may use 1645/1646. TACACS+ uses TCP 49.</li>
					<li>RADIUS commonly combines authentication and authorization information in its exchange; TACACS+ separates services and supports per-command authorization on supported devices.</li>
					<li>A method list tries methods in order; local fallback normally applies when the remote method is unavailable, not when the server explicitly rejects credentials.</li>
					<li>The default login method list applies broadly; a named list must be attached to each intended line with <code>login authentication</code>.</li>
					<li>Test server failure, explicit rejection, authorization, accounting, and emergency recovery before relying on AAA in production.</li>
				</ul>
			</section>
		</div>
	);
}

function DhcpSnoopingLesson() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What DHCP snooping protects</h2>
				<p className="mt-3">
					<strong>DHCP snooping</strong> is a Layer 2 security feature on a managed
					switch. It examines DHCP messages as they enter switch interfaces and marks
					those interfaces as either <strong>trusted</strong> or <strong>untrusted</strong>.
					By default, switch ports are untrusted for DHCP server messages. Client-facing
					ports remain untrusted, while the interface receiving authorized DHCP server
					replies (or the trusted relay path) is explicitly configured as trusted.
				</p>
				<p className="mt-3">
					A client sends DHCP requests from an untrusted port, and the switch allows
					client-originated DHCP messages needed to obtain a lease. However, server-type
					messages such as <code>DHCPOFFER</code> and <code>DHCPACK</code> arriving on
					an untrusted port are filtered. This helps prevent a rogue server plugged into
					a user port from assigning clients an incorrect address, gateway, or DNS
					server. Replies arriving through the correctly trusted infrastructure path
					are allowed.
				</p>
				<p className="mt-3">
					The untrusted designation does not mean that every packet on the interface is
					blocked; snooping applies DHCP-specific checks. A DHCP violation also does
					not inherently shut down the port. Filtering, counters, rate limits, and
					optional err-disable behavior depend on the platform and configuration.
				</p>
				<TutorialDiagramFrame caption="Keep endpoint ports untrusted; trust only the known interface/path through which authorized DHCP server replies enter the switch.">
					<DhcpSnoopingTrustDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">How the trust boundary works</h2>
				<div className="mt-5 grid gap-4 md:grid-cols-2">
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">Trusted interface</h3>
						<p className="mt-2 text-sm leading-6">
							An interface explicitly configured with <code>ip dhcp snooping trust</code>.
							It is normally the port toward the authorized DHCP server or the
							appropriate relay/server network path. DHCP server replies are accepted
							through this trust boundary.
						</p>
					</div>
					<div className="rounded-xl border border-[#edbd9b] bg-[#fff5ee] p-5">
						<h3 className="font-bold text-[#a44b13]">Untrusted interface</h3>
						<p className="mt-2 text-sm leading-6">
							The default state for switch interfaces when snooping is active. Access
							ports toward end-user devices normally stay untrusted. Server-originated
							DHCP messages received on these ports are treated as suspicious and
							filtered according to the switch's snooping policy.
						</p>
					</div>
				</div>
				<p className="mt-4">
					Trust is assigned to an interface, not to a DHCP server identity that the
					switch independently authenticates. If an unauthorized device can send DHCP
					server messages through a trusted interface, the protection may be bypassed.
					Therefore, carefully trace the actual server/relay path and trust no more
					interfaces than necessary. Across a multi-switch path, configure DHCP snooping
					and the appropriate trust boundary on each switch that must enforce this
					control.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Configure DHCP snooping on Cisco IOS</h2>
				<p className="mt-3">
					A common Catalyst configuration has two parts: enable snooping globally,
					then enable it on the VLAN or VLANs that should be protected. Finally,
					configure the server-facing interface as trusted. Command availability and
					syntax vary by switch family and software; check the platform documentation.
				</p>
				<h3 className="mt-5 font-bold text-[#071126]">Step 1: Enable snooping and select VLANs</h3>
				<p className="mt-2">
					The global command enables the feature, while the VLAN command activates
					snooping for the VLANs in the list. The list must include the VLAN where the
					DHCP clients operate.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# ip dhcp snooping
Switch(config)# ip dhcp snooping vlan 10,20`}</code></pre>
				<p className="mt-3">
					For an example using only VLAN 10, configure
					<code> ip dhcp snooping vlan 10</code>. Do not assume that the global command
					alone activates snooping for every VLAN; explicitly select the VLANs and
					verify the resulting operational status.
				</p>

				<h3 className="mt-5 font-bold text-[#071126]">Step 2: Trust the authorized DHCP path</h3>
				<p className="mt-2">
					In this example the authorized DHCP server or relay path enters through
					GigabitEthernet0/24. Enter interface configuration mode before applying the
					trust command:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface GigabitEthernet0/24
Switch(config-if)# description Uplink-to-authorized-DHCP-path
Switch(config-if)# ip dhcp snooping trust
Switch(config-if)# exit`}</code></pre>
				<p className="mt-3">
					Do not trust ordinary client-facing access ports. Trusting the wrong
					interface allows rogue DHCP server messages entering through that interface
					to cross the snooping boundary and defeats the intended protection.
				</p>

				<h3 className="mt-5 font-bold text-[#071126]">Optional: Rate-limit DHCP messages on edge ports</h3>
				<p className="mt-2">
					Some switches support a per-interface DHCP message rate limit to help contain
					excessive DHCP traffic, including certain flooding attempts. Choose a limit
					that accommodates legitimate client activity and test its effect; exceeding
					the configured threshold may trigger platform-specific actions.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface range GigabitEthernet0/1-23
Switch(config-if-range)# ip dhcp snooping limit rate 15`}</code></pre>
				<p className="mt-3">
					The rate value and interface-range syntax are platform-dependent. Apply rate
					limits only after reviewing the switch documentation and normal DHCP load.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">DHCP snooping binding database</h2>
				<p className="mt-3">
					When a client successfully obtains a DHCP lease through a snooping-enabled
					VLAN, the switch can record a binding between the client's MAC address,
					leased IP address, VLAN, switch interface, and lease information. This
					<strong> DHCP snooping binding database</strong> is useful for checking which
					client received an address and where it is connected. Depending on platform
					support and configuration, bindings can also be consumed by security features
					such as Dynamic ARP Inspection (DAI) and IP Source Guard.
				</p>
				<p className="mt-3">
					A binding entry is not a general static IP inventory. A statically addressed
					host that has not obtained its lease through DHCP snooping may not have a
					dynamic binding; DAI or IP Source Guard designs that include static hosts
					need suitable static bindings or platform-supported ACL/configuration.
				</p>
				<p className="mt-3">Use this command to inspect learned client bindings:</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# show ip dhcp snooping binding
MacAddress          IpAddress    Lease(sec)  Type           VLAN  Interface
------------------  -----------  ----------  -------------  ----  --------------------
00:A3:D1:44:20:46   10.0.0.3     85556       dhcp-snooping  10    GigabitEthernet0/1
Total number of bindings: 1`}</code></pre>
				<p className="mt-3">
					In this example the switch has recorded that client MAC
					<code> 00:A3:D1:44:20:46</code> obtained address <code>10.0.0.3</code> on
					VLAN 10 through GigabitEthernet0/1, with the lease time shown by the switch.
					Output headers and formatting differ across IOS releases.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verification and troubleshooting</h2>
				<p className="mt-3">
					Check the global/VLAN state, trusted interfaces, bindings, and snooping
					counters. Command output differs by platform, but these commands are commonly
					available:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# show ip dhcp snooping
Switch# show ip dhcp snooping binding
Switch# show ip dhcp snooping statistics
Switch# show running-config | include ip dhcp snooping
Switch# show running-config interface GigabitEthernet0/24`}</code></pre>
				<p className="mt-3">If a legitimate client cannot obtain a lease, work through these checks:</p>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Confirm the protected VLAN:</strong> snooping must be enabled globally and for the client's VLAN; verify VLAN membership and the path between client and server.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Trace the reply path:</strong> determine the interface where authorized OFFER/ACK messages enter each snooping switch. Mark only the correct server/relay-facing path trusted.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Keep edge ports untrusted:</strong> client ports should normally remain untrusted so server-type messages from an attached rogue server are filtered.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Review counters and logs:</strong> check for dropped DHCP packets, rate-limit violations, VLAN mismatch, or interface trust configuration issues.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Check relay and option handling:</strong> validate DHCP relay configuration and whether DHCP Option 82 insertion/handling is compatible with the server and other switches. Behavior and commands depend on platform.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Check the binding table:</strong> after a successful DHCP exchange, confirm the expected MAC, IP, VLAN, lease, and client-facing interface appear.</li>
				</ol>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>DHCP snooping filters unauthorized DHCP server replies arriving on untrusted interfaces.</li>
					<li>Enable snooping globally and explicitly select the VLANs to protect.</li>
					<li>Trust only the interface or path through which authorized DHCP server/relay replies enter; client-facing ports normally remain untrusted.</li>
					<li><code>show ip dhcp snooping binding</code> displays DHCP-learned MAC-to-IP bindings, lease, VLAN, and interface information.</li>
					<li>Bindings can support DAI and IP Source Guard; static-IP hosts may require separate bindings or ACL/configuration.</li>
					<li>A DHCP snooping violation does not automatically shut down a port on every switch; verify platform-specific actions and counters.</li>
				</ul>
			</section>
		</div>
	);
}

function PortSecurityTopologyDiagram() {
	return (
		<svg viewBox="0 0 1000 490" role="img" aria-labelledby="port-security-topology-title port-security-topology-description" className="mx-auto h-auto w-full">
			<title id="port-security-topology-title">Port security permits authorized MAC addresses and rejects unauthorized sources</title>
			<desc id="port-security-topology-description">A host with an explicitly configured secure MAC address AAAA.AAAA.AAAA connects to a switch access port with port security enabled. Frames from that authorized MAC are forwarded. A second device with a different MAC address violates the configured maximum and is dropped, logged, or causes the port to enter err-disabled state depending on the violation mode.</desc>
			<defs>
				<linearGradient id="port-security-topology-header" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#176fce" />
					<stop offset="100%" stopColor="#1549a6" />
				</linearGradient>
				<marker id="port-security-authorized-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#18a36a" />
				</marker>
				<marker id="port-security-blocked-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
					<path d="M0 0L10 5L0 10Z" fill="#d97736" />
				</marker>
			</defs>
			<rect x="8" y="8" width="984" height="474" rx="24" fill="#fff" stroke="#cfe0f5" strokeWidth="3" />
			<path d="M10 32a22 22 0 0 1 22-22h936a22 22 0 0 1 22 22v64H10z" fill="url(#port-security-topology-header)" />
			<text x="40" y="58" fill="#fff" fontSize="25" fontWeight="700">Port Security · Secure MAC Addresses on an Access Port</text>
			<text x="40" y="81" fill="#dcecff" fontSize="13">The switch checks source MAC addresses against the secure-address limit configured for the port.</text>

			<rect x="42" y="136" width="277" height="299" rx="20" fill="#f7faff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="180" y="167" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">AUTHORIZED ENDPOINT</text>
			<rect x="92" y="188" width="176" height="111" rx="14" fill="#fff" stroke="#a9c7ef" strokeWidth="2" />
			<rect x="111" y="204" width="57" height="42" rx="5" fill="#dceaff" stroke="#4980cb" strokeWidth="2" />
			<path d="M104 255h71m-52 0v8m34-8v8m-45 0h59" stroke="#4980cb" strokeWidth="2" strokeLinecap="round" />
			<text x="214" y="224" fill="#1a3768" fontSize="11" fontWeight="700" textAnchor="middle">Host A</text>
			<text x="214" y="244" fill="#526584" fontSize="9" textAnchor="middle">authorized device</text>
			<rect x="70" y="317" width="220" height="38" rx="12" fill="#edfaf3" stroke="#a4d6bc" />
			<text x="180" y="341" fill="#13754e" fontSize="10" fontWeight="700" textAnchor="middle">MAC AAAA.AAAA.AAAA · secure</text>
			<text x="180" y="386" fill="#526584" fontSize="10" textAnchor="middle">Frames from this address are allowed.</text>
			<text x="180" y="407" fill="#526584" fontSize="9" textAnchor="middle">Example uses a short label; real MACs are 48 bits.</text>

			<rect x="385" y="154" width="240" height="256" rx="20" fill="#eef5ff" stroke="#b9d2f3" strokeWidth="2" />
			<text x="505" y="184" fill="#2853a0" fontSize="13" fontWeight="700" textAnchor="middle">MANAGED SWITCH</text>
			<rect x="431" y="201" width="148" height="76" rx="13" fill="#fff" stroke="#7da6dd" strokeWidth="2" />
			<path d="M447 218h116m-116 15h116m-116 15h116m-101 14h86" stroke="#4980cb" strokeWidth="4" strokeLinecap="round" />
			<circle cx="455" cy="267" r="3" fill="#18a36a" />
			<circle cx="469" cy="267" r="3" fill="#18a36a" />
			<circle cx="483" cy="267" r="3" fill="#d97736" />
			<text x="505" y="306" fill="#2853a0" fontSize="11" fontWeight="700" textAnchor="middle">Ethernet0/1 · access port</text>
			<rect x="409" y="326" width="192" height="61" rx="12" fill="#fff" stroke="#b9d2f3" />
			<text x="505" y="348" fill="#2853a0" fontSize="10" fontWeight="700" textAnchor="middle">PORT SECURITY ENABLED</text>
			<text x="505" y="367" fill="#526584" fontSize="9" textAnchor="middle">maximum 1 · violation shutdown</text>

			<rect x="692" y="136" width="266" height="135" rx="18" fill="#edfaf3" stroke="#a4d6bc" strokeWidth="2" />
			<text x="825" y="166" fill="#13754e" fontSize="12" fontWeight="700" textAnchor="middle">AUTHORIZED SOURCE</text>
			<rect x="715" y="184" width="220" height="34" rx="11" fill="#fff" />
			<text x="825" y="206" fill="#13754e" fontSize="9" fontWeight="700" textAnchor="middle">AAAA.AAAA.AAAA → forwarded</text>
			<text x="825" y="246" fill="#526584" fontSize="9" textAnchor="middle">secure-up · permitted MAC count not exceeded</text>

			<rect x="692" y="292" width="266" height="143" rx="18" fill="#fff5ee" stroke="#edbd9b" strokeWidth="2" />
			<text x="825" y="322" fill="#a44b13" fontSize="12" fontWeight="700" textAnchor="middle">UNAUTHORIZED SOURCE</text>
			<rect x="715" y="339" width="220" height="34" rx="11" fill="#fff" />
			<text x="825" y="361" fill="#a44b13" fontSize="9" fontWeight="700" textAnchor="middle">0090.AB0E.4582 → violation</text>
			<text x="825" y="397" fill="#526584" fontSize="9" textAnchor="middle">drop · alert/count · or err-disable, by mode</text>

			<path d="M320 225h62" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#port-security-authorized-arrow)" />
			<path d="M320 339h62" fill="none" stroke="#d97736" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#port-security-blocked-arrow)" />
			<path d="M626 224h58" fill="none" stroke="#18a36a" strokeWidth="3" markerEnd="url(#port-security-authorized-arrow)" />
			<path d="M626 340h58" fill="none" stroke="#d97736" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#port-security-blocked-arrow)" />
			<text x="353" y="211" fill="#13754e" fontSize="8" fontWeight="700" textAnchor="middle">allowed</text>
			<text x="353" y="325" fill="#a44b13" fontSize="8" fontWeight="700" textAnchor="middle">violation</text>

			<rect x="128" y="450" width="744" height="20" rx="10" fill="#f7faff" />
			<text x="500" y="464" fill="#526584" fontSize="9" textAnchor="middle">Port security is a Layer 2 access-port control; it does not authenticate a person's identity or replace 802.1X.</text>
		</svg>
	);
}

function PortSecurityLesson() {
	return (
		<div className="mt-7 space-y-8 text-base leading-8 sm:text-lg">
			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">What switch port security does</h2>
				<p className="mt-3">
					By default, an Ethernet switch access interface may allow any connected device
					to send frames, subject to the rest of the network's configuration. An
					uncontrolled wall jack can therefore let an unauthorized device connect to
					the LAN. Cisco switch <strong>port security</strong> restricts which source
					MAC addresses are allowed on a Layer 2 switch port, either by explicitly
					configuring secure addresses, learning them dynamically with sticky learning,
					or limiting how many secure addresses the port can learn.
				</p>
				<p className="mt-3">
					If a frame arrives from a source MAC that violates the port's secure-address
					policy, the switch applies the configured violation mode. Depending on the
					mode, it can silently drop the violating traffic, record and report the
					violation, or place the port into an error-disabled state. Port security
					controls MAC addresses, not a person's identity; a device that can spoof an
					authorized MAC may evade a simple MAC-only policy. Use it as one part of a
					layered access-control design, not as a replacement for 802.1X.
				</p>
				<TutorialDiagramFrame caption="The configured secure MAC is forwarded; an unexpected source MAC triggers the port's selected violation action.">
					<PortSecurityTopologyDiagram />
				</TutorialDiagramFrame>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Three steps to configure port security</h2>
				<ol className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>1. Configure the switchport as an access port.</strong> Port-security support and command combinations depend on the switch platform; the common Catalyst access-port pattern uses <code>switchport mode access</code>.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>2. Enable port security.</strong> Enter <code>switchport port-security</code> under the interface.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>3. Choose secure MAC addresses and a maximum.</strong> Configure a static secure MAC, use sticky learning, or use a maximum that matches the devices expected on that port.</li>
				</ol>
				<p className="mt-4">
					The following is the minimum static-address example from the tutorial. The
					illustrative address <code>aaaa.aaaa.aaaa</code> represents a 48-bit MAC
					address; use the real authorized endpoint address in a live configuration.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface Ethernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security mac-address aaaa.aaaa.aaaa`}</code></pre>
				<p className="mt-3">
					With a manually configured secure MAC, the port permits that address, subject
					to the configured maximum and platform behavior. When a host with a different
					source MAC sends traffic, the switch records a port-security violation and
					applies the configured action. The switchport must meet the platform's
					port-security requirements; check the interface type and current mode if IOS
					rejects the command.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Static, dynamic, and sticky secure MACs</h2>
				<div className="mt-5 space-y-4">
					<div className="rounded-xl border border-[#b9d2f3] bg-[#f4f8ff] p-5">
						<h3 className="font-bold text-[#1756a4]">Static secure MAC address</h3>
						<p className="mt-2 text-sm leading-6">Manually configure a known endpoint address with <code>switchport port-security mac-address aaaa.aaaa.aaaa</code>. Static secure addresses are stored in the running configuration and remain after a reload when the configuration has been saved. They are useful for fixed devices but require administrative changes when an endpoint is replaced.</p>
					</div>
					<div className="rounded-xl border border-[#a4d6bc] bg-[#edfaf3] p-5">
						<h3 className="font-bold text-[#13754e]">Sticky secure MAC address</h3>
						<p className="mt-2 text-sm leading-6">Enable sticky learning with <code>switchport port-security mac-address sticky</code>. The switch learns source MAC addresses dynamically and treats learned addresses as secure. Sticky entries appear in the running configuration; save the configuration if the learned addresses should persist after a reload. If not saved, they may be lost on restart.</p>
						<pre className="mt-3 overflow-x-auto rounded-lg bg-[#101b31] p-3 text-xs leading-5 text-[#e7efff]"><code>{`Switch(config)# interface Ethernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security mac-address sticky`}</code></pre>
					</div>
					<div className="rounded-xl border border-[#e8c98d] bg-[#fff9ed] p-5">
						<h3 className="font-bold text-[#9a640e]">Maximum secure addresses</h3>
						<p className="mt-2 text-sm leading-6">Set the permitted number of secure MAC addresses with <code>switchport port-security maximum &lt;number&gt;</code>. A common access-port default is one secure address, but confirm platform behavior. Increase the maximum only when the port is expected to serve multiple devices, such as an approved phone-plus-PC design or downstream arrangement supported by the switch.</p>
						<pre className="mt-3 overflow-x-auto rounded-lg bg-[#101b31] p-3 text-xs leading-5 text-[#e7efff]"><code>{`Switch(config)# interface Ethernet0/1
Switch(config-if)# switchport port-security maximum 2`}</code></pre>
					</div>
				</div>
				<p className="mt-4">
					Sticky learning is convenient, but it does not establish who owns the device.
					An unauthorized device connected before the expected endpoint could be learned.
					For controlled deployments, clear existing learned state as appropriate,
					inspect the learned addresses, and save only verified configuration.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Port-security violation modes</h2>
				<p className="mt-3">
					Configure the switch's response with
					<code> switchport port-security violation &#123;protect | restrict | shutdown&#125;</code>.
					All modes discard traffic from a violating source; they differ in reporting
					and interface state:
				</p>
				<LessonImageExpand label="table">
					<div className="mt-5 overflow-x-auto rounded-xl border border-[#dbe5f5]">
					<table className="w-full min-w-[690px] border-collapse text-left text-sm">
						<thead className="bg-[#f1f6ff] text-[#173b76]">
							<tr><th className="px-4 py-3 font-bold">Mode</th><th className="px-4 py-3 font-bold">Traffic action</th><th className="px-4 py-3 font-bold">Reporting / port state</th></tr>
						</thead>
						<tbody className="divide-y divide-[#e5ecf6]">
							<tr><td className="px-4 py-3 font-semibold text-[#2853a0]">protect</td><td className="px-4 py-3">Drops frames from violating MAC addresses.</td><td className="px-4 py-3">No syslog/SNMP notification or violation-counter increment in classic behavior; port stays up and no new secure MACs are learned past the maximum.</td></tr>
							<tr><td className="px-4 py-3 font-semibold text-[#9a640e]">restrict</td><td className="px-4 py-3">Drops frames from violating MAC addresses.</td><td className="px-4 py-3">Increments the violation counter and generates a log/SNMP notification where supported; port stays up.</td></tr>
							<tr><td className="px-4 py-3 font-semibold text-[#a44b13]">shutdown</td><td className="px-4 py-3">Stops traffic by placing the interface into error-disabled state.</td><td className="px-4 py-3">Generates a violation notification/log where supported; the port requires recovery after the cause is addressed. This is commonly the default mode.</td></tr>
						</tbody>
					</table>
					</div>
				</LessonImageExpand>
				<p className="mt-4">
					The exact logging, SNMP, counter, and recovery behavior may vary by platform
					and software. Verify the switch's command reference and test the chosen mode
					before applying it to production ports.
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface Ethernet0/1
Switch(config-if)# switchport port-security violation restrict`}</code></pre>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Verify port security</h2>
				<p className="mt-3">
					Use <code>show port-security interface &lt;interface&gt;</code> to inspect
					the state, mode, maximum, learned/configured secure-address counts, last
					source address, and violation count. Also inspect the interface and secure
					MAC table:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# show port-security interface Ethernet0/1
Switch# show port-security address
Switch# show running-config interface Ethernet0/1
Switch# show interfaces Ethernet0/1`}</code></pre>
				<p className="mt-3">A port with one learned sticky address may display output similar to this:</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# show port-security interface Ethernet0/0
Port Security              : Enabled
Port Status                : Secure-up
Violation Mode             : Shutdown
Aging Time                 : 0 mins
Aging Type                 : Absolute
SecureStatic Address Aging : Disabled
Maximum MAC Addresses      : 1
Total MAC Addresses        : 1
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 1
Last Source Address:Vlan   : AAAA.AAAA.AAAA:1
Security Violation Count   : 0`}</code></pre>
				<p className="mt-3">
					Field labels and formatting vary by IOS release. <code>Secure-up</code>
					means port security is enabled and the interface is operational. The address
					counts distinguish static and sticky entries; compare them with the intended
					configuration and maximum.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Recognize and recover from a security violation</h2>
				<p className="mt-3">
					When an unexpected MAC address exceeds the maximum under shutdown mode, the
					switch can log messages like these, then place the port into error-disabled
					state:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`%PM-4-ERR_DISABLE: psecure-violation error detected on Et0/0, putting Et0/0 in err-disable state
%PORT_SECURITY-2-PSECURE_VIOLATION: Security violation occurred, caused by MAC address 0090.ab0e.4582 on port Ethernet0/0.
%LINEPROTO-5-UPDOWN: Line protocol on Interface Ethernet0/0, changed state to down
%LINK-3-UPDOWN: Interface Ethernet0/0, changed state to down`}</code></pre>
				<p className="mt-3">
					Check the interface status and port-security state. A shutdown violation can
					appear as <code>Secure-shutdown</code>:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch# show interfaces Ethernet0/0
Ethernet0/0 is down, line protocol is down (err-disabled)

Switch# show port-security interface Ethernet0/0
Port Security              : Enabled
Port Status                : Secure-shutdown
Violation Mode             : Shutdown
Maximum MAC Addresses      : 1
Total MAC Addresses        : 1
Configured MAC Addresses   : 1
Sticky MAC Addresses       : 0
Last Source Address:Vlan   : 0090.AB0E.4582:1
Security Violation Count   : 1`}</code></pre>
				<p className="mt-3">
					Before restoring the port, identify why the address violated policy. Remove
					an unauthorized device or update the authorized MAC/maximum only if approved.
					Then manually reset the interface:
				</p>
				<pre className="mt-4 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`Switch(config)# interface Ethernet0/0
Switch(config-if)# shutdown
Switch(config-if)# no shutdown`}</code></pre>
				<p className="mt-3">
					Some platforms support automatic err-disable recovery timers, but automatic
					recovery can bring a port back while the unauthorized device is still
					connected. Prefer correcting the cause first, and configure automatic recovery
					only when its operational and security effects are understood.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Port-security aging</h2>
				<p className="mt-3">
					Aging can remove eligible secure MAC addresses after a configured time. Static
					secure MAC addresses do not age by default; platform support and aging behavior
					depend on whether an address is static, sticky, or dynamically learned and on
					the configured aging type. If you enable aging, choose absolute or inactivity
					behavior intentionally and verify which secure address types the platform
					will age. The sample verification output shows an aging time of zero minutes
					and secure-static aging disabled.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Deployment checklist</h2>
				<ul className="mt-4 space-y-3">
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Confirm the port role:</strong> apply port security only to supported edge/access interfaces and verify the interface is configured in a compatible mode.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Choose address learning:</strong> use static MACs for fixed endpoints or sticky learning after confirming the correct device is connected.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Set a realistic maximum:</strong> account for approved phones, attached PCs, or other expected endpoints rather than increasing the limit without review.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Select a violation response:</strong> balance silent drops, alerting, and shutdown impact against the organization's security and availability requirements.</li>
					<li className="rounded-xl bg-[#f8faff] p-4 leading-7"><strong>Verify and save:</strong> inspect learned MACs, maximum, mode, counters, and port status; save sticky entries only after confirming they are authorized.</li>
				</ul>
			</section>

			<section className="rounded-2xl border border-[#b9d2f3] bg-[#f4f8ff] p-5 sm:p-6">
				<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Key takeaways</h2>
				<ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
					<li>Port security restricts source MAC addresses on supported switch ports.</li>
					<li>Use static secure MAC addresses or sticky learning; save the configuration if sticky entries must survive a reload.</li>
					<li>Set <code>switchport port-security maximum</code> for the number of approved addresses expected on the port.</li>
					<li>Protect drops violating traffic silently; restrict also reports/counts violations; shutdown places the interface into err-disabled state.</li>
					<li>Use <code>show port-security interface</code> and <code>show port-security address</code> to verify state and learned addresses.</li>
					<li>Investigate and correct the cause before recovering a secure-shutdown port with <code>shutdown</code> and <code>no shutdown</code>.</li>
					<li>MAC filtering does not authenticate a person and does not replace 802.1X or other access controls.</li>
				</ul>
			</section>
		</div>
	);
}

export default function CcnaKnowledgeModuleFive({ article }) {
	if (article.contentType === "security-concepts") {
		return <KeySecurityConceptsLesson />;
	}

	if (article.contentType === "acl") {
		return <AccessListLesson />;
	}

	if (article.contentType === "layer2-security") {
		return <Layer2SecurityLesson />;
	}

	if (article.contentType === "aaa") {
		return <AaaLesson />;
	}

	if (article.contentType === "port-security") {
		return <PortSecurityLesson />;
	}

	if (article.contentType === "dhcp-snooping") {
		return <DhcpSnoopingLesson />;
	}

	return <CcnaKnowledgeModulePlaceholder article={article} category="5.0 Security Fundamentals" />;
}
