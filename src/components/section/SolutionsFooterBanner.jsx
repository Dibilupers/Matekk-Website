import Button from "../ui/button";

export default function SolutionsFooterBanner({ bgImage, title, highlightText, description }) {
  return (
    <div className="relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col items-center gap-2.5 overflow-hidden mt-10 min-h-[300px] mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2.5 mt-7.5 lg:mt-[5vh] px-10 lg:px-70">
        <h1 className="text-center">
          <span className="text-white">{title} </span>
          <span className="text-[#1775EE]">{highlightText}</span>
        </h1>

        <p className="lg:w-[30vw] xl:w-[35vw] text-center text-white">
          {description}
        </p>

        <Button
          title="Contact Us"
          type="none"
          buttonCustomStyle="bg-[#1775EE] text-white hover:bg-white hover:text-[#1775EE] transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-4 mt-4"
          btnFunc={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      </div>
    </div>
  );
}