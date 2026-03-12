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
import CCNPDatacenter from "../pages/training/cisco/ccnp/datacenter";
import CCNPSecurity from "../pages/training/cisco/ccnp/ccnp-security/security";
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

/* Fortinet */
import NSE6SecureNetworking from "../pages/training/fortinet/nse6securenetworking";
import NSE6SASE from "../pages/training/fortinet/nse6sase";
import NSE6CloudSecurity from "../pages/training/fortinet/NSE6CloudSecurity";
import NSE6SecurityOperations from "../pages/training/fortinet/nse6securityoperations";
import NSE7SecureNetworking from "../pages/training/fortinet/NSE7SecureNetworking";
import NSE7SASE from "../pages/training/fortinet/NSE7SASE";
import NSE7CloudSecurity from "../pages/training/fortinet/NSE7CloudSecurity";
import NSE7SecurityOperations from "../pages/training/fortinet/NSE7SecurityOperations";
import NSE8 from "../pages/training/fortinet/nse8";

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
import NetworkSecurityAnalyst from "../pages/training/paloalto/networksecurity/analyst";
import NetworkSecurityArchitect from "../pages/training/paloalto/networksecurity/architect";
import SecurityOperationsProfessional from "../pages/training/paloalto/securityoperations/professional";
import XsiamAnalyst from "../pages/training/paloalto/securityoperations/xsiamanalyst";
import XDRAnalyst from "../pages/training/paloalto/securityoperations/xdranalyst";
import XsiamEngineer from "../pages/training/paloalto/securityoperations/xsiamengineer";
import XDREngineer from "../pages/training/paloalto/securityoperations/xdrengineer";
import XsoarEngineer from "../pages/training/paloalto/securityoperations/xsoarengineer";
import CloudSecurityProfessional from "../pages/training/paloalto/cloudsecurity/professional";

/* Fortinet */
import NSE1 from "../pages/training/fortinet/nse1";
import NSE2 from "../pages/training/fortinet/nse2";
import NSE3 from "../pages/training/fortinet/nse3";
import NSE4 from "../pages/training/fortinet/nse4";
import NSE5securenetworking from "../pages/training/fortinet/nse5securenetworking";
import NSE5CloudSecurity from "../pages/training/fortinet/nse5cloudsecurity";
import NSE5SASE from "../pages/training/fortinet/nse5sase";
import NSE5SecurityOperations from "../pages/training/fortinet/nse5securityoperations";

/* PROJECT MANAGEMENT  */
import PMP from "../pages/training/projectmanagement/pmp";

/* IT MANAGEMENT */
import ITIL5 from "../pages/training/itil5/itil5";
/* Cloud */
import AzureFundamentals from "../pages/training/cloud/microsoft/azurefundamentals";
import AWSPractitioner from "../pages/training/cloud/aws/practitioner";
/* Cybersecurity */
import BlueTeam from "../pages/training/cybersecurity/blueteam";
import RedTeam from "../pages/training/cybersecurity/redteam";
import PEH from "../pages/training/cybersecurity/peh/PEH";
import CDTH from "../pages/training/cybersecurity/peh/CDTH";

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
        <Route
          path="/training/cisco/ccna/automation"
          element={<CCNAAutomation />}
        />
        <Route
          path="/training/cisco/ccna/cybersecurity"
          element={<CCNACybersecurity />}
        />

        <Route
          path="/training/cisco/ccnp/enterprise"
          element={<CCNPEnterprise />}
        />
        <Route
          path="/training/cisco/ccnp/datacenter"
          element={<CCNPDatacenter />}
        />

        <Route
          path="/training/cisco/ccnp/ccnp-security/security"
          element={<CCNPSecurity />}
        />
        <Route
          path="/training/cisco/ccnp/ccnp-security/sncf"
          element={<SNCF />}
        />
        <Route
          path="/training/cisco/ccnp/ccnp-security/sise"
          element={<SISE />}
        />
        <Route
          path="/training/cisco/ccnp/ccnp-security/svpn"
          element={<SVPN />}
        />
        <Route
          path="/training/cisco/ccnp/ccnp-security/sdsi"
          element={<SDSI />}
        />

        {/* CompTIA */}
        <Route path="/training/comptia/aplus" element={<Aplus />} />
        <Route path="/training/comptia/network" element={<NetworkPlus />} />
        <Route path="/training/comptia/security+" element={<SecurityPlus />} />
        <Route path="/training/comptia/cysa" element={<CySA />} />
        <Route path="/training/comptia/pentest" element={<PenTest />} />
        <Route path="/training/comptia/linux" element={<Linux />} />

        {/* Fortinet */}
        <Route
          path="/training/fortinet/nse6securenetworking"
          element={<NSE6SecureNetworking />}
        />
        <Route path="/training/fortinet/nse6sase" element={<NSE6SASE />} />
        <Route
          path="/training/fortinet/nse6cloudsecurity"
          element={<NSE6CloudSecurity />}
        />
        <Route
          path="/training/fortinet/nse6securityoperations"
          element={<NSE6SecurityOperations />}
        />
        <Route
          path="/training/fortinet/nse7securenetworking"
          element={<NSE7SecureNetworking />}
        />
        <Route path="/training/fortinet/nse7sase" element={<NSE7SASE />} />
        <Route
          path="/training/fortinet/nse7cloudsecurity"
          element={<NSE7CloudSecurity />}
        />
        <Route
          path="/training/fortinet/nse7securityoperations"
          element={<NSE7SecurityOperations />}
        />
        <Route path="/training/fortinet/nse8" element={<NSE8 />} />

        {/* CDCP */}
        <Route path="/training/cdcp/dcfc" element={<DCFC />} />
        <Route path="/training/cdcp/cdcp" element={<CDCP />} />
        <Route path="/training/cdcp/cdcs" element={<CDCS />} />

        {/* Palo Alto */}
        <Route
          path="/training/paloalto/networksecurity/apprentice"
          element={<PaloaltoApprentice />}
        />
        <Route
          path="/training/paloalto/networksecurity/practitioner"
          element={<PaloaltoPractitioner />}
        />
        <Route
          path="/training/paloalto/networksecurity/professional"
          element={<NetworkSecurityProfessional />}
        />
        <Route
          path="/training/paloalto/networksecurity/nextgenerationfirewallengineer"
          element={<NextGenerationFirewallEngineer />}
        />
        <Route
          path="/training/paloalto/networksecurity/sdwanengineer"
          element={<SDWanEngineer />}
        />
        <Route
          path="/training/paloalto/networksecurity/securityserviceedgeengineer"
          element={<SecurityServiceEdgeEngineer />}
        />
        <Route
          path="/training/paloalto/networksecurity/analyst"
          element={<NetworkSecurityAnalyst />}
        />
        <Route
          path="/training/paloalto/networksecurity/architect"
          element={<NetworkSecurityArchitect />}
        />
        <Route
          path="/training/paloalto/securityoperations/professional"
          element={<SecurityOperationsProfessional />}
        />
        <Route
          path="/training/paloalto/securityoperations/xsiamanalyst"
          element={<XsiamAnalyst />}
        />
        <Route
          path="/training/paloalto/securityoperations/xdranalyst"
          element={<XDRAnalyst />}
        />
        <Route
          path="/training/paloalto/securityoperations/xsiamengineer"
          element={<XsiamEngineer />}
        />
        <Route
          path="/training/paloalto/securityoperations/xdrengineer"
          element={<XDREngineer />}
        />
        <Route
          path="/training/paloalto/securityoperations/xsoarengineer"
          element={<XsoarEngineer />}
        />
        <Route
          path="/training/paloalto/cloudsecurity/professional"
          element={<CloudSecurityProfessional />}
        />

        {/* Fortinet */}
        <Route path="/training/fortinet/nse1" element={<NSE1 />} />
        <Route path="/training/fortinet/nse2" element={<NSE2 />} />
        <Route path="/training/fortinet/nse3" element={<NSE3 />} />
        <Route path="/training/fortinet/nse4" element={<NSE4 />} />
        <Route
          path="/training/fortinet/nse5securenetworking"
          element={<NSE5securenetworking />}
        />
        <Route
          path="/training/fortinet/nse5cloudsecurity"
          element={<NSE5CloudSecurity />}
        />
        <Route path="/training/fortinet/nse5sase" element={<NSE5SASE />} />
        <Route
          path="/training/fortinet/nse5securityoperations"
          element={<NSE5SecurityOperations />}
        />

        {/* Cybersecurity */}
        <Route path="/training/cybersecurity/blueteam" element={<BlueTeam />} />
        <Route path="/training/cybersecurity/redteam" element={<RedTeam />} />
        <Route path="/training/cybersecurity/peh" element={<PEH />} />
        <Route path="/training/cybersecurity/peh/cdth" element={<CDTH />} />

        {/* Cloud */}
        <Route
          path="/training/cloud/microsoft/azurefundamentals"
          element={<AzureFundamentals />}
        />
        <Route
          path="/training/cloud/aws/practitioner"
          element={<AWSPractitioner />}
        />

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
