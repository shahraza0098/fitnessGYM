/*
  Warnings:

  - You are about to drop the column `macros` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `meals` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the `DietTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `MealPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."DietTemplate" DROP CONSTRAINT "DietTemplate_gymId_fkey";

-- AlterTable
ALTER TABLE "MealPlan" DROP COLUMN "macros",
DROP COLUMN "meals",
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "targetMacros" JSONB,
ADD COLUMN     "trainerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weekEnd" TIMESTAMP(3),
ADD COLUMN     "weekStart" TIMESTAMP(3);

-- DropTable
DROP TABLE "public"."DietTemplate";

-- CreateTable
CREATE TABLE "MealPlanDay" (
    "id" TEXT NOT NULL,
    "mealPlanId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "dailyMacros" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealPlanDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "mealPlanDayId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ingredients" JSONB,
    "calories" INTEGER,
    "macros" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MealPlanDay_mealPlanId_idx" ON "MealPlanDay"("mealPlanId");

-- CreateIndex
CREATE INDEX "Meal_mealPlanDayId_idx" ON "Meal"("mealPlanDayId");

-- CreateIndex
CREATE INDEX "MealPlan_trainerId_idx" ON "MealPlan"("trainerId");

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanDay" ADD CONSTRAINT "MealPlanDay_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mealPlanDayId_fkey" FOREIGN KEY ("mealPlanDayId") REFERENCES "MealPlanDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
