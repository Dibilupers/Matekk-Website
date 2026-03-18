import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLogo from "../../assets/main_logo_footer.png";
import TrainingLogo from "../../assets/training_logo_footer.png";
import SolutionsLogo from "../../assets/services_logo_footer.png";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };
  const getLogoElement = () => {
    if (location.pathname.startsWith("/training")) {
      return (
        <img
          src={TrainingLogo}
          alt="Training Logo"
          className="max-w-70 md:max-w-90"
        />
      );
    }
    if (location.pathname.startsWith("/solutions")) {
      return (
        <img
          src={SolutionsLogo}
          alt="Solutions Logo"
          className="max-w-70 md:max-w-90"
        />
      );
    }
    return (
      <img
        src={MainLogo}
        alt="MATEKK Logo"
        className="max-w-70 md:max-w-90"
      />
    );
  };
  return (
    <footer className="bg-white flex flex-col py-10 space-y-14  mx-[2.063rem] md:mx-16 xl:mx-[7.438rem]">
      <div className=" flex flex-col md:flex-col lg:flex-row body_margin justify-between items-start space-y-14 md:space-y-10 lg:space-y-0 space-x-0 lg:space-x-10 xl:space-x-15">
        {/* RIGHT SIDE */}
        <div className="space-y-1 w-fit md:w-full lg:w-[40%]">
          {/* LOGO AND DESCRIPTION */}
          <button className="cursor-pointer">{getLogoElement()}</button>
          <p className="max-w-lg">
            We are the BEST Solution for your IT/Engineering Training's and
            Consultation needs at a very competitive price.
          </p>
        </div>
        <div className="w-full md:w-auto grid grid-cols-2 gap-y-10 gap-x-10 md:flex md:flex-row md:space-y-0 md:space-x-5 lg:space-x-0 xl:space-x-15 2xl:space-x-30">
          {/* Popular Courses */}
          <div className="space-y-4">
            <h5>Popular Courses</h5>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/training/cisco/ccna/automation"
                  className="hover:underline"
                >
                  CCNA Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/training/cisco/ccna/cybersecurity"
                  className="hover:underline"
                >
                  CCNA Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  to="/training/cisco/ccnp/enterprise"
                  className="hover:underline"
                >
                  CCNP Enterprise
                </Link>
              </li>
              <li>
                <Link
                  to="/training/cisco/ccnp/security"
                  className="hover:underline"
                >
                  CCNP Security
                </Link>
              </li>
            </ul>
          </div>
          {/* COMPANY INFO LINK */}
          <div className="space-y-4">
            <h5>Company</h5>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:underline hover:cursor-pointer"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("training")}
                  className="hover:underline hover:cursor-pointer"
                >
                  Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("partners")}
                  className="hover:underline hover:cursor-pointer"
                >
                  Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:underline hover:cursor-pointer"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          {/* INFORMATION LINK */}
          <div className="space-y-4">
            <h5>Follow Us</h5>
            <div className=" items-center flex flex-row w-full md:justify-end space-x-4">
              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/profile.php?id=61573101443685"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-[#1775EE] flex items-center justify-center hover:bg-[#1775EE] transition-colors duration-300 group w-10 h-10"
              >
                <FaFacebook className="text-[#1775EE] group-hover:text-white transition-colors duration-300 w-10 h-10" />
              </a>
              {/* WHATSAPP */}
              <a
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-[#1775EE] flex items-center justify-center hover:bg-[#1775EE] transition-colors duration-300 group w-10 h-10"
              >
                <FaInstagram className="text-[#1775EE] group-hover:text-white transition-colors duration-300 w-10 h-10" />
              </a>
              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/company/solverous"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-[#1775EE] flex items-center justify-center hover:bg-[#1775EE] transition-colors duration-300 group w-10 h-10"
              >
                <FaLinkedin className="text-[#1775EE] group-hover:text-white transition-colors duration-300 w-10 h-10" />
              </a>
            </div>
          </div>  
        </div>
      </div>
      {/* LINE */}
      <div className="space-y-3">
        <div className=" border-black border border-b-0.3 body_margin"></div>
        <div className=" body_margin flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <p className="">© 2026 MATEKK. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
}
