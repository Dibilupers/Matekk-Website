// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import network from "../../../assets/network+.webp"; // Course badge image
import comptiaHero from "../../../assets/COMPTIAherobg.webp"; // Hero banner background
import comptiaFooter from "../../../assets/COMPTIAFooter.webp"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NetworkPlus() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "Networking concepts (23%)",
      items: [
         <>
          <strong>OSI model layers:</strong> physical, data link, network, transport, session, presentation, application.
        </>,
        <>
          <strong>Networking appliances:</strong> routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS, SAN, and wireless devices.
        </>,
        <>
          <strong>Cloud concepts:</strong> NFV, VPC, network security groups, cloud gateways, deployment models (public, private, hybrid), service models (SaaS, IaaS, PaaS).
        </>,
        <>
          <strong>Ports and protocols:</strong> FTP, SFTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP, HTTPS, SNMP, LDAP, RDP, SIP.
        </>,
        <>
          <strong>Traffic types:</strong> unicast, multicast, anycast, broadcast.
        </>,
        <>
          <strong>Transmission media:</strong> wireless (802.11, cellular, satellite), wired (fiber, coaxial, DAC).
        </>,
        <>
          <strong>Transceivers and connectors:</strong> SC, LC, ST, MPO, RJ11, RJ45, F-type, BNC.
        </>,
        <>
          <strong>Network topologies:</strong> mesh, hybrid, star/hub-and-spoke, spine and leaf, point-to-point, three-tier, and collapsed core.
        </>,
        <>
          <strong>IPv4 addressing:</strong> public vs. private, APIPA, RFC1918, loopback, subnetting (VLSM, CIDR), and address classes (A, B, C, D, E).
        </>,
      ],
    },
    {
      title: "Network implementation (20%)",
      items: [
        <>
          <strong>OSI model layers:</strong>  physical, data link, network, transport, session, presentation, application.
        </>,
        <>
          <strong>Networking appliances:</strong> routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS, SAN, and wireless devices.
        </>,
        <>
          <strong>Cloud concepts:</strong> NFV, VPC, network security groups, cloud gateways, deployment models (public, private, hybrid), service models (SaaS, IaaS, PaaS).
        </>,
        <>
          <strong>Ports and protocols:</strong> FTP, SFTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP, HTTPS, SNMP, LDAP, RDP, SIP.
        </>,
        <>
          <strong>Traffic types:</strong> unicast, multicast, anycast, broadcast.
        </>,
        <>
          <strong>Transmission media:</strong> wireless (802.11, cellular, satellite), wired (fiber, coaxial, DAC).
        </>,
        <>
          <strong>Transceivers and connectors:</strong> SC, LC, ST, MPO, RJ11, RJ45, F-type, BNC.
        </>,
        <>
          <strong>Network topologies:</strong> mesh, hybrid, star/hub-and-spoke, spine and leaf, point-to-point, three-tier, and collapsed core.
        </>,
        <>
          <strong>IPv4 addressing:</strong> public vs. private, APIPA, RFC1918, loopback, subnetting (VLSM, CIDR), and address classes (A, B, C, D, E).
        </>,
      ],
    },
    {
      title: "Network operations (19%)",
      items: [
        <>
          <strong>Documentation:</strong>  physical vs. logical diagrams, rack diagrams, cable maps, network diagrams, asset inventory, IPAM, SLA, and wireless surveys.
        </>,
        <>
          <strong>Life-cycle management:</strong> EOL, EOS, software management, and decommissioning.
        </>,
        <>
          <strong>Change management:</strong> structured process for changes.
        </>,
        <>
          <strong>Configuration management:</strong> production, backup, baseline configurations.
        </>,
        <>
          <strong>Network monitoring:</strong> SNMP, flow data, packet capture, baseline metrics, log aggregation, API integration, and port mirroring.
        </>,
        <>
          <strong>Disaster recovery:</strong> RPO, RTO, MTTR, MTBF, cold/warm/hot sites, active-active/passive, and testing.
        </>,
        <>
          <strong>Network services:</strong> NTP, DHCP, DNS, NTP, PTP, and NFS.
        </>,
        <>
          <strong>Access and management:</strong> VPN, SSL, GUI, API, and console.
        </>,
      ],
    },
    {
      title: "Network security (14%)",
      items: [
        <>
          <strong>Logical security:</strong> encryption (data in transit/rest), PKI, IAM, MFA, SSO, RADIUS, LDAP, SAML, TACACS+, time-based authentication, authorization, least privilege, role-based access control, and geofencing.
        </>,
        <>
          <strong>Physical security:</strong> cameras and locks.
        </>,
        <>
          <strong>Deception technologies:</strong> honeypot and honeywet.
        </>,
        <>
          <strong>Security terminology:</strong> risk, vulnerability, exploit, threat, and CIA triad.
        </>,
        <>
          <strong>Audit and compliance:</strong> data locality, PCI-DSS, and GDPR.
        </>,
        <>
          <strong>Network segmentation:</strong> IoT, IIoT, SCADA, ICS, OT, guest, and BYOD.
        </>,
        <>
          <strong>Types of attacks:</strong> DoS/DDoS, VLAN hopping, MAC flooding, ARP poisoning/spoofing, DNS poisoning/spoofing, rogue devices/services, evil twin, on-path attack, and social engineering (phishing, dumpster diving, shoulder surfing, tailgating).
        </>,
        <>
          <strong>Security features and defense:</strong> device hardening, NAC, key management, ACL, URL/content filtering, trusted vs. untrusted zones, and screened subnet.
        </>,
      ],
    },
    {
      title: "Network troubleshooting (24%)",
      items: [
        <>
          <strong>Troubleshooting methodology:</strong> identifying the problem, establishing a theory, testing, planning, and implementing a solution, verifying functionality, and documenting findings.
        </>,
        <>
          <strong>Cabling and physical issues:</strong> cable issues (incorrect type, signal degradation, improper termination, TX/RX transposed), interface issues (increasing counters, port status), and hardware issues (PoE, transceiver mismatch, signal strength).
        </>,
        <>
          <strong>Network services:</strong> switching issues (STP, VLAN assignment, ACLs), routing issues (routing table and default routes), address pool exhaustion, and incorrect gateway/IP/subnet mask.
        </>,
        <>
          <strong>Performance issues:</strong> network latency, packet loss, and wireless interference.
        </>,
        <>
          <strong>Tools and protocols:</strong> protocol analyzers, command line tools, cable testers, and Wi-Fi analyzers.
        </>,
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={comptiaHero}
        category="COMPTIA"
        title="Network+"
        description="CompTIA Network+ provides the knowledge and skills needed to
              configure, manage, and secure networks of any scale. Recognized
              worldwide, it opens doors to careers in IT support, operations,
              and administration, offering flexibility across various
              technologies and platforms."
      />

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
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
              As a prominent certification, CompTIA Network+ validates your
              grasp of essential networking principles and tools. It assesses
              your abilities in network connectivity, documentation, service
              deployment, data center and cloud environments, virtual
              networking, monitoring, troubleshooting, and security. This
              certification equips you for positions in technical support,
              network operations, and system administration.
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
                  Configure wired and wireless devices, covering IP addressing,
                  ports, protocols, and network design for efficient
                  implementation.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Gain knowledge of documentation methods and procedures for
                  managing lifecycle, change, and configuration.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Explore virtualization, cloud service models, scalability, and
                  elasticity to effectively apply cloud computing principles.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Track network performance, resolve connectivity problems, and
                  maintain reliable, high-availability systems.
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
              src={network}
              alt="Network+ Certification Badge"
              className="w-55 h-55 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Linux Administrator",
              "Network Engineer",
              "IoT Engineer"
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
            {["CompTIA A+ certification", "About 9–12 months of practical experience in junior network administration or network support"].map((job) => (
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
                <p>5 Days</p>
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
              <p className="text-sm">Institutional Account</p>
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
            <a href="https://www.comptia.org/en-us/certifications/network/" target="_blank" className="text-sm font-medium underline mt-2">
              See the Official CompTIA Network+ Exam Objectives
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={comptiaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your networking career and prepare for the CompTIA Network+ certification exam."
      />
    </main>
  );
}
