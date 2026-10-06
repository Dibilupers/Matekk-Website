import ProgramKnowledgeHub from "../../ProgramKnowledgeHub";
import { CCNA_AUTOMATION_CURRICULUM } from "./ccnaAutomationCurriculum";
import {
	markCcnaAutomationLessonOpened,
	readCcnaAutomationProgress,
} from "./ccnaAutomationProgress";

export default function CCNAAutomationKnowledgeHub() {
	return (
		<ProgramKnowledgeHub
			programName="CCNA Automation"
			description="Study network automation, software development, APIs, Cisco platforms, and the networking concepts behind programmable infrastructure."
			basePath="/modules/programs/ccna-automation"
			curriculum={CCNA_AUTOMATION_CURRICULUM}
			readProgress={readCcnaAutomationProgress}
			markLessonOpened={markCcnaAutomationLessonOpened}
		/>
	);
}
