export default function CcnaLessonImage({ src, alt, size = "standard" }) {
	const height = size === "large" ? "h-[300px] sm:h-[380px] lg:h-[440px]" : "h-[240px] sm:h-[300px] lg:h-[340px]";
	return (
		<figure className={`mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#c9dcf5] bg-white p-2 sm:p-3 ${height}`}>
			<img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
		</figure>
	);
}