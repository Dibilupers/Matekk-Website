// Loads the CCNA question bank from the database (GET /questions/bank) once per visit and converts it
// for the exams. If it can't be loaded, the exams fall back to the questions built into the site.
import API_URL from "../config/api";
import { convertBank } from "./ccnaBankConverter";
import { isValidQuestion } from "./ccnaExamGrading";
import { isCcnaQuestionModule } from "./ccnaQuestionModule";

let cached = null; // { questions, problems }
let pending = null;
let cachedAllQuestions = null;
let pendingAllQuestions = null;

export function loadCcnaQuestionBank() {
  if (cached) return Promise.resolve(cached);
  pending ??= fetch(`${API_URL}/questions/bank`, { credentials: "include" })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Question bank request failed (${response.status}).`);
      const rows = await response.json();
      if (!Array.isArray(rows)) throw new TypeError("Question bank response was not a list.");
      const ccnaRows = rows.filter((row) => isCcnaQuestionModule(row.module));
      const { questions, problems } = convertBank(ccnaRows);
      cached = { questions: questions.filter(isValidQuestion), problems, rowCount: ccnaRows.length };
      if (problems.length) console.warn(`CCNA question bank: ${problems.length} question(s) could not be converted and were skipped.`, problems);
      return cached;
    })
    .finally(() => { pending = null; });
  return pending;
}

export function loadCcnaAllQuestionsBank() {
  if (cachedAllQuestions) return Promise.resolve(cachedAllQuestions);
  pendingAllQuestions ??= Promise.all([
    loadCcnaQuestionBank(),
    fetch(`${API_URL}/questions/bank/all-usable`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Usable question bank request failed (${response.status}).`);
        const payload = await response.json();
        if (!payload || !Array.isArray(payload.questions) || !Number.isInteger(payload.skippedCount)) {
          throw new TypeError("Usable question bank response was invalid.");
        }
        return payload;
      }),
  ])
    .then(([rawBank, usableBank]) => {
      const questionsById = new Map(
        usableBank.questions
          .filter((question) => isCcnaQuestionModule(question.module))
          .filter(isValidQuestion)
          .map((question) => [question.bankId, question]),
      );
      rawBank.questions.forEach((question) => {
        if (!questionsById.has(question.bankId)) questionsById.set(question.bankId, question);
      });
      const questions = [...questionsById.values()];
      cachedAllQuestions = {
        questions,
        skippedCount: Math.max(0, rawBank.rowCount - questions.length),
      };
      return cachedAllQuestions;
    })
    .finally(() => { pendingAllQuestions = null; });
  return pendingAllQuestions;
}
