// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import ccnaBadge from "../../../../assets/CCNPDatacenter.png"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import InstitutionalIcon from "../../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CCNPDatacenter() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Network",
      items: [
        {
          subTitle: "1.1 Apply routing protocols",
          items: [
            "1.1.a OSPFv2 and OSPFv3",
            "1.1.b MP-BGP",
            "1.1.c PIM",
            "1.1.d FHRP",
          ],
        },
        "1.2 Apply switching protocols such as RSTP+, LACP and vPC",
        "1.3 Apply overlay protocols such as VXLAN EVPN",
        {
          subTitle: "1.4 Apply ACI concepts",
          items: ["1.4.a Fabric setup", "1.4.b Access policies", "1.4.c VMM"],
        },
        "1.5 Analyze packet flow (unicast, multicast, and broadcast)",
        "1.6 Describe Cloud service and deployment models (NIST 800-145)",
        {
          subTitle: "1.7 Describe software updates and their impacts",
          items: [
            "1.7.a Disruptive / nondisruptive",
            "1.7.b EPLD",
            "1.7.c Patches",
          ],
        },
        "1.8 Implement network configuration management",
        "1.9 Implement infrastructure monitoring using traditional and AI-powered tools such as NetFlow, SPAN, and Cisco Nexus Dashboard",
        "1.10 Explain network assurance concepts such as streaming telemetry",
        "1.11 Describe the capabilities and features of Nexus Dashboard",
      ],
    },
    {
      title: "2.0 Compute",
      items: [
        "2.1 Implement Cisco Unified Compute System Rack Servers",
        {
          subTitle: "2.2 Implement Cisco Unified Compute System Blade Chassis",
          items: [
            "2.2.a Initial setup",
            "2.2.b Infrastructure management",
            "2.2.c Network management (VLANs, pools and policies, templates, QoS)",
            "2.2.d Storage management (SAN connectivity, Fibre Channel zoning, VSANs, WWN pools, SAN policies, templates)",
            "2.2.e Server management (Server pools and boot policies)",
          ],
        },
        "2.3 Explain UCS-X in Intersight Managed Mode",
        "2.5 Implement compute configuration management (Backup and restore)",
        "2.6 Implement infrastructure monitoring such as SPAN and Cisco Intersight",
      ],
    },
    {
      title: "3.0 Storage Network",
      items: [
        {
          subTitle: "3.1 Implement Fibre Channel",
          items: [
            "3.1.a Switch fabric initialization",
            "3.1.b Port channels",
            "3.1.c FCID",
            "3.1.d CFS",
            "3.1.e Zoning",
            "3.1.f FCNS",
            "3.1.g Device alias",
            "3.1.h NPV and NPIV",
            "3.1.i VSAN",
          ],
        },
        "3.2 Describe network storage systems and concepts such as NFS and iSCSI",
        "3.3 Describe software updates and their impacts (Disruptive/nondisruptive and EPLD)",
        "3.4 Implement infrastructure monitoring using traditional and AI-powered tools such as SPAN and Cisco Nexus Dashboard",
      ],
    },
    {
      title: "4.0 Automation and Artificial Intelligence",
      items: [
        {
          subTitle: "4.1 Implement automation and scripting tools",
          items: [
            "4.1.a EEM",
            "4.1.b Scheduler",
            "4.1.c Bash Shell and Guest Shell for NX-OS",
            "4.1.d REST API (NX-API, JSON and XML encodings)",
            "4.1.e On-box Python",
          ],
        },
        {
          subTitle: "4.2 Evaluate automation and orchestration technologies",
          items: [
            "4.2.a Ansible",
            "4.2.b Python",
            "4.2.c POAP",
            "4.2.d Cisco Nexus Dashboard Fabric Controller",
            "4.2.e PowerShell",
            "4.2.f Terraform CLI",
            "4.2.g Intersight",
          ],
        },
        "4.3 Describe high-performance network enabling technologies for AI in data center infrastructure",
      ],
    },
    {
      title: "5.0 Security",
      items: [
        {
          subTitle: "5.1 Apply network security",
          items: [
            "5.1.a AAA and RBAC",
            "5.1.b ACI contracts and microsegmentation",
            "5.1.c First-hop security features",
            "5.1.d Keychain authentication",
            "5.1.e MACsec",
          ],
        },
        "5.2 Apply compute security",
        {
          subTitle: "5.3 Apply storage security",
          items: [
            "5.3.a AAA and RBAC",
            "5.3.b Port security",
            "5.3.c Fabric binding",
          ],
        },
      ],
    },
    {
      title: "6.0 Secure Network Access, Visibility, and Enforcement",
      items: [
        "6.1 Describe identity management and secure network access concepts such as guest services, profiling, posture assessment and BYOD",
        "6.2 Configure and verify network access control mechanisms such as 802.1X, MAB, WebAuth",
        "6.3 Describe network access with CoA",
        "6.4 Describe the benefits of device compliance and application control",
        "6.5 Explain exfiltration techniques (DNS tunneling, HTTPS, email, FTP/SSH/SCP/SFTP, ICMP, Messenger, IRC, NTP)",
        "6.6 Describe the benefits of network telemetry",
        {
          subTitle:
            "6.7 Describe the components, capabilities, and benefits of these security products and solutions",
          items: [
            "6.7.a Cisco Secure Network Analytics",
            "6.7.b Cisco Secure Cloud Analytics",
            "6.7.c Cisco pxGrid",
            "6.7.d Cisco Umbrella Investigate",
            "6.7.e Cisco Cognitive Intelligence",
            "6.7.f Cisco Encrypted Traffic Analytics",
            "6.7.g Cisco Secure Client Network Visibility Module (NVM)",
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
        category="CISCO"
        title="CCNP Data Center"
        description="Implementing Cisco Data Center Core Technologies (350-601 DCCOR)
              v1.2 is a 120-minute exam that assesses a candidate’s knowledge of
              core data center technologies, including networking, compute,
              storage networking, automation, and security within Cisco data
              center environments."
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
              Implementing Cisco Data Center Core Technologies v1.2 (350-601
              DCCOR) is a 120-minute exam for the CCNP and CCIE Data Center
              certifications. It validates knowledge of core data center
              technologies, including networking, compute, storage networking,
              automation, and security. The corresponding course helps
              candidates prepare for this exam.
            </p>
            <p>
              Exam topics are provided as general guidelines and may be updated
              or adjusted without notice to reflect current objectives.
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
                <p>Data Center Network Architecture</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Virtualization Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Storage Networking Technologies</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Data Center Automation Concepts</span>
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
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-3 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={ccnaBadge}
              alt="CCNA Automation Certification Badge"
              className="w-55 h-55 lg:w-100 lg:h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Data Center Network Engineer",
              "Data Center Engineer",
              "Infrastructure Engineer",
              "Cloud Data Center Engineer",
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
              Download the CCNP Exam Basics here
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
