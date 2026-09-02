import { useState } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import nse5Badge from "../../../assets/nse-5-sase.svg";
import nse6Badge from "../../../assets/nse-6-sase.svg";
import nse7Badge from "../../../assets/nse-7-sase.svg";
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

export default function SASE() {
  const [activeTab, setActiveTab] = useState("NSE 5");

  const nse5Modules = [
    { title: "Introduction to SASE and FortiSASE", items: [] },
    { title: "Deployment Fundamentals", items: [] },
    { title: "SIA and SSA", items: [] },
    { title: "Basic Security and Endpoint Profiles", items: [] },
    { title: "Monitoring and Reporting", items: [] },
  ];

  const nse6Modules = [
    { title: "Product Overview and Installation", items: [] },
    { title: "Administration", items: [] },
    { title: "Security Policies", items: [] },
    { title: "Fortinet Cloud Security and Playbooks", items: [] },
    { title: "Communication Control", items: [] },
    { title: "Events and Incidents", items: [] },
    { title: "Threat Hunting", items: [] },
    { title: "RESTful API", items: [] },
    { title: "Troubleshooting", items: [] },
  ];

  const nse7Modules = [
    { title: "Advanced Deployment Features", items: [] },
    { title: "SPA", items: [] },
    { title: "Endpoint Management", items: [] },
    { title: "Central Management, Central Analytics, and Security Operations", items: [] },
    { title: "Troubleshooting", items: [] },
  ];

  const tabData = {
    "NSE 5": {
      label: "NSE 5 SASE",
      badge: nse5Badge,
      description:
        "Learn to deploy and manage FortiSASE to secure internet access and protect SaaS applications for on-site and remote users. This course builds foundational knowledge of FortiSASE and how to enforce security policies.",
      about: [
        "In this course, you will gain practical skills to implement and manage FortiSASE, delivering secure internet access and protecting SaaS applications for both on-site and remote users. You will explore its core architecture and security capabilities.",
        "Aligned with Fortinet training, you will learn how to apply security policies using endpoint profiles and content inspection to ensure consistent and effective protection.",
      ],
      learn: [
        "Explain core SASE and SD-WAN concepts and architecture",
        "Perform initial deployment and configuration of FortiSASE",
        "Apply endpoint profiles and secure internet access policies",
        "Monitor and report on user activity and security events",
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
      downloadLabel: "See the Official Fortinet NSE 5 SASE Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_5_sase",
    },
    "NSE 6": {
      label: "NSE 6 SASE",
      badge: nse6Badge,
      description:
        "Learn to protect endpoints against advanced attacks using FortiEDR, with real-time automated incident response. This course provides hands-on experience in endpoint security administration and Fortinet Cloud integration.",
      about: [
        "In this course, you will gain practical skills to secure endpoints with FortiEDR, defending against advanced threats through real-time automated protection and incident response.",
        "You will also learn how FortiEDR operates automatically to protect endpoints and how to manage administrative tasks efficiently, including console user management, collector updates, GDPR compliance, multi-tenant deployments, and system event monitoring. Additionally, the course covers Fortinet Cloud Services and how they integrate with endpoint security.",
      ],
      learn: [
        "Explain the FortiEDR approach and how it operates",
        "Identify FortiEDR components and their configuration",
        "Perform key administrative tasks, including console user management, collector updates, GDPR data deletion, multi-tenant setup, and event monitoring",
        "Define Fortinet Cloud Services and explain how they work",
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
      downloadLabel: "See the Official Fortinet NSE 6 SASE Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_6_sase",
    },
    "NSE 7": {
      label: "NSE 7 SASE",
      badge: nse7Badge,
      description:
        "Learn to deploy and manage FortiSASE for enterprise environments, securing internet access and private applications across branches. This course provides advanced skills in centralized policy management, zero trust access, and user monitoring.",
      about: [
        "In this course, you will gain advanced knowledge of FortiSASE and its enterprise capabilities, including branch deployment, secure private access (SPA), advanced endpoint profile settings, and centralized management and analytics.",
        "You will learn to design, deploy, and manage FortiSASE to provide secure internet access (SIA) and secure private applications across multiple locations. The course also covers centralized policy management, zero trust network access (ZTNA), compliance checks, and enhanced visibility through user monitoring and security logs.",
      ],
      learn: [
        "Explain the SASE architecture",
        "Describe the Fortinet SASE solution",
        "Design and implement FortiSASE deployment scenarios",
        "Explain SASE infrastructure and Points of Presence (POPs)",
      ],
      modules: nse7Modules,
      jobOpportunities: [
        "Junior Network Administrator",
        "Entry-Level Security Analyst",
        "IT Security Associate",
        "Cybersecurity Intern",
      ],
      targetLearners: ["Advanced"],
      prerequisites: ["Active NSE 4 certification", "Active NSE 5 or NSE 6 certification (SASE track)"],
      downloadLabel: "See the Official Fortinet NSE 7 SASE Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_7_sase",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="SASE"
        description="The SASE track builds skills across FortiSASE fundamentals (NSE 5), FortiEDR endpoint protection and cloud integration (NSE 6), and enterprise-scale FortiSASE deployment and zero trust access (NSE 7). Choose a level below to explore its details and course content."
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
        description="Advance your networking career and prepare for the Fortinet SASE certification exams."
      />
    </main>
  );
}
