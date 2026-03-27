import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Unstable or slow end-user connectivity",
  "Limited network access control and security",
  "Network congestion and performance issues",
  "Difficulty managing multiple devices and users",
  "Lack of visibility at the access layer of the network",
];

const DELIVERABLES = [
  {
    title: "Access Network Design and Planning",
    desc: "Develop efficient and secure user connectivity solutions.",
  },
  {
    title: "LAN and Wireless Network Deployment",
    desc: "Implement wired and wireless access solutions.",
  },
  {
    title: "User Access Control and Authentication",
    desc: "Secure network access with proper authorization mechanisms.",
  },
  {
    title: "Switch and Access Point Configuration",
    desc: "Ensure reliable and high-performance connectivity.",
  },
  {
    title: "Network Monitoring and Optimization",
    desc: "Track performance and resolve access issues efficiently.",
  },
  {
    title: "Maintenance and Support Services",
    desc: "Provide continuous support to ensure stable and secure access networks.",
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

export default function AccessNetworks() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Access Networks"
      heroDescription="MATEKK delivers reliable and secure access network solutions that provide seamless connectivity between end users and core network infrastructure, ensuring efficient communication and optimal performance."
      // Building section
      buildingTitle="Reliable, Secure, and High-Performance"
      buildingTitleHighlight="Access Connectivity"
      buildingDescription="Our access network solutions focus on delivering stable and high-speed connectivity to users and devices across your organization. MGKK designs and implements access layer infrastructure that ensures secure connections, minimizes latency, and supports a wide range of endpoints and applications."
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