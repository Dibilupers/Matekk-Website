
export default function TrainingTemplateFooter() {
    return (
        <div className="relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col items-center gap-2.5 overflow-hidden mt-10 min-h-[300px]">
                
        
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, #C2DDFF70, #FFFFFF00 67%, #CDE3FF70)",
                  }}
                />
        
                <div className="relative z-10 flex flex-col items-center gap-2.5 mt-7.5 lg:mt-[5vh]">
                  {/* CHANGE: CTA heading */}
                  <h1 className="text-center">
                    <span className="text-[#ffffff]">Start Learning</span>{" "}
                    <span className="text-[#1775EE]">Today</span>
                  </h1>
        
                  {/* CHANGE: CTA description */}
                  <p className="lg:w-[30vw] xl:w-[35vw] text-center text-white">
                    Build essential networking knowledge and prepare for the CCNA
                    200-901 v1.1 exam through instructor-led, hands-on training.
                  </p>
        
                  <button
                    title="Enroll Now"
                    type="none"
                    buttonCustomStyle="bg-[#1775EE] text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-4 mt-4"
                    btnFunc={() => {
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                </div>
              </div>
    );
}