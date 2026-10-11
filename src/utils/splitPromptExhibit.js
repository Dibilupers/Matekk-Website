// The legacy CCNA questions were pulled out of a PDF, so router output / configs sit inside the
// question text. This separates them: prose stays as the question, device output becomes the
// `exhibit` (shown in the dark monospace box, keeping its line breaks and column spacing).

const CODE_HINTS = [
  /[#>]\s*(show|config|conf|ip|interface|router|enable|copy|ping|traceroute|debug|access-list|line|username|hostname|vtp|spanning|switchport|no )/i,
  /\(config[^)]*\)#/,
  /^\s*(interface|switchport|ip |ipv6 |router |network |access-list|line |vtp |spanning-tree|hostname|username|aaa |encapsulation|description|shutdown|no |!|%|Gateway of last resort|Codes:|Capability Codes|[CSORDBLI*]{1,3}\s+\d|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/m,
  / {3,}\S/, // column-aligned output
  /^\s*\S+:\s*[0-9A-Fa-f]{2,4}[:.][0-9A-Fa-f]{2}/m, // MAC address lists
];

// A plain question sentence that comes after the output (e.g. "Which two commands ...?")
const QUESTION_START = /^\s*(Which|What|How|Why|When|Where|Drag|An? |The |If |After |Refer)\b/;

const EXHIBIT_CUE = /\brefer\s+to\s+(?:the\s+)?exhibit\b\s*\.?/i;
const INLINE_CODE_START = [
  /^\s*Option A[ \t]{2,}Option B\b/im,
  /\bOutput from R1\b/i,
  /\bSW\d+#/i,
  /\b[A-Za-z][\w.-]*(?:\([^)]*\))?#\s*(?:show|config|conf|ip|interface|router|enable|copy|ping|traceroute|access-list|line|username|hostname|vtp|spanning|switchport|no )/i,
  /\b(?:RIP|OSPF|EIGRP)\s+\d{1,3}(?:\.\d+){1,3}\/\d+/i,
  /\bSW\d+\s*=\s*\d+/i,
  /\bMacOs\$\s*ifconfig\b/i,
  /\bPort Security\s*:/i,
  /\bDesignated Router \(ID\)/i,
  /\bIBGP route\b/i,
  /\binterface\s+GigabitEthernet\d/i,
];
const TRAILING_QUESTION = /\b(?:Which|What|How|Why|When|Where)\b[^?]{0,500}\?(?:\s*\([^)]*\))?\s*$/gi;

function isCode(block) {
  if (!block.trim()) return false;
  if (/^[{[]/.test(block.trim())) return true;
  if (/^[^\n?]{1,60}:\s*$/.test(block.trim())) return true; // a heading for the output, e.g. "Configured interfaces:"
  if (/^\s/.test(block) && !QUESTION_START.test(block)) return true;
  return CODE_HINTS.some((re) => re.test(block));
}

function isQuestionProse(block) {
  if (CODE_HINTS.some((re) => re.test(block))) return false;
  // A question-style opening, or an ordinary sentence (several words, ends with . or ?, not indented)
  const isSentence = !/^\s/.test(block) && /[.?]\s*$/.test(block) && block.trim().split(/\s+/).length >= 6;
  return QUESTION_START.test(block) || isSentence;
}

const tidyProse = (block) => block.replace(/\s*\n\s*/g, " ").trim();
const capitalizeQuestion = (question) =>
  question.replace(/^(which|what|how|why|when|where)\b/i, (word) => word[0].toUpperCase() + word.slice(1));

function splitStructuredExhibit(prompt) {
  const cue = EXHIBIT_CUE.exec(prompt);
  if (!cue) return null;

  const afterCue = cue.index + cue[0].length;
  const offset = prompt.slice(afterCue).search(/\S/);
  if (offset < 0) return null;
  const start = afterCue + offset;
  const opener = prompt[start];
  if (opener !== "{" && opener !== "[") return null;

  const stack = [];
  let inString = false;
  let escaped = false;
  let end = -1;
  for (let index = start; index < prompt.length; index += 1) {
    const character = prompt[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{" || character === "[") stack.push(character);
    else if (character === "}" || character === "]") {
      const expected = character === "}" ? "{" : "[";
      if (stack.pop() !== expected) return null;
      if (!stack.length) {
        end = index + 1;
        break;
      }
    }
  }
  if (end < 0) return null;

  const exhibit = prompt.slice(start, end).trim();
  const remainder = prompt.slice(end).trim();
  const question = remainder.match(/^(?:Which|What|How|Why|When|Where)\b/i);
  if (remainder && !question) return null;

  return {
    prompt: `${prompt.slice(0, start)} ${capitalizeQuestion(remainder)}`.replace(/\s+/g, " ").trim(),
    exhibit,
  };
}

function splitInlineCodeExhibit(prompt) {
  let start = -1;
  for (const pattern of INLINE_CODE_START) {
    const match = pattern.exec(prompt);
    if (match && (start < 0 || match.index < start)) start = match.index;
  }
  if (start < 0) return null;

  const before = prompt.slice(0, start).trim();
  const output = prompt.slice(start).trim();
  let questionStart = -1;
  for (const match of output.matchAll(TRAILING_QUESTION)) {
    if (match.index > 0) questionStart = match.index;
  }
  if (questionStart < 0) return { prompt: before, exhibit: output };

  const question = capitalizeQuestion(output.slice(questionStart).trim());
  const exhibit = output.slice(0, questionStart).trim();
  if (!exhibit) return null;
  return { prompt: `${before} ${question}`.replace(/\s+/g, " ").trim(), exhibit };
}

export function splitPromptExhibit(prompt) {
  if (typeof prompt !== "string") return { prompt };

  const structured = splitStructuredExhibit(prompt);
  if (structured) return structured;

  const inlineCode = splitInlineCodeExhibit(prompt);
  if (inlineCode) return inlineCode;

  if (!prompt.includes("\n\n")) return { prompt };
  const blocks = prompt.split(/\n\s*\n/);
  const prose = [];
  const code = [];
  let inOutput = false;
  blocks.forEach((block, index) => {
    // The first block is always question text (e.g. "Refer to the exhibit. ...").
    // Once device output starts, later blocks stay part of it (output often has blank lines inside)
    // unless a block is clearly a question sentence.
    if (index > 0 && (isCode(block) || (inOutput && !isQuestionProse(block)))) {
      inOutput = true;
      code.push(block.replace(/^\n+|\s+$/g, ""));
    } else {
      prose.push(tidyProse(block));
    }
  });
  if (!code.length) return { prompt };
  return { prompt: prose.filter(Boolean).join(" "), exhibit: code.join("\n\n") };
}
