// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import security from "../../../assets/security+.webp"; // Course badge image
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
export default function SecurityPlus() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "General security concepts (12%)",
      items: [
        <>
          <strong>Security controls:</strong> comparing technical, preventive, managerial, deterrent, operational, detective, physical, corrective, compensating, and directive controls.
        </>,
        <>
          <strong>Fundamental concepts:</strong> summarizing confidentiality, integrity, and availability (CIA), non-repudiation, authentication, authorization, and accounting (AAA), zero trust, and deceptive/disruption technology.
        </>,
        <>
          <strong>Change management:</strong> explaining business processes, technical implications of change, documentation, and version control.
        </>,
        <>
          <strong>Cryptographic solutions:</strong> using public-key infrastructure (PKI), encryption, obfuscation, hashing, digital signatures, and blockchain.
        </>
      ],
    },
    {
      title: "Threats, vulnerabilities, and mitigations (22%)",
      items: [
        <>
          <strong>Threat actors and motivations:</strong> comparing nation-states, unskilled attackers, hacktivists, insider threats, organized crime, and shadow IT; understanding their attributes, resources, espionage, and financial motivations.
        </>,
        <>
          <strong>Threat vectors and attack surfaces:</strong> explaining message-based, voice call, removable media, supply chain, network, wireless, cloud, and operational technology vectors.
        </>,
        <>
          <strong>Vulnerabilities:</strong> applying application, operating system, web, hardware, virtualization, operating system (OS), firmware, client-based, agentless, unsupported systems, and third-party vulnerabilities.
        </>,
        <>
          <strong>Malicious activity:</strong> analyzing malware attacks, password attacks, application attacks, advanced attacks, network attacks, and cryptographic attacks.
        </>,
        <>
          <strong>Mitigation techniques:</strong> using segmentation, access control, configuration enforcement, hardening, isolation, and patching.
        </>,
      ],
    },
    {
      title: "Security architecture (18%)",
      items: [
        <>
          <strong>Architecture models:</strong> comparing on-premises, cloud, virtualization, Internet of Things (IoT), industrial control systems (ICS), and microservices architecture.
        </>,
        <>
          <strong>Enterprise infrastructure:</strong> applying security principles to infrastructure considerations, secure selection, and network appliances.
        </>,
        <>
          <strong>Data protection:</strong> explaining data types, data classifications, general considerations, and data sovereignty.
        </>,
        <>
          <strong>Resilience and recovery:</strong> explaining high availability, site considerations, testing, power resilience, capacity, backups, and continuity of operations.
        </>,
      ],
    },
    {
      title: "Security operations (28%)",
      items: [
        <>
          <strong>Computing resources:</strong> applying secure baselines, mobile solutions, hardening, software security, application security, monitoring, and log monitoring.
        </>,
        <>
          <strong>Identity and access management:</strong> analyzing identity, authentication, authorization, and provisioning of hardware, software, and data assets.
        </>,
        <>
          <strong>Vulnerability management:</strong> identifying, analyzing, remediating, validating, and reporting vulnerabilities.
        </>,
        <>
          <strong>Alerting and monitoring:</strong> explaining monitoring tools and computing resource activities.
        </>,
        <>
          <strong>Enterprise security:</strong> involving firewalls, IDS/IPS, web filters, DNS (data loss prevention), DLP, (prevent content analysis), and SOAR (extended detection and response).
        </>,
        <>
          <strong>Identity and access management:</strong> implementing provisioning, PAM (single sign-on), MFA (multifactor authentication), and password vaults.
        </>,
        <>
          <strong>Automation and orchestration:</strong> explaining automation use cases, scripting benefits, and orchestration.
        </>,
        <>
          <strong>Incident response:</strong> explaining processes, training, testing, IOC, and threat hunting; root cause analysis, digital forensics.
        </>,
        <>
          <strong>Data sources:</strong> explaining log data and other sources to support investigations.
        </>,
      ],
    },
    {
      title: "Security program management and oversight (20%)",
      items: [
        <>
          <strong>Security governance:</strong> summarizing guidelines, policies, standards, procedures, external considerations, monitoring, and revisions; explaining incident response.
        </>,
        <>
          <strong>Risk management:</strong> explaining risk identification, assessment types, risk analysis, risk register, risk tolerance strategies, reporting, and business impact analysis (BIA).
        </>,
        <>
          <strong>Third-party risk:</strong> managing vendor assessment, selection, agreements, monitoring, questionnaires, and rules of engagement.
        </>,
        <>
          <strong>Security compliance:</strong> summarizing compliance reporting, consequences of non-compliance, monitoring, and privacy.
        </>,
        <>
          <strong>Security awareness:</strong> explaining infiltration, internal/external audits, and penetration testing.
        </>,
        <>
          <strong>Security discoveries:</strong> implementing phishing training, anomalous behavior recognition, user guidance, reporting, and monitoring.
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
        title="Security+"
        description="CompTIA Security+ is a widely recognized certification that serves
              as a starting point for a career in cybersecurity, showcasing
              practical skills for protecting networks, applications, and data.
              Vendor-neutral and acknowledged globally, it supports the
              development of a long-term career in security."
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
              This leading international certification verifies the essential
              abilities required for core security responsibilities and IT
              security roles. It demonstrates a professional’s capability to
              safeguard networks, applications, and devices while ensuring data
              confidentiality, integrity, and availability. With a strong focus
              on hands-on experience, Security+ equips individuals to address
              real-world security challenges and is a key credential for
              advancing in the dynamic field of cybersecurity.
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
                  Identify various threats, attacks, and vulnerabilities, such
                  as malware, social engineering, and application-based
                  exploits.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Use security technologies and tools—including firewalls,
                  intrusion detection systems, and endpoint protection—to defend
                  systems.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Design secure network architectures, configure protected
                  systems, and apply secure protocols in both system and network
                  setups.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Manage identity and access control by implementing
                  authentication, authorization, and accounting to ensure secure
                  access.
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
              src={security}
              alt="Security+ Certification Badge"
              className="w-55 h-55 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Cybersecurity Engineer",
              "Cybersecurity Specialist",
              "Cybersecurity Tester",
              "Cybersecurity Manager",
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
            {[" CompTIA Network+ certification", "About 2 years of hands-on experience in security or systems administration"].map((job) => (
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
                <p>5 Days</p>
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
            <a href="https://www.comptia.org/en-us/certifications/security/" target="_blank" className="text-sm font-medium underline mt-2">
              See the Official CompTIA Security+ Exam Objectives
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={comptiaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your networking career and prepare for the CompTIA Security+ certification exam."
      />
    </main>
  );
}
