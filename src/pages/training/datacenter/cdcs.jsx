// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import cdcs from "../../../assets/cdcs.webp"; // Course badge image
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
export default function CDCS() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "Data Centre Design/Life Cycle Overview",
      items: ["Phases of the data centre life cycle"],
    },
    {
      title: "Standards and Rating Level Definitions",
      items: [
        "Rating levels history and definitions",
        "Standards and guideline comparison",
        "N-redundancy options",
        "Distributed redundant options",
        "Concurrent maintainability",
        "Fault tolerant",
        "Substation requirements",
        "Example topologies",
        "Maintenance options",
      ],
    },
    {
      title: "Building Considerations",
      items: [
        "Building location and floor loading considerations",
        "Floor and hanging loads requirements",
        "Firing rating for walls and glass",
        "Blast protection and bullet proofing",
        "Forced entry protection",
      ],
    },
    {
      title: "Advanced Raised Floor & Suspended Ceiling",
      items: [
        "Raised Floor installation requirements",
        "Common raised floor problems",
        "Seismic protection",
        "Requirements for suspended ceiling",
      ],
    },
    {
      title: "Advanced Power",
      items: [
        "Electrical formulae",
        "Single Line Diagram (SLD)",
        "Overcurrent protection devices",
        "Earth Leakage protection",
        "Sizing of protective components",
        "Surge protection",
        "Power cabling and PDU requirements",
        "Types of generators",
        "Generator components",
        "Fuel storage and calculation",
        "Generator parallelling",
        "Required UPS specifications",
        "UPS parallel configuration",
        "Harmonic filters",
        "Battery bank terminology",
        "Calculating battery banks",
        "Battery charging",
        "Paralleilling battery banks",
        "Battery testing",
        "Battery case selection",
        "Flywheel",
        "Hydrogen fuel cells",
      ],
    },
    {
      title: "Electrical/Earthing Integrity tests",
      items: [
        "Sources of EMF",
        "Single and three phase radiation",
        "Measuring EMF",
        "Safe distance guidance",
        "Calculation of EMF attenuation factors",
      ],
    },
    {
      title: "Advanced Cooling",
      items: [
        "Cooling definitions",
        "Psychrometric chart",
        "ASHRAE recommendations",
        "Heat dissipation",
        "Equipment airflow",
        "Floor plan set-up",
        "Types of perforated tiles",
        "Rack door construction",
        "Delta-T and impact",
        "Optimizing airflow",
        "Thermal unit conversions",
        "Calculating air volume displacement (CFM/CMH)",
        "Cooling capacity calculations",
        "Computational Fluid Dynamics (CFD)",
        "Air-conditioner efficiency",
        "SHR impact on OPEX",
        "Efficiency indicators",
        "Air-conditioner selection",
        "Humidity control",
        "Redundancy requirements",
        "Installation requirements",
        "Service corridor considerations",
        "Set points and calibration",
        "Advanced cooling technologies – air cooling",
        "Advanced cooling technologies – liquid cooling",
      ],
    },
    {
      title: "Advanced Fire Protection",
      items: [
        "Fire triangle",
        "Fire detection systems",
        "Installation and testing of smoke sensors",
        "Water-based suppression systems",
        "Gas-based suppression systems",
        "Calculate gas content",
        "Release and hold times",
        "Fire detection panel requirements",
        "Verification of installation",
        "Ongoing maintenance",
        "Alternative systems",
      ],
    },
    {
      title: "Designing and Installing Scalable Network Cabling Systems",
      items: [
        "TIA-942 cabling structure topology",
        "Copper and fibre cabling",
        "ToR and EoR design",
        "Installation best practices",
        "Grounding and bonding",
        "Cables labelling and administration",
      ],
    },
    {
      title: "Environmental Specifications / Contamination Control",
      items: [
        "Acoustic noise effects, regulations, specifications and limits",
        "Data centre contamination categories",
        "Contamination measurements, standards and limits",
        "Preventive measures",
      ],
    },
    {
      title: "Data Centre Efficiency",
      items: [
        "Business drivers for environmental sustainability",
        "Green standards and guidelines",
        "Power Usage Effectiveness (PUE)",
        "PUE categories",
        "Additional performance metrics",
        "Open Compute Project (OCP)",
        "Savings on cooling infrastructure",
        "Savings on light infrastructure",
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CDCP"
        title="Certified Data Centre Specialist"
        description="CDCS® is a key certification for data centre professionals looking
              to strengthen their technical expertise and decision-making
              skills. It also serves as a prerequisite for those pursuing the
              advanced Certified Data Centre Expert (CDCE®) designation."
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
              The Certified Data Centre Specialist (CDCS®) is an intensive
              three-day course that provides participants with the knowledge and
              skills to effectively engage in data centre design and operations,
              particularly in high-demand environments. Learners gain the
              ability to assess design proposals for accuracy, efficiency, and
              effectiveness, including solutions for power and cooling
              infrastructure.
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
                <p>
                  Gain a clear understanding of the data centre design lifecycle
                  and its key stages.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Communicate detailed data centre requirements with vendors,
                  suppliers, and contractors to ensure they are met.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Review and validate design documents, cost estimates, and
                  technical proposals for compliance with specifications.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Understand redundancy levels in both data centre design and
                  ongoing maintenance.
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
              src={cdcs}
              alt="CDCS Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Data Center Shift Supervisor",
              "Site Planning Engineer",
              "Data Center Specialist",
              "Infrastructure & Operations Roles",
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
              Download the CDCS Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CDCS Enterprise exam."
      />
    </main>
  );
}
