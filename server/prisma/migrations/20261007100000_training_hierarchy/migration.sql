-- Add a training provider above root programs. Module rows inherit their
-- provider through their parent program.
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Training_name_key" ON "Training"("name");

INSERT INTO "Training" ("name")
VALUES ('Cisco'), ('Fortinet'), ('CompTIA'), ('Other');

ALTER TABLE "Program" ADD COLUMN "trainingId" INTEGER;

UPDATE "Program" AS program
SET "trainingId" = training."id"
FROM "Training" AS training
WHERE program."parentId" IS NULL
  AND training."name" = CASE
    WHEN program."name" IN ('CCNA', 'CCNP') THEN 'Cisco'
    WHEN program."name" IN ('Network+', 'Security+') THEN 'CompTIA'
    ELSE 'Other'
  END;

CREATE INDEX "Program_trainingId_idx" ON "Program"("trainingId");

ALTER TABLE "Program"
ADD CONSTRAINT "Program_trainingId_fkey"
FOREIGN KEY ("trainingId") REFERENCES "Training"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Program" ("name", "trainingId")
SELECT new_program."name", training."id"
FROM (VALUES
    ('CCNA', 'Cisco'),
    ('CCNP', 'Cisco'),
    ('FortiGate Administrator', 'Fortinet'),
    ('FortiGate Security', 'Fortinet')
) AS new_program("name", "training_name")
JOIN "Training" AS training ON training."name" = new_program."training_name"
WHERE NOT EXISTS (
    SELECT 1
    FROM "Program" AS existing
    WHERE existing."name" = new_program."name"
      AND existing."trainingId" = training."id"
      AND existing."parentId" IS NULL
);

INSERT INTO "Program" ("name", "parentId")
SELECT new_module."name", program."id"
FROM (VALUES
    ('CCNA Security', 'CCNA', 'Cisco'),
    ('CCNA Automation', 'CCNA', 'Cisco'),
    ('CCNP Security', 'CCNP', 'Cisco'),
    ('CCNP Enterprise Core', 'CCNP', 'Cisco'),
    ('Firewall Policies', 'FortiGate Administrator', 'Fortinet'),
    ('Network Security', 'FortiGate Security', 'Fortinet')
) AS new_module("name", "program_name", "training_name")
JOIN "Training" AS training ON training."name" = new_module."training_name"
JOIN "Program" AS program
  ON program."name" = new_module."program_name"
  AND program."trainingId" = training."id"
  AND program."parentId" IS NULL
WHERE NOT EXISTS (
    SELECT 1
    FROM "Program" AS existing
    WHERE existing."name" = new_module."name"
      AND existing."parentId" = program."id"
);
