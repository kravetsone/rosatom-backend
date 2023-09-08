/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StopTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShipToTrip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StopTime" DROP CONSTRAINT "StopTime_stopId_fkey";

-- DropForeignKey
ALTER TABLE "StopTime" DROP CONSTRAINT "StopTime_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_routeId_fkey";

-- DropForeignKey
ALTER TABLE "_ShipToTrip" DROP CONSTRAINT "_ShipToTrip_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShipToTrip" DROP CONSTRAINT "_ShipToTrip_B_fkey";

-- DropTable
DROP TABLE "Agency";

-- DropTable
DROP TABLE "Calendar";

-- DropTable
DROP TABLE "Route";

-- DropTable
DROP TABLE "Ship";

-- DropTable
DROP TABLE "Stop";

-- DropTable
DROP TABLE "StopTime";

-- DropTable
DROP TABLE "Trip";

-- DropTable
DROP TABLE "_ShipToTrip";
