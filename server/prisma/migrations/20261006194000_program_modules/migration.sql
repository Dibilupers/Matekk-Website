-- Add program/module hierarchy. Root program enrollments represent the whole program;
-- child program enrollments represent an individual module.
ALTER TABLE "Program" ADD COLUMN "parentId" INTEGER;

CREATE INDEX "Program_parentId_idx" ON "Program"("parentId");

ALTER TABLE "Program"
ADD CONSTRAINT "Program_parentId_fkey"
FOREIGN KEY ("parentId") REFERENCES "Program"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
