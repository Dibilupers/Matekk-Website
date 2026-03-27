import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import RelevantProjects from "../../../components/solution_template/releveantprojects";
import ICTConsultancyHero from "../../../assets/ICTConsultancyHero.webp";
import ICTConsultancyFooter from "../../../assets/ICTConsultancyFooter.webp";
import ictImage from "../../../assets/ict.webp";
import webImage from "../../../assets/web.webp";

const CHALLENGES = [
  "Outdated or inefficient software systems slowing operations",
  "Difficulty integrating multiple platforms or tools",
  "Poor user experience affecting engagement and productivity",
  "Limited scalability to support business growth",
  "Challenges in maintaining software security and performance",
];

const DELIVERABLES = [
  {
    title: "Custom Web and Software Development",
    desc: "Build applications tailored to your business requirements.",
  },
  {
    title: "UI/UX Design and Optimization",
    desc: "Design interfaces that are user-friendly and visually engaging.",
  },
  {
    title: "System Integration and API Development",
    desc: "Ensure seamless connectivity across platforms and services.",
  },
  {
    title: "Performance Optimization and Scalability",
    desc: "Enhance speed, reliability, and capacity to grow with your business.",
  },
  {
    title: "Quality Assurance and Testing",
    desc: "Guarantee software is secure, reliable, and bug-free.",
  },
  {
    title: "Maintenance and Continuous Improvement",
    desc: "Provide ongoing support to keep solutions updated and efficient.",
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
export default function WebDev(){
    return (
        <SolutionsTemplate
          // Hero
          heroBgImage={ICTConsultancyHero}
          category="ICT Consultancy (PBOOT)"
          heroTitle="Web and Software Development"
          heroDescription="MATEKK transforms ideas into robust digital solutions, delivering scalable, high-performance web and software applications that streamline operations, enhance user experiences, and drive measurable business growth."
          // Building section
          buildingTitle="Innovative, Scalable, and High-Performance"
          buildingTitleHighlight="Digital Solutions"
          buildingDescription="MGKK builds custom web and software solutions tailored to your organization’s needs. From intuitive user interfaces to seamless system integration, we deliver applications that are reliable, secure, and scalable, ensuring your business stays efficient and competitive in a digital-first world."
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