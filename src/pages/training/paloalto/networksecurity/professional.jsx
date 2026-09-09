import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../../assets/PaloAltoProfessional.png";
import PaloAltoHero from "../../../../assets/PaloAltoHeader.webp";
import PaloAltoFooter from "../../../../assets/PaloAltoFooter.webp";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NetworkSecurityProfessional() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Network Security Fundamentals",
      items: [
        "1.1 Explain Application Layer inspection for Strata and SASE products",
        "1.2 Explain the functionality of slow path and fast path for packet inspection",
        {
          subTitle:
            "1.3 Explain the use of decryption on Strata and SASE products",
          items: [
            "1.3.1 SSL Forward Proxy",
            "1.3.2 SSL Inbound Inspection",
            "1.3.3 SSH Proxy",
            "1.3.4 no decrypt",
          ],
        },
        {
          subTitle: "1.4 Explain the application of network hardening methods for enhanced security on Strata and SASE products",
          items: [
            "1.4.1 Content-ID",
            "1.4.2 Zero Trust",
            "1.4.3 User-ID",
            "1.4.4 Device-ID",
            "1.4.5 Zones",
          ],
        },
      ],
    },
    {
      title: "2.0 NGFW and SASE Solution Functionality",
      items: [
        {
          subTitle: "2.1 Explain the function of Cloud NGFWs, PA-Series, CN-Series, and VM-Series firewalls",
          items: [
            "2.1.1 perimeter and core security", 
            "2.1.2 zone security and segmentation", 
            "2.1.3 high availability [HA]",
            "2.1.4 security and NAT policy implementation", 
            "2.1.5 monitoring and logging",
          ],
        },
        {
          subTitle: "2.2 Explain the function of Prisma SD-WAN",
          items: [
            "2.2.1 WAN optimization", 
            "2.2.2 path and NAT policies", 
            "2.2.3 Zone-based firewalls",
            "2.2.4 monitoring and logging", 
          ],
        },
        {
          subTitle: "2.3 Explain the function of Prisma Access",
          items: [
            "2.3.1 remote user configuration", 
            "2.3.2 remote network configuration", 
            "2.3.3 public and private application access",
            "2.3.4 security and NAT policy implementation", 
            "2.3.5 monitoring and logging"
          ],
        },
        "2.4 Explain the functionality of Panorama and Strata Cloud Manager (SCM) for managing Strata and SASE solutions",
      ],
    },
    {
      title: "3.0 Platform Solutions, Services, and Tools",
      items: [
        {
          subTitle: "3.1 Explain the security efficacy of Palo Alto Networks NGFW and Prisma SASE products",
          items: [
            "3.1.1 security and NAT policy", 
            "3.1.2 User-ID", 
            "3.1.3 App-ID",
            "3.1.4 decryption",
            "3.1.5 monitoring and logging",],
        },
        {
          subTitle: "3.2 Explain the functionality of Cloud-Delivered Security Services (CDSS) components",
          items: [
            "3.2.1 Internet of things (IoT) security", 
            "3.2.2 Enterprise Data Loss Prevention (DLP)", 
            "3.2.3 SaaS Security",
            "3.2.4 PAN-OS SD-WAN",
            "3.2.5 Premium GlobalProtect",
            "3.2.6 Advanced WildFire, Advanced Threat Prevention, Advanced URL Filtering, and Advanced DNS",],
        },
        {
          subTitle: "3.3 Explain the alignment of AIOps to Palo Alto Networks best practices",
          items: [
            "3.3.1 dashboards", 
            "3.3.2 Best Practice Assessment [BPA]", 
            "3.3.3 administration",
            ],
        },
        "3.4 Explain how Next-Generation Trust Security (NGTS) supports identity governance, trust relationships, and adaptive security decisions across the enterprise platform",
        {
          subTitle: "3.5 Identify and describe quantum security risks",
          items: [
            "3.5.1 harvest now", 
            "3.5.2 decrypt later attacks", 
            ],
        },
        {
          subTitle: "3.6 Identify Palo Alto Networks platform capabilities to address quantum security risks",
          items: [
            "3.6.1 post-quantum readiness", 
            "3.6.2 hybrid cryptography", 
            ],
        },
        {
          subTitle: "3.7 Identify and describe AI-related security risks and mitigation techniques",
          items: [
            "3.7.1 AI use",
            "3.7.2 sensitive data exposure",
            "3.7.3 AI application access",
            "3.7.4 AI-enabled threats",
            "3.7.5 Palo Alto Networks platform capabilities",
          ],
        },
      ],
    },
    {
      title: "4.0 ENGFW and SASE Solution Maintenance and Configuration",
      items: [
        {
          subTitle: "4.1 Explain the configuration and maintenance of Palo Alto Networks hardware firewalls, VM-Series firewalls, CN-Series firewalls, and Cloud NGFWs",
          items: [
            "4.1.1 Security policies",
            "4.1.2 profiles",
            "4.1.3 updates",
            "4.1.4 upgrades",
          ],
        }, 
        {
          subTitle: "4.2 Explain the configuration and maintenance of Prisma Access",
          items: [
            "4.2.1 Security policies",
            "4.2.2 profiles",
            "4.2.3 updates",
            "4.2.4 upgrades",
            "4.2.5 monitoring and logging",
          ],
        },      
      ],
    },
    {
      title: "5.0 Infrastructure Management and CDSS",
      items: [
        "5.1 Explain the function of Security policies, profiles, and updates in the configuration and maintenance of CDSS",
        "5.2 Explain the function of Security policies, Device-IDs, and monitoring and logging in the configuration and maintenance of IoT security",
        "5.3 Explain the function of data encryption, access control, and monitoring and logging in the configuration and maintenance of Enterprise DLP and Enterprise SaaS Security",
        "5.4 Explain the function of supported products, new device addition, reporting, and configuration management in SCM and Panorama in network security environments",
      ],
    },
    {
      title: "6.0 Connectivity and Security",
      items: [
        {
          subTitle: "6.1 Explain the configuration and maintenance of network security for on-premises, cloud, and hybrid networks",
          items: [
            "6.1.1 network segmentation",
            "6.1.2 policies",
            "6.1.3 monitoring and logging",
            "6.1.4 certificates",
          ],
        },
        {
          subTitle: "6.2 Identify and describe the components used to maintain connectivity and security of remote users",
          items: [
            "6.2.1 remote access solutions",
            "6.2.2 network segmentation",
            "6.2.3 Security policy tuning",
            "6.2.4 monitoring and logging",
            "6.2.5 certificates",
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={PaloAltoHero}
        category="Palo Alto"
        title="Network Security Professional"
        description="The Palo Alto Networks Certified Network Security Professional
              exam validates knowledge of Palo Alto Networks security solutions,
              including installation, configuration, deployment, and maintenance
              in enterprise environments."
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
              This course prepares learners for the Palo Alto Networks Certified
              Network Security Professional certification through guided
              instruction and hands-on activities. It covers core network
              security solutions, including installation, configuration,
              deployment, and basic maintenance of Palo Alto Networks products.
            </p>
            <p>
              The program develops practical skills and understanding to support
              exam success, with guidelines provided as a reference alongside
              additional study resources.
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
                <p>Advanced Firewall Deployment Strategies</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Threat Intelligence Integration Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Zero Trust Architecture Principles</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Network Security Policy Optimization</span>
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
              alt="Palo Alto Networks Certified Cybersecurity Apprentice Certification Badge"
              className="w-50 h-50 lg:w-60 lg:h-60 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Senior Network Security Engineer",
              "Security Solutions Architect",
              "Threat Prevention Specialist",
              "Security Infrastructure Manager",
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
            {["Beginners", "Zero Knowledge"].map((job) => (
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
              href="https://www.paloaltonetworks.com/content/dam/pan/en_US/assets/pdf/datasheets/education/netsec-professional-datasheet.pdf"
              target="_blank"
              className="font-medium underline mt-2"
            >
              Download the Palo Alto Networks Network Security Professional Here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={PaloAltoFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Palo Alto Enterprise exam."
      />
    </main>
  );
}
