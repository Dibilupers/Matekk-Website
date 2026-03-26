import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import ccnaBadge from "../../../assets/FortinetNSE5ClousSecurity.png";
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function NSE5CloudSecurity() {
  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const modules = [
    {
      title: "1.0 Cloud Security — Cloud Fundamentals",
      items: [
        {
          subTitle: "1.1 Cloud Architecture Overview",
          items: [
            "Public, private, and hybrid cloud models",
            "Shared responsibility model",
            "Cloud-native vs. cloud-enabled security",
            "Multi-cloud strategy and challenges",
            "Cloud security posture management (CSPM)",
          ],
        },
        {
          subTitle: "1.2 Major Cloud Platforms",
          items: [
            "Amazon Web Services (AWS) core services",
            "Microsoft Azure networking and security services",
            "Google Cloud Platform (GCP) fundamentals",
            "Cloud provider identity and access management",
            "Comparing security controls across providers",
          ],
        },
        {
          subTitle: "1.3 Cloud Networking Concepts",
          items: [
            "Virtual Private Cloud (VPC) and subnets",
            "Transit gateways and VPC peering",
            "Cloud-native load balancers",
            "Network security groups and access control lists",
            "Private endpoints and service links",
          ],
        },
      ],
    },
    {
      title: "2.0 Cloud Security — FortiGate in the Cloud",
      items: [
        {
          subTitle: "2.1 Deploying FortiGate on Cloud Platforms",
          items: [
            "FortiGate VM deployment on AWS, Azure, and GCP",
            "Marketplace deployment and BYOL vs. PAYG licensing",
            "Bootstrap configuration for cloud instances",
            "Auto-scaling FortiGate groups",
            "FortiGate CNF (Cloud-Native Firewall)",
          ],
        },
        {
          subTitle: "2.2 Cloud VPN and Connectivity",
          items: [
            "IPsec VPN between on-premises and cloud",
            "SD-WAN integration with cloud gateways",
            "AWS Transit Gateway with FortiGate",
            "Azure Virtual WAN integration",
            "GCP Cloud Interconnect and VPN",
          ],
        },
        {
          subTitle: "2.3 Cloud High Availability",
          items: [
            "Active-passive HA in cloud environments",
            "External and internal load balancer HA patterns",
            "SDN connector for failover automation",
            "IP address failover using cloud APIs",
            "Auto-scaling and horizontal scaling patterns",
          ],
        },
      ],
    },
    {
      title: "3.0 Cloud Security — FortiCASB and SaaS Protection",
      items: [
        {
          subTitle: "3.1 Cloud Access Security Broker (CASB)",
          items: [
            "CASB concepts and deployment modes",
            "Inline vs. API-based CASB",
            "Shadow IT discovery",
            "Data loss prevention (DLP) in SaaS",
            "FortiCASB for Microsoft 365 and Google Workspace",
          ],
        },
        {
          subTitle: "3.2 SaaS Application Control",
          items: [
            "Application visibility and risk scoring",
            "Policy enforcement for SaaS applications",
            "User activity monitoring in cloud apps",
            "Sanctioned vs. unsanctioned application management",
            "Compliance reporting for SaaS usage",
          ],
        },
      ],
    },
    {
      title: "4.0 Cloud Security — Cloud Workload Protection",
      items: [
        {
          subTitle: "4.1 Container and Kubernetes Security",
          items: [
            "Container security fundamentals",
            "Kubernetes network policies",
            "FortiGate as a Kubernetes ingress controller",
            "Runtime protection for containers",
            "Image scanning and vulnerability management",
          ],
        },
        {
          subTitle: "4.2 DevSecOps Integration",
          items: [
            "Infrastructure as Code (IaC) security",
            "CI/CD pipeline security scanning",
            "Terraform templates for FortiGate deployment",
            "API-driven security policy management",
            "CloudFormation and ARM template integration",
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
        title="NSE 5 Cloud Security"
        description="Learn to deploy, configure, and manage FortiWeb to protect web applications and cloud environments.
             This course provides hands-on experience with security policies, threat protection, and application 
             delivery features.
                                    "
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
              In this course, you will gain practical skills in deploying,
              configuring, and managing FortiWeb to protect web applications.
              You will learn to create security policies, implement high
              availability, and defend against threats using data validation,
              machine learning, API security, and bot mitigation.
            </p>
            <p>
              Aligned with Fortinet training, the course also covers DoS
              protection, logging, compliance standards such as PCI DSS and
              OWASP, FortiAI integration, and basic troubleshooting.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid flex-col lg:flex-col-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Explain the purpose of a web application firewall and its role
                  in the network
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Perform initial deployment and basic configuration of FortiWeb
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>
                  Configure FortiWeb for deployment in a load-balanced network
                </p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>
                  Implement SSL/TLS encryption, including inspection and
                  offloading
                </span>
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
              alt="Fortinet NSE 1 Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Entry-Level Security Analyst",
              "Junior Network Administrator",
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
            {["Intermediate"].map((job) => (
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
              <p>Institutional Accounts</p>
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
              Download the Palo Alto Exam Basics here
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
