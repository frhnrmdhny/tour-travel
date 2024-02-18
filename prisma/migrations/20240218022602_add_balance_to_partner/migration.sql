/*
  Warnings:

  - Added the required column `balance` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "balance" TEXT NOT NULL;
