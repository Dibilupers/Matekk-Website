import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoXsiamAnalyst.png";
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import InstitutionalIcon from "../../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function XsiamAnalyst() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Alerting and Detection Processes",
      items: [
        "1.1 Identify and describe the different types of analytic alerts",
        {
          subTitle: "1.2 Explain alert prioritization handling",
          items: [
            "1.2.1 Incident scoring",
            "1.2.2 Alert starring",
            "1.2.3 Featured fields",
            "1.2.4 Incident domains",
          ],
        },
        "1.3 Configure custom prioritizations",
        {
          subTitle:
            "1.4 Identify and describe alert sources and corresponding actions",
          items: [
            "1.4.1 Correlations",
            "1.4.2 XDR Agent",
            "1.4.3 XDR behavioral indicator of compromise (BIOC)",
            "1.4.4 XDR indicator of compromise (IOC)",
          ],
        },
      ],
    },
    {
      title: "2.0 Incident Handling and Response",
      items: [
        "2.1 Explain the incident creation process",
        {
          subTitle: "2.2 Review and investigate alert evidence",
          items: [
            "2.2.1 Forensics",
            "2.2.2 Identity Threat Detection and Response (ITDR)",
            "2.2.3 Causality chain",
            "2.2.4 Timeline",
          ],
        },
        "2.3 Identify, analyze, and respond to security events and incidents",
        "2.4 Apply the native automation response action",
        "2.5 Identify, hunt, and investigate leads and IOCs",
        "2.6 Interpret incident context data",
        "2.7 Differentiate between alert grouping and data stitching",
      ],
    },
    {
      title: "3.0 Automation and Playbooks",
      items: [
        "3.1 Use playbooks for automated incident response",
        {
          subTitle: "3.2 Identify and describe playbook components",
          items: [
            "3.2.1 Task types",
            "3.2.2 Sub-playbooks",
            "3.2.3 Error handling",
          ],
        },
        "3.3 Explain the purpose of the playground",
      ],
    },
    {
      title: "4.0 Data Analysis with XQL",
      items: [
        "4.1 Identify and describe Cortex Data Models (XDMs)",
        "4.2 Use XDMs to analyze security events",
        "4.3 Use XQL to query datasets",
        {
          subTitle: "4.4 Explain XQL data structure",
          items: ["4.4.1 Syntax", "4.4.2 Schema", "4.4.3 Data sources"],
        },
        {
          subTitle: "4.5 Identify and describe XQL options",
          items: [
            "4.5.1 Query Library",
            "4.5.2 XQL Helper",
            "4.5.3 Scheduled queries",
          ],
        },
      ],
    },
    {
      title: "5.0 Endpoint Security Management",
      items: [
        "5.1 Validate endpoint profiles and policies",
        "5.2 Validate agent operational status",
        "5.3 Monitor endpoint activities",
        {
          subTitle: "5.4 Respond to endpoint alerts and incidents",
          items: [
            "5.4.1 Live terminal",
            "5.4.2 Endpoint isolation",
            "5.4.3 Malware scan",
            "5.4.4 Endpoint file retrieval",
          ],
        },
      ],
    },
    {
      title: "6.0 Threat Intelligence Management and ASM",
      items: [
        "6.1 Import and manage indicators",
        "6.2 Validate artifacts, verdicts, reputations, and impact",
        "6.3 Explain the process of creating prevention and detection indicator rules",
        "6.4 Explain the process of verdict management",
        "6.5 Explain indicator relationships",
        "6.6 Validate and monitor asset inventory",
        "6.7 Use the attack surface threat response center to identify, review, assess, research, and remediate emerging threats",
        "6.8 Explain attack surface rules functionality",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Palo Alto"
        title="SXSIAM Analyst"
        description="The Palo Alto Networks Certified Cortex XSIAM Security Operations 
              Professional exam is designed to validate the knowledge and skills 
              required to use the Palo Alto Networks Cortex XSIAM platform for automation,
              threat detection, and threat response."
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
              The Palo Alto Networks Certified XSIAM Security Operations
              Professional certification is designed to validate the knowledge
              and skills required to use the Palo Alto Networks XSIAM platform
              for automation, threat detection, and threat response.
            </p>
            <p>
              The purpose of this document is to help you prepare for the exam
              and attain the certification. It is intended to identify the
              topics covered and provide resources for understanding them but
              should not be used as the sole study material for the XSIAM
              Security Operations Professional exam.
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
                <p>XSIAM Platform Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Security Event Correlation Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Automated Threat Response Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Incident Investigation and Analysis Basics</span>
              </p>
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
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={ccnaBadge}
              alt="Palo Alto Networks Certified Cybersecurity Apprentice Certification Badge"
              className="w-50 h-50 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "XSIAM Security Analyst",
              "SOC Automation Specialist",
              "Threat Detection Analyst",
              "Cybersecurity Incident Analyst",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Target Learners - Title */}
            <h5 className="text-[#1775EE] font-bold">Target Learners</h5>
            {/* Target Learners - List */}
            {["Beginners"].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Schedule - Title */}
            <h5 className="text-[#1775EE] font-bold">Schedule</h5>
            {/* Schedule - List */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p className="font-bold">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Duration:</p>
                <p>7 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="font-bold">Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inlcusions - Title */}
            <h5 className="text-[#1775EE] font-bold">Inclusions</h5>

            {/* Inclusions - List */}
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p className="text-sm">Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={InstitutionalIcon}
                  alt="Institutional Account"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Institutional Accounts</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Certificate of Completion</p>
            </div>

            {/* CHANGE: Download link text and URL */}
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the Palo Alto Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
