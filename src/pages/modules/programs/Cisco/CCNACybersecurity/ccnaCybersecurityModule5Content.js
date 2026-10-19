import sourceTechnologies from "./study-materials/module-5.01-source-technologies.md?raw";
import impactAndNoImpact from "./study-materials/module-5.02-impact-and-no-impact.md?raw";
import dpiAndFirewalls from "./study-materials/module-5.03-dpi-packet-filtering-stateful.md?raw";
import inlineAndTaps from "./study-materials/module-5.04-inline-interrogation-taps-monitoring.md?raw";
import tapsAndNetflow from "./study-materials/module-5.05-taps-monitoring-vs-netflow.md?raw";
import tcpStreamFiles from "./study-materials/module-5.06-extract-files-from-tcp-stream.md?raw";
import intrusionPcap from "./study-materials/module-5.07-key-elements-in-an-intrusion-pcap.md?raw";
import protocolHeaders from "./study-materials/module-5.08-protocol-headers.md?raw";
import alertArtifacts from "./study-materials/module-5.09-identify-an-alert.md?raw";
import regularExpressions from "./study-materials/module-5.10-basic-regular-expressions.md?raw";

const MODULE_5_LESSON_CONTENT = [
	sourceTechnologies,
	impactAndNoImpact,
	dpiAndFirewalls,
	inlineAndTaps,
	tapsAndNetflow,
	tcpStreamFiles,
	intrusionPcap,
	protocolHeaders,
	alertArtifacts,
	regularExpressions,
];

export const CCNA_CYBERSECURITY_MODULE_5_LESSONS = MODULE_5_LESSON_CONTENT.map((content) => {
	const heading = content.match(/^#\s+(?:Module\s+)?(5\.\d+)\s+(.+)$/m);
	if (!heading) {
		throw new Error("A CCNA Cybersecurity module 5 lesson is missing its numbered heading.");
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
