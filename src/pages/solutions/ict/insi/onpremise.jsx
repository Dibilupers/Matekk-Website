import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Limited control over data in third-party or cloud environments",
  "Security and compliance concerns with sensitive information",
  "Dependence on external providers for infrastructure management",
  "Performance issues due to shared or virtualized resources",
  "Difficulty customizing infrastructure to specific business needs",
];

const DELIVERABLES = [
  {
    title: "Server Design and Infrastructure Planning",
    desc: "Develop customized on-site server solutions.",
  },
  {
    title: "Server Installation and Configuration",
    desc: "Deploy and set up physical servers based on requirements.",
  },
  {
    title: "Virtualization and Resource Management",
    desc: "Optimize server usage and efficiency.",
  },
  {
    title: "Data Security and Backup Solutions",
    desc: "Implement robust protection and disaster recovery systems.",
  },
  {
    title: "Performance Monitoring and Optimization",
    desc: "Ensure reliable and high-performing server operations.",
  },
  {
    title: "Maintenance and Technical Support",
    desc: "Provide ongoing support to maintain system stability and uptime.",
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

export default function OnPremise() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="On-Premise Servers"
      heroDescription="MATEKK delivers reliable on-premise server solutions that give organizations full control over their data, applications, and infrastructure, ensuring security, performance, and compliance within their own environment."
      // Building section
      buildingTitle="Secure, Controlled, and High-Performance"
      buildingTitleHighlight="Server Solutions"
      buildingDescription="Our on-premise server services are designed to provide dedicated infrastructure tailored to your organization's needs. MGKK ensures optimal performance, enhanced data security, and complete control over your systems, making it ideal for businesses that require strict data governance and localized infrastructure."
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