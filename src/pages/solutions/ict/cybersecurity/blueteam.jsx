import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.webp";

const CHALLENGES = [
  "Limited real-time visibility into security threats and incidents",
  "Slow or ineffective incident detection and response",
  "Gaps in continuous monitoring and threat intelligence",
  "Difficulty maintaining a strong and updated security posture",
  "Lack of structured security operations and processes",
];

const DELIVERABLES = [
  {
    title: "Security Monitoring and Threat Detection",
    desc: "Implement real-time monitoring to identify potential threats.",
  },
  {
    title: "Incident Response and Management",
    desc: "Rapidly contain and mitigate security incidents.",
  },
  {
    title: "Security Information and Event Management (SIEM)",
    desc: "Centralize and analyze security data for better visibility.",
  },
  {
    title: "Threat Intelligence Integration",
    desc: "Leverage insights to anticipate and defend against emerging threats.",
  },
  {
    title: "Vulnerability Management Support",
    desc: "Continuously assess and address security weaknesses.",
  },
  {
    title: "Ongoing Security Operations and Improvement",
    desc: "Strengthen defenses through continuous evaluation and updates.",
  },
];

export default function BlueTeamSolution() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Blue Team"
      heroDescription="MATEKK delivers dedicated Blue Team services focused on defending, monitoring, and continuously improving your organization's security posture against evolving cyber threats."
      // Building section
      buildingTitle="Defensive, Continuous, and Intelligence-Driven"
      buildingTitleHighlight="Security Operations"
      buildingDescription="Our Blue Team services strengthen your organization's ability to detect, respond to, and recover from cyber incidents. MGKK implements proactive monitoring, threat detection, and incident response strategies to ensure your systems remain protected, resilient, and operational at all times."
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