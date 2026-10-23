import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../../context/auth-context";
import { isAnswerCorrect, isQuestionAnswered } from "../../../../../../utils/ccnaExamGrading";
import { QuestionInput, QuestionPrompt, QuestionReview } from "../../../Cisco/CCNA/ccnaExamQuestionViews";
import { loadFortiOSImageUrls, precacheFortiOSImages, readFortiOSImageUrls } from "./fortiosOfflineImages";
import FORTIOS_OFFLINE_QUESTIONS from "./fortiosOfflineQuestions.json";

const IMAGE_CACHE_MESSAGES = {
  loading: "Preparing the FortiOS exhibits for offline use…",
  ready: "FortiOS question images are cached for offline use.",
};
const EXPECTED_IMAGE_COUNT = FORTIOS_OFFLINE_QUESTIONS.filter((question) => question.imagePath).length;

function isValidAnswer(question, answer) {
  if (!isQuestionAnswered(question, answer)) return false;
  if (question.type === "multi") {
    return answer.every((index) => Number.isInteger(index) && index >= 0 && index < question.options.length);
  }
  if (question.type === "match") {
    return answer.every((index) => Number.isInteger(index) && index >= 0 && index < question.choices.length);
  }
  return Number.isInteger(answer) && answer >= 0 && answer < question.options.length;
}

function attachImages(imageUrls) {
  return FORTIOS_OFFLINE_QUESTIONS.map((question) => ({
    ...question,
    ...(imageUrls[String(question.id)] ? { exhibitImage: imageUrls[String(question.id)] } : {}),
  }));
}

function restoreExamState(storageKey, isOnline) {
  let imageUrls = {};
  let imageCacheState = isOnline
    ? { status: "loading", message: IMAGE_CACHE_MESSAGES.loading }
    : {
        status: "error",
        message: "No FortiOS exhibit images are saved on this device yet. Connect to the internet and open this exam once to cache them.",
      };

  try {
    imageUrls = readFortiOSImageUrls();
    if (Object.keys(imageUrls).length) {
      imageCacheState = { status: "ready", message: IMAGE_CACHE_MESSAGES.ready };
    }
  } catch (error) {
    console.error("Unable to restore cached FortiOS image URLs.", error);
    imageCacheState = {
      status: "error",
      message: "Saved FortiOS image information could not be restored. Reconnect to download the exhibits again.",
    };
  }

  const state = {
    questions: attachImages(imageUrls),
    answers: {},
    currentIndex: 0,
    isSubmitted: false,
    imageCacheState,
  };

  try {
    const savedProgress = window.localStorage.getItem(storageKey);
    if (!savedProgress) return state;

    const parsed = JSON.parse(savedProgress);
    const matchesBank = parsed?.version === 1 &&
      Array.isArray(parsed.questionIds) &&
      parsed.questionIds.length === FORTIOS_OFFLINE_QUESTIONS.length &&
      parsed.questionIds.every((id, index) => id === FORTIOS_OFFLINE_QUESTIONS[index].id);
    if (!matchesBank) return state;

    if (parsed.answers && typeof parsed.answers === "object" && !Array.isArray(parsed.answers)) {
      Object.entries(parsed.answers).forEach(([indexText, answer]) => {
        const index = Number(indexText);
        const question = FORTIOS_OFFLINE_QUESTIONS[index];
        if (Number.isInteger(index) && question && isValidAnswer(question, answer)) {
          state.answers[index] = answer;
        }
      });
    }
    state.currentIndex = Number.isInteger(parsed.currentIndex)
      ? Math.max(0, Math.min(parsed.currentIndex, FORTIOS_OFFLINE_QUESTIONS.length - 1))
      : 0;
    state.isSubmitted = parsed.isSubmitted === true;
  } catch (error) {
    console.error("Unable to restore FortiOS offline exam progress.", error);
  }

  return state;
}

export default function FortiOSOfflineExam() {
  const { profile, isOnline } = useAuth();
  const storageKey = `matekk-fortios-offline-exam:${encodeURIComponent(String(profile?.userId ?? "device"))}`;
  const [initialState] = useState(() => restoreExamState(storageKey, isOnline));
  const [questions, setQuestions] = useState(initialState.questions);
  const [answers, setAnswers] = useState(initialState.answers);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [isSubmitted, setIsSubmitted] = useState(initialState.isSubmitted);
  const [imageCacheState, setImageCacheState] = useState(initialState.imageCacheState);

  const question = questions[currentIndex];
  const score = useMemo(
    () => questions.reduce((total, item, index) => total + Number(isAnswerCorrect(item, answers[index])), 0),
    [answers, questions],
  );

  useEffect(() => {
    if (!isOnline) return undefined;
    let isActive = true;
    Promise.resolve().then(async () => {
      if (!isActive) return;
      setImageCacheState({ status: "loading", message: IMAGE_CACHE_MESSAGES.loading });
      try {
        const imageUrls = await loadFortiOSImageUrls(FORTIOS_OFFLINE_QUESTIONS);
        if (!isActive) return;
        setQuestions(attachImages(imageUrls));
        const { cachedCount, failedCount } = await precacheFortiOSImages(imageUrls);
        if (!isActive) return;
        const availableCount = FORTIOS_OFFLINE_QUESTIONS
          .filter((item) => item.imagePath && imageUrls[String(item.id)])
          .length;
        const unavailableCount = EXPECTED_IMAGE_COUNT - availableCount;
        setImageCacheState(failedCount === 0 && unavailableCount === 0 && cachedCount === EXPECTED_IMAGE_COUNT
          ? { status: "ready", message: IMAGE_CACHE_MESSAGES.ready }
          : {
              status: "error",
              message: `Cached ${cachedCount} of ${EXPECTED_IMAGE_COUNT} FortiOS exhibits. ${failedCount + unavailableCount} image(s) could not be cached. Keep the site online and reload to retry.`,
            });
      } catch (error) {
        console.error("Unable to cache FortiOS question images for offline use.", error);
        if (isActive) {
          setImageCacheState({
            status: "error",
            message: error instanceof Error
              ? `${error.message} The exam questions remain available, but some exhibits may need an internet connection.`
              : "FortiOS exhibits could not be cached. The exam questions remain available.",
          });
        }
      }
    });

    return () => {
      isActive = false;
    };
  }, [isOnline]);

  useEffect(() => {
    if (questions.length !== FORTIOS_OFFLINE_QUESTIONS.length) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        version: 1,
        questionIds: FORTIOS_OFFLINE_QUESTIONS.map((item) => item.id),
        answers,
        currentIndex,
        isSubmitted,
      }));
    } catch (error) {
      console.error("Unable to save FortiOS offline exam progress.", error);
    }
  }, [answers, currentIndex, isSubmitted, questions.length, storageKey]);

  function restartExam() {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  }

  if (!question) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9f9] px-4 text-[#17233d]">
        <p role="status" className="text-sm text-[#64748b]">Preparing the FortiOS question bank…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
          <div>
            <Link to="/modules/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#005b6b] hover:underline">
              <ArrowLeft size={16} /> Offline learning
            </Link>
            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">FortiOS offline exam</h1>
            <p className="mt-1 text-sm text-[#64748b]">{questions.length} questions · Progress is saved on this device</p>
          </div>
          {isSubmitted && (
            <button
              type="button"
              onClick={restartExam}
              className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] bg-white px-5 py-2.5 text-sm font-semibold text-[#005b6b] hover:bg-[#e8f3f4]"
            >
              <RotateCcw size={16} /> Retake exam
            </button>
          )}
        </header>

        <p
          role={imageCacheState.status === "error" ? "status" : "status"}
          className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
            imageCacheState.status === "error"
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-[#cfe0e2] bg-white text-[#526584]"
          }`}
        >
          {imageCacheState.message}
        </p>

        {!isSubmitted ? (
          <section className="rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#e7eff0] pb-4">
              <h2 className="text-sm font-bold text-[#64748b]">Question {currentIndex + 1} of {questions.length}</h2>
              <span className="text-sm text-[#64748b]">
                {questions.reduce((count, item, index) => count + Number(isQuestionAnswered(item, answers[index])), 0)} answered
              </span>
            </div>
            <QuestionPrompt
              prompt={question.prompt}
              imageUrl={question.exhibitImage}
              hasSeparateExhibit={Boolean(question.exhibitImage)}
            />
            <QuestionInput
              question={question}
              value={answers[currentIndex]}
              onChange={(value) => setAnswers((previous) => ({ ...previous, [currentIndex]: value }))}
            />
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-5 py-3 font-semibold text-[#005b6b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} /> Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}
                  disabled={!isQuestionAnswered(question, answers[currentIndex])}
                  className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white hover:bg-[#004653]"
                >
                  Finish exam <CheckCircle2 size={17} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsSubmitted(true)}
              className="mt-5 text-sm font-semibold text-[#71819b] underline decoration-[#c9dfe2] underline-offset-4 hover:text-[#005b6b]"
            >
              Finish exam and see score
            </button>
          </section>
        ) : (
          <section className="space-y-5">
            <div className="rounded-[20px] border border-[#d6e5e7] bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-[#005b6b]">Exam complete</p>
              <h2 className="mt-2 text-3xl font-extrabold">{score} / {questions.length}</h2>
              <p className="mt-1 text-[#64748b]">{Math.round((score / questions.length) * 100)}% correct</p>
            </div>
            {questions.map((item, index) => (
              <article key={item.id} className="rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-7">
                <p className="text-sm font-bold text-[#64748b]">
                  Question {index + 1} · {isAnswerCorrect(item, answers[index]) ? "Correct" : isQuestionAnswered(item, answers[index]) ? "Incorrect" : "Unanswered"}
                </p>
                <QuestionPrompt
                  prompt={item.prompt}
                  imageUrl={item.exhibitImage}
                  hasSeparateExhibit={Boolean(item.exhibitImage)}
                />
                <QuestionReview question={item} value={answers[index]} />
                {item.explanation && (
                  <p className="mt-5 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]">
                    <strong className="text-[#005b6b]">Explanation: </strong>{item.explanation}
                  </p>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
