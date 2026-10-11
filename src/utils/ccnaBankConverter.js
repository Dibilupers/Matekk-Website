// Turns rows from the CCNA question bank (the database "Questions" table) into exam questions.
//   - Multiple choice: choices '{"A": "...", "B": "..."}' + correct_answer "B" or "B,D"
//   - Drag and drop:   no choices; correct_answer written out, either as pairs
//                      ("+ show snmp group: displays the SNMP security model") or as groups
//                      ("TCP:\n+ SMTP\n+ HTTP\n\nUDP:\n+ DNS") — become matching questions
// Questions that can't be turned into something gradable are reported, not guessed.
import { splitPromptExhibit } from "./splitPromptExhibit";
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
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function multipleChoice(row, choices) {
  const letters = Object.keys(choices);
  const picked = cleanText(row.correct_answer).split(/\s*,\s*/).filter(Boolean);
  const indexes = picked.map((letter) => letters.indexOf(letter));
  if (!indexes.length || indexes.some((i) => i < 0)) return null;
  const options = letters.map((letter) => cleanText(choices[letter]));
  return indexes.length > 1
    ? { type: "multi", options, answer: indexes }
    : { options, answer: indexes[0] };
}

// "Header:\n+ item\n+ item\n\nHeader2:\n..."  ->  group matching (type the numbers)
function parseGroups(answerText, seed) {
  const lines = answerText.split("\n").map((line) => line.trim()).filter(Boolean);
  const groups = [];
  lines.forEach((line, index) => {
    const isBullet = /^\+\s*/.test(line);
    const nextIsBullet = /^\+/.test(lines[index + 1] ?? "");
    const isHeader = !isBullet && (/:$/.test(line) && line.length <= 60 || nextIsBullet);
    if (isHeader) groups.push({ name: line.replace(/:$/, "").trim(), items: [] });
    else if (groups.length) groups[groups.length - 1].items.push(line.replace(/^\+\s*/, "").trim());
  });
  if (groups.length < 2 || groups.some((g) => !g.items.length)) return null;
  const all = groups.flatMap((group, groupIndex) => group.items.map((item) => ({ key: item, item, groupIndex })));
  const shuffled = stableShuffle(all, seed);
  return {
    type: "match",
    items: shuffled.map((x) => x.item),
    choices: groups.map((g) => g.name),
    answer: shuffled.map((x) => x.groupIndex),
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

/** Converts one bank row. Returns { question } or { problem } (why it couldn't be converted). */
export function convertBankRow(row) {
  const rawText = cleanText(row.question_text);
  const { prompt, exhibit } = splitPromptExhibit(rawText);
  const exhibitImage = row.imageUrl || undefined;
  if (mentionsExhibit(rawText) && !exhibit && !exhibitImage) {
    return { problem: "referenced exhibit has no available text or image" };
  }

  const choices = parseChoices(row.choices);
  const body = choices ? multipleChoice(row, choices) : dragAndDrop(row);
  if (!body) return { problem: choices ? "answer letter not among the choices" : "drag-and-drop answer could not be read" };
  return {
    question: {
      prompt: cleanText(prompt),
      ...(exhibit ? { exhibit } : {}),
      ...(exhibitImage ? { exhibitImage } : {}),
      ...body,
      explanation: cleanText(row.explanation) || findCcnaQuestionExplanation(prompt),
      bankId: row.id,
      moduleNumber: null,
      moduleTitle: row.module,
      source: "question-bank",
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
