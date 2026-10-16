import API_URL from "../../../../../config/api";
import { convertBank } from "../../../../../utils/ccnaBankConverter";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";

function hasCompTIACertificationLabel(value, programName) {
	if (typeof value !== "string") return false;
	const certificationName = programName.replace(/\+$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(`comptia\\s+${certificationName}\\s*(?:\\+|plus)`, "i").test(value);
}

function getChoiceText(choice) {
	if (typeof choice === "string" && choice.trim()) return choice.trim();
	if (typeof choice === "number") return String(choice);
	if (!choice || typeof choice !== "object" || Array.isArray(choice)) return null;
	const fields = new Map(Object.entries(choice).map(([key, value]) => [key.toLowerCase().replace(/[_-]/g, ""), value]));
	for (const key of ["text", "optiontext", "choicetext", "answertext", "value", "label", "option", "choice", "content", "answer", "description"]) {
		const value = fields.get(key);
		if (typeof value === "string" && value.trim()) return value.trim();
		if (typeof value === "number") return String(value);
	}
	const textValues = Object.entries(choice)
		.filter(([key, value]) =>
			!["id", "key", "letter", "code", "iscorrect", "correct", "selected"].includes(key.toLowerCase().replace(/[_-]/g, "")) &&
			typeof value === "string" && value.trim(),
		)
		.map(([, value]) => value.trim());
	return textValues.sort((first, second) => second.length - first.length)[0] ?? null;
}

function normalizeChoices(row) {
	let parsedChoices = row.choices;
	if (typeof parsedChoices === "string") {
		try {
			parsedChoices = JSON.parse(parsedChoices);
		} catch {
			return row;
		}
	}
	const entries = Array.isArray(parsedChoices)
		? parsedChoices
		: parsedChoices && typeof parsedChoices === "object"
			? Object.entries(parsedChoices).map(([key, value]) =>
				typeof value === "string" ? { key, text: value } : value,
			)
			: null;
	if (!entries) return row;
	const choices = entries.map(getChoiceText);
	if (!choices.every(Boolean)) return row;

	const rawType = String(row.question_type ?? "single").trim().toLowerCase().replace(/[_-]+/g, " ");
	const isMatchingQuestion = /^(match|matching|drag and drop)$/.test(rawType);
	let correctAnswer = row.correct_answer;
	if (!isMatchingQuestion && correctAnswer && typeof correctAnswer === "object") {
		correctAnswer = Array.isArray(correctAnswer)
			? correctAnswer.map(getChoiceText).join(",")
			: getChoiceText(correctAnswer);
	} else if (!isMatchingQuestion && typeof correctAnswer === "string") {
		try {
			const parsedAnswer = JSON.parse(correctAnswer);
			if (Array.isArray(parsedAnswer)) {
				correctAnswer = parsedAnswer.map(getChoiceText).join(",");
			} else if (parsedAnswer && typeof parsedAnswer === "object") {
				correctAnswer = getChoiceText(parsedAnswer) ?? correctAnswer;
			}
		} catch {
			// Most bank answers are plain text or option letters rather than JSON.
		}
	}

	const questionType = isMatchingQuestion
		? "match"
		: /^(single|single choice|multiple choice|multiple select|multiple response|mcq|radio)$/.test(rawType)
			? "single"
			: row.question_type;
	return {
		...row,
		choices: JSON.stringify(choices),
		correct_answer: correctAnswer,
		question_type: questionType,
	};
}

export async function loadCompTIAExamQuestions(programName) {
	const certificationName = `CompTIA ${programName}`;
	const response = await fetch(`${API_URL}/questions/bank`, { credentials: "include" });
	if (!response.ok) {
		throw new Error(`${certificationName} question bank request failed (${response.status}).`);
	}
	const rows = await response.json();
	if (!Array.isArray(rows)) {
		throw new TypeError(`${certificationName} question bank response was not a list.`);
	}

	const certificationRows = rows.filter((row) =>
		hasCompTIACertificationLabel(row.module, programName) ||
		hasCompTIACertificationLabel(row.topic, programName),
	);
	if (certificationRows.length === 0) {
		throw new Error(`No questions labeled "${certificationName}" were found in the question bank.`);
	}

	const normalizedRows = certificationRows.map(normalizeChoices);
	const { questions, problems } = convertBank(normalizedRows);
	const validQuestions = questions.filter(isValidQuestion);
	if (problems.length > 0) {
		console.warn(`${certificationName}: skipped ${problems.length} unsupported question(s).`, problems);
	}
	if (validQuestions.length === 0) {
		const firstProblem = problems[0];
		const detail = firstProblem ? ` First row issue: ${firstProblem.problem} (question ID ${firstProblem.id}).` : "";
		throw new Error(`Found ${certificationRows.length} ${programName} rows, but none could be converted into valid exam questions.${detail}`);
	}
	return validQuestions;
}

export function loadNetworkPlusExamQuestions() {
	return loadCompTIAExamQuestions("Network+");
}
