import ciaTriad from "./study-materials/module-2.01-cia-triad.md?raw";
import securityDeployments from "./study-materials/module-2.02-security-deployments.md?raw";
import securityTerms from "./study-materials/module-2.03-security-terms.md?raw";
import securityConcepts from "./study-materials/module-2.04-security-concepts.md?raw";
import defenseInDepth from "./study-materials/module-2.05-defense-in-depth.md?raw";
import accessControlModels from "./study-materials/module-2.06-access-control-models.md?raw";
import cvss from "./study-materials/module-2.07-cvss.md?raw";
import dataVisibility from "./study-materials/module-2.08-data-visibility-challenges.md?raw";
import dataLoss from "./study-materials/module-2.09-data-loss-traffic-profiles.md?raw";
import fiveTuple from "./study-materials/module-2.10-five-tuple-isolate-host.md?raw";
import detectionMethods from "./study-materials/module-2.11-rule-based-vs-behavioral-detection.md?raw";

const MODULE_2_LESSON_CONTENT = [
	ciaTriad,
	securityDeployments,
	securityTerms,
	securityConcepts,
	defenseInDepth,
	accessControlModels,
	cvss,
	dataVisibility,
	dataLoss,
	fiveTuple,
	detectionMethods,
];

export const CCNA_CYBERSECURITY_MODULE_2_LESSONS = MODULE_2_LESSON_CONTENT.map((content) => {
	const heading = content.match(/^# Module (2\.\d+)\s+[-\u2013\u2014]\s+(.+)$/m);
	if (!heading) {
		throw new Error("A CCNA Cybersecurity module 2 lesson is missing its numbered heading.");
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
