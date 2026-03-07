// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import specialist from "../../../assets/itil4_specialist.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";

// ==================== COMPONENT NAME ====================
export default function ITIL4Specialist() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "Introduction to Create, Deliver and Support",
      items: [
        "Overview of the Create, Deliver and Support (CDS) module",
        "Role of CDS in the ITIL 4 Managing Professional path",
        "Purpose of this course: connect value streams, teams, and technology to create reliable services",
      ],
    },
    {
      title: "Module 1: Organization and culture",
      items: [
        "Organisational structures and influence on service delivery",
        "Team culture and collaboration",
        "Fostering a continuous improvement mindset",
        "Customer-oriented mindset and positive communication",
      ],
    },
    {
      title: "Module 2: Effective teams",
      items: [
        "Capabilities, roles and competencies",
        "Workforce planning and team design",
        "Managing employee satisfaction",
        "Results-based measuring and reporting and team performance",
      ],
    },
    {
      title: "Module 3: Information technology to create, deliver and support",
      items: [
        "Integration and data sharing",
        "Reporting and advanced analytics",
        "Collaboration tools and workflow automation",
        "Robotic process automation, AI, machine learning",
        "Continuous integration/continuous delivery (CI/CD)",
        "Information models and their value",
      ],
    },
    {
      title: "Module 4: Value streams",
      items: [
        "Anatomy of a value stream",
        "Designing and mapping value streams",
        "Dependencies and flow within service value streams",
      ],
    },
    {
      title: "Module 5: Value stream to create, deliver and support services",
      items: [
        "Using value streams to design, develop and transition services",
        "Coordination across practices and activities toward value outcomes",
      ],
    },
    {
      title: "Module 6: Value stream for user support",
      items: [
        "Value stream steps for supporting users",
        "Practice contributions (service desk, incident/problem management)",
      ],
    },
    {
      title: "Module 7: Prioritize and manage work",
      items: [
        "Structures for work prioritization",
        "Queue and backlog management",
        "Collaboration mechanisms for effective delivery",
      ],
    },
    {
      title: "Module 8: Commercial and sourcing considerations",
      items: [
        "Buy vs build decisions",
        "Sourcing models and options",
        "Service integration and management (SIAM)",
        "Vendor and supplier considerations in service creation/delivery",
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
            IT Management
          </h6>

          {/* ====== Course Title and Description ======*/}
          <div>
            {/* Course title */}
            <h1 className="text-[#1775EE] w-150">
              ITIL4 Specialist: Create, Deliver and Support
            </h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              Strengthen your capabilities in designing, delivering, and
              managing digital products and services. Elevate your strategic
              approach, address challenges efficiently, and promote a mindset of
              ongoing improvement and innovation.
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
              This course focuses on the practical skills required to create,
              deliver, and support IT-enabled products and services. It covers
              the core service management activities needed to ensure services
              are effectively designed, built, deployed, and operated to deliver
              value to customers and users.
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
                <p>How modern IT and digital service organizations operate</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>How value streams enhance speed and efficiency</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  How cultural and behavioral principles shape work that
                  benefits the broader organization
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  How to apply commonly used service management terms and
                  concepts
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
              src={specialist}
              alt="Specialist Certification Badge"
              className="w-60 h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "IT Service Manager",
              "Service Delivery Manager",
              "IT Support Manager",
              "DevOps Engineer",
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
