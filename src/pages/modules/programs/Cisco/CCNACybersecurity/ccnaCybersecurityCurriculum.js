import { CCNA_CYBERSECURITY_MODULES } from "../../../../training/cisco/ccna/cybersecurityModules.js";
import { CCNA_CURRICULUM } from "../CCNA/ccnaCurriculum.js";
import { CCNA_CYBERSECURITY_STUDY_CONTENT } from "./ccnaCybersecurityStudyContent.js";
import { CCNA_CYBERSECURITY_MODULE_2_LESSONS } from "./ccnaCybersecurityModule2Content.js";
import { CCNA_CYBERSECURITY_MODULE_3_LESSONS } from "./ccnaCybersecurityModule3Content.js";
import { CCNA_CYBERSECURITY_MODULE_4_LESSONS } from "./ccnaCybersecurityModule4Content.js";
import { CCNA_CYBERSECURITY_MODULE_5_LESSONS } from "./ccnaCybersecurityModule5Content.js";
import { CCNA_CYBERSECURITY_MODULE_6_LESSONS } from "./ccnaCybersecurityModule6Content.js";

const ccnaSecurityModule = CCNA_CURRICULUM.find((module) => module.number === "5.0");
if (!ccnaSecurityModule) {
	throw new Error("CCNA curriculum is missing the Security Fundamentals module.");
}

const CCNA_SECURITY_CONTENT_TYPES = {
	"Key Security Concepts Tutorial": "security-concepts",
	"Access List Tutorial": "acl",
	"Layer 2 Threats and Security Features": "layer2-security",
	"AAA TACACS+ and RADIUS Tutorial": "aaa",
	"Port-Security Tutorial": "port-security",
	"DHCP Snooping Tutorial": "dhcp-snooping",
};

const CYBERSECURITY_MODULE_GUIDES = [
	"Security concepts provide a shared way to reason about what must be protected and how it could be harmed. Apply confidentiality, integrity, and availability to real systems; distinguish threats, vulnerabilities, exploits, and risk; and compare access-control models, defense in depth, and CVSS factors. Consider visibility gaps across network, host, and cloud data when selecting controls.",
	"Security monitoring combines network, endpoint, and application evidence to identify suspicious behavior. Learn what packet captures, flow records, firewall events, and content filters can reveal, and how NAT, encryption, tunneling, and load balancing can limit visibility. Correlate sources and time ranges instead of treating a single alert as proof.",
	"Host-based analysis examines operating-system activity and endpoint telemetry. Identify processes, services, users, files, and event logs; compare endpoint controls such as antivirus, host firewalls, and intrusion detection; and preserve evidence so investigation findings can be checked and reproduced.",
	"Network intrusion analysis connects alerts to their source technologies and validates them against traffic evidence. Compare packet filtering, stateful inspection, and deep packet inspection; read PCAPs and protocol headers; and correlate addresses, ports, processes, hashes, URLs, and event times to determine what happened.",
	"Security policies and incident procedures coordinate people, evidence, and technical actions. Use preparation, detection and analysis, containment, eradication, recovery, and lessons learned as a disciplined lifecycle. Preserve evidence integrity, classify protected data, profile normal activity, and use response metrics to find process improvements.",
];

const CYBERSECURITY_MODULE_STUDY_POINTS = [
	["Apply confidentiality, integrity, and availability to determine which security properties are at risk.", "Distinguish a threat from a vulnerability, exploit, and resulting risk.", "Use layered controls and least-privilege access rather than relying on a single safeguard."],
	["Know what each monitoring source records, and what it cannot see.", "Correlate packet, flow, alert, and endpoint evidence to build a timeline.", "Account for encryption, NAT, tunnels, and proxies when interpreting missing or transformed traffic."],
	["Establish a baseline for users, processes, services, and expected endpoint activity.", "Use event logs, file metadata, and security-tool output to test an investigative hypothesis.", "Preserve original evidence and record collection steps so integrity and chain of custody can be demonstrated."],
	["Map each event to the sensor that observed it, then verify it with independent evidence.", "Read packet headers and flow records to identify communicating hosts, services, and sequence.", "Separate true alerts from false positives by checking context, payload, and host activity."],
	["Follow the approved incident-response plan and document decisions as they are made.", "Contain affected systems while preserving evidence needed for analysis.", "Use lessons learned and time-to-detect/respond metrics to improve controls and procedures."],
];

function renumberObjective(text, moduleNumber) {
	return text.replace(/^(\s*)\d+(?=\.)/, `$1${moduleNumber}`);
}

function parseObjective(text) {
	const match = text.match(/^\s*(\d+(?:\.\d+)*(?:\.[a-z])?)\s+(.+)$/i);
	return match ? { number: match[1], title: match[2] } : { number: "", title: text };
}

function simplifyObjectiveTitle(title) {
	const simplified = title
		.replace(/^(?:Describe the purpose and usage of|Describe the function of|Describe the functionality of|Describe the role of|Describe the principles of|Describe the impact of|Describe the uses of|Describe the elements in|Describe the relationship of|Compare the impact and no impact for|Compare the characteristics of|Compare the functionality of|Identify the components of|Identify the type of|Identify the types of|Identify potential|Interpret the output report of|Interpret the fields in|Interpret common artifact elements from an event to|Map elements to these steps of analysis based on the|Map the organization stakeholders against the|Map the provided events to|Describe|Compare|Explain|Interpret|Identify|Apply|Construct|Utilize|Recognize|Map)\s+/i, "")
		.replace(/\((?:such as|includes?|including)\b[^)]*\)/gi, "")
		.replace(/\bin a given scenario\b|\bas related to intrusion analysis\b|\bas stated in [A-Z0-9.]+\b|\bas documented in [A-Z0-9.]+\b/gi, "")
		.replace(/\s+/g, " ")
		.replace(/[\s,;:/-]+$/, "")
		.replace(/^(?:a|an|the)\s+/i, "")
		.trim();
	const words = simplified.split(" ");
	const shortened = words.length > 9 ? `${words.slice(0, 8).join(" ")}...` : simplified;
	return shortened ? `${shortened[0].toUpperCase()}${shortened.slice(1)}` : shortened;
}

function estimateReadDuration(lessonText, studyContent) {
	const studyText = [
		studyContent.intro,
		...studyContent.sections.flatMap((section) => [
			section.title,
			section.body,
			...section.points,
			section.example,
		]),
	].join(" ");
	const wordCount = `${lessonText} ${studyText}`.trim().split(/\s+/).filter(Boolean).length;
	return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
}

function createObjectiveLessons(module, studyGuide, studyPoints, studyContent) {
	return module.items.map((item, index) => {
		const objective = parseObjective(typeof item === "string" ? item : item.subTitle);
		const details = typeof item === "string"
			? []
			: item.items.map((subItem) => parseObjective(subItem).title);
		return {
			number: objective.number || `${module.number.replace(".0", "")}.${index + 1}`,
			title: simplifyObjectiveTitle(objective.title),
			summary: typeof item === "string"
				? `${objective.title}. This objective is part of ${parseObjective(module.title).title} and should be understood in the context of the module study guide.`
				: `${objective.title}. This objective includes ${details.join("; ")}.`,
			details,
			duration: estimateReadDuration(`${objective.title} ${details.join(" ")}`, studyContent),
			slug: slugifyCybersecurityLesson(objective.title),
			studyGuide,
			studyPoints,
			studyContent,
		};
	});
}

export const CCNA_CYBERSECURITY_CURRICULUM = [
	{
		number: "1.0",
		title: "Security Fundamentals",
		description: ccnaSecurityModule.description,
		studyGuide: "This module reuses the CCNA Security Fundamentals lessons covering security concepts, access lists, Layer 2 protections, AAA, port security, and DHCP snooping.",
		studyPoints: ["Recognize common threats, vulnerabilities, and security controls.", "Apply access policy and identity controls to network devices.", "Use Layer 2 protections to reduce unauthorized access and network abuse."],
		studyContent: CCNA_CYBERSECURITY_STUDY_CONTENT["1.0"],
		lessons: ccnaSecurityModule.tutorials.map((tutorial) => ({
			...tutorial,
			number: tutorial.number.replace(/^\d+(?=\.)/, "1"),
			slug: slugifyCybersecurityLesson(tutorial.title),
			contentType: CCNA_SECURITY_CONTENT_TYPES[tutorial.title],
		})),
	},
	...CCNA_CYBERSECURITY_MODULES.map((sourceModule, index) => {
		const moduleNumber = index + 2;
		const module = {
			...sourceModule,
			number: `${moduleNumber}.0`,
			title: renumberObjective(sourceModule.title, moduleNumber),
		};
		module.items = sourceModule.items.map((item) => {
			if (typeof item === "string") return renumberObjective(item, moduleNumber);
			return {
				...item,
				subTitle: renumberObjective(item.subTitle, moduleNumber),
				items: item.items.map((subItem) => renumberObjective(subItem, moduleNumber)),
			};
		});
		const studyGuide = CYBERSECURITY_MODULE_GUIDES[index];
		const studyPoints = CYBERSECURITY_MODULE_STUDY_POINTS[index];
		const studyContentKey = ["1.0", "2.0", "3.0", "4.0", "6.0"][index] ?? module.number;
		const studyContent = CCNA_CYBERSECURITY_STUDY_CONTENT[studyContentKey];
		if (!studyGuide || !studyPoints?.length || !studyContent) {
			throw new Error(`Missing study content for CCNA Cybersecurity module ${module.number}.`);
		}
		return {
			number: module.number,
			title: parseObjective(module.title).title,
			description: `${parseObjective(module.title).title} — CCNA Cybersecurity course objectives.`,
			studyGuide,
			studyPoints,
			studyContent,
			lessons: index === 0
				? CCNA_CYBERSECURITY_MODULE_2_LESSONS
				: index === 1
					? CCNA_CYBERSECURITY_MODULE_3_LESSONS
					: index === 2
						? CCNA_CYBERSECURITY_MODULE_4_LESSONS
						: index === 3
							? CCNA_CYBERSECURITY_MODULE_5_LESSONS
							: index === 4
								? CCNA_CYBERSECURITY_MODULE_6_LESSONS
				: createObjectiveLessons(module, studyGuide, studyPoints, studyContent),
		};
	}),
];

export function slugifyCybersecurityLesson(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function findCybersecurityLesson(slug) {
	for (const module of CCNA_CYBERSECURITY_CURRICULUM) {
		const lesson = module.lessons.find((item) => item.slug === slug);
		if (lesson) return { ...lesson, moduleNumber: module.number, moduleTitle: module.title };
	}
	return null;
}
