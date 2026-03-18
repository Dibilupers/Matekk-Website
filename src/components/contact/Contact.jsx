import emailjs from "emailjs-com";
import { useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const timerRef = useRef(null);
  const cooldownRef = useRef(null);
  const recaptchaRef = useRef(null);
  const COOLDOWN_MS = 60000;

  /* Validates User Fields */
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9+\-\s()]{7,15}$/.test(phone);
  const isEmpty = (str) => str.trim().length === 0;
  const isTooLong = (str, max) => str.length > max;

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(cooldownRef.current);
    };
  }, []);

  /* Show reCAPTCHA only when all fields are filled */
  const checkFormFilled = (e) => {
    const form = e.currentTarget;
    const allFilled =
      form.name.value.trim() &&
      form.email.value.trim() &&
      form.phone.value.trim() &&
      form.subject.value.trim() &&
      form.message.value.trim();
    setShowCaptcha(!!allFilled);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setStatus("");

    /* Honeypot check */
    if (e.target.honeypot.value) return;

    /* Rate limit check */
    const lastSent = localStorage.getItem("lastFormSubmit");
    const now = Date.now();

    if (lastSent && now - lastSent < COOLDOWN_MS) {
      clearInterval(cooldownRef.current);

      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastSent)) / 1000);
      setStatus(`Please wait ${secondsLeft}s before sending again.`);

      cooldownRef.current = setInterval(() => {
        const secondsLeft = Math.ceil(
          (COOLDOWN_MS -
            (Date.now() - localStorage.getItem("lastFormSubmit"))) /
            1000,
        );
        if (secondsLeft <= 0) {
          clearInterval(cooldownRef.current);
          setStatus("");
        } else {
          setStatus(`Please wait ${secondsLeft}s before sending again.`);
        }
      }, 1000);
      return;
    }

    /* reCAPTCHA check */
    if (!recaptchaToken) {
      setStatus("Please complete the CAPTCHA.");
      return;
    }

    /* Extract & Sanitize */
    const name = DOMPurify.sanitize(e.target.name.value);
    const email = DOMPurify.sanitize(e.target.email.value);
    const phone = DOMPurify.sanitize(e.target.phone.value);
    const subject = DOMPurify.sanitize(e.target.subject.value);
    const message = DOMPurify.sanitize(e.target.message.value);

    /* Validation */
    if (isEmpty(name) || isEmpty(subject) || isEmpty(message)) {
      setStatus("Please fill in all fields.");
      return;
    }
    if (isTooLong(message, 1000)) {
      setStatus("Message is too long (max 1000 characters).");
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

    /* All checks passed — store timestamp and send */
    localStorage.setItem("lastFormSubmit", now);
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then((result) => {
        console.log("Success:", result.text);
        setStatus("Message sent successfully!");
        timerRef.current = setTimeout(() => setStatus(""), 3000);
        setLoading(false);

        // Hide & reset reCAPTCHA BEFORE resetting the form
        setShowCaptcha(false); // ← moved up
        setRecaptchaToken(null);
        if (recaptchaRef.current) recaptchaRef.current.reset();

        e.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error.text);
        setStatus("Failed to send message. Please try again.");
        timerRef.current = setTimeout(() => setStatus(""), 5000);
        setLoading(false);
        // Reset tick but keep captcha visible so they can reverify and resubmit
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      });
  };

  return (
    <form
      onSubmit={sendMessage}
      onChange={checkFormFilled}
      className="bg-white space-y-6 md:space-y-4 flex flex-col p-8 rounded-2xl w-full"
    >
      {/* Honeypot — hidden from real users */}
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
        <input
          id="name"
          name="name"
          type="text"
          className="contact_form_input"
          required
        />
      </div>

      {/* Email & Phone */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center space-x-1">
            <label htmlFor="email">Email</label>
            <span className="text-red-400">*</span>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            className="contact_form_input"
            required
          />
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
            className="contact_form_input"
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
        <input
          id="subject"
          name="subject"
          type="text"
          className="contact_form_input"
          required
        />
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
          className="contact_form_input h-32 resize-none"
          required
        />
      </div>

      {/* reCAPTCHA — only shows when all fields are filled */}
      {showCaptcha && (
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={setRecaptchaToken}
          className="self-center"
        />
      )}

      {/* Status Message */}
      {status && (
        <p
          className={`text-center font-medium ${status.includes("Success") ? "text-green-500" : "text-red-400"}`}
        >
          {status}
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
