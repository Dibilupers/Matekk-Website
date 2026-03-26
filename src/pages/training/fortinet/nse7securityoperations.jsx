// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import SecurityOperations from "../../../assets/nsesecurityoperations.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function NSE7SecurityOperations() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 Security Operations — Enterprise SOC Design",
      items: [
        {
          subTitle: "1.1 SOC Architecture and Maturity",
          items: [
            "SOC maturity model: ad hoc to optimized",
            "In-house, MSSP, and hybrid SOC models at enterprise scale",
            "SOC toolchain design and integration architecture",
            "Data ingestion strategy: log sources and coverage gaps",
            "SOC staffing models and analyst skill development",
          ],
        },
        {
          subTitle: "1.2 Detection Engineering",
          items: [
            "Detection-as-code principles and version control",
            "MITRE ATT&CK coverage mapping and gap analysis",
            "Detection rule development lifecycle",
            "Adversary simulation for detection validation",
            "Alert quality metrics: precision, recall, MTTR",
          ],
        },
        {
          subTitle: "1.3 Threat Intelligence Program",
          items: [
            "Building an enterprise threat intelligence program",
            "Intelligence requirements and collection management",
            "Threat intelligence platform (TIP) architecture",
            "Intelligence sharing communities and ISACs",
            "Strategic threat intelligence for executive reporting",
          ],
        },
      ],
    },
    {
      title: "2.0 Security Operations — Advanced FortiAnalyzer and FortiSIEM",
      items: [
        {
          subTitle: "2.1 Enterprise FortiAnalyzer Architecture",
          items: [
            "FortiAnalyzer fabric deployment at enterprise scale",
            "Multi-ADOM log segmentation strategy",
            "FortiAnalyzer peering and log aggregation",
            "High-volume log ingestion tuning",
            "FortiAnalyzer integration with FortiSIEM for correlation",
          ],
        },
        {
          subTitle: "2.2 Advanced FortiSIEM at Scale",
          items: [
            "FortiSIEM cluster design for high availability",
            "Custom parser creation for proprietary log sources",
            "Advanced UEBA tuning and baseline calibration",
            "FortiSIEM multi-tenant MSSP architecture",
            "Performance tuning for large-scale event ingestion",
          ],
        },
        {
          subTitle: "2.3 Cross-Platform Correlation",
          items: [
            "Correlating FortiAnalyzer events in FortiSIEM",
            "Cross-platform incident timeline reconstruction",
            "Enriching alerts with threat intelligence in FortiSIEM",
            "Network and endpoint correlation for lateral movement",
            "Cloud and on-premises log correlation strategies",
          ],
        },
      ],
    },
    {
      title: "3.0 Security Operations — Advanced FortiSOAR",
      items: [
        {
          subTitle: "3.1 Enterprise SOAR Program Design",
          items: [
            "SOAR use case prioritization framework",
            "ROI measurement for automation initiatives",
            "Playbook governance and change management",
            "Cross-team collaboration in SOAR workflows",
            "SOAR integration architecture for enterprise toolchains",
          ],
        },
        {
          subTitle: "3.2 Advanced Automation Development",
          items: [
            "Advanced jinja2 templating in FortiSOAR playbooks",
            "Parallel execution and concurrency in playbooks",
            "Custom function development in FortiSOAR",
            "Automated threat containment and eradication workflows",
            "Automated evidence collection and chain of custody",
          ],
        },
        {
          subTitle: "3.3 SOAR at MSSP Scale",
          items: [
            "Multi-tenant FortiSOAR deployment and isolation",
            "Tenant-specific playbook and connector management",
            "MSSP SLA automation and breach alerting",
            "Cross-tenant threat intelligence sharing",
            "MSSP reporting automation with FortiSOAR",
          ],
        },
      ],
    },
    {
      title: "4.0 Security Operations — Advanced Incident Response",
      items: [
        {
          subTitle: "4.1 Enterprise Incident Response Program",
          items: [
            "IR program design aligned with NIST SP 800-61",
            "Incident classification and severity matrix",
            "Crisis communication and executive notification procedures",
            "Legal and regulatory notification requirements",
            "Post-incident review and program improvement",
          ],
        },
        {
          subTitle: "4.2 Advanced Threat Hunting",
          items: [
            "Structured threat hunting with the PEAK framework",
            "Hunting for APT TTPs using FortiSIEM and FortiAnalyzer",
            "Hunting lateral movement with authentication logs",
            "Memory forensics for advanced malware detection",
            "Threat hunt documentation and knowledge base management",
          ],
        },
        {
          subTitle: "4.3 Adversary Simulation and Red Team Integration",
          items: [
            "Purple team exercise design and execution",
            "Mapping red team findings to detection gaps",
            "Breach and attack simulation (BAS) tool integration",
            "Continuous control validation with adversary simulation",
            "SOC detection improvement cycles from red team output",
          ],
        },
      ],
    },
    {
      title: "5.0 Security Operations — Security Program Governance",
      items: [
        {
          subTitle: "5.1 Security Metrics and Reporting",
          items: [
            "Security KPIs and KRIs for executive leadership",
            "SOC dashboard design for operational and strategic views",
            "Mean time to detect (MTTD) and respond (MTTR) improvement",
            "Risk-based security program reporting",
            "Board-level cybersecurity communication strategies",
          ],
        },
        {
          subTitle: "5.2 Compliance and Audit in SecOps",
          items: [
            "Continuous compliance monitoring with SIEM",
            "Evidence automation for PCI-DSS, ISO 27001, and SOC 2",
            "Audit log integrity and tamper-evidence controls",
            "Regulatory breach notification workflows in FortiSOAR",
            "Third-party risk management integration into SecOps",
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
        title="NSE 7 Security Operations"
        description="Learn to design, deploy, and manage a Fortinet SOC using FortiSIEM and FortiSOAR. This course provides hands-on experience in incident analysis, threat hunting, playbook development, and incorporating FortiAI for automated security responses."
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
              In this course, you will gain practical skills to implement and
              manage a Fortinet Security Operations Center (SOC) using FortiSIEM
              and FortiSOAR.
            </p>
            <p>
              You will learn to analyze and respond to security incidents
              following industry best practices, develop SOC playbooks, conduct
              threat hunting, and integrate FortiAI into your workflow for
              automated threat response.
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
                <p>Explain the main functions and roles within a SOC</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Identify cybersecurity challenges addressed by a Fortinet SOC
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Describe the MITRE ATT&CK Enterprise Matrix and the Cyber Kill
                  Chain
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Explain methods to identify and reduce the attack surface</p>
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
              src={SecurityOperations}
              alt="Security Operations Certification Badge"
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
