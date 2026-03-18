import Button from "../ui/button";

export default function SolutionsHeroBanner({
  bgImage,
  category,
  title,
  description,
}) {
  return (
    <section className="relative items-center py-18 rounded-2xl shadow-lg flex flex-col gap-2.5 overflow-hidden min-h-62.5  mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>{" "}

      {/* Content */}
      <div className="relative justify-center items-center text-center z-10 flex flex-col space-y-3">
        {/* Category badge */}
        <div className="flex flex-col justify-center items-center text-center space-y-2">
          <h6 className="w-fit px-5 py-2 text-[#1775EE] bg-blue-50 rounded-full">
            {category}
          </h6>

          {/* Title and description */}
          <div className="flex flex-col justify-center items-center text-center text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] ">
            <h1 className="text-white">{title}</h1>
            <p className="text-white max-w-lg">{description}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2.5 mt-1">
          <Button
            title="Contact Us"
            type="none"
            buttonCustomStyle="bg-[#1775EE] text-white hover:bg-[#0062E0] transition-all duration-300 shadow-lg px-6 py-3"
            btnFunc={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
          <Button
            title="Learn More"
            type="none"
            buttonCustomStyle="text-blue-600 border border-blue-600 hover:bg-[#0062E0] hover:border-[#0062E0] hover:text-white transition-all duration-300"
            btnFunc={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>
    </section>
  );
}
