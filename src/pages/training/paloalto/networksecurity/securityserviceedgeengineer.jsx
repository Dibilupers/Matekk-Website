import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoSecurityServiceEdgeEngineer.png";
import PaloAltoHero from "../../../../assets/PaloAltoHeader.webp";
import PaloAltoFooter from "../../../../assets/PaloAltoFooter.webp";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function SecurityServiceEdgeEngineer() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Prisma Access Planning and Deployment",
      items: [
        {
          subTitle:
            "1.1 Identify and describe Prisma Access architecture and components",
          items: [
            "1.1.1 Security processing nodes",
            "1.1.2 IP addressing",
            "1.1.3 Compute locations",
            "1.1.4 DNS",
          ],
        },
        {
          subTitle: "1.2 Explain Prisma Access routing",
          items: [
            "1.2.1 Routing preference",
            "1.2.2 Backbone routing",
            "1.2.3 Traffic steering",
          ],
        },
        "1.3 Configure and deploy Prisma Access service infrastructure",
        {
          subTitle: "1.4 Configure and deploy Prisma Access for mobile users",
          items: ["1.4.1 VPN client", "1.4.2 Explicit proxy"],
        },
        "1.5 Configure, implement, and deploy Prisma Access for remote networks",
        {
          subTitle: "1.6 Configure and manage private application access",
          items: [
            "1.6.1 Service connections",
            "1.6.2 Colo-Connect",
            "1.6.3 Zero Trust Network Access (ZTNA) Connector",
          ],
        },
        {
          subTitle:
            "1.7 Configure and implement identity authentication within Prisma Access",
          items: [
            "1.7.1 Cloud Identity Engine",
            "1.7.2 SAML, Kerberos, Certificate, LDAP, RADIUS",
          ],
        },
      ],
    },
    {
      title: "2.0 Prisma Access Services",
      items: [
        {
          subTitle:
            "2.1 Configure and implement advanced Prisma Access features and services",
          items: [
            "2.1.1 App Acceleration",
            "2.1.2 Traffic replication",
            "2.1.3 IoT Security",
            "2.1.4 Privileged remote access",
            "2.1.5 Remote Browser Isolation (RBI)",
          ],
        },
        {
          subTitle:
            "2.2 Configure and implement Prisma Access data security services",
          items: [
            "2.2.1 SaaS Security",
            "2.2.2 Enterprise DLP",
            "2.2.3 AI Access Security",
          ],
        },
        {
          subTitle:
            "2.3 Configure and implement profiles and policies for Prisma Access",
          items: ["2.3.1 Security", "2.3.2 Decryption", "2.3.3 QoS"],
        },
        {
          subTitle:
            "2.4 Configure and implement user-based policies within Prisma Access",
          items: ["2.4.1 Cloud Identity Engine", "2.4.2 User-ID"],
        },
      ],
    },
    {
      title: "3.0 Prisma Browser",
      items: [
        {
          subTitle: "3.1 Configure and deploy Prisma Browser",
          items: [
            "3.1.1 Public applications",
            "3.1.2 Private applications",
            "3.1.3 Prisma Browser Extension",
          ],
        },
        {
          subTitle:
            "3.2 Configure and implement Prisma Browser policies and profiles",
          items: [
            "3.2.1 Security",
            "3.2.2 Decryption",
            "3.2.3 Data loss prevention (DLP)",
          ],
        },
      ],
    },
    {
      title: "4.0 Prisma Access Administration and Operation",
      items: [
        {
          subTitle: "4.1 Manage and operate Prisma Access with Panorama",
          items: [
            "4.1.1 Tenant management and multitenancy",
            "4.1.2 User- and role-based access control",
            "4.1.3 Configuration management and version control",
            "4.1.4 Reporting and log management",
            "4.1.5 Release and upgrades",
          ],
        },
        {
          subTitle:
            "4.2 Manage and operate Prisma Access with Strata Cloud Manager (SCM)",
          items: [
            "4.2.1 Tenant management and multitenancy",
            "4.2.2 User- and role-based access control",
            "4.2.3 Configuration management and version control",
            "4.2.4 Reporting and log management",
            "4.2.5 Copilot",
          ],
        },
        {
          subTitle: "4.3 Configure and deploy Strata Logging Service",
          items: ["4.3.1 SCM and Panorama", "4.3.2 Log forwarding"],
        },
        {
          subTitle: "4.4 Maintain security posture in Prisma Access",
          items: ["4.4.1 Best Practice Assessment (BPA)", "4.4.2 Compliance"],
        },
      ],
    },
    {
      title: "5.0 Prisma Access Troubleshooting",
      items: [
        {
          subTitle: "5.1 Monitor and troubleshoot Prisma Access connectivity",
          items: [
            "5.1.1 Mobile users",
            "5.1.2 Remote networks",
            "5.1.3 Service connections",
            "5.1.4 ZTNA connectors",
            "5.1.5 Performance and latency",
          ],
        },
        {
          subTitle: "5.2 Troubleshoot Prisma Access traffic enforcement issues",
          items: [
            "5.2.1 Security policy",
            "5.2.2 HIP enforcement",
            "5.2.3 User-ID mismatch",
            "5.2.4 Split tunneling",
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={PaloAltoHero}
        category="Palo Alto"
        title="Security Service Edge Engineer"
        description="The Palo Alto Networks Certified Security Service Edge (SSE)
              Engineer exam is designed to validate the knowledge and skills
              required for engineers to deploy, configure, manage, and
              troubleshoot Security Service Edge (SSE) environments."
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
              Security Service Edge (SSE) Engineer certification through guided
              instruction and hands-on activities. It focuses on pre-deployment
              planning, deployment configuration, post-deployment management,
              and troubleshooting of Palo Alto Networks SSE solutions, as well
              as understanding their architecture to support network
              transformation goals.
            </p>
            <p>
              The program builds practical expertise in deploying, managing, and
              optimizing SSE environments, while exam guidelines outline covered
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
                <p>SSE Architecture Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Zero Trust Policy Implementation</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Cloud Access Security Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Threat Protection and Data Loss Prevention</span>
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
              alt="Palo Alto Networks Certified Cybersecurity Apprentice Certification Badge"
              className="w-50 h-50 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "SSE Engineer",
              "Cloud Security Engineer",
              "Network Security Engineer",
              "Cybersecurity Consultant",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span >{job}</span>
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
                <span >{job}</span>
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
              <p >Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p >Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p >Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p >Certificate of Completion</p>
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
        bgImage={PaloAltoFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Palo Alto Enterprise exam."
      />
    </main>
  );
}
