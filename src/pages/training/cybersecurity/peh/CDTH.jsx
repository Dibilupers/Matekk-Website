// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import itil5 from "../../../../assets/itil5.webp"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function CDTH() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "SOC Foundations & Log Investigation",
      items: [
        "Introduction to Security Operations Center",
        "SOC Analyst Roles (L1, L2, L3)",
        "Types of security logs",
        "Linux authentication logs",
        "Identifying suspicious activities in logs",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Investigating login attempts",
            "Detecting failed SSH authentication",
            "Log analysis using Linux tools",
            "Basic threat investigation",
          ],
        },
      ],
    },
    {
      title: "SIEM Deployment & Security Monitoring",
      items: [
        "Introduction to SIEM technology",
        "Installing and configuring Wazuh SIEM",
        "• Connecting endpoints (agents)",
        "• Monitoring security events in real time",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Deploy Wazuh server",
            "Connect Ubuntu endpoint as agent",
            "Generate security events",
            "Monitor alerts in SIEM dashboard",
          ],
        },
      ],
    },
    {
      title:
        "Network Monitoring & Threat Detection",
      items: [
        "Network traffic analysis fundamentals",
        "Detecting suspicious network activity",
        "Identifying reconnaissance and scanning attacks",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Wireshark traffic capture",
            "Detecting HTTP traffic and suspicious activity",
            "Simulating network scanning attacks",
            "Analyzing network indicators of compromise",
          ],
        },
      ],
    },
    {
      title: "Attack Simulation & Detection",
      items: [
        "Understanding attacker techniques",
        "Using MITRE ATT&CK to map attacks",
        "Detecting malicious behavior in SIEM",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Kali Linux attack simulation",
            "Port scanning detection",
            "Brute-force attack detection",
            "File integrity monitoring alerts",
          ],
        },
      ],
    },
    {
      title: "Threat Hunting & Incident Response",
      items: [
        "Introduction to Threat Hunting",
        "Indicators of Compromise (IOC)",
        "Incident investigation workflow",
        "SOC reporting and documentation",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Investigate simulated attack incidents",
            "Correlate logs and alerts",
            "Build incident reports",
            "Present investigation findings",
          ],
        },
      ],
    },
    {
      title: "Final Outcome",
      items: [
        {
          subTitle: "After completing the program, students will be able to:",
          items: [
            "Monitor security events using SIEM",
            "Detect real cyber attacks",
            "Investigate security alerts",
            "Understand attacker techniques",
            "Perform basic threat hunting",
          ],
        },
      "These are the core skills required for SOC Analyst roles.", ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Cybersecurity"
        title="Cyber Defense & Threat Hunting (CDTH)"
        description="Learn to detect, investigate, and respond to real cyber attacks using industry SOC tools."
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
              The Cyber Defense & Threat Hunting (CDTH) Bootcamp is designed to
              prepare aspiring cybersecurity professionals for Security
              Operations Center (SOC) roles such as SOC Analyst, Threat Hunter,
              and Incident Responder.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Understand how a Security Operations Center (SOC) works</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Use the MITRE ATT&CK framework to understand attacker behavior
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Perform basic threat hunting</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Investigate security logs and alerts using SIEM</p>
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
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={itil5}
              alt="Cyber Defense & Threat Hunting (CDTH) Bootcamp Certification Badge"
              className="w-45 h-45 lg:w-50 lg:h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "SOC Analyst (L1)",
              "Security Monitoring Analyst",
              "Threat Detection Analyst",
              "Incident Response Assistant",
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
            {[
              "SOC Analyst beginners (L1)",
              "System / Network Administrators",
              "Cybersecurity Enthusiasts",
            ].map((job) => (
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
              Download the Practical Ethical Hacking Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Practical Ethical Hacking Enterprise exam."
      />
    </main>
  );
}
