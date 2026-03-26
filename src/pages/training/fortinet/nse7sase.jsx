// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import sase from "../../../assets/nseSASE.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function NSE7SASE() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 SASE — Enterprise SASE Design",
      items: [
        {
          subTitle: "1.1 SASE Architecture at Enterprise Scale",
          items: [
            "SASE maturity model and phased adoption",
            "Single-vendor vs. best-of-breed SASE trade-offs",
            "SASE integration with existing MPLS and SD-WAN infrastructure",
            "Designing for global workforce and multi-region coverage",
            "SASE capacity planning and PoP selection strategy",
          ],
        },
        {
          subTitle: "1.2 SASE Security Policy Framework",
          items: [
            "Unified policy model across SASE components",
            "Policy lifecycle management in SASE",
            "Risk-based access policy design",
            "Policy consistency across on-premises and cloud",
            "Regulatory compliance mapping in SASE policy",
          ],
        },
        {
          subTitle: "1.3 SASE Transformation Strategy",
          items: [
            "Migration from legacy VPN to ZTNA",
            "Phased decommission of on-premises web proxies",
            "User change management for SASE adoption",
            "SASE pilot design and success metrics",
            "Total cost of ownership (TCO) analysis for SASE",
          ],
        },
      ],
    },
    {
      title: "2.0 SASE — Advanced Zero Trust Architecture",
      items: [
        {
          subTitle: "2.1 Zero Trust Maturity Model",
          items: [
            "NIST SP 800-207 Zero Trust Architecture framework",
            "CISA Zero Trust Maturity Model alignment",
            "Identity, device, network, application, and data pillars",
            "Zero Trust roadmap development",
            "Measuring Zero Trust effectiveness with metrics",
          ],
        },
        {
          subTitle: "2.2 Continuous Trust Verification",
          items: [
            "Adaptive authentication based on risk signals",
            "Behavioral analytics for continuous trust scoring",
            "Step-up authentication triggers",
            "Session invalidation on trust score degradation",
            "User risk signals: location, device, behavior",
          ],
        },
        {
          subTitle: "2.3 Micro-Segmentation at Scale",
          items: [
            "Software-defined micro-segmentation design",
            "Application dependency mapping for segmentation",
            "Micro-segmentation in hybrid environments",
            "Policy automation for dynamic workloads",
            "Validating micro-segmentation effectiveness",
          ],
        },
      ],
    },
    {
      title: "3.0 SASE — Advanced Threat Prevention in SASE",
      items: [
        {
          subTitle: "3.1 Advanced Content Inspection",
          items: [
            "Cloud-based sandboxing with FortiSandbox Cloud",
            "Encrypted traffic analysis without decryption",
            "AI/ML-based threat detection in SASE",
            "Advanced DLP for structured and unstructured data",
            "Real-time threat intelligence feed integration",
          ],
        },
        {
          subTitle: "3.2 Insider Threat Detection in SASE",
          items: [
            "User activity monitoring in SaaS applications",
            "Anomalous data exfiltration detection",
            "Privileged user behavior analytics",
            "DLP policy enforcement for departing employees",
            "UEBA integration with FortiSIEM in SASE context",
          ],
        },
      ],
    },
    {
      title: "4.0 SASE — SASE Operations and Governance",
      items: [
        {
          subTitle: "4.1 SASE SLA and Performance Management",
          items: [
            "PoP performance benchmarking and SLA definition",
            "User experience monitoring for SASE traffic",
            "Digital experience monitoring (DEM) integration",
            "Proactive SASE performance alerting",
            "Capacity scaling based on utilization trends",
          ],
        },
        {
          subTitle: "4.2 SASE Governance and Risk",
          items: [
            "SASE security governance framework",
            "Risk assessment for SASE third-party providers",
            "Data privacy obligations in SASE cloud processing",
            "SASE audit and evidence collection for compliance",
            "Vendor management and contractual security requirements",
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
        category="FORTINET"
        title="NSE 7 SASE"
        description="Learn to deploy and manage FortiSASE for enterprise environments, securing internet access and private applications across branches. This course provides advanced skills in centralized policy management, zero trust access, and user monitoring."
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
              In this course, you will gain advanced knowledge of FortiSASE and
              its enterprise capabilities, including branch deployment, secure
              private access (SPA), advanced endpoint profile settings, and
              centralized management and analytics.
            </p>
            <p>
              You will learn to design, deploy, and manage FortiSASE to provide
              secure internet access (SIA) and secure private applications
              across multiple locations. The course also covers centralized
              policy management, zero trust network access (ZTNA), compliance
              checks, and enhanced visibility through user monitoring and
              security logs.
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
                <p>Explain the SASE architecture</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Describe the Fortinet SASE solution</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Design and implement FortiSASE deployment scenarios</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Explain SASE infrastructure and Points of Presence (POPs)</p>
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
              src={sase}
              alt="SASE Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Junior Network Administrator",
              "Entry-Level Security Analyst",
              "IT Security Associate",
              "Cybersecurity Intern",
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
                <p className="">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="">Duration:</p>
                <p>7 Days</p>
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
              Download the Fortinet Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Fortinet Enterprise exam."
      />
    </main>
  );
}
