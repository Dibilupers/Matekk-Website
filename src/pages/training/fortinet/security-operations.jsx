import { useState } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import nse5Badge from "../../../assets/nse-5-security-operations.svg";
import nse6Badge from "../../../assets/nse-6-security-operations.svg";
import nse7Badge from "../../../assets/nse-7-security-operations.svg";
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

export default function SecurityOperations() {
  const [activeTab, setActiveTab] = useState("NSE 5");

  const nse5Modules = [
    { title: "SOC Concepts and Security Fabric", items: [] },
    { title: "Log Data Flow and Navigation", items: [] },
    { title: "Events, Indicators, and Incidents", items: [] },
    { title: "FortiAI, Threat Hunting, and Troubleshooting", items: [] },
    { title: "Reports", items: [] },
    { title: "Playbooks", items: [] },
  ];

  const nse6Modules = [
    { title: "Introduction to FortiSIEM", items: [] },
    { title: "Analytics", items: [] },
    { title: "Nested Queries and Lookup Tables", items: [] },
    { title: "Rules and Subpatterns", items: [] },
    { title: "Incidents", items: [] },
    { title: "Clear Conditions and Remediation", items: [] },
    { title: "Threat Hunting", items: [] },
    { title: "Performance Metrics and Baselines", items: [] },
    { title: "Machine Learning", items: [] },
    { title: "User and Entity Behavior Analytics", items: [] },
    { title: "FortiSIEM ZTNA", items: [] },
    { title: "Reports and Dashboards", items: [] },
  ];

  const nse7Modules = [
    { title: "SOC Concepts and Security Frameworks", items: [] },
    { title: "Fortinet SOC with FortiSIEM and FortiSOAR", items: [] },
    { title: "Incident Handling and FortiSIEM", items: [] },
    { title: "Incident Handling and FortiSOAR", items: [] },
    { title: "SOC Playbook Development", items: [] },
    { title: "Threat Hunting", items: [] },
  ];

  const tabData = {
    "NSE 5": {
      label: "NSE 5 Security Operations",
      badge: nse5Badge,
      description:
        "Learn practical SOC analyst skills using FortiAnalyzer for centralized logging, threat analysis, and automated responses. This course provides hands-on experience in managing security events, incident analysis, and generating reports.",
      about: [
        "In this course, you will gain practical skills to work as a SOC analyst using FortiAnalyzer for centralized logging and analytics. You will learn to manage and investigate events, automate threat responses with playbooks, and detect current and potential threats through incident analysis and outbreak reports.",
        "The course also covers integrating FortiAI into your workflow and generating security reports to support effective SOC operations.",
      ],
      learn: [
        "Explain SOC objectives, responsibilities, and roles",
        "Describe the role of FortiAnalyzer within a SOC",
        "Explain FortiAnalyzer integration with the Security Fabric",
        "Describe how logging functions within the Security Fabric",
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
      downloadLabel: "See the Official Fortinet NSE 5 Security Operations Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_5_security_operations",
    },
    "NSE 6": {
      label: "NSE 6 Security Operations",
      badge: nse6Badge,
      description:
        "Learn to analyze and manage security events using FortiSIEM in a managed security service provider (MSSP) environment. This course provides hands-on experience in event analysis, incident remediation, and advanced querying.",
      about: [
        "In this course, you will gain practical skills to use FortiSIEM for searching, enriching, and analyzing security events within an MSSP organization.",
        "You will learn to perform real-time and historical searches, build advanced queries, and analyze and remediate security incidents using both traditional and machine learning-assisted methods.",
      ],
      learn: [
        "Explain how FortiSIEM addresses common cybersecurity challenges",
        "Describe the main components and unique database architecture of FortiSIEM",
        "Perform real-time and historical event searches",
        "Define structured search operators and search conditions",
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
      downloadLabel: "See the Official Fortinet NSE 6 Security Operations Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_6_security_operations",
    },
    "NSE 7": {
      label: "NSE 7 Security Operations",
      badge: nse7Badge,
      description:
        "Learn to design, deploy, and manage a Fortinet SOC using FortiSIEM and FortiSOAR. This course provides hands-on experience in incident analysis, threat hunting, playbook development, and incorporating FortiAI for automated security responses.",
      about: [
        "In this course, you will gain practical skills to implement and manage a Fortinet Security Operations Center (SOC) using FortiSIEM and FortiSOAR.",
        "You will learn to analyze and respond to security incidents following industry best practices, develop SOC playbooks, conduct threat hunting, and integrate FortiAI into your workflow for automated threat response.",
      ],
      learn: [
        "Explain the main functions and roles within a SOC",
        "Identify cybersecurity challenges addressed by a Fortinet SOC",
        "Describe the MITRE ATT&CK Enterprise Matrix and the Cyber Kill Chain",
        "Explain methods to identify and reduce the attack surface",
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
        "Active NSE 5 or NSE 6 certification (Security Operations track)",
      ],
      downloadLabel: "See the Official Fortinet NSE 7 Security Operations Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_7_security_operations",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="Security Operations"
        description="The Security Operations track builds skills across FortiAnalyzer SOC fundamentals (NSE 5), FortiSIEM event analysis for MSSPs (NSE 6), and enterprise SOC design with FortiSIEM and FortiSOAR (NSE 7). Choose a level below to explore its details and course content."
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
        description="Advance your networking career and prepare for the Fortinet Security Operations certification exams."
      />
    </main>
  );
}
