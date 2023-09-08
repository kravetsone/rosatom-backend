-- CreateEnum
CREATE TYPE "IceClass" AS ENUM ('NoIceClass', 'Ice1', 'Ice2', 'Ice3', 'Arc4', 'Arc5', 'Arc6', 'Arc7', 'Arc8', 'Arc9');

-- CreateTable
CREATE TABLE "IceBreaker" (
    "imo" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IceBreaker_pkey" PRIMARY KEY ("imo")
);

-- CreateTable
CREATE TABLE "TankerRequest" (
    "imo" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iceClass" "IceClass" NOT NULL,
    "speed" INTEGER NOT NULL,
    "startPoint" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TankerRequest_pkey" PRIMARY KEY ("imo")
);

-- CreateTable
CREATE TABLE "DayIceCohesion" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "iceCohesion" INTEGER NOT NULL,

    CONSTRAINT "DayIceCohesion_pkey" PRIMARY KEY ("id","date")
);

-- CreateTable
CREATE TABLE "EdgeAvailability" (
    "id" INTEGER NOT NULL,
    "iceBreakerId" INTEGER NOT NULL,

    CONSTRAINT "EdgeAvailability_pkey" PRIMARY KEY ("id","iceBreakerId")
);

-- AddForeignKey
ALTER TABLE "EdgeAvailability" ADD CONSTRAINT "EdgeAvailability_iceBreakerId_fkey" FOREIGN KEY ("iceBreakerId") REFERENCES "IceBreaker"("imo") ON DELETE RESTRICT ON UPDATE CASCADE;
