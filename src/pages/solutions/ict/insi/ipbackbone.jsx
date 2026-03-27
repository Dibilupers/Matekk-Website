import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Inconsistent or unstable network connectivity",
  "Bottlenecks in data transmission and bandwidth usage",
  "Poorly structured network distribution systems",
  "Difficulty scaling networks to support expansion",
  "Limited visibility into network performance and traffic",
];

const DELIVERABLES = [
  {
    title: "Network Backbone and Distribution Design",
    desc: "Create efficient architectures for data flow and connectivity.",
  },
  {
    title: "Structured Cabling and Network Deployment",
    desc: "Implement organized and reliable network infrastructure.",
  },
  {
    title: "Switching and Routing Configuration",
    desc: "Optimize traffic flow across the network.",
  },
  {
    title: "Bandwidth Management and Optimization",
    desc: "Ensure efficient utilization of network resources.",
  },
  {
    title: "Network Monitoring and Performance Analysis",
    desc: "Provide visibility into network health and usage.",
  },
  {
    title: "Maintenance and Support Services",
    desc: "Ensure continuous performance and reliability of the network.",
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

export default function IPBackbone() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="IP Backbone and Distribution Networks"
      heroDescription="MATEKK delivers reliable IP backbone and distribution network solutions that ensure seamless connectivity, efficient data flow, and consistent network performance across your organization."
      // Building section
      buildingTitle="Efficient, Reliable, and Scalable"
      buildingTitleHighlight="Network Distribution Solutions"
      buildingDescription="Our services focus on designing and implementing structured network backbones and distribution systems that connect core infrastructure to end users. MGKK ensures optimized bandwidth utilization, stable connectivity, and scalable network architecture to support your growing operational needs."
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