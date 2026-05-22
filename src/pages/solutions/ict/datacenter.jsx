import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../assets/ICTConsultancyFooter.jpg";


// ==================== PAGE DATA ====================

const CHALLENGES = [
  "Aging or inefficient data center infrastructure",
  "Limited redundancy and risk of downtime",
  "Security vulnerabilities in network and storage systems",
  "Inadequate monitoring and operational visibility",
  "Difficulty scaling infrastructure with business growth",
];

const DELIVERABLES = [
  {
    title: "Data Center Assessment and Consultancy",
    desc: "Analyze current infrastructure, identify gaps, and provide expert recommendations.",
  },
  {
    title: "Facility Planning and Layout Design",
    desc: "Optimize physical and virtual layouts for maximum efficiency and space utilization.",
  },
  {
    title: "Installation and Configuration of Servers, Storage, and Networking Equipment",
    desc: "Ensure seamless integration and reliability.",
  },
  {
    title: "Power, Cooling, and Environmental Control Systems Integration",
    desc: " Implement efficient systems to maintain uptime and operational stability.",
  },
  {
    title: "Testing, Validation, and Optimization",
    desc: "Confirm that systems meet performance, security, and reliability standards.",
  },
  {
    title: "Ongoing Monitoring and Improvement",
    desc: "Continuous support to ensure operational excellence and quick issue resolution.",
  },
];

// ==================== PAGE COMPONENT ====================

export default function DataCenter() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Data Center Facilities"
      heroDescription="MATEKK delivers end-to-end Data Center Facilities solutions that help organizations establish secure, efficient, and resilient infrastructure to support critical IT operations."
      // Building section
      buildingTitle="Reliable, Secure, and Scalable"
      buildingTitleHighlight="Data Center Solutions"
      buildingDescription="Our Data Center Facilities service covers planning, design, implementation, and optimization of physical and virtual data center infrastructure. We help organizations ensure high availability, scalability, and operational efficiency for all mission-critical systems."
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
