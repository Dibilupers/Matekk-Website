import InquireNowButton from "../ui/InquireNowButton";

export default function SolutionsFooterBanner({
  bgImage,
  title,
  highlightText,
  description,
}) {
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
          <h3 className="text-[#ffffff] text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-60 md:max-w-90 xl:max-w-full">
            {title} <span className="text-[#1775EE]">{highlightText}</span>
          </h3>
          <p className="text-white text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-60 md:max-w-90 xl:max-w-full">
            {description}
          </p>
        </div>
        <InquireNowButton
          title="Inquire Now"
          type="none"
          buttonCustomStyle="bg-[#1775EE] border border-[#1775EE] hover:border-[#0062E0] text-white shadow-lg hover:bg-[#0062E0] cursor-pointer w-fit text-sm rounded-full transition-all duration-300 active:scale-90 text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] py-3 px-[5%] md:py-2 md:px-4"
        />
      </div>
    </div>
  );
}
