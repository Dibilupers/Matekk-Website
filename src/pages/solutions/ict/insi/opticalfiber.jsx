import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Slow or inconsistent connectivity across multiple locations",
  "Limited bandwidth for large-scale data transfer",
  "High latency affecting real-time communication and applications",
  "Difficulty integrating multiple sites into a unified network",
  "Signal loss and performance issues over long distances",
];

const DELIVERABLES = [
  {
    title: "LAN and WAN Fiber Network Design",
    desc: "Develop efficient architectures for local and wide-area connectivity.",
  },
  {
    title: "Fiber Optic Backbone Implementation",
    desc: "Establish high-capacity links between network nodes and sites.",
  },
  {
    title: "Installation, Splicing, and Termination",
    desc: "Deploy and connect fiber infrastructure with precision.",
  },
  {
    title: "Network Integration and Configuration",
    desc: "Ensure seamless connectivity across all network layers.",
  },
  {
    title: "Testing, Monitoring, and Optimization",
    desc: "Validate performance and maintain optimal data transmission.",
  },
  {
    title: "Maintenance and Support Services",
    desc: "Provide continuous upkeep for long-term network reliability and scalability.",
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

export default function OpticalFiber() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Optical Fiber Networks (LAN and WAN)"
      heroDescription="MATEKK delivers advanced optical fiber network solutions for both LAN and WAN environments, enabling high-speed, secure, and reliable connectivity across local and wide-area infrastructures."
      // Building section
      buildingTitle="High-Speed, Scalable, and Interconnected"
      buildingTitleHighlight="Network Solutions"
      buildingDescription="Our optical fiber LAN and WAN solutions are designed to support seamless communication within and between multiple locations. MGKK ensures ultra-fast data transmission, minimal latency, and secure connectivity, empowering organizations to efficiently manage distributed operations and data-intensive applications."
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