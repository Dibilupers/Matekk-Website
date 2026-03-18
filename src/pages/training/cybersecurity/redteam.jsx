// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import redteam from "../../../assets/redteam.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function RedTeam() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 General Security Concepts (High-Impact Foundation)",
      items: [
        {
          subTitle: "1.1 Core Security Principles",
          items: [
            "CIA Triad",
            "AAA (Authentication, Authorization, Accounting)",
            "Least Privilege",
            "Separation of Duties",
            "Zero Trust Model",
            "Defense in Depth",
          ],
        },
        {
          subTitle: "1.2 Security Controls",
          items: [
            "Preventive, Detective, Corrective",
            "Administrative, Technical, Physical controls",
            "Basic change management concepts",
          ],
        },
        {
          subTitle: "1.3 Cryptography Essentials",
          items: [
            "Symmetric vs Asymmetric encryption",
            "AES and RSA concepts",
            "Hashing and salting",
            "Digital signatures",
            "Public Key Infrastructure (PKI)",
            "Certificates and TLS basics",
          ],
        },
      ],
    },
    {
      title: "2.0 Threats, Vulnerabilities & Mitigation (Critical Exam Domain)",
      items: [
        {
          subTitle: "2.1 Threat Actors",
          items: [
            "Nation-state",
            "Organized crime",
            "Insider threats",
            "Hacktivists",
          ],
        },
        {
          subTitle: "2.2 Social Engineering & Malware",
          items: [
            "Phishing & BEC",
            "Vishing / Smishing",
            "Ransomware",
            "Trojans",
            "Worms",
            "Botnets",
          ],
        },
        {
          subTitle: "2.3 Vulnerability Concepts",
          items: [
            "CVE & CVSS basics",
            "Zero-day vulnerabilities",
            "Misconfigurations",
            "Default credentials",
            "Supply chain risks",
          ],
        },
        {
          subTitle: "2.4 Mitigation Strategies",
          items: [
            "Patch management",
            "Hardening techniques",
            "Network segmentation",
            "Application control",
          ],
        },
      ],
    },
    {
      title: "3.0 Security Architecture & Design",
      items: [
        {
          subTitle: "3.1 Secure Network Design",
          items: [
            "Network segmentation",
            "VLAN concepts",
            "Secure protocols (HTTPS, SSH, TLS, IPSec)",
            "Firewalls and DMZ basics",
          ],
        },
        {
          subTitle: "3.2 Cloud & Hybrid Security",
          items: [
            "IaaS, PaaS, SaaS models",
            "Shared responsibility model",
            "Virtualization basics",
          ],
        },
        {
          subTitle: "3.3 Data Protection",
          items: [
            "Encryption at rest and in transit",
            "Data classification",
            "Backups and recovery",
            "High availability concepts",
          ],
        },
      ],
    },
    {
      title: "4.0 Security Operations & Monitoring (Most Heavily Tested)",
      items: [
        {
          subTitle: "4.1 Identity & Access Management",
          items: ["MFA", "SSO", "Federation", "Role-Based Access Control"],
        },
        {
          subTitle: "4.2 Vulnerability Management Lifecycle",
          items: [
            "Scanning",
            "Risk prioritization",
            "Remediation",
            "Validation",
          ],
        },
        {
          subTitle: "4.3 Monitoring & Detection",
          items: [
            "SIEM concepts",
            "IDS vs IPS",
            "Log analysis basics",
            "Indicators of Compromise (IoCs)",
          ],
        },
        {
          subTitle: "4.4 Incident Response",
          items: [
            "IR lifecycle",
            "Containment & eradication",
            "Root cause analysis",
            "Documentation & reporting",
          ],
        },
      ],
    },
    {
      title: "5.0 Governance, Risk & Compliance Essentials",
      items: [
        {
          subTitle: "5.1 Risk Management",
          items: [
            "Risk identification",
            "Risk assessment",
            "Risk register",
            "Risk treatment options",
          ],
        },
        {
          subTitle: "5.2 Business Impact Analysis",
          items: ["Asset prioritization", "RTO and RPO concepts"],
        },
        {
          subTitle: "5.3 Policies & Compliance",
          items: [
            "Security policies",
            "Acceptable Use Policy",
            "Vendor risk overview",
            "Security awareness programs",
          ],
        },
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Cybersecurity"
        title="Red Team: CompTIA Security+ (SY0-701) Training"
        description="The CompTIA Security+ (SY0-701) is a 5-day intensive bootcamp that
              prepares learners for the exam while building foundational,
              job-ready cybersecurity skills for securing modern enterprise
              environments."
      />

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE: Contents/Information ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== ABOUT SECTION ==================== */}
          <section className="flex flex-col gap-y-3">
            {/* About Section - Title */}
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            {/* About Section - Description */}
            {/* CHANGE: Course description paragraphs */}
            <p>
              This instructor-led training integrates structured discussions,
              guided demonstrations, and practical exercises to strengthen core
              cybersecurity principles—including security fundamentals, threat
              identification and mitigation, secure network and cloud
              architecture, vulnerability management, incident response, and
              risk governance—while prioritizing clarity, confidence, and exam
              readiness without unnecessary technical overload.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Security fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Threat identification and mitigation</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Secure network and cloud architecture</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Vulnerability management basics</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Incident response processes</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Risk and governance essentials.</p>
              </div>
            </div>
          </section>

          {/* ==================== COURSE CONTENT ==================== */}
          <section className="flex flex-col gap-y-5">
            {/* Course Content - Title */}
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>

            {/* Course Content - List */}
            <CourseModules modules={modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR: Contents/Information ==================== */}
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-3 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={redteam}
              alt="Red Team Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Junior Penetration Tester",
              "Red Team Analyst",
              "Ethical Hacker",
              "Security Analyst (Offensive Focus)",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span >{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Target Learners - Title */}
            <h5 className="text-[#1775EE] ">Target Learners</h5>
            {/* Target Learners - List */}
            {["Beginners"].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span >{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Schedule - Title */}
            <h5 className="text-[#1775EE] ">Schedule</h5>
            {/* Schedule - List */}
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

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inlcusions - Title */}
            <h5 className="text-[#1775EE] ">Inclusions</h5>

            {/* Inclusions - List */}
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p >Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p >Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p >Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p >Certificate of Completion</p>
            </div>

            {/* CHANGE: Download link text and URL */}
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the Cybersecurity Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Cybersecurity Enterprise exam."
      />
    </main>
  );
}
