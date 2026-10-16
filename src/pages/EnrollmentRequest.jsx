import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import API_URL from "../config/api";

const INPUT_CLASS = "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#1775ee] focus:ring-2 focus:ring-blue-100";

function dateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export default function EnrollmentRequest() {
  const { profile } = useAuth();
  const [step, setStep] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [trainingId, setTrainingId] = useState("");
  const [programId, setProgramId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone_number ?? "");
  const [error, setError] = useState("");
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setEmail(profile?.email ?? "");
    setPhone(profile?.phone_number ?? "");
  }, [profile?.email, profile?.phone_number]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadPrograms() {
      try {
        const response = await fetch(`${API_URL}/auth/programs`, {
          credentials: "include",
          signal: controller.signal,
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) throw new Error(body?.message || "Unable to load available programs.");
        if (!Array.isArray(body)) throw new TypeError("The available programs response is invalid.");
        setPrograms(body);
        const firstProgram = body[0];
        setTrainingId(String(firstProgram?.training?.id ?? ""));
        setProgramId(String(firstProgram?.id ?? ""));
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("Unable to load programs for an enrollment request.", loadError);
          setError(loadError.message || "Unable to load available programs.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoadingPrograms(false);
      }
    }
    loadPrograms();
    return () => controller.abort();
  }, []);

  const trainings = useMemo(() => [...new Map(
    programs.filter((program) => program.training)
      .map((program) => [String(program.training.id), program.training]),
  ).values()], [programs]);
  const trainingPrograms = programs.filter(
    (program) => String(program.training?.id ?? "") === trainingId,
  );
  const selectedProgram = trainingPrograms.find(
    (program) => String(program.id) === programId,
  );
  const selectedModule = selectedProgram?.modules?.find(
    (module) => String(module.id) === moduleId,
  );

  async function submitRequest(event) {
    event.preventDefault();
    setError("");
    if (step < 2) {
      setStep((current) => Math.min(current + 1, 2));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/enrollment-requests`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId: Number(moduleId || programId),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || "Unable to submit your enrollment request.");
      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || "Unable to submit your enrollment request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[#f8fafc] px-4 py-10 sm:px-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <CheckCircle2 size={36} aria-hidden="true" className="text-[#1775ee]" />
          <h1 className="mt-4 text-3xl font-bold text-slate-950">Request submitted</h1>
          <p className="mt-3 text-slate-600">
            Your request for {selectedModule?.name ?? selectedProgram?.name} has been sent for administrator review.
            Program access will be granted after approval.
          </p>
          <Link to="/pages/blank" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1775ee] px-5 py-3 font-semibold text-white transition hover:bg-[#1262c9]">
            Back to dashboard <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#f8fafc] px-4 py-8 sm:px-8 sm:py-10">
      <form onSubmit={submitRequest} className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
        <Link to="/pages/blank" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#1775ee]">
          <ArrowLeft size={16} aria-hidden="true" /> Back to dashboard
        </Link>
        <p className="text-sm font-semibold tracking-wide text-[#1775ee]">Matekk Training Academy</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Student enrollment</h1>
        <p className="mt-2 text-slate-600">Choose a program to request enrollment in your account.</p>

        <ol className="my-8 grid grid-cols-3 gap-2" aria-label={`Enrollment request step ${step + 1} of 3`}>
          {["Personal", "Programs", "Review"].map((label, index) => (
            <li key={label} className="flex items-center gap-2">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${index <= step ? "bg-blue-100 text-[#1775ee]" : "bg-slate-100 text-slate-500"}`}>
                {index + 1}
              </span>
              <span className={`text-xs sm:text-sm ${index === step ? "font-semibold text-slate-900" : "text-slate-500"}`}>{label}</span>
              {index < 2 && <span className="ml-1 h-px flex-1 bg-slate-200" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              First name
              <input className={INPUT_CLASS} value={profile?.first_name ?? ""} readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Last name
              <input className={INPUT_CLASS} value={profile?.last_name ?? ""} readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Date of birth
              <input className={INPUT_CLASS} type="date" value={dateInputValue(profile?.birth_date)} readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Mobile number
              <input className={INPUT_CLASS} type="tel" autoComplete="tel" required maxLength={40} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0917 123 4567" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Email address
              <input className={INPUT_CLASS} type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Training
              <select className={INPUT_CLASS} required disabled={isLoadingPrograms || trainings.length === 0} value={trainingId} onChange={(event) => {
                const nextTrainingId = event.target.value;
                setTrainingId(nextTrainingId);
                const firstProgram = programs.find((program) => String(program.training?.id ?? "") === nextTrainingId);
                setProgramId(String(firstProgram?.id ?? ""));
                setModuleId("");
              }}>
                {trainings.length === 0 && <option value="">{isLoadingPrograms ? "Loading trainings..." : "No trainings available"}</option>}
                {trainings.map((training) => <option key={training.id} value={training.id}>{training.name}</option>)}
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Program
              <select className={INPUT_CLASS} required disabled={isLoadingPrograms || trainingPrograms.length === 0} value={programId} onChange={(event) => {
                setProgramId(event.target.value);
                setModuleId("");
              }}>
                {trainingPrograms.length === 0 && <option value="">No programs available</option>}
                {trainingPrograms.map((program) => <option key={program.id} value={program.id}>{program.name}</option>)}
              </select>
            </label>
            {selectedProgram?.modules?.length > 0 && (
              <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
                Module (optional)
                <select className={INPUT_CLASS} value={moduleId} onChange={(event) => setModuleId(event.target.value)}>
                  <option value="">Request the full program</option>
                  {selectedProgram.modules.map((module) => <option key={module.id} value={module.id}>{module.name}</option>)}
                </select>
              </label>
            )}
          </div>
        )}

        {step === 2 && (
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold text-slate-900">Review your request</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-slate-500">Student</dt><dd className="mt-1 font-medium text-slate-900">{[profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || profile?.username}</dd></div>
              <div><dt className="text-slate-500">Email</dt><dd className="mt-1 font-medium text-slate-900">{email}</dd></div>
              <div><dt className="text-slate-500">Training</dt><dd className="mt-1 font-medium text-slate-900">{trainings.find((training) => String(training.id) === trainingId)?.name}</dd></div>
              <div><dt className="text-slate-500">Program</dt><dd className="mt-1 font-medium text-slate-900">{selectedModule?.name ?? selectedProgram?.name}</dd></div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-slate-600">An administrator will review your request. Program access is provided after approval.</p>
          </section>
        )}

        {error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-6">
          <button type="button" onClick={() => { setError(""); setStep((current) => Math.max(current - 1, 0)); }} disabled={step === 0 || isSubmitting} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:invisible">
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
          <button type="submit" disabled={isSubmitting || (step === 1 && (isLoadingPrograms || !programId))} className="inline-flex items-center gap-2 rounded-xl bg-[#1775ee] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1262c9] disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? "Submitting..." : step === 2 ? "Submit request" : "Next"}
            {step < 2 && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        </div>
      </form>
    </main>
  );
}
