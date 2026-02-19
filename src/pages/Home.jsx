import Navbar from "../components/navbar/navbar";
import { Settings, Tag, MessageSquare } from "lucide-react";
import Partners from "../components/partners/partners";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-14"
      >
         <div className="mx-4 sm:mx-6 lg:mx-[7.438rem]">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ==================== LEFT SIDE - CONTENT ==================== */}
            <div className="space-y-6 lg:space-y-4 text-left lg:text-left">
              <div className="inline-block">
                <span className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                  ICT & Engineering
                </span>
              </div>

              {/* ==================== MAIN HEADING ==================== */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-900">
                Empowering Businesses and Individuals{" "}
                <span className="text-[#1775EE]">Through ICT Excellence</span>
              </h1>

              {/* ==================== DESCRIPTION ==================== */}
              <p className="text-gray-600 text-base lg:text-xl leading-relaxed max-w-lg text-left">
                Cutting-edge ICT and Engineering Solutions. Industry-relevant
                Training. Built on over a decade of expertise.
              </p>

              {/* ==================== CTA BUTTONS ==================== */}
              <div className="flex sm:flex-row gap-3 sm:gap-4 justify-left lg:justify-start">

                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Explore Our Solutions
                </button> 

                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base">
                  View Training Programs
                </button>
              </div>

              {/* ==================== STATS SECTION ==================== */}
              <div className="flex flex-nowrap justify-start lg:justify-start items-center gap-4 lg:gap-8 pt-6">

                {/* STAT 1: YEARS OF EXPERIENCE */}
                <div className="flex items-center gap-1">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">13+</h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">Years of</p>
                    <p className="font-medium whitespace-nowrap">Experience</p>
                  </div>
                </div>

                {/* DIVIDER LINE */}
                <div className="h-10 lg:h-12 w-px bg-gray-300 shrink-0"></div>

                {/* STAT 2: DATA CENTERS */}
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">3</h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">Data Centers</p>
                    <p className="font-medium whitespace-nowrap">Deployed</p>
                  </div>
                </div>

                {/* DIVIDER LINE */}
                <div className="h-10 lg:h-12 w-px bg-gray-300 shrink-0"></div>

                {/* STAT 3: ACTIVE COURSES */}
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">10</h2>
                  <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                    <p className="font-medium whitespace-nowrap">Total Active</p>
                    <p className="font-medium whitespace-nowrap">Courses</p>
                  </div>
                </div>

              </div>
            </div>

              {/* ==================== RIGHT SIDE - IMAGE & OVERLAYS ==================== */} 
            <div className="hidden lg:flex relative lg:h-[600px] items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
              </div>

              <div className="relative w-full max-w-md">

                <div className="absolute top-45 left-4 lg:-left-30 bg-[#EBF5FD] rounded-2xl shadow-2xl px-4 py-4 z-20 hover:scale-105 transition-transform">
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-4xl font-bold text-[#1775EE]">95%</p>

                    <div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        Passing Rate
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative mt-16">
                  <img
                    src="/src/assets/maamgrace2.png"
                    alt="Professional holding laptop with ICT solutions"
                    className="w-full h-auto aspect-[4/5] object-cover"
                  />
                </div>
                
                <div className="absolute top-28 right-2 lg:right-15 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Settings className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                <div className="absolute top-50 -right-2 lg:-right-5 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Tag className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                <div className="absolute top-78 right-0 lg:-right-14 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                <div className="absolute bottom-15 -right-4 lg:-right-20 bg-[#EBF5FD] rounded-xl shadow-2xl px-4 py-2 max-w-65 z-20 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-3">
                    <img
                      src="/src/assets/maamgrace2.png"
                      alt="Clyde Nelson R."
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1775EE] text-sm truncate">
                        Clyde Nelson R.
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.3">
                        just passed the CCNA certification!
                      </p>
                    </div>
                  </div>
                  <button className="mt-2 w-full py-2.5 bg-[#1775EE] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    View Certification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by our customers & clients */}
      <section id="" className="flex bg-[#EBF5FD] justify-center items-center text-center py-10">
        {/* Title and description */}
        <div className="mx-[2.063rem] md:mx-16 space-y-5">
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-2 font-bold text-3xl">
              <h3 className="">Trusted by Our</h3>
              <h3 className="text-[#1775EE]">Customers & Partners</h3>
            </div>
            <p>We collaborate with recognized technology partners to ensure quality, reliability, and up-to-date ICT solutions.</p>
          </div>

          {/* Partners Logo (Should be scrollable horizontally) */}
          <Partners />
        </div>
      </section>
      {/* Services we provide */}
      <section>
        
      </section>

      {/* About the Company */}
      <section></section>

      {/* Frequently Asked Questions */}
      <section></section>

      {/* Contact Us */}
      <section></section>
    </main>
  );
}
