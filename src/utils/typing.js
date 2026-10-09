// Helpers for TypewriterText (kept separate so that component file only exports components).

/** Collapses the line breaks/indentation that multi-line JSX strings carry (the browser hides them anyway). */
export function cleanTypingText(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

/** Milliseconds per letter, sped up for long text so typing never exceeds maxDuration. */
export function typingSpeed(text, speed, maxDuration = Infinity) {
  const length = cleanTypingText(text).length || 1;
  return Math.min(speed, maxDuration / length);
}

