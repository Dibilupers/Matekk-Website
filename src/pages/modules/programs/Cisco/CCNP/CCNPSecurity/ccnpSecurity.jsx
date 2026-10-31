import CCNPSecurityBadge from "../../../../../../assets/CCNPSecurity.png";
import CCNPProgramDashboard from "../CCNPProgramDashboard";

const program = {
	name: "CCNP Security",
	badge: CCNPSecurityBadge,
	coursePath: "/training/cisco/ccnp/security",
	description: "Develop advanced security skills in core technologies, security infrastructure, and firewall operations.",
	focusAreas: ["Network security", "Security infrastructure", "Firewall technologies"],
	tracks: [
		{ code: "350-701 SCOR", name: "Security Core Technologies", type: "Core exam", summary: "Implement and operate core Cisco security technologies." },
		{ code: "300-745 SDSI", name: "Designing Cisco Security Infrastructure", type: "Concentration exam", summary: "Design security infrastructure across applications, risk, automation, and operations." },
		{ code: "300-710 SNCF", name: "Securing Networks with Cisco Firewalls", type: "Concentration exam", summary: "Deploy, manage, and troubleshoot Cisco Secure Firewall technologies." },
	],
};

export default function CCNPSecurityDashboard() {
	return <CCNPProgramDashboard program={program} />;
}
