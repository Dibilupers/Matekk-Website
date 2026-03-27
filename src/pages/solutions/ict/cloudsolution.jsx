import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../assets/ICTConsultancyHero.webp";
import ICTConsultancyFooter from "../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../assets/ict.webp";
import webImage from "../../../assets/web.webp";

const CHALLENGES = [
  "Limited scalability of on-premise IT infrastructure",
  "High operational costs associated with maintaining physical servers",
  "Difficulty managing remote teams and digital collaboration",
  "Security and compliance concerns with data storage and access",
  "Challenges migrating legacy systems to the cloud",
];

const DELIVERABLES = [
  {
    title: "Cloud Assessment and Strategy",
    desc: "Evaluate current infrastructure and design a cloud adoption roadmap.",
  },
  {
    title: "Cloud Migration Services",
    desc: "Seamlessly move applications, data, and workloads to the cloud.",
  },
  {
    title: "Infrastructure as a Service (IaaS) & Platform as a Service (PaaS)",
    desc: "Provide scalable and flexible cloud environments.",
  },
  {
    title: "Cloud Security and Compliance",
    desc: "Implement measures to protect data and ensure regulatory adherence.",
  },
  {
    title: "Performance Optimization and Monitoring",
    desc: "Ensure applications run efficiently and reliably in the cloud.",
  },
  {
    title: "Ongoing Support and Management",
    desc: "Continuous maintenance and updates to maximize cloud performance.",
  },
];

const RELEVANT_PROJECTS = [
  {
    id: 1,
    src: ictImage,
    alt: "Network and Security Infrastructure Projects",
    title:
      "Design, Consultancy, Build, Test and Acceptance of ICT Infrastructure",
    desc: "Centralized monitoring and control of interconnected substations via SCADA and ICT, and automating power distribution.",
  },
  {
    id: 2,
    src: webImage,
    alt: "SLSU Delegates",
    title: "SLSU Delegates Welcome",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    id: 3,
    src: ictImage,
    alt: "Team Celebration",
    title: "Team Celebration",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    id: 4,
    src: webImage,
    alt: "Ideas Workshop",
    title: "Ideas Workshop",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    id: 5,
    src: ictImage,
    alt: "Conference Panel",
    title: "Conference Panel",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

export default function CloudSolution() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Cloud Computing Services"
      heroDescription="MATEKK enables organizations to leverage the power of cloud computing, providing scalable, flexible, and cost-effective solutions that enhance collaboration, streamline operations, and support digital transformation initiatives."
      // Building section
      buildingTitle="Flexible, Scalable, and Secure"
      buildingTitleHighlight="Cloud Solutions"
      buildingDescription="Our cloud computing services help organizations adopt, manage, and optimize cloud environments. From infrastructure setup to application migration and ongoing management, MGKK ensures your business benefits from improved efficiency, reduced costs, and reliable access to critical data anytime, anywhere."
      // Challenges section
      challengesHighlight="Challenges Addressed"
      challengesSuffix="by This Service"
      challenges={CHALLENGES}
      // Deliverables section
      deliverablesHighlight="Deliverables"
      deliverables={DELIVERABLES}
      // Footer banner
      footerBgImage={ICTConsultancyFooter}
      footerTitle="Contact Us Today To"
      footerHighlightText="Request a Consultation"
      footerDescription="Secure your organization's network with MGKK Information Communication Technology Services."
    >
      <RelevantProjects projects={RELEVANT_PROJECTS} />
    </SolutionsTemplate>
  );
}