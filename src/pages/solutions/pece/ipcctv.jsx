import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../components/solution_template/releveantprojects";
import dcHero from "../../../assets/CCNAHeroImageAutomation.webp";
import dcFooter from "../../../assets/CCNAFooterImageAutomation.webp";
import ictImage from "../../../assets/ict.webp";
import webImage from "../../../assets/web.webp";

const CHALLENGES = [
  "Limited visibility and monitoring of facilities",
  "Security risks due to lack of surveillance systems",
  "Poor image quality and unreliable recording systems",
  "Difficulty managing and accessing surveillance footage",
  "Inadequate coverage of critical areas",
];

const DELIVERABLES = [
  {
    title: "CCTV System Design and Planning",
    desc: "Develop surveillance layouts for maximum coverage and efficiency.",
  },
  {
    title: "IP and Analog Camera Installation",
    desc: "Deploy high-quality cameras based on specific requirements.",
  },
  {
    title: "Network Video Recorder (NVR) / Digital Video Recorder (DVR) Setup",
    desc: "Configure reliable storage and playback systems.",
  },
  {
    title: "Remote Monitoring and Access Setup",
    desc: "Enable real-time viewing from anywhere.",
  },
  {
    title: "System Integration and Optimization",
    desc: "Ensure seamless operation with existing security systems.",
  },
  {
    title: "Maintenance and Technical Support",
    desc: "Provide ongoing service to ensure continuous system performance.",
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

export default function IPCCTV() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={dcHero}
      category="PECE Consultancy (PBOOT)"
      heroTitle="IPCCTV and Analog CCTV"
      heroDescription="MATEKK provides reliable surveillance solutions through IP and Analog CCTV systems, helping organizations enhance security, monitor operations, and protect assets with confidence."
      // Building section
      buildingTitle="Clear, Reliable, and Intelligent"
      buildingTitleHighlight="Surveillance Solutions"
      buildingDescription="Our CCTV services deliver end-to-end surveillance systems tailored to your environment. From high-definition IP cameras to cost-effective analog setups, MGKK ensures optimal coverage, real-time monitoring, and secure recording, giving you complete visibility and control over your premises."
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