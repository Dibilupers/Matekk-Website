// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import itil5 from "../../../assets/itil5.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function ITIL5() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "Introduction to Direct, Plan and Improve",
      items: [
        "Overview of DPI within the ITIL 4 framework",
        "Role of DPI in aligning strategy, governance, measurement, and improvement",
        "DPI as a core module in the Managing Professional and Strategic Leader tracks",
      ],
    },
    {
      title: "Module 1: Core concepts of DPI",
      items: [
        "Key definitions: direction, planning, improvement, scope",
        "Relationships between value, outcomes, costs, and risks",
        "Strategic vs operational scope of DPI",
      ],
    },
    {
      title:
        "Module 2: DPI through service value system and guiding principles",
      items: [
        "How DPI works within the Service Value System (SVS)",
        "Applying the ITIL guiding principles to DPI work (e.g., start where you are, collaborate)",
      ],
    },
    {
      title: "Module 3: Role of direction in strategy management",
      items: [
        "Identifying scope of what is to be directed/planned",
        "Cascading objectives and controls",
        "Policy, roles, and authority distribution for strategic alignment",
      ],
    },
    {
      title: "Module 4: Implementation of strategies",
      items: [
        "Practical use of strategies in day-to-day operations",
        "Governance integration, risk management, and compliance (GRC) linking to SVS",
      ],
    },
    {
      title: "Module 5: Introduction to assessment and planning",
      items: [
        "Assessment objectives, outputs, requirements and criteria",
        "Selecting appropriate evaluation methods",
        "Defining desired outcomes and scopes for planning",
      ],
    },
    {
      title: "Module 6: Assessment and planning through VSM",
      items: [
        "Evaluating parts of the SVS",
        "Using data and feedback to refine planning and strategic direction",
      ],
    },
    {
      title: "Module 7: Measurement, reporting, and continual improvement",
      items: [
        "Definition and use of metrics, indicators, and reporting in DPI",
        "Tools and practices to monitor performance",
      ],
    },
    {
      title:
        "Module 8: Measurements and continual improvement through dimensions and SVS",
      items: [
        "Applying measurement across the four dimensions of service management",
        "Driving improvement across value streams and practices",
      ],
    },
    {
      title: "Module 9: OCM principles and methods",
      items: [
        "OCM concepts and success factors",
        "Stakeholder engagement and influence in change transitions",
      ],
    },
    {
      title: "Module 10: Communication principles and methods",
      items: [
        "Communication planning and channels",
        "Feedback loops and effective two-way communication strategies",
      ],
    },
    {
      title: "Module 11: SVS development using four dimensions",
      items: [
        "How to use organisational culture, information & technology, value streams/processes, and partners/suppliers to enable DPI success across the SVS",
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="IT Management"
        title="ITIL Foundation Bridge (Version 5)"
        description="A streamlined, targeted pathway designed for ITIL 4 certification
              holders to transition smoothly to ITIL Foundation (Version 5),
              focusing exclusively on the new updates and changes introduced in
              the latest version."
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
              This course is tailored to help ITIL 4 professionals quickly and
              efficiently align with the latest ITIL Foundation (Version 5)
              framework. Rather than revisiting the foundational content you
              already know, it zeroes in on the key changes, emerging trends,
              and updated practices that reflect the evolving landscape of
              digital service management. By highlighting how value creation,
              digital service delivery, and management concepts have been
              refined, the course ensures you stay current and confident in
              applying ITIL principles in modern IT environments.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Major updates and enhancements in ITIL (Version 5)</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Evolution of digital product and service management practices
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Advanced approaches to value creation and service optimization
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Refined terminology, core principles, and updated concepts
                </p>
              </div>
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
              src={itil5}
              alt="ITIL Certification Badge"
              className="w-45 h-45 lg:w-50 lg:h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "IT Operations Specialist",
              "IT Development Manager",
              "Chief Digital Officer",
              "IT Specialist Change Management",
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
              Download the ITIL5 Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the ITIL5 Enterprise exam."
      />
    </main>
  );
}
