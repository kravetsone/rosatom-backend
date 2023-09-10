-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "startLine" TEXT NOT NULL,
    "endLine" TEXT NOT NULL,
    "tankerId" INTEGER NOT NULL,
    "iceBreakerImo" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_tankerId_fkey" FOREIGN KEY ("tankerId") REFERENCES "Tanker"("imo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_iceBreakerImo_fkey" FOREIGN KEY ("iceBreakerImo") REFERENCES "IceBreaker"("imo") ON DELETE CASCADE ON UPDATE CASCADE;
