import Button from "../../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import ccnaBadge from "../../../../../assets/CCNPSecurity.png";
import ccnaHero from "../../../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../../../assets/Meal.svg";
import ReviewIcon from "../../../../../assets/Review.svg";
import InstitutionalIcon from "../../../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../../../assets/Workstation.svg";
import MedalIcon from "../../../../../assets/Medal.svg";
import CourseModules from "../../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function SDSI() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
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

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CCNP"
        title="300-745-SDSI-v1.1"
        description="Designing Cisco Security Infrastructure (300-745 SDSI) v1.0 is a
              90-minute CCNP Security exam assessing knowledge of security
              architecture, including infrastructure, applications, risk,
              events, automation, and DevSecOps."
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
              This course prepares learners for the Designing Cisco Security
              Infrastructure (300-745 SDSI) exam through instructor-led training
              with hands-on labs and guided instruction. It covers key topics in
              security architecture, including secure infrastructure,
              applications, risk management, automation, and DevSecOps.
            </p>
            <p>
              The program emphasizes practical exercises and real-world
              scenarios to build the skills and confidence needed for success in
              the CCNP Security certification.
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
                <p>SD-WAN Security Architecture</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Policy Enforcement and Encryption</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Secure Routing and Segmentation</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Centralized Management and Monitoring</span>
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
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-3 lg:w-72 xl:w-80 shrink-0">
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
              "SD-WAN Security Engineer",
              "Network Security Engineer",
              "Secure Network Architect",
              "Security Infrastructure Engineer",
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
