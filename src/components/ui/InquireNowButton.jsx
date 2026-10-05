import InquireModal from "../ui/InquireModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function InquireNowButton({ buttonCustomStyle }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const path = location.pathname.toLowerCase();

  const isSolutionsPage = path.includes("/solutions");
  const isTrainingPage  = path.includes("/training");

  // Determine config
  const initialStep =
    isSolutionsPage || isTrainingPage ? 1 : 0;

  const initialInquiryType =
    isSolutionsPage
      ? "solutions"
      : isTrainingPage
      ? "training"
      : null;

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
        initialStep={initialStep}
        initialInquiryType={initialInquiryType}
      />
    </>
  );
}