import Button from "../ui/button";

export default function SolutionsFooterBanner({ bgImage, title, highlightText, description }) {
  return (
    <div
      className="relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden min-h-75"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #C2DDFF99, #FFFFFF00 67%, #C2DDFF99)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-1">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[#ffffff] text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-60 md:max-w-90 xl:max-w-full">{title} <span className="text-[#1775EE]">{highlightText}</span></h3>
          <p className="text-white text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-60 md:max-w-90 xl:max-w-full">
            {description}
          </p>
        </div>
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
