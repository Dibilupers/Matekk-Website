import SolutionsTemplate from "../../../components/solution_template/solutions_template";
import PECEhero from "../../../assets/PECEHeroImage.jpg";
import PECEfooter from "../../../assets/PECEFooterImage.webp";


const CHALLENGES = [
  "Delayed detection of fire hazards and emergencies",
  "Inadequate or outdated fire alarm systems",
  "High risk of property damage and safety incidents",
  "Compliance issues with fire safety regulations",
  "Lack of integration with other safety and building systems",
];

const DELIVERABLES = [
  {
    title: "FDAS Design and Planning",
    desc: "Develop compliant and efficient fire detection system layouts.",
  },
  {
    title: "Installation of Detectors and Alarm Devices",
    desc: "Deploy smoke, heat, and flame detection systems.",
  },
  {
    title: "Control Panel Configuration and Integration",
    desc: "Set up centralized monitoring and control systems.",
  },
  {
    title: "System Testing and Commissioning",
    desc: "Ensure proper functionality and reliability.",
  },
  {
    title: "Compliance and Safety Certification Support",
    desc: "Assist in meeting fire safety standards and regulations.",
  },
  {
    title: "Maintenance and Inspection Services",
    desc: "Provide regular system checks and preventive maintenance.",
  },
];


export default function FDAS() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={PECEhero}
      category="PECE Consultancy (PBOOT)"
      heroTitle="Fire Detection and Alarm Systems (FDAS)"
      heroDescription="MATEKK provides advanced fire detection and alarm solutions that ensure early warning, rapid response, and enhanced safety for people, assets, and facilities."
      // Building section
      buildingTitle="Fast, Reliable, and Life-Saving"
      buildingTitleHighlight="Fire Protection Solutions"
      buildingDescription="Our FDAS services are designed to detect fire hazards at the earliest stage and trigger immediate alerts. MGKK integrates intelligent sensors, alarm systems, and control panels to deliver accurate detection, minimize false alarms, and support quick emergency response for maximum protection."
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