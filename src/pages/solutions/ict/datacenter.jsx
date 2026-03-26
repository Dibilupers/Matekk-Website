// ==================== IMPORTS - UPDATE FOR EACH  ====================
// Change these imports based on the specific
import { useState } from "react";
import SolutionsTemplate from "../../../components/solution_template/solutions_template";

// ==================== COMPONENT NAME - CHANGE FOR EACH  ====================
export default function DataCenterFacilities() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // eslint-disable-line
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tappedCard, setTappedCard] = useState(null);
  const galleryItems = [
    {
      id: 1,
      src: ictImage,
      alt: "Network and Security Infrastructure Projects",
      title:
        "Design, Consultancy, Build, Test and Acceptance of ICT Infrastructure for SCADA Communication of More Power Inc.",
      desc: "Centralized monitoring and control of interconnected substations via SCADA and ICT, improving grid reliability, reducing downtime, and automating power distribution.",
      link: "/solutions/network", // add link to every item
    },
    {
      id: 2,
      src: webImage,
      alt: "SLSU Delegates",
      title: "SLSU Delegates Welcome",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 3,
      src: ictImage,
      alt: "Team Celebration",
      title: "Team Celebration",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 4,
      src: webImage,
      alt: "Ideas Workshop",
      title: "Ideas Workshop",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 5,
      src: ictImage,
      alt: "Conference Panel",
      title: "Conference Panel",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    // Just add more objects here if needed
  ];
  const ITEMS_PER_ROW = 3;
  // Chunk array into rows
  const rows = galleryItems.reduce((acc, item, i) => {
    const rowIndex = Math.floor(i / ITEMS_PER_ROW);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <>
      <SolutionsTemplate />
      {/* Relevant Experience */}
      <section className="bg-[#EBF5FD] flex flex-col items-center py-10 md:py-15">
        <div className="mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] space-y-6">
          <div className="flex flex-col justify-center items-center space-y-1">
            <h3>
              Relevant Project{" "}
              <span className="text-[#1775EE]"> Experience</span>
            </h3>
            <p className="text-center max-w-3xl">
              This section highlights selected projects demonstrating our
              experience in delivering similar ICT services, including the scope
              of work performed and the types of organizations served.
            </p>
          </div>

          {/* NEED TO BE CHECKED */}
          <div className="">
            {isMobile ? (
              /* ── MOBILE ── */
              /* ── MOBILE: single column ── */
              <div className="flex flex-col gap-3">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      setTappedCard(tappedCard === item.id ? null : item.id)
                    }
                    className="relative self-center rounded-2xl overflow-hidden w-[90vw] h-[30vh]"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />

                    {/* Full blur overlay */}
                    <div
                      className={`absolute inset-0 rounded-2xl backdrop-blur-sm bg-black/1 transition-opacity duration-500 ${
                        tappedCard === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Content */}
                    <div
                      className={`absolute inset-0 px-8 py-4 flex flex-col justify-center transition-opacity duration-500 ${
                        tappedCard === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {/* Title row */}
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-white flex-1">{item.title}</h5>
                      </div>

                      {/* Description below title */}
                      <p className="text-white">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── DESKTOP/TABLET ── */
              <div className="flex flex-col gap-3">
                {rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="flex gap-3 transition-all duration-500 ease-in-out"
                    style={{
                      height:
                        hoveredRow === rowIndex
                          ? "340px"
                          : hoveredRow !== null
                            ? "220px"
                            : "280px",
                    }}
                  >
                    {row.map((item) => (
                      <div
                        key={item.id}
                        className="group relative rounded-2xl overflow-hidden flex-1 transition-all duration-500 ease-in-out hover:flex-2"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Blur */}
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content — centered */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <h5 className="text-white font-bold">{item.title}</h5>
                          <p className="text-white overflow-y-auto max-w-lg">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      </>
  );
}
