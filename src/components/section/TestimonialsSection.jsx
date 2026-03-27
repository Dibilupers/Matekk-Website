import { useState, useCallback, useEffect } from "react";
import TestimonialCard from "../cards/TestimonialCard";
import { testimonials } from "../data/testimonials";
import Button from "../ui/button";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Dynamic cards per slide based on screen size — same as Partners logosPerPage
  useEffect(() => {
    const calculateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerSlide(1); // Mobile: 1 card
      } else if (width >= 768 && width < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else {
        setCardsPerSlide(3); // Desktop: 3 cards
      }
    };

    calculateCardsPerSlide();
    window.addEventListener("resize", calculateCardsPerSlide);
    return () => window.removeEventListener("resize", calculateCardsPerSlide);
  }, []);

  // Reset to slide 0 when cardsPerSlide changes to avoid out-of-range slide
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

  // Auto-scroll — same logic as Partners
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
    <section id="feedbacks" className="py-10 md:py-15 mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-8 scroll-mt-18">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h3>
            Hear From Our <span className="text-[#1775EE] block sm:inline"> Successful Learners</span>
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
            type="primary"
            buttonCustomStyle="bg-[#1775EE] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div
        onMouseDown={handleUserInteraction}
        onTouchStart={handleUserInteraction}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {visibleTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            animating={animating}
          />
        ))}
      </div>

      {/* Dot Indicators */}
      {totalSlides > 1 && (
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
