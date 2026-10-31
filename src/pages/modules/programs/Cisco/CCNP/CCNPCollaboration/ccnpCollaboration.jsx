import CCNPCollaborationBadge from "../../../../../../assets/CCNPCollaboration.png";
import CCNPProgramDashboard from "../CCNPProgramDashboard";

const program = {
	name: "CCNP Collaboration",
	badge: CCNPCollaborationBadge,
	coursePath: "/training/cisco/ccnp/collaboration",
	description: "Strengthen collaboration skills in core infrastructure, call control, and hybrid cloud technologies.",
	focusAreas: ["Collaboration core", "Call control", "Hybrid and cloud"],
	tracks: [
		{ code: "350-801 CLCOR", name: "Collaboration Core Technologies", type: "Core exam", summary: "Implement and operate Cisco collaboration core technologies." },
		{ code: "300-815 CLACCM", name: "Advanced Call Control and Mobility", type: "Concentration exam", summary: "Implement advanced on-premises call control and mobility services." },
		{ code: "300-820 CLHCT", name: "Collaboration Hybrid and Cloud", type: "Concentration exam", summary: "Implement Cisco collaboration hybrid and cloud technologies." },
	],
};

export default function CCNPCollaborationDashboard() {
	return <CCNPProgramDashboard program={program} />;
}
