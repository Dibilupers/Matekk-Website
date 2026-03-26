// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import sase from "../../../assets/nseSASE.webp"; // Course badge image
import FortinetHero from "../../../assets/FortinetHeader.png";
import FortinetFooter from "../../../assets/FortinetFooter.png";
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
export default function NSE6SASE() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 SASE — Advanced FortiSASE Architecture",
      items: [
        {
          subTitle: "1.1 FortiSASE Deep Dive",
          items: [
            "FortiSASE global PoP infrastructure",
            "Traffic steering and PoP selection logic",
            "Tenant isolation and multi-tenancy",
            "FortiSASE integration with on-premises FortiGate",
            "Hybrid SASE architecture design",
          ],
        },
        {
          subTitle: "1.2 Secure Web Gateway (SWG) Advanced",
          items: [
            "Explicit proxy vs. transparent proxy modes",
            "SSL/TLS inspection in the cloud proxy",
            "Web filtering category customization",
            "Bandwidth throttling per application category",
            "PAC file configuration and distribution",
          ],
        },
        {
          subTitle: "1.3 Advanced CASB",
          items: [
            "Inline CASB for real-time enforcement",
            "API-mode CASB for out-of-band visibility",
            "DLP policies for cloud application data",
            "Shadow IT risk scoring and reporting",
            "Microsoft 365 and Google Workspace deep inspection",
          ],
        },
      ],
    },
    {
      title: "2.0 SASE — Advanced ZTNA",
      items: [
        {
          subTitle: "2.1 ZTNA Advanced Configuration",
          items: [
            "ZTNA access proxy with multiple backend services",
            "TCP forwarding access proxy",
            "ZTNA bookmarks and application portal",
            "Per-application MFA enforcement",
            "ZTNA wildcard and FQDN-based application tags",
          ],
        },
        {
          subTitle: "2.2 Device Posture and Trust Scoring",
          items: [
            "EMS-based device posture checks",
            "OS version and patch level enforcement",
            "Antivirus and EDR compliance checks",
            "Dynamic trust scoring with continuous evaluation",
            "Non-compliant device quarantine and remediation",
          ],
        },
        {
          subTitle: "2.3 Identity Federation in ZTNA",
          items: [
            "SAML 2.0 IdP integration (Azure AD, Okta, Ping)",
            "OAuth 2.0 and OpenID Connect",
            "Conditional access based on identity risk",
            "Group-based ZTNA policy assignment",
            "MFA enforcement with FortiToken and third-party MFA",
          ],
        },
      ],
    },
    {
      title: "3.0 SASE — SD-WAN and SASE Convergence",
      items: [
        {
          subTitle: "3.1 SD-WAN Integration with FortiSASE",
          items: [
            "FortiGate SD-WAN steering to FortiSASE PoP",
            "ADVPN with FortiSASE as hub",
            "SD-WAN SLA monitoring to SASE PoPs",
            "Breakout policies for direct internet access",
            "Overlay routing with BGP and SASE",
          ],
        },
        {
          subTitle: "3.2 Branch Security with SASE",
          items: [
            "Thin branch architecture with SASE",
            "Security policy centralization in the cloud",
            "Local breakout vs. cloud-forwarded traffic",
            "FortiExtender integration with SASE",
            "LTE and 5G WAN links to SASE PoPs",
          ],
        },
      ],
    },
    {
      title: "4.0 SASE — Operations and Troubleshooting",
      items: [
        {
          subTitle: "4.1 FortiSASE Monitoring",
          items: [
            "FortiSASE unified dashboard",
            "User risk scoring and behavioral analytics",
            "Application usage heatmaps",
            "Security event correlation in FortiSASE",
            "Log forwarding to FortiAnalyzer from SASE",
          ],
        },
        {
          subTitle: "4.2 SASE Troubleshooting",
          items: [
            "FortiClient tunnel establishment failures",
            "PoP latency and performance degradation",
            "Certificate chain validation errors",
            "Policy shadowing in SASE rule base",
            "Split tunneling misconfiguration resolution",
          ],
        },
        {
          subTitle: "4.3 SASE Governance and Compliance",
          items: [
            "Audit logging for SASE user activity",
            "Data residency and sovereignty requirements",
            "GDPR compliance in SASE environments",
            "Access reviews and entitlement management",
            "SASE SLA reporting and KPI tracking",
          ],
        },
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="NSE 6 SASE"
        description="Learn to protect endpoints against advanced attacks using FortiEDR, with real-time automated incident response. This course provides hands-on experience in endpoint security administration and Fortinet Cloud integration."
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
              In this course, you will gain practical skills to secure endpoints
              with FortiEDR, defending against advanced threats through
              real-time automated protection and incident response.
            </p>
            <p>
              You will also learn how FortiEDR operates automatically to protect
              endpoints and how to manage administrative tasks efficiently,
              including console user management, collector updates, GDPR
              compliance, multi-tenant deployments, and system event monitoring.
              Additionally, the course covers Fortinet Cloud Services and how
              they integrate with endpoint security.
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
                <p>Explain the FortiEDR approach and how it operates</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Identify FortiEDR components and their configuration</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Perform key administrative tasks, including console user
                  management, collector updates, GDPR data deletion,
                  multi-tenant setup, and event monitoring
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Define Fortinet Cloud Services and explain how they work</p>
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
        bgImage={FortinetFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Fortinet Enterprise exam."
      />
    </main>
  );
}
