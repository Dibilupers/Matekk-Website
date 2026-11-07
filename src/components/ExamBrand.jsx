import { Link } from "react-router-dom";

export default function ExamBrand({ to, isDark = false }) {
	return (
		<Link
			to={to}
			aria-label="Back to MATEKK Cybercore Academy course"
			className={`flex w-36 shrink-0 flex-col justify-center rounded-lg border px-3 py-2 leading-tight shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
				isDark
					? "border-[#303a60] bg-[#1b2947] text-[#e0e5f3] hover:bg-[#26385a]"
					: "border-slate-200 bg-white text-[#17233d] hover:bg-slate-50"
			}`}
		>
			<span className="text-sm font-extrabold tracking-[0.14em]">MATEKK</span>
			<span className="mt-0.5 text-[10px] font-semibold tracking-wide">Cybercore Academy</span>
		</Link>
	);
}
