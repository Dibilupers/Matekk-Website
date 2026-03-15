import { useState, useEffect, useRef, useCallback } from "react";
import michaelImage from "../../assets/MichaelLewisAballos.png";
import clydeImage from "../../assets/ClydeNelsonRocillor.png";
import Button from "../ui/button";

// ─── Constants ────────────────────────────────────────────────────────────────
const CARDS_PER_PAGE = 3; // always show 3 cards at a time (desktop)
const PAGE_INTERVAL = 8000; // ms — auto-advance set every 8s
const TRANSITION_MS = 380; // ms — smooth crossfade, no delay

// ─── Data — 6 cards (3 real + 3 placeholders, identical structure/design) ────
const testimonials = [
  {
    id: 1,
    name: "Michael Lewis Bullas Abalos",
    title: "CCNA Passer – Jan. 2026",
    avatar: michaelImage,
    review:
      "I passed my CCNA thanks to Converge Training and I.T. Services. Their complete materials, hands-on training, and supportive staff helped me gain the confidence to succeed. Special thanks to Engr. Mark Anthony Melendres and the entire Converge team — enrolling here is truly worth the value.",
  },
  {
    id: 2,
    name: "Clyde Nelson Racillor",
    title: "CCNA Passer – Dec. 2025",
    avatar: clydeImage,
    review:
      "Just recently passed CCNA 200-301. Sa mga balak mag-review for CCNA exam, highly recommended dito. Hindi ka pabababayan ni Engr. Melendres. From Networking Basics to Switching and Routing hanggang Network Security and Automation, G6E2 yan lahat.",
  },
  {
    id: 3,
    name: "Eugine Tomas",
    title: "CCNA Passer – Oct. 2025",
    avatar: clydeImage,
    review:
      "I just passed the CCNA exam. Big thanks to Converge Training and I.T. Services for excellent laboratory hands-on training and support throughout my journey. I highly recommend this training services for those looking for a supportive way to prepare for the exams.",
  },
  // ── Placeholder cards (same structure, design, and components) ──────────────
  {
    id: 4,
    name: "Juan dela Cruz",
    title: "CCNA Passer – Sep. 2025",
    avatar: michaelImage,
    review:
      "Passed my CCNA on the first try! The structured curriculum and patient instructors at Converge Training made all the difference. Every module was clearly explained and the lab sessions gave me real hands-on confidence going into the exam.",
  },
  {
    id: 5,
    name: "Maria Santos",
    title: "CCNA Passer – Aug. 2025",
    avatar: clydeImage,
    review:
      "Highly recommend Converge Training to anyone aiming for their CCNA. Engr. Melendres explains even the most complex networking concepts in a way that is easy to follow. The support and environment here genuinely push you to succeed.",
  },
  {
    id: 6,
    name: "Renz Aquino",
    title: "CCNA Passer – Jul. 2025",
    avatar: michaelImage,
    review:
      "From zero networking background to CCNA certified — Converge Training made it possible. The hands-on labs and comprehensive review materials prepared me thoroughly. I could not have done it without the guidance of the entire team.",
  },
];

const TOTAL_PAGES = Math.ceil(testimonials.length / CARDS_PER_PAGE); // 2
const wrapPage = (p) => ((p % TOTAL_PAGES) + TOTAL_PAGES) % TOTAL_PAGES;
const wrapCard = (i, total) => ((i % total) + total) % total;

// ─── Dot ─────────────────────────────────────────────────────────────────────
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
        transition: "background-color 0.3s ease, transform 0.3s ease",
      }}
    />
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
// Blue background: hover or click only (no automatic blue state).
// Click: card scales down slightly.
// Transitions: no delay, smooth start.
function TestimonialCard({ item, isLarge, cardPadding }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const showBlue = isHovered || isPressed;
  const easing = "cubic-bezier(0.4,0,0.2,1)";
  const FG_MS = 200; // foreground colour — quick
  const BG_MS = 350; // background gradient — slightly longer, still no delay

  const nameClr = showBlue ? "#fff" : "#111827";
  const subClr = showBlue ? "#bfdbfe" : "#9ca3af";
  const bodyClr = showBlue ? "#dbeafe" : "#4b5563";
  // Quote mark: black on white card, white on blue card
  const quoteClr = showBlue ? "rgba(255,255,255,0.85)" : "#111827";
  const avatarBorder = showBlue ? "#93c5fd" : "#dbeafe";

  // Explicit box-shadows: soft ambient on rest, deeper blue-tinted lift on active
  const boxShadow = showBlue
    ? "0 8px 24px rgba(29, 78, 216, 0.35), 0 2px 8px rgba(29, 78, 216, 0.2)"
    : "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)";

  const textSm = isLarge ? "text-base" : "text-sm";
  const textXs = isLarge ? "text-sm" : "text-xs";
  const avatarSz = isLarge ? "w-14 h-14" : "w-12 h-12";
  const pad = cardPadding ?? (isLarge ? "2rem" : "1.5rem");

  const fgT = `color ${FG_MS}ms ${easing}`;
  const bdT = `border-color ${FG_MS}ms ${easing}`;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`rounded-2xl flex flex-col h-full select-none ${
        showBlue ? "border border-transparent" : "border border-gray-100"
      }`}
      style={{
        padding: pad,
        gap: isLarge ? "1.25rem" : "0.875rem",
        background: showBlue
          ? "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)"
          : "#fff",
        cursor: "pointer",
        boxShadow,
        transform: isPressed ? "scale(0.95)" : "scale(1)",
        transition: [
          `background ${BG_MS}ms ${easing}`,
          `box-shadow ${BG_MS}ms ${easing}`,
          "transform 140ms ease",
        ].join(", "),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setIsPressed(true);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") setIsPressed(false);
      }}
    >
      {/* Author row */}
      <div className={`flex items-center ${isLarge ? "gap-4" : "gap-3"}`}>
        <img
          src={item.avatar}
          alt={item.name}
          className={`${avatarSz} rounded-full border-2 object-cover shrink-0`}
          style={{ borderColor: avatarBorder, transition: bdT }}
        />

        <div className="flex-1">
          <p
            className={`font-semibold leading-tight ${textSm}`}
            style={{ color: nameClr, transition: fgT }}
          >
            {item.name}
          </p>
          <p
            className={`${textXs} ${isLarge ? "mt-1" : "mt-0.5"}`}
            style={{ color: subClr, transition: fgT }}
          >
            {item.title}
          </p>
          <span
            className={`text-yellow-400 ${textXs} ${isLarge ? "mt-1.5" : "mt-1"} block`}
          >
            ★★★★★
          </span>
        </div>

        {/* Quote mark — top-right of author row */}
        <div
          className="flex-shrink-0 self-start"
          aria-hidden="true"
          style={{
            color: quoteClr,
            fontSize: isLarge ? "3.5rem" : "3rem",
            lineHeight: 1,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            marginTop: "-0.25rem",
            transition: fgT,
          }}
        >
          &#8221;
        </div>
      </div>

      {/* Review text */}
      <p
        className={`leading-relaxed ${textSm}`}
        style={{ color: bodyClr, transition: fgT }}
      >
        {item.review}
      </p>
    </div>
  );
}

// ─── Mobile / Tablet Carousel (1 card at a time, swipeable) ──────────────────
// Auto-advances every PAGE_INTERVAL ms. Dots reflect current card index.
function MobileCarousel({ cardPadding }) {
  const TOTAL = testimonials.length;
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef(null);
  const startXRef = useRef(0);
  const dragging = useRef(false);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setIdx((prev) => wrapCard(prev + 1, TOTAL)),
      PAGE_INTERVAL,
    );
  }, [TOTAL]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goTo = (next) => {
    if (sliding) return;
    setSliding(true);
    setTimeout(() => {
      setIdx(wrapCard(next, TOTAL));
      setSliding(false);
    }, TRANSITION_MS);
    startTimer();
  };

  const onPointerDown = (e) => {
    startXRef.current = e.clientX;
    dragging.current = true;
  };
  const onPointerUp = (e) => {
    if (!dragging.current) return;
    const diff = startXRef.current - e.clientX;
    if (Math.abs(diff) > 44) goTo(idx + (diff > 0 ? 1 : -1));
    dragging.current = false;
  };

  return (
    <div>
      <div
        style={{
          opacity: sliding ? 0 : 1,
          transform: sliding ? "translateY(6px)" : "translateY(0)",
          transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          dragging.current = false;
        }}
      >
        <TestimonialCard
          item={testimonials[idx]}
          isLarge={false}
          cardPadding={cardPadding}
        />
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <Dot
            key={i}
            active={i === idx}
            onClick={() => goTo(i)}
            label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Grid (3 cards per page, page auto-advances every 8s) ─────────────
// Dots reflect current page (2 dots for 2 pages of 3).
function DesktopGrid({ is2xl, width }) {
  const [page, setPage] = useState(0);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setPage((prev) => wrapPage(prev + 1)),
      PAGE_INTERVAL,
    );
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goTo = (next) => {
    if (sliding) return;
    setSliding(true);
    setTimeout(() => {
      setPage(wrapPage(next));
      setSliding(false);
    }, TRANSITION_MS);
    startTimer();
  };

  const cardPadding = is2xl ? "2rem" : "1.5rem";
  const gridGap = is2xl ? "1.75rem" : width >= 1280 ? "1.5rem" : "1.25rem";

  const pageItems = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: gridGap,
          opacity: sliding ? 0 : 1,
          transform: sliding ? "translateY(10px)" : "translateY(0)",
          transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
        }}
      >
        {pageItems.map((item) => (
          <TestimonialCard
            key={item.id}
            item={item}
            isLarge={is2xl}
            cardPadding={cardPadding}
          />
        ))}
      </div>

      {/* 1 dot per page */}
      <div
        className="flex justify-center gap-2"
        style={{ marginTop: is2xl ? "2.5rem" : "2rem" }}
      >
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <Dot
            key={i}
            active={i === page}
            onClick={() => goTo(i)}
            label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

// ─── Contact Us Button ────────────────────────────────────────────────────────
function ContactButton() {
  return (
    <Button
      title="Contact Us"
      type="none"
      buttonCustomStyle="bg-[#1775EE] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] px-6 py-3"
      btnFunc={() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Contact Us
    </Button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const is2xl = width >= 1559;

  const mobileCardPadding = isTablet
    ? "1.75rem"
    : width >= 480
      ? "1.5rem"
      : width >= 430
        ? "1.25rem"
        : "1rem";

  return (
    <section className="mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] py-10 md:py-15">
      {/* ── Header ── */}
      <div
        className="flex gap-4 mb-8"
        style={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          justifyContent: isMobile ? "flex-start" : "space-between",
          marginBottom: is2xl ? "3rem" : undefined,
        }}
      >
        <div
          style={{ maxWidth: is2xl ? "42rem" : isDesktop ? "38rem" : "32rem" }}
        >
          <h2
            className="font-bold text-gray-900 leading-tight mb-2"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: is2xl
                ? "2.25rem"
                : isDesktop
                  ? "1.65rem"
                  : isTablet
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

        <div
          className="shrink-0"
          style={{ paddingTop: isMobile ? 0 : "0.125rem" }}
        >
          <ContactButton is2xl={is2xl} />
        </div>
      </div>

      {/* ── Mobile / Tablet → 1-card swipeable carousel ── */}
      {!isDesktop && <MobileCarousel cardPadding={mobileCardPadding} />}

      {/* ── Desktop → 3-card paged grid, auto-advances every 8s ── */}
      {isDesktop && <DesktopGrid is2xl={is2xl} width={width} />}
    </section>
  );
}
