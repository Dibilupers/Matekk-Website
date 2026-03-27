import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";
import ictImage from "../../../../assets/ict.webp";
import webImage from "../../../../assets/web.webp";

const CHALLENGES = [
  "Fragmented and inconsistent security controls across systems",
  "Lack of alignment between security strategy and business goals",
  "Difficulty managing complex and growing IT environments",
  "Gaps in governance, risk management, and compliance",
  "Limited visibility into overall security posture",
];

const DELIVERABLES = [
  {
    title: "Security Architecture Design and Framework Development",
    desc: "Build structured and scalable security models.",
  },
  {
    title: "Risk Assessment and Security Gap Analysis",
    desc: "Identify weaknesses and prioritize improvements.",
  },
  {
    title: "Policy, Standards, and Governance Setup",
    desc: "Establish clear security policies and procedures.",
  },
  {
    title: "Integration of Security Controls and Technologies",
    desc: "Align tools and systems into a unified architecture.",
  },
  {
    title: "Compliance and Regulatory Alignment",
    desc: "Ensure adherence to industry standards and requirements.",
  },
  {
    title: "Continuous Improvement and Advisory Services",
    desc: "Evolve security strategies with changing threats and business needs.",
  },
];


export default function EnterpriseSecurityArchitecture() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Enterprise Security Architecture"
      heroDescription="MATEKK designs comprehensive enterprise security architectures that align security strategies with business objectives, ensuring end-to-end protection across systems, networks, and data."
      // Building section
      buildingTitle="Holistic, Scalable, and Risk-Aligned"
      buildingTitleHighlight="Security Frameworks"
      buildingDescription="Our enterprise security architecture services focus on building a unified and structured security framework that integrates people, processes, and technology. MGKK helps organizations establish strong security foundations, enabling consistent protection, improved governance, and long-term resilience against evolving cyber threats."
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
