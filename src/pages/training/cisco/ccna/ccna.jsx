// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import ccnaBadge from "../../../../assets/CCNA.png"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.webp"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.webp"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import InstitutionalIcon from "../../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CCNA() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Network Infrastructure and Connectivity",
      items: [
        "1.1 Diagnose interface and cable (copper and fiber) issues such as collisions, errors, mismatched duplex, speed, distance, interface, signal levels, pin out, and cable types",
        "1.2 Describe the role and function of hypervisors, virtual machines, and containers",
        "1.3 Troubleshoot IPv4 address configuration, assignment, and subnetting (public and private)",
        "1.4 Troubleshoot IPv6 address configuration, assignment, and prefix sizing (unicast and modified EUI 64)",
        {
          subTitle: "1.5 Describe wireless principles",
          items: [
            "1.5.a Band and channel selection",
            "1.5.b RF characteristics",
            "1.5.c Security protocols",
            "1.5.d Cause of interference",
          ],
        },
        "1.6 Troubleshoot wired and wireless client connectivity (IP configuration, network reachability, and wireless security parameters on Windows, MacOS, and Linux)",
        "1.7 Troubleshoot DHCPv4 client, server, and relay on IOS devices",
      ],
    },
    {
      title: "2.0 Switching and Network Access",
      items: [
        {
          subTitle:
            "2.1 Configure network infrastructure connectivity (switch-to-switch and switch-to-router)",
          items: [
            "2.1.a Layer 2/Layer 3 physical interfaces",
            "2.1.b Layer 2 802.1Q trunk interfaces",
            "2.1.c Layer 2/Layer 3 LACP port-channel/EtherChannel",
            "2.1.d Switch virtual interface (SVI)",
          ],
        },
        {
          subTitle:
            "2.2 Configure Layer 2 switch port attributes for edge-host connectivity (VLAN, PoE, port channel, and LACP)",
          items: [
            "2.2.a Desktop, printer, and IOT appliances",
            "2.2.b Wireless access points (standalone and controller based)",
            "2.2.c Voice over IP phone",
            "2.2.d Virtualized hosts",
            "2.2.e Network appliances",
          ],
        },
        "2.3 Validate the accuracy of network documentation using CDP and LLDP",
        "2.4 Troubleshoot basic Layer 2/Layer 3 connectivity and device operations using show commands (including show logs), ping, extended ping, trace route, and packet capture output",
        {
          subTitle:
            "2.5 Configure operations of the Rapid Per VLAN Spanning Tree Protocol (Rapid PVST+)",
          items: [
            "2.5.a Root port, root bridge (primary/secondary), and other port names",
            "2.5.b Port states and roles",
            "2.5.c PortFast",
            "2.5.d Root guard, loop guard, and BPDU guard",
          ],
        },
      ],
    },
    {
      title: "3.0 IP Routing",
      items: [
        "3.1 Interpret a routing table to identify the next hop for a packet (routing protocol, prefix/mask, administrative distance, metric, and default route)",
        {
          subTitle: "3.2 Troubleshoot IPv4 and IPv6 static routing",
          items: [
            "3.2.a Default route",
            "3.2.b Network route",
            "3.2.c Host route",
            "3.2.d Floating static",
          ],
        },
        {
          subTitle:
            "3.3 Configure single area OSPFv2 for IPv4 and OSPFv3 for IPv6",
          items: [
            "3.3.a Neighbor adjacencies (excluding authentication)",
            "3.3.b Point-to-point",
            "3.3.c Broadcast (DR/BDR selection)",
            "3.3.d Router ID",
          ],
        },
        "3.4 Interpret the operational status of First Hop Redundancy Protocols (HSRP and VRRP)",
      ],
    },
    {
      title: "4.0 Network Services and Security",
      items: [
        "4.1 Configure network devices with local usernames and as an AAA client (TACACS+ and RADIUS) for management",
        "4.2 Manage device configuration and software files using secure file transfer operations with SFTP/SCP",
        "4.3 Configure NAT/PAT on IOS XE routers",
        "4.4 Diagnose issues with DNS records (A, AAAA, CNAME, MX, NS, and PTR) to support host, web application, and mail server access by name",
        "4.5 Describe IPsec remote access and site-to-site VPNs (protocols and transport modes)",
        "4.6 Configure IPv4 access control lists (standard, extended, numbered, and named ACLs)",
        {
          subTitle: "4.7 Configure Layer 2 security features",
          items: [
            "4.7.a DHCP snooping",
            "4.7.b Dynamic ARP inspection",
            "4.7.c Storm control",
            "4.7.d RA guard",
            "4.7.e Port security",
          ],
        },
      ],
    },
    {
      title: "5.0 AI, and Network Operations and Management",
      items: [
        "5.1 Describe the role of agentic AI in network operations",
        "5.2 Select a prompt to send to a generative AI system to support network operations considering prompt components such as data classification, output format, persona, and instructions",
        "5.3 Describe network management approaches (device-based, cloud-based, controller-based, automation-based, and infrastructure as code)",
        "5.4 Describe the function of SNMP in network operations",
        "5.5 Use configuration management mechanisms such as Ansible to execute commands",
        "5.6 Interpret syslog message content, severity levels, and facilities",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNA"
        description="Implementing and Administering Cisco Solutions (200-301 CCNA) v2.0 is a 120-minute exam that tests a 
        candidate’s knowledge and skills related to IP routing, switching and network access, network services and security, 
        network infrastructure and connectivity, AI, and network operations and management."
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
              This course is designed to help learners prepare for the updated CCNA 200-301 
              v2.0 certification exam through instructor-led, face-to-face training. The program 
              includes guided instruction and targeted learning activities that reinforce key networking, 
              security, AI, and network operations concepts tested in the exam.
            </p>
            <p>
              The training covers essential topics related to IP routing, switching 
              and network access, network services and security, network infrastructure 
              and connectivity, AI, and network operations, with a focus on practical 
              hands-on skills and exam readiness.
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
                <p>Network Fundamentals Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>IP Connectivity Principles</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Network Security Basics</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Automation and Programmability Fundamentals</span>
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
        <aside className="aside_contents">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={ccnaBadge}
              alt="CCNA Automation Certification Badge"
              className="w-55 h-55 lg:w-100 lg:h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Network Engineer",
              "Network Administrator",
              "IT Support Specialist",
              "Junior Network Administrator",
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
            {[
              "Entry-level IT Professionals",
              "Career Shifters", 
              "Recent IT/CS/Engineering Graduates",
            ].map((job) => (
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
            <div className="flex flex-col gap-2 ">
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

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inlcusions - Title */}
            <h5 className="text-[#1775EE]">Inclusions</h5>

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
              <p>Institutional Account</p>
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
            <a
              href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf"
              target="_blank"
              className="font-medium underline mt-2"
            >
              Download the CCNA Exam Topics Here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your networking career and prepare for the CCNA 200-301 v2.0 certification exam."
      />
    </main>
  );
}
