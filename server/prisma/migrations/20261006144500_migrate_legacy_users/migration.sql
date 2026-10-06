ALTER TABLE "Users"
ALTER COLUMN "email" DROP NOT NULL;

INSERT INTO "Users" (
    "username",
    "password",
    "email",
    "role",
    "active_status",
    "programs_enrolled",
    "pending_status"
)
SELECT
    legacy."username",
    legacy."password",
    NULL,
    legacy."role",
    true,
    legacy."programs_enrolled",
    'Active'
FROM (
    VALUES
        ('test', 'testpass', 'student', 'CCNA, CCNP Security, Network+'),
        ('brian', 'sabrido', 'Admin', 'Cisco, Palo Alto, CompTIA, Fortinet, Project Management, Data Center, Cloud Computing, Cybersecurity'),
        ('Emman', 'emmanpogi', 'student', 'Cisco, Palo Alto, CompTIA, Fortinet, Data Center, Cloud Computing, Cybersecurity'),
        ('Kulatoy', 'Parale', 'student', 'Cisco, Palo Alto, CompTIA, Fortinet'),
        ('junard', 'bacarroo', 'student', 'Cisco, Palo Alto, CompTIA, Fortinet, Data Center, Cloud Computing, Cybersecurity')
) AS legacy("username", "password", "role", "programs_enrolled")
WHERE NOT EXISTS (
    SELECT 1
    FROM "Users" existing
    WHERE LOWER(existing."username") = LOWER(legacy."username")
);
