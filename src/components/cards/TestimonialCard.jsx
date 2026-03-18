import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function TestimonialCard({ name, course, rating, feedback, image, animating }) {
  const [hovered, setHovered] = useState(false);

  const isBlue = hovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`min-h-[280px] md:h-[320px] overflow-hidden rounded-2xl p-6 flex flex-col gap-4 shadow-sm
        transition-all duration-300 cursor-default hover:scale-105 hover:shadow-xl
        ${animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
        ${isBlue ? "bg-[#1775EE] text-white" : "bg-[#EBF5FD] text-gray-800"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center font-bold text-lg
                transition-all duration-300 ${
                isBlue ? "bg-blue-400 text-white" : "bg-blue-200 text-blue-700"
              }`}>
                {name.charAt(0)}
              </div>
            )}
          </div>
          {/* Name and Course */}
          <div>
            <p className={`font-bold text-sm transition-all duration-300 ${
              isBlue ? "text-white" : "text-gray-900"
            }`}>
              {name}
            </p>
            <p className={`text-xs transition-all duration-300 ${
              isBlue ? "text-blue-100" : "text-gray-500"
            }`}>
              {course}
            </p>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <span className={`text-4xl font-serif leading-none transition-all duration-300 ${
          isBlue ? "text-blue-200" : "text-blue-300"
        }`}>
          "
        </span>
      </div>

      <p className={`text-sm leading-relaxed text-justify transition-all duration-300 ${
        isBlue ? "text-blue-50" : "text-gray-600"
      }`}>
        {feedback}
      </p>
    </div>
  );
}