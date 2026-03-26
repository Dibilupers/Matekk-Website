import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../assets/FortinetNSE5SecureNetworking.png";
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

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NSE5securenetworking() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Secure Networking — SD-WAN",
      items: [
        {
          subTitle: "1.1 SD-WAN Fundamentals",
          items: [
            "SD-WAN architecture and components",
            "Underlay vs. overlay networking",
            "WAN link types: MPLS, broadband, LTE, satellite",
            "SD-WAN use cases and benefits",
            "Fortinet SD-WAN solution overview",
          ],
        },
        {
          subTitle: "1.2 SD-WAN Configuration",
          items: [
            "SD-WAN interface members and zones",
            "Performance SLA health checks",
            "SD-WAN rules and traffic steering",
            "Load balancing algorithms",
            "Application-aware path selection",
          ],
        },
        {
          subTitle: "1.3 SD-WAN Advanced Features",
          items: [
            "Adaptive session routing",
            "SD-WAN Orchestrator (FortiManager)",
            "Dynamic BGP with SD-WAN",
            "Quality of Service (QoS) and traffic shaping",
            "SD-WAN reporting and SLA monitoring",
          ],
        },
      ],
    },
    {
      title: "2.0 Secure Networking — LAN Edge",
      items: [
        {
          subTitle: "2.1 FortiSwitch",
          items: [
            "FortiSwitch managed vs. standalone mode",
            "FortiLink protocol and topology",
            "VLAN configuration and trunking",
            "Spanning Tree Protocol (STP) on FortiSwitch",
            "FortiSwitch security features: NAC, 802.1X",
          ],
        },
        {
          subTitle: "2.2 FortiAP and Wireless",
          items: [
            "FortiAP deployment modes: thin vs. local",
            "Wireless profiles and SSIDs",
            "Radio frequency management",
            "Rogue AP detection",
            "FortiAP captive portal and guest access",
          ],
        },
        {
          subTitle: "2.3 Network Access Control (NAC)",
          items: [
            "NAC concepts and policy enforcement",
            "FortiNAC overview and deployment",
            "Device profiling and classification",
            "802.1X port-based authentication",
            "Quarantine and remediation workflows",
          ],
        },
      ],
    },
    {
      title: "3.0 Secure Networking — OT and IoT Security",
      items: [
        {
          subTitle: "3.1 OT Security Fundamentals",
          items: [
            "IT vs. OT network differences",
            "Purdue model for industrial networks",
            "SCADA and ICS security challenges",
            "OT protocols: Modbus, DNP3, EtherNet/IP",
            "Fortinet OT security solution overview",
          ],
        },
        {
          subTitle: "3.2 IoT Device Security",
          items: [
            "IoT device discovery and profiling",
            "IoT segmentation strategies",
            "Vulnerability management for IoT",
            "FortiNAC IoT enforcement",
            "IoT threat detection with FortiGate",
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
        title="NSE 5 Secure Networking"
        description="Learn to utilize FortiNAC-F to gain full network visibility, control, and automated security responses. This course provides hands-on experience and best practices for implementing network security and automation."
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
              In this course, you will gain practical skills to harness the
              capabilities of FortiNAC-F, following best practices to achieve
              network visibility, access control, and automated security
              responses. You will learn how to monitor devices, enforce
              policies, and strengthen overall network security.
            </p>
            <p>
              Aligned with Fortinet training, these fundamentals provide a
              strong foundation for implementing effective network monitoring
              and security automation.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid flex-col lg:flex-col-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Set up a FortiNAC-F system to achieve network visibility</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Use control features for network access and automated policy
                  enforcement
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Integrate FortiNAC-F with the Fortinet Security Fabric</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>
                  Combine visibility and control with security device
                  integrations to automate threat responses
                </span>
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
              alt="Fortinet NSE 1 Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Entry-Level Security Analyst",
              "Junior Network Administrator",
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
            {["Intermediate"].map((job) => (
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
              <p>Institutional Accounts</p>
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
        bgImage={FortinetFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
