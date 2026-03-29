import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";


const CHALLENGES = [
  "Manual control of home systems and appliances",
  "Limited security and real-time monitoring at home",
  "High energy consumption and inefficient usage",
  "Lack of centralized control over devices and systems",
  "Difficulty integrating multiple smart devices",
];

const DELIVERABLES = [
  {
    title: "Smart Home Design and Planning",
    desc: "Develop customized automation solutions based on user needs.",
  },
  {
    title: "Device Integration and Automation Setup",
    desc: "Connect and configure smart lighting, appliances, and systems.",
  },
  {
    title: "Security and Surveillance Integration",
    desc: "Integrate smart locks, cameras, and alarms for enhanced safety.",
  },
  {
    title: "Mobile and Remote Control Systems",
    desc: "Enable control and monitoring via mobile applications.",
  },
  {
    title: "Energy Management and Optimization",
    desc: "Automate systems to reduce energy consumption and costs.",
  },
  {
    title: "Maintenance and Support Services",
    desc: "Provide ongoing updates, troubleshooting, and system improvements.",
  },
];

export default function SMARTHome() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="SMART Home"
      heroDescription="MATEKK delivers intelligent smart home solutions that enhance comfort, convenience, security, and energy efficiency through seamless automation and connected technologies."
      // Building section
      buildingTitle="Intelligent, Connected, and Convenient"
      buildingTitleHighlight="Living Solutions"
      buildingDescription="Our smart home services integrate IoT devices and automation systems to give you full control over lighting, security, appliances, and environment from a single platform. MGKK creates personalized smart environments that improve lifestyle, increase safety, and optimize energy usage."
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
    </SolutionsTemplate>
  );
}