import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, Facebook, Instagram, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import API_URL from "../config/api";
import NetworkBackground from "../components/NetworkBackground";
import MainLogo from "../assets/MATEKK_logo.webp";
import CrestLogo from "../assets/MATEKK_tab_logo.webp";
import TikTokLogo from "../assets/tiktok.png";
import AwsLogo from "../assets/awspractitioner.webp";
import AzureLogo from "../assets/azure.svg";
import CcnaLogo from "../assets/CCNA.png";
import CcnpLogo from "../assets/CCNPEnterprise.webp";
import CompTiaLogo from "../assets/security+.webp";
import FortinetLogo from "../assets/fortinet.png";
import Azure from "../assets/azure.jpg";
import ItilLogo from "../assets/itil5.webp";
import LinuxLogo from "../assets/linux+.webp";
import CiscoLogo from "../assets/cisco.png";
import PythonLogo from "../assets/python.png";
import PaloAltoLogo from "../assets/paloalto.png";
import PlaceAutocomplete from "../components/ui/PlaceAutocomplete";

const trainingLogos = [
  { src: PaloAltoLogo, alt: "Palo Alto certification" },
  { src: AwsLogo, alt: "AWS Cloud Practitioner" },
  { src: AzureLogo, alt: "Microsoft Azure" },
  { src: CcnpLogo, alt: "Cisco CCNP" },
  { src: ItilLogo, alt: "ITIL certification" },
  { src: PythonLogo, alt: "Python programming" },
  { src: CcnaLogo, alt: "Cisco CCNA" },
  { src: FortinetLogo, alt: "Fortinet certification" },
  { src: CompTiaLogo, alt: "CompTIA Security Plus" },
  { src: LinuxLogo, alt: "Linux Plus" },
  { src: CiscoLogo, alt: "Cisco certification" },
  { src: Azure, alt: "Microsoft Azure fundamentals" },
];

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginAnimating, setIsLoginAnimating] = useState(false);
  const [pendingLoginRedirect, setPendingLoginRedirect] = useState("");
  const orbitRingRef = useRef(null);
  const { login } = useAuth();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(0);
  const formCardRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [programId, setProgramId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [programs, setPrograms] = useState([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);

  const navigateAfterLogin = useCallback((path) => {
    const shouldSkipAnimation =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 1024px)").matches;

    if (shouldSkipAnimation) {
      navigate(path, { replace: true });
      return;
    }

    setIsLoginAnimating(true);
    setPendingLoginRedirect(path);
  }, [navigate]);

  // Switching between Sign In / Create Account or between sign-up steps changes the form's height.
  // On phones that can leave the page scrolled past the form, so bring the form back into view.
  useEffect(() => {
    const card = formCardRef.current;
    if (card && card.getBoundingClientRect().top < 0) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isRegistering, registrationStep]);

  useEffect(() => {
    if (!pendingLoginRedirect) return undefined;

    const ring = orbitRingRef.current;
    if (!ring) {
      navigate(pendingLoginRedirect, { replace: true });
      return undefined;
    }

    const handleAnimationEnd = (event) => {
      if (event.animationName !== "login-orbit-ripple") return;

      navigate(pendingLoginRedirect, { replace: true });
    };

    ring.addEventListener("animationend", handleAnimationEnd);
    return () => ring.removeEventListener("animationend", handleAnimationEnd);
  }, [navigate, pendingLoginRedirect]);

  useEffect(() => {
    let mounted = true;
    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (response.ok) {
          const profile = await response.json();
          if (!mounted) return;
          navigateAfterLogin(profile.active_status === false ? "/account-pending" : "/pages/blank");
        }
      } catch {
        if (mounted) setMsg("Unable to verify your existing session.");
      } finally {
        if (mounted) setIsCheckingSession(false);
      }
    }

    checkSession();
    return () => {
      mounted = false;
    };
  }, [navigate, navigateAfterLogin]);

  useEffect(() => {
    if (!isRegistering) return undefined;

    const controller = new AbortController();
    setIsLoadingPrograms(true);
    fetch(`${API_URL}/auth/programs`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load the available programs.");
        const availablePrograms = await response.json();
        if (!Array.isArray(availablePrograms)) throw new TypeError("The programs response is invalid.");
        setPrograms(availablePrograms);
        const firstProgram = availablePrograms[0];
        setTrainingId(String(firstProgram?.training?.id ?? ""));
        setProgramId(String(firstProgram?.id ?? ""));
        setModuleId("");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Unable to load registration programs.", error);
          setMsg("Unable to load programs for registration. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingPrograms(false);
      });

    return () => controller.abort();
  }, [isRegistering]);

  async function submit(e) {
    e.preventDefault();
    if (!username || !pass) {
      setMsg("Please enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    setMsg("");

    try {
      const { response, profile } = await login(username, pass);

      if (!response.ok) {
        setMsg(response.status === 401 ? "Invalid username or password." : "Unable to log in.");
        return;
      }

      navigateAfterLogin(profile.active_status === false ? "/account-pending" : "/pages/blank");
    } catch {
      setMsg("Unable to connect to the login server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function advanceRegistration() {
    if (registrationStep === 0) {
      if (!firstName || !lastName) {
        setMsg("Please enter your first and last name.");
        return;
      }
    }

    if (registrationStep === 1) {
      if (!trainingId || !programId) {
        setMsg("Please select a training and program.");
        return;
      }
    }

    if (registrationStep === 2) {
      if (!registerUsername || !registerEmail || !registerPassword) {
        setMsg("Please complete your username, email, and password.");
        return;
      }
    }

    setMsg("");
    setRegistrationStep((step) => Math.min(step + 1, 2));
  }

  async function submitRegistration(e) {
    e.preventDefault();
    setMsg("");

    if (registrationStep < 2) {
      advanceRegistration();
      return;
    }

    if (!registerUsername || !registerEmail || !registerPassword || !programId || !trainingId) {
      setMsg("Please complete all required fields before creating your account.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          ...(birthdate ? { birthdate } : {}),
          gender,
          city,
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          programId: Number(moduleId || programId),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        const message = Array.isArray(error?.message) ? error.message.join(" ") : error?.message;
        setMsg(message || "Unable to create your account.");
        return;
      }

      const { response: loginResponse } = await login(registerUsername, registerPassword);
      if (!loginResponse.ok) {
        setMsg("Your account was created. Please sign in to continue to the approval page.");
        setIsRegistering(false);
        setUsername(registerUsername);
        setPass("");
        return;
      }

      navigateAfterLogin("/account-pending");
    } catch (error) {
      console.error("Unable to complete account registration.", error);
      setMsg("Unable to connect to the registration server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const trainingOptions = Array.from(
    new Map(
      programs
        .filter((program) => program.training)
        .map((program) => [String(program.training.id), program.training]),
    ).values(),
  );
  const selectedTrainingPrograms = programs.filter(
    (program) => String(program.training?.id ?? "") === trainingId,
  );
  const selectedProgram = selectedTrainingPrograms.find(
    (program) => String(program.id) === programId,
  );

  function selectTraining(nextTrainingId) {
    setTrainingId(nextTrainingId);
    const firstProgram = programs.find(
      (program) => String(program.training?.id ?? "") === nextTrainingId,
    );
    setProgramId(String(firstProgram?.id ?? ""));
    setModuleId("");
  }

  if (isCheckingSession) {
    return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#070D1F] text-slate-200">Checking your session...</main>;
  }

  return (
    <main className="fade-in-up relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#070D1F] px-4 py-8 sm:px-10 sm:py-10 lg:px-16">
      <NetworkBackground paused={isLoginAnimating} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(320px,390px)_1fr] lg:gap-20">
          <section className="order-2 mx-auto w-full max-w-2xl space-y-7 text-center lg:order-2 lg:text-left">
            <div className="relative mx-auto flex min-h-[27rem] w-full max-w-[32rem] items-center justify-center">
              <div
                ref={orbitRingRef}
                className={`login-orbit-ring pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 lg:block ${isLoginAnimating ? "login-orbit-sinking" : ""}`}
                aria-hidden="true"
              >
                <span className={`login-orbit-ripple ${isLoginAnimating ? "login-orbit-ripple-active" : ""}`} />
                {trainingLogos.map((logo, index) => (
                  <div
                    key={logo.alt}
                    style={{ "--angle": `${index * 30}deg`, animationDelay: `${index * 85}ms` }}
                    className={`login-orbit-badge pointer-events-auto absolute left-1/2 top-1/2 -ml-[2rem] -mt-[2rem] flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-slate-100 bg-white p-2 shadow-[0_8px_14px_rgba(15,23,42,0.18)] [transform:rotate(var(--angle))_translateY(-10.75rem)] ${isLoginAnimating ? "login-orbit-badge-sinking" : ""}`}
                  >
                    <div className="h-full w-full">
                      <img src={logo.src} alt="" className="h-full w-full object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              <div className={`login-orbit-core relative z-10 flex h-56 w-56 items-center justify-center rounded-full bg-white/90 ${isLoginAnimating ? "login-orbit-core-absorbing" : ""}`}>
                <img src={CrestLogo} alt="Matekk crest" className="h-44 w-44 object-contain" />
              </div>
              {isLoginAnimating && (
                <p className="login-access-status absolute bottom-0 left-1/2 -translate-x-1/2" role="status">
                  ACCESS GRANTED
                </p>
              )}
            </div>
            <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-3 lg:hidden" aria-label="Training certifications">
              {trainingLogos.map((logo) => (
                <div key={logo.alt} className="flex h-16 items-center justify-center rounded-full bg-white p-2 shadow-sm">
                  <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
            <div className="mx-auto w-full max-w-xl space-y-2 rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-6">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Grow with <span className="text-[#1775EE]">Matekk</span></h2>
              <p className="text-base leading-relaxed text-slate-800">MATEKK Cybercore Technologies delivers industry-driven ICT, engineering solutions, and professional training designed to empower businesses and individuals.</p>
            </div>
            <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              <a href="https://www.facebook.com/matekkcybercore/" className="group flex items-center gap-3 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
                <Facebook className="text-[#1877F2]" size={22} /><span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#087ff5]">Matekk Cybercore Academy</span>
              </a>
              <a href="tel:09771968226" className="group flex items-center gap-3 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
                <Phone className="text-green-600" size={22} /><span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#087ff5]">09771968226</span>
              </a>
              <a href="https://www.instagram.com/matekkcybercore/" className="group flex items-center gap-3 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
                <Instagram className="text-pink-500" size={22} /><span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#087ff5]">@matekkcybercore</span>
              </a>
              <a href="https://www.tiktok.com/@training.matekkcybercore" className="group flex items-center gap-1 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
                <img src={TikTokLogo} alt="TikTok" className="h-5 w-5" />
                <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#087ff5]">@training.matekk</span>
              </a>
            </div>
          </section>

          <section ref={formCardRef} className="scroll-mt-24 order-1 mx-auto w-full max-w-md space-y-5 rounded-2xl border border-slate-300 bg-white px-5 py-7 shadow-[0_14px_35px_rgba(15,23,42,0.1)] sm:px-11 sm:py-9 lg:order-1">
            <div className="flex justify-center">
              <img src={MainLogo} alt="Matekk Cybercore Technologies" className="h-auto w-56" />
            </div>
            <div className="space-y-1 text-center">
              <h4 className="text-3xl uppercase tracking-tight">
                {isRegistering ? <>Create your <span className="text-[#1775EE]">account</span></> : <>Welcome <span className="text-[#1775EE]">back</span></>}
              </h4>
              <p className="text-sm text-slate-400">
                {isRegistering ? "Fill in your details to get started." : "Sign in to keep growing your skills"}
              </p>
            </div>

            {isRegistering && (
              // Small "Step 1/2/3" labels, spaced to sit right above each tab below
              <div className="mb-1.5 flex gap-3 px-1 text-center text-[0.7rem] font-semibold uppercase tracking-wider" aria-hidden="true">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className={`flex-1 transition-colors ${index <= registrationStep ? "text-[#1775EE]" : "text-slate-400"}`}
                  >
                    Step {index + 1}
                  </span>
                ))}
              </div>
            )}
            {isRegistering && (
              <div className="mb-5 flex items-center gap-3 rounded-full border border-slate-200 bg-[#eef3f8] p-1 text-center text-sm font-medium text-slate-500">
                {[
                  "Personal",
                  "Program",
                  "Account",
                ].map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      if (index <= registrationStep) setRegistrationStep(index);
                    }}
                    className={`flex-1 rounded-full px-2 py-2 transition ${registrationStep === index ? "bg-white text-slate-700 shadow-sm" : ""}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={isRegistering ? submitRegistration : submit} className="space-y-4">
              {isRegistering ? (
                <>
                  {registrationStep === 0 && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                          <span className="mb-2 block">First name</span>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                          />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                          <span className="mb-2 block">Last name</span>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                          <span className="mb-2 block">Birthdate</span>
                          <input
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                          />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                          <span className="mb-2 block">Gender</span>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="">Select</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </label>
                      </div>

                      <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-2 block">City / Province</span>
                        <PlaceAutocomplete
                          value={city}
                          onChange={setCity}
                          placeholder="e.g. San Mateo, Rizal"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                        />
                      </label>
                    </div>
                  )}

                  {registrationStep === 1 && (
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-2 block">Training provider</span>
                        <select
                          value={trainingId}
                          onChange={(e) => selectTraining(e.target.value)}
                          disabled={isLoadingPrograms || trainingOptions.length === 0}
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                        >
                          {trainingOptions.length === 0 && <option value="">{isLoadingPrograms ? "Loading trainings..." : "No trainings available"}</option>}
                          {trainingOptions.map((training) => <option key={training.id} value={training.id}>{training.name}</option>)}
                        </select>
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-2 block">Program</span>
                        <select
                          value={programId}
                          onChange={(e) => {
                            setProgramId(e.target.value);
                            setModuleId("");
                          }}
                          disabled={isLoadingPrograms || selectedTrainingPrograms.length === 0}
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                        >
                          {selectedTrainingPrograms.length === 0 && <option value="">No programs available</option>}
                          {selectedTrainingPrograms.map((program) => <option key={program.id} value={program.id}>{program.name}</option>)}
                        </select>
                      </label>
                      {selectedProgram?.modules?.length > 0 && (
                        <label className="block text-sm font-medium text-slate-700">
                          <span className="mb-2 block">Module (optional)</span>
                          <select
                            value={moduleId}
                            onChange={(e) => setModuleId(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="">Enroll in the full program</option>
                            {selectedProgram.modules.map((module) => <option key={module.id} value={module.id}>{module.name}</option>)}
                        </select>
                      </label>
                      )}
                    </div>
                  )}

                  {registrationStep === 2 && (
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-2 block">Username</span>
                        <input
                          type="text"
                          value={registerUsername}
                          onChange={(e) => setRegisterUsername(e.target.value)}
                          placeholder="username"
                          autoComplete="username"
                          minLength={3}
                          maxLength={30}
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                        />
                      </label>

                      <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-2 block">Email</span>
                        <input
                          type="email"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                        />
                      </label>

                      <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-2 block">Password</span>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            placeholder="••••••••••••"
                            autoComplete="new-password"
                            minLength={10}
                            maxLength={128}
                            required
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 transition-colors hover:text-[#087ff5]"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </label>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">Username</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      autoComplete="username"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">Password</span>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="••••••••••••"
                        autoComplete="current-password"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-800 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((visible) => !visible)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 transition-colors hover:text-[#087ff5]"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>

                  <div className="text-right text-sm font-medium">
                    {/* Clickable, but no password reset page exists yet */}
                    <button
                      type="button"
                      className="cursor-pointer text-slate-600 underline-offset-4 transition hover:text-[#1775EE] hover:underline"
                    >
                      Forgot Password
                    </button>
                  </div>
                </>
              )}

              {isRegistering && (
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRegistrationStep((step) => Math.max(step - 1, 0))}
                    disabled={registrationStep === 0}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-[#1775EE] hover:text-[#1775EE] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || (isLoadingPrograms || !programId || !trainingId)}
                    className="flex-1 rounded-xl bg-[#1775EE] px-4 py-3 text-base font-semibold text-white shadow-[0_10px_20px_rgba(23,117,238,0.28)] transition hover:bg-[#0f64d8] disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSubmitting ? "Creating account..." : registrationStep === 2 ? "Create account" : "Continue"}
                  </button>
                </div>
              )}

              {!isRegistering && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1775EE] px-4 py-3 text-lg font-semibold text-white shadow-[0_10px_20px_rgba(23,117,238,0.28)] transition hover:bg-[#0f64d8] disabled:cursor-wait disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
              )}

              {msg && <p role="status" className="text-center text-sm text-slate-600">{msg}</p>}

              <div className="space-y-3 pt-1 text-center">
                {isRegistering ? (
                  <p className="text-xs text-slate-400">Already have an account?</p>
                ) : (
                  // Clickable, but nothing is linked to it yet
                  <button
                    type="button"
                    className="cursor-pointer text-xs text-slate-400 underline-offset-4 transition hover:text-[#1775EE] hover:underline"
                  >
                    New to Matekk?
                  </button>
                )}
                {isRegistering ? (
                  <button
                    type="button"
                    onClick={() => { setMsg(""); setIsRegistering(false); setRegistrationStep(0); }}
                    className="w-full rounded-lg border border-slate-500 px-4 py-2.5 text-sm text-slate-500 transition hover:border-[#1775EE] hover:text-[#1775EE]"
                  >
                    Back to Sign In
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setMsg(""); setIsRegistering(true); setRegistrationStep(0); }}
                    className="w-full rounded-lg border border-slate-500 px-4 py-2.5 text-sm text-slate-500 transition hover:border-[#1775EE] hover:text-[#1775EE]"
                  >
                    Create New Account
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
    </main>
  );
}
