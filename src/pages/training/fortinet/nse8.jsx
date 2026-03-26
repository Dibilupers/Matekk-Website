// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import nse8 from "../../../assets/nse8.svg"; // Course badge image
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
export default function NSE8() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 NSE 8 — Enterprise Security Design",
      items: [
        {
          subTitle: "1.1 Security Architecture Principles",
          items: [
            "Defense-in-depth architecture at enterprise scale",
            "Security architecture frameworks: SABSA, TOGAF, Zachman",
            "Threat modeling methodologies: STRIDE, PASTA, DREAD",
            "Security design patterns for hybrid environments",
            "Architecture review and risk acceptance processes",
          ],
        },
        {
          subTitle: "1.2 Enterprise Network Security Design",
          items: [
            "End-to-end enterprise security architecture blueprints",
            "Segmentation strategy across campus, data center, and cloud",
            "Security domain design and trust boundary definition",
            "Resilient security architecture with no single point of failure",
            "Security architecture documentation and stakeholder communication",
          ],
        },
        {
          subTitle: "1.3 Risk Management and Governance",
          items: [
            "Enterprise risk management (ERM) frameworks",
            "ISO 27001, NIST CSF, and CIS Controls alignment",
            "Risk quantification: FAIR model",
            "Security investment prioritization by risk reduction value",
            "Third-party and supply chain risk governance",
          ],
        },
      ],
    },
    {
      title: "2.0 NSE 8 — Advanced FortiOS and FortiGate",
      items: [
        {
          subTitle: "2.1 FortiOS Internals",
          items: [
            "FortiOS kernel architecture and process model",
            "NP7 and CP9 hardware offload pipeline deep dive",
            "Session table internals and state machine",
            "FortiOS memory management and conserve mode behavior",
            "Kernel routing table vs. FortiGate routing table reconciliation",
          ],
        },
        {
          subTitle: "2.2 Advanced Policy and NAT",
          items: [
            "Complex NAT scenarios: double NAT, hairpin NAT",
            "Overlapping subnet resolution across VPN tunnels",
            "Policy-based routing with multiple ISPs and complex conditions",
            "Central NAT table advanced use cases",
            "NAT46, NAT64, and DNS64 design and troubleshooting",
          ],
        },
        {
          subTitle: "2.3 Advanced Security Profiles",
          items: [
            "Custom IPS signature development",
            "Advanced application control with custom signatures",
            "SSL inspection certificate chain troubleshooting",
            "ICAP integration for external content inspection",
            "Advanced antivirus with FortiSandbox inline blocking",
          ],
        },
        {
          subTitle: "2.4 Advanced Authentication",
          items: [
            "FSSO advanced deployment: DCAgent, WMI, NTLM polling",
            "SAML SP and IdP configuration on FortiGate",
            "OAuth 2.0 integration with FortiGate",
            "Multi-realm and multi-portal SSL VPN design",
            "Certificate-based admin and user authentication at scale",
          ],
        },
      ],
    },
    {
      title: "3.0 NSE 8 — Advanced Routing and Switching",
      items: [
        {
          subTitle: "3.1 Advanced BGP",
          items: [
            "BGP route policy with complex prefix lists and route maps",
            "BGP communities and extended communities",
            "BGP graceful restart and BFD integration",
            "iBGP route reflection and confederation design",
            "BGP security: RPKI, route filtering, and max-prefix limits",
          ],
        },
        {
          subTitle: "3.2 Advanced OSPF",
          items: [
            "OSPF multi-area design with ABRs and ASBRs",
            "OSPF route summarization and filtering",
            "OSPF authentication and security hardening",
            "OSPF convergence tuning: timers and fast hello",
            "OSPF and BGP redistribution in complex topologies",
          ],
        },
        {
          subTitle: "3.3 Multicast Routing",
          items: [
            "PIM-SM and PIM-SSM design principles",
            "Rendezvous point (RP) selection: static, Auto-RP, BSR",
            "Multicast routing with FortiGate",
            "IGMP version support and querier election",
            "Multicast security and filtering",
          ],
        },
        {
          subTitle: "3.4 Advanced VRF and Segmentation",
          items: [
            "VRF-lite design for multi-tenant environments",
            "Inter-VRF route leaking with security controls",
            "MPLS VPN concepts and FortiGate integration",
            "VRF-aware IPsec VPN design",
            "VRF integration with SD-WAN overlays",
          ],
        },
      ],
    },
    {
      title: "4.0 NSE 8 — Advanced IPsec and VPN",
      items: [
        {
          subTitle: "4.1 Complex IPsec Topologies",
          items: [
            "Recursive IPsec tunnel design",
            "IPsec over SD-WAN with dynamic routing",
            "ADVPN with spoke-to-spoke shortcut routing",
            "Overlapping IP address resolution in IPsec",
            "IPsec with asymmetric routing resolution",
          ],
        },
        {
          subTitle: "4.2 IPsec Performance and Scalability",
          items: [
            "NP7 IPsec hardware offload tuning",
            "IPsec aggregate interfaces for throughput scaling",
            "IKEv2 fragmentation and PMTUD in IPsec",
            "Large-scale dial-up VPN with certificate authentication",
            "IPsec scalability limits and design trade-offs",
          ],
        },
        {
          subTitle: "4.3 Advanced SSL VPN and ZTNA",
          items: [
            "SSL VPN multi-realm advanced design",
            "ZTNA application proxy with complex backend services",
            "Migrating SSL VPN to ZTNA at enterprise scale",
            "ZTNA with conditional access and identity federation",
            "VPN and ZTNA coexistence strategy",
          ],
        },
      ],
    },
    {
      title: "5.0 NSE 8 — Advanced High Availability",
      items: [
        {
          subTitle: "5.1 Advanced FGCP HA",
          items: [
            "HA session synchronization internals and tuning",
            "HA with asymmetric routing resolution",
            "FortiGate HA in cloud environments: GWLB, SDN failover",
            "HA firmware upgrade procedures with zero downtime",
            "HA split-brain detection and prevention",
          ],
        },
        {
          subTitle: "5.2 FGSP and Session Synchronization",
          items: [
            "FortiGate Session Life Support Protocol (FGSP) design",
            "FGSP vs. FGCP selection criteria",
            "FGSP with external load balancer integration",
            "Standalone session synchronization across chassis",
            "FGSP troubleshooting and session table verification",
          ],
        },
        {
          subTitle: "5.3 Business Continuity Design",
          items: [
            "RTO and RPO requirements mapping to HA design",
            "Disaster recovery site security architecture",
            "Geo-redundant FortiGate deployment strategies",
            "HA testing and failover validation procedures",
            "Documentation and runbook design for HA operations",
          ],
        },
      ],
    },
    {
      title: "6.0 NSE 8 — Advanced SD-WAN",
      items: [
        {
          subTitle: "6.1 SD-WAN Complex Design Scenarios",
          items: [
            "Dual-hub dual-region ADVPN design",
            "SD-WAN with private MPLS and public internet overlays",
            "SD-WAN integration with SASE and cloud security",
            "Application SLA enforcement across 10+ WAN links",
            "SD-WAN brownfield migration from MPLS",
          ],
        },
        {
          subTitle: "6.2 SD-WAN Troubleshooting at Scale",
          items: [
            "ADVPN shortcut failure root cause analysis",
            "BGP overlay route flapping diagnosis",
            "SLA probe false-positive and dead detection tuning",
            "Traffic steering regression after policy change",
            "Multi-region SD-WAN performance degradation analysis",
          ],
        },
      ],
    },
    {
      title: "7.0 NSE 8 — Security Fabric at Scale",
      items: [
        {
          subTitle: "7.1 Enterprise Security Fabric Design",
          items: [
            "Multi-tier Security Fabric topology design",
            "Fabric across data center, campus, branch, and cloud",
            "Fabric trust model and certificate management",
            "Security Fabric with third-party integrations",
            "Fabric automation stitch design for enterprise workflows",
          ],
        },
        {
          subTitle: "7.2 FortiManager Enterprise Deployment",
          items: [
            "FortiManager HA and disaster recovery design",
            "Multi-ADOM policy architecture for large organizations",
            "Policy package inheritance hierarchy design",
            "FortiManager as SD-WAN orchestrator at scale",
            "FortiManager API-driven automation architecture",
          ],
        },
        {
          subTitle: "7.3 FortiAnalyzer Enterprise Deployment",
          items: [
            "FortiAnalyzer fabric deployment with collector nodes",
            "Log storage architecture and retention design",
            "FortiAnalyzer and FortiSIEM integration architecture",
            "High-volume logging performance optimization",
            "Compliance reporting automation at enterprise scale",
          ],
        },
      ],
    },
    {
      title: "8.0 NSE 8 — Advanced Cloud Security",
      items: [
        {
          subTitle: "8.1 Multi-Cloud Security Architecture",
          items: [
            "Cloud-agnostic security architecture design",
            "Cross-cloud identity federation and access control",
            "Multi-cloud network segmentation strategy",
            "Cloud security posture management (CSPM) at scale",
            "Multi-cloud incident response coordination",
          ],
        },
        {
          subTitle: "8.2 Cloud-Native Security Integration",
          items: [
            "FortiGate CNF across multiple cloud accounts",
            "Kubernetes security policy at enterprise scale",
            "CI/CD security gate design for large engineering teams",
            "Cloud workload protection program design",
            "DevSecOps culture and toolchain integration",
          ],
        },
      ],
    },
    {
      title: "9.0 NSE 8 — Advanced Security Operations",
      items: [
        {
          subTitle: "9.1 Enterprise SOC Architecture",
          items: [
            "Tiered SOC design for 24/7 global coverage",
            "SOC toolchain integration architecture",
            "Detection engineering program and governance",
            "Threat intelligence program design and management",
            "SOC metrics framework and continuous improvement",
          ],
        },
        {
          subTitle: "9.2 Advanced Incident Response",
          items: [
            "Enterprise IR program aligned with NIST SP 800-61",
            "Major incident command structure and war room design",
            "Regulatory breach notification workflow automation",
            "Cross-organizational incident coordination",
            "Post-incident program improvement methodology",
          ],
        },
        {
          subTitle: "9.3 Adversary Simulation and Validation",
          items: [
            "Red team program design and rules of engagement",
            "Purple team exercise methodology at enterprise scale",
            "Breach and attack simulation (BAS) integration",
            "Continuous control validation program",
            "Detection gap remediation lifecycle management",
          ],
        },
      ],
    },
    {
      title: "10.0 NSE 8 — Advanced Troubleshooting and Diagnostics",
      items: [
        {
          subTitle: "10.1 Complex Troubleshooting Methodology",
          items: [
            "Structured troubleshooting methodology for enterprise issues",
            "OSI layer-by-layer elimination approach",
            "Divide and conquer isolation techniques",
            "Reproducing intermittent failures in lab environments",
            "Documenting and escalating complex vendor issues",
          ],
        },
        {
          subTitle: "10.2 FortiGate Advanced Diagnostics",
          items: [
            "Debug flow advanced filter combinations",
            "Hardware offload verification and bypass diagnostics",
            "Memory leak and process crash investigation",
            "CPU spike root cause identification",
            "Conserve mode root cause analysis and remediation",
          ],
        },
        {
          subTitle: "10.3 Network Protocol Troubleshooting",
          items: [
            "Wireshark advanced dissector usage for protocol analysis",
            "BGP and OSPF convergence failure analysis",
            "IPsec IKE negotiation failure deep dive",
            "SSL/TLS handshake failure analysis",
            "Asymmetric routing detection and resolution",
          ],
        },
        {
          subTitle: "10.4 Performance Troubleshooting",
          items: [
            "Throughput degradation root cause analysis",
            "Latency and jitter troubleshooting across the path",
            "NP7 offload pipeline bottleneck identification",
            "Session table exhaustion diagnosis and remediation",
            "Interface queue drops and QoS misconfiguration resolution",
          ],
        },
      ],
    },
    {
      title: "11.0 NSE 8 — Written and Practical Exam Preparation",
      items: [
        {
          subTitle: "11.1 Written Exam Strategy",
          items: [
            "NSE 8 written exam domain weighting and coverage",
            "Approaching scenario-based exam questions",
            "Time management for the written examination",
            "Identifying distractors in complex multiple-choice questions",
            "Knowledge gap identification and targeted study planning",
          ],
        },
        {
          subTitle: "11.2 Practical Exam Strategy",
          items: [
            "NSE 8 practical lab exam format and expectations",
            "Time management across multiple practical scenarios",
            "Verification methodology after configuration changes",
            "Recovering from misconfigurations under exam conditions",
            "Documenting configurations clearly for examiner review",
          ],
        },
        {
          subTitle: "11.3 Lab Practice Scenarios",
          items: [
            "End-to-end enterprise network security lab design",
            "Complex IPsec and SD-WAN combined scenario",
            "HA failover with routing and VPN validation",
            "Security Fabric with FortiManager and FortiAnalyzer integration",
            "Cloud security deployment with on-premises connectivity",
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
        title="NSE 8"
        description="Participate in a two-day hands-on lab where you will configure a variety of Fortinet products to meet specific objectives. Learn from an FCX Cybersecurity certified instructor while practicing real-world scenarios across multiple Fortinet solutions."
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
              In this immersive lab, you will work with FortiGate, FortiManager,
              FortiAnalyzer, FortiWeb, FortiMail, FortiADC, FortiAuthenticator,
              and FortiSandbox to complete a series of configuration tasks.
            </p>
            <p>
              An FCX Cybersecurity certified instructor will guide you, answer
              questions, and provide support as you complete each objective.
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
                  Gain hands-on experience configuring multiple Fortinet
                  products
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Learn to navigate complex network topologies and scenarios
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Understand the level and scope of tasks in the NSE 8 practical
                  exam
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Build skills to prepare for the NSE 8 practical exam with
                  similar complexity
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
              src={nse8}
              alt="NSE8 Certification Badge"
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
