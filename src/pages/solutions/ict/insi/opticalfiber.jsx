import SolutionsTemplate from "../../../../components/solution_template/solutions_template";
import ICTConsultancyHero from "../../../../assets/ICTConsultancyHero.jpg";
import ICTConsultancyFooter from "../../../../assets/ICTConsultancyFooter.jpg";

const CHALLENGES = [
  "Slow or inconsistent connectivity across multiple locations",
  "Limited bandwidth for large-scale data transfer",
  "High latency affecting real-time communication and applications",
  "Difficulty integrating multiple sites into a unified network",
  "Signal loss and performance issues over long distances",
];

const DELIVERABLES = [
  {
    title: "LAN and WAN Fiber Network Design",
    desc: "Develop efficient architectures for local and wide-area connectivity.",
  },
  {
    title: "Fiber Optic Backbone Implementation",
    desc: "Establish high-capacity links between network nodes and sites.",
  },
  {
    title: "Installation, Splicing, and Termination",
    desc: "Deploy and connect fiber infrastructure with precision.",
  },
  {
    title: "Network Integration and Configuration",
    desc: "Ensure seamless connectivity across all network layers.",
  },
  {
    title: "Testing, Monitoring, and Optimization",
    desc: "Validate performance and maintain optimal data transmission.",
  },
  {
    title: "Maintenance and Support Services",
    desc: "Provide continuous upkeep for long-term network reliability and scalability.",
  },
];


export default function OpticalFiber() {
  return (
    <SolutionsTemplate
      // Hero
      heroBgImage={ICTConsultancyHero}
      category="ICT Consultancy (PBOOT)"
      heroTitle="Optical Fiber Networks (LAN and WAN)"
      heroDescription="MATEKK delivers advanced optical fiber network solutions for both LAN and WAN environments, enabling high-speed, secure, and reliable connectivity across local and wide-area infrastructures."
      // Building section
      buildingTitle="High-Speed, Scalable, and Interconnected"
      buildingTitleHighlight="Network Solutions"
      buildingDescription="Our optical fiber LAN and WAN solutions are designed to support seamless communication within and between multiple locations. MGKK ensures ultra-fast data transmission, minimal latency, and secure connectivity, empowering organizations to efficiently manage distributed operations and data-intensive applications."
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