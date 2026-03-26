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
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function NSE7SecureNetworking() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 Secure Networking — Enterprise SD-WAN Design",
      items: [
        {
          subTitle: "1.1 Large-Scale SD-WAN Architecture",
          items: [
            "Regional hub design with dual-hub redundancy",
            "ADVPN shortcut routing at enterprise scale",
            "SD-WAN overlay design with IPsec and GRE",
            "BGP route reflection in SD-WAN overlays",
            "Multi-region SD-WAN with global hub interconnect",
          ],
        },
        {
          subTitle: "1.2 SD-WAN and Security Convergence",
          items: [
            "Integrated security inspection on SD-WAN edges",
            "Secure SD-WAN branch without dedicated firewall",
            "SD-WAN with SASE cloud security offload",
            "Per-application security policy on SD-WAN paths",
            "SD-WAN and ZTNA convergence for branch access",
          ],
        },
        {
          subTitle: "1.3 SD-WAN Operational Excellence",
          items: [
            "Zero-touch provisioning at scale with FortiManager",
            "SD-WAN change management and rollback procedures",
            "Performance baseline establishment and drift detection",
            "SD-WAN KPI reporting for business stakeholders",
            "Capacity planning for SD-WAN WAN links",
          ],
        },
      ],
    },
    {
      title: "2.0 Secure Networking — Enterprise LAN and Campus",
      items: [
        {
          subTitle: "2.1 Campus Network Security Design",
          items: [
            "Secure campus architecture with FortiSwitch and FortiAP",
            "Distributed vs. centralized wired/wireless design",
            "Network segmentation for BYOD and IoT in campus",
            "Macro-segmentation with VLANs and VRFs",
            "Campus security policy framework",
          ],
        },
        {
          subTitle: "2.2 Enterprise Wireless Security",
          items: [
            "WPA3-Enterprise with 802.1X and EAP-TLS",
            "Certificate-based wireless authentication at scale",
            "Wireless intrusion prevention system (WIPS)",
            "RF planning for dense enterprise deployments",
            "Wireless guest network isolation and security",
          ],
        },
        {
          subTitle: "2.3 Enterprise NAC Design",
          items: [
            "FortiNAC enterprise deployment architecture",
            "Scalable device profiling with machine learning",
            "Dynamic VLAN assignment based on device posture",
            "Integration with MDM and endpoint management",
            "NAC policy for IoT and unmanaged devices at scale",
          ],
        },
      ],
    },
    {
      title: "3.0 Secure Networking — Advanced OT and Critical Infrastructure",
      items: [
        {
          subTitle: "3.1 Critical Infrastructure Protection",
          items: [
            "NERC CIP compliance with Fortinet solutions",
            "IEC 62443 security levels and zone design",
            "IT/OT convergence security architecture",
            "Critical infrastructure threat landscape",
            "Resilience design for OT network outages",
          ],
        },
        {
          subTitle: "3.2 OT Threat Detection and Response",
          items: [
            "OT-specific threat actor TTPs and MITRE ATT&CK for ICS",
            "Passive OT asset discovery and vulnerability assessment",
            "OT anomaly detection with FortiSIEM",
            "OT incident response playbooks in FortiSOAR",
            "Coordinated IT/OT breach response procedures",
          ],
        },
      ],
    },
    {
      title: "4.0 Secure Networking — Network Automation at Scale",
      items: [
        {
          subTitle: "4.1 Enterprise Network Automation Strategy",
          items: [
            "Network automation maturity model",
            "Source of truth design: NetBox, CMDBs",
            "Event-driven automation architecture",
            "Automation testing and validation frameworks",
            "Change control integration with automation pipelines",
          ],
        },
        {
          subTitle: "4.2 Advanced FortiManager Orchestration",
          items: [
            "FortiManager multi-ADOM enterprise design",
            "Policy package inheritance and override strategy",
            "FortiManager JSON/JSONRPC API at scale",
            "Workflow automation with FortiManager scripts",
            "FortiManager integration with ITSM platforms",
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
        title="NSE 7 Secure Networking"
        description="Learn to implement and centrally manage enterprise security with multiple FortiGate devices. This course provides hands-on experience in network monitoring, high availability, routing, and service hardening."
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
              In this course, you will gain practical skills to deploy and
              centrally manage an enterprise security infrastructure using
              multiple FortiGate devices.
            </p>
            <p>
              You will learn to monitor network security events, implement high
              availability solutions, combine OSPF and BGP for enterprise
              traffic routing, and harden critical enterprise services.
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
                  Centralize management and monitoring of network security
                  events
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Implement high availability (HA) on FortiGate devices</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Combine OSPF and BGP protocols to route enterprise traffic
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Harden enterprise services to enhance security</p>
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
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-3 lg:w-72 xl:w-80 shrink-0">
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
