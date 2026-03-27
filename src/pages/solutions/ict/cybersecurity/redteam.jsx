import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.webp";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";

const CHALLENGES = [
  "Unknown or untested security gaps across systems and processes",
  "Overreliance on defensive tools without real-world validation",
  "Lack of preparedness against advanced persistent threats (APTs)",
  "Weak incident detection and response capabilities",
  "Limited awareness of social engineering and human-factor risks",
];

const DELIVERABLES = [
  {
    title: "Red Team Engagement Planning",
    desc: "Define objectives, scope, and attack scenarios.",
  },
  {
    title: "Adversary Simulation",
    desc: "Execute real-world attack techniques across networks, applications, and personnel.",
  },
  {
    title: "Social Engineering Testing",
    desc: "Assess susceptibility to phishing and human-based attacks.",
  },
  {
    title: "Physical Security Testing",
    desc: "Evaluate on-site security controls and access points.",
  },
  {
    title: "Detection and Response Evaluation",
    desc: "Measure effectiveness of existing security monitoring and response.",
  },
  {
    title: "Comprehensive Reporting and Remediation Guidance",
    desc: "Deliver detailed findings with actionable improvements.",
  },
];

export default function RedTeamSolution() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Red Team"
      heroDescription="MATEKK delivers advanced Red Team operations that simulate real-world cyberattacks to test your organization's defenses, uncover hidden vulnerabilities, and strengthen overall security resilience."
      // Building section
      buildingTitle="Realistic, Offensive, and Intelligence-Led"
      buildingTitleHighlight="Security Testing"
      buildingDescription="Our Red Team services go beyond traditional testing by mimicking sophisticated attackers using real tactics, techniques, and procedures. MGKK evaluates not only your systems but also your people and processes, providing a comprehensive view of your organization's true security posture."
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