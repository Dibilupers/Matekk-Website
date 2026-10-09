-- Track the existing lowercase questions table used by the RLS-backed question service.
-- Keep this idempotent so databases where the table already exists retain their data.
CREATE TABLE IF NOT EXISTS "questions" (
    "id" SERIAL NOT NULL,
    "module" TEXT,
    "topic" TEXT,
    "difficulty" TEXT,
    "question_text" TEXT,
    "choices" TEXT,
    "correct_answer" TEXT,
    "explanation" TEXT,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);
