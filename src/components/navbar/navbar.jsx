import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

function Navbar() {
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
    <header className='flex items-center justify-between sticky top-0 bg-white z-50 px-[2.063rem] md:px-[7.438rem] py-[1rem] md:py-3'>
      {/* Logo - Left */}
      <Link to='/' className='font-bold active:scale-95'>
        LOGO
      </Link>

      {/* Desktop Navigation - Center */}
      <nav className='hidden md:flex items-center space-x-8 lg:space-x-12 absolute left-1/2 transform -translate-x-1/2'>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:font-bold hover:underline transition-all duration-200 active:scale-95"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Enroll Now Button - Right (Desktop) */}
      <Link 
        to="/enroll" 
        className='hidden md:block text-[#007EE6] bg-transparent border border-[#007EE6] hover:bg-[#007EE6] hover:text-white py-2 px-6 rounded-lg transition-all duration-200 active:scale-95'
      >
        Enroll Now
      </Link>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-7 h-7 text-[#003058]"
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
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-white md:hidden shadow-lg overflow-hidden transition-all duration-500 ease-in-out`}
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:font-bold hover:underline transition-all duration-200 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/enroll" 
            className='text-[#007EE6] bg-transparent border border-[#007EE6] hover:bg-[#007EE6] hover:text-white py-3 px-12 rounded-lg transition-all duration-200'
            onClick={() => setIsOpen(false)}
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;