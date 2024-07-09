/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_teacherId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "teacherId";
