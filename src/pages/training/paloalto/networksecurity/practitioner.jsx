import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoCyberSecurityPractitioner.png";
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import InstitutionalIcon from "../../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../../components/ui/EnrollNowButton";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function PaloaltoPractitioner() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Cybersecurity",
      items: [
        "1.1 Identify the components of the authentication, authorization, and accounting (AAA) framework",
        "1.2 Categorize techniques used by malicious actors as defined by the MITRE ATT&CK framework",
        {
          subTitle:
            "1.3 Explain the concept of Zero Trust and define its key principles",
          items: [
            "1.3.1 Continuous monitoring and validation",
            "1.3.2 Least privilege access enforcement",
            "1.3.3 Breach assumption",
          ],
        },
        "1.4 Identify and describe the characteristics of an advanced persistent threat (APT)",
        {
          subTitle: "1.5 Explain the function of common security technologies",
          items: [
            "1.5.1 Identity Providers (IdP), identity and access management (IAM), and multi-factor authentication (MFA)",
            "1.5.2 Mobile device management (MDM) and mobile application management (MAM)",
            "1.5.3 Secure email gateways and integrated cloud email security",
          ],
        },
      ],
    },
    {
      title: "2.0 Network Security",
      items: [
        "2.1 Describe key characteristics of Zero Trust Network Access (ZTNA)",
        "2.2 Explain the function of stateless firewalls and next-generation firewalls (NGFWs)",
        "2.3 Explain the purpose of microsegmentation",
        {
          subTitle:
            "2.4 Explain the purpose and function of common network security technologies",
          items: [
            "2.4.1 Intrusion prevention system (IPS)",
            "2.4.2 URL filtering",
            "2.4.3 DNS Security",
            "2.4.4 VPN",
            "2.4.5 SSL/TLS Decryption (outbound / forward proxy)",
          ],
        },
        "2.5 Explain the limitations of signature-based network protection",
        "2.6 Identify and describe the deployment options for NGFWs for networks operating on both bare metal and virtualized architectures",
        "2.7 Identify and describe cybersecurity concerns unique to Operation Technology (OT) and internet of things (IoT) devices",
        "2.8 Identify and describe Palo Alto Networks Cloud-Delivered Security Services (CDSS)",
        "2.9 Explain the security function of Precision AI",
      ],
    },
    {
      title: "3.0 Secure Access",
      items: [
        "3.1 Define and explain Secure Access Service Edge (SASE) and differentiate from Secure Service Edge (SSE)",
        {
          subTitle:
            "3.2 Identify challenges related to confidentiality, integrity, and availability of information and applications",
          items: [
            "3.2.1 Data and information",
            "3.2.2 Private applications",
            "3.2.3 Software-as-a-Service (SaaS) applications",
            "3.2.4 Artificial Intelligence (AI) applications, tools, and platforms",
          ],
        },
        {
          subTitle: "3.3 Explain the security function of common technologies",
          items: [
            "3.3.1 Secure Web Gateway",
            "3.3.2 Enterprise Browser",
            "3.3.3 Remote Browser Isolation",
            "3.3.4 Data loss prevention (DLP)",
            "3.3.5 Cloud Access Security Broker (CASB)",
          ],
        },
        "3.4 Describe the purpose of Software-Defined Wide Area Networking (SD-WAN) solutions",
        {
          subTitle: "3.5 Describe Prisma SASE solutions",
          items: [
            "3.5.1 Prisma Access",
            "3.5.2 Prisma SD-WAN",
            "3.5.3 Prisma Access Browser",
            "3.5.4 Enterprise DLP",
            "3.5.5 AI Access",
            "3.5.6 Prisma AIRS",
          ],
        },
      ],
    },
    {
      title: "4.0 Cloud Security",
      items: [
        "4.1 Identify and describe major cloud architectures and topologies",
        {
          subTitle:
            "4.2 Identify and describe major challenges related to cloud security",
          items: [
            "4.2.1 Application Security",
            "4.2.2 Cloud Posture Security",
            "4.2.3 Cloud Runtime Security",
          ],
        },
        "4.3 Identify and describe technologies used to secure cloud environments (e.g. CSPM, CWPP)",
        "4.4 Identify and describe the functions of a Cloud Native Application Protection Platform (CNAPP)",
        "4.5 Explain the features and functionality of Cortex Cloud",
      ],
    },
    {
      title: "5.0 Endpoint Security",
      items: [
        "5.1 Identify and explain Indicators of Compromise (IOCs)",
        "5.2 Explain the limitations of signature-based anti-malware software",
        "5.3 Explain the concept of User and Entity Behavior Analytics (UEBA)",
        "5.4 Explain endpoint detection and response (EDR) and extended detection and response (XDR)",
        "5.5 Explain Behavioral Threat Prevention",
        {
          subTitle:
            "5.6 Identify and describe cybersecurity threats mitigated by the following endpoint security technologies",
          items: [
            "5.6.1 Host-based Firewall and Host-based Intrusion Prevention Systems (HIPS)",
            "5.6.2 Device Control and USB Control",
            "5.6.3 Application Control",
            "5.6.4 Disk Encryption",
            "5.6.5 Patch Management",
          ],
        },
        "5.7 Explain the features and functionality of Cortex XDR",
      ],
    },
    {
      title: "6.0 Security Operations",
      items: [
        "6.1 Identify and describe key characteristics of threat hunting",
        "6.2 Explain the process and outcomes of incident response",
        "6.3 Explain the functions of a security information and event management (SIEM) platform",
        "6.4 Explain the functions of security orchestration, automation, and response (SOAR)",
        "6.5 Explain the function of an Attack Surface Management (ASM) platform",
        {
          subTitle:
            "6.6 Explain the features and functionality of Cortex solutions",
          items: ["6.6.1 XSOAR", "6.6.2 Xpanse", "6.6.3 XSIAM"],
        },
        "6.7 Identify and describe the services provided by Unit 42",
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
            Palo Alto
          </h6>

          {/* ====== Course Title and Description ======*/}
          <div>
            {/* Course title */}
            <h1 className="text-[#1775EE] font-bold">
              Cybersecurity Practitioner
            </h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              The Palo Alto Networks Certified Cybersecurity Practitioner exam
              validates a candidate’s knowledge and practical understanding of
              cybersecurity principles, including network security, secure
              access, endpoint protection, cloud security, security operations,
              and the application of Palo Alto Networks solutions.
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
              This course prepares learners for the Palo Alto Networks Certified
              Cybersecurity Practitioner exam through structured instruction and
              guided learning activities. It covers key areas such as
              cybersecurity principles, network security, secure access,
              endpoint security, cloud security, and security operations.
            </p>
            <p>
              The program builds practical understanding to support exam
              success, while exam guidelines should be used alongside additional
              study resources for thorough preparation.
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
                <p>Advanced Threat Prevention Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Security Policy Implementation Principles</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Next-Generation Firewall Technologies</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Cloud Security Architecture Fundamentals</span>
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
              className="w-60 h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Cybersecurity Analyst",
              "Network Security Engineer",
              "Security Operations Engineer",
              "Cloud Security Engineer",
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
              Download the Palo Alto Exam Basics here
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
