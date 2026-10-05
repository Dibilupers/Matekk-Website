import InquireModal from "../ui/InquireModal";
import { useState } from "react";

// Always opens on the "Training or ICT Solutions?" choice, on every page.
export default function InquireNowButton({ buttonCustomStyle }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonCustomStyle}
      >
        Inquire Now
      </button>

      <InquireModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialStep={0}
        initialInquiryType={null}
      />
    </>
  );
}
