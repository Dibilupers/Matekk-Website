// ==================== IMPORTS - UPDATE FOR EACH  ====================
// Change these imports based on the specific
// Replace these for different pages
import ccnaHero from "../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../assets/CCNAFooterImageAutomation.png";
import SolutionsHeroBanner from "../section/SolutionsHeroBanner";
import SolutionsFooterBanner from "../section/SolutionsFooterBanner";
// ==================== COMPONENT NAME - CHANGE FOR EACH  ====================
export default function SolutionsTemplate() {

  return (
    <main className="flex flex-col scroll-mt-18">
      {/* ==================== HERO BANNER - UPDATE TEXT AND IMAGES ====================*/}
      <SolutionsHeroBanner
        bgImage={ccnaHero}
        category="ICT Consultancy (PBOOT)"
        title="ICT Network & Security Infrastructure"
        description="MATEKK provides
            end-to-end ICT network and security infrastructure services designed
            to ensure stable connectivity, data protection, and secure system
            operations for organizations."
      />

      {/* Building Scalable */}
      <section id="description" className="flex flex-col lg:flex-row py-10 md:py-15 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18">
        {/* Content */}
        <div className="flex flex-col gap-y-8 flex-1">
          {/* ==================== TEXT ====================*/}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-x-16.5">
            <h3 className="max-w-2xl">
              Building Scalable and Secure Network Infrastructure to
              <span className="text-[#1775EE]"> Support Business Continuity</span>
            </h3>
            <p className="bg-[#EBF5FD] p-7 rounded-2xl max-w-full xl:max-w-xl 2xl:max-w-full">
              Our ICT Network and Security Infrastructure service focuses on the
              design, implementation, configuration, and optimization of secure
              network environments. We help organizations build reliable network
              architectures that support business operations while maintaining
              strong security controls.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-[#EBF5FD] py-10 md:py-15">
        <div className="flex flex-col justify-center items-center mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] space-y-4">
          <h3 className="text-center max-w-60 md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
            <span className="text-[#1775EE]">Challenges Addressed</span> by This
            Service
          </h3>

          {/* Row 1 — 3 cards */}
          <div className="flex flex-col justify-center items-center space-y-2 lg:space-y-4">
            <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 lg:space-x-4 space-y-2 lg:space-y-0">
              {[
                "Unstable or poorly designed network infrastructure",
                "Security risks due to misconfigured or outdated systems",
                "Limited network visibility and monitoring",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-in-out bg-white rounded-2xl p-5 w-87 shadow-sm"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#1775EE] flex items-center justify-center mt-0.5">
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
              ))}
            </div>

            {/* Row 2 — 2 cards centered */}
            <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 lg:space-x-4 space-y-2 lg:space-y-0">
              {[
                "Scalability issues as organizational needs grow",
                "Compliance and security policy concerns",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-in-out bg-white rounded-2xl p-5 w-87 lg:w-79 shadow-sm"
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scope and Key section */}
      <section className="py-10 md:py-15 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] flex flex-col lg:flex-row space-y-4">
        {/* Title */}
        <h3 className="shrink-0 lg:w-80">
          Scope and Key <span className="text-[#1775EE]">Deliverables</span>
        </h3>

        {/* Cards — 1 col on mobile, 2 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
          {[
            {
              title: "Network and Security Infrastructure Assessment",
              desc: "We evaluate existing network and security environments to identify gaps, risks, and improvement opportunities.",
            },
            {
              title: "Network Architecture Design and Planning",
              desc: "We design structured and scalable network architectures aligned with operational and security requirements.",
            },
            {
              title: "Installation and Configuration of Network Devices",
              desc: "We install and configure network hardware and systems to ensure stable connectivity and proper operation.",
            },
            {
              title: "Firewall, Access Control, and Security Policy Setup",
              desc: "We implement security controls, access policies, and firewall rules to protect systems and data.",
            },
            {
              title: "System Testing, Validation, and Optimization",
              desc: "We test and validate network performance and security, making adjustments to improve reliability and efficiency.",
            },
            {
              title: "Ongoing Monitoring and Improvement",
              desc: "We continuously monitor systems and apply improvements to maintain performance, security, and availability.",
            },
          ].map((item) => (
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

      {/* ==================== CALL TO ACTION BANNER - UPDATE TEXT AND IMAGE ====================*/}
      <section className="mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] py-10 md:py-15">
        <SolutionsFooterBanner
          bgImage={ccnaFooter}
          title="Contact Us Today To"
          highlightText="Request a Consultation"
          description="Secure your organization's network with MGKK Information Communication Technology Services."
        />
      </section>
    </main>
  );
}
