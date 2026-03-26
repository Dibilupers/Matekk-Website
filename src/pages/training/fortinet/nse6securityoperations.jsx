// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import SecurityOperations from "../../../assets/nsesecurityoperations.webp"; // Course badge image
import FortinetHero from "../../../assets/FortinetHeader.png";
import FortinetFooter from "../../../assets/FortinetFooter.png";
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function NSE6SecurityOperations() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 Security Operations — Advanced FortiAnalyzer",
      items: [
        {
          subTitle: "1.1 FortiAnalyzer Advanced Architecture",
          items: [
            "Collector and Analyzer mode design",
            "FortiAnalyzer HA cluster configuration",
            "ADOM quota and log storage management",
            "Log fetching and archiving",
            "FortiAnalyzer Fabric integration",
          ],
        },
        {
          subTitle: "1.2 Advanced Log Analysis",
          items: [
            "Custom log field extraction",
            "Advanced filter syntax and search operators",
            "Statistical analysis and trend reporting",
            "SQL-based log queries in FortiAnalyzer",
            "Cross-ADOM reporting and aggregation",
          ],
        },
        {
          subTitle: "1.3 Event Management and Alerting",
          items: [
            "Event handler creation and tuning",
            "Correlation event rules",
            "Alert notification channels: email, syslog, SNMP",
            "Reducing alert fatigue with suppression rules",
            "FortiAnalyzer playbook automation",
          ],
        },
      ],
    },
    {
      title: "2.0 Security Operations — Advanced FortiSIEM",
      items: [
        {
          subTitle: "2.1 Advanced FortiSIEM Deployment",
          items: [
            "FortiSIEM cluster sizing and scaling",
            "Elasticsearch backend tuning",
            "Multi-tenant FortiSIEM for MSSPs",
            "Collector high availability",
            "Disaster recovery for FortiSIEM",
          ],
        },
        {
          subTitle: "2.2 Advanced Correlation and Detection",
          items: [
            "Writing custom FortiSIEM correlation rules",
            "Machine learning-based anomaly detection",
            "User and entity behavior analytics (UEBA)",
            "Watch list automation and dynamic grouping",
            "MITRE ATT&CK technique mapping to rules",
          ],
        },
        {
          subTitle: "2.3 FortiSIEM Integrations",
          items: [
            "Bi-directional FortiSOAR integration",
            "Ticketing system integration: ServiceNow, Jira, PagerDuty",
            "Threat intelligence feed ingestion (STIX/TAXII)",
            "Custom parser development for unsupported devices",
            "FortiSIEM API for external automation",
          ],
        },
      ],
    },
    {
      title: "3.0 Security Operations — Advanced FortiSOAR",
      items: [
        {
          subTitle: "3.1 Advanced Playbook Development",
          items: [
            "Complex conditional logic and loops in playbooks",
            "Nested playbook design patterns",
            "Error handling and retry mechanisms",
            "Dynamic variable passing between playbook steps",
            "Playbook performance optimization",
          ],
        },
        {
          subTitle: "3.2 Connector Development",
          items: [
            "FortiSOAR connector SDK overview",
            "Building custom connectors for third-party tools",
            "REST API connector configuration",
            "OAuth and API key authentication in connectors",
            "Testing and publishing custom connectors",
          ],
        },
        {
          subTitle: "3.3 Case Management and Collaboration",
          items: [
            "War room and collaborative investigation",
            "Evidence management and chain of custody",
            "SLA tracking for incident resolution",
            "Reporting and executive dashboards",
            "FortiSOAR multi-tenancy for MSSPs",
          ],
        },
      ],
    },
    {
      title: "4.0 Security Operations — Threat Hunting and Intelligence",
      items: [
        {
          subTitle: "4.1 Proactive Threat Hunting",
          items: [
            "Hypothesis-driven threat hunting methodology",
            "Hunting with FortiAnalyzer log queries",
            "Hunting with FortiSIEM behavioral baselines",
            "Living-off-the-land attack detection",
            "Lateral movement and persistence indicators",
          ],
        },
        {
          subTitle: "4.2 Threat Intelligence Operations",
          items: [
            "STIX/TAXII threat intelligence platform integration",
            "FortiGuard threat intelligence consumption",
            "IoC lifecycle management",
            "Threat intelligence sharing and ISACs",
            "Attribution and adversary profiling",
          ],
        },
        {
          subTitle: "4.3 Digital Forensics and Incident Response (DFIR)",
          items: [
            "DFIR methodology and chain of custody",
            "Memory and disk forensics fundamentals",
            "Network forensics with packet captures",
            "FortiEDR forensic data collection",
            "Post-incident reporting and lessons learned",
          ],
        },
      ],
    },
    {
      title: "5.0 Security Operations — Advanced EDR and Endpoint",
      items: [
        {
          subTitle: "5.1 Advanced FortiEDR",
          items: [
            "FortiEDR threat hunting console",
            "Custom detection policy tuning",
            "Forensic snapshot analysis",
            "FortiEDR playbook automated response",
            "FortiEDR integration with FortiSIEM and FortiSOAR",
          ],
        },
        {
          subTitle: "5.2 Advanced FortiClient EMS",
          items: [
            "EMS multi-site and HA deployment",
            "Endpoint compliance scoring",
            "Application inventory and software control",
            "FortiClient XML profile management",
            "EMS telemetry and Security Fabric tagging",
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
        title="NSE 6 Security Operations"
        description="Learn to analyze and manage security events using FortiSIEM in a managed security service provider (MSSP) environment. This course provides hands-on experience in event analysis, incident remediation, and advanced querying."
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
              In this course, you will gain practical skills to use FortiSIEM
              for searching, enriching, and analyzing security events within an
              MSSP organization.
            </p>
            <p>
              You will learn to perform real-time and historical searches, build
              advanced queries, and analyze and remediate security incidents
              using both traditional and machine learning-assisted methods.
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
                  Explain how FortiSIEM addresses common cybersecurity
                  challenges
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Describe the main components and unique database architecture
                  of FortiSIEM
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Perform real-time and historical event searches</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Define structured search operators and search conditions</p>
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
        bgImage={FortinetFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Fortinet Enterprise exam."
      />
    </main>
  );
}
