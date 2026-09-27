/*
  Warnings:

  - Added the required column `inquiry_type` to the `Inquires` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inquires" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inquiry_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "funding" TEXT,
    "attendees" TEXT,
    "course" TEXT,
    "service_interest" TEXT,
    "project_scale" TEXT,
    "timeline" TEXT,
    "budget" TEXT,
    "project_desc" TEXT,
    "tech_specs" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inquires" ("attendees", "course", "createdAt", "email", "id", "message", "name", "phone", "status", "subject") SELECT "attendees", "course", "createdAt", "email", "id", "message", "name", "phone", "status", "subject" FROM "Inquires";
DROP TABLE "Inquires";
ALTER TABLE "new_Inquires" RENAME TO "Inquires";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
