/*
  Warnings:

  - Added the required column `programs_enrolled` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "programs_enrolled" TEXT NOT NULL;
