UPDATE "Program" AS module
SET "name" = mapping.new_name
FROM (
    VALUES
        ('CCNA Security', 'CCNA', 'CCNA Cybersecurity'),
        ('CCNP Enterprise Core', 'CCNP', 'CCNP Enterprise')
) AS mapping(old_name, program_name, new_name)
JOIN "Program" AS root
  ON root."name" = mapping.program_name
 AND root."parentId" IS NULL
WHERE module."parentId" = root."id"
  AND module."name" = mapping.old_name;

INSERT INTO "Program" ("name", "parentId")
SELECT module."name", root."id"
FROM (
    VALUES
        ('CCNA', 'CCNA Cybersecurity'),
        ('CCNA', 'CCNA Automation'),
        ('CCNP', 'CCNP Enterprise'),
        ('CCNP', 'CCNP Security'),
        ('CCNP', 'CCNP Data Center'),
        ('CCNP', 'CCNP Collaboration')
) AS module(program_name, name)
JOIN "Program" AS root
  ON root."name" = module.program_name
 AND root."parentId" IS NULL
WHERE NOT EXISTS (
    SELECT 1
    FROM "Program" AS existing
    WHERE existing."name" = module.name
      AND existing."parentId" = root."id"
);
