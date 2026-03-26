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
export default function SVPN() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title:
        "1.0 Site-to-Site Virtual Private Networks on Routers and Firewalls",
      items: [
        "1.1 Describe GETVPN",
        "1.2 Implement DMVPN",
        "1.3 Implement FlexVPN using local AAA",
      ],
    },
    {
      title: "2.0 Applications",
      items: [
        "2.1 Implement AnyConnect IKEv2 VPNs on ASA and routers",
        "2.2 Implement AnyConnect SSL VPN on ASA",
        "2.3 Implement Clientless SSL VPN on ASA",
        "2.4 Implement Flex VPN on routers",
      ],
    },
    {
      title: "3.0 Troubleshooting Using ASDM and CLI",
      items: [
        "3.1 Troubleshoot IPsec",
        "3.2 Troubleshoot DMVPN",
        "3.3 Troubleshoot FlexVPN",
        "3.4 Troubleshoot AnyConnect IKEv2 and SSL VPNs on ASA and routers",
        "3.5 Troubleshoot Clientless SSL VPN on ASA",
      ],
    },
    {
      title: "4.0 Artificial Intelligence, Automation, and DevSecOps",
      items: [
        "4.1 Describe the functions, uses, and role of AI in securing network infrastructure",
        "4.2 Identify functional components of FlexVPN, IPsec, and Clientless SSL for remote access VPN solutions",
        "4.3 Identify VPN technology based on configuration output for site-to-site VPN solutions",
        "4.4 Identify VPN technology based on configuration output for remote access VPN solutions",
        "4.5 Identify split tunneling requirements for remote access VPN solutions",
        {
          subTitle: "4.6 Design site-to-site VPN solutions",
          items: [
            "4.6.a VPN technology considerations based on functional requirements",
            "4.6.b High availability considerations",
          ],
        },
        {
          subTitle: "4.7 Design remote access VPN solutions",
          items: [
            "4.7.a VPN technology considerations based on functional requirements",
            "4.7.b High availability considerations",
            "4.7.c Clientless SSL browser and client considerations and requirements",
          ],
        },
        "4.8 Identify Elliptic Curve Cryptography (ECC) algorithms",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CCNP"
        title="300-730 SVPN v1.1"
        description="Implementing Secure Solutions with Virtual Private Networks
              (300-730 SVPN) v1.1 is a 90-minute CCNP Security exam assessing
              knowledge of VPN deployment, secure communications, network
              architecture, and troubleshooting."
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
              This course prepares learners for the Implementing Secure
              Solutions with Virtual Private Networks (300-730 SVPN) exam
              through instructor-led training with hands-on labs and guided
              instruction. It covers key topics on VPN deployment, secure
              communications, network architecture, and troubleshooting.
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
                <p>VPN Architecture Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Secure Remote Access Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>IPsec and SSL VPN Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>VPN Troubleshooting and Policy Basics</span>
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
              "Firewall & VPN Administrator",
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
        bgPosition="90%"
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
