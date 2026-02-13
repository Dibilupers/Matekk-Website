import Navbar from "../components/navbar/navbar";
import { Settings, Tag, MessageSquare } from "lucide-react";
import Partners from "../components/partners/partners";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8 lg:space-y-4">
              {/* 
                ADJUST SPACING HERE: 
                - Change space-y-8 lg:space-y-10 to adjust vertical spacing between elements
                - Increase numbers for more space, decrease for less
              */}

              {/* Subtitle Badge */}
              <div className="inline-block">
                {/* 
                  ADJUST BADGE STYLE HERE:
                  - bg-blue-50 = background color
                  - text-blue-600 = text color
                  - px-5 py-2.5 = padding (horizontal/vertical)
                  - rounded-full = pill shape
                */}
                <span className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                  ICT & Engineering
                </span>
              </div>

              {/* Main Heading - EXACT TEXT FROM DESIGN */}
              {/* 
                ADJUST HEADING SIZE HERE:
                - text-4xl sm:text-5xl lg:text-6xl = responsive font sizes
                - leading-tight = line height
                - Change text-blue-600 to adjust "Through ICT Excellence" color
              */}
              <h1 className="text-sm sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-900">
                Empowering Businesses and Individuals{" "}
                <span className="text-[#1775EE]">Through ICT Excellence</span>
              </h1>

              {/* Description - EXACT TEXT FROM DESIGN */}
              {/* 
                ADJUST DESCRIPTION HERE:
                - text-lg lg:text-xl = font size
                - max-w-xl = maximum width
                - text-gray-600 = text color
              */}
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-lg">
                Cutting-edge ICT and Engineering Solutions. Industry-relevant
                Training. Built on over a decade of expertise.
              </p>

              {/* CTA Buttons */}
              {/* 
                ADJUST BUTTON SPACING HERE:
                - gap-4 = space between buttons
                - flex-col sm:flex-row = stack on mobile, side-by-side on tablet+
              */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* 
                  PRIMARY BUTTON - ADJUST STYLE HERE:
                  - bg-blue-600 = background color
                  - hover:bg-blue-700 = hover background
                  - px-8 py-4 = padding
                  - rounded-full = pill shape
                */}
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore Our Solutions
                </button>
                {/* 
                  SECONDARY BUTTON - ADJUST STYLE HERE:
                  - border-2 border-blue-600 = border width and color
                  - hover:bg-blue-50 = hover background
                */}
                <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all duration-300">
                  View Training Programs
                </button>
              </div>

              {/* Stats Section */}
              {/* 
                ADJUST STATS LAYOUT HERE:
                - gap-6 lg:gap-8 = space between stat items
                - pt-6 = top padding (space from buttons above)
                - flex-wrap = allows wrapping on small screens
              */}
              <div className="flex flex-wrap items-center gap-6 lg:gap-8 pt-6">
                {/* Years of Experience */}
                {/* 
                  ADJUST STAT STYLE HERE:
                  - text-4xl lg:text-5xl = number size
                  - text-sm = label text size
                  - gap-2 = space between number and labels
                */}
                <div className="flex items-end-safe gap-1">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    13+
                  </h2>
                  <div className="text-sm text-gray-600 leading-tight">
                    <p className="font-medium">Years of</p>
                    <p className="font-medium">Experience</p>
                  </div>
                </div>

                {/* Divider Line */}
                {/* 
                  ADJUST DIVIDER HERE:
                  - h-12 = height
                  - w-px = width (1px)
                  - bg-gray-300 = color
                  - hidden sm:block = hide on mobile, show on tablet+
                */}
                <div className="hidden sm:block h-12 w-px bg-gray-300"></div>

                {/* Data Centers */}
                <div className="flex items-end-safe gap-1">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    3
                  </h2>
                  <div className="text-sm text-gray-600 leading-tight">
                    <p className="font-medium">Data Centers</p>
                    <p className="font-medium">Deployed</p>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="hidden sm:block h-12 w-px bg-gray-300"></div>

                {/* Active Courses */}
                <div className="flex items-end-safe gap-2">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    10
                  </h2>
                  <div className="text-sm text-gray-600 leading-tight">
                    <p className="font-medium">Total Active</p>
                    <p className="font-medium">Courses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Section */}
            {/* 
              ADJUST RIGHT SIDE CONTAINER HERE:
              - lg:h-[600px] = height on large screens
              - Increase/decrease 600px for taller/shorter image area
            */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              {/* Decorative Background Circle */}
              {/* 
                ADJUST BACKGROUND CIRCLE HERE:
                - w-[500px] h-[500px] = circle size
                - opacity-20 = transparency
                - blur-3xl = blur amount
                - from-blue-300 via-blue-400 to-blue-500 = gradient colors
              */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
              </div>

              {/* Main Content Container */}
              {/* 
                ADJUST IMAGE CONTAINER SIZE HERE:
                - max-w-lg = maximum width
                Change to max-w-md (smaller) or max-w-xl (larger)
              */}
              <div className="relative w-full max-w-sm">
                {/* 95% Passing Rate Badge */}
                {/* 
                  ADJUST BADGE POSITION HERE:
                  - -top-4 -left-4 = position offset from top-left
                  - lg:left-0 = position on large screens
                  - z-20 = layer order (higher = on top)
                */}
                <div className="absolute top-45 left-4 lg:-left-30 bg-[#EBF5FD] rounded-2xl shadow-2xl px-4 py-4 z-20 hover:scale-105 transition-transform">
                  <div className="flex justify-center items-center gap-3">
                    {/* 95% text */}
                    <p className="text-4xl font-bold text-[#1775EE]">95%</p>

                    {/* Star Rating with Passing Rate below */}
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

                {/* Main Image Container */}
                {/* 
                  ADJUST IMAGE CONTAINER HERE:
                  - mt-16 = top margin (space from badge)
                  - rounded-[3rem] = border radius
                  - aspect-[4/5] = aspect ratio (width:height)
                  
                  REPLACE IMAGE PATH:
                  Change "/path/to/your/hero-image.jpg" to your actual image
                */}
                <div className="relative mt-16 ">
                  <img
                    src="/src/assets/maamgrace2.png"
                    alt="Professional holding laptop with ICT solutions"
                    className="w-full h-auto aspect-[4/5] object-cover"
                  />
                </div>

                {/* Floating Icon Decorations */}
                {/* 
                  ADJUST FLOATING ICONS POSITION HERE:
                  - top-20, top-36, top-52 = vertical position
                  - -right-2, -right-4 = horizontal position
                  - lg:right-4, lg:right-0 = position on large screens
                  - p-3 = icon padding (size)
                  - bg-blue-500 = background color
                */}
                <div className="absolute top-20 -right-2 lg:right-4 bg-blue-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-36 -right-4 lg:right-0 bg-blue-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-52 -right-2 lg:right-4 bg-blue-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>

                {/* Certification Achievement Card */}
                {/* 
                  ADJUST ACHIEVEMENT CARD HERE:
                  - -bottom-4 -right-4 = position offset
                  - max-w-xs = maximum width
                  - p-5 = padding inside card
                  - rounded-2xl = border radius
                  
                  REPLACE AVATAR IMAGE:
                  Change "/path/to/avatar.jpg" to your actual avatar image

                  top-45 left-4 lg:-left-30
                */}

                <div className="absolute bottom-10 -right-4 lg:-right-30 bg-[#EBF5FD] rounded-3xl shadow-2xl px-4 py-2 max-w-65 z-20 hover:scale-105 transition-transform">
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
                  {/* 
                    ADJUST BUTTON HERE:
                    - mt-4 = top margin
                    - py-2.5 = vertical padding
                    - bg-blue-600 = background color
                  */}
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
        <div className="mx-[7.438rem] space-y-5">
          <div>
            <div className="flex flex-row justify-center items-center space-x-2 font-bold text-3xl">
              <h3 className="">Trusted by Our</h3>
              <h3 className="text-[#1775EE]">Customers & Partners</h3>
            </div>
            <p>We collaborate with recognized technology partners to ensure quality, reliability, and up-to-date ICT solutions.</p>
          </div>

          {/* Partners Logo (Should be scrollable horizontally) */}
          <Partners />
        </div>
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
