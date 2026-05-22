import InquireNowButton from "../ui/InquireNowButton";
import Button from "../ui/button";

// ==================== PROP SHAPES ====================
/**
 * @typedef {{ title: string, desc: string }} DeliverableItem
 * @typedef {{ title: string, highlightText: string, description: string }} FooterBannerProps
 */

/**
 * Reusable full-page template for all Solutions pages.
 *
 * @param {object}  props
 * @param {string}  props.heroBgImage           - Hero section background image
 * @param {string}  props.category              - Pill label above the hero title (e.g. "ICT Consultancy (PBOOT)")
 * @param {string}  props.heroTitle             - Main hero heading
 * @param {string}  props.heroDescription       - Hero sub-copy
 *
 * @param {string}  props.buildingTitle         - "Building…" section heading (plain part)
 * @param {string}  props.buildingTitleHighlight- Blue highlighted part of that heading
 * @param {string}  props.buildingDescription   - Paragraph in the blue box
 *
 * @param {string}  props.challengesHighlight   - Blue part of challenges heading
 * @param {string}  props.challengesSuffix      - Plain part after the highlight
 * @param {string[]} props.challenges           - Array of challenge strings (5 items recommended)
 *
 * @param {string}  props.deliverablesHighlight - Blue word inside "Scope and Key Deliverables"
 * @param {DeliverableItem[]} props.deliverables- Array of { title, desc } objects
 *
 * @param {string}  props.footerBgImage         - Footer banner background image
 * @param {string}  props.footerTitle           - Footer banner title
 * @param {string}  props.footerHighlightText   - Footer banner blue highlight text
 * @param {string}  props.footerDescription     - Footer banner sub-copy
 */
export default function SolutionsTemplate({
  // Hero
  heroBgImage,
  category,
  heroTitle,
  heroDescription,
  // Building section
  buildingTitle,
  buildingTitleHighlight,
  buildingDescription,
  // Challenges section
  challengesHighlight,
  challengesSuffix = "by This Service",
  challenges = [],
  // Deliverables section
  deliverablesHighlight = "Deliverables",
  deliverables = [],
  // Footer banner
  footerBgImage,
  footerTitle,
  footerHighlightText,
  footerDescription,
  children,
}) {
  const handleLearnMoreClick = () => {
    document
      .getElementById("description")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Split challenges into rows: first row gets 3, second row gets the rest
  const firstRow = challenges.slice(0, 3);
  const secondRow = challenges.slice(3);

  return (
    <main className="flex flex-col scroll-mt-18">
      {/* ==================== HERO BANNER ==================== */}
      <section className="relative items-center py-18 px-8 rounded-2xl shadow-lg flex flex-col gap-2.5 overflow-hidden min-h-62.5 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-xs bg-white/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-5">
          <div className="flex flex-col justify-center items-center text-center space-y-2">
            <h6 className="w-fit px-5 py-2 text-[#1775EE] bg-blue-50 rounded-full">
              {category}
            </h6>
            <div className="flex flex-col justify-center items-center text-center text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] space-y-1 text-white">
              <h1 className="max-w-5xl">{heroTitle}</h1>
              <p className="max-w-2xl">{heroDescription}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row justify-center items-center gap-2.5 w-full">
            <InquireNowButton buttonCustomStyle="bg-[#1775EE] border border-[#1775EE] hover:border-[#0062E0] text-white shadow-lg hover:bg-[#0062E0] cursor-pointer w-fit text-sm rounded-full transition-all duration-300 active:scale-90 text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] py-3 px-[5%] md:py-2 md:px-4" />
            <Button
              title="Learn More"
              type="none"
              buttonCustomStyle="text-blue-600 border border-blue-600 hover:bg-[#0062E0] hover:border-[#0062E0] hover:text-white transition-all duration-300"
              btnFunc={handleLearnMoreClick}
            />
          </div>
        </div>
      </section>

      {/* ==================== BUILDING SECTION ==================== */}
      <section
        id="description"
        className="flex flex-col lg:flex-row py-10 md:py-15 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18"
      >
        <div className="flex flex-col gap-y-8 flex-1">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-x-16.5">
            <h3 className="max-w-2xl">
              {buildingTitle}
              <span className="text-[#1775EE]"> {buildingTitleHighlight}</span>
            </h3>
            <p className="bg-[#EBF5FD] p-7 rounded-2xl max-w-full xl:max-w-xl 2xl:max-w-full">
              {buildingDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CHALLENGES SECTION ==================== */}
      <section className="flex flex-col justify-center items-center space-y-4 bg-[#EBF5FD] py-10 md:py-15 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem]">
        <h3 className="text-center max-w-60 sm:max-w-full">
          <span className="text-[#1775EE]">{challengesHighlight}</span>{" "}
          {challengesSuffix}
        </h3>

        <div className="flex flex-col justify-center items-center space-y-2 lg:space-y-4 w-full">
          {/* Row 1 */}
          {firstRow.length > 0 && (
            <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 lg:space-x-4 space-y-2 lg:space-y-0 max-w-90 md:max-w-100 lg:max-w-full">
              {firstRow.map((text) => (
                <ChallengeCard key={text} text={text} />
              ))}
            </div>
          )}

          {/* Row 2 */}
          {secondRow.length > 0 && (
            <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 lg:space-x-4 space-y-2 lg:space-y-0 max-w-90 md:max-w-100 lg:max-w-full">
              {secondRow.map((text) => (
                <ChallengeCard key={text} text={text} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== SCOPE AND KEY DELIVERABLES ==================== */}
      <section className="py-10 md:py-15 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] flex flex-col lg:flex-row space-y-4">
        <h3 className="shrink-0 lg:w-80">
          Scope and Key{" "}
          <span className="text-[#1775EE]">{deliverablesHighlight}</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
          {deliverables.map((item) => (
            <div
              key={item.title}
              className="shadow-[0px_0px_4px_rgba(0,0,0,0.2)] rounded-2xl p-6 flex flex-col space-y-1 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <h5 className="text-[#1775EE]">{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== OPTIONAL SLOT (e.g. Relevant Projects) ==================== */}
      {children}

      {/* ==================== FOOTER CALL TO ACTION BANNER ==================== */}
      <section
        className="py-10 my-10 md:py-15 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden min-h-75"
        style={{
          backgroundImage: `url(${footerBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 backdrop-blur-xs"
          style={{
            background:
              "linear-gradient(to right, #C2DDFF99, #EDEDED10 67%, #C2DDFF99)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-1">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[#ffffff] text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-60 md:max-w-90 xl:max-w-full">
              {footerTitle}{" "}
              <span className="text-[#1775EE]">{footerHighlightText}</span>
            </h3>
            <p className="text-white text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-60 md:max-w-90 xl:max-w-full">
              {footerDescription}
            </p>
          </div>
          <InquireNowButton
            title="Inquire Now"
            type="none"
            buttonCustomStyle="bg-[#1775EE] border border-[#1775EE] hover:border-[#0062E0] text-white shadow-lg hover:bg-[#0062E0] cursor-pointer w-fit text-sm rounded-full transition-all duration-300 active:scale-90 text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] py-3 px-[5%] md:py-2 md:px-4"
          />
        </div>
      </section>
    </main>
  );
}

// ==================== CHALLENGE CARD SUB-COMPONENT ====================
function ChallengeCard({ text, width }) {
  return (
    <div
      className={`flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-in-out bg-white rounded-2xl p-5 ${width} shadow-sm`}
    >
      <div className="shrink-0 w-8 h-8 rounded-full bg-[#1775EE] flex items-center justify-center">
        <svg
          className="w-5.5 h-5.5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p>{text}</p>
    </div>
  );
}
