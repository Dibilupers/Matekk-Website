import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../assets/FortinetNSE5SASE.png";
import FortinetHero from "../../../assets/FortinetHeader.png";
import FortinetFooter from "../../../assets/FortinetFooter.png";
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NSE5SASE() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 SASE — Secure Access Service Edge Fundamentals",
      items: [
        {
          subTitle: "1.1 SASE Architecture",
          items: [
            "SASE definition and core principles",
            "Convergence of networking and security",
            "Single-vendor vs. multi-vendor SASE",
            "Fortinet SASE architecture overview",
            "SASE vs. traditional perimeter security",
          ],
        },
        {
          subTitle: "1.2 SASE Components",
          items: [
            "Secure Web Gateway (SWG)",
            "Cloud Access Security Broker (CASB)",
            "Zero Trust Network Access (ZTNA)",
            "SD-WAN as the networking foundation",
            "Firewall as a Service (FWaaS)",
          ],
        },
      ],
    },
    {
      title: "2.0 SASE — FortiSASE Configuration",
      items: [
        {
          subTitle: "2.1 FortiSASE Deployment",
          items: [
            "FortiSASE portal and tenant management",
            "FortiClient integration with FortiSASE",
            "Agent-based and agentless deployment",
            "Point of Presence (PoP) selection",
            "Licensing and subscription management",
          ],
        },
        {
          subTitle: "2.2 Security Policies in FortiSASE",
          items: [
            "Web filtering in the SASE cloud",
            "Application control and CASB policies",
            "DLP policies for cloud traffic",
            "DNS security in FortiSASE",
            "SSL deep inspection in the cloud",
          ],
        },
        {
          subTitle: "2.3 User Identity and Access in SASE",
          items: [
            "Identity provider (IdP) integration",
            "SAML-based SSO for SASE",
            "User and device posture checks",
            "Conditional access policies",
            "Guest and contractor access management",
          ],
        },
      ],
    },
    {
      title: "3.0 SASE — Zero Trust Network Access (ZTNA)",
      items: [
        {
          subTitle: "3.1 ZTNA Principles",
          items: [
            "Never trust, always verify concept",
            "Micro-segmentation with ZTNA",
            "Continuous trust evaluation",
            "Identity-centric access control",
            "ZTNA vs. traditional VPN",
          ],
        },
        {
          subTitle: "3.2 ZTNA Implementation",
          items: [
            "ZTNA access proxy configuration",
            "Application tags and ZTNA rules",
            "Device certificate enforcement",
            "FortiClient as ZTNA agent",
            "Inline ZTNA and implicit discovery",
          ],
        },
      ],
    },
    {
      title: "4.0 SASE — Monitoring and Troubleshooting",
      items: [
        {
          subTitle: "4.1 SASE Visibility",
          items: [
            "FortiSASE dashboards and reporting",
            "User traffic logs and session visibility",
            "Shadow IT reports",
            "Bandwidth and application usage analytics",
            "Security incident reporting in SASE",
          ],
        },
        {
          subTitle: "4.2 Troubleshooting SASE Connectivity",
          items: [
            "FortiClient connection diagnostics",
            "PoP connectivity issues",
            "Policy misconfiguration troubleshooting",
            "Split tunneling verification",
            "Certificate and authentication errors",
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={FortinetHero}
        category="FORTINET"
        title="NSE 5 SASE"
        description="Learn to deploy and manage FortiSASE to secure internet access and protect SaaS applications for on-site and remote users. This course builds foundational knowledge of FortiSASE and how to enforce security policies.
                                          "
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
              In this course, you will gain practical skills to implement and
              manage FortiSASE, delivering secure internet access and protecting
              SaaS applications for both on-site and remote users. You will
              explore its core architecture and security capabilities.
            </p>
            <p>
              Aligned with Fortinet training, you will learn how to apply
              security policies using endpoint profiles and content inspection
              to ensure consistent and effective protection.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid flex-col lg:flex-col-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Set up a FortiNAC-F system to achieve network visibility</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Use control features for network access and automated policy
                  enforcement
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Integrate FortiNAC-F with the Fortinet Security Fabric</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>
                  Combine visibility and control with security device
                  integrations to automate threat responses
                </span>
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
              alt="Fortinet NSE 1 Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Entry-Level Security Analyst",
              "Junior Network Administrator",
              "IT Security Associate",
              "Cybersecurity Intern",
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
            {["Intermediate"].map((job) => (
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
              Download the Palo Alto Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={FortinetFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
