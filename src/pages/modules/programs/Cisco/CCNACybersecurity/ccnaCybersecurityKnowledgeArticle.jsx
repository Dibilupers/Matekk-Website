import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../../../context/auth-context";
import {
	CCNA_CYBERSECURITY_CURRICULUM,
	findCybersecurityLesson,
} from "./ccnaCybersecurityCurriculum";
import {
	markCcnaCybersecurityLessonCompleted,
	markCcnaCybersecurityLessonOpened,
} from "./ccnaCybersecurityProgress";
import CcnaKnowledgeModuleFive from "../CCNA/ccnaKnowledgeModule5";
import ProgramStudyContent from "../../ProgramStudyContent";
import ProgramLessonSidebar from "../../ProgramLessonSidebar";
import CybersecurityMarkdownContent from "./CybersecurityMarkdownContent";

export default function CCNACybersecurityKnowledgeArticle() {
	const { profile } = useAuth();
	const { articleSlug = "" } = useParams();
	const lessonEndRef = useRef(null);
	const lesson = findCybersecurityLesson(articleSlug);
	const flatLessons = CCNA_CYBERSECURITY_CURRICULUM.flatMap((module) =>
		module.lessons.map((item) => ({ ...item, moduleNumber: module.number, moduleTitle: module.title })),
	);
	const currentIndex = flatLessons.findIndex((item) => item.slug === articleSlug);
	const previousLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
	const nextLesson = currentIndex >= 0 && currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;
	const userId = profile?.userId;

	useEffect(() => {
		if (userId && lesson) markCcnaCybersecurityLessonOpened(userId, lesson.slug);
	}, [lesson, userId]);

	useEffect(() => {
		if (!userId || !lesson || !lessonEndRef.current) return undefined;
		const lessonEnd = lessonEndRef.current;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			markCcnaCybersecurityLessonCompleted(userId, lesson.slug);
			observer.disconnect();
		});
		observer.observe(lessonEnd);
		return () => observer.disconnect();
	}, [lesson, userId]);

	if (!lesson) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#f5f9f9] px-5 text-center">
				<div className="max-w-lg rounded-2xl border border-[#d6e5e7] bg-white p-8">
					<h1 className="text-2xl font-bold text-[#111a2d]">Lesson not found</h1>
					<p className="mt-2 text-sm leading-6 text-[#71819b]">Choose a lesson from the CCNA Cybersecurity Knowledge Hub.</p>
					<Link to="/modules/programs/ccna-cybersecurity/knowledge-hub" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white"><BookOpen size={16} /> Open Knowledge Hub</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="ccna-page-enter min-h-screen bg-white text-[#526584]">
			<div className="mx-auto min-w-0 max-w-[1440px] px-5 pb-10 pt-8 sm:px-10 sm:pt-10 lg:px-14">
				<nav className="mb-6 flex min-w-0 flex-wrap items-center gap-2 text-sm sm:text-base" aria-label="Breadcrumb">
					<Link to="/modules/programs/ccna-cybersecurity" className="font-semibold text-[#005b6b] hover:underline">CCNA Cybersecurity</Link>
					<span>/</span>
					<Link to="/modules/programs/ccna-cybersecurity/knowledge-hub" className="font-semibold text-[#005b6b] hover:underline">Knowledge Hub</Link>
					<span>/</span>
					<span className="min-w-0 truncate text-[#8492a9]">{lesson.title}</span>
				</nav>

				<div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
					<article className="min-w-0 break-words rounded-[24px] border border-[#dbe5f5] px-6 py-8 sm:px-10 sm:py-10">
						<div className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-4 py-2 text-sm font-semibold text-[#005b6b]"><BookOpen size={15} /> CCNA Cybersecurity · Module {lesson.moduleNumber}</div>
						<h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#071126] sm:text-5xl">{lesson.number} {lesson.title}</h1>
						<p className="mt-4 flex min-w-0 items-center gap-2 text-base text-[#7b8ca7]"><Clock size={17} /> {lesson.duration} read</p>

						{lesson.contentMarkdown ? (
							<CybersecurityMarkdownContent markdown={lesson.contentMarkdown} />
						) : lesson.contentType ? (
							<CcnaKnowledgeModuleFive article={{ ...lesson, meta: `CCNA ${lesson.number} · Security Fundamentals` }} />
						) : (
							<>
								<section className="mt-8 rounded-2xl bg-[#f5f9f9] p-5 sm:p-7">
									<h2 className="text-lg font-bold text-[#111a2d]">Learning objective</h2>
									<p className="mt-3 text-base leading-7 text-[#526584]">{lesson.summary}</p>
									{lesson.details?.length > 0 && (
										<ul className="mt-4 space-y-2">
											{lesson.details.map((detail) => <li key={detail} className="flex gap-2 text-sm leading-6 text-[#526584]"><Check size={16} className="mt-1 shrink-0 text-[#005b6b]" />{detail}</li>)}
										</ul>
									)}
								</section>

								<div className="mt-7">
									<ProgramStudyContent content={lesson.studyContent} title="Module learning material" />
								</div>
							</>
						)}
						<div ref={lessonEndRef} aria-hidden="true" className="mt-8 h-px" />

						<div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ecec] pt-5">
							{previousLesson ? <Link to={`/modules/programs/ccna-cybersecurity/knowledge-hub/${previousLesson.slug}`} className="inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] px-5 py-2.5 text-sm font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]"><ArrowLeft size={16} /> Previous</Link> : <span />}
							<Link to="/modules/programs/ccna-cybersecurity/knowledge-hub" className="text-sm font-semibold text-[#005b6b] hover:underline">Back to all lessons</Link>
							{nextLesson ? <Link to={`/modules/programs/ccna-cybersecurity/knowledge-hub/${nextLesson.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]">Next lesson <ArrowRight size={16} /></Link> : <span />}
						</div>
					</article>

					<ProgramLessonSidebar
						curriculum={CCNA_CYBERSECURITY_CURRICULUM}
						basePath="/modules/programs/ccna-cybersecurity"
						activeSlug={lesson.slug}
					/>
				</div>
			</div>
		</main>
	);
}
