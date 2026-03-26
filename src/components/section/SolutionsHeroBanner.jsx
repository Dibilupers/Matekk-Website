import Button from "../ui/button";
import InquireNowButton from "../ui/InquireNowButton";

export default function SolutionsHeroBanner({
  bgImage,
  category,
  title,
  description,
}) {
  return (
    <section className="relative items-center py-18 px-8 rounded-2xl shadow-lg flex flex-col gap-2.5 overflow-hidden min-h-62.5 mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-5">
        <div className="flex flex-col justify-center items-center text-center space-y-2">
          <h6 className="w-fit px-5 py-2 text-[#1775EE] bg-blue-50 rounded-full">
            {category}
          </h6>
          <div className="flex flex-col justify-center items-center text-center text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] space-y-1 text-white">
            <h1 className="max-w-5xl">{title}</h1>
            <p className="max-w-3xl">{description}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-center items-center gap-2.5 w-full">
          {/* ── Directly open modal at solutions step 1 ── */}
          <InquireNowButton buttonCustomStyle="bg-[#1775EE] border border-[#1775EE] hover:border-[#0062E0] text-white shadow-lg hover:bg-[#0062E0] cursor-pointer w-fit text-sm rounded-full transition-all duration-300 active:scale-90 text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] py-3 px-[5%] md:py-2 md:px-4" />

          <Button
            title="Learn More"
            type="none"
            buttonCustomStyle="text-blue-600 border border-blue-600 hover:bg-[#0062E0] hover:border-[#0062E0] hover:text-white transition-all duration-300"
            btnFunc={() => {
              document
                .getElementById("description")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>
    </section>
  );
}
