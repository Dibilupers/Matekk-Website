import { useEffect } from "react";

// Gives page headings a quick "typed in" reveal (left to right, in small steps) when they scroll into view.
// It only sets a data attribute that CSS animates, so React's own markup is never changed.
// Headings that already type themselves (.typewriter-caret) or opt out with data-no-type are skipped.
export default function useHeadingTypeIn(pathname) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const root = document.querySelector(".page-transition");
    if (!root || !("IntersectionObserver" in window)) return undefined;

    const headings = [...root.querySelectorAll("h1, h2, h3")].filter(
      (el) => !el.closest("[data-no-type]") && !el.querySelector(".typewriter-caret") && !el.classList.contains("typewriter-caret") && el.textContent.trim(),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-type-in", "run");
          observer.unobserve(entry.target);
        }
      },
      // Start just before a heading scrolls on screen, so it never shows fully and then blinks out
      { rootMargin: "0px 0px 12% 0px" },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
}
