import Navbar from "../components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white h-screen w-screen">
        <section>
          <div className="ml-[6.354vw] space-y-[1vh]">
            <p className="inline-flex text-black text-sm font-inter bg-[#EBF5FD] items-center justify-center px-4 py-2 border-0 rounded-full">
              ICT & Engineering
            </p>
            <p className="font-rubik font-bold text-[2.5rem] w-[35vw]">
              Empowering Businesses and Individuals{" "}
              <span className="text-[#1775EE]">Through ICT Excellence</span>
            </p>
            <p className="font-poppins text-[0.938rem] w-[30vw]">
              Cutting-edge ICT and Engineering Solutions. Industry-relevant
              Training. Built on over a decade of expertise.
            </p>
            <button className="bg-[#1775EE] text-white text-[0.938rem] font-rubik px-4 py-2 rounded-full mt-4 hover:bg-blue-600">
              Explore Our Solutions{" "}
            </button>
            <button className="bg-white-500 text-[#1775EE] text-[0.938rem] font-rubik px-4 py-2 rounded-full border-2 border-[#1775EE] mt-4 hover:bg-gray-600 ml-4">
              View Training Programs
            </button>
          </div>

          <div className="flex space-x-[2.604vw] mt-[6.9vh] ml-[6.354vw]">
            <div className="flex items-center">
              <p className="font-poppins font-bold text-[2.25rem]">13+</p>
              <p className="font-rubik text-[0.938rem] w-[5vw] ml-[0.677vw]">
                Years of Experience
              </p>
            </div>
            <div className="border-l-2 border-black ml-[1.302vw]" />
            <div className="flex items-center">
              <p className="font-poppins font-bold text-[2.25rem]">3</p>
              <p className="font-rubik text-[0.938rem] w-[6vw] ml-[0.677vw]">
                Data Centers Deployed
              </p>
            </div>
            <div className="border-l-2 border-black ml-[1.302vw]" />
            <div className="flex items-center">
              <p className="font-poppins font-bold text-[2.25rem]">10</p>
              <p className="font-rubik text-[0.938rem] w-[6vw] ml-[0.677vw]">
                Total Active Courses
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
