// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import aPlusCerti from "../../../assets/aplus.webp"; // Course badge image
import comptiaHero from "../../../assets/COMPTIAherobg.webp"; // Hero banner background
import comptiaFooter from "../../../assets/COMPTIAFooter.webp"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function Aplus() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
        {
      title: "Core 1: Mobile devices (13%)",
      items: [
        <>
          <strong>Hardware setup:</strong> installing components like batteries, cameras, and Wi-Fi antennas.
        </>,
        <>
          <strong>Hardware setup:</strong> installing components like batteries, cameras, and Wi-Fi antennas.
        </>,
        <>
          <strong>Accessory options:</strong> configuring USB, Bluetooth, NFC, and docking stations.
        </>,
        <>
          <strong>Network setup:</strong> configuring Wi-Fi, Bluetooth, cellular data, and synchronization settings.
        </>,
        <>
          <strong>Troubleshooting:</strong> identifying and fixing hardware and connectivity issues.
        </>,
      ],
    },
    {
      title: "Core 1: Networking (23%)",
      items: [
        <>
          <strong>Protocols and ports:</strong> learning about networking protocols, ports, and wireless technologies.
        </>,
        <>
          <strong>SOHO networks:</strong> setting up small office/home office networks, including IP addressing and VPNs.
        </>,
        <>
          <strong>Networking tools:</strong> troubleshooting with crimpers, cable testers, and Wi-Fi analyzers.
        </>,
      ],
    },
    {
      title: "Core 1: Hardware (25%)",
      items: [
        <>
          <strong>Component installation:</strong> setting up RAM, CPUs, and storage devices.
        </>,
        <>
          <strong>Cables and connectors:</strong> working with HDMI, Ethernet, and USB cables.
        </>,
        <>
          <strong>Peripheral devices:</strong> installing and maintaining printers, scanners, and other peripherals.
        </>,
        <>
          <strong>Motherboards and power:</strong> configuring motherboards, power supplies, and cooling solutions.
        </>,
      ],
    },
    {
      title: "Core 1: Virtualization and cloud computing (11%)",
      items: [
        <>
          <strong>Virtualization concepts:</strong> understanding virtual machines, hypervisors, and desktop virtualization.
        </>,
        <>
          <strong>Cloud models:</strong> learning about IaaS, SaaS, and PaaS.
        </>,
      ],
    },
    {
      title: "Core 1: Hardware and network troubleshooting (28%)",
      items: [
        <>
          <strong>Diagnosing issues:</strong> identifying and fixing hardware, network, and connectivity problems.
        </>,
        <>
          <strong>Troubleshooting tools:</strong> using multimeters, cable testers, and loopback plugs.
        </>,
      ],
    },
    {
      title: "Core 2: Operating systems (28%)",
      items: [
        <>
          <strong>OS installation:</strong> working with Windows, macOS, Linux, and mobile operating systems.
        </>,
        <>
          <strong>Windows tools:</strong> managing systems with Task Manager, Command Prompt, and Disk Management.
        </>,
        <>
          <strong>File systems:</strong> handling file systems, updates, and OS upgrades.
        </>,
      ],
    },
    {
      title: "Core 2: Security (28%)",
      items: [
        <>
          <strong>Security measures:</strong> using encryption, access controls, and wireless security protocols.
        </>,
        <>
          <strong>Malware prevention:</strong> detecting, removing, and preventing malware threats.
        </>,
      ],
    },
    {
      title: "Core 2: Software troubleshooting (23%)",
      items: [
        <>
          <strong>OS issues:</strong> diagnosing and resolving problems with operating systems and applications.
        </>,
        <>
          <strong>Mobile troubleshooting:</strong> addressing connectivity, app, and performance issues.
        </>,
        <>
          <strong>Security concerns:</strong> fixing unauthorized access and malware issues.
        </>,
      ],
    },
    {
      title: "Core 2: Operational procedures (21%)",
      items: [
        <>
          <strong>Documentation:</strong> using best practices for system changes and documentation.
        </>,
        <>
          <strong>Safety and communication:</strong> following safety protocols and communicating effectively.
        </>,
        <>
          <strong>Backup and recovery:</strong> setting up workstation backup and recovery processes.
        </>,
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={comptiaHero}
        category="COMPTIA"
        title="A+ (Core 1 & Core 2)"
        description="CompTIA A+ is a widely recognized certification for Zero Knowledge that
              will help you start your IT career. Employers from a variety of
              industries value A+ because it fosters fundamental skills in
              networking, hardware, software, problem-solving, and security."
      />

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
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
              This intermediate specialization is designed for individuals who
              have basic IT knowledge and some experience in setup and
              troubleshooting. The competencies gained through the three courses
              equip learners for the CompTIA A+ certification exams and enhance
              their value for organizations in need of skilled IT professionals.
            </p>
            <p>
              Students should possess a basic understanding of IT fundamentals
              (ITF+) before starting this course. Those without this background
              are advised to first complete the IBM IT Support Professional
              Certificate or the IBM Information Technology and Cloud
              Fundamentals Specialization to develop the necessary skills.
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
                  Troubleshoot and fix problems involving laptops, mobile
                  devices, video and display configurations, networking,
                  storage, motherboards, CPUs, BIOS, and power supplies.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Explain how Active Directory, Windows security utilities, and
                  secure data deletion help safeguard mobile devices.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Identify and resolve issues with various printer types and
                  setups, and recognize common features and commands across
                  operating systems.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Demonstrate mastery of CompTIA A+ Core 1 and Core 2 topics by
                  completing practice certification exams successfully.
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
        <aside className="aside_contents">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={aPlusCerti}
              alt="A+ Certification Badge"
              className="w-55 h-55 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Help Desk Technician II",
              "Help Desk Technician III"
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
            {["At least one year of practical experience working in an IT support role"].map((job) => (
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
                <p className="">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="">Duration:</p>
                <p>5 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="">Time:</span>
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
              <p className="text-sm">Institutional Account</p>
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
            <a href="https://www.comptia.org/en-us/certifications/a/core-1-and-2-v15/#overview" target="_blank" className="text-sm font-medium underline mt-2">
              See the Official CompTIA A+ Exam Objectives
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={comptiaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CompTIA A+ certification exam."
      />
    </main>
  );
}
