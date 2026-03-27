import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Disorganized and inefficient cabling systems",
  "Frequent network issues due to poor cable management",
  "Difficulty troubleshooting and maintaining network infrastructure",
  "Limited scalability for future expansion",
  "Reduced performance due to cable interference or improper installation",
];

const DELIVERABLES = [
  {
    title: "Cabling Design and Planning",
    desc: "Develop structured layouts aligned with industry standards.",
  },
  {
    title: "Installation of Copper and Fiber Cabling",
    desc: "Deploy high-quality cabling for voice and data networks.",
  },
  {
    title: "Rack and Patch Panel Setup",
    desc: "Organize and manage network connections efficiently.",
  },
  {
    title: "Cable Management and Labeling",
    desc: "Ensure proper identification and easy maintenance.",
  },
  {
    title: "Testing and Certification",
    desc: "Validate performance and compliance with standards.",
  },
  {
    title: "Maintenance and Upgrades",
    desc: "Provide ongoing support and system enhancements for long-term reliability.",
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

export default function StructuredCabling() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Structured Cabling"
      heroDescription="MATEKK delivers organized and standards-based structured cabling solutions that provide a reliable foundation for voice, data, and network communication across your entire infrastructure."
      // Building section
      buildingTitle="Organized, Scalable, and Standards-Compliant"
      buildingTitleHighlight="Cabling Solutions"
      buildingDescription="Our structured cabling services ensure a well-planned and efficiently managed cabling system that supports current and future network requirements. MGKK designs and implements structured cabling that improves network performance, simplifies maintenance, and allows for easy scalability and upgrades."
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