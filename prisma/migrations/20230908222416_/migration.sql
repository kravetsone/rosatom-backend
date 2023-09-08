/*
  Warnings:

  - The primary key for the `EdgeAvailability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iceBreakerId` on the `EdgeAvailability` table. All the data in the column will be lost.
  - Added the required column `iceBreakerName` to the `EdgeAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFeasible` to the `EdgeAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EdgeAvailability" DROP CONSTRAINT "EdgeAvailability_iceBreakerId_fkey";

-- AlterTable
ALTER TABLE "EdgeAvailability" DROP CONSTRAINT "EdgeAvailability_pkey",
DROP COLUMN "iceBreakerId",
ADD COLUMN     "iceBreakerName" TEXT NOT NULL,
ADD COLUMN     "isFeasible" BOOLEAN NOT NULL,
ADD CONSTRAINT "EdgeAvailability_pkey" PRIMARY KEY ("id", "iceBreakerName");
