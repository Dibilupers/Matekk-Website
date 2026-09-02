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
        "1.1 Explain attack threats against on-premises, hybrid, and cloud environments such as viruses, trojans, DoS/DDoS, phishing, rootkits, man-in-the middle, malware, data breaches, insecure APIs, compromised credentials, PQC, and AI",
        "1.2 Describe security vulnerabilities and exploits such as software bugs, weak and/or hardcoded passwords, OWASP top ten, missing encryption ciphers, buffer overflow, path traversal, cross-site scripting/forgery, SQL injection, and identification and prioritization using CVEs and CVSS scores",
        "1.3 Describe vulnerabilities in AI/LLM models such as prompt injection, system prompt leakage, vector and embedding weaknesses, and supply chain",
        "1.4 Describe the controls used to protect against phishing and social engineering attacks",
        "1.5 Describe cryptography security components such as hashing, encryption, PKI, SSL, TLS, QUIC, MASQUE, IPsec, NAT-T IPv4 for IPsec, preshared key, certificate-based authorization, and post-quantum cryptography",
        "1.6 Describe site-to-site and remote access VPN deployment types such as virtual tunnel interfaces, standards-based IPsec, SSL VPN, DMVPN, FlexVPN, and GETVPN",
        "1.7 Describe security intelligence authoring, sharing, and consumption",
        "1.8 Describe zero trust architecture",
        "1.9 Describe defense in depth strategy such as Secure Architecture for Everyone (SAFE)",
        "1.10 Interpret scripts used to call security appliances APIs in a language such as Python",
      ],
    },
    {
      title: "2.0 Network Security",
      items: [
        "2.1 Describe network security solutions and deployment models that provide intrusion prevention and firewall capabilities",
        "2.2 Describe security monitoring and telemetry technologies",
        "2.3 Configure network infrastructure security methods (network segmentation using VLANs or SGTs; Layer 2 and port security; DHCP snooping; Dynamic ARP inspection; storm control; and defenses against MAC, ARP, VLAN hopping, STP, and DHCP rogue attacks)",
        "2.4 Select management options for network security solutions (single vs. multidevice manager, in-band vs. out-of-band, on-premises vs. cloud with Cisco Security Cloud Control)",
        "2.5 Describe CIS benchmarks for hardening devices such as Cisco Secure Firewall (FTD) and Cisco IOS XE",
        "2.6 Troubleshoot AAA for device and network access such as TACACS+ and RADIUS",
        "2.7 Configure secure network management of perimeter security and infrastructure devices such as SNMPv3, NetConf, RestConf, APIs, secure syslog, and NTP with authentication",
        "2.8 Implement access control policies, AVC, URL filtering, malware protection, and intrusion prevention using Cisco Secure Firewall (FTD)",
        "2.9 Configure site-to-site and remote access VPN using Cisco Secure Firewall (FTD) and Cisco Secure Client",
        "2.10 Troubleshoot VPN tunnel establishment on Cisco Secure Firewall (FTD)",
      ],
    },
    {
      title: "3.0 Cloud Security",
      items: [
        "3.1 Describe security responsibility within common Cloud Shared Responsibility Models",
        "3.2 Select security capabilities, deployment models, cloud security frameworks, and policy management to secure the cloud",
        "3.3 Select security solutions for cloud environments (public; private; hybrid; community cloud; NIST 800-145 SaaS, PaaS, and IaaS; and Cloud Access Security Broker)",
        "3.4 Describe network, application, and data security in cloud environments with solutions such as Cisco Multicloud Defense and Cisco Secure Workload",
        "3.5 Configure Splunk to ingest cloud logging and monitoring data from other security solutions",
        "3.6 Describe application and workload security concepts including eBPF",
        "3.7 Describe DevSecOps (Infrastructure as Code security, CI/CD pipeline, container orchestration, and secure software development)",
      ],
    },
    {
      title: "4.0 Secure Service Edge",
      items: [
        "4.1 Describe Security Service Edge (SSE) and Secure Access Service Edge (SASE)",
        "4.2 Configure Cisco Secure Access Secure Internet Access",
        "4.3 Configure Cisco Secure Access Secure Private Access",
        "4.4 Configure data loss prevention and AI guardrails for secure internet access",
        "4.5 Interpret Cisco Secure Access Investigate scores and indicators",
      ],
    },
    {
      title: "5.0 Endpoint Protection and Detection",
      items: [
        "5.1 Describe Endpoint Protection Platforms (EPP) and Endpoint Detection and Response (EDR) solutions",
        "5.2 Describe endpoint device management and asset inventory systems such as MDM",
        "5.3 Describe endpoint posture assessment solutions to ensure endpoint security",
        "5.4 Describe endpoint protection and detection security with solutions such as Cisco Secure Client and Cisco Secure Malware Analytics",
        "5.5 Configure endpoint antimalware protection using Cisco Secure Endpoint",
        "5.6 Interpret Cisco Secure Endpoint malware detection events",
        "5.7 Configure email security features with Cisco Security Email Threat Defense",
      ],
    },
    {
      title: "6.0 Network Access, Visibility, and Enforcement",
      items: [
        "6.1 Describe identity management and secure network access concepts such as guest services, profiling, posture assessment, and BYOD",
        "6.2 Describe device compliance and application control",
        "6.3 Configure network access control mechanisms such as 802.1X and MAB with Cisco Identity Services Engine",
        "6.4 Configure network access with CoA",
        "6.5 Explain exfiltration techniques such as DNS tunneling, HTTPS, email, FTP/SSH/SCP/SFTP, ICMP, Messenger, IRC, NTP, and cloud storage",
        "6.6 Describe network visibility and enforcement using telemetry and native AI/ML capabilities with XDR and SIEM/SOAR platforms such as Splunk and Cisco XDR",
        "6.7 Describe Cisco Duo in a zero-trust security architecture (Trust Monitor, MFA, Device Trust, health checks, Adaptive Access policies, SSO, and CII)",
        "6.8 Describe managing, orchestrating, and automating security information and events with Splunk",
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
        "2.2 Configure security policies such as access control, DNS, identity, and network analysis policy in Secure Firewall Management Center",
        {
          subTitle:
            "2.3 Configure these features using Secure Firewall Management Center",
          items: [
            "2.3.a Network discovery",
            "2.3.b Application detectors",
            "2.3.c Correlation",
            "2.3.d Encrypted Visibility Engine",
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
            "2.5.a Device management such as certificates, platform setting, and health policy",
            "2.5.b Network settings such as NAT, QoS, and routing",
            "2.5.c Secure access such as zero trust network access, and VPN",
          ],
        },
        "2.6 Describe Snort within Secure Firewall Threat Defense",
      ],
    },
    {
      title: "3.0 Management and Troubleshooting",
      items: [
        "3.1 Troubleshoot with Secure Firewall Management Center GUI and device CLI",
        "3.2 Configure dashboards and reporting in Secure Firewall Management Center",
        {
          subTitle: "3.3 Troubleshoot Firewall Threat Defense using tools:",
          items: [
            "3.3.a Packet capture procedures",
            "3.3.b Packet Tracer",
            "3.3.c Firewall engine debug",
            "3.3.d System Support Trace",
          ],
        },
        "3.4 Analyze risk and standard reports such as events (connection, discovery, intrusion, malware, and unified) and network map",
        {
          subTitle: "3.5 Describe device management tools",
          items: [
            "3.5.a Cisco Security Cloud Control Firewall Management (formerly Cloud-delivered Firewall Management Center)",
            "3.5.b Secure Firewall Device Manager",
            "3.5.c Secure Firewall Management Center",
          ],
        },
      ],
    },
    {
      title: "4.0 Integration",
      items: [
        "4.1 Configure Cisco Secure Firewall Malware Defense in Secure Firewall Management Center",
        "4.2 Configure Cisco Secure Endpoint integration with Secure Firewall Management Center",
        "4.3 Implement Threat Intelligence Director for third-party security intelligence feeds",
        "4.4 Describe using Cisco XDR for security investigations",
        "4.5 Describe Secure Firewall Management Center integration using pxGrid",
        "4.6 Describe Rapid Threat Containment (RTC) functionality within Secure Firewall Management Center",
        "4.7 Describe Cisco Security Analytics and Logging",
        "4.8 Describe Splunk integration and AI-driven threat intelligence",
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
        "The Implementing and Operating Cisco Security Core Technologies (350-701 SCOR) v2.0 is a 120-minute exam that assesses a candidate's knowledge of implementing and operating core security technologies. Passing this exam earns the Cisco Certified Specialist - Security Core certification and satisfies the core exam requirement for both the CCNP Security and CCIE Security certifications.",
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
        "This course prepares learners for the Implementing and Operating Cisco Security Core Technologies (350-701 SCOR) v2.0 exam through instructor-led training with hands-on labs and guided instruction. It covers key topics in core security technologies, including network security, secure access, threat defense, VPNs, firewall technologies, and security automation. The program emphasizes practical exercises and real-world scenarios to build the skills and confidence needed for success in the Cisco Certified Network Professional (CCNP) Security and Cisco Certified Internetwork Expert (CCIE) Security certification core exam.",
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
        "The Securing Networks with Cisco Firewalls (300-710 SNCF) v1.2 is a 90-minute exam that assesses a candidate's knowledge of Cisco Secure Firewall and Cisco Secure Firewall Management Center. The exam covers skills in configuring, deploying, managing, and troubleshooting Cisco Secure Firewall technologies. Passing this exam earns the Cisco Certified Specialist - Network Security Firewalls certification and satisfies the concentration exam requirement for the CCNP Security certification.",
      about:
        "This course prepares learners for the Securing Networks with Cisco Firewalls (300-710 SNCF) v1.2 exam through instructor-led training with hands-on labs and guided instruction. It covers key topics related to Cisco Secure Firewall and Cisco Secure Firewall Management Center, including policy configuration, deployment, integration, management, monitoring, and troubleshooting. The program emphasizes practical configuration and real-world scenarios to build the skills and confidence needed for success in the Cisco Certified Network Professional (CCNP) Security certification concentration exam.",
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
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
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
