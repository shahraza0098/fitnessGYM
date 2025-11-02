-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateTable
CREATE TABLE "GymOffDay" (
    "id" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "dayOfWeek" "WeekDay",
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GymOffDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GymOffDay_gymId_idx" ON "GymOffDay"("gymId");

-- CreateIndex
CREATE UNIQUE INDEX "GymOffDay_gymId_date_key" ON "GymOffDay"("gymId", "date");

-- AddForeignKey
ALTER TABLE "GymOffDay" ADD CONSTRAINT "GymOffDay_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;
