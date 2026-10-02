import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Facebook, Instagram, Phone, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";
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
  const { login } = useAuth();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsCheckingSession(false);
      return;
    }

    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          navigate("/pages/blank", { replace: true });
          return;
        }

        localStorage.removeItem("accessToken");
      } catch {
        setMsg("Unable to verify your existing session.");
      } finally {
        setIsCheckingSession(false);
      }
    }

    checkSession();
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();
    if (!username || !pass) {
      setMsg("Please enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    setMsg("");

    try {
      const response = await login(username, pass);

      if (!response.ok) {
        setMsg(response.status === 401 ? "Invalid username or password." : "Unable to log in.");
        return;
      }

      window.location.replace("/pages/blank");
    } catch {
      setMsg("Unable to connect to the login server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isCheckingSession) {
    return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#f8fafc] text-slate-600">Checking your session...</main>;
  }

  return (
    <main className="fade-in-up relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#f8fafc] px-5 py-10 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(35deg,transparent_0_35%,rgba(226,232,240,0.45)_35.2%_48%,transparent_48.2%),linear-gradient(145deg,transparent_0_46%,rgba(226,232,240,0.35)_46.2%_58%,transparent_58.2%),linear-gradient(75deg,transparent_0_62%,rgba(241,245,249,0.95)_62.2%_78%,transparent_78.2%)]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(320px,390px)_1fr] lg:gap-20">
        <form onSubmit={submit} className="w-full space-y-5 rounded-2xl border border-slate-300 bg-white px-8 py-9 shadow-[0_14px_35px_rgba(15,23,42,0.1)] sm:px-11">
          <div className="flex justify-center">
            <img src={MainLogo} alt="Matekk Cybercore Technologies" className="h-auto w-56" />
          </div>
          <div className="space-y-1 text-center">
            <h4 className="text-3xl uppercase tracking-tight">Welcome <span className="text-[#1775EE]">back</span></h4>
            <p className="text-sm text-slate-400">Sign in to keep growing your skills</p>
          </div>

          <label className="block space-y-1 text-sm font-medium text-slate-800">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              autoComplete="username"
              className="w-full rounded-lg border border-slate-500 px-4 py-2.5 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block space-y-1 text-sm font-medium text-slate-800">
            <span>Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-500 px-4 py-2.5 pr-11 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
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

          <div className="text-right text-sm text-slate-700">Forgot Password</div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#087ff5] px-6 py-3 font-semibold text-white shadow-[0_5px_12px_rgba(8,127,245,0.3)] transition hover:bg-[#0062E0] disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
            {!isSubmitting && <ArrowRight size={17} />}
          </button>

          {msg && <p role="status" className="text-center text-sm text-slate-600">{msg}</p>}
          <div className="space-y-3 pt-1 text-center">
            <p className="text-xs text-slate-400">New to Matekk?</p>
            <button type="button" className="w-full rounded-lg border border-slate-500 px-4 py-2.5 text-sm text-slate-500 transition hover:border-[#1775EE] hover:text-[#1775EE]">
              Create New Account
            </button>
          </div>
        </form>

        <section className="space-y-7 text-center lg:text-left">
          <div className="relative mx-auto flex min-h-[27rem] w-full max-w-[32rem] items-center justify-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 lg:block" aria-hidden="true">
              {trainingLogos.map((logo, index) => (
                <div
                  key={logo.alt}
                  style={{ "--angle": `${index * 30}deg` }}
                  className="pointer-events-auto absolute left-1/2 top-1/2 -ml-[2rem] -mt-[2rem] flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-slate-100 bg-white p-2 shadow-[0_8px_14px_rgba(15,23,42,0.18)] transition duration-300 [transform:rotate(var(--angle))_translateY(-10.75rem)] hover:scale-110"
                >
                  <img src={logo.src} alt="" className="h-full w-full object-contain [transform:rotate(calc(var(--angle)*-1))]" />
                </div>
              ))}
            </div>
            <div className="relative z-10 flex h-56 w-56 items-center justify-center rounded-full bg-white/90 shadow-[0_12px_25px_rgba(15,23,42,0.12)]">
              <img src={CrestLogo} alt="Matekk crest" className="h-44 w-44 object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 lg:hidden" aria-label="Training certifications">
            {trainingLogos.map((logo) => (
              <div key={logo.alt} className="flex h-16 items-center justify-center rounded-full bg-white p-2 shadow-sm">
                <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Grow with <span className="text-[#1775EE]">Matekk</span></h2>
            <p className="text-base leading-relaxed text-slate-800">MATEKK Cybercore Technologies delivers industry-driven ICT, engineering solutions, and professional training designed to empower businesses and individuals.</p>
          </div>
          <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
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
      </div>
    </main>
  );
}
