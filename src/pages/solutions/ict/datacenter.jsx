import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../assets/ict.webp";
import webImage from "../../../assets/web.webp";

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
      <RelevantProjects projects={RELEVANT_PROJECTS} />
    </SolutionsTemplate>
  );
}
