import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import EnrollModal from "../ui/EnrollModal";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubcourse, setOpenSubcourse] = useState(null);
  const [openSubSubcourse, setOpenSubSubcourse] = useState(null);
  const [openSubSubSubcourse, setOpenSubSubSubcourse] = useState(null);
  const [openThirdLevel, setOpenThirdLevel] = useState(null);
  const [openFourthLevel, setOpenFourthLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownMenus = {
    solutions: [
      {
        name: "ICT Consultancy (PBOOT)",
        subcourses: [
          { name: "Data Center Facilities", path: "/solutions/ict/datacenter" },
          {
            name: "ICT Network and Security Infrastructure",
            path: "/solutions/ict/network",
          },
          { name: "Cybersecurity", path: "/solutions/ict/cybersecurity" },
          {
            name: "Vulnerability Assessment and Penetration Testing (VAPT)",
            path: "/solutions/ict/vapt",
          },
          {
            name: "Web and Software Development",
            path: "/solutions/ict/webdev",
          },
          { name: "Cloud Computing Services", path: "/solutions/ict/cloud" },
          {
            name: "SMART Environment Automation (IoT)",
            path: "/solutions/ict/iot",
          },
        ],
      },
      {
        name: "Auxiliary Systems and PECE Consultancy",
        subcourses: [
          { name: "Auxiliary Systems", path: "/solutions/auxiliary/systems" },
          { name: "PECE Consultancy", path: "/solutions/auxiliary/pece" },
        ],
      },
      {
        name: "Cloud Computing",
        subcourses: [
          {
            name: "Cloud Infrastructure",
            path: "/solutions/cloud/infrastructure",
          },
          { name: "Cloud Migration", path: "/solutions/cloud/migration" },
        ],
      },
      {
        name: "IT Management",
        subcourses: [
          { name: "IT Strategy", path: "/solutions/itmanagement/strategy" },
          { name: "IT Operations", path: "/solutions/itmanagement/operations" },
        ],
      },
      {
        name: "Customized Training Solutions",
        subcourses: [
          { name: "Corporate Training", path: "/solutions/training/corporate" },
          { name: "Custom Curriculum", path: "/solutions/training/curriculum" },
        ],
      },
    ],
    training: [
      {
        name: "Cisco",
        subcourses: [
          {
            name: "CCNA",
            subcourses: [
              { name: "CCNA", path: "/training/cisco/ccna/ccna" },
              {
                name: "CCNA Automation",
                path: "/training/cisco/ccna/automation",
              },
              {
                name: "CCNA Cybersecurity",
                path: "/training/cisco/ccna/cybersecurity",
              },
            ],
          },
          {
            name: "CCNP",
            subcourses: [
              {
                name: "CCNP Enterprise",
                path: "/training/cisco/ccnp/enterprise",
              },
              { name: "CCNP Security", path: "/training/cisco/ccnp/security" },
              {
                name: "CCNP Cybersecurity",
                path: "/training/cisco/ccnp/cybersecurity",
              },
              { name: "CCNP Wireless", path: "/training/cisco/ccnp/wireless" },
              {
                name: "CCNP Data Center",
                path: "/training/cisco/ccnp/datacenter",
              },
            ],
          },
          {
            name: "CompTIA",
            subcourses: [
              {
                name: "A+ (Core 1 & 2)",
                path: "/training/cisco/comptia/aplus",
              },
              { name: "Network+", path: "/training/cisco/comptia/network" },
              { name: "Security+", path: "/training/cisco/comptia/security" },
              { name: "CySA+", path: "/training/cisco/comptia/cysa" },
              { name: "PenTest+", path: "/training/cisco/comptia/pentest" },
              { name: "Linux+", path: "/training/cisco/comptia/linux" },
            ],
          },
          {
            name: "Fortinet",
            subcourses: [
              { name: "NSE 1", path: "/training/cisco/fortinet/nse1" },
              { name: "NSE 2", path: "/training/cisco/fortinet/nse2" },
              { name: "NSE 3", path: "/training/cisco/fortinet/nse3" },
              {
                name: "NSE 4 (all tracks)",
                path: "/training/cisco/fortinet/nse4",
              },
              {
                name: "NSE 5 Secure Networking",
                path: "/training/cisco/fortinet/nse5securenetworking",
              },
              { name: "NSE 5 SASE", path: "/training/cisco/fortinet/nse5sase" },
              {
                name: "NSE 5 Cloud Security",
                path: "/training/cisco/fortinet/nse5cloudsecurity",
              },
              {
                name: "NSE 5 Secure Operations",
                path: "/training/cisco/fortinet/nse5secureoperations",
              },
              {
                name: "NSE 6 Secure Networking",
                path: "/training/cisco/fortinet/nse6securenetworking",
              },
              { name: "NSE 6 SASE", path: "/training/cisco/fortinet/nse6sase" },
              {
                name: "NSE 6 Cloud Security",
                path: "/training/cisco/fortinet/nse6cloudsecurity",
              },
              {
                name: "NSE 6 Secure Operations",
                path: "/training/cisco/fortinet/nse6secureoperations",
              },
              {
                name: "NSE 7 Secure Networking",
                path: "/training/cisco/fortinet/nse7securenetworking",
              },
              { name: "NSE 7 SASE", path: "/training/cisco/fortinet/nse7sase" },
              {
                name: "NSE 7 Cloud Security",
                path: "/training/cisco/fortinet/nse7cloudsecurity",
              },
              {
                name: "NSE 7 Secure Operations",
                path: "/training/cisco/fortinet/nse7secureoperations",
              },
            ],
          },
          {
            name: "Palo Alto",
            subcourses: [
              {
                name: "Network Security",
                subcourses: [
                  {
                    name: "Cybersecurity Apprentice",
                    path: "/training/cisco/paloalto/networksecurity/apprentice",
                  },
                  {
                    name: "Cybersecurity Practitioner",
                    path: "/training/cisco/paloalto/networksecurity/practitioner",
                  },
                  {
                    name: "Network Security Professional",
                    path: "/training/cisco/paloalto/networksecurity/professional",
                  },
                  {
                    name: "Network Security Analyst",
                    path: "/training/cisco/paloalto/networksecurity/analyst",
                  },
                  {
                    name: "Next-Generation Firewall Engineer",
                    path: "/training/cisco/paloalto/networksecurity/nextgenerationfirewallengineer",
                  },
                  {
                    name: "SD-WAN Engineer",
                    path: "/training/cisco/paloalto/networksecurity/sdwanengineer",
                  },
                  {
                    name: "Security Service Edge Engineer",
                    path: "/training/cisco/paloalto/networksecurity/securityserviceedgeengineer",
                  },
                  {
                    name: "Network Security Architect",
                    path: "/training/cisco/paloalto/networksecurity/architect",
                  },
                ],
              },
              {
                name: "Security Operations",
                subcourses: [
                  {
                    name: "Cybersecurity Practitioner",
                    path: "/training/cisco/paloalto/securityoperations/practitioner",
                  },
                  {
                    name: "Security Operations Professional",
                    path: "/training/cisco/paloalto/securityoperations/professional",
                  },
                  {
                    name: "XSIAM Analyst",
                    path: "/training/cisco/paloalto/securityoperations/xsiamanalyst",
                  },
                  {
                    name: "XDR Analyst",
                    path: "/training/cisco/paloalto/securityoperations/xdranalyst",
                  },
                  {
                    name: "XSIAM Engineer",
                    path: "/training/cisco/paloalto/securityoperations/xsiamengineer",
                  },
                  {
                    name: "XDR Engineer",
                    path: "/training/cisco/paloalto/securityoperations/xdrengineer",
                  },
                  {
                    name: "XSOAR Engineer",
                    path: "/training/cisco/paloalto/securityoperations/xsoarengineer",
                  },
                ],
              },
              {
                name: "Cloud Security",
                subcourses: [
                  {
                    name: "Cloud Security Professional",
                    path: "/training/cisco/paloalto/cloudsecurity/professional",
                  },
                ],
              },
            ],
          },
          {
            name: "Practical Ethical Hacking",
            subcourses: [
              {
                name: "PEH Fundamentals",
                subcourses: [
                  {
                    name: "Penetration Testing",
                    path: "/training/cisco/peh/fundamentals/pentest",
                  },
                  {
                    name: "Web App Security",
                    path: "/training/cisco/peh/fundamentals/webapp",
                  },
                ],
              },
            ],
          },
          {
            name: "CDCP",
            subcourses: [
              {
                name: "Data Centre Foundation Certificate",
                path: "/training/cisco/cdcp/dcfc",
              },
              {
                name: "Certified Data Centre Professional",
                path: "/training/cisco/cdcp/cdcp",
              },
              {
                name: "Certified Data Centre Specialist",
                path: "/training/cisco/cdcp/cdcs",
              },
            ],
          },
        ],
      },
      { name: "Cybersecurity", subcourses: [] },
      {
        name: "Cloud Computing",
        subcourses: [
          {
            name: "Microsoft",
            subcourses: [
              {
                name: "Azure Fundamentals",
                path: "/training/cloud/microsoft/azurefundamentals",
              },
            ],
          },
          {
            name: "AWS",
            subcourses: [
              {
                name: "Cloud Practitioner",
                path: "/training/cloud/aws/practitioner",
              },
            ],
          },
        ],
      },
      {
        name: "IT Management",
        subcourses: [
          {
            name: "ITIL 4",
            subcourses: [
              { name: "Foundation", path: "/training/itil4/foundation" },
              {
                name: "Specialist: Create, Deliver and Support",
                path: "/training/itil4/specialist",
              },
              {
                name: "Strategist: Direct, Plan and Improve",
                path: "/training/itil4/strategist",
              },
              {
                name: "Practitioner: Incident Management",
                path: "/training/itil4/practitioner",
              },
              {
                name: "Leader: Digital and IT Strategy",
                path: "/training/itil4/leader",
              },
            ],
          },
        ],
      },
    ],
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

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

  return (
    <header
      className={`flex flex-row items-center justify-between py-4 bg-white sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-md" : ""}`}
    >
      {/* ↓ changed md:ml-[7.438rem] → lg:ml-[7.438rem] */}
      <button
        onClick={handleHomeClick}
        className="ml-[2.063rem] md:ml-16 xl:ml-[7.438rem] cursor-pointer"
      >
        LOGO
      </button>

      {/* Desktop Nav — only visible at lg and above */}
      {/* ↓ changed hidden md:flex → hidden lg:flex */}
      <nav className="space-x-8 hidden lg:flex font-poppins items-center">
        <button
          onClick={handleHomeClick}
          className="hover:text-[#1775EE] hover:font-bold transition-colors cursor-pointer"
        >
          Home
        </button>

        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "solutions" ? null : "solutions")
            }
            className="flex items-center gap-1 hover:font-bold hover:text-[#1775EE] transition-colors"
          >
            Solutions
            <svg
              className={`w-4 h-4 transition-transform ${openDropdown === "solutions" ? "rotate-180" : ""}`}
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-5 bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden font-inter">
              <div className="flex space-x-[2.313rem]">
                {/* Column 1 — categories */}
                <div className="w-100">
                  {dropdownMenus.solutions.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left px-6 py-2 transition-colors rounded-[0.35rem] flex items-center justify-between ${
                        openSubcourse === category.name
                          ? "bg-[#1775EE] text-white font-bold"
                          : "hover:bg-[#1775EE] hover:text-white hover:font-bold"
                      }`}
                      onClick={() =>
                        setOpenSubcourse(
                          openSubcourse === category.name
                            ? null
                            : category.name,
                        )
                      }
                    >
                      {category.name}
                      {category.subcourses?.length > 0 && (
                        <svg
                          className="w-4 h-4"
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
                  <div className="w-123">
                    {dropdownMenus.solutions
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={resetMenu}
                          className="block w-full text-left px-6 py-2 rounded-[0.35rem] hover:text-[#1775EE] hover:font-bold transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "training" ? null : "training")
            }
            className="flex items-center gap-1 hover:text-[#1775EE] hover:font-bold transition-colors"
          >
            Training
            <svg
              className={`w-4 h-4 transition-transform ${openDropdown === "training" ? "rotate-180" : ""}`}
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
          {/* First Column */}
          {openDropdown === "training" && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-5 bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden font-inter">
              <div className="flex space-x-[2.313rem]">
                <div className="w-56">
                  {dropdownMenus.training.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left px-6 py-2 transition-colors rounded-[0.35rem] flex items-center justify-between ${openSubcourse === category.name ? "bg-[#1775EE] text-white font-bold" : "hover:bg-[#1775EE] hover:text-white hover:font-bold"}`}
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
                          className="w-4 h-4"
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
                {/* Second Column */}
                {openSubcourse && (
                  <div className="w-57">
                    {dropdownMenus.training
                      .find((cat) => cat.name === openSubcourse)
                      ?.subcourses?.map((subcourse) => (
                        <button
                          key={subcourse.name}
                          className={`w-full text-left px-6 py-2 transition-colors rounded-[0.35rem] flex items-center justify-between ${openSubSubcourse === subcourse.name ? "bg-[#1775EE] text-white font-bold" : "hover:bg-[#1775EE] hover:text-white hover:font-bold"}`}
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
                          {subcourse.subcourses?.length > 0 && (
                            <svg
                              className="w-4 h-4"
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
                )}

                {/* Third Column */}
                {openSubSubcourse && (
                  <div className="w-57">
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
                              className={`w-full text-left px-6 py-2 transition-colors rounded-[0.35rem] flex items-center justify-between ${
                                openSubSubSubcourse === subSub.name
                                  ? "bg-[#1775EE] text-white font-bold"
                                  : "hover:bg-[#1775EE] hover:text-white hover:font-bold"
                              }`}
                            >
                              {subSub.name}
                              <svg
                                className="w-4 h-4"
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
                            className="block w-full text-left px-6 py-2 rounded-[0.35rem] hover:text-[#1775EE] hover:font-bold transition-colors"
                          >
                            {subSub.name}
                          </Link>
                        );
                      })}
                  </div>
                )}

                {/* Fourth Column */}
                {openSubSubSubcourse && (
                  <div className="w-57">
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
                          className="block w-full text-left px-6 py-2 rounded-[0.35rem] hover:text-[#1775EE] hover:font-bold transition-colors"
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
          onClick={() => scrollToSection("about")}
          className="hover:text-[#1775EE] hover:font-bold transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="hover:text-[#1775EE] hover:font-bold transition-colors cursor-pointer"
        >
          Contact Us
        </button>
      </nav>

      {/* Enroll Now — only visible at lg and above */}
      {/* ↓ changed hidden md:flex → hidden lg:flex  |  md:mr-[7.438rem] → lg:mr-[7.438rem] */}
      <Button
        title="Enroll Now"
        type="none"
        buttonCustomStyle="hidden lg:flex mr-[2.063rem] md:mr-16 lg:mr-16 xl:mr-[7.438rem] border-2 border-[#1775EE] text-[#1775EE] py-2 px-5.5 rounded-3xl hover:bg-blue-600 hover:text-white transition-colors duration-300"
        btnFunc={() => setOpen(true)}
      >
        Enroll Now
      </Button>

      {/* Mobile + Tablet Hamburger — visible below lg */}
      {/* ↓ changed flex md:hidden → flex lg:hidden */}
      <div className="flex lg:hidden mr-[2.063rem] md:mr-16 lg:mr-16 xl:mr-[7.438rem] justify-center items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-7 h-7 text-[#1775EE]"
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
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link
                to="/"
                className="text-xl font-bold text-[#1775EE]"
                onClick={() => setIsOpen(false)}
              >
                LOGO
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6 text-[#1775EE]"
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

            {/* Menu Items - Left Aligned */}
            <nav className="flex-1 flex flex-col mt-[6vh] px-6 space-y-6 font-poppins font-bold">
              <button
                onClick={() => {
                  scrollToSection("home");
                  setIsOpen(false);
                }}
                className="text-2xl font-semibold text-left text-black hover:text-[#1775EE]"
              >
                Home
              </button>

              <button
                onClick={() => setOpenDropdown("solutions-mobile")}
                className="text-2xl font-semibold text-left flex items-center justify-between text-black hover:text-[#1775EE]"
              >
                Solutions
                <svg
                  className="w-5 h-5"
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
                className="text-2xl font-semibold text-left text-black flex items-center justify-between"
              >
                Training
                <svg
                  className="w-5 h-5"
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
                  scrollToSection("about");
                  setIsOpen(false);
                }}
                className="text-2xl font-semibold text-left text-black hover:text-[#1775EE]"
              >
                About
              </button>

              <button
                onClick={() => {
                  scrollToSection("contact");
                  setIsOpen(false);
                }}
                className="text-2xl font-semibold text-left text-black hover:text-[#1775EE]"
              >
                Contact Us
              </button>
            </nav>

            {/* Enroll Button at Bottom */}
            <div className="p-6">
              <Link
                to="/enroll"
                onClick={() => setIsOpen(false)}
                className="block w-full text-[1.25rem] text-center font-poppins font-bold py-3 px-6 border-2 border-[#1775EE] text-[#1775EE] rounded-full hover:bg-[#1775EE] hover:text-white transition-colors"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}

        {/* Solutions Submenu — Level 1: Categories */}
        {openDropdown === "solutions-mobile" && !openSubcourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenDropdown(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className="w-6 h-6 text-[#1775EE]"
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
                  className="block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between"
                >
                  {category.name}
                  <svg
                    className="w-4 h-4"
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

        {/* Solutions Submenu — Level 2: Subcourses */}
        {openDropdown === "solutions-mobile" && openSubcourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenSubcourse(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className="w-6 h-6 text-[#1775EE]"
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
                    className="block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4"
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
          </div>
        )}

        {/* Training Level 1 - Main Categories */}
        {openDropdown === "training-mobile" && !openSubcourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenDropdown(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className="w-6 h-6 text-[#1775EE]"
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
                  className="block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between"
                >
                  {category.name}
                  <svg
                    className="w-4 h-4"
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

        {/* Training Level 2 - Subcourses (e.g., CCNA, CCNP) */}
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
                    className="w-6 h-6 text-[#1775EE]"
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
                  ?.subcourses.map((subcourse) => (
                    <button
                      key={subcourse.name}
                      onClick={() => setOpenThirdLevel(subcourse.name)}
                      className="block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between"
                    >
                      {subcourse.name}
                      <svg
                        className="w-4 h-4"
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

        {/* Training Level 3 - Course Options or Fourth Level Categories */}
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
                    className="w-6 h-6 text-[#1775EE]"
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
                      // Has another level (4th level - for Palo Alto) - Show arrow with active state
                      <button
                        key={option.name}
                        onClick={() => setOpenFourthLevel(option.name)}
                        className={`block w-full text-left text-lg font-poppins py-2 px-4 rounded-lg flex items-center justify-between transition-colors ${
                          openFourthLevel === option.name
                            ? "bg-[#EBF5FD] text-black"
                            : "text-black hover:text-[#1775EE]"
                        }`}
                      >
                        {option.name}
                        <svg
                          className={`w-4 h-4 ${openFourthLevel === option.name ? "stroke-[#1775EE]" : ""}`}
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
                      // Final link - NO arrow icon
                      <Link
                        key={option.name}
                        to={option.path}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenDropdown(null);
                          setOpenSubcourse(null);
                          setOpenThirdLevel(null);
                        }}
                        className="block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4"
                      >
                        {option.name}
                      </Link>
                    ),
                  )}
              </nav>
            </div>
          )}

        {/* Training Level 4 - Final Options (for Palo Alto 4-level structure) */}
        {openDropdown === "training-mobile" && openFourthLevel && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex items-center p-6 border-b border-gray-200">
              <button
                onClick={() => setOpenFourthLevel(null)}
                className="focus:outline-none mr-4"
              >
                <svg
                  className="w-6 h-6 text-[#1775EE]"
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
                    className="block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4"
                  >
                    {option.name}
                  </Link>
                ))}
            </nav>
          </div>
        )}
      </div>
      <EnrollModal isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}

export default NavBar;
