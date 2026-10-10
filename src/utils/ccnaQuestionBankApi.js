// Loads the CCNA question bank from the database (GET /questions/bank) once per visit and converts it
// for the exams. If it can't be loaded, the exams fall back to the questions built into the site.
import API_URL from "../config/api";
import { convertBank } from "./ccnaBankConverter";
import { isValidQuestion } from "./ccnaExamGrading";

let cached = null; // { questions, problems }
let pending = null;

export function loadCcnaQuestionBank() {
  if (cached) return Promise.resolve(cached);
  pending ??= fetch(`${API_URL}/questions/bank`, { credentials: "include" })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Question bank request failed (${response.status}).`);
      const rows = await response.json();
      if (!Array.isArray(rows)) throw new TypeError("Question bank response was not a list.");
      const { questions, problems } = convertBank(rows);
      cached = { questions: questions.filter(isValidQuestion), problems };
      if (problems.length) console.warn(`CCNA question bank: ${problems.length} question(s) could not be converted and were skipped.`, problems);
      return cached;
    })
    .finally(() => { pending = null; });
  return pending;
}
