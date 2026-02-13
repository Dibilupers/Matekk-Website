import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

function NavBar() {
  // Opening of hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  // Scrolled effect 
  const [scrolled, setScrolled] = useState(false);
  // Updated nav links with routes
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Training", path: "/training" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="flex flex-row items-center justify-between py-4 bg-white sticky top-0 z-50 ">
      {/* Default NavBar layout */}
      {/* Logo */}
      <Link to='/' className='ml-[2.063rem] md:ml-[7.438rem]'>
        {/* Put an image for the logo later on */}
        LOGO
      </Link>

      {/* Navigation Links */}
      <nav className="space-x-8 hidden md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className=""
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Enroll Now Button */}
      <Link
        to="/enroll"
        className="hidden md:flex mr-0 md:mr-[7.438rem]"
      >
        Enroll Now
      </Link>

      {/* Mobile Hamburger */}
      <div className="flex md:hidden mr-[2.063rem] justify-center items-center">
        {/* Hamburger menu is closed */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {/* Simple hamburger icon */}
          <svg
            className="w-7 h-7 text-[#1775EE]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* When hamburger menu is open */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40">
            <nav className="flex flex-col p-[2.063rem] space-y-4">
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-[#003058] hover:text-blue-600 py-2"
                >
                  {link.name}
                </Link>
              ))}

              {/* ADDED: Enroll Now Button for Mobile - Separate from navLinks */}
              <Link
                to="/enroll"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 mt-4"
              >
                Enroll Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>

  );
}

export default NavBar;