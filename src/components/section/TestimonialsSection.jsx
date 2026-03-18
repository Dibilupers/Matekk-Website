import { useState } from "react";
import TestimonialCard from "../cards/TestimonialCard";
import { testimonials } from "../data/testimonials";
import Button from "../ui/button";

const CARDS_PER_SLIDE = 3;

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const totalSlides = Math.ceil(testimonials.length / CARDS_PER_SLIDE);

  const visibleTestimonials = testimonials.slice(
    currentSlide * CARDS_PER_SLIDE,
    currentSlide * CARDS_PER_SLIDE + CARDS_PER_SLIDE,
  );

  const handleSlideChange = (i) => {
    if (animating || i === currentSlide) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(i);
      setAnimating(false);
    }, 300);
  };

  return (
    <section className="py-10 md:py-15 mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h3>
            Hear From Our{" "}
            <span className="text-[#1775EE]">Successful Learners</span>
          </h3>
          <p className="text-gray-600">
            MGKK ICT Services has successfully delivered critical ICT
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                onClick={() => handleSlideChange(i)}
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
