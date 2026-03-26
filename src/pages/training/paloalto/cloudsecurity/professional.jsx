import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoCloudSecurityProfessional.png";
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CloudSecurityProfessional() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Security Operations Center (SOC) Fundamentals",
      items: [
        {
          subTitle:
            "1.1 Demonstrate understanding of SOC components and functions",
          items: [
            "1.1.1 Roles and responsibilities",
            "1.1.2 Tools, technologies, and analytics",
          ],
        },
        "1.2 Explain the role of AI and machine learning (ML) in security operations",
        "1.3 Explain the role of threat intelligence in incident response and incident management",
        "1.4 Explain the function of incident categorization and prioritization",
      ],
    },
    {
      title: "2.0 Cortex Fundamentals",
      items: [
        {
          subTitle:
            "2.1 Explain the function of key components of Cortex Cloud",
          items: [
            "2.1.1 Users, roles, IP address, domain, and URL indicator types",
            "2.1.2 Log management and asset inventory",
            "2.1.3 Compliance, rules, and data protection",
            "2.1.4 Use cases",
          ],
        },
        "2.2 Explain the process of creating and managing reports and dashboards in Cortex Cloud",
        "2.3 Demonstrate understanding of data source ingestion",
      ],
    },
    {
      title: "3.0 Cloud Posture Security",
      items: [
        {
          subTitle:
            "3.1 Identify and explain the use of key cloud posture security elements",
          items: [
            "3.1.1 Cloud security posture management (CSPM)",
            "3.1.2 Kubernetes security posture management (KSPM)",
            "3.1.3 AI Security Posture Management (AI–SPM)",
            "3.1.4 Data security posture management (DSPM)",
            "3.1.5 Agentless scanning",
            "3.1.6 Unified compliance management",
            "3.1.7 Identity security",
            "3.1.8 Vulnerability management",
          ],
        },
        "3.2 Explain the role of Posture Security Management Modules",
      ],
    },
    {
      title: "4.0 Cloud Runtime Security",
      items: [
        {
          subTitle:
            "4.1 Explain cloud runtime security concepts and capabilities",
          items: [
            "4.1.1 Cloud workload protection (CWP)",
            "4.1.2 Cloud detection and response (CDR)",
            "4.1.3 Web Application and API Security (WAAS)",
            "4.1.4 Vulnerability management",
          ],
        },
        "4.2 Explain the process of agent management and deployment",
      ],
    },
    {
      title: "5.0 Application Security",
      items: [
        {
          subTitle:
            "5.1 Explain the features and functionality of application security",
          items: [
            "5.1.1 Application security posture management (ASPM)",
            "5.1.2 CI/CD posture management",
            "5.1.3 Software composition analysis (SCA)",
            "5.1.4 Infrastructure as Code (IaC) security",
            "5.1.5 Secrets scanning",
            "5.1.6 Scan management",
          ],
        },
        "5.2 Identify and describe application security use cases",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Palo Alto"
        title="Cloud Security Professional"
        description="The Palo Alto Networks Certified Cloud Security Professional exam
              validates the knowledge, skills, and abilities necessary for
              securing cloud environments using the Cortex Cloud platform."
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
              The Palo Alto Networks Certified Cloud Security Professional
              certification validates the knowledge, skills, and abilities
              necessary for securing cloud environments with the Cortex Cloud
              platform.
            </p>
            <p>
              The purpose of this document is to help you prepare for the exam
              and attain the certification. It is intended to identify the
              topics covered and provide resources for understanding them but
              should not be used as the sole study material for the Cloud
              Security Professional exam.
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
                <p>Cloud Security Architecture Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Threat Detection and Compliance Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Identity and Access Management Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Cloud Workload Protection Strategies</span>
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
              "XSOAR Automation Engineer",
              "SOC Automation Engineer",
              "Security Operations Engineer",
              "DevSecOps Engineer",
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
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Palo Alto Enterprise exam."
      />
    </main>
  );
}
