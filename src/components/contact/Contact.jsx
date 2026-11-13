import emailjs from "emailjs-com";
import { useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import API_URL from "../../config/api";
import { HCAPTCHA_SITE_KEY } from "../../config/hcaptcha";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SUCCESS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const FAILURE_COOLDOWN_MS = 60_000;
const PREVIOUS_SUCCESS_COOLDOWN_MS = 60 * 60 * 1000;
const CONTACT_EMAIL = "info@matekkcybercore.com";

// ── Validators ─────────────────────────────────────────────────────────────
const MAX_NAME_LENGTH = 36;
const MAX_EMAIL_LENGTH = 50;
const MAX_PHONE_LENGTH = 11;
const MAX_SUBJECT_LENGTH = 36;
const MAX_MESSAGE_LENGTH = 500;
const isValidName = (v) => /^[\p{L}\p{M}]+\.?(?:[ '\u2019-][\p{L}\p{M}]+\.?)*$/u.test(v.trim());
const isValidEmail = (v) => v.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => /^\d{11}$/.test(v);
const isEmpty      = (v) => v.trim().length === 0;
const isTooLong    = (v, max) => v.length > max;
const getCooldownDuration = () => {
  const storedDuration = Number(localStorage.getItem("lastFormSubmitCooldownMs"));
  if (storedDuration === PREVIOUS_SUCCESS_COOLDOWN_MS) {
    localStorage.setItem("lastFormSubmitCooldownMs", String(SUCCESS_COOLDOWN_MS));
    return SUCCESS_COOLDOWN_MS;
  }
  return storedDuration || FAILURE_COOLDOWN_MS;
};
const formatRemainingTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
};

export default function ContactForm() {
  const [loading, setLoading]           = useState(false);
  const [status, setStatus]             = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const timerRef    = useRef(null);
  const cooldownRef = useRef(null);
  const captchaRef = useRef(null);

  // Cleanup timers on unmount
  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearInterval(cooldownRef.current);
  }, []);

  const startCooldownTimer = () => {
    clearInterval(cooldownRef.current);
    const updateCooldownStatus = () => {
      const lastSubmit = Number(localStorage.getItem("lastFormSubmit"));
      const cooldownMs = getCooldownDuration();
      const sLeft = Math.ceil((cooldownMs - (Date.now() - lastSubmit)) / 1000);

      if (!Number.isFinite(lastSubmit)) {
        clearInterval(cooldownRef.current);
        return;
      }

      if (sLeft <= 0) {
        clearInterval(cooldownRef.current);
        setStatus("");
      } else {
        setStatus(`You can send another message in ${formatRemainingTime(sLeft)}.`);
      }
    };

    cooldownRef.current = setInterval(updateCooldownStatus, 1000);
    updateCooldownStatus();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setStatus("");

    // ── Honeypot ──────────────────────────────────────────────────────────
    if (e.target.honeypot.value) return;

    // ── Rate limit ────────────────────────────────────────────────────────
    const lastSent = Number(localStorage.getItem("lastFormSubmit"));
    const cooldownMs = getCooldownDuration();
    const now = Date.now();
    if (Number.isFinite(lastSent) && now - lastSent < cooldownMs) {
      const sLeft = Math.ceil((cooldownMs - (now - lastSent)) / 1000);
      setStatus(`You can send another message in ${formatRemainingTime(sLeft)}.`);
      startCooldownTimer();
      return;
    }

    // ── Sanitize ──────────────────────────────────────────────────────────
    const name    = DOMPurify.sanitize(e.target.name.value);
    const email   = DOMPurify.sanitize(e.target.email.value);
    const phone   = DOMPurify.sanitize(e.target.phone.value);
    const subject = DOMPurify.sanitize(e.target.subject.value);
    const message = DOMPurify.sanitize(e.target.message.value);

    // ── Validate ──────────────────────────────────────────────────────────
    if (isEmpty(name) || isEmpty(email) || isEmpty(phone) || isEmpty(subject) || isEmpty(message)) {
      setStatus("Please fill in all fields.");
      return;
    }
    if (isTooLong(name, MAX_NAME_LENGTH)) {
      setStatus(`Full name must be ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }
    if (!isValidName(name)) {
      setStatus("Full name can contain letters, spaces, periods, apostrophes, and hyphens only.");
      return;
    }
    if (isTooLong(email, MAX_EMAIL_LENGTH)) {
      setStatus(`Email must be ${MAX_EMAIL_LENGTH} characters or fewer.`);
      return;
    }
    if (isTooLong(phone, MAX_PHONE_LENGTH) || !isValidPhone(phone)) {
      setStatus("Mobile number must contain exactly 11 digits.");
      return;
    }
    if (isTooLong(subject, MAX_SUBJECT_LENGTH)) {
      setStatus(`Subject must be ${MAX_SUBJECT_LENGTH} characters or fewer.`);
      return;
    }
    if (isTooLong(message, MAX_MESSAGE_LENGTH)) {
      setStatus(`Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`);
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      setStatus("Please enter a valid phone number.");
      return;
    }
    if (!HCAPTCHA_SITE_KEY) {
      setStatus("CAPTCHA is not configured. Please contact us directly.");
      return;
    }
    if (!captchaToken) {
      setStatus("Please complete the CAPTCHA verification.");
      return;
    }
    if (!window.confirm(
      `Are you sure you want to send this message? You can send one message per 24 hours. For additional questions, email ${CONTACT_EMAIL}.`,
    )) {
      return;
    }

    setLoading(true);

    /*
     * Payload keys are intentionally aligned with the shared EmailJS template.
     *
     * Keys sent by ContactForm:
     *   name, email, phone, subject, message
     *
     * Keys deliberately omitted (falsy → template conditional blocks stay hidden):
     *   inquiry_type  → "" (empty string — triggers {{^inquiry_type}} "Contact" badge)
     *   funding       → absent             (hides Training block)
     *   service_interest → absent          (hides Services block)
     *
     * The template uses {{^inquiry_type}} for the Contact badge and
     * {{#funding}} / {{#service_interest}} for the two modal-specific blocks.
     */
    /*
     * ContactForm payload keys:
     *   subject         → used by EmailJS as the email subject line
     *   subject_display → shown inside the Sender Info card in the template
     *   badge_*         → drive the header badge (no {{^}} inverse blocks needed)
     *   inquiry_type is intentionally omitted → Training/Services blocks stay hidden
     */
    const payload = {
      name,
      email,
      phone,
      subject,
      subject_display:     subject,          // shown in the Sender Info card
      message,
      badge_label:         "📩 Contact Message",
      badge_color:         "rgba(255,255,255,0.15)",
      badge_text_color:    "#ffffff",
      badge_border_color:  "rgba(255,255,255,0.25)",
    };

    try {
      const verification = await fetch(`${API_URL}/captcha/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken, captchaAction: "contact" }),
      });
      if (!verification.ok) {
        throw new Error("CAPTCHA verification failed. Please try again.");
      }
    } catch {
      setStatus("CAPTCHA verification failed. Please try again.");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      setLoading(false);
      return;
    }

    try {
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY);
      localStorage.setItem("lastFormSubmit", String(Date.now()));
      localStorage.setItem("lastFormSubmitCooldownMs", String(SUCCESS_COOLDOWN_MS));
      setStatus("success");
      e.target.reset();
    } catch {
      localStorage.setItem("lastFormSubmit", String(Date.now()));
      localStorage.setItem("lastFormSubmitCooldownMs", String(FAILURE_COOLDOWN_MS));
      setStatus("Failed to send message. Please try again.");
      timerRef.current = setTimeout(startCooldownTimer, 5_000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className="bg-white space-y-6 md:space-y-4 flex flex-col p-8 rounded-2xl w-full"
    >
      {/* Honeypot — invisible to real users */}
      <input
        type="text"
        name="honeypot"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Full Name */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-1">
          <label htmlFor="name">Full Name</label>
          <span className="text-red-400">*</span>
        </div>
        <input id="name" name="name" type="text" maxLength={MAX_NAME_LENGTH} autoComplete="name" placeholder="e.g. Juan Dela Cruz" className="contact_form_input" required />
      </div>

      {/* Email & Phone */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center space-x-1">
            <label htmlFor="email">Email</label>
            <span className="text-red-400">*</span>
          </div>
          <input id="email" name="email" type="email" maxLength={MAX_EMAIL_LENGTH} autoComplete="email" placeholder="e.g. juan.delacruz@gmail.com" className="contact_form_input" required />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center space-x-1">
            <label htmlFor="phone">Mobile Number</label>
            <span className="text-red-400">*</span>
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{11}"
            placeholder="e.g. 09171234567"
            className="contact_form_input"
            onChange={(event) => {
              event.target.value = event.target.value.replace(/\D/g, "").slice(0, MAX_PHONE_LENGTH);
            }}
            required
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-1">
          <label htmlFor="subject">Subject</label>
          <span className="text-red-400">*</span>
        </div>
        <input id="subject" name="subject" type="text" maxLength={MAX_SUBJECT_LENGTH} placeholder="e.g. CCNA training schedule" className="contact_form_input" required />
      </div>

      {/* Message */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-1">
          <label htmlFor="message">Message</label>
          <span className="text-red-400">*</span>
        </div>
        <textarea
          id="message"
          name="message"
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="e.g. Hi! I would like to ask about the next CCNA batch and the training fee."
          className="contact_form_input h-32 resize-none"
          required
        />
      </div>

      {HCAPTCHA_SITE_KEY ? (
        <div className="flex flex-col items-center gap-2">
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITE_KEY}
            onVerify={setCaptchaToken}
            onExpire={() => setCaptchaToken("")}
            onError={() => {
              setCaptchaToken("");
              setStatus("CAPTCHA could not load. Check your connection and try again.");
            }}
          />
        </div>
      ) : (
        <p className="self-center text-sm text-red-500">
          CAPTCHA is not configured. Please contact us directly.
        </p>
      )}

      {/* Status message */}
      {status && (
        <p
          className={`text-center font-medium ${status === "success" ? "text-green-600" : "text-red-400"}`}
        >
          {status === "success" ? (
            <>
              Message sent successfully! If you have additional questions, email{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </>
          ) : status}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer bg-[#1775EE] text-white hover:bg-[#007EE6] py-3 px-[42.5%] md:py-2 md:px-[46%] rounded-md shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}