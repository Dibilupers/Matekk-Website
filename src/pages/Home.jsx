import { Settings, Tag, MessageSquare, Contact } from "lucide-react";
import Partners from "../components/partners/partners";
import { Link } from "react-router-dom";
/* Solutions Gallery Imgs */
import gallery1 from "../assets/solutionsGallery1.webp";
import gallery2 from "../assets/solutionsGallery2.webp";
import gallery3 from "../assets/solutionsGallery3.webp";
import gallery4 from "../assets/solutionsGallery4.webp";
import gallery5 from "../assets/solutionsGallery5.webp";

import MaamGrace from "../assets/person_holding_laptop.png";
import ClydeNelsonRocillo from "../assets/Clyde_Nelson_Rocillo.jpg";
import SirMark from "../assets/Mark_Anthony_Valenzuela_Melendres.png";
import ictImage from "../assets/ict.png";
import CompanyBuilding from "../assets/MGGK_Building.png";
import webImage from "../assets/web.png";
import { useState, useEffect } from "react";
import FAQ from "../components/FAQ/faq";
import ContactForm from "../components/contact/Contact.jsx";
import address from "../assets/location.svg";
import phone from "../assets/phone.svg";
import email from "../assets/email.svg";
import availability from "../assets/availability.svg";
import Button from "../../src/components/ui/button";
import Handshake from "../../src/assets/handshake.png"
import { useLocation } from "react-router-dom";
import TestimonialsSection from "../components/section/TestimonialsSection.jsx";

export default function Home() {
  const totalSlides = 3;
  const totalMobileSlides = 4;
  const totalTabletSlides = 4;
  const totalMobileBottomSlides = 4;
  const [topSlide, setTopSlide] = useState(0);
  const [bottomSlide, setBottomSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    () => window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [is2xl, setIs2xl] = useState(() => window.innerWidth >= 1536);
  const location = useLocation();
  /* Scroll function for when user comes form another page scrolls to home */
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIs2xl(window.innerWidth >= 1536);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // Only scroll to top on fresh page load (no scrollTo state)
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);
  /* Solutions Gallery Images */
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
    ? "(78.2vw + 2.5rem)"
    : isTablet
      ? "(39vw + 2.5rem)"
      : is2xl
        ? "(24vw + 2.5rem)"
        : "(27vw + 2.5rem)";
  const bottomStep = isMobile
    ? "(77vw + 2.5rem)"
    : isTablet
      ? "(39vw + 2.5rem)"
      : is2xl
        ? "(24vw + 2.5rem)"
        : "(25vw + 2.5rem)";
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tappedCard, setTappedCard] = useState(null);
  const galleryItems = [
    {
      id: 1,
      src: gallery1,
      alt: "Network and Security Infrastructure Projects",
      title: "Network and Security Infrastructure Projects",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      link: "/solutions/network", // add link to every item
    },
    {
      id: 2,
      src: gallery2,
      alt: "SLSU Delegates",
      title: "SLSU Delegates Welcome",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 3,
      src: gallery3,
      alt: "Team Celebration",
      title: "Team Celebration",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 4,
      src: gallery4,
      alt: "Ideas Workshop",
      title: "Ideas Workshop",
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 5,
      src: gallery5,
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
      {/* ==================== HERO BANNER ====================*/}
      <section id="home" className="flex justify-center items-center py-25 md:py-20 lg:py-0 scroll-mt-18 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full bg-amber-100">
        {/* Section Margin */}
        {/* ====== HERO BANNER - Content ======*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ====== LEFT SIDE - Content (Title, description, buttons, images) ====== */}
          <div className="space-y-10 lg:space-y-12 text-left">
            {/* Title to Buttons Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h6 className="w-fit px-3 py-1 bg-blue-50 rounded-full shadow-[0px_0px_6px_-3px_rgba(0,0,0,0.5)]">
                  ICT & Engineering
                </h6>

                <h1 className="pr-7 sm:pr-8 lg:pr-7 font-bold leading-tight space-x-2">
                  Empowering Businesses
                  <span> and Individuals</span>
                  <span className="text-[#1775EE]">
                    Through ICT Excellence
                  </span>
                </h1>

                <p className="max-w-lg text-left">
                  Cutting-edge ICT and Engineering Solutions.
                  Industry-relevant Training. Built on over a decade of
                  expertise.
                </p>
              </div>
              <div className="flex sm:flex-row gap-3 sm:gap-4 justify-left lg:justify-start">
                <Button
                  title="Explore Our Solutions"
                  type="none"
                  buttonCustomStyle="bg-[#1775EE] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] px-6 py-3"
                  btnFunc={() => {
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                />
                <Button
                  title="View Training Programs"
                  type="none"
                  buttonCustomStyle="text-blue-600 border border-blue-600 hover:bg-[#0062E0] hover:border-[#0062E0] hover:text-white  transition-all duration-300"
                  btnFunc={() => {
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                />
              </div>
            </div>

            {/* Experiences Content */}
            <div className="flex space-x-4 justify-center items-center md:justify-start md:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="font-bold">13</h3>
                <div className="text-gray-600 leading-tight flex flex-col justify-center lg:justify-start items-center md:items-start">
                  <p className="font-medium whitespace-nowrap">Years of</p>
                  <p className="font-medium whitespace-nowrap">Experience</p>
                </div>
              </div>
              <div className="h-18 md:h-10 lg:h-12 w-px bg-black shrink-0"></div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="font-bold">3</h3>
                <div className="text-gray-600 leading-tight flex flex-col justify-center lg:justify-start items-center md:items-start">
                  <p className="font-medium whitespace-nowrap">
                    Data Centers
                  </p>
                  <p className="font-medium whitespace-nowrap">Deployed</p>
                </div>
              </div>
              <div className="h-18 md:h-10 lg:h-12 w-px bg-black shrink-0"></div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="font-bold">10</h3>
                <div className="text-gray-600 leading-tight flex flex-col justify-center lg:justify-start items-center md:items-start">
                  <p className="font-medium whitespace-nowrap">
                    Total Active
                  </p>
                  <p className="font-medium whitespace-nowrap">Courses</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== RIGHT SIDE - Images (Passing rate, Icons, Images, One feedback) ====== */}
          <div className="hidden lg:flex relative lg:h-135 items-center justify-center">
            {/* Image Background Color */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-70 h-70 bg-linear-to-br from-[#3084F0] to-[#DAEBFC] rounded-full blur-3xl"></div>
            </div>

            {/* Passing Rate */}
            <div className="relative w-full max-w-md">
              <div className="hidden xl:flex absolute top-31 left-4 lg:-left-35 bg-[#EBF5FD] rounded-xl shadow-xl/10 px-4 py-3 z-20 hover:scale-105 transition duration-300 ease-in-out justify-center items-center gap-3">
                <h3 className="font-bold text-[#1775EE]">95%</h3>
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
                  <p>Passing Rate</p>
                </div>
              </div>
              {/* Person Image */}
              <div className="relative right-6">
                <img
                  src={MaamGrace}
                  alt="Professional holding laptop with ICT solutions"
                  className="w-[90%]"
                />
              </div>
              {/* Side Icons */}
              <div className="home_side_icons_container top-9 right-1 lg:right-30">
                <Settings className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="home_side_icons_container top-24 -right-2 lg:right-13">
                <Tag className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="home_side_icons_container top-45 right-0 lg:right-4">
                <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              {/* One Feedback and Its Exam Status */}
              <div className="hidden xl:flex absolute bottom-15 -right-4 lg:-right-10 bg-[#EBF5FD] rounded-xl shadow-2xl px-3 py-3 max-w-61 z-20 transition-transform flex-col justify-center items-center gap-2">
                <div className="flex items-start gap-3">
                  <img
                    src={ClydeNelsonRocillo}
                    alt="Clyde Nelson R."
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1 pr-2">
                    <p className="text-[#1775EE] truncate font-bold">
                      Clyde Nelson R.
                    </p>
                    <p className="text-xs">
                      just passed the CCNA certification!
                    </p>
                  </div>
                </div>
                <Button
                  title="View Certification"
                  type="none"
                  buttonCustomStyle="bg-[#1775EE] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] px-6 py-3 w-full"
                  btnFunc={() => {
                    document.getElementById("feedbacks")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS LOGO ====================*/}
      <section
        className="flex bg-[#EBF5FD] justify-center items-center text-center py-10 md:py-15 scroll-mt-18"
        id="partners"
      >
        {/* Section Margin and Spacing */}
        <div className="mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-4 md:space-y-7">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center space-y-1">
            {/* Title */}
            <div className="flex flex-col sm:flex-row space-x-2">
              <h3>Trusted by Our <span className="text-[#1775EE]">Customers & Partners</span></h3>
            </div>
            {/* Description */}
            <p className="w-78 sm:w-lg md:w-lg lg:w-xl xl:w-full">
              We collaborate with recognized technology partners to ensure
              quality, reliability, and up-to-date ICT solutions.
            </p>
          </div>
          {/* Logos */}
          <Partners />
        </div>
      </section>

      {/* ==================== SERVICES ====================*/}
      <section
        id="services"
        className="flex flex-col justify-center scroll-mt-18 items-center space-y-6 md:space-y-7 py-10 md:py-15 h-full mx-[2.063rem] md:mx-16 xl:mx-[7.438rem]"
      >
        {/* Title and Description Container */}
        <div className="flex flex-col justify-center items-center text-center space-y-1">
          {/* Title */}
          <div className="flex flex-col sm:flex-row px-8 sm:px-0">
            <h3>Services We Provide to <span className="text-[#1775EE]">Elevate Your Business</span></h3>
          </div>
          {/* Description */}
          <p className="max-w-4xl mx-auto">
            Matekk Cybercore Academy delivers
            end-to-end ICT and engineering solutions alongside comprehensive
            training programs designed to meet industry demands and support
            digital transformation.
          </p>
        </div>
        <div className="flex flex-col space-y-14">
          {/* ====== SOLUTIONS - End-to-End ICT & Engineering Solutions ======*/}
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              {/* ====== CONTENT ====== */}
              <div className="flex flex-col relative md:w-[35vw] lg:w-[20vw] xl:w-[24vw] self-start gap-y-6 items-start">
                {/* Color Gradient - at the back of the title and description  */}
                <div className="absolute -top-10 md:-left-10 w-70 h-70 md:w-72 md:h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
                {/* Services Category Text Content Container */}
                <div className="space-y-2">
                  {/* Services Category Title */}
                  <h6 className="bg-[#EBF5FD] border border-[#EBF5FD] rounded-full shadow-[0_0_3px_rgba(0,0,0,0.25)] w-fit px-3 py-1">
                    Solutions
                  </h6>
                  {/* Solutions Title */}
                  <h5 className="w-[50vw] md:w-60">
                    End-to-End ICT & Engineering Solutions
                  </h5>
                  {/* Solutions Category Description */}
                  <p className="">
                    We provide ICT consultancy and engineering solutions focused
                    on planning, building, operating, optimizing, and testing
                    technology systems.
                  </p>
                </div>
                {/* Left and Right Button for List of Solutions */}
                <div className="flex flex-row gap-x-[2vh]">
                  <button
                    onClick={() => setTopSlide((prev) => Math.max(prev - 1, 0))}
                    disabled={topSlide === 0}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
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
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
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

              {/* List of Solutions - In Slides */}
              <div className="overflow-hidden w-[85vw] md:w-[45vw] lg:w-[60vw] xl:w-[53vw] 2xl:w-[52vw]">
                <div
                  className="flex gap-x-5 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(-${topSlide} * ${topStep}))`,
                  }}
                >
                  {/* Solutions - Card 1 */}
                  <div className="group services_card">
                    <div className="absolute inset-0  transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                      <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={ictImage}
                          alt="ICT Consultancy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h5 className="">ICT Consultancy</h5>
                      <p className="">
                        Matekk provides ICT consultancy services using the Plan,
                        Build, Operate, Optimize, and Test (PBOOT) approach to
                        support the design, implementation, and improvement of
                        ICT infrastructures.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>

                  {/* Solutions Card 2 */}
                  <div className="group services_card">
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
                        organizational requirements, using modern technologies
                        to deliver reliable and functional digital systems.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>

                  {/* Solutions - Card 3 */}
                  <div className="group services_card">
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
                        We design and deploy robust network infrastructure
                        solutions that ensure seamless connectivity, security,
                        and scalability for businesses of all sizes.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>

                  {/* Solutions - Card 4 */}
                  <div className="group services_card">
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
                        Matekk offers comprehensive ICT training programs tailored
                        to industry demands, equipping professionals with the
                        skills needed to thrive in a rapidly evolving digital
                        landscape.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TOP DOT INDICATORS */}
            <div className="flex justify-center gap-x-2 mt-6">
              {Array.from({ length: topMax }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTopSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${topSlide === i ? "bg-[#1775EE] w-4" : "bg-[#C2DDFF] w-2"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ====== TRAINING - ICT Training & Skills Development ======*/}
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              {/* Controls — on mobile: top + right-aligned | on desktop: right column */}
              {/* Training title */}
              <div className="flex flex-col relative md:w-[35vw] lg:w-[20vw] xl:w-[24vw] self-start gap-y-6 items-start">
                <div className="absolute -top-10 md:-left-10 w-70 h-70 md:w-72 md:h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
                <div className="space-y-2">
                  <h6 className="bg-[#EBF5FD] border border-[#EBF5FD] rounded-full shadow-[0_0_3px_rgba(0,0,0,0.25)] w-fit px-3 py-1">
                    Training
                  </h6>
                  <h5 className="w-[50vw] md:w-60">
                    ICT Training & Skills Development
                  </h5>
                  <p className="">
                    We offers face-to-face and online training programs designed
                    to equip individuals and organizations with cutting-edge
                    technological knowledge and practical skills.
                  </p>
                </div>
                <div className="flex flex-row gap-x-[2vh]">
                  <button
                    onClick={() =>
                      setBottomSlide((prev) =>
                        Math.min(prev + 1, bottomMax - 1),
                      )
                    }
                    disabled={bottomSlide === bottomMax - 1}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
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
                      setBottomSlide((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={bottomSlide === 0}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
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

              {/* List of Trainings - In Slides */}
              <div className="overflow-hidden w-[85vw] md:w-[45vw] lg:w-[60vw] xl:w-[53vw] 2xl:w-[52vw] order-last md:order-first">
                <div
                  className="flex flex-row-reverse gap-x-5 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(${bottomSlide} * ${bottomStep}))`,
                  }}
                >
                  {/* Card 4 - Training section */}
                  <div className="group services_card">
                    {/* Color of the container */}
                    <div className="absolute inset-0  transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                      <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={ictImage}
                          alt="Training and Development"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h5 className="">Cybersecurity Training</h5>
                      <p className="">
                        Our cybersecurity training covers cybersecurity
                        fundamentals, ethical hacking, vulnerability assessment
                        and penetration testing (VAPT), and risk management.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>

                  {/* Card 3 - Training section */}
                  <div className="group services_card">
                    {/* Color of the container */}
                    <div className="absolute inset-0  transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                      <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={webImage}
                          alt="Network Infrastructure"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h5 className="">Cloud Computing Training</h5>
                      <p className="">
                        We provide cloud computing training on platforms such as
                        AWS, Microsoft Azure, and Google Cloud through
                        face-to-face and online programs.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>

                  {/* Card 2 - Training section */}
                  <div className="group services_card">
                    {/* Color of the container */}
                    <div className="absolute inset-0  transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                      <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={webImage}
                          alt="Web and Software Development"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h5 className="">Web and Software Development</h5>
                      <p className="">
                        We develop web and software solutions that support
                        organizational requirements, using modern technologies
                        to deliver reliable and functional digital systems.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>

                  {/* Card 1 */}
                  <div className="group services_card">
                    {/* Color of the container */}
                    <div className="absolute inset-0  transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
                      <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={ictImage}
                          alt="ICT Consultancy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h5 className="">ICT Consultancy</h5>
                      <p className="">
                        Matekk provides ICT consultancy services using the Plan,
                        Build, Operate, Optimize, and Test (PBOOT) approach to
                        support the design, implementation, and improvement of
                        ICT infrastructures.
                      </p>
                      <Link className="font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white">
                        See more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM DOT INDICATORS */}
            <div className="flex justify-center flex-row-reverse gap-x-2 mt-6">
              {Array.from({ length: bottomMax }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBottomSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${bottomSlide === i ? "bg-[#1775EE] w-4" : "bg-[#C2DDFF] w-2"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE Matekk Cybercore Academy ====================*/}
      <section className="py-10 md:py-15 bg-[#EBF5FD] scroll-mt-18">
        {/* Section Margin */}
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-8 space-y-8 md:space-y-12 mx-[2.063rem] md:mx-16 xl:mx-[7.438rem]">
          {/* Text and Image Container */}
          <div className="flex flex-col md:flex-row lg:flex-col justify-center items-center space-x-0 md:space-x-18 lg:space-x-0 space-y-8 md:space-y-15">
            {/* Text Content */}
            <div className="justify-center md:justify-left w-full md:w-md lg:w-fit space-y-1">
              {/* Title */}
              <h3>
                Why Choose Matekk
                <span className="text-[#1775EE]"> ICT Services?</span>
              </h3>
              {/* Description */}
              <p>
                Matekk Cybercore Academy is committed
                to delivering reliable ICT solutions and high-quality training
                through experienced professionals, proven methodologies, and a
                strong focus on innovation, integrity, and excellence.
              </p>
            </div>
            {/* LEFT SIDE - IMAGE */}
            <div className="relative max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-t-4 border-r-4 sm:border-t-6 sm:border-r-6 border-blue-500 rounded-tr-3xl z-0"></div>
              <img
                src={Handshake}
                alt="Professional handshake - Matekk Cybercore Academy team"
                className="z-10 w-[75vw] md:w-[50vw] lg:w-full h-auto rounded-2xl sm:rounded-3xl object-cover aspect-4/5"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-b-4 border-l-4 sm:border-b-6 sm:border-l-6 border-blue-500 rounded-bl-3xl z-0"></div>
            </div>
          </div>

          {/* RIGHT SIDE - Reasons Why Choose Solverous */}
          {/* ====== Experience ====== */}
          <div className="space-y-4">
            <div className="why_choose_card">
              <h5>Experience</h5>
              <p>
                Over a decade of providing ICT and engineering solutions and
                professional training since our establishment in 2013.
              </p>
            </div>

            {/* ====== Expertise ====== */}
            <div className="why_choose_card">
              <h5>Expertise</h5>
              <p>
                Led by a Professional Electronics Engineer and supported by
                certified engineers, technicians, and instructors with strong
                industry and academic backgrounds.
              </p>
            </div>

            {/* ====== Quality Training ====== */}
            <div className="why_choose_card">
              <h5>Quality Training</h5>
              <p>
                We offer face-to-face and online training programs aligned with
                industry standards and globally recognized certifications.
              </p>
            </div>

            {/* ====== End-to-End Approach ====== */}
            <div className="why_choose_card">
              <h5>End-to-End Approach</h5>
              <p>
                We follow the Plan, Build, Operate, Optimize, and Test (PBOOT)
                methodology to ensure structured and effective delivery of ICT
                solutions.
              </p>
            </div>

            {/* ====== Innovation & Integrity ====== */}
            <div className="why_choose_card">
              <h5>Innovation & Integrity</h5>
              <p>
                Our work is guided by core values that emphasize innovation,
                ethical practices, excellence, collaboration, and continuous
                improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUR WORKING PROCESS ====================*/}
      <section className="py-10 md:py-15 bg-white scroll-mt-18 mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-8 lg:space-y-2 overflow-hidden">
        {/* Text Content */}
        <div className="flex flex-col text-right ml-0 md:ml-38 lg:ml-auto items-end">
          {/* Title */}
          <h3>
            Our <span className="text-[#1775EE]">Working Process</span>
          </h3>
          {/* Description */}
          <p className="w-80 md:w-fit">
            We follow a structured service delivery process to ensure reliable
            implementation, performance, and long-term value.
          </p>
        </div>
        {/* ====== Working Process ====== */}
        <div className="relative overflow-hidden ">
          {/* Desktop Version */}
          <div className="hidden lg:block relative">
            <div className="relative">
              <svg
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                viewBox="0 0 1200 500"
                preserveAspectRatio="none"
              >
                <path className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]" d="M 0 30 C 250 80, 190 50, 320 120" stroke="#3B82F6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]" d="M 365 115 C 220 130, 500 190, 600 190" stroke="#3B82F6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]" d="M 590 215 C 600 160, 800 200, 860 240" stroke="#3B82F6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]" d="M 847 250 C 800 150, 845 350, 1500 275" stroke="#3B82F6" strokeWidth="8" fill="none" strokeLinecap="round" />
              </svg>
              <div className="relative z-10 flex items-start justify-between gap-4 pb-8">
                {/* Step 1 */}
                <div className="desktop_process_steps">
                  <div className="desktop_process_icons">
                    <svg className="desktop_process_svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20h3v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Initiation & Consultancy</h5>
                    <p>Understand requirements and define project direction.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="desktop_process_steps pt-16">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
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
                  <div className="space-y-1 text-center">
                    <h5>Planning & Design</h5>
                    <p>Create structured plans and system designs.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="desktop_process_steps pt-28">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
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
                  <div className="space-y-1 text-center">
                    <h5>Implementation</h5>
                    <p>Deploy and configure approved solutions.</p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="desktop_process_steps pt-36">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2zm0 0V9a2 2 0 012-2h3a2 2 0 012 2v10m-6 0a2 2 0 002 2h3a2 2 0 002-2m0 0V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Monitor and Control</h5>
                    <p>Track performance and ensure proper operation.</p>
                  </div>
                </div>
                {/* Step 5 */}
                <div className="desktop_process_steps pt-48">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
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
                  <div className="space-y-1 text-center">
                    <h5>Optimization</h5>
                    <p>Improve systems through testing and refinement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Version */}
          <div className="hidden md:block lg:hidden relative">
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 700 1100"
              preserveAspectRatio="none"
            >
              {/* Line 1→2 */}
              <path
                d="M 200 50 C 300 70, 500 30, 490 240"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 2→3 */}
              <path
                d="M 510 250 C 510 250, 180 250, 210 440"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 3→4 */}
              <path
                d="M 220 490 C 350 560, 490 490, 480 740"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 4→5 */}
              <path
                d="M 510 720 C 510 720, 180 720, 220 910"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Step 1: Initiation & Consultancy */}
            <div className="relative z-10 flex flex-col items-center pr-72 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center w-[65%]">
                <h5>Initiation & Consultancy</h5>
                <p>Understand requirements and define project direction.</p>
              </div>
            </div>

            {/* Step 2: Planning & Design */}
            <div className="relative z-10 flex flex-col items-center pl-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center w-[50%]">
                <h5>Planning & Design</h5>
                <p>Create structured plans and system designs.</p>
              </div>
            </div>

            {/* Step 3: Implementation */}
            <div className="relative z-10 flex flex-col items-center pr-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center w-[50%]">
                <h5>Implementation</h5>
                <p>Deploy and configure approved solutions.</p>
              </div>
            </div>

            {/* Step 4: Monitor and Control */}
            <div className="relative z-10 flex flex-col items-center mb-1 pl-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center w-[50%]">
                <h5>Monitor and Control</h5>
                <p>Track performance and ensure proper operation.</p>
              </div>
            </div>

            {/* Step 5: Optimization */}
            <div className="relative z-10 flex flex-col items-center pr-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center w-[50%]">
                <h5>Optimization</h5>
                <p>Improve systems through testing and refinement.</p>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="block md:hidden relative">
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 400 1100"
              preserveAspectRatio="none"
            >
              {/* Line 1→2: Left to Right */}
              <path
                d="M 110 45 C 210 80, 330 30, 300 270"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 330 300 C 310 250, 90 250, 110 490"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 3→4: Left to Right */}
              <path
                d="M 100 490 C 190 560, 305 490, 305 700"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 4→5: Right to Left */}
              <path
                d="M 310 720 C 310 720, 90 720, 110 910"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {/* Mobile Version Icons */}
            {/* Step 1: Initiation & Consultancy */}
            <div className="relative z-10 flex flex-col items-center mb-1 pr-41 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="mt-3 max-w-[16rem] text-center">
                <h5 className="text-base font-bold mb-1">
                  Initiation & Consultancy
                </h5>
                <p className="text-sm text-gray-600">
                  Understand requirements and define project direction.
                </p>
              </div>
            </div>

            {/* Step 2: Planning & Design */}
            <div className="relative z-10 flex flex-col items-center mb-1 pl-50 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center">
                <h5>Planning & Design</h5>
                <p>Create structured plans and system designs.</p>
              </div>
            </div>

            {/* Step 3: Implementation */}
            <div className="relative z-10 flex flex-col items-center mb-1 pr-40 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center">
                <h5>Implementation</h5>
                <p>Deploy and configure approved solutions.</p>
              </div>
            </div>

            {/* Step 4: Monitor and Control */}
            <div className="relative z-10 flex flex-col items-center mb-1 pl-50 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center">
                <h5>Monitor and Control</h5>
                <p>Track performance and ensure proper operation.</p>
              </div>
            </div>

            {/* Step 5: Optimization */}
            <div className="relative z-10 flex flex-col items-center pr-40 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
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
              <div className="space-y-1 text-center">
                <h5>Optimization</h5>
                <p>Improve systems through testing and refinement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED SOLUTIONS AND TRAINING ====================*/}
      <section
        id="training"
        className="flex flex-col py-10 md:py-15 h-full bg-[#EBF5FD] scroll-mt-18"
      >
        {/* Margin */}
        <div className="mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-6">
          {/* Text Content */}
          <div>
            {/* Title */}
            <h3 className="text-center">
              Our Featured
              <span className="text-[#1775EE]"> Solutions and Training</span>
            </h3>
            {/* Description */}
            <p className="text-center max-w-240 mx-auto">
              Matekk Cybercore Academy delivers
              end-to-end ICT and engineering solutions alongside comprehensive
              training programs designed to meet industry demands and support
              digital transformation.
            </p>
          </div>

          {/* Gallery */}
          <div>
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
                      className={`flex flex-col justify-center items-center text-white p-6 absolute inset-0 rounded-2xl backdrop-blur-sm bg-black/1 transition-opacity duration-500 ${tappedCard === item.id ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      {/* Content */}
                      {/* Title row */}
                      <div className="flex items-center justify-between gap-4 w-full">
                        <h5 className="text-shadow-lg">
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
                      <p className="text-shadow-lg">
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
                        <div className="flex flex-row justify-center items-center absolute inset-x-0 bottom-0 p-5 text-white bg-black/1 to-transparent backdrop-blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">

                          <div className="text-shadow-lg space-y-1">
                            {/* Text Content */}
                            <h5>
                              {item.title}
                            </h5>
                            <p className="line-clamp-2">
                              {item.desc}
                            </p>
                          </div>
                          <div className="shrink-0 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 text-white"
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
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== FEEDBACKS ====================*/}
      <TestimonialsSection />

      {/* ==================== ABOUT THE COMPANY ====================*/}
      <section id="about" className="scroll-mt-18 py-16 bg-[#EBF5FD]">
        <div className="mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-6">
          {/* Title and Description */}
          <div className="flex flex-col justify-center items-center space-y-2">
            <h6 className="w-fit border border-gray-300 rounded-full px-3 py-1.5 text-sm text-black bg-white">
              Solutions
            </h6>
            <div className="space-y-1">
              <h3 className="text-center">
                About the
                <span className="text-[#1775EE]"> Company</span>
              </h3>
              {/* Description */}
              <p className="text-center max-w-240 mx-auto">
                Matekk Cybercore Academy is a trusted
                provider of ICT and engineering solutions and a premier ICT
                training center, committed to empowering businesses and
                individuals through innovation and education since 2013.
              </p>
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {/* Left Column */}
            <div className="flex flex-col gap-4 md:h-full xl:h-full 2xl:h-full">
              {/* Text Card */}
              <div className="about_cards order-2 md:order-1 shrink-0">
                <p>
                  Founded in 2013, Matekk Cybercore Academy has grown into a reputable
                  firm delivering innovative ICT solutions and professional
                  training programs that enhance efficiency, connectivity, and
                  technological capability across industries.
                </p>
              </div>

              {/* Person Image */}
              <div className="rounded-2xl overflow-hidden shadow-sm order-1 md:order-2 md:flex-1 xl:flex-1 2xl:flex-1 min-h-0 2xl:max-h-96.75">
                <img
                  src={SirMark}
                  alt="Company Representative"
                  className="w-full h-107 md:h-full object-cover"
                />
              </div>
            </div>

            {/* Building Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm order-3 md:order-0 self-stretch min-h-0 2xl:max-h-145">
              <img
                src={CompanyBuilding}
                alt="Matekk Academy Company Building"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 order-4 md:order-0">
              {/* Mission Card */}
              <div className="about_cards space-y-2">
                <h5>
                  Mission
                </h5>
                <p>
                  To empower businesses through innovative ICT and engineering
                  solutions that enhance operational efficiency, drive
                  technological advancement, and support sustainable growth.
                </p>
                <p>
                  To deliver high-quality ICT education and training that
                  enables individuals and organizations to achieve their full
                  potential and stay competitive in the digital era.
                </p>
              </div>

              {/* Vision Card */}
              <div className="about_cards space-y-2">
                <h5>Vision</h5>
                <p>
                  To be a global leader in ICT and Engineering solutions,
                  recognized for excellence, innovation, and commitment to
                  client success.
                </p>
                <p>
                  To be a globally recognized leader in ICT training, known for
                  excellence, innovation, and transformative educational
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FREQUENTLY ASKED QUESTIONS ====================*/}
      <section className="flex flex-col lg:flex-row justify-center items-start mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] py-10 md:py-15 scroll-mt-18 bg-white space-x-0 md:space-x-18 space-y-0 sm:space-y-8 md:space-y-10 lg:space-y-0">
        {/* Title and Still Have Questions Container */}
        <div className="space-y-6 lg:space-y-36 justify-center items-start">
          {/* Title */}
          <h3 >
            Frequently <span className="text-[#1775EE]">Asked Questions</span>
          </h3>

          {/* Still Have Questions Container */}
          <div className="bg-[#EBF5FD] p-7.5 rounded-xl shadow-md hidden md:block space-y-4 max-w-xl">
            <div className="space-y-1">
              <h5>Still Have Questions?</h5>
              <p>
                To be a global leader in ICT and Engineering solutions, recognized
                for excellence, innovation, and commitment to client success.
              </p>
            </div>
            <Button
              title="Contact Us"
              type="none"
              buttonCustomStyle="bg-[#1775EE] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] ease-in-out px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>

        {/* Frequently Asked Questions List */}
        <div className="justify-center items-start max-w-152">
          <FAQ />
        </div>
      </section>

      {/* ==================== CONTACT US ====================*/}
      <section
        id="contact"
        className="flex flex-col-reverse md:flex-col-reverse gap-8 lg:flex-row space-x-0 md:space-x-0 lg:space-x-8 justify-center items-center py-10 md:py-15 bg-[#EBF5FD] scroll-mt-19 w-full px-[2.063rem] md:px-16 xl:px-[7.438rem]"
      >
        <ContactForm />

        {/* Text Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            {/* Subheading */}
            <h6 className="w-fit border border-gray-300 rounded-full px-3 py-1.5 text-sm text-black bg-white">
              Contact Us
            </h6>
            {/* Heading */}
            <div className="space-y-1">
              <h3>
                Get In Touch With Us <span className="text-[#1775EE]">Today</span>
              </h3>
              {/* Description */}
              <p>
                Get in touch with Matekk Cybercore Academy
                to inquire about our ICT solutions, training programs, or
                request a consultation. Our team is ready to assist you.
              </p>
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-0 md:gap-x-20">
            {/* Address */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <Link to="https://maps.app.goo.gl/EvBzK1BBNEnBo6fh8" target="_blank" className="cursor-pointer">
                  <img src={address} alt="Location Icon" className="w-6 h-6" />
                </Link>
              </div>
              <div>
                <h5>Address</h5>
                <p>
                  10B Kalantiao Marikina, Metro Manila
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img src={phone} alt="Phone Icon" className="w-6 h-6" />
              </div>
              <div>
                <h5>Phone</h5>
                <p>09771968226</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img src={email} alt="Email Icon" className="w-6 h-6" />
              </div>
              <div>
                <h5>Email</h5>
                <p>info@matekk.com</p>
              </div>
            </div>

            {/* Availability */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img
                  src={availability}
                  alt="Availability Icon"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h5>
                  Availability
                </h5>
                <p>10:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
