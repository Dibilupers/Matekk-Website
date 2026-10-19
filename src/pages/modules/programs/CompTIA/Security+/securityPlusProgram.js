import SecurityPlusBadge from "../../../../../assets/security+.webp";

const SECURITY_PLUS_PROGRAM = {
	programKey: "comptia-security-plus",
	includeAllQuestionsExam: true,
	title: "Security+",
	badge: SecurityPlusBadge,
	coursePath: "/training/comptia/security+",
	gradebookPath: "/modules/programs/comptia-security-plus/gradebook",
	headline: "Build confidence in",
	highlight: "cybersecurity.",
	intros: [
		"Build practical security skills across security concepts, threat mitigation, architecture, operations, and governance.",
		"Explore how security professionals protect systems, networks, and organizational data.",
		"Follow the CompTIA Security+ learning path through five focused exam domains.",
	],
	banner: {
		before: "Develop practical skills to protect systems, networks, and data against",
		highlight: "evolving security threats.",
	},
	overview: "A guided learning path through the five CompTIA Security+ exam domains and the security practices behind them.",
	focusAreas: ["Security concepts and cryptography", "Threat mitigation and architecture", "Security operations and governance"],
	modules: [
		{
			number: "1.0",
			title: "General security concepts",
			weight: "12%",
			description: "Build a shared security foundation for protecting information and managing change.",
			topics: ["Security controls and the CIA triad", "Authentication, authorization, accounting, and zero trust", "Change management and documentation", "Cryptography, PKI, hashing, and digital signatures"],
		},
		{
			number: "2.0",
			title: "Threats, vulnerabilities, and mitigations",
			weight: "22%",
			description: "Recognize common threat actors, attack surfaces, vulnerabilities, and defensive strategies.",
			topics: ["Threat actors, motivations, and resources", "Threat vectors and attack surfaces", "Application, OS, hardware, and cloud vulnerabilities", "Malicious activity and mitigation techniques"],
		},
		{
			number: "3.0",
			title: "Security architecture",
			weight: "18%",
			description: "Apply security principles to enterprise infrastructure, data protection, and resilience.",
			topics: ["On-premises, cloud, virtualization, IoT, and ICS", "Secure infrastructure design and network appliances", "Data types, classification, and sovereignty", "High availability, backups, and recovery planning"],
		},
		{
			number: "4.0",
			title: "Security operations",
			weight: "28%",
			description: "Operate and monitor security controls while responding to vulnerabilities and incidents.",
			topics: ["Secure baselines, hardening, and asset management", "Vulnerability management and security monitoring", "Firewalls, IDS/IPS, identity, and access management", "Automation, incident response, forensics, and threat hunting"],
		},
		{
			number: "5.0",
			title: "Security program management and oversight",
			weight: "20%",
			description: "Support security programs with governance, risk management, compliance, and awareness.",
			topics: ["Policies, standards, procedures, and governance", "Risk assessments, registers, tolerance, and BIA", "Third-party risk and vendor agreements", "Compliance, audits, privacy, and security awareness"],
		},
	],
};

export default SECURITY_PLUS_PROGRAM;
