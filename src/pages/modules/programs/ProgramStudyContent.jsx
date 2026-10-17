import { Check } from "lucide-react";

export default function ProgramStudyContent({ content, title = "Detailed study material" }) {
	if (!content?.intro || !content.sections?.length) {
		throw new Error("Program module is missing its structured study content.");
	}

	return (
		<section className="space-y-4">
			<div className="rounded-xl bg-[#f5f9f9] p-4">
				<h3 className="font-semibold text-[#111a2d]">{title}</h3>
				<p className="mt-2 text-sm leading-6 text-[#526584]">{content.intro}</p>
			</div>
			{content.sections.map((section) => (
				<article key={section.title} className="rounded-xl border border-[#e2ecec] bg-white p-4">
					<h4 className="font-semibold text-[#111a2d]">{section.title}</h4>
					<p className="mt-2 text-sm leading-6 text-[#526584]">{section.body}</p>
					<ul className="mt-3 space-y-2">
						{section.points.map((point) => (
							<li key={point} className="flex gap-2 text-sm leading-5 text-[#526584]">
								<Check size={15} className="mt-0.5 shrink-0 text-[#005b6b]" />{point}
							</li>
						))}
					</ul>
					{section.code && (
						<pre className="mt-3 overflow-x-auto rounded-lg bg-[#0f1b2d] p-4 text-sm leading-6 text-[#e2e8f0]">
							<code>{section.code}</code>
						</pre>
					)}
					<p className="mt-3 rounded-lg bg-[#f5f9f9] px-3 py-2 text-sm leading-5 text-[#526584]">
						<strong className="text-[#111a2d]">Example: </strong>{section.example}
					</p>
				</article>
			))}
		</section>
	);
}
