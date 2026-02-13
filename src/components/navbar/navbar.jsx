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
    <header className="flex flex-row items-center p-4 justify-between mx-[7.438rem] sticky top-0 z-50">

      {/* Logo */}
      <Link to='/'>
        {/* Put an image for the logo later on */}
        LOGO
      </Link>

      {/* Navigation Links */}
      <nav className="space-x-8">
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
        className=""
      >
        Enroll Now
      </Link>
    </header>
  );
}

export default NavBar;