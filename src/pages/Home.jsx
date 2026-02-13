import Partners from "../components/partners/partners";
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

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
          <Partners/>
        </div>
      </section>

      {/* Services We Provide to Elevate Your Business */}
      <section id="" className="flex flex-col bg-white justify-center items-center text-center py-10">
        <div className="mx-[7.438rem]">
          <div>
            <div className="flex flex-row justify-center items-center space-x-1">
              <h3>Services We Provide to</h3>
              <h3>Elevate Your Business</h3>
            </div>
            <p>MGKK Information Communication Technology Services delivers end-to-end ICT and engineering solutions alongside comprehensive training programs designed to meet industry demands and support digital transformation.</p>
          </div>

          {/* Solutions (Scrollable horizontally from left to right) */}
          <div className="flex flex-row text-left">
            {/* Title, description, buttons left and right */}
            <div>
              <div>
                <h5>Solutions</h5>
                <h4>End-to-End ICT & Engineering Solutions</h4>
                <p>We provide ICT consultancy and engineering solutions focused on planning, building, operating, optimizing, and testing technology systems.</p>
              </div>
              <div>
                <button></button>
                <button></button>
              </div>
            </div>

            <div>
              <h4>ICT Consultancy</h4>
              <p>MGKK provides ICT consultancy services using the Plan, Build, Operate, Optimize, and Test (PBOOT) approach to support the design, implementation, and improvement of ICT infrastructures.</p>
              <Link to="">See More</Link>
            </div>

            <div>
              <h4>Web and Software Development</h4>
              <p>We develop web and software solutions that support organizational requirements, using modern technologies to deliver reliable and functional digital systems.</p>
              <Link to="">See More</Link>
            </div>
          </div>

          {/* Training (Scrollable horizontally from right to left) */}
          <div className="flex flex-row-reverse text-right">
            {/* Title, description, buttons left and right */}
            <div>
              <div>
                <h5>Training</h5>
                <h4>ICT Training & Skills Development</h4>
                <p>We offers face-to-face and online training programs designed to equip individuals and organizations with cutting-edge technological knowledge and practical skills.</p>
              </div>
              <div>
                <button></button>
                <button></button>
              </div>
            </div>

            <div>
              <h4>Cybersecurity Training</h4>
              <p>Our cybersecurity training covers cybersecurity fundamentals, ethical hacking, vulnerability assessment and penetration testing (VAPT), and risk management.</p>
              <Link to="">See More</Link>
            </div>

            <div>
              <h4>Cloud Computing Training</h4>
              <p>We provide cloud computing training on platforms such as AWS, Microsoft Azure, and Google Cloud through face-to-face and online programs.</p>
              <Link to="">See More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MGKK ICT Services */}
      <section id="" className="flex flex-row bg-[#EBF5FD] justify-center items-center text-center py-10">
        {/* Title and description */}
        <div className="mx-[7.438rem] flex flex-row">
          <div>
            <div>
              <div className="flex flex-row justify-center items-center space-x-1">
                <h3>Why Choose</h3>
                <h3>MGKK ICT Services</h3>
              </div>
              <p>We collaborate with recognized technology partners to ensure quality, reliability, and up-to-date ICT solutions.</p>
            </div>

            {/* Image handshaking */}
            <div><img></img></div>
          </div>

          <div className="text-left">
            <div>
              <h4>Experience</h4>
              <p>Over a decade of providing ICT and engineering solutions and professional training since our establishment in 2013.</p>
            </div>
            <div>
              <h4>Expertise</h4>
              <p>Led by a Professional Electronics Engineer and supported by certified engineers, technicians, and instructors with strong industry and academic backgrounds.</p>
            </div>
            <div>
              <h4>Quality Training</h4>
              <p>We offer face-to-face and online training programs aligned with industry standards and globally recognized certifications.</p>
            </div>
            <div>
              <h4>End-to-End Approach</h4>
              <p>We follow the Plan, Build, Operate, Optimize, and Test (PBOOT) methodology to ensure structured and effective delivery of ICT solutions.</p>
            </div>
            <div>
              <h4>Innovation & Integrity</h4>
              <p>Our work is guided by core values that emphasize innovation, ethical practices, excellence, collaboration, and continuous improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Working Progress */}
      <section>
        <div className="mx-[7.438rem] p-4">
          <div className="text-right">
            <div className="flex flex-row justify-end items-center space-x-1">
              <h3>Our</h3>
              <h3>Working Progress</h3>
            </div>
            <p>MGKK Information Communication Technology Services delivers end-to-end ICT and engineering solutions alongside comprehensive training programs designed to meet industry demands and support digital transformation.</p>
          </div>


        </div>
      </section>

      {/* Our Featured Solutions and Training */}
      <section id="" className="flex bg-[#EBF5FD] justify-center items-center text-center py-10">
        {/* Title and description */}
        <div className="mx-[7.438rem]">
          <div>
            <div className="flex flex-row justify-center items-center space-x-1">
              <h3>Our Featured</h3>
              <h3>Solutions and Training</h3>
            </div>
            <p>MGKK Information Communication Technology Services delivers end-to-end ICT and engineering solutions alongside comprehensive training programs designed to meet industry demands and support digital transformation.</p>
          </div>

          {/* Featured Services */}
          <div className="w-full h-7">
            {/* Should be the first image of featured service */}
            <div>
              {/* When hovered */}
              <div className="flex flex-row">
                {/* Titile and description */}
                <div>
                  <h4>Network and Security Infrastructure Projects</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                </div>

                {/* Arrow */}
                <img></img>
              </div>
            </div>

            {/* Second featured service image */}
            <div></div>

            {/* Third featured service image */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Hear from Our Successful Learners */}
      <section id="" className="flex flex-col justify-center items-center text-center py-10">
        <div className="mx-[7.438rem] flex flex-col">
          {/* Title and description */}
          <div className="flex flex-row">
            <div className="text-left">
              <div className="flex flex-row justify-start items-center space-x-1">
                <h3>Hear From Our</h3>
                <h3>Successful Learners</h3>
              </div>
              <p>MGKK ICT Services has successfully delivered critical ICT infrastructure and training solutions for government agencies and private organizations, maintaining a strong focus on quality, reliability, and customer satisfaction.</p>
            </div>
            {/* Contact Us Button */}
            <button>Contact Us</button>
          </div>


          <div className="flex flex-row space-x-3">
            {/* First Feedback */}
            <div className="bg-blue-100">
              <div>
                <img></img>
                <div>
                  <h4>Michael Lewis Bullas Abalos</h4>
                  <p>CCNA Passer - Jan. 2026</p>
                  {/* Stars */}
                  <img></img>
                </div>
              </div>
              <p>I passed my CCNA thanks to Converge Training and I.T. Services. Their complete materials, hands-on training, and supportive staff helped me gain the confidence to succeed. Special thanks to Engr. Mark Anthony Melendres and the entire Converge team enrolling here is truly worth the value.</p>
            </div>

            {/* Second Feedback */}
            <div className="bg-blue-100">
              <div>
                <img></img>
                <div>
                  <h4>Michael Lewis Bullas Abalos</h4>
                  <p>CCNA Passer - Jan. 2026</p>
                  {/* Stars */}
                  <img></img>
                </div>
              </div>
              <p>I passed my CCNA thanks to Converge Training and I.T. Services. Their complete materials, hands-on training, and supportive staff helped me gain the confidence to succeed. Special thanks to Engr. Mark Anthony Melendres and the entire Converge team enrolling here is truly worth the value.</p>
            </div>

            {/* Third Feedback */}
            <div className="bg-blue-100">
              <div>
                <img></img>
                <div>
                  <h4>Michael Lewis Bullas Abalos</h4>
                  <p>CCNA Passer - Jan. 2026</p>
                  {/* Stars */}
                  <img></img>
                </div>
              </div>
              <p>I passed my CCNA thanks to Converge Training and I.T. Services. Their complete materials, hands-on training, and supportive staff helped me gain the confidence to succeed. Special thanks to Engr. Mark Anthony Melendres and the entire Converge team enrolling here is truly worth the value.</p>
            </div>
          </div>
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
