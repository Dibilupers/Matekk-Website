// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import cloudSecCerti from "../../../assets/nsecloudsecurity.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME ====================
export default function NSE6CloudSecurity() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 Cloud Security — FortiGate Cloud Deployment",
      items: [
        {
          subTitle: "1.1 Advanced Cloud Deployment Models",
          items: [
            "FortiGate VM sizing and instance types per cloud provider",
            "Single vs. dual-arm deployment architectures",
            "Transit VPC and inspection VPC design patterns",
            "Centralized vs. distributed security models",
            "Brownfield vs. greenfield cloud deployments",
          ],
        },
        {
          subTitle: "1.2 AWS Advanced Integration",
          items: [
            "AWS Gateway Load Balancer (GWLB) with FortiGate",
            "AWS Transit Gateway attachments and route tables",
            "VPC endpoints and PrivateLink security",
            "AWS SDN connector configuration",
            "CloudWatch integration for FortiGate monitoring",
          ],
        },
        {
          subTitle: "1.3 Azure Advanced Integration",
          items: [
            "Azure Route Server integration",
            "Azure Virtual WAN with FortiGate NVA",
            "Azure SDN connector and dynamic objects",
            "Azure Load Balancer health probes with FortiGate",
            "Azure Autoscale with FortiGate",
          ],
        },
        {
          subTitle: "1.4 GCP Advanced Integration",
          items: [
            "GCP shared VPC and service project security",
            "GCP SDN connector configuration",
            "GCP load balancer integration with FortiGate",
            "Cloud Armor and FortiGate complementary controls",
            "GCP network tags and FortiGate dynamic policies",
          ],
        },
      ],
    },
    {
      title: "2.0 Cloud Security — FortiGate CNF",
      items: [
        {
          subTitle: "2.1 Cloud-Native Firewall Overview",
          items: [
            "FortiGate CNF architecture and components",
            "CNF vs. FortiGate VM comparison",
            "Deployment scope: AWS and Azure CNF",
            "CNF subscription and licensing model",
            "Managed vs. customer-managed CNF",
          ],
        },
        {
          subTitle: "2.2 CNF Policy Management",
          items: [
            "Security policy sets in CNF",
            "FortiManager integration for CNF policy push",
            "CNF endpoint groups and dynamic objects",
            "Intrusion prevention in CNF",
            "Web filtering and application control in CNF",
          ],
        },
      ],
    },
    {
      title: "3.0 Cloud Security — FortiCWP and Cloud Posture",
      items: [
        {
          subTitle: "3.1 Cloud Workload Protection",
          items: [
            "FortiCWP architecture and cloud API integration",
            "Resource inventory and asset discovery",
            "Misconfiguration detection and remediation",
            "CIS benchmark compliance checks",
            "Multi-cloud posture dashboard",
          ],
        },
        {
          subTitle: "3.2 Cloud Compliance and Governance",
          items: [
            "Compliance frameworks: CIS, PCI-DSS, HIPAA, GDPR",
            "Custom compliance policy creation",
            "Automated remediation workflows",
            "Risk scoring and prioritization",
            "Audit trail and evidence collection",
          ],
        },
        {
          subTitle: "3.3 Container and Serverless Security",
          items: [
            "Kubernetes cluster security assessment",
            "EKS, AKS, and GKE security hardening",
            "Serverless function security controls",
            "Container image vulnerability scanning",
            "Runtime anomaly detection for workloads",
          ],
        },
      ],
    },
    {
      title: "4.0 Cloud Security — Advanced Automation and DevSecOps",
      items: [
        {
          subTitle: "4.1 Infrastructure as Code Security",
          items: [
            "Terraform modules for FortiGate cloud deployment",
            "ARM and Bicep templates for Azure FortiGate",
            "CloudFormation templates for AWS FortiGate",
            "IaC security scanning and policy-as-code",
            "GitOps workflows for network security",
          ],
        },
        {
          subTitle: "4.2 CI/CD Pipeline Integration",
          items: [
            "Security gates in Jenkins and GitHub Actions",
            "FortiDevSec integration for pipeline scanning",
            "SAST and DAST in DevSecOps pipelines",
            "API security testing automation",
            "Shift-left security principles",
          ],
        },
        {
          subTitle: "4.3 Cloud API and Automation",
          items: [
            "FortiGate REST API for cloud automation",
            "Ansible playbooks for FortiGate configuration",
            "Python SDK for Fortinet cloud management",
            "Event-driven automation with cloud functions",
            "FortiManager API for multi-cloud orchestration",
          ],
        },
      ],
    },
    {
      title: "5.0 Cloud Security — Advanced Troubleshooting",
      items: [
        {
          subTitle: "5.1 Cloud Connectivity Troubleshooting",
          items: [
            "Asymmetric routing issues in cloud deployments",
            "MTU and fragmentation in cloud VPNs",
            "Cloud provider flow logs analysis",
            "FortiGate packet capture in cloud environments",
            "SDN connector authentication failures",
          ],
        },
        {
          subTitle: "5.2 Cloud Performance and Scaling",
          items: [
            "Throughput benchmarking for cloud FortiGate instances",
            "Auto-scaling trigger configuration and tuning",
            "SR-IOV and DPDK for high-performance cloud instances",
            "Connection limits and session table management",
            "Cloud instance type migration strategies",
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
        title="NSE 6 Cloud Security"
        description="Learn to secure your network from email-based threats using FortiMail. This course provides hands-on experience in deployment, management, and advanced threat protection for critical business communications."
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
              In this course, you will explore common email security challenges
              and gain practical skills in deploying, managing, and
              troubleshooting FortiMail to protect your network from email-borne
              threats.
            </p>
            <p>
              You will also learn the role of FortiMail as a specialized
              security device and how its features deliver high-performance,
              in-depth protection for business-critical communications.
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
                  Integrate FortiMail with FortiSandbox for advanced threat
                  protection (ATP)
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Prevent accidental or intentional data leaks of confidential
                  or regulated information
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Archive email to meet compliance requirements</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Deploy high availability (HA) and redundant infrastructure to
                  ensure maximum uptime of critical email systems
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
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-3 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={cloudSecCerti}
              alt="NSE Clous Security Certification Badge"
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
