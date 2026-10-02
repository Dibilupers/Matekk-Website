import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";
import InquireNowButton from "../ui/InquireNowButton";
import MainLogo from "../../assets/MATEKK_logo.webp";
import TrainingLogo from "../../assets/MATEKK_training_logo.png";
import SolutionsLogo from "../../assets/MATEKK_services_logo.png";
import ProfileImage from "../../assets/person_holding_laptop.webp";
import {
  ArrowRight,
  BookOpen,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
  X,
} from "lucide-react";
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
  const { logout, profile: sessionProfile } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(sessionProfile);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    let isMounted = true;

    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (isMounted && !response.ok) {
          localStorage.removeItem("accessToken");
        }
        if (isMounted) {
          setProfile(await response.json());
          setIsAuthenticated(response.ok);
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    }

    checkSession();
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  function handleLogout() {
    logout();
    setIsAuthenticated(false);
    setIsOpen(false);
    setIsProfileOpen(false);
    navigate("/login");
  }

  const profileName = profile?.username || "My Profile";
  const profileRole = profile?.role || "Learner";
  const profileImage = profile?.profileImage || profile?.avatar || ProfileImage;
  const closeProfile = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  const profileLink = (label, icon, onClick) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      className="flex min-w-0 w-full items-center justify-between gap-3 px-5 py-2.5 text-left text-sm text-slate-900 transition hover:bg-[#eef6ff]"
    >
      <span className="flex min-w-0 items-center gap-3 truncate">{icon}{label}</span>
      <ArrowRight size={18} className="text-[#1775ee]" />
    </button>
  );

  const profilePanel = (mobile = false) => (
    <>
      <button
        type="button"
        aria-label="Close profile menu"
        onClick={closeProfile}
        className="profile-menu-fade-in fixed inset-0 z-[55] cursor-default bg-slate-950/25"
      />
      <aside className="profile-menu-fade-in fixed right-0 top-0 z-[60] box-border flex h-dvh max-h-dvh w-[min(27rem,100vw)] max-w-full flex-col overflow-x-hidden bg-white text-slate-900 shadow-2xl">
      <div className="relative min-h-[6.5rem] shrink-0 overflow-hidden bg-gradient-to-br from-[#eef6ff] to-[#f7fbff] px-6 py-5">
        <div className="absolute -right-8 -top-10 h-32 w-52 rounded-full border border-white/80" />
        <div className="absolute -bottom-16 right-12 h-32 w-64 rounded-full border border-white/80" />
        <div className="relative flex min-w-0 items-center gap-3">
          <img src={profileImage} alt={`${profileName} profile`} className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-sm" />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-sm font-semibold text-[#1775ee]">{profileName}</strong>
            <span className="block text-xs text-slate-600">{profileRole}</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="flex shrink-0 items-center justify-center rounded-full bg-[#1775ee] p-2 text-white transition hover:bg-[#0062e0]"
          >
            <LogOut size={16} />
          </button>
          {mobile && (
            <button type="button" onClick={closeProfile} aria-label="Close profile menu" className="absolute -right-1 -top-5 rounded-full p-1 text-[#1775ee] hover:bg-white/70">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="min-h-0 flex-1 divide-y divide-slate-200 overflow-y-auto">
        <div>
          <h3 className="flex items-center gap-3 px-5 pb-1 pt-4 text-sm font-bold"><LayoutDashboard size={19} className="text-[#1775ee]" /> Dashboard</h3>
          {profileLink("My Learning", <BookOpen size={19} className="text-[#1775ee]" />, () => { closeProfile(); navigate("../pages/blank"); })}
        </div>
        <div className="pt-3">
          <h3 className="flex items-center gap-3 px-5 pb-1 pt-1 text-sm font-bold"><User size={19} className="text-[#1775ee]" /> Profile</h3>
          {profileLink("Update Profile", null, closeProfile)}
          {profileLink("Learning History", null, closeProfile)}
          {profileLink("Transcript", null, closeProfile)}
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="flex items-center gap-3 text-sm font-bold"><Globe size={19} className="text-[#1775ee]" /> Language</span>
          <span className="text-xs text-slate-600">English</span>
        </div>
        <div className="pt-3">
          <h3 className="flex items-center gap-3 px-5 pb-1 pt-1 text-sm font-bold"><MessageCircle size={19} className="text-[#1775ee]" /> Support</h3>
          {profileLink("Support Center", null, closeProfile)}
        </div>
      </div>
      </aside>
    </>
  );

  /* If the user is on specific page then logo changes */
  const getLogoElement = () => {
    if (location.pathname.startsWith("/training")) {
      return (
        <img src={TrainingLogo} alt="Training Logo" className="w-30" />
      );
    }
    if (location.pathname.startsWith("/solutions")) {
      return (
        <img
          src={SolutionsLogo}
          alt="Solutions Logo"
          className="w-30"
        />
      );
    }
    return <img src={MainLogo} alt="MATEKK Logo" className="w-30" />;
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
                name: "End-to-End Network Architecture",
                path: "/solutions/ict/insi/e2e",
              },
              {
                name: "Enterprise Security Architecture",
                path: "/solutions/ict/insi/enterprise",
              },
              {
                name: "WLAN and Wireless Backhaul Networks",
                path: "/solutions/ict/insi/wlan",
              },
              {
                name: "Optical Fiber Networks (LAN and WAN)",
                path: "/solutions/ict/insi/opticalfiber",
              },
              {
                name: "IP Telephony Networks",
                path: "/solutions/ict/insi/iptelephony",
              },
              {
                name: "On-Premise Servers",
                path: "/solutions/ict/insi/onpremise",
              },
              {
                name: "Structured Cabling",
                path: "/solutions/ict/insi/structuredcabling",
              },
            ],
          },
          {
            name: "Cybersecurity",
            subcourses: [
              {
                name: "Red Team (VAPT)",
                path: "/solutions/ict/cybersec/redteam",
              },
              {
                name: "Blue Team (SOC)",
                path: "/solutions/ict/cybersec/blueteam",
              },
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
              { name: "SMART Home", path: "/solutions/ict/smart/home" },
              {
                name: "SMART Building",
                path: "/solutions/ict/smart/building",
              },
              { name: "SMART City", path: "/solutions/ict/smart/city" },
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
          { name: "Door Access Control Systems", path: "/solutions/pece/dooraccess" },
        ],
      },
    ],

    training: TRAINING_COURSES,
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
    resetMenu();
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
    // Always close everything FIRST
    resetMenu();

    if (location.pathname === "/") {
      // Already on homepage → scroll
      setTimeout(() => {
        scrollToSection("home");
      }, 0);
    } else {
      // Go to homepage and scroll after navigation
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
                            : category.name,
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

      {/* Header actions */}
      <div className="hidden lg:flex items-center justify-end gap-3">
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => navigate("/pages/blank")}
            className="block rounded-full border border-[#1775EE] px-5.5 py-2 text-center text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white"
          >
            Courses
          </button>
        )}
        <InquireNowButton
          buttonCustomStyle="block w-full text-[1.25rem] text-center py-3 px-6 rounded-full
          lg:flex lg:w-auto lg:text-base lg:py-2 lg:px-5.5 lg:rounded-3xl
          text-blue-600 border border-blue-600 hover:bg-[#0062E0]
          hover:border-[#0062E0] hover:text-white transition-all duration-300
          cursor-pointer"
        />
        {isAuthenticated ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((current) => !current)}
              aria-expanded={isProfileOpen}
              className="flex max-w-52 shrink-0 items-center gap-2 border-b-2 border-white hover:border-[#1775ee] bg-white px-2 py-1 text-left transition-all duration-300 hover:bg-[#eef6ff]"
            >
              <img src={profileImage} alt="" className="h-9 w-9 rounded-full border-2 border-[#1775ee] object-cover" />
              <span className="min-w-0">
                <span className="block max-w-28 truncate text-sm font-semibold text-[#1775ee]">{profileName}</span>
                <span className="block text-xs text-slate-600">{profileRole}</span>
              </span>
            </button>
            {isProfileOpen && profilePanel()}
          </div>
        ) : (
          <button type="button" onClick={() => navigate("/login")} className="block rounded-full bg-[#1775EE] px-5.5 py-2 text-center text-white transition-all duration-300 hover:bg-[#0062E0]">
            Login
          </button>
        )}
      </div>

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
                onClick={handleHomeClick}
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

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/pages/blank");
                  }}
                  className={`text-2xl font-semibold text-left text-black hover:text-[#1775EE] ${t}`}
                >
                  Courses
                </button>
              )}

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

            <div className="flex gap-3 p-6">
              <InquireNowButton
                buttonCustomStyle={`block w-full text-[1.25rem] text-center py-3 px-6 rounded-full
          lg:flex lg:w-auto lg:text-base lg:py-2 lg:px-5.5 lg:rounded-3xl
          text-blue-600 border border-blue-600 hover:bg-[#0062E0]
          hover:border-[#0062E0] hover:text-white transition-all duration-300
          cursor-pointer`}
              />
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="block w-full rounded-full bg-[#1775EE] px-6 py-3 text-center text-[1.25rem] text-white transition-all duration-300 hover:bg-[#0062E0]"
                >
                  Profile
                </button>
              ) : (
                <button type="button" onClick={() => { setIsOpen(false); navigate("/login"); }} className="block w-full rounded-full bg-[#1775EE] px-6 py-3 text-center text-[1.25rem] text-white transition-all duration-300 hover:bg-[#0062E0]">
                  Login
                </button>
              )}
            </div>
          </div>
        )}
        {isAuthenticated && isProfileOpen && profilePanel(true)}

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
        {openDropdown === "solutions-mobile" &&
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
                  Solutions / {openSubcourse}
                </h2>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-4">
                {dropdownMenus.solutions
                  .find((cat) => cat.name === openSubcourse)
                  ?.subcourses?.map((item) =>
                    item.subcourses ? (
                      <button
                        key={item.name}
                        onClick={() => setOpenThirdLevel(item.name)}
                        className={`block w-full text-left text-lg text-black font-poppins hover:text-[#1775EE] py-2 flex items-center justify-between ${t}`}
                      >
                        {item.name}
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
                        key={item.name}
                        to={item.path}
                        onClick={resetMenu}
                        className={`block text-lg text-black font-poppins hover:text-[#1775EE] py-2 px-4 ${t}`}
                      >
                        {item.name}
                      </Link>
                    ),
                  )}
              </nav>
            </div>
          )}

        {/* Solutions Mobile — Level 3 */}
        {openDropdown === "solutions-mobile" &&
          openSubcourse &&
          openThirdLevel && (
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
                  Solutions / {openSubcourse} / {openThirdLevel}
                </h2>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-4">
                {dropdownMenus.solutions
                  .find((cat) => cat.name === openSubcourse)
                  ?.subcourses?.find((sub) => sub.name === openThirdLevel)
                  ?.subcourses?.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        setOpenDropdown(null);
                        setOpenSubcourse(null);
                        setOpenThirdLevel(null);
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
