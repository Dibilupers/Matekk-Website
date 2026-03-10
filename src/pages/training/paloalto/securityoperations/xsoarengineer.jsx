import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoXsoarEngineer.png";
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
export default function XsoarEngineer() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Planning, Installation, and Maintenance",
      items: [
        "1.1 Demonstrate knowledge of planning and configuring system authentication and authorization",
        "1.2 Explain the process of planning and deploying engines",
        "1.3 Explain the process of planning and managing a dev/prod deployment",
        "1.4 Demonstrate knowledge of managing Marketplace pack installations and version updates",
        "1.5 Identify and describe configuration and troubleshooting integration instances",
        "1.6 Explain the process of maintaining and troubleshooting the system",
      ],
    },
    {
      title: "2.0 Use Case Planning and Development",
      items: [
        "2.1 Demonstrate understanding of incident and indicator lifecycles",
        "2.2 Explain field and layout configuration",
        "2.3 Demonstrate understanding of classifier and mapper configuration",
        "2.4 Identify and describe incident creation methods",
        "2.6 Demonstrate knowledge of incident type playbooks, layouts, and SLAs",
        "2.7 Explain list configuration and management",
      ],
    },
    {
      title: "3.0 Playbook Development",
      items: [
        "3.1 Explain playbook task input and output configuration and results",
        "3.2 Explain the process of referencing and manipulating context data to manage automation workflow",
        "3.3 Identify and describe the various playbook task types",
        "3.4 Demonstrate understanding of sub-playbook (inputs, outputs, looping) configuration",
        "3.5 Explain the process of applying filters and transformers to manipulate data in playbook tasks",
        "3.6 Explain the process of applying playbook debugger in development and troubleshooting",
        "3.7 Identify and describe built-ins, commands, and scripts",
        "3.8 Explain the process of creating and applying automation scripts",
        "3.9 Explain job creation and management",
      ],
    },
    {
      title: "4.0 Incident Interactions and Reporting",
      items: [
        "4.1 Explain incident states and actions",
        "4.2 Demonstrate understanding of War Room activities",
        "4.3 Explain incident relationships",
        "4.4 Demonstrate understanding of dashboard and report configuration",
      ],
    },
    {
      title: "5.0 Threat Intelligence Management",
      items: [
        "5.1 Identify and describe threat intelligence features",
        "5.2 Explain indicator creation methods",
        "5.3 Explain the process of indicator configuration",
        "5.4 Explain indicator relationships",
        "5.5 Demonstrate knowledge of indicator enrichment and source reliability",
        "5.6 Explain threat intel sharing with external security services",
        "5.7 Demonstrate understanding of indicator exclusions list configuration and management",
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
            <h1 className="text-[#1775EE] font-bold">XSOAR Engineer</h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              The Palo Alto Networks Certified XSOAR Engineer exam validates the
              knowledge and skills required for skilled engineers to deploy,
              configure, manage, integrate, and troubleshoot Cortex XSOAR
              solutions in security operations environments.
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
              The Palo Alto Networks Certified XSOAR Engineer certification
              validates the knowledge and skills required for skilled engineers
              to deploy, configure, manage, integrate, and troubleshoot Cortex
              XSOAR solutions in security operations environments.
            </p>
            <p>
              The purpose of this document is to help you prepare for the exam
              and attain the certification. It is intended to identify the
              topics covered and provide resources for understanding them but
              should not be used as the sole study material for the XSOAR
              Engineer exam.
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
                <p>XSOAR Platform Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Incident Response Workflow Automation</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Playbook Design and Automation Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Integration and Orchestration Concepts</span>
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
              "XSOAR Automation Engineer",
              "SOC Automation Engineer",
              "Security Operations Engineer",
              "DevSecOps Engineer",
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
