-- Add a readable approval status while preserving existing account states.
ALTER TABLE "Users"
ADD COLUMN "pending_status" TEXT NOT NULL DEFAULT 'Pending';

UPDATE "Users"
SET "pending_status" = CASE
    WHEN "active_status" THEN 'Active'
    ELSE 'Pending'
END;
