import { useState } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import nse1Badge from "../../../assets/nse-1-cybersecurity.svg";
import nse2Badge from "../../../assets/nse-2-cybersecurity.svg";
import nse3Badge from "../../../assets/nse-3-cybersecurity.svg";
import nse4Badge from "../../../assets/nse-4-fortios.svg";
import FortinetHero from "../../../assets/FortinetHeader.webp";
import FortinetFooter from "../../../assets/FortinetFooter.webp";
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

export default function FortiOS() {
  const [activeTab, setActiveTab] = useState("NSE 1");

  const nse1Modules = [
    { title: "Introduction to Cybersecurity", items: [] },
    { title: "Threat Landscape", items: [] },
    { title: "Social Engineering", items: [] },
    { title: "Malware", items: [] },
    { title: "Cryptography and the Public Key Infrastructure", items: [] },
    { title: "Secure Networking", items: [] },
    { title: "Authentication and Access Control", items: [] },
    { title: "Endpoint Security", items: [] },
    { title: "Secure Data and Applications", items: [] },
    { title: "Cloud Security and Virtualization", items: [] },
  ];

  const nse2Modules = [
    { title: "What is Next Generation Firewall", items: [] },
    { title: "How Firewall Policies Work", items: [] },
    { title: "User Authentication in NGFW", items: [] },
    { title: "Blocking Malware", items: [] },
    { title: "Controlling Web Access with Web Filtering", items: [] },
    { title: "Intrusion Prevention System and Application Control", items: [] },
    { title: "Connecting Multiple Locations Securely", items: [] },
    { title: "Secure SD-WAN", items: [] },
    { title: "SASE", items: [] },
  ];

  const nse3Modules = [
    { title: "FortiGate Overview", items: [] },
    { title: "How to Access Your FortiGate", items: [] },
    { title: "Configuring System Settings and Basic Networking", items: [] },
    { title: "Firewall Policies", items: [] },
    { title: "Logging Events", items: [] },
    { title: "Authenticating Network Users", items: [] },
    { title: "Inspecting SSL Traffic", items: [] },
    { title: "Blocking Malware", items: [] },
    { title: "Web Filtering", items: [] },
    { title: "Intrusion Prevention System (IPS)", items: [] },
    { title: "Application Control", items: [] },
    { title: "Securing Remote Access with ZTNA", items: [] },
    { title: "IPsec VPNs", items: [] },
    { title: "System Maintenance and Monitoring", items: [] },
    { title: "Security Fabric", items: [] },
    { title: "High Availability", items: [] },
    { title: "FortiLink", items: [] },
    { title: "Securing Public and Private Clouds", items: [] },
    { title: "FortiCare", items: [] },
    { title: "FortiCloud", items: [] },
  ];

  const nse4Modules = [
    { title: "System and Network Settings", items: [] },
    { title: "Logging and Monitoring", items: [] },
    { title: "Firewall Policies and NAT", items: [] },
    { title: "Routing", items: [] },
    { title: "Firewall Authentication", items: [] },
    { title: "Fortinet Single Sign-On (FSSO)", items: [] },
    { title: "Certificate Operations", items: [] },
    { title: "Antivirus", items: [] },
    { title: "Web Filtering", items: [] },
    { title: "Intrusion Prevention and Application Control", items: [] },
    { title: "IPsec VPN", items: [] },
    { title: "SD-WAN Configuration and Monitoring", items: [] },
    { title: "High Availability", items: [] },
    { title: "Diagnostics and Troubleshooting", items: [] },
    { title: "FortiGate in the Cloud", items: [] },
    { title: "FortiSASE", items: [] },
  ];

  const tabData = {
    "NSE 1": {
      label: "NSE 1",
      badge: nse1Badge,
      description:
        "In this course, you will explore the cyberthreat landscape, including common network threats, the attackers behind them, and the basic cybersecurity principles that help keep you and your network secure. This course serves as an introduction for beginners in cybersecurity, aligned with Fortinet NSE 1 fundamentals.",
      about: [
        "In this course, you will learn about the fundamentals of network security and the cyberthreat landscape. It introduces common cyber threats, basic security concepts, and the technologies used to protect networks and data.",
        "This course is designed as an entry point for anyone interested in cybersecurity and follows the foundational principles of Fortinet NSE 1. You can build on these concepts to explore more advanced cybersecurity topics and certifications.",
      ],
      learn: [
        "Explain cybersecurity and the core principles of protecting information.",
        "Recognize types of cyber threat actors, their tactics, and the defenses used against them",
        "Outline various social engineering methods",
        "Explain malware categories and how they are delivered",
      ],
      modules: nse1Modules,
      jobOpportunities: [
        "IT Support Technician",
        "Cybersecurity Intern",
        "Network Administrator",
        "Security Analyst",
      ],
      targetLearners: ["Beginners", "Zero Knowledge"],
      prerequisites: ["No certification required — open to anyone starting their cybersecurity journey"],
      downloadLabel: "See the Official Fortinet NSE 1 Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_1",
    },
    "NSE 2": {
      label: "NSE 2",
      badge: nse2Badge,
      description:
        "Deepen your understanding of cybersecurity by exploring common network threats, attack methods, and basic defense strategies. This course builds on foundational knowledge to prepare you for practical security challenges.",
      about: [
        "Building on the basics from NSE 1, this course expands your understanding of network security concepts and threat prevention. It covers common cyber risks, attack methods, and how security technologies help defend networks and users.",
        "Aligned with Fortinet NSE 2, this course strengthens your foundational knowledge and prepares you for more advanced Fortinet training and real-world cybersecurity roles.",
      ],
      learn: [
        "Define key terms and concepts in cybersecurity",
        "Explain network protection using cryptography and endpoint security",
        "Describe how secure network models like SD-WAN and SASE improve cybersecurity",
        "Explain differences in securing physical, virtual, and cloud networks and endpoints",
      ],
      modules: nse2Modules,
      jobOpportunities: [
        "Junior IT Support",
        "Cybersecurity Intern",
        "Junior Network Support",
        "Entry-Level Security Analyst",
      ],
      targetLearners: ["Beginners", "Zero Knowledge"],
      prerequisites: ["No certification required — NSE 1 completion recommended"],
      downloadLabel: "See the Official Fortinet NSE 2 Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_2",
    },
    "NSE 3": {
      label: "NSE 3",
      badge: nse3Badge,
      description:
        "Learn how to strengthen network security using key FortiGate features. Through hands-on demos and interactive simulations, you'll practice basic operations and prepare to explore more advanced topics.",
      about: [
        "In this course, you will gain practical skills to strengthen network security using essential FortiGate features. Through interactive simulations and guided demonstrations, you will learn how to perform basic configuration and operational tasks.",
        "Aligned with Fortinet NSE 3, this course builds your hands-on experience and prepares you for more advanced FortiGate concepts and security implementations.",
      ],
      learn: [
        "Set up common and key features on FortiGate devices",
        "Control access to network resources",
        "Securely connect remote users to the corporate network via VPNs",
        "Carry out basic system maintenance",
      ],
      modules: nse3Modules,
      jobOpportunities: [
        "Entry-Level Security Analyst",
        "Junior Network Administrator",
        "IT Security Associate",
        "Cybersecurity Intern",
      ],
      targetLearners: ["Beginners", "Zero Knowledge"],
      prerequisites: ["No certification required — NSE 2 completion recommended"],
      downloadLabel: "See the Official Fortinet NSE 3 Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_3",
    },
    "NSE 4": {
      label: "NSE 4",
      badge: nse4Badge,
      description:
        "Learn to administer FortiGate devices using key features and security profiles. Through hands-on labs, you'll practice firewall policies, VPNs, user authentication, logging, and network protection, building a solid foundation for advanced FortiGate administration.",
      about: [
        "In this course, you will gain practical experience using key FortiGate features. Through interactive labs, you will explore firewall policies, user authentication, high availability, logging and monitoring, site-to-site IPsec VPN, cloud deployments, and security services such as IPS, antivirus, web filtering, and application control.",
        "Aligned with Fortinet training, these administration fundamentals provide a strong foundation for implementing and managing the most widely used FortiGate security features.",
      ],
      learn: [
        "Set up basic FortiGate networking from factory defaults",
        "Configure and manage administrator access",
        "Administer devices using both GUI and CLI",
        "Understand device registration methods",
      ],
      modules: nse4Modules,
      jobOpportunities: [
        "Entry-Level Security Analyst",
        "Junior Network Administrator",
        "IT Security Associate",
        "Cybersecurity Intern",
      ],
      targetLearners: ["Intermediate"],
      prerequisites: ["Pass the NSE 4 proctored exam — no prior certification required"],
      downloadLabel: "See the Official Fortinet NSE 4 Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_4",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="FortiOS"
        description="FortiOS is the foundation of the Fortinet Security Fabric, spanning entry-level cybersecurity fundamentals (NSE 1–3) through hands-on FortiGate administration (NSE 4). Choose a level below to explore its details and course content."
      />

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
        {/* ==================== LEFT SIDE ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== LEVEL TABS ==================== */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(tabData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeTab === key
                    ? "bg-[#1775EE] text-white border-[#1775EE]"
                    : "bg-white text-[#1775EE] border-[#1775EE] hover:bg-[#EBF5FD]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* ==================== ACTIVE TAB HEADER ==================== */}
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{active.label}</h2>
            <p className="text-black max-w-3xl">{active.description}</p>
          </div>

          {/* About Section */}
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            {active.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>

          {/* What You Will Learn */}
          <section className="flex flex-col gap-y-5">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {active.learn.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Course Content */}
          <section className="flex flex-col gap-y-5">
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <CourseModules modules={active.modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className="aside_contents">
          {/* Cert Badge */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            <img
              src={active.badge}
              alt={`Fortinet ${active.label} Certification Badge`}
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* Job Opportunities */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Job Opportunities</h5>
            {active.jobOpportunities.map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{job}</span>
              </p>
            ))}
          </div>

          {/* Target Learners */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Target Learners</h5>
            {active.targetLearners.map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>

          {/* Prerequisites */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Prerequisites</h5>
            {active.prerequisites.map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>

          {/* Schedule */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Schedule</h5>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p>Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p>Duration:</p>
                <p>7 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p>Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span>Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Inclusions</h5>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p>Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p>Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={InstitutionalIcon} alt="Institutional Account" className="w-4 h-4" />
              </span>
              <p>Institutional Account</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={WorkstationIcon} alt="Workstation" className="w-4 h-4" />
              </span>
              <p>Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p>Certificate of Completion</p>
            </div>

            <a
              href={active.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline mt-2"
            >
              {active.downloadLabel}
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER ==================== */}
      <TrainingTemplateFooter
        bgImage={FortinetFooter}
        description="Advance your networking career and prepare for the Fortinet FortiOS certification exams."
      />
    </main>
  );
}
