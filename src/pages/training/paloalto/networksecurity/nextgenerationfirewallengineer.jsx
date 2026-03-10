import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoNextGenFirewallEngineer.png";
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
export default function NextGenerationFirewallEngineer() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 PAN-OS Networking Configuration",
      items: [
        {
          subTitle: "1.1 Configure interface",
          items: [
            "1.1.1 Layer 2",
            "1.1.2 Layer 3",
            "1.1.3 Virtual wire",
            "1.1.4 Tunnel interfaces",
            "1.1.5 Aggregate Ethernet (AE)",
            "1.1.6 Management",
          ],
        },
        "1.2 Configure zones",
        {
          subTitle: "1.3 Configure high availability (HA)",
          items: [
            "1.3.1 Active/active",
            "1.3.2 Active/passive",
            "1.3.3 Link and path monitoring",
          ],
        },
        {
          subTitle: "1.4 Configure routing",
          items: [
            "1.4.1 Dynamic routing protocols",
            "1.4.2 Redistribution and policies",
            "1.4.3 Route monitoring",
            "1.4.4 Advanced Routing Engine",
          ],
        },
        {
          subTitle: "1.5 Configure GlobalProtect",
          items: [
            "1.5.1 Portals",
            "1.5.2 Gateways",
            "1.5.3 Authentication",
            "1.5.4 Split tunneling",
          ],
        },
        {
          subTitle: "1.6 Configure tunnels",
          items: [
            "1.6.1 IPSec",
            "1.6.2 Quantum-resistant cryptography",
            "1.6.3 Generic Routing Encapsulation (GRE)",
          ],
        },
      ],
    },
    {
      title: "2.0 PAN-OS Device Setting Configuration",
      items: [
        "2.1 Implement authentication roles, profiles, and sequences",
        {
          subTitle: "2.2 Configure virtual systems (VSYS)",
          items: [
            "2.2.1 Interfaces and zones",
            "2.2.2 Virtual routers",
            "2.2.3 Logical routers",
            "2.2.4 Inter-VSYS routing and security",
          ],
        },
        {
          subTitle: "2.3 Configure logging",
          items: [
            "2.3.1 Strata Logging Service",
            "2.3.2 Log forwarding",
            "2.3.3 Log collectors and log collector groups",
          ],
        },
        "2.4 Implement PAN-OS software updates",
        {
          subTitle: "2.5 Configure certificates",
          items: [
            "2.5.1 PKI integration",
            "2.5.2 Authentication",
            "2.5.3 SSL/TLS profiles",
            "2.5.4 Decryption (e.g., subordinate CA, forward trust/untrust)",
            "2.5.5 Certificate profiles",
          ],
        },
        {
          subTitle:
            "2.6 Configure on-premises and Cloud Identity Engine User-ID",
          items: [
            "2.6.1 Group mapping and directory sync",
            "2.6.2 User-to-IP mapping and user context",
            "2.6.3 Redistribution and segments",
          ],
        },
        "2.7 Configure web proxy on PAN-OS",
      ],
    },
    {
      title: "3.0 Integration and Automation",
      items: [
        {
          subTitle: "3.1 Install the selected deployment option",
          items: [
            "3.1.1 PA-Series",
            "3.1.2 VM-Series",
            "3.1.3 CN-Series",
            "3.1.4 Cloud NGFW",
            "3.1.5 AI Runtime Security",
          ],
        },
        "3.2 Use APIs to automate deployment",
        "3.3 Manage third-party services to deploy NGFWs (e.g., Kubernetes, hypervisors, CSPs, Terraform, Ansible)",
        {
          subTitle: "3.4 Use on-premises centralized management",
          items: [
            "3.4.1 Panorama",
            "3.4.2 Templates and device groups",
            "3.4.3 Pre- and post-ruleset",
          ],
        },
        "3.5 Build Application Command Center (ACC) dashboards and custom reports",
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
              Next-Generation Firewall Engineer
            </h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              The Palo Alto Networks Certified Next-Generation Firewall Engineer
              exam validates the skills of engineers and administrators in
              firewall deployment, device configuration, integration,
              automation, and centralized management using Panorama, templates,
              and rulesets.
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
              Next-Generation Firewall (NGFW) Engineer certification through
              guided instruction and hands-on activities. It focuses on PAN-OS
              configuration, networking and device settings, object and policy
              creation, integration and automation, and the management and
              operation of next-generation firewalls in secure network
              environments.
            </p>
            <p>
              The program strengthens practical engineering skills to support
              exam readiness, while the exam guidelines help identify covered
              topics and recommended references and should be supplemented with
              additional study resources for comprehensive preparation.
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
                <p>Next-Generation Firewall Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Security Policy Configuration Basics</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Threat Prevention and Detection Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>VPN and Remote Access Fundamentals</span>
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
              "Firewall Engineer",
              "Network Security Engineer",
              "Security Operations Engineer",
              "Cybersecurity Consultant",
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
