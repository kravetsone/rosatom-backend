-- CreateTable
CREATE TABLE "TankerMetadata" (
    "shipType" TEXT NOT NULL,
    "flagCountryCode" TEXT NOT NULL,
    "dateOfBuild" TEXT NOT NULL,
    "grossTonageL" INTEGER NOT NULL,
    "summerDeadweight" INTEGER NOT NULL,
    "lengthOverall" INTEGER NOT NULL,
    "beam" INTEGER NOT NULL,
    "tankerImo" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TankerOwner" (
    "name" TEXT NOT NULL,
    "counryCode" TEXT NOT NULL,
    "tankerImo" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TankerMetadata_tankerImo_key" ON "TankerMetadata"("tankerImo");

-- CreateIndex
CREATE UNIQUE INDEX "TankerOwner_tankerImo_key" ON "TankerOwner"("tankerImo");

-- AddForeignKey
ALTER TABLE "TankerMetadata" ADD CONSTRAINT "TankerMetadata_tankerImo_fkey" FOREIGN KEY ("tankerImo") REFERENCES "Tanker"("imo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TankerOwner" ADD CONSTRAINT "TankerOwner_tankerImo_fkey" FOREIGN KEY ("tankerImo") REFERENCES "TankerMetadata"("tankerImo") ON DELETE RESTRICT ON UPDATE CASCADE;
