import { useState, useEffect, useRef, useCallback } from "react";
import michaelImage from "../../assets/MichaelLewisAballos.png";
import clydeImage from "../../assets/ClydeNelsonRocillor.png";

// ─── Constants ────────────────────────────────────────────────────────────────
const AUTO_INTERVAL  = 4000; // ms between auto-advances
const SLIDE_DURATION = 2000; // ms for the slide/card transition

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: "Michael Lewis Bullas Abalos",
    title: "CCNA Passer – Jan. 2026",
    avatar:
      michaelImage,
    review:
      "I passed my CCNA thanks to Converge Training and I.T. Services. Their complete materials, hands-on training, and supportive staff helped me gain the confidence to succeed. Special thanks to Engr. Mark Anthony Melendres and the entire Converge team — enrolling here is truly worth the value.",
  },
  {
    id: 2,
    name: "Clyde Nelson Racillor",
    title: "CCNA Passer – Dec. 2025",
    avatar:
      clydeImage,
    review:
      "Just recently passed CCNA 200-301. Sa mga balak mag-review for CCNA exam, highly recommended dito. Hindi ka pabababayan ni Engr. Melendres. From Networking Basics to Switching and Routing hanggang Network Security and Automation, G6E2 yan lahat.",
  },
  {
    id: 3,
    name: "Eugine Tomas",
    title: "CCNA Passer – Oct. 2025",
    avatar:
      clydeImage,
    review:
      "I just passed the CCNA exam. Big thanks to Converge Training and I.T. Services for excellent laboratory hands-on training and support throughout my journey. I highly recommend this training services for those looking for a supportive way to prepare for the exams.",
  },
];

const N = testimonials.length;
const wrap = (idx) => ((idx % N) + N) % N;

// ─── useAutoAdvance hook ───────────────────────────────────────────────────────
// Calls `onTick` every `interval` ms. Calling `reset()` restarts the timer.
function useAutoAdvance(onTick, interval) {
  const timerRef   = useRef(null);
  const onTickRef  = useRef(onTick);
  onTickRef.current = onTick;

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => onTickRef.current(), interval);
  }, [interval]);

  useEffect(() => {
    reset();
    return () => clearInterval(timerRef.current);
  }, [reset]);

  return reset;
}

// ─── Dot Button ───────────────────────────────────────────────────────────────
function Dot({ active, onClick, label }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        padding: 0,
        backgroundColor: active ? "#2563eb" : "#d1d5db",
        transform: active ? "scale(1.25)" : "scale(1)",
        transition: "background-color 0.3s, transform 0.3s",
      }}
    />
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
// `cardPadding` is passed as an inline style string so callers can tune it
// per breakpoint without touching Tailwind config.
function TestimonialCard({
  item,
  isActive,
  isHovered,
  isLarge,
  cardPadding,   // e.g. "1.25rem" | "1.5rem" | "2rem"
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const showActive   = isActive || isHovered;
  const quoteClr     = showActive ? "rgba(255,255,255,0.55)" : "rgba(59,130,246,0.45)";
  const nameClr      = showActive ? "#fff"    : "#111827";
  const subClr       = showActive ? "#bfdbfe" : "#9ca3af";
  const bodyClr      = showActive ? "#dbeafe" : "#4b5563";
  const avatarBorder = showActive ? "#93c5fd" : "#dbeafe";
  const textSm       = isLarge ? "text-base" : "text-sm";
  const textXs       = isLarge ? "text-sm"   : "text-xs";
  const avatarSz     = isLarge ? "w-14 h-14" : "w-12 h-12";
  const pad          = cardPadding ?? (isLarge ? "2rem" : "1.5rem");

  // ── Transition timing ──────────────────────────────────────────────────────
  // Activating  → foreground turns light quickly (300ms), then background
  //               starts after a short delay (200ms) and takes full duration.
  // Deactivating→ background fades out first (starts immediately, full duration),
  //               foreground returns to dark after a delay once bg is mostly gone.
  const FG_DURATION   = 300;                        // ms — foreground colour change
  const BG_DURATION   = SLIDE_DURATION;             // ms — background gradient change
  const FG_DELAY_ON   = 0;                          // foreground starts immediately
  const BG_DELAY_ON   = 200;                        // background starts after fg is already light
  const FG_DELAY_OFF  = Math.round(BG_DURATION * 0.6); // foreground waits until bg is mostly gone
  const BG_DELAY_OFF  = 0;                          // background starts fading immediately

  const fgDuration  = showActive ? FG_DURATION  : FG_DURATION;
  const fgDelay     = showActive ? FG_DELAY_ON  : FG_DELAY_OFF;
  const bgDelay     = showActive ? BG_DELAY_ON  : BG_DELAY_OFF;

  const easing = "cubic-bezier(0.4,0,0.2,1)";

  const colorTransition = `color ${fgDuration}ms ${easing} ${fgDelay}ms`;
  const borderTransition = `border-color ${fgDuration}ms ${easing} ${fgDelay}ms`;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`rounded-2xl flex flex-col h-full select-none ${
        showActive
          ? "shadow-lg border border-transparent"
          : "shadow-sm border border-gray-100"
      }`}
      style={{
        padding: pad,
        // gap between author row ↔ review paragraph — scales with screen size
        gap: isLarge ? "1.25rem" : "0.875rem",
        background: showActive
          ? "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)"
          : "#fff",
        cursor: onClick ? "pointer" : "default",
        transition: `background ${BG_DURATION}ms ${easing} ${bgDelay}ms,
                     box-shadow  ${BG_DURATION}ms ${easing} ${bgDelay}ms`,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* ── Author row: avatar + text + quote mark ── */}
      <div className={`flex items-center ${isLarge ? "gap-4" : "gap-3"}`}>
        {/* Avatar */}
        <img
          src={item.avatar}
          alt={item.name}
          className={`${avatarSz} rounded-full border-2 object-cover flex-shrink-0`}
          style={{
            borderColor: avatarBorder,
            transition: borderTransition,
          }}
        />

        {/* Name / title / stars — grows to fill available width */}
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold leading-tight ${textSm}`}
            style={{ color: nameClr, transition: colorTransition }}
          >
            {item.name}
          </p>
          <p
            className={`${textXs} ${isLarge ? "mt-1" : "mt-0.5"}`}
            style={{ color: subClr, transition: colorTransition }}
          >
            {item.title}
          </p>
          <span className={`text-yellow-400 ${textXs} ${isLarge ? "mt-1.5" : "mt-1"} block`}>★★★★★</span>
        </div>

        {/* Quote mark — right-aligned, beside the author block */}
        <div
          className="flex-shrink-0 self-start"
          style={{
            color: quoteClr,
            fontSize: isLarge ? "3.5rem" : "3rem",
            lineHeight: 1,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            transition: colorTransition,
            marginTop: "-0.25rem",
          }}
          aria-hidden="true"
        >
          &#8221;
        </div>
      </div>

      {/* ── Review body ── */}
      <p
        className={`leading-relaxed ${textSm}`}
        style={{ color: bodyClr, transition: colorTransition }}
      >
        {item.review}
      </p>
    </div>
  );
}

// ─── Carousel (mobile / tablet) ───────────────────────────────────────────────
function Carousel({ cardPadding }) {
  const [current, setCurrent] = useState(0);
  const startXRef  = useRef(0);
  const dragging   = useRef(false);

  const goTo = useCallback((idx) => setCurrent(wrap(idx)), []);

  // Auto-advance; reset timer on manual interaction
  const resetTimer = useAutoAdvance(() => goTo(current + 1), AUTO_INTERVAL);

  const manualGoTo = useCallback(
    (idx) => {
      goTo(idx);
      resetTimer(); // restart countdown after manual pick
    },
    [goTo, resetTimer]
  );

  const onPointerDown = (e) => {
    startXRef.current = e.clientX;
    dragging.current  = true;
  };
  const onPointerUp = (e) => {
    if (!dragging.current) return;
    const diff = startXRef.current - e.clientX;
    if (Math.abs(diff) > 44) manualGoTo(current + (diff > 0 ? 1 : -1));
    dragging.current = false;
  };

  return (
    <div>
      {/* Track */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex"
          style={{
            transform:  `translateX(-${current * 100}%)`,
            transition: `transform ${SLIDE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
            willChange: "transform",
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => { dragging.current = false; }}
        >
          {testimonials.map((item, i) => (
            <div key={item.id} style={{ minWidth: "100%", width: "100%" }} className="px-0.5">
              <TestimonialCard
                item={item}
                isActive={i === current}
                isHovered={false}
                isLarge={false}
                cardPadding={cardPadding}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <Dot
            key={i}
            active={i === current}
            onClick={() => manualGoTo(i)}
            label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Grid ─────────────────────────────────────────────────────────────
function DesktopGrid({ is2xl }) {
  const [selected, setSelected] = useState(0);
  const [hovered,  setHovered]  = useState(null);

  const goTo = useCallback((idx) => setSelected(wrap(idx)), []);

  // Auto-advance; reset timer on manual interaction
  const resetTimer = useAutoAdvance(() => goTo(selected + 1), AUTO_INTERVAL);

  const manualGoTo = useCallback(
    (idx) => {
      goTo(idx);
      resetTimer();
    },
    [goTo, resetTimer]
  );

  const cardPadding = is2xl ? "2rem" : "1.5rem";

  return (
    <>
      <div
        className="grid grid-cols-3"
        style={{ gap: is2xl ? "1.75rem" : "1.25rem" }}
      >
        {testimonials.map((item, i) => (
          <TestimonialCard
            key={item.id}
            item={item}
            isActive={i === selected}
            isHovered={hovered === i}
            isLarge={is2xl}
            cardPadding={cardPadding}
            onClick={() => manualGoTo(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {/* Dots */}
      <div
        className="flex justify-center gap-2"
        style={{ marginTop: is2xl ? "2.5rem" : "2rem" }}
      >
        {testimonials.map((_, i) => (
          <Dot
            key={i}
            active={i === selected}
            onClick={() => manualGoTo(i)}
            label={`Select testimonial ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

// ─── Contact Us Button ────────────────────────────────────────────────────────
function ContactButton({ is2xl }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize:        is2xl ? "0.95rem" : "0.875rem",
        padding:         is2xl ? "0.75rem 1.6rem" : "0.55rem 1.3rem",
        backgroundColor: hovered ? "#1d4ed8" : "#2563eb",
        color:           "#fff",
        fontWeight:      600,
        borderRadius:    "9999px",
        border:          "none",
        cursor:          "pointer",
        whiteSpace:      "nowrap",
        boxShadow:       hovered
          ? "0 6px 20px rgba(37,99,235,0.45)"
          : "0 2px 6px rgba(37,99,235,0.25)",
        transform:       hovered ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
        transition: [
          "background-color 0.22s ease",
          "box-shadow 0.22s ease",
          "transform 0.22s ease",
        ].join(", "),
      }}
    >
      Contact Us
    </button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isMobile  = width < 768;
  const isTablet  = width < 1024;
  const isDesktop = width >= 1024;
  const is2xl     = width >= 1559;

  const sectionPadding = is2xl
    ? { padding: "4rem 7rem" }
    : isDesktop
    ? { padding: "3rem 3.5rem" }
    : isTablet && !isMobile
    ? { padding: "3rem 2.5rem" }
    : width >= 480
    ? { padding: "2.5rem 1.75rem" }
    : width >= 430
    ? { padding: "2.5rem 1.25rem" }
    : { padding: "2rem 1rem" };

  return (
    <section className="bg-gray-50" style={sectionPadding}>

      {/* ── Header ── */}
      {/*
        Layout logic:
        - Mobile (< 768px)          → column: heading → paragraph → button stacked
        - Tablet (768–1023px)       → row: [heading + paragraph] | [button top-right]
        - Desktop (≥ 1024px)        → row: [heading + paragraph] | [button top-right]
        - 2xl (≥ 1559px)            → same row, just larger sizes

        The button is ALWAYS on the right whenever there is horizontal room
        (tablet upward). It is only stacked below on the narrowest screens.
      */}
      <div
        className="flex gap-4 mb-8"
        style={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-start",
          justifyContent: isMobile ? "flex-start" : "space-between",
          marginBottom: is2xl ? "3rem" : undefined,
        }}
      >
        {/* Left: heading + paragraph */}
        <div style={{ maxWidth: is2xl ? "42rem" : isDesktop ? "38rem" : "32rem" }}>
          <h2
            className="font-bold text-gray-900 leading-tight mb-2"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: is2xl
                ? "2.25rem"
                : isDesktop
                ? "1.65rem"
                : width >= 768
                ? "1.5rem"
                : width >= 480
                ? "1.35rem"
                : "1.15rem",
            }}
          >
            Hear From Our{" "}
            <span className="text-blue-600">Successful Learners</span>
          </h2>
          <p
            className="text-gray-500 leading-relaxed"
            style={{
              fontSize: is2xl ? "1rem" : width >= 480 ? "0.875rem" : "0.8rem",
            }}
          >
            MGKK ICT Services has successfully delivered critical ICT
            infrastructure and training solutions for government agencies and
            private organizations, maintaining a strong focus on quality,
            reliability, and customer satisfaction.
          </p>
        </div>

        {/* Right: Contact Us button — always top-right when row layout */}
        <div className="flex-shrink-0" style={{ paddingTop: isMobile ? 0 : "0.125rem" }}>
          <ContactButton is2xl={is2xl} />
        </div>
      </div>

      {/* ── Mobile / Tablet → Carousel ── */}
      {isTablet && (
        <Carousel
          cardPadding={
            width >= 768 ? "1.75rem"
            : width >= 480 ? "1.5rem"
            : width >= 430 ? "1.25rem"
            : "1rem"
          }
        />
      )}

      {/* ── Desktop → Interactive grid ── */}
      {isDesktop && <DesktopGrid is2xl={is2xl} />}

    </section>
  );
}