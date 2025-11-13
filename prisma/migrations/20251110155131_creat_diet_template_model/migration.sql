-- CreateTable
CREATE TABLE "DietTemplate" (
    "id" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "trainerId" TEXT,
    "name" TEXT NOT NULL,
    "goal" TEXT,
    "duration" INTEGER,
    "plan" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DietTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DietTemplate_gymId_idx" ON "DietTemplate"("gymId");

-- CreateIndex
CREATE INDEX "DietTemplate_trainerId_idx" ON "DietTemplate"("trainerId");

-- CreateIndex
CREATE INDEX "DietTemplate_createdAt_idx" ON "DietTemplate"("createdAt");

-- AddForeignKey
ALTER TABLE "DietTemplate" ADD CONSTRAINT "DietTemplate_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietTemplate" ADD CONSTRAINT "DietTemplate_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
