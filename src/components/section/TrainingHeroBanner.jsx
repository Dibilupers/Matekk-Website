import Button from "../ui/button";
import EnrollNowButton from "../ui/EnrollNowButton";

export default function HeroBanner({ bgImage, category, title, description }) {
  return (
    <>
      {/* ==================== HERO BANNER ====================*/}
      <section className="relative pl-8 py-16 rounded-2xl shadow-lg flex flex-col gap-3 overflow-hidden min-h-62.5">
        {/* ==================== HERO BANNER - Image ====================*/}
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
        {/* Hero Background Image Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#cbddf5] via-[#cbddf5ce] to-transparent"></div>
 
        {/* ==================== HERO BANNER - Text Content ====================*/}
        <div className="relative z-10 flex flex-col gap-3 pl-1 sm:pl-8">
          {/* Course Category */}
          <h6 className="w-fit px-4 py-2 text-[#1775EE] bg-blue-50 rounded-full">
            {category}
          </h6>

          {/* ====== Course Title and Description ======*/}
          <div className="space-y-1">
            {/* Course title */}
            <h1 className="text-[#1775EE] max-w-90 md:max-w-md 2xl:max-w-xl">{title}</h1>

            {/* Course description */}
            <p className="max-w-65 sm:max-w-sm md:max-w-md lg:max-w-lg">{description}</p>
          </div>

          {/* ====== Hero Button ====== */}
          <div className="flex flex-row gap-2.5">
            {/* Enroll Now Button - When clicked, opens a modal */}
            <EnrollNowButton />
            {/* Learn More Button - When clicked will scroll down to proceed on the other sections of the page */}
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
    </>
  );
}
