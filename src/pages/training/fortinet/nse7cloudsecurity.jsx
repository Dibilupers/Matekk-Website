// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import CloudSecurity from "../../../assets/nsecloudsecurity.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function NSE7CloudSecurity() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 Cloud Security — Enterprise Cloud Architecture",
      items: [
        {
          subTitle: "1.1 Multi-Cloud Security Design",
          items: [
            "Multi-cloud reference architecture patterns",
            "Cloud security architecture frameworks (CSA, NIST)",
            "Security control mapping across AWS, Azure, and GCP",
            "Data sovereignty and residency considerations",
            "Enterprise cloud adoption framework and security maturity",
          ],
        },
        {
          subTitle: "1.2 Cloud Network Security Design",
          items: [
            "Hub-and-spoke vs. mesh cloud network topologies",
            "East-west and north-south traffic inspection design",
            "Cloud firewall insertion models",
            "Centralized egress and ingress security architectures",
            "Cloud security zones and segmentation strategy",
          ],
        },
        {
          subTitle: "1.3 Cloud Identity and Access Architecture",
          items: [
            "Cloud IAM design principles and least privilege",
            "Federated identity across cloud providers",
            "Privileged access management (PAM) in cloud",
            "Service account and workload identity security",
            "Just-in-time access provisioning strategies",
          ],
        },
      ],
    },
    {
      title: "2.0 Cloud Security — Advanced FortiGate Cloud Deployment",
      items: [
        {
          subTitle: "2.1 High-Availability Cloud Architecture",
          items: [
            "Active-active FortiGate HA with GWLB on AWS",
            "Zone-redundant FortiGate deployment on Azure",
            "Multi-region failover architecture",
            "Asymmetric routing resolution in HA cloud designs",
            "Session synchronization across availability zones",
          ],
        },
        {
          subTitle: "2.2 FortiGate CNF at Scale",
          items: [
            "CNF multi-account and multi-VPC deployment",
            "CNF policy inheritance and segmentation",
            "CNF integration with AWS Network Firewall policy",
            "Performance scaling with CNF auto-provisioning",
            "CNF logging and FortiAnalyzer cloud integration",
          ],
        },
        {
          subTitle: "2.3 Cloud VPN and Interconnect at Scale",
          items: [
            "Redundant IPsec with BGP failover in cloud",
            "AWS Direct Connect and Azure ExpressRoute security",
            "Transit hub design with FortiGate and cloud routers",
            "ADVPN integration with cloud SD-WAN",
            "Encrypted interconnects between cloud regions",
          ],
        },
      ],
    },
    {
      title: "3.0 Cloud Security — Cloud-Native Security Integration",
      items: [
        {
          subTitle: "3.1 Kubernetes and Service Mesh Security",
          items: [
            "Kubernetes network policy enforcement with FortiGate",
            "Service mesh security with Istio and FortiGate",
            "East-west traffic inspection in Kubernetes clusters",
            "FortiGate Ingress Controller advanced configuration",
            "Multi-cluster security policy consistency",
          ],
        },
        {
          subTitle: "3.2 Serverless and PaaS Security",
          items: [
            "Securing AWS Lambda, Azure Functions, and GCP Cloud Run",
            "API gateway security and WAF integration",
            "Event-driven security automation with serverless",
            "PaaS service endpoint security controls",
            "Data security for managed database services",
          ],
        },
        {
          subTitle: "3.3 Supply Chain and CI/CD Security",
          items: [
            "Software supply chain attack vectors",
            "Container registry security and image signing",
            "Pipeline integrity controls and SLSA framework",
            "FortiDevSec advanced pipeline integration",
            "Dependency vulnerability management at scale",
          ],
        },
      ],
    },
    {
      title: "4.0 Cloud Security — Cloud Incident Response",
      items: [
        {
          subTitle: "4.1 Cloud Forensics",
          items: [
            "Cloud provider audit log forensics (CloudTrail, Activity Log)",
            "VPC flow log analysis for incident investigation",
            "Cloud storage forensics and evidence preservation",
            "Volatile data collection from cloud instances",
            "Cross-account forensic investigation procedures",
          ],
        },
        {
          subTitle: "4.2 Cloud Threat Detection and Response",
          items: [
            "Cloud-native threat detection: AWS GuardDuty, Azure Defender",
            "Integrating cloud alerts into FortiSIEM and FortiSOAR",
            "Automated cloud incident response with Lambda and Logic Apps",
            "Cloud ransomware detection and containment",
            "Insider threat detection in cloud environments",
          ],
        },
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="FORTINET"
        title="NSE 7 Cloud Security"
        description="Learn to deploy and secure Fortinet solutions in public cloud environments. This course provides hands-on experience using automation tools, troubleshooting cloud connectivity, and managing risks with FortiCNAPP."
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
              In this course, you will gain practical skills to deploy Fortinet
              solutions in public cloud environments using various methods.
            </p>
            <p>
              You will learn to leverage third-party automation tools to deploy
              and secure cloud resources, troubleshoot common connectivity
              issues in AWS and Azure, and use FortiCNAPP to simplify risk
              management for cloud workloads.
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
                <p>Apply best practices for cloud deployments</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Use automation tools to deploy resources in AWS</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Deploy Fortinet solutions to secure IaaS environments</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Deploy Fortinet solutions to secure CaaS environments</p>
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
              src={CloudSecurity}
              alt="Cloud Security Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Junior Network Administrator",
              "Entry-Level Security Analyst",
              "IT Security Associate",
              "Cybersecurity Intern",
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
            {["Beginners"].map((job) => (
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
                  src={InstitutionalIcon}
                  alt="Institutional Account"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Institutional Accounts</p>
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
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the Fortinet Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the Fortinet Enterprise exam."
      />
    </main>
  );
}
