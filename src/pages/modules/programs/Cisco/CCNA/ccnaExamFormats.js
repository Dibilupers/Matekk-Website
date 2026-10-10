// Settings for each CCNA practice exam, shared by the exam page and the CCNA dashboard.
export const CCNA_EXAMS = {
  short: {
    name: "Short Exam",
    subtitle: "Modules 1.0–6.0",
    questionCount: 50,
    durationSeconds: 45 * 60,
    sessionKey: "matekk-ccna-short-exam-session",
    path: "/modules/programs/ccna/exam/short",
  },
  medium: {
    name: "Medium Exam",
    subtitle: "CCNA question bank",
    questionCount: 100,
    durationSeconds: 90 * 60,
    sessionKey: "matekk-ccna-medium-exam-session",
    path: "/modules/programs/ccna/exam/medium",
  },
  long: {
    name: "Long Exam",
    subtitle: "Full CCNA question bank",
    questionCount: 150,
    durationSeconds: 120 * 60,
    sessionKey: "matekk-ccna-long-exam-session",
    path: "/modules/programs/ccna/exam/long",
  },
};
