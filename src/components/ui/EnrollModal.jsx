import { useState, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import HCaptcha from "@hcaptcha/react-hcaptcha";

/**
 * EnrollModal — Production Component
 *
 * Required .env variables:
 *   VITE_EMAILJS_SERVICE_ID=your_service_id
 *   VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *   VITE_EMAILJS_PUBLIC_KEY=your_public_key
 *   VITE_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
 *
 * Install dependencies:
 *   npm install @emailjs/browser @hcaptcha/react-hcaptcha
 *
 * EmailJS template variables to map in your template:
 *   {{funding}}  {{attendees}}  {{from_name}}  {{from_email}}
 *   {{phone}}    {{course}}     {{message}}
 *
 * Usage:
 *   import EnrollModal from "@/components/modals/EnrollModal";
 *   <EnrollModal isOpen={open} onClose={() => setOpen(false)} />
 */

// ─── Config ────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const HCAPTCHA_SITE_KEY   = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

// ─── Constants ─────────────────────────────────────────────────────────────
const FUNDING_OPTIONS = [
  "Personal / Individual",
  "Company / Corporate",
  "Government / NGO",
];

const COURSES = [
  "React & Modern Frontend Development",
  "Node.js & Backend Engineering",
  "UI/UX Design Fundamentals",
  "Data Analytics with Python",
  "Cloud Infrastructure (AWS/GCP)",
  "Cybersecurity Essentials",
];

// ─── Custom Hook ───────────────────────────────────────────────────────────
function useEnrollForm(onClose) {
  const [step, setStep]               = useState(1);
  const [status, setStatus]           = useState("idle"); // idle | loading | success | error
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const [form, setForm] = useState({
    funding:   FUNDING_OPTIONS[0],
    attendees: "",
    name:      "",
    email:     "",
    phone:     "",
    course:    "",
    message:   "",
  });

  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validateStep1 = () => {
    const e = {};
    if (!form.attendees || isNaN(form.attendees) || Number(form.attendees) < 1)
      e.attendees = "Enter a valid number of attendees.";
    if (!form.name.trim())
      e.name = "Name or company is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.phone.trim())
      e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.course)
      e.course = "Please select a course.";
    if (!captchaToken)
      e.captcha = "Please complete the CAPTCHA verification.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep1()) setStep(2); };
  const back = () => { setErrors({}); setStep(1); };

  const submit = async () => {
    if (!validateStep2()) return;
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          funding:    form.funding,
          attendees:  form.attendees,
          from_name:  form.name,
          from_email: form.email,
          phone:      form.phone,
          course:     form.course,
          message:    form.message || "No additional message.",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  const onCaptchaVerify = useCallback((token) => setCaptchaToken(token), []);
  const onCaptchaExpire = useCallback(() => setCaptchaToken(null), []);

  const reset = () => {
    setStep(1);
    setStatus("idle");
    setCaptchaToken(null);
    setErrors({});
    setForm({ funding: FUNDING_OPTIONS[0], attendees: "", name: "", email: "", phone: "", course: "", message: "" });
  };

  return {
    step, form, errors, status, captchaToken, captchaRef,
    update, next, back, submit, reset, onClose,
    onCaptchaVerify, onCaptchaExpire,
  };
}

// ─── Shared UI Primitives ──────────────────────────────────────────────────
function FieldError({ msg }) {
  return msg
    ? <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {msg}
      </p>
    : null;
}

function Input({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-blue-300"}`}
        {...props}
      />
      <FieldError msg={error} />
    </div>
  );
}

function SelectField({ label, id, options, error, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          id={id} value={value} onChange={onChange}
          className={`w-full appearance-none rounded-lg border px-3 py-2.5 text-sm outline-none
            transition focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10
            ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-blue-300"}
            ${!value ? "text-gray-400" : "text-gray-800"}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function ProgressBar({ step }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
          Step {step} of 2
        </span>
        <span className="text-xs text-gray-400">{step === 1 ? "50%" : "100%"}</span>
      </div>
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>
    </div>
  );
}

function ModalHeader({ onClose }) {
  return (
    <div className="flex items-start justify-between mb-1">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Begin Your <span className="text-blue-600">Learning Journey</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill out the form to secure your slot or learn more about the course.
        </p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition mt-1 ml-4 shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ─── Step Screens ──────────────────────────────────────────────────────────
function Step1({ form, errors, update, next, onClose }) {
  return (
    <>
      <ModalHeader onClose={onClose} />
      <h3 className="text-xs font-bold text-gray-900 mt-5 mb-4 uppercase tracking-widest">
        Individual / Company Info
      </h3>
      <div className="flex flex-col gap-4">
        <SelectField
          label="Choose Funding" id="funding"
          options={FUNDING_OPTIONS} value={form.funding}
          onChange={update("funding")}
        />
        <Input
          label="Number of Attendees" id="attendees"
          type="number" min="1" placeholder="e.g. 3"
          value={form.attendees} onChange={update("attendees")}
          error={errors.attendees}
        />
        <Input
          label="Name / Company" id="name" placeholder="Juan dela Cruz"
          value={form.name} onChange={update("name")} error={errors.name}
        />
        <Input
          label="Email" id="email" type="email" placeholder="juan@company.com"
          value={form.email} onChange={update("email")} error={errors.email}
        />
        <Input
          label="Phone Number" id="phone" type="tel" placeholder="+63 912 345 6789"
          value={form.phone} onChange={update("phone")} error={errors.phone}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={next}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold
            hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200"
        >
          Next →
        </button>
      </div>
    </>
  );
}

function Step2({ form, errors, update, back, submit, status, captchaRef, onCaptchaVerify, onCaptchaExpire, onClose }) {
  const isLoading = status === "loading";
  return (
    <>
      <ModalHeader onClose={onClose} />
      <h3 className="text-xs font-bold text-gray-900 mt-5 mb-4 uppercase tracking-widest">
        Course Details
      </h3>
      <div className="flex flex-col gap-4">
        <SelectField
          label="Course to Take" id="course"
          options={COURSES} value={form.course}
          onChange={update("course")} error={errors.course}
          placeholder="Select a course"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="message" rows={3}
            placeholder="Any specific topics, questions, or scheduling preferences..."
            value={form.message} onChange={update("message")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none
              resize-none transition hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* ── hCaptcha ── */}
        <div className="flex flex-col gap-1">
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITE_KEY}
            onVerify={onCaptchaVerify}
            onExpire={onCaptchaExpire}
            size="normal"
            theme="light"
          />
          <FieldError msg={errors.captcha} />
        </div>
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 leading-relaxed">
        We'll email you a quotation within 1–2 business days. By submitting, you agree to be
        contacted about training and schedules.
      </p>

      <div className="mt-5 flex justify-between items-center">
        <button
          onClick={back} disabled={isLoading}
          className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600
            hover:border-blue-400 hover:text-blue-600 active:scale-95 transition-all duration-150
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={submit} disabled={isLoading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold
            hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200
            disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
              </svg>
              Sending...
            </>
          ) : "Submit"}
        </button>
      </div>
    </>
  );
}

function SuccessScreen({ onClose, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent!</h2>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        Thanks for reaching out. We'll send a quotation to your email within 1–2 business days.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold
            text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all duration-150"
        >
          Submit Another
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold
            hover:bg-blue-700 active:scale-95 transition-all duration-150"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function EnrollModal({ isOpen, onClose }) {
  const f = useEnrollForm(onClose);
  const handleClose = () => { f.reset(); onClose(); };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-7">
          {f.status === "success" ? (
            <SuccessScreen onClose={handleClose} reset={f.reset} />
          ) : (
            <>
              <ProgressBar step={f.step} />
              {f.step === 1
                ? <Step1 {...f} onClose={handleClose} />
                : <Step2 {...f} onClose={handleClose} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}