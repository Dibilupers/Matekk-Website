import ProgramKnowledgeHub from "../../ProgramKnowledgeHub";
import { CCNA_CYBERSECURITY_CURRICULUM } from "./ccnaCybersecurityCurriculum";
import {
	markCcnaCybersecurityLessonOpened,
	readCcnaCybersecurityProgress,
} from "./ccnaCybersecurityProgress";

export default function CCNACybersecurityKnowledgeHub() {
	return (
		<ProgramKnowledgeHub
			programName="CCNA Cybersecurity"
			description="Explore security fundamentals, monitoring, host-based analysis, network intrusion analysis, and security policies and procedures."
			basePath="/modules/programs/ccna-cybersecurity"
			curriculum={CCNA_CYBERSECURITY_CURRICULUM}
			readProgress={readCcnaCybersecurityProgress}
			markLessonOpened={markCcnaCybersecurityLessonOpened}
		/>
	);
}
