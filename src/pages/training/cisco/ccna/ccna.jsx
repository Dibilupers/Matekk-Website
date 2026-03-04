import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function CCNA() {
  return (
    <div className="flex flex-col py-10 h-full mx-[2.063rem] lg:mx-[7.438rem] scroll-mt-18">
      {/* Hero Banner */}
      <div className="p-8 pr-12 bg-linear-to-r from-[#C2DDFF] to-[#FFFFFF] rounded-2xl shadow-lg flex flex-col gap-2.5">
        <h6 className="w-fit text-sm text-[#1775EE] bg-[#EBF5FD] border border-[#EBF5FD] rounded-full py-[0.7vh] px-4 inline-flex text-center shadow-[0_0_3px_rgba(0,0,0,0.25)]">
          Cisco
        </h6>
        <h1 className="text-[#1775EE]">CCNA</h1>
        <p className="lg:w-[30vw] xl:w-[35vw]">
          Implementing and Administering Cisco Solutions (200-301 CCNA) v1.1 is
          a 120-minute exam that tests a candidate's knowledge and skills
          related to network fundamentals, network access, IP connectivity, IP
          services, security fundamentals, and automation and programmability.
        </p>
        <div className="flex gap-x-2.5 mt-5">
          <Button
            title="Enroll Now"
            type="none"
            buttonCustomStyle="bg-[#1775EE] text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            btnFunc={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
          <Button
            title="Learn More"
            type="none"
            buttonCustomStyle="bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
            btnFunc={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-8 mt-7.5 lg:mt-10">
        {/* LEFT: Main Content */}
        <div className="flex flex-col gap-y-8 flex-1">
          {/* About */}
          <div className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p>
              This course is designed to help learners prepare for the updated
              CCNA 201-301 v1.1 certification exam through instructor-led,
              face-to-face training. The program includes guided instruction and
              targeted learning activities that reinforce key networking
              concepts tested in the exam.
            </p>
            <p>
              The training covers essential topics related to network access,
              enterprise networking, security fundamentals, and basic automation
              concepts, with a focus on practical hhvh and exam readiness.
            </p>
          </div>

          {/* What You Will Learn */}
          <div className="flex flex-col gap-y-3">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <p className="flex items-center gap-2.5">
              <FaCircleCheck className="text-[#1775EE] shrink-0 w-10 h-10" />
              Network Access Concepts
            </p>
            <p className="flex items-center gap-2.5">
              <FaCircleCheck className="text-[#1775EE] shrink-0 w-10 h-10" />
              Automation and Programmability Basics
            </p>
          </div>

          {/* Course Content */}
          <div className="flex flex-col gap-y-3">
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            {/* your accordion/course content here */}
          </div>
        </div>

        {/* Sidebar Boxes */}
        <div className="flex flex-col gap-6 lg:w-72 xl:w-80 shrink-0">
          {/* Cert Badge */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center">
            {/* replace */}
            <img
              src="/assets/ccna-badge.png"
              alt="CCNA Badge"
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Job Opportunities */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5>Job Opportunities</h5>
            {[
              "Network Engineer",
              "Network Administrator",
              "Lorem Ipsum",
              "Lorem Ipsum",
            ].map((job) => (
              <p key={job} className="flex items-center gap-2.5">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-10 h-10" />
                {job}
              </p>
            ))}
          </div>

          {/* Target Learners */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5>Target Learners</h5>
            <p className="flex items-center gap-2.5">
              <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-10 h-10" />
              Beginners
            </p>
          </div>

          {/* Schedule */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5>Schedule</h5>
            {/* your schedule details */}
          </div>

          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5>Inclusions</h5>
            {/* your inclusions list */}
          </div>
        </div>
      </div>
      <div className="relative p-8 pr-12 rounded-2xl shadow-lg flex flex-col items-center gap-2.5 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/your-image.jpg')" }}
        />

        {/* Figma gradient overlay — C2DDFF at 70%, transparent at 67%, CDE3FF at 70% */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #C2DDFF70, #FFFFFF00 67%, #CDE3FF70)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2.5 mt-7.5 lg:mt-[3.5vh]">
          <h1 className="text-white">
            Start Learning <span className="text-[#1775EE]">Today</span>
          </h1>
          <p className="lg:w-[30vw] xl:w-[35vw] text-white text-center">
            Build essential networking knowledge and prepare for the CCNA
            201-301 v1.1 exam through instructor-led, hands-on training.
          </p>
          <Button
            title="Enroll Now"
            type="none"
            buttonCustomStyle="bg-[#1775EE] text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            btnFunc={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
