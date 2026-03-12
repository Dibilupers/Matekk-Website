import EnrollNowButton from "../ui/EnrollNowButton";

export default function TrainingTemplateFooter({ bgImage, description }) {
  return (
    <div
      className="relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col items-center gap-2.5 overflow-hidden mt-10 min-h-[300px]"
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
            "linear-gradient(to right, #C2DDFF70, #FFFFFF00 67%, #CDE3FF70)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-2.5 mt-7.5 lg:mt-[5vh]">
        <h1 className="text-center">
          <span className="text-[#ffffff]">Start Learning</span>{" "}
          <span className="text-[#1775EE]">Today</span>
        </h1>

        <p className="lg:w-[30vw] xl:w-[35vw] text-center text-white">
          {description}
        </p>
        <div className="w-fit text-sm">
          <EnrollNowButton />
        </div>
      </div>
    </div>
  );
}
