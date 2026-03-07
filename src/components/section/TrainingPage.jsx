import { useState } from "react";

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 000 4.5h12a2.25 2.25 0 000-4.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.798 49.798 0 00-6.093-.377 49.76 49.76 0 00-6.093.377.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75-6.75a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
  </svg>
);

const AccordionItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
          isOpen ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-50"
        }`}
      >
        <span className="font-medium text-sm pr-4">{item.courseHeading}</span>
        <span className={`flex-shrink-0 ${isOpen ? "text-white" : "text-blue-600"}`}>
          <ChevronIcon isOpen={isOpen} />
        </span>
      </button>
      {isOpen && item.headingContents && (
        <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          {item.headingContents.map((content, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 flex-shrink-0 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span>{content}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrainingPage = ({
  Category = "Networking",
  CourseTitle = "Lorem Ipsum Dolor Sit Amet",
  CourseDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  AboutThisCourse = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  WhatWillYouLearn = [
    "Lorem ipsum dolor sit amet consectetur",
    "Adipiscing elit sed do eiusmod tempor",
    "Incididunt ut labore et dolore magna",
  ],
  CourseContent = [
    {
      courseHeading: "Lorem ipsum dolor sit amet consectetur adipiscing",
      headingContents: [
        "Lorem ipsum (Dolor sit amet)",
        "Consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt",
        "Ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
        "Quis nostrud exercitation",
      ],
    },
    {
      courseHeading: "Dolor sit amet consectetur adipiscing elit tempor",
      headingContents: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit sed",
        "Do eiusmod tempor incididunt ut",
      ],
    },
    {
      courseHeading: "Sed do eiusmod tempor incididunt ut labore magna",
      headingContents: [
        "Ut enim ad minim veniam quis",
        "Nostrud exercitation ullamco",
        "Laboris nisi ut aliquip ex ea",
      ],
    },
    {
      courseHeading: "Ut labore et dolore magna aliqua enim minim",
      headingContents: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
      ],
    },
  ],
  JobOpportunities = ["Lorem Ipsum Specialist", "Dolor Sit Administrator", "Lorem Ipsum Engineer"],
  TargetLearners = ["Beginners", "Lorem Ipsum Learners"],
  Schedule = {
    duration: "Lorem / Ipsum / Dolor",
    days: "Monday to Friday",
    time: "9:00 AM – 6:00 PM",
  },
  Inclusions = [
    "Lorem ipsum material",
    "Dolor sit workbook",
    "Ipsum per student",
    "Certificate of Completion",
  ],
  Certificate = null,
  TitleBackground = null,
}) => {
  const placeholderBg =
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
  const bgImage = TitleBackground || placeholderBg;

  const placeholderCert =
    "https://placehold.co/160x160/1e3a5f/white?text=CERT";
  const certImage = Certificate || placeholderCert;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO BANNER ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "220px" }}>
        <img
          src={bgImage}
          alt="Course background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800/90 to-blue-700/60" />
        <div className="relative z-10 px-4 py-8 sm:px-6 md:px-10 lg:px-12 flex flex-col justify-end min-h-full" style={{ minHeight: "220px" }}>
          {/* Category badge */}
          <span className="inline-block bg-blue-500 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded mb-3 w-fit">
            {Category}
          </span>
          <h1 className="text-white font-extrabold leading-tight mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
            {CourseTitle}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mb-5 leading-relaxed">
            {CourseDescription}
          </p>
          <button className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition-colors text-white font-semibold text-sm px-5 py-2.5 rounded-md w-fit shadow-lg">
            Enroll Now
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* ── LEFT / MAIN COLUMN ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* About This Course */}
          <section className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
            <h2 className="text-gray-900 font-bold text-lg sm:text-xl mb-4 border-b border-gray-100 pb-3">
              About This Course
            </h2>
            <div className="space-y-3">
              {AboutThisCourse.map((para, i) => (
                <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* What You Will Learn */}
          <section className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
            <h2 className="text-gray-900 font-bold text-lg sm:text-xl mb-4 border-b border-gray-100 pb-3">
              What You Will Learn
            </h2>
            <ul className="space-y-2">
              {WhatWillYouLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Course Content */}
          <section className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
            <h2 className="text-gray-900 font-bold text-lg sm:text-xl mb-4 border-b border-gray-100 pb-3">
              Course Content
            </h2>
            <div>
              {CourseContent.map((item, i) => (
                <AccordionItem key={i} item={item} index={i} />
              ))}
            </div>
          </section>
        </div>

        {/* ── RIGHT / SIDEBAR ── */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4">

          {/* Certificate Image */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center">
            <img
              src={certImage}
              alt="Course certificate"
              className="w-36 h-36 object-contain rounded-lg"
            />
          </div>

          {/* Job Opportunities */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <span className="text-blue-600"><BriefcaseIcon /></span>
              Job Opportunities
            </h3>
            <ul className="space-y-2">
              {JobOpportunities.map((job, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{job}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Learners */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <span className="text-blue-600"><UserGroupIcon /></span>
              Target Learners
            </h3>
            <ul className="space-y-2">
              {TargetLearners.map((learner, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{learner}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <span className="text-blue-600"><CalendarIcon /></span>
              Schedule
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0 mt-0.5"><ClockIcon /></span>
                <span>{Schedule.duration}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0 mt-0.5"><CalendarIcon /></span>
                <span><span className="font-medium">Days:</span> {Schedule.days}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0 mt-0.5"><ClockIcon /></span>
                <span><span className="font-medium">Time:</span> {Schedule.time}</span>
              </li>
            </ul>
          </div>

          {/* Inclusions */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <span className="text-blue-600"><AwardIcon /></span>
              Inclusions
            </h3>
            <ul className="space-y-2">
              {Inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full text-blue-600 text-xs font-semibold underline underline-offset-2 hover:text-blue-800 transition-colors text-left">
              Download the CCNA Exam Study Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
