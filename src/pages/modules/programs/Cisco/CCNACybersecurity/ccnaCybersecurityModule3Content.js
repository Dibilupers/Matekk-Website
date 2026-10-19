import attackSurface from "./study-materials/module-3.01-attack-surface-and-vulnerability.md?raw";
import dataSources from "./study-materials/module-3.02-data-provided-by-technologies.md?raw";
import visibilityImpact from "./study-materials/module-3.03-technologies-impact-on-data-visibility.md?raw";
import monitoringDataTypes from "./study-materials/module-3.04-data-types-in-security-monitoring.md?raw";
import networkAttacks from "./study-materials/module-3.05-network-attacks.md?raw";
import webApplicationAttacks from "./study-materials/module-3.06-web-application-attacks.md?raw";
import socialEngineering from "./study-materials/module-3.07-social-engineering-attacks.md?raw";
import endpointAttacks from "./study-materials/module-3.08-endpoint-based-attacks.md?raw";
import evasionAndObfuscation from "./study-materials/module-3.09-evasion-and-obfuscation.md?raw";
import certificateSecurity from "./study-materials/module-3.10-certificates-impact-on-security.md?raw";
import certificateComponents from "./study-materials/module-3.11-certificate-components.md?raw";

const MODULE_3_LESSON_CONTENT = [
	attackSurface,
	dataSources,
	visibilityImpact,
	monitoringDataTypes,
	networkAttacks,
	webApplicationAttacks,
	socialEngineering,
	endpointAttacks,
	evasionAndObfuscation,
	certificateSecurity,
	certificateComponents,
];

export const CCNA_CYBERSECURITY_MODULE_3_LESSONS = MODULE_3_LESSON_CONTENT.map((content) => {
	const heading = content.match(/^# Module (3\.\d+)\s+[-\u2013\u2014]\s+(.+)$/m);
	if (!heading) {
		throw new Error("A CCNA Cybersecurity module 3 lesson is missing its numbered heading.");
	}

	const studyTime = content.match(/\*\*Study time:\*\*\s*~?(\d+)\s*min/i);
	const title = heading[2].trim();
	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

	return {
		number: heading[1],
		title,
		summary: `Study ${title.toLowerCase()} and apply the concepts in the scenarios and examples.`,
		duration: studyTime ? `${studyTime[1]} min` : "45 min",
		slug: `${heading[1].replace(".", "-")}-${slug}`,
		contentMarkdown: content,
	};
});
