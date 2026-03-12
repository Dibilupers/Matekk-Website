// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import cdcp from "../../../assets/cdcp.webp"; // Course badge image
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
export default function CDCP() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "The Mission Critical Site",
      items: [
        "Business organization",
        "Types of data centres",
        "Importance of a data centre",
        "Elements of data centre",
        "Causes of unavailability",
      ],
    },
    {
      title: "Data Centre Standards",
      items: [
        "Standards and guidelines",
        "Standards for sub-components",
        "International vs. national standards",
      ],
    },
    {
      title: "Data Centre Location, Building and Construction",
      items: [
        "Criteria for selecting site location (the data centre location)",
        "Criteria for facility",
        "Supporting facilities and function",
      ],
    },
    {
      title: "Raised Access Flooring and Suspended Ceiling",
      items: [
        "Standards",
        "Types of raised floors",
        "Loading factors",
        "General guidelines",
        "Grounding",
        "Ramp and landing platform",
        "Suspended ceiling",
        "Raised floor and suspended ceiling impact on cooling",
      ],
    },
    {
      title: "Light",
      items: [
        "Measurements of light",
        "Standards",
        "Connecting and positioning of light textures",
        "Emergency light",
        "Types of emergency light",
      ],
    },
    {
      title: "Power Infrastructure",
      items: [
        "Sustainability",
        "Microgrid",
        "Transformers",
        "Generators",
        "Automatic Transfer Switch (ATS) and Static Transfer Switch (STS)",
        "Power redundancy levels and techniques",
        "Power distribution / Busbar trunking",
        "Single phase and three phase power",
        "Grounding and bonding",
        "Isolation transformer",
        "PDU form factors",
        "Ingress Protection (IP) grades",
        "Power quality parameters",
        "Power sizing",
        "High Performance Computing",
        "UPS systems",
        "UPS parallel configurations",
        "Batteries",
        "Battery Energy Storage System (BESS)",
        "Thermographic scanning",
      ],
    },
    {
      title: "Centre Magnetic Fields (EMF)",
      items: [
        "Types of EMF",
        "Units of measurements",
        "Standards and best practices",
        "Sources of EMF",
        "Shielding",
      ],
    },
    {
      title: "Equipment Racks",
      items: [
        "Standards",
        "Dimensions",
        "Types of racks",
        "Security",
        "Power strips / rails",
      ],
    },
    {
      title: "Cooling Infrastructure",
      items: [
        "Cooling principles",
        "Temperature and humidity",
        "Types of cooling systems",
        "Raised floor cooling",
        "Non-raised floor cooling",
        "Supplemental cooling",
        "Containment",
        "Liquid cooling",
        "Seasonal thermal energy storage (STER)",
      ],
    },
    {
      title: "Water Supply",
      items: ["Importance of water", "Backup water supply"],
    },
    {
      title: "Designing a Scalable Network Infrastructure",
      items: [
        "Importance network cabling infrastructure",
        "Planning considerations",
        "Copper Cabling",
        "Fibre Cabling",
        "TIA-942 cabling systems topology",
        "Testing and verication of cabling system",
        "Redundancy",
        "Site-to-site connectivity",
      ],
    },
    {
      title: "Fire Protection",
      items: [
        "Common causes of fire",
        "Requirements for fire suppression systems",
        "Standards",
        "Fire detection systems",
        "Water based fire suppression systems",
        "Gas based fire suppression systems",
        "Classes of fire",
        "Best practices",
        "Fire safety extinguishers",
        "Requirements for signage and safety",
        "Regulatory requirements",
      ],
    },
    {
      title: "Physical Security and Safety",
      items: [
        "Components for physical security",
        "Components for physical safety",
      ],
    },
    {
      title: "Auxiliary Systems",
      items: [
        "Monitoring challenges",
        "Monitoring requirements",
        "Environment Monitoring System (EMS)",
        "Building Management System (BMS)",
        "Data Centre Infrastructure Management (DCIM)",
        "Water leak detection",
        "Alarm panels",
        "Notication",
        "Best practices",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CDCP"
        title="Certified Data Centre Professional"
        description="The CDCP® (Certified Data Centre Professional) course is an
              intensive 2-day program that provides participants with key
              knowledge of the critical components of data centre
              infrastructure."
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
              This course covers power and cooling systems, security, cabling,
              safety procedures, and efficiency improvements, equipping data
              centre professionals to effectively manage and optimize current
              facilities while preparing for future developments.
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
                  Describe various types of data centres, their role in business
                  continuity, and factors influencing availability.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Review international and national standards, industry
                  guidelines, and compliance requirements for data centre design
                  and components.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Understand site selection, building specifications, and
                  supporting infrastructure needed to create a resilient,
                  high-performance data centre.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Implement raised floors and suspended ceilings, taking into
                  account cooling, grounding, load distribution, and airflow
                  optimization.
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
              src={cdcp}
              alt="CDCP Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Data Centre Technician",
              "Data Centre Engineer",
              "Data Centre Operations Manager",
              "Infrastructure Operations Manager",
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
