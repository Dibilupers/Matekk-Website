import Navbar from "../components/navbar/navbar";
import { Settings, Tag, MessageSquare } from "lucide-react";
import Partners from "../components/partners/partners";
import { Link } from "react-router-dom";
import ictImage from "../assets/ict.png";
import webImage from "../assets/web.png";
import { useState, useEffect } from "react";

export default function Home() {
  const totalSlides = 3;
  const totalMobileSlides = 4;
  const totalTabletSlides = 4;
  const totalMobileBottomSlides = 4;
  const [topSlide, setTopSlide] = useState(0);
  const [bottomSlide, setBottomSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1180,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1180);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topMax = isMobile
    ? totalMobileSlides
    : isTablet
      ? totalTabletSlides
      : totalSlides;
  const bottomMax = isMobile
    ? totalMobileBottomSlides
    : isTablet
      ? totalTabletSlides
      : totalSlides;
  const topStep = isMobile
    ? "(85vw + 2.5rem)"
    : isTablet
      ? "(52vw + 2.5rem)"
      : "(24vw + 2.5rem)";
  const bottomStep = isMobile
    ? "(85vw + 2.5rem)"
    : isTablet
      ? "(52vw + 2.5rem)"
      : "(24vw + 2.5rem)";
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tappedCard, setTappedCard] = useState(null);
  const galleryItems = [
    {
      id: 1,
      src: ictImage,
      alt: "Network and Security Infrastructure Projects",
      title: "Network and Security Infrastructure Projects",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
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

  const ITEMS_PER_ROW = 3; // change to 2 or 4 if needed

  // Chunk array into rows
  const rows = galleryItems.reduce((acc, item, i) => {
    const rowIndex = Math.floor(i / ITEMS_PER_ROW);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white py-14"
      >
        <div className="mx-4 sm:mx-6 lg:mx-[7.438rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* LEFT SIDE - CONTENT */}
            <div className="space-y-6 lg:space-y-4 text-left lg:text-left">
              <div className="inline-block">
                <span className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                  ICT & Engineering
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-900">
                Empowering Businesses and Individuals{" "}
                <span className="text-[#1775EE]">Through ICT Excellence</span>
              </h1>

              <p className="text-gray-600 text-base lg:text-xl leading-relaxed max-w-lg text-left">
                Cutting-edge ICT and Engineering Solutions. Industry-relevant
                Training. Built on over a decade of expertise.
              </p>

              <div className="flex sm:flex-row gap-3 sm:gap-4 justify-left lg:justify-start">
                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Explore Our Solutions
                </button>
                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base">
                  View Training Programs
                </button>
              </div>

              <div className="flex flex-nowrap justify-start lg:justify-start items-center gap-2 lg:gap-8 pt-6">
                <div className="flex items-center gap-1">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                    13+
                  </h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">Years of</p>
                    <p className="font-medium whitespace-nowrap">Experience</p>
                  </div>
                </div>
                <div className="h-10 lg:h-12 w-px bg-gray-300 shrink-0"></div>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                    3
                  </h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">
                      Data Centers
                    </p>
                    <p className="font-medium whitespace-nowrap">Deployed</p>
                  </div>
                </div>
                <div className="h-10 lg:h-12 w-px bg-gray-300 shrink-0"></div>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                    10
                  </h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">
                      Total Active
                    </p>
                    <p className="font-medium whitespace-nowrap">Courses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE & OVERLAYS */}
            <div className="hidden lg:flex relative lg:h-150 items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-125 h-125 bg-linear-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
              </div>

              <div className="relative w-full max-w-md">
                <div className="absolute top-45 left-4 lg:-left-30 bg-[#EBF5FD] rounded-2xl shadow-2xl px-4 py-4 z-20 hover:scale-105 transition-transform">
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-4xl font-bold text-[#1775EE]">95%</p>
                    <div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        Passing Rate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-16">
                  <img
                    src="/src/assets/maamgrace2.png"
                    alt="Professional holding laptop with ICT solutions"
                    className="w-full h-auto aspect-4/5 object-cover"
                  />
                </div>

                <div className="absolute top-28 right-2 lg:right-15 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Settings className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="absolute top-50 -right-2 lg:-right-5 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Tag className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="absolute top-78 right-0 lg:-right-14 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                <div className="absolute bottom-15 -right-4 lg:-right-20 bg-[#EBF5FD] rounded-xl shadow-2xl px-4 py-2 max-w-65 z-20 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-3">
                    <img
                      src="/src/assets/maamgrace2.png"
                      alt="Clyde Nelson R."
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1775EE] text-sm truncate">
                        Clyde Nelson R.
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.3">
                        just passed the CCNA certification!
                      </p>
                    </div>
                  </div>
                  <button className="mt-2 w-full py-2.5 bg-[#1775EE] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    View Certification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by our customers & clients */}
      <section className="flex bg-[#EBF5FD] justify-center items-center text-center py-10">
        <div className="mx-[2.063rem] md:mx-16 space-y-4 md:space-y-7">
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-2 font-bold text-3xl">
              <h3>Trusted by Our</h3>
              <h3 className="text-[#1775EE]">Customers & Partners</h3>
            </div>
            <p>
              We collaborate with recognized technology partners to ensure
              quality, reliability, and up-to-date ICT solutions.
            </p>
          </div>
          <Partners />
        </div>
      </section>

      {/* Services we provide */}
      <section className="flex flex-col py-10 h-full mx-[2.063rem] lg:mx-[7.438rem]">
        <div className="text-center w-[60vw] sm:w-[27vw] self-center md:w-auto lg:w-auto">
          <h3>
            Services We Provide to
            <span className="text-[#1775EE]"> Elevate Your Business</span>
          </h3>
        </div>
        <p className="w-[70vw] md:w-[56.406vw] xl:w-[56.406vw] self-center mt-[1.1vh] text-center">
          MGKK Information Communication Technology Services delivers end-to-end
          ICT and engineering solutions alongside comprehensive training
          programs designed to meet industry demands and support digital
          transformation.
        </p>

        {/* ── TOP CAROUSEL ── */}
        <div className="max-w-6xl mx-1 flex flex-col md:flex-row justify-center items-center gap-10 mt-[6vh] md:mx-auto lg:mx-auto">
          {/* Controls — LEFT */}
          <div className="flex flex-col relative md:w-[20vw] self-start gap-y-[1vh] items-start">
            <div className="absolute -top-10 md:-left-10 w-70 h-70 md:w-72 md:h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
            <h6 className="text-sm bg-[#EBF5FD] border border-[#EBF5FD] rounded-full py-[0.7vh] px-4 inline-flex text-center shadow-[0_0_14px_rgba(0,0,0,0.25)]">
              Solutions
            </h6>
            <h5 className="font-rubik font-bold text-2xl w-[50vw] md:w-auto">
              End-to-End ICT & Engineering Solutions
            </h5>
            <p className="font-poppins text-sm mb-[1.5vh] md:mb-[3vh]">
              We provide ICT consultancy and engineering solutions focused on
              planning, building, operating, optimizing, and testing technology
              systems.
            </p>
            <div className="flex flex-row gap-x-[2vh]">
              <button
                onClick={() => setTopSlide((prev) => Math.max(prev - 1, 0))}
                disabled={topSlide === 0}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setTopSlide((prev) => Math.min(prev + 1, topMax - 1))
                }
                disabled={topSlide === topMax - 1}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Viewport */}
          <div className="overflow-hidden w-[85vw] md:w-[52vw]">
            <div
              className="flex gap-x-10 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${topSlide} * ${topStep}))`,
              }}
            >
              {/* Card 1 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={ictImage}
                      alt="ICT Consultancy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    ICT Consultancy
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    MGKK provides ICT consultancy services using the Plan,
                    Build, Operate, Optimize, and Test (PBOOT) approach to
                    support the design, implementation, and improvement of ICT
                    infrastructures.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={webImage}
                      alt="Web and Software Development"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    Web and Software Development
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    We develop web and software solutions that support
                    organizational requirements, using modern technologies to
                    deliver reliable and functional digital systems.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={webImage}
                      alt="Network Infrastructure"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    Network Infrastructure
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    We design and deploy robust network infrastructure solutions
                    that ensure seamless connectivity, security, and scalability
                    for businesses of all sizes.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={ictImage}
                      alt="Training and Development"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    Training & Development
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    MGKK offers comprehensive ICT training programs tailored to
                    industry demands, equipping professionals with the skills
                    needed to thrive in a rapidly evolving digital landscape.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Dot Indicators */}
        <div className="flex justify-center gap-x-2 mt-6">
          {Array.from({ length: topMax }).map((_, i) => (
            <button
              key={i}
              onClick={() => setTopSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                topSlide === i ? "bg-[#1775EE] w-4" : "bg-[#C2DDFF] w-2"
              }`}
            />
          ))}
        </div>

        {/* ── BOTTOM CAROUSEL ── */}
        <div className="max-w-6xl flex flex-col md:flex-row justify-center items-center gap-10 mt-[4vh] md:mt-[8vh]">
          {/* Controls — on mobile: top + right-aligned | on desktop: right column */}
          <div className="flex flex-col relative md:w-[20vw] self-start gap-y-[1vh] items-end text-right order-first md:order-last">
            <div className="absolute -top-10 -right-5 w-72 h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
            <h6 className="text-sm bg-[#EBF5FD] border border-[#EBF5FD] rounded-full py-[0.7vh] px-4 text-center shadow-[0_0_14px_rgba(0,0,0,0.25)]">
              Training
            </h6>
            <h5 className="font-rubik font-bold text-2xl w-[50vw] md:w-auto text-right">
              ICT Training & Skills Development
            </h5>
            <p className="font-poppins text-sm w-full mb-[1vh] md:mb-[3vh] md:w-auto">
              We offers face-to-face and online training programs designed to
              equip individuals and organizations with cutting-edge
              technological knowledge and practical skills.
            </p>
            <div className="flex flex-row gap-x-[2vh]">
              <button
                onClick={() =>
                  setBottomSlide((prev) => Math.min(prev + 1, bottomMax - 1))
                }
                disabled={bottomSlide === bottomMax - 1}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => setBottomSlide((prev) => Math.max(prev - 1, 0))}
                disabled={bottomSlide === 0}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Viewport */}
          <div className="overflow-hidden w-[85vw] md:w-[52vw] order-last md:order-first">
            <div
              className="flex flex-row-reverse gap-x-10 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(${bottomSlide} * ${bottomStep}))`,
              }}
            >
              {/* Card 4 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={ictImage}
                      alt="Training and Development"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    Cybersecurity Training
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    Our cybersecurity training covers cybersecurity
                    fundamentals, ethical hacking, vulnerability assessment and
                    penetration testing (VAPT), and risk management.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={webImage}
                      alt="Network Infrastructure"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    Cloud Computing Training
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    We provide cloud computing training on platforms such as
                    AWS, Microsoft Azure, and Google Cloud through face-to-face
                    and online programs.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={webImage}
                      alt="Web and Software Development"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    Web and Software Development
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    We develop web and software solutions that support
                    organizational requirements, using modern technologies to
                    deliver reliable and functional digital systems.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>

              {/* Card 1 */}
              <div className="group relative shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                  <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={ictImage}
                      alt="ICT Consultancy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="font-inter font-bold text-xl">
                    ICT Consultancy
                  </h5>
                  <p className="font-poppins text-sm mb-[3vh]">
                    MGKK provides ICT consultancy services using the Plan,
                    Build, Operate, Optimize, and Test (PBOOT) approach to
                    support the design, implementation, and improvement of ICT
                    infrastructures.
                  </p>
                  <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                    See more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dot Indicators */}
        <div className="flex justify-center flex-row-reverse gap-x-2 mt-6">
          {Array.from({ length: bottomMax }).map((_, i) => (
            <button
              key={i}
              onClick={() => setBottomSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                bottomSlide === i ? "bg-[#1775EE] w-4" : "bg-[#C2DDFF] w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose MGKK ICT Services */}
      <section className="py-16 lg:py-20 bg-[#EBF5FD] ">
        <div className="mx-[2.063rem] lg:mx-[7.438rem]">
          <div className="mb-12 lg:mb-16 text-left md:text-center sm:text-left lg:text-left">
            <h2 className="text-3xl lg:text-3xl font-bold leading-tight text-[#000000]">
              Why Choose <span className="text-[#1775EE]">MGKK</span>
              <br className="sm:hidden" />
              <span className="text-[#1775EE]"> ICT Services?</span>
            </h2>
            <p className="text-base lg:text-sm leading-relaxed text-[#000000] mt-4 max-w-133 mx-auto lg:mx-0 text-justify">
              MGKK Information Communication Technology Services is committed to
              delivering reliable ICT solutions and high-quality training
              through experienced professionals, proven methodologies, and a
              strong focus on innovation, integrity, and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* LEFT SIDE - IMAGE */}
            <div className="order-1 lg:order-1">
              <div className="relative max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-t-4 border-r-4 sm:border-t-6 sm:border-r-6 border-blue-500 rounded-tr-3xl z-0"></div>
                <img
                  src="/src/assets/handshake.png"
                  alt="Professional handshake - MGKK ICT Services team"
                  className="relative z-10 w-full h-auto rounded-2xl sm:rounded-3xl object-cover aspect-4/5"
                />
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-b-4 border-l-4 sm:border-b-6 sm:border-l-6 border-blue-500 rounded-bl-3xl z-0"></div>
              </div>
            </div>

            {/* RIGHT SIDE - FEATURES */}
            <div className="order-2 lg:order-2 space-y-4 lg:-mt-52">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-2">
                  Experience
                </h3>
                <p className="text-sm lg:text-base text-[#000000] leading-relaxed">
                  Over a decade of providing ICT and engineering solutions and
                  professional training since our establishment in 2013.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-2">
                  Expertise
                </h3>
                <p className="text-sm lg:text-base text-[#000000] leading-relaxed">
                  Led by a Professional Electronics Engineer and supported by
                  certified engineers, technicians, and instructors with strong
                  industry and academic backgrounds.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-2">
                  Quality Training
                </h3>
                <p className="text-sm lg:text-base text-[#000000] leading-relaxed">
                  We offer face-to-face and online training programs aligned
                  with industry standards and globally recognized
                  certifications.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-2">
                  End-to-End Approach
                </h3>
                <p className="text-sm lg:text-base text-[#000000] leading-relaxed">
                  We follow the Plan, Build, Operate, Optimize, and Test (PBOOT)
                  methodology to ensure structured and effective delivery of ICT
                  solutions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-2">
                  Innovation & Integrity
                </h3>
                <p className="text-sm lg:text-base text-[#000000] leading-relaxed">
                  Our work is guided by core values that emphasize innovation,
                  ethical practices, excellence, collaboration, and continuous
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Working Process */}
      <section className="py-16 lg:py-20 bg-white">
        {/* 
          ADJUST SECTION PADDING:
          - py-16 lg:py-20 = vertical padding (top/bottom)
          - bg-white = background color (change to bg-gray-50 for light gray)
        */}
        <div className="mx-4 sm:mx-6 lg:mx-[7.438rem]">
          {/* ==================== SECTION HEADING ==================== */}
          <div className="text-center mb-12 lg:mb-16">
            {/* 
              ADJUST HEADING:
              - text-3xl lg:text-4xl = font size
              - font-bold = weight
              - text-gray-900 = "Our" color
              - text-[#1775EE] = "Working Process" color (blue)
            */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our <span className="text-[#1775EE]">Working Process</span>
            </h2>

            {/* 
              ADJUST DESCRIPTION:
              - text-base lg:text-lg = font size
              - text-gray-600 = color
              - mt-4 = top margin
              - max-w-2xl = maximum width
              - mx-auto = centers the text
            */}
            <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* ==================== PROCESS TIMELINE ==================== */}
          {/* 
            ADJUST TIMELINE LAYOUT:
            - This uses a horizontal flow with connected circles
            - On mobile, it will stack vertically
            - hidden lg:block = shows connecting line only on desktop
          */}
          <div className="relative">
            {/* Desktop Version - Horizontal Timeline */}
            <div className="hidden lg:block relative">
              {/* 
                ADJUST DESKTOP LAYOUT:
                - Uses positioned divs to create the exact layout from the design
                - Curved connecting lines using SVG
                - Staggered vertical positioning for visual flow
              */}

              {/* Container for all steps with relative positioning */}
              <div className="relative h-125">
                {/* 
                  ADJUST CONTAINER HEIGHT:
                  - h-[500px] = total height (change to h-[400px] for shorter, h-[600px] for taller)
                */}

                {/* SVG for Connecting Lines */}
                {/* 
                  ADJUST LINES HERE:
                  Each path connects two circles with a curved line
                  Format: M startX startY Q curveX curveY endX endY
                  
                  TO MOVE LINES:
                  - Change start point (M values)
                  - Change curve point (Q values) 
                  - Change end point (final values)
                  - Adjust strokeWidth for thickness (currently 6)
                */}
                <svg
                  className="absolute inset-0 w-full h-full z-0"
                  viewBox="0 0 1200 500"
                >
                  {/* Line 1: Initiation to Planning */}
                  {/* Start: top-left circle, End: 20% left circle */}
                  <path
                    d="M 1 1 C 120 100, 200 1, 335 110"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Line 2: Planning to Implementation */}
                  {/* Start: 20% circle, End: 40% circle */}
                  <path
                    d="M 350 120 C 430 130, 500 190, 600 150"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Line 3: Implementation to Monitor */}
                  {/* Start: 40% circle, End: 60% circle */}
                  <path
                    d="M 600 190 C 600 130, 800 200, 860 200"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Line 4: Monitor to Optimization */}
                  {/* Start: 60% circle, End: right circle */}
                  <path
                    d="M 830 200 C 800 150, 845 350, 1500 275"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Step 1: Initiation & Consultancy (Top Left) */}
                <div className="absolute left-0 top-5 flex flex-col items-center max-w-50 z-10">
                  <div className="w-22 h-22 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    Initiation & Consultancy
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Understand requirements and define project direction.
                  </p>
                </div>

                {/* Step 2: Planning & Design (Lower position) */}
                <div className="absolute left-[20%] top-18.75 flex flex-col items-center max-w-50 z-10">
                  <div className="w-22 h-22 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    Planning & Design
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Create structured plans and system designs.
                  </p>
                </div>

                {/* Step 3: Implementation (Middle) */}
                <div className="absolute left-[40%] top-32.5 flex flex-col items-center max-w-50 z-10">
                  <div className="w-22 h-22 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    Implementation
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Deploy and configure approved solutions.
                  </p>
                </div>

                {/* Step 4: Monitor and Control (Lower right) */}
                <div className="absolute left-[60%] top-40 flex flex-col items-center max-w-50 z-10">
                  <div className="w-22 h-22 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    Monitor and Control
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Track performance and ensure proper operation.
                  </p>
                </div>

                {/* Step 5: Optimization (Bottom Right) */}
                <div className="absolute right-0 top-57.5 flex flex-col items-center max-w-50 z-10">
                  <div className="w-22 h-22 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    Optimization
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Improve systems through testing and refinement.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Version - Vertical Timeline */}
            {/* 
              ADJUST MOBILE LAYOUT:
              - lg:hidden = hidden on desktop, shown on mobile
              - space-y-8 = vertical spacing between steps
            */}
            <div className="lg:hidden space-y-8">
              {/* Step 1: Initiation & Consultancy */}
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    Initiation & Consultancy
                  </h5>
                  <p className="text-sm text-gray-600">
                    Understand requirements and define project direction.
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-start pl-10">
                <div className="w-0.5 h-8 bg-blue-500"></div>
              </div>

              {/* Step 2: Planning & Design */}
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    Planning & Design
                  </h5>
                  <p className="text-sm text-gray-600">
                    Create structured plans and system designs.
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-start pl-10">
                <div className="w-0.5 h-8 bg-blue-500"></div>
              </div>

              {/* Step 3: Implementation */}
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    Implementation
                  </h5>
                  <p className="text-sm text-gray-600">
                    Deploy and configure approved solutions.
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-start pl-10">
                <div className="w-0.5 h-8 bg-blue-500"></div>
              </div>

              {/* Step 4: Monitor and Control */}
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    Monitor and Control
                  </h5>
                  <p className="text-sm text-gray-600">
                    Track performance and ensure proper operation.
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-start pl-10">
                <div className="w-0.5 h-8 bg-blue-500"></div>
              </div>

              {/* Step 5: Optimization */}
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    Optimization
                  </h5>
                  <p className="text-sm text-gray-600">
                    Improve systems through testing and refinement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Solutions */}
      <section className="flex flex-col py-10 h-full bg-[#EBF5FD]">
        <div className="mx-[2.063rem] lg:mx-[7.438rem]">
          <div className="text-center w-[65vw] self-center sm:w-[45vw] md:w-auto lg:w-auto">
            <h3>
              Our Featured
              <span className="text-[#1775EE]"> Solutions and Training</span>
            </h3>
          </div>
          <p className="w-[90vw] md:w-[56.406vw] xl:w-[60vw] self-center mx-auto mt-[1.1vh] text-center">
            MGKK Information Communication Technology Services delivers
            end-to-end ICT and engineering solutions alongside comprehensive
            training programs designed to meet industry demands and support
            digital transformation.
          </p>
          {/* Gallery */}
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
                        <Link
                          to={item.link}
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 17L17 7M17 7H7M17 7v10"
                            />
                          </svg>
                        </Link>
                      </div>

                      {/* Description below title */}
                      <p className="text-white/80 mt-2 line-clamp-3">
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
                        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-black/1 to-transparent backdrop-blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="absolute bottom-0 inset-x-0 px-4 py-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="flex items-end justify-between gap-3">
                            <div className="flex-1">
                              <h5 className="text-white font-bold">
                                {item.title}
                              </h5>
                              <p className="text-white/80 mt-1 line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                            <div className="shrink-0 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 17L17 7M17 7H7M17 7v10"
                                />
                              </svg>
                            </div>
                          </div>
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

      {/* About the Company */}
      <section></section>

      {/* Frequently Asked Questions */}
      <section></section>

      {/* Contact Us */}
      <section></section>
    </main>
  );
}
