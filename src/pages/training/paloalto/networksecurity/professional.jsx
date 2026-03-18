import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoProfessional.png";
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NetworkSecurityProfessional() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Cybersecurity",
      items: [
        "1.1 Identify and describe vulnerabilities and exploits",
        {
          subTitle:
            "1.2 Identify and describe the stages of the cyber attack lifecycle",
          items: [
            "1.2.1 Reconnaissance",
            "1.2.2 Weaponization and Delivery",
            "1.2.3 Exploitation",
            "1.2.4 Installation",
            "1.2.5 Command-and-Control (C2)",
            "1.2.6 Actions on the Objective",
          ],
        },
        "1.3 Identify and describe common attack types (e.g., malware, insider threat, C2, social engineering, AI-powered)",
        {
          subTitle: "1.4 Identify and describe common threat detection systems",
          items: [
            "1.4.1 Intrusion Detection System (IDS)",
            "1.4.2 Host-Based Intrusion Detection System (HIDS)",
            "1.4.3 Network-Based Intrusion Detection System (NIDS)",
          ],
        },
        "1.5 Identify and describe threat prevention systems and practices (e.g., end user awareness, security updates, antivirus, intrusion prevention systems, firewalls)",
        "1.6 Explain the purpose of a DMZ",
        "1.7 Explain the purpose of Zero Trust",
      ],
    },
    {
      title: "2.0 Network Fundamentals",
      items: [
        {
          subTitle: "2.1 Identify and describe types of area networks",
          items: ["2.1.1 WAN", "2.1.2 LAN", "2.1.3 SD-WAN"],
        },
        "2.2 Explain external (north-south) and internal (east-west) traffic flow patterns for environments",
        "2.3 Explain the function of a default gateway",
        "2.4 Explain the function of NAT, DNS, and DHCP",
        "2.5 Explain routed protocols and routing protocols",
        "2.6 Explain the TCP/IP model and the OSI model",
        "2.7 Identify and describe devices that operate in Layer 1 through Layer 4 of the OSI model",
      ],
    },
    {
      title: "3.0 Network Security",
      items: [
        "3.1 Identify and describe network segmentation methods (e.g., IP subnetting, VLAN)",
        "3.2 Explain the function of stateful firewalls and next-generation firewalls (NGFWs)",
        "3.3 Explain the function of URL filtering",
        "3.4 Explain the function of a VPN",
        "3.5 Explain the function of a proxy",
        {
          subTitle: "3.6 Identify and describe tunneling protocols",
          items: ["3.6.1 SSH", "3.6.2 TLS", "3.6.3 IKE"],
        },
        "3.7 Explain the function of data loss prevention (DLP)",
        "3.8 Explain the function of enterprise browsers",
      ],
    },
    {
      title: "4.0 Endpoint Security",
      items: [
        "4.1 Identify and describe internet of things (IoT) devices and endpoints",
        "4.2 Explain the objectives of endpoint security and network security",
        {
          subTitle: "4.3 Identify and describe endpoint security components",
          items: [
            "4.3.1 Security updates",
            "4.3.2 Antivirus",
            "4.3.3 Host-based firewalls",
          ],
        },
        "4.4 Differentiate between single-factor authentication and multi-factor authentication",
        "4.5 Describe identity and access management (IAM)",
      ],
    },
    {
      title: "5.0 Cloud Security",
      items: [
        "5.1 Identify and describe the four cloud-computing deployment models",
        {
          subTitle: "5.2 Identify and describe common cloud service models",
          items: [
            "5.2.1 Software as a service (SaaS)",
            "5.2.2 Platform as a service (PaaS)",
            "5.2.3 Infrastructure as a service (IaaS)",
            "5.2.4 Network as a service (NaaS)",
          ],
        },
        "5.3 Explain the cloud shared responsibility model",
        "5.4 Explain cloud security and cloud-native security",
        "5.5 Define common cloud terms (e.g., hosted, virtualization, virtual machine, container, microservice, API)",
        "5.6 Explain the cloud native security platform (CNSP)",
        "5.7 Explain the function of continuous integration and continuous delivery / deployment (CI/CD)",
      ],
    },
    {
      title: "6.0 Security Operations",
      items: [
        {
          subTitle: "6.1 Explain security operations functions",
          items: [
            "6.1.1 Identify / detect",
            "6.1.2 Investigate",
            "6.1.3 Mitigate",
            "6.1.4 Improve",
          ],
        },
        "6.2 Identify methods to optimize security operations center (SOC) performance (e.g., automation and AI, collaboration and information sharing, regular security policy updates, security framework alignment)",
        "6.3 Define common security operations terms (e.g., event, alert, SOC, DevSecOps, incident response plan, disaster recovery plan)",
        "6.4 Explain the concepts of false positive alerts and false negative alerts",
        "6.5 Explain the function of syslog",
        "6.6 Explain security orchestration, automation, and response (SOAR) and security information and event management (SIEM)",
        "6.7 Explain AI as it relates to alert analysis",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Palo Alto"
        title="Network Security Professional"
        description="The Palo Alto Networks Certified Network Security Professional
              exam validates knowledge of Palo Alto Networks security solutions,
              including installation, configuration, deployment, and maintenance
              in enterprise environments."
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
              This course prepares learners for the Palo Alto Networks Certified
              Network Security Professional certification through guided
              instruction and hands-on activities. It covers core network
              security solutions, including installation, configuration,
              deployment, and basic maintenance of Palo Alto Networks products.
            </p>
            <p>
              The program develops practical skills and understanding to support
              exam success, with guidelines provided as a reference alongside
              additional study resources.
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
                <p>Advanced Firewall Deployment Strategies</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Threat Intelligence Integration Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Zero Trust Architecture Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Network Security Policy Optimization</span>
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
              alt="Palo Alto Networks Certified Cybersecurity Apprentice Certification Badge"
              className="w-50 h-50 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Senior Network Security Engineer",
              "Security Solutions Architect",
              "Threat Prevention Specialist",
              "Security Infrastructure Manager",
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
              Download the Palo Alto Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Palo Alto Enterprise exam."
      />
    </main>
  );
}
