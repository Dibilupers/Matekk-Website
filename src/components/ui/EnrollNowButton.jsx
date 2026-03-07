import EnrollModal from "../ui/EnrollModal";
import { useState } from "react";

export default function EnrollNowButton({buttonCustomStyle }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        title="Enroll Now"
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full text-[1.25rem] text-center py-3 px-6 border-2 border-[#1775EE] text-[#1775EE] rounded-full hover:bg-[#1775EE] hover:text-white transition-colors lg:flex lg:w-auto lg:text-base lg:py-2 lg:px-5.5 lg:rounded-3xl lg:mr-[2.063rem] xl:mr-[7.438rem] lg:hover:bg-blue-600 duration-300 ${buttonCustomStyle}`}
      >
        Enroll Now
      </button>

      <EnrollModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
