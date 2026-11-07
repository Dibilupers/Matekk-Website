// Settings for each CCNA practice exam, shared by the exam page and the CCNA dashboard.
import { getExamRoute } from "../../../../../utils/examRoutes";

export const CCNA_EXAMS = {
  short: {
    name: "Short Exam",
    subtitle: "CCNA question bank",
    questionCount: 50,
    durationSeconds: 45 * 60,
    sessionKey: "matekk-ccna-short-exam-session",
    path: getExamRoute("ccna", "short"),
  },
  medium: {
    name: "Medium Exam",
    subtitle: "CCNA question bank",
    questionCount: 100,
    durationSeconds: 90 * 60,
    sessionKey: "matekk-ccna-medium-exam-session",
    path: getExamRoute("ccna", "medium"),
  },
  long: {
    name: "Long Exam",
    subtitle: "Full CCNA question bank",
    questionCount: 150,
    durationSeconds: 120 * 60,
    sessionKey: "matekk-ccna-long-exam-session",
    path: getExamRoute("ccna", "long"),
  },
  all_questions: {
    name: "All Questions",
    subtitle: "All questions from the database",
    sessionKey: "matekk-ccna-all-questions-session",
    path: getExamRoute("ccna", "all_questions"),
  }
};
