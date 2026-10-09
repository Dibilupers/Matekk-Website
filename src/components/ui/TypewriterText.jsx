import { useEffect, useState } from "react";
import { cleanTypingText, typingSpeed } from "../../utils/typing";

/**
 * Types text out letter by letter with a blinking caret, like the intro on the Courses page.
 * The full text is laid out from the start (untyped letters invisible), so nothing moves or re-wraps while it types.
 *
 * @param {string} text          - Text to type (anything that isn't a string is shown as-is)
 * @param {{ text: string, className?: string }[]} segments - Or several parts with their own styling
 *                                 (e.g. a blue highlighted phrase), typed one after another
 * @param {number} speed         - Milliseconds per letter
 * @param {number} startDelay    - Milliseconds to wait before typing starts
 * @param {number} maxDuration   - Long text types faster so it never takes longer than this
 * @param {boolean} loop         - Keep going: type, hold, backspace quickly, type again
 * @param {number} holdMs        - (loop) How long the full text stays before it's erased
 * @param {number} eraseDuration - (loop) How long the backspacing takes in total
 * @param {number} pauseMs       - (loop) Gap between erasing and typing again
 */
export default function TypewriterText({
  text: rawText,
  segments: rawSegments,
  speed: baseSpeed = 18,
  startDelay = 0,
  maxDuration = Infinity,
  loop = false,
  holdMs = 4000,
  eraseDuration = 500,
  pauseMs = 300,
}) {
  const isString = typeof rawText === "string";
  const segments = rawSegments ?? (isString ? [{ text: cleanTypingText(rawText) }] : null);
  const fullText = segments ? segments.map((part) => part.text).join("") : "";
  const speed = typingSpeed(fullText, baseSpeed, maxDuration);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!fullText) return undefined;
    const total = fullText.length;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eraseStep = Math.max(eraseDuration / total, 4);
    let index = 0;
    let timeoutId;

    function typeNext() {
      index += 1;
      setCount(index);
      if (index < total) timeoutId = window.setTimeout(typeNext, speed);
      else if (loop) timeoutId = window.setTimeout(eraseNext, holdMs);
    }

    function eraseNext() {
      index -= 1;
      setCount(index);
      if (index > 0) timeoutId = window.setTimeout(eraseNext, eraseStep);
      else timeoutId = window.setTimeout(typeNext, pauseMs);
    }

    timeoutId = window.setTimeout(() => {
      if (reduceMotion) setCount(total);
      else typeNext();
    }, reduceMotion ? 0 : startDelay);
    return () => {
      window.clearTimeout(timeoutId);
      setCount(0);
    };
  }, [fullText, speed, startDelay, loop, holdMs, eraseDuration, pauseMs]);

  if (!segments) return rawText;

  // Looping text keeps its caret blinking; one-off text drops the caret once finished
  const showCaret = loop || (count > 0 && count < fullText.length);
  // Where each part starts within the full text
  const starts = segments.map((_, i) => segments.slice(0, i).reduce((sum, part) => sum + part.text.length, 0));
  return (
    <>
      {/* Screen readers get the full text once; the typing layer is visual only */}
      <span className="sr-only">{fullText}</span>
      {/* The whole sentence is laid out from the start, with the untyped part invisible,
          so every word already sits where it will end up and nothing re-wraps while typing */}
      <span aria-hidden="true">
        {segments.map((part, i) => {
          const start = starts[i];
          const end = start + part.text.length;
          const typed = Math.min(Math.max(count - start, 0), part.text.length);
          // The caret sits in whichever part the typing has reached
          const caretHere = showCaret && (count > start || i === 0) && (count <= end || i === segments.length - 1);
          return (
            <span key={i} className={part.className}>
              <span className={caretHere ? "typewriter-caret typewriter-caret-inplace" : ""}>{part.text.slice(0, typed)}</span>
              <span className="text-transparent text-shadow-none">{part.text.slice(typed)}</span>
            </span>
          );
        })}
      </span>
    </>
  );
}
