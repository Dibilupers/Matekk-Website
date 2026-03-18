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
import WorkstationIcon from "../../../../../assets/Workstation.svg";
import MedalIcon from "../../../../../assets/Medal.svg";
import CourseModules from "../../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function SNCF() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
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

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
              bgImage={ccnaHero}
              category="CCNP"
              title="300-710 SNCF v1.1"
              description="Securing Networks with Cisco Firewalls (300-710 SNCF) v1.1 is a
              90-minute exam by Cisco Systems that tests skills in configuring,
              deploying, managing, and troubleshooting Cisco Secure Firewall and
              Firewall Management Center."
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
              hands-on labs and guided instruction. It covers core topics
              related to Cisco Secure Firewall and Cisco Secure Firewall
              Management Center, including policy configuration, deployment,
              integration, management, and troubleshooting.
            </p>
            <p>
              The program emphasizes practical configuration, monitoring, and
              troubleshooting using real-world scenarios to build the skills and
              confidence needed for success in the CCNP Security certification
              path.
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
                <p>Firewall Deployment Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Firewall Management and Monitoring</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>VPN and Secure Connectivity Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Firewall Policy and Access Control Basics</span>
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
              "Network Security Engineer",
              "Firewall Administrator",
              "Security Operations Engineer",
              "Cybersecurity Consultant",
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
