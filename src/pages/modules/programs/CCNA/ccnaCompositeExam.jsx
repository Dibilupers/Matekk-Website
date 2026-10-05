import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Clock3, RotateCcw, X } from "lucide-react";
import TrainingLogo from "../../../../assets/MATEKK_training_logo.png";
import { useAuth } from "../../../../context/AuthContext";
import { CCNA_EXAMS } from "./ccnaExamFormats";
import { QuestionInput, QuestionReview } from "./ccnaExamQuestionViews";
import { isAnswerCorrect, isQuestionAnswered } from "../../../../utils/ccnaExamGrading";

const EXAM_PASS_PERCENTAGE = 80;

export default function CCNACompositeExam({ examKey = "short" }) {
  const { profile } = useAuth();
  const exam = CCNA_EXAMS[examKey] ?? CCNA_EXAMS.short;
  const sessionKey = getExamStorageKey(exam.sessionKey, profile?.userId ?? null);
  const initialState = useMemo(() => readExamState(exam, sessionKey), [exam, sessionKey]);

  const [questions, setQuestions] = useState(initialState.questions);
  const [answers, setAnswers] = useState(initialState.answers);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [deadline, setDeadline] = useState(initialState.deadline);
  const [submittedAt, setSubmittedAt] = useState(initialState.submittedAt);
  const [isSubmitted, setIsSubmitted] = useState(initialState.isSubmitted);
  const [secondsRemaining, setSecondsRemaining] = useState(() =>
    Math.max(0, Math.ceil((initialState.deadline - Date.now()) / 1000)),
  );

  const question = questions[currentIndex];
  const answeredCount = questions.filter((item, index) => isQuestionAnswered(item, answers[index])).length;
  const score = questions.reduce(
    (total, item, index) => total + Number(isAnswerCorrect(item, answers[index])),
    0,
  );
  const examPassed = Math.round((score / questions.length) * 100) >= EXAM_PASS_PERCENTAGE;

  useEffect(() => {
    window.sessionStorage.setItem(
      sessionKey,
      JSON.stringify({
        questions,
        answers,
        currentIndex,
        deadline,
        isSubmitted,
        submittedAt,
      }),
    );
  }, [answers, currentIndex, deadline, isSubmitted, questions, sessionKey, submittedAt]);

  useEffect(() => {
    if (isSubmitted) return undefined;

    const updateTimer = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        setIsSubmitted(true);
        setSubmittedAt(Date.now());
      }
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(intervalId);
  }, [deadline, isSubmitted]);

  function submitExam() {
    setSubmittedAt(Date.now());
    setIsSubmitted(true);
  }

  function restartExam() {
    const freshQuestions = exam.createQuestions();
    const freshDeadline = Date.now() + exam.durationSeconds * 1000;
    setQuestions(freshQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setDeadline(freshDeadline);
    setSecondsRemaining(exam.durationSeconds);
    setSubmittedAt(null);
    setIsSubmitted(false);
  }

  function goToQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    setCurrentIndex(index);
  }

  if (!question) return null;

  return (
    <main className="min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-[1125px]">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
          <div className="flex min-w-0 items-center gap-4">
            <Link to="/modules/programs/ccna" aria-label="Back to CCNA course" className="shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
            </Link>
            <div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">CCNA exam</p>
              <p className="mt-1 truncate text-sm font-bold text-[#17233d]">{exam.name} · {exam.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <div role="timer" aria-label={`${formatTime(secondsRemaining)} remaining`} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold tabular-nums ${secondsRemaining <= 300 ? "border-[#f0c6a8] bg-[#fff5ee] text-[#a44b13]" : "border-[#c9dfe2] bg-white text-[#005b6b]"}`}>
                <Clock3 size={16} /> {formatTime(secondsRemaining)}
              </div>
            )}
            <Link to="/modules/programs/ccna" className="inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] px-4 py-2 text-sm font-semibold text-[#005b6b] transition hover:scale-105 hover:bg-[#e8f3f4]">
              <X size={16} /> <span>Exit exam</span>
            </Link>
          </div>
        </header>

        {!isSubmitted ? (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-7">
              <p className="mb-2 text-sm text-[#70809a]">{questionLabel(question, currentIndex, questions.length)}</p>
              <h1 className="mb-6 text-[1.45rem] font-bold leading-snug tracking-tight sm:text-[1.7rem]">{question.prompt}</h1>

              {question.exhibitImage && (
                <img src={question.exhibitImage} alt="Exhibit" className="mb-6 w-auto max-w-full max-h-[32rem] rounded-xl border border-[#d6e5e7] bg-white" />
              )}

              {question.exhibit && (
                <pre aria-label="Exhibit" className="mb-6 max-h-96 overflow-auto rounded-xl bg-[#0f1b2d] p-4 text-xs leading-5 text-[#e2e8f0] sm:text-[13px]"><code>{question.exhibit}</code></pre>
              )}

              <QuestionInput
                key={currentIndex}
                question={question}
                value={answers[currentIndex]}
                onChange={(value) => setAnswers((previous) => ({ ...previous, [currentIndex]: value }))}
              />

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => (currentIndex === questions.length - 1 ? submitExam() : setCurrentIndex((index) => Math.min(index + 1, questions.length - 1)))}
                  disabled={answers[currentIndex] === undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {currentIndex === questions.length - 1 ? "Submit" : "Next Question"}
                  {currentIndex !== questions.length - 1 && <ArrowLeft className="rotate-180" size={16} />}
                </button>
              </div>
            </section>

            <aside aria-label="Exam question navigation" className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 text-base font-bold">Questions</h2>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((item, index) => {
                  const isAnswered = isQuestionAnswered(item, answers[index]);
                  const isCurrent = currentIndex === index;

                  return (
                    <button
                      key={`${item.moduleNumber ?? "q"}-${index}`}
                      type="button"
                      onClick={() => goToQuestion(index)}
                      aria-label={`Question ${index + 1}${isAnswered ? ", answered" : ", unanswered"}`}
                      aria-current={isCurrent ? "step" : undefined}
                      className={`h-10 rounded-xl border text-sm font-semibold transition ${isAnswered ? "border-[#005b6b] bg-[#e8f3f4] text-[#005b6b]" : "border-[#d9e1ef] bg-white text-[#71809a]"} ${isCurrent ? "ring-2 ring-[#005b6b] ring-offset-2" : ""} hover:border-[#005b6b] hover:bg-[#005b6b] hover:text-white`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-6 text-[#70809a]">{answeredCount} of {questions.length} answered</p>
            </aside>
          </div>
        ) : (
          <>
            <section className="grid items-center gap-10 rounded-[24px] border border-[#d6e5e7] bg-white px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-14">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-3 py-1.5 text-xs font-bold tracking-wide text-[#005b6b]">
                  <span className="h-2 w-2 rounded-full bg-[#005b6b]" />
                  {exam.name} · CCNA
                </p>
                <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-5xl">
                  {examPassed ? (
                    <>
                      Great work, <span className="text-[#005b6b]">keep it up.</span>
                    </>
                  ) : (
                    <>
                      Not there yet, <span className="text-[#005b6b]">keep going.</span>
                    </>
                  )}
                </h1>
                <p className="mt-4 max-w-xl leading-7 text-[#64748b]">
                  You got {score} of {questions.length} questions correct.
                  {examPassed ? " You passed this exam." : ` Review your answers below and aim for ${EXAM_PASS_PERCENTAGE}% to pass.`}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button type="button" onClick={restartExam} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653]">
                    <RotateCcw size={16} /> Retake Exam
                  </button>
                  <button type="button" onClick={() => setCurrentIndex(0)} className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-6 py-3 font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]">
                    Review Answers <ArrowLeft className="rotate-[-90deg]" size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center py-3">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#dceff1] sm:h-72 sm:w-72">
                  <div className="absolute inset-[13px] rounded-full bg-[#eef7f8]" />
                  <div className="relative z-10 text-center">
                    <strong className="block text-5xl font-extrabold tracking-tight tabular-nums text-[#005b6b]">{Math.round((score / questions.length) * 100)}%</strong>
                    <span className="mt-1 block text-sm font-semibold text-[#64748b]">correct answers</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-[24px] bg-[#eaf3f4] px-4 py-10 sm:px-8 sm:py-12">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#17233d] sm:text-4xl">
                  Review your <span className="text-[#005b6b]">answers</span>
                </h2>
                <div className="mt-8 space-y-5">
                  {questions.map((item, index) => (
                    <article key={`${item.moduleNumber ?? "q"}-${index}`} className="rounded-[20px] border border-[#dce9ea] bg-white p-5 shadow-sm sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-[#64748b]">Question {index + 1}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${isAnswerCorrect(item, answers[index]) ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"}`}>
                          {isAnswerCorrect(item, answers[index]) ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold leading-snug text-[#17233d] sm:text-xl">{item.prompt}</h3>
                      <div className="mt-5">
                        <QuestionReview question={item} value={answers[index]} />
                      </div>
                      <p className="mt-4 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]">
                        <span className="font-bold text-[#005b6b]">Explanation: </span>{item.explanation}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function questionLabel(question, index, total) {
  return `Question ${index + 1} of ${total}`;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getExamStorageKey(baseKey, userId) {
  if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
    return baseKey;
  }
  return `${baseKey}:${encodeURIComponent(String(userId))}`;
}

function readExamState(exam, sessionKey) {
  const defaultState = {
    questions: exam.createQuestions(),
    answers: {},
    currentIndex: 0,
    deadline: Date.now() + exam.durationSeconds * 1000,
    isSubmitted: false,
    submittedAt: null,
  };

  const savedSession = window.sessionStorage.getItem(sessionKey);
  if (!savedSession) return defaultState;

  try {
    const parsed = JSON.parse(savedSession);
    if (!parsed || !Array.isArray(parsed.questions) || typeof parsed.answers !== "object") {
      return defaultState;
    }

    return {
      questions: parsed.questions,
      answers: parsed.answers ?? {},
      currentIndex: Number.isInteger(parsed.currentIndex) ? Math.max(0, parsed.currentIndex) : 0,
      deadline: Number.isFinite(parsed.deadline) ? parsed.deadline : defaultState.deadline,
      isSubmitted: Boolean(parsed.isSubmitted),
      submittedAt: parsed.submittedAt ?? null,
    };
  } catch {
    return defaultState;
  }
}