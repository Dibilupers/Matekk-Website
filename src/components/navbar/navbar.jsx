import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import InquireNowButton from "../ui/InquireNowButton";
import MainLogo from "../../assets/MATEKK_logo.png";
import TrainingLogo from "../../assets/MATEKK_training_logo.png";
import SolutionsLogo from "../../assets/MATEKK_services_logo.png";
import {
  TRAINING_COURSES,
  FLAT_COURSES,
  PATH_TO_COURSE,
} from "../training/courses";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubcourse, setOpenSubcourse] = useState(null);
  const [openSubSubcourse, setOpenSubSubcourse] = useState(null);
  const [openSubSubSubcourse, setOpenSubSubSubcourse] = useState(null);
  const [openThirdLevel, setOpenThirdLevel] = useState(null);
  const [openFourthLevel, setOpenFourthLevel] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* If the user is on specific page then logo changes */
  const getLogoElement = () => {
    if (location.pathname.startsWith("/training")) {
      return (
        <img src={TrainingLogo} alt="Training Logo" className="w-11 md:w-12" />
      );
    }
    if (location.pathname.startsWith("/solutions")) {
      return (
        <img
          src={SolutionsLogo}
          alt="Solutions Logo"
          className="w-10 md:w-11"
        />
      );
    }
    return <img src={MainLogo} alt="MATEKK Logo" className="w-7 md:w-8" />;
  };
  const dropdownMenus = {
    solutions: [
      {
        name: "ICT Consultancy (PBOOT)",
        subcourses: [
          { name: "Data Center Facilities", path: "/solutions/ict/datacenter" },
          {
            name: "ICT Network and Security Infrastructure",
            subcourses: [
              {
                name: "IP Backbone and Distribution Networks",
                path: "/solutions/inci/ipbackbone",
              },
              {
                name: "Access Networks",
                path: "/solutions/inci/ipbackbone",
              },
              {
                name: "WLAN and Wireless Backhaul Networks",
                path: "/solutions/inci/ipbackbone",
              },
              {
                name: "Optical Fiber Networks (LAN and WAN)",
                path: "/solutions/inci/ipbackbone",
              },
              {
                name: "IP Telephony Networks",
                path: "/solutions/inci/ipbackbone",
              },
              {
                name: "On-premise Servers",
                path: "/solutions/inci/ipbackbone",
              },
              {
                name: "Structured Cabling",
                path: "/solutions/inci/ipbackbone",
              },
            ],
          },
          {
            name: "Cybersecurity",
            subcourses: [
              { name: "Red Team", path: "/solutions/cybersec/redteam" },
              { name: "Blue Team", path: "/solutions/cybersec/blueteam" },
            ],
          },
          {
            name: "Web and Software Development",
            path: "/solutions/ict/webdev",
          },
          { name: "Cloud Computing Services", path: "/solutions/ict/cloud" },
          {
            name: "SMART Environment Automation (IoT)",
            subcourses: [
              { name: "SMART Home", path: "/solutions/smartenviroment/home" },
              {
                name: "SMART Building",
                path: "/solutions/smartenviroment/building",
              },
              { name: "SMART City", path: "/solutions/smartenviroment/city" },
            ],
          },
        ],
      },
      {
        name: "PECE Consultancy (PBOOT)",
        subcourses: [
          {
            name: "Renewable Energy Solutions",
            path: "/solutions/pece/renewable",
          },
          { name: "IPCCTV and Analog CCTV", path: "/solutions/pece/ipcctv" },
          {
            name: "Fire Detection and Alarm Systems (FDAS)",
            path: "/solutions/pece/fdas",
          },
          { name: "Public Address Systems", path: "/solutions/pece/pas" },
          { name: "Door Access", path: "/solutions/pece/dooraccess" },
        ],
      },
    ],

    training: TRAINING_COURSES,
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setOpenDropdown(null);
      setOpenSubcourse(null);
      setOpenSubSubcourse(null);
      setOpenSubSubSubcourse(null);
      setOpenThirdLevel(null);
      setOpenFourthLevel(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resetMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenSubcourse(null);
    setOpenSubSubcourse(null);
    setOpenSubSubSubcourse(null);
    setOpenThirdLevel(null);
    setOpenFourthLevel(null);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      scrollToSection("home");
    } else {
      navigate("/", { state: { scrollTo: "home" } });
    }
  };

  // Shared transition class applied to every interactive element
  const t = "transition duration-300 ease-in-out";

  return (
    <header
      className={`flex flex-row items-center justify-between py-4 bg-white sticky top-0 z-50 ${t} px-[2.063rem] md:px-16 xl:px-[7.438rem] ${scrolled ? "shadow-md" : ""}`}
    >
      {/* Logo */}
      <button
        onClick={handleHomeClick}
        className={`cursor-pointer ${t} hover:opacity-80`}
      >
        {getLogoElement()}
      </button>

      {/* Desktop Nav */}
      <nav className="space-x-8 hidden lg:flex font-poppins items-center mr-[2.063rem] md:mr-16 xl:mr-[7.438rem]">
        <button
          onClick={handleHomeClick}
          className={`hover:text-[#1775EE] hover:font-bold cursor-pointer ${t}`}
        >
          Home
        </button>

        {/* Solutions Dropdown */}
        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "solutions" ? null : "solutions")
            }
            className={`flex items-center gap-1 hover:font-bold hover:text-[#1775EE] cursor-pointer ${t}`}
          >
            Solutions
            <svg
              className={`w-4 h-4 ${t} ${openDropdown === "solutions" ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openDropdown === "solutions" && (
            <div className="absolute top-full -left-20 transform mt-2 py-5 px-2 bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden font-inter animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex space-x-[2.313rem]">
                {/* Column 1 — categories */}
                <div className="min-w-52 overflow-y-auto max-h-[70vh] animate-in fade-in slide-in-from-left-2 duration-200">
                  {dropdownMenus.solutions.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left px-6 py-2 rounded-[0.35rem] flex items-center justify-between cursor-pointer ${t} ${
                        openSubcourse === category.name
                          ? "bg-[#1775EE] text-white font-bold"
                          : "hover:text-[#1775EE] hover:font-bold"
                      }`}
                      onClick={() => {
                        setOpenSubcourse(
                          openSubcourse === category.name
                            ? null
                            : category.name
                        );
                        setOpenThirdLevel(null);
                      }}
                    >
                      {category.name}
                      {category.subcourses?.length > 0 && (
                        <svg
                          className={`min-w-4 h-4 ${t}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {/* Column 2 — subcourses */}
                {openSubcourse && (
                  <div className="min-w-65 animate-in fade-in slide-in-from-left-2 duration-200">
                    {dropdownMenus.solutions
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.map((item) => (
                        <div key={item.name}>
                          {item.subcourses ? (
                            <button
                              onClick={() =>
                                setOpenThirdLevel(
                                  openThirdLevel === item.name
                                    ? null
                                    : item.name,
                                )
                              }
                              className={`w-full text-left px-6 py-2 rounded-[0.35rem] flex items-center justify-between cursor-pointer ${
                                openThirdLevel === item.name
                                  ? "text-[#1775EE] font-bold"
                                  : "hover:text-[#1775EE] hover:font-bold"
                              }`}
                            >
                              {item.name}
                              <svg
                                className="min-w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ) : (
                            <Link
                              to={item.path}
                              onClick={resetMenu}
                              className="block px-6 py-2 hover:text-[#1775EE] hover:font-bold"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                  </div>
                )}
                {/* Column 3 - solutions */}
                {openThirdLevel && (
                  <div className="min-w-55 animate-in fade-in slide-in-from-left-2 duration-200">
                    {dropdownMenus.solutions
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.find((item) => item.name === openThirdLevel)
                      ?.subcourses?.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={resetMenu}
                          className="block px-4 py-2 hover:text-[#1775EE] hover:font-bold cursor-pointer"
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Training Dropdown */}
        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "training" ? null : "training")
            }
            className={`flex items-center gap-1 hover:text-[#1775EE] hover:font-bold cursor-pointer ${t}`}
          >
            Training
            <svg
              className={`w-4 h-4 ${t} ${openDropdown === "training" ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openDropdown === "training" && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-5 bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden font-inter animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex space-x-[2.313rem]">
                {/* Column 1 */}
                <div className="w-57 overflow-y-auto max-h-[70vh] animate-in fade-in slide-in-from-left-2 duration-200">
                  {dropdownMenus.training.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left px-6 py-2 rounded-[0.35rem] flex items-center justify-between cursor-pointer ${t} ${
                        openSubcourse === category.name
                          ? "bg-[#1775EE] text-white font-bold"
                          : "hover:text-[#1775EE] hover:font-bold"
                      }`}
                      onClick={() => {
                        setOpenSubcourse(
                          openSubcourse === category.name
                            ? null
                            : category.name,
                        );
                        setOpenSubSubcourse(null);
                        setOpenSubSubSubcourse(null);
                      }}
                    >
                      {category.name}
                      {category.subcourses?.length > 0 && (
                        <svg
                          className={`w-4 h-4 ${t}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {/* Column 2 */}
                {openSubcourse && (
                  <div className="w-57 overflow-y-auto max-h-[70vh] animate-in fade-in slide-in-from-left-2 duration-200">
                    {dropdownMenus.training
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.map((subcourse) =>
                        subcourse.subcourses ? (
                          <button
                            key={subcourse.name}
                            className={`w-full text-left px-6 py-2 rounded-[0.35rem] flex items-center justify-between cursor-pointer ${t} ${
                              openSubSubcourse === subcourse.name
                                ? "bg-[#1775EE] text-white font-bold"
                                : "hover:text-[#1775EE] hover:font-bold"
                            }`}
                            onClick={() => {
                              setOpenSubSubcourse(
                                openSubSubcourse === subcourse.name
                                  ? null
                                  : subcourse.name,
                              );
                              setOpenSubSubSubcourse(null);
                            }}
                          >
                            {subcourse.name}
                            <svg
                              className={`w-4 h-4 ${t}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        ) : (
                          <Link
                            key={subcourse.name}
                            to={subcourse.path}
                            onClick={resetMenu}
                            className={`block w-full text-left px-6 py-2 rounded-[0.35rem] hover:text-[#1775EE] hover:font-bold ${t}`}
                          >
                            {subcourse.name}
                          </Link>
                        ),
                      )}
                  </div>
                )}

                {/* Column 3 */}
                {openSubSubcourse && (
                  <div className="w-57 overflow-y-auto max-h-[70vh] animate-in fade-in slide-in-from-left-2 duration-200">
                    {dropdownMenus.training
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.find((sub) => sub.name === openSubSubcourse)
                      ?.subcourses?.map((subSub) => {
                        const hasSubSubcourses =
                          subSub.subcourses && subSub.subcourses.length > 0;
                        if (hasSubSubcourses) {
                          return (
                            <button
                              key={subSub.name}
                              onClick={() =>
                                setOpenSubSubSubcourse(
                                  openSubSubSubcourse === subSub.name
                                    ? null
                                    : subSub.name,
                                )
                              }
                              className={`w-full text-left px-6 py-2 flex items-center cursor-pointer justify-between rounded-[0.35rem] ${t} ${
                                openSubSubSubcourse === subSub.name
                                  ? "bg-[#1775EE] text-white font-bold"
                                  : "hover:text-[#1775EE] hover:font-bold"
                              }`}
                            >
                              {subSub.name}
                              <svg
                                className={`w-4 h-4 ${t}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={subSub.name}
                            to={subSub.path}
                            onClick={resetMenu}
                            className={`block w-full text-left px-6 py-2 rounded-[0.35rem] hover:text-[#1775EE] hover:font-bold ${t}`}
                          >
                            {subSub.name}
                          </Link>
                        );
                      })}
                  </div>
                )}

                {/* Column 4 */}
                {openSubSubSubcourse && (
                  <div className="w-57 overflow-y-auto max-h-[70vh] animate-in fade-in slide-in-from-left-2 duration-200">
                    {dropdownMenus.training
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.find((sub) => sub.name === openSubSubcourse)
                      ?.subcourses?.find(
                        (subSub) => subSub.name === openSubSubSubcourse,
                      )
                      ?.subcourses?.map((finalItem) => (
                        <Link
                          key={finalItem.name}
                          to={finalItem.path || "#"}
                          onClick={resetMenu}
                          className={`block w-full text-left px-6 py-2 rounded-[0.35rem] hover:text-[#1775EE] hover:font-bold ${t}`}
                        >
                          {finalItem.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (location.pathname === "/") {
              scrollToSection("about");
            } else {
              navigate("/", { state: { scrollTo: "about" } });
            }
          }}
          className={`hover:text-[#1775EE] hover:font-bold cursor-pointer ${t}`}
        >
          About
        </button>

        <button
          onClick={() => {
            if (location.pathname === "/") {
              scrollToSection("contact");
            } else {
              navigate("/", { state: { scrollTo: "contact" } });
            }
          }}
          className={`hover:text-[#1775EE] hover:font-bold cursor-pointer ${t}`}
        >
          Contact Us
        </button>
      </nav>

      {/* Inquire Now */}
      <InquireNowButton
        buttonCustomStyle="hidden lg:block w-full text-[1.25rem] text-center py-3 px-6 rounded-full
          lg:flex lg:w-auto lg:text-base lg:py-2 lg:px-5.5 lg:rounded-3xl
          text-blue-600 border border-blue-600 hover:bg-[#0062E0]
          hover:border-[#0062E0] hover:text-white transition-all duration-300
          cursor-pointer"
      />

      {/* Mobile + Tablet Hamburger */}
      <div className="flex lg:hidden justify-center items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <svg
            className={`w-7 h-7 text-[#1775EE] ${t}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Main Menu - Full Screen */}
        {isOpen && !openDropdown && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-300">
            <div className="flex items-center justify-between py-4 px-8 border-b border-gray-200">
              <button
                onClick={handleHomeClick}
                className={`cursor-pointer ${t} hover:opacity-80`}
              >
                {getLogoElement()}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 text-[#1775EE] ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col mt-[6vh] px-6 space-y-6 font-poppins font-bold">
              <button
                onClick={() => {
                  scrollToSection("home");
                  setIsOpen(false);
                }}
                className={`text-2xl font-semibold text-left text-black hover:text-[#1775EE] ${t}`}
              >
                Home
              </button>

              <button
                onClick={() => setOpenDropdown("solutions-mobile")}
                className={`text-2xl font-semibold text-left flex items-center justify-between text-black hover:text-[#1775EE] ${t}`}
              >
                Solutions
                <svg
                  className={`w-5 h-5 ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={() => setOpenDropdown("training-mobile")}
                className={`text-2xl font-semibold text-left text-black flex items-center justify-between hover:text-[#1775EE] ${t}`}
              >
                Training
                <svg
                  className={`w-5 h-5 ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  if (location.pathname === "/") {
                    scrollToSection("about");
                  } else {
                    navigate("/", { state: { scrollTo: "about" } });
                  }
                }}
                className={`text-2xl font-semibold text-left text-black hover:text-[#1775EE] ${t}`}
              >
                About
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  if (location.pathname === "/") {
                    scrollToSection("contact");
                  } else {
                    navigate("/", { state: { scrollTo: "contact" } });
                  }
                }}
                className={`text-2xl font-semibold text-left text-black hover:text-[#1775EE] ${t}`}
              >
                Contact Us
              </button>
            </nav>

            <div className="p-6">
              <InquireNowButton
                buttonCustomStyle={`block w-full text-[1.25rem] text-center py-3 px-6 rounded-full
          lg:flex lg:w-auto lg:text-base lg:py-2 lg:px-5.5 lg:rounded-3xl
          text-blue-600 border border-blue-600 hover:bg-[#0062E0]
          hover:border-[#0062E0] hover:text-white transition-all duration-300
          cursor-pointer`}
              />
            </div>
          </div>
        )}

        {/* Solutions Mobile — Level 1 */}
        {openDropdown === "solutions-mobile" && !openSubcourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenDropdown(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className={`w-6 h-6 text-[#1775EE] ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-[#1775EE] font-poppins">
                Solutions
              </h2>
            </div>

            <nav className="flex-1 px-6 py-8 space-y-4">
              {dropdownMenus.solutions.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setOpenSubcourse(category.name)}
                  className={`block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between ${t}`}
                >
                  {category.name}
                  <svg
                    className={`w-4 h-4 ${t}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Solutions Mobile — Level 2 */}
        {openDropdown === "solutions-mobile" && openSubcourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenSubcourse(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className={`w-6 h-6 text-[#1775EE] ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-[#1775EE] font-poppins">
                Solutions / {openSubcourse}
              </h2>
            </div>

            <nav className="flex-1 px-6 py-8 space-y-4">
              {dropdownMenus.solutions
                .find((cat) => cat.name === openSubcourse)
                ?.subcourses?.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                      setOpenSubcourse(null);
                    }}
                    className={`block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4 ${t}`}
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
          </div>
        )}

        {/* Training Mobile — Level 1 */}
        {openDropdown === "training-mobile" && !openSubcourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenDropdown(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className={`w-6 h-6 text-[#1775EE] ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-[#1775EE] font-poppins">
                Training
              </h2>
            </div>

            <nav className="flex-1 px-6 py-8 space-y-4">
              {dropdownMenus.training.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setOpenSubcourse(category.name)}
                  className={`block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between ${t}`}
                >
                  {category.name}
                  <svg
                    className={`w-4 h-4 ${t}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Training Mobile — Level 2 */}
        {openDropdown === "training-mobile" &&
          openSubcourse &&
          !openThirdLevel && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col">
              <div className="flex items-center p-6 border-b border-gray-200">
                <button
                  onClick={() => setOpenSubcourse(null)}
                  className="focus:outline-none mr-4"
                >
                  <svg
                    className={`w-6 h-6 text-[#1775EE] ${t}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-[#1775EE] font-poppins">
                  Training/{openSubcourse}
                </h2>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-4">
                {dropdownMenus.training
                  .find((cat) => cat.name === openSubcourse)
                  ?.subcourses.map((subcourse) =>
                    subcourse.subcourses ? (
                      <button
                        key={subcourse.name}
                        onClick={() => setOpenThirdLevel(subcourse.name)}
                        className={`block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between ${t}`}
                      >
                        {subcourse.name}
                        <svg
                          className={`w-4 h-4 ${t}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        key={subcourse.name}
                        to={subcourse.path}
                        onClick={resetMenu}
                        className={`block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4 ${t}`}
                      >
                        {subcourse.name}
                      </Link>
                    ),
                  )}
              </nav>
            </div>
          )}

        {/* Training Mobile — Level 3 */}
        {openDropdown === "training-mobile" &&
          openThirdLevel &&
          !openFourthLevel && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col">
              <div className="flex items-center p-6 border-b border-gray-200">
                <button
                  onClick={() => setOpenThirdLevel(null)}
                  className="focus:outline-none mr-4"
                >
                  <svg
                    className={`w-6 h-6 text-[#1775EE] ${t}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-[#1775EE] font-poppins">
                  Training/{openSubcourse}/{openThirdLevel}
                </h2>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-4">
                {dropdownMenus.training
                  .find((cat) => cat.name === openSubcourse)
                  ?.subcourses.find((sub) => sub.name === openThirdLevel)
                  ?.subcourses?.map((option) =>
                    option.subcourses ? (
                      <button
                        key={option.name}
                        onClick={() => setOpenFourthLevel(option.name)}
                        className={`block w-full text-left text-lg font-poppins py-2 px-4 rounded-lg flex items-center justify-between ${t} ${
                          openFourthLevel === option.name
                            ? "bg-[#EBF5FD] text-black"
                            : "text-black hover:text-[#1775EE]"
                        }`}
                      >
                        {option.name}
                        <svg
                          className={`w-4 h-4 ${t} ${openFourthLevel === option.name ? "stroke-[#1775EE]" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={openFourthLevel === option.name ? 3 : 2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        key={option.name}
                        to={option.path}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenDropdown(null);
                          setOpenSubcourse(null);
                          setOpenThirdLevel(null);
                        }}
                        className={`block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4 ${t}`}
                      >
                        {option.name}
                      </Link>
                    ),
                  )}
              </nav>
            </div>
          )}

        {/* Training Mobile — Level 4 */}
        {openDropdown === "training-mobile" && openFourthLevel && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenFourthLevel(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className={`w-6 h-6 text-[#1775EE] ${t}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-[#1775EE] font-poppins">
                Training/{openSubcourse}/{openFourthLevel}
              </h2>
            </div>

            <nav className="flex-1 px-6 py-8 space-y-4">
              {dropdownMenus.training
                .find((cat) => cat.name === openSubcourse)
                ?.subcourses.find((sub) => sub.name === openThirdLevel)
                ?.subcourses?.find((fourth) => fourth.name === openFourthLevel)
                ?.subcourses?.map((option) => (
                  <Link
                    key={option.name}
                    to={option.path}
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                      setOpenSubcourse(null);
                      setOpenThirdLevel(null);
                      setOpenFourthLevel(null);
                    }}
                    className={`block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4 ${t}`}
                  >
                    {option.name}
                  </Link>
                ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
