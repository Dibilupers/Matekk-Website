import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";
import { classifyCcnaProgramQuestion } from "./ccnaProgramQuestionClassifier.js";

let vite;
let getProgramExamFormats;

before(async () => {
	vite = await createServer({
		configFile: false,
		server: { middlewareMode: true, hmr: false },
		optimizeDeps: { noDiscovery: true, include: [] },
		appType: "custom",
	});
	({ getProgramExamFormats } = await vite.ssrLoadModule("/src/pages/modules/programs/programExamFormats.js"));
});

after(async () => {
	await vite.close();
});

test("classifies CCNA automation questions from their content", () => {
	assert.equal(classifyCcnaProgramQuestion({
		topic: "CCNA",
		prompt: "Which protocol is commonly used for model-driven device configuration?",
		options: ["NETCONF", "FTP", "ARP", "NTP"],
		answer: 0,
	}), "ccna-automation");
});

test("classifies CCNA cybersecurity questions from their content", () => {
	assert.equal(classifyCcnaProgramQuestion({
		topic: "CCNA",
		prompt: "What is a common purpose of security awareness training?",
		options: ["Help users report phishing", "Give users unrestricted access"],
		answer: 0,
	}), "ccna-cybersecurity");
});

test("does not classify unrelated or mixed-topic CCNA questions", () => {
	assert.equal(classifyCcnaProgramQuestion({
		topic: "CCNA",
		prompt: "Which command displays the IPv4 routing table?",
		options: ["show ip route", "show version"],
		answer: 0,
	}), null);
	assert.equal(classifyCcnaProgramQuestion({
		prompt: "How should security incident response use network automation and an API?",
	}), null);
});

test("builds specialty exam formats only from matching bank questions", () => {
	const questionBank = Array.from({ length: 100 }, (_, index) => ({
		bankId: index + 1,
		topic: "CCNA",
		prompt: `Which protocol supports model-driven device configuration? Question ${index + 1}`,
		options: ["NETCONF", "FTP", "ARP", "NTP"],
		answer: 0,
	}));
	const shortExam = getProgramExamFormats("ccna-automation", questionBank).short;
	const selectedQuestions = shortExam.createQuestions();

	assert.equal(selectedQuestions.length, shortExam.questionCount);
	assert.ok(selectedQuestions.every((question) =>
		question.bankId && classifyCcnaProgramQuestion(question) === "ccna-automation",
	));
});
