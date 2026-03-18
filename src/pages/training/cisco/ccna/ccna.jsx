// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import ccnaBadge from "../../../../assets/CCNA.png"; // Course badge image
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
export default function CCNA() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Network Fundamentals",
      items: [
        {
          subTitle: "1.1 Explain the role and function of network components",
          items: [
            "1.1.a Routers",
            "1.1.b Layer 2 and Layer 3 switches",
            "1.1.c Next-generation firewalls and IPS",
            "1.1.d Access points",
            "1.1.e Controllers (Cisco DNA Center and WLC)",
            "1.1.f Endpoints",
            "1.1.g Servers",
            "1.1.h PoE",
          ],
        },
        {
          subTitle:
            "1.2 Describe characteristics of network topology architectures",
          items: [
            "1.2.a Two-tier",
            "1.2.b Three-tier",
            "1.2.c Spine-leaf",
            "1.2.d WAN",
            "1.2.e Small office/home office (SOHO)",
            "1.2.f On-premises and cloud",
          ],
        },
        {
          subTitle: "1.3 Compare physical interface and cabling types",
          items: [
            "1.3.a Single-mode fiber, multimode fiber, copper",
            "1.3.b Connections (Ethernet shared media and point-to-point)",
          ],
        },
        "1.4 Identify interface and cable issues (collisions, errors, mismatch duplex, and/or speed)",
        "1.5 Compare TCP to UDP",
        "1.6 Configure and verify IPv4 addressing and subnetting",
        "1.7 Describe private IPv4 addressing",
        "1.8 Configure and verify IPv6 addressing and prefix",
        {
          subTitle: "1.9 Describe IPv6 address types",
          items: [
            "1.9.a Unicast (global, unique local, and link local)",
            "1.9.b Anycast",
            "1.9.c Multicast",
            "1.9.d Modified EUI 64",
          ],
        },
        "1.10 Verify IP parameters for Client OS (Windows, Mac OS, Linux)",
        {
          subTitle: "1.11 Describe wireless principles",
          items: [
            "1.11.a Nonoverlapping Wi-Fi channels",
            "1.11.b SSID",
            "1.11.c RF",
            "1.11.d Encryption",
          ],
        },
        "1.12 Explain virtualization fundamentals (server virtualization, containers, and VRFs)",
        {
          subTitle: "1.13 Describe switching concepts",
          items: [
            "1.13.a MAC learning and aging",
            "1.13.b Frame switching",
            "1.13.c Frame flooding",
            "1.13.d MAC address table",
          ],
        },
      ],
    },
    {
      title: "2.0 Network Access",
      items: [
        {
          subTitle:
            "2.1 Configure and verify VLANs (normal range) spanning multiple switches",
          items: [
            "2.1.a Access ports (data and voice)",
            "2.1.b Default VLAN",
            "2.1.c InterVLAN connectivity",
          ],
        },
        {
          subTitle: "2.2 Configure and verify interswitch connectivity",
          items: ["2.2.a Trunk ports", "2.2.b 802.1Q", "2.2.c Native VLAN"],
        },
        "2.3 Configure and verify Layer 2 discovery protocols (Cisco Discovery Protocol and LLDP)",
        "2.4 Configure and verify (Layer 2/Layer 3) EtherChannel (LACP)",
        {
          subTitle:
            "2.5 Interpret basic operations of Rapid PVST+ Spanning Tree Protocol",
          items: [
            "2.5.a Root port, root bridge (primary/secondary), and other port names",
            "2.5.b Port states (forwarding/blocking)",
            "2.5.c PortFast",
            "2.5.d Root guard, loop guard, BPDU filter, and BPDU guard",
          ],
        },
        "2.6 Describe Cisco Wireless Architectures and AP modes",
        "2.7 Describe physical infrastructure connections of WLAN components (AP, WLC, access/trunk ports, and LAG)",
        "2.8 Describe network device management access (Telnet, SSH, HTTP, HTTPS, console, TACACS+/RADIUS, and cloud managed)",
        "2.9 Interpret the wireless LAN GUI configuration for client connectivity, such as WLAN creation, security settings, QoS profiles, and advanced settings",
      ],
    },
    {
      title: "3.0 IP Connectivity",
      items: [
        {
          subTitle: "3.1 Interpret the components of routing table",
          items: [
            "3.1.a Routing protocol code",
            "3.1.b Prefix",
            "3.1.c Network mask",
            "3.1.d Next hop",
            "3.1.e Administrative distance",
            "3.1.f Metric",
            "3.1.g Gateway of last resort",
          ],
        },
        {
          subTitle:
            "3.2 Determine how a router makes a forwarding decision by default",
          items: [
            "3.2.a Longest prefix match",
            "3.2.b Administrative distance",
            "3.2.c Routing protocol metric",
          ],
        },
        {
          subTitle: "3.3 Configure and verify IPv4 and IPv6 static routing",
          items: [
            "3.3.a Default route",
            "3.3.b Network route",
            "3.3.c Host route",
            "3.3.d Floating static",
          ],
        },
        {
          subTitle: "3.4 Configure and verify single area OSPFv2",
          items: [
            "3.4.a Neighbor adjacencies",
            "3.4.b Point-to-point",
            "3.4.c Broadcast (DR/BDR selection)",
            "3.4.d Router ID",
          ],
        },
        "3.5 Describe the purpose, functions, and concepts of first hop redundancy protocols",
      ],
    },
    {
      title: "4.0 IP Services",
      items: [
        "4.1 Configure and verify inside source NAT using static and pools",
        "4.2 Configure and verify NTP operating in a client and server mode",
        "4.3 Explain the role of DHCP and DNS within the network",
        "4.4 Explain the function of SNMP in network operations",
        "4.5 Describe the use of syslog features including facilities and levels",
        "4.6 Configure and verify DHCP client and relay",
        "4.7 Explain the forwarding per-hop behavior (PHB) for QoS, such as classification, marking, queuing, congestion, policing, and shaping",
        "4.8 Configure network devices for remote access using SSH",
        "4.9 Describe the capabilities and functions of TFTP/FTP in the network",
      ],
    },
    {
      title: "5.0 Security Fundamentals",
      items: [
        "5.1 Define key security concepts (threats, vulnerabilities, exploits, and mitigation techniques)",
        "5.2 Describe security program elements (user awareness, training, and physical access control)",
        "5.3 Configure and verify device access control using local passwords",
        "5.4 Describe security password policies elements, such as management, complexity, and password alternatives (multifactor authentication, certificates, and biometrics)",
        "5.5 Describe IPsec remote access and site-to-site VPNs",
        "5.6 Configure and verify access control lists",
        "5.7 Configure and verify Layer 2 security features (DHCP snooping, dynamic ARP inspection, and port security)",
        "5.8 Compare authentication, authorization, and accounting concepts",
        "5.9 Describe wireless security protocols (WPA, WPA2, and WPA3)",
        "5.10 Configure and verify WLAN within the GUI using WPA2 PSK",
      ],
    },
    {
      title: "6.0 Automation and Programmability",
      items: [
        "6.1 Explain how automation impacts network management",
        "6.2 Compare traditional networks with controller-based networking",
        {
          subTitle:
            "6.3 Describe controller-based, software defined architecture (overlay, underlay, and fabric)",
          items: [
            "6.3.a Separation of control plane and data plane",
            "6.3.b Northbound and Southbound APIs",
          ],
        },
        "6.4 Explain AI (generative and predictive) and machine learning in network operations",
        "6.5 Describe characteristics of REST-based APIs (authentication types, CRUD, HTTP verbs, and data encoding)",
        "6.6 Recognize the capabilities of configuration management mechanisms, such as Ansible and Terraform",
        "6.7 Recognize components of JSON-encoded data",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNA"
        description="Implementing and Administering Cisco Solutions (200-301 CCNA) v1.1 is a 120-minute exam 
        that tests a candidate's knowledge and skills related to network fundamentals, network access, IP connectivity, IP services, 
        security fundamentals, and automation and programmability."
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
              This course is designed to help learners prepare for the updated
              CCNA 201-301 v1.1 certification exam through instructor-led,
              face-to-face training. The program includes guided instruction and
              targeted learning activities that reinforce key networking
              concepts tested in the exam.
            </p>
            <p>
              The training covers essential topics related to network access,
              enterprise networking, security fundamentals, and basic automation
              concepts, with a focus on practical hhvh and exam readiness.
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
                <p>Network Fundamentals Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>IP Connectivity Principles</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Network Security Basics</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Automation and Programmability Fundamentals</span>
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
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Network Support Technician",
              "Network Administrator",
              "IT Support Specialist",
              "Junior Network Administrator",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Target Learners - Title */}
            <h5 className="text-[#1775EE] font-bold">Target Learners</h5>
            {/* Target Learners - List */}
            {["Beginners"].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Schedule - Title */}
            <h5 className="text-[#1775EE] font-bold">Schedule</h5>
            {/* Schedule - List */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p className="font-bold">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Duration:</p>
                <p>7 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="font-bold">Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inlcusions - Title */}
            <h5 className="text-[#1775EE] font-bold">Inclusions</h5>

            {/* Inclusions - List */}
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p className="text-sm">Reviewers & exercises</p>
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
              <p className="text-sm">Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Certificate of Completion</p>
            </div>

            {/* CHANGE: Download link text and URL */}
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the CCNA Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CCNA Enterprise exam."
      />
    </main>
  );
}
