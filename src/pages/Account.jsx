import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, CircleUserRound, FileText, Printer, Search, UserRound, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";
import { FLAT_COURSES } from "../components/training/courses";
import { readGradebookAssessments } from "../utils/gradebookApi";

const INPUT_CLASS = "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2f5bea] focus:ring-2 focus:ring-blue-100";
const LABEL_CLASS = "block space-y-2 text-sm font-semibold text-slate-900";

function dateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function AccountSidebar({ view }) {
  const links = [
    { label: "Update Profile", to: "/account/profile", active: view === "profile" },
    { label: "Learning History", to: "/account/learning-history", active: view === "history" },
    { label: "Transcript", to: "/account/transcript", active: view === "transcript" },
  ];

  return (
    <aside className="w-full lg:sticky lg:top-24 lg:w-64 lg:self-start">
      <h2 className="mb-3 text-2xl font-bold text-slate-950">Account</h2>
      <nav aria-label="Account pages" className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-3 lg:block lg:rounded-none lg:border-x-0 lg:border-t-0">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            aria-current={link.active ? "page" : undefined}
            className={`flex min-h-14 items-center justify-between gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition sm:px-5 lg:border-b lg:py-4 ${link.active ? "border-[#2f5bea] bg-[#e9f0fd] text-[#2f5bea]" : "border-transparent text-slate-700 hover:bg-slate-50"}`}
          >
            <span>{link.label}</span>
            {link.active && <ArrowRight size={18} aria-hidden="true" />}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function ProfileForm({ profile, refreshProfile }) {
  const [tab, setTab] = useState("personal");
  const [fields, setFields] = useState({});
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState(false);
  const photoInputRef = useRef(null);

  useEffect(() => {
    if (!isPhotoPreviewOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsPhotoPreviewOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isPhotoPreviewOpen]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProfilePhoto() {
      try {
        const response = await fetch(`${API_URL}/auth/profile/photo`, {
          credentials: "include",
          signal: controller.signal,
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) throw new Error(body?.message || "Unable to load your profile photo.");
        setProfilePhoto(body?.photoDataUrl ?? null);
      } catch (photoError) {
        if (photoError.name !== "AbortError") {
          setError(photoError.message || "Unable to load your profile photo.");
        }
      }
    }
    loadProfilePhoto();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setFields({
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
      username: profile?.username ?? "",
      email: profile?.email ?? "",
      phone_number: profile?.phone_number ?? "",
      birth_date: dateInputValue(profile?.birth_date),
      gender: profile?.gender ?? "",
      city_province: profile?.city_province ?? "",
    });
  }, [profile]);

  function updateField(field, value) {
    setFields((current) => ({ ...current, [field]: value }));
  }

  async function saveProfile(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: fields.first_name.trim(),
          last_name: fields.last_name.trim(),
          username: fields.username.trim(),
          email: fields.email.trim() || null,
          phone_number: fields.phone_number.trim() || null,
          birth_date: fields.birth_date || undefined,
          gender: fields.gender,
          city_province: fields.city_province.trim(),
        }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || "Unable to save your profile.");
      await refreshProfile();
      setMessage("Your profile has been updated.");
    } catch (saveError) {
      setError(saveError.message || "Unable to save your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadProfilePhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setMessage("");
    setError("");

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Choose a JPG or PNG image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Profile photo must be no larger than 2 MB.");
      return;
    }

    setIsSaving(true);
    try {
      const photoDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === "string"
          ? resolve(reader.result)
          : reject(new Error("Unable to read the selected image."));
        reader.onerror = () => reject(new Error("Unable to read the selected image."));
        reader.readAsDataURL(file);
      });
      const response = await fetch(`${API_URL}/auth/profile/photo`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoDataUrl }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || "Unable to upload your profile photo.");
      setProfilePhoto(photoDataUrl);
      await refreshProfile();
      setMessage(body?.message || "Profile photo updated successfully.");
    } catch (photoError) {
      setError(photoError.message || "Unable to upload your profile photo.");
    } finally {
      setIsSaving(false);
    }
  }

  async function removeProfilePhoto() {
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/profile/photo`, {
        method: "DELETE",
        credentials: "include",
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || "Unable to remove your profile photo.");
      setProfilePhoto(null);
      await refreshProfile();
      setMessage(body?.message || "Profile photo removed successfully.");
    } catch (photoError) {
      setError(photoError.message || "Unable to remove your profile photo.");
    } finally {
      setIsSaving(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("The new passwords do not match.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/password`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || "Unable to update your password.");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMessage(body?.message || "Password updated successfully.");
    } catch (saveError) {
      setError(saveError.message || "Unable to update your password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function cancelChanges() {
    setFields({
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
      username: profile?.username ?? "",
      email: profile?.email ?? "",
      phone_number: profile?.phone_number ?? "",
      birth_date: dateInputValue(profile?.birth_date),
      gender: profile?.gender ?? "",
      city_province: profile?.city_province ?? "",
    });
    setMessage("");
    setError("");
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3" role="tablist" aria-label="Profile settings">
        {[
          { id: "personal", label: "Personal info" },
          { id: "security", label: "Security" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => { setTab(item.id); setMessage(""); setError(""); }}
            className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${tab === item.id ? "border-[#2f5bea] bg-[#e9f0fd] text-[#2f5bea] shadow-[0_2px_0_#2f5bea]" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-9">
        {tab === "personal" ? (
          <form onSubmit={saveProfile} className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-slate-50 p-4 sm:p-5">
              {profilePhoto ? (
                <button
                  type="button"
                  onClick={() => setIsPhotoPreviewOpen(true)}
                  aria-label="View profile photo larger"
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-blue-400 bg-white transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5bea]"
                >
                  <img src={profilePhoto} alt="" className="h-full w-full object-cover" />
                </button>
              ) : (
                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-400 bg-white text-[#2f5bea]" aria-hidden="true">
                  <CircleUserRound size={39} strokeWidth={1.6} />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">Profile photo</p>
                <p className="mt-1 text-xs text-slate-500">JPG or PNG, up to 2 MB</p>
              </div>
              <input ref={photoInputRef} type="file" accept="image/jpeg,image/png" className="sr-only" aria-label="Choose profile photo" onChange={uploadProfilePhoto} />
              <div className="flex w-full gap-2 sm:w-auto">
                <button type="button" disabled={isSaving} onClick={() => photoInputRef.current?.click()} className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#2f5bea] hover:text-[#2f5bea] disabled:opacity-50 sm:flex-none">{profilePhoto ? "Upload new" : "Upload photo"}</button>
                {profilePhoto && <button type="button" disabled={isSaving} onClick={removeProfilePhoto} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-red-300 hover:text-red-700 disabled:opacity-50">Remove</button>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={LABEL_CLASS}>First name
                <input className={INPUT_CLASS} value={fields.first_name ?? ""} onChange={(event) => updateField("first_name", event.target.value)} maxLength={80} />
              </label>
              <label className={LABEL_CLASS}>Last name
                <input className={INPUT_CLASS} value={fields.last_name ?? ""} onChange={(event) => updateField("last_name", event.target.value)} maxLength={80} />
              </label>
              <label className={LABEL_CLASS}>Username
                <input className={INPUT_CLASS} value={fields.username ?? ""} onChange={(event) => updateField("username", event.target.value)} autoComplete="username" minLength={3} maxLength={30} pattern="[A-Za-z0-9._-]+" title="Use 3-30 letters, numbers, periods, underscores, or hyphens." required />
              </label>
              <label className={LABEL_CLASS}>Role
                <input className={`${INPUT_CLASS} bg-slate-50`} value={profile?.role ?? "Learner"} readOnly />
              </label>
              <label className={LABEL_CLASS}>Email
                <input type="email" className={INPUT_CLASS} value={fields.email ?? ""} onChange={(event) => updateField("email", event.target.value)} maxLength={254} />
              </label>
              <label className={LABEL_CLASS}>Mobile number
                <input type="tel" className={INPUT_CLASS} value={fields.phone_number ?? ""} onChange={(event) => updateField("phone_number", event.target.value)} maxLength={30} />
              </label>
              <label className={LABEL_CLASS}>Birthdate
                <input type="date" className={INPUT_CLASS} value={fields.birth_date ?? ""} onChange={(event) => updateField("birth_date", event.target.value)} />
              </label>
              <label className={LABEL_CLASS}>Gender
                <select className={INPUT_CLASS} value={fields.gender ?? ""} onChange={(event) => updateField("gender", event.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </label>
              <label className={LABEL_CLASS}>City / Province
                <input className={INPUT_CLASS} value={fields.city_province ?? ""} onChange={(event) => updateField("city_province", event.target.value)} maxLength={120} />
              </label>
            </div>

            <FormFeedback message={message} error={error} />
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={cancelChanges} className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={isSaving} className="rounded-full bg-[#2f5bea] px-7 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60">{isSaving ? "Saving..." : "Save changes"}</button>
            </div>
          </form>
        ) : (
          <form onSubmit={changePassword} className="space-y-6">
            <label className={LABEL_CLASS}>Current password
              <input type="password" autoComplete="current-password" required className={INPUT_CLASS} placeholder="Enter current password" value={passwords.currentPassword} onChange={(event) => setPasswords((current) => ({ ...current, currentPassword: event.target.value }))} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={LABEL_CLASS}>New password
                <input type="password" autoComplete="new-password" minLength={10} maxLength={128} required className={INPUT_CLASS} placeholder="At least 10 characters" value={passwords.newPassword} onChange={(event) => setPasswords((current) => ({ ...current, newPassword: event.target.value }))} />
              </label>
              <label className={LABEL_CLASS}>Confirm new password
                <input type="password" autoComplete="new-password" minLength={10} maxLength={128} required className={INPUT_CLASS} placeholder="Repeat new password" value={passwords.confirmPassword} onChange={(event) => setPasswords((current) => ({ ...current, confirmPassword: event.target.value }))} />
              </label>
            </div>
            <p className="text-sm text-slate-500">Use at least 10 characters for your new password.</p>
            <FormFeedback message={message} error={error} />
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); setMessage(""); setError(""); }} className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={isSaving} className="rounded-full bg-[#2f5bea] px-7 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60">{isSaving ? "Updating..." : "Update password"}</button>
            </div>
          </form>
        )}
      </section>
      {isPhotoPreviewOpen && profilePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsPhotoPreviewOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Profile photo preview"
            className="relative flex max-h-full max-w-full items-center justify-center"
          >
            <button
              type="button"
              onClick={() => setIsPhotoPreviewOpen(false)}
              aria-label="Close profile photo preview"
              className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-2 text-slate-800 shadow-lg transition hover:bg-slate-100 sm:-right-4 sm:-top-4"
            >
              <X size={20} />
            </button>
            <img
              src={profilePhoto}
              alt="Enlarged profile photo"
              className="max-h-[85vh] max-w-[min(90vw,48rem)] rounded-2xl object-contain shadow-2xl"
            />
          </section>
        </div>
      )}
    </>
  );
}

function FormFeedback({ message, error }) {
  if (!message && !error) return null;
  return <p role={error ? "alert" : "status"} className={`text-sm ${error ? "text-red-700" : "text-green-700"}`}>{error || message}</p>;
}

function LearningHistory() {
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function loadHistory() {
      try {
        const response = await fetch(`${API_URL}/auth/learning-history`, {
          credentials: "include",
          signal: controller.signal,
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) throw new Error(body?.message || "Unable to load your learning history.");
        setEnrollments(Array.isArray(body) ? body : []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") setError(loadError.message || "Unable to load your learning history.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }
    loadHistory();
    return () => controller.abort();
  }, []);

  const courses = useMemo(() => enrollments.map((enrollment) => {
    const program = enrollment.program;
    const parentName = program?.parent?.name;
    const name = program?.name ?? "Training program";
    const course = FLAT_COURSES.find((item) => item.label.toLowerCase() === (parentName || name).toLowerCase())
      ?? FLAT_COURSES.find((item) => item.label.toLowerCase() === name.toLowerCase());
    return {
      id: `${enrollment.userId}-${enrollment.programId}`,
      name: parentName ? `${parentName} - ${name}` : name,
      category: program?.training?.name ?? "Professional training",
      enrolledAt: enrollment.enrolledAt,
      path: course?.path ?? "/pages/blank",
    };
  }), [enrollments]);

  const visibleCourses = courses.filter((course) =>
    (filter !== "completed") &&
    `${course.name} ${course.category}`.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <p className="flex items-center gap-2 font-medium text-slate-500"><BookOpen size={19} aria-hidden="true" /> {courses.length} {courses.length === 1 ? "program" : "programs"}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block sm:w-64">
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={`${INPUT_CLASS} pl-10`} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search programs" aria-label="Search programs" />
          </label>
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1" role="group" aria-label="Filter learning history">
            {[
              { id: "all", label: "All programs" },
              { id: "progress", label: "In progress" },
              { id: "completed", label: "Completed" },
            ].map((item) => (
              <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${filter === item.id ? "bg-[#e9f0fd] text-[#2f5bea] shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">{error}</div>
      ) : isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading your programs...</div>
      ) : visibleCourses.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleCourses.map((course) => (
            <article key={course.id} className="flex min-w-0 flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
              <div className="flex min-w-0 items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2f5bea]" aria-hidden="true"><BookOpen size={22} /></span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2f5bea]">{course.category}</p>
                  <h2 className="mt-1 break-words font-bold text-slate-950">{course.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">Enrolled {new Date(course.enrolledAt).toLocaleDateString()}</p>
                  <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">In progress</span>
                </div>
              </div>
              <Link to={course.path} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#2f5bea] hover:text-[#2f5bea]">
                Open program <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <BookOpen size={30} aria-hidden="true" className="mx-auto text-slate-400" />
          <h2 className="mt-3 font-semibold text-slate-900">{filter === "completed" ? "No completed programs yet" : "No programs found"}</h2>
          <p className="mt-1 text-sm text-slate-500">{filter === "completed" ? "Completed-program tracking is not available yet." : "Try another search or explore our available courses."}</p>
        </div>
      )}
    </>
  );
}

function getLatestTranscriptAssessments(assessments) {
  const latestByAssessment = new Map();
  assessments.forEach((assessment) => {
    const key = `${assessment.type ?? "assessment"}:${assessment.title ?? assessment.id}`;
    const current = latestByAssessment.get(key);
    const hasAttemptNumbers = Number.isFinite(assessment.attemptNumber)
      && Number.isFinite(current?.attemptNumber);
    const isLaterAttempt = hasAttemptNumbers && assessment.attemptNumber > current.attemptNumber;
    const isLaterSubmission = !hasAttemptNumbers
      && assessment.submittedAt > (current?.submittedAt ?? -Infinity);
    if (!current || isLaterAttempt || isLaterSubmission) {
      latestByAssessment.set(key, assessment);
    }
  });
  return [...latestByAssessment.values()];
}

function Transcript({ profile }) {
  const [enrollments, setEnrollments] = useState([]);
  const [gradebooks, setGradebooks] = useState({});
  const [error, setError] = useState("");
  const [gradebookWarning, setGradebookWarning] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    async function loadTranscript() {
      try {
        const historyResponse = await fetch(`${API_URL}/auth/learning-history`, {
          credentials: "include",
          signal: controller.signal,
        });
        const historyBody = await historyResponse.json().catch(() => null);
        if (!historyResponse.ok) {
          throw new Error(historyBody?.message || "Unable to load your transcript.");
        }
        const rows = Array.isArray(historyBody) ? historyBody : [];
        if (!isActive) return;
        setEnrollments(rows);

        const programKeys = [...new Set(rows.map((enrollment) => {
          const program = enrollment.program;
          const name = program?.name ?? "";
          const parentName = program?.parent?.name ?? "";
          const course = FLAT_COURSES.find((item) =>
            item.label.toLowerCase() === `${parentName} ${name}`.trim().toLowerCase(),
          ) ?? FLAT_COURSES.find((item) =>
            item.label.toLowerCase() === (parentName || name).toLowerCase(),
          );
          if (course?.path === "/training/cisco/ccna/ccna") return "ccna";
          if (course?.path === "/training/cisco/ccna/automation") return "ccna-automation";
          if (course?.path === "/training/cisco/ccna/cybersecurity") return "ccna-cybersecurity";
          return null;
        }).filter(Boolean))];
        const results = await Promise.allSettled(
          programKeys.map(async (programKey) => [programKey, await readGradebookAssessments(programKey)]),
        );
        if (!isActive) return;
        const loadedGradebooks = {};
        let failedGradebookCount = 0;
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            const [programKey, assessments] = result.value;
            loadedGradebooks[programKey] = assessments;
          } else {
            failedGradebookCount += 1;
            console.error(`Unable to load transcript gradebook for ${programKeys[index]}.`, result.reason);
          }
        });
        setGradebooks(loadedGradebooks);
        if (failedGradebookCount) {
          setGradebookWarning("Some saved assessment results could not be loaded. Enrollment records are still shown.");
        }
      } catch (loadError) {
        if (isActive && loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load your transcript.");
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    }
    loadTranscript();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const latestGradebooks = useMemo(() => Object.fromEntries(
    Object.entries(gradebooks).map(([programKey, assessments]) => [
      programKey,
      getLatestTranscriptAssessments(assessments),
    ]),
  ), [gradebooks]);

  const transcriptRows = useMemo(() => enrollments.map((enrollment) => {
    const program = enrollment.program;
    const name = program?.name ?? "Training program";
    const parentName = program?.parent?.name;
    const courseName = parentName ? `${parentName} - ${name}` : name;
    const match = FLAT_COURSES.find((course) =>
      course.label.toLowerCase() === `${parentName ?? ""} ${name}`.trim().toLowerCase(),
    ) ?? FLAT_COURSES.find((course) =>
      course.label.toLowerCase() === (parentName || name).toLowerCase(),
    ) ?? FLAT_COURSES.find((course) => course.label.toLowerCase() === name.toLowerCase());
    const programKey = match?.path === "/training/cisco/ccna/ccna"
      ? "ccna"
      : match?.path === "/training/cisco/ccna/automation"
        ? "ccna-automation"
        : match?.path === "/training/cisco/ccna/cybersecurity"
          ? "ccna-cybersecurity"
          : null;
    const assessments = programKey ? latestGradebooks[programKey] ?? [] : [];
    const scoreTotal = assessments.reduce((total, item) => total + item.score, 0);
    const maxScoreTotal = assessments.reduce((total, item) => total + item.maxScore, 0);

    return {
      id: `${enrollment.userId}-${enrollment.programId}`,
      name: courseName,
      category: program?.training?.name ?? program?.parent?.training?.name ?? "Professional training",
      enrolledAt: enrollment.enrolledAt,
      assessmentCount: assessments.length,
      average: maxScoreTotal ? Math.round((scoreTotal / maxScoreTotal) * 100) : null,
      path: match?.path ?? null,
    };
  }), [enrollments, latestGradebooks]);

  const allAssessments = Object.values(latestGradebooks).flat();
  const totalScore = allAssessments.reduce((total, item) => total + item.score, 0);
  const totalPossibleScore = allAssessments.reduce((total, item) => total + item.maxScore, 0);
  const overallAverage = totalPossibleScore
    ? Math.round((totalScore / totalPossibleScore) * 100)
    : null;

  return (
    <div className="space-y-5 print:space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2f5bea] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Printer size={16} aria-hidden="true" /> Print / Save PDF
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Programs enrolled", value: transcriptRows.length },
          { label: "Assessments recorded", value: allAssessments.length },
          { label: "Assessment average", value: overallAverage === null ? "—" : `${overallAverage}%` },
          { label: "Learning hours", value: "Not tracked" },
        ].map((metric) => (
          <article key={metric.label} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs leading-5 text-slate-500">{metric.label}</p>
            <p className="mt-1 break-words text-2xl font-bold text-[#2f5bea]">{metric.value}</p>
          </article>
        ))}
      </div>

      <section className="grid gap-x-6 gap-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
        {[
          { label: "Student name", value: [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || profile?.username || "—" },
          { label: "Student ID", value: profile?.userId ?? "—" },
          { label: "Academic standing", value: "Not available" },
          { label: "Enrollment date", value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—" },
          { label: "Transcript date", value: new Date().toLocaleDateString() },
          { label: "Document type", value: "Unofficial transcript" },
        ].map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-1 break-words text-sm font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4 sm:px-6">
          <FileText size={19} aria-hidden="true" className="text-[#2f5bea]" />
          <h2 className="text-lg font-bold text-slate-950">Academic record</h2>
        </div>
        {error ? (
          <p role="alert" className="p-5 text-sm text-red-700">{error}</p>
        ) : isLoading ? (
          <p className="p-8 text-center text-sm text-slate-500">Loading your academic record...</p>
        ) : transcriptRows.length ? (
          <>
          {gradebookWarning && <p role="status" className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">{gradebookWarning}</p>}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-600">
                <tr>
                  <th scope="col" className="px-5 py-3">Program</th>
                  <th scope="col" className="px-5 py-3">Enrolled</th>
                  <th scope="col" className="px-5 py-3 text-center">Assessments</th>
                  <th scope="col" className="px-5 py-3 text-center">Average</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transcriptRows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <th scope="row" className="max-w-64 px-5 py-4 font-semibold text-slate-900">
                      {row.path ? <Link to={row.path} className="hover:text-[#2f5bea]">{row.name}</Link> : row.name}
                      <span className="mt-1 block text-xs font-normal text-slate-500">{row.category}</span>
                    </th>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">{new Date(row.enrolledAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-center text-slate-600">{row.assessmentCount || "—"}</td>
                    <td className="px-5 py-4 text-center font-bold text-[#2f5bea]">{row.average === null ? "—" : `${row.average}%`}</td>
                    <td className="px-5 py-4"><span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">In progress</span></td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-slate-200 bg-slate-50 font-semibold text-slate-800">
                <tr>
                  <td className="px-5 py-4">Total programs</td>
                  <td className="px-5 py-4">{transcriptRows.length}</td>
                  <td className="px-5 py-4 text-center">{allAssessments.length}</td>
                  <td className="px-5 py-4 text-center">{overallAverage === null ? "—" : `${overallAverage}%`}</td>
                  <td className="px-5 py-4">Unofficial</td>
                </tr>
              </tfoot>
            </table>
          </div>
          </>
        ) : (
          <div className="px-5 py-12 text-center">
            <BookOpen size={30} aria-hidden="true" className="mx-auto text-slate-400" />
            <p className="mt-3 font-semibold text-slate-900">No academic records yet</p>
            <p className="mt-1 text-sm text-slate-500">Your enrolled programs and saved assessments will appear here.</p>
          </div>
        )}
      </section>
      <p className="text-xs leading-5 text-slate-500">Assessment results are based on saved gradebook entries. Course completion and learning hours are not currently tracked.</p>
    </div>
  );
}

export default function Account({ view = "profile" }) {
  const { profile, refreshProfile } = useAuth();
  const isHistory = view === "history";
  const isTranscript = view === "transcript";
  const heading = isTranscript ? "Transcript" : isHistory ? "Learning History" : "Update Profile";

  return (
    <main className="min-h-[calc(100vh-5rem)] w-full overflow-x-hidden bg-[#f8fafc] px-4 py-8 sm:px-8 sm:py-12 lg:px-16 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 sm:mb-12 print:hidden">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2f5bea]">Matekk Training Academy</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{heading}</h1>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            {isTranscript
              ? "Your academic record, assessment results, and enrollment details."
              : isHistory
                ? "Review your programs, progress, and certificates."
                : "Keep your personal details up to date."}
          </p>
        </header>

        <div className="grid min-w-0 gap-7 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <div className="print:hidden"><AccountSidebar view={view} /></div>
          <section className="min-w-0" aria-label={heading}>
            {isTranscript
              ? <Transcript profile={profile} />
              : isHistory
              ? <LearningHistory />
              : <>
                  <div className="mb-5 flex items-center gap-2 text-sm text-slate-500"><UserRound size={17} aria-hidden="true" /> {profile?.username ?? "My account"}</div>
                  <ProfileForm profile={profile} refreshProfile={refreshProfile} />
                </>}
          </section>
        </div>
      </div>
    </main>
  );
}
