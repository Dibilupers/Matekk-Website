import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ScrollToTop from "../components/scroll/ScrollToTop";

/* Cisco */
import CCNA from "../pages/training/cisco/ccna/ccna";
import CCNAAutomation from "../pages/training/cisco/ccna/automation";
import CCNACybersecurity from "../pages/training/cisco/ccna/cybersecurity";
import CCNPEnterprise from "../pages/training/cisco/ccnp/enterprise";
import CCNPSecurity from "../pages/training/cisco/ccnp/security";
import CCNPDatacenter from "../pages/training/cisco/ccnp/datacenter";
import SNCF from "../pages/training/cisco/ccnp/ccnp-security/300-710-SNCF-v1.1";
import SISE from "../pages/training/cisco/ccnp/ccnp-security/300-715-SISE-v1.1";
import SVPN from "../pages/training/cisco/ccnp/ccnp-security/300-730-SVPN-v1.1";
import SDSI from "../pages/training/cisco/ccnp/ccnp-security/300-745-SDSI-v1.1";

/* CompTIA */
import Aplus from "../pages/training/comptia/aplus";
import NetworkPlus from "../pages/training/comptia/network";
import SecurityPlus from "../pages/training/comptia/security+";
import CySA from "../pages/training/comptia/cysa";
import PenTest from "../pages/training/comptia/pentest";
import Linux from "../pages/training/comptia/linux";

/* CDCP */
import DCFC from "../pages/training/cdcp/dcfc";
import CDCP from "../pages/training/cdcp/cdcp";
import CDCS from "../pages/training/cdcp/cdcs";

/* Palo Alto */
import PaloaltoApprentice from "../pages/training/paloalto/networksecurity/apprentice";
import PaloaltoPractitioner from "../pages/training/paloalto/networksecurity/practitioner";
import NetworkSecurityProfessional from "../pages/training/paloalto/networksecurity/professional";
import NextGenerationFirewallEngineer from "../pages/training/paloalto/networksecurity/nextgenerationfirewallengineer";
import SDWanEngineer from "../pages/training/paloalto/networksecurity/sdwanengineer";
import SecurityServiceEdgeEngineer from "../pages/training/paloalto/networksecurity/securityserviceedgeengineer";
/* import NetworkSecurityAnalyst from "../pages/training/paloalto/networksecurity/analyst"; */
import NetworkSecurityArchitect from "../pages/training/paloalto/networksecurity/architect";

/* PROJECT MANAGEMENT */
import PMP from "../pages/training/projectmanagement/pmp";

/* IT MANAGEMENT */
import ITIL5 from "../pages/training/itil5/itil5";
/* Cloud */
import AzureFundamentals from "../pages/training/cloud/microsoft/azurefundamentals";
import AWSPractitioner from "../pages/training/cloud/aws/practitioner";
/* Cyberssecurity */
import BlueTeam from "../pages/training/cybersecurity/blueteam";
import RedTeam from "../pages/training/cybersecurity/redteam";

/* Solutions */
import Network from "../pages/solutions/ict/network";

export default function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Cisco */}
        <Route path="/training/cisco/ccna/ccna" element={<CCNA />} />
        <Route path="/training/cisco/ccna/automation" element={<CCNAAutomation />} />
        <Route path="/training/cisco/ccna/cybersecurity" element={<CCNACybersecurity />} />

        <Route path="/training/cisco/ccnp/enterprise" element={<CCNPEnterprise />} />
        <Route path="/training/cisco/ccnp/security" element={<CCNPSecurity />} />
        <Route path="/training/cisco/ccnp/datacenter" element={<CCNPDatacenter />} />

        <Route path="/training/cisco/ccnp/ccnp-security/300-710-SNCF-v1.1" element={<SNCF />} />
        <Route path="/training/cisco/ccnp/ccnp-security/300-715-SISE-v1.1" element={<SISE />} />
        <Route path="/training/cisco/ccnp/ccnp-security/300-730-SVPN-v1.1" element={<SVPN />} />
        <Route path="/training/cisco/ccnp/ccnp-security/300-745-SDSI-v1.1" element={<SDSI />} />

        {/* CompTIA */}
        <Route path="/training/comptia/aplus" element={<Aplus />} />
        <Route path="/training/comptia/network" element={<NetworkPlus />} />
        <Route path="/training/comptia/security+" element={<SecurityPlus />} />
        <Route path="/training/comptia/cysa" element={<CySA />} />
        <Route path="/training/comptia/pentest" element={<PenTest />} />
        <Route path="/training/comptia/linux" element={<Linux />} />

        {/* CDCP */}
        <Route path="/training/cdcp/dcfc" element={<DCFC />} />
        <Route path="/training/cdcp/cdcp" element={<CDCP />} />
        <Route path="/training/cdcp/cdcs" element={<CDCS />} />

        {/* Palo Alto */}
        <Route path="/training/paloalto/networksecurity/apprentice" element={<PaloaltoApprentice />} />
        <Route path="/training/paloalto/networksecurity/practitioner" element={<PaloaltoPractitioner />} />
        <Route path="/training/paloalto/networksecurity/professional" element={<NetworkSecurityProfessional />} />
        <Route path="/training/paloalto/networksecurity/nextgenerationfirewallengineer" element={<NextGenerationFirewallEngineer />} />
        <Route path="/training/paloalto/networksecurity/sdwanengineer" element={<SDWanEngineer />} />
        <Route path="/training/paloalto/networksecurity/securityserviceedgeengineer" element={<SecurityServiceEdgeEngineer />} />
        {/* <Route path="/training/paloalto/networksecurity/analyst" element={<NetworkSecurityAnalyst />} /> */}
        <Route path="/training/paloalto/networksecurity/architect" element={<NetworkSecurityArchitect />} />

        {/* Cybersecurity */}
        <Route path="/training/cybersecurity/blueteam" element={<BlueTeam />} />
        <Route path="/training/cybersecurity/redteam" element={<RedTeam />} />

        {/* Cloud */}
        <Route path="/training/cloud/microsoft/azurefundamentals" element={<AzureFundamentals />} />
        <Route path="/training/cloud/aws/practitioner" element={<AWSPractitioner />} />

        {/* ITIL */}
        <Route path="/training/itil5/foundation" element={<ITIL5 />} />

        {/* Project Management */}
        <Route path="/training/projectmanagement/pmp" element={<PMP />} />

        {/* Solutions */}
        <Route path="/solutions/ict/network" element={<Network />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}