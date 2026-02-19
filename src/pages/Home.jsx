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
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-14"
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
            <div className="hidden lg:flex relative lg:h-[600px] items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
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
                    className="w-full h-auto aspect-[4/5] object-cover"
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
        <div className="mx-[2.063rem] md:mx-16 space-y-5">
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
      <section className="flex flex-col p-10 h-full mx-[2.063rem] lg:mx-[7.438rem]">
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="group relative flex-shrink-0 w-[85vw] md:w-[52vw] lg:w-[24vw] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#EBF5FD] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
      <section className="py-16 lg:py-20 bg-[#EBF5FD]">
        <div className="mx-4 sm:mx-6 lg:mx-[7.438rem]">
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
                  className="relative z-10 w-full h-auto rounded-2xl sm:rounded-3xl object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-b-4 border-l-4 sm:border-b-6 sm:border-l-6 border-blue-500 rounded-bl-3xl z-0"></div>
              </div>
            </div>

            {/* RIGHT SIDE - FEATURES */}
            <div className="order-2 lg:order-2 space-y-4 lg:-mt-46">
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

      {/* Featured Solutions */}
      <section className="flex flex-col p-10 h-full mx-[2.063rem] lg:mx-[7.438rem]">
        <div className="text-center w-[65vw] self-center sm:w-[45vw] md:w-auto lg:w-auto">
          <h3>
            Our Featured
            <span className="text-[#1775EE]"> Solutions and Training</span>
          </h3>
        </div>
        <p className="w-[90vw] md:w-[56.406vw] xl:w-[60vw] self-center mt-[1.1vh] text-center">
          MGKK Information Communication Technology Services delivers end-to-end
          ICT and engineering solutions alongside comprehensive training
          programs designed to meet industry demands and support digital
          transformation.
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
                    className={`absolute inset-0 rounded-2xl backdrop-blur-[8px] bg-black/1 transition-opacity duration-500 ${
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
                        className="flex-shrink-0 flex items-center justify-center"
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
                      className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 transition-all duration-500 ease-in-out hover:flex-[2]"
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
                          <div className="flex-shrink-0 flex items-center justify-center">
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
