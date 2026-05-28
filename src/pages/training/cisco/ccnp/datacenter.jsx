// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ChevronDown, ChevronUp } from "lucide-react";
import ccnaBadge from "../../../../assets/CCNPDatacenter.webp"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.webp"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.webp"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";
import { useState } from "react";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CCNPDatacenter() {
  const [activeTab, setActiveTab] = useState("DCCOR");

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const DCCORModules = [
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
        "2.4 Describe firmware and software updates and their impacts on Blade and Rack servers",
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
            "4.2.d Cisco Nexus Dashboard",
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
        {
          subTitle: "5.2 Apply compute security",
          items: ["5.2.a AAA and RBAC"],
        },
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
  ];

  const DCIDModules = [
    {
      title: "1.0 Network Design",
      items: [
        {
          subTitle: "1.1 Describe AI/ML concepts",
          items: [
            "1.1.a Application and uses",
            "1.1.b Deep learning and machine learning concepts (inference vs training)",
            "1.1.c Hardware components (GPUs and DPUs / SmartNICs)",
            "1.1.d Network requirements",
            "1.1.e Operational sustainability",
          ],
        },
        {
          subTitle:
            "1.2 Evaluate technologies for high-performance networks and AI workloads",
          items: [
            "1.2.a ROCEv2",
            "1.2.b Ethernet",
            "1.2.c InfiniBand",
            "1.2.d Remote Direct Memory Access",
          ],
        },
        {
          subTitle: "1.3 Evaluate options for Layer 2 connectivity",
          items: [
            "1.3.a Endpoint mobility",
            "1.3.b Redundancy / high availability",
            "1.3.c Convergence",
            "1.3.d Services insertion",
            "1.3.e vPC and LACP",
          ],
        },
        {
          subTitle: "1.4 Evaluate options for Layer 3 connectivity",
          items: [
            "1.4.a IP mobility",
            "1.4.b Redundancy / high availability (graceful restart, NSF)",
            "1.4.c Convergence",
            "1.4.d Services insertion (load balancing, security)",
            "1.4.e Routing virtualization with VRF lite",
          ],
        },
        "1.5 Evaluate QoS for lossless Ethernet",
        "1.6 Evaluate options for interconnecting data centers with VXLAN EVPN",
        {
          subTitle: "1.7 Evaluate network management and redundancy strategies",
          items: [
            "1.7.a Management and monitoring (in-band, out-of-band)",
            "1.7.b Redundancy options (active/active, disaster recovery site)",
            "1.7.c Centralized management and monitoring (Cisco Nexus Dashboard)",
          ],
        },
        "1.8 Evaluate network segmentation methods using VXLAN and Cisco ACI",
      ],
    },

    {
      title: "2.0 Compute Design",
      items: [
        {
          subTitle: "2.1 Evaluate options for Ethernet connectivity",
          items: [
            "2.1.a Redundancy / high availability",
            "2.1.b Bandwidth (oversubscription)",
            "2.1.c Fabric interconnect operation mode (switch mode, end-host mode)",
          ],
        },
        {
          subTitle: "2.2 Evaluate options for storage connectivity",
          items: [
            "2.2.a Bandwidth",
            "2.2.b Fabric interconnect operation mode (switch mode, end-host mode)",
            "2.2.c Direct-attached storage (appliance, FC storage, FCoE ports)",
          ],
        },
        {
          subTitle:
            "2.3 Evaluate options for network device virtualization (Cisco VIC adapters)",
          items: [
            "2.3.a Service profiles",
            "2.3.b Ethernet adapter policies",
            "2.3.c Fibre Channel adapter policies",
          ],
        },
        "2.4 Evaluate UCS-X design options based on deployment and performance requirements",
        "2.5 Describe compute requirements for AI/ML applications",
      ],
    },

    {
      title: "3.0 Storage Network Design",
      items: [
        "3.1 Plan for iSCSI deployment (multipathing and addressing schemes)",
        {
          subTitle: "3.2 Evaluate QoS requirements in a data center",
          items: ["3.2.a Fibre Channel", "3.2.b iSCSI"],
        },
        {
          subTitle: "3.3 Determine Fibre Channel interface",
          items: ["3.3.a Port types", "3.3.b ISL", "3.3.c Oversubscription"],
        },
        "3.4 Evaluate storage deployment options for traditional and high-performance networks",
      ],
    },

    {
      title: "4.0 Automation Design",
      items: [
        {
          subTitle:
            "4.1 Evaluate options for network orchestration and automation",
          items: [
            "4.1.a Cisco Intersight",
            "4.1.b REST API (NX-API, JSON and XML encoding)",
            "4.1.c Model-driven programmability",
            "4.1.d Ansible",
            "4.1.e Python",
            "4.1.f Terraform CLI",
          ],
        },
        {
          subTitle:
            "4.2 Evaluate options for compute orchestration and automation",
          items: [
            "4.2.a Service profile templates",
            "4.2.b vNIC templates",
            "4.2.c vHBA templates",
            "4.2.d Global policies vs local policies",
          ],
        },
        "4.3 Describe Cisco Intersight Cloud Orchestrator workflows",
        "4.4 Evaluate automatic network deployment using Cisco Nexus Dashboard",
      ],
    },
  ];

  const tabData = {
    DCCOR: {
      label: "CCNP Data Center Core (350-601)",
      examCode: "350-601",
      duration: "120 minutes",
      description:
        "Implementing Cisco Data Center Core Technologies v1.2 (350-601 DCCOR) is a 120-minute exam for the CCNP and CCIE Data Center certifications. It validates knowledge of core data center technologies, including network, compute, storage networking, automation, and security. The corresponding course helps candidates prepare for this exam. Exam topics are provided as general guidelines and may be updated or adjusted without notice to reflect current objectives and evolving data center technologies.",
      about:
        "This course is designed to prepare learners for the Cisco Data Center Core Technologies (DCCOR 350-601) exam. It delivers structured training with practical, hands-on lab experience focused on real-world data center environments. Learners build skills in data center networking, compute integration, storage networking, automation, and security to support enterprise-grade infrastructure operations and troubleshooting.",
      learn: [
        "Data Center Networking Fundamentals",
        "Compute and Virtualization Concepts",
        "Storage Networking and Connectivity",
        "Data Center Automation and Orchestration",
      ],
      modules: DCCORModules,
      downloadLabel: "Download the DCCOR Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/350-601-DCCOR-v1.2.pdf",
    },
    DCID: {
      label: "DCID (300-610)",
      examCode: "300-610",
      duration: "90 minutes",
      description:
        "Designing Cisco Data Center Infrastructure for Traditional and AI Workloads v1.2 (DCID 300-610) is a 90-minute exam aligned with the CCNP Data Center Certification. It evaluates a candidate’s understanding of data center infrastructure design, including networking, compute, storage networking, and automation concepts. The Designing Cisco Data Center Infrastructure course is intended to help candidates prepare for this certification exam.",
      about:
        "This course focuses on building design-level understanding of Cisco data center infrastructures. It prepares learners to make architectural decisions for enterprise and AI-driven environments, with emphasis on scalability, resiliency, and operational efficiency. Training includes design principles for networking, compute, storage connectivity, and automation across modern data center architectures.",
      learn: [
        "Data Center Design Principles and Architectures",
        "Scalable Network Design for Data Centers",
        "Compute and Virtualization Design Considerations",
        "Storage Networking Architecture and Integration",
      ],
      modules: DCIDModules,
      downloadLabel: "Download the DCID Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/300-610-DCID-v1.2.pdf",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNP Data Center"
        description="Implementing Cisco Data Center Core Technologies (350-601 DCCOR) v1.2 is a 120-minute exam that assesses a candidate’s knowledge of core data center technologies, including network, compute, storage networking, automation, and security within Cisco data center environments. This page includes multiple sections covering both the current Data Center content and DCID 300-610."
      />

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE: Contents/Information ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== ABOUT SECTION ==================== */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(tabData).map(([key]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeTab === key
                    ? "bg-[#1775EE] text-white border-[#1775EE]"
                    : "bg-white text-[#1775EE] border-[#1775EE] hover:bg-[#EBF5FD]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* ==================== ACTIVE TAB HEADER ==================== */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1775EE]">
              {active.examCode}
            </p>
            <h2 className="text-2xl font-bold">{active.label}</h2>
            <p className="text-black max-w-3xl">{active.description}</p>
          </div>

          {/* About Section */}
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p>{active.about}</p>
          </section>

          {/* What You Will Learn */}
          <section className="flex flex-col gap-y-5">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {active.learn.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== COURSE CONTENT ==================== */}
          <section className="flex flex-col gap-y-5">
            {/* Course Content - Title */}
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>

            {/* Course Content - List */}
            <CourseModules modules={active.modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR: Contents/Information ==================== */}
        <aside className="aside_contents">
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
            {["Experienced IT professionals", "Mid-to-senior-level IT", "Network Consultants", "Network Engineers",].map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
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
                <p>6 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p>Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span>Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-start gap-2">
                <span>Exam Duration:</span>
                <span>{active.duration}</span>
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

            <a
              href={active.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline mt-2"
            >
              {active.downloadLabel}
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your networking career and prepare for the CCNP Data Center exam."
      />
    </main>
  );
}
