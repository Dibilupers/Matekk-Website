import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.webp";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "High costs of traditional telephony systems",
  "Poor call quality and unreliable communication lines",
  "Limited scalability for growing organizations",
  "Difficulty integrating voice with data and digital systems",
  "Lack of mobility and remote communication capabilities",
];

const DELIVERABLES = [
  {
    title: "IP Telephony System Design and Planning",
    desc: "Develop tailored voice communication architectures.",
  },
  {
    title: "VoIP Deployment and Configuration",
    desc: "Implement internet-based voice communication systems.",
  },
  {
    title: "IP PBX Installation and Setup",
    desc: "Configure centralized call management systems.",
  },
  {
    title: "Integration with Existing Network Infrastructure",
    desc: "Ensure seamless voice and data communication.",
  },
  {
    title: "Call Quality Optimization and Monitoring",
    desc: "Maintain clear, stable, and reliable voice performance.",
  },
  {
    title: "Maintenance and Technical Support",
    desc: "Provide ongoing support to ensure uninterrupted communication services.",
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

export default function IPTelephony() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="IP Telephony Networks"
      heroDescription="MATEKK delivers modern IP telephony solutions that enable reliable, cost-effective, and high-quality voice communication over your existing data network."
      // Building section
      buildingTitle="Smart, Scalable, and Unified"
      buildingTitleHighlight="Communication Solutions"
      buildingDescription="Our IP telephony services integrate voice, data, and communication systems into a unified platform, allowing seamless and efficient communication across your organization. MGKK ensures clear voice quality, flexible scalability, and enhanced collaboration for both on-site and remote teams."
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