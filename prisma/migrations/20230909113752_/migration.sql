/*
  Warnings:

  - You are about to drop the column `iceBreakerImo` on the `IceBreakerOwner` table. All the data in the column will be lost.
  - You are about to drop the column `tankerImo` on the `TankerOwner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IceBreakerOwner" DROP CONSTRAINT "IceBreakerOwner_iceBreakerImo_fkey";

-- DropForeignKey
ALTER TABLE "TankerOwner" DROP CONSTRAINT "TankerOwner_tankerImo_fkey";

-- DropIndex
DROP INDEX "IceBreakerOwner_iceBreakerImo_key";

-- DropIndex
DROP INDEX "TankerOwner_tankerImo_key";

-- AlterTable
ALTER TABLE "IceBreakerMetadata" ADD COLUMN     "registeredOwnerImo" INTEGER;

-- AlterTable
ALTER TABLE "IceBreakerOwner" DROP COLUMN "iceBreakerImo",
ADD CONSTRAINT "IceBreakerOwner_pkey" PRIMARY KEY ("imo");

-- AlterTable
ALTER TABLE "TankerMetadata" ADD COLUMN     "registeredOwnerImo" INTEGER;

-- AlterTable
ALTER TABLE "TankerOwner" DROP COLUMN "tankerImo",
ADD CONSTRAINT "TankerOwner_pkey" PRIMARY KEY ("imo");

-- AddForeignKey
ALTER TABLE "IceBreakerMetadata" ADD CONSTRAINT "IceBreakerMetadata_registeredOwnerImo_fkey" FOREIGN KEY ("registeredOwnerImo") REFERENCES "IceBreakerOwner"("imo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TankerMetadata" ADD CONSTRAINT "TankerMetadata_registeredOwnerImo_fkey" FOREIGN KEY ("registeredOwnerImo") REFERENCES "TankerOwner"("imo") ON DELETE SET NULL ON UPDATE CASCADE;
