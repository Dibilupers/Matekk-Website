import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let vite;
let convertBankRow;
let loadCcnaAllQuestionsBank;
let isValidQuestion;
let applyNativeExhibit;
let originalFetch;

before(async () => {
  vite = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  ({ convertBankRow } = await vite.ssrLoadModule("/src/utils/ccnaBankConverter.js"));
  ({ loadCcnaAllQuestionsBank } = await vite.ssrLoadModule("/src/utils/ccnaQuestionBankApi.js"));
  ({ isValidQuestion } = await vite.ssrLoadModule("/src/utils/ccnaExamGrading.js"));
  ({ applyNativeExhibit } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaCompositeSetQuestions.js"));
  originalFetch = globalThis.fetch;
});

after(async () => {
  globalThis.fetch = originalFetch;
  await vite.close();
});

function makeRow(choices, correctAnswer, questionType = "single") {
  return {
    id: 42,
    module: "CCNA Part 9",
    topic: "Routing",
    question_text: "Which option is correct?",
    choices: JSON.stringify(choices),
    correct_answer: correctAnswer,
    explanation: "",
    question_type: questionType,
    match_items: null,
    imageUrl: null,
  };
}

test("converts choice arrays that include database IDs and text", () => {
  const result = convertBankRow(makeRow([
    { id: "choice-a", text: "First option" },
    { id: "choice-b", text: "Correct option" },
  ], "choice-b"));

  assert.equal(result.problem, undefined);
  assert.deepEqual(result.question.options, ["First option", "Correct option"]);
  assert.equal(result.question.answer, 1);
});

test("converts keyed choice records that include database IDs and text", () => {
  const result = convertBankRow(makeRow({
    A: { id: "choice-a", text: "First option" },
    B: { id: "choice-b", text: "Correct option" },
  }, "B"));

  assert.equal(result.problem, undefined);
  assert.deepEqual(result.question.options, ["First option", "Correct option"]);
  assert.equal(result.question.answer, 1);
});

test("converts multiple-choice type aliases and multi-answer choice IDs", () => {
  const result = convertBankRow(makeRow([
    { id: "choice-a", text: "First option" },
    { id: "choice-b", text: "Second option" },
    { id: "choice-c", text: "Third option" },
  ], "choice-a,choice-c", "multiple-choice"));

  assert.equal(result.problem, undefined);
  assert.deepEqual(result.question.options, ["First option", "Second option", "Third option"]);
  assert.deepEqual(result.question.answer, [0, 2]);
  assert.equal(result.question.type, "multi");
});

test("restores a snapshot multi-answer row only when its prompt and choices match", () => {
  const matchingRow = {
    ...makeRow({ A: "FIFO", B: "CBWFQ", C: "LLC", D: "WFQ", E: "RSVP" }, ""),
    id: 1,
    question_text: "Which two QoS tools are used to guarantee minimum bandwidth to certain traffic? (Choose two)",
  };
  const restored = convertBankRow(matchingRow);

  assert.equal(restored.problem, undefined);
  assert.equal(restored.question.type, "multi");
  assert.deepEqual(restored.question.answer, [1, 3]);

  const staleRow = {
    ...matchingRow,
    choices: JSON.stringify({ A: "FIFO", B: "CBWFQ", C: "LLC", D: "WFQ", E: "Different option" }),
  };
  const rejected = convertBankRow(staleRow);

  assert.equal(rejected.question, undefined);
  assert.equal(rejected.problem, "correct answer does not match the available choices");
});

test("restores a multi-answer key before expanding embedded option-table choices", () => {
  const row = {
    ...makeRow({ A: "Option A", B: "Option B", C: "Option C", D: "Option D", E: "Option E" }, ""),
    id: 815,
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
  };

  const restored = convertBankRow(row);

  assert.equal(restored.problem, undefined);
  assert.equal(restored.question.type, "multi");
  assert.deepEqual(restored.question.answer, [1, 4]);
  assert.match(restored.question.options[1], /ip dhcp snooping trust/);
});

function rawRow(id, prompt) {
  return {
    id,
    module: "CCNA Part 9",
    topic: "Routing",
    question_text: prompt,
    choices: JSON.stringify({ A: "Correct", B: "Incorrect" }),
    correct_answer: "A",
    explanation: "",
    question_type: "single",
    match_items: null,
    imageUrl: null,
  };
}

test("converts recovered CCNA matching questions into their original drag-and-drop layouts", () => {
  const rows = [
    {
      id: 181,
      prompt: "Drag and drop the Rapid PVST+ forwarding state actions from the left.",
      answers: [
        "BPDUs received are forwarded to the system module",
        "The port in the forwarding state responds to network management messages",
        "Switched frames received from other ports are advanced",
        "Frames received from the attached segment are processed",
      ],
      items: ["Action", "Action", "Action", "Action"],
      choices: [
        "Frames received from the attached segment are discarded",
        "BPDUs received are forwarded to the system module",
        "The port in the forwarding state responds to network management messages",
        "BPDUs received from the system module are processed and transmitted",
        "Switched frames received from other ports are advanced",
        "Frames received from the attached segment are processed",
      ],
      answer: [1, 2, 4, 5],
    },
    {
      id: 382,
      prompt: "Drag and drop the Ansible features from the left to the right.",
      answers: [
        "Uses the YAML language",
        "Executes modules via SSH by default",
        "Pushes configurations to the client",
        "Operates without agents",
      ],
      items: ["Feature", "Feature", "Feature", "Feature"],
      choices: [
        "Uses the YAML language",
        "Executes modules via SSH by default",
        "Pushes configurations to the client",
        "Uses agents to manage hosts",
        "Requires clients to pull configurations from the server",
        "Operates without agents",
      ],
      answer: [0, 1, 2, 5],
    },
    {
      id: 608,
      prompt: "Drag and drop characteristics of northbound APIs to the right.",
      answers: [
        "Supports automation",
        "Communicates between the SDN controller and the application plane",
        "Supports network virtualization protocols",
        "Supports REST-based requirements",
      ],
      items: ["1", "2", "3", "4"],
      choices: [
        "Supports automation",
        "Communicates between the SDN controller and the application plane",
        "Communicates between the SDN controller and the data plane",
        "Supports data sharing between systems",
        "Supports network virtualization protocols",
        "Supports REST-based requirements",
        "Uses OpenFlow to interface between the data and control planes",
      ],
      answer: [0, 1, 4, 5],
    },
    {
      id: 1306,
      prompt: "Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right.",
      answers: [
        "10.63.255.255/10",
        "172.16.255.39/29",
        "172.20.255.255/16",
        "192.168.255.127/25",
      ],
      items: ["Broadcast Address", "Broadcast Address", "Broadcast Address", "Broadcast Address"],
      choices: [
        "10.1.255.254/24",
        "10.63.255.255/10",
        "172.16.255.39/29",
        "172.20.255.255/16",
        "192.168.1.10/24",
        "192.168.255.127/25",
      ],
      answer: [1, 2, 3, 5],
    },
  ];

  for (const expected of rows) {
    const { question, problem } = convertBankRow({
      ...rawRow(expected.id, expected.prompt),
      correct_answer: expected.answers.map((answer) => `+ ${answer}`).join("\n"),
    });

    assert.equal(problem, undefined, `question ${expected.id} should convert`);
    assert.equal(question.type, "drag_drop", `question ${expected.id} should use drag-and-drop`);
    assert.ok(isValidQuestion(question), `question ${expected.id} should be gradable`);
    assert.deepEqual(question.items, expected.items, `question ${expected.id} targets`);
    assert.deepEqual(question.choices, expected.choices, `question ${expected.id} choices`);
    assert.deepEqual(question.answer, expected.answer, `question ${expected.id} answer key`);
  }
});

test("attaches recreated exhibits to recovered CCNA matching questions", () => {
  for (const bankId of [181, 382, 608, 1306]) {
    assert.ok(applyNativeExhibit({ bankId }).exhibitImage, `question ${bankId} should have a recreated exhibit`);
  }
});

test("merges usable questions with raw-converted rows without duplicate bank IDs", async () => {
  const usableQuestion = {
    bankId: 1,
    prompt: "Normalized question",
    type: "single",
    options: ["Correct", "Incorrect"],
    answer: 0,
    module: "CCNA Part 9",
    topic: "Routing",
  };
  globalThis.fetch = async (url) => {
    const payload = String(url).endsWith("/all-usable")
      ? { questions: [usableQuestion], skippedCount: 2 }
      : [rawRow(1, "Raw duplicate"), rawRow(2, "Raw supplemental")];
    return new Response(JSON.stringify(payload), { status: 200 });
  };

  const result = await loadCcnaAllQuestionsBank();

  assert.deepEqual(result.questions.map((question) => question.bankId), [1, 2]);
  assert.equal(result.questions[0].prompt, "Normalized question");
  assert.equal(result.questions[1].prompt, "Raw supplemental");
});
