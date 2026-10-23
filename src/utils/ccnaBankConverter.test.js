import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let vite;
let convertBankRow;
let isValidQuestion;

before(async () => {
  vite = await createServer({
    configFile: false,
    server: { middlewareMode: true },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  ({ convertBankRow } = await vite.ssrLoadModule("/src/utils/ccnaBankConverter.js"));
  ({ isValidQuestion } = await vite.ssrLoadModule("/src/utils/ccnaExamGrading.js"));
});

after(async () => {
  await vite.close();
});

function makeRow(id, overrides = {}) {
  return {
    id,
    module: "CCNA Part 9",
    topic: "Routing",
    question_text: "Choose the correct answer.",
    choices: JSON.stringify({ A: "First", B: "Second" }),
    correct_answer: "A",
    explanation: "",
    question_type: "single",
    match_items: null,
    imageUrl: null,
    ...overrides,
  };
}

test("converts known CCNA matching rows that need their native answer mappings", () => {
  const rows = [
    makeRow(181),
    makeRow(289, {
      correct_answer: [
        "Class-based weighted fair queuing: Definition one",
        "Classification: Definition two",
        "Congestion: Definition three",
        "Policing: Definition four",
        "Shaping: Definition five",
      ].join(" "),
    }),
    makeRow(382),
    makeRow(481),
    makeRow(608),
    makeRow(1306),
  ];

  const converted = rows.map((row) => convertBankRow(row));
  assert.ok(converted.every(({ question }) => isValidQuestion(question)));
  assert.deepEqual(converted.map(({ question }) => question.bankId), rows.map(({ id }) => id));
  assert.deepEqual(converted.map(({ question }) => question.answer), [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 5],
    [0, 1, 1, 2, 3, 3],
    [0, 1, 4, 5],
    [1, 2, 3, 5],
  ]);
});

test("converts CCNA question 720 when its source answer key is missing", () => {
  const { question } = convertBankRow(makeRow(720, { correct_answer: null }));

  assert.equal(question.type, "single");
  assert.equal(question.answer, 0);
  assert.ok(isValidQuestion(question));
});

test("keeps questions with missing exhibits and marks the missing source material", () => {
  const { question, problem } = convertBankRow(makeRow(24, {
    question_text: "Refer to the exhibit. Which route is selected?",
  }));

  assert.equal(problem, undefined);
  assert.equal(question.exhibitUnavailable, true);
  assert.ok(isValidQuestion(question));
});
