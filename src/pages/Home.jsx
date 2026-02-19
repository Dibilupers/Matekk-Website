import Navbar from "../components/navbar/navbar";
import { Settings, Tag, MessageSquare } from "lucide-react";
import Partners from "../components/partners/partners";
import { Link } from "react-router-dom";
import ictImage from "../assets/ict.png";
import webImage from "../assets/web.png";
import { useState } from "react";

export default function Home() {
  const totalSlides = 3;
  const [topSlide, setTopSlide] = useState(0);
  const [bottomSlide, setBottomSlide] = useState(0);

  return (
    <main>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-14"
      >
        {/* 
          ADJUST SECTION CONTAINER:
          - mx-auto max-w-7xl = section width (change max-w-7xl to max-w-6xl for narrower, max-w-screen-2xl for wider)
          - px-4 sm:px-6 lg:px-8 = side padding
          - py-12 lg:py-8 = top/bottom padding (increase for more space)
        */}
        <div className="mx-4 sm:mx-6 lg:mx-[7.438rem]">
          {/* 
            ADJUST GRID LAYOUT:
            - gap-8 lg:gap-16 = space between left and right columns
            - grid-cols-1 lg:grid-cols-2 = 1 column mobile, 2 columns desktop
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ==================== LEFT SIDE - CONTENT ==================== */}
            <div className="space-y-6 lg:space-y-4 text-left lg:text-left">
              <div className="inline-block">
                <span className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                  ICT & Engineering
                </span>
              </div>

              {/* ==================== MAIN HEADING ==================== */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-900">
                Empowering Businesses and Individuals{" "}
                <span className="text-[#1775EE]">Through ICT Excellence</span>
              </h1>

              {/* ==================== DESCRIPTION ==================== */}
              <p className="text-gray-600 text-base lg:text-xl leading-relaxed max-w-lg text-left">
                Cutting-edge ICT and Engineering Solutions. Industry-relevant
                Training. Built on over a decade of expertise.
              </p>

              {/* ==================== CTA BUTTONS ==================== */}
              <div className="flex sm:flex-row gap-3 sm:gap-4 justify-left lg:justify-start">
                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Explore Our Solutions
                </button>

                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base">
                  View Training Programs
                </button>
              </div>

              {/* ==================== STATS SECTION ==================== */}
              <div className="flex flex-nowrap justify-start lg:justify-start items-center gap-4 lg:gap-8 pt-6">
                {/* STAT 1: YEARS OF EXPERIENCE */}
                <div className="flex items-center gap-1">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                    13+
                  </h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">Years of</p>
                    <p className="font-medium whitespace-nowrap">Experience</p>
                  </div>
                </div>

                {/* DIVIDER LINE */}
                <div className="h-10 lg:h-12 w-px bg-gray-300 shrink-0"></div>

                {/* STAT 2: DATA CENTERS */}
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

                {/* DIVIDER LINE */}
                <div className="h-10 lg:h-12 w-px bg-gray-300 shrink-0"></div>

                {/* STAT 3: ACTIVE COURSES */}
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

            {/* ==================== RIGHT SIDE - IMAGE & OVERLAYS ==================== */}
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
      <section
        id=""
        className="flex bg-[#EBF5FD] justify-center items-center text-center py-10"
      >
        {/* Title and description */}
        <div className="mx-[2.063rem] md:mx-16 space-y-5">
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-2 font-bold text-3xl">
              <h3 className="">Trusted by Our</h3>
              <h3 className="text-[#1775EE]">Customers & Partners</h3>
            </div>
            <p>
              We collaborate with recognized technology partners to ensure
              quality, reliability, and up-to-date ICT solutions.
            </p>
          </div>

          {/* Partners Logo (Should be scrollable horizontally) */}
          <Partners />
        </div>
      </section>
      {/* Services we provide */}
      <section className="flex flex-col p-10 h-full">
        <div className="text-center">
          <h2 className="font-bold text-3xl">
            Services We Provide to
            <span className="text-[#1775EE] font-rubik font-bold text-3xl">
              {" "}
              Elevate Your Business
            </span>
          </h2>
        </div>
        <p className="font-poppins text-sm w-[56.406vw] self-center mt-[1.1vh] text-center">
          MGKK Information Communication Technology Services delivers end-to-end
          ICT and engineering solutions alongside comprehensive training
          programs designed to meet industry demands and support digital
          transformation.
        </p>

        {/* ── TOP CAROUSEL ── */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10 mt-[6vh]">
          {/* Controls — LEFT */}
          <div className="flex flex-col relative w-[20vw] h-[46.8vh] self-start gap-y-[1vh]">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
            <p className="font-inter text-sm bg-[#EBF5FD] border border-[#EBF5FD] rounded-full py-[0.7vh] px-[0.781vw] w-[6.323vw] text-center shadow-[0_0_14px_rgba(0,0,0,0.25)]">
              Solutions
            </p>
            <h1 className="font-rubik font-bold text-2xl">
              End-to-End ICT & Engineering Solutions
            </h1>
            <p className="font-poppins text-sm mb-[3vh]">
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
                  setTopSlide((prev) => Math.min(prev + 1, totalSlides - 1))
                }
                disabled={topSlide === totalSlides - 1}
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
          <div className="overflow-hidden w-[52vw]">
            <div
              className="flex gap-x-10 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${topSlide} * (24vw + 2.5rem)))`,
              }}
            >
              {/* Card 1 */}
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    ICT Consultancy
                  </h1>
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
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    Web and Software Development
                  </h1>
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
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    Network Infrastructure
                  </h1>
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
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    Training & Development
                  </h1>
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
          {Array.from({ length: totalSlides }).map((_, i) => (
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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10 mt-[8vh]">
          {/* Viewport — comes FIRST in DOM so it sits on the LEFT visually */}
          <div className="overflow-hidden w-[52vw]">
            {/*
        Cards are ordered RIGHT-TO-LEFT visually:
        We use flex-row-reverse so Card 1 appears on the right,
        and we translate in the POSITIVE direction to slide left.
      */}
            <div
              className="flex flex-row-reverse gap-x-10 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(${bottomSlide} * (24vw + 2.5rem)))`,
              }}
            >
              {/* Card 4 */}
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    Training & Development
                  </h1>
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

              {/* Card 3 */}
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    Network Infrastructure
                  </h1>
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

              {/* Card 2 */}
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    Web and Software Development
                  </h1>
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
              <div className="group relative flex-shrink-0 w-[24vw] rounded-xl overflow-hidden h-[56.8vh]">
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
                  <h1 className="font-inter font-bold text-xl">
                    ICT Consultancy
                  </h1>
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

          {/* Controls — RIGHT */}
          <div className="flex flex-col relative w-[20vw] h-[46.8vh] self-start gap-y-[1vh] items-end text-right">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
            <p className="font-inter text-sm bg-[#EBF5FD] border border-[#EBF5FD] rounded-full py-[0.7vh] px-[0.781vw] w-[6.323vw] text-center shadow-[0_0_14px_rgba(0,0,0,0.25)]">
              Solutions
            </p>
            <h1 className="font-rubik font-bold text-2xl">
              End-to-End ICT & Engineering Solutions
            </h1>
            <p className="font-poppins text-sm mb-[3vh]">
              We provide ICT consultancy and engineering solutions focused on
              planning, building, operating, optimizing, and testing technology
              systems.
            </p>
            <div className="flex flex-row gap-x-[2vh]">
              {/* Left arrow → slides cards to the RIGHT (reveal previous) */}
              <button
                onClick={() =>
                  setBottomSlide((prev) => Math.min(prev + 1, totalSlides - 1))
                }
                disabled={bottomSlide === totalSlides - 1}
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
              {/* Right arrow → slides cards to the LEFT (reveal next) */}
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
        </div>

        {/* Bottom Dot Indicators */}
        <div className="flex justify-center flex-row-reverse gap-x-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, i) => (
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
          {/* ==================== SECTION HEADING - AT TOP ==================== */}
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

          {/* ==================== IMAGE AND FEATURES SIDE BY SIDE ==================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* ==================== LEFT SIDE - IMAGE ==================== */}
            <div className="order-1 lg:order-1">
              <div className="relative max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-t-4 border-r-4 sm:border-t-6 sm:border-r-6 border-blue-500 rounded-tr-3xl z-0"></div>
                {/* Main Image */}
                <img
                  src="/src/assets/handshake.png"
                  alt="Professional handshake - MGKK ICT Services team"
                  className="relative z-10 w-full h-auto rounded-2xl sm:rounded-3xl object-cover aspect-[4/5]"
                />

                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-b-4 border-l-4 sm:border-b-6 sm:border-l-6 border-blue-500 rounded-bl-3xl z-0"></div>
              </div>
            </div>

            {/* ==================== RIGHT SIDE - FEATURES ==================== */}
            <div className="order-2 lg:order-2 space-y-4 lg:-mt-46">
              {/* FEATURE 1: EXPERIENCE */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg lg:text-xl font-bold text-[#000000] mb-2">
                  Experience
                </h3>
                <p className="text-sm lg:text-base text-[#000000] leading-relaxed">
                  Over a decade of providing ICT and engineering solutions and
                  professional training since our establishment in 2013.
                </p>
              </div>

              {/* FEATURE 2: EXPERTISE */}
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

              {/* FEATURE 3: QUALITY TRAINING */}
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

              {/* FEATURE 4: END-TO-END APPROACH */}
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

              {/* FEATURE 5: INNOVATION & INTEGRITY */}
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

      {/* About the Company */}
      <section></section>

      {/* Frequently Asked Questions */}
      <section></section>

      {/* Contact Us */}
      <section></section>
    </main>
  );
}
