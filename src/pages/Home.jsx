import { Settings, Tag, MessageSquare, Contact } from "lucide-react";
import Partners from "../components/partners/partners";
import { Link } from "react-router-dom";
/* Solutions Gallery Imgs */
import gallery1 from "../assets/featured-certificates.webp";
import gallery2 from "../assets/featured-slsu.webp";
import gallery3 from "../assets/solutionsGallery3.webp";
import gallery4 from "../assets/featured-ideas-workshop.webp";
import gallery5 from "../assets/featured-mpc.webp";
import gallery6 from "../assets/featured-extra/hands-on-fiber-connectors.webp";

import MaamGrace from "../assets/person_holding_laptop.webp";
import SirMark from "../assets/Founder.webp";
import CompanyBuilding from "../assets/building.webp";
import { useState, useEffect, useRef } from "react";
import FAQ from "../components/FAQ/faq";
import ContactForm from "../components/contact/Contact.jsx";
import address from "../assets/location.svg";
import phone from "../assets/phone.svg";
import email from "../assets/email.svg";
import availability from "../assets/availability.svg";
import Button from "../../src/components/ui/button";
import Handshake from "../../src/assets/why-choose-melendres.webp";
import { useLocation } from "react-router-dom";
import TestimonialsSection from "../components/section/TestimonialsSection.jsx";
import PasserSpotlight from "../components/section/PasserSpotlight.jsx";
/* Services Section Images */
/* Solutions */
import DataCenterImage from "../assets/datacenterImage.webp";
import WebDevImage from "../assets/webdevImage.webp";
import CloudImage from "../assets/cloudImage.webp";
import AcessNetworkImage from "../assets/accessnetworks.webp";
/* Trainings */
import CCNAImage from "../assets/CCNAFooterImageAutomation.webp";
import ComptiaImage from "../assets/COMPTIAFooter.webp";
import NSE4Image from "../assets/FortinetFooter.webp";
import CDCPImage from "../assets/certified_data_centre_professional2.webp";
import PaloAltoImage from "../assets/PaloAltoFooter.webp";
import CybersecurityTrainingImage from "../assets/featured-extra/doh-bicol-cybersecurity-training.webp";
import CloudTrainingImage from "../assets/azure_fundamentals.webp";
import ITILImage from "../assets/services/it-management.webp";
import PMPImage from "../assets/services/project-management.webp";
import CyberSolutionImage from "../assets/solutions/redteam-hero.webp";
import SmartImage from "../assets/featured-extra/network-design-blueprints.webp";
import RenewableImage from "../assets/solutions/renewable-hero.webp";
import SafetySystemsImage from "../assets/solutions/ipcctv-hero.webp";
import TypewriterText from "../components/ui/TypewriterText";
import HeroNetwork from "../assets/hero-network.svg";

// Homepage headline, typed part by part (the second part is the blue highlight)
const HERO_HEADLINE = [
  { text: "Empowering Businesses and Individuals " },
  { text: "Through ICT Excellence", className: "text-[#1775EE]" },
];

/* ── Contact Us email link: opens a pre-filled Gmail message ──
   Edit the subject or template text below; the link is built from them. */
const CONTACT_EMAIL = "info@matekkcybercore.com";
const CONTACT_EMAIL_SUBJECT = "Inquiry from the MATEKK Website";
const CONTACT_EMAIL_BODY = `Hi MATEKK Team,

I'd like to inquire about:
[ ] Training (course name: ________ )
[ ] ICT / Engineering Solution (service: ________ )

Name:
Company / School (optional):
Mobile Number:
Preferred Schedule (for training):

Message:


Thank you!`;
const CONTACT_GMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(CONTACT_EMAIL)}` +
  `&su=${encodeURIComponent(CONTACT_EMAIL_SUBJECT)}` +
  `&body=${encodeURIComponent(CONTACT_EMAIL_BODY)}`;

/* ── Homepage service cards: one card per category ──
   Solutions categories follow the Solutions menu; Training categories follow the Training menu.
   "link" opens the category's main (first) page. */
const SOLUTION_CARDS = [
  {
    title: "Data Center Facilities",
    image: DataCenterImage,
    desc: "Planning, design, implementation, and optimization of secure, efficient, and resilient data center infrastructure.",
    link: "/solutions/ict/datacenter",
  },
  {
    title: "Network and Security Infrastructure",
    image: AcessNetworkImage,
    desc: "End-to-end network architecture, enterprise security, WLAN, optical fiber, IP telephony, on-premise servers, and structured cabling.",
    link: "/solutions/ict/insi/e2e",
  },
  {
    title: "Cybersecurity",
    image: CyberSolutionImage,
    desc: "Red Team (VAPT) and Blue Team (SOC) services that test your defenses and keep your systems monitored and protected.",
    link: "/solutions/ict/cybersec/redteam",
  },
  {
    title: "Web and Software Development",
    image: WebDevImage,
    desc: "Custom web and software solutions built with modern technologies to deliver reliable and functional digital systems.",
    link: "/solutions/ict/webdev",
  },
  {
    title: "Cloud Computing Services",
    image: CloudImage,
    desc: "Scalable, flexible, and cost-effective cloud solutions, from setup and migration to ongoing management.",
    link: "/solutions/ict/cloud",
  },
  {
    title: "SMART Environment Automation",
    image: SmartImage,
    desc: "IoT-based automation for SMART homes, buildings, and cities that improves efficiency, comfort, and security.",
    link: "/solutions/ict/smart/home",
  },
  {
    title: "Renewable Energy Solutions",
    image: RenewableImage,
    desc: "Solar-powered energy systems that reduce operating costs and support greener, more reliable operations.",
    link: "/solutions/pece/renewable",
  },
  {
    title: "Safety and Security Systems",
    image: SafetySystemsImage,
    desc: "IP and analog CCTV, fire detection and alarm systems, public address systems, and door access control.",
    link: "/solutions/pece/ipcctv",
  },
];

const TRAINING_CARDS = [
  {
    title: "Cisco",
    image: CCNAImage,
    desc: "CCNA, CCNA Automation, CCNA Cybersecurity, and CCNP tracks in Enterprise, Security, Data Center, and Collaboration.",
    link: "/training/cisco/ccna/ccna",
  },
  {
    title: "CompTIA",
    image: ComptiaImage,
    desc: "Globally recognized certifications from A+ and Network+ to Security+, CySA+, PenTest+, and Linux+.",
    link: "/training/comptia/aplus",
  },
  {
    title: "Fortinet",
    image: NSE4Image,
    desc: "FortiOS, Secure Networking, SASE, Cloud Security, Security Operations, and Cybersecurity Expert training.",
    link: "/training/fortinet/fortios",
  },
  {
    title: "Palo Alto Networks",
    image: PaloAltoImage,
    desc: "Network Security, Security Operations, and Cloud Security certifications, from Cybersecurity Apprentice to Architect.",
    link: "/training/paloalto/networksecurity/apprentice",
  },
  {
    title: "Data Center",
    image: CDCPImage,
    desc: "DCFC, CDCP, and CDCS certifications covering the critical components of data centre infrastructure.",
    link: "/training/datacenter/dcfc",
  },
  {
    title: "Cybersecurity",
    image: CybersecurityTrainingImage,
    desc: "Hands-on Cyber Defense & Threat Hunting (SOC) and Practical Ethical Hacking (VAPT) programs.",
    link: "/training/cybersecurity/cdth",
  },
  {
    title: "Cloud Computing",
    image: CloudTrainingImage,
    desc: "Microsoft Azure Fundamentals, AWS Cloud Practitioner, and AWS Technical Essentials.",
    link: "/training/cloud/microsoft/azurefundamentals",
  },
  {
    title: "IT Management",
    image: ITILImage,
    desc: "ITIL Foundation Bridge (Version 5) for professionals updating their IT service management credentials.",
    link: "/training/itil5/foundation",
  },
  {
    title: "Project Management",
    image: PMPImage,
    desc: "Project Management Professional (PMP) training for professionals who lead and manage projects.",
    link: "/training/projectmanagement/pmp",
  },
];

/* Measures a card carousel: how far one step moves (card width + gap) and how many cards fit at once */
function useCarouselMetrics(trackRef) {
  const [metrics, setMetrics] = useState({ step: 0, visible: 1 });
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const card = track?.firstElementChild;
      const viewport = track?.parentElement;
      if (!card || !viewport) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      const visible = Math.max(1, Math.floor((viewport.getBoundingClientRect().width + gap + 1) / step));
      setMetrics((m) => (m.step === step && m.visible === visible ? m : { step, visible }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current.parentElement);
    return () => observer.disconnect();
  }, [trackRef]);
  return metrics;
}

function ServiceCard({ card }) {
  return (
    <div className="group services_card">
      <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-linear-to-b from-[#5192E6] to-[#1775EE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex flex-col gap-y-[1vh] p-6 transition-colors duration-300 group-hover:text-white h-full">
        <div className="w-full h-36 mb-4 overflow-hidden rounded-lg">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h5>{card.title}</h5>
        <p>{card.desc}</p>
        <Link
          to={card.link}
          className="mt-auto font-inter text-sm underline underline-offset-4 text-[#1775EE] transition-colors duration-300 group-hover:text-white"
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [topSlide, setTopSlide] = useState(0);
  const [bottomSlide, setBottomSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const location = useLocation();
  const [submissionMessage, setSubmissionMessage] = useState("");
  /* Scroll function for when user comes form another page scrolls to home */
  useEffect(() => {
    if (location.state?.submissionMessage) {
      setSubmissionMessage(location.state.submissionMessage);
      window.history.replaceState({}, document.title);
      const timer = window.setTimeout(() => setSubmissionMessage(""), 3_000);
      return () => window.clearTimeout(timer);
    }

    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // Only scroll to top on fresh page load (no scrollTo state)
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);
  /* Solutions Gallery Images */
  const [isTouch, setIsTouch] = useState(
    () => window.matchMedia("(hover: none) and (pointer: coarse)").matches,
  );

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const handleTouchChange = (e) => setIsTouch(e.matches);
    touchQuery.addEventListener("change", handleTouchChange);
    return () => touchQuery.removeEventListener("change", handleTouchChange);
  }, []);
  // Carousel sizes are measured from the real cards, so any number of cards fits
  const topTrackRef = useRef(null);
  const bottomTrackRef = useRef(null);
  const topMetrics = useCarouselMetrics(topTrackRef);
  const bottomMetrics = useCarouselMetrics(bottomTrackRef);
  const topMax = Math.max(1, SOLUTION_CARDS.length - topMetrics.visible + 1);
  const bottomMax = Math.max(1, TRAINING_CARDS.length - bottomMetrics.visible + 1);
  const topIndex = Math.min(topSlide, topMax - 1);
  const bottomIndex = Math.min(bottomSlide, bottomMax - 1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tappedCard, setTappedCard] = useState(null);

  const galleryItems = [
    {
      id: 1,
      src: gallery1,
      alt: "Matekk learners holding their certificates of completion",
      title: "Certified Graduates",
      desc: "Proud learners holding their certificates after completing hands-on, industry-aligned training at Matekk Cybercore Academy.",
      // Goes to the training courses section on the homepage
      link: "/",
      linkState: { scrollTo: "training-programs" },
    },
    {
      id: 2,
      src: gallery2,
      alt: "SLSU Delegates",
      title: "SLSU Delegates Welcome",
      desc: "Welcoming fresh perspectives and bright minds, this moment captures the energy of collaboration just getting started.",
    },
    {
      id: 3,
      src: gallery3,
      alt: "Team Celebration",
      title: "Team Celebration",
      desc: "A well-earned pause to celebrate milestones, shared wins, and the teamwork that made it all possible.",
    },
    {
      id: 4,
      src: gallery4,
      alt: "Ideas Workshop",
      title: "Ideas Workshop",
      desc: "Where rough ideas turn into practical solutions through open discussion, creativity, and a bit of trial and error.",
    },
    {
      id: 5,
      src: gallery5,
      alt: "Marikina Polytechnic College Student General Assembly 2026",
      title: "Partner Schools: Marikina Polytechnic College",
      desc: "Recognized at MPC's Student General Assembly 2026, one of the schools we work with to bring industry-ready ICT skills to students.",
      // Goes to the Customers & Partners logos on the homepage
      link: "/",
      linkState: { scrollTo: "partners" },
    },
    {
      id: 6,
      src: gallery6,
      alt: "Participants terminating fiber optic connectors during a hands-on workshop",
      title: "Hands-On Fiber Optic Workshop",
      desc: "Participants learning to terminate and test fiber optic connectors, the same skills behind our optical fiber network solutions.",
      link: "/solutions/ict/insi/opticalfiber",
    },
  ];

  const ITEMS_PER_ROW = 3; // change to 2 or 4 if needed

  // Chunk array into rows
  const rows = galleryItems.reduce((acc, item, i) => {
    const rowIndex = Math.floor(i / ITEMS_PER_ROW);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <main>
      {submissionMessage && (
        <div
          role="status"
          className="fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {submissionMessage}
        </div>
      )}
      {/* ==================== HERO BANNER ====================*/}
      <section
        id="home"
        className="relative isolate flex justify-center items-center py-25 md:py-20 lg:py-0 scroll-mt-18 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full"
      >
        {/* Pale blue fade + faint network diagram behind the hero. Phones: one diagram stretched to the screen width.
            Desktop: the same diagram repeated at its normal size, so the dots stay small and subtle */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-[#eef5fe] to-white to-75%">
          <img src={HeroNetwork} alt="" className="w-full lg:hidden" />
          <div
            className="absolute inset-0 hidden lg:block [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
            style={{ backgroundImage: `url("${HeroNetwork}")`, backgroundSize: "520px auto", backgroundRepeat: "repeat" }}
          />
        </div>
        {/* ====== HERO BANNER - Content ======*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ====== LEFT SIDE - Content (Title, description, buttons, images) ====== */}
          <div className="space-y-10 lg:space-y-12 text-left">
            {/* Title to Buttons Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h6 className="w-fit px-3 py-1 bg-blue-50 rounded-full shadow-[0px_0px_6px_-3px_rgba(0,0,0,0.5)]">
                  ICT & Engineering
                </h6>

                {/* Types itself out, holds, backspaces quickly, then types again */}
                <h1 data-no-type className="pr-9 sm:pr-8 lg:pr-7 font-bold leading-tight">
                  <TypewriterText
                    segments={HERO_HEADLINE}
                    speed={45}
                    startDelay={400}
                    loop
                    holdMs={4000}
                    eraseDuration={500}
                  />
                </h1>

                <p className="max-w-lg text-left">
                  Cutting-edge ICT and Engineering Solutions. Industry-relevant
                  Training. Built on over a decade of expertise.
                </p>
              </div>
              <div className="flex sm:flex-row gap-3 sm:gap-4 justify-left lg:justify-start">
                <Button
                  title="Explore Our Solutions"
                  type="none"
                  buttonCustomStyle="bg-[#1775EE] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] px-6 py-3"
                  btnFunc={() => {
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                />
                <Button
                  title="View Training Programs"
                  type="none"
                  buttonCustomStyle="bg-white text-blue-600 border border-blue-600 hover:bg-[#0062E0] hover:border-[#0062E0] hover:text-white transition-all duration-300"
                  btnFunc={() => {
                    const trainingSection = document.getElementById("training-programs");
                    if (!trainingSection) return;

                    const currentTop = trainingSection.getBoundingClientRect().top;
                    const scrollMargin = Number.parseFloat(
                      window.getComputedStyle(trainingSection).scrollMarginTop,
                    );
                    const nextSection = trainingSection.closest("section")?.nextElementSibling;
                    const nextSectionTop = nextSection?.getBoundingClientRect().top;
                    const sectionGap = nextSectionTop === undefined
                      ? Number.POSITIVE_INFINITY
                      : nextSectionTop - currentTop;
                    // Phones: the section is about a screen tall, so just put its heading under the
                    // top bar (fitting the whole section left the previous carousel's dots showing)
                    const isPhone = window.matchMedia("(max-width: 767px)").matches;
                    const targetTop = isPhone
                      ? scrollMargin
                      : Math.max(scrollMargin, window.innerHeight + 24 - sectionGap);

                    window.scrollTo({
                      top: Math.max(0, window.scrollY + currentTop - targetTop),
                      behavior: "smooth",
                    });
                  }}
                />
              </div>
            </div>

            {/* Experiences Content */}
            <div className="flex space-x-4 justify-center items-center md:justify-start md:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="font-bold">13</h3>
                <div className="text-gray-600 leading-tight flex flex-col justify-center lg:justify-start items-center md:items-start">
                  <p className="font-medium whitespace-nowrap">Years of</p>
                  <p className="font-medium whitespace-nowrap">Experience</p>
                </div>
              </div>
              <div className="h-18 md:h-10 lg:h-12 w-px bg-black shrink-0"></div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="font-bold">3</h3>
                <div className="text-gray-600 leading-tight flex flex-col justify-center lg:justify-start items-center md:items-start">
                  <p className="font-medium whitespace-nowrap">Data Centers</p>
                  <p className="font-medium whitespace-nowrap">Deployed</p>
                </div>
              </div>
              <div className="h-18 md:h-10 lg:h-12 w-px bg-black shrink-0"></div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="font-bold">40+</h3>
                <div className="text-gray-600 leading-tight flex flex-col justify-center lg:justify-start items-center md:items-start">
                  <p className="font-medium whitespace-nowrap">Total Active</p>
                  <p className="font-medium whitespace-nowrap">Courses</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== RIGHT SIDE - Images (Passing rate, Icons, Images, One feedback) ====== */}
          <div className="hidden lg:flex relative lg:h-135 items-center justify-center">
            {/* Image Background Color */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-70 h-70 bg-linear-to-br from-[#3084F0] to-[#DAEBFC] rounded-full blur-3xl"></div>
            </div>

            {/* Passing Rate */}
            <div className="relative w-full max-w-md">
              <div className="hidden xl:flex absolute top-31 left-4 lg:-left-35 bg-[#EBF5FD] rounded-xl shadow-xl/10 px-4 py-3 z-20 hover:scale-105 transition duration-300 ease-in-out justify-center items-center gap-3">
                <h3 className="font-bold text-[#1775EE]">95%</h3>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p>Passing Rate</p>
                </div>
              </div>
              {/* Person Image */}
              <div className="relative right-6">
                <img
                  src={MaamGrace}
                  alt="Professional holding laptop with ICT solutions"
                  className="w-[90%]"
                />
              </div>
              {/* Side Icons */}
              <div className="home_side_icons_container top-9 right-1 lg:right-30">
                <Settings className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="home_side_icons_container top-24 -right-2 lg:right-13">
                <Tag className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="home_side_icons_container top-45 right-0 lg:right-4">
                <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              {/* Recent passers spotlight: cycles through the newest passers from testimonials.js */}
              <PasserSpotlight className="hidden xl:flex absolute bottom-15 -right-4 lg:-right-10 bg-[#EBF5FD] rounded-xl shadow-2xl px-3 py-3 w-61 z-20 transition-transform flex-col justify-center items-center gap-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS LOGO ====================*/}
      <section
        className="flex flex-col space-y-4 md:space-y-7 bg-[#EBF5FD] justify-center items-center text-center py-10 md:py-15 scroll-mt-18 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full"
        id="partners"
      >
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center space-y-1">
          {/* Title */}
          <div className="flex flex-col sm:flex-row space-x-2">
            <h3>
              Trusted by Our{" "}
              <span className="text-[#1775EE]">Customers & Partners</span>
            </h3>
          </div>
          {/* Description */}
          <p className="w-78 sm:w-lg md:w-lg lg:w-xl xl:w-full">
            We collaborate with recognized technology partners to ensure
            quality, reliability, and up-to-date ICT solutions.
          </p>
        </div>
        {/* Logos */}
        <Partners />
      </section>

      {/* ==================== SERVICES ====================*/}
      <section
        id="services"
        className="flex flex-col justify-center scroll-mt-18 items-center space-y-6 md:space-y-7 py-10 md:py-15 h-full px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full"
      >
        {/* Title and Description Container */}
        <div className="flex flex-col justify-center items-center text-center space-y-1">
          {/* Title */}
          <div className="flex flex-col sm:flex-row px-8 sm:px-0">
            <h3>
              Services We Provide to{" "}
              <span className="text-[#1775EE]">Elevate Your Business</span>
            </h3>
          </div>
          {/* Description */}
          <p className="max-w-4xl mx-auto">
            Matekk Cybercore Academy delivers end-to-end ICT and engineering
            solutions alongside comprehensive training programs designed to meet
            industry demands and support digital transformation.
          </p>
        </div>
        <div className="flex flex-col space-y-14">
          {/* ====== SOLUTIONS - End-to-End ICT & Engineering Solutions ======*/}
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              {/* ====== CONTENT ====== */}
              <div className="flex flex-col relative md:w-[35vw] lg:w-[20vw] xl:w-[24vw] self-start gap-y-6 items-start">
                {/* Color Gradient - at the back of the title and description  */}
                <div className="absolute -top-10 md:-left-10 w-70 h-70 md:w-72 md:h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
                {/* Services Category Text Content Container */}
                <div className="space-y-2">
                  {/* Services Category Title */}
                  <h6 className="bg-[#EBF5FD] border border-[#EBF5FD] rounded-full shadow-[0_0_3px_rgba(0,0,0,0.25)] w-fit px-3 py-1">
                    Solutions
                  </h6>
                  {/* Solutions Title */}
                  <h5 className="w-[50vw] md:w-60">
                    End-to-End ICT & Engineering Solutions
                  </h5>
                  {/* Solutions Category Description */}
                  <p>
                    We provide ICT consultancy and engineering solutions focused
                    on planning, building, operating, optimizing, and testing
                    technology systems.
                  </p>
                </div>
                {/* Left and Right Button for List of Solutions */}
                <div className="flex flex-row gap-x-[2vh]">
                  <button
                    onClick={() => setTopSlide(Math.max(topIndex - 1, 0))}
                    disabled={topIndex === 0}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setTopSlide(Math.min(topIndex + 1, topMax - 1))
                    }
                    disabled={topIndex === topMax - 1}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* List of Solutions - In Slides */}
              <div className="overflow-hidden w-[85vw] md:w-[43.9vw] lg:w-[60vw] xl:w-[53vw] 2xl:w-[52vw]">
                <div
                  ref={topTrackRef}
                  className="flex gap-x-5 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${topIndex * topMetrics.step}px)`,
                  }}
                >
                  {SOLUTION_CARDS.map((card) => (
                    <ServiceCard key={card.title} card={card} />
                  ))}
                </div>
              </div>
            </div>

            {/* TOP DOT INDICATORS */}
            <div className="flex justify-center gap-x-2 mt-6">
              {Array.from({ length: topMax }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTopSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    topIndex === i ? "bg-[#1775EE] w-4" : "bg-[#C2DDFF] w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ====== TRAINING - ICT Training & Skills Development ======*/}
          <div id="training-programs" className="scroll-mt-24 md:scroll-mt-40">
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              {/* Controls — on mobile: top + right-aligned | on desktop: right column */}
              {/* Training title */}
              <div className="flex flex-col relative md:w-[35vw] lg:w-[20vw] xl:w-[24vw] self-start gap-y-6 items-start">
                <div className="absolute -top-10 md:-left-10 w-70 h-70 md:w-72 md:h-72 bg-[#C2DDFF] opacity-50 rounded-full blur-3xl -z-10" />
                <div className="space-y-2">
                  <h6 className="bg-[#EBF5FD] border border-[#EBF5FD] rounded-full shadow-[0_0_3px_rgba(0,0,0,0.25)] w-fit px-3 py-1">
                    Training
                  </h6>
                  <h5 className="w-[50vw] md:w-60">
                    ICT Training & Skills Development
                  </h5>
                  <p>
                    We offer face-to-face and online training programs designed
                    to equip individuals and organizations with cutting-edge
                    technological knowledge and practical skills.
                  </p>
                </div>
                <div className="flex flex-row gap-x-[2vh]">
                  <button
                    onClick={() =>
                      setBottomSlide(Math.min(bottomIndex + 1, bottomMax - 1))
                    }
                    disabled={bottomIndex === bottomMax - 1}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setBottomSlide(Math.max(bottomIndex - 1, 0))
                    }
                    disabled={bottomIndex === 0}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1775EE] bg-white text-[#1775EE] transition-all duration-300 hover:bg-[#1775EE] hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* List of Trainings - In Slides */}
              <div className="overflow-hidden w-[85vw] md:w-[43.9vw] lg:w-[60vw] xl:w-[53vw] 2xl:w-[52vw] order-last md:order-first">
                <div
                  ref={bottomTrackRef}
                  className="flex flex-row-reverse gap-x-5 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${bottomIndex * bottomMetrics.step}px)`,
                  }}
                >
                  {/* First card in the list sits next to the section text */}
                  {TRAINING_CARDS.map((card) => (
                    <ServiceCard key={card.title} card={card} />
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM DOT INDICATORS */}
            <div className="flex justify-center flex-row-reverse gap-x-2 mt-6">
              {Array.from({ length: bottomMax }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBottomSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    bottomIndex === i ? "bg-[#1775EE] w-4" : "bg-[#C2DDFF] w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE Matekk Cybercore Academy ====================*/}
      <section className="flex flex-col lg:flex-row space-x-0 lg:space-x-8 space-y-8 md:space-y-12 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full py-10 md:py-15 bg-[#EBF5FD] scroll-mt-18">
        {/* Section Margin */}
        {/* Text and Image Container */}
        <div className="flex flex-col md:flex-row lg:flex-col justify-center items-center space-x-0 md:space-x-18 lg:space-x-0 space-y-8 md:space-y-15">
          {/* Text Content */}
          <div className="justify-center md:justify-left w-full md:w-md lg:w-fit space-y-1">
            {/* Title */}
            <h3>
              Why Choose Matekk
              <span className="text-[#1775EE]"> ICT Services?</span>
            </h3>
            {/* Description */}
            <p>
              Matekk Cybercore Technologies is committed to delivering reliable ICT
              solutions and high-quality training through experienced
              professionals, proven methodologies, and a strong focus on
              innovation, integrity, and excellence.
            </p>
          </div>
          {/* LEFT SIDE - IMAGE */}
          <div className="relative max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-t-4 border-r-4 sm:border-t-6 sm:border-r-6 border-blue-500 rounded-tr-3xl z-0"></div>
            <img
              src={Handshake}
              alt="Engr. Melendres speaking to future network engineers at Engineering Day - Matekk Cybercore Academy"
              className="z-10 w-[75vw] md:w-[50vw] lg:w-full h-auto rounded-2xl sm:rounded-3xl object-cover aspect-4/5"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 border-b-4 border-l-4 sm:border-b-6 sm:border-l-6 border-blue-500 rounded-bl-3xl z-0"></div>
          </div>
        </div>

        {/* RIGHT SIDE - Reasons Why Choose Solverous */}
        {/* ====== Experience ====== */}
        <div className="space-y-4">
          <div className="why_choose_card">
            <h5>Experience</h5>
            <p>
              Over a decade of providing ICT and engineering solutions and
              professional training since our establishment in 2013.
            </p>
          </div>

          {/* ====== Expertise ====== */}
          <div className="why_choose_card">
            <h5>Expertise</h5>
            <p>
              Led by a Professional Electronics Engineer and supported by
              certified engineers, technicians, and instructors with strong
              industry and academic backgrounds.
            </p>
          </div>

          {/* ====== Quality Training ====== */}
          <div className="why_choose_card">
            <h5>Quality Training</h5>
            <p>
              We offer face-to-face and online training programs aligned with
              industry standards and globally recognized certifications.
            </p>
          </div>

          {/* ====== End-to-End Approach ====== */}
          <div className="why_choose_card">
            <h5>End-to-End Approach</h5>
            <p>
              We follow the Plan, Build, Operate, Optimize, and Test (PBOOT)
              methodology to ensure structured and effective delivery of ICT
              solutions.
            </p>
          </div>

          {/* ====== Innovation & Integrity ====== */}
          <div className="why_choose_card">
            <h5>Innovation & Integrity</h5>
            <p>
              Our work is guided by core values that emphasize innovation,
              ethical practices, excellence, collaboration, and continuous
              improvement.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== OUR WORKING PROCESS ====================*/}
      <section className="py-10 md:py-15 bg-white scroll-mt-18 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full space-y-8 lg:space-y-2 overflow-hidden">
        {/* Text Content */}
        <div className="flex flex-col text-right ml-0 md:ml-38 lg:ml-auto items-end">
          {/* Title */}
          <h3>
            Our <span className="text-[#1775EE]">Working Process</span>
          </h3>
          {/* Description */}
          <p className="w-80 md:w-fit">
            We follow a structured service delivery process to ensure reliable
            implementation, performance, and long-term value.
          </p>
        </div>
        {/* ====== Working Process ====== */}
        <div className="relative overflow-hidden ">
          {/* Desktop Version */}
          <div className="hidden lg:block relative">
            <div className="relative">
              <svg
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                viewBox="0 0 1200 500"
                preserveAspectRatio="none"
              >
                <path
                  className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]"
                  d="M 0 30 C 250 80, 190 50, 320 120"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]"
                  d="M 365 115 C 220 130, 500 190, 600 190"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]"
                  d="M 590 215 C 600 160, 800 200, 860 240"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.4)]"
                  d="M 847 250 C 800 150, 845 350, 1500 275"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div className="relative z-10 flex items-start justify-between gap-4 pb-8">
                {/* Step 1 */}
                <div className="desktop_process_steps">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20h3v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Initiation & Consultancy</h5>
                    <p>Understand requirements and define project direction.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="desktop_process_steps pt-16">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Planning & Design</h5>
                    <p>Create structured plans and system designs.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="desktop_process_steps pt-28">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Implementation</h5>
                    <p>Deploy and configure approved solutions.</p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="desktop_process_steps pt-36">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2zm0 0V9a2 2 0 012-2h3a2 2 0 012 2v10m-6 0a2 2 0 002 2h3a2 2 0 002-2m0 0V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Monitor and Control</h5>
                    <p>Track performance and ensure proper operation.</p>
                  </div>
                </div>
                {/* Step 5 */}
                <div className="desktop_process_steps pt-48">
                  <div className="desktop_process_icons">
                    <svg
                      className="desktop_process_svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 text-center">
                    <h5>Optimization</h5>
                    <p>Improve systems through testing and refinement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Version */}
          <div className="hidden md:block lg:hidden relative">
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 700 1100"
              preserveAspectRatio="none"
            >
              {/* Line 1→2 */}
              <path
                d="M 200 50 C 300 70, 500 30, 490 240"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 2→3 */}
              <path
                d="M 510 250 C 510 250, 180 250, 210 440"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 3→4 */}
              <path
                d="M 220 490 C 350 560, 490 490, 480 740"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 4→5 */}
              <path
                d="M 510 720 C 510 720, 180 720, 220 910"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Step 1: Initiation & Consultancy */}
            <div className="relative z-10 flex flex-col items-center pr-72 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center w-[65%]">
                <h5>Initiation & Consultancy</h5>
                <p>Understand requirements and define project direction.</p>
              </div>
            </div>

            {/* Step 2: Planning & Design */}
            <div className="relative z-10 flex flex-col items-center pl-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center w-[50%]">
                <h5>Planning & Design</h5>
                <p>Create structured plans and system designs.</p>
              </div>
            </div>

            {/* Step 3: Implementation */}
            <div className="relative z-10 flex flex-col items-center pr-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center w-[50%]">
                <h5>Implementation</h5>
                <p>Deploy and configure approved solutions.</p>
              </div>
            </div>

            {/* Step 4: Monitor and Control */}
            <div className="relative z-10 flex flex-col items-center mb-1 pl-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center w-[50%]">
                <h5>Monitor and Control</h5>
                <p>Track performance and ensure proper operation.</p>
              </div>
            </div>

            {/* Step 5: Optimization */}
            <div className="relative z-10 flex flex-col items-center pr-72 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center w-[50%]">
                <h5>Optimization</h5>
                <p>Improve systems through testing and refinement.</p>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="block md:hidden relative">
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 400 1100"
              preserveAspectRatio="none"
            >
              {/* Line 1→2: Left to Right */}
              <path
                d="M 110 45 C 210 80, 330 30, 300 270"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 330 300 C 310 250, 90 250, 110 490"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 3→4: Left to Right */}
              <path
                d="M 100 490 C 190 560, 305 490, 305 700"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Line 4→5: Right to Left */}
              <path
                d="M 310 720 C 310 720, 90 720, 110 910"
                stroke="#3B82F6"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {/* Mobile Version Icons */}
            {/* Step 1: Initiation & Consultancy */}
            <div className="relative z-10 flex flex-col items-center mb-1 pr-41 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="mt-3 max-w-[16rem] text-center">
                <h5 className="text-base font-bold mb-1">
                  Initiation & Consultancy
                </h5>
                <p className="text-sm text-gray-600">
                  Understand requirements and define project direction.
                </p>
              </div>
            </div>

            {/* Step 2: Planning & Design */}
            <div className="relative z-10 flex flex-col items-center mb-1 pl-50 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center">
                <h5>Planning & Design</h5>
                <p>Create structured plans and system designs.</p>
              </div>
            </div>

            {/* Step 3: Implementation */}
            <div className="relative z-10 flex flex-col items-center mb-1 pr-40 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center">
                <h5>Implementation</h5>
                <p>Deploy and configure approved solutions.</p>
              </div>
            </div>

            {/* Step 4: Monitor and Control */}
            <div className="relative z-10 flex flex-col items-center mb-1 pl-50 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center">
                <h5>Monitor and Control</h5>
                <p>Track performance and ensure proper operation.</p>
              </div>
            </div>

            {/* Step 5: Optimization */}
            <div className="relative z-10 flex flex-col items-center pr-40 -mt-6 space-y-2">
              <div className="w-20 h-20 bg-[#5192E6] rounded-full flex items-center justify-center shadow-xl">
                <svg
                  className="desktop_process_svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="space-y-1 text-center">
                <h5>Optimization</h5>
                <p>Improve systems through testing and refinement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED SOLUTIONS AND TRAINING ====================*/}
      <section
        id="training"
        className="flex flex-col py-10 md:py-15 h-full bg-[#EBF5FD] scroll-mt-18 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full space-y-6"
      >
        {/* Text Content */}
        <div>
          {/* Title */}
          <h3 className="text-center">
            Our Featured
            <span className="text-[#1775EE]"> Solutions and Training</span>
          </h3>
          {/* Description */}
          <p className="text-center max-w-240 mx-auto">
            Matekk Cybercore Academy delivers end-to-end ICT and engineering
            solutions alongside comprehensive training programs designed to meet
            industry demands and support digital transformation.
          </p>
        </div>

        {/* Gallery */}
        <div>
          {isMobile ? (
            /* ── MOBILE: single column, tap to reveal ── */
            <div className="flex flex-col gap-3">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setTappedCard(tappedCard === item.id ? null : item.id)
                  }
                  className="relative self-center rounded-2xl overflow-hidden cursor-pointer max-w-[85vw] h-[30vh]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className={`flex flex-col justify-center items-center text-white p-6 absolute inset-0 rounded-2xl backdrop-blur-sm bg-black/1 transition-opacity duration-500 ${
                      tappedCard === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 w-full">
                      <h5 className="text-shadow-lg">{item.title}</h5>
                      {item.link && (
                        <Link
                          to={item.link}
                          state={item.linkState}
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 17L17 7M17 7H7M17 7v10"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                    <p className="text-shadow-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : isTouch ? (
            /* ── TABLET: multi-column layout, tap to reveal ── */
            <div className="flex flex-col gap-3">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex gap-3"
                  style={{ height: "280px" }}
                >
                  {row.map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        setTappedCard(tappedCard === item.id ? null : item.id)
                      }
                      className="relative rounded-2xl overflow-hidden cursor-pointer flex-1"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />

                      <div
                        className={`flex flex-row justify-center items-center absolute inset-x-0 bottom-0 p-5 text-white bg-black/1 backdrop-blur-[10px] transition-opacity duration-500 ${
                          tappedCard === item.id ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="text-shadow-lg space-y-1 flex-1">
                          <h5>{item.title}</h5>
                          <p className="line-clamp-2">{item.desc}</p>
                        </div>
                        {item.link && (
                          <Link
                            to={item.link}
                          state={item.linkState}
                            onClick={(e) => e.stopPropagation()}
                            className="shrink-0 flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 17L17 7M17 7H7M17 7v10"
                              />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* ── DESKTOP: multi-column layout, hover to reveal ── */
            <div className="flex flex-col gap-3">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="flex gap-3 transition-all duration-500 ease-in-out"
                  style={{
                    height:
                      hoveredRow === rowIndex
                        ? "340px"
                        : hoveredRow !== null
                          ? "220px"
                          : "280px",
                  }}
                >
                  {row.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 transition-all duration-500 ease-in-out hover:flex-2"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="flex flex-row justify-center items-center absolute inset-x-0 bottom-0 p-5 text-white bg-black/1 to-transparent backdrop-blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="text-shadow-lg space-y-1">
                          <h5>{item.title}</h5>
                          <p className="line-clamp-2">{item.desc}</p>
                        </div>
                        {item.link && (
                          <Link
                            to={item.link}
                          state={item.linkState}
                            className="shrink-0 flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 17L17 7M17 7H7M17 7v10"
                              />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== FEEDBACKS ====================*/}
      <TestimonialsSection />

      {/* ==================== ABOUT THE COMPANY ====================*/}
      <section
        id="about"
        className="scroll-mt-6 md:scroll-mt-18 py-16 bg-[#EBF5FD] px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] space-y-6 "
      >
        {/* Title and Description */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <h6 className="w-fit border border-gray-300 rounded-full px-3 py-1.5 text-sm text-black bg-white">
            About
          </h6>
          <div className="space-y-1">
            <h3 className="text-center">
              About the
              <span className="text-[#1775EE]"> Company</span>
            </h3>
            {/* Description */}
            <p className="text-center max-w-240 mx-auto">
              Matekk Cybercore Academy is a trusted provider of ICT and
              engineering solutions and a premier ICT training center, committed
              to empowering businesses and individuals through innovation and
              education since 2013.
            </p>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:h-full xl:h-full 2xl:h-full">
            {/* Text Card */}
            <div className="about_cards order-2 md:order-1 shrink-0">
              <p>
                Founded in 2013, Matekk Cybercore Academy has grown into a
                reputable firm delivering innovative ICT solutions and
                professional training programs that enhance efficiency,
                connectivity, and technological capability across industries.
              </p>
            </div>

            {/* Person Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm order-1 md:order-2 md:flex-1 xl:flex-1 2xl:flex-1 min-h-0 md:max-h-140 xl:max-h-96 2xl:max-h-96.75">
              <img
                src={SirMark}
                alt="Company Representative"
                className="w-full h-107 md:h-full object-cover"
              />
            </div>
          </div>

          {/* Building Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm order-3 md:order-0 self-stretch min-h-0 xl:max-h-152 2xl:max-h-145">
            <img
              src={CompanyBuilding}
              alt="Matekk Academy Company Building"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:flex-row xl:flex-col gap-4 order-4 md:order-0 md:col-span-2 xl:col-span-1">
            {/* Mission Card */}
            <div className="about_cards space-y-2 flex-1">
              <h5>Mission</h5>
              <p>
                To empower businesses through innovative ICT and engineering
                solutions that enhance operational efficiency, drive
                technological advancement, and support sustainable growth.
              </p>
              <p>
                To deliver high-quality ICT education and training that enables
                individuals and organizations to achieve their full potential
                and stay competitive in the digital era.
              </p>
            </div>

            {/* Vision Card */}
            <div className="about_cards space-y-2 flex-1">
              <h5>Vision</h5>
              <p>
                To be a global leader in ICT and Engineering solutions,
                recognized for excellence, innovation, and commitment to client
                success.
              </p>
              <p>
                To be a globally recognized leader in ICT training, known for
                excellence, innovation, and transformative educational
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FREQUENTLY ASKED QUESTIONS ====================*/}
      {/* Layout: computer = title + card on the left, questions on the right;
          phone/tablet = title, then questions, then the "Still Have Questions?" card */}
      <section className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,28rem)_minmax(0,38rem)] lg:grid-rows-[auto_1fr] lg:justify-center lg:gap-x-18 lg:gap-y-8 px-[2.063rem] sm:px-[2.063rem] md:px-16 xl:px-[7.438rem] w-full py-10 md:py-15 scroll-mt-18 bg-white">
        {/* Title */}
        <div className="space-y-3 lg:col-start-1 lg:row-start-1">
          <h6 className="w-fit border border-gray-300 rounded-full px-3 py-1.5 text-sm text-black bg-white">
            FAQ
          </h6>
          <h3>
            Frequently <span className="text-[#1775EE]">Asked Questions</span>
          </h3>
          <p>
            Quick answers about our ICT solutions, training programs, and how to
            get started with Matekk Cybercore Academy.
          </p>
        </div>

        {/* Still Have Questions Container */}
        <div className="order-last lg:order-none lg:col-start-1 lg:row-start-2 self-start">
          <div className="bg-[#EBF5FD] p-7.5 rounded-xl shadow-md space-y-4">
            <div className="space-y-1">
              <h5>Still Have Questions?</h5>
              <p>
                Can&apos;t find the answer you&apos;re looking for? Our team is
                happy to help with any questions about our training programs and
                ICT solutions.
              </p>
            </div>
            <Button
              title="Contact Us"
              type="none"
              buttonCustomStyle="bg-[#1775EE] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] ease-in-out px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>

        {/* Frequently Asked Questions List */}
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:pt-2">
          <FAQ />
        </div>
      </section>

      {/* ==================== CONTACT US ====================*/}
      <section
        id="contact"
        className="flex flex-col-reverse md:flex-col-reverse gap-8 lg:flex-row space-x-0 md:space-x-0 lg:space-x-8 justify-center items-center py-10 md:py-15 bg-[#EBF5FD] scroll-mt-19 w-full px-[2.063rem] md:px-16 xl:px-[7.438rem]"
      >
        <ContactForm />

        {/* Text Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            {/* Subheading */}
            <h6 className="w-fit border border-gray-300 rounded-full px-3 py-1.5 text-sm text-black bg-white">
              Contact Us
            </h6>
            {/* Heading */}
            <div className="space-y-1">
              <h3>
                Get In Touch With Us{" "}
                <span className="text-[#1775EE]">Today</span>
              </h3>
              {/* Description */}
              <p>
                Get in touch with Matekk Cybercore Academy to inquire about our
                ICT solutions, training programs, or request a consultation. Our
                team is ready to assist you.
              </p>
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-0 md:gap-x-20">
            {/* Address */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img src={address} alt="Location Icon" className="w-6 h-6" />
              </div>
              <div>
                <h5>Address</h5>
                <p>
                  {/* Opens Street View of the office (pinned to the 2026 photo) in Google Maps */}
                  <a
                    href="https://www.google.com/maps/place/MGKK+ITBSS/@14.6215072,121.0963819,3a,75y,118.15h,101.71t/data=!3m6!1e1!3m4!1sdDfDO_We-3b4i2OrP4vFew!2e0!7i16384!8i8192!4m6!3m5!1s0x3397b95d7473b663:0xfee936fc26b0e0d1!8m2!3d14.6214074!4d121.096381!16s%2Fg%2F11ypcnkkk7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1775EE] underline underline-offset-4 hover:text-[#082A66] transition-colors duration-300"
                  >
                    10B Kalantiao Street Brgy. Calumpang Marikina, Metro Manila
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img src={phone} alt="Phone Icon" className="w-6 h-6" />
              </div>
              <div>
                <h5>Phone</h5>
                <p>09771968226</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img src={email} alt="Email Icon" className="w-6 h-6" />
              </div>
              <div>
                <h5>Email</h5>
                <p>
                  {/* Opens a new Gmail message addressed to the company */}
                  <a
                    href={CONTACT_GMAIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1775EE] underline underline-offset-4 hover:text-[#082A66] transition-colors duration-300"
                  >
                    info@matekkcybercore.com
                  </a>
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="contact_infos">
              <div className="contact_infos_icons">
                <img
                  src={availability}
                  alt="Availability Icon"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h5>Availability</h5>
                <p>10:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
