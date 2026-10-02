export default function CcnaKnowledgeModulePlaceholder({ article, category }) {
	return (
		<>
			<p className="mt-7 text-lg leading-[1.8] sm:text-xl">{article.intro}</p>
			<div className="my-7 flex h-24 items-center justify-center rounded-2xl border border-[#dbe5f5] bg-[#f4f7fd] text-center text-sm text-[#8a99b2] sm:h-28">
				CCNA {category} module illustration
			</div>
			<p className="text-lg leading-[1.8] sm:text-xl">{article.body}</p>
		</>
	);
}
