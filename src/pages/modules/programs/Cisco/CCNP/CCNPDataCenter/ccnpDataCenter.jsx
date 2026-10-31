import CCNPDatacenterBadge from "../../../../../../assets/CCNPDatacenter.webp";
import CCNPProgramDashboard from "../CCNPProgramDashboard";

const program = {
	name: "CCNP Data Center",
	badge: CCNPDatacenterBadge,
	coursePath: "/training/cisco/ccnp/datacenter",
	description: "Advance your data center expertise across network, compute, storage, automation, and design.",
	focusAreas: ["Data center core", "Network and compute", "Infrastructure design"],
	tracks: [
		{ code: "350-601 DCCOR", name: "Data Center Core Technologies", type: "Core exam", summary: "Implement data center networking, compute, storage, automation, and security." },
		{ code: "300-610 DCID", name: "Data Center Infrastructure Design", type: "Concentration exam", summary: "Design scalable data center infrastructure for traditional and AI workloads." },
	],
};

export default function CCNPDataCenterDashboard() {
	return <CCNPProgramDashboard program={program} />;
}
