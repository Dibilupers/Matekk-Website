function getSourceDetails(source) {
	if (typeof source !== "string" || !source.trim()) return null;
	const normalizedSource = source.trim();
	const matchedUrl = normalizedSource.match(/https?:\/\/[^\s]+/i)?.[0];
	const url = matchedUrl?.replace(/[.,;)}\]]+$/, "") || "";
	const label = url
		? normalizedSource.replace(matchedUrl, "").replace(/[-–—\s:]+$/, "").trim()
		: normalizedSource;
	return { label, url };
}

export default function FortiOSQuestionExplanation({ question, tone = "red" }) {
	const explanation = typeof question?.explanation === "string" ? question.explanation.trim() : "";
	const source = getSourceDetails(question?.source);
	if (!explanation && !source) return null;
	const colors = tone === "teal"
		? { panel: "bg-[#f5f9f9]", heading: "text-[#005b6b]", body: "text-[#596983]" }
		: { panel: "bg-[#fff3f2]", heading: "text-[#b31d17]", body: "text-[#596983]" };

	return (
		<section className={`mt-5 rounded-xl px-4 py-3 text-sm leading-6 ${colors.panel} ${colors.body}`}>
			{explanation && <p><strong className={colors.heading}>Explanation: </strong>{explanation}</p>}
			{source && (
				<p className={explanation ? "mt-2 break-words text-xs leading-5" : "break-words text-xs leading-5"}>
					<strong className={colors.heading}>Source: </strong>
					{source.label && source.url && <>{source.label} — </>}
					{source.url
						? <a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:opacity-75">{source.url}</a>
						: source.label}
				</p>
			)}
		</section>
	);
}
