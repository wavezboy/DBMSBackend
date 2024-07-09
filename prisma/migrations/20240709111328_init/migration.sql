/*
  Warnings:

  - You are about to drop the column `classId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "classId",
ADD COLUMN     "class" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "classId",
ADD COLUMN     "class" TEXT NOT NULL;

-- DropTable
DROP TABLE "Class";
