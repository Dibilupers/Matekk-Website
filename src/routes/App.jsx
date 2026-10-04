import { useEffect, useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ScrollToTop from "../components/scroll/ScrollToTop";

/* Pages */
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

/* Cisco */
import CCNA from "../pages/training/cisco/ccna/ccna";
import CCNAAutomation from "../pages/training/cisco/ccna/automation";
import CCNACybersecurity from "../pages/training/cisco/ccna/cybersecurity";
import CCNPEnterprise from "../pages/training/cisco/ccnp/enterprise";
import CCNPDatacenter from "../pages/training/cisco/ccnp/datacenter";
import CCNPSecurity from "../pages/training/cisco/ccnp/security";
import CCNPCollaboration from "../pages/training/cisco/ccnp/collaboration";

/* CompTIA */
import Aplus from "../pages/training/comptia/aplus";
import NetworkPlus from "../pages/training/comptia/network";
import SecurityPlus from "../pages/training/comptia/security+";
import CySA from "../pages/training/comptia/cysa";
import PenTest from "../pages/training/comptia/pentest";
import Linux from "../pages/training/comptia/linux";

/* Fortinet */
import FortiOS from "../pages/training/fortinet/fortios";
import SecureNetworking from "../pages/training/fortinet/secure-networking";
import SASE from "../pages/training/fortinet/sase";
import CloudSecurity from "../pages/training/fortinet/cloud-security";
import SecurityOperations from "../pages/training/fortinet/security-operations";
import CybersecurityExpert from "../pages/training/fortinet/cybersecurity-expert";

/* CDCP */
import DCFC from "../pages/training/datacenter/dcfc";
import CDCP from "../pages/training/datacenter/cdcp";
import CDCS from "../pages/training/datacenter/cdcs";

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

/* Cybersecurity */
import CDTH from "../pages/training/cybersecurity/CDTH";
import VAPT from "../pages/training/cybersecurity/PEH";

/* Cloud */
import AzureFundamentals from "../pages/training/cloud/microsoft/azurefundamentals";
import AWSPractitioner from "../pages/training/cloud/aws/practitioner";
import AWSEssentials from "../pages/training/cloud/aws/essentials";

/* IT Management */
import ITIL5 from "../pages/training/itil5/itil5";

/* Project Management */
import PMP from "../pages/training/projectmanagement/pmp";

/* Solutions */
/* ICT Consultancy */
import DataCenterFacilities from "../pages/solutions/ict/datacenter";
/* INSI */
import EnterpriseSecurityArchitecture from "../pages/solutions/ict/insi/enterprise";
import EndtoEnd from "../pages/solutions/ict/insi/e2e";
import IPTelephony from "../pages/solutions/ict/insi/iptelephony";
import OnPremise from "../pages/solutions/ict/insi/onpremise";
import OpticalFiber from "../pages/solutions/ict/insi/opticalfiber";
import StructuredCabling from "../pages/solutions/ict/insi/structuredcabling";
import WLAN from "../pages/solutions/ict/insi/wlan";
/* CyberSecurity Solutions Import */
import RedTeamSolution from "../pages/solutions/ict/cybersecurity/redteam";
import BlueTeamSolution from "../pages/solutions/ict/cybersecurity/blueteam";

import WebDev from "../pages/solutions/ict/webdev";
import CloudSolution from "../pages/solutions/ict/cloudsolution";
/* SMART IOT */
import SMARTHome from "../pages/solutions/ict/smart/smarthome";
import SMARTBuilding from "../pages/solutions/ict/smart/building";
import SMARTCity from "../pages/solutions/ict/smart/city";
/* PECE (PBOOT) */
import DoorAccess from "../pages/solutions/pece/dooraccess";
import FDAS from "../pages/solutions/pece/fdas";
import IPCCTV from "../pages/solutions/pece/ipcctv";
import PAS from "../pages/solutions/pece/pas";
import Renewable from "../pages/solutions/pece/renewable";

/* PECE (PBOOT) */

import Blank from "../pages/Blank";
import AdminPage from "../pages/admin";
import CCNADashboard from "../pages/modules/programs/CCNA/ccna";
import CCNAAutomationDashboard from "../pages/modules/programs/CCNAAutomation/ccnaAutomationDashboard";
import CCNACybersecurityDashboard from "../pages/modules/programs/CCNACybersecurity/ccnaCybersecurityDashboard";
import CCNAKnowledgeHub from "../pages/modules/programs/CCNA/ccnaKnowledgeHub";
import CCNAKnowledgeArticle from "../pages/modules/programs/CCNA/ccnaKnowledgeArticle";
import CCNACompositeExam from "../pages/modules/programs/CCNA/ccnaCompositeExam";
import CCNAModuleQuiz from "../pages/modules/programs/CCNA/ccnaModuleQuiz";
import CCNAGradebook from "../pages/modules/programs/CCNA/ccnaGradebook";
import { useAuth } from "../context/AuthContext";
import {
  readCcnaModuleQuizProgress,
  recordCcnaModuleQuizAttempt,
  saveCcnaModuleQuizProgress,
} from "../utils/ccnaModuleQuizProgress";
import { CCNA_MODULE_QUIZZES } from "../pages/modules/programs/CCNA/ccnaModuleQuizData";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export default function App() {
  const location = useLocation();
  const isCCNAQuiz = location.pathname.startsWith("/modules/programs/ccna/quiz/")
    || location.pathname.startsWith("/modules/programs/ccna/exam/");
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      <CCNAExamTimeNotification />
      {!isCCNAQuiz && <NavBar />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

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
          path="/training/cisco/ccnp/security"
          element={<CCNPSecurity />}
        />
        <Route
          path="/training/cisco/ccnp/collaboration"
          element={<CCNPCollaboration />}
        />

        {/* CompTIA */}
        <Route path="/training/comptia/aplus" element={<Aplus />} />
        <Route path="/training/comptia/network" element={<NetworkPlus />} />
        <Route path="/training/comptia/security+" element={<SecurityPlus />} />
        <Route path="/training/comptia/cysa" element={<CySA />} />
        <Route path="/training/comptia/pentest" element={<PenTest />} />
        <Route path="/training/comptia/linux" element={<Linux />} />

        {/* Fortinet */}
        <Route path="/training/fortinet/fortios" element={<FortiOS />} />
        <Route
          path="/training/fortinet/secure-networking"
          element={<SecureNetworking />}
        />
        <Route path="/training/fortinet/sase" element={<SASE />} />
        <Route
          path="/training/fortinet/cloud-security"
          element={<CloudSecurity />}
        />
        <Route
          path="/training/fortinet/security-operations"
          element={<SecurityOperations />}
        />
        <Route
          path="/training/fortinet/cybersecurity-expert"
          element={<CybersecurityExpert />}
        />

        {/* CDCP */}
        <Route path="/training/datacenter/dcfc" element={<DCFC />} />
        <Route path="/training/datacenter/cdcp" element={<CDCP />} />
        <Route path="/training/datacenter/cdcs" element={<CDCS />} />

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

        {/* Cybersecurity */}
        <Route path="/training/cybersecurity/cdth" element={<CDTH />} />
        <Route path="/training/cybersecurity/peh" element={<VAPT />} />

        {/* Cloud */}
        <Route
          path="/training/cloud/microsoft/azurefundamentals"
          element={<AzureFundamentals />}
        />
        <Route
          path="/training/cloud/aws/practitioner"
          element={<AWSPractitioner />}
        />
        <Route
          path="/training/cloud/aws/essentials"
          element={<AWSEssentials />}
        />

        {/* IT Management */}
        <Route path="/training/itil5/foundation" element={<ITIL5 />} />

        {/* Project Management */}
        <Route path="/training/projectmanagement/pmp" element={<PMP />} />

        {/* Solutions */}
        {/* ICT Consultancy */}
        <Route
          path="/solutions/ict/datacenter"
          element={<DataCenterFacilities />}
        />
        {/* ICT Network and Security Infrastructure */}
        <Route path="/solutions/ict/insi/enterprise" element={<EnterpriseSecurityArchitecture />} />
        <Route path="/solutions/ict/insi/e2e" element={<EndtoEnd />} />
        <Route path="/solutions/ict/insi/iptelephony" element={<IPTelephony />} />
        <Route path="/solutions/ict/insi/onpremise" element={<OnPremise />} />
        <Route path="/solutions/ict/insi/opticalfiber" element={<OpticalFiber />} />
        <Route
          path="/solutions/ict/insi/structuredcabling"
          element={<StructuredCabling />}
        />
        <Route path="/solutions/ict/insi/wlan" element={<WLAN />} />
        {/* CyberSecurity Solutions */}
        <Route path="/solutions/ict/cybersec/redteam" element={<RedTeamSolution />} />
        <Route
          path="/solutions/ict/cybersec/blueteam"
          element={<BlueTeamSolution />}
        />

        <Route path="/solutions/ict/webdev" element={<WebDev />} />
        <Route path="/solutions/ict/cloud" element={<CloudSolution />} />
        {/* SMART IOT */}
        <Route path="/solutions/ict/smart/home" element={<SMARTHome />} />
        <Route path="/solutions/ict/smart/building" element={<SMARTBuilding />} />
        <Route path="/solutions/ict/smart/city" element={<SMARTCity />} />

        {/* PECE (PBOOT) */}
        <Route path="/solutions/pece/dooraccess" element={<DoorAccess />} />
        <Route path="/solutions/pece/fdas" element={<FDAS />} />
        <Route path="/solutions/pece/ipcctv" element={<IPCCTV />} />
        <Route path="/solutions/pece/pas" element={<PAS />} />
        <Route path="/solutions/pece/renewable" element={<Renewable />} />
        <Route path="/pages/blank" element={<Blank />} />
        <Route
          path="/modules/programs/ccna"
          element={
            <ProtectedRoute>
              <CCNADashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna-automation"
          element={
            <ProtectedRoute>
              <CCNAAutomationDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna-cybersecurity"
          element={
            <ProtectedRoute>
              <CCNACybersecurityDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna/quiz/:moduleNumber"
          element={
            <ProtectedRoute>
              <CCNAModuleQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna/exam/short"
          element={
            <ProtectedRoute>
              <CCNACompositeExam key="short" examKey="short" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna/exam/medium"
          element={
            <ProtectedRoute>
              <CCNACompositeExam key="medium" examKey="medium" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna/results"
          element={
            <ProtectedRoute>
              <CCNAGradebook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna/knowledge-hub"
          element={
            <ProtectedRoute>
              <CCNAKnowledgeHub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/programs/ccna/knowledge-hub/:articleSlug"
          element={
            <ProtectedRoute>
              <CCNAKnowledgeArticle />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>


      {!isCCNAQuiz && !isAdminPage && <Footer />}
    </>
  );
}

function CCNAExamTimeNotification() {
  const [notification, setNotification] = useState(null);
  const { profile } = useAuth();
  const userId = profile?.userId;

  useEffect(() => {
    function checkExamDeadline() {
      let moduleProgress = userId
        ? readCcnaModuleQuizProgress(userId)
        : { activeModule: null, modules: {} };
      const expiredModule = Object.entries(moduleProgress.modules).find(
        ([, attempt]) =>
          attempt?.status === "in-progress" &&
          Number.isFinite(attempt.deadline) &&
          attempt.deadline <= Date.now(),
      );

      if (expiredModule) {
        const [moduleNumber, attempt] = expiredModule;
        const moduleQuiz = CCNA_MODULE_QUIZZES.find((quiz) => quiz.number === moduleNumber);
        if (moduleQuiz) {
          const score = moduleQuiz.questions.reduce(
            (total, question, index) => total + (attempt.answers?.[index] === question.answer ? 1 : 0),
            0,
          );
          moduleProgress = {
            ...moduleProgress,
            activeModule: moduleProgress.activeModule === moduleNumber ? null : moduleProgress.activeModule,
            modules: {
              ...moduleProgress.modules,
              [moduleNumber]: recordCcnaModuleQuizAttempt({
                ...attempt,
                status: "expired",
                score,
                maxScore: moduleQuiz.questions.length,
                submittedAt: attempt.submittedAt ?? Date.now(),
                bestScore: Math.max(attempt.bestScore ?? 0, score),
              }, moduleQuiz.questions.length),
            },
          };
          saveCcnaModuleQuizProgress(userId, moduleProgress);
        }
      }

      const expiredModuleAttempt = Object.entries(moduleProgress.modules)
        .filter(([, attempt]) => attempt?.status === "expired" && !attempt.toastDismissed)
        .sort(([, first], [, second]) => (second.deadline ?? 0) - (first.deadline ?? 0))[0];

      if (expiredModuleAttempt) {
        const nextNotification = { type: "module", moduleNumber: expiredModuleAttempt[0], userId };
        setNotification((current) =>
          current?.type === nextNotification.type &&
          current.moduleNumber === nextNotification.moduleNumber &&
          current.userId === nextNotification.userId
            ? current
            : nextNotification,
        );
      } else {
        setNotification((current) => current ? null : current);
      }
    }

    checkExamDeadline();
    const timer = window.setInterval(checkExamDeadline, 500);
    return () => window.clearInterval(timer);
  }, [userId]);

  function dismissNotification() {
    if (notification?.type === "module") {
      if (!userId || notification.userId !== userId) return;
      const progress = readCcnaModuleQuizProgress(userId);
      const attempt = progress.modules[notification.moduleNumber];
      if (attempt?.status === "expired") {
        saveCcnaModuleQuizProgress(userId, {
          ...progress,
          modules: {
            ...progress.modules,
            [notification.moduleNumber]: { ...attempt, toastDismissed: true },
          },
        });
      }
    }
    setNotification(null);
  }

  if (!notification || (notification.type === "module" && notification.userId !== userId)) return null;

  return (
    <div
      role="status"
      className="fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-[#f2c6c3] bg-white p-4 text-[#263654] shadow-[0_12px_35px_rgba(15,35,75,0.18)]"
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff0ef] text-sm font-bold text-[#b42318]">
        !
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">
          {`Module ${notification.moduleNumber} quiz time is up`}
        </p>
        <p className="mt-1 text-sm leading-5 text-[#64718a]">
          Your quiz has ended and your score has been saved.
        </p>
      </div>
      <button
        type="button"
        onClick={dismissNotification}
        aria-label="Dismiss time limit notification"
        className="rounded-md p-1 text-[#71809a] transition hover:bg-[#f1f5fc] hover:text-[#263654]"
      >
        <X size={17} />
      </button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-sm text-slate-500">
        Checking your session...
      </main>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
