import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CCNA from "../pages/training/cisco/ccna/ccna";
import CCNAAutomation from "../pages/training/cisco/ccna/automation";
import CCNPEnterprise from "../pages/training/cisco/ccnp/enterprise";
import CCNPSecurity from "../pages/training/cisco/ccnp/security";
import CCNPDatacenter from "../pages/training/cisco/ccnp/datacenter";
import SNCF from "../pages/training/cisco/ccnp/ccnp-security/300-710-SNCF-v1.1";
import SISE from "../pages/training/cisco/ccnp/ccnp-security/300-715-SISE-v1.1";
import SVPN from "../pages/training/cisco/ccnp/ccnp-security/300-730-SVPN-v1.1";
import SDSI from "../pages/training/cisco/ccnp/ccnp-security/300-745-SDSI-v1.1";
import PaloaltoApprentice from "../pages/training/cisco/paloalto/networksecurity/apprentice";
import PaloaltoPractitioner from "../pages/training/cisco/paloalto/networksecurity/practitioner";
import NetworkSecurityProfessional from "../pages/training/cisco/paloalto/networksecurity/professional";
import NextGenerationFirewallEngineer from "../pages/training/cisco/paloalto/networksecurity/nextgenerationfirewallengineer";  
import Network from "../pages/solutions/ict/network";
import ScrollToTop from "../components/scroll/ScrollToTop";
import CCNACybersecurity from "../pages/training/cisco/ccna/cybersecurity";
import Aplus from "../pages/training/cisco/comptia/aplus";
import NetworkPlus from "../pages/training/cisco/comptia/network";
import SecurityPlus from "../pages/training/cisco/comptia/security+";
import CySA from "../pages/training/cisco/comptia/cysa";
import PenTest from "../pages/training/cisco/comptia/pentest";
import Linux from "../pages/training/cisco/comptia/linux";

export default function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
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
          path="/training/cisco/ccnp/security"
          element={<CCNPSecurity />}
        />
        <Route
          path="/training/cisco/ccnp/datacenter"
          element={<CCNPDatacenter />}
        />
        <Route
          path="/training/cisco/ccnp/ccnp-security/300-710-SNCF-v1.1"
          element={<SNCF />}
        />
        <Route
          path="/training/cisco/ccnp/ccnp-security/300-715-SISE-v1.1"
          element={<SISE />}
        />
          <Route
            path="/training/cisco/ccnp/ccnp-security/300-730-SVPN-v1.1"
            element={<SVPN />}
          />
        <Route
          path="/training/cisco/ccnp/ccnp-security/300-745-SDSI-v1.1"
          element={<SDSI />}
        />
        <Route
          path="/training/cisco/comptia/aplus"
          element={<Aplus />}
        />
        <Route
          path="/training/cisco/comptia/network"
          element={<NetworkPlus />}
        />
        <Route
          path="/training/cisco/comptia/security+"
          element={<SecurityPlus />}
        />
        <Route
          path="/training/cisco/comptia/cysa"
          element={<CySA />}
        />
        <Route
          path="/training/cisco/comptia/pentest"
          element={<PenTest />}
        />
        <Route
          path="/training/cisco/comptia/linux"
          element={<Linux />}
        />
        <Route
          path="/training/cisco/paloalto/networksecurity/apprentice"
          element={<PaloaltoApprentice />} 
          />
          <Route
          path="/training/cisco/paloalto/networksecurity/practitioner"
          element={<PaloaltoPractitioner />} 
          />
          <Route
          path="/training/cisco/paloalto/networksecurity/professional"
          element={<NetworkSecurityProfessional />} 
          />
          <Route
          path="/training/cisco/paloalto/networksecurity/nextgenerationfirewallengineer"
          element={<NextGenerationFirewallEngineer />} 
          />
        <Route path="/solutions/ict/network" element={<Network />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}