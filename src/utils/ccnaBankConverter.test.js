import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
let convertBankRow;
let loadCcnaAllQuestionsBank;
let loadCachedCcnaAllQuestionsBank;
let getCcnaExhibitImageByBankId;
let getCcnaExhibitImageByLegacyIndex;
let ccnaExhibitImageMap;
let createOfflineCcnaExamQuestions;
let isValidQuestion;
let applyNativeExhibit;
let compositeSetQuestions;
let getOfflineLegacyQuestionBank;
let createOfflineLegacyExamQuestions;
let ExhibitDiagram;
let QuestionExhibits;
let getOfflineReferExhibitQuestionBank;
let ccnaLegacyQuestions;
let builtInQuestionBank;
let createShortExamQuestions;
let setDatabaseQuestions;
let originalFetch;
let originalCaches;
let originalWindow;
let originalReact;

before(async () => {
  vite = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
  });
  ({ convertBankRow } = await vite.ssrLoadModule("/src/utils/ccnaBankConverter.js"));
  ({ loadCcnaAllQuestionsBank } = await vite.ssrLoadModule("/src/utils/ccnaQuestionBankApi.js"));
  ({ getCcnaExhibitImageByBankId, getCcnaExhibitImageByLegacyIndex } = await vite.ssrLoadModule("/src/utils/ccnaExhibitImages.js"));
  ({ default: ccnaExhibitImageMap } = await vite.ssrLoadModule("/src/assets/ccna-exhibit-image-map.json"));
  ({ loadCachedCcnaAllQuestionsBank } = await vite.ssrLoadModule("/src/utils/ccnaOfflineQuestionBank.js"));
  ({ createOfflineCcnaExamQuestions } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaOfflineTimedExam.js"));
  ({ isValidQuestion } = await vite.ssrLoadModule("/src/utils/ccnaExamGrading.js"));
  ({ applyNativeExhibit } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaCompositeSetQuestions.js"));
  ({ CCNA_COMPOSITE_SET_QUESTIONS: compositeSetQuestions } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaCompositeSetQuestions.js"));
  ({
    getOfflineLegacyQuestionBank,
    createOfflineLegacyExamQuestions,
    getOfflineReferExhibitQuestionBank,
  } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaOfflineExamQuestions.js"));
  ({ ExhibitDiagram } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaExhibit.jsx"));
  ({ QuestionExhibits } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaExamQuestionViews.jsx"));
  ({ CCNA_LEGACY_QUESTIONS: ccnaLegacyQuestions } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaLegacyQuestions.js"));
  ({ CCNA_QUESTION_BANK: builtInQuestionBank } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaQuestionBank.jsx"));
  ({ createShortExamQuestions, setDatabaseQuestions } = await vite.ssrLoadModule("/src/pages/modules/programs/Cisco/CCNA/ccnaQuestionBank.jsx"));
  originalFetch = globalThis.fetch;
  originalCaches = globalThis.caches;
  originalWindow = globalThis.window;
  originalReact = globalThis.React;
  globalThis.React = React;
});

after(async () => {
  globalThis.fetch = originalFetch;
  if (originalCaches === undefined) delete globalThis.caches;
  else globalThis.caches = originalCaches;
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  if (originalReact === undefined) delete globalThis.React;
  else globalThis.React = originalReact;
  await vite.close();
});

test("maps original exhibit images to legacy and live-bank question IDs", () => {
  assert.equal(ccnaExhibitImageMap.length, 349);
  const legacyIndexes = new Set();
  for (const entry of ccnaExhibitImageMap) {
    assert.ok(!legacyIndexes.has(entry.legacy_question_index));
    legacyIndexes.add(entry.legacy_question_index);
    const image = getCcnaExhibitImageByLegacyIndex(entry.legacy_question_index);
    assert.match(image, new RegExp(`ccna-exhibit-${entry.legacy_question_index}\\.png$`));
    if (Number.isSafeInteger(entry.after_exhibit_question_id)) {
      assert.equal(getCcnaExhibitImageByBankId(entry.after_exhibit_question_id), image);
    }
  }
  assert.equal(legacyIndexes.size, 349);

  const offlineQuestion = getOfflineLegacyQuestionBank().find((question) => question.legacyIndex === 41);
  assert.ok(offlineQuestion);
  assert.match(offlineQuestion.exhibitImage, /ccna-exhibit-41\.png$/);

  const builtInQuestion = builtInQuestionBank.find(
    (question) => question.source === "legacy-ccna-200-301" && question.legacyIndex === 41,
  );
  assert.ok(builtInQuestion);
  assert.match(builtInQuestion.exhibitImage, /ccna-exhibit-41\.png$/);
});

test("makes the LACP question self-contained when its source image only repeats the choices", () => {
  const legacyQuestion = getOfflineLegacyQuestionBank().find((question) => question.legacyIndex === 1138);
  const builtInQuestion = builtInQuestionBank.find(
    (question) => question.source === "legacy-ccna-200-301" && question.legacyIndex === 1138,
  );
  assert.ok(legacyQuestion);
  assert.ok(builtInQuestion);
  assert.doesNotMatch(legacyQuestion.prompt, /refer to the exhibit/i);
  assert.equal(legacyQuestion.hideExhibitImage, true);
  assert.equal(legacyQuestion.exhibitImage, undefined);
  assert.match(legacyQuestion.explanation, /active mode enables LACP/);
  assert.doesNotMatch(builtInQuestion.prompt, /refer to the exhibit/i);
  assert.equal(builtInQuestion.hideExhibitImage, true);
  assert.equal(builtInQuestion.exhibitImage, undefined);

  const result = convertBankRow({
    ...makeRow([
      "SW2(config-if)#channel-group 2 mode desirable",
      "SW2(config-if)#channel-group 1 mode active",
      "SW2(config-if)#channel-group 1 mode on",
      "SW2(config-if)#channel-group 2 mode auto",
    ], "B"),
    question_text: "Refer to the exhibit. Which configuration enables SW2 to establish an LACP EtherChannel?",
    imageUrl: "https://example.com/questions/ccna-question-102.png",
  });

  assert.equal(result.problem, undefined);
  assert.doesNotMatch(result.question.prompt, /refer to the exhibit/i);
  assert.equal(result.question.hideExhibitImage, true);
  assert.equal(result.question.exhibitImage, undefined);
  assert.equal(result.question.answer, 1);
  assert.match(result.question.explanation, /active mode enables LACP/);
});

test("recreates the native-VLAN trunk exhibit and retains its separate fixed exhibit", () => {
  const question = getOfflineLegacyQuestionBank().find((item) => item.legacyIndex === 45);
  assert.ok(question);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.match(question.exhibit, /S1#show interface trunk/);
  assert.match(question.exhibit, /Fa0\/1\s+on\s+802\.1q\s+trunking\s+1/);
  assert.match(question.exhibit, /Fa0\/1\s+on\s+802\.1q\s+trunking\s+2/);
  assert.match(question.exhibit, /Fa0\/1\s+1-1005/);
  assert.match(question.exhibit, /Fa0\/1\s+1-4094/);
  assert.match(question.exhibit, /Fa0\/1\s+1,2/);
  assert.match(question.exhibit, /Fa0\/1\s+1,12/);
  assert.equal(question.afterExhibit.questionId, 1082);

  const markup = renderToStaticMarkup(React.createElement(QuestionExhibits, { question }));
  assert.match(markup, /S1#show interface trunk/);
  assert.match(markup, /1-1005/);
  assert.match(markup, /1-4094/);
  assert.match(markup, /ccna-after-exhibit-1082\.png/);

  const liveQuestion = applyNativeExhibit({
    bankId: 1082,
    prompt: "Refer to the exhibit. A frame from VLAN1 of switch S1 is sent to switch S2 where the frame received on VLAN2. What causes this behavior?",
  });
  assert.equal(liveQuestion.exhibit, question.exhibit);
  assert.match(liveQuestion.exhibit, /Fa0\/1\s+1-1005/);
  assert.match(liveQuestion.exhibit, /Fa0\/1\s+1-4094/);
});

test("replaces the blurry subinterface topology with its native diagram", () => {
  const question = getOfflineLegacyQuestionBank().find((item) => item.legacyIndex === 50);
  assert.ok(question);
  assert.equal(question.exhibitDiagram, "router-on-a-stick-vlan20");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.match(question.exhibit, /switchport access vlan 20/);

  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));
  assert.match(markup, /R1/);
  assert.match(markup, /SW1/);
  assert.match(markup, /SW2/);
  assert.match(markup, /E0\/0 to E0\/0/);
  assert.match(markup, /E0\/1 to E0\/1/);
  assert.doesNotMatch(markup, /VLAN 20 host/);
});

test("replaces the VTP frame-flow screenshot with its native topology", () => {
  const question = getOfflineLegacyQuestionBank().find((item) => item.legacyIndex === 59);
  assert.ok(question);
  assert.equal(question.exhibitDiagram, "vtp-transparent-frame-flow");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.match(question.exhibit, /vtp mode transparent/);
  assert.match(question.exhibit, /switchport trunk encapsulation/);
  assert.match(question.exhibit, /\s+dot1q/);

  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));
  assert.match(markup, /PC A/);
  assert.match(markup, /SW2/);
  assert.match(markup, /PC B/);
  assert.match(markup, /VTP transparent/);
  assert.match(markup, /Trunk · VLAN ID 2/);
  assert.match(markup, /Access · untagged/);
});

test("redraws the redundant-network exhibit with every original host and address", () => {
  const question = getOfflineLegacyQuestionBank().find((item) => item.legacyIndex === 84);
  assert.ok(question);
  assert.equal(question.exhibitDiagram, "redundant-switch-network");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit.questionId, 1121);

  const diagramMarkup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));
  for (const value of [
    "10.142.137.1/24",
    "172.25.117.2/24",
    "Host 1",
    "Host 2",
    "Host 3",
    "Host 4",
    "Host 5",
    "Host 6",
  ]) {
    assert.ok(diagramMarkup.includes(value), `the topology should show ${value}`);
  }

  const allExhibitsMarkup = renderToStaticMarkup(React.createElement(QuestionExhibits, { question }));
  assert.ok(allExhibitsMarkup.includes("10.142.137.1/24"));
  assert.match(allExhibitsMarkup, /ccna-after-exhibit-1121\.png/);

  const liveQuestion = applyNativeExhibit({ bankId: 1121 });
  assert.equal(liveQuestion.exhibitDiagram, "redundant-switch-network");
});

test("remakes the R86 static-route exhibit instead of showing the source screenshot", () => {
  const legacyQuestion = getOfflineLegacyQuestionBank().find((question) => question.legacyIndex === 835);
  assert.ok(legacyQuestion);
  assert.equal(legacyQuestion.exhibitDiagram, "r86-static-route-to-r14-17216-34");
  assert.equal(legacyQuestion.hideExhibitImage, true);
  assert.equal(legacyQuestion.exhibitImage, undefined);

  const result = convertBankRow({
    ...makeRow([
      "ip route 172.16.34.0 255.255.255.248 10.73.65.65",
      "ip route 172.16.34.0 255.255.255.224 10.73.65.66",
      "ip route 10.73.65.65 255.255.255.248 172.16.34.0",
      "ip route 172.16.34.0 0.0.0.7 10.73.65.64",
    ], "A"),
    id: 517,
    question_text: "Refer to the exhibit. A static route must be configured on R86 to forward traffic for the 172.16.34.0/29 network, which resides on R14. Which command must be used to fulfill the request?",
    imageUrl: "https://example.com/questions/ccna-exhibit-835.png",
  });

  assert.equal(result.problem, undefined);
  assert.equal(result.question.exhibitDiagram, "r86-static-route-to-r14-17216-34");
  assert.equal(result.question.hideExhibitImage, true);
  assert.equal(result.question.exhibitImage, undefined);
});

test("shows the option-derived IPv6 addresses in the R17-to-R18 WAN exhibit", () => {
  const legacyQuestion = getOfflineLegacyQuestionBank().find((question) => question.legacyIndex === 476);
  assert.ok(legacyQuestion);
  assert.equal(legacyQuestion.exhibitDiagram, "candidate-ipv6-wan-159");
  assert.equal(legacyQuestion.hideExhibitImage, true);

  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, { type: legacyQuestion.exhibitDiagram }));
  assert.match(markup, /2001:DB8:2::201\/64/);
  assert.match(markup, /2001:DB8:3::201\/64/);
  assert.match(markup, /2001:DB8:3::301\/64/);
  assert.match(markup, /2001:DB8:4::\/64/);
  assert.match(markup, /2001:DB8:4::302\/64/);
  assert.doesNotMatch(markup, /unavailable/i);
});

test("uses answer-derived topology details in offline legacy questions", () => {
  const cases = [
    { legacyIndex: 340, diagram: "candidate-vlan-roles-24", values: ["Data VLAN: 8", "Voice VLAN: 9", "Gi1/3"] },
    { legacyIndex: 382, diagram: "voice-data-vlan300-400", values: ["switchport access vlan 300", "switchport voice vlan 400"] },
    { legacyIndex: 398, diagram: "candidate-cdp-target-82", values: ["Gi0/0/0", "Gi0/0/1"] },
    { legacyIndex: 515, diagram: "candidate-etherchannel-198", values: ["Gi0/1", "Gi0/2", "LACP channel 1"] },
    { legacyIndex: 1019, diagram: "candidate-pc2-file-server-policy-703", values: ["192.168.2.10", "Gi0/1", "ACL 1 outbound"] },
  ];

  for (const { legacyIndex, diagram, values } of cases) {
    const question = getOfflineLegacyQuestionBank().find((item) => item.legacyIndex === legacyIndex);
    assert.ok(question, `legacy question ${legacyIndex} should be included`);
    assert.equal(question.exhibitDiagram, diagram);
    assert.equal(question.hideExhibitImage, true);

    const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, { type: diagram }));
    for (const value of values) assert.ok(markup.includes(value), `${diagram} should show ${value}`);
    assert.doesNotMatch(markup, /unavailable/i, `${diagram} should not show unavailable placeholders`);
  }
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
  const question1305 = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 266);
  assert.equal(question1305.afterExhibit.questionId, 1305);
  assert.match(question1305.afterExhibit.imageUrl, /ccna-after-exhibit-1305\.png$/);
  assert.match(
    getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 278).afterExhibit.text,
    /192\.168\.1\.20 \(Preferred\)/,
  );
  const offlinePatQuestion = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 282);
  assert.equal(offlinePatQuestion.exhibitDiagram, undefined);
  assert.equal(offlinePatQuestion.exhibit, undefined);
  assert.match(offlinePatQuestion.afterExhibit.text, /ip nat inside source list 1 interface Gi0\/1 overload/);
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

test("restores omitted matching rows and mapped exhibit images in the merged CCNA exam", async () => {
  const missingIds = new Set([181, 382, 608, 1306, 1081]);
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
  const signedAfterExhibitUrl = "https://example.com/storage/ccna-after-exhibit-23.png?token=short-lived";
  usableQuestions[22].afterExhibit = {
    questionId: 23,
    title: "HEADQUARTERS SPANNING-TREE TOPOLOGY",
    text: "",
    comparisonNo: 10,
    imageUrl: signedAfterExhibitUrl,
  };
  const omittedRows = [
    rawRow(181, "Drag and drop the Rapid PVST+ forwarding state actions from the left."),
    rawRow(382, "Drag and drop the Ansible features from the left to the right."),
    rawRow(608, "Drag and drop characteristics of northbound APIs to the right."),
    rawRow(1306, "Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right."),
  ].map((row) => ({ ...row, choices: null, correct_answer: null }));
  omittedRows.push(rawRow(1081, "Refer to the exhibit. Which interface is configured for this task?"));

  globalThis.fetch = async (url) => {
    const payload = String(url).endsWith("/all-usable")
      ? { questions: usableQuestions, skippedCount: 5 }
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
  assert.equal(
    result.questions.find((question) => question.bankId === 23).afterExhibit.imageUrl,
    signedAfterExhibitUrl,
  );
  assert.match(
    cachedQuestions.find((question) => question.bankId === 23).afterExhibit.imageUrl,
    /ccna-after-exhibit-23\.png$/,
  );
  assert.deepEqual(
    cachedQuestions.map((question) => question.bankId),
    result.questions.map((question) => question.bankId),
  );
  for (const bankId of missingIds) {
    const question = result.questions.find((entry) => entry.bankId === bankId);
    assert.ok(question, `question ${bankId} should be restored`);
    if (bankId !== 1081) assert.equal(question.type, "drag_drop");
  }
  assert.match(
    result.questions.find((question) => question.bankId === 1081).exhibitImage,
    /ccna-exhibit-44\.png$/,
  );
});

test("jumbles offline matching choices without changing their correct answers", () => {
  const bankQuestions = [
    ...Array.from({ length: 5 }, (_, index) => ({
      bankId: index + 1,
      prompt: `Offline matching question ${index + 1}`,
      type: "match",
      items: ["Item A", "Item B", "Item C"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 1, 2],
    })),
    {
      bankId: 6,
      prompt: "Offline grouped matching question",
      type: "match",
      items: ["Item A", "Item B", "Item C"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 0, 2],
    },
    ...Array.from({ length: 6 }, (_, index) => ({
      bankId: index + 7,
      prompt: `Offline drag-and-drop question ${index + 1}`,
      type: "drag_drop",
      items: ["Item A", "Item B", "Item C"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 1, 2],
    })),
    {
      bankId: 13,
      prompt: "Offline click-boxes question",
      type: "click_boxes",
      items: ["Item A", "Item B", "Item C"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 1, 2],
    },
    {
      bankId: 14,
      prompt: "Offline second click-boxes question",
      type: "click_boxes",
      items: ["Item A", "Item B", "Item C"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 1, 2],
    },
    {
      bankId: 15,
      prompt: "Offline image question",
      type: "image",
      items: ["Item A", "Item B", "Item C", "Item D"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 1, 1, 2],
      groupSizes: [1, 2, 1],
    },
    {
      bankId: 16,
      prompt: "Offline second image question",
      type: "image",
      items: ["Item A", "Item B", "Item C", "Item D"],
      choices: ["Choice A", "Choice B", "Choice C"],
      answer: [0, 1, 1, 2],
      groupSizes: [1, 2, 1],
    },
    ...Array.from({ length: 45 }, (_, index) => ({
      bankId: index + 17,
      prompt: `Offline multiple-choice question ${index + 1}`,
      type: "single",
      options: ["Correct", "Incorrect"],
      answer: 0,
    })),
  ];
  const originalRandom = Math.random;
  Math.random = () => 0;

  try {
    setDatabaseQuestions(bankQuestions);
    const onlineQuestions = createShortExamQuestions();
    const questions = createOfflineCcnaExamQuestions("short", bankQuestions);
    const originalQuestions = new Map(bankQuestions.map((question) => [question.prompt, question]));
    const shuffledQuestions = questions.filter((question) =>
      ["match", "drag_drop"].includes(question.type) &&
      question.matchStyle !== "numbers" &&
      new Set(question.answer).size === question.answer.length,
    );
    const unchangedQuestions = questions.filter((question) =>
      ["click_boxes", "image"].includes(question.type) ||
      (question.type === "match" && !shuffledQuestions.includes(question)),
    );
    const onlineMatchingQuestions = onlineQuestions.filter((question) =>
      ["match", "drag_drop"].includes(question.type),
    );

    assert.equal(shuffledQuestions.length, 7);
    for (const question of shuffledQuestions) {
      const original = originalQuestions.get(question.prompt);
      assert.ok(original, `expected ${question.prompt} to come from the offline bank`);
      assert.notDeepEqual(question.choices, original.choices, `${question.prompt} choices should be jumbled`);
      assert.deepEqual(
        question.answer.map((choiceIndex) => question.choices[choiceIndex]),
        original.answer.map((choiceIndex) => original.choices[choiceIndex]),
        `${question.prompt} should retain its original correct matches`,
      );
    }

    assert.equal(unchangedQuestions.length, 3);
    for (const question of unchangedQuestions) {
      const original = originalQuestions.get(question.prompt);
      assert.ok(original, `expected ${question.prompt} to come from the offline bank`);
      assert.deepEqual(question.choices, original.choices);
      assert.deepEqual(question.answer, original.answer);
      if (question.type === "image") assert.deepEqual(question.groupSizes, original.groupSizes);
    }

    assert.equal(onlineMatchingQuestions.length, 8);
    for (const question of onlineMatchingQuestions) {
      const original = originalQuestions.get(question.prompt);
      assert.ok(original, `expected ${question.prompt} to come from the online bank`);
      assert.deepEqual(question.choices, original.choices, `${question.prompt} should not be jumbled online`);
    }

    Math.random = () => 0.999;
    const noOpShuffleQuestions = createOfflineCcnaExamQuestions("short", bankQuestions).filter((question) =>
      ["match", "drag_drop"].includes(question.type) &&
      question.matchStyle !== "numbers" &&
      new Set(question.answer).size === question.answer.length,
    );
    assert.equal(noOpShuffleQuestions.length, 8);
    for (const question of noOpShuffleQuestions) {
      const original = originalQuestions.get(question.prompt);
      assert.ok(original, `expected ${question.prompt} to come from the offline bank`);
      assert.notDeepEqual(question.choices, original.choices, `${question.prompt} should always be jumbled`);
    }
  } finally {
    setDatabaseQuestions([]);
    Math.random = originalRandom;
  }
});

test("shuffles the legacy offline SNMP matches without changing their correct answers", () => {
  const originalRandom = Math.random;
  try {
    Math.random = () => 0.5;
    const legacyQuestions = getOfflineLegacyQuestionBank();
    const originalQuestion = legacyQuestions.find((question) => question.legacyIndex === 318);
    const examQuestion = createOfflineLegacyExamQuestions(legacyQuestions.length)
      .find((question) => question.legacyIndex === 318);

    assert.ok(originalQuestion);
    assert.ok(examQuestion);
    assert.notDeepEqual(examQuestion.choices, originalQuestion.choices);
    assert.deepEqual(
      examQuestion.answer.map((choiceIndex) => examQuestion.choices[choiceIndex]),
      originalQuestion.answer.map((choiceIndex) => originalQuestion.choices[choiceIndex]),
    );
  } finally {
    Math.random = originalRandom;
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

test("uses a corrected after exhibit instead of the original bank exhibit", () => {
  const { question } = convertBankRow({
    ...rawRow(23, "Refer to the exhibit. Which switch is the root bridge?"),
    imageUrl: "https://example.com/questions/ccna-question-23.png",
    afterExhibitTitle: "HEADQUARTERS SPANNING-TREE TOPOLOGY",
    afterExhibitText: "Switch 1 connects HQ1 and Switch 2.",
    afterExhibitComparisonNo: 10,
  });

  assert.equal(question.afterExhibit.title, "HEADQUARTERS SPANNING-TREE TOPOLOGY");
  assert.equal(question.afterExhibit.text, "Switch 1 connects HQ1 and Switch 2.");
  assert.equal(question.afterExhibit.comparisonNo, 10);
  assert.equal(question.exhibit, undefined);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.hideExhibitImage, true);
});

test("keeps image-only corrected exhibits renderable without a legacy image", () => {
  const { question, problem } = convertBankRow({
    ...rawRow(70, "Refer to the exhibit. Which switch has the root role?"),
    imageUrl: null,
    afterExhibitImageUrl: "https://example.com/questions/ccna-after-exhibit-70.png",
    afterExhibitComparisonNo: 12,
  });

  assert.equal(problem, undefined);
  assert.equal(question.afterExhibit.imageUrl, "https://example.com/questions/ccna-after-exhibit-70.png");
  assert.equal(question.exhibitImage, undefined);
});

test("adds corrected exhibits to the bundled offline legacy question", () => {
  const question = getOfflineLegacyQuestionBank().find(
    (entry) => entry.afterExhibit?.comparisonNo === 10,
  );

  assert.ok(question);
  assert.equal(question.afterExhibit.title, "HEADQUARTERS SPANNING-TREE TOPOLOGY");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
});

test("keeps drag-and-drop questions out of the offline Refer to Exhibit exam", () => {
  const questions = getOfflineReferExhibitQuestionBank();

  assert.equal(questions.length, 375);
  assert.equal(new Set(questions.map((question) => question.bankId)).size, questions.length);
  assert.ok(questions.every((question) => isValidQuestion(question)));
  assert.ok(questions.every((question) => !["drag_drop", "match"].includes(question.type)));
});

test("adds the topology exhibit image to question 77 in the offline Refer to Exhibit exam", () => {
  const question = getOfflineReferExhibitQuestionBank()[76];

  assert.equal(question.legacyIndex, 345);
  assert.match(question.exhibitImage, /ccna-question-77-acl-exhibit\.jpg$/);
});

test("hides redundant or mismatched images while preserving the needed exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  for (const [legacyIndex, expectedDiagram, shouldKeepAfterExhibit, expectedImage] of [
    [44, undefined, true],
    [51, undefined, true],
    [62, undefined, true],
    [494, "routers-abc-floating-route", false],
    [507, "routers-abc-ospf-dr", true],
    [542, "r4-supernet", false],
    [570, "ospf-r1-r2-r3-priority", false],
    [769, undefined, false, true],
    [508, undefined, true],
    [645, undefined, true],
    [687, undefined, true],
    [1300, undefined, true],
    [1301, "wlc-security-tab-legacy", true],
  ]) {
    const question = questions.find((entry) => entry.legacyIndex === legacyIndex);

    assert.ok(question, `Refer question ${legacyIndex} should remain in the offline bank`);
    if (expectedDiagram) assert.equal(question.exhibitDiagram, expectedDiagram);
    assert.deepEqual(question.offlineSourceExhibitImages, []);
    assert.equal(Boolean(question.afterExhibit?.imageUrl), shouldKeepAfterExhibit);
    if (expectedImage) assert.ok(question.exhibitImage);
  }

  const floatingRouteQuestion = questions.find((entry) => entry.legacyIndex === 494);
  assert.equal(floatingRouteQuestion.afterExhibit, undefined);
  assert.equal(floatingRouteQuestion.exhibitDiagram, "routers-abc-floating-route");

  const jsonQuestion = questions.find((entry) => entry.legacyIndex === 769);
  assert.equal(jsonQuestion.afterExhibit, undefined);
  assert.equal(jsonQuestion.exhibitDiagram, undefined);
  assert.equal(jsonQuestion.exhibit, undefined);
  assert.equal(jsonQuestion.hideExhibitImage, false);
  assert.equal(jsonQuestion.exhibitQuality, "illustrative");
});

test("limits the image cleanup to Refer mode and retains needed OSPF source evidence", () => {
  const referQuestions = getOfflineReferExhibitQuestionBank();
  const legacyQuestions = getOfflineLegacyQuestionBank();
  const referQuestion = referQuestions.find((entry) => entry.legacyIndex === 494);
  const regularQuestion = legacyQuestions.find((entry) => entry.legacyIndex === 494);
  const wlcQuestion = referQuestions.find((entry) => entry.legacyIndex === 1301);
  const ospfQuestion = referQuestions.find((entry) => entry.legacyIndex === 616);

  assert.deepEqual(referQuestion.offlineSourceExhibitImages, []);
  assert.equal(regularQuestion.offlineSourceExhibitImages.length, 1);
  assert.equal(wlcQuestion.exhibitDiagram, "wlc-security-tab-legacy");
  assert.deepEqual(wlcQuestion.offlineSourceExhibitImages, []);
  assert.ok(wlcQuestion.afterExhibit.imageUrl);

  assert.equal(ospfQuestion.exhibitDiagram, "ospf-drother-r1");
  assert.match(ospfQuestion.offlineSourceExhibitImages[0], /ccna-question-298\.png$/);
});

test("pairs question 875 with the verified offline exhibit and corrects Option B masks", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 875);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 250);
  assert.match(question.exhibitImage, /ccna-question-875-ip-address-exhibit\.jpg$/);
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.answer, 1);
  assert.equal(
    question.options[1],
    [
      "R7#",
      "interface FastEthernet1/0",
      "ip address 10.88.31.126 255.255.255.192",
      "R8#",
      "interface FastEthernet0/0",
      "ip address 10.19.63.94 255.255.255.240",
      "R9#",
      "interface FastEthernet1/1",
      "ip address 10.23.98.158 255.255.255.224",
    ].join("\n"),
  );
  assert.match(question.explanation, /last usable address is 10\.19\.63\.94/);
});

test("pairs root-bridge question 962 with the verified offline exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 962);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 272);
  assert.match(question.exhibitImage, /ccna-question-962-stp-root-bridge-exhibit\.jpg$/);
  assert.equal(question.afterExhibit, undefined);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
  assert.equal(question.answer, 2);
  assert.match(question.options[0], /32768[\s\S]*0f:d7:9e:13:ab:82/i);
  assert.match(question.options[2], /32768[\s\S]*01:1c:6c:66:b7:70/i);
});

test("pairs question 963 with the verified offline IP configuration exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 963);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 273);
  assert.match(question.exhibitImage, /ccna-question-963-ipconfig-exhibit\.png$/);
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.answer, 2);
  assert.match(question.explanation, /192\.168\.10\.0\/24/);
  assert.match(question.explanation, /192\.168\.1\.1 is outside that subnet/);
  assert.doesNotMatch(question.explanation, /10\.2\.2\.0\/29/);
});

test("pairs Host A question 1114 with its exhibit and corrects its offline Refer answer", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 1114);
  const question = questions[questionIndex];
  const sourceQuestion = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === 1114);

  assert.ok(question);
  assert.ok(sourceQuestion);
  assert.equal(questionIndex + 1, 307);
  assert.match(question.exhibitImage, /ccna-question-1114-host-a-exhibit\.png$/);
  assert.equal(question.answer, 1);
  assert.match(question.explanation, /192\.168\.1\.255\/24, which is the broadcast address/);
  assert.equal(sourceQuestion.answer, 3);
});

test("pairs Host C question 1152 with its exhibit and verifies the offline gateway answer", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 1152);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 324);
  assert.match(question.exhibitImage, /ccna-question-1152-host-c-network-config\.jpg$/);
  assert.equal(question.answer, 1);
  assert.match(question.explanation, /192\.168\.1\.12.*192\.168\.1\.0\/24/);
  assert.match(question.explanation, /192\.168\.2\.1, which is outside its subnet/);
});

test("pairs question 1130 with the supplied VLAN topology in the offline Refer exam", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 1130);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 314);
  assert.match(question.exhibitImage, /ccna-question-1130-switch-vlan-topology\.jpg$/);
  assert.equal(question.afterExhibit, undefined);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
  assert.equal(question.answer, 1);
});

test("pairs WLAN question 1143 with the composite exhibit in the offline Refer exam", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 1143);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 317);
  assert.match(question.exhibitImage, /ccna-question-1130-switch-vlan-topology\.jpg$/);
  assert.equal(question.afterExhibit, undefined);
  assert.deepEqual(question.answer, [2, 4]);
});

test("pairs WLAN question 1028 with the verified offline Advanced-tab exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 1028);
  const question = questions[questionIndex];

  assert.ok(question);
  assert.equal(questionIndex + 1, 287);
  assert.match(question.exhibitImage, /ccna-question-1028-wlan-advanced-exhibit\.png$/);
  assert.equal(question.afterExhibit, undefined);
  assert.deepEqual(question.answer, [0, 2]);
  assert.match(question.options[0], /Client Band Select/);
  assert.match(question.options[2], /Allow AAA Override/);
});

test("formats the VLAN exhibit separately for question 303 in the offline Refer exam", () => {
  const question = getOfflineReferExhibitQuestionBank().find((entry) => entry.legacyIndex === 1112);

  assert.ok(question);
  assert.match(question.prompt, /^Refer to the exhibit\.\n\nVoIP is being implemented/);
  assert.doesNotMatch(question.prompt, /SW_1#show vlan|fddi-default/);
  assert.match(question.exhibit, /^SW_1#show vlan\n\nVLAN\s+Name\s+Status\s+Ports/);
  assert.match(question.exhibit, /72\s+Data Vlan\s+active\s+Et0\/0/);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
});

test("uses the corrected PDF panel image for an offline image-only exhibit", () => {
  const question = getOfflineLegacyQuestionBank().find(
    (entry) => entry.afterExhibit?.comparisonNo === 9,
  );

  assert.ok(question);
  assert.match(question.afterExhibit.imageUrl, /ccna-after-exhibit-441\.png$/);
  assert.equal(question.hideExhibitImage, true);
});

test("includes the corrected PDF panel image for question 1305 offline", () => {
  const question = getOfflineLegacyQuestionBank().find(
    (entry) => entry.afterExhibit?.questionId === 1305,
  );

  assert.ok(question);
  assert.match(question.afterExhibit.imageUrl, /ccna-after-exhibit-1305\.png$/);
  assert.equal(question.hideExhibitImage, true);
});

test("includes a redacted screenshot for question 1317 in the bundled after exhibits", () => {
  const question = getOfflineLegacyQuestionBank().find(
    (entry) => entry.afterExhibit?.comparisonNo === 7,
  );

  assert.ok(question);
  assert.match(question.afterExhibit.imageUrl, /ccna-after-exhibit-1317\.png$/);
  assert.match(question.afterExhibit.text, /CCNA-LAB/);
  assert.doesNotMatch(question.afterExhibit.text, /Physical Address[^\n]*[0-9a-f]{2}[:-]/i);
  assert.doesNotMatch(question.afterExhibit.text, /Host Name.*JAS/i);
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
