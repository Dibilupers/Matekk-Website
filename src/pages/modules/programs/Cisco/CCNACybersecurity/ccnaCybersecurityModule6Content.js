import managementConcepts from "./study-materials/module-6.01-management-concepts.md?raw";
import incidentResponsePlan from "./study-materials/module-6.02-incident-response-plan.md?raw";
import incidentHandling from "./study-materials/module-6.03-incident-handling-process-applied-to-an-event.md?raw";
import nist80061 from "./study-materials/module-6.04-nist-sp-800-61.md?raw";
import nistIrCategories from "./study-materials/module-6.05-nist-ir-categories-cmmc-and-800-61.md?raw";
import nist80086 from "./study-materials/module-6.06-nist-sp-800-86-forensic-concepts.md?raw";
import networkProfiling from "./study-materials/module-6.07-network-profiling-elements.md?raw";
import serverProfiling from "./study-materials/module-6.08-server-profiling-elements.md?raw";
import protectedData from "./study-materials/module-6.09-protected-data-in-a-network.md?raw";
import intrusionModels from "./study-materials/module-6.10-classify-intrusion-events-kill-chain-diamond-model.md?raw";
import socMetrics from "./study-materials/module-6.11-soc-metrics.md?raw";

const MODULE_6_LESSON_CONTENT = [
	managementConcepts,
	incidentResponsePlan,
	incidentHandling,
	nist80061,
	nistIrCategories,
	nist80086,
	networkProfiling,
	serverProfiling,
	protectedData,
	intrusionModels,
	socMetrics,
];

export const CCNA_CYBERSECURITY_MODULE_6_LESSONS = MODULE_6_LESSON_CONTENT.map((content) => {
	const heading = content.match(/^#\s+(?:Module\s+)?(6\.\d+)\s+(.+)$/m);
	if (!heading) {
		throw new Error("A CCNA Cybersecurity module 6 lesson is missing its numbered heading.");
	}

	const title = heading[2].trim();
	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
	const readingMinutes = Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));

	return {
		number: heading[1],
		title,
		summary: `Study ${title.toLowerCase()} and apply the concepts in the scenarios and examples.`,
		duration: `${readingMinutes} min`,
		slug: `${heading[1].replace(".", "-")}-${slug}`,
		contentMarkdown: content,
	};
});
