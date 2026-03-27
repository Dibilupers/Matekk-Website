import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";


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
    </SolutionsTemplate>
  );
}