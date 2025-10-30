/*
  Warnings:

  - You are about to drop the column `staffId` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `staffId` on the `PerformanceReview` table. All the data in the column will be lost.
  - You are about to drop the `BranchUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `staffType` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffType` to the `PerformanceReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BranchUser" DROP CONSTRAINT "BranchUser_gymId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClassSchedule" DROP CONSTRAINT "ClassSchedule_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payroll" DROP CONSTRAINT "Payroll_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PerformanceReview" DROP CONSTRAINT "PerformanceReview_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkoutPlan" DROP CONSTRAINT "WorkoutPlan_createdById_fkey";

-- DropIndex
DROP INDEX "public"."Payroll_staffId_idx";

-- DropIndex
DROP INDEX "public"."PerformanceReview_staffId_idx";

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "staffId",
ADD COLUMN     "managerId" TEXT,
ADD COLUMN     "staffType" TEXT NOT NULL,
ADD COLUMN     "trainerId" TEXT;

-- AlterTable
ALTER TABLE "PerformanceReview" DROP COLUMN "staffId",
ADD COLUMN     "managerId" TEXT,
ADD COLUMN     "staffType" TEXT NOT NULL,
ADD COLUMN     "trainerId" TEXT;

-- DropTable
DROP TABLE "public"."BranchUser";

-- DropEnum
DROP TYPE "public"."BranchRole";

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "permissions" TEXT[],
    "role" TEXT NOT NULL DEFAULT 'MANAGER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "specialty" TEXT,
    "experience" INTEGER,
    "certifications" TEXT[],
    "permissions" TEXT[],
    "role" TEXT NOT NULL DEFAULT 'TRAINER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_clerkUserId_key" ON "Manager"("clerkUserId");

-- CreateIndex
CREATE INDEX "Manager_gymId_idx" ON "Manager"("gymId");

-- CreateIndex
CREATE INDEX "Manager_clerkUserId_idx" ON "Manager"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_clerkUserId_key" ON "Trainer"("clerkUserId");

-- CreateIndex
CREATE INDEX "Trainer_gymId_idx" ON "Trainer"("gymId");

-- CreateIndex
CREATE INDEX "Trainer_clerkUserId_idx" ON "Trainer"("clerkUserId");

-- CreateIndex
CREATE INDEX "Payroll_managerId_idx" ON "Payroll"("managerId");

-- CreateIndex
CREATE INDEX "Payroll_trainerId_idx" ON "Payroll"("trainerId");

-- CreateIndex
CREATE INDEX "PerformanceReview_managerId_idx" ON "PerformanceReview"("managerId");

-- CreateIndex
CREATE INDEX "PerformanceReview_trainerId_idx" ON "PerformanceReview"("trainerId");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceReview" ADD CONSTRAINT "PerformanceReview_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceReview" ADD CONSTRAINT "PerformanceReview_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
