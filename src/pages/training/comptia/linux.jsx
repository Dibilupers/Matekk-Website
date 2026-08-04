// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import linux from "../../../assets/linux+.webp"; // Course badge image
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

// ==================== COMPONENT NAME ====================
export default function Linux() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "System Management (23%)",
      progress: 23,
      items: [
        <>
          <strong>Linux basics:</strong> Identify boot process steps, kernel, filesystems, and architectures.
        </>,
        <>
          <strong>Device management:</strong> Manage kernel modules, hardware components, and device utilities.
        </>,
        <>
          <strong>Storage management:</strong> Configure LVM, RAID, partitions, and mounted storage.
        </>,
        <>
          <strong>Network configuration:</strong> Set up hosts, DNS, interfaces, and network tools.
        </>,
        <>
          <strong>Shell operations:</strong> Use navigation, editing, redirection, and environment variables.
        </>,
        <>
          <strong>Backups and restores:</strong> Perform archiving, compression, and data recovery.
        </>,
        <>
          <strong>Virtualization:</strong> Deploy hypervisors, create VMs, and manage disk images.
        </>,
      ],
    },
    {
      title: "Services and User Management (20%)",
      items: [
        <>
          <strong>Files & directories:</strong> Control permissions, create links, and manage special files.
        </>,
        <>
          <strong>Account management:</strong> Add, remove, and modify users and groups.
        </>,
        <>
          <strong>Process control:</strong> Monitor states, adjust priorities, and schedule jobs.
        </>,
        <>
          <strong>Software management:</strong> Install, update, or remove packages and repositories.
        </>,
        <>
          <strong>Systems management:</strong> Start, stop, and review services, logs, and timers.
        </>,
        <>
          <strong>Containers:</strong> Operate container runtimes, manage images, and create networks.
        </>,
      ],
    },
    {
      title: "Security (18%)",
      items: [
        <>
          <strong>Auth & accounting:</strong> Configure PAM, LDAP, Kerberos, and enable auditing.
        </>,
        <>
          <strong>Firewalls:</strong> Set firewalls using iptables, nftables, UFW, and zone rules.
        </>,
        <>
          <strong>OS hardening:</strong> Apply permissions, configure sudo, and secure remote access.
        </>,
        <>
          <strong>Account security:</strong> Enforce password policies, restrict shells, and enable MFA.
        </>,
        <>
          <strong>Cryptography:</strong> Encrypt files, use hashing, and manage certificates.
        </>,
        <>
          <strong>Compliance:</strong> Verify integrity, run scans, and maintain standards.
        </>,
      ],
    },
    {
      title: "Automation, Orchestration, and Scripting (17%)",
      items: [
        <>
          <strong>Automation:</strong> Automate tasks with Ansible, Puppet, and CI/CD tools.
        </>,
        <>
          <strong>Shell scripting:</strong> Write and troubleshoot variables, functions, and logic flows.
        </>,
        <>
          <strong>Python basics:</strong> Develop scripts using environments, packages, and data types.
        </>,
        <>
          <strong>Version control:</strong> Manage code with Git workflows and tagging.
        </>,
        <>
          <strong>AI best practices:</strong> Apply code generation and prompt engineering responsibly.
        </>,
      ],
    },
    {
      title: "Troubleshooting (22%)",
      items: [
        <>
          <strong>System monitoring:</strong> Monitor health, logs, and event alerts.
        </>,
        <>
          <strong>Hardware/storage:</strong> Diagnose boot, mount, and repair issues.
        </>,
        <>
          <strong>Networking:</strong> Resolve firewall, routing, DNS, and connectivity problems.
        </>,
        <>
          <strong>Security:</strong> Fix SELinux, permission, and vulnerability issues.
        </>,
        <>
          <strong>Performance:</strong> Analyze CPU, memory, I/O, and optimize response times.
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
        title="Linux+"
        description="CompTIA Linux+ shows you how to manage, secure, and troubleshoot
              Linux systems in cloud and hybrid environments. With skills in
              automation, containers, and orchestration, it prepares you for
              high-demand roles that support critical business platforms."
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
              CompTIA Linux+ (V8) validates your skills in managing, securing,
              automating, and troubleshooting Linux systems across cloud and
              hybrid environments. Gain hands-on experience with automation,
              orchestration, security, and containers, preparing you for roles
              like Linux systems administrator, systems engineer, or network
              engineer, while demonstrating your ability to support critical
              business platforms.
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
                  Set up and manage Linux systems, storage, networks, and
                  services in cloud and hybrid environments.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Implement best practices for permissions, authentication,
                  firewalls, and system hardening.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Automate administrative tasks and improve workflows using
                  shell scripting, Python, and configuration management tools.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Deploy, maintain, and monitor containers and virtual machines
                  with top industry technologies.
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
              src={linux}
              alt="PenTest+ Certification Badge"
              className="w-55 h-55 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Network Engineer",
              "IoT Engineer",
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
            {["About 12 months of hands-on experience working with Linux servers", "CompTIA A+, Network+, or Server+ certification"].map((job) => (
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
            <div className="flex flex-col gap-2 ">
              <div className="flex justify-start gap-2">
                <p >Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p >Duration:</p>
                <p>5 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p >Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span >Time:</span>
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
              <p >Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p >Certificate of Completion</p>
            </div>

            {/* CHANGE: Download link text and URL */}
            <a href="https://www.comptia.org/en-us/certifications/linux/" target="_blank" className="text-sm font-medium underline mt-2">
              See the Official CompTIA Linux+ Exam Objectives
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={comptiaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your networking career and prepare for the CompTIA Linux+ certification exam."
      />
    </main>
  );
}
