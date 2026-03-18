// ==================== IMPORTS - UPDATE FOR EACH  ====================
// Change these imports based on the specific
import Button from "../../../components/ui/button";
import { useState } from "react";
// Replace these for different pages
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png";
import ictImage from "../../../assets/ict.png";
import webImage from "../../../assets/web.png";
import FAQ from "../../../components/FAQ/faq";
import address from "../../../assets/location.svg";
import ContactForm from "../../../components/contact/Contact.jsx";
import phone from "../../../assets/phone.svg";
import email from "../../../assets/email.svg";
import availability from "../../../assets/availability.svg";
import SolutionsHeroBanner from "../../../components/section/SolutionsHeroBanner";
import SolutionsFooterBanner from "../../../components/section/SolutionsFooterBanner";
// ==================== COMPONENT NAME - CHANGE FOR EACH  ====================
export default function CCNAAutomation() {
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
      desc: "Interconnected electrical substations via SCADA systems through ICT infrastructure that enabled centralized, remote monitoring and control of multiple geographic dispersed areas that enhanced grid reliability, reduced downtime, and automated power distribution.",
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
    <div className="flex flex-col py-10 h-full scroll-mt-18">
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
      <div className="flex flex-col lg:flex-row gap-8 mt-7.5 lg:mt-15 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem]">
        {/* Content */}
        <div className="flex flex-col gap-y-8 flex-1">
          {/* ==================== TEXT ====================*/}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-x-16.5">
            <h3 className="w-full lg:w-[45%] shrink-0">
              Building Scalable and Secure Network Infrastructure to
              <span className="text-[#1775EE]">
                {" "}
                Support Business Continuity
              </span>
            </h3>
            <p className="w-full lg:w-[60%] leading-relaxed bg-[#EBF5FD] p-7.5 rounded-2xl">
              Our ICT Network and Security Infrastructure service focuses on the
              design, implementation, configuration, and optimization of secure
              network environments. We help organizations build reliable network
              architectures that support business operations while maintaining
              strong security controls.
            </p>
          </div>
        </div>
      </div>
      {/* Challenges Section */}
      <div className="bg-[#EBF5FD] py-10 px-[2.063rem] md:px-16 lg:px-16 xl:px-[7.438rem] flex flex-col items-center gap-y-6 my-15">
        <h3 className="text-center">
          <span className="text-[#1775EE]">Challenges Addressed</span> by This
          Service
        </h3>

        {/* Row 1 — 3 cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Unstable or poorly designed network infrastructure",
            "Security risks due to misconfigured or outdated systems",
            "Limited network visibility and monitoring",
          ].map((text) => (
            <div
              key={text}
              className="flex items-center gap-3 bg-white rounded-2xl p-5 w-87 shadow-sm"
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
              <p className="text-sm font-medium leading-snug">{text}</p>
            </div>
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Scalability issues as organizational needs grow",
            "Compliance and security policy concerns",
          ].map((text) => (
            <div
              key={text}
              className="flex items-center gap-3 bg-white rounded-2xl p-5 w-87 lg:w-79 shadow-sm"
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
              <p className="text-sm font-medium leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Scope and Key section */}
      <div className="mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] flex flex-col lg:flex-row gap-y-6 lg:gap-x-7.5">
        {/* Title */}
        <h3 className="shrink-0 lg:w-80">
          Scope and Key <span className="text-[#1775EE]">Deliverables</span>
        </h3>

        {/* Cards — 1 col on mobile, 2 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
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
              className="shadow-md rounded-2xl p-6 flex flex-col gap-y-3"
            >
              <h5 className="text-[#1775EE]">{item.title}</h5>
              <p className="leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Relevant Experience */}
      <div className="bg-[#EBF5FD] py-10 px-[2.063rem] md:px-16 lg:px-16 xl:px-[7.438rem] flex flex-col items-center gap-y-6 my-15">
        <h3>
          Relevant Project <span className="text-[#1775EE]"> Experience</span>
        </h3>
        <p className="text-center w-[55%]">
          This section highlights selected projects demonstrating our experience
          in delivering similar ICT services, including the scope of work
          performed and the types of organizations served.
        </p>
        <div className="mt-[4vh]">
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
                  className="relative self-center rounded-2xl overflow-hidden cursor-pointer w-[90vw] h-[30vh]"
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
                    className={`absolute inset-0 px-5 flex flex-col justify-center transition-opacity duration-500 ${
                      tappedCard === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Title row */}
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-white leading-tight flex-1">
                        {item.title}
                      </h5>
                    </div>

                    {/* Description below title */}
                    <p className="text-white/80 mt-2 overflow-y-auto">
                      {item.desc}
                    </p>
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
                      className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 transition-all duration-500 ease-in-out hover:flex-2"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Blur */}
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content — centered */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <h5 className="text-white font-bold">{item.title}</h5>
                        <p className="text-white/80 mt-2 overflow-y-auto">
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

      {/* ==================== CALL TO ACTION BANNER - UPDATE TEXT AND IMAGE ====================*/}
      <SolutionsFooterBanner
        bgImage={ccnaFooter}
        title="Contact Us Today To"
        highlightText="Request a Consultation"
        description="Secure your organization's network with MGKK Information Communication Technology Services."
      />

      {/* FAQ */}
      <section className="flex flex-col md:flex-col scroll-mt-18 mt-10 lg:mt-0 lg:flex-row xl:flex-row justify-center items-start bg-white pb-16 md:py-12 lg:py-20 space-y-0 sm:space-y-[-2rem] md:space-y-10 lg:space-y-0">
        {/* Title and Still Have Questions Container */}
        <div className=" mr-[2.063rem] ml-[2.063rem] mb-6 md:mb-0 md:ml-6 lg:ml-[7.4rem] mt-12 md:mt-10 lg:mt-0 w-[84%] md:w-[71%] lg:w-fit space-y-6 md:space-y-36 justify-center items-start">
          {/* Title */}
          <div className=" w-full md:w-full space-y-2 ">
            <h3 className="text-[1.5rem] md:text-3xl lg:text-[2rem] font-bold text-black w-[35vw] md:w-[15vw] lg:w-[22vw]">
              Frequently <span className="text-[#1775EE]">Asked Questions</span>
            </h3>
          </div>

          {/* Still Have Questions Container */}
          <div className="bg-[#EBF5FD] p-7.5 rounded-xl shadow-md border border-[#EBF5FD] hidden md:block w-full md:w-[90%] lg:w-[95%]">
            <h5 className="mb-3.75">Still Have Questions?</h5>
            <p className="w-[95%] md:w-[90%] lg:w-[78%] text-black mb-7.5">
              To be a global leader in ICT and Engineering solutions, recognized
              for excellence, innovation, and commitment to client success.
            </p>
            <Button
              title="Contact Us"
              type="none"
              buttonCustomStyle="bg-[#1775EE] text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>
        <div className="mr-[2.063rem] ml-[2.063rem] md:ml-[7rem] lg:ml-[2.063rem] md:mr-[7.438rem] w-[84%] md:w-[70%] justify-center items-start">
          <FAQ />
        </div>
      </section>

      {/* Contact us */}
      <section
        id="contact"
        className="flex justify-center items-center py-16 lg:py-20 bg-[#EBF5FD] scroll-mt-18"
      >
        <div className="w-full h-full flex mx-[2.063rem] lg:mx-[7.438rem] flex-col-reverse md:flex-col-reverse lg:flex-row space-x-0 md:space-x-0 lg:space-x-16 items-center space-y-6 md:space-y-12 lg:space-y-0">
          <ContactForm />
          <div className="w-full items-start mb-6.5 lg:mb-0">
            <h6 className="text-sm bg-white border border-[#EBF5FD] rounded-full py-[0.7vh] px-4 inline-flex text-center shadow-md">
              Contact Us
            </h6>
            <h3 className="text-[1.5rem] md:text-3xl lg:text-[2rem] my-2.5">
              Get In Touch With Us <span className="text-[#1775EE]">Today</span>
            </h3>
            <p className="lg:w-[37vw] mb-10">
              Get in touch with MGKK Information Communication Technology
              Services to inquire about our ICT solutions, training programs, or
              request a consultation. Our team is ready to assist you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[6.4vw] md:mb-0">
              {/* Address */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1775EE] rounded-xl p-3 flex items-center justify-center shrink-0">
                  <img src={address} alt="Location Icon" className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-black text-sm">Address</h5>
                  <p className="text-xs">
                    10B Kalantiao Marikina, Metro Manila
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1775EE] rounded-xl p-3 flex items-center justify-center shrink-0">
                  <img src={phone} alt="Phone Icon" className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-black text-sm">Phone</h5>
                  <p className="text-xs">09771968226</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1775EE] rounded-xl p-3 flex items-center justify-center shrink-0">
                  <img src={email} alt="Email Icon" className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-black text-sm">Email</h5>
                  <p className="text-xs">converge.training.it@gmail.com</p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1775EE] rounded-xl p-3 flex items-center justify-center shrink-0">
                  <img
                    src={availability}
                    alt="Availability Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h5 className="font-semibold text-black text-sm">
                    Availability
                  </h5>
                  <p className="text-xs">Lorem Ipsum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
