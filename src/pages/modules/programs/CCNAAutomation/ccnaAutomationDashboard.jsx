import AutomationBadge from "../../../../assets/CCNAAutomation.webp";
import { CCNA_AUTOMATION_MODULES } from "../../../training/cisco/ccna/automationModules";
import CCNAProgramDashboard from "../ccnaProgramDashboard";

export default function CCNAAutomationDashboard() {
	return (
		<CCNAProgramDashboard
			programName="CCNA Automation"
			badge={AutomationBadge}
			modules={CCNA_AUTOMATION_MODULES}
			description="Automate network operations and build practical skills for programmable, API-driven infrastructure."
			quote="Turn network knowledge into repeatable automation. Your path will bring together programming, APIs, and modern Cisco platforms."
			focusAreas="Explore network automation, APIs, Python, and programmable Cisco platforms as course content becomes available."
		/>
	);
}
