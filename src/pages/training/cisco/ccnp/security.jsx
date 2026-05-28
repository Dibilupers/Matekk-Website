// ==================== IMPORTS ====================
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ccnaBadge from "../../../../assets/CCNPSecurity.png";
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.webp";
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.webp";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT ====================
export default function CCNPSecurity() {
  const [activeTab, setActiveTab] = useState("SCOR");

  // ==================== SCOR MODULES ====================
  const scorModules = [
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

  // ==================== SDSI MODULES ====================
  const sdsiModules = [
    {
      title: "1.0 Secure Infrastructure",
      items: [
        {
          subTitle:
            "1.1 Select the security approaches to protect against threats",
          items: [
            "1.1.a Endpoint and client devices (on-network, off-network, and remote)",
            "1.1.b Identity such as MFA, passwordless, continuous trust, and identity intelligence",
            "1.1.c Email (phishing, ransomware, business email compromise, malware, and spoofing)",
          ],
        },
        {
          subTitle:
            "1.2 Modify the security architecture to address technical requirements",
          items: [
            "1.2.a Hybrid workers",
            "1.2.b IoT",
            "1.2.c SaaS",
            "1.2.d Applications across data center and multi-cloud",
          ],
        },
        "1.3 Select a VPN and tunneling solution such as SD-WAN, IPsec, MPLS, GRE, DMVPN, and public cloud tunnel options based on business and technical requirements",
        "1.4 Select the approach to secure the infrastructure management and control planes",
        "1.5 Select the firewall feature or architecture such as traditional firewall, Nextgen firewall, Web Application Firewall, IPS/IDS, distributed firewall, eBPF, and host-based firewall given business and technical requirements",
      ],
    },
    {
      title: "2.0 Applications",
      items: [
        "2.1 Select the security solution such as firewalls, SSL offloading, SSL decryption, DLP, and endpoint based on application and flow data, to protect an application",
        "2.2 Select the design for cloud-native applications, microservices, containers, and serverless architectures to ensure segmentation/microsegmentation",
        "2.3 Describe the design policies to address the impacts of emerging technologies such as generative AI, machine learning, and quantum computing",
      ],
    },
    {
      title: "3.0 Risk, Events, and Requirements",
      items: [
        "3.1 Describe how the SOC leverages incident handling and incident response tools",
        "3.2 Modify a design to mitigate risk",
        "3.3 Modify a security design following an incident",
        "3.4 Describe the use of frameworks such as MITRE CAPEC, NIST SP 800-37, and SAFE in the lifecycle of a security design",
        "3.5 Match the regulatory and industry compliance document to a given business or technical scenario",
      ],
    },
    {
      title: "4.0 Artificial Intelligence, Automation, and DevSecOps",
      items: [
        "4.1 Describe the functions, uses, and role of AI in securing network infrastructure",
        "4.2 Select the feature or element required to support automated security architecture/infrastructure such as API tooling, Infrastructure as Code, monitoring, container scanning, security telemetry, alerting, and SOAR",
        "4.3 Select the next step in workflows and pipelines to be implemented by DevSecOps engineers to minimize risk from automated deployments",
      ],
    },
  ];

  // ==================== SNCF MODULES ====================
  const sncfModules = [
    {
      title: "1.0 Deployment",
      items: [
        {
          subTitle: "1.1 Implement Secure Firewall modes",
          items: ["1.1.a Routed mode", "1.1.b Transparent mode"],
        },
        {
          subTitle: "1.2 Implement NGIPS modes",
          items: ["1.2.a Passive", "1.2.b Inline"],
        },
        {
          subTitle: "1.3 Implement high availability options",
          items: [
            "1.3.a Port channels",
            "1.3.b Failover",
            "1.3.c Equal-Cost Multipath (ECMP) routing",
            "1.3.d Static route tracking",
            "1.3.e Clustering",
          ],
        },
        "1.4 Describe virtual appliance on-premises and cloud deployment",
      ],
    },
    {
      title: "2.0 Configuration",
      items: [
        "2.1 Configure system settings in Secure Firewall Management Center",
        {
          subTitle:
            "2.2 Configure policies in Secure Firewall Management Center",
          items: [
            "2.2.a Access control",
            "2.2.b Intrusion",
            "2.2.c Malware & File",
            "2.2.d DNS",
            "2.2.e Identity",
            "2.2.f Decryption",
            "2.2.g Prefilter",
          ],
        },
        {
          subTitle:
            "2.3 Configure these features using Secure Firewall Management Center",
          items: [
            "2.3.a Network discovery",
            "2.3.b Application detectors",
            "2.3.c Correlation",
            "2.3.d Encrypted visibility engine",
          ],
        },
        {
          subTitle:
            "2.4 Configure objects using Secure Firewall Management Center",
          items: ["2.4.a Object management", "2.4.b Intrusion rules"],
        },
        {
          subTitle:
            "2.5 Configure devices using Secure Firewall Management Center",
          items: [
            "2.5.a Device management",
            "2.5.b NAT",
            "2.5.c VPN",
            "2.5.d QoS",
            "2.5.e Platform settings",
            "2.5.f Certificates",
            "2.5.g Routing",
          ],
        },
        "2.6 Describe the use of Snort within Secure Firewall Threat Defense",
      ],
    },
    {
      title: "3.0 Management and Troubleshooting",
      items: [
        "3.1 Troubleshoot with Secure Firewall Management Center GUI and device CLI",
        "3.2 Configure dashboards and reporting in Secure Firewall Management Center",
        {
          subTitle: "3.3 Troubleshoot using:",
          items: ["3.3.a Packet capture procedures", "3.3.b Packet Tracer"],
        },
        "3.4 Analyze risk and standard reports",
        {
          subTitle: "3.5 Describe management options",
          items: [
            "3.5.a Cisco Defense Orchestrator",
            "3.5.b Cloud-delivered Firewall Management Center",
            "3.5.c Secure Firewall Device Manager",
            "3.5.d Secure Firewall Management Center",
          ],
        },
      ],
    },
    {
      title: "4.0 Integration",
      items: [
        "4.1 Configure Cisco Secure Firewall Malware Defense (formerly AMP for Networks) in Secure Firewall Management Center",
        "4.2 Configure Cisco Secure Endpoint (formerly AMP for Endpoints) integration with Secure Firewall Management Center",
        "4.3 Implement Threat Intelligence Director for third-party security intelligence feeds",
        "4.4 Describe using Cisco SecureX for security investigations",
        "4.5 Describe Secure Firewall Management Center integration using pxGrid",
        "4.6 Describe Rapid Threat Containment (RTC) functionality within Secure Firewall Management Center",
        "4.7 Describe Cisco Security Analytics and Logging",
      ],
    },
  ];

  // ==================== TAB DATA ====================
  const tabData = {
    SCOR: {
      label: "CCNP Security (SCOR)",
      examCode: "350-701",
      duration: "120 minutes",
      description:
        "Implementing and Operating Cisco Security Solutions (350-701 SCOR) v1.1 is a 120-minute exam that assesses a candidate's knowledge of network security, secure access, threat defense, VPNs, firewall technologies, and automation using Cisco platforms. This is the required core exam for both the CCNP Security and CCIE Security certifications.",
      about:
        "This course prepares learners for the Implementing and Operating Cisco Security Solutions (350-701 SCOR) exam through instructor-led training with hands-on labs and guided instruction. It covers core security topics, including network security, secure access, threat defense, VPNs, firewall technologies, and automation. The program emphasizes practical configuration, monitoring, and troubleshooting using real-world scenarios to develop the skills and confidence needed for success in both CCNP Security and CCIE Security paths.",
      learn: [
        "Network Security Concepts",
        "Identity Services Implementation",
        "Firewall Deployment Technologies",
        "Threat Detection Techniques",
      ],
      jobOpportunities: [
        "Network Security Engineer",
        "Cybersecurity Engineer",
        "Security Operations Analyst",
        "Security Consultant",
      ],
      modules: scorModules,
      downloadLabel: "Download the SCOR Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/350-701-SCOR-v2.0.pdf",
    },
    SDSI: {
      label: "300-745 SDSI v1.1",
      examCode: "300-745",
      duration: "90 minutes",
      description:
        "Designing Cisco Security Infrastructure (300-745 SDSI) v1.0 is a 90-minute CCNP Security concentration exam assessing knowledge of security architecture, including infrastructure, applications, risk, events, automation, and DevSecOps.",
      about:
        "This course prepares learners for the Designing Cisco Security Infrastructure (300-745 SDSI) exam through instructor-led training with hands-on labs and guided instruction. It covers key topics in security architecture, including secure infrastructure, applications, risk management, automation, and DevSecOps. The program emphasizes practical exercises and real-world scenarios to build the skills and confidence needed for success in the CCNP Security certification.",
      learn: [
        "SD-WAN Security Architecture",
        "Policy Enforcement and Encryption",
        "Secure Routing and Segmentation",
        "Centralized Management and Monitoring",
      ],
      jobOpportunities: [
        "SD-WAN Security Engineer",
        "Network Security Engineer",
        "Secure Network Architect",
        "Security Infrastructure Engineer",
      ],
      modules: sdsiModules,
      downloadLabel: "Download the SDSI Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/300-745-SDSI-v1.0-Public.pdf",
    },
    SNCF: {
      label: "300-710 SNCF v1.1",
      examCode: "300-710",
      duration: "90 minutes",
      description:
        "Securing Networks with Cisco Firewalls (300-710 SNCF) v1.1 is a 90-minute CCNP Security concentration exam that tests skills in configuring, deploying, managing, and troubleshooting Cisco Secure Firewall and Firewall Management Center.",
      about:
        "This course prepares learners for the Securing Networks with Cisco Firewalls (300-710 SNCF) exam through instructor-led training with hands-on labs and guided instruction. It covers core topics related to Cisco Secure Firewall and Cisco Secure Firewall Management Center, including policy configuration, deployment, integration, management, and troubleshooting. The program emphasizes practical configuration, monitoring, and troubleshooting using real-world scenarios to build the skills and confidence needed for success in the CCNP Security certification path.",
      learn: [
        "Firewall Deployment Concepts",
        "Firewall Management and Monitoring",
        "VPN and Secure Connectivity Principles",
        "Firewall Policy and Access Control Basics",
      ],
      jobOpportunities: [
        "Network Security Engineer",
        "Firewall Administrator",
        "Security Operations Engineer",
        "Cybersecurity Consultant",
      ],
      modules: sncfModules,
      downloadLabel: "Download the SNCF Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/300-710-SNCF-v1.2.pdf",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ==================== */}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNP Security"
        description="The CCNP Security certification validates advanced skills in network security, threat defense, firewall technologies, and security architecture. This course covers the core exam (SCOR) plus two concentration exams — SDSI and SNCF — all included in one comprehensive program. Choose a track below to explore its exam details and course content."
      />

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE: Contents/Information ==================== */}
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
          {/* ==================== ABOUT SECTION ==================== */}
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p>{active.about}</p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ==================== */}
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
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <CourseModules modules={active.modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className="aside_contents">
          {/* ==================== CERT BADGE ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            <img
              src={ccnaBadge}
              alt="CCNP Security Certification Badge"
              className="w-55 h-55 lg:w-100 lg:h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Job Opportunities</h5>
            {active.jobOpportunities.map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Target Learners</h5>
            {[
              "Experienced IT professionals",
              "Mid-to-senior-level IT",
              "Network Consultants",
              "Network Engineers",
            ].map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ==================== */}
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

          {/* ==================== INCLUSIONS ==================== */}
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
              className="text-sm font-medium underline mt-2"
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
        description="Advance your security career and prepare for the CCNP Security certification."
      />
    </main>
  );
}
