// Turns rows from the CCNA question bank (the database "Questions" table) into exam questions.
//   - Multiple choice: choices '{"A": "...", "B": "..."}' + correct_answer "B" or "B,D"
//   - Drag and drop:   no choices; correct_answer written out, either as pairs
//                      ("+ show snmp group: displays the SNMP security model") or as groups
//                      ("TCP:\n+ SMTP\n+ HTTP\n\nUDP:\n+ DNS") — become matching questions
// Questions that can't be turned into something gradable are reported, not guessed.
import {
  removeDuplicateExhibitLeadIn,
  removeTrailingOptionExhibitLabel,
  splitPromptExhibit,
} from "./splitPromptExhibit";
import { parseOptionTable } from "./ccnaOptionTable";
import { findCcnaQuestionExplanation } from "./ccnaQuestionExplanations";

// Text that went through the wrong character encoding somewhere ("â€“" should be "–")
const MOJIBAKE = [
  ["â€“", "–"], ["â€”", "—"], ["â€™", "’"], ["â€˜", "‘"], ["â€œ", "“"], ["â€\u009d", "”"], ["â€�", "”"],
  ["â€¦", "…"], ["â€³", "”"], ["â€¢", "•"], ["Â ", " "], ["Â", ""],
];
export function cleanText(text) {
  let out = String(text ?? "");
  for (const [bad, good] of MOJIBAKE) out = out.split(bad).join(good);
  // Website text that got copied in with the questions ("Premium Member: You can test your knowledge ... (via HTML).")
  out = out.replace(/\+?\s*\w*mium Member:?\s*(?:You can test your knowledge[^\n]*)?/gi, "");
  return out
    .split("\n")
    // leftovers from the source document, e.g. "===== New Questions (added on 13th-Feb-2022) ====="
    .filter((line) => !/^\s*=+.*=+\s*$/.test(line) && !/New Questions \(added on/i.test(line))
    .join("\n")
    .trim();
}

// Same mixed-up order every time (based on the text), so grouped answers aren't listed in answer order
function stableShuffle(list, seed) {
  const hash = (text) => [...text].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);
  return [...list].sort((a, b) => hash(seed + a.key) - hash(seed + b.key));
}

const mentionsExhibit = (text) => /\bexhibit\b|shown below|refer to the (diagram|topology|graphic)/i.test(text);

function parseChoices(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (Array.isArray(parsed)) {
      const entries = parsed.map((choice, index) => {
        const letter = String.fromCharCode(65 + index);
        if (typeof choice === "string") return [letter, choice];
        if (
          !choice ||
          typeof choice !== "object" ||
          Array.isArray(choice) ||
          typeof choice.text !== "string"
        ) return null;
        const id = typeof choice.id === "string" || typeof choice.id === "number"
          ? String(choice.id)
          : letter;
        return [id, choice.text];
      });
      return entries.every(Boolean) ? Object.fromEntries(entries) : null;
    }
    const entries = Object.entries(parsed).map(([key, choice]) => {
      if (typeof choice === "string") return [key, choice];
      if (choice && typeof choice === "object" && !Array.isArray(choice) && typeof choice.text === "string") {
        return [key, choice.text];
      }
      return null;
    });
    if (!entries.every(Boolean)) return null;
    const keys = new Set(entries.map(([key]) => key.toUpperCase()));
    const repaired = {};
    for (const [key, rawValue] of entries) {
      if (!/^[A-H]$/i.test(key)) {
        repaired[key] = rawValue;
        continue;
      }
      const nextKey = String.fromCharCode(key.toUpperCase().charCodeAt(0) + 1);
      const embeddedOption = new RegExp(`\\r?\\n\\s*${nextKey}(?:[.)]\\s+|\\s+)(?=\\S)`);
      const match = keys.has(nextKey) ? null : embeddedOption.exec(rawValue);
      if (!match) {
        repaired[key] = rawValue;
        continue;
      }
      repaired[key] = rawValue.slice(0, match.index).trimEnd();
      repaired[nextKey] = rawValue.slice(match.index + match[0].length).trim();
    }
    return repaired;
  } catch {
    return null;
  }
}

function multipleChoice(row, choices) {
  const entries = Array.isArray(choices)
    ? choices.map((option, index) => [String.fromCharCode(65 + index), option])
    : Object.entries(choices);
  const options = entries.map(([, option]) => cleanText(option));
  const picked = cleanText(row.correct_answer);
  const normalizeOption = (value) => cleanText(value)
    .replace(/^\s*(?:(?:option)\s+)?\(?[a-h]\)?[.)\s:-]+/i, "")
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, "")
    .trim()
    .toLocaleLowerCase();

  function findOptionIndex(answer) {
    const normalizedAnswer = answer.trim().toLocaleLowerCase();
    const keyedIndex = entries.findIndex(([key]) => String(key).trim().toLocaleLowerCase() === normalizedAnswer);
    if (keyedIndex >= 0) return keyedIndex;
    const exactMatch = options.findIndex((option) => option.trim().toLocaleLowerCase() === normalizedAnswer);
    if (exactMatch >= 0) return exactMatch;

    const letterMatch = normalizedAnswer.match(/^(?:(?:option)\s+)?\(?([a-h])\)?(?:[.)]|\s*:\s*|\s+-\s+|\s+.+)?$/i);
    if (letterMatch) {
      const letter = letterMatch[1].toUpperCase();
      const labeledIndex = options.findIndex((option) => new RegExp(`^\\s*\\(?${letter}\\)?[.)\\s:-]+`, "i").test(option));
      if (labeledIndex >= 0) return labeledIndex;
      const index = letter.charCodeAt(0) - 65;
      if (index < options.length) return index;
    }

    if (/^\(?\d+\)?(?:[.)])?$/.test(normalizedAnswer)) {
      const index = Number(normalizedAnswer.replace(/[().]/g, ""));
      if (index >= 1 && index <= options.length) return index - 1;
      if (index < options.length) return index;
    }

    const normalizedOptionAnswer = normalizeOption(answer);
    if (normalizedOptionAnswer) {
      const matchingOptions = options.flatMap((option, index) =>
        normalizeOption(option) === normalizedOptionAnswer ? [index] : [],
      );
      if (matchingOptions.length === 1) return matchingOptions[0];
    }
    return -1;
  }

  if (options.some((option) => !option)) return null;
  const exactAnswerIndex = findOptionIndex(picked);
  const selectedAnswers = exactAnswerIndex >= 0 ? [picked] : picked.split(/\s*,\s*/).filter(Boolean);
  const selectedIndexes = selectedAnswers.map(findOptionIndex);
  if (!selectedIndexes.length || selectedIndexes.some((index) => index < 0)) return null;
  return selectedIndexes.length > 1
    ? { type: "multi", options, answer: selectedIndexes }
    : { options, answer: selectedIndexes[0] };
}

function matchingQuestion(row, choices) {
  if (!Array.isArray(choices) && (!choices || typeof choices !== "object")) {
    return { problem: "matching question has no valid choices list" };
  }
  if (!Array.isArray(row.match_items)) return { problem: "matching question has no valid matching items list" };
  let answer;
  try {
    answer = JSON.parse(row.correct_answer);
  } catch {
    return { problem: "matching answer is not valid JSON" };
  }
  const options = (Array.isArray(choices) ? choices : Object.values(choices)).map(cleanText);
  const items = row.match_items.map(cleanText);
  if (options.length < 2 || options.some((choice) => !choice)) {
    return { problem: "matching question has fewer than two valid choices" };
  }
  if (items.length < 2 || items.some((item) => !item)) {
    return { problem: "matching question has fewer than two valid items" };
  }
  if (!Array.isArray(answer)) return { problem: "matching answer must be a list of choice indexes" };
  if (answer.length !== items.length) return { problem: "matching answer count does not match the item count" };
  if (answer.some((index) => !Number.isInteger(index) || index < 0 || index >= options.length)) {
    return { problem: "matching answer contains an invalid choice index" };
  }
  return { question: { type: "match", items, choices: options, answer } };
}

// "Header:\n+ item\n+ item\n\nHeader2:\n..."  ->  group matching (type the numbers)
function parseGroups(answerText, seed) {
  const lines = answerText.split("\n").map((line) => line.trim());
  const groups = [];
  lines.forEach((line, index) => {
    if (!line) return;
    const isBullet = /^\+\s*/.test(line);
    let nextNonEmpty = index + 1;
    while (nextNonEmpty < lines.length && !lines[nextNonEmpty]) nextNonEmpty += 1;
    const nextIsBullet = /^\+/.test(lines[nextNonEmpty] ?? "");
    const previousIsBlank = index === 0 || !lines[index - 1];
    const isHeader = !isBullet && (
      (/:$/.test(line) && line.length <= 60) ||
      (nextIsBullet && (groups.length === 0 || previousIsBlank))
    );
    if (isHeader) groups.push({ name: line.replace(/:$/, "").trim(), items: [] });
    else if (groups.length) {
      const currentGroup = groups[groups.length - 1];
      if (isBullet) currentGroup.items.push(line.replace(/^\+\s*/, "").trim());
      else if (currentGroup.items.length) {
        currentGroup.items[currentGroup.items.length - 1] += ` ${line}`;
      }
    }
  });
  if (groups.length < 2 || groups.some((g) => !g.items.length)) return null;
  const all = groups.flatMap((group, groupIndex) => group.items.map((item) => ({ key: item, item, groupIndex })));
  const shuffled = stableShuffle(all, seed);
  return {
    type: "match",
    items: shuffled.map((x) => x.item),
    choices: groups.map((g) => g.name),
    answer: shuffled.map((x) => x.groupIndex),
    matchStyle: "numbers",
  };
}

const REMADE_INTERFACE_DISTRACTORS = [
  // The source image contains these unused choices; the online answer key stores only the correct commands.
  "ip address 192.168.4.13 255.255.255.240",
  "ip address 209.165.202.129 255.255.255.252",
  "ip address 209.165.202.131 255.255.255.252",
];

function ipv4Number(address) {
  const octets = address.split(".").map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) return null;
  return octets.reduce((value, octet) => value * 256 + octet, 0);
}

function ipv4Prefix(mask) {
  const number = ipv4Number(mask);
  if (number === null) return null;
  const bits = number.toString(2).padStart(32, "0");
  return /^1*0*$/.test(bits) ? bits.indexOf("0") < 0 ? 32 : bits.indexOf("0") : null;
}

function interfaceRequirementMatch(row, body) {
  if (row.id !== 299 || body?.type !== "match" || body.items.length !== 4) return null;

  const prompt = cleanText(row.question_text);
  const requirementPattern = /^\s*([\w.-]+)\s+([\w/.-]+)\s+must be the (first|last) usable address on a \/(\d{1,2})\b/gim;
  const requirements = [...prompt.matchAll(requirementPattern)].map((match) => ({
    router: match[1],
    iface: match[2],
    position: match[3].toLowerCase(),
    prefix: Number(match[4]),
  }));
  const expectedTargets = ["DC-1 Gi1/0", "DC-1 Gi1/1", "DC-1 Gi1/2", "HQ-1 Gi1/3"];
  if (requirements.length !== expectedTargets.length ||
    requirements.some((requirement, index) => `${requirement.router} ${requirement.iface}` !== expectedTargets[index])) {
    return null;
  }

  const configs = body.items.map((item) => {
    const match = /^ip address\s+(\d{1,3}(?:\.\d{1,3}){3})\s+(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(item);
    if (!match) return null;
    const address = ipv4Number(match[1]);
    const prefix = ipv4Prefix(match[2]);
    return address === null || prefix === null ? null : { item, address, prefix };
  });
  const expectedConfigs = [
    "ip address 209.165.202.130 255.255.255.252",
    "ip address 192.168.4.9 255.255.255.248",
    "ip address 192.168.3.14 255.255.255.240",
    "ip address 192.168.3.14 255.255.255.248",
  ];
  if (configs.some((config) => !config) ||
    expectedConfigs.some((expected) => !configs.some((config) => config.item === expected))) return null;

  const matches = requirements.map((requirement) => configs.flatMap((config, index) => {
    if (config.prefix !== requirement.prefix) return [];
    const blockSize = 2 ** (32 - config.prefix);
    const network = Math.floor(config.address / blockSize) * blockSize;
    const broadcast = network + blockSize - 1;
    const target = requirement.position === "first" ? network + 1 : broadcast - 1;
    return config.address === target ? [index] : [];
  }));
  if (matches.some((indexes) => indexes.length !== 1) ||
    new Set(matches.map((indexes) => indexes[0])).size !== requirements.length) return null;

  const optionEntries = [...new Set([...configs.map((config) => config.item), ...REMADE_INTERFACE_DISTRACTORS])]
    .map((item) => ({ key: item, item }));
  const options = stableShuffle(optionEntries, String(row.id)).map((entry) => entry.item);
  const answer = matches.map((indexes) => options.indexOf(configs[indexes[0]].item));

  return {
    prompt: "Assign each IP address configuration to the router interface that meets its subnet requirement.",
    body: {
      type: "match",
      items: requirements.map(({ router, iface, position, prefix }) =>
        `${router} ${iface}: ${position} usable address on a /${prefix}`,
      ),
      choices: options,
      answer,
    },
  };
}

// "+ left: right" / "Step 1: text" / "1 – text" / "10.10.13.0 – 255.255.255.128"  ->  one-to-one matching
function parsePairs(answerText) {
  const lines = answerText
    .replace(/\s\+\s(?=[^:+\n]{1,150}:\s)/g, "\n") // several pairs run together on one line
    .split("\n")
    .map((line) => line.replace(/^\+\s*/, "").trim())
    .filter(Boolean);
  const pairs = lines.map((line) => {
    const match = /^(.{1,150}?)\s*(?::\s+|\s+:\s*|\s+[–-]\s+)(.+)$/.exec(line);
    return match ? { left: match[1].trim(), right: match[2].trim() } : null;
  });
  if (pairs.length < 2 || pairs.some((p) => !p)) return null;
  const lefts = pairs.map((p) => p.left);
  const rights = pairs.map((p) => p.right);
  if (new Set(lefts).size !== lefts.length || new Set(rights).size !== rights.length) return null;
  // Ordering questions ("1: switchport mode access", "2: ...") read better as "Step 1", "Step 2"
  const items = lefts.every((left) => /^\d+$/.test(left)) ? lefts.map((left) => `Step ${left}`) : lefts;
  return { type: "match", items, choices: rights, answer: rights.map((_, i) => i) };
}

function dragAndDrop(row) {
  const answerText = cleanText(row.correct_answer);
  if (!answerText) return null;
  return parseGroups(answerText, String(row.id)) ?? parsePairs(answerText);
}

function convertKnownQuestion(row, prompt) {
  const imageUrl = row.imageUrl ?? null;
  if (row.id === 1306) {
    return {
      prompt,
      imageUrl,
      type: "drag_drop",
      items: Array.from({ length: 4 }, () => "Broadcast address"),
      choices: [
        "10.1.255.254/24",
        "10.63.255.255/10",
        "172.16.255.39/29",
        "172.20.255.255/16",
        "192.168.1.10/24",
        "192.168.255.127/25",
      ],
      answer: [1, 2, 3, 5],
    };
  }
  if (row.id === 289) {
    const choices = [
      "Class-based weighted fair queuing",
      "Classification",
      "Congestion",
      "Policing",
      "Shaping",
    ];
    const pairs = [...cleanText(row.correct_answer).matchAll(
      /(?:^|\s)(Class-based weighted fair queuing|Classification|Congestion|Policing|Shaping):\s*/gi,
    )];
    if (
      pairs.length !== choices.length ||
      pairs.some((pair, index) => pair[1].toLocaleLowerCase() !== choices[index].toLocaleLowerCase())
    ) return null;
    const items = pairs.map((pair, index) =>
      cleanText(row.correct_answer).slice(
        pair.index + pair[0].length,
        pairs[index + 1]?.index ?? cleanText(row.correct_answer).length,
      ).trim(),
    );
    if (items.some((item) => !item)) return null;
    return { prompt, imageUrl, type: "drag_drop", items, choices, answer: choices.map((_, index) => index) };
  }
  if (row.id === 720) {
    const choices = parseChoices(row.choices);
    const options = Array.isArray(choices) ? choices : choices && Object.values(choices);
    if (!options || options.length < 2 || options.length > 8 || !options.every((option) => typeof option === "string" && option.trim())) {
      return null;
    }
    return { prompt, imageUrl, type: "single", options, answer: 0 };
  }
  if (row.id === 181) {
    const choices = ["Action", "Not used"];
    return {
      prompt,
      imageUrl,
      type: "match",
      items: [
        "Frames received from the attached segment are discarded",
        "BPDUs received are forwarded to the system module",
        "The port in the forwarding state responds to network management messages",
        "BPDUs received from the system module are processed and transmitted",
        "Switched frames received from other ports are advanced",
        "Frames received from the attached segment are processed",
      ],
      choices,
      answer: [0, 0, 1, 1, 0, 0],
      groupCounts: { Action: 4, "Not used": 2 },
      matchStyle: "numbers",
    };
  }
  if (row.id === 382) {
    return {
      prompt,
      imageUrl,
      type: "drag_drop",
      items: Array.from({ length: 4 }, () => "Feature"),
      choices: [
        "Uses the YAML language",
        "Executes modules via SSH by default",
        "Pushes configurations to the client",
        "Uses agents to manage hosts",
        "Requires clients to pull configurations from the server",
        "Operates without agents",
      ],
      answer: [0, 1, 2, 5],
    };
  }
  if (row.id === 608) {
    return {
      prompt,
      imageUrl,
      type: "drag_drop",
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
    };
  }
  if (row.id === 481) {
    return {
      prompt: "An engineer must configure a static network route between two networks so that host A communicates with host B. Assign the commands to the routers where they must be configured. Not all commands are used.",
      imageUrl,
      type: "drag_drop",
      items: [
        "ip route 10.10.13.0 255.255.255.128 10.10.10.1",
        "ip route 10.10.13.0 255.255.255.128 10.10.10.5",
        "ip route 10.10.13.10 255.255.255.255 10.10.10.1",
        "ip route 10.10.14.0 255.255.255.0 10.10.10.2",
        "ip route 10.10.14.0 255.255.255.0 10.10.10.6",
        "ip route 10.10.14.10 255.255.255.255 10.10.10.6",
      ],
      choices: ["R1", "R2", "R3", "Not used"],
      answer: [0, 1, 1, 2, 3, 3],
      dragDropMode: "items-to-choices",
    };
  }
  return null;
}

/** Converts one bank row. Returns { question } or { problem } (why it couldn't be converted). */
export function convertBankRow(row) {
  const rawText = cleanText(row.question_text);
  if (!rawText) return { problem: "question text is empty" };
  const knownQuestion = convertKnownQuestion(row, rawText);
  if (knownQuestion) {
    return {
      question: {
        ...knownQuestion,
        explanation: cleanText(row.explanation) || findCcnaQuestionExplanation(rawText),
        bankId: row.id,
        module: row.module,
        moduleNumber: null,
        moduleTitle: row.module,
        topic: row.topic,
        source: "question-bank",
      },
    };
  }
  const questionType = row.question_type || "single";
  const parsedOptionTable = questionType === "single" ? parseOptionTable(rawText) : null;
  const choices = parseChoices(row.choices);
  const choiceEntries = Array.isArray(choices)
    ? choices.map((choice, index) => [String.fromCharCode(65 + index), choice])
    : choices && typeof choices === "object"
      ? Object.entries(choices)
      : [];
  const hasOptionTableChoices = choiceEntries.length === 0 && Boolean(parsedOptionTable);
  const hasPlaceholderChoices = choiceEntries.length > 0 &&
    choiceEntries.every(([letter, choice]) =>
      /^[A-H]$/i.test(letter) && new RegExp(`^Option ${letter}$`, "i").test(String(choice).trim()),
    );
  const hasCompleteOptionTable = hasOptionTableChoices || (
    hasPlaceholderChoices &&
    parsedOptionTable &&
    choiceEntries.length === Object.keys(parsedOptionTable.options).length &&
    choiceEntries.every(([letter]) => Boolean(parsedOptionTable.options[letter]?.trim()))
  );
  const expandedChoices = hasCompleteOptionTable
    ? Array.isArray(choices)
      ? choiceEntries.map(([letter]) => parsedOptionTable.options[letter])
      : hasOptionTableChoices
        ? parsedOptionTable.options
        : Object.fromEntries(choiceEntries.map(([letter]) => [letter, parsedOptionTable.options[letter]]))
    : choices;
  const { prompt, exhibit } = hasCompleteOptionTable
    ? { prompt: parsedOptionTable.prompt }
    : splitPromptExhibit(rawText);
  let exhibitImage = row.imageUrl || undefined;
  const cleanedPrompt = removeDuplicateExhibitLeadIn(cleanText(prompt));
  let questionPrompt = cleanedPrompt;
  const hasSeparateExhibit = Boolean(exhibitImage || (exhibit && !/^Option [A-H]$/i.test(exhibit.trim())));
  questionPrompt = hasSeparateExhibit ? removeTrailingOptionExhibitLabel(questionPrompt) : questionPrompt;
  const exhibitUnavailable = mentionsExhibit(rawText) && !exhibit && !exhibitImage && !hasCompleteOptionTable;

  if (!["single", "match", "drag_drop", "click_boxes", "image"].includes(questionType)) {
    return { problem: `unsupported question type: ${questionType}` };
  }
  let body;
  if (["match", "drag_drop", "click_boxes", "image"].includes(questionType)) {
    const matching = matchingQuestion(row, choices);
    if (!matching.question) return { problem: matching.problem };
    body = { ...matching.question, type: questionType };
    if (questionType === "drag_drop" &&
      new Set(body.answer).size !== body.answer.length) {
      return { problem: "each drag-and-drop item must use a different answer choice" };
    }
    if (questionType === "click_boxes" &&
      (body.items.length !== body.choices.length ||
        new Set(body.answer).size !== body.answer.length)) {
      return { problem: "click-the-boxes questions must use each answer choice exactly once" };
    }
    if (questionType === "image") {
      if (!exhibitImage) return { problem: "image question has no available image" };
      if (body.choices.length > body.items.length) {
        return { problem: "image question has fewer items than answer groups" };
      }
      body.groupSizes = body.choices.map((_, choiceIndex) =>
        body.answer.filter((answer) => answer === choiceIndex).length,
      );
    }
  } else if (expandedChoices) {
    body = multipleChoice(row, expandedChoices);
    if (!body) return { problem: "correct answer does not match the available choices" };
  } else if (row.choices?.trim()) {
    return { problem: "choices are not valid JSON" };
  } else {
    body = dragAndDrop(row);
    if (!body) return { problem: "answer format is not a supported matching format" };
    if (exhibitImage) {
      body.type = "image";
      body.groupSizes = body.choices.map((_, choiceIndex) =>
        body.answer.filter((answer) => answer === choiceIndex).length,
      );
    } else {
      const isOneToOne = body.items.length === body.choices.length &&
        new Set(body.answer).size === body.answer.length;
      body.type = isOneToOne ? "drag_drop" : "match";
    }
  }
  const remadeQuestion = questionType === "single" ? interfaceRequirementMatch(row, body) : null;
  if (remadeQuestion) {
    body = remadeQuestion.body;
    questionPrompt = remadeQuestion.prompt;
    exhibitImage = undefined;
  } else if (
    row.id === 1307 &&
    body.type === "match" &&
    /access-list 107/i.test(exhibit ?? "") &&
    /questions\/ccna-question-1307\.png$/i.test(row.imageUrl ?? "")
  ) {
    // This image is a screenshot of the matching activity, now replaced by the interactive version.
    exhibitImage = undefined;
  }
  return {
    question: {
      prompt: questionPrompt,
      ...(exhibit && !(hasCompleteOptionTable || (hasSeparateExhibit && /^Option [A-H]$/i.test(exhibit.trim()))) ? { exhibit } : {}),
      ...(exhibitImage ? { exhibitImage } : {}),
      // This source screenshot repeats the matching options below the routing diagram.
      ...(row.id === 441 && /questions\/ccna-question-441\.png$/i.test(row.imageUrl ?? "")
        ? { exhibitImageCropTop: true }
        : {}),
      ...(row.id === 481 && /questions\/ccna-question-481\.png$/i.test(row.imageUrl ?? "")
        ? { hidePrompt: true }
        : {}),
      ...(row.id === 570 && /questions\/ccna-question-570\.png$/i.test(row.imageUrl ?? "")
        ? { hideExhibitImage: true }
        : {}),
      ...body,
      explanation: cleanText(row.explanation) || findCcnaQuestionExplanation(prompt),
      bankId: row.id,
      module: row.module,
      moduleNumber: null,
      moduleTitle: row.module,
      topic: row.topic,
      source: "question-bank",
      ...(exhibitUnavailable ? { exhibitUnavailable: true } : {}),
    },
  };
}

/** Converts the whole bank: the usable questions, plus a list of rows that couldn't be converted. */
export function convertBank(rows) {
  const questions = [];
  const problems = [];
  for (const row of rows) {
    const { question, problem } = convertBankRow(row);
    if (question) questions.push(question);
    else problems.push({ id: row.id, module: row.module, problem, text: cleanText(row.question_text).slice(0, 160) });
  }
  return { questions, problems };
}
