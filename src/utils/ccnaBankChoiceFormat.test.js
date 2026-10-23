import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let vite;
let convertBankRow;

before(async () => {
  vite = await createServer({
    configFile: false,
    server: { middlewareMode: true },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  ({ convertBankRow } = await vite.ssrLoadModule("/src/utils/ccnaBankConverter.js"));
});

after(async () => {
  await vite.close();
});

function makeRow(choices, correctAnswer) {
  return {
    id: 42,
    module: "CCNA Part 9",
    topic: "Routing",
    question_text: "Which option is correct?",
    choices: JSON.stringify(choices),
    correct_answer: correctAnswer,
    explanation: "",
    question_type: "single",
    match_items: null,
    imageUrl: null,
  };
}

test("converts database choice arrays with IDs and text", () => {
  const result = convertBankRow(makeRow([
    { id: "choice-a", text: "First option" },
    { id: "choice-b", text: "Correct option" },
  ], "choice-b"));

  assert.equal(result.problem, undefined);
  assert.deepEqual(result.question.options, ["First option", "Correct option"]);
  assert.equal(result.question.answer, 1);
});

test("converts keyed choice objects whose values contain text", () => {
  const result = convertBankRow(makeRow({
    A: { id: "choice-a", text: "First option" },
    B: { id: "choice-b", text: "Correct option" },
  }, "B"));

  assert.equal(result.problem, undefined);
  assert.deepEqual(result.question.options, ["First option", "Correct option"]);
  assert.equal(result.question.answer, 1);
});
