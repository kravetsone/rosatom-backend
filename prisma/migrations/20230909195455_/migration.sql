/*
  Warnings:

  - You are about to drop the column `endDateTime` on the `TankerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `startDateTime` on the `TankerRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TankerRequest" DROP COLUMN "endDateTime",
DROP COLUMN "startDateTime",
ADD COLUMN     "endTime" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "startTime" INTEGER NOT NULL DEFAULT 1;
