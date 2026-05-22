import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import PECEhero from "../../../assets/PECEHeroImage.jpg";
import PECEfooter from "../../../assets/PECEFooterImage.webp";

// ==================== PAGE DATA ====================

const CHALLENGES = [
  "Rising energy costs and operational expenses",
  "Dependence on unreliable or non-sustainable power sources",
  "Lack of energy efficiency and optimization",
  "Environmental and regulatory compliance pressures",
  "Difficulty integrating renewable energy with existing systems",
];

const DELIVERABLES = [
  {
    title: "Energy Assessment and Feasibility Study",
    desc: "Evaluate energy needs and identify suitable renewable solutions.",
  },
  {
    title: "Solar Power System Design and Installation",
    desc: "Implement efficient and scalable solar energy systems.",
  },
  {
    title: "Energy Storage Solutions",
    desc: "Integrate battery systems for reliable power supply and backup.",
  },
  {
    title: "System Integration and Optimization",
    desc: "Ensure seamless integration with existing infrastructure.",
  },
  {
    title: "Monitoring and Performance Analysis",
    desc: "Track energy usage and system efficiency in real-time.",
  },
  {
    title: "Maintenance and Support Services",
    desc: "Provide ongoing maintenance to ensure long-term reliability and performance.",
  },
];


// ==================== PAGE COMPONENT ====================

export default function Renewable() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={PECEhero}
      category="PECE Consultancy (PBOOT)"
      heroTitle="Renewable Energy Solutions"
      heroDescription="MATEKK provides sustainable and efficient renewable energy solutions that help organizations reduce operational costs, improve energy reliability, and support environmental responsibility."
      // Building section
      buildingTitle="Sustainable, Efficient, and Future-Ready"
      buildingTitleHighlight="Energy Solutions"
      buildingDescription="Our renewable energy services focus on designing and implementing energy systems that harness clean and reliable sources such as solar power. MGKK helps organizations transition to greener operations while ensuring consistent performance, long-term savings, and reduced environmental impact."
      // Challenges section
      challengesHighlight="Challenges Addressed"
      challengesSuffix="by This Service"
      challenges={CHALLENGES}
      // Deliverables section
      deliverablesHighlight="Deliverables"
      deliverables={DELIVERABLES}
      // Footer banner
      footerBgImage={PECEfooter}
      footerTitle="Contact Us Today To"
      footerHighlightText="Request a Consultation"
      footerDescription="Secure your organization's network with MGKK Information Communication Technology Services."
    >
    </SolutionsTemplate>
  );
}