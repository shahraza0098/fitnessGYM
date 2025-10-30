-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'OWNER',
ADD COLUMN     "selectedGymId" TEXT;
