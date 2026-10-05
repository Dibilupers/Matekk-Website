import { useState, useCallback, useEffect } from "react";
import TestimonialCard from "../cards/TestimonialCard";
import { testimonials } from "../data/testimonials";
import Button from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic cards per slide based on screen size
  useEffect(() => {
    const calculateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerSlide(1); // Mobile: 1 card
        setIsMobile(true);
      } else if (width >= 768 && width < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
        setIsMobile(false);
      } else {
        setCardsPerSlide(4); // Desktop: 4 cards
        setIsMobile(false);
      }
    };

    calculateCardsPerSlide();
    window.addEventListener("resize", calculateCardsPerSlide);
    return () => window.removeEventListener("resize", calculateCardsPerSlide);
  }, []);

  // Reset to slide 0 when cardsPerSlide changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerSlide]);

  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  const visibleTestimonials = testimonials.slice(
    currentSlide * cardsPerSlide,
    currentSlide * cardsPerSlide + cardsPerSlide,
  );

  const handleUserInteraction = useCallback(() => {
    setHasUserInteracted(true);
  }, []);

  const handleSlideChange = useCallback(
    (i) => {
      if (animating || i === currentSlide) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrentSlide(i);
        setAnimating(false);
      }, 300);
    },
    [animating, currentSlide],
  );

  // Next/Previous handlers
  const handleNext = useCallback(() => {
    handleUserInteraction();
    const nextSlide = (currentSlide + 1) % totalSlides;
    handleSlideChange(nextSlide);
  }, [currentSlide, totalSlides, handleSlideChange, handleUserInteraction]);

  const handlePrev = useCallback(() => {
    handleUserInteraction();
    const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    handleSlideChange(prevSlide);
  }, [currentSlide, totalSlides, handleSlideChange, handleUserInteraction]);

  // Auto-scroll
  useEffect(() => {
    if (hasUserInteracted) return;

    const autoScrollInterval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % totalSlides;
        setAnimating(true);
        setTimeout(() => setAnimating(false), 300);
        return nextSlide;
      });
    }, 6000);

    return () => clearInterval(autoScrollInterval);
  }, [totalSlides, hasUserInteracted]);

  return (
    <section
      id="feedbacks"
      className="py-10 md:py-15 mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-8 scroll-mt-18"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h3>
            Hear From Our{" "}
            <span className="text-[#1775EE] block sm:inline">
              {" "}
              Successful Learners
            </span>
          </h3>
          <p>
            Matekk Cybercore Academy has successfully delivered critical ICT
            infrastructure and training solutions for government agencies and
            private organizations, maintaining a strong focus on quality,
            reliability, and customer satisfaction.
          </p>
        </div>
        <div className="shrink-0">
          <Button
            title="Contact Us"
            type="none"
            buttonCustomStyle="bg-[#1775EE] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            btnFunc={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div
        onMouseDown={handleUserInteraction}
        onTouchStart={handleUserInteraction}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {visibleTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            animating={animating}
          />
        ))}
      </div>

      {/* Navigation Buttons Below Card (Mobile Only) */}
      {isMobile && totalSlides > 1 && (
        <div className="flex justify-center items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={animating}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#1775EE]" />
          </button>

          {/* Page Counter */}
          <span className="text-sm text-gray-600 font-medium min-w-[50px] text-center">
            {currentSlide + 1} / {totalSlides}
          </span>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={animating}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#1775EE]" />
          </button>
        </div>
      )}

      {/* Dot Indicators - ALL SCREEN SIZES */}
      {totalSlides > 1 && !isMobile && (
        <div className="flex justify-center gap-2">
          {Array(totalSlides)
            .fill(null)
            .map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  handleUserInteraction();
                  handleSlideChange(i);
                }}
                disabled={animating || i === currentSlide}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-125
                disabled:cursor-default ${
                  currentSlide === i
                    ? "bg-[#1775EE] w-6"
                    : "bg-gray-300 hover:bg-[#1775EE] w-2"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
        </div>
      )}
    </section>
  );
}