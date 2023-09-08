/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IceBreaker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IceBreaker_name_key" ON "IceBreaker"("name");
