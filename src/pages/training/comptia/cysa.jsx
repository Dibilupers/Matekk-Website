// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import cysa from "../../../assets/cysa.webp"; // Course badge image
import comptiaHero from "../../../assets/COMPTIAherobg.webp"; // Hero banner background
import comptiaFooter from "../../../assets/COMPTIAFooter.webp"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function CySA() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "Security operations (34%)",
      items: [
        <>
          <strong>Explain system and network architecture concepts in security operations:</strong> security architecture components, identity concepts, and logging practices that support secure environments.
        </>,
        <>
          <strong>Analyze indicators of potential malicious activity:</strong> suspicious activity across networks, endpoints, cloud, and identity systems.
        </>,
        <>
          <strong>Use tools to determine malicious activity:</strong> SIEM, EDR, packet analysis tools, and threat intelligence platforms.
        </>,
        <>
          <strong>Explain threat intelligence and threat-hunting concepts:</strong> frameworks, data sources, and methods used to identify and investigate threats.
        </>,
        <>
          <strong>Describe efficiency and process improvement in security operations:</strong> automation, workflows, and processes used to improve operational efficiency.
        </>,
        <>
          <strong>Summarize concepts related to the use of AI in security operations:</strong> use cases, risks, and governance considerations.
        </>,
      ],
    },
    {
      title: "Vulnerability management (26%)",
      items: [
        <>
          <strong>Implement the appropriate vulnerability scanning method:</strong> tools and techniques used to identify vulnerabilities across systems, networks, and applications.
        </>,
        <>
          <strong>Analyze output from vulnerability assessment tools:</strong> vulnerabilities, findings, and security gaps identified through scan results.
        </>,
        <>
          <strong>Prioritize and mitigate vulnerabilities:</strong> risk-based approaches using scoring systems, threat intelligence, and business context.
        </>,
        <>
          <strong>Explain concepts related to control types, risks, and vulnerability management:</strong> controls, policies, and compliance practices used to manage risk.
        </>,
      ],
    },
    {
      title: "Incident Response and Management (24%)",
      items: [
        <>
          <strong>Summarize concepts related to attack methodology frameworks:</strong> models such as MITRE ATT&CK and the Cyber Kill Chain.
        </>,
        <>
          <strong>Outline the incident response process:</strong> phases including preparation, detection, analysis, containment, eradication, and recovery.
        </>,
        <>
          <strong>Implement incident response techniques:</strong> triage, evidence handling, escalation, remediation, and root cause identification.
        </>,
      ],
    },
    {
      title: "Reporting and Communication (16%)",
      items: [
        <>
          <strong>Explain vulnerability management reporting and communication:</strong> reports, dashboards, and communication activities used to present findings and support escalation during security events.
        </>,
        <>
          <strong>Describe security operations, incident response reporting, and communication:</strong> incident documentation, post-incident reviews, and metrics such as detection time, response time, and remediation effectiveness.
        </>,
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={comptiaHero}
        category="COMPTIA"
        title="CySA+ V4"
        description="CompTIA CySA+ shows you how to detect, analyze, and respond to
              threats in real time. From vulnerability management to incident
              response, it equips you with the skills SOCs rely on to turn
              security data into actionable defense strategies."
      />

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
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
              CompTIA Cybersecurity Analyst (CySA+) is a cybersecurity
              certification that validates your ability to detect, analyze,
              and respond to threats in security operations and vulnerability
              management roles. It focuses on incident detection, response,
              and continuous monitoring in modern environments, while managing
              vulnerabilities and effectively communicating critical risks.
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
                <p>
                  Improve security operations processes, distinguish between
                  threat intelligence and threat hunting, and detect malicious
                  activity using the right tools.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Perform vulnerability assessments, prioritize risks, and
                  recommend effective mitigation strategies.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Apply attack frameworks, conduct incident response, and
                  understand the full incident management lifecycle to manage
                  security events efficiently.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Use best practices in communication to report on
                  vulnerabilities and incidents, providing stakeholders with
                  actionable insights and clear metrics.
                </p>
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
        <aside className="aside_contents">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={cysa}
              alt="CySA+ Certification Badge"
              className="w-55 h-55 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Cybersecurity Specialist",
              "Cybersecurity Manager",
              "Penetration Tester",
              "Cybersecurity Architect",
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
            {["Network+ and Security+ certifications", "At least 4 years of hands-on experience as an incident response analyst, SOC analyst, or similar role"].map((job) => (
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
                <p className="">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="">Duration:</p>
                <p>5 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="">Time:</span>
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
                  src={InstitutionalIcon}
                  alt="Institutional Account"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Institutional Account</p>
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
            <a href="https://www.comptia.org/en-us/certifications/cybersecurity-analyst/v3/" target="_blank" className="text-sm font-medium underline mt-2">
              See the Official CompTIA CySA+ Exam Objectives
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={comptiaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your networking career and prepare for the CompTIA CySA+ certification exam."
      />
    </main>
  );
}
