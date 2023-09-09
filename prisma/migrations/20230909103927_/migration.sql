/*
  Warnings:

  - You are about to drop the column `grossTonageL` on the `TankerMetadata` table. All the data in the column will be lost.
  - Added the required column `grossTonnage` to the `TankerMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imo` to the `TankerOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TankerMetadata" DROP COLUMN "grossTonageL",
ADD COLUMN     "grossTonnage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TankerOwner" ADD COLUMN     "imo" INTEGER NOT NULL;
