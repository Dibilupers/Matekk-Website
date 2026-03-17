import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../assets/FortinetNSE5SASE.png";
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png";
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
export default function NSE5SASE() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
 const modules = [
  {
    title: "1.0 Networking Concepts",
    items: [
      {
        subTitle: "1.1 OSI Model Layers",
        items: [
          "Physical",
          "Data Link",
          "Network",
          "Transport",
          "Session",
          "Presentation",
          "Application",
        ],
      },
      {
        subTitle: "1.2 Networking Appliances",
        items: [
          "Routers",
          "Switches",
          "Firewalls",
          "IDS/IPS",
          "Load Balancers",
          "Proxies",
          "NAS",
          "SAN",
          "Wireless Devices",
        ],
      },
      {
        subTitle: "1.3 Cloud Concepts",
        items: [
          "NFV",
          "VPC",
          "Network Security Groups",
          "Cloud Gateways",
          "Deployment Models: Public, Private, Hybrid",
          "Service Models: SaaS, IaaS, PaaS",
        ],
      },
      {
        subTitle: "1.4 Ports and Protocols",
        items: [
          "FTP",
          "SFTP",
          "SSH",
          "Telnet",
          "SMTP",
          "DNS",
          "DHCP",
          "HTTP",
          "HTTPS",
          "SNMP",
          "LDAP",
          "RDP",
          "SIP",
        ],
      },
      {
        subTitle: "1.5 Traffic Types",
        items: [
          "Unicast",
          "Multicast",
          "Anycast",
          "Broadcast",
        ],
      },
      {
        subTitle: "1.6 Transmission Media",
        items: [
          "Wireless: 802.11, Cellular, Satellite",
          "Wired: Fiber, Coaxial, DAC",
        ],
      },
      {
        subTitle: "1.7 Transceivers and Connectors",
        items: [
          "SC",
          "LC",
          "ST",
          "MPO",
          "RJ11",
          "RJ45",
          "F-type",
          "BNC",
        ],
      },
      {
        subTitle: "1.8 Network Topologies",
        items: [
          "Mesh",
          "Hybrid",
          "Star / Hub and Spoke",
          "Spine and Leaf",
          "Point-to-Point",
          "Three-Tier",
          "Collapsed Core",
        ],
      },
      {
        subTitle: "1.9 IPv4 Addressing",
        items: [
          "Public vs. Private",
          "APIPA",
          "RFC1918",
          "Loopback",
          "Subnetting: VLSM, CIDR",
          "Address Classes: A, B, C, D, E",
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
        title="NSE 5 SASE"
        description="Learn to deploy and manage FortiSASE to secure internet access and protect SaaS applications for on-site and remote users. This course builds foundational knowledge of FortiSASE and how to enforce security policies.
                                          "
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
              manage FortiSASE, delivering secure internet access and protecting
              SaaS applications for both on-site and remote users. You will
              explore its core architecture and security capabilities.
            </p>
            <p>
              Aligned with Fortinet training, you will learn how to apply
              security policies using endpoint profiles and content inspection
              to ensure consistent and effective protection.
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
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
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
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
