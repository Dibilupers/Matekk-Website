import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import NavBar from "../components/layout/navbar";
=======
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ScrollToTop from "../components/scroll/ScrollToTop";

/* Pages */
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));

/* Cisco */
const CCNA = lazy(() => import("../pages/training/cisco/ccna/ccna"));
const CCNAAutomation = lazy(() => import("../pages/training/cisco/ccna/automation"));
const CCNACybersecurity = lazy(() => import("../pages/training/cisco/ccna/cybersecurity"));
const CCNPEnterprise = lazy(() => import("../pages/training/cisco/ccnp/enterprise"));
const CCNPDatacenter = lazy(() => import("../pages/training/cisco/ccnp/datacenter"));
const CCNPSecurity = lazy(() => import("../pages/training/cisco/ccnp/ccnp-security/security"));
const SNCF = lazy(() => import("../pages/training/cisco/ccnp/ccnp-security/300-710-SNCF-v1.1"));
const SISE = lazy(() => import("../pages/training/cisco/ccnp/ccnp-security/300-715-SISE-v1.1"));
const SVPN = lazy(() => import("../pages/training/cisco/ccnp/ccnp-security/300-730-SVPN-v1.1"));
const SDSI = lazy(() => import("../pages/training/cisco/ccnp/ccnp-security/300-745-SDSI-v1.1"));

/* CompTIA */
const Aplus = lazy(() => import("../pages/training/comptia/aplus"));
const NetworkPlus = lazy(() => import("../pages/training/comptia/network"));
const SecurityPlus = lazy(() => import("../pages/training/comptia/security+"));
const CySA = lazy(() => import("../pages/training/comptia/cysa"));
const PenTest = lazy(() => import("../pages/training/comptia/pentest"));
const Linux = lazy(() => import("../pages/training/comptia/linux"));

/* Fortinet */
const NSE1 = lazy(() => import("../pages/training/fortinet/nse1"));
const NSE2 = lazy(() => import("../pages/training/fortinet/nse2"));
const NSE3 = lazy(() => import("../pages/training/fortinet/nse3"));
const NSE4 = lazy(() => import("../pages/training/fortinet/nse4"));
const NSE5securenetworking = lazy(() => import("../pages/training/fortinet/nse5securenetworking"));
const NSE5CloudSecurity = lazy(() => import("../pages/training/fortinet/nse5cloudsecurity"));
const NSE5SASE = lazy(() => import("../pages/training/fortinet/nse5sase"));
const NSE5SecurityOperations = lazy(() => import("../pages/training/fortinet/nse5securityoperations"));
const NSE6SecureNetworking = lazy(() => import("../pages/training/fortinet/nse6securenetworking"));
const NSE6SASE = lazy(() => import("../pages/training/fortinet/nse6sase"));
const NSE6CloudSecurity = lazy(() => import("../pages/training/fortinet/NSE6CloudSecurity"));
const NSE6SecurityOperations = lazy(() => import("../pages/training/fortinet/nse6securityoperations"));
const NSE7SecureNetworking = lazy(() => import("../pages/training/fortinet/NSE7SecureNetworking"));
const NSE7SASE = lazy(() => import("../pages/training/fortinet/NSE7SASE"));
const NSE7CloudSecurity = lazy(() => import("../pages/training/fortinet/NSE7CloudSecurity"));
const NSE7SecurityOperations = lazy(() => import("../pages/training/fortinet/NSE7SecurityOperations"));
const NSE8 = lazy(() => import("../pages/training/fortinet/nse8"));

/* CDCP */
const DCFC = lazy(() => import("../pages/training/cdcp/dcfc"));
const CDCP = lazy(() => import("../pages/training/cdcp/cdcp"));
const CDCS = lazy(() => import("../pages/training/cdcp/cdcs"));

/* Palo Alto */
const PaloaltoApprentice = lazy(() => import("../pages/training/paloalto/networksecurity/apprentice"));
const PaloaltoPractitioner = lazy(() => import("../pages/training/paloalto/networksecurity/practitioner"));
const NetworkSecurityProfessional = lazy(() => import("../pages/training/paloalto/networksecurity/professional"));
const NextGenerationFirewallEngineer = lazy(() => import("../pages/training/paloalto/networksecurity/nextgenerationfirewallengineer"));
const SDWanEngineer = lazy(() => import("../pages/training/paloalto/networksecurity/sdwanengineer"));
const SecurityServiceEdgeEngineer = lazy(() => import("../pages/training/paloalto/networksecurity/securityserviceedgeengineer"));
const NetworkSecurityAnalyst = lazy(() => import("../pages/training/paloalto/networksecurity/analyst"));
const NetworkSecurityArchitect = lazy(() => import("../pages/training/paloalto/networksecurity/architect"));
const SecurityOperationsProfessional = lazy(() => import("../pages/training/paloalto/securityoperations/professional"));
const XsiamAnalyst = lazy(() => import("../pages/training/paloalto/securityoperations/xsiamanalyst"));
const XDRAnalyst = lazy(() => import("../pages/training/paloalto/securityoperations/xdranalyst"));
const XsiamEngineer = lazy(() => import("../pages/training/paloalto/securityoperations/xsiamengineer"));
const XDREngineer = lazy(() => import("../pages/training/paloalto/securityoperations/xdrengineer"));
const XsoarEngineer = lazy(() => import("../pages/training/paloalto/securityoperations/xsoarengineer"));
const CloudSecurityProfessional = lazy(() => import("../pages/training/paloalto/cloudsecurity/professional"));

/* Practical Ethical Hacking */
const PEH = lazy(() => import("../pages/training/peh/PEH"));
const CDTH = lazy(() => import("../pages/training/peh/CDTH"));

/* Cybersecurity */
const BlueTeam = lazy(() => import("../pages/training/cybersecurity/blueteam"));
const RedTeam = lazy(() => import("../pages/training/cybersecurity/redteam"));

/* Cloud */
const AzureFundamentals = lazy(() => import("../pages/training/cloud/microsoft/azurefundamentals"));
const AWSPractitioner = lazy(() => import("../pages/training/cloud/aws/practitioner"));

/* IT Management */
const ITIL5 = lazy(() => import("../pages/training/itil5/itil5"));

/* Project Management */
const PMP = lazy(() => import("../pages/training/projectmanagement/pmp"));

/* Solutions */
const Network = lazy(() => import("../pages/solutions/ict/network"));
>>>>>>> 79e52be8eefefcc594ed25e8bbdf31261de697f8

export default function App() {
  return (
    <>
<<<<<<< HEAD
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
=======
      <NavBar />
      <ScrollToTop />

      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-10 h-10 border-4 border-[#1775EE] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Cisco */}
          <Route path="/training/cisco/ccna/ccna" element={<CCNA />} />
          <Route path="/training/cisco/ccna/automation" element={<CCNAAutomation />} />
          <Route path="/training/cisco/ccna/cybersecurity" element={<CCNACybersecurity />} />
          <Route path="/training/cisco/ccnp/enterprise" element={<CCNPEnterprise />} />
          <Route path="/training/cisco/ccnp/datacenter" element={<CCNPDatacenter />} />
          <Route path="/training/cisco/ccnp/ccnp-security/security" element={<CCNPSecurity />} />
          <Route path="/training/cisco/ccnp/ccnp-security/sncf" element={<SNCF />} />
          <Route path="/training/cisco/ccnp/ccnp-security/sise" element={<SISE />} />
          <Route path="/training/cisco/ccnp/ccnp-security/svpn" element={<SVPN />} />
          <Route path="/training/cisco/ccnp/ccnp-security/sdsi" element={<SDSI />} />

          {/* CompTIA */}
          <Route path="/training/comptia/aplus" element={<Aplus />} />
          <Route path="/training/comptia/network" element={<NetworkPlus />} />
          <Route path="/training/comptia/security+" element={<SecurityPlus />} />
          <Route path="/training/comptia/cysa" element={<CySA />} />
          <Route path="/training/comptia/pentest" element={<PenTest />} />
          <Route path="/training/comptia/linux" element={<Linux />} />

          {/* Fortinet */}
          <Route path="/training/fortinet/nse1" element={<NSE1 />} />
          <Route path="/training/fortinet/nse2" element={<NSE2 />} />
          <Route path="/training/fortinet/nse3" element={<NSE3 />} />
          <Route path="/training/fortinet/nse4" element={<NSE4 />} />
          <Route path="/training/fortinet/nse5securenetworking" element={<NSE5securenetworking />} />
          <Route path="/training/fortinet/nse5cloudsecurity" element={<NSE5CloudSecurity />} />
          <Route path="/training/fortinet/nse5sase" element={<NSE5SASE />} />
          <Route path="/training/fortinet/nse5securityoperations" element={<NSE5SecurityOperations />} />
          <Route path="/training/fortinet/nse6securenetworking" element={<NSE6SecureNetworking />} />
          <Route path="/training/fortinet/nse6sase" element={<NSE6SASE />} />
          <Route path="/training/fortinet/nse6cloudsecurity" element={<NSE6CloudSecurity />} />
          <Route path="/training/fortinet/nse6securityoperations" element={<NSE6SecurityOperations />} />
          <Route path="/training/fortinet/nse7securenetworking" element={<NSE7SecureNetworking />} />
          <Route path="/training/fortinet/nse7sase" element={<NSE7SASE />} />
          <Route path="/training/fortinet/nse7cloudsecurity" element={<NSE7CloudSecurity />} />
          <Route path="/training/fortinet/nse7securityoperations" element={<NSE7SecurityOperations />} />
          <Route path="/training/fortinet/nse8" element={<NSE8 />} />

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
          <Route path="/training/paloalto/networksecurity/analyst" element={<NetworkSecurityAnalyst />} />
          <Route path="/training/paloalto/networksecurity/architect" element={<NetworkSecurityArchitect />} />
          <Route path="/training/paloalto/securityoperations/professional" element={<SecurityOperationsProfessional />} />
          <Route path="/training/paloalto/securityoperations/xsiamanalyst" element={<XsiamAnalyst />} />
          <Route path="/training/paloalto/securityoperations/xdranalyst" element={<XDRAnalyst />} />
          <Route path="/training/paloalto/securityoperations/xsiamengineer" element={<XsiamEngineer />} />
          <Route path="/training/paloalto/securityoperations/xdrengineer" element={<XDREngineer />} />
          <Route path="/training/paloalto/securityoperations/xsoarengineer" element={<XsoarEngineer />} />
          <Route path="/training/paloalto/cloudsecurity/professional" element={<CloudSecurityProfessional />} />

          {/* Practical Ethical Hacking */}
          <Route path="/training/peh/peh" element={<PEH />} />
          <Route path="/training/peh/cdth" element={<CDTH />} />

          {/* Cybersecurity */}
          <Route path="/training/cybersecurity/blueteam" element={<BlueTeam />} />
          <Route path="/training/cybersecurity/redteam" element={<RedTeam />} />

          {/* Cloud */}
          <Route path="/training/cloud/microsoft/azurefundamentals" element={<AzureFundamentals />} />
          <Route path="/training/cloud/aws/practitioner" element={<AWSPractitioner />} />

          {/* IT Management */}
          <Route path="/training/itil5/foundation" element={<ITIL5 />} />

          {/* Project Management */}
          <Route path="/training/projectmanagement/pmp" element={<PMP />} />

          {/* Solutions */}
          <Route path="/solutions/ict/network" element={<Network />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
>>>>>>> 79e52be8eefefcc594ed25e8bbdf31261de697f8
    </>
  );
}