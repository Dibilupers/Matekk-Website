import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../components/solution_template/releveantprojects";
import PECEhero from "../../../assets/PECEHeroImage.jpg";
import PECEfooter from "../../../assets/PECEFooterImage.webp";
import ictImage from "../../../assets/ict.webp";
import webImage from "../../../assets/web.webp";

const CHALLENGES = [
  "Poor audio clarity and uneven sound coverage",
  "Ineffective communication during emergencies",
  "Outdated or unreliable PA systems",
  "Difficulty managing announcements across large areas",
  "Lack of integration with safety and security systems",
];

const DELIVERABLES = [
  {
    title: "PA System Design and Planning",
    desc: "Develop layouts for optimal sound coverage and clarity.",
  },
  {
    title: "Speaker and Amplifier Installation",
    desc: "Deploy high-quality audio equipment tailored to the environment.",
  },
  {
    title: "Centralized Control System Setup",
    desc: "Enable easy management of announcements and broadcasts.",
  },
  {
    title: "Integration with FDAS and Security Systems",
    desc: "Connect PA systems with emergency and safety solutions.",
  },
  {
    title: "System Testing and Audio Optimization",
    desc: "Ensure clear, consistent, and reliable sound performance.",
  },
  {
    title: "Maintenance and Technical Support",
    desc: "Provide ongoing service to maintain system reliability and efficiency.",
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

export default function PublicAddressSystems() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={PECEhero}
      category="PECE Consultancy (PBOOT)"
      heroTitle="Public Address Systems"
      heroDescription="MATEKK delivers high-quality public address solutions that enable clear, reliable communication across facilities, ensuring effective announcements, emergency alerts, and coordinated operations."
      // Building section
      buildingTitle="Clear, Scalable, and Mission-Critical"
      buildingTitleHighlight="Audio Solutions"
      buildingDescription="Our Public Address (PA) systems are designed to provide consistent and intelligible audio coverage for various environments. From routine announcements to emergency broadcasts, MGKK ensures your communication systems are dependable, easy to manage, and scalable to meet your operational needs."
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
      <RelevantProjects projects={RELEVANT_PROJECTS} />
    </SolutionsTemplate>
  );
}