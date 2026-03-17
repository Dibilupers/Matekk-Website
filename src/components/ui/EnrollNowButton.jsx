import EnrollModal from "../ui/EnrollModal";
import { useState } from "react";
import Button from "../ui/button";

export default function EnrollNowButton({ buttonCustomStyle }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title="Enroll Now"
        type="button"
        onClick={() => setOpen(true)}
        buttonCustomStyle="bg-[#1775EE] border border-[#1775EE] hover:border-[#0062E0] text-white transition-all duration-300 shadow-lg hover:bg-[#0062E0] px-6 py-3"
      >
        Enroll Now
      </Button>

      <EnrollModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
