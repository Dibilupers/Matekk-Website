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

function isCode(block) {
  if (!block.trim()) return false;
  if (/^[^\n?]{1,60}:\s*$/.test(block.trim())) return true; // a heading for the output, e.g. "Configured interfaces:"
  if (/^\s/.test(block) && !QUESTION_START.test(block)) return true;
  return CODE_HINTS.some((re) => re.test(block));
}

function isQuestionProse(block) {
  return QUESTION_START.test(block) && !CODE_HINTS.some((re) => re.test(block));
}

const tidyProse = (block) => block.replace(/\s*\n\s*/g, " ").trim();

export function splitPromptExhibit(prompt) {
  if (typeof prompt !== "string" || !prompt.includes("\n\n")) return { prompt };
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
