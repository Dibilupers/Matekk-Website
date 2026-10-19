import endpointTechnologies from "./study-materials/module-4.01-endpoint-technologies.md?raw";
import operatingSystemComponents from "./study-materials/module-4.02-operating-system-components.md?raw";
import attribution from "./study-materials/module-4.03-attribution-in-an-investigation.md?raw";
import evidenceTypes from "./study-materials/module-4.04-types-of-evidence.md?raw";
import diskImageIntegrity from "./study-materials/module-4.05-tampered-vs-untampered-disk-image.md?raw";
import operatingSystemLogs from "./study-materials/module-4.06-interpreting-os-application-command-line-logs.md?raw";
import malwareAnalysisReports from "./study-materials/module-4.07-malware-analysis-output-reports.md?raw";

const MODULE_4_LESSON_CONTENT = [
	endpointTechnologies,
	operatingSystemComponents,
	attribution,
	evidenceTypes,
	diskImageIntegrity,
	operatingSystemLogs,
	malwareAnalysisReports,
];

export const CCNA_CYBERSECURITY_MODULE_4_LESSONS = MODULE_4_LESSON_CONTENT.map((content) => {
	const heading = content.match(/^#\s+(?:Module\s+)?(4\.\d+)\s+(.+)$/m);
	if (!heading) {
		throw new Error("A CCNA Cybersecurity module 4 lesson is missing its numbered heading.");
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
