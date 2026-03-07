import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CCNA from "../pages/training/cisco/ccna/ccna";
import CCNAAutomation from "../pages/training/cisco/ccna/automation";
import CCNPEnterprise from "../pages/training/cisco/ccnp/enterprise";
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
        <Route path="/solutions/ict/network" element={<Network />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}