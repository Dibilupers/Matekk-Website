import Navbar from "../components/navbar/navbar";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="mx-[7.438rem] flex flex-col">
        {/* Left Side */}
        <div >
          {/* Subtitle, title, description */}
          <div>
            <h5>ICT & Engineering</h5>
            <h1>Empowering Businesses and Individuals Through ICT Excellence</h1>
            <p>Cutting-edge ICT and Engineering Solutions. Industry-relevant Training. Built on over a decade of expertise.</p>
          </div>

          {/* Buttons */}
          <div>
            {/* Will be changed to a components later on */}
            <button>Explore Our Solution</button>
            <button>View Training Programs</button>
          </div>

          {/* Experiences */}
          <div className="flex flex-row items-center">
            <div className="flex flex-row">
              <h1>13+</h1>
              <p>Years of Experience</p>
            </div>
            {/* Line */}
            <div className="h-4 w-0.5 bg-black"></div>
            <div className="flex flex-row">
              <h1>3</h1>
              <p>Data Centers Deployed</p>
            </div>
            {/* Line */}
            <div className="h-4 w-0.5 bg-black"></div>
            <div className="flex flex-row">
              <h1>10</h1>
              <p>Total Active Courses</p>
            </div>
          </div>
        </div>

        {/* Right Side (Images and icons) */}
        <div>
          <img></img>
        </div>
      </section>

      {/* Trusted by our customers & clients */}
      <section id="" className="flex bg-[#EBF5FD] justify-center items-center text-center p-10">
        {/* Title and description */}
        <div className=" ml-[7.438rem]">
          <div className="flex flex-row justify-center items-center space-x-1">
            <h3>Trusted by Our</h3> 
            <h3>Customers & Partners</h3>
          </div>
          <p>We collaborate with recognized technology partners to ensure quality, reliability, and up-to-date ICT solutions.</p>
        </div>

        {/* Partners Logo (Should be scrollable horizontally) */}
        <div>
          {/* Image container (white bg in the design) */}
          <div>
            {/* Image itself */}
            <img></img>
          </div>
        </div>
      </section>

      {/* Services We Provide to Elevate Your Business */}
      <section id="">
        
      </section>

      {/* Why Choose MGKK ICT Services */}
      <section></section>

      {/* Our Working Progress */}
      <section></section>

      {/* Our Featured Solutions and Training */}
      <section></section>

      {/* Hear from Our Successful Learners */}
      <section></section>

      {/* About the Company */}
      <section></section>

      {/* Frequently Asked Questions */}
      <section></section>

      {/* Contact Us */}
      <section></section>

    </main>
  );
}
