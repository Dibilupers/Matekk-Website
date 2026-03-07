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
import Network from "../pages/solutions/ict/network";
import ScrollToTop from "../components/scroll/ScrollToTop";

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
        <Route path="/solutions/ict/network" element={<Network />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}