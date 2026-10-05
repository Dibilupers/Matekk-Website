import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import PECEhero from "../../../assets/PECEHeroImage.jpg";
import PECEfooter from "../../../assets/PECEFooterImage.webp";

const CHALLENGES = [
  "Unauthorized access to restricted areas",
  "Lack of visibility and control over entry points",
  "Security risks with traditional lock-and-key systems",
  "Difficulty managing employee or visitor access",
  "Limited tracking and audit of access activities",
];

const DELIVERABLES = [
  {
    title: "Access Control System Design and Planning",
    desc: "Create secure and efficient entry management solutions.",
  },
  {
    title: "Installation of Access Devices",
    desc: "Deploy RFID, biometric, and keypad-based systems.",
  },
  {
    title: "User Access Management Setup",
    desc: "Configure roles, permissions, and authentication levels.",
  },
  {
    title: "Integration with CCTV and Security Systems",
    desc: "Enhance monitoring and incident response.",
  },
  {
    title: "Real-Time Monitoring and Reporting",
    desc: "Track access logs and generate audit reports.",
  },
  {
    title: "Maintenance and Technical Support",
    desc: "Ensure continuous system performance and reliability.",
  },
];


export default function DoorAccessControl() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={PECEhero}
      category="PECE Consultancy (PBOOT)"
      heroTitle="Door Access Control Systems"
      heroDescription="MATEKK provides secure and efficient door access control solutions that help organizations manage, monitor, and restrict entry to critical areas, ensuring safety and accountability."
      // Building section
      buildingTitle="Secure, Controlled, and Intelligent"
      buildingTitleHighlight="Access Management"
      buildingDescription="Our door access systems use advanced technologies such as RFID, biometrics, and keypad authentication to regulate entry points. MGKK enables organizations to maintain full control over who enters their premises, improve security, and track access activity in real time."
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
    </SolutionsTemplate>
  );
}