// ADDED: Import useCallback and useMemo for performance optimization
import { useState, useRef, useCallback, useMemo } from 'react';
import DOH from '../../assets/DOH.svg';

function Partners() {
    // OPTIMIZED: Wrap array in useMemo to prevent recreation on every render
    const partnerLogos = useMemo(() => [
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
        { src: DOH, alt: "DOH Logo" },
    ], []); // Empty dependency array means this only creates once

    // Reference to the scrollable container so we can control scrolling programmatically
    const scrollRef = useRef(null);

    // Track which page/dot is currently active (starts at 0 = first page)
    const [currentDot, setCurrentDot] = useState(0);

    // Calculate pagination: 3 rows × 6 columns = 18 logos per page
    const logosPerPage = 18;

    // Calculate total number of pages needed (rounds up so no logos are left out)
    // Example: 40 logos ÷ 18 per page = 2.22 → rounds up to 3 pages
    // OPTIMIZED: Wrap in useMemo to prevent recalculation on every render
    const totalPages = useMemo(() =>
        Math.ceil(partnerLogos.length / logosPerPage),
        [partnerLogos.length, logosPerPage] // Only recalculate if these change
    );

    // Function to scroll to a specific page when dot is clicked
    // OPTIMIZED: Wrap in useCallback to prevent function recreation on every render
    const scrollToPage = useCallback((pageIndex) => {
        // Safety check: make sure scrollRef exists
        if (!scrollRef.current) return;

        // Calculate how far to scroll (container width × page number)
        // Example: If container is 1000px wide and pageIndex is 2, scroll 2000px
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
    // OPTIMIZED: Wrap in useCallback to prevent function recreation
    const handleScroll = useCallback(() => {
        // Safety check: make sure scrollRef exists
        if (!scrollRef.current) return;

        // Get current scroll position (how far left we've scrolled in pixels)
        const scrollPosition = scrollRef.current.scrollLeft;

        // Get the width of one page
        const pageWidth = scrollRef.current.offsetWidth;

        // Calculate which page we're currently on
        // Formula: scroll distance ÷ page width = page number
        // Math.round() handles in-between positions (e.g., 1.5 becomes 2)
        const currentPage = Math.round(scrollPosition / pageWidth);

        // Update the active dot indicator
        // OPTIMIZED: Only update if page actually changed (reduces unnecessary re-renders)
        setCurrentDot(prev => prev !== currentPage ? currentPage : prev);
    }, []);

    return (
        <div className="space-y-8 justify-center items-center">
            {/* Main scrollable container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="overflow-x-hidden overflow-y-hidden scrollbar-hide snap-x snap-mandatory flex"
                // ADDED: Hardware acceleration for smoother scrolling (tells browser to optimize)
                style={{ willChange: 'scroll-position' }}
            >
                {/* Loop through each page and create a separate grid for each */}
                {Array(totalPages).fill(null).map((_, pageIndex) => (
                    <div
                        key={pageIndex}
                        // ADDED: flex-shrink-0 prevents page compression during scroll
                        className="min-w-full snap-start flex items-center justify-center flex-shrink-0"
                    >
                        <div className="grid grid-cols-6 grid-rows-3 gap-4">
                            {/* grid-cols-6: 6 columns */}
                            {/* grid-rows-3: 3 rows */}
                            {/* gap-4: space between logos */}

                            {/* Slice the logos array to get only the logos for this specific page */}
                            {partnerLogos
                                // .slice(start, end) extracts a portion of the array
                                // Page 0: slice(0, 18) → logos 0-17
                                // Page 1: slice(18, 36) → logos 18-35
                                // Page 2: slice(36, 54) → logos 36-39 (only 4 left)
                                .slice(pageIndex * logosPerPage, (pageIndex + 1) * logosPerPage)
                                .map((logo, logoIndex) => (
                                    // Render each individual logo
                                    <div
                                        key={logoIndex}  // Unique key for React
                                        className="partner-logos-format flex items-center justify-center"
                                        // flex items-center justify-center: centers logo in its grid cell
                                        // ADDED: GPU acceleration for each logo container (smoother rendering)
                                        style={{ transform: 'translateZ(0)' }}
                                    >
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            className="w-16"  // Logo width: 64px
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
                {Array(totalPages).fill(null).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToPage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${currentDot === index ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
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