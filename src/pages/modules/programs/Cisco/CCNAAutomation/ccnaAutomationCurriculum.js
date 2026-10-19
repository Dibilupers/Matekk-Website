import { CCNA_AUTOMATION_MODULES } from "../../../../training/cisco/ccna/automationModules.js";
import { CCNA_CURRICULUM } from "../CCNA/ccnaCurriculum.js";
import {
	CCNA_AUTOMATION_OBJECTIVE_CONTENT,
	CCNA_AUTOMATION_STUDY_CONTENT,
} from "./ccnaAutomationStudyContent.js";

const ccnaAutomationModule = CCNA_CURRICULUM.find((module) => module.number === "6.0");
if (!ccnaAutomationModule) {
	throw new Error("CCNA curriculum is missing the Automation and Programmability module.");
}

const CCNA_AUTOMATION_CONTENT_TYPES = {
	"What is SDN?": "sdn",
	"Puppet Tutorial": "puppet",
	"Chef Tutorial": "chef",
	"Ansible Tutorial": "ansible",
	"JSON Tutorial": "json",
	"Generative AI vs Predictive AI Tutorial": "generative-predictive-ai",
	"REST API Tutorial": "rest-api",
};

const AUTOMATION_MODULE_GUIDES = [
	"Study software design practices that make automation code understandable and maintainable. Compare XML, JSON, and YAML; parse structured data into Python objects; use tests to validate behavior; and organize reusable code into functions, classes, and modules. Git provides a history of changes and supports collaboration through branches, commits, and merges.",
	"An API is a documented contract for requesting or changing resources. Build requests from the method, endpoint, headers, authentication, and payload; interpret response status, headers, and body; and handle rate limits, errors, and asynchronous behavior. Webhooks deliver event notifications to a configured receiver, while Python's requests library can automate repeatable REST interactions.",
	"Cisco platforms expose different operational capabilities through SDKs and APIs. Select the platform that owns the resource, consult its API reference, authenticate securely, and validate returned data. Model-driven interfaces such as NETCONF and RESTCONF use YANG schemas to describe device configuration and operational state.",
	"Application deployment choices affect performance, availability, cost, and security. Compare cloud and edge models, virtual machines and containers, then follow a CI/CD flow that builds, tests, and releases changes. Protect secrets and data, understand Docker images and deployment components, and use unit tests and secure coding practices before release.",
	"Infrastructure automation turns desired network state into repeatable, reviewable changes. Understand controller and device APIs, model-driven data, Python, Ansible, and shell workflows; test in a lab with tools such as CML or pyATS; inspect diffs and YANG data; and use CI/CD and code review to catch unsafe changes before deployment.",
	"Automation depends on sound networking fundamentals. Trace MAC and IP addressing, VLANs, routes, masks, and gateways; identify the roles of switches, routers, firewalls, and load balancers; and understand management, control, and data planes. Use common service ports and DHCP, DNS, NAT, SNMP, and NTP knowledge to troubleshoot application connectivity.",
];

const AUTOMATION_MODULE_STUDY_POINTS = [
	["Choose a data format based on its structure and the tools consuming it.", "Separate reusable logic into functions and modules; use classes when state and behavior belong together.", "Use tests and version control to make changes verifiable and reversible."],
	["Read API documentation before constructing a request, including authentication and required payload fields.", "Treat status codes and response bodies as evidence of success or failure; handle errors explicitly.", "Keep credentials out of source code and respect rate limits and service constraints."],
	["Match a Cisco platform or SDK to the resource and operation required.", "Validate API responses and account for pagination, permissions, and version differences.", "Use YANG models to understand which data can be queried or changed through NETCONF or RESTCONF."],
	["Select a deployment model by considering latency, scale, isolation, and operational ownership.", "Test application components and deployment configuration in a repeatable pipeline.", "Protect secrets, encrypt data in transit and at rest, and review common web application risks."],
	["Compare desired state with current state before applying infrastructure changes.", "Test automation in a safe environment and review the exact diff before production.", "Use structured data and APIs to make changes repeatable, observable, and reversible."],
	["Follow packet paths from the endpoint through switching, routing, and security controls.", "Check addressing, routes, DNS, NAT, and ports systematically when an application cannot connect.", "Use topology and plane separation to identify which device or process owns a failure."],
];

function renumberObjective(text, moduleNumber) {
	return text.replace(/^(\s*)\d+(?=\.)/, `$1${moduleNumber}`);
}

function parseObjective(text) {
	const match = text.match(/^\s*(\d+(?:\.\d+)*(?:\.[a-z])?)\s+(.+)$/i);
	return match
		? { number: match[1], title: match[2] }
		: { number: "", title: text };
}

function simplifyObjectiveTitle(title) {
	const simplified = title
		.replace(/^(?:Describe the purpose and usage of|Describe the function of|Describe the functionality of|Describe the capabilities of|Describe the principles of|Describe the benefits of|Describe the attributes of|Describe the use and roles of|Explain the benefits of|Explain the advantages of|Explain the impacts of|Explain the purpose of|Compare the characteristics of|Compare the impact of|Identify the challenges of|Identify potential|Interpret the workflow being automated by|Identify the workflow being automated by|Construct a Python script that|Construct code to|Diagnose|Describe|Compare|Explain|Interpret|Identify|Apply|Construct|Utilize|Recognize)\s+/i, "")
		.replace(/\((?:such as|includes?|including)\b[^)]*\)/gi, "")
		.replace(/\bin a given scenario\b|\bbased on provided logs\b/gi, "")
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
			section.code,
			section.example,
		]),
	].join(" ");
	const wordCount = `${lessonText} ${studyText}`.trim().split(/\s+/).filter(Boolean).length;
	return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
}

function createObjectiveLessons(module, studyGuide, studyPoints, studyContent) {
	return module.items.map((item, index) => {
		const objective = parseObjective(typeof item === "string" ? item : item.subTitle);
		const lessonNumber = objective.number || `${module.number.replace(".0", "")}.${index + 1}`;
		const details = typeof item === "string"
			? []
			: item.items.map((subItem) => parseObjective(subItem).title);
		return {
			number: lessonNumber,
			title: simplifyObjectiveTitle(objective.title),
			summary: typeof item === "string"
				? `${objective.title}. This objective is part of ${parseObjective(module.title).title} and should be understood in the context of the module study guide.`
				: `${objective.title}. This objective includes ${details.join("; ")}.`,
			details,
			duration: estimateReadDuration(
				`${objective.title} ${details.join(" ")}`,
				CCNA_AUTOMATION_OBJECTIVE_CONTENT[lessonNumber] ?? studyContent,
			),
			slug: slugifyAutomationLesson(objective.title),
			studyGuide,
			studyPoints,
			studyContent: CCNA_AUTOMATION_OBJECTIVE_CONTENT[lessonNumber] ?? studyContent,
		};
	});
}

export const CCNA_AUTOMATION_CURRICULUM = [
	{
		number: "1.0",
		title: "Automation and Programmability",
		description: "Build a foundation in SDN, infrastructure automation, configuration tools, data formats, AI, and APIs.",
		studyGuide: "This module follows Cisco's Automation and Programmability lessons: software-defined networking, configuration-management tools, data formats, AI, and REST APIs.",
		studyPoints: ["Understand how controllers and APIs make networks programmable.", "Compare configuration tools and structured data formats.", "Use API requests and responses to automate network resources safely."],
		studyContent: CCNA_AUTOMATION_STUDY_CONTENT["1.0"],
		lessons: ccnaAutomationModule.tutorials.map((tutorial) => ({
			...tutorial,
			number: tutorial.number.replace(/^\d+(?=\.)/, "1"),
			slug: slugifyAutomationLesson(tutorial.title),
			contentType: CCNA_AUTOMATION_CONTENT_TYPES[tutorial.title],
		})),
	},
	...CCNA_AUTOMATION_MODULES.map((sourceModule, index) => {
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
		const studyGuide = AUTOMATION_MODULE_GUIDES[index];
		const studyPoints = AUTOMATION_MODULE_STUDY_POINTS[index];
		const studyContent = CCNA_AUTOMATION_STUDY_CONTENT[module.number];
		if (!studyGuide || !studyPoints?.length || !studyContent) {
			throw new Error(`Missing study content for CCNA Automation module ${module.number}.`);
		}
		return {
			number: module.number,
			title: parseObjective(module.title).title,
			description: `${parseObjective(module.title).title} — CCNA Automation course objectives.`,
			studyGuide,
			studyPoints,
			studyContent,
			lessons: createObjectiveLessons(module, studyGuide, studyPoints, studyContent),
		};
	}),
];

export function slugifyAutomationLesson(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function findAutomationLesson(slug) {
	for (const module of CCNA_AUTOMATION_CURRICULUM) {
		const lesson = module.lessons.find((item) => item.slug === slug);
		if (lesson) return { ...lesson, moduleNumber: module.number, moduleTitle: module.title };
	}
	return null;
}
