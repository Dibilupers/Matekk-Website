DO $migration$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM "Users"
        GROUP BY LOWER(BTRIM("username"))
        HAVING COUNT(*) > 1
    ) THEN
        RAISE EXCEPTION 'Cannot enforce unique usernames: case-insensitive duplicate usernames exist. Reconcile those accounts, then rerun this migration.';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM "Users"
        WHERE "email" IS NOT NULL AND BTRIM("email") <> ''
        GROUP BY LOWER(BTRIM("email"))
        HAVING COUNT(*) > 1
    ) THEN
        RAISE EXCEPTION 'Cannot enforce unique emails: case-insensitive duplicate emails exist. Reconcile those accounts, then rerun this migration.';
    END IF;
END
$migration$;

CREATE UNIQUE INDEX "Users_username_lower_trim_key"
ON "Users" (LOWER(BTRIM("username")));

CREATE UNIQUE INDEX "Users_email_lower_trim_key"
ON "Users" (LOWER(BTRIM("email")))
WHERE "email" IS NOT NULL AND BTRIM("email") <> '';

CREATE TABLE "AuthLoginAttempt" (
    "key" TEXT NOT NULL,
    "windowStartedAt" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL,
    CONSTRAINT "AuthLoginAttempt_pkey" PRIMARY KEY ("key")
);

CREATE INDEX "AuthLoginAttempt_windowStartedAt_idx"
ON "AuthLoginAttempt"("windowStartedAt");
