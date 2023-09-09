-- CreateTable
CREATE TABLE "IceBreakerMetadata" (
    "shipType" TEXT NOT NULL,
    "flagCountryCode" TEXT NOT NULL,
    "dateOfBuild" TEXT NOT NULL,
    "grossTonnage" INTEGER NOT NULL,
    "summerDeadweight" INTEGER NOT NULL,
    "lengthOverall" INTEGER NOT NULL,
    "beam" INTEGER NOT NULL,
    "iceBreakerImo" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "IceBreakerOwner" (
    "name" TEXT NOT NULL,
    "counryCode" TEXT NOT NULL,
    "imo" INTEGER NOT NULL,
    "iceBreakerImo" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "IceBreakerMetadata_iceBreakerImo_key" ON "IceBreakerMetadata"("iceBreakerImo");

-- CreateIndex
CREATE UNIQUE INDEX "IceBreakerOwner_iceBreakerImo_key" ON "IceBreakerOwner"("iceBreakerImo");

-- AddForeignKey
ALTER TABLE "IceBreakerMetadata" ADD CONSTRAINT "IceBreakerMetadata_iceBreakerImo_fkey" FOREIGN KEY ("iceBreakerImo") REFERENCES "IceBreaker"("imo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IceBreakerOwner" ADD CONSTRAINT "IceBreakerOwner_iceBreakerImo_fkey" FOREIGN KEY ("iceBreakerImo") REFERENCES "IceBreakerMetadata"("iceBreakerImo") ON DELETE RESTRICT ON UPDATE CASCADE;
