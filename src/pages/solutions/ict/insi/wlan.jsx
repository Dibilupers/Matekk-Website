import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";

const CHALLENGES = [
  "Weak or inconsistent wireless signal coverage",
  "Limited network connectivity in remote or large areas",
  "High latency and unstable wireless performance",
  "Difficulty extending network connectivity without physical cabling",
  "Security risks in unsecured wireless environment",
];

const DELIVERABLES = [
  {
    title: "Wireless Network Design and Planning",
    desc: "Develop optimized WLAN and backhaul architectures.",
  },
  {
    title: "Wireless Access Point Deployment",
    desc: "Install and configure high-performance access points for wide coverage.",
  },
  {
    title: "Wireless Backhaul Implementation",
    desc: "Establish reliable point-to-point or point-to-multipoint connections.",
  },
  {
    title: "Network Security Configuration",
    desc: "Secure wireless networks with encryption and authentication protocols.",
  },
  {
    title: "Performance Optimization and Signal Tuning",
    desc: "Ensure strong, stable, and high-speed connectivity.",
  },
  {
    title: "Monitoring, Maintenance, and Support",
    desc: "Provide continuous oversight to maintain optimal wireless performance.",
  },
];


export default function WLAN() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="WLAN and Wireless Backhaul Networks"
      heroDescription="MATEKK delivers high-performance wireless networking solutions that ensure seamless connectivity, extended coverage, and reliable data transmission across your organization and remote locations."
      // Building section
      buildingTitle="Seamless, Scalable, and High-Coverage"
      buildingTitleHighlight="Wireless Solutions"
      buildingDescription="Our WLAN and wireless backhaul services are designed to provide stable and secure wireless connectivity for users and infrastructure. MGKK implements optimized wireless networks that deliver strong signal coverage, high-speed data transfer, and efficient communication between distributed network points."
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