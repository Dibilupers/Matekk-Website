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

function Partners() {
    // OPTIMIZED: Wrap array in useMemo to prevent recreation on every render
    const partnerLogos = useMemo(() => [
        { src: DOH, alt: "DOH Logo", size: "w-10 sm:w-16" },
        { src: DICT, alt: "DICT Logo", size: "w-10 sm:w-16" },
        { src: PHIVOLCS, alt: "PHIVOLCS Logo", size: "w-10 sm:w-32" },
        { src: OCD, alt: "OCD Logo", size: "w-10 sm:w-16" },
        { src: DND, alt: "DND Logo", size: "w-10 sm:w-16" },
        { src: DOF, alt: "DOF Logo", size: "w-10 sm:w-16" },
        { src: MOREPOWER, alt: "MOREPOWER Logo", size: "w-10 sm:w-32" },
        { src: MARSTECH, alt: "MARSTECH Logo", size: "w-10 sm:w-32" },
        { src: ATI, alt: "ATI Logo", size: "w-10 sm:w-20" },
        { src: EM, alt: "E.M. CUERPO Logo", size: "w-10 sm:w-32" },
        { src: MIZELA, alt: "MIZELA Logo", size: "w-10 sm:w-16" },
        { src: HIKVISION, alt: "HIKVISION Logo", size: "w-10 sm:w-32" },
        { src: USTDI, alt: "USTDI Logo", size: "w-10 sm:w-20" },
        { src: ASENWARE, alt: "ASENWARE Logo", size: "w-10 sm:w-32" },
        { src: SCALEEXPERTS, alt: "SCALEEXPERTS Logo", size: "w-10 sm:w-32" },
        { src: COMMSOURCE, alt: "COMMSOURCE Logo", size: "w-10 sm:w-32" },
        { src: IECEP, alt: "IECEP Logo", size: "w-10 sm:w-18" },
        { src: USTP, alt: "USTP Logo", size: "w-10 sm:w-16" },
        { src: CICC, alt: "CICC Logo", size: "w-10 sm:w-18" },
        { src: STELLARSAT, alt: "STELLARSAT Logo", size: "w-10 sm:w-32" },
        { src: MISAMIS, alt: "MISAMIS Logo", size: "w-10 sm:w-18" },
        { src: MARIKINA, alt: "MARIKINA Logo", size: "w-10 sm:w-18" },
        { src: SLSU, alt: "SLSU Logo", size: "w-10 sm:w-18" },
        { src: ICCT, alt: "ICCT Logo", size: "w-10 sm:w-18" },
    ], []); // Empty dependency array means this only creates once

    // Reference to the scrollable container
    const scrollRef = useRef(null);

    // ADDED: Reference to the entire Partners section container
    const sectionRef = useRef(null);

    // Track which page/dot is currently active
    const [currentDot, setCurrentDot] = useState(0);

    // Track screen size to calculate logos per page dynamically
    const [logosPerPage, setLogosPerPage] = useState(18);

    // Track if user has manually interacted (to pause auto-scroll)
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // ADDED: Track if Partners section is visible in viewport
    const [isInView, setIsInView] = useState(false);

    // ADDED: Intersection Observer to detect when section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // entries[0] is our Partners section
                // isIntersecting = true when section is visible in viewport
                const inView = entries[0].isIntersecting;
                setIsInView(inView);

                // Resets the to first page when leaving the section
                if (!inView) {
                    setCurrentDot(0);
                    if (scrollRef.current) {
                        scrollRef.current.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });
                    }
                }
            },
            {
                // Trigger when at least 50% of the section is visible
                threshold: 0.5
            }
        );

        // Start observing the Partners section
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Cleanup: stop observing when component unmounts
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Calculate logos per page based on screen size
    useEffect(() => {
        const calculateLogosPerPage = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setLogosPerPage(12);
            }
            else if (width >= 620 && width < 1024) {
                setLogosPerPage(12);
            }
            else {
                setLogosPerPage(18);
            }
        };

        calculateLogosPerPage();
        window.addEventListener('resize', calculateLogosPerPage);

        return () => window.removeEventListener('resize', calculateLogosPerPage);
    }, []);

    // Calculate total number of pages needed
    const totalPages = useMemo(() =>
        Math.ceil(partnerLogos.length / logosPerPage),
        [partnerLogos.length, logosPerPage]
    );

    // Function to scroll to a specific page when dot is clicked
    const scrollToPage = useCallback((pageIndex) => {
        if (!scrollRef.current) return;

        const scrollAmount = scrollRef.current.offsetWidth * pageIndex;

        scrollRef.current.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        setCurrentDot(pageIndex);
    }, []);

    // Function called automatically when user scrolls/swipes
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;

        const scrollPosition = scrollRef.current.scrollLeft;
        const pageWidth = scrollRef.current.offsetWidth;
        const currentPage = Math.round(scrollPosition / pageWidth);

        setCurrentDot(prev => prev !== currentPage ? currentPage : prev);
    }, []);

    // Handle user interaction to pause auto-scroll
    const handleUserInteraction = useCallback(() => {
        setHasUserInteracted(true);
    }, []);

    // UPDATED: Auto-scroll effect - only runs when section is in view
    useEffect(() => {
        // ADDED: Don't auto-scroll if section is not in viewport
        if (!isInView) return;

        // Set up interval to auto-scroll every 2 seconds
        const autoScrollInterval = setInterval(() => {
            setCurrentDot(prev => {
                const nextPage = (prev + 1) % totalPages;
                scrollToPage(nextPage);
                return nextPage;
            });
        }, 1000);

        // Cleanup interval on unmount or when user interacts or leaves viewport
        return () => clearInterval(autoScrollInterval);
    }, [totalPages, scrollToPage, hasUserInteracted, isInView]);
    
    return (
        <div ref={sectionRef} className="space-y-8 justify-center items-center">
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
                        className={`w-2 h-2 rounded-full transition-all ${currentDot === index
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