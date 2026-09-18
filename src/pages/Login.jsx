import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Phone, Send } from "lucide-react";
import MainLogo from "../assets/MATEKK_logo.webp";
import CrestLogo from "../assets/MATEKK_tab_logo.webp";
import TikTokLogo from "../assets/tiktok.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!username || !pass) {
      setMsg("Please enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    setMsg("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: pass }),
      });

      if (!response.ok) {
        setMsg(response.status === 401 ? "Invalid username or password." : "Unable to log in.");
        return;
      }

      const user = await response.json();
      setMsg(`Welcome, ${user.username}.`);
    } catch {
      setMsg("Unable to connect to the login server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#f8fafc] px-5 py-10 sm:px-10 lg:px-16">
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
            <span>Email Address</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="name@example.com"
              autoComplete="username"
              className="w-full rounded-lg border border-slate-500 px-4 py-2.5 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block space-y-1 text-sm font-medium text-slate-800">
            <span>Password</span>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-500 px-4 py-2.5 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-blue-100"
            />
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
          <div className="flex justify-center">
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white/80 shadow-[0_12px_25px_rgba(15,23,42,0.12)]">
              <img src={CrestLogo} alt="Matekk crest" className="h-44 w-44 object-contain" />
            </div>
          </div>
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Grow with <span className="text-[#1775EE]">Matekk</span></h2>
            <p className="text-base leading-relaxed text-slate-800">MATEKK Cybercore Technologies delivers industry-driven ICT, engineering solutions, and professional training designed to empower businesses and individuals.</p>
          </div>
          <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <a href="https://www.facebook.com/matekkcybercore/" className="flex items-center gap-3 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
              <Facebook className="text-[#1877F2]" size={22} /><span className="text-sm font-semibold text-slate-700">Matekk Cybercore Academy</span>
            </a>
            <a href="tel:09771968226" className="flex items-center gap-3 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
              <Phone className="text-green-600" size={22} /><span className="text-sm font-semibold text-slate-700">09771968226</span>
            </a>
            <a href="https://www.instagram.com/matekkcybercore/" className="flex items-center gap-3 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
              <Instagram className="text-pink-500" size={22} /><span className="text-sm font-semibold text-slate-700">@matekkcybercore</span>
            </a>
            <a href="https://www.tiktok.com/@training.matekkcybercore" className="flex items-center gap-1 rounded-lg bg-white/85 p-3 shadow-sm transition hover:shadow-md">
              <img src={TikTokLogo} alt="TikTok" className="h-5 w-5" />
              <span className="text-sm font-semibold text-slate-700">@training.matekk</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

