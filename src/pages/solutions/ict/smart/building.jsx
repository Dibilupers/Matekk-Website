import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Inefficient management of building systems and resources",
  "High operational and energy costs",
  "Lack of centralized control over building infrastructure",
  "Limited visibility into building performance and usage",
  "Difficulty maintaining comfort, safety, and sustainability standards",
];

const DELIVERABLES = [
  {
    title: "Smart Building Design and Planning",
    desc: "Develop integrated and scalable smart building architectures.",
  },
  {
    title: "Automation and Control Systems Integration",
    desc: "Connect and automate lighting, HVAC, and other systems.",
  },
  {
    title: "Energy Management Solutions",
    desc: "Optimize energy usage and reduce operational costs.",
  },
  {
    title: "Building Management System (BMS) Integration",
    desc: "Centralize monitoring and control of all building systems.",
  },
  {
    title: "Security and Access Control Integration",
    desc: "Enhance safety with integrated surveillance and access systems.",
  },
  {
    title: "Monitoring, Maintenance, and Optimization",
    desc: "Ensure continuous performance, efficiency, and system improvements.",
  },
];

const RELEVANT_PROJECTS = [
  {
    id: 1,
    src: ictImage,
    alt: "Smart Building Infrastructure",
    title: "Integrated Smart Building Systems",
    desc: "Centralized automation and monitoring of building systems including lighting, HVAC, and security.",
  },
  {
    id: 2,
    src: webImage,
    alt: "Energy Optimization",
    title: "Energy Efficiency Implementation",
    desc: "Deployment of intelligent energy management solutions to reduce operational costs.",
  },
  {
    id: 3,
    src: ictImage,
    alt: "Security Systems",
    title: "Advanced Security Integration",
    desc: "Implementation of surveillance and access control systems for enhanced safety.",
  },
  {
    id: 4,
    src: webImage,
    alt: "Automation Systems",
    title: "Building Automation",
    desc: "Automation of building operations for improved efficiency and occupant comfort.",
  },
  {
    id: 5,
    src: ictImage,
    alt: "Monitoring Systems",
    title: "Real-Time Monitoring",
    desc: "Continuous monitoring and analytics for performance optimization.",
  },
];

export default function SMARTBuilding() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="SMART Building"
      heroDescription="MATEKK delivers advanced smart building solutions that integrate automation, connectivity, and intelligent control systems to enhance efficiency, security, and sustainability across modern facilities."
      
      // Building section
      buildingTitle="Intelligent, Automated, and Energy-Efficient Building"
      buildingTitleHighlight="Solutions"
      buildingDescription="Our smart building services unify building systems such as lighting, HVAC, security, and energy management into a centralized, intelligent platform. MGKK enables real-time monitoring, automation, and data-driven control to improve operational efficiency, occupant comfort, and overall building performance."
      
      // Challenges section
      challengesHighlight="Challenges Addressed"
      challengesSuffix="by This Service"
      challenges={CHALLENGES}
      
      // Deliverables section
      deliverablesHighlight="Scope and Key Deliverables"
      deliverables={DELIVERABLES}
      
      // Footer banner
      footerBgImage={ICTConsultancyFooter}
      footerTitle="Contact Us Today To"
      footerHighlightText="Request a Consultation"
      footerDescription="Enhance your building operations with MATEKK Smart Building Solutions."
    >
      <RelevantProjects projects={RELEVANT_PROJECTS} />
    </SolutionsTemplate>
  );
}