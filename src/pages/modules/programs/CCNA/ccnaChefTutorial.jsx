import chefLessonUrl from "../chef-tutorial-lesson.html?url";

function resizeLessonFrame(event) {
	const frame = event.currentTarget;
	frame.style.height = `${frame.contentDocument.documentElement.scrollHeight}px`;
}

export default function CcnaChefTutorial() {
	return (
		<iframe
			title="Chef Tutorial"
			src={chefLessonUrl}
			onLoad={resizeLessonFrame}
			className="mt-6 block w-full border-0"
		/>
	);
}
