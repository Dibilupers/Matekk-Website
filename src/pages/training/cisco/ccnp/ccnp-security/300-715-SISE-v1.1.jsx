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
export default function SISE() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Architecture and Deployment",
      items: [
        "1.1 Configure personas",
        "1.2 Describe deployment options",
        "1.3 Describe hardware and virtual machine performance specifications",
        "1.4 Describe zero-touch provisioning",
      ],
    },
    {
      title: "2.0 Policy and Enforcement",
      items: [
        "2.1 Configure native AD and LDAP",
        {
          subTitle: "2.2 Describe identity store options",
          items: [
            "2.2.a LDAP",
            "2.2.b AD",
            "2.2.c PKI",
            "2.2.d Multifactor authentication",
            "2.2.e Local",
            "2.2.f SAML IDP",
            "2.2.g Rest ID",
          ],
        },
        "2.3 Configure wireless network access using 802.1X",
        {
          subTitle:
            "2.4 Configure wired network access using 802.1X and IBNS 2.0",
          items: [
            "2.4.a Monitor mode",
            "2.4.b Low impact",
            "2.4.c Closed mode",
          ],
        },
        "2.5 Implement MAB",
        "2.6 Configure Cisco TrustSec",
        "2.7 Configure policies including authentication and authorization profiles",
      ],
    },
    {
      title: "3.0 Management and Troubleshooting",
      items: [
        "3.1 Configure web authentication",
        "3.2 Configure guest access services",
        "3.3 Configure sponsor and guest portals",
      ],
    },
    {
      title: "4.0 Profiler",
      items: [
        "4.1 Implement profiler services",
        "4.2 Implement probes",
        "4.3 Implement CoA",
        "4.4 Configure endpoint identity management",
      ],
    },
    {
      title: "5.0 BYOD",
      items: [
        {
          subTitle: "5.1 Describe Cisco BYOD functionality",
          items: [
            "5.1.a Use cases and requirements",
            "5.1.b Solution components",
            "5.1.c BYOD flow",
          ],
        },
        "5.2 Configure BYOD device on-boarding using internal CA with Cisco switches and Cisco wireless LAN controllers",
        "5.3 Configure certificates for BYOD",
        "5.4 Configure block list/allow list",
      ],
    },
    {
      title: "6.0 Endpoint Compliance",
      items: [
        "6.1 Describe endpoint compliance, posture services, and client provisioning",
        "6.2 Configure posture conditions and policy, and client provisioning",
        "6.3 Configure the compliance module",
        "6.4 Configure posture agents and operational modes",
        "6.5 Describe supplicant, supplicant options, authenticator, and server",
      ],
    },
    {
      title: "7.0 Network Access Device Administration",
      items: [
        "7.1 Compare AAA protocols",
        "7.2 Configure TACACS+ device administration and command authorization",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CCNP"
        title="300-715 SISE v1.1"
        description="Implementing and Configuring Cisco Identity Services Engine
              (300-715 SISE) v1.1 is a 90-minute CCNP Security exam that tests
              skills in deploying and managing Cisco Identity Services Engine,
              including access policies, BYOD, guest services, and endpoint
              compliance."
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
              This course prepares learners for the Securing Networks with Cisco
              Firewalls (300-710 SNCF) exam through instructor-led training with
              hands-on labs and guided instruction. It covers key topics on
              Cisco Secure Firewall and Cisco Secure Firewall Management Center,
              including policy configuration, deployment, integration,
              management, and troubleshooting.
            </p>
            <p>
              The program focuses on practical skills and real-world scenarios
              to build the knowledge and confidence needed for success in the
              CCNP Security certification.
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
                <p>Identity and Access Control Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Policy Enforcement Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Authentication and Authorization Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Network Access Security Basics</span>
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
              alt="CCNA Automation Certification Badge"
              className="w-55 h-55 lg:w-100 lg:h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "IAM Engineer",
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
