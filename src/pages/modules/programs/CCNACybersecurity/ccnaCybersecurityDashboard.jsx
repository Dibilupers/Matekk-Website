import CybersecurityBadge from "../../../../assets/CCNAcybersecurity.webp";
import CCNAProgramDashboard from "../ccnaProgramDashboard";

export default function CCNACybersecurityDashboard() {
	return (
		<CCNAProgramDashboard
			programName="CCNA Cybersecurity"
			badge={CybersecurityBadge}
			description="Strengthen your security foundations and learn to recognize, investigate, and respond to network threats."
			quote="Build confidence in protecting connected systems. Your learning path will focus on security visibility, analysis, and response."
			focusAreas="Explore security concepts, monitoring, host-based analysis, and threat response as course content becomes available."
		/>
	);
}
