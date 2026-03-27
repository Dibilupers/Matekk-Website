// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import ccnaBadge from "../../../../../assets/CCNPSecurity.png"; // Course badge image
import ccnaHero from "../../../../../assets/CCNAHeroImageAutomation.webp";
import ccnaFooter from "../../../../../assets/CCNAFooterImageAutomation.webp";
import MealIcon from "../../../../../assets/Meal.svg";
import ReviewIcon from "../../../../../assets/Review.svg";
import WorkstationIcon from "../../../../../assets/Workstation.svg";
import MedalIcon from "../../../../../assets/Medal.svg";
import CourseModules from "../../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CCNPSecurity() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Security Concepts",
      items: [
        {
          subTitle:
            "1.1 Explain common threats against on-premises, hybrid, and cloud environments",
          items: [
            "1.1.a On-premises: viruses, trojans, DoS/DDoS attacks, phishing, rootkits, man-in-the-middle attacks, SQL injection, cross-site scripting, malware",
            "1.1.b Cloud: data breaches, insecure APIs, DoS/DDoS, compromised credentials",
          ],
        },
        "1.2 Compare common security vulnerabilities such as software bugs, weak and/or hardcoded passwords, OWASP top ten, missing encryption ciphers, buffer overflow, path traversal, cross-site scripting/forgery",
        "1.3 Describe functions of the cryptography components such as hashing, encryption, PKI, SSL, IPsec, NAT-T IPv4 for IPsec, preshared key, and certificate-based authorization",
        "1.4 Compare site-to-site and remote access VPN deployment types and components such as virtual tunnel interfaces, standards-based IPsec, DMVPN, FlexVPN, and Cisco Secure Client including high availability considerations",
        "1.5 Describe security intelligence authoring, sharing, and consumption",
        "1.6 Describe the controls used to protect against phishing and social engineering attacks",
        "1.7 Explain North Bound and South Bound APIs in the SDN architecture",
        "1.8 Explain Cisco DNA Center APIs for network provisioning, optimization, monitoring, and troubleshooting",
        "1.9 Interpret basic Python scripts used to call Cisco Security appliances APIs",
      ],
    },
    {
      title: "2.0 Network Security",
      items: [
        "2.1 Compare network security solutions that provide intrusion prevention and firewall capabilities",
        "2.2 Describe deployment models of network security solutions and architectures that provide intrusion prevention and firewall capabilities",
        "2.3 Describe the components, capabilities, and benefits of NetFlow and Flexible NetFlow records",
        {
          subTitle:
            "2.4 Configure and verify network infrastructure security methods",
          items: [
            "2.4.a Layer 2 methods (network segmentation using VLANs; Layer 2 and port security; DHCP snooping; Dynamic ARP inspection; storm control; PVLANs to segregate network traffic; and defenses against MAC, ARP, VLAN hopping, STP, and DHCP rogue attacks)",
            "2.4.b Device hardening of network infrastructure security devices (control plane, data plane, and management plane)",
          ],
        },
        "2.5 Implement segmentation, access control policies, AVC, URL filtering, malware protection, and intrusion policies",
        "2.6 Implement management options for network security solutions (single vs. multidevice manager, in-band vs. out-of-band, cloud vs. on-premises)",
        "2.7 Configure AAA for device and network access such as TACACS+ and RADIUS",
        "2.8 Configure secure network management of perimeter security and infrastructure devices such as SNMPv3, NetConf, RestConf, APIs, secure syslog, and NTP with authentication",
        {
          subTitle:
            "2.9 Configure and verify site-to-site and remote access VPN",
          items: [
            "2.9.a Site-to-site VPN using Cisco routers and IOS",
            "2.9.b Remote access VPN using Cisco AnyConnect Secure Mobility client",
            "2.9.c Debug commands to view IPsec tunnel establishment and troubleshooting",
          ],
        },
      ],
    },
    {
      title: "3.0 Securing the Cloud",
      items: [
        {
          subTitle: "3.1 Identify security solutions for cloud environments",
          items: [
            "3.1.a Public, private, hybrid, and community clouds",
            "3.1.b Cloud service models: SaaS, PaaS, IaaS (NIST 800-145)",
          ],
        },
        {
          subTitle:
            "3.2 Compare security responsibility for the different cloud service models",
          items: [
            "3.2.a Patch management in the cloud",
            "3.2.b Security assessment in the cloud",
          ],
        },
        "3.3 Describe the concept of DevSecOps (CI/CD pipeline, container orchestration, and secure software development)",
        "3.4 Implement application and data security in cloud environments",
        "3.5 Identify security capabilities, deployment models, and policy management to secure the cloud",
        "3.6 Configure cloud logging and monitoring methodologies",
        "3.7 Describe application and workload security concepts",
      ],
    },
    {
      title: "4.0 Content Security",
      items: [
        "4.1 Implement traffic redirection and capture methods for web proxy",
        "4.2 Describe web proxy identity and authentication including transparent user identification",
        "4.3 Compare the components, capabilities, and benefits of on-premises, hybrid, and cloud-based email and web solutions (Cisco Secure Email Gateway, Cisco Secure Email Cloud Gateway, and Cisco Secure Web Appliance)",
        "4.4 Configure and verify web and email security deployment methods to protect on-premises, hybrid, and remote users",
        "4.5 Configure and verify email security features such as SPAM filtering, antimalware filtering, DLP, blocklisting, and email encryption",
        "4.6 Configure and verify Cisco Umbrella Secure Internet Gateway and web security features such as blocklisting, URL filtering, malware scanning, URL categorization, web application filtering, and TLS decryption",
        "4.7 Describe the components, capabilities, and benefits of Cisco Umbrella",
        "4.8 Configure and verify web security controls on Cisco Umbrella (identities, URL content settings, destination lists, and reporting)",
      ],
    },
    {
      title: "5.0 Endpoint Protection and Detection",
      items: [
        "5.1 Compare Endpoint Protection Platforms (EPP) and Endpoint Detection & Response (EDR) solutions",
        "5.2 Configure endpoint antimalware protection using Cisco Secure Endpoint",
        "5.3 Configure and verify outbreak control and quarantines to limit infection",
        "5.4 Describe justifications for endpoint-based security",
        "5.5 Describe the value of endpoint device management and asset inventory systems such as MDM",
        "5.6 Describe the uses and importance of a multifactor authentication (MFA) strategy",
        "5.7 Describe endpoint posture assessment solutions to ensure endpoint security",
        "5.8 Explain the importance of an endpoint patching strategy",
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
        title="CCNP Security"
        description="Implementing and Operating Cisco Security Solutions (350-701 SCOR)
              v1.1 is a 120-minute exam that assesses a candidate’s knowledge of
              network security, secure access, threat defense, VPNs, firewall
              technologies, and automation using Cisco platforms."
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
              This course prepares learners for the Implementing and Operating
              Cisco Security Solutions (350-701 SCOR) exam through
              instructor-led training with hands-on labs and guided instruction.
              It covers core security topics, including network security, secure
              access, threat defense, VPNs, firewall technologies, and
              automation.
            </p>
            <p>
              The program emphasizes practical configuration, monitoring, and
              troubleshooting using real-world scenarios to develop the skills
              and confidence needed for success in both CCNP Security and CCIE
              Security paths.
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
                <p>Network Security Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Identity Services Implementation</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Firewall Deployment Technologies</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Threat Detection Techniques</span>
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
              "Network Security Engineer",
              "Cybersecurity Engineer",
              "Security Operations Analyst",
              "Security Consultant",
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
        bgPosition="90%"
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
