import { useState } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import nse5Badge from "../../../assets/nse-5-cloud-security.svg";
import nse6Badge from "../../../assets/nse-6-cloud-security.svg";
import nse7Badge from "../../../assets/nse-7-cloud-security.svg";
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

export default function CloudSecurity() {
  const [activeTab, setActiveTab] = useState("NSE 5");

  const nse5Modules = [
    { title: "Introduction", items: [] },
    { title: "Basic Setup", items: [] },
    { title: "Web Application Security", items: [] },
    { title: "API Discovery and Protection", items: [] },
    { title: "Bot Mitigation", items: [] },
    { title: "Application Delivery", items: [] },
    { title: "Additional Configuration", items: [] },
    { title: "Compliance", items: [] },
    { title: "Troubleshooting", items: [] },
  ];

  const nse6Modules = [
    { title: "Email Concepts", items: [] },
    { title: "Basic Setup", items: [] },
    { title: "Access Control and Policies", items: [] },
    { title: "Authentication", items: [] },
    { title: "Session Management", items: [] },
    { title: "Antivirus and Antispam", items: [] },
    { title: "Content Inspection", items: [] },
    { title: "Securing Communications", items: [] },
    { title: "High Availability", items: [] },
    { title: "Server Mode", items: [] },
    { title: "Transparent Mode", items: [] },
    { title: "Maintenance", items: [] },
    { title: "Troubleshooting", items: [] },
  ];

  const nse7Modules = [
    { title: "Cloud Security Best Practices", items: [] },
    { title: "Infrastructure as Code", items: [] },
    { title: "Securing IaaS Solutions", items: [] },
    { title: "Securing CaaS Solutions", items: [] },
    { title: "Troubleshooting", items: [] },
    { title: "FortiCNAPP Features", items: [] },
    { title: "FortiCNAPP Risk Management and Threat Detection", items: [] },
    { title: "FortiCNAPP Code Security and Vulnerability Management", items: [] },
  ];

  const tabData = {
    "NSE 5": {
      label: "NSE 5 Cloud Security",
      badge: nse5Badge,
      description:
        "Learn to deploy, configure, and manage FortiWeb to protect web applications and cloud environments. This course provides hands-on experience with security policies, threat protection, and application delivery features.",
      about: [
        "In this course, you will gain practical skills in deploying, configuring, and managing FortiWeb to protect web applications. You will learn to create security policies, implement high availability, and defend against threats using data validation, machine learning, API security, and bot mitigation.",
        "Aligned with Fortinet training, the course also covers DoS protection, logging, compliance standards such as PCI DSS and OWASP, FortiAI integration, and basic troubleshooting.",
      ],
      learn: [
        "Explain the purpose of a web application firewall and its role in the network",
        "Perform initial deployment and basic configuration of FortiWeb",
        "Configure FortiWeb for deployment in a load-balanced network",
        "Implement SSL/TLS encryption, including inspection and offloading",
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
      downloadLabel: "See the Official Fortinet NSE 5 Cloud Security Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_5_cloud_security",
    },
    "NSE 6": {
      label: "NSE 6 Cloud Security",
      badge: nse6Badge,
      description:
        "Learn to secure your network from email-based threats using FortiMail. This course provides hands-on experience in deployment, management, and advanced threat protection for critical business communications.",
      about: [
        "In this course, you will explore common email security challenges and gain practical skills in deploying, managing, and troubleshooting FortiMail to protect your network from email-borne threats.",
        "You will also learn the role of FortiMail as a specialized security device and how its features deliver high-performance, in-depth protection for business-critical communications.",
      ],
      learn: [
        "Integrate FortiMail with FortiSandbox for advanced threat protection (ATP)",
        "Prevent accidental or intentional data leaks of confidential or regulated information",
        "Archive email to meet compliance requirements",
        "Deploy high availability (HA) and redundant infrastructure to ensure maximum uptime of critical email systems",
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
      downloadLabel: "See the Official Fortinet NSE 6 Cloud Security Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_6_cloud_security",
    },
    "NSE 7": {
      label: "NSE 7 Cloud Security",
      badge: nse7Badge,
      description:
        "Learn to deploy and secure Fortinet solutions in public cloud environments. This course provides hands-on experience using automation tools, troubleshooting cloud connectivity, and managing risks with FortiCNAPP.",
      about: [
        "In this course, you will gain practical skills to deploy Fortinet solutions in public cloud environments using various methods.",
        "You will learn to leverage third-party automation tools to deploy and secure cloud resources, troubleshoot common connectivity issues in AWS and Azure, and use FortiCNAPP to simplify risk management for cloud workloads.",
      ],
      learn: [
        "Apply best practices for cloud deployments",
        "Use automation tools to deploy resources in AWS",
        "Deploy Fortinet solutions to secure IaaS environments",
        "Deploy Fortinet solutions to secure CaaS environments",
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
        "Active NSE 5 or NSE 6 certification (Cloud Security track)",
      ],
      downloadLabel: "See the Official Fortinet NSE 7 Cloud Security Exam Details",
      downloadUrl: "https://training.fortinet.com/local/staticpage/view.php?page=nse_7_cloud_security",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="Cloud Security"
        description="The Cloud Security track builds skills across FortiWeb application protection (NSE 5), FortiMail email security (NSE 6), and public cloud deployment with FortiCNAPP (NSE 7). Choose a level below to explore its details and course content."
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
        description="Advance your networking career and prepare for the Fortinet Cloud Security certification exams."
      />
    </main>
  );
}
