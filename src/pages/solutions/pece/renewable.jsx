import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../components/solution_template/releveantprojects";
import dcHero from "../../../assets/CCNAHeroImageAutomation.webp";
import dcFooter from "../../../assets/CCNAFooterImageAutomation.webp";
import ictImage from "../../../assets/ict.webp";
import webImage from "../../../assets/web.webp";

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

// ==================== PAGE COMPONENT ====================

export default function Renewable() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={dcHero}
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
      footerBgImage={dcFooter}
      footerTitle="Contact Us Today To"
      footerHighlightText="Request a Consultation"
      footerDescription="Secure your organization's network with MGKK Information Communication Technology Services."
    >
      <RelevantProjects projects={RELEVANT_PROJECTS} />
    </SolutionsTemplate>
  );
}