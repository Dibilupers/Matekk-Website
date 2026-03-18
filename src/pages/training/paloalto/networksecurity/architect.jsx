import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoNetworkSecurityArchitect.png";
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
export default function NetworkSecurityArchitect() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Zero Trust Enterprise",
      items: [
        "1.1 Design User-ID and device health, host information profile (HIP) and security posture, and Device-ID based least privilege access Security policy controls",
        "1.2 Design and differentiate between network segmentation and microsegmentation",
        "1.3 Differentiate access to specific applications",
        "1.4 Implement continuous security scanning of allowed traffic to stop malware and exploits",
        "1.5 Implement continuous monitoring and analytics of zero trust environment",
      ],
    },
    {
      title: "2.0 AI Security",
      items: [
        {
          subTitle:
            "2.1 Differentiate between and explain the specific Palo Alto Networks products that make up Prisma AI Runtime Security (AIRS) and AI Access",
          items: [
            "2.1.1 Prisma AIRS – AI red teaming, AI model scanning, AI runtime security, AI security, AI agents",
            "2.1.2 Prisma AIRS – Kubernetes integration / microsegmentation",
            "2.1.3 AI Access – App-ID Cloud Engine, Advanced Threat Prevention, Advanced URL Filtering, Enterprise DLP",
          ],
        },
        {
          subTitle:
            "2.2 Determine recommended standard architectures for AI security",
          items: [
            "2.2.1 AI products that solve specific AI architectures",
            "2.2.2 AIRS form factors",
            "2.2.3 AI security content and data security",
          ],
        },
        {
          subTitle:
            "2.3 Identify and explain the classification and attributes of AI applications and apply security controls",
          items: [
            "2.3.1 Application sanctioning and controls of sanctioned applications, including data loss prevention (DLP)",
            "2.3.2 AI applications and security frameworks (i.e., GDPR, NIST, EU Data Act, PCI DSS, HIPAA)",
          ],
        },
      ],
    },
    {
      title: "3.0 Centralized Management and IAM",
      items: [
        {
          subTitle: "3.1 Architect Panorama and log collectors",
          items: [
            "3.1.1 Panorama high availability (HA)",
            "3.1.2 Log collection resilience and redundancy",
          ],
        },
        "3.2 Architect Strata Cloud Manager (SCM), Strata Logging Service, and Cloud Identity Engine",
        {
          subTitle:
            "3.3 Recommend Cloud Identity Engine directory sync options",
          items: [
            "3.3.1 On-premises agent",
            "3.3.2 Cloud Directory / SAML 2.0, including Entra ID and Okta",
          ],
        },
        "3.4 Recommend Strata Logging Service log forwarding methods and integrations (e.g., syslog over TLS, HTTP, email)",
        "3.5 Recommend User identification and authentication methods (e.g., Cloud Identity Engine, CAS for SAML)",
        {
          subTitle: "3.6 Evaluate Cloud Identity Engine use cases",
          items: ["3.6.1 NGFW", "3.6.2 Prisma Access", "3.6.3 Prisma SD-WAN"],
        },
      ],
    },
    {
      title: "4.0 SSE Private Application Access",
      items: [
        "4.1 Architect Prisma Access in regional and global deployments",
        {
          subTitle:
            "4.2 Differentiate between on-ramp and off-ramp architectures",
          items: [
            "4.2.1 Service connection routing modes (default and hot-potato) and failover modes",
            "4.2.2 Zero Trust Network Access (ZTNA) Connectors (e.g., FQDN, wildcard, IP subnet, Connector IP Blocks, CSP scalability)",
            "4.2.3 Colo-Connect and Google Cloud Network Connectivity Center (NCC)",
          ],
        },
        "4.3 Determine private application access through Prisma Browser",
      ],
    },
    {
      title: "5.0 Mobile User Security",
      items: [
        "5.1 Evaluate Prisma Browser, Prisma Access Agent, explicit proxy, and GlobalProtect use cases",
        "5.2 Architect GlobalProtect connection methods: On-demand, User-logon (Always On), Pre-logon (Always On)",
        "5.3 Architect Prisma Access Mobile Users",
        "5.4 Design AI-Powered Autonomous Digital Experience Manager (ADEM)",
      ],
    },
    {
      title: "6.0 Modernizing Branches",
      items: [
        {
          subTitle:
            "6.1 Compare and design branch architectures for SASE security and HA",
          items: [
            "6.1.1 Prisma Access remote networks",
            "6.1.2 Prisma SD-WAN",
            "6.1.3 PAN-OS SD-WAN",
            "6.1.4 ADEM",
            "6.1.5 Third-party edge / SD-WAN",
          ],
        },
        {
          subTitle: "6.2 Evaluate advanced security for Prisma SD-WAN",
          items: ["6.2.1 App-ID, Device-ID, User-ID", "6.2.2 Threat, URL, DNS"],
        },
      ],
    },
    {
      title: "7.0 Data Security",
      items: [
        {
          subTitle:
            "7.1 Differentiate between SaaS Security Inline and SaaS API Security",
          items: [
            "7.1.1 In-motion (inline)",
            "7.1.2 At-rest (API)",
            "7.1.3 SaaS Security Posture Management (SSPM)",
            "7.1.4 Enterprise DLP and advanced web filtering",
          ],
        },
        "7.2 Determine the most secure approach for SaaS application usage control",
        {
          subTitle: "7.3 Analyze and architect to Enterprise DLP functionality",
          items: [
            "7.3.1 Classifiers",
            "7.3.2 Traditional / Regex",
            "7.3.3 Exact Data Matching (EDM), Indexed Document Matching (IDM), Optical Character Recognition (OCR)",
            "7.3.4 Machine learning (ML) classification",
            "7.3.5 Endpoint DLP",
            "7.3.6 Policy-based DLP",
          ],
        },
      ],
    },
    {
      title: "8.0 Securing IoT Environments",
      items: [
        {
          subTitle: "8.1 Architect Device Security",
          items: [
            "8.1.1 Visibility / discovery and risk assessment",
            "8.1.2 Enforcement",
          ],
        },
        "8.2 Differentiate between IoT sensor placement options",
        "8.3 Explain visibility functionality (e.g., NGFW, virtual metadata collector, Prisma SD-WAN, PAN-OS SD-WAN)",
        "8.4 Evaluate and design to Device-ID capabilities",
        "8.5 Confirm and design to Device Security capabilities",
      ],
    },
    {
      title: "9.0 Public Cloud",
      items: [
        "9.1 Explain NGFW standard integrations, including AWS, Azure, GCP, and OCI",
        {
          subTitle:
            "9.2 Design for maintenance and security across CSP environments",
          items: [
            "9.2.1 Maintenance and OS upgrade process",
            "9.2.2 VPN termination",
            "9.2.3 SSL decryption",
            "9.2.4 Centralized / decentralized architectures",
          ],
        },
        {
          subTitle: "9.3 Design to AWS NGFW standards",
          items: [
            "9.3.1 Insertion options, AWS Gateway Load Balancer (GWLB), Transit Gateway Connect",
            "9.3.2 HA and high resilience",
            "9.3.3 NGFW subinterfaces",
          ],
        },
        {
          subTitle: "9.4 Design to Azure NGFW standards",
          items: [
            "9.4.1 Insertion options and load balancer",
            "9.4.2 HA and high resilience",
          ],
        },
        {
          subTitle: "9.5 Design to GCP NGFW standards",
          items: [
            "9.5.1 Insertion options and load balancer",
            "9.5.2 HA and high resilience",
          ],
        },
        {
          subTitle: "9.6 Justify VM-Series and Cloud NGFW solutions",
          items: ["9.6.1 Cloud NGFW use cases", "9.6.2 VM-Series use cases"],
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Palo Alto"
        title="Network Security Architect"
        description="The Palo Alto Networks Certified Network Security Architect exam
              validates the skills required to design secure, scalable, and
              highly available systems using Palo Alto Networks solutions and to
              oversee complex security architectures based on industry
              frameworks."
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
              Network Security Architect certification through guided
              instruction and hands-on activities. It focuses on designing
              secure, highly available, and scalable systems using Palo Alto
              Networks solutions and overseeing complex security architectures
              aligned with industry frameworks.
            </p>
            <p>
              The program develops practical expertise in architecting advanced
              network security solutions, while exam guidelines provide a
              reference and should be supplemented with additional study
              resources.
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
                <p>Security Architecture Design Principles</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Cloud and Hybrid Security Architecture</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Security Policy Design and Governance</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>High Availability and Scalable Security Design</span>
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
              "Enterprise Security Architect",
              "Cloud Security Architect",
              "Security Solutions Architect",
              "Solutions Delivery Specialist",
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
