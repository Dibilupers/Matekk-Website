// ADDED: Import useCallback, useMemo, and useEffect for performance optimization
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import DOH from '../../assets/DOH.svg';
import DICT from '../../assets/DICT.svg';
import PHIVOLCS from '../../assets/PHIVOLCS.png';
import OCD from '../../assets/OCD.svg';
import DND from '../../assets/DND.svg';
import DOF from '../../assets/DOF.svg';
import MOREPOWER from '../../assets/MOREPOWER.png';
import MARSTECH from '../../assets/MARSTECH.png';
import ATI from '../../assets/ATI.jpg';
import EM from '../../assets/EM.avif';
import MIZELA from '../../assets/MIZELA.png';
import HIKVISION from '../../assets/HIKVISION.svg';
import USTDI from '../../assets/USTDI.webp';
import ASENWARE from '../../assets/ASENWARE.jpg';
import SCALEEXPERTS from '../../assets/SCALEEXPERTS.png';
import COMMSOURCE from '../../assets/COMMSOURCE.png';
import IECEP from '../../assets/IECEP.png';
import USTP from '../../assets/USTP.png';
import CICC from '../../assets/CICC.jpg';
import STELLARSAT from '../../assets/STELLARSAT.avif';
import MISAMIS from '../../assets/MISAMIS.jpg';
import MARIKINA from '../../assets/MARIKINA.jpg';
import SLSU from '../../assets/SLSU.png';
import ICCT from '../../assets/ICCT.jpg';
import NAMRIA from '../../assets/NAMRIA.svg';
import EASYTECH from '../../assets/EASYTECH.svg';

function Partners() {
    // OPTIMIZED: Wrap array in useMemo to prevent recreation on every render
    const partnerLogos = useMemo(() => [
        { src: DOH, alt: "DOH Logo", size: "w-10 md:w-16" },
        { src: DICT, alt: "DICT Logo", size: "w-10 md:w-16" },
        { src: PHIVOLCS, alt: "PHIVOLCS Logo", size: "w-10 md:w-32" },
        { src: OCD, alt: "OCD Logo", size: "w-10 md:w-16" },
        { src: DND, alt: "DND Logo", size: "w-10 md:w-16" },
        { src: DOF, alt: "DOF Logo", size: "w-10 md:w-16" },
        { src: MOREPOWER, alt: "MOREPOWER Logo", size: "w-10 md:w-32" },
        { src: MARSTECH, alt: "MARSTECH Logo", size: "w-10 md:w-32" },
        { src: ATI, alt: "ATI Logo", size: "w-10 md:w-20" },
        { src: EM, alt: "E.M. CUERPO Logo", size: "w-10 md:w-32" },
        { src: MIZELA, alt: "MIZELA Logo", size: "w-10 md:w-16" },
        { src: HIKVISION, alt: "HIKVISION Logo", size: "w-10 md:w-32" },
        { src: USTDI, alt: "USTDI Logo", size: "w-10 md:w-20" },
        { src: ASENWARE, alt: "ASENWARE Logo", size: "w-10 md:w-32" },
        { src: SCALEEXPERTS, alt: "SCALEEXPERTS Logo", size: "w-10 md:w-32" },
        { src: COMMSOURCE, alt: "COMMSOURCE Logo", size: "w-10 md:w-32" },
        { src: IECEP, alt: "IECEP Logo", size: "w-10 md:w-18" },
        { src: USTP, alt: "USTP Logo", size: "w-10 md:w-16" },
        { src: CICC, alt: "CICC Logo", size: "w-10 md:w-18" },
        { src: STELLARSAT, alt: "STELLARSAT Logo", size: "w-10 md:w-32" },
        { src: MISAMIS, alt: "MISAMIS Logo", size: "w-10 md:w-18" },
        { src: MARIKINA, alt: "MARIKINA Logo", size: "w-10 md:w-18" },
        { src: SLSU, alt: "SLSU Logo", size: "w-10 md:w-18" },
        { src: ICCT, alt: "ICCT Logo", size: "w-10 md:w-18" },
        { src: NAMRIA, alt: "NAMRIA Logo", size: "w-10 md:w-18" },
        { src: EASYTECH, alt: "EASYTECH Logo", size: "w-10 md:w-26" },
    ], []); // Empty dependency array means this only creates once

    // Reference to the scrollable container so we can control scrolling programmatically
    const scrollRef = useRef(null);

    // Track which page/dot is currently active (starts at 0 = first page)
    const [currentDot, setCurrentDot] = useState(0);

    // ADDED: Track screen size to calculate logos per page dynamically
    const [logosPerPage, setLogosPerPage] = useState(18);

    // ADDED: Track if user has manually interacted (to pause auto-scroll)
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // ADDED: Calculate logos per page based on screen size
    useEffect(() => {
        const calculateLogosPerPage = () => {
            const width = window.innerWidth;
            
            // Mobile 
            if (width < 640) {
                setLogosPerPage(12);
            } 
            // Tablet
            else if (width >= 620 && width < 1024) {
                setLogosPerPage(12);
            }
            // Desktop 
            else {
                setLogosPerPage(18);
            }
        };

        // Calculate on mount
        calculateLogosPerPage();

        // Recalculate on window resize
        window.addEventListener('resize', calculateLogosPerPage);
        
        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', calculateLogosPerPage);
    }, []);

    // Calculate total number of pages needed (rounds up so no logos are left out)
    const totalPages = useMemo(() =>
        Math.ceil(partnerLogos.length / logosPerPage),
        [partnerLogos.length, logosPerPage] // Recalculate when screen size changes
    );

    // Function to scroll to a specific page when dot is clicked
    const scrollToPage = useCallback((pageIndex) => {
        // Safety check: make sure scrollRef exists
        if (!scrollRef.current) return;

        // Calculate how far to scroll (container width × page number)
        const scrollAmount = scrollRef.current.offsetWidth * pageIndex;

        // Perform the actual scroll with smooth animation
        scrollRef.current.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Update which dot should be highlighted as active
        setCurrentDot(pageIndex);
    }, []); // No dependencies, function never recreates

    // Function called automatically when user scrolls/swipes
    const handleScroll = useCallback(() => {
        // Safety check: make sure scrollRef exists
        if (!scrollRef.current) return;

        // Get current scroll position (how far left we've scrolled in pixels)
        const scrollPosition = scrollRef.current.scrollLeft;

        // Get the width of one page
        const pageWidth = scrollRef.current.offsetWidth;

        // Calculate which page we're currently on
        // Math.round() handles in-between positions (e.g., 1.5 becomes 2)
        const currentPage = Math.round(scrollPosition / pageWidth);

        // Update the active dot indicator
        setCurrentDot(prev => prev !== currentPage ? currentPage : prev);
    }, []);

    // ADDED: Handle user interaction to pause auto-scroll
    const handleUserInteraction = useCallback(() => {
        setHasUserInteracted(true);
    }, []);

    // ADDED: Auto-scroll effect - scrolls to next page every 2 seconds
    useEffect(() => {
        // Don't auto-scroll if user has manually interacted
        if (hasUserInteracted) return;

        // Set up interval to auto-scroll every 2 seconds
        const autoScrollInterval = setInterval(() => {
            setCurrentDot(prev => {
                // Calculate next page (loop back to 0 after last page)
                const nextPage = (prev + 1) % totalPages;
                
                // Scroll to next page
                scrollToPage(nextPage);
                
                return nextPage;
            });
        }, 2000); // 2000ms = 2 seconds

        // Cleanup interval on unmount or when user interacts
        return () => clearInterval(autoScrollInterval);
    }, [totalPages, scrollToPage, hasUserInteracted]);

    return (
        <div className="space-y-8 justify-center items-center">
            {/* Main scrollable container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                // ADDED: Pause auto-scroll when user manually scrolls or touches
                onTouchStart={handleUserInteraction}
                onMouseDown={handleUserInteraction}
                className="overflow-x-hidden overflow-y-hidden scrollbar-hide snap-x snap-mandatory flex"
                // ADDED: Hardware acceleration for smoother scrolling (tells browser to optimize)
                style={{ willChange: 'scroll-position' }}
            >
                {/* Loop through each page and create a separate grid for each */}
                {Array(totalPages).fill(null).map((_, pageIndex) => (
                    <div
                        key={pageIndex}
                        // ADDED: flex-shrink-0 prevents page compression during scroll
                        className="min-w-full snap-start flex items-start justify-center shrink-0"
                    >
                        <div className="grid grid-cols-3 grid-rows-4 sm:grid-cols-4 sm:grid-rows-3 lg:grid-cols-6 lg:grid-rows-3 gap-2 md:gap-4">

                            {/* Slice the logos array to get only the logos for this specific page */}
                            {partnerLogos
                                .slice(pageIndex * logosPerPage, (pageIndex + 1) * logosPerPage)
                                .map((logo, logoIndex) => (
                                    // Render each individual logo
                                    <div
                                        key={logoIndex}  // Unique key for React
                                        className="partner-logos-format flex items-center justify-center"
                                        // ADDED: GPU acceleration for each logo container (smoother rendering)
                                        style={{ transform: 'translateZ(0)' }}
                                    >
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            // UPDATED: Responsive sizing - smaller on mobile, larger on desktop
                                            className={logo.size}  // Mobile: 40px, Desktop: 64px
                                            // ADDED: Prevents image dragging which can cause lag during scroll
                                            draggable="false"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot indicators at the bottom */}
            <div className="flex justify-center gap-2">
                {/* Create one dot button for each page */}
                {/* Note: Number of dots changes based on screen size since logosPerPage changes */}
                {Array(totalPages).fill(null).map((_, index) => (
                    <button
                        key={index}
                        // UPDATED: Pause auto-scroll when clicking dots
                        onClick={() => {
                            handleUserInteraction();
                            scrollToPage(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                            currentDot === index 
                                ? 'bg-blue-600 w-6'  // Active dot: blue and wider
                                : 'bg-gray-300 hover:bg-gray-400'  // Inactive dot: gray
                        }`}
                        aria-label={`Go to page ${index + 1}`}
                    >
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Partners;