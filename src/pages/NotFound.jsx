import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<main className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-slate-50 px-6 py-12 text-center">
			<section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1775EE]">404</p>
				<h1 className="mt-2 text-3xl font-bold text-slate-950">Page not found</h1>
				<p className="mt-3 text-slate-600">
					This address doesn't match a page on MATEKK. Check the link or return to the training programs.
				</p>
				<Link
					to="/"
					className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1775EE] px-5 py-3 font-semibold text-white transition hover:bg-[#1262c9]"
				>
					<ArrowLeft size={18} aria-hidden="true" />
					Back to home
				</Link>
			</section>
		</main>
	);
}