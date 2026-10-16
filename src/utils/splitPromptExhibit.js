import { DEVICE_LABEL, looksLikeCode } from "./answerTextStyle";
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
const FORMATTED_OPTION_COLUMNS = /^\s*Option [A-H]\s*:?[ \t]{2,}Option [A-H]\b/im;
const INLINE_CODE_START = [
  /\bOutput from R1\b/i,
  /\bSW\d+#/i,
  /\b[A-Za-z0-9][\w.-]*(?:\([^)]*\))?#\s*(?:show|config|conf|ip|interface|router|enable|copy|ping|traceroute|access-list|line|username|hostname|vtp|spanning|switchport|no )/i,
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

  // A device name just above the commands ("R1") is the commands' heading, so it goes with them
  const beforeLines = prompt.slice(0, start).trimEnd().split("\n");
  const label = beforeLines.length > 1 && DEVICE_LABEL.test(beforeLines[beforeLines.length - 1]) ? beforeLines.pop().trim() : "";
  const before = beforeLines.join("\n").trim();
  const output = [label, prompt.slice(start).trim()].filter(Boolean).join("\n\n");
  let questionStart = -1;
  for (const match of output.matchAll(TRAILING_QUESTION)) {
    if (match.index > 0) questionStart = match.index;
  }
  if (questionStart < 0) return { prompt: before, exhibit: output };

  let glued = output.slice(0, questionStart).trimEnd();
  let rest = output.slice(questionStart).trim();
  // The question can start mid-sentence ("... at IP address 10.0.0.1. Through which router ...?"):
  // bring the start of that sentence along with it
  // (a capital "Which" after printout starts its own sentence; the line before it stays in the printout)
  if (glued && !/[.?!:]$/.test(glued) && /^[a-z]/.test(rest)) {
    let cut = -1;
    for (const match of glued.matchAll(/[.?!:](?=\s|[A-Z])|\n/g)) cut = match.index;
    rest = `${glued.slice(cut + 1).trim()} ${rest}`;
    glued = glued.slice(0, cut + 1).trimEnd();
  } else {
    rest = capitalizeQuestion(rest);
  }
  const blocks = glued.split(/\n\s*\n/);
  // Plain sentences right before the question ("... routers as shown.", "must meet these requirements:")
  // belong with the question, not in the printout
  const isLeadIn = (block) => !isCode(block) && (isQuestionProse(block) || /^[A-Z][^\n]{40,}:\s*$/.test(block.trim()));
  const leads = [];
  while (blocks.length > 1 && isLeadIn(blocks[blocks.length - 1])) leads.unshift(tidyProse(blocks.pop()));
  const lead = leads.join(" ");
  const exhibit = blocks.join("\n\n").trim();
  if (!exhibit) return null;
  return { prompt: `${before} ${lead} ${rest}`.replace(/\s+/g, " ").trim(), exhibit };
}

function splitPromptExhibitRaw(prompt) {
  if (typeof prompt !== "string") return { prompt };

  const structured = splitStructuredExhibit(prompt);
  if (structured) return structured;
  if (FORMATTED_OPTION_COLUMNS.test(prompt)) return { prompt };

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

// Some questions put their instruction after the printout ("... Gig0/2\n\nA packet is destined for ...
// Drag and drop ..."). Move such a closing paragraph back up into the question text.
function isTrailingInstruction(block) {
  const text = block.trim();
  if (!text || /^\s/.test(block) || CODE_HINTS.some((re) => re.test(text))) return false;
  return /[.?)]$/.test(text) &&
    text.split(/\s+/).length >= 8 &&
    /\b(?:Drag|Which|What|How|Why|When|Where|must|should|Refer)\b/i.test(text);
}

export function splitPromptExhibit(prompt) {
  const result = splitPromptExhibitRaw(prompt);
  if (!result.exhibit) return splitCommandRun(result.prompt) ?? result;
  const blocks = result.exhibit.split(/\n\s*\n/);
  const last = blocks[blocks.length - 1];
  // The question line can also be glued straight onto the last line of output (no blank line before it)
  const lastLines = last.split("\n");
  const lastLine = lastLines[lastLines.length - 1];
  if (lastLines.length > 1 && /\?\s*$/.test(lastLine) && isTrailingInstruction(lastLine)) {
    return {
      prompt: [result.prompt, lastLine.trim()].filter(Boolean).join(" "),
      exhibit: [...blocks.slice(0, -1), lastLines.slice(0, -1).join("\n")].join("\n\n").replace(/\s+$/, ""),
    };
  }
  if (blocks.length < 2 || !isTrailingInstruction(last)) return result;
  const instruction = last.replace(/\s*\n\s*/g, " ").trim();
  return {
    prompt: [result.prompt, instruction].filter(Boolean).join(" "),
    exhibit: blocks.slice(0, -1).join("\n\n").replace(/\s+$/, ""),
  };
}

export function removeDuplicateExhibitLeadIn(prompt) {
  return String(prompt ?? "")
    .replace(/^\s*Refer to (?:the )?exhibit\.?\s*(?:\r?\n\s*)+(Refer to (?:the )?exhibit\.?)/i, "$1")
    .replace(/^(Refer to (?:the )?exhibit\.)(?:[ \t]+)(?=\S)/i, "$1\n\n")
    .trim();
}

export function removeTrailingOptionExhibitLabel(prompt) {
  return String(prompt ?? "")
    .replace(/\n\s*\nOption [A-H]\s*$/i, "")
    .trim();
}

// Device commands typed straight under the question with no blank line around them
// ("How does SW2 interact ...?\nSW2\nvtp domain cisco\n..."): move that run of lines into the exhibit.
function splitCommandRun(text) {
  const lines = String(text ?? "").split("\n");
  if (lines.length < 3) return null;
  let start = -1;
  let end = -1;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const continuesCommand = start !== -1 && end === index - 1 &&
      // a command wrapped onto the next line, e.g. "switchport trunk encapsulation" / "dot1q"
      /^\S+(?:\s\S+){0,2}$/.test(line) && !/[.?]$/.test(line);
    // A device name ("SW2") heading the commands belongs with them
    if (line && (looksLikeCode(line) || DEVICE_LABEL.test(line) || continuesCommand)) {
      if (start === -1) start = index;
      end = index;
    } else if (start !== -1) {
      break;
    }
  }
  if (start === -1 || end - start < 1) return null;
  const before = lines.slice(0, start).join(" ").replace(/\s+/g, " ").trim();
  const after = lines.slice(end + 1).join(" ").replace(/\s+/g, " ").trim();
  if (!before && !after) return null;
  return { prompt: [before, after].filter(Boolean).join(" "), exhibit: lines.slice(start, end + 1).join("\n") };
}
