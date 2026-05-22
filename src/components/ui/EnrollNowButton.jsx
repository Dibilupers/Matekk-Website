import { useState } from "react";
import { useLocation } from "react-router-dom";
import InquireModal from "../ui/InquireModal";
import { PATH_TO_COURSE, FLAT_COURSES } from "../training/courses";

// Fallback: first course in the list, used on non-course pages
const DEFAULT_COURSE = FLAT_COURSES[0]?.label ?? "";

/**
 * Opens InquireModal pre-set to Training Step 1.
 * - On a course page  → that course is pre-selected in the dropdown.
 * - On any other page → defaults to the first course in the list.
 */
export default function EnrollNowButton({ buttonCustomStyle }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const preselectedCourse =
    PATH_TO_COURSE[location.pathname.toLowerCase()] ?? DEFAULT_COURSE;

  return (
    <>
      <button
        title="Enroll Now"
        type="button"
        onClick={() => setOpen(true)}
        className={`bg-[#1775EE] border border-[#1775EE] hover:border-[#0062E0] text-white shadow-lg hover:bg-[#0062E0] cursor-pointer w-fit rounded-full transition-all duration-300 active:scale-90 text-[0.87rem] sm:text-[1rem] md:text-[0.93rem] py-3 px-[5%] md:py-2 md:px-4 ${buttonCustomStyle ?? ""}`}
      >
        Enroll Now
      </button>

      <InquireModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialStep={1}
        initialInquiryType="training"
        preselectedCourse={preselectedCourse}
      />
    </>
  );
}

// Usage:
// <EnrollNowButton />                           — on a course page, auto-selects that course
// <EnrollNowButton />                           — on homepage, selects first course in list
// <EnrollNowButton buttonCustomStyle="mt-4" />  — with extra classes