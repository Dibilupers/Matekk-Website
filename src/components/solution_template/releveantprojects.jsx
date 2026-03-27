import { useState, useEffect } from "react";

const ITEMS_PER_ROW = 3;

/**
 * Reusable "Relevant Project Experience" gallery section.
 * Drop this as a child of SolutionsTemplate on pages that need it.
 *
 * @param {object}   props
 * @param {Array}    props.projects     - Array of { id, src, alt, title, desc, link? }
 * @param {string}   [props.description] - Custom paragraph under the heading
 */
export default function RelevantProjects({
  projects = [],
  description = "This section highlights selected projects demonstrating our experience in delivering similar ICT services, including the scope of work performed and the types of organizations served.",
}) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tappedCard, setTappedCard] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chunk flat array into rows of ITEMS_PER_ROW
  const rows = projects.reduce((acc, item, i) => {
    const rowIndex = Math.floor(i / ITEMS_PER_ROW);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, []);

  const handleCardTap = (id) => setTappedCard(tappedCard === id ? null : id);

  if (projects.length === 0) return null;

  return (
    <section className="bg-[#EBF5FD] flex flex-col items-center py-10 md:py-15">
      <div className="mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] space-y-6">
        {/* ====== HEADING ====== */}
        <div className="flex flex-row justify-center items-center space-y-1">
          <h3>
            Relevant Project{" "}
            <span className="text-[#1775EE]">Experience</span>
          </h3>
          <p className="text-right max-w-3xl">{description}</p>
        </div>

        {/* ====== GALLERY ====== */}
        {isMobile ? (
          /* ── MOBILE: single column ── */
          <div className="flex flex-col gap-3">
            {projects.map((item) => (
              <MobileCard
                key={item.id}
                item={item}
                isTapped={tappedCard === item.id}
                onTap={handleCardTap}
              />
            ))}
          </div>
        ) : (
          /* ── DESKTOP / TABLET: rows with expand-on-hover ── */
          <div className="flex flex-col gap-3">
            {rows.map((row, rowIndex) => (
              <DesktopRow
                key={rowIndex}
                row={row}
                rowIndex={rowIndex}
                hoveredRow={hoveredRow}
                onRowEnter={setHoveredRow}
                onRowLeave={() => setHoveredRow(null)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== MOBILE CARD ====================
function MobileCard({ item, isTapped, onTap }) {
  return (
    <div
      onClick={() => onTap(item.id)}
      className="relative self-center rounded-2xl overflow-hidden w-[90vw] h-[30vh] cursor-pointer"
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover"
      />

      {/* Blur overlay */}
      <div
        className={`absolute inset-0 rounded-2xl backdrop-blur-sm bg-black/30 transition-opacity duration-500 ${
          isTapped ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content */}
      <div
        className={`absolute inset-0 px-8 py-4 flex flex-col justify-center transition-opacity duration-500 ${
          isTapped ? "opacity-100" : "opacity-0"
        }`}
      >
        <h5 className="text-white flex-1">{item.title}</h5>
        <p className="text-white">{item.desc}</p>
      </div>
    </div>
  );
}

// ==================== DESKTOP ROW ====================
function DesktopRow({ row, rowIndex, hoveredRow, onRowEnter, onRowLeave }) {
  const rowHeight =
    hoveredRow === rowIndex ? "340px" : hoveredRow !== null ? "220px" : "280px";

  return (
    <div
      onMouseEnter={() => onRowEnter(rowIndex)}
      onMouseLeave={onRowLeave}
      className="flex gap-3 transition-all duration-500 ease-in-out"
      style={{ height: rowHeight }}
    >
      {row.map((item) => (
        <DesktopCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// ==================== DESKTOP CARD ====================
function DesktopCard({ item }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden flex-1 transition-all duration-500 ease-in-out hover:flex-[2]">
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <h5 className="text-white font-bold">{item.title}</h5>
        <p className="text-white overflow-y-auto max-w-lg">{item.desc}</p>
      </div>
    </div>
  );
}