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

test("restores a snapshot multi-answer row only when its prompt and choices match", () => {
  const row = makeRow(1, {
    question_text: "Which two QoS tools are used to guarantee minimum bandwidth to certain traffic? (Choose two)",
    choices: JSON.stringify({ A: "FIFO", B: "CBWFQ", C: "LLC", D: "WFQ", E: "RSVP" }),
    correct_answer: "",
  });
  const restored = convertBankRow(row);

  assert.equal(restored.problem, undefined);
  assert.equal(restored.question.type, "multi");
  assert.deepEqual(restored.question.answer, [1, 3]);

  const rejected = convertBankRow({
    ...row,
    choices: JSON.stringify({ A: "FIFO", B: "CBWFQ", C: "LLC", D: "WFQ", E: "Different option" }),
  });

  assert.equal(rejected.question, undefined);
  assert.equal(rejected.problem, "correct answer does not match the available choices");
});

test("restores a multi-answer key before expanding embedded option-table choices", () => {
  const row = makeRow(815, {
    choices: JSON.stringify({ A: "Option A", B: "Option B", C: "Option C", D: "Option D", E: "Option E" }),
    correct_answer: "",
    question_text: `A network administrator is evaluating network security in the aftermath of an attempted ARP spoofing attack. If Port-channel1 is the uplink interface of the access-layer switch toward the distribution-layer switch, which two configurations must the administrator configure on the access-layer switch to provide adequate protection? (Choose two)

Option A

ip dhcp snooping
!
interface Port-channel1
 switchport port-security maximum 1
 switchport port-security

Option B

ip dhcp snooping vlan 1-4094
ip dhcp snooping
!
interface Port-channel1
 ip dhcp snooping trust

Option C

ip dhcp snooping vlan 1-4094
!
interface Port-channel1
 switchport protected
 switchport port-security maximum 1
 ip verify source mac-check

Option D

ip arp inspection trust
!
interface Port-channel1
 switchport port-security maximum 4094
 switchport port-security

Option E

ip arp inspection vlan 1-4094
!
interface Port-channel1
 ip arp inspection trust`,
  });

  const restored = convertBankRow(row);

  assert.equal(restored.problem, undefined);
  assert.equal(restored.question.type, "multi");
  assert.deepEqual(restored.question.answer, [1, 4]);
  assert.match(restored.question.options[1], /ip dhcp snooping trust/);
});

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
