// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import SecureNetworking from "../../../assets/nsesecurenetworking.webp"; // Course badge image
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
export default function NSE6SecureNetworking() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 Secure Networking — Advanced SD-WAN",
      items: [
        {
          subTitle: "1.1 Advanced SD-WAN Design",
          items: [
            "SD-WAN hub-and-spoke with ADVPN",
            "Regional hub design and traffic steering",
            "Dual-hub redundancy and failover",
            "Overlay and underlay BGP design",
            "Multi-region SD-WAN topology planning",
          ],
        },
        {
          subTitle: "1.2 SD-WAN Orchestration with FortiManager",
          items: [
            "SD-WAN template configuration in FortiManager",
            "CLI and GUI template stacking",
            "Per-device variable mapping",
            "Centralized SLA policy management",
            "Zero-touch provisioning (ZTP) with FortiManager",
          ],
        },
        {
          subTitle: "1.3 Advanced Traffic Engineering",
          items: [
            "Per-IP and per-session load balancing",
            "Adaptive session routing under link degradation",
            "Application steering with FortiGuard ISDB",
            "Traffic shaping and per-policy QoS",
            "Jitter and packet loss compensation techniques",
          ],
        },
      ],
    },
    {
      title: "2.0 Secure Networking — Advanced LAN Edge",
      items: [
        {
          subTitle: "2.1 Advanced FortiSwitch",
          items: [
            "Multi-tier FortiSwitch stacking",
            "FortiSwitch MCLAG configuration",
            "Private VLANs and port isolation",
            "IGMP snooping and multicast on FortiSwitch",
            "FortiSwitch ACL and QoS policies",
          ],
        },
        {
          subTitle: "2.2 Advanced FortiAP and Wi-Fi",
          items: [
            "WPA3 and Enhanced Open deployment",
            "Wi-Fi 6 and 6E radio planning",
            "FortiAP mesh networking",
            "Band steering and airtime fairness",
            "WIDS and wireless intrusion prevention",
          ],
        },
        {
          subTitle: "2.3 Advanced NAC",
          items: [
            "FortiNAC profiling methods: DHCP, SNMP, CDP, LLDP",
            "Custom device profiling rules",
            "Role-based network access enforcement",
            "Automated threat response with FortiNAC",
            "FortiNAC integration with FortiGate and Security Fabric",
          ],
        },
      ],
    },
    {
      title: "3.0 Secure Networking — Advanced OT Security",
      items: [
        {
          subTitle: "3.1 OT Network Segmentation",
          items: [
            "Purdue model enforcement with FortiGate",
            "OT DMZ design and implementation",
            "Micro-segmentation for SCADA environments",
            "FortiGate Rugged Series deployment",
            "Unidirectional gateway and data diode concepts",
          ],
        },
        {
          subTitle: "3.2 OT Protocol Inspection",
          items: [
            "Deep packet inspection for Modbus and DNP3",
            "EtherNet/IP and PROFINET protocol signatures",
            "OT-specific IPS signatures",
            "Allowlisting OT communications",
            "Anomaly detection in OT traffic",
          ],
        },
        {
          subTitle: "3.3 OT Incident Response",
          items: [
            "OT-specific threat hunting",
            "Forensic data collection in OT environments",
            "Coordinating IT/OT incident response",
            "OT backup and recovery strategies",
            "OT security frameworks: IEC 62443, NERC CIP",
          ],
        },
      ],
    },
    {
      title: "4.0 Secure Networking — Network Automation",
      items: [
        {
          subTitle: "4.1 FortiManager Automation",
          items: [
            "FortiManager ADOM architecture",
            "Policy package management and installation",
            "FortiManager workflow approvals",
            "Script execution across device groups",
            "FortiManager REST API deep dive",
          ],
        },
        {
          subTitle: "4.2 Automation Tools Integration",
          items: [
            "Ansible collections for Fortinet",
            "Terraform provider for FortiManager",
            "Python scripting with FortiOS API",
            "Webhook-based event-driven automation",
            "GitOps for network policy version control",
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
        title="NSE 6 Secure Networking"
        description="Learn to protect operational technology (OT) infrastructures using Fortinet solutions. This course provides hands-on experience in designing, deploying, and managing FortiGate, FortiNAC, FortiAnalyzer, and FortiSIEM devices for OT security."
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
              In this course, you will gain practical skills to secure
              operational technology (OT) environments using Fortinet solutions.
              You will learn to design, deploy, administer, and monitor
              FortiGate, FortiNAC, FortiAnalyzer, and FortiSIEM devices to
              protect OT infrastructures.
            </p>
            <p>
              These skills provide a strong foundation for designing,
              implementing, and operating a comprehensive OT security solution
              using Fortinet products.
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
                <p>Explain the fundamentals of OT infrastructures</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Secure an OT environment following the Purdue model</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Use FortiGate and FortiNAC to identify and manage devices</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Implement segmentation and microsegmentation within an OT
                  network
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
              src={SecureNetworking}
              alt="Secure Networking Certification Badge"
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
