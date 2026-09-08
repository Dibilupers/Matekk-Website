import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import peh from "../../../../assets/peh.png";
import vaptBadge from "../../../../assets/MATEKK_training_logo.png";
import CybersecurityHero from "../../../../assets/CyberSecurityheader.webp";
import CybersecurityFooter from "../../../../assets/CybersecurityFooter.webp";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

export default function PEH() {
  const [activeTab, setActiveTab] = useState("PEH");

  const pehModules = [
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

  const vaptModules = [
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

  const tabData = {
    PEH: {
      label: "Practical Ethical Hacking (PEH)",
      badge: peh,
      badgeAlt: "Practical Ethical Hacking Certification Badge",
      description:
        "A streamlined, targeted pathway designed for ITIL 4 certification holders to transition smoothly to ITIL Foundation (Version 5), focusing exclusively on the new updates and changes introduced in the latest version.",
      about: [
        "This course is tailored to help ITIL 4 professionals quickly and efficiently align with the latest ITIL Foundation (Version 5) framework. Rather than revisiting the foundational content you already know, it zeroes in on the key changes, emerging trends, and updated practices that reflect the evolving landscape of digital service management. By highlighting how value creation, digital service delivery, and management concepts have been refined, the course ensures you stay current and confident in applying ITIL principles in modern IT environments.",
      ],
      learn: [
        "Understand the penetration testing methodology and the 5 phases",
        "Perform network reconnaissance, scanning, and enumeration",
        "Identify system and web application vulnerabilities",
        "Exploit vulnerable services using real tools and custom payloads",
      ],
      modules: pehModules,
      jobOpportunities: [
        "IT Operations Specialist",
        "IT Development Manager",
        "Chief Digital Officer",
        "IT Specialist Change Management",
      ],
      targetLearners: [
        "Network and System Administrators",
        "Security Analysts",
        "Ethical Hacking Beginners",
      ],
      downloadLabel: "Download the Practical Ethical Hacking Exam Topics Here",
      downloadUrl: "#",
      footerDescription:
        "Advance your networking career and prepare for the Practical Ethical Hacking Enterprise exam.",
    },
    VAPT: {
      label: "Vulnerability Assessment & Penetration Testing (VAPT)",
      badge: vaptBadge,
      badgeAlt:
        "Vulnerability Assessment & Penetration Testing (VAPT) Bootcamp Certification Badge",
      description:
        "Participants will perform real penetration testing scenarios in controlled lab environments using 16 custom vulnerable VMs.",
      about: [
        "The Practical Ethical Hacking: Vulnerability Assessment & Penetration Testing (PEH-VAPT) course is designed to enable those who aspire to enter the Information Security field in understanding the core concepts of network hacking in order to safeguard a network infrastructure. This course provides all the fundamental skills needed to carry out a thorough and professional penetration test against an enterprise network.",
        "This is a purely practical training course where students spend more time doing well-prepared hands-on hacking exercises in conjunction with theoretical discussion. The training covers the full penetration testing lifecycle including Reconnaissance, Vulnerability Assessment, Exploitation, Privilege Escalation, Post-Exploitation, and Reporting.",
      ],
      learn: [
        "Set up and operate a Kali Linux penetration testing lab environment",
        "Generate payloads and establish reverse shells with msfvenom and Metasploit",
        "Escalate privileges on Windows targets and perform post-exploitation",
        "Develop buffer overflow exploits and produce professional penetration test reports",
      ],
      modules: vaptModules,
      jobOpportunities: [
        "Penetration Tester",
        "Ethical Hacker",
        "Vulnerability Assessment Analyst",
        "Red Team Operator",
      ],
      targetLearners: [
        "IT Students Pursuing Cybersecurity Careers",
        "Network and System Administrators",
        "Security Analysts",
      ],
      downloadLabel: "Download the VAPT Exam Topics Here",
      downloadUrl: "#",
      footerDescription:
        "Advance your cybersecurity career and prepare for the Vulnerability Assessment & Penetration Testing (VAPT) exam.",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={CybersecurityHero}
        category="Practical Ethical Hacking"
        title={active.label}
        description={active.description}
      />

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
        {/* ==================== LEFT SIDE ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== COURSE TABS ==================== */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(tabData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeTab === key
                    ? "bg-[#1775EE] text-white border-[#1775EE]"
                    : "bg-white text-[#1775EE] border-[#1775EE] hover:bg-[#EBF5FD]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* About Section */}
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            {active.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>

          {/* What You Will Learn */}
          <section className="flex flex-col gap-y-5">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {active.learn.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Course Content */}
          <section className="flex flex-col gap-y-5">
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <CourseModules modules={active.modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className="aside_contents">
          {/* Cert Badge */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            <img
              src={active.badge}
              alt={active.badgeAlt}
              className="w-45 h-45 lg:w-50 lg:h-50 object-contain"
            />
          </div>

          {/* Job Opportunities */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Job Opportunities</h5>
            {active.jobOpportunities.map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{job}</span>
              </p>
            ))}
          </div>

          {/* Target Learners */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Target Learners</h5>
            {active.targetLearners.map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>

          {/* Schedule */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Schedule</h5>
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

          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE]">Inclusions</h5>

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

            <a
              href={active.downloadUrl}
              className="text-sm font-medium underline mt-2"
            >
              {active.downloadLabel}
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER ==================== */}
      <TrainingTemplateFooter
        bgImage={CybersecurityFooter}
        description={active.footerDescription}
      />
    </main>
  );
}
