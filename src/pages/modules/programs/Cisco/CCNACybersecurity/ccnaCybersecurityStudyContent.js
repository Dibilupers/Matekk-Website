export const CCNA_CYBERSECURITY_STUDY_CONTENT = {
	"1.0": {
		intro: "Security fundamentals establish how to protect information and systems while maintaining reliable operations. This module also includes the detailed CCNA tutorials for security concepts, ACLs, Layer 2 protections, AAA, port security, and DHCP snooping.",
		sections: [
			{
				title: "Security objectives, risk, and controls",
				body: "Confidentiality limits information access, integrity protects accuracy and trustworthiness, and availability keeps services usable. A threat could cause harm; a vulnerability is a weakness; an exploit uses a weakness; risk combines likelihood and impact. Defense in depth layers safeguards so one failed control does not expose the entire system.",
				points: ["Identify the asset and security objective before choosing a control.", "Use least privilege and layered safeguards; no single control removes all risk."],
				example: "A public server with an unpatched service has a vulnerability; a threat actor may use an exploit, while patching and network segmentation reduce likelihood and impact.",
			},
			{
				title: "Identity and access models",
				body: "Authentication verifies identity, authorization determines allowed actions, and accounting records activity. Discretionary controls let owners grant access; mandatory controls enforce centrally defined labels; role-based controls assign permissions by job role; attribute- and rule-based controls evaluate properties and conditions.",
				points: ["Separate identity proof from permission checks and audit records.", "Grant the minimum access required and review it when duties change."],
				example: "An administrator authenticates with MFA, receives a role limited to read-only monitoring, and has privileged actions recorded for review.",
			},
			{
				title: "Network access protections",
				body: "ACLs evaluate ordered permit and deny statements, with unmatched traffic denied by the implicit deny. AAA can use local or centralized RADIUS/TACACS+ services. Port security constrains learned MAC addresses; DHCP snooping trusts only approved DHCP paths and builds bindings that support other Layer 2 protections.",
				points: ["Place and verify ACLs in the correct direction and interface.", "Trust only authorized infrastructure ports; keep user-facing switch ports untrusted."],
				example: "A switch can allow DHCP server replies only from a trusted uplink, preventing a rogue workstation from offering clients a false gateway.",
			},
		],
	},
	"2.0": {
		intro: "Security monitoring observes activity across networks, endpoints, applications, and cloud services. No single sensor sees everything: encryption hides payloads, NAT changes addresses, tunnels encapsulate traffic, and load balancers can distribute a session across systems. Analysts correlate multiple sources to build a defensible timeline.",
		sections: [
			{
				title: "Monitoring sources and data types",
				body: "Packet capture records packet details and, when visible, payloads. NetFlow summarizes conversations such as source/destination addresses, ports, protocol, byte counts, and duration. Firewalls record policy decisions; application controls classify application behavior; web and email filters record content-policy events. Session, transaction, statistical, metadata, and alert data each provide different detail and volume.",
				points: ["Use packet data for protocol-level detail and flow data for broad traffic patterns.", "Record sensor location, time synchronization, filtering, and retention limits."],
				example: "A flow record may show a host sent an unusually large amount of data to a remote address, while a packet capture is needed to inspect the visible protocol exchange.",
			},
			{
				title: "Attacks and visibility gaps",
				body: "Monitoring may reveal denial-of-service patterns, protocol abuse, man-in-the-middle behavior, web injection attempts, social engineering, endpoint malware, or command-and-control traffic. ACLs, NAT/PAT, encryption, tunnels, TOR, peer-to-peer traffic, encapsulation, and load balancing can hide or transform evidence. Certificates and TLS metadata help explain identity and negotiated protection, but do not make encrypted payloads readable.",
				points: ["Do not treat absent payload visibility as proof that no activity occurred.", "Correlate endpoint, DNS, identity, firewall, and flow evidence when traffic is encrypted."],
				example: "A proxy log may identify a requested domain while a network sensor sees only an encrypted TLS session to the proxy.",
			},
			{
				title: "Certificate and cryptography evidence",
				body: "Public-key cryptography supports identity verification and key exchange; symmetric cryptography efficiently protects data after keys are established. X.509 certificates bind an identity to a public key through a trust chain. Cipher suites describe selected cryptographic algorithms, protocol versions define supported TLS behavior, and PKCS standards describe cryptographic structures and operations.",
				points: ["Check certificate subject/SAN, issuer, validity dates, trust chain, and protocol version.", "Interpret certificate metadata in context; a valid certificate does not prove an application is benign."],
				example: "A certificate validation error may result from an expired certificate, a name mismatch, an untrusted issuer, or a device clock that is incorrect.",
			},
		],
	},
	"3.0": {
		intro: "Host-based analysis uses endpoint state and operating-system evidence to understand activity that network sensors may not observe. Investigators combine security-tool alerts, system logs, process and service context, and preserved files while maintaining evidence integrity.",
		sections: [
			{
				title: "Endpoint security technologies and operating systems",
				body: "Host intrusion detection can alert on rules or behavior; antivirus and antimalware compare activity to known or suspicious patterns; a host firewall controls local connections. Windows and Linux expose users, processes, services, files, permissions, scheduled tasks, and logs through different interfaces. Establishing a baseline helps distinguish expected administration from unusual activity.",
				points: ["Identify the host, user, process, parent process, timestamp, and affected resource.", "Use multiple endpoint controls as complementary evidence, not interchangeable products."],
				example: "An unexpected process launched by a script interpreter may be more suspicious when its user, command line, network connection, and time also match a security alert.",
			},
			{
				title: "Attribution, indicators, and evidence",
				body: "Attribution organizes evidence around assets, possible threat actors, indicators of compromise, and indicators of attack; it should express confidence rather than unsupported certainty. Chain of custody records who collected or handled evidence and when. Best evidence is the most direct available source; corroborative evidence supports another observation; indirect evidence suggests a conclusion without proving it alone.",
				points: ["Preserve originals and document collection method, time, tool, and custodian.", "Treat an IOC as a lead to investigate, not automatic proof of an actor or intent."],
				example: "A hash match is stronger when supported by file path, process execution, endpoint telemetry, and a corresponding network connection.",
			},
			{
				title: "Disk images, logs, and malware reports",
				body: "A forensic disk image should be acquired and verified with hashes so later analysis can detect changes. Compare expected metadata and file-system evidence to identify tampering. Operating-system, application, and command-line logs can reveal logons, process starts, configuration changes, and errors. Sandbox reports summarize observed behavior such as hashes, URLs, systems, events, and network activity.",
				points: ["Work from verified copies and preserve the source evidence.", "Interpret a sandbox report as observed behavior under test conditions; absence of behavior is not proof of safety."],
				example: "If a malware report lists a hash and contacted URL, search endpoint and DNS/proxy logs for matching events and build a timeline around the first execution.",
			},
		],
	},
	"4.0": {
		intro: "Network intrusion analysis turns alerts and packet evidence into a timeline of what communicated, which controls observed it, and what impact may have occurred. It requires understanding sensor behavior, protocol fields, false-alert possibilities, and how to preserve and interpret packet captures.",
		sections: [
			{
				title: "Sensors, alert quality, and inspection",
				body: "IDS/IPS, firewalls, application controls, proxy logs, antivirus, and NetFlow observe different parts of activity. A true positive identifies malicious activity; a false positive flags benign activity; a false negative misses a real event; a true negative correctly identifies benign activity. Packet filters inspect selected headers, stateful firewalls track connection state, and deep packet inspection examines more protocol context where visible.",
				points: ["Map an event to the technology that produced it and understand that sensor's limits.", "Validate alerts against independent evidence and expected business activity."],
				example: "A firewall deny event proves a policy blocked a connection attempt, but does not by itself prove the source host was compromised.",
			},
			{
				title: "Capture methods and PCAP workflow",
				body: "Inline inspection can block or modify traffic but becomes part of the forwarding path. A tap or mirror observes a copy without directly controlling it and may drop packets under load. NetFlow provides summarized transactional records; a PCAP can show packet order and payload detail. In Wireshark, select a conversation, follow the TCP stream, and export a transferred object only when the protocol and capture support it.",
				points: ["Record where and how the capture was taken, plus any filters or packet loss.", "Use stream reconstruction to understand context; validate extracted files safely and preserve their hashes."],
				example: "A flow record can narrow the search to a host pair and time range; the matching PCAP can then show DNS lookup, TCP setup, and HTTP or TLS exchange.",
			},
			{
				title: "Protocol fields, artifacts, and regular expressions",
				body: "Intrusion analysis may examine Ethernet, IPv4/IPv6, TCP/UDP, ICMP, DNS, mail protocols, HTTP/HTTPS, and ARP. Common fields include source/destination addresses, ports, flags, sequence, and payload. Event artifacts may also contain process or registry paths, API calls, hashes, and URI/URL values. Regular expressions match text patterns, but must be tested to avoid overly broad matches.",
				points: ["Use the 5-tuple—source address, destination address, source port, destination port, protocol—to isolate conversations.", "Normalize timestamps and correlate packet, endpoint, proxy, and alert artifacts."],
				example: "A suspicious DNS query followed by a connection to the returned address can be checked against proxy logs and the initiating process on the endpoint.",
			},
		],
	},
	"5.0": {
		intro: "Host-based analysis examines operating-system activity and endpoint telemetry. Identify processes, services, users, files, and event logs; compare endpoint controls such as antivirus, host firewalls, and intrusion detection; and preserve evidence so investigation findings can be checked and reproduced.",
		sections: [
			{
				title: "Endpoint tools and investigative context",
				body: "Host intrusion detection, antivirus/antimalware, and host firewalls provide distinct observations. Establish which user and asset are involved, what process ran, which files or services changed, and whether related network activity occurred. Attribution uses evidence such as assets, actors, IOCs, IOAs, and chain-of-custody records; it should be stated with appropriate confidence.",
				points: ["Correlate operating-system, application, and security-product logs.", "Compare a disk image with verified acquisition details and preserve evidence integrity."],
				example: "A sandbox report's hash or URL can be searched in endpoint and network records to determine whether other systems show the same activity.",
			},
			{
				title: "Network evidence and intrusion analysis",
				body: "Map events to IDS/IPS, firewall, application-control, proxy, antivirus, or flow sources. Distinguish false and true positives/negatives, then compare packet filtering, stateful inspection, and deep packet inspection. Taps provide observation; inline tools can affect traffic. NetFlow summarizes transactions, while a PCAP retains packet-level evidence.",
				points: ["Extract a TCP stream from a PCAP only after identifying the relevant conversation.", "Interpret protocol headers and artifacts to connect addresses, ports, processes, hashes, and URLs."],
				example: "A PCAP can establish a client-to-server sequence; endpoint logs can then identify which process opened the connection and whether a file was written.",
			},
			{
				title: "Evidence-driven security operations",
				body: "Use repeatable procedures to preserve files, hashes, timestamps, and collection records. Classify protected information and profile normal network/server behavior—throughput, session duration, listening ports, users, processes, and applications—so deviations can be investigated. Cyber Kill Chain and Diamond Model concepts help organize intrusion events and relationships.",
				points: ["Collect volatile evidence promptly when policy and incident procedures require it.", "Use SOC measures such as time to detect, contain, respond, and control to improve operations."],
				example: "A normally quiet server suddenly initiating many outbound sessions is a profiling anomaly to investigate alongside process, user, and alert evidence.",
			},
		],
	},
	"6.0": {
		intro: "Security policies and procedures organize people, technology, and evidence before, during, and after an incident. A response should follow the approved plan, preserve trustworthy evidence, coordinate stakeholders, and restore services safely while capturing lessons that improve future readiness.",
		sections: [
			{
				title: "Management and incident response lifecycle",
				body: "Asset, configuration, mobile-device, patch, and vulnerability management establish what exists and how it is maintained. NIST SP 800-61 describes preparation; detection and analysis; containment, eradication, and recovery; and post-incident activity. Apply the organization's approved plan and record decisions, approvals, and timestamps.",
				points: ["Preparation makes contacts, roles, tools, backups, and escalation paths available before an incident.", "Containment should limit harm while preserving the evidence needed to understand the event."],
				example: "For a compromised endpoint, isolate it using the approved process, preserve volatile evidence when required, investigate scope, remove the cause, restore from trusted state, then document lessons learned.",
			},
			{
				title: "Stakeholders, evidence, and protected data",
				body: "Incident roles may include security operations, IT, legal, privacy, management, communications, and service owners. NIST SP 800-86 emphasizes forensic principles such as evidence collection order, data integrity, preservation, and volatile data collection. Protected data can include personally identifiable information (PII), payment or sensitive information, health information (PHI), and intellectual property.",
				points: ["Coordinate actions through defined roles and escalation channels.", "Limit evidence access, maintain chain of custody, and classify data before sharing findings."],
				example: "Before exporting logs to an external responder, confirm authorization, minimize sensitive fields, record the transfer, and preserve an original copy.",
			},
			{
				title: "Profiling, intrusion models, and SOC metrics",
				body: "Network profiles track throughput, session duration, ports, and critical address spaces; server profiles track listening ports, service accounts, processes, tasks, and applications. Cyber Kill Chain stages describe a campaign progression; the Diamond Model relates adversary, capability, infrastructure, and victim. SOC metrics such as time to detect, contain, respond, and control reveal process bottlenecks.",
				points: ["Compare observations with a documented baseline and account for legitimate changes.", "Use intrusion models to organize evidence, not as a substitute for verifying it."],
				example: "A rise in time-to-contain may indicate an escalation or coordination gap; review incident timelines and stakeholder handoffs to identify a concrete process improvement.",
			},
		],
	},
};
