import { useState, useEffect } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import badge1 from "../../../assets/FortinetNSE5SecureNetworking.png";
import badge2 from "../../../assets/FortinetNSE5SASE.png";
import badge3 from "../../../assets/FortinetNSE5ClousSecurity.png";
import badge4 from "../../../assets/FortinetNSE5SecurityOperations.png";
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

export default function NSE5() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const badges = [
    { src: badge1, alt: "Fortinet NSE 5 Secure Networking Badge" },
    { src: badge2, alt: "Fortinet NSE 5 SASE Badge" },
    { src: badge3, alt: "Fortinet NSE 5 Cloud Security Badge" },
    { src: badge4, alt: "Fortinet NSE 5 Security Operations Badge" },
  ];

  // Auto-cycle every 2.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleBadgeChange((prev) => (prev + 1) % badges.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, badges.length]);

  const handleBadgeChange = (indexOrUpdater) => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedBadge(indexOrUpdater);
      setAnimating(false);
    }, 300);
  };

  const handleDotClick = (i) => {
    setIsPaused(true); // pause auto-cycle on manual click
    handleBadgeChange(i);
    // Resume auto-cycle after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  };

  const modules = [
    // ─── TRACK 1: FORTIGATE SECURITY ───────────────────────────────────────────
    {
      title: "1.0 FortiGate Security — System and Network Settings",
      items: [
        {
          subTitle: "1.1 Initial Configuration",
          items: [
            "Factory default settings",
            "Connecting to the GUI and CLI",
            "Firmware upgrades and downgrades",
            "Backup and restore configuration",
            "Administrative access profiles",
          ],
        },
        {
          subTitle: "1.2 Administrative Accounts",
          items: [
            "Local administrator accounts",
            "RADIUS and LDAP admin authentication",
            "Two-factor authentication for admins",
            "Trusted hosts for admin access",
            "Password policies",
          ],
        },
        {
          subTitle: "1.3 Network Interfaces",
          items: [
            "Physical interfaces",
            "VLAN interfaces",
            "Loopback interfaces",
            "Aggregate and redundant interfaces",
            "Software switch and hardware switch",
          ],
        },
        {
          subTitle: "1.4 Routing",
          items: [
            "Static routing",
            "Policy-based routing",
            "Route lookup behavior",
            "Equal-cost multi-path (ECMP)",
            "Reverse path forwarding (RPF)",
          ],
        },
      ],
    },
    {
      title: "2.0 FortiGate Security — Firewall Policies",
      items: [
        {
          subTitle: "2.1 Firewall Policy Fundamentals",
          items: [
            "Policy table and order of evaluation",
            "Implicit deny rule",
            "Source and destination address objects",
            "Service and schedule objects",
            "Policy actions: Accept, Deny, IPsec",
          ],
        },
        {
          subTitle: "2.2 Network Address Translation (NAT)",
          items: [
            "Source NAT (SNAT) with IP pools",
            "Destination NAT (DNAT) with virtual IPs (VIPs)",
            "Central NAT table",
            "Port address translation (PAT)",
            "NAT46 and NAT64",
          ],
        },
        {
          subTitle: "2.3 Policy Objects",
          items: [
            "Address and address groups",
            "Service definitions and groups",
            "Schedules (one-time and recurring)",
            "Internet service database (ISDB)",
            "FQDN-based address objects",
          ],
        },
      ],
    },
    {
      title: "3.0 FortiGate Security — User Authentication",
      items: [
        {
          subTitle: "3.1 Firewall Authentication",
          items: [
            "Active vs. passive authentication",
            "Local user database",
            "User groups and guest accounts",
            "Captive portal",
            "Disclaimer and welcome pages",
          ],
        },
        {
          subTitle: "3.2 Remote Authentication Servers",
          items: [
            "RADIUS server configuration",
            "LDAP server configuration",
            "TACACS+ integration",
            "Single sign-on (SSO) concepts",
            "FSSO (Fortinet Single Sign-On) agent and agentless modes",
          ],
        },
        {
          subTitle: "3.3 Certificate-Based Authentication",
          items: [
            "PKI certificates overview",
            "Importing CA certificates",
            "User certificate authentication",
            "FortiGate as a CA",
            "Certificate revocation (CRL and OCSP)",
          ],
        },
      ],
    },
    {
      title: "4.0 FortiGate Security — Content Inspection",
      items: [
        {
          subTitle: "4.1 Inspection Modes",
          items: [
            "Flow-based inspection",
            "Proxy-based inspection",
            "Choosing the right inspection mode",
            "SSL/TLS deep inspection",
            "Certificate inspection",
          ],
        },
        {
          subTitle: "4.2 Security Profiles",
          items: [
            "Antivirus profiles",
            "Web filter profiles",
            "Application control profiles",
            "Intrusion prevention system (IPS) profiles",
            "DNS filter profiles",
            "File filter profiles",
          ],
        },
        {
          subTitle: "4.3 Web Filtering",
          items: [
            "FortiGuard category-based filtering",
            "URL and DNS filtering",
            "Web content ratings",
            "Safe search enforcement",
            "YouTube education filter",
          ],
        },
        {
          subTitle: "4.4 Application Control",
          items: [
            "Application signatures and categories",
            "Cloud access security (CASB)",
            "Application overrides",
            "Traffic shaping with application control",
            "Unknown application handling",
          ],
        },
        {
          subTitle: "4.5 Antivirus",
          items: [
            "Virus scanning engines",
            "File quarantine",
            "Botnet detection",
            "FortiSandbox integration",
            "Outbreak prevention",
          ],
        },
      ],
    },
    {
      title: "5.0 FortiGate Security — SSL VPN",
      items: [
        {
          subTitle: "5.1 SSL VPN Modes",
          items: [
            "Web mode (clientless)",
            "Tunnel mode",
            "Split tunneling",
            "Full tunnel",
            "Host check and endpoint compliance",
          ],
        },
        {
          subTitle: "5.2 SSL VPN Configuration",
          items: [
            "SSL VPN portals",
            "SSL VPN realms",
            "User and group-based access",
            "SSL VPN firewall policies",
            "FortiClient SSL VPN client",
          ],
        },
      ],
    },
    {
      title: "6.0 FortiGate Security — Diagnostics and Troubleshooting",
      items: [
        {
          subTitle: "6.1 Logging",
          items: [
            "Log types: traffic, event, security",
            "Local logging to disk and memory",
            "Syslog server configuration",
            "FortiAnalyzer logging",
            "Log severity levels",
          ],
        },
        {
          subTitle: "6.2 Monitoring and Diagnostics",
          items: [
            "Dashboard widgets",
            "Session table analysis",
            "Packet capture (sniffer)",
            "Flow debug (diagnose debug flow)",
            "FortiView traffic analysis",
          ],
        },
      ],
    },

    // ─── TRACK 2: FORTIGATE INFRASTRUCTURE ────────────────────────────────────
    {
      title: "7.0 FortiGate Infrastructure — Advanced Routing",
      items: [
        {
          subTitle: "7.1 Dynamic Routing Protocols",
          items: [
            "OSPF fundamentals and areas",
            "BGP overview and eBGP/iBGP",
            "RIP version 2",
            "Route redistribution",
            "Routing tables and distance/metric",
          ],
        },
        {
          subTitle: "7.2 SD-WAN",
          items: [
            "SD-WAN members and zones",
            "Performance SLAs and health checks",
            "SD-WAN rules and strategies",
            "Load balancing algorithms",
            "Application-aware routing",
          ],
        },
        {
          subTitle: "7.3 Virtual Routing and Forwarding (VRF)",
          items: [
            "VRF concepts and use cases",
            "VRF-lite configuration",
            "Inter-VRF routing",
            "VRF and VPN integration",
            "Route leaking between VRFs",
          ],
        },
      ],
    },
    {
      title: "8.0 FortiGate Infrastructure — IPsec VPN",
      items: [
        {
          subTitle: "8.1 IPsec Fundamentals",
          items: [
            "IKEv1 and IKEv2 phases",
            "Authentication methods: PSK and certificates",
            "Encryption and integrity algorithms",
            "Diffie-Hellman groups",
            "Perfect forward secrecy (PFS)",
          ],
        },
        {
          subTitle: "8.2 IPsec VPN Topologies",
          items: [
            "Site-to-site VPN",
            "Hub-and-spoke VPN",
            "Redundant VPN tunnels",
            "Dial-up VPN (remote access)",
            "GRE over IPsec",
          ],
        },
        {
          subTitle: "8.3 IPsec Troubleshooting",
          items: [
            "Phase 1 and Phase 2 negotiation errors",
            "VPN monitor and status",
            "IKE real-time debug output",
            "Routing issues with VPN",
            "MTU and fragmentation issues",
          ],
        },
      ],
    },
    {
      title: "9.0 FortiGate Infrastructure — High Availability (HA)",
      items: [
        {
          subTitle: "9.1 HA Concepts",
          items: [
            "Active-Active vs. Active-Passive modes",
            "FGCP (FortiGate Clustering Protocol)",
            "Heartbeat interfaces",
            "Session synchronization",
            "Failover detection and recovery",
          ],
        },
        {
          subTitle: "9.2 HA Configuration and Management",
          items: [
            "HA cluster setup",
            "Override and priority settings",
            "Firmware upgrades in HA",
            "Virtual MAC addresses",
            "HA and management IP access",
          ],
        },
      ],
    },
    {
      title: "10.0 FortiGate Infrastructure — Security Fabric",
      items: [
        {
          subTitle: "10.1 Security Fabric Overview",
          items: [
            "Fabric topology: root and downstream FortiGates",
            "Fabric connectors",
            "FortiTelemetry protocol",
            "Fabric audit and recommendations",
            "Automation stitches",
          ],
        },
        {
          subTitle: "10.2 Fabric Integration",
          items: [
            "FortiAnalyzer integration",
            "FortiManager integration",
            "FortiSandbox integration",
            "Third-party fabric connectors",
            "Fabric-wide policy synchronization",
          ],
        },
        {
          subTitle: "10.3 ZTNA (Zero Trust Network Access)",
          items: [
            "ZTNA concepts and principles",
            "ZTNA vs. VPN",
            "ZTNA access proxy configuration",
            "Device posture checks",
            "FortiClient ZTNA integration",
          ],
        },
      ],
    },
    {
      title: "11.0 FortiGate Infrastructure — Advanced Diagnostics",
      items: [
        {
          subTitle: "11.1 Advanced Troubleshooting Tools",
          items: [
            "Debug flow (diagnose debug flow filter and trace)",
            "Session list filtering and analysis",
            "Hardware offload and NP/CP inspection bypass",
            "CPU and memory diagnostics",
            "Crash logs and conserve mode",
          ],
        },
        {
          subTitle: "11.2 Performance Tuning",
          items: [
            "NP6/NP7 hardware acceleration",
            "CP9 content processor offloading",
            "Traffic shaping and QoS",
            "Interface queuing and priority",
            "Conserve mode thresholds",
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
        title="NSE 4"
        description="Learn to administer FortiGate devices using key features and
              security profiles. Through hands-on labs, you'll practice firewall
              policies, VPNs, user authentication, logging, and network
              protection, building a solid foundation for advanced FortiGate
              administration.
                              "
      />

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE ==================== */}
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p>
              In this course, you will gain practical experience using key
              FortiGate features. Through interactive labs, you will explore
              firewall policies, user authentication, high availability, logging
              and monitoring, site-to-site IPsec VPN, cloud deployments, and
              security services such as IPS, antivirus, web filtering, and
              application control.
            </p>
            <p>
              Aligned with Fortinet training, these administration fundamentals
              provide a strong foundation for implementing and managing the most
              widely used FortiGate security features.
            </p>
          </section>

          <section className="flex flex-col gap-y-5">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid flex-col lg:flex-col-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Set up basic FortiGate networking from factory defaults</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Configure and manage administrator access</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Administer devices using both GUI and CLI</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Understand device registration methods</span>
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-y-5">
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <CourseModules modules={modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className="aside_contents">
          {/* ==================== CERT BADGE WITH SELECTOR ==================== */}
          <div
            className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col items-center justify-center h-64 gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              src={badges[selectedBadge].src}
              alt={badges[selectedBadge].alt}
              className={`w-40 h-40 sm:w-45 sm:h-45 lg:w-50 lg:h-50 object-contain transition-all duration-300 ${
                animating ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            />
            {/* DOT INDICATORS */}
            <div className="flex justify-center gap-x-2">
              {badges.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedBadge === i
                      ? "bg-[#1775EE] w-4"
                      : "bg-[#C2DDFF] w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ==================== JOB OPPORTUNITIES ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
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

          {/* ==================== TARGET LEARNERS ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] ">Target Learners</h5>
            {["Intermediate"].map((level) => (
              <p key={level} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{level}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] ">Schedule</h5>
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

          {/* ==================== INCLUSIONS ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] ">Inclusions</h5>
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
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the Fortinet Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== FOOTER BANNER ==================== */}
      <TrainingTemplateFooter
        bgImage={ccnaFooter}
        description="Advance your network security career and prepare for the Fortinet NSE 5 certification exam."
      />
    </main>
  );
}
