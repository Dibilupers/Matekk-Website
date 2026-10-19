// Loads the CCNA question bank from the database (GET /questions/bank) once per visit and converts it
// for the exams. If it can't be loaded, the exams fall back to the questions built into the site.
import API_URL from "../config/api";
import { convertBank } from "./ccnaBankConverter";
import { isValidQuestion } from "./ccnaExamGrading";

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
      const { questions, problems } = convertBank(rows);
      cached = { questions: questions.filter(isValidQuestion), problems, rowCount: rows.length };
      if (problems.length) console.warn(`CCNA question bank: ${problems.length} question(s) could not be converted and were skipped.`, problems);
      return cached;
    })
    .finally(() => { pending = null; });
  return pending;
}

export function loadCcnaAllQuestionsBank() {
  if (cachedAllQuestions) return Promise.resolve(cachedAllQuestions);
  const query = new URLSearchParams({ module: "CCNA" });
  pendingAllQuestions ??= fetch(`${API_URL}/questions/bank/all-usable?${query}`, { credentials: "include" })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Question bank request failed (${response.status}).`);
      const payload = await response.json();
      if (!payload || !Array.isArray(payload.questions) || !Number.isInteger(payload.skippedCount)) {
        throw new TypeError("Usable question bank response was invalid.");
      }
      cachedAllQuestions = payload;
      return cachedAllQuestions;
    })
    .finally(() => { pendingAllQuestions = null; });
  return pendingAllQuestions;
}
