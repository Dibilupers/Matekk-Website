import { useEffect, useState } from "react";
import { testimonials } from "../data/testimonials";

// How many recent passers to cycle through, and how long each one shows
const PASSER_COUNT = 8;
const ROTATE_MS = 6000;
const FADE_MS = 300;

// testimonials.js is ordered newest first; only entries like "CCNA Passer - Jan. 2026"
const recentPassers = testimonials
  .filter((t) => / Passer/.test(t.course) && t.image && t.link)
  .slice(0, PASSER_COUNT);

// "Adrian Christopher Chua" -> "Adrian Christopher C."
function shortName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  return `${parts.slice(0, -1).join(" ")} ${parts[parts.length - 1][0]}.`;
}

// "CCNP ENCOR Passer - Feb. 2026" -> { cert: "CCNP ENCOR", date: "Feb. 2026" }
function parseCourse(course) {
  const [cert, date] = course.split(/\s+Passer\s*-?\s*/);
  return { cert: cert.trim(), date: (date ?? "").trim() };
}

/**
 * Hero card that cycles through the most recent certification passers.
 * Pauses while hovered so visitors can click "View Certification".
 */
export default function PasserSpotlight({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || recentPassers.length < 2) return undefined;
    let fadeTimer;
    const timer = window.setInterval(() => {
      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % recentPassers.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(fadeTimer);
    };
  }, [paused]);

  if (recentPassers.length === 0) return null;

  const passer = recentPassers[index];
  const { cert, date } = parseCourse(passer.course);
  const name = shortName(passer.name);
  const isNewest = index === 0;

  return (
    <div
      className={className}
      // Pausing cancels a fade in progress, so make sure the passer is shown again
      onMouseEnter={() => { setPaused(true); setVisible(true); }}
      onMouseLeave={() => { setPaused(false); setVisible(true); }}
    >
      <div
        className={`flex items-start gap-3 w-full transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        aria-live="polite"
      >
        <img
          src={passer.image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[#1775EE] truncate font-bold">{name}</p>
          <p className="text-xs">
            {isNewest ? "just passed" : "passed"} the {cert} certification!
            {!isNewest && date && <span className="text-gray-500"> ({date})</span>}
          </p>
        </div>
      </div>
      <a
        href={passer.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center cursor-pointer w-full rounded-full transition-all duration-300 active:scale-90 text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] bg-[#1775EE] text-white shadow-lg hover:bg-[#0062E0] px-6 py-3 md:py-2 md:px-4"
      >
        View Certification
      </a>
    </div>
  );
}
