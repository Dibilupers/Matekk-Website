import { useState, useEffect } from "react";
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import badge1 from "../../../assets/FortinetNSE5SecureNetworking.png";
import badge2 from "../../../assets/FortinetNSE5SASE.png";
import badge3 from "../../../assets/FortinetNSE5ClousSecurity.png";
import badge4 from "../../../assets/FortinetNSE5SecurityOperations.png";
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png";
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png";
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import InstitutionalIcon from "../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";
import TrainingHeroBanner from "../../../components/section/TrainingHeroBanner";

export default function NSE5() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const badges = [
    { src: badge1, alt: "Fortinet NSE 5 Secure Networking Badge" },
    { src: badge2, alt: "Fortinet NSE 5 SASE Badge" },
    { src: badge3, alt: "Fortinet NSE 5 Cloud Security Badge" },
    { src: badge4, alt: "Fortinet NSE 5 Security Operations Badge" },
  ];

  // Auto-cycle every 2.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleBadgeChange((prev) => (prev + 1) % badges.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, badges.length]);

  const handleBadgeChange = (indexOrUpdater) => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedBadge(indexOrUpdater);
      setAnimating(false);
    }, 300);
  };

  const handleDotClick = (i) => {
    setIsPaused(true); // pause auto-cycle on manual click
    handleBadgeChange(i);
    // Resume auto-cycle after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  };

  const modules = [
    {
      title: "1.0 Networking Concepts",
      items: [
        {
          subTitle: "1.1 OSI Model Layers",
          items: [
            "Physical",
            "Data Link",
            "Network",
            "Transport",
            "Session",
            "Presentation",
            "Application",
          ],
        },
        {
          subTitle: "1.2 Networking Appliances",
          items: [
            "Routers",
            "Switches",
            "Firewalls",
            "IDS/IPS",
            "Load Balancers",
            "Proxies",
            "NAS",
            "SAN",
            "Wireless Devices",
          ],
        },
        {
          subTitle: "1.3 Cloud Concepts",
          items: [
            "NFV",
            "VPC",
            "Network Security Groups",
            "Cloud Gateways",
            "Deployment Models: Public, Private, Hybrid",
            "Service Models: SaaS, IaaS, PaaS",
          ],
        },
        {
          subTitle: "1.4 Ports and Protocols",
          items: [
            "FTP", "SFTP", "SSH", "Telnet", "SMTP",
            "DNS", "DHCP", "HTTP", "HTTPS",
            "SNMP", "LDAP", "RDP", "SIP",
          ],
        },
        {
          subTitle: "1.5 Traffic Types",
          items: ["Unicast", "Multicast", "Anycast", "Broadcast"],
        },
        {
          subTitle: "1.6 Transmission Media",
          items: [
            "Wireless: 802.11, Cellular, Satellite",
            "Wired: Fiber, Coaxial, DAC",
          ],
        },
        {
          subTitle: "1.7 Transceivers and Connectors",
          items: ["SC", "LC", "ST", "MPO", "RJ11", "RJ45", "F-type", "BNC"],
        },
        {
          subTitle: "1.8 Network Topologies",
          items: [
            "Mesh",
            "Hybrid",
            "Star / Hub and Spoke",
            "Spine and Leaf",
            "Point-to-Point",
            "Three-Tier",
            "Collapsed Core",
          ],
        },
        {
          subTitle: "1.9 IPv4 Addressing",
          items: [
            "Public vs. Private",
            "APIPA",
            "RFC1918",
            "Loopback",
            "Subnetting: VLSM, CIDR",
            "Address Classes: A, B, C, D, E",
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="FORTINET"
        title="NSE 4"
        description="Learn to administer FortiGate devices using key features and
              security profiles. Through hands-on labs, you'll practice firewall
              policies, VPNs, user authentication, logging, and network
              protection, building a solid foundation for advanced FortiGate
              administration.
                              "
      />

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE ==================== */}
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p>
              In this course, you will gain practical experience using key
              FortiGate features. Through interactive labs, you will explore
              firewall policies, user authentication, high availability, logging
              and monitoring, site-to-site IPsec VPN, cloud deployments, and
              security services such as IPS, antivirus, web filtering, and
              application control.
            </p>
            <p>
              Aligned with Fortinet training, these administration fundamentals
              provide a strong foundation for implementing and managing the most
              widely used FortiGate security features.
            </p>
          </section>

          <section className="flex flex-col gap-y-5">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid flex-col lg:flex-col-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Set up basic FortiGate networking from factory defaults</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Configure and manage administrator access</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Administer devices using both GUI and CLI</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Understand device registration methods</span>
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-y-5">
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <CourseModules modules={modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE WITH SELECTOR ==================== */}
          <div
            className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col items-center justify-center h-64 gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              src={badges[selectedBadge].src}
              alt={badges[selectedBadge].alt}
              className={`w-40 h-40 sm:w-45 sm:h-45 lg:w-50 lg:h-50 object-contain transition-all duration-300 ${
                animating ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            />
            {/* DOT INDICATORS */}
            <div className="flex justify-center gap-x-2">
              {badges.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedBadge === i
                      ? "bg-[#1775EE] w-4"
                      : "bg-[#C2DDFF] w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ==================== JOB OPPORTUNITIES ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {[
              "Entry-Level Security Analyst",
              "Junior Network Administrator",
              "IT Security Associate",
              "Cybersecurity Intern",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] font-bold">Target Learners</h5>
            {["Intermediate"].map((level) => (
              <p key={level} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{level}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] font-bold">Schedule</h5>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p className="font-bold">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Duration:</p>
                <p>7 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="font-bold">Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* ==================== INCLUSIONS ==================== */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            <h5 className="text-[#1775EE] font-bold">Inclusions</h5>
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Lunch & snacks (onsite)</p>
            </div>
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p className="text-sm">Reviewers & exercises</p>
            </div>
            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={InstitutionalIcon}
                  alt="Institutional Account"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Institutional Accounts</p>
            </div>
            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Workstation per student</p>
            </div>
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Certificate of Completion</p>
            </div>
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the Fortinet Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== FOOTER BANNER ==================== */}
      <TrainingTemplateFooter
        bgImage={ccnaFooter}
        description="Advance your network security career and prepare for the Fortinet NSE 5 certification exam."
      />
    </main>
  );
}