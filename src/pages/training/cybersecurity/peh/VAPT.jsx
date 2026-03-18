// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import itil5 from "../../../../assets/itil5.webp"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function VAPT() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title:
        "Information Security Fundamentals & Operating System Command Line",
      items: [
        "Information Security Domains, CIA Triad, Threats, Risks & Vulnerabilities",
        "Penetration Testing Methodology & 5 Phases",
        "Linux Command Line Fundamentals (shortcuts, autocompletion, file structures, history)",
        "Windows Command Line Fundamentals (netstat, whoami, net users, systeminfo)",
        "VMware Lab Setup (Adding VMnet2, subnet configuration 192.168.2.0/24, NIC adapters)",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Setting up Kali Linux penetration testing environment",
            "Linux & Windows command-line mastery",
            "Network discovery and basic enumeration",
          ],
        },
      ],
    },
    {
      title: "Penetration Testing Process & Initial Foothold",
      items: [
        "Ethical Hacking & Types of Penetration Tests",
        "Generating payloads with msfvenom (Meterpreter & Windows Shell)",
        "File transfer techniques (SMB, SimpleHTTPServer, certutil)",
        "Exploit Development Lab: SLMail 5.5 Buffer Overflow",
        "Google Dorks for exploit research",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Building and deploying reverse shells",
            "Metasploit Multi/Handler listener",
            "Initial system compromise techniques",
          ],
        },
      ],
    },
    {
      title: "Establishing Foothold & Privilege Escalation Techniques",
      items: [
        "Windows Privilege Escalation (Kernel, Misconfigurations, Relay Attacks)",
        "Privilege Escalation using Startup Applications (weak folder permissions)",
        "Hot Potato Attack (NBNS spoofing + NTLM relay)",
        "Kernel Exploitation with Sherlock.ps1 & MS15-051",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Privilege escalation exercises on Windows 7 targets",
            "Meterpreter file upload & Netcat shells",
            "Post-exploitation system control",
          ],
        },
      ],
    },
    {
      title: "Fundamentals in Web & Web Application Technologies",
      items: [
        "Web Application Security Fundamentals & OWASP Top 10",
        "Manual SQL Injection techniques (Union-based)",
        "Database enumeration and dumping",
        {
          subTitle: "Hands-on Labs",
          items: [
            "DVWA Low Security SQL Injection (single quote test, column counting, database(), tables, users, passwords)",
            "Hash cracking (hashes.com)",
            "Web vulnerability exploitation",
          ],
        },
      ],
    },
    {
      title: "Exploit Development Basics, PowerShell Fundamentals & Capstone",
      items: [
        "Assembly x86 Fundamentals",
        "Buffer Overflow process & Python exploit creation",
        "PowerShell for Post-Exploitation",
        "Living off the Land techniques",
        "Penetration Test Reporting and Best Practices",
        {
          subTitle: "Hands-on Labs",
          items: [
            "Full SLMail 5.5 exploit development walkthrough",
            "Advanced post-exploitation",
            "Professional report writing",
          ],
        },
      ],
    },
    {
      title: "Final Project",
      items: [
        {
          subTitle:
            "Students will conduct a complete penetration test simulation on the Hack The Kingdom CTF environment, including:",
          items: [
            "Reconnaissance",
            "Exploitation",
            "Privilege escalation",
            "Report generation",
          ],
        },
        "Participants will present their findings similar to a real penetration testing engagement.",
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="Practical Ethical Hacking"
        title="Vulnerability Assessment & Penetration Testing (VAPT)"
        description="Participants will perform real penetration testing scenarios in controlled lab environments using 16 custom vulnerable VMs."
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
              The Practical Ethical Hacking: Vulnerability Assessment &
              Penetration Testing (PEH-VAPT) course is designed to enable those
              who aspire to enter the Information Security field in
              understanding the core concepts of network hacking in order to
              safeguard a network infrastructure. This course provides all the
              fundamental skills needed to carry out a thorough and professional
              penetration test against an enterprise network.
            </p>
            <p>
              This is a purely practical training course where students spend
              more time doing well-prepared hands-on hacking exercises in
              conjunction with theoretical discussion. The training covers the
              full penetration testing lifecycle including Reconnaissance,
              Vulnerability Assessment, Exploitation, Privilege Escalation,
              Post-Exploitation, and Reporting.
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
                  Understand the penetration testing methodology and the 5
                  phases
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Perform network reconnaissance, scanning, and enumeration</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Identify system and web application vulnerabilities</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Exploit vulnerable services using real tools and custom
                  payloads
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
              alt="Cyber Defense & Threat Hunting (CDTH) Bootcamp Certification Badge"
              className="w-45 h-45 lg:w-50 lg:h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Penetration Tester",
              "Ethical Hacker",
              "Vulnerability Assessment Analyst",
              "Red Team Operator",
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
            {[
              "IT Students Pursuing Cybersecurity Careers",
              "Network and System Administrators",
              "Security Analysts",
            ].map((job) => (
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
              Download the Practical Ethical Hacking Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Practical Ethical Hacking Enterprise exam."
      />
    </main>
  );
}
