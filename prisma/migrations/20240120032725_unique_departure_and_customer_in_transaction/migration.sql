/*
  Warnings:

  - A unique constraint covering the columns `[customerId,departureId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_customerId_departureId_key" ON "Transaction"("customerId", "departureId");
