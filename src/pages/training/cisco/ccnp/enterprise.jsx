// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import ccnaBadge from "../../../../assets/CCNPEnterprise.png"; // Course badge image
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
export default function CCNPEnterprise() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Architecture",
      items: [
        {
          subTitle:
            "1.1 Explain the different design principles used in an enterprise network",
          items: [
            "1.1.a High-level enterprise network design such as 2-tier, 3-tier, fabric, and cloud",
            "1.1.b High availability techniques such as redundancy, FHRP, and SSO",
          ],
        },
        {
          subTitle:
            "1.2 Explain the working principles of the Cisco Catalyst SD-WAN solution",
          items: [
            "1.2.a SD-WAN control and data planes elements",
            "1.2.b Benefits and limitations of Catalyst SD-WAN solution",
          ],
        },
        {
          subTitle:
            "1.3 Explain the working principles of the Cisco SD-Access solution",
          items: [
            "1.3.a SD-Access control and data planes elements",
            "1.3.b Traditional campus interoperating with SD-Access",
          ],
        },
        "1.4 Interpret QoS configurations",
      ],
    },
    {
      title: "2.0 Virtualization",
      items: [
        {
          subTitle: "2.1 Describe device virtualization technologies",
          items: [
            "2.1.a Hypervisor type 1 and 2",
            "2.1.b Virtual machine",
            "2.1.c Virtual switching",
          ],
        },
        {
          subTitle:
            "2.2 Configure and verify data path virtualization technologies",
          items: ["2.2.a VRF", "2.2.b GRE and IPsec tunneling"],
        },
        {
          subTitle: "2.3 Describe network virtualization concepts",
          items: ["2.3.a LISP", "2.3.b VXLAN"],
        },
      ],
    },
    {
      title: "3.0 Infrastructure",
      items: [
        {
          subTitle: "3.1 Layer 2",
          items: [
            "3.1.a Troubleshoot static and dynamic 802.1q trunking protocols",
            "3.1.b Troubleshoot static and dynamic EtherChannels",
            "3.1.c Configure and verify common Spanning Tree Protocols (RSTP, MST) and Spanning Tree enhancements such as root guard and BPDU guard",
          ],
        },
        {
          subTitle: "3.2 Layer 3",
          items: [
            "3.2.a Compare routing concepts of EIGRP and OSPF (advanced distance vector vs. link state, load balancing, path selection, path operations, metrics, and area types)",
            "3.2.b Configure simple OSPFv2/v3 environments, including multiple normal areas, summarization, and filtering (neighbor adjacency, point-to-point, and broadcast network types, and passive-interface)",
            "3.2.c Configure and verify eBGP between directly connected neighbors (best path selection algorithm and neighbor relationships)",
            "3.2.d Describe policy-based routing",
          ],
        },
        {
          subTitle: "3.3 IP Services",
          items: [
            "3.3.a Interpret network time protocol configurations such as NTP and PTP",
            "3.3.b Configure NAT/PAT",
            "3.3.c Configure first hop redundancy protocols, such as HSRP, VRRP",
            "3.3.d Describe multicast protocols, such as RPF check, PIM SM, IGMP v2/v3, SSM, bidir, and MSDP",
          ],
        },
      ],
    },
    {
      title: "4.0 Network Assurance",
      items: [
        "4.1 Diagnose network problems using tools such as debugs, conditional debugs, traceroute, ping, SNMP, and syslog",
        "4.2 Configure and verify Flexible NetFlow",
        "4.3 Configure SPAN/RSPAN/ERSPAN",
        "4.4 Configure and verify IPSLA",
        "4.5 Describe how Cisco Catalyst Center (formerly Cisco DNA Center) is used to apply network configuration, monitoring, and management using traditional and AI-powered workflows",
        "4.6 Configure and verify NETCONF and RESTCONF",
      ],
    },
    {
      title: "5.0 Security",
      items: [
        {
          subTitle: "5.1 Configure and verify device access control",
          items: [
            "5.1.a Lines and local user authentication",
            "5.1.b Authentication and authorization using AAA",
          ],
        },
        {
          subTitle: "5.2 Configure and verify infrastructure security features",
          items: ["5.2.a ACLs", "5.2.b CoPP"],
        },
        "5.3 Describe REST API security",
        {
          subTitle: "5.4 Configure and verify wireless security features",
          items: [
            "5.4.a Threat defense",
            "5.4.b Endpoint security",
            "5.4.c Next-generation firewall",
            "5.4.d TrustSec and MACsec",
          ],
        },
      ],
    },
    {
      title: "6.0 Automation and Artificial Intelligence",
      items: [
        "6.1 Interpret basic Python components and scripts",
        "6.2 Construct valid JSON-encoded files",
        "6.3 Describe the high-level principles and benefits of a data modeling language, such as YANG",
        "6.4 Describe APIs for Cisco Catalyst Center and SD-WAN Manager",
        "6.5 Interpret REST API response codes and results in payload using Cisco Catalyst Center and RESTCONF",
        "6.6 Construct an EEM applet to automate configuration, troubleshooting, or data collection",
        "6.7 Compare agent vs. agentless orchestration tools",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNP ENTERPRISE"
        description="Implementing Cisco Enterprise Network Core Technologies (350-401
              ENCOR) v1.1 is a 120-minute exam that assesses a candidate’s
              knowledge of enterprise network technologies, including dual-stack
              (IPv4 and IPv6) architecture, virtualization, infrastructure,
              security, and automation."
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
              This course prepares learners for the Implementing Cisco
              Enterprise Network Core Technologies (350-401 ENCOR) exam through
              instructor-led training with hands-on labs and guided instruction.
              It covers core enterprise networking topics, including dual-stack
              architecture, virtualization, infrastructure, security, and
              automation.
            </p>
            <p>
              The program emphasizes practical configuration, troubleshooting,
              and real-world scenarios to build the skills and confidence needed
              for exam success.
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
                <p>Network Access Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Infrastructure Security Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Automation and Programmability Basics</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Advanced Routing Technologies</span>
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
              "Network Engineer",
              "Network Administrator",
              "Network Architect",
              "Network Security Engineer",
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
