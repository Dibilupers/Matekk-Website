export default function ExplanationWithLinks({ explanation, className, labelClassName }) {
	const content = explanation.split(/(https?:\/\/[^\s]+)/g);

	return (
		<p className={className}>
			<strong className={labelClassName}>Explanation: </strong>
			{content.map((part, index) => (
				/^https?:\/\//i.test(part)
					? (
						<a
							key={`${part}-${index}`}
							href={part}
							target="_blank"
							rel="noopener noreferrer"
							title="Open source in a new tab"
							className="inline break-all rounded-sm bg-blue-50 px-1 font-semibold text-blue-800 underline decoration-2 underline-offset-2 hover:bg-blue-100 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
						>
							{part}
						</a>
					)
					: part
			))}
		</p>
	);
}
