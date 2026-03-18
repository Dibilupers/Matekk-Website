import { useState, useRef, useCallback, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

// ─── Config ────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const COOLDOWN_MS = 60000;

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

const INQUIRY_TYPE_OPTIONS = [
  {
    value: "training",
    label: "Training",
    description: "Enroll in a course or certification program",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    value: "services",
    label: "ICT Services",
    description: "Inquire about network, security, or engineering solutions",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"
        />
      </svg>
    ),
  },
];

// ─── Custom Hook ───────────────────────────────────────────────────────────
function useEnrollForm(onClose) {
  const [step, setStep] = useState(0);
  const [inquiryType, setInquiryType] = useState(null);
  const [status, setStatus] = useState("idle");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [honeypot, setHoneypot] = useState("");
  const captchaRef = useRef(null);
  const cooldownRef = useRef(null);

  const [form, setForm] = useState({
    funding: FUNDING_OPTIONS[0],
    attendees: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => clearInterval(cooldownRef.current);
  }, []);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const selectInquiryType = (type) => {
    setInquiryType(type);
    setStep(1);
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.attendees || isNaN(form.attendees) || Number(form.attendees) < 1)
      e.attendees = "Enter a valid number of attendees.";
    if (!form.name.trim()) e.name = "Name or company is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (inquiryType === "training" && !form.course)
      e.course = "Please select a course.";
    if (!captchaToken) e.captcha = "Please complete the CAPTCHA verification.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep1()) setStep(2);
  };
  const back = () => {
    setErrors({});
    setStep(1);
  };
  const backToSelection = () => {
    setErrors({});
    setStep(0);
    setInquiryType(null);
  };

  const submit = async () => {
    /* Honeypot check */
    if (honeypot) return;

    /* Rate limit check */
    const lastSent = localStorage.getItem("lastModalSubmit");
    const now = Date.now();

    if (lastSent && now - lastSent < COOLDOWN_MS) {
      clearInterval(cooldownRef.current);

      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastSent)) / 1000);
      setErrors({
        submit: `Please wait ${secondsLeft}s before sending again.`,
      });

      cooldownRef.current = setInterval(() => {
        const secondsLeft = Math.ceil(
          (COOLDOWN_MS -
            (Date.now() - localStorage.getItem("lastModalSubmit"))) /
            1000,
        );
        if (secondsLeft <= 0) {
          clearInterval(cooldownRef.current);
          setErrors((prev) => ({ ...prev, submit: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            submit: `Please wait ${secondsLeft}s before sending again.`,
          }));
        }
      }, 1000);
      return;
    }

    if (!validateStep2()) return;
    setStatus("loading");

    try {
      localStorage.setItem("lastModalSubmit", now);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          inquiry_type: inquiryType,
          funding: form.funding,
          attendees: form.attendees,
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course || "N/A",
          message: form.message || "No additional message.",
          subject: `New ${inquiryType} Inquiry`,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  const onCaptchaVerify = useCallback((token) => setCaptchaToken(token), []);
  const onCaptchaExpire = useCallback(() => setCaptchaToken(null), []);

  const reset = () => {
    clearInterval(cooldownRef.current);
    setStep(0);
    setInquiryType(null);
    setStatus("idle");
    setCaptchaToken(null);
    setErrors({});
    setHoneypot("");
    setForm({
      funding: FUNDING_OPTIONS[0],
      attendees: "",
      name: "",
      email: "",
      phone: "",
      course: "",
      message: "",
    });
  };

  return {
    step,
    inquiryType,
    form,
    errors,
    status,
    captchaToken,
    captchaRef,
    cooldownRef,
    honeypot,
    setHoneypot,
    update,
    selectInquiryType,
    next,
    back,
    backToSelection,
    submit,
    reset,
    onClose,
    onCaptchaVerify,
    onCaptchaExpire,
  };
}

// ─── Shared UI Primitives ──────────────────────────────────────────────────
function FieldError({ msg }) {
  return msg ? (
    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {msg}
    </p>
  ) : null;
}

function Input({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
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

function SelectField({
  label,
  id,
  options,
  error,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-lg border px-3 py-2.5 text-sm outline-none
            transition focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10
            ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-blue-300"}
            ${!value ? "text-gray-400" : "text-gray-800"}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function ProgressBar({ step }) {
  if (step === 0) return null;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
          Step {step} of 2
        </span>
        <span className="text-xs text-gray-400">
          {step === 1 ? "50%" : "100%"}
        </span>
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

function ModalHeader({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between mb-1">
      <div>
        <h5 className="font-bold text-gray-900">{title}</h5>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Step Screens ──────────────────────────────────────────────────────────
function Step0({ onSelect }) {
  return (
    <>
      <ModalHeader
        title={
          <>
            What are you{" "}
            <span className="text-[#1775EE]">inquiring about?</span>
          </>
        }
        subtitle="Select the type of inquiry to get started."
      />
      <div className="flex flex-col gap-4 mt-6">
        {INQUIRY_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100
              hover:border-blue-400 hover:bg-blue-50 active:scale-98 transition-all duration-200
              text-left group"
          >
            <div
              className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100
              flex items-center justify-center text-[#1775EE] shrink-0 transition-colors duration-200"
            >
              {opt.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {opt.label}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{opt.description}</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-300 group-hover:text-blue-400 ml-auto shrink-0 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ))}
      </div>
    </>
  );
}

function Step1({
  form,
  errors,
  update,
  next,
  backToSelection,
  inquiryType,
  honeypot,
  setHoneypot,
}) {
  return (
    <>
      <ModalHeader
        title={
          <>
            Begin Your <span className="text-[#1775EE]">Learning Journey</span>
          </>
        }
        subtitle="Fill out the form to secure your slot or learn more about the course."
      />

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="mt-3 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50
          text-[#1775EE] text-xs font-semibold capitalize"
        >
          {inquiryType === "training" ? "📚" : "🖥️"}{" "}
          {inquiryType === "training"
            ? "Training Inquiry"
            : "ICT Services Inquiry"}
        </span>
      </div>
      <h5 className="font-bold text-gray-900 mb-4">
        Individual / Company Info
      </h5>
      <div className="flex flex-col gap-4">
        <SelectField
          label="Choose Funding"
          id="funding"
          options={FUNDING_OPTIONS}
          value={form.funding}
          onChange={update("funding")}
        />
        <Input
          label="Number of Attendees"
          id="attendees"
          type="number"
          min="1"
          placeholder="e.g. 3"
          value={form.attendees}
          onChange={update("attendees")}
          error={errors.attendees}
        />
        <Input
          label="Name / Company"
          id="name"
          placeholder="Juan dela Cruz"
          value={form.name}
          onChange={update("name")}
          error={errors.name}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="juan@company.com"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />
        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="+63 912 345 6789"
          value={form.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={backToSelection}
          className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600
            hover:border-blue-400 hover:text-blue-600 active:scale-95 transition-all duration-150"
        >
          ← Back
        </button>
        <button
          onClick={next}
          className="px-6 py-2.5 rounded-lg bg-[#1775EE] text-white text-sm font-semibold
            hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200"
        >
          Next →
        </button>
      </div>
    </>
  );
}

function Step2({
  form,
  errors,
  update,
  back,
  submit,
  status,
  captchaRef,
  onCaptchaVerify,
  onCaptchaExpire,
  inquiryType,
}) {
  const isLoading = status === "loading";
  return (
    <>
      <ModalHeader
        title={
          <>
            Begin Your <span className="text-[#1775EE]">Learning Journey</span>
          </>
        }
        subtitle="Fill out the form to secure your slot or learn more about the course."
      />
      <div className="mt-3 mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50
          text-[#1775EE] text-xs font-semibold capitalize"
        >
          {inquiryType === "training"
            ? "📚 Training Inquiry"
            : "🖥️ ICT Services Inquiry"}
        </span>
      </div>
      <h5 className="font-bold text-gray-900 mb-2">
        {inquiryType === "training" ? "Course Details" : "Service Details"}
      </h5>
      <div className="flex flex-col gap-4">
        {inquiryType === "training" && (
          <SelectField
            label="Course to Take"
            id="course"
            options={COURSES}
            value={form.course}
            onChange={update("course")}
            error={errors.course}
            placeholder="Select a course"
          />
        )}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-700"
          >
            {inquiryType === "training" ? (
              <>
                {" "}
                Message{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </>
            ) : (
              "Describe your requirements"
            )}
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder={
              inquiryType === "training"
                ? "Any specific topics, questions, or scheduling preferences..."
                : "Describe the ICT services you need (e.g. network setup, cybersecurity, data center)..."
            }
            value={form.message}
            onChange={update("message")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none
              resize-none transition hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* reCAPTCHA */}
        <div className="flex flex-col gap-1">
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={onCaptchaVerify}
            onExpired={onCaptchaExpire}
          />
          <FieldError msg={errors.captcha} />
        </div>
      </div>

      {/* Rate limit warning */}
      {errors.submit && (
        <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-700 flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {errors.submit}
        </div>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 leading-relaxed">
        We'll email you a quotation within 1–2 business days. By submitting, you
        agree to be contacted about our services and schedules.
      </p>

      <div className="mt-5 flex justify-between items-center">
        <button
          onClick={back}
          disabled={isLoading}
          className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600
            hover:border-blue-400 hover:text-blue-600 active:scale-95 transition-all duration-150
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={submit}
          disabled={isLoading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold
            hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200
            disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </>
  );
}

function SuccessScreen({ onClose, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent!</h2>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        Thanks for reaching out. We'll send a quotation to your email within 1–2
        business days.
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
  const handleClose = () => {
    f.reset();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end px-7 pt-5">
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center
              justify-center text-gray-500 hover:text-gray-700 transition-colors duration-150"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-7 pb-7">
          {f.status === "success" ? (
            <SuccessScreen onClose={handleClose} reset={f.reset} />
          ) : (
            <>
              <ProgressBar step={f.step} />
              {f.step === 0 ? (
                <Step0 onSelect={f.selectInquiryType} />
              ) : f.step === 1 ? (
                <Step1 {...f} onClose={handleClose} />
              ) : (
                <Step2 {...f} onClose={handleClose} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
