-- DropForeignKey
ALTER TABLE "TankerRequest" DROP CONSTRAINT "TankerRequest_tankerId_fkey";

-- AlterTable
ALTER TABLE "TankerRequest" ALTER COLUMN "startDateTime" SET DATA TYPE TEXT,
ALTER COLUMN "endDateTime" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TankerRequest" ADD CONSTRAINT "TankerRequest_tankerId_fkey" FOREIGN KEY ("tankerId") REFERENCES "Tanker"("imo") ON DELETE CASCADE ON UPDATE CASCADE;
