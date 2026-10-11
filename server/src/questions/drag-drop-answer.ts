// Reads the drag-and-drop questions imported from the 9tut PDFs. Their answer is stored as text in
// correct_answer (and choices is empty), in one of two shapes:
//   groups: "TCP:\n+ SMTP\n+ HTTP\n\nUDP:\n+ DNS"       -> several items share a few boxes ("type the numbers")
//   pairs:  "+ show snmp group: displays the ..."        -> each item has its own box ("click to place")
// The same text always produces the same items/choices/answer, so a submitted exam can be re-graded
// from the database row alone.

export interface DragDropAnswer {
  items: string[];
  choices: string[];
  answer: number[]; // choice index for each item
}

// Text that went through the wrong character encoding somewhere ("â€“" should be "–")
const MOJIBAKE: Array<[string, string]> = [
  ['â€“', '–'], ['â€”', '—'], ['â€™', '’'], ['â€˜', '‘'], ['â€œ', '“'], ['â€\u009d', '”'], ['â€³', '”'],
  ['â€¦', '…'], ['â€¢', '•'], ['Â ', ' '], ['Â', ''],
];

function cleanText(text: string): string {
  let out = text;
  for (const [bad, good] of MOJIBAKE) out = out.split(bad).join(good);
  // Website text that got copied in with the questions ("Premium Member: You can test your knowledge ... (via HTML).")
  out = out.replace(/\+?\s*\w*mium Member:?\s*(?:You can test your knowledge[^\n]*)?/gi, '');
  return out
    .split('\n')
    // leftovers from the source document, e.g. "===== New Questions (added on 13th-Feb-2022) ====="
    .filter((line) => !/^\s*=+.*=+\s*$/.test(line) && !/New Questions \(added on/i.test(line))
    .join('\n')
    .trim();
}

// Same mixed-up order every time for the same question, so items aren't listed in answer order
function stableShuffle<T extends { key: string }>(list: T[], seed: string): T[] {
  const hash = (text: string) => [...text].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);
  return [...list].sort((a, b) => hash(seed + a.key) - hash(seed + b.key));
}

function parseGroups(answerText: string, seed: string): DragDropAnswer | null {
  const lines = answerText.split('\n').map((line) => line.trim()).filter(Boolean);
  const groups: Array<{ name: string; items: string[] }> = [];
  lines.forEach((line, index) => {
    const isBullet = /^\+\s*/.test(line);
    const nextIsBullet = /^\+/.test(lines[index + 1] ?? '');
    const isHeader = !isBullet && ((/:$/.test(line) && line.length <= 60) || nextIsBullet);
    if (isHeader) groups.push({ name: line.replace(/:$/, '').trim(), items: [] });
    else if (groups.length) groups[groups.length - 1].items.push(line.replace(/^\+\s*/, '').trim());
  });
  if (groups.length < 2 || groups.some((group) => !group.items.length)) return null;
  const all = groups.flatMap((group, groupIndex) => group.items.map((item) => ({ key: item, item, groupIndex })));
  const shuffled = stableShuffle(all, seed);
  return {
    items: shuffled.map((x) => x.item),
    choices: groups.map((group) => group.name),
    answer: shuffled.map((x) => x.groupIndex),
  };
}

function parsePairs(answerText: string): DragDropAnswer | null {
  const lines = answerText
    .replace(/\s\+\s(?=[^:+\n]{1,150}:\s)/g, '\n') // several pairs run together on one line
    .split('\n')
    .map((line) => line.replace(/^\+\s*/, '').trim())
    .filter(Boolean);
  const pairs = lines.map((line) => {
    const match = /^(.{1,150}?)\s*(?::\s+|\s+:\s*|\s+[–-]\s+)(.+)$/.exec(line);
    return match ? { left: match[1].trim(), right: match[2].trim() } : null;
  });
  if (pairs.length < 2 || pairs.some((pair) => !pair)) return null;
  const lefts = pairs.map((pair) => pair!.left);
  const rights = pairs.map((pair) => pair!.right);
  if (new Set(lefts).size !== lefts.length || new Set(rights).size !== rights.length) return null;
  return { items: lefts, choices: rights, answer: rights.map((_, index) => index) };
}

/** Turns a 9tut drag-and-drop answer into a matching question, or null if it can't be read safely. */
export function parseDragDropAnswer(correctAnswer: string | null | undefined, questionId: number): DragDropAnswer | null {
  const answerText = cleanText(String(correctAnswer ?? ''));
  if (!answerText) return null;
  const parsed = parseGroups(answerText, String(questionId)) ?? parsePairs(answerText);
  if (!parsed) return null;
  // Same limits the exam screens support (saved exam attempts allow up to 8 items and 8 boxes)
  if (parsed.items.length < 2 || parsed.items.length > 8 || parsed.choices.length < 2 || parsed.choices.length > 8) return null;
  // Ordering questions ("1: switchport mode access", "2: ...") read better as "Step 1", "Step 2"
  if (parsed.items.every((item) => /^\d+$/.test(item))) {
    return { ...parsed, items: parsed.items.map((item) => `Step ${item}`) };
  }
  return parsed;
}

/** "Type the numbers" style: several items share each box. */
export function isGroupMatch(question: { items: string[]; choices: string[] }): boolean {
  return question.choices.length < question.items.length;
}
