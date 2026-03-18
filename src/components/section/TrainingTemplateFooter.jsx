import EnrollNowButton from "../ui/EnrollNowButton";

export default function TrainingTemplateFooter({ bgImage, description }) {
  return (
    <section
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-5">
        <div>
          <h3 className="text-[#ffffff] text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)]">Start Learning <span className="text-[#1775EE]">Today</span></h3>
          <p className="text-white text-shadow-[0px_4px_8px_rgba(0,0,0,0.5)] max-w-80">
            {description}
          </p>
        </div>
        <EnrollNowButton />
      </div>
    </section>
  );
}
