/*
  Warnings:

  - You are about to alter the column `endTime` on the `TankerRequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `startTime` on the `TankerRequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TankerRequest" ALTER COLUMN "endTime" SET DATA TYPE INTEGER,
ALTER COLUMN "startTime" SET DATA TYPE INTEGER;
