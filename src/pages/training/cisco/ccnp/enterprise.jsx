// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ChevronDown, ChevronUp } from "lucide-react";
import ccnaBadge from "../../../../assets/CCNPEnterprise.webp"; // Course badge image
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

// ==================== COMPONENT NAME ====================
export default function CCNPEnterprise() {
  const [activeTab, setActiveTab] = useState("ENCOR");

  // ==================== ENCOR MODULES ====================
  const encorModules = [
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

  // ==================== ENARSI MODULES ====================
  const enarsiModules = [
    {
      title: "1.0 Layer 3 Technologies (35%)",
      items: [
        {
          subTitle: "1.1 Troubleshoot administrative distance",
          items: [],
        },
        {
          subTitle: "1.2 Troubleshoot route map for any routing protocol",
          items: [],
        },
        {
          subTitle: "1.3 Troubleshoot loop prevention mechanisms",
          items: [
            "1.3.a Route tagging and filtering",
            "1.3.b Split horizon",
            "1.3.c Route poisoning",
          ],
        },
        {
          subTitle: "1.4 Troubleshoot EIGRP",
          items: [
            "1.4.a Classic and named mode for IPv4 and IPv6",
            "1.4.b Neighbor relationship and authentication",
            "1.4.c Loop-free path selections (RD, FD, FC, successor, feasible successor, stuck in active)",
            "1.4.d Stubs",
            "1.4.e Load balancing (equal and unequal cost)",
            "1.4.f Metrics",
          ],
        },
        {
          subTitle: "1.5 Troubleshoot OSPF",
          items: [
            "1.5.a IPv4 and IPv6",
            "1.5.b Neighbor relationship and authentication",
            "1.5.c Network types, area types, and router types",
            "1.5.d Path preference",
            "1.5.e Operations",
            "1.5.f Optimization mechanisms such as summarization and route filtering",
          ],
        },
        {
          subTitle: "1.6 Troubleshoot BGP",
          items: [
            "1.6.a IPv4 and IPv6 address families",
            "1.6.b iBGP and eBGP peer relationships",
            "1.6.c Path selection algorithm",
            "1.6.d Route reflector",
            "1.6.e Policy control using route-maps and filtering",
          ],
        },
        {
          subTitle: "1.7 Describe IPv6 tunneling mechanisms",
          items: ["1.7.a GRE", "1.7.b Dynamic 6to4 tunnels", "1.7.c ISATAP"],
        },
        {
          subTitle: "1.8 Troubleshoot IPv4 and IPv6 multicast routing",
          items: [
            "1.8.a Reverse Path Forwarding (RPF)",
            "1.8.b PIM",
            "1.8.c IGMP v2 and v3",
          ],
        },
      ],
    },
    {
      title: "2.0 VPN Technologies (20%)",
      items: [
        "2.1 Describe MPLS operations (LSR, LDP, label switching, LSP)",
        "2.2 Describe MPLS Layer 3 VPN",
        {
          subTitle: "2.3 Configure and verify DMVPN (single hub)",
          items: [
            "2.3.a GRE/mGRE",
            "2.3.b NHRP",
            "2.3.c IPsec",
            "2.3.d Dynamic neighbor",
            "2.3.e Spoke-to-spoke",
          ],
        },
      ],
    },
    {
      title: "3.0 Infrastructure Security (20%)",
      items: [
        {
          subTitle: "3.1 Troubleshoot device security using IOS AAA",
          items: ["3.1.a TACACS+", "3.1.b RADIUS", "3.1.c Local database"],
        },
        {
          subTitle: "3.2 Troubleshoot router security features",
          items: [
            "3.2.a IPv4 access control lists (standard, extended, time-based)",
            "3.2.b IPv6 traffic filter",
            "3.2.c Unicast Reverse Path Forwarding (uRPF)",
          ],
        },
        {
          subTitle: "3.3 Troubleshoot control plane policing (CoPP)",
          items: [],
        },
        {
          subTitle: "3.4 Describe IPv6 first hop security features",
          items: [
            "3.4.a RA guard",
            "3.4.b DHCP guard",
            "3.4.c Binding table",
            "3.4.d Dynamic ARP inspection (DAI)",
            "3.4.e Source guard",
            "3.4.f FIPV6",
          ],
        },
      ],
    },
    {
      title: "4.0 Infrastructure Services (25%)",
      items: [
        {
          subTitle: "4.1 Troubleshoot device management",
          items: [
            "4.1.a Console and VTY",
            "4.1.b Telnet and SSH",
            "4.1.c SNMP v2c and v3",
          ],
        },
        {
          subTitle: "4.2 Troubleshoot DHCP",
          items: [
            "4.2.a Client/server mode for IPv4 and IPv6 (SLAAC/DHCPv6)",
            "4.2.b DHCP options",
            "4.2.c DHCP relay",
            "4.2.d DHCP authentication",
          ],
        },
        "4.3 Troubleshoot network performance issues using IP SLA with tracking",
        "4.4 Troubleshoot NetFlow",
        "4.5 Troubleshoot network problems using logging (local, syslog, conditional, timestamps)",
        {
          subTitle: "4.6 Configure and verify Embedded Event Manager (EEM)",
          items: [],
        },
        {
          subTitle: "4.7 Troubleshoot network connectivity issues using ICMP",
          items: [
            "4.7.a Extended ping",
            "4.7.b Traceroute",
            "4.7.c Debug",
            "4.7.d Conditional debug",
            "4.7.e Ping and traceroute with source option",
          ],
        },
        {
          subTitle: "4.8 Configure and verify Cisco DNA Center workflows",
          items: [
            "4.8.a Apply a network configuration",
            "4.8.b Perform network monitoring",
            "4.8.c Identify and troubleshoot client issues",
          ],
        },
        "4.9 Configure and verify FHRP",
        "4.10 Configure and verify RESTCONF and NETCONF",
      ],
    },
  ];

  // ==================== ENSDWI MODULES ====================
  const ensdwiModules = [
    {
      title: "1.0 SD-WAN Architecture (20%)",
      items: [
        {
          subTitle: "1.1 Describe the Cisco SD-WAN solution architecture",
          items: [
            "1.1.a Orchestration plane (vBond, NAT)",
            "1.1.b Management plane (vManage)",
            "1.1.c Control plane (vSmart, OMP)",
            "1.1.d Data plane (WAN Edge)",
          ],
        },
        "1.2 Describe WAN Edge router types and their deployment scenarios",
        "1.3 Describe Cisco SD-WAN overlay network components and the roles they play",
        "1.4 Describe the purpose and workings of the Overlay Management Protocol (OMP)",
        "1.5 Describe SD-WAN connection types and transport options",
      ],
    },
    {
      title: "2.0 Controller Deployment (15%)",
      items: [
        {
          subTitle: "2.1 Deploy and configure Cisco SD-WAN controllers",
          items: ["2.1.a vManage", "2.1.b vSmart", "2.1.c vBond"],
        },
        "2.2 Configure and verify certificates and network-level authentication for controllers",
        "2.3 Configure and verify controller high availability and redundancy",
        "2.4 Configure and verify SD-WAN controller to WAN Edge connectivity",
      ],
    },
    {
      title: "3.0 Router Deployment (20%)",
      items: [
        {
          subTitle: "3.1 Onboard WAN Edge routers",
          items: [
            "3.1.a Zero-Touch Provisioning (ZTP)",
            "3.1.b Plug and Play (PnP)",
            "3.1.c Manual onboarding",
          ],
        },
        "3.2 Configure and verify WAN Edge device templates",
        "3.3 Configure and verify routing protocols in the SD-WAN overlay",
        "3.4 Configure and verify Direct Internet Access (DIA) breakout",
        "3.5 Describe SD-WAN high availability and redundancy at the WAN Edge",
      ],
    },
    {
      title: "4.0 Policies (20%)",
      items: [
        {
          subTitle: "4.1 Configure and verify centralized policies",
          items: [
            "4.1.a Control policies",
            "4.1.b Data policies",
            "4.1.c Application-aware routing policies",
          ],
        },
        {
          subTitle: "4.2 Configure and verify localized policies",
          items: ["4.2.a Access lists", "4.2.b Route policies"],
        },
        "4.3 Configure and verify service chaining in SD-WAN",
        "4.4 Describe the policy framework and the role of vSmart in policy distribution",
      ],
    },
    {
      title: "5.0 Security and Quality of Service (15%)",
      items: [
        {
          subTitle: "5.1 Configure and verify SD-WAN security features",
          items: [
            "5.1.a Application-aware enterprise firewall",
            "5.1.b Intrusion Prevention System (IPS)",
            "5.1.c URL filtering",
            "5.1.d Cisco Advanced Malware Protection (AMP)",
            "5.1.e SSL/TLS proxy",
            "5.1.f Cisco Umbrella Secure Internet Gateway (SIG)",
          ],
        },
        "5.2 Configure and verify SD-WAN QoS mechanisms",
        "5.3 Describe SD-WAN encryption and data plane security (IPsec, key exchange)",
        "5.4 Configure and verify segmentation using VPNs in the SD-WAN fabric",
      ],
    },
    {
      title: "6.0 Management and Operations (10%)",
      items: [
        "6.1 Implement basic SD-WAN monitoring and troubleshooting using vManage",
        "6.2 Configure and verify multicast over SD-WAN",
        "6.3 Perform SD-WAN device software upgrades using vManage",
        "6.4 Describe SD-WAN migration strategies from traditional WAN environments",
        "6.5 Describe SD-WAN REST API capabilities and use cases",
      ],
    },
  ];

  const tabData = {
    ENCOR: {
      label: "CCNP Enterprise (ENCOR)",
      examCode: "350-401",
      duration: "120 minutes",
      description:
        "The Implementing Cisco Enterprise Network Core Technologies exam (350-401 ENCOR) v1.1 validates a candidate's understanding of core enterprise network technologies including dual-stack (IPv4 and IPv6) architecture, virtualization, infrastructure, network assurance, security, and automation. This is the required core exam for the CCNP Enterprise certification.",
      about:
        "This course prepares learners for the 350-401 ENCOR exam through instructor-led training with hands-on labs. It covers core enterprise networking topics including dual-stack architecture, virtualization, infrastructure, security, and automation. The program emphasizes practical configuration, troubleshooting, and real-world scenarios to build the skills and confidence needed for exam success.",
      learn: [
        "Network Access Concepts",
        "Infrastructure Security Fundamentals",
        "Automation and Programmability Basics",
        "Advanced Routing Technologies",
      ],
      modules: encorModules,
      downloadLabel: "Download the ENCOR Exam Topics Here",
      downloadUrl: "https://learningcontent.cisco.com/documents/marketing/exam-topics/350-401-ENCORE-v1.2.pdf",
    },
    ENARSI: {
      label: "CCNP Enterprise (ENARSI)",
      examCode: "300-410",
      duration: "90 minutes",
      description:
        "The Implementing Cisco Enterprise Advanced Routing and Services exam (300-410 ENARSI) v1.2 validates a candidate's expertise in implementing and troubleshooting advanced routing technologies and services. This is a concentration exam for the CCNP Enterprise certification and also earns the Cisco Certified Specialist – Enterprise Advanced Infrastructure Implementation designation.",
      about:
        "This course equips learners with advanced routing and services skills needed to pass the 300-410 ENARSI exam. Topics include advanced Layer 3 routing protocols (EIGRP, OSPF, BGP), VPN technologies (MPLS, DMVPN), infrastructure security (AAA, ACLs, CoPP), and infrastructure services (DHCP, IP SLA, NetFlow). The course stresses hands-on troubleshooting in real-world enterprise environments.",
      learn: [
        "Advanced Routing Protocols (EIGRP, OSPF, BGP)",
        "MPLS and VPN Technologies",
        "Infrastructure Security and AAA",
        "Infrastructure Services and Troubleshooting",
      ],
      modules: enarsiModules,
      downloadLabel: "Download the ENARSI Exam Topics Here",
      downloadUrl: "https://learningcontent.cisco.com/documents/300-410-ENARSI-v1.1.7-2025.pdf",
    },
    ENSDWI: {
      label: "CCNP Enterprise (ENSDWI)",
      examCode: "300-415",
      duration: "90 minutes",
      description:
        "The Implementing Cisco Catalyst SD-WAN Solutions exam (300-415 ENSDWI) v1.2 validates a candidate's ability to design, deploy, configure, and manage Cisco SD-WAN solutions at enterprise scale. This is a concentration exam for the CCNP Enterprise certification and also earns the Cisco Certified Specialist – Enterprise SD-WAN Implementation designation.",
      about:
        "This course provides in-depth training on how to design, deploy, configure, and manage Cisco SD-WAN solutions in large-scale live networks, including migration from legacy WAN environments. Learners will master SD-WAN architecture, controller setup, WAN Edge router onboarding, advanced control and data policies, QoS, SD-WAN security, and day-to-day operational management through vManage.",
      learn: [
        "SD-WAN Architecture and Components",
        "Controller and WAN Edge Deployment",
        "SD-WAN Policy Configuration",
        "SD-WAN Security and QoS",
      ],
      modules: ensdwiModules,
      downloadLabel: "Download the ENSDWI Exam Topics Here",
      downloadUrl: "https://learningcontent.cisco.com/documents/marketing/exam-topics/300-415-ENSDWI-v1.2-7-2025.pdf",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNP Enterprise"
        description="The CCNP Enterprise certification validates the skills required to plan, implement, verify, and troubleshoot enterprise networking solutions. It includes three tracks: ENCOR (core), ENARSI (advanced routing), and ENSDWI (SD-WAN). Choose a track below to explore its exam details and course content."
      />

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE ====================*/}
        <div className="flex flex-col gap-8">
          {/* ==================== COURSE TRACK TABS ==================== */}
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

          {/* Course Content */}
          <section className="flex flex-col gap-y-5">
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <CourseModules modules={active.modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className="aside_contents">
          {/* Cert Badge */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            <img
              src={ccnaBadge}
              alt="CCNP Enterprise Certification Badge"
              className="w-55 h-55 lg:w-100 lg:h-100 object-contain"
            />
          </div>

          {/* Job Opportunities */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Job Opportunities</h5>
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

          {/* Target Learners */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Target Learners</h5>
            {["Beginners", "Zero Knowledge"].map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>

          {/* Schedule */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Schedule</h5>
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
                <p>Monday–Sunday</p>
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

          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Inclusions</h5>

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

      {/* ==================== CALL TO ACTION BANNER ==================== */}
      <TrainingTemplateFooter
        bgImage={ccnaFooter}
        bgPosition="90%"
        description="Advance your networking career and prepare for the CCNP Enterprise certification."
      />
    </main>
  );
}
