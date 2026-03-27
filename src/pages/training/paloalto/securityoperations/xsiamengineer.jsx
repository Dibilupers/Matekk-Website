import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoXsiamEngineer.png";
import PaloAltoHero from "../../../../assets/PaloAltoHeader.webp";
import PaloAltoFooter from "../../../../assets/PaloAltoFooter.webp";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function XsiamEngineer() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Planning and Installation",
      items: [
        "1.1 Evaluate the existing IT infrastructure and security posture to align with XSIAM architecture",
        {
          subTitle:
            "1.2 Evaluate deployment requirements, objectives, and resources",
          items: [
            "1.2.1 Hardware",
            "1.2.2 Software",
            "1.2.3 Data sources",
            "1.2.4 Integrations",
          ],
        },
        "1.3 Identify communication requirements for XSIAM components",
        {
          subTitle: "1.4 Install and configure Cortex XSIAM components",
          items: ["1.4.1 Agents", "1.4.2 Broker VM", "1.4.3 Engine"],
        },
        "1.5 Configure user roles, permissions, and access controls",
      ],
    },
    {
      title: "2.0 Integration and Automation",
      items: [
        "2.1 Onboard data sources (e.g., endpoint, network, cloud, identity)",
        "2.2 Configure automation and feed integrations (e.g., messaging, SIEM, authentication, threat intelligence feeds)",
        "2.3 Implement and maintain Marketplace content packs",
        {
          subTitle: "2.4 Manage automation workflow",
          items: [
            "2.4.1 Plan",
            "2.4.2 Playbook tasks",
            "2.4.3 Customize",
            "2.4.4 Debug",
          ],
        },
      ],
    },
    {
      title: "3.0 Content Optimization",
      items: [
        "3.1 Deploy parsing rules for unique data formats",
        "3.2 Deploy data modeling rules for data normalization",
        {
          subTitle:
            "3.3 Manage detection rules to align with provided requirements",
          items: [
            "3.3.1 Correlation",
            "3.3.2 Indicators of compromise (IOCs) and behavioral indicators of compromise (BIOCs)",
            "3.3.3 Indicator rules",
            "3.3.4 Scoring rules",
            "3.3.5 Attack Surface Management (ASM) rules",
          ],
        },
        "3.4 Manage incident and alert layout",
        "3.5 Create custom dashboards and reporting templates",
      ],
    },
    {
      title: "4.0 Maintenance and Troubleshooting",
      items: [
        "4.1 Manage exception and exclusion configurations",
        "4.2 Manage XSIAM software component updates (e.g., content, XDR agent, XDR collector, Broker VM)",
        "4.3 Troubleshoot data management issues (e.g., data ingestion, normalization, parsing)",
        "4.4 Troubleshoot Cortex XSIAM components (e.g., agents, integrations, playbooks)",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={PaloAltoHero}
        category="Palo Alto"
        title="XSIAM Engineer"
        description="The Palo Alto Networks Certified XSIAM Engineer exam is designed
              to validate the knowledge and skills required for engineers to
              deploy, configure, manage, onboard data, and create playbooks in a
              security operations environment using Cortex XSIAM."
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
              The Palo Alto Networks Certified XSIAM Engineer certification is
              designed to validate the knowledge and skills required to use the
              Palo Alto Networks XSIAM platform for installation, deployment
              configuration, post-deployment management, data source onboarding
              and integration, playbook creation, and detection engineering.
            </p>
            <p>
              The purpose of this document is to help you prepare for the exam
              and attain the certification. It is intended to identify the
              topics covered and provide resources for understanding them but
              should not be used as the sole study material for the XSIAM
              Engineer exam.
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
                <p>XSIAM Architecture and Workflow Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Security Analytics and Correlation</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Automated Threat Detection Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Incident Response Automation Basics</span>
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
        <aside className="aside_contents">
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
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "XSIAM Security Engineer",
              "SOC Automation Engineer",
              "Threat Detection Engineer",
              "Cybersecurity Solutions Engineer",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{job}</span>
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
                <span>{job}</span>
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
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p>Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p>Certificate of Completion</p>
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
        bgImage={PaloAltoFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Palo Alto Enterprise exam."
      />
    </main>
  );
}
