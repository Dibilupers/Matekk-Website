import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let vite;
let convertBankRow;
let loadCcnaAllQuestionsBank;
let loadCachedCcnaAllQuestionsBank;
let createOfflineCcnaExamQuestions;
let isValidQuestion;
let applyNativeExhibit;
let compositeSetQuestions;
let getOfflineLegacyQuestionBank;
let builtInQuestionBank;
let originalFetch;
let originalCaches;
let originalWindow;

before(async () => {
  vite = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  ({ convertBankRow } = await vite.ssrLoadModule("/src/utils/ccnaBankConverter.js"));
  ({ loadCcnaAllQuestionsBank } = await vite.ssrLoadModule("/src/utils/ccnaQuestionBankApi.js"));
  ({ loadCachedCcnaAllQuestionsBank } = await vite.ssrLoadModule("/src/utils/ccnaOfflineQuestionBank.js"));
  ({ createOfflineCcnaExamQuestions } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaOfflineTimedExam.js"));
  ({ isValidQuestion } = await vite.ssrLoadModule("/src/utils/ccnaExamGrading.js"));
  ({ applyNativeExhibit } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaCompositeSetQuestions.js"));
  ({ CCNA_COMPOSITE_SET_QUESTIONS: compositeSetQuestions } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaCompositeSetQuestions.js"));
  ({ getOfflineLegacyQuestionBank } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaOfflineExamQuestions.js"));
  ({ CCNA_QUESTION_BANK: builtInQuestionBank } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaQuestionBank.jsx"));
  originalFetch = globalThis.fetch;
  originalCaches = globalThis.caches;
  originalWindow = globalThis.window;
});

after(async () => {
  globalThis.fetch = originalFetch;
  if (originalCaches === undefined) delete globalThis.caches;
  else globalThis.caches = originalCaches;
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
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

test("converts recovered CCNA matching questions when the raw response omits their answer keys", () => {
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
      choices: null,
      correct_answer: null,
    });

    assert.equal(problem, undefined, `question ${expected.id} should convert`);
    assert.equal(question.type, "drag_drop", `question ${expected.id} should use drag-and-drop`);
    assert.ok(isValidQuestion(question), `question ${expected.id} should be gradable`);
    assert.deepEqual(question.items, expected.items, `question ${expected.id} targets`);
    assert.deepEqual(question.choices, expected.choices, `question ${expected.id} choices`);
    assert.deepEqual(question.answer, expected.answer, `question ${expected.id} answer key`);
  }
});

test("rejects recovered matching questions if a present answer key conflicts with its saved mapping", () => {
  const { question, problem } = convertBankRow({
    ...rawRow(1306, "Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right."),
    choices: null,
    correct_answer: "+ 10.63.255.255/10\n+ 172.16.255.39/29\n+ 172.20.255.255/16\n+ 192.168.1.10/24",
  });

  assert.equal(question, undefined);
  assert.equal(problem, "answer format is not a supported matching format");
});

test("attaches recreated exhibits to recovered CCNA matching questions that need them", () => {
  for (const bankId of [181, 382, 608]) {
    const question = applyNativeExhibit({ bankId });
    assert.equal(question.hideExhibitImage, true, `question ${bankId} should hide the duplicate activity exhibit`);
    assert.equal(question.exhibitImage, undefined);
  }
  assert.equal(applyNativeExhibit({ bankId: 1306 }).exhibitImage, undefined);
  const { question } = convertBankRow({
    ...rawRow(1306, "Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right."),
    choices: null,
    correct_answer: null,
  });
  assert.equal(question.type, "drag_drop");
  assert.ok(isValidQuestion(question));
});

test("recreates the source-matching WLC security exhibit for question 1012", () => {
  const question = applyNativeExhibit({ bankId: 1012 });

  assert.equal(question.exhibitDiagram, "wlc-security-tab-legacy");
  assert.equal(question.exhibitImage, undefined);
  const offlineQuestion = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 1301);
  assert.ok(offlineQuestion);
  assert.equal(offlineQuestion.exhibitDiagram, "wlc-security-tab-legacy");
  assert.equal(offlineQuestion.exhibitImage, undefined);
  const bundledQuestion = builtInQuestionBank.find((entry) => entry.legacyIndex === 1301);
  assert.ok(bundledQuestion);
  assert.equal(bundledQuestion.exhibitDiagram, "wlc-security-tab-legacy");
  for (const [prompt, exhibitDiagram] of [
    ["Web Passthrough Layer 3 Web Policy", "wlc-my-wlan-layer2"],
    ["RADIUS server to service all user and device authentication", "wlc-psk-layer2"],
    ["clients must reauthenticate hourly", "wlc-advanced-tab"],
  ]) {
    const compositeQuestion = compositeSetQuestions.find((entry) => entry.prompt.includes(prompt));
    assert.ok(compositeQuestion, `composite question "${prompt}" should be present`);
    assert.equal(compositeQuestion.exhibitDiagram, exhibitDiagram);
    assert.equal(compositeQuestion.exhibitImage, undefined);
  }
});

test("replaces recreated matching-activity screenshots with their existing interactions or native exhibits", () => {
  for (const bankId of [181, 299, 382, 608, 1306]) {
    assert.equal(applyNativeExhibit({ bankId }).hideExhibitImage, true, `question ${bankId} should hide its duplicate activity image`);
  }
  assert.equal(applyNativeExhibit({ bankId: 441 }).exhibitDiagram, "routing-protocols-prefix");
  assert.equal(applyNativeExhibit({ bankId: 441 }).hideExhibitImage, true);
  assert.equal(applyNativeExhibit({ bankId: 1305 }).nativeExhibitText, true);
  assert.equal(applyNativeExhibit({ bankId: 1305 }).hideExhibitImage, true);
  assert.equal(applyNativeExhibit({ bankId: 1317 }).nativeExhibitText, true);
  assert.equal(applyNativeExhibit({ bankId: 1321 }).hideExhibitImage, true);
  assert.equal(applyNativeExhibit({ bankId: 1321 }).exhibitDiagram, undefined);
  assert.match(applyNativeExhibit({ bankId: 1321 }).exhibit, /ip nat inside source list 1 interface Gi0\/1 overload/);

  for (const legacyIndex of [266, 267, 278, 282, 498, 617, 700, 759, 926]) {
    const question = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === legacyIndex);
    assert.ok(question, `offline question ${legacyIndex} should remain available`);
    assert.equal(question.hideExhibitImage, true, `offline question ${legacyIndex} should hide the duplicate activity image`);
  }
  const offlineQuestion299 = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 617);
  assert.equal(offlineQuestion299.type, "match");
  assert.deepEqual(offlineQuestion299.items, ["DC-1 Gi1/0", "DC-1 Gi1/1", "DC-1 Gi1/2", "HQ-1 Gi1/3"]);
  assert.deepEqual(offlineQuestion299.answer, [2, 5, 4, 6]);
  assert.equal(offlineQuestion299.choices.length, 7);
  assert.equal(getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 266).choices.length, 7);
  assert.equal(
    getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 759).exhibitDiagram,
    "routing-protocols-prefix",
  );
  assert.equal(
    getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 266).exhibit?.includes("10.0.0.0/8 is variably subnetted"),
    true,
  );
  assert.match(
    getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 278).exhibit,
    /192\.168\.1\.20 \(Preferred\)/,
  );
  const offlinePatQuestion = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 282);
  assert.equal(offlinePatQuestion.exhibitDiagram, undefined);
  assert.match(offlinePatQuestion.exhibit, /ip nat inside source list 1 interface Gi0\/1 overload/);
});

test("keeps the Router1 routing-method question prompt and matching controls while replacing its screenshot with a topology", () => {
  const { question } = convertBankRow({
    ...rawRow(441, "Refer to the exhibit. The Router1 routing table has multiple methods to reach 10.10.10.0/24. Drag and drop the network conditions."),
    imageUrl: "https://example.com/questions/ccna-question-441.png",
    question_type: "match",
    match_items: ["All protocols are up", "OSPF and eBGP are down"],
    choices: JSON.stringify(["eBGP", "EIGRP", "Static"]),
    correct_answer: JSON.stringify([0, 1]),
  });
  const offlineQuestion = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 759);

  assert.match(question.prompt, /multiple methods to reach 10\.10\.10\.0\/24/);
  assert.equal(question.type, "match");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(applyNativeExhibit({ ...question, bankId: 441 }).exhibitDiagram, "routing-protocols-prefix");
  assert.equal(offlineQuestion.exhibitDiagram, "routing-protocols-prefix");
  assert.equal(offlineQuestion.hideExhibitImage, true);
});

test("restores the four omitted matching rows so the merged CCNA exam reaches 1,367 questions", async () => {
  const missingIds = new Set([181, 382, 608, 1306]);
  const usableQuestions = Array.from({ length: 1367 }, (_, index) => index + 1)
    .filter((bankId) => !missingIds.has(bankId))
    .map((bankId) => ({
      bankId,
      prompt: `Usable question ${bankId}`,
      type: "single",
      options: ["Correct", "Incorrect"],
      answer: 0,
      module: "CCNA Part 9",
      topic: "Routing",
    }));
  const omittedRows = [
    rawRow(181, "Drag and drop the Rapid PVST+ forwarding state actions from the left."),
    rawRow(382, "Drag and drop the Ansible features from the left to the right."),
    rawRow(608, "Drag and drop characteristics of northbound APIs to the right."),
    rawRow(1306, "Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right."),
  ].map((row) => ({ ...row, choices: null, correct_answer: null }));

  globalThis.fetch = async (url) => {
    const payload = String(url).endsWith("/all-usable")
      ? { questions: usableQuestions, skippedCount: 4 }
      : omittedRows;
    return new Response(JSON.stringify(payload), { status: 200 });
  };

  const cachedResponses = new Map();
  globalThis.window = { location: { origin: "https://matekk.test" } };
  globalThis.caches = {
    open: async () => ({
      put: async (request, response) => cachedResponses.set(request.url, response),
      match: async (request) => cachedResponses.get(request.url)?.clone(),
    }),
  };

  const result = await loadCcnaAllQuestionsBank();

  assert.equal(result.questions.length, 1367);
  assert.equal(result.skippedCount, 0);
  const cachedQuestions = await loadCachedCcnaAllQuestionsBank();
  assert.equal(cachedQuestions.length, 1367);
  assert.deepEqual(
    cachedQuestions.map((question) => question.bankId),
    result.questions.map((question) => question.bankId),
  );
  for (const bankId of missingIds) {
    const question = result.questions.find((entry) => entry.bankId === bankId);
    assert.ok(question, `question ${bankId} should be restored`);
    assert.equal(question.type, "drag_drop");
  }
});
test("marks the recreated matching activity screenshot to stay hidden", () => {
  const { question } = convertBankRow({
    ...rawRow(570, "Refer to the exhibit. Drag and drop destination IPs onto the network segments."),
    imageUrl: "https://example.com/questions/ccna-question-570.png",
    question_type: "match",
    choices: JSON.stringify(["Internet", "Router1"]),
    match_items: ["10.10.10.16", "10.10.13.1"],
    correct_answer: JSON.stringify([0, 1]),
  });

  assert.equal(question.type, "match");
  assert.equal(question.hideExhibitImage, true);
  assert.ok(question.exhibitImage);
});

test("offline timed CCNA formats sample their existing lengths from the cached shared bank", () => {
  const bankQuestions = Array.from({ length: 1367 }, (_, index) => ({
    bankId: index + 1,
    prompt: `Shared-bank question ${index + 1}`,
    type: "single",
    options: ["Correct", "Incorrect"],
    answer: 0,
    module: "CCNA Part 9",
    topic: "Routing",
  }));
  const bankIds = new Set(bankQuestions.map((question) => question.bankId));

  for (const [examKey, expectedCount] of [["short", 50], ["medium", 100], ["long", 150]]) {
    const questions = createOfflineCcnaExamQuestions(examKey, bankQuestions);
    assert.equal(questions.length, expectedCount);
    assert.ok(
      questions.some((question) => bankIds.has(question.id)),
      `${examKey} exam should sample questions from the shared bank`,
    );
    assert.ok(questions.every((question) => isValidQuestion(question)));
  }
});
