import CcnaKnowledgeModulePlaceholder from "./ccnaKnowledgeModulePlaceholder";
import CcnaSdnTutorial from "./ccnaSdnTutorial";
import CcnaPuppetTutorial from "./ccnaPuppetTutorial";
import CcnaChefTutorial from "./ccnaChefTutorial";
import CcnaAnsibleTutorial from "./ccnaAnsibleTutorial";
import CcnaJsonTutorial from "./ccnaJsonTutorial";
import CcnaGenerativePredictiveAiTutorial from "./ccnaGenerativePredictiveAiTutorial";
import CcnaRestApiTutorial from "./ccnaRestApiTutorial";

const moduleSixLessonByType = {
	sdn: CcnaSdnTutorial,
	puppet: CcnaPuppetTutorial,
	chef: CcnaChefTutorial,
	ansible: CcnaAnsibleTutorial,
	json: CcnaJsonTutorial,
	"generative-predictive-ai": CcnaGenerativePredictiveAiTutorial,
	"rest-api": CcnaRestApiTutorial,
};

export default function CcnaKnowledgeModuleSix({ article }) {
	const Lesson = moduleSixLessonByType[article.contentType];
	return Lesson ? <Lesson /> : <CcnaKnowledgeModulePlaceholder article={article} category="6.0 Automation and Programmability" />;
}
