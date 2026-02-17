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
        {/* 
          ADJUST SECTION CONTAINER:
          - mx-auto max-w-7xl = section width (change max-w-7xl to max-w-6xl for narrower, max-w-screen-2xl for wider)
          - px-4 sm:px-6 lg:px-8 = side padding
          - py-12 lg:py-8 = top/bottom padding (increase for more space)
        */}
        <div className="mx-[7.438rem]">
          {/* 
            ADJUST GRID LAYOUT:
            - gap-8 lg:gap-16 = space between left and right columns
            - grid-cols-1 lg:grid-cols-2 = 1 column mobile, 2 columns desktop
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ==================== LEFT SIDE - CONTENT ==================== */}
            {/* 
              ADJUST LEFT COLUMN:
              - space-y-6 lg:space-y-4 = vertical spacing between elements (increase for more space)
              - text-center lg:text-left = centered on mobile, left-aligned on desktop
              
              TO CHANGE MOBILE ALIGNMENT:
              - text-center = center on mobile (CURRENT)
              - text-left = left-align on mobile
              - text-right = right-align on mobile
            */}
            <div className="space-y-6 lg:space-y-4 text-left lg:text-left">
              {/* ==================== SUBTITLE BADGE ==================== */}
              {/* 
                ADJUST BADGE:
                - px-5 py-2.5 = padding (make bigger/smaller)
                - bg-blue-50 = background color
                - text-blue-600 = text color
                - text-sm = font size (text-xs for smaller, text-base for larger)
                - rounded-full = pill shape
              */}
              <div className="inline-block">
                <span className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                  ICT & Engineering
                </span>
              </div>

              {/* ==================== MAIN HEADING ==================== */}
              {/* 
                ADJUST HEADING:
                - text-4xl sm:text-5xl lg:text-5xl = font sizes (mobile/tablet/desktop)
                  * Change to text-3xl sm:text-4xl lg:text-5xl for smaller
                  * Change to text-5xl sm:text-6xl lg:text-7xl for larger
                - leading-tight = line height (leading-snug for more space, leading-none for tighter)
                - text-gray-900 = main text color
                - text-[#1775EE] = blue text color (change hex code for different color)
              */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-900">
                Empowering Businesses and Individuals{" "}
                <span className="text-[#1775EE]">Through ICT Excellence</span>
              </h1>

              {/* ==================== DESCRIPTION ==================== */}
              {/* 
                ADJUST DESCRIPTION:
                - text-base lg:text-xl = font size (text-sm for smaller, text-2xl for larger)
                - leading-relaxed = line height
                - max-w-lg = maximum width (max-w-md for narrower, max-w-2xl for wider)
                - mx-auto lg:mx-0 = centered on mobile, left-aligned on desktop
                - text-gray-600 = text color
              */}
              <p className="text-gray-600 text-base lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                Cutting-edge ICT and Engineering Solutions. Industry-relevant
                Training. Built on over a decade of expertise.
              </p>

              {/* ==================== CTA BUTTONS ==================== */}
              {/* 
                ADJUST BUTTONS CONTAINER:
                - gap-4 = space between buttons (gap-2 for closer, gap-6 for wider)
                - justify-center lg:justify-start = centered on mobile, left-aligned on desktop
                - flex-col sm:flex-row = stacked on mobile, side-by-side on tablet+
                
                TO CHANGE MOBILE ALIGNMENT:
                - justify-center = center buttons (CURRENT)
                - justify-start = left-align buttons
                - justify-end = right-align buttons
              */}
              <div className="flex sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                {/* PRIMARY BUTTON */}
                {/* 
                  ADJUST PRIMARY BUTTON SIZE:
                  MOBILE: px-6 py-3 (smaller)
                  DESKTOP: sm:px-8 sm:py-4 (original size)
                  - Change px-6 to px-4 for even smaller on mobile
                  - Change px-6 to px-8 to keep same size on mobile
                */}
                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Explore Our Solutions
                </button> 

                {/* SECONDARY BUTTON */}
                {/* 
                ADJUST SECONDARY BUTTON SIZE:
                MOBILE: px-6 py-3 (smaller)
                DESKTOP: sm:px-8 sm:py-4 (original size)
              */}
                <button className="px-3 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base">
                  View Training Programs
                </button>
              </div>

              {/* ==================== STATS SECTION ==================== */}
              {/* 
                ADJUST STATS CONTAINER:
                - gap-6 lg:gap-8 = space between stat items
                - pt-6 = top padding/margin (pt-4 for less space, pt-8 for more)
                - justify-center lg:justify-start = centered on mobile, left-aligned on desktop
                - flex-wrap = allows items to wrap to next line
                
                TO CHANGE MOBILE ALIGNMENT:
                - justify-center = center stats (CURRENT)
                - justify-start = left-align stats
                - justify-between = space stats evenly
              */}
              <div className="flex flex-nowrap justify-center lg:justify-start items-center gap-4 lg:gap-8 pt-6">

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

            {/* ==================== RIGHT SIDE - VISUAL SECTION ==================== */}
            {/* 
              VISIBILITY CONTROL (IMPORTANT!):
              - hidden lg:flex = HIDDEN on mobile, VISIBLE on desktop
              
              TO SHOW ON MOBILE:
              Remove "hidden" and change to just "flex lg:flex"
              
              TO HIDE ON DESKTOP:
              Change to "flex lg:hidden"
              
              ADJUST CONTAINER:
              - lg:h-[600px] = height on desktop (change 600px to 500px for shorter, 700px for taller)
            */}
            <div className="hidden lg:flex relative lg:h-[600px] items-center justify-center">
              {/* ==================== DECORATIVE BACKGROUND CIRCLE ==================== */}
              {/* 
                ADJUST BACKGROUND CIRCLE:
                - w-[500px] h-[500px] = circle size (change to 400px for smaller, 600px for larger)
                - opacity-20 = transparency (opacity-10 for more transparent, opacity-30 for less)
                - blur-3xl = blur amount (blur-2xl for less blur, blur-[100px] for more)
                - from-blue-300 via-blue-400 to-blue-500 = gradient colors
                
                TO REMOVE CIRCLE:
                Delete this entire div or comment it out
              */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
              </div>

              {/* ==================== MAIN CONTENT CONTAINER ==================== */}
              {/* 
                ADJUST IMAGE AREA SIZE:
                - max-w-sm = maximum width (384px)
                  * max-w-xs for smaller (320px)
                  * max-w-md for medium (448px)
                  * max-w-lg for larger (512px)
                  * max-w-xl for even larger (576px)
              */}
              <div className="relative w-full max-w-md">
                {/* ==================== 95% PASSING RATE BADGE ==================== */}
                {/* 
                  ADJUST BADGE POSITION:
                  - top-45 = vertical position from top (top-40 for higher, top-50 for lower)
                  - left-4 lg:-left-30 = horizontal position
                    * left-0 for far left
                    * left-8 for more right
                    * -left-20 for more left on desktop
                  - z-20 = layer order (higher number = on top)
                  
                  ADJUST BADGE STYLE:
                  - bg-[#EBF5FD] = background color (change hex code)
                  - px-4 py-4 = padding (px-6 py-6 for larger)
                  - rounded-2xl = corner radius (rounded-xl for less, rounded-3xl for more)
                  - shadow-2xl = shadow size
                */}
                <div className="absolute top-45 left-4 lg:-left-30 bg-[#EBF5FD] rounded-2xl shadow-2xl px-4 py-4 z-20 hover:scale-105 transition-transform">
                  <div className="flex justify-center items-center gap-3">
                    {/* 
                      ADJUST 95% TEXT:
                      - text-4xl = font size (text-3xl for smaller, text-5xl for larger)
                      - text-[#1775EE] = color (change hex code)
                    */}
                    <p className="text-4xl font-bold text-[#1775EE]">95%</p>

                    {/* Star Rating with Passing Rate below */}
                    <div>
                      {/* 
                        ADJUST STARS:
                        - gap-1 = space between stars (gap-0.5 for closer, gap-2 for wider)
                        - w-4 h-4 = star size (w-3 h-3 for smaller, w-5 h-5 for larger)
                        - text-yellow-400 = star color
                      */}
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
                      {/* 
                        ADJUST "PASSING RATE" TEXT:
                        - text-xs = font size (text-[10px] for smaller, text-sm for larger)
                        - text-gray-500 = color
                      */}
                      <p className="text-xs text-gray-500 font-medium">
                        Passing Rate
                      </p>
                    </div>
                  </div>
                </div>

                {/* ==================== MAIN IMAGE CONTAINER ==================== */}
                {/* 
                  ADJUST IMAGE SPACING:
                  - mt-16 = top margin/space from badge above (mt-12 for less, mt-20 for more)
                  
                  REPLACE IMAGE:
                  Change src="/src/assets/maamgrace2.png" to your image path
                  
                  ADJUST IMAGE:
                  - aspect-[4/5] = aspect ratio (width:height)
                    * aspect-square for 1:1
                    * aspect-[3/4] for different ratio
                  - object-cover = how image fits (object-contain to show full image)
                */}
                <div className="relative mt-16">
                  <img
                    src="/src/assets/maamgrace2.png"
                    alt="Professional holding laptop with ICT solutions"
                    className="w-full h-auto aspect-[4/5] object-cover"
                  />
                </div>

                {/* ==================== FLOATING ICON DECORATIONS ==================== */}
                {/* 
                  ADJUST FLOATING ICONS:
                  - Position: Change top-XX and -right-XX values
                  - Size: Change p-3 (padding) to p-2 (smaller) or p-4 (larger)
                  - Color: Change bg-blue-500 to different color
                  - Icon size: Change w-6 h-6 to w-5 h-5 (smaller) or w-7 h-7 (larger)
                  
                  TO REMOVE AN ICON:
                  Delete or comment out the entire div
                */}

                {/* ICON 1 - TOP */}
                {/* 
                  ADJUST POSITION: Change top-20 (up/down) and -right-2 lg:right-4 (left/right)
                  ADJUST SIZE: Change p-3 (padding) and w-6 h-6 (icon size)
                  ADJUST COLOR: Change bg-blue-500
                */}
                <div className="absolute top-28 right-2 lg:right-15 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Settings className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                {/* ICON 2 - MIDDLE */}
                {/* 
                  ADJUST POSITION: Change top-36 (up/down) and right-0 lg:right-0 (left/right)
                  ADJUST SIZE: Change p-2 (padding) and w-4 h-4 (icon size)
                  ADJUST COLOR: Change bg-blue-500
                */}
                <div className="absolute top-50 -right-2 lg:-right-5 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Tag className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                {/* ICON 3 - BOTTOM */}
                {/* 
                  ADJUST POSITION: Change top-52 (up/down) and right-0 lg:right-4 (left/right)
                  ADJUST SIZE: Change p-2 (padding) and w-4 h-4 (icon size)
                  ADJUST COLOR: Change bg-blue-500
                */}
                <div className="absolute top-78 right-0 lg:-right-14 bg-[#7DB6FF] p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>

                {/* ==================== CERTIFICATION ACHIEVEMENT CARD ==================== */}
                {/* 
                  ADJUST CARD POSITION:
                  - bottom-10 = position from bottom (bottom-8 for higher, bottom-12 for lower)
                  - -right-4 lg:-right-30 = position from right
                    * -right-2 for less left
                    * -right-6 for more left
                    * lg:-right-40 for more left on desktop
                  
                  ADJUST CARD STYLE:
                  - bg-[#EBF5FD] = background color (change hex)
                  - px-4 py-2 = padding (px-6 py-4 for larger)
                  - max-w-65 = maximum width
                  - rounded-3xl = corner radius
                  - shadow-2xl = shadow size
                  - z-20 = layer order
                */}
                <div className="absolute bottom-15 -right-4 lg:-right-20 bg-[#EBF5FD] rounded-xl shadow-2xl px-4 py-2 max-w-65 z-20 hover:scale-105 transition-transform">
                  <div className="flex items-start gap-3">
                    {/* 
                      REPLACE AVATAR IMAGE:
                      Change src="/src/assets/maamgrace.png" to your image
                      
                      ADJUST AVATAR SIZE:
                      - w-14 h-14 = size (w-12 h-12 for smaller, w-16 h-16 for larger)
                    */}
                    <img
                      src="/src/assets/maamgrace2.png"
                      alt="Clyde Nelson R."
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      {/* 
                        ADJUST NAME:
                        - text-sm = font size (text-xs for smaller, text-base for larger)
                        - text-[#1775EE] = color (change hex)
                      */}
                      <h4 className="font-bold text-[#1775EE] text-sm truncate">
                        Clyde Nelson R.
                      </h4>
                      {/* 
                        ADJUST DESCRIPTION:
                        - text-xs = font size
                        - text-gray-600 = color
                        - mt-0.3 = top margin (mt-0.5 for more, mt-0 for less)
                      */}
                      <p className="text-xs text-gray-600 mt-0.3">
                        just passed the CCNA certification!
                      </p>
                    </div>
                  </div>
                  {/* 
                    ADJUST BUTTON:
                    - mt-2 = top margin (mt-3 for more space, mt-1 for less)
                    - py-2.5 = vertical padding (py-2 for smaller, py-3 for larger)
                    - bg-[#1775EE] = background color
                    - hover:bg-blue-700 = hover color
                    - text-sm = font size
                    - rounded-xl = corner radius
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
