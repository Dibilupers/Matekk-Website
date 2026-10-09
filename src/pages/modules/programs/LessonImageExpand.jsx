import { Maximize2, X } from "lucide-react";
import { useRef } from "react";

export default function LessonImageExpand({ children, label = "image" }) {
	const dialogRef = useRef(null);

	function openPreview() {
		dialogRef.current?.showModal();
	}

	function closePreview() {
		dialogRef.current?.close();
	}

	return (
		<div className="relative min-w-0">
			{children}
			<button
				type="button"
				onClick={openPreview}
				aria-label={`Expand ${label}`}
				title={`Expand ${label}`}
				className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c9dfe2] bg-white/95 text-[#005b6b] shadow-md transition hover:bg-[#e8f3f4] focus:outline-none focus:ring-2 focus:ring-[#005b6b] focus:ring-offset-2"
			>
				<Maximize2 size={17} aria-hidden="true" />
			</button>
			<dialog
				ref={dialogRef}
				aria-label={`Expanded lesson ${label}`}
				onClick={(event) => {
					if (event.target === event.currentTarget) closePreview();
				}}
				className="m-auto max-h-[95dvh] max-w-[96vw] overflow-visible rounded-xl bg-transparent p-0 backdrop:bg-slate-950/80"
			>
				<div className="relative max-h-[95dvh] w-[min(94vw,1400px)] overflow-auto rounded-xl bg-white p-3 pt-14 shadow-2xl sm:p-5 sm:pt-14">
					<button
						type="button"
						onClick={closePreview}
						aria-label="Close expanded image"
						className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#005b6b]"
					>
						<X size={18} aria-hidden="true" />
					</button>
					<div className="max-h-[82dvh] overflow-auto [&_img]:!h-auto [&_img]:!max-h-[78dvh] [&_img]:!max-w-[90vw] [&_img]:!w-auto [&_svg]:!mx-auto [&_svg]:!h-auto [&_svg]:!max-h-[78dvh] [&_svg]:!max-w-none [&_svg]:!w-full">
						{children}
					</div>
				</div>
			</dialog>
		</div>
	);
}
