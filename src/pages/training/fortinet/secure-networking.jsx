import { useState } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import nse5Badge from "../../../assets/nse-5-secure-networking.svg";
import nse6Badge from "../../../assets/nse-6-secure-networking.svg";
import nse7Badge from "../../../assets/nse-7-secure-networking.svg";
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

export default function SecureNetworking() {
  const [activeTab, setActiveTab] = useState("NSE 5");

  const nse5Modules = [
    {
      title: "FortiSwitch Administrator",
      items: [
        "Switch Fundamentals",
        "Managed Switch",
        "Basic Administration",
        "Spanning Tree Protocol (STP)",
        "Layer 2 Design",
        "Layer 2 Security",
        "Advanced Features",
        "QoS and Multi-Tenancy",
        "Monitoring",
        "Standalone Switch and FortiEdge Cloud",
        "Standalone Switch — Layer 2 and Layer 3",
        "Troubleshooting",
      ],
    },
    {
      title: "Secure Wireless LAN Administrator",
      items: [
        "Managed FortiAP",
        "Wireless Security",
        "Wireless Network Access",
        "FortiAP Profiles",
        "Rogue APs",
        "Advanced Options and Monitoring",
        "FortiAIOps",
        "Network Information Collection and Performance Analysis",
        "Troubleshooting",
      ],
    },
  ];

  const nse6Modules = [
    {
      title: "FortiManager Administrator",
      items: [
        "Introduction and Initial Configuration",
        "Administration and Management",
        "Device Registration",
        "Device-Level Configuration and Installation",
        "Policy and Objects",
        "Global ADOM and Central Management",
        "Diagnostics and Troubleshooting",
        "Additional Configuration",
      ],
    },
    {
      title: "FortiAnalyzer Administrator",
      items: [
        "Introduction and Initial Configuration",
        "Administration and Management",
        "ADOMs and High Availability",
        "Managing Devices",
        "Logs and Reports Management",
      ],
    },
    {
      title: "FortiNAC Administrator",
      items: [
        "Introduction and Initial Configuration",
        "Achieving Network Visibility",
        "Identification and Classification of Rogues",
        "State-Based Control",
        "Guest and Contractor Management",
        "Security Device Integration and Automated Response",
      ],
    },
    {
      title: "FortiVoice Administrator",
      items: [
        "System Overview",
        "Phone Settings and Profiles",
        "Extension Configuration",
        "Groups",
        "Trunks",
        "Call Features",
        "Log and Maintenance",
        "Call Reporting",
        "User Portal",
        "Auto Dialer",
        "Gateway Management",
        "FortiFone Softclient",
      ],
    },
  ];

  const nse7Modules = [
    { title: "Introduction to Network Security Architecture", items: [] },
    { title: "Central Management", items: [] },
    { title: "VLANs and VDOMs", items: [] },
    { title: "High Availability", items: [] },
    { title: "Dynamic Routing Protocols", items: [] },
    { title: "IPsec", items: [] },
    { title: "Auto-Discovery VPN", items: [] },
    { title: "Security Profiles", items: [] },
    { title: "Security Fabric", items: [] },
    { title: "Hardware Acceleration on FortiGate", items: [] },
  ];

  const tabData = {
    "NSE 5": {
      label: "NSE 5 Secure Networking",
      badge: nse5Badge,
      description:
        "Learn to deploy and manage secure switching and wireless access with FortiSwitch and Fortinet's secure wireless solutions. This course provides hands-on experience configuring, securing, and monitoring the wired and wireless edge of the network.",
      about: [
        "In this course, you will gain practical skills in deploying and managing secure switching and wireless networking with FortiSwitch and Fortinet's secure wireless access points. You will learn how to configure ports, VLANs, and access policies, and how to extend the Fortinet Security Fabric to the wired and wireless edge.",
        "Aligned with Fortinet training, these fundamentals provide a strong foundation for building visible, controlled, and secure access layers across the network.",
      ],
      learn: [
        "Configure and manage FortiSwitch devices from FortiGate",
        "Deploy secure wireless access points and enforce wireless security policies",
        "Segment traffic with VLANs and Layer 2 controls",
        "Extend the Fortinet Security Fabric to switching and wireless infrastructure",
      ],
      modules: nse5Modules,
      jobOpportunities: [
        "Entry-Level Security Analyst",
        "Junior Network Administrator",
        "IT Security Associate",
        "Cybersecurity Intern",
      ],
      targetLearners: ["Intermediate"],
      prerequisites: ["Active NSE 4 certification"],
      downloadLabel: "See the Official Fortinet NSE 5 Secure Networking Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_5_secure_networking",
    },
    "NSE 6": {
      label: "NSE 6 Secure Networking",
      badge: nse6Badge,
      description:
        "Learn to centrally manage and monitor a Fortinet deployment using FortiManager, FortiAnalyzer, FortiNAC, and FortiVoice. This course provides hands-on experience in policy administration, log analysis, network access control, and voice communications across a growing infrastructure.",
      about: [
        "In this course, you will gain practical skills in administering FortiManager for centralized policy and device management, and FortiAnalyzer for consolidated logging, analytics, and reporting across a Fortinet deployment.",
        "You will also learn to use FortiNAC to gain visibility into connected devices and enforce automated network access controls, and administer FortiVoice for secure business communications, building a strong foundation for managing a distributed, secure networking infrastructure.",
      ],
      learn: [
        "Provision and manage FortiGate devices from FortiManager",
        "Consolidate logs and generate reports with FortiAnalyzer",
        "Use FortiNAC to profile devices and automate network access control",
        "Configure and administer FortiVoice extensions, trunks, and call features",
      ],
      modules: nse6Modules,
      jobOpportunities: [
        "Junior Network Administrator",
        "Entry-Level Security Analyst",
        "IT Security Associate",
        "Cybersecurity Intern",
      ],
      targetLearners: ["Advanced"],
      prerequisites: ["Active NSE 4 certification"],
      downloadLabel: "See the Official Fortinet NSE 6 Secure Networking Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_6_secure_networking",
    },
    "NSE 7": {
      label: "NSE 7 Secure Networking",
      badge: nse7Badge,
      description:
        "Learn to implement and centrally manage enterprise security with multiple FortiGate devices. This course provides hands-on experience in network monitoring, high availability, routing, and service hardening.",
      about: [
        "In this course, you will gain practical skills to deploy and centrally manage an enterprise security infrastructure using multiple FortiGate devices.",
        "You will learn to monitor network security events, implement high availability solutions, combine OSPF and BGP for enterprise traffic routing, and harden critical enterprise services.",
      ],
      learn: [
        "Centralize management and monitoring of network security events",
        "Implement high availability (HA) on FortiGate devices",
        "Combine OSPF and BGP protocols to route enterprise traffic",
        "Harden enterprise services to enhance security",
      ],
      modules: nse7Modules,
      jobOpportunities: [
        "Junior Network Administrator",
        "Entry-Level Security Analyst",
        "IT Security Associate",
        "Cybersecurity Intern",
      ],
      targetLearners: ["Advanced"],
      prerequisites: [
        "Active NSE 4 certification",
        "Active NSE 5 or NSE 6 certification (Secure Networking track)",
      ],
      downloadLabel: "See the Official Fortinet NSE 7 Secure Networking Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_7_secure_networking",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="Secure Networking"
        description="The Secure Networking track builds skills across FortiSwitch and secure wireless (NSE 5), centralized management with FortiManager, FortiAnalyzer, and FortiNAC (NSE 6), and enterprise-scale FortiGate architecture (NSE 7). Choose a level below to explore its details and course content."
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
        description="Advance your networking career and prepare for the Fortinet Secure Networking certification exams."
      />
    </main>
  );
}
