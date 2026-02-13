import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubcourse, setOpenSubcourse] = useState(null);
  const [openSubSubcourse, setOpenSubSubcourse] = useState(null);
  const [openSubOption, setOpenSubOption] = useState(null);
  const [openSubSubSubcourse, setOpenSubSubSubcourse] = useState(null);

  const resetDropdowns = () => {
    setOpenDropdown(null);
    setOpenSubcourse(null);
    setOpenSubSubcourse(null);
    setOpenSubOption(null);
  };

  const dropdownMenus = {
    solutions: [
      { name: "Enterprise Solutions", path: "/solutions/enterprise" },
      { name: "Cloud Services", path: "/solutions/cloud" },
      { name: "Cybersecurity", path: "/solutions/cybersecurity" },
      { name: "Data Analytics", path: "/solutions/analytics" },
    ],
    training: [
      {
        name: "Cisco",
        subcourses: [
          {
            name: "CCNA",
            subcourses: [
              { name: "CCNA", path: "/training/cisco/ccna" },
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
                path: "/training/comptia/aplus/core12",
              },
              { name: "Network+", path: "/training/comptia/network" },
              { name: "Security+", path: "/training/comptia/security" },
              { name: "CySA+", path: "/training/comptia/cysa" },
              { name: "PenTest+", path: "/training/comptia/pentest" },
              { name: "Linux+", path: "/training/comptia/linux" },
            ],
          },
          {
            name: "Fortinet",
            subcourses: [
              { name: "NSE 1", path: "/training/fortinet/nse1" },
              { name: "NSE 2", path: "/training/fortinet/nse2" },
              { name: "NSE 3", path: "/training/fortinet/nse3" },
              { name: "NSE 4 (all tracks)", path: "/training/fortinet/nse4" },
              {
                name: "NSE 5 Secure Networking",
                path: "/training/fortinet/nse5securenetworking",
              },
              { name: "NSE 5 SASE", path: "/training/fortinet/nse5sase" },
              {
                name: "NSE 5 Cloud Security",
                path: "/training/fortinet/nse5cloudsecurity",
              },
              {
                name: "NSE 5 Secure Operations",
                path: "/training/fortinet/nse5secureoperations",
              },
              {
                name: "NSE 6 Secure Networking",
                path: "/training/fortinet/nse6securenetworking",
              },
              { name: "NSE 6 SASE", path: "/training/fortinet/nse6sase" },
              {
                name: "NSE 6 Cloud Security",
                path: "/training/fortinet/nse6cloudsecurity",
              },
              {
                name: "NSE 6 Secure Operations",
                path: "/training/fortinet/nse6secureoperations",
              },
              {
                name: "NSE 7 Secure Networking",
                path: "/training/fortinet/nse7securenetworking",
              },
              { name: "NSE 7 SASE", path: "/training/fortinet/nse7sase" },
              {
                name: "NSE 7 Cloud Security",
                path: "/training/fortinet/nse7cloudsecurity",
              },
              {
                name: "NSE 7 Secure Operations",
                path: "/training/fortinet/nse7secureoperations",
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
                    path: "/training/paloalto/networksecurity/essentials",
                  },
                  {
                    name: "Cybersecurity Practitioner",
                    path: "/training/paloalto/networksecurity/practitioner",
                  },
                  {
                    name: "Network Security Professional",
                    path: "/training/paloalto/networksecurity/professional",
                  },
                  {
                    name: "Network Security Analyst",
                    path: "/training/paloalto/networksecurity/analyst",
                  },
                  {
                    name: "Next-Generation Firewall Engineer",
                    path: "/training/paloalto/networksecurity/nextgenerationfirewallengineer",
                  },
                  {
                    name: "SD-WAN Engineer",
                    path: "/training/paloalto/networksecurity/sdwanengineer",
                  },
                  {
                    name: "Security Service Edge Engineer",
                    path: "/training/paloalto/networksecurity/securityserviceedgeengineer",
                  },
                  {
                    name: "Network Security Architect",
                    path: "/training/paloalto/networksecurity/architect",
                  },
                ],
              },
              {
                name: "Security Operations",
                subcourses: [
                  {
                    name: "Cybersecurity Practitioner",
                    path: "/training/paloalto/securityoperations/practitioner",
                  },
                  {
                    name: "Security Operations Professional",
                    path: "/training/paloalto/securityoperations/professional",
                  },
                  {
                    name: "XSIAM Analyst",
                    path: "/training/paloalto/securityoperations/xsiamanalyst",
                  },
                  {
                    name: "XDR Analyst",
                    path: "/training/paloalto/securityoperations/xdranalyst",
                  },
                  {
                    name: "XSIAM Engineer",
                    path: "/training/paloalto/securityoperations/xsiamengineer",
                  },
                  {
                    name: "XDR Engineer",
                    path: "/training/paloalto/securityoperations/xdrengineer",
                  },
                  {
                    name: "XSOAR Engineer",
                    path: "/training/paloalto/securityoperations/xsoarengineer",
                  },
                ],
              },
              {
                name: "Cloud Security",
                subcourses: [
                  {
                    name: "Cybersecurity Apprentice",
                    path: "/training/paloalto/cloudsecurity/cybersecurityapprentice",
                  },
                  {
                    name: "Cybersecurity Practitioner",
                    path: "/training/paloalto/cloudsecurity/practitioner",
                  },
                  {
                    name: "Cloud Security Professional",
                    path: "/training/paloalto/cloudsecurity/professional",
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
                    path: "/training/peh/fundamentals/pentest",
                  },
                  {
                    name: "Web App Security",
                    path: "/training/peh/fundamentals/webapp",
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
                path: "/training/cdcp/dcfc",
              },
              {
                name: "Certified Data Centre Professional",
                path: "/training/cdcp/cdcp",
              },
              {
                name: "Certified Data Centre Specialist",
                path: "/training/cdcp/cdcs",
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
                name: "Foundation",
                path: "/training/cloud/microsoft/foundation",
              },
              {
                name: "Advanced Design",
                path: "/training/cloud/microsoft/advanced",
              },
            ],
          },
          {
            name: "AWS",
            subcourses: [
              { name: "Foundation", path: "/training/cloud/aws/foundation" },
              { name: "Advanced Design", path: "/training/cloud/aws/advanced" },
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
                path: "/training/itil4/advanced",
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

  const toggleDropdown = (dropdown) =>
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex flex-row items-center justify-between py-4 bg-white sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-md" : ""}`}
      onMouseLeave={() => resetDropdowns()}
    >
      <Link to="/" className="ml-[2.063rem] md:ml-[7.438rem]">
        LOGO
      </Link>

      <nav className="space-x-8 hidden md:flex font-poppins items-center">
        <button
          onClick={() => scrollToSection("home")}
          onMouseEnter={() => setOpenDropdown(null)}
          className="hover:text-[#1775EE] hover:font-bold transition-colors cursor-pointer"
        >
          Home
        </button>

        <div
          className="relative"
          onMouseEnter={() => setOpenDropdown("solutions")}
        >
          <button className="flex items-center gap-1 hover:font-bold hover:text-[#1775EE] transition-colors">
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
            <div
              className="absolute top-full right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 border font-inter border-gray-100"
              onMouseLeave={() => {
                setOpenDropdown(null);
                setOpenSubcourse(null);
              }}
            >
              {dropdownMenus.solutions.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-[#1775EE] hover:text-white hover:font-bold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setOpenDropdown("training")}
        >
          <button className="flex items-center gap-1 hover:text-[#1775EE] hover:font-bold transition-colors">
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
                      onMouseEnter={() => {
                        setOpenSubcourse(category.name);
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
                          onMouseEnter={() => {
                            setOpenSubSubcourse(subcourse.name);
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
                          subSub.subcourses && subSub.subcourses.length > 0; // Check if there are sub-subcourses

                        return (
                          <button
                            key={subSub.name}
                            onMouseEnter={() => {
                              if (hasSubSubcourses) {
                                // Only allow hover for items with sub-subcourses
                                setOpenSubSubSubcourse(subSub.name);
                              }
                            }}
                            className={`w-full text-left px-6 py-2 transition-colors rounded-[0.35rem] flex items-center justify-between
              ${
                hasSubSubcourses
                  ? openSubSubSubcourse === subSub.name
                    ? "bg-[#1775EE] text-white font-bold" // Blue background when active and has sub-subcourses
                    : "hover:bg-[#1775EE] hover:text-white hover:font-bold" // Hover effect for items with sub-subcourses
                  : "hover:text-[#1775EE] hover:font-bold" // Only blue text for items without sub-subcourses
              }
            `}
                          >
                            {subSub.name}

                            {/* Show the arrow only if the item has sub-subcourses */}
                            {hasSubSubcourses && (
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
          onMouseEnter={() => setOpenDropdown(null)}
          className="hover:text-[#1775EE] hover:font-bold transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          onMouseEnter={() => setOpenDropdown(null)}
          className="hover:text-[#1775EE] hover:font-bold transition-colors cursor-pointer"
        >
          Contact Us
        </button>
      </nav>

      <Link
        to="/enroll"
        className="hidden md:flex mr-0 md:mr-[7.438rem] font-inter border-2 border-[#1775EE] text-[#1775EE] py-2 px-5.5 rounded-3xl hover:bg-blue-600 hover:text-white transition-colors duration-300"
      >
        Enroll Now
      </Link>
      {/* Mobile */}
      <div className="flex md:hidden mr-[2.063rem] justify-center items-center">
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

        {isOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40">
            <nav className="flex flex-col p-[2.063rem] space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-[#003058] hover:text-blue-600 py-2 text-left"
              >
                Home
              </button>

              <div>
                <button
                  onClick={() => toggleDropdown("solutions-mobile")}
                  className="text-[#003058] hover:text-blue-600 py-2 flex items-center justify-between w-full"
                >
                  Solutions
                  <svg
                    className={`w-4 h-4 transition-transform ${openDropdown === "solutions-mobile" ? "rotate-180" : ""}`}
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
                {openDropdown === "solutions-mobile" && (
                  <div className="pl-4 space-y-2 mt-2">
                    {dropdownMenus.solutions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-600 hover:text-blue-600 py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleDropdown("training-mobile")}
                  className="text-[#003058] hover:text-blue-600 py-2 flex items-center justify-between w-full"
                >
                  Training
                  <svg
                    className={`w-4 h-4 transition-transform ${openDropdown === "training-mobile" ? "rotate-180" : ""}`}
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
                {openDropdown === "training-mobile" && (
                  <div className="pl-4 space-y-2 mt-2">
                    {dropdownMenus.training.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-600 hover:text-blue-600 py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("about")}
                className="text-[#003058] hover:text-blue-600 py-2 text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#003058] hover:text-blue-600 py-2 text-left"
              >
                Contact Us
              </button>

              <Link
                to="/enroll"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 mt-4"
              >
                Enroll Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
