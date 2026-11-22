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

test("maps original exhibit images and hides terminal screenshots duplicated by their text", () => {
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
  assert.equal(offlineQuestion.hideExhibitImage, true);
  assert.equal(offlineQuestion.exhibitImage, undefined);
  assert.match(offlineQuestion.exhibit, /Trunking Native Mode VLAN: 99/);

  const builtInQuestion = builtInQuestionBank.find(
    (question) => question.source === "legacy-ccna-200-301" && question.legacyIndex === 41,
  );
  assert.ok(builtInQuestion);
  assert.equal(builtInQuestion.hideExhibitImage, true);
  assert.equal(builtInQuestion.exhibitImage, undefined);
  assert.match(builtInQuestion.exhibit, /Trunking Native Mode VLAN: 99/);
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

test("redraws legacy 50's source topology in the offline and all-questions banks", () => {
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
  assert.equal((markup.match(/E0\/0/g) ?? []).length, 2);
  assert.equal((markup.match(/E0\/1/g) ?? []).length, 2);
  assert.doesNotMatch(markup, /VLAN 20 host/);

  const liveQuestion = applyNativeExhibit(ccnaLegacyQuestions.find((item) => item.legacyIndex === 50));
  assert.equal(liveQuestion.exhibitDiagram, question.exhibitDiagram);
  assert.equal(liveQuestion.hideExhibitImage, true);
  assert.equal(liveQuestion.exhibit, question.exhibit);
  assert.equal(liveQuestion.answer, question.answer);
});

test("redraws legacy 59's source frame-flow image in the offline and all-questions banks", () => {
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
  assert.match(markup, /PC B/);
  assert.match(markup, /PC A is attached to/);
  assert.match(markup, /VLAN ID of 2 to its frames/);
  assert.match(markup, /remove the/);
  assert.match(markup, /sending it to PC B/);
  assert.match(markup, />VLAN ID</);
  assert.match(markup, />Frame</);
  assert.equal((markup.match(/>Trunk</g) ?? []).length, 2);
  assert.doesNotMatch(markup, /Access ·|VTP transparent/);

  const liveQuestion = applyNativeExhibit(ccnaLegacyQuestions.find((item) => item.legacyIndex === 59));
  assert.equal(liveQuestion.exhibitDiagram, question.exhibitDiagram);
  assert.equal(liveQuestion.hideExhibitImage, true);
  assert.equal(liveQuestion.exhibit, question.exhibit);
  assert.equal(liveQuestion.answer, question.answer);
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

test("converts the DC-1/HQ-1 interface assignment into a drag-and-drop question", () => {
  const prompt = `The IP address configurations must be completed on the DC-1 and HQ-1 routers based on these requirements.

DC-1 Gi1/0 must be the last usable address on a /30
DC-1 Gi1/1 must be the first usable address on a /29
DC-1 Gi1/2 must be the last usable address on a /28
HQ-1 Gi1/3 must be the last usable address on a /29

Drag and drop the commands from the left onto the destination interfaces on the right. Not all commands are used.`;
  const { question, problem } = convertBankRow({
    ...rawRow(299, prompt),
    choices: null,
    correct_answer: `DC-1:
+ ip address 209.165.202.130 255.255.255.252
+ ip address 192.168.4.9 255.255.255.248
+ ip address 192.168.3.14 255.255.255.240

HQ-1:
+ ip address 192.168.3.14 255.255.255.248`,
  });

  assert.equal(problem, undefined);
  assert.equal(question.type, "drag_drop");
  assert.deepEqual(question.items, [
    "DC-1 Gi1/0: last usable address on a /30",
    "DC-1 Gi1/1: first usable address on a /29",
    "DC-1 Gi1/2: last usable address on a /28",
    "HQ-1 Gi1/3: last usable address on a /29",
  ]);
  assert.deepEqual(
    question.items.map((_, index) => question.choices[question.answer[index]]),
    [
      "ip address 209.165.202.130 255.255.255.252",
      "ip address 192.168.4.9 255.255.255.248",
      "ip address 192.168.3.14 255.255.255.240",
      "ip address 192.168.3.14 255.255.255.248",
    ],
  );
  assert.equal(new Set(question.answer).size, question.items.length);
  assert.ok(isValidQuestion(question));
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
  assert.equal(offlineQuestion299.type, "drag_drop");
  assert.deepEqual(offlineQuestion299.items, ["DC-1 Gi1/0", "DC-1 Gi1/1", "DC-1 Gi1/2", "HQ-1 Gi1/3"]);
  assert.deepEqual(offlineQuestion299.answer, [2, 5, 4, 6]);
  assert.equal(offlineQuestion299.choices.length, 7);
  const builtInQuestion617 = builtInQuestionBank.find((entry) => entry.legacyIndex === 617);
  assert.equal(builtInQuestion617.type, "drag_drop");
  assert.deepEqual(builtInQuestion617.items, offlineQuestion299.items);
  assert.deepEqual(builtInQuestion617.choices, offlineQuestion299.choices);
  assert.deepEqual(builtInQuestion617.answer, offlineQuestion299.answer);
  const offlineQuestion266 = getOfflineLegacyQuestionBank().find((entry) => entry.legacyIndex === 266);
  assert.equal(offlineQuestion266.choices.length, 7);
  assert.equal(offlineQuestion266.matchStyle, "assign");
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

test("keeps every offline Refer-to-Exhibit item with an exhibit or explicit cleanup", () => {
  const questions = getOfflineReferExhibitQuestionBank();

  for (const [ordinal, question] of questions.entries()) {
    const hasExhibit = Boolean(
      question.exhibit ||
      question.exhibitDiagram ||
      question.exhibitImage ||
      question.afterExhibit ||
      question.hideExhibitImage,
    );
    assert.ok(hasExhibit, `offline exhibit ordinal ${ordinal + 1} / index ${question.legacyIndex} needs an exhibit or explicit cleanup`);
  }

  assert.ok(
    questions.every((question) =>
      !question.afterExhibit ||
      (
        !question.exhibitImage &&
        !question.exhibitDiagram
      ) ||
      question.hideExhibitImage,
    ),
  );
});

test("keeps continued route and trunk exhibit fixes in the Noah bank", () => {
  const questions = getOfflineReferExhibitQuestionBank();

  for (const [legacyIndex, marker] of [
    [840, "192.168.0.10"],
    [870, "802.1Q"],
    [624, "10.1.1.1"],
  ]) {
    const question = questions.find((entry) => entry.legacyIndex === legacyIndex);
    assert.ok(question);
    assert.equal(question.hideExhibitImage, true);
    assert.equal(question.afterExhibit, undefined);
    assert.match(question.exhibit, new RegExp(marker));
  }

  for (const legacyIndex of [1041, 1067]) {
    const legacyQuestion = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === legacyIndex);
    const liveQuestion = applyNativeExhibit(legacyQuestion);
    assert.equal(liveQuestion.hideExhibitImage, true);
    assert.equal(liveQuestion.hideAfterExhibit, true);
  }
});

test("clearly labels the remaining partial source-answer conflicts", () => {
  const questions = getOfflineReferExhibitQuestionBank();

  for (const [legacyIndex, marker] of [
    [848, "172.16.5.0/24"],
    [856, "MDF-DC-3"],
    [876, "172.25.25.0/24"],
    [884, "192.168.20.2"],
  ]) {
    const question = questions.find((entry) => entry.legacyIndex === legacyIndex);
    assert.ok(question);
    assert.equal(question.exhibitQuality, "partial");
    assert.equal(question.hideExhibitImage, true);
    assert.equal(question.afterExhibit, undefined);
    assert.match(question.exhibit, new RegExp(marker));
  }
});

test("adds the topology exhibit image to question 77 in the offline Refer to Exhibit exam", () => {
  const question = getOfflineReferExhibitQuestionBank()[76];

  assert.equal(question.legacyIndex, 345);
  assert.match(question.exhibitImage, /ccna-question-77-acl-exhibit\.jpg$/);
});

test("redraws review Question 88 while retaining its source exhibit for comparison", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 405);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 88);
  assert.equal(question.exhibitDiagram, "router-internet-two-lans-four-pcs");
  assert.equal(question.hideExhibitImage, true);
  assert.match(markup, /ccna-question-405\.png/);
  assert.match(markup, /aria-label="Router, Internet, and two switched LANs"/);
});

test("redraws review item 90 from its mapped text and hides the mismatched candidate image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 415);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(React.createElement(QuestionExhibits, { question }));

  assert.equal(questionIndex + 1, 90);
  assert.equal(question.exhibitDiagram, "r4-mixed-routing");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /EIGRP 44/);
  assert.match(markup, /EIGRP 777/);
  assert.doesNotMatch(markup, /EIGRP 4444/);
});

test("redraws review item 91 from its source exhibit while retaining that source for comparison", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 421);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 91);
  assert.equal(question.exhibitDiagram, "ipv6-three-router-policy");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-105\.png/);
  assert.match(markup, /fd00:59:12::1\/64/);
  assert.match(markup, /fd00:59:12::2\/64/);
  assert.match(markup, /fd00:59:13::1\/64/);
  assert.match(markup, /fd00:59:13::3\/64/);
  assert.match(markup, /2001:db8:23::14\/64/);
});

test("uses the corrected LACP terminal for review item 96 and retains its source image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 460);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 96);
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /Protocol\s+Ports\n1\s+Po1\(SD\)\s+LACP/);
  assert.match(question.exhibit, /channel-group 1 mode passive/);
  assert.match(markup, /ccna-question-143\.png/);
});

test("redraws review item 97 from question-matched site details and retains its source image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 474);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 97);
  assert.equal(question.exhibitDiagram, "two-site-r1-r2-wan");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.answer, 1);
  assert.match(markup, /ccna-question-157\.png/);
  assert.match(markup, /209\.165\.200\.0\/24/);
  assert.match(markup, /192\.168\.1\.0\/24/);
  assert.match(markup, /10\.1\.1\.0\/24/);
});

test("redraws review item 99's wireless zones and keeps the original for comparison", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 478);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 99);
  assert.equal(question.exhibitDiagram, "wireless-zone-overlap");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.answer, 2);
  assert.match(markup, /ccna-question-161\.png/);
  for (const label of ["Zone 1", "Zone 8", "Channel 1", "Channel 6", "Channel 11"]) {
    assert.match(markup, new RegExp(label));
  }
});

test("keeps review item 100 self-contained without its duplicated command-choice image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 486);
  const question = questions[questionIndex];

  assert.equal(questionIndex + 1, 100);
  assert.doesNotMatch(question.prompt, /^Refer to (?:the )?exhibit/i);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.options.length, 4);
  assert.equal(question.answer, 2);
  assert.match(question.options[2], /no lldp run[\s\S]*show cdp neighbor detail/i);
});

test("redraws review item 101 with its source-backed access-list exhibit and one lead-in", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 489);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 101);
  assert.equal(question.exhibitDiagram, "rtr1-access-list-lan");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.equal((question.prompt.match(/Refer to the exhibit/gi) ?? []).length, 1);
  assert.match(question.exhibit, /access-list 10 deny host 10\.150\.1\.1/);
  assert.match(markup, /ccna-question-172\.png/);
  assert.match(markup, /10\.150\.1\.2\/24/);
});

test("keeps review item 103's question-matched redraw and original source for comparison", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 494);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 103);
  assert.equal(question.exhibitDiagram, "routers-abc-floating-route");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-177\.png/);
  assert.match(markup, /192\.168\.1\.0\/24/);
  assert.doesNotMatch(question.exhibit ?? "", /172\.168\.177\.2/);
});

test("redraws review item 105's management and server topology with source addressing", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 496);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 105);
  assert.equal(question.exhibitDiagram, "management-server-filter");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-179\.png/);
  for (const address of ["10\\.1\\.1\\.0\\/24", "192\\.168\\.1\\.0\\/24", "172\\.16\\.2\\.0\\/24", "172\\.16\\.2\\.2"]) {
    assert.match(markup, new RegExp(address));
  }
  assert.match(markup, /\.15 ↔ \.10/);
});

test("redraws review item 106 with its IP phone, PC, and original source for comparison", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 497);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 106);
  assert.equal(question.exhibitDiagram, "mpls-qos-branches");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-180\.png/);
  assert.match(markup, /IP phone/);
  assert.match(markup, /Branch host/);
});

test("redraws review item 109 from the source terminal instead of its conflicting fixed image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 502);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 109);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /inet 10\.8\.112\.46 netmask 0xffffe000 broadcast 10\.8\.159\.255/);
  assert.match(markup, /ccna-question-185\.png/);
  assert.match(markup, /10\.8\.112\.46/);
  assert.equal(question.answer, 2);
});

test("redraws review item 111 with its source route prefixes and metrics", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 505);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 111);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /O\s+10\.0\.1\.190\/32 \[110\/50\]/);
  assert.match(question.exhibit, /D\s+10\.0\.1\.0\/28 \[90\/10\] via 192\.168\.0\.7/);
  assert.doesNotMatch(question.exhibit, /10\.0\.1\.0\/29/);
  assert.match(markup, /ccna-question-188\.png/);
  assert.equal(question.answer, 0);
});

test("replaces review item 113's mismatched route diagram with an illustrative OSPF broadcast segment", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 507);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 113);
  assert.equal(question.exhibitDiagram, "routers-abc-ospf-dr");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-190\.png/);
  assert.match(markup, /Shared segment/);
  assert.equal(question.answer, 1);
});

test("keeps review item 114's matching MAC-table redraw and fixes its port label", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 508);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 114);
  assert.match(question.afterExhibit.text, /Fa0\/1 Fa0\/2 Fa0\/3 Fa0\/4/);
  assert.doesNotMatch(question.afterExhibit.text, /Fa0\/11/);
  assert.match(markup, /ccna-question-191\.png/);
  assert.match(markup, /ccna-after-exhibit-191\.png/);
  assert.equal(question.answer, 2);
});

test("keeps review item 115's VLAN redraw and fixes its source-backed port label", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 509);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 115);
  assert.match(question.afterExhibit.text, /Fa0\/1 Fa0\/2/);
  assert.doesNotMatch(question.afterExhibit.text, /Fa0\/11/);
  assert.match(markup, /ccna-question-192\.png/);
  assert.match(markup, /ccna-after-exhibit-192\.png/);
  assert.equal(question.answer, 2);
});

test("redraws review item 116's shared LAN and R1 internet link from the source", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 510);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 116);
  assert.equal(question.exhibitDiagram, "r1-secure-remote-access");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-193\.png/);
  assert.match(markup, /192\.24\.105\.0\/24/);
  assert.match(markup, /Serial0\/1/);
  assert.deepEqual(question.answer, [1, 4]);
});

test("reconstructs review item 118's missing host-capacity exhibit from its explanation", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 519);
  const question = questions[questionIndex];

  assert.equal(questionIndex + 1, 118);
  assert.match(question.prompt, /^Refer to the exhibit\./);
  assert.equal(question.exhibitQuality, "illustrative");
  assert.match(question.exhibit, /R7\s+Fa1\/0\s+923/);
  assert.match(question.exhibit, /R8\s+Fa0\/0\s+225/);
  assert.match(question.exhibit, /R9\s+Fa1\/1\s+3,641/);
  assert.equal(question.answer, 2);
});

test("keeps review item 121's LLDP timer exhibit aligned with its source", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 522);
  const question = questions[questionIndex];

  assert.equal(questionIndex + 1, 121);
  assert.match(question.afterExhibit.text, /sent every 60 seconds/);
  assert.match(question.afterExhibit.text, /hold time advertised is 180 seconds/);
  assert.match(question.afterExhibit.text, /reinitialization delay is 2 seconds/);
});

test("redraws review item 123's NAT exhibit from its source topology and configuration", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 529);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 123);
  assert.equal(question.exhibitDiagram, "nat-router-lan-pcs");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /ip address 172\.16\.0\.5 255\.255\.255\.0/);
  assert.match(question.exhibit, /access-list 1 permit 172\.16\.0\.1[\s\S]*access-list 1 permit 172\.16\.0\.2/);
  assert.match(markup, /172\.16\.0\.1/);
  assert.match(markup, /172\.16\.0\.2/);
  assert.match(markup, /209\.165\.200\.130\/27/);
  assert.match(markup, /ip nat inside source list 1 interface GigabitEthernet0\/1 overload/);
  assert.match(markup, /ccna-question-212\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-212\.png/);
});

test("redraws review item 127's OSPF segment and neighbor table from its source", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 541);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 127);
  assert.equal(question.exhibitDiagram, "ospf-r1-r2-r3-broadcast");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /192\.168\.100\.2\s+1\s+FULL\/BDR\s+00:00:32/);
  assert.match(question.exhibit, /192\.168\.100\.3\s+1\s+FULL\/DR\s+00:00:31/);
  assert.match(markup, /ccna-question-224\.png/);
  assert.match(markup, /192\.168\.100\.0\/24/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-224\.png/);
});

test("corrects review item 129's SSH terminal to match its source domain", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 545);
  const question = questions[questionIndex];

  assert.equal(questionIndex + 1, 129);
  assert.match(question.afterExhibit.text, /ip domain-name lab\.local/);
  assert.doesNotMatch(question.afterExhibit.text, /CNAC\.com/);
});

test("redraws review item 130's OSPF backup-route topology and source route output", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 548);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 130);
  assert.equal(question.exhibitDiagram, "ospf-backup-route-server");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /Routing entry for 10\.1\.1\.0\/24/);
  assert.match(question.afterExhibit.text, /172\.16\.2\.2 on GigabitEthernet0\/0/);
  assert.match(markup, /ccna-question-231\.png/);
  assert.match(markup, /10\.1\.1\.0\/24/);
  assert.match(markup, /172\.16\.2\.0\/24/);
  assert.doesNotMatch(markup, /192\.168\.100\.2/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-231\.png/);
});

test("redraws review item 131's OSPF link and LANs from the source", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 551);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 131);
  assert.equal(question.exhibitDiagram, "ospf-point-to-point-r1-r2-source");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-234\.png/);
  assert.match(markup, /172\.137\.191\.0\/30/);
  assert.match(markup, /172\.139\.8\.0\/24/);
  assert.match(markup, /10\.168\.119\.0\/24/);
  assert.doesNotMatch(markup, /10\.0\.0\.0\/30/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-234\.png/);
});

test("redraws review item 132's interface output from the source values", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 554);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 132);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /74a0\.2f7a\.6304 \(bia 74a0\.2f7a\.0123\)/);
  assert.match(question.exhibit, /5 minute input rate 8630567 bits\/sec, 1369 packets\/sec/);
  assert.match(question.exhibit, /0 output errors, 0 collisions, 1 interface resets/);
  assert.doesNotMatch(question.exhibit, /8662414049 collisions/);
  assert.match(markup, /ccna-question-236\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-236\.png/);
});

test("redraws review item 135's PC-switch link and exact switch status row", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 560);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 135);
  assert.equal(question.exhibitDiagram, "pc-switch-link-status");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /Fa0\/1 connected 20 auto auto 10\/100BaseTX/);
  assert.match(markup, /100 Mbps · full duplex/);
  assert.match(markup, /Fa0\/1 connected 20 auto auto 10\/100BaseTX/);
  assert.match(markup, /ccna-question-242\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-242\.png/);
});

test("redraws review item 136's two-router IPv6 topology and source MAC", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 562);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 136);
  assert.equal(question.exhibitDiagram, "ipv6-ho-isp-cloud");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /ccna-question-244\.png/);
  assert.match(markup, /2001:db8:4:1::\/64/);
  assert.match(markup, /C601\.420F\.0007/);
  assert.match(markup, /R0/);
  assert.match(markup, /R1/);
  assert.doesNotMatch(markup, /2001:DB8:44:90::\/64/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-244\.png/);
});

test("redraws review item 137's DHCP topology and configuration", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 563);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 137);
  assert.equal(question.exhibitDiagram, "dhcp-client-router-server");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /ip address 10\.10\.10\.1 255\.255\.255\.0/);
  assert.match(question.exhibit, /ip address 172\.16\.2\.1 255\.255\.255\.0/);
  assert.match(markup, /ccna-question-245\.png/);
  assert.match(markup, /172\.16\.2\.2/);
  assert.doesNotMatch(markup, /Gii0\/11/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-245\.png/);
});

test("correctly labels review item 139's primary and backup ISP links", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 566);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 139);
  assert.match(question.afterExhibit.text, /LAN connects to Router1 on G0\/1/);
  assert.match(question.afterExhibit.text, /G1\/0 reaches the primary ISP and G1\/1 reaches the backup ISP/);
  assert.match(markup, /G0\/1[\s\S]*G1\/0[\s\S]*G1\/1/);
  assert.doesNotMatch(markup, /Gii\d+\/\d+/);
  assert.match(markup, /ccna-question-248\.png/);
});

test("keeps review item 140's source VLAN exhibit and flags the answer mismatch", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 568);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 140);
  assert.equal(question.answer, 2);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /Existing VLANs: 1, 100, 101, 102, 103/);
  assert.match(question.afterExhibit.text, /New VLAN: 300/);
  assert.match(markup, /New VLAN: 300/);
  assert.doesNotMatch(markup, /VLAN 104/);
  assert.match(markup, /ccna-question-250\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-250\.png/);
});

test("keeps review item 141's source interface counters and flags the answer mismatch", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 569);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 141);
  assert.equal(question.answer, 1);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /GigabitEthernet0\/0 is up, line protocol is up/);
  assert.match(question.afterExhibit.text, /address is 74a0\.2f7a\.1396/);
  assert.match(question.afterExhibit.text, /0 input errors, 0 CRC/);
  assert.doesNotMatch(question.afterExhibit.text, /3612699 input errors/);
  assert.match(markup, /ccna-question-251\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-251\.png/);
});

test("reproduces review item 145's source SSH base configuration", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 577);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 145);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /Current configuration : 1597 bytes/);
  assert.match(question.afterExhibit.text, /hostname Router\n!/);
  assert.doesNotMatch(question.afterExhibit.text, /1530 bytes|boot-start-marker\nboot-end-marker !!!/);
  assert.match(markup, /ccna-question-259\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-259\.png/);
});

test("redraws review item 146's WLC security settings from the source image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 578);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 146);
  assert.equal(question.exhibitDiagram, "wlc-security-80211r-source");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(markup, /Protected Management Frame/);
  assert.match(markup, /WPA\+WPA2 Parameters/);
  assert.match(markup, /GCMP256/);
  assert.match(markup, /FT 802\.1X/);
  assert.match(markup, /FT PSK/);
  assert.match(markup, /aria-label="Disabled"/);
  assert.match(markup, /ccna-question-260\.png/);
  assert.doesNotMatch(markup, /candidate-wlc-260/);
});

test("keeps review item 147's source EtherChannel configuration and flags the LACP mismatch", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 579);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 147);
  assert.equal(question.answer, 2);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /Switch 2[\s\S]*interface Po1[\s\S]*switchport mode trunk/);
  assert.match(question.afterExhibit.text, /switchport access vlan 20/);
  assert.doesNotMatch(question.afterExhibit.text, /channel-group/);
  assert.match(markup, /ccna-question-261\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-261\.png/);
});

test("documents review item 150's VLAN exhibit and flags the keyed VLAN mismatch", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 586);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 150);
  assert.equal(question.answer, 0);
  assert.match(question.afterExhibit.text, /Data VLAN: 50/);
  assert.match(question.afterExhibit.text, /Voice VLAN: 61/);
  assert.match(markup, /ccna-question-268\.png/);
  assert.match(markup, /ccna-after-exhibit-268\.png/);
});

test("corrects review item 151's OSPF area label to match the source", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 588);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 151);
  assert.equal(question.answer, 0);
  assert.match(question.afterExhibit.text, /OSPF area 10/);
  assert.doesNotMatch(question.afterExhibit.text, /area 20/);
  assert.match(markup, /ccna-question-270\.png/);
  assert.match(markup, /ccna-after-exhibit-270\.png/);
});

test("redraws review item 152 as the source's two direct router links", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 591);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 152);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitDiagram, "dual-wan-site-routing");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /172\.16\.0\.0\/30/);
  assert.match(markup, /172\.16\.0\.4\/30/);
  assert.match(markup, /OSPF Area 10/);
  assert.doesNotMatch(markup, /WAN 1|WAN 2/);
  assert.match(markup, /ccna-question-273\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-273\.png/);
});

test("restores review item 153's source CDP advertisement interval", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 592);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 153);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /Sending CDP packets every 30 seconds/);
  assert.doesNotMatch(question.afterExhibit.text, /every 60 seconds/);
  assert.match(markup, /ccna-question-274\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-274\.png/);
});

test("redraws review item 154's trunk exhibit and preserves its VLAN discrepancy", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 593);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 154);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "vlan5-vlan10-four-hosts");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /Fa0\/1 ↔ Fa0\/1 · VLAN 100/);
  assert.match(markup, /switchport trunk allowed vlan 5,10/);
  assert.match(markup, /ccna-question-275\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-275\.png/);
});

test("redraws review item 155's WPA security panel from the source image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 599);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 155);
  assert.equal(question.exhibitDiagram, "wlc-security-layer2-source");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(markup, /Security Type/);
  assert.match(markup, /Enterprise/);
  assert.match(markup, /WPA2\+WPA3 Parameters/);
  assert.match(markup, /CCMP128\(AES\)/);
  assert.match(markup, /Pre-Shared Key/);
  assert.match(markup, /PSK-SHA2/);
  assert.match(markup, /ccna-question-281\.png/);
});

test("redraws review item 156's three LACP links with source interface labels", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 602);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 156);
  assert.equal(question.exhibitDiagram, "lacp-three-parallel-switches");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /G1\/1 ↔ G1\/1/);
  assert.match(markup, /G1\/2 ↔ G1\/2/);
  assert.match(markup, /G1\/3 ↔ G1\/3/);
  assert.doesNotMatch(markup, /Gii11/);
  assert.match(markup, /ccna-question-284\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-284\.png/);
});

test("redraws review item 157's RADIUS settings and retains unchecked Network User", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 603);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 157);
  assert.equal(question.answer, 2);
  assert.equal(question.exhibitDiagram, "wlc-radius-server-source");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(markup, /RADIUS Authentication Servers &gt; New/);
  assert.match(markup, /192\.168\.11\.2/);
  assert.match(markup, /Network User[\s\S]*aria-label="Disabled"/);
  assert.match(markup, /Management[\s\S]*aria-label="Disabled"/);
  assert.match(markup, /ccna-question-285\.png/);
});

test("redraws review item 158's WLC Layer 2 and authentication settings", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 612);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 158);
  assert.deepEqual(question.answer, [1, 4]);
  assert.equal(question.exhibitDiagram, "wlc-layer2-enterprise-source");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(markup, /Layer 2 Security[\s\S]*None/);
  assert.match(markup, /Fast Transition/);
  assert.match(markup, /PMF[\s\S]*Disabled/);
  assert.match(markup, /WPA2 Encryption[\s\S]*AES \[ \][\s\S]*TKIP \[ \]/);
  assert.match(markup, /802\.1X[\s\S]*aria-label="Disabled"/);
  assert.match(markup, /ccna-question-294\.png/);
});

test("redraws review item 160's OSPF shared segment and neighbor table", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 616);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 160);
  assert.equal(question.answer, 1);
  assert.equal(question.exhibitDiagram, "ospf-drother-r1");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(question.exhibit, /192\.168\.100\.2\s+1\s+FULL\/BDR/);
  assert.match(question.exhibit, /192\.168\.100\.3\s+1\s+FULL\/DR/);
  assert.match(markup, /Fa0\/0/);
  assert.match(markup, /Fa0\/2/);
  assert.match(markup, /Fa0\/1/);
  assert.match(markup, /10\.0\.0\.0\/24/);
  assert.match(markup, /Area 0/);
  assert.match(markup, /ccna-question-298\.png/);
});

test("restores review item 161's source Puppet auto_cost value", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 618);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 161);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.match(question.afterExhibit.text, /auto_cost => '1000'/);
  assert.doesNotMatch(question.afterExhibit.text, /auto_cost => '100'/);
  assert.match(markup, /ccna-question-300\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-300\.png/);
});

test("redraws review item 162's JSON exhibit as formatted source text", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 621);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 162);
  assert.equal(question.answer, 2);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(question.exhibit, /"Routers": \["R1", "R2", "R3"\]/);
  assert.match(question.exhibit, /"Switches": \["SW1", "SW2", "SW3"\]/);
  assert.match(markup, /&quot;R1&quot;/);
  assert.match(markup, /ccna-question-303\.png/);
});

test("redraws review item 163's visible SW4 terminal snippets", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 622);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 163);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.match(question.offlineSourceExhibitImages[0], /ccna-exhibit-622\.png$/);
  assert.match(question.exhibit, /interface Gi0\/2/);
  assert.match(question.exhibit, /interface Gi0\/7/);
  assert.match(question.exhibit, /allowed vlan 108/);
  assert.match(markup, /interface Gi0\/2/);
  assert.match(markup, /ccna-exhibit-622\.png/);
});

test("removes the exhibit lead-in when review item 164 has no source exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 624);
  const question = questions[questionIndex];

  assert.equal(questionIndex + 1, 164);
  assert.doesNotMatch(question.prompt, /^\s*Refer to the exhibit\./i);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.answer, 1);
});

test("uses review item 165's existing ARP-inspection terminal text instead of its raster", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 627);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 165);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.match(question.exhibit, /ip arp inspection vlan 5-10/);
  assert.match(question.exhibit, /switchport access vlan 5/);
  assert.match(markup, /ccna-exhibit-627\.png/);
  assert.match(markup, /switchport access vlan 5/);
});

test("redraws review item 167's routed-network exhibit with source interface and host labels", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 629);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 167);
  assert.equal(question.exhibitDiagram, "r1-r2-r3-network");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /Gi0\/1 · \.1/);
  assert.match(markup, /Gi0\/1 · \.2/);
  assert.match(markup, /Gi0\/1 · \.3/);
  assert.match(markup, /Int Gi0\/0 · 10\.0\.3\.0\/24/);
  assert.match(markup, /ccna-question-311\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-311\.png/);
});

test("redraws review item 168's redundant circuits and preserves both route tables", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 635);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 168);
  assert.equal(question.exhibitDiagram, "dual-circuit-r1-r2-hosts");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /via 10\.10\.10\.2/);
  assert.match(question.exhibit, /via 10\.10\.10\.1/);
  assert.match(markup, /Primary Circuit/);
  assert.match(markup, /Secondary Circuit/);
  assert.match(markup, /\.1/);
  assert.match(markup, /\.2/);
  assert.match(markup, /\.5/);
  assert.match(markup, /\.6/);
  assert.match(markup, /via 10\.10\.10\.2/);
  assert.match(markup, /ccna-question-317\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-317\.png/);
});

test("uses review item 169's existing route-table text instead of its raster", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 641);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 169);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.match(question.exhibit, /Gateway of last resort is 10\.56\.0\.1/);
  assert.match(question.exhibit, /10\.56\.128\.0\/18 is directly connected, Vlan57/);
  assert.match(markup, /ccna-exhibit-641\.png/);
  assert.match(markup, /10\.56\.128\.0\/18 is directly connected, Vlan57/);
});

test("keeps review item 170's source topology available only for local comparison", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 645);
  const question = questions[questionIndex];
  const localMarkup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );
  const normalMarkup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 170);
  assert.match(localMarkup, /ccna-question-327\.png/);
  assert.match(localMarkup, /ccna-after-exhibit-327\.png/);
  assert.doesNotMatch(normalMarkup, /ccna-question-327\.png/);
  assert.match(question.afterExhibit.text, /PC_A[\s\S]*PC_B[\s\S]*VLAN 200/);
});

test("redraws review item 171's complete OSPF workstation and IP-phone topology", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 646);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 171);
  assert.equal(question.exhibitDiagram, "ospf-two-site-workstations");
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /SW3/);
  assert.match(markup, /SW4/);
  assert.match(markup, /IP/);
  assert.match(markup, /10\.0\.0\.0\/30/);
  assert.match(markup, /10\.0\.1\.0\/24/);
  assert.match(markup, /10\.0\.2\.0\/24/);
  assert.match(markup, /ccna-question-328\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-328\.png/);
});

test("clarifies review item 173's LACP passive-mode answer and preserves its source terminal", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 655);
  const question = questions[questionIndex];
  const localMarkup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );
  const normalMarkup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 173);
  assert.equal(question.answer, 2);
  assert.deepEqual(question.offlineSourceExhibitImages, [
    "/src/assets/ccna-offline-exams-images/ccna-exhibit-655.png",
  ]);
  assert.match(question.prompt, /first device is configured with LACP active mode/);
  assert.match(question.exhibit, /channel-group 1 mode active/);
  assert.deepEqual(question.options, [
    "Bring up the neighboring interfaces using the no shutdown command.",
    "Change the EtherChannel mode on the neighboring interfaces to auto.",
    "Configure the neighboring member interfaces for LACP passive mode.",
    "Configure the IP address of the neighboring device.",
  ]);
  assert.match(question.explanation, /active side initiates LACP and the passive side responds/);
  assert.match(localMarkup, /ccna-exhibit-655\.png/);
  assert.doesNotMatch(normalMarkup, /ccna-exhibit-655\.png/);
});

test("reconstructs review item 177's missing routing exhibit without changing its keyed answer", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 662);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 177);
  assert.equal(question.answer, 3);
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.exhibitDiagram, "four-router-host-route");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.match(question.exhibit, /S\* 0\.0\.0\.0\/0 \[1\/0\] via 10\.10\.10\.2/);
  assert.match(question.exhibit, /S 10\.10\.13\.0\/25 \[108\/0\] via 10\.10\.10\.10/);
  assert.match(question.options[0], /^0\.0\.0\.0\/0\[1\/0\] via 10\.10\.10\.2$/);
  assert.match(question.explanation, /administrative distance 108, lower than OSPF's 110/);
  assert.match(markup, /10\.10\.13\.0\/25/);
  assert.match(markup, /R1#show ip route/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-344\.png/);
});

test("shows review item 178's DNS evidence with device identifiers redacted", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 663);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 178);
  assert.equal(question.answer, 1);
  assert.equal(question.options[1], "192.168.1.253");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit.imageUrl, null);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
  assert.match(question.afterExhibit.text, /DNS Servers[\s\S]*192\.168\.1\.253[\s\S]*192\.168\.1\.254/);
  assert.match(question.afterExhibit.text, /DHCPv6 Client DUID[\s\S]*\[redacted\]/);
  assert.doesNotMatch(question.afterExhibit.text, /(?:[0-9A-F]{2}[:-]){5}[0-9A-F]{2}/i);
  assert.doesNotMatch(
    JSON.stringify(question),
    /DESKTOP-480JBBT|3C-52-82-33-F3-8F|C8-21-5B-84-F3-EF|00-01-00-01-20-FF/i,
  );
  assert.match(markup, /192\.168\.1\.253/);
  assert.doesNotMatch(
    markup,
    /ccna-exhibit-663\.png|ccna-question-345\.png|ccna-after-exhibit-345\.png/,
  );
});

test("reconstructs review item 180's R1-to-R3 static-route topology", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 674);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 180);
  assert.equal(question.answer, 3);
  assert.equal(question.options[3], "ip route 10.0.15.0 255.255.255.0 10.0.20.3");
  assert.equal(question.exhibitDiagram, "r1-r2-r3-static-route");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /10\.0\.0\.64\/26/);
  assert.match(markup, /10\.0\.20\.0\/24/);
  assert.match(markup, /10\.0\.15\.0\/24/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-356\.png/);
});

test("corrects review item 184's R2 neighbor-discovery interface labels", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 685);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 184);
  assert.equal(question.answer, 3);
  assert.equal(question.options[3], "Configure the no cdp enable command on g0/2");
  assert.match(question.afterExhibit.text, /R2's Gi0\/1 connects to R1; its Gi0\/2 connects to R3/);
  assert.doesNotMatch(question.afterExhibit.text, /Gii0|Gi0\/11/);
  assert.match(markup, /ccna-question-367\.png/);
  assert.match(markup, /ccna-after-exhibit-367\.png/);
});

test("clarifies review item 185's dynamic port-security learning rationale", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 687);
  const question = questions[questionIndex];

  assert.equal(questionIndex + 1, 185);
  assert.deepEqual(question.answer, [1, 4]);
  assert.match(question.explanation, /Sticky learning is also dynamic/);
  assert.match(question.explanation, /persistence was not required/);
});

test("redraws review item 186's serial host-route topology from its source", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 689);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 186);
  assert.equal(question.answer, 0);
  assert.equal(question.options[0], "R1(config)#ip route 10.10.10.10 255.255.255.255 192.168.0.2");
  assert.equal(question.exhibitDiagram, "two-site-serial-file-server");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /192\.168\.0\.1\/30/);
  assert.match(markup, /192\.168\.0\.2\/30/);
  assert.match(markup, /10\.10\.10\.1\/24/);
  assert.match(markup, /10\.10\.10\.2\/24/);
  assert.match(markup, /10\.10\.10\.10\/24/);
  assert.match(markup, /ccna-question-371\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-371\.png|192\.168\.0\.0\/30/);
});

test("reconstructs review item 188's available CPE output without inventing missing configuration", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 701);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 188);
  assert.equal(question.answer, 0);
  assert.doesNotMatch(question.prompt, /Refer to the exhibit|Some output missing/);
  assert.match(question.exhibit, /Static-route configuration output is missing/);
  assert.match(question.exhibit, /B\* 0\.0\.0\.0\/0 \[20\/0\] via 198\.51\.100\.1/);
  assert.match(question.exhibit, /Ethernet0\/1/);
  assert.match(question.explanation, /exact administrative distance cannot be verified/);
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.hideExhibitImage, true);
  assert.match(markup, /198\.51\.100\.1/);
  assert.doesNotMatch(markup, /ccna-exhibit-701\.png|Some output missing/);
});

test("removes review item 189's exhibit lead-in when no exhibit source exists", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 702);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 189);
  assert.equal(question.answer, 3);
  assert.match(question.prompt, /local database[\s\S]*local EAP authentication[\s\S]*not be limited/);
  assert.doesNotMatch(question.prompt, /Refer to the exhibit/);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.doesNotMatch(markup, /ccna-exhibit-702\.png|ccna-after-exhibit/);
});

test("keeps self-contained legacy item 702 in the all-questions bank without a false exhibit", () => {
  const source = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === 702);
  const question = builtInQuestionBank.find((entry) => entry.legacyIndex === 702);

  assert.ok(question);
  assert.equal(question.prompt, source.prompt.replace(/^\s*Refer to (?:the )?exhibit\.?\s*/i, ""));
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.exhibitDiagram, undefined);
  assert.deepEqual(question.options, source.options);
  assert.equal(question.answer, source.answer);
});

test("rebuilds legacy drag-and-drop item 799 without changing its matching answer", () => {
  const source = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === 799);
  const question = builtInQuestionBank.find((entry) => entry.legacyIndex === 799);
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.ok(question);
  assert.equal(question.type, "match");
  assert.deepEqual(question.items, source.items);
  assert.deepEqual(question.choices, source.choices);
  assert.deepEqual(question.answer, source.answer);
  assert.equal(question.exhibitDiagram, "static-route-three-router-799");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /10\.10\.13\.0\/25/);
  assert.match(markup, /10\.10\.14\.0\/24/);
  assert.match(markup, /10\.10\.10\.2/);
  assert.doesNotMatch(markup, /ccna-after-exhibit/);
  assert.equal(
    getOfflineReferExhibitQuestionBank().some((entry) => entry.legacyIndex === 799),
    false,
  );
});

test("reconstructs legacy drag-and-drop exhibit 888 from its saved answer key", () => {
  const offlineQuestions = getOfflineReferExhibitQuestionBank();
  const source = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === 888);
  const question = builtInQuestionBank.find((entry) => entry.legacyIndex === 888);
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(source.type, "match");
  assert.ok(question);
  assert.equal(question.type, "match");
  assert.equal(question.prompt, source.prompt);
  assert.deepEqual(question.items, source.items);
  assert.deepEqual(question.choices, source.choices);
  assert.deepEqual(question.answer, source.answer);
  assert.equal(question.exhibitDiagram, "ospf-destination-segments-888");
  assert.equal(question.exhibitQuality, "illustrative");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.hideAfterExhibit, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /OSPF between sites/);
  assert.doesNotMatch(markup, /unavailable/i);
  const keyedDestinations = [
    "Internet",
    source.items[0],
    source.items[1],
    source.items[2],
    "Router1",
    source.items[3],
    source.items[4],
  ].map((text) => markup.indexOf(`>${text}</tspan>`));
  assert.ok(keyedDestinations.every((position) => position >= 0));
  assert.deepEqual(keyedDestinations, [...keyedDestinations].sort((a, b) => a - b));
  assert.equal(offlineQuestions.some((entry) => entry.legacyIndex === 888), false);
});

test("redraws review item 190 from its source and matches the static MAC to PC1", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 704);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 190);
  assert.equal(question.answer, 1);
  assert.match(question.options[1], /switchport mode access[\s\S]*switchport port-security[\s\S]*mac-address 0050\.7966\.6862/);
  assert.equal(question.exhibitDiagram, "two-router-port-security-704");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /10\.0\.1\.0\/24/);
  assert.match(markup, /10\.0\.2\.0\/24/);
  assert.match(markup, /00:50:79:66:68:62/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-386\.png|TWO-ROUTER WORKSTATION TOPOLOGY.{0,80}10\.0\.1\.0\/24 LAN/);
});

test("keeps review item 191's source-faithful IPv6 topology and clarifies its documentation prefix", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 705);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 191);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit.title, "R2 WAN connection to the ISP");
  assert.match(question.afterExhibit.text, /2001:DB8:D8D2:1008::\/64/);
  assert.match(question.afterExhibit.text, /2001:DB8:D8D2:1009::\/64/);
  assert.match(question.explanation, /2001:db8::\/32 prefix is reserved for documentation/);
  assert.match(markup, /ccna-after-exhibit-387\.png/);
});

test("keeps review item 192's OSPF terminal and explains the desired point-to-point state", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 708);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 192);
  assert.equal(question.answer, 2);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(question.explanation, /point-to-point OSPF network does not elect a DR or BDR/);
  assert.match(markup, /ccna-exhibit-708\.png/);
});

test("rebuilds review item 193's trunk configurations from source text, not the broken image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 711);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 193);
  assert.equal(question.answer, 3);
  assert.doesNotMatch(question.prompt, /Refer to the exhibit/);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
  assert.match(question.exhibit, /Option D[\s\S]*switchport trunk native vlan 5/);
  assert.match(markup, /Option A/);
  assert.match(markup, /Option D/);
  assert.match(markup, /switchport access vlan 7/);
  assert.doesNotMatch(markup, /ccna-exhibit-711\.png/);
});

test("redraws review item 195's R1-R2 link with the source interface labels", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 714);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 195);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "r1-r2-point-to-point-714");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.explanation, /leaves four usable addresses for growth/);
  assert.match(markup, /GigabitEthernet0\/0/);
  assert.match(markup, /ccna-question-396\.png/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-396\.png|ccna-exhibit-714\.png|GigabitEthernet0\/0\/0/);
});

test("corrects review item 196's IPv6 block typo without altering the production exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 716);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 196);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "ipv6-block-r1-r2-716");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
  assert.match(markup, /2001:DB8:FFFF:FCF3::\/64/);
  assert.match(markup, /GigabitEthernet0\/0/);
  assert.doesNotMatch(markup, /2001:0db8:fff:fcf3::\/64|ccna-exhibit-716\.png|RouterA/);
});

test("reconstructs review item 197's available NTP client commands and fixes the choices", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 717);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question, includeOfflineSourceImages: true }),
  );

  assert.equal(questionIndex + 1, 197);
  assert.equal(question.answer, 0);
  assert.deepEqual(question.options, ["R1 and R2", "R1", "R2 and R3", "R1, R3, and R4"]);
  assert.doesNotMatch(question.prompt, /Refer to the exhibit/);
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.exhibitDiagram, undefined);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.deepEqual(question.offlineSourceExhibitImages, []);
  assert.match(question.exhibit, /Router1\(config\)#ntp server 209\.165\.200\.226/);
  assert.match(question.exhibit, /Router2\(config\)#ntp server 209\.165\.200\.225/);
  assert.match(question.explanation, /supported answer is R1 and R2/);
  assert.match(markup, /ntp server 209\.165\.200\.225/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-399\.png|ccna-exhibit-717\.png|five-router network/);
});

test("keeps review item 198's matching route-table exhibit and explains longest-prefix selection", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 719);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 198);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(question.explanation, /\/29 route is more specific/);
  assert.match(markup, /192\.168\.2\.0\/29/);
  assert.match(markup, /ccna-exhibit-719\.png/);
});

test("rebuilds review item 199's JSON-like exhibit as readable source text", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 720);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 199);
  assert.equal(question.answer, 0);
  assert.equal(question.prompt, "In which structure does the word “warning” directly reside?");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.match(question.exhibit, /"wheels": \["good", "good", "pressureLow", "warning"\]/);
  assert.match(question.explanation, /direct structure is an array/);
  assert.match(markup, /&quot;warning&quot;/);
  assert.doesNotMatch(markup, /ccna-exhibit-720\.png/);
});

test("redraws review item 200's floating-default-route topology with source router and subnet labels", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 721);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));

  assert.equal(questionIndex + 1, 200);
  assert.equal(questions[questionIndex + 1].legacyIndex, 723);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "r1-floating-default-routes-legacy-721");
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.match(question.exhibit, /172\.16\.20\.2/);
  assert.match(question.exhibit, /10\.0\.0\.2 20/);
  for (const sourceLabel of [
    "R1",
    "R2",
    "R3",
    "Gi0/0",
    "172.16.30.0/24",
    "172.16.20.0/24",
    "209.165.201.0/27",
    "10.0.0.0/24",
    "172.16.10.0/24",
    "192.168.200.0/24",
  ]) {
    assert.ok(markup.includes(sourceLabel), `the redraw should retain ${sourceLabel}`);
  }
  assert.doesNotMatch(markup, /Primary next hop|Backup next hop/);
});

test("redraws review item 201's PAT topology with both switches and all four source PCs", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 723);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));

  assert.equal(questionIndex + 1, 201);
  assert.equal(questions[questionIndex + 1].legacyIndex, 724);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitDiagram, "nat-router-lans-internet-legacy-723");
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitQuality, "source-backed");
  for (const sourceDetail of [
    "ROUTER-1",
    "Internet",
    "SWITCH-1",
    "SWITCH-2",
    "PC1",
    "PC2",
    "PC3",
    "PC4",
    "192.168.1.0/24",
    "209.165.202.129",
  ]) {
    assert.ok(markup.includes(sourceDetail), `the redraw should retain ${sourceDetail}`);
  }
});

test("replaces review item 202's mismatched VoIP after-image with a labeled partial topology", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 724);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));

  assert.equal(questionIndex + 1, 202);
  assert.equal(questions[questionIndex + 1].legacyIndex, 729);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 730) + 1, 204);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 732) + 1, 205);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 736) + 1, 206);
  assert.equal(question.answer, 3);
  assert.doesNotMatch(question.prompt, /Refer to the exhibit/);
  assert.equal(question.exhibitDiagram, "switch-voice-vlan-phone-review-724");
  assert.equal(question.exhibit, undefined);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitQuality, "illustrative");
  assert.match(question.explanation, /LLDP must first be enabled globally/);
  assert.match(markup, /Non-Cisco IP/);
  assert.match(markup, />Phone</);
  assert.match(markup, /Gi1\/0\/1/);
  assert.match(markup, /VLAN 10/);
  assert.match(markup, /VLAN 11/);
  assert.doesNotMatch(markup, /cdp run|lldp run/);
});

test("rebuilds review item 205's guest-WLAN settings from its matching source-backed candidate", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 732);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));

  assert.equal(questionIndex + 1, 205);
  assert.deepEqual(question.answer, [0, 3]);
  assert.equal(question.exhibitDiagram, "candidate-wlc-414");
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitQuality, "source-backed");
  for (const setting of ["Layer 2 Security", "None", "MAC Filtering", "Layer 3 Security", "Web Auth"]) {
    assert.ok(markup.includes(setting), `the WLC redraw should show ${setting}`);
  }
  assert.doesNotMatch(markup, /ccna-exhibit-732\.png/);
});

test("keeps review item 206's matching route-table terminal and hides its unrelated after-image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 736);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 206);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 738) + 1, 207);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 747) + 1, 208);
  assert.equal(question.answer, 2);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /O 172\.16\.0\.128\/25 \[110\/32445\]/);
  assert.match(question.exhibit, /D 172\.16\.0\.192\/29 \[90\/3184439\]/);
  assert.match(markup, /32445/);
  assert.match(markup, /ccna-exhibit-736\.png/);
  assert.doesNotMatch(markup, /R1 QOS INGRESS TRAFFIC CLASSIFICATION|ccna-after-exhibit-736/);
});

test("rebuilds review item 209 with only source-supported host-route topology details", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 754);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(React.createElement(ExhibitDiagram, {
    type: question.exhibitDiagram,
    offlineLayout: true,
    compact: true,
  }));

  assert.equal(questionIndex + 1, 209);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 756) + 1, 210);
  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 758) + 1, 211);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitDiagram, "three-router-specific-host-route-review-754");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  for (const sourceDetail of ["R1", "R2", "R3", "192.168.1.2", "192.168.1.4", "10.10.2.0/24", "10.10.2.1"]) {
    assert.ok(markup.includes(sourceDetail), `the partial redraw should show ${sourceDetail}`);
  }
  assert.doesNotMatch(markup, /192\.168\.1\.0\/24|192\.168\.2\.0\/24|192\.168\.1\.3/);
});

test("rebuilds review item 212's missing PC exhibit and corrects its mismatched subnet mask", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 760);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questionIndex + 1, 212);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "internet-router-pc-ipconfig-review-760");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.exhibitImage, undefined);
  assert.equal(question.afterExhibit, undefined);
  assert.match(question.exhibit, /Subnet Mask: 255\.255\.255\.192/);
  assert.match(question.exhibit, /Default Gateway: 10\.2\.2\.1/);
  assert.match(markup, /255\.255\.255\.192/);
  assert.match(markup, /10\.2\.2\.1\/27/);
  assert.doesNotMatch(markup, /255\.255\.255\.248|ccna-after-exhibit-442/);
});

test("rebuilds review item 214's missing EtherChannel exhibit without unsupported topology", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 770);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 769) + 1, 213);
  assert.equal(questionIndex + 1, 214);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitDiagram, "etherchannel-min-links-review-770");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /Port Channel 1/);
  assert.match(markup, /Gi0\/0/);
  assert.match(markup, /Gi0\/1/);
  assert.match(markup, /original exhibit is unavailable/);
  assert.doesNotMatch(markup, /THREE-SWITCH|SW3|3 links|ccna-after-exhibit-452/);
});

test("rebuilds review item 216's cropped NewSW command exhibit from source text", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 778);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 772) + 1, 215);
  assert.equal(questionIndex + 1, 216);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  for (const command of [
    "NewSW(config)#interface f0/0",
    "switchport mode trunk",
    "switchport trunk allowed vlan 2,10",
    "switchport trunk native vlan 2",
  ]) {
    assert.ok(markup.includes(command), `the source-faithful redraw should show ${command}`);
  }
  assert.doesNotMatch(markup, /ccna-exhibit-778\.png|undefined/);
});

test("rebuilds review item 220's missing WLC client-limit exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 794);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 790) + 1, 219);
  assert.equal(questionIndex + 1, 220);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "candidate-wlc-794-max-clients-review");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /Maximum Allowed Clients/);
  assert.match(markup, />125</);
  assert.match(markup, /USERWL/);
  assert.doesNotMatch(markup, /Web authentication policy|WLAN ACCESS POINT AND CONTROLLER TOPOLOGY|ccna-after-exhibit-476/);
});

test("rebuilds review item 221's missing dual-ISP topology without the fixed image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 797);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 794) + 1, 220);
  assert.equal(questionIndex + 1, 221);
  assert.deepEqual(question.answer, [1, 4]);
  assert.equal(question.exhibitDiagram, "cpe-dual-isp-review-797");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  for (const detail of ["CPE", "Headquarters", "ISP 1", "198.51.100.1", "ISP 2", "203.0.113.1"]) {
    assert.ok(markup.includes(detail), `the partial redraw should show ${detail}`);
  }
  assert.match(markup, /original exhibit is missing/);
  assert.doesNotMatch(markup, /ccna-after-exhibit-479|ccna-exhibit-797\.png/);
});

test("rebuilds review item 224's missing R2 EUI-64 exhibit and flags conflicting source data", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 802);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 800) + 1, 223);
  assert.equal(questionIndex + 1, 224);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "r2-eui64-review-802");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /12A0\.ABDD\.0002/);
  assert.match(markup, /2001:DB8:D8D2:1009::\/64/);
  assert.match(markup, /does not match the keyed option/);
  assert.doesNotMatch(markup, /DUAL-SITE IPV6 SERVER AND WORKSTATION LANS|ccna-after-exhibit-484/);
});

test("rebuilds review item 225's missing LACP exhibit without unsupported hosts or member ports", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 804);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 802) + 1, 224);
  assert.equal(questionIndex + 1, 225);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitDiagram, "lacp-passive-channel-review-804");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /Channel group 1/);
  assert.match(markup, /1000 Mbps/);
  assert.match(markup, /full duplex/);
  assert.match(markup, /member ports and host connections are unknown/);
  assert.doesNotMatch(markup, /Group 1 · Gi0\/0\/0|Hosts|ccna-after-exhibit-486/);
});

test("rebuilds review item 232's missing R14-to-R86 floating-route exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 824);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 817) + 1, 231);
  assert.equal(questionIndex + 1, 232);
  assert.equal(question.answer, 2);
  assert.equal(question.exhibitDiagram, "r14-r86-eigrp-floating-route-review-824");
  assert.equal(question.exhibitQuality, "partial");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  for (const detail of ["R14", "R86", "10.73.65.66", "10.80.65.0/29"]) {
    assert.ok(markup.includes(detail), `the partial redraw should show ${detail}`);
  }
  assert.match(markup, /transit details are omitted/);
  assert.doesNotMatch(markup, /10\.10\.1\.14\/32|10\.10\.1\.86\/32|ccna-after-exhibit-506/);
});

test("redraws review item 233's DHCPv6 LAN exhibit and hides its unrelated JSON image", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 829);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 824) + 1, 232);
  assert.equal(questionIndex + 1, 233);
  assert.equal(question.answer, 2);
  assert.equal(question.exhibitDiagram, "ipv6-dhcpv6-lan");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  for (const detail of ["R1", "R2", "DHCPv6 Server", "2001:DB8:D8D2:100::/64", "2001:DB8:D8D2:1009::/64"]) {
    assert.ok(markup.includes(detail), `the source-faithful redraw should show ${detail}`);
  }
  assert.doesNotMatch(markup, /\["red", "one"\]|ccna-after-exhibit-829/);
});

test("keeps review item 234 as a text-only route-table exhibit and removes the stale lead-in", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 830);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 829) + 1, 233);
  assert.equal(questionIndex + 1, 234);
  assert.equal(question.answer, 3);
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  assert.doesNotMatch(question.prompt, /^\s*Refer to the exhibit/);
  for (const detail of ["Router-Y#show ip route", "10.224.0.0/11", "10.224.1.5"]) {
    assert.ok(markup.includes(detail), `the matching route-table output should show ${detail}`);
  }
  assert.match(question.prompt, /10\.227\.225\.255/);
  assert.doesNotMatch(markup, /ccna-exhibit-830|ccna-after-exhibit/);

  const liveSource = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === 830);
  const liveQuestion = applyNativeExhibit(liveSource);
  assert.equal(liveQuestion.hideExhibitImage, true);
  assert.equal(liveQuestion.exhibitQuality, "source-backed");
  assert.doesNotMatch(liveQuestion.prompt, /^\s*Refer to the exhibit/);
});

test("replaces review item 236's mismatched PC10 exhibit with the R86 static route to R14", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 835);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(questions.findIndex((entry) => entry.legacyIndex === 834) + 1, 235);
  assert.equal(questionIndex + 1, 236);
  assert.equal(question.answer, 0);
  assert.equal(question.exhibitDiagram, "r86-static-route-to-r14-17216-34");
  assert.equal(question.exhibitQuality, "source-backed");
  assert.equal(question.hideExhibitImage, true);
  assert.equal(question.afterExhibit, undefined);
  for (const detail of ["R14", "R86", "172.16.34.0/29", "10.73.65.64/30"]) {
    assert.ok(markup.includes(detail), `the R86 static-route redraw should show ${detail}`);
  }
  assert.doesNotMatch(markup, /ccna-exhibit-835|ccna-after-exhibit-517|PC10/);

  const liveSource = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === 835);
  const liveQuestion = applyNativeExhibit(liveSource);
  assert.equal(liveQuestion.exhibitDiagram, "r86-static-route-to-r14-17216-34");
  assert.equal(liveQuestion.hideExhibitImage, true);
  assert.equal(liveQuestion.afterExhibit, undefined);
});

test("cleans the remaining missing or terminal-only exhibit gaps", () => {
  const questions = getOfflineReferExhibitQuestionBank();

  for (const [legacyIndex, ordinal] of [
    [452, 94],
    [624, 164],
    [747, 208],
    [809, 229],
    [1148, 320],
  ]) {
    const questionIndex = questions.findIndex((entry) => entry.legacyIndex === legacyIndex);
    const question = questions[questionIndex];
    assert.equal(questionIndex + 1, ordinal);
    assert.equal(question.hideExhibitImage, true);
    assert.equal(question.afterExhibit, undefined);
    assert.doesNotMatch(question.prompt, /^\s*Refer to the exhibit/);

    const legacyQuestion = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === legacyIndex);
    const liveQuestion = applyNativeExhibit(legacyQuestion);
    assert.equal(liveQuestion.hideExhibitImage, true);
    assert.equal(liveQuestion.afterExhibit, undefined);
  }

  const ospfElection = questions.find((entry) => entry.legacyIndex === 452);
  assert.match(ospfElection.exhibit, /FULL\/BDR.*172\.16\.10\.4/s);
  assert.match(ospfElection.exhibit, /FULL\/DR.*172\.16\.10\.5/s);
  assert.equal(ospfElection.answer, 2);

  const ospfTimers = questions.find((entry) => entry.legacyIndex === 747);
  assert.match(ospfTimers.exhibit, /Hello 15, Dead 20/);
  assert.match(ospfTimers.exhibit, /Hello 10, Dead 40/);
  assert.equal(ospfTimers.answer, 0);
});

test("moves legacy ipconfig outputs into terminal exhibits without changing their questions", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const exactOutputQuestionStarts = new Map([
    [1060, /\n\nWhat does the host do/],
    [1123, /\n\nWhich address will the client/],
    [1190, /\n\nThe user has connectivity/],
  ]);
  const expectedPrompts = new Map([
    [1060, "What does the host do when using the IPv4 Preferred function?"],
    [1123, "Which address will the client contact to renew their IP address when the current lease expires?"],
    [1190, "The user has connectivity to devices on network 192.168.3.0/24 but cannot reach users on the network\n10.10.1.0/24. What is the first step to verify connectivity?"],
    [1226, "During initial configuration testing, the Windows workstation PC1 cannot connect with the 172.16.2.0/24\nnetwork. Which set of actions corrects the configuration?"],
  ]);

  for (const [legacyIndex, marker] of [
    [1060, "Connection-specific DNS Suffix"],
    [1123, "wireless LAN adapter Wi-Fi"],
    [1190, "ipconfig"],
    [1226, "Wireless LAN adapter Wi-Fi"],
  ]) {
    const source = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === legacyIndex);
    const question = questions.find((entry) => entry.legacyIndex === legacyIndex);
    const liveQuestion = applyNativeExhibit(source);
    const markup = renderToStaticMarkup(
      React.createElement(QuestionExhibits, { question }),
    );

    assert.ok(question, `legacy index ${legacyIndex} should be in the offline exhibit bank`);
    assert.equal(question.type, source.type);
    assert.equal(question.answer, source.answer);
    assert.deepEqual(question.options, source.options);
    assert.equal(question.hideExhibitImage, true);
    assert.equal(question.afterExhibit, undefined);
    assert.doesNotMatch(question.prompt, /^\s*Refer to the exhibit/);
    assert.equal(question.prompt, expectedPrompts.get(legacyIndex));
    assert.ok(question.exhibit.includes(marker));
    assert.ok(markup.includes(marker));
    if (legacyIndex === 1190) {
      assert.ok(question.exhibit.includes("C:\\Users\\ADMIN>ipconfig"));
    }
    assert.doesNotMatch(markup, /<img\b|ccna-exhibit-|ccna-after-exhibit-/);

    assert.equal(liveQuestion.type, source.type);
    assert.equal(liveQuestion.answer, source.answer);
    assert.deepEqual(liveQuestion.options, source.options);
    assert.equal(liveQuestion.hideExhibitImage, true);
    assert.equal(liveQuestion.hideAfterExhibit, true);
    assert.equal(liveQuestion.prompt, expectedPrompts.get(legacyIndex));

    const questionStart = exactOutputQuestionStarts.get(legacyIndex);
    if (questionStart) {
      const sourceOutput = source.prompt
        .replace(/^Refer to the exhibit\.\n\n/i, "")
        .split(questionStart)[0];
      assert.equal(question.exhibit, sourceOutput);
      assert.equal(liveQuestion.exhibit, sourceOutput);
    }
  }
});

test("redraws the R14-to-PC10 host-route exhibit from the provided screenshot details", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const questionIndex = questions.findIndex((entry) => entry.legacyIndex === 834);
  const question = questions[questionIndex];
  const markup = renderToStaticMarkup(
    React.createElement(QuestionExhibits, { question }),
  );

  assert.equal(question.exhibitDiagram, "r14-r86-pc10-host-route");
  assert.equal(question.answer, 2);
  assert.equal(question.afterExhibit, undefined);
  assert.match(markup, /R14/);
  assert.match(markup, /R86/);
  assert.match(markup, /10\.73\.65\.64\/30/);
  assert.match(markup, /10\.80\.65\.0\/28/);
  assert.match(markup, /10\.80\.65\.10/);
  assert.match(markup, /Loopback0 · 10\.10\.1\.14\/32/);
  assert.match(markup, /Loopback0 · 10\.10\.1\.86\/32/);
  assert.match(markup, /Fa0\/1/);
});

test("hides redundant or mismatched images while preserving the needed exhibit", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  for (const [legacyIndex, expectedDiagram, shouldKeepAfterExhibit, expectedImage] of [
    [44, undefined, true],
    [51, undefined, true],
    [62, undefined, true],
    [494, "routers-abc-floating-route", false],
    [507, "routers-abc-ospf-dr", false],
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
    if ([494, 507, 508, 509].includes(legacyIndex)) {
      const sourceImageId = { 494: 177, 507: 190, 508: 191, 509: 192 }[legacyIndex];
      assert.match(question.offlineSourceExhibitImages[0], new RegExp(`ccna-question-${sourceImageId}\\.png$`));
    } else if (legacyIndex === 645) {
      assert.deepEqual(question.offlineSourceExhibitImages, ["/src/assets/ccna-offline-exams-images/ccna-question-327.png"]);
    } else {
      assert.deepEqual(question.offlineSourceExhibitImages, []);
    }
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

  assert.match(referQuestion.offlineSourceExhibitImages[0], /ccna-question-177\.png$/);
  const ospfDrQuestion = referQuestions.find((entry) => entry.legacyIndex === 507);
  assert.match(ospfDrQuestion.offlineSourceExhibitImages[0], /ccna-question-190\.png$/);
  const macLearningQuestion = referQuestions.find((entry) => entry.legacyIndex === 508);
  assert.match(macLearningQuestion.offlineSourceExhibitImages[0], /ccna-question-191\.png$/);
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
  assert.match(question.prompt, /^VoIP is being implemented/);
  assert.doesNotMatch(question.prompt, /^\s*Refer to (?:the )?exhibit\./i);
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

test("repairs remaining Refer-to-Exhibit raw and incomplete exhibits from ordinal 237 onward", () => {
  const questions = getOfflineReferExhibitQuestionBank();
  const byIndex = (legacyIndex) => {
    const ordinal = questions.findIndex((entry) => entry.legacyIndex === legacyIndex);
    assert.notEqual(ordinal, -1, `legacy index ${legacyIndex} should remain in the offline exhibit bank`);
    return { question: questions[ordinal], ordinal: ordinal + 1 };
  };

  const wlan = byIndex(836);
  assert.equal(wlan.ordinal, 237);
  assert.equal(wlan.question.exhibitDiagram, "candidate-wlc-518");
  assert.equal(wlan.question.exhibitQuality, "illustrative");
  assert.equal(wlan.question.answer, 2);

  for (const [legacyIndex, expectedOrdinal, marker] of [
    [844, 242, "ip virtual—reassembly in"],
    [883, 255, "Hello 15, Dead 40"],
    [920, 266, "Hello 10, Dead 40"],
    [1159, 327, "enable password test!2E"],
  ]) {
    const entry = byIndex(legacyIndex);
    assert.equal(entry.ordinal, expectedOrdinal);
    assert.doesNotMatch(entry.question.prompt, /^\s*Refer to the exhibit\./i);
    assert.ok(entry.question.exhibit.includes(marker));

    const legacyQuestion = ccnaLegacyQuestions.find((item) => item.legacyIndex === legacyIndex);
    const liveQuestion = applyNativeExhibit(legacyQuestion);
    assert.equal(liveQuestion.prompt, entry.question.prompt);
    assert.equal(liveQuestion.exhibit, entry.question.exhibit);
    if (legacyIndex === 1159) {
      assert.doesNotMatch(entry.question.prompt, /SW1#\(config\)#line vty 0 15/);
      assert.match(entry.question.exhibit, /SW1#\(config\)#line vty 0 15/);
      assert.match(entry.question.exhibit, /SW1#\(config-line\)#password\n Labtest32!/);
      assert.equal(entry.question.type, legacyQuestion.type);
      assert.equal(entry.question.answer, legacyQuestion.answer);
    }
  }

  const misaddressedTopology = byIndex(848);
  assert.equal(misaddressedTopology.ordinal, 243);
  assert.equal(misaddressedTopology.question.exhibitQuality, "partial");
  assert.equal(misaddressedTopology.question.afterExhibit, undefined);
  assert.match(misaddressedTopology.question.exhibit, /172\.16\.5\.0\/24/);
  assert.match(misaddressedTopology.question.exhibit, /10\.10\.10\.0\/24 via 192\.168\.2\.3/);
  assert.deepEqual(misaddressedTopology.question.answer, [3, 4]);

  for (const [legacyIndex, ordinal, expectedText] of [
    [876, 251, /172\.25\.0\.0\/24/],
    [884, 256, /192\.168\.202\.30/],
  ]) {
    const entry = byIndex(legacyIndex);
    assert.equal(entry.ordinal, ordinal);
    assert.equal(entry.question.exhibitQuality, "partial");
    assert.equal(entry.question.afterExhibit, undefined);
    assert.match(entry.question.exhibit, expectedText);
  }

  for (const [legacyIndex, ordinal, diagram] of [
    [911, 263, "candidate-wlc-593"],
    [982, 276, "candidate-wlc-666"],
    [1076, 297, "candidate-wlc-1076"],
    [1110, 304, "candidate-wlc-794"],
    [1199, 338, "candidate-wlc-1199-interface"],
    [1245, 353, "candidate-wlc-955"],
  ]) {
    const entry = byIndex(legacyIndex);
    assert.equal(entry.ordinal, ordinal);
    assert.equal(entry.question.exhibitDiagram, diagram);
    assert.equal(entry.question.exhibitQuality, "illustrative");
  }
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

test("renders legacy terminal exhibits without their duplicate source screenshots", () => {
  const legacyIndexes = [
    41, 43, 46, 100, 103, 123, 126, 161, 163, 167, 189, 385, 499, 506,
    523, 655, 701, 712, 729, 782, 798, 808, 816, 860, 909, 991, 1116, 1313,
  ];
  const questions = getOfflineLegacyQuestionBank();

  for (const legacyIndex of legacyIndexes) {
    const question = questions.find((entry) => entry.legacyIndex === legacyIndex);

    assert.ok(question?.exhibit, `legacy index ${legacyIndex} should have a terminal exhibit`);
    assert.equal(question.hideExhibitImage, true, `legacy index ${legacyIndex} should hide its duplicate screenshot`);
    const markup = renderToStaticMarkup(
      React.createElement(QuestionExhibits, { question }),
    );
    assert.match(markup, /ccna-term/);
    assert.doesNotMatch(markup, /<img\b/);
  }
});

test("keeps extracted CLI exhibits and cleaned prompts in the complete offline bank", () => {
  const expectedOutputs = new Map([
    [747, "R1#show ip ospf interface g0/0/0"],
    [844, "interface Loopback0"],
    [883, "R1#show ip ospf interface"],
    [920, "R1#show ip ospf interface"],
    [1112, "SW_1#show vlan"],
    [909, "network 192.168.12.1 0.0.0.0 area 1"],
    [816, "172.22.0.0/24 is subnetted"],
  ]);
  const questions = getOfflineLegacyQuestionBank();

  for (const [legacyIndex, outputMarker] of expectedOutputs) {
    const sourceQuestion = ccnaLegacyQuestions.find((entry) => entry.legacyIndex === legacyIndex);
    const question = questions.find((entry) => entry.legacyIndex === legacyIndex);

    assert.ok(question, `legacy index ${legacyIndex} should remain in the offline bank`);
    assert.ok(question.exhibit?.includes(outputMarker));
    assert.ok(!question.prompt.includes(outputMarker));
    assert.doesNotMatch(question.prompt, /^\s*Refer to (?:the )?exhibit\./i);
    assert.equal(question.type, sourceQuestion.type);
    if (legacyIndex === 909 || legacyIndex === 816) {
      assert.equal(question.exhibitDiagram, undefined);
      assert.equal(question.hideExhibitImage, true);
      assert.equal(question.exhibitImage, undefined);
    }
    if (legacyIndex === 816) {
      assert.match(question.exhibit, /^R7#/);
      assert.doesNotMatch(question.prompt, /R7#/);
    }
    if (legacyIndex === 1159) {
      assert.doesNotMatch(question.prompt, /SW1#\(config\)#line vty 0 15/);
      assert.match(question.exhibit, /SW1#\(config\)#line vty 0 15/);
      assert.match(question.exhibit, /SW1#\(config-line\)#password\n Labtest32!/);
    }
    if ([747, 844, 883, 920, 1112].includes(legacyIndex)) {
      assert.equal(question.options.length, sourceQuestion.options.length);
      if (legacyIndex === 747) {
        assert.match(question.options[0], /hello-interval 15/);
      } else if (legacyIndex === 844) {
        assert.match(question.options[0], /ip nat inside source static 172\.16\.29\.78 10\.199\.77\.100/);
      } else if (legacyIndex === 1112) {
        assert.match(question.options[0], /switchport trunk allowed vlan/);
      } else {
        assert.match(question.options[0], /hello-interval 10/);
      }
    } else {
      assert.deepEqual(question.options, sourceQuestion.options);
    }
    assert.equal(question.answer, sourceQuestion.answer);
  }
});
