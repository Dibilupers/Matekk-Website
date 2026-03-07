// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import network from "../../../../assets/network+.webp"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../../components/ui/EnrollNowButton";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NetworkPlus() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "Networking concepts",
      items: [
        "OSI model layers: physical, data link, network, transport, session, presentation, application.",
        "Networking appliances: routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS, SAN, and wireless devices.",
        "Cloud concepts: NFV, VPC, network security groups, cloud gateways, deployment models (public, private, hybrid), service models (SaaS, IaaS, PaaS).",
        "Ports and protocols: FTP, SFTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP, HTTPS, SNMP, LDAP, RDP, SIP.",
        "Traffic types: unicast, multicast, anycast, broadcast.",
        "Transmission media: wireless (802.11, cellular, satellite), wired (fiber, coaxial, DAC).",
        "Transceivers and connectors: SC, LC, ST, MPO, RJ11, RJ45, F-type, BNC.",
        "Network topologies: mesh, hybrid, star/hub-and-spoke, spine and leaf, point-to-point, three-tier, and collapsed core.",
        "IPv4 addressing: public vs. private, APIPA, RFC1918, loopback, subnetting (VLSM, CIDR), and address classes (A, B, C, D, E).",
      ],
    },
    {
      title: "Network implementation",
      items: [
        "OSI model layers: physical, data link, network, transport, session, presentation, application.",
        "Networking appliances: routers, switches, firewalls, IDS/IPS, load balancers, proxies, NAS, SAN, and wireless devices.",
        "Cloud concepts: NFV, VPC, network security groups, cloud gateways, deployment models (public, private, hybrid), service models (SaaS, IaaS, PaaS).",
        "Ports and protocols: FTP, SFTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP, HTTPS, SNMP, LDAP, RDP, SIP.",
        "Traffic types: unicast, multicast, anycast, broadcast.",
        "Transmission media: wireless (802.11, cellular, satellite), wired (fiber, coaxial, DAC).",
        "Transceivers and connectors: SC, LC, ST, MPO, RJ11, RJ45, F-type, BNC.",
        "Network topologies: mesh, hybrid, star/hub and spoke, spine and leaf, point-to-point, three-tier, and collapsed core.",
        "IPv4 addressing: public vs. private, APIPA, RFC1918, loopback, subnetting (VLSM, CIDR), and address classes (A, B, C, D, E).",
      ],
    },
    {
      title: "Network operations",
      items: [
        "Documentation: physical vs. logical diagrams, rack diagrams, cable maps, network diagrams, asset inventory, IPAM, SLA, and wireless surveys.",
        "Life-cycle management: EOL, EOS, software management, and decommissioning.",
        "Change management: structured process for changes.",
        "Configuration management: production, backup, baseline configurations.",
        "Network monitoring: SNMP, flow data, packet capture, baseline metrics, log aggregation, API integration, and port mirroring.",
        "Disaster recovery: RPO, RTO, MTTR, MTBF, cold/warm/hot sites, active-active/passive, and testing.",
        "Network services: NTP, DHCP, DNS, NTP, PTP, and NFS.",
        "Access and management: VPN, SSL, GUI, API, and console.",
      ],
    },
    {
      title: "Network security",
      items: [
        "Logical security: encryption (data in transit/rest), PKI, IAM, MFA, SSO, RADIUS, LDAP, SAML, TACACS+, time-based authentication, authorization, least privilege, role-based access control, and geofencing.",
        "Physical security: cameras and locks.",
        "Deception technologies: honeypot and honeywet.",
        "Security terminology: risk, vulnerability, exploit, threat, and CIA triad.",
        "Audit and compliance: data locality, PCI-DSS, and GDPR.",
        "Network segmentation: IoT, IIoT, SCADA, ICS, OT, guest, and BYOD.",
        "Types of attacks: DoS/DDoS, VLAN hopping, MAC flooding, ARP poisoning/spoofing, DNS poisoning/spoofing, rogue devices/services, evil twin, on-path attack, and social engineering (phishing, dumpster diving, shoulder surfing, tailgating).",
        "Security features and defense: device hardening, NAC, key management, ACL, URL/content filtering, trusted vs. untrusted zones, and screened subnet.",
      ],
    },
    {
      title: "Network troubleshooting",
      items: [
        "Troubleshooting methodology: identifying the problem, establishing a theory, testing, planning, and implementing a solution, verifying functionality, and documenting findings.",
        "Cabling and physical issues: cable issues (incorrect type, signal degradation, improper termination, TX/RX transposed), interface issues (increasing counters, port status), and hardware issues (PoE, transceiver mismatch, signal strength).",
        "Network services: switching issues (STP, VLAN assignment, ACLs), routing issues (routing table and default routes), address pool exhaustion, and incorrect gateway/IP/subnet mask.",
        "Performance issues: network latency, packet loss, and wireless interference.",
        "Tools and protocols: protocol analyzers, command line tools, cable testers, and Wi-Fi analyzers.",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <section className="relative pl-8 py-18 rounded-2xl shadow-lg flex flex-col gap-3 overflow-hidden min-h-62.5">
        {/* ==================== HERO BANNER - Image ====================*/}
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ccnaHero})`,
          }}
        />
        {/* Hero Background Image Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#cbddf5] via-[#cbddf5ce] to-transparent"></div>

        {/* ==================== HERO BANNER - Text Content ====================*/}
        <div className="relative z-10 flex flex-col gap-3 pl-1 sm:pl-8">
          {/* Course Category */}
          <h6 className="w-fit px-4 py-2 text-[#1775EE] bg-blue-50 rounded-full">
            COMPTIA
          </h6>

          {/* ====== Course Title and Description ======*/}
          <div>
            {/* Course title */}
            <h1 className="text-[#1775EE] font-bold">Network+</h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              CompTIA Network+ provides the knowledge and skills needed to
              configure, manage, and secure networks of any scale. Recognized
              worldwide, it opens doors to careers in IT support, operations,
              and administration, offering flexibility across various
              technologies and platforms.
            </p>
          </div>

          {/* ====== Hero Button ====== */}
          <div className="flex flex-row sm:flex-row gap-2.5 mt-1">
            {/* Enroll Now Button - When clicked, opens a modal */}
            <EnrollNowButton />

            {/* Learn More Button - When clicked will scroll down to proceed on the other sections of the page */}
            <Button
              title="Learn More"
              type="none"
              buttonCustomStyle="bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-white hover:border-white hover:text-blue-600 transition ease-in-out transition-all duration-300 px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>
      </section>

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
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={network}
              alt="Network+ Certification Badge"
              className="w-100 h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Cybersecurity Specialist",
              "Cybersecurity Analyst",
              "Penetration Tester",
              "IT Auditor",
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
