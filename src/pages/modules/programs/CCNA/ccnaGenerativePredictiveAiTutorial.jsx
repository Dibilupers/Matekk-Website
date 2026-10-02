import CcnaLessonImage from "./ccnaLessonImage";

const imageBase = "https://www.9tut.com/images/ccna_self_study/Generative_Predictive_AI";

export default function CcnaGenerativePredictiveAiTutorial() {
	return (
		<div className="mt-7 space-y-6 leading-7 sm:space-y-8">
			<p>Artificial intelligence (AI) is full of concepts that seem familiar at first glance, but often reveal much more complexity upon closer examination. One such example is the distinction between Generative AI and Predictive AI. These terms are often confused, but understanding the difference is crucial. Let’s explore them in more detail.</p>
			<CcnaLessonImage src={`${imageBase}/Generative_Predictive_AI.jpg`} alt="Generative AI compared with Predictive AI" />
			<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Generative AI</h2>
			<p>Generative AI aims to create new content, such as images, text, or music that is similar to the existing data it has been trained on. It is used widely in content creation, art generation, writing, image synthesis, and simulating data for training other AI systems. Examples are the famous ChatGPT which can write essays, articles, and stories; Midjourney which can create realistic images from prompts.</p>
			<CcnaLessonImage src={`${imageBase}/Generative_AI.jpg`} alt="Generative AI example image" />
			<p>A picture created by Generative AI</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Predictive AI</h2>
			<p>Predictive AI aims to forecast future events or trends. It does this by analyzing historical data and identifying patterns. It is mostly used in finance (stock price prediction), healthcare (disease prediction), marketing (customer behavior prediction), and supply chain management (demand forecasting).</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Comparison</h2>
			<p>A comprehensive comparison between Generative AI &amp; Predictive AI is shown below:</p>
			<div className="overflow-x-auto rounded-xl border border-[#c9dcf5]">
				<table className="min-w-[640px] w-full border-collapse text-left text-sm leading-6">
					<thead className="bg-[#126bc5] text-white"><tr><th className="px-4 py-3">Parameters</th><th className="px-4 py-3">Generative AI</th><th className="px-4 py-3">Predictive AI</th></tr></thead>
					<tbody className="divide-y divide-[#c9dcf5]">
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Objective</th><td className="px-4 py-3">Generates new, original content</td><td className="px-4 py-3">Predicts and analyzes existing patterns or outcomes</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Examples</th><td className="px-4 py-3">Text, image, video generation</td><td className="px-4 py-3">Forecasting, classification</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Learning process</th><td className="px-4 py-3">Learns patterns and relationships in data</td><td className="px-4 py-3">Learns from historical data to make predictions</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Use cases</th><td className="px-4 py-3">Creative tasks, content creation</td><td className="px-4 py-3">Business analytics, financial forecasting</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Creativity</th><td className="px-4 py-3">produces things that have never existed before</td><td className="px-4 py-3">lacks the element of content creation</td></tr>
						<tr><th className="bg-[#e7f1fe] px-4 py-3 font-bold text-[#174f96]">Algorithms</th><td className="px-4 py-3">uses complex algorithms and deep learning to generate new content based on the data it is trained on</td><td className="px-4 py-3">generally relies on statistical algorithms and machine learning to analyze data and make prediction.</td></tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}