import CCNPEnterpriseBadge from "../../../../../../assets/CCNPEnterprise.webp";
import CCNPProgramDashboard from "../CCNPProgramDashboard";

const program = {
	name: "CCNP Enterprise",
	badge: CCNPEnterpriseBadge,
	coursePath: "/training/cisco/ccnp/enterprise",
	description: "Build advanced enterprise networking skills across core technologies, routing, and SD-WAN.",
	focusAreas: ["Enterprise infrastructure", "Advanced routing", "SD-WAN"],
	tracks: [
		{ code: "350-401 ENCOR", name: "Enterprise Core", type: "Core exam", summary: "Implement and operate enterprise network core technologies." },
		{ code: "300-410 ENARSI", name: "Advanced Routing and Services", type: "Concentration exam", summary: "Configure and troubleshoot advanced routing and enterprise services." },
		{ code: "300-415 ENSDWI", name: "SD-WAN Solutions", type: "Concentration exam", summary: "Design, deploy, and manage Cisco Catalyst SD-WAN." },
	],
};

export default function CCNPEnterpriseDashboard() {
	return <CCNPProgramDashboard program={program} />;
}
