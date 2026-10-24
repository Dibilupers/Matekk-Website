export default function ExplanationWithLinks({ explanation, className, labelClassName }) {
	const content = explanation.split(/(https?:\/\/[^\s]+)/g);

	return (
		<p className={className}>
			<strong className={labelClassName}>Explanation: </strong>
			{content.map((part, index) => (
				/^https?:\/\//i.test(part)
					? <a key={`${part}-${index}`} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-medium underline underline-offset-2">{part}</a>
					: part
			))}
		</p>
	);
}
