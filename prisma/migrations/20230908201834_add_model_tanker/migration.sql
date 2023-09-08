/*
  Warnings:

  - The primary key for the `TankerRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iceClass` on the `TankerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `imo` on the `TankerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TankerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `TankerRequest` table. All the data in the column will be lost.
  - Added the required column `tankerId` to the `TankerRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TankerRequest" DROP CONSTRAINT "TankerRequest_pkey",
DROP COLUMN "iceClass",
DROP COLUMN "imo",
DROP COLUMN "name",
DROP COLUMN "speed",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "tankerId" INTEGER NOT NULL,
ADD CONSTRAINT "TankerRequest_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Tanker" (
    "imo" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iceClass" "IceClass" NOT NULL,
    "speed" INTEGER NOT NULL,

    CONSTRAINT "Tanker_pkey" PRIMARY KEY ("imo")
);

-- AddForeignKey
ALTER TABLE "TankerRequest" ADD CONSTRAINT "TankerRequest_tankerId_fkey" FOREIGN KEY ("tankerId") REFERENCES "Tanker"("imo") ON DELETE RESTRICT ON UPDATE CASCADE;
