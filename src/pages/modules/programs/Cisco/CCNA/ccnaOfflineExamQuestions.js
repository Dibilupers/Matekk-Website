import ccna1306BroadcastAddressesImg from "../../../../../assets/ccna-exam/ccna-1306-broadcast-addresses.png";
import ccna181RapidPvstActionsImg from "../../../../../assets/ccna-exam/ccna-181-rapid-pvst-actions.png";
import ccna382AnsibleFeaturesImg from "../../../../../assets/ccna-exam/ccna-382-ansible-features.png";
import ccna608NorthboundApiImg from "../../../../../assets/ccna-exam/ccna-608-northbound-api.png";
import subinterfaceR1Sw1Sw2Img from "../../../../../assets/ccna-exam/subinterface-r1-sw1-sw2.webp";
import wlcMyWlanLayer2Img from "../../../../../assets/ccna-exam/wlc-my-wlan-layer2.webp";
import wlcPskLayer2Img from "../../../../../assets/ccna-exam/wlc-psk-layer2.webp";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions";
import { findCcnaQuestionExplanation } from "../../../../../utils/ccnaQuestionExplanations";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";

const CONNECT_DOTS_LEGACY_QUESTION_INDEX = 654;

const NUMBERED_QUESTION_EXHIBIT_IMAGES = import.meta.glob(
  "../../../../../assets/ccna-offline-exams-images/ccna-question-*.png",
  { eager: true, import: "default", query: "?url" },
);

const NUMBERED_QUESTION_EXHIBITS = Object.entries(NUMBERED_QUESTION_EXHIBIT_IMAGES)
  .reduce((exhibits, [path, image]) => {
    const match = path.match(/ccna-question-(\d+)(-corrected)?\.png$/);
    if (!match) return exhibits;

    const questionNumber = Number(match[1]);
    if (!exhibits.has(questionNumber) || match[2]) {
      exhibits.set(questionNumber, image);
    }
    return exhibits;
  }, new Map());

// Screenshot filenames use question-bank IDs, so map them to legacy indexes by prompt.
const OFFLINE_LEGACY_QUESTION_IMAGE_IDS = new Map([
  [62, 1099],
  [329, 13],
  [331, 15],
  [339, 23],
  [354, 38],
  [355, 39],
  [421, 105],
  [460, 143],
  [474, 157],
  [478, 161],
  [489, 172],
  [491, 174],
  [494, 177],
  [495, 178],
  [496, 179],
  [497, 180],
  [502, 185],
  [504, 187],
  [505, 188],
  [507, 190],
  [508, 191],
  [509, 192],
  [510, 193],
  [520, 203],
  [521, 204],
  [522, 205],
  [529, 212],
  [531, 214],
  [541, 224],
  [542, 225],
  [545, 228],
  [548, 231],
  [551, 234],
  [554, 236],
  [560, 242],
  [562, 244],
  [563, 245],
  [564, 246],
  [566, 248],
  [568, 250],
  [569, 251],
  [570, 252],
  [574, 256],
  [577, 259],
  [578, 260],
  [579, 261],
  [586, 268],
  [588, 270],
  [591, 273],
  [592, 274],
  [593, 275],
  [599, 281],
  [602, 284],
  [603, 285],
  [612, 294],
  [616, 298],
  [617, 299],
  [618, 300],
  [621, 303],
  [628, 310],
  [629, 311],
  [635, 317],
  [645, 327],
  [646, 328],
  [651, 333],
  [656, 338],
  [657, 339],
  [661, 343],
  [663, 345],
  [679, 361],
  [682, 364],
  [685, 367],
  [687, 369],
  [689, 371],
  [695, 377],
  [704, 386],
  [705, 387],
  [714, 396],
  [721, 403],
  [723, 405],
  [1290, 1001],
  [1300, 1011],
  [1301, 1012],
  [1303, 1014],
  [1304, 1015],
  [44, 1081],
  [45, 1082],
  [47, 1084],
  [51, 1088],
  [52, 1089],
  [59, 1096],
  [60, 1097],
  [71, 1108],
  [72, 1109],
  [82, 1119],
  [84, 1121],
  [88, 1125],
  [90, 1127],
  [91, 1128],
  [104, 1141],
  [109, 1146],
  [111, 1148],
  [112, 1149],
  [120, 1157],
  [130, 1167],
  [131, 1168],
  [132, 1169],
  [137, 1174],
  [157, 1194],
  [160, 1197],
  [162, 1199],
  [177, 1214],
  [215, 1254],
  [266, 1305],
  [268, 1307],
  [278, 1317],
  [282, 1321],
  [290, 1329],
  [291, 1330],
]);

const OFFLINE_LEGACY_QUESTION_OVERRIDES = new Map([
  [500, {
    prompt: "Which configuration allows routers R14 and R86 to form an OSPFv2 adjacency and elect a central point for exchanging OSPF information?",
    options: [
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf priority 0\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface Loopback0\n ip address 10.10.1.86 255.255.255.255\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf priority 255\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface Loopback0\n ip address 10.10.1.86 255.255.255.255\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n ip ospf priority 255\n router-id 10.10.1.14\n\nR86#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86",
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf network broadcast\n ip ospf priority 255\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf network broadcast\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
    ],
  }],
  [964, {
    prompt: "All interfaces use duplex auto and the OSPF broadcast network type. Which configuration allows routers R14 and R86 to form an OSPFv2 adjacency and elect a central point for exchanging OSPF information?",
    options: [
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf priority 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf priority 255\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n\nR86#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.86",
      "R14#\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf priority 255\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
      "R14#\ninterface Loopback0\n ip ospf 10 area 0\ninterface FastEthernet0/0\n ip address 10.73.65.65 255.255.255.252\n ip ospf 10 area 0\n ip mtu 1500\nrouter ospf 10\n router-id 10.10.1.14\n network 10.10.1.14 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0\n\nR86#\ninterface FastEthernet0/0\n ip address 10.73.65.66 255.255.255.252\n ip mtu 1400\nrouter ospf 10\n router-id 10.10.1.86\n network 10.10.1.86 0.0.0.0 area 0\n network 10.73.65.64 0.0.0.3 area 0",
    ],
  }],
  [486, {
    prompt: [
      "For security reasons, disable neighbor discovery on R5 interface Gi0/1 while permitting it on Gi0/2.",
      "",
      "The configuration must also verify that Gi0/1 has no dynamically learned neighbors and display the IP address of R6 interface Gi0/2.",
      "",
      "Which configuration meets these requirements?",
    ].join("\n"),
    options: [
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp enable\nR5(config-if)#exit\nR5(config)#lldp run\nR5(config)#no cdp run\nR5#show cdp neighbor detail\nR5#show lldp neighbor",
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp run\nR5(config-if)#exit\nR5(config)#lldp run\nR5(config)#cdp enable\nR5#show cdp neighbor\nR5#show lldp neighbor",
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp enable\nR5(config-if)#exit\nR5(config)#no lldp run\nR5(config)#cdp run\nR5#show cdp neighbor detail\nR5#show lldp neighbor",
      "R5(config)#interface Gi0/1\nR5(config-if)#no cdp enable\nR5(config-if)#exit\nR5(config)#no lldp run\nR5(config)#cdp run\nR5#show cdp neighbor\nR5#show lldp neighbor",
    ],
  }],
  [724, {
    prompt: "A multivendor network is being configured for VoIP. Which configuration enables neighbor discovery on interface GigabitEthernet1/0/1 while keeping it disabled on the other interfaces?",
    explanation: "Option D is the intended choice, but it is incomplete on its own: LLDP must first be enabled globally with “lldp run”. To keep LLDP disabled on the other interfaces, disable LLDP transmit and receive on those interfaces.",
  }],
]);

const LEGACY_QUESTION_EXHIBITS = new Map([
  [50, subinterfaceR1Sw1Sw2Img],
  [217, wlcMyWlanLayer2Img],
  [227, wlcPskLayer2Img],
  [267, ccna1306BroadcastAddressesImg],
  [498, ccna181RapidPvstActionsImg],
  [700, ccna382AnsibleFeaturesImg],
  [926, ccna608NorthboundApiImg],
]);

const OFFLINE_LEGACY_QUESTIONS = CCNA_LEGACY_QUESTIONS
  .map((question) => {
    const isConnectDotsQuestion = question.legacyIndex === CONNECT_DOTS_LEGACY_QUESTION_INDEX;
    const offlineOverride = OFFLINE_LEGACY_QUESTION_OVERRIDES.get(question.legacyIndex);
    const numberedExhibit = /\bexhibit\b/i.test(question.prompt)
      ? NUMBERED_QUESTION_EXHIBITS.get(OFFLINE_LEGACY_QUESTION_IMAGE_IDS.get(question.legacyIndex))
      : undefined;
    const exhibitImage = numberedExhibit || LEGACY_QUESTION_EXHIBITS.get(question.legacyIndex);

    return {
      ...question,
      ...(!question.exhibit && !offlineOverride ? splitPromptExhibit(question.prompt) : {}),
      ...offlineOverride,
      ...(isConnectDotsQuestion
        ? { prompt: "Connect each Wi-Fi term on the left to its matching description on the right." }
        : {}),
      ...(exhibitImage ? { exhibitImage } : {}),
      ...(question.type === "match" &&
      question.items?.length === question.choices?.length &&
      question.answer?.length === question.items.length &&
      new Set(question.answer).size === question.answer.length
        ? {
            type: isConnectDotsQuestion
              ? "match"
              : /\bdrag\b/i.test(question.prompt)
                ? "drag_drop"
                : "click_boxes",
          }
        : {}),
      id: question.legacyIndex,
      bankId: question.legacyIndex,
      offlineLegacy: true,
      source: "legacy-ccna-200-301",
      moduleNumber: null,
      moduleTitle: "Legacy CCNA 200-301",
      explanation: offlineOverride?.explanation || question.explanation?.trim() || findCcnaQuestionExplanation(question.prompt),
    };
  })
  .filter((question) =>
    isValidQuestion(question) &&
    (!/\bexhibit\b/i.test(question.prompt) || question.exhibit || question.exhibitImage),
  );

export function getOfflineLegacyQuestionBank() {
  return OFFLINE_LEGACY_QUESTIONS.map((question) => ({ ...question }));
}

export function createOfflineLegacyExamQuestions(count) {
  if (!Number.isInteger(count) || count < 1 || count > OFFLINE_LEGACY_QUESTIONS.length) {
    throw new RangeError(`The offline legacy question bank cannot provide ${count} questions.`);
  }

  const questions = getOfflineLegacyQuestionBank();
  const blockCount = Math.ceil(count / 50);
  const dragDropCount = Math.min(blockCount * 3, count - 1, questions.filter((question) => question.type === "drag_drop").length);
  const clickBoxesCount = Math.min(blockCount, count - dragDropCount, questions.filter((question) => question.type === "click_boxes").length);
  const connectDotsCount = Math.min(
    blockCount,
    count - dragDropCount - clickBoxesCount,
    questions.filter((question) => question.type === "match").length,
  );
  const imageExhibitCount = Math.min(
    blockCount,
    count - dragDropCount - clickBoxesCount - connectDotsCount,
    questions.filter((question) => question.exhibitImage).length,
  );
  const shuffle = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  };
  const dragDropQuestions = shuffle(questions.filter((question) => question.type === "drag_drop"))
    .slice(0, dragDropCount);
  const clickBoxesQuestions = shuffle(questions.filter((question) => question.type === "click_boxes"))
    .slice(0, clickBoxesCount);
  const connectDotsQuestions = shuffle(questions.filter((question) => question.type === "match"))
    .slice(0, connectDotsCount);
  const imageExhibitQuestions = shuffle(questions.filter((question) => question.exhibitImage))
    .slice(0, imageExhibitCount);
  const selectedIds = new Set([...dragDropQuestions, ...clickBoxesQuestions, ...connectDotsQuestions, ...imageExhibitQuestions].map((question) => question.id));
  const remainingQuestions = shuffle(questions.filter((question) => !selectedIds.has(question.id)))
    .slice(0, count - selectedIds.size);

  return shuffle([...dragDropQuestions, ...clickBoxesQuestions, ...connectDotsQuestions, ...imageExhibitQuestions, ...remainingQuestions]);
}
