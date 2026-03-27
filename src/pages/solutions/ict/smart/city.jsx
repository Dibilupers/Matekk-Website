import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.webp";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Inefficient urban infrastructure and resource management",
  "Limited integration between city systems and services",
  "Traffic congestion and transportation inefficiencies",
  "Public safety and emergency response limitations",
  "Environmental and energy sustainability challenges",
];

const DELIVERABLES = [
  {
    title: "Smart City Planning and Consultancy",
    desc: "Develop strategic roadmaps for smart city transformation.",
  },
  {
    title: "IoT and Sensor Network Deployment",
    desc: "Implement devices for real-time data collection and monitoring.",
  },
  {
    title: "Smart Infrastructure Integration",
    desc: "Connect transportation, utilities, and public services into one system.",
  },
  {
    title: "Data Analytics and Smart Platforms",
    desc: "Provide insights for better urban planning and decision-making.",
  },
  {
    title: "Public Safety and Security Systems",
    desc: "Enhance emergency response and surveillance capabilities.",
  },
  {
    title: "Sustainable Energy and Resource Management",
    desc: "Optimize energy usage and promote eco-friendly initiatives.",
  },
];

const RELEVANT_PROJECTS = [
  {
    id: 1,
    src: ictImage,
    alt: "Smart City Infrastructure",
    title: "Integrated Urban Systems",
    desc: "Unified digital ecosystem connecting transportation, utilities, and communication systems.",
  },
  {
    id: 2,
    src: webImage,
    alt: "Traffic Management",
    title: "Smart Traffic Solutions",
    desc: "Intelligent traffic monitoring and control to reduce congestion and improve mobility.",
  },
  {
    id: 3,
    src: ictImage,
    alt: "Public Safety",
    title: "Enhanced Public Safety",
    desc: "Deployment of smart surveillance and emergency response systems.",
  },
  {
    id: 4,
    src: webImage,
    alt: "Energy Systems",
    title: "Sustainable Energy Management",
    desc: "Smart grids and energy optimization for sustainable urban development.",
  },
  {
    id: 5,
    src: ictImage,
    alt: "Data Platforms",
    title: "Urban Data Intelligence",
    desc: "Real-time data analytics platforms for smarter city planning and governance.",
  },
];

export default function SMARTCity() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="SMART City"
      heroDescription="MATEKK delivers innovative smart city solutions that leverage advanced technologies, IoT, and data-driven systems to improve urban living, enhance public services, and promote sustainable development."
      
      // Building section
      buildingTitle="Connected, Intelligent, and Sustainable Urban"
      buildingTitleHighlight="Solutions"
      buildingDescription="Our smart city services integrate multiple systems such as transportation, public safety, energy, and communication into a unified digital ecosystem. MGKK enables real-time data monitoring, automation, and intelligent decision-making to help cities become more efficient, livable, and future-ready."
      
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
      footerDescription="Transform urban environments with MATEKK Smart City Solutions."
    >
      <RelevantProjects projects={RELEVANT_PROJECTS} />
    </SolutionsTemplate>
  );
}